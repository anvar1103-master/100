// Visual effects: one instanced particle system per blend mode, shockwave rings, scorch marks, damage numbers.
import * as THREE from 'three';
import { scene, camera, LOW } from './engine.js';
import { rand, TAU, $ } from './util.js';
import { G } from './state.js';

class Particles {
  constructor(max, additive){
    this.max = max; this.n = 0;
    const base = new THREE.PlaneGeometry(1, 1);
    const geo = new THREE.InstancedBufferGeometry();
    geo.index = base.index; geo.setAttribute('position', base.attributes.position); geo.setAttribute('uv', base.attributes.uv);
    this.pos = new Float32Array(max * 3); this.col = new Float32Array(max * 4); this.size = new Float32Array(max * 2);
    geo.setAttribute('iPos', new THREE.InstancedBufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('iCol', new THREE.InstancedBufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('iSize', new THREE.InstancedBufferAttribute(this.size, 2).setUsage(THREE.DynamicDrawUsage));
    geo.instanceCount = 0;
    this.geo = geo;
    const mat = new THREE.ShaderMaterial({
      transparent:true, depthWrite:false, blending:additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader:`attribute vec3 iPos; attribute vec4 iCol; attribute vec2 iSize; varying vec4 vCol; varying vec2 vUv; varying float vSoft;
        void main(){ vCol = iCol; vUv = uv; vSoft = iSize.y;
          vec4 mv = modelViewMatrix * vec4(iPos, 1.0); mv.xy += position.xy * min(iSize.x, max(-mv.z, 0.1) * 0.22); gl_Position = projectionMatrix * mv; }`,
      fragmentShader:`varying vec4 vCol; varying vec2 vUv; varying float vSoft;
        void main(){ float d = length(vUv - 0.5) * 2.0; float a = clamp(1.0 - d, 0.0, 1.0); a = vSoft > 0.5 ? a * a : smoothstep(0.0, 0.25, a);
          gl_FragColor = vec4(vCol.rgb, vCol.a * a);
          #include <colorspace_fragment>
        }`
    });
    this.mesh = new THREE.Mesh(geo, mat); this.mesh.frustumCulled = false; this.mesh.renderOrder = 5;
    scene.add(this.mesh);
    // simulation arrays
    this.p = []; // {x,y,z,vx,vy,vz,life,t,s0,s1,r,g,b,a,grav,drag,soft}
  }
  emit(o){ if(this.p.length >= this.max) this.p.shift(); this.p.push(o); }
  update(dt){
    const P = this.p; let n = 0;
    for(let i = 0; i < P.length; i++){
      const q = P[i]; q.t += dt;
      if(q.t >= q.life) continue;
      q.vy -= q.grav * dt; const dr = Math.exp(-q.drag * dt); q.vx *= dr; q.vy *= dr; q.vz *= dr;
      q.x += q.vx * dt; q.y += q.vy * dt; q.z += q.vz * dt;
      if(q.y < 0.02 && q.grav > 0){ q.y = 0.02; q.vy *= -0.3; q.vx *= 0.7; q.vz *= 0.7; }
      const k = q.t / q.life;
      this.pos[n * 3] = q.x; this.pos[n * 3 + 1] = q.y; this.pos[n * 3 + 2] = q.z;
      this.col[n * 4] = q.r; this.col[n * 4 + 1] = q.g; this.col[n * 4 + 2] = q.b; this.col[n * 4 + 3] = q.a * (k < 0.1 ? k / 0.1 : 1 - Math.pow((k - 0.1) / 0.9, 1.6));
      this.size[n * 2] = q.s0 + (q.s1 - q.s0) * k; this.size[n * 2 + 1] = q.soft;
      P[n++] = q;
    }
    P.length = n;
    this.geo.instanceCount = n;
    for(const k of ['iPos', 'iCol', 'iSize']) this.geo.attributes[k].needsUpdate = true;
  }
  clear(){ this.p.length = 0; this.geo.instanceCount = 0; }
}
export const glow = new Particles(900, true);
export const smoke = new Particles(500, false);
const C = new THREE.Color();
export function puff(sys, x, y, z, o){
  C.set(o.color || '#fff');
  const n = LOW ? Math.ceil((o.n || 1) * 0.6) : o.n || 1;   // phones: fewer, smaller puffs (less overdraw)
  const sk = LOW ? 0.85 : 1;
  for(let i = 0; i < n; i++){
    const a = rand(0, TAU), up = rand(o.upMin ?? -0.3, o.upMax ?? 1), sp = rand(o.spMin ?? 0, o.sp ?? 2);
    const cj = o.jitter ? rand(1 - o.jitter, 1 + o.jitter) : 1;
    sys.emit({ x:x + rand(-1, 1) * (o.spread || 0), y:y + rand(-1, 1) * (o.spreadY ?? o.spread ?? 0), z:z + rand(-1, 1) * (o.spread || 0),
      vx:Math.cos(a) * sp * Math.sqrt(1 - up * up * 0.5) + (o.vx || 0), vy:up * sp + (o.vy || 0), vz:Math.sin(a) * sp * Math.sqrt(1 - up * up * 0.5) + (o.vz || 0),
      life:rand(o.life * 0.7, o.life * 1.3), t:0, s0:o.s0 * sk * rand(0.8, 1.2), s1:(o.s1 ?? o.s0) * sk * rand(0.8, 1.2), r:C.r * cj, g:C.g * cj, b:C.b * cj, a:o.a ?? 1,
      grav:o.grav || 0, drag:o.drag ?? 2, soft:o.soft ? 1 : 0 });
  }
}

// ---------------- shockwave rings & scorch marks ----------------
const ringGeo = new THREE.RingGeometry(0.82, 1, 40); ringGeo.rotateX(-Math.PI / 2);
const discGeo = new THREE.CircleGeometry(1, 28); discGeo.rotateX(-Math.PI / 2);
const rings = [];
export function ring(x, z, r0, r1, life, color, y = 0.06){
  const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending }));
  m.position.set(x, y, z); m.renderOrder = 4; scene.add(m);
  rings.push({ m, r0, r1, life, t:0 });
}
const scorchTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(20,14,8,.85)'); gr.addColorStop(0.6, 'rgba(30,22,10,.5)'); gr.addColorStop(1, 'rgba(30,22,10,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  for(let i = 0; i < 14; i++){ const a = rand(0, TAU); g.strokeStyle = 'rgba(20,14,8,.4)'; g.lineWidth = rand(2, 5); g.beginPath(); g.moveTo(64, 64); g.lineTo(64 + Math.cos(a) * rand(40, 62), 64 + Math.sin(a) * rand(40, 62)); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const scorches = [];
export function scorch(x, z, r){
  const m = new THREE.Mesh(discGeo, new THREE.MeshBasicMaterial({ map:scorchTex, transparent:true, depthWrite:false, polygonOffset:true, polygonOffsetFactor:-2 }));
  m.position.set(x, 0.035, z); m.scale.setScalar(r); m.rotation.y = rand(0, TAU); m.renderOrder = 1; scene.add(m);
  scorches.push({ m, t:0, life:6 });
  if(scorches.length > 14){ const s = scorches.shift(); scene.remove(s.m); s.m.material.dispose(); }
}

// ---------------- floating damage numbers ----------------
const V3 = new THREE.Vector3();
const nums = [];
export function dmgNumber(x, y, z, val, kind){
  const el = document.createElement('div');
  el.className = 'dnum ' + (kind || '');
  el.textContent = kind === 'heal' ? '+' + Math.round(val) : kind === 'xp' ? '+' + Math.round(val) + ' XP' : Math.round(val);
  $('hud-world').appendChild(el);
  nums.push({ el, x:x + rand(-0.3, 0.3), y, z:z + rand(-0.3, 0.3), t:0, life:0.9 });
}

export function updateFx(dt){
  glow.update(dt); smoke.update(dt);
  for(let i = rings.length - 1; i >= 0; i--){
    const r = rings[i]; r.t += dt; const k = r.t / r.life;
    if(k >= 1){ scene.remove(r.m); r.m.material.dispose(); rings.splice(i, 1); continue; }
    const e = 1 - Math.pow(1 - k, 3);
    r.m.scale.setScalar(r.r0 + (r.r1 - r.r0) * e); r.m.material.opacity = 1 - k;
  }
  for(let i = scorches.length - 1; i >= 0; i--){
    const s = scorches[i]; s.t += dt;
    s.m.material.opacity = Math.min(1, (s.life - s.t) / 1.5);
    if(s.t > s.life){ scene.remove(s.m); s.m.material.dispose(); scorches.splice(i, 1); }
  }
  const w = innerWidth, h = innerHeight;
  for(let i = nums.length - 1; i >= 0; i--){
    const n = nums[i]; n.t += dt;
    if(n.t > n.life){ n.el.remove(); nums.splice(i, 1); continue; }
    V3.set(n.x, n.y + n.t * 1.2, n.z).project(camera);
    if(V3.z > 1){ n.el.style.opacity = 0; continue; }
    const k = n.t / n.life, s = k < 0.15 ? 0.6 + k / 0.15 * 0.7 : 1.3 - Math.min(0.3, (k - 0.15) * 1.2);
    n.el.style.transform = `translate(${(V3.x * 0.5 + 0.5) * w}px,${(-V3.y * 0.5 + 0.5) * h}px) translate(-50%,-50%) scale(${s.toFixed(2)})`;
    n.el.style.opacity = k > 0.7 ? (1 - k) / 0.3 : 1;
  }
}
export function clearFx(){
  glow.clear(); smoke.clear();
  for(const r of rings){ scene.remove(r.m); r.m.material.dispose(); } rings.length = 0;
  for(const s of scorches){ scene.remove(s.m); s.m.material.dispose(); } scorches.length = 0;
  for(const n of nums) n.el.remove(); nums.length = 0;
}

// ---------------- composite effects ----------------
export function explosion(x, z, r, color = '#FF9A2E'){
  // few big puffs instead of many: overlapping see-through quads are what costs the most
  puff(glow, x, 0.4, z, { n:14, color:'#FFE6A0', sp:r * 4.5, upMin:0.1, upMax:1, life:0.35, s0:0.45, s1:0.1, drag:4 });
  puff(glow, x, 0.5, z, { n:6, color, sp:r * 2, upMin:0.2, life:0.45, s0:r * 0.8, s1:r * 0.3, drag:3, soft:true, a:0.85 });
  puff(smoke, x, 0.5, z, { n:6, color:'#5A5048', sp:r * 1.5, upMin:0.2, life:1.0, s0:r * 0.55, s1:r * 1.2, drag:2.5, soft:true, a:0.5, vy:0.8, jitter:0.2 });
  puff(smoke, x, 0.2, z, { n:6, color:'#6B4A2E', sp:5, upMin:0.5, life:0.8, s0:0.12, s1:0.08, grav:14, drag:0.5 });
  ring(x, z, 0.3, r * 1.15, 0.4, color);
  scorch(x, z, r * 0.9);
  G.shake = Math.max(G.shake, 0.35);
}
export function hitSpark(x, y, z, color){
  puff(glow, x, y, z, { n:8, color, sp:5, life:0.25, s0:0.22, s1:0.04, drag:5 });
  puff(glow, x, y, z, { n:1, color:'#FFFFFF', sp:0, life:0.12, s0:0.9, s1:0.3, soft:true, a:0.8 });
}
export function sporeBurst(x, y, z, color, n = 30){
  puff(glow, x, y, z, { n, color, sp:4, life:0.9, s0:0.3, s1:0.05, drag:2.5, grav:-1, soft:true, jitter:0.3 });
  puff(smoke, x, y, z, { n:12, color:'#F4F0E0', sp:2.5, life:1.0, s0:0.4, s1:0.9, drag:3, soft:true, a:0.6, vy:0.6 });
}
export function dust(x, z, n = 3){
  puff(smoke, x, 0.08, z, { n, color:'#D9C49A', sp:0.8, upMin:0.2, life:0.5, s0:0.15, s1:0.4, drag:3, soft:true, a:0.35 });
}
