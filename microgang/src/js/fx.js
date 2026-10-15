// Effects in the world: particles (dust, sparks, splinters, spores, splashes, blood droplets, smoke), tracers,
// bullet holes and blood splats stuck to surfaces, brass casings that bounce and ring, dropped magazines,
// muzzle flashes of the other fighters. Driven by game events.
import * as THREE from 'three';
import { scene, camera } from './engine.js';
import { G, on, emit } from './state.js';
import { ray, HIT, W as PW } from './phys.js';
import { SPECIES } from './fighter.js';
import { casingGeo, gunMats } from './gunmodels.js';
import { VMS } from './viewmodel.js';
import { store, clamp, rand } from './util.js';

export const FX = { blood:store.get('blood', 'insect') };
const bloodCol = f => FX.blood === 'red' ? '#7A0A08' : (SPECIES[f.species] || SPECIES.ant).blood;

// ---- particles: camera-facing soft quads, one pool blended normally, one added (sparks, glints, flashes) ----
function makePool(max, additive){
  const g = new THREE.InstancedBufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
  g.setIndex([0, 1, 2, 0, 2, 3]);
  const off = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3), col = new THREE.InstancedBufferAttribute(new Float32Array(max * 4), 4), sz = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3);
  for(const a of [off, col, sz]) a.setUsage(THREE.DynamicDrawUsage);
  g.setAttribute('off', off); g.setAttribute('col', col); g.setAttribute('sz', sz);
  g.instanceCount = 0;
  const mat = new THREE.ShaderMaterial({ transparent:true, depthWrite:false, blending:additive ? THREE.AdditiveBlending : THREE.NormalBlending, fog:true,
    uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { light:{ value:new THREE.Color(1, 1, 1) } }]),
    vertexShader:`attribute vec3 off; attribute vec4 col; attribute vec3 sz; varying vec4 vC; varying vec2 vUv; varying float vSoft;
      #include <fog_pars_vertex>
      void main(){
        vC = col; vUv = position.xy; vSoft = sz.z;
        vec4 mv = viewMatrix * vec4(off, 1.0);
        float c = cos(sz.y), s = sin(sz.y);
        vec2 p = vec2(position.x * c - position.y * s, position.x * s + position.y * c) * sz.x;
        mv.xy += p;
        vec4 mvPosition = mv; gl_Position = projectionMatrix * mv;
        #include <fog_vertex>
      }`,
    fragmentShader:`uniform vec3 light; varying vec4 vC; varying vec2 vUv; varying float vSoft;
      #include <fog_pars_fragment>
      void main(){
        float d = length(vUv) * 2.0;
        float a = vSoft > 0.5 ? smoothstep(1.0, 0.0, d) * (0.75 + 0.25 * sin(vUv.x * 13.0 + vUv.y * 7.0)) : smoothstep(1.0, 0.6, d);
        if(a <= 0.003) discard;
        gl_FragColor = vec4(vC.rgb * ${additive ? '1.0' : 'light'}, vC.a * a);
        #include <fog_fragment>
      }` });
  const mesh = new THREE.Mesh(g, mat); mesh.frustumCulled = false; mesh.renderOrder = additive ? 6 : 5;
  scene.add(mesh);
  return { g, off, col, sz, mesh, max, list:[] };
}
let PN = null, PA = null;
// spawn: p {x,y,z, vx,vy,vz, life, size, size1, col:[r,g,b,a], grav, drag, soft, rot, spin, onLand}
function spawn(pool, p){
  if(pool.list.length >= pool.max) pool.list.shift();
  p.t = 0; p.rot = p.rot ?? Math.random() * 6.28; p.spin = p.spin ?? 0; p.drag = p.drag ?? 0.5; p.grav = p.grav ?? 0; p.size1 = p.size1 ?? p.size;
  pool.list.push(p);
}
const c3 = (hex, a = 1) => { const c = new THREE.Color(hex); return [c.r, c.g, c.b, a]; };
function stepPool(pool, dt){
  const L = pool.list, o = pool.off.array, c = pool.col.array, s = pool.sz.array;
  let n = 0;
  for(let i = 0; i < L.length; i++){
    const p = L[i]; p.t += dt;
    if(p.t >= p.life){ continue; }
    p.vy -= p.grav * dt; const dr = Math.exp(-p.drag * dt); p.vx *= dr; p.vy *= p.grav ? 1 : dr; p.vz *= dr;
    p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.rot += p.spin * dt;
    if(p.grav){ const gh = PW.groundH(p.x, p.z); if(p.y < gh){ if(p.onLand){ p.onLand(p); p.onLand = null; } p.y = gh; p.vx *= 0.3; p.vz *= 0.3; p.vy = 0; p.life = Math.min(p.life, p.t + 0.3); } }
    const k = p.t / p.life, fade = p.fadeIn ? Math.min(1, p.t / p.fadeIn) * (1 - k) : (1 - k * k);
    o[n * 3] = p.x; o[n * 3 + 1] = p.y; o[n * 3 + 2] = p.z;
    c[n * 4] = p.col[0]; c[n * 4 + 1] = p.col[1]; c[n * 4 + 2] = p.col[2]; c[n * 4 + 3] = p.col[3] * fade;
    s[n * 3] = p.size + (p.size1 - p.size) * k; s[n * 3 + 1] = p.rot; s[n * 3 + 2] = p.soft ? 1 : 0;
    L[n] = p; n++;
  }
  L.length = n;
  pool.g.instanceCount = n;
  pool.off.needsUpdate = pool.col.needsUpdate = pool.sz.needsUpdate = true;
}
function burst(pool, n, x, y, z, o){
  for(let i = 0; i < n; i++){
    const a = Math.random() * 6.283, u = Math.random() * 2 - 1, r = Math.sqrt(1 - u * u), sp = (o.spd || 2) * (0.4 + Math.random() * 0.8);
    let vx = Math.cos(a) * r * sp, vy = u * sp, vz = Math.sin(a) * r * sp;
    if(o.dir){ vx = vx * (o.cone ?? 0.6) + o.dir[0] * sp; vy = vy * (o.cone ?? 0.6) + o.dir[1] * sp + (o.up || 0); vz = vz * (o.cone ?? 0.6) + o.dir[2] * sp; }
    else vy += o.up || 0;
    spawn(pool, { x:x + (Math.random() - 0.5) * (o.jit || 0), y, z:z + (Math.random() - 0.5) * (o.jit || 0), vx, vy, vz, life:(o.life || 0.6) * (0.7 + Math.random() * 0.6), size:o.size || 0.2, size1:o.size1, col:o.col, grav:o.grav || 0, drag:o.drag, soft:o.soft, spin:(Math.random() - 0.5) * (o.spin || 0), fadeIn:o.fadeIn, onLand:o.onLand });
  }
}

