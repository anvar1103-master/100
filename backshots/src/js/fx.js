// Effects in the world (from Microgang, retuned for an office): particles (plaster dust, paper and tile crumbs,
// carpet fluff, sparks, blood droplets and mist, gun smoke), tracers, bullet holes and blood stuck to walls, floor
// and ceiling, pools of blood under the fallen, brass casings that bounce off floor and walls and ring, the other
// fighters' muzzle flashes, impacts on props and bodies knocked by physics, dust motes hanging in the lamp light.
import * as THREE from 'three';
import { scene, camera } from './engine.js';
import { G, on, emit } from './state.js';
import { ray, groundAt, PW } from './phys.js';
import { soldierMuzzle } from './soldiers.js';
import { casingGeo, gunMats } from './gunmodels.js';
import { VMS } from './viewmodel.js';
import { PH } from './physics.js';
import { lightAt } from './level/lights.js';
import { FLOOR, DESK, CELL } from './level/gen.js';
import { store, clamp, rand } from './util.js';

export const FX = { blood:store.get('blood', 'on') === 'off' ? 'off' : 'on' };
const bloodCol = () => '#6E0A0A';
const GH = (x, z) => groundAt(x, z);
const inWall = (x, z) => { const L = PW.L, i = L.ci(x), k = L.ck(z); if(i < 0 || k < 0 || i >= L.W || k >= L.H) return true; const c = L.g[k * L.W + i]; return c !== FLOOR && c !== DESK; };

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
    if(p.grav){ const gh = GH(p.x, p.z); if(p.y < gh){ if(p.onLand){ p.onLand(p); p.onLand = null; } p.y = gh; p.vx *= 0.3; p.vz *= 0.3; p.vy = 0; p.life = Math.min(p.life, p.t + 0.3); } }
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
  for(const id of ['ak', 'm4', 'shotgun', 'sniper', 'pistol']){
    const im = new THREE.InstancedMesh(casingGeo(id), id === 'shotgun' ? M.shellRed : M.brass, 40); im.count = 0; im.castShadow = true; im.frustumCulled = false; scene.add(im); CAS[id] = im;
  }
}
const _wp = new THREE.Vector3();
on('casing', (f, anchor, id) => {
  anchor.getWorldPosition(_wp);
  const r = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion), u = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const sp = id === 'pistol' ? 1.2 : 2.2 + Math.random();
  CASINGS.push({ id, x:_wp.x, y:_wp.y, z:_wp.z, vx:r.x * sp + u.x * 1.2 + f.vx, vy:r.y * sp + 1.5 + Math.random(), vz:r.z * sp + u.z * 1.2 + f.vz,
    q:new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.random() * 6, Math.random() * 6, 0)), w:new THREE.Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10), t:0, rung:0, mine:f === G.me });
  if(CASINGS.length > 80) CASINGS.shift();
});
const DROPS = [];
on('magDrop', (f, mag, id) => {
  if(!mag) return;
  const m = mag.clone(true); m.traverse(o => { o.layers.set(0); if(o.isMesh){ o.material = o.material.userData.world || o.material; o.castShadow = true; } });
  const ws = new THREE.Vector3(); mag.getWorldScale(ws); m.scale.copy(ws);
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
    c.vy -= 12 * dt;
    // bounce off walls
    if(inWall(c.x + c.vx * dt, c.z)) c.vx = -c.vx * 0.4; if(inWall(c.x, c.z + c.vz * dt)) c.vz = -c.vz * 0.4;
    c.x += c.vx * dt; c.y += c.vy * dt; c.z += c.vz * dt;
    const gh = GH(c.x, c.z);
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
    d.vy -= 12 * dt; d.o.position.x += d.vx * dt; d.o.position.y += d.vy * dt; d.o.position.z += d.vz * dt;
    const gh = GH(d.o.position.x, d.o.position.z) + 0.03;
    if(d.o.position.y < gh){ d.o.position.y = gh; if(d.vy < -2) emit('magLand', d); d.vy = d.vy < -2 ? -d.vy * 0.25 : 0; d.vx *= 0.5; d.vz *= 0.5; d.w.multiplyScalar(0.5); }
    d.o.rotation.x += d.w.x * dt; d.o.rotation.z += d.w.z * dt;
  }
}