// ---- tracers: glowing streaks flying from the muzzle to where the bullet went ----
let TR = null;
const TRACERS = [];
function initTracers(){
  const g = new THREE.PlaneGeometry(1, 1); g.translate(0, 0.5, 0);
  const c = document.createElement('canvas'); c.width = 16; c.height = 128; const x = c.getContext('2d');
  const gr = x.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, 'rgba(255,240,200,0)'); gr.addColorStop(0.75, 'rgba(255,210,140,0.7)'); gr.addColorStop(1, 'rgba(255,255,240,1)');
  x.fillStyle = gr; x.fillRect(0, 0, 16, 128);
  const t = new THREE.CanvasTexture(c);
  const m = new THREE.MeshBasicMaterial({ map:t, transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, color:'#FFD090', side:THREE.DoubleSide, toneMapped:false });
  TR = new THREE.InstancedMesh(g, m, 96); TR.count = 0; TR.frustumCulled = false; TR.renderOrder = 7; scene.add(TR);
}
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _s = new THREE.Vector3();
function stepTracers(dt){
  let n = 0;
  for(let i = 0; i < TRACERS.length; i++){
    const t = TRACERS[i]; t.d += t.speed * dt;
    if(t.d - t.len > t.L){ continue; }
    TRACERS[n++] = t;
    const head = Math.min(t.d, t.L), tail = Math.max(0, t.d - t.len);
    _a.set(t.x + t.dx * tail, t.y + t.dy * tail, t.z + t.dz * tail);
    const len = head - tail; if(len <= 0.01) continue;
    // the quad's long axis along the flight, its face turned to the camera
    const yAx = _v.set(t.dx, t.dy, t.dz), toCam = _b.subVectors(camera.position, _a).normalize();
    const xAx = _c.crossVectors(yAx, toCam).normalize(), zAx = _s.crossVectors(xAx, yAx).normalize();
    _m4.makeBasis(xAx.multiplyScalar(t.w), yAx.clone().multiplyScalar(len), zAx).setPosition(_a);
    TR.setMatrixAt(n - 1, _m4);
  }
  TRACERS.length = n; TR.count = n; TR.instanceMatrix.needsUpdate = true;
}

// ---- decals: bullet holes, scorch, blood splats, water rings ----
let DEC = null;
const DECALS = [];
function decalAtlas(){
  // 4×2 atlas: 0 hole, 1 crater, 2 chip, 3 leaf hole, 4-6 blood splats, 7 drip
  const S = 128, c = document.createElement('canvas'); c.width = S * 4; c.height = S * 2; const x = c.getContext('2d');
  const cell = (i, fn) => { x.save(); x.translate((i % 4) * S + S / 2, Math.floor(i / 4) * S + S / 2); fn(x); x.restore(); };
  cell(0, x => { const g = x.createRadialGradient(0, 0, 2, 0, 0, 30); g.addColorStop(0, 'rgba(10,8,6,1)'); g.addColorStop(0.35, 'rgba(25,18,12,0.95)'); g.addColorStop(0.6, 'rgba(70,55,40,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 30, 0, 7); x.fill(); });
  cell(1, x => { for(let i = 0; i < 26; i++){ const a = Math.random() * 6.3, r = 8 + Math.random() * 40; x.fillStyle = `rgba(40,28,16,${0.25 + Math.random() * 0.35})`; x.beginPath(); x.arc(Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, 3 + Math.random() * 9, 0, 7); x.fill(); }
    const g = x.createRadialGradient(0, 0, 2, 0, 0, 22); g.addColorStop(0, 'rgba(20,14,8,0.95)'); g.addColorStop(1, 'rgba(20,14,8,0)'); x.fillStyle = g; x.beginPath(); x.arc(0, 0, 22, 0, 7); x.fill(); });
  cell(2, x => { x.fillStyle = 'rgba(230,225,210,0.8)'; x.beginPath(); for(let i = 0; i < 9; i++){ const a = i / 9 * 6.28, r = 14 + Math.random() * 16; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.fill(); x.fillStyle = 'rgba(30,28,25,0.95)'; x.beginPath(); x.arc(0, 0, 7, 0, 7); x.fill(); });
  cell(3, x => { x.fillStyle = 'rgba(90,70,20,0.85)'; x.beginPath(); x.arc(0, 0, 16, 0, 7); x.fill(); x.fillStyle = 'rgba(0,0,0,1)'; x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(0, 0, 9, 0, 7); x.fill(); });
  for(const k of [4, 5, 6]) cell(k, x => { x.fillStyle = '#fff'; for(let i = 0; i < 18; i++){ const a = Math.random() * 6.3, r = Math.random() * (k === 6 ? 50 : 34); x.globalAlpha = 0.6 + Math.random() * 0.4; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r, 4 + Math.random() * (k === 6 ? 16 : 11), 0, 7); x.fill(); }
    x.globalAlpha = 1; x.beginPath(); x.arc(0, 0, k === 6 ? 30 : 20, 0, 7); x.fill();
    for(let i = 0; i < 10; i++){ const a = Math.random() * 6.3, r = 30 + Math.random() * 28; x.beginPath(); x.arc(Math.cos(a) * r, Math.sin(a) * r, 1.5 + Math.random() * 3, 0, 7); x.fill(); } });
  cell(7, x => { x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.stroke(); x.lineWidth = 2; x.beginPath(); x.arc(0, 0, 38, 0, 7); x.stroke(); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
function initDecals(){
  const g = new THREE.PlaneGeometry(1, 1);
  const uvo = new THREE.InstancedBufferAttribute(new Float32Array(400 * 3), 3); uvo.setUsage(THREE.DynamicDrawUsage); g.setAttribute('uvo', uvo);
  const tint = new THREE.InstancedBufferAttribute(new Float32Array(400 * 4), 4); tint.setUsage(THREE.DynamicDrawUsage); g.setAttribute('tint', tint);
  const m = new THREE.MeshStandardMaterial({ map:decalAtlas(), transparent:true, depthWrite:false, polygonOffset:true, polygonOffsetFactor:-4, polygonOffsetUnits:-4, roughness:0.6 });
  m.onBeforeCompile = s => {
    s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute vec3 uvo; attribute vec4 tint; varying vec4 vTint;').replace('#include <uv_vertex>', '#include <uv_vertex>\nvMapUv = (uv + uvo.xy) * vec2(0.25, 0.5); vTint = tint;');
    s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec4 vTint;').replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor *= vTint;')
      .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = vTint.a > 0.0 && vTint.r > vTint.b * 1.5 ? 0.25 : 0.8;');
  };
  DEC = new THREE.InstancedMesh(g, m, 400); DEC.count = 0; DEC.frustumCulled = false; DEC.receiveShadow = true; DEC.renderOrder = 1;
  scene.add(DEC);
}
const DEC_MAX = 400;
function decal(x, y, z, nx, ny, nz, kind, size, color, life = 40, grow = 0){
  if(DECALS.length >= DEC_MAX) DECALS.shift();
  DECALS.push({ x:x + nx * 0.015, y:y + ny * 0.015, z:z + nz * 0.015, nx, ny, nz, kind, size, color:new THREE.Color(color || '#ffffff'), t:0, life, grow, rot:Math.random() * 6.28 });
}
function stepDecals(dt){
  let n = 0;
  const uvo = DEC.geometry.attributes.uvo, tint = DEC.geometry.attributes.tint;
  for(let i = 0; i < DECALS.length; i++){
    const d = DECALS[i]; d.t += dt; if(d.t > d.life) continue;
    DECALS[n++] = d;
    const k = n - 1, s = d.size * (d.grow ? Math.min(1, 0.25 + d.t / d.grow * 0.75) : 1), a = Math.min(1, (d.life - d.t) / 4);
    _v.set(d.nx, d.ny, d.nz); _q.setFromUnitVectors(_a.set(0, 0, 1), _v);
    _q.multiply(new THREE.Quaternion().setFromAxisAngle(_a.set(0, 0, 1), d.rot));
    _m4.compose(_b.set(d.x, d.y, d.z), _q, _s.set(s, s, s)); DEC.setMatrixAt(k, _m4);
    uvo.setXYZ(k, d.kind % 4, 1 - Math.floor(d.kind / 4), 0);
    tint.setXYZW(k, d.color.r, d.color.g, d.color.b, a);
  }
  DECALS.length = n; DEC.count = n; DEC.instanceMatrix.needsUpdate = true; uvo.needsUpdate = tint.needsUpdate = true;
}

// ---- casings and dropped magazines: little bodies that bounce and ring ----
let CAS = {};
const CASINGS = [];
function initCasings(){
  const M = gunMats(false);
  for(const id of ['hornet', 'acorn', 'needle', 'comb']){
    const im = new THREE.InstancedMesh(casingGeo(id), id === 'acorn' ? M.shellRed : M.brass, 40); im.count = 0; im.castShadow = true; im.frustumCulled = false; scene.add(im); CAS[id] = im;
  }
}
const _wp = new THREE.Vector3();
on('casing', (f, anchor, id) => {
  anchor.getWorldPosition(_wp);
  const r = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion), u = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const sp = id === 'comb' ? 0.4 : 2.2 + Math.random();
  CASINGS.push({ id, x:_wp.x, y:_wp.y, z:_wp.z, vx:r.x * sp + u.x * 1.2 + f.vx, vy:r.y * sp + 1.5 + Math.random() + (id === 'comb' ? -1 : 0), vz:r.z * sp + u.z * 1.2 + f.vz,
    q:new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.random() * 6, Math.random() * 6, 0)), w:new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10), t:0, rung:0, mine:f === G.me });
  if(CASINGS.length > 80) CASINGS.shift();
});
const DROPS = [];
on('magDrop', (f, mag, id) => {
  if(!mag) return;
  const m = mag.clone(true); m.traverse(o => { o.layers.set(0); if(o.isMesh){ o.material = gunMats(false).chitin; o.castShadow = true; } });
  mag.getWorldPosition(_wp); const q = new THREE.Quaternion(); mag.getWorldQuaternion(q);
  const holder = new THREE.Group(); holder.add(m); m.position.set(0, 0, 0); m.rotation.set(0, 0, 0);
  holder.position.copy(_wp); holder.quaternion.copy(q); scene.add(holder);
  DROPS.push({ o:holder, vx:f.vx * 0.5, vy:-0.5, vz:f.vz * 0.5, t:0, w:new THREE.Vector3(Math.random() * 4, 0, Math.random() * 4) });
  if(DROPS.length > 4){ const d = DROPS.shift(); scene.remove(d.o); }
});
function stepCasings(dt){
  const counts = {};
  for(const id in CAS) counts[id] = 0;
  let n = 0;
  for(let i = 0; i < CASINGS.length; i++){
    const c = CASINGS[i]; c.t += dt; if(c.t > 7) continue; CASINGS[n++] = c;
    c.vy -= 22 * dt; c.x += c.vx * dt; c.y += c.vy * dt; c.z += c.vz * dt;
    const gh = PW.groundH(c.x, c.z);
    if(c.y < gh + 0.01){
      c.y = gh + 0.01;
      if(c.vy < -1.2){ if(c.rung < 3 && c.mine) emit('casingHit', c, Math.min(1, -c.vy / 6)); c.rung++; c.vy = -c.vy * 0.35; c.vx *= 0.55; c.vz *= 0.55; c.w.multiplyScalar(0.6); }
      else { c.vy = 0; c.vx *= 0.8; c.vz *= 0.8; c.w.multiplyScalar(0.85); }
    }
    _q.setFromEuler(new THREE.Euler(c.w.x * dt, c.w.y * dt, c.w.z * dt)); c.q.multiply(_q);
    const im = CAS[c.id], k = counts[c.id]++;
    if(k < 40){ _m4.compose(_b.set(c.x, c.y, c.z), c.q, _s.set(1, 1, 1)); im.setMatrixAt(k, _m4); }
  }
  CASINGS.length = n;
  for(const id in CAS){ CAS[id].count = Math.min(40, counts[id]); CAS[id].instanceMatrix.needsUpdate = true; }
  for(const d of DROPS){
    d.t += dt; if(d.t > 8) continue;
    d.vy -= 22 * dt; d.o.position.x += d.vx * dt; d.o.position.y += d.vy * dt; d.o.position.z += d.vz * dt;
    const gh = PW.groundH(d.o.position.x, d.o.position.z) + 0.03;
    if(d.o.position.y < gh){ d.o.position.y = gh; if(d.vy < -2) emit('magLand', d); d.vy = d.vy < -2 ? -d.vy * 0.25 : 0; d.vx *= 0.5; d.vz *= 0.5; d.w.multiplyScalar(0.5); }
    d.o.rotation.x += d.w.x * dt; d.o.rotation.z += d.w.z * dt;
  }
}

// ---- impacts by material ----
const MAT_FX = {
  dirt:{ dust:'#8A7356', chips:'#4A3826', decal:1, dc:'#ffffff' }, ground:{ dust:'#8A7356', chips:'#4A3826', decal:1, dc:'#ffffff' },
  mud:{ dust:'#5A4A36', chips:'#2E2418', decal:1, dc:'#ffffff', wet:true },
  moss:{ dust:'#7A8A4A', chips:'#3E5A1E', decal:1, dc:'#bbbbbb' },
  stone:{ dust:'#A8A294', chips:'#8C877C', sparks:true, decal:2, dc:'#ffffff' }, shell:{ dust:'#D8C8A0', chips:'#C9A774', sparks:true, decal:2, dc:'#ffffff' },
  wood:{ dust:'#A08460', chips:'#C8A878', splinters:true, decal:0, dc:'#ffffff' },
  shroom:{ dust:'#FFF4DC', chips:'#F0E6D0', spores:true, decal:0, dc:'#C8A090' },
  leaf:{ dust:'#9AB850', chips:'#6A9A30', decal:3, dc:'#ffffff', flutter:true }, grass:{ dust:'#A8C860', chips:'#7AAA38', flutter:true },
  berry:{ dust:'#E84030', chips:'#B8180C', juice:true, decal:4, dc:'#C0180C' },
  water:{ splash:true },
};
function impact(h, dir, W, near){
  const M = MAT_FX[h.mat] || MAT_FX.dirt, x = h.x, y = h.y, z = h.z, n = [h.nx, h.ny, h.nz];
  const big = W && (W.kind === 'sniper' ? 1.8 : W.kind === 'shotgun' ? 0.55 : 1);
  if(M.splash){
    burst(PN, 14 * big, x, y, z, { dir:[0, 1, 0], spd:4 * big, cone:0.45, life:0.7, size:0.09, size1:0.05, col:c3('#E8F0F0', 0.8), grav:16 });
    burst(PN, 4, x, y, z, { dir:[0, 1, 0], spd:0.6, life:0.5, size:0.25, size1:0.7, col:c3('#E0F0F0', 0.35), soft:true });
    decal(x, y + 0.01, z, 0, 1, 0, 7, 0.4, '#E8F4F4', 1.2, 1.2);
    emit('impactSound', 'water', x, y, z); return;
  }
  // dust puff out of the surface
  burst(PN, Math.round(5 * big), x, y, z, { dir:n, spd:1.6 * big, cone:0.7, life:0.9, size:0.18 * big, size1:0.8 * big, col:c3(M.dust, 0.55), drag:3, soft:true });
  // bits flying off
  burst(PN, Math.round(7 * big), x, y, z, { dir:[n[0] - dir.x * 0.3, n[1] + 0.4, n[2] - dir.z * 0.3], spd:3.2 * big, cone:0.8, life:0.9, size:0.05, size1:0.04, col:c3(M.chips, 1), grav:18, drag:0.3, spin:12 });
  if(M.sparks) burst(PA, Math.round(8 * big), x, y, z, { dir:n, spd:7 * big, cone:0.9, life:0.25, size:0.05, size1:0.01, col:c3('#FFC870', 1), grav:12, drag:1 });
  if(M.splinters) burst(PN, Math.round(5 * big), x, y, z, { dir:n, spd:4, cone:0.8, life:1.1, size:0.08, size1:0.06, col:c3('#D8B888', 1), grav:16, spin:20 });
  if(M.spores) burst(PN, Math.round(8 * big), x, y, z, { dir:n, spd:0.9, cone:1, life:2.2, size:0.2, size1:1.1, col:c3('#FFF6E0', 0.45), drag:1.5, soft:true, up:0.2 });
  if(M.flutter) burst(PN, 4, x, y, z, { dir:n, spd:1.2, cone:1, life:1.6, size:0.07, size1:0.06, col:c3(M.chips, 1), grav:2, spin:8 });
  if(M.juice) burst(PN, 10, x, y, z, { dir:n, spd:3, cone:0.7, life:0.8, size:0.07, size1:0.05, col:c3('#D01808', 1), grav:16 });
  if(M.decal !== undefined) decal(x, y, z, n[0], n[1], n[2], M.decal, M.decal === 1 ? 0.55 * big : 0.22 * Math.max(1, big * 0.8), M.dc, 40);
  emit('impactSound', h.mat, x, y, z);
}

// ---- blood ----
function bleed(t, o, heavy){
  if(FX.blood === 'off'){ burst(PN, 6, o.x, o.y, o.z, { spd:2, life:0.6, size:0.06, col:c3('#3A2A18', 1), grav:14 }); return; }
  const col = bloodCol(t), cc = c3(col, 1), d = o.dir;
  const k = heavy ? 1.8 : 1;
  // exit spray along the bullet, a little back-spray, a mist
  burst(PN, Math.round(14 * k), o.x, o.y, o.z, { dir:[d.x, d.y + 0.1, d.z], spd:5 * k, cone:0.45, life:0.9, size:0.07, size1:0.05, col:cc, grav:18, drag:0.4,
    onLand:p => { if(Math.random() < 0.35) decal(p.x, PW.groundH(p.x, p.z), p.z, 0, 1, 0, 4 + Math.floor(Math.random() * 2), 0.18 + Math.random() * 0.25, col, 50); } });
  burst(PN, Math.round(5 * k), o.x, o.y, o.z, { dir:[-d.x, 0.3, -d.z], spd:2, cone:0.6, life:0.6, size:0.06, size1:0.05, col:cc, grav:18 });
  burst(PN, Math.round(3 * k), o.x, o.y, o.z, { dir:[d.x * 0.3, 0.1, d.z * 0.3], spd:0.8, cone:1, life:0.5, size:0.15, size1:0.65 * k, col:c3(col, 0.5), soft:true, drag:3 });
  // chitin flakes in the fighter's own colour
  burst(PN, Math.round(3 * k), o.x, o.y, o.z, { dir:[-d.x, 0.5, -d.z], spd:3, cone:0.8, life:1, size:0.05, size1:0.05, col:c3('#2A1A0C', 1), grav:18, spin:15 });
  // splatter on whatever is right behind them
  const h = ray(o.x, o.y, o.z, d.x, d.y, d.z, 3.5);
  if(h) decal(h.x, h.y, h.z, h.nx, h.ny, h.nz, 4 + Math.floor(Math.random() * 3), 0.5 + Math.random() * 0.5 * k, col, 50);
}

// ---- event wiring ----
on('shot', (f, traces, W) => {
  // tracer start: your gun's muzzle in first person, the model's muzzle otherwise
  let sx, sy, sz;
  if(f === G.me && VMS.cur && VMS.root.visible){ VMS.cur.muzzle.getWorldPosition(_wp); sx = _wp.x; sy = _wp.y; sz = _wp.z; }
  else if(f.model){ const C = f.model, b = f.cur === 0 ? C.bones.gunP : C.bones.gunS, g = f.cur === 0 ? C.gp : C.gs; _wp.copy(g.muzzle).applyMatrix4(b.matrixWorld); sx = _wp.x; sy = _wp.y; sz = _wp.z;
    // their muzzle flash and smoke
    spawn(PA, { x:sx, y:sy, z:sz, vx:0, vy:0, vz:0, life:0.06, size:W.kind === 'sniper' ? 1.1 : 0.7, size1:0.5, col:c3('#FFC060', 1), soft:false });
    burst(PN, 2, sx, sy, sz, { spd:0.3, life:1.2, size:0.15, size1:0.7, col:c3('#C8C0B0', 0.2), soft:true, up:0.3 });
  } else { sx = f.x; sy = f.y + f.eye - 0.1; sz = f.z; }
  if(f === G.me) burst(PN, 2, sx, sy, sz, { spd:0.2, life:1.0, size:0.06, size1:0.35, col:c3('#D8D0C0', 0.18), soft:true, up:0.25 });
  for(let i = 0; i < traces.length; i++){
    const t = traces[i], dx = t.x - sx, dy = t.y - sy, dz = t.z - sz, L = Math.hypot(dx, dy, dz);
    // every rifle round, every other pellet carries a tracer
    if(W.kind !== 'shotgun' || i % 3 === 0) TRACERS.push({ x:sx, y:sy, z:sz, dx:dx / L, dy:dy / L, dz:dz / L, L, d:0, len:Math.min(L, W.kind === 'sniper' ? 9 : 4.5), w:W.kind === 'sniper' ? 0.06 : 0.035, speed:W.kind === 'sniper' ? 900 : 600 });
    if(t.wh) impact(t.wh, { x:t.dx, y:t.dy, z:t.dz }, W);
    // a bullet passing close to your head cracks by
    if(G.me && f !== G.me && G.me.alive){
      const ex = G.me.x - sx, ey = G.me.y + G.me.eye - sy, ez = G.me.z - sz, al = (ex * dx + ey * dy + ez * dz) / L;
      if(al > 2 && al < L){ const px = ex - dx / L * al, py = ey - dy / L * al, pz = ez - dz / L * al; if(px * px + py * py + pz * pz < 2.2) emit('whiz', f, sx + dx / L * al, sy + dy / L * al, sz + dz / L * al); }
    }
  }
  if(TRACERS.length > 90) TRACERS.splice(0, TRACERS.length - 90);
});
on('damage', (t, amt, src, o) => { if(o && o.dir) bleed(t, o, o.head); });
on('kill', (t, src, o) => {
  if(FX.blood !== 'off'){ const col = bloodCol(t); decal(t.x, PW.groundH(t.x, t.z), t.z, 0, 1, 0, 6, 1.6, col, 60, 2.5); if(o.dir) bleed(t, o, true); }
});
on('pad', (f, c) => { burst(PN, 26, c.x, c.y + c.r * 0.6, c.z, { dir:[0, 1, 0], spd:3, cone:1.2, life:2.6, size:0.4, size1:1.8, col:c3('#E8D8A8', 0.4), soft:true, drag:1.4 }); });
on('land', (f, v) => { if(v > 9) burst(PN, 8, f.x, f.y + 0.05, f.z, { spd:2, life:0.7, size:0.2, size1:0.7, col:c3('#8A7356', 0.4), soft:true, drag:3, up:0.6 }); });

// ---- ambient motes: pollen and dust drifting in the sunbeams around you ----
const MOTES = [];
function stepMotes(dt){
  const cx = camera.position.x, cy = camera.position.y, cz = camera.position.z;
  while(MOTES.length < 70) MOTES.push({ x:cx + rand(-12, 12), y:cy + rand(-2, 7), z:cz + rand(-12, 12), ph:Math.random() * 9 });
  for(const m of MOTES){
    m.ph += dt; m.x += Math.sin(m.ph * 0.7) * 0.15 * dt + 0.12 * dt; m.y += Math.sin(m.ph * 0.9 + 1) * 0.08 * dt; m.z += Math.cos(m.ph * 0.6) * 0.15 * dt;
    if(Math.abs(m.x - cx) > 13 || Math.abs(m.z - cz) > 13 || Math.abs(m.y - cy - 2) > 6){ m.x = cx + rand(-12, 12); m.y = cy + rand(-2, 7); m.z = cz + rand(-12, 12); }
    spawn(PA, { x:m.x, y:m.y, z:m.z, vx:0, vy:0, vz:0, life:dt * 1.01, size:0.035 + (m.ph % 1) * 0.02, col:[1, 0.92, 0.7, 0.55], soft:false });
  }
}

export function initFx(){ PN = makePool(2200, false); PA = makePool(900, true); initTracers(); initDecals(); initCasings(); }
export function stepFx(dt){ stepMotes(dt); stepPool(PN, dt); stepPool(PA, dt); stepTracers(dt); stepDecals(dt); stepCasings(dt); PN.mesh.material.uniforms.light.value.setRGB(1, 0.97, 0.9); }
export function clearFx(){ PN.list.length = 0; PA.list.length = 0; TRACERS.length = 0; DECALS.length = 0; CASINGS.length = 0; for(const d of DROPS) scene.remove(d.o); DROPS.length = 0; }