// ---- impacts by material ----
const MAT_FX = {
  wall:{ dust:'#C9BE8E', chips:'#D8CC98', decal:0, dc:'#ffffff', paper:true },
  floor:{ dust:'#5A4A30', chips:'#3A2C1A', decal:1, dc:'#9A8A70' },
  ceil:{ dust:'#E8E4D8', chips:'#F0ECE0', decal:2, dc:'#ffffff', crumbs:true },
  metal:{ dust:'#9A968C', chips:'#6A665E', sparks:true, decal:2, dc:'#cccccc' },
};
function impact(h, dir, W, near){
  const M = MAT_FX[h.mat] || MAT_FX.dirt, x = h.x, y = h.y, z = h.z, n = [h.nx, h.ny, h.nz];
  const big = W && (W.kind === 'sniper' ? 1.8 : W.kind === 'shotgun' ? 0.55 : 1);
  // a wet patch splashes
  if(h.mat === 'floor' && PW.L.wet[PW.L.ck(z) * PW.L.W + PW.L.ci(x)] > 120){
    burst(PN, Math.round(10 * big), x, y, z, { dir:[0, 1, 0], spd:3 * big, cone:0.45, life:0.6, size:0.05, size1:0.03, col:c3('#B8B090', 0.7), grav:12 });
    decal(x, y + 0.005, z, 0, 1, 0, 7, 0.35, '#D8D0B0', 1.2, 1.2);
    emit('impactSound', 'water', x, y, z); return;
  }
  // dust puff out of the surface
  burst(PN, Math.round(5 * big), x, y, z, { dir:n, spd:1.6 * big, cone:0.7, life:0.9, size:0.18 * big, size1:0.8 * big, col:c3(M.dust, 0.55), drag:3, soft:true });
  // bits flying off
  burst(PN, Math.round(7 * big), x, y, z, { dir:[n[0] - dir.x * 0.3, n[1] + 0.4, n[2] - dir.z * 0.3], spd:3.2 * big, cone:0.8, life:0.9, size:0.05, size1:0.04, col:c3(M.chips, 1), grav:18, drag:0.3, spin:12 });
  if(M.sparks) burst(PA, Math.round(8 * big), x, y, z, { dir:n, spd:7 * big, cone:0.9, life:0.25, size:0.05, size1:0.01, col:c3('#FFC870', 1), grav:12, drag:1 });
  // scraps of wallpaper flutter down; ceiling tiles shed crumbs and a slow cloud
  if(M.paper) burst(PN, 4, x, y, z, { dir:n, spd:1.4, cone:1, life:1.8, size:0.05, size1:0.05, col:c3('#E2D49A', 1), grav:2.5, spin:9 });
  if(M.crumbs){ burst(PN, Math.round(9 * big), x, y, z, { dir:[n[0], -0.3, n[2]], spd:1.2, cone:1, life:1.6, size:0.035, size1:0.03, col:c3(M.chips, 1), grav:9 });
    burst(PN, 3, x, y, z, { dir:[0, -1, 0], spd:0.3, cone:1, life:3, size:0.25, size1:1.2, col:c3('#EEE8DA', 0.3), soft:true, drag:1.2 }); }
  if(M.decal !== undefined) decal(x, y, z, n[0], n[1], n[2], M.decal, M.decal === 1 ? 0.14 * big : 0.12 * Math.max(1, big * 0.8), M.dc, 90);
  emit('impactSound', h.mat, x, y, z);
}

// ---- blood ----
function bleed(t, o, heavy){
  if(FX.blood === 'off'){ burst(PN, 6, o.x, o.y, o.z, { spd:2, life:0.6, size:0.06, col:c3('#3A2A18', 1), grav:14 }); return; }
  const col = bloodCol(t), cc = c3(col, 1), d = o.dir;
  const k = heavy ? 1.8 : 1;
  // exit spray along the bullet, a little back-spray, a mist
  burst(PN, Math.round(14 * k), o.x, o.y, o.z, { dir:[d.x, d.y + 0.1, d.z], spd:5 * k, cone:0.45, life:0.9, size:0.07, size1:0.05, col:cc, grav:18, drag:0.4,
    onLand:p => { if(Math.random() < 0.35) decal(p.x, GH(p.x, p.z), p.z, 0, 1, 0, 4 + Math.floor(Math.random() * 2), 0.1 + Math.random() * 0.16, col, 120); } });
  burst(PN, Math.round(5 * k), o.x, o.y, o.z, { dir:[-d.x, 0.3, -d.z], spd:2, cone:0.6, life:0.6, size:0.06, size1:0.05, col:cc, grav:18 });
  burst(PN, Math.round(3 * k), o.x, o.y, o.z, { dir:[d.x * 0.3, 0.1, d.z * 0.3], spd:0.8, cone:1, life:0.5, size:0.15, size1:0.65 * k, col:c3(col, 0.5), soft:true, drag:3 });
  // bits of cloth and bone
  burst(PN, Math.round(3 * k), o.x, o.y, o.z, { dir:[-d.x, 0.5, -d.z], spd:3, cone:0.8, life:1, size:0.03, size1:0.03, col:c3('#3A2A1E', 1), grav:18, spin:15 });
  // splatter on whatever is right behind them
  const h = ray(o.x, o.y, o.z, d.x, d.y, d.z, 3.5);
  if(h) decal(h.x, h.y, h.z, h.nx, h.ny, h.nz, 4 + Math.floor(Math.random() * 3), 0.35 + Math.random() * 0.4 * k, col, 120);
}

// ---- event wiring ----
on('shot', (f, traces, W) => {
  const t0 = traces[0];
  // tracer start: your gun's muzzle in first person, the model's muzzle otherwise
  let sx, sy, sz;
  if(f === G.me && VMS.cur && VMS.root.visible){ VMS.cur.muzzle.getWorldPosition(_wp); sx = _wp.x; sy = _wp.y; sz = _wp.z; }
  else if(f.model && f.model.root.visible){ soldierMuzzle(f.model, _wp); sx = _wp.x; sy = _wp.y; sz = _wp.z;
    // their muzzle flash and smoke
    spawn(PA, { x:sx, y:sy, z:sz, vx:0, vy:0, vz:0, life:0.05, size:W.kind === 'sniper' ? 0.8 : 0.5, size1:0.35, col:c3('#FFC060', 1), soft:false });
    burst(PN, 2, sx, sy, sz, { spd:0.3, life:1.2, size:0.15, size1:0.7, col:c3('#C8C0B0', 0.2), soft:true, up:0.3 });
  } else { sx = t0.ox; sy = t0.oy - 0.1; sz = t0.oz; }
  if(f === G.me) burst(PN, 2, sx, sy, sz, { spd:0.2, life:1.0, size:0.06, size1:0.35, col:c3('#D8D0C0', 0.18), soft:true, up:0.25 });
  for(let i = 0; i < traces.length; i++){
    const t = traces[i], dx = t.x - sx, dy = t.y - sy, dz = t.z - sz, L = Math.hypot(dx, dy, dz);
    // every rifle round, every other pellet carries a tracer
    if((W.kind !== 'shotgun' || i % 3 === 0) && Math.random() < 0.6) TRACERS.push({ x:sx, y:sy, z:sz, dx:dx / L, dy:dy / L, dz:dz / L, L, d:0, len:Math.min(L, W.kind === 'sniper' ? 9 : 4.5), w:W.kind === 'sniper' ? 0.06 : 0.035, speed:W.kind === 'sniper' ? 900 : 600 });
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
on('kill', (t, src, o) => { if(FX.blood !== 'off' && o.dir) bleed(t, o, true); });
// a pool spreads under a body once it has come to rest
export function bloodPool(x, z){ if(FX.blood !== 'off') decal(x, GH(x, z) + 0.002, z, 0, 1, 0, 6, 1.4 + Math.random() * 0.5, '#4A0606', 240, 6); }

// ---- ambient motes: pollen and dust drifting in the sunbeams around you ----
const MOTES = [];
function stepMotes(dt){
  const cx = camera.position.x, cy = camera.position.y, cz = camera.position.z;
  while(MOTES.length < 90) MOTES.push({ x:cx + rand(-6, 6), y:rand(0.3, 2.6), z:cz + rand(-6, 6), ph:Math.random() * 9 });
  for(const m of MOTES){
    m.ph += dt; m.x += Math.sin(m.ph * 0.5) * 0.05 * dt; m.y += Math.sin(m.ph * 0.7 + 1) * 0.03 * dt - 0.01 * dt; m.z += Math.cos(m.ph * 0.4) * 0.05 * dt;
    if(Math.abs(m.x - cx) > 7 || Math.abs(m.z - cz) > 7 || m.y < 0.1){ m.x = cx + rand(-6, 6); m.y = rand(0.3, 2.6); m.z = cz + rand(-6, 6); }
    const lit = clamp(lightAt(PW.L, m.x, m.z), 0, 1); if(lit < 0.15) continue;
    spawn(PA, { x:m.x, y:m.y, z:m.z, vx:0, vy:0, vz:0, life:dt * 1.01, size:0.012 + (m.ph % 1) * 0.008, col:[1, 0.93, 0.75, 0.35 * lit], soft:false });
  }
}

export function initFx(){ PN = makePool(2200, false); PA = makePool(900, true); initTracers(); initDecals(); initCasings(); }
function physHits(){
  for(const h of PH.hits){
    const n = [-h.dx, -h.dy, -h.dz];
    if(h.rag){ if(FX.blood !== 'off') burst(PN, 8, h.x, h.y, h.z, { dir:[h.dx, h.dy + 0.2, h.dz], spd:3, cone:0.5, life:0.7, size:0.05, size1:0.04, col:c3('#6E0A0A', 1), grav:12 }); emit('impactSound', 'flesh', h.x, h.y, h.z); }
    else { burst(PA, 6, h.x, h.y, h.z, { dir:n, spd:5, cone:0.9, life:0.2, size:0.04, size1:0.01, col:c3('#FFC870', 1), grav:12, drag:1 }); emit('impactSound', 'metal', h.x, h.y, h.z); }
  }
  PH.hits.length = 0;
}
export function stepFx(dt){ physHits(); stepMotes(dt); stepPool(PN, dt); stepPool(PA, dt); stepTracers(dt); stepDecals(dt); stepCasings(dt); PN.mesh.material.uniforms.light.value.setRGB(0.55, 0.5, 0.42); }
export function clearFx(){ PN.list.length = 0; PA.list.length = 0; TRACERS.length = 0; DECALS.length = 0; CASINGS.length = 0; for(const d of DROPS) scene.remove(d.o); DROPS.length = 0; }
