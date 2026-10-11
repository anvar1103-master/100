// How a shot feels (after «Лесная война»): glowing bolts with a tapered trail, a flash at the muzzle and where the
// shot lands, and burn marks that glow for a moment and then cool down on hedges and the ground.
// Everything is pooled, additive and unlit, so it costs a few cheap draw calls.
import * as THREE from 'three';
import { scene, camera, LOW } from './engine.js';

const V = new THREE.Vector3();
const GLOW_G = new THREE.PlaneGeometry(1, 1);
const TRAIL_G = new THREE.CylinderGeometry(1, 0.15, 1, 8, 1, true); TRAIL_G.rotateX(Math.PI / 2); TRAIL_G.translate(0, 0, -0.5);
const rgb = c => { const k = new THREE.Color(c); return new THREE.Vector3(k.r, k.g, k.b); };

// a camera-facing disc: white-hot core, coloured halo
const glowMat = c => new THREE.ShaderMaterial({ transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false, fog:false,
  uniforms:{ c:{ value:rgb(c) }, a:{ value:1 } },
  vertexShader:'varying vec2 vU; void main(){ vU = uv - 0.5; float s = length(modelMatrix[0].xyz); vec4 mv = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); mv.xy += position.xy * s; gl_Position = projectionMatrix * mv; }',
  fragmentShader:'uniform vec3 c; uniform float a; varying vec2 vU; void main(){ float d = length(vU) * 2.0; if(d >= 1.0) discard; float core = 1.0 - smoothstep(0.0, 0.42, d); float halo = pow(clamp(1.0 - d, 0.0, 1.0), 2.2); vec3 col = mix(c * halo * 1.6, vec3(1.3), core); gl_FragColor = vec4(col * a, 1.0); }' });
// the trail: bright along the middle, fading toward the tail and the edges
const trailMat = c => new THREE.ShaderMaterial({ transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false, fog:false, side:THREE.DoubleSide,
  uniforms:{ c:{ value:rgb(c) } },
  vertexShader:'varying float vA; varying float vE; void main(){ vA = uv.y; vec4 mv = modelViewMatrix * vec4(position, 1.0); vec3 n = normalize(normalMatrix * normal); vE = abs(dot(n, normalize(-mv.xyz))); gl_Position = projectionMatrix * mv; }',
  fragmentShader:'uniform vec3 c; varying float vA; varying float vE; void main(){ float e = clamp(vE, 0.0, 1.0), a = clamp(vA, 0.0, 1.0); float tail = smoothstep(0.0, 0.5, a); float core = pow(e, 6.0); vec3 col = c * pow(e, 1.3) * 1.3 + vec3(1.0) * core * 0.8; gl_FragColor = vec4(col * tail, 1.0); }' });

const MATS = {};
const mats = c => MATS[c] || (MATS[c] = { glow:glowMat(c), trail:trailMat(c), flash:glowMat(new THREE.Color(c).lerp(new THREE.Color('#FFFFFF'), 0.45).getStyle()) });

// ---------------- bolts ----------------
const boltPool = [];
// size: glow radius; len: longest trail; trail: false skips the trail (shotgun pellets on phones)
export function makeBolt(color, size, len, trail = true){
  let g = boltPool.pop();
  if(!g){
    g = new THREE.Group();
    const glow = new THREE.Mesh(GLOW_G); glow.frustumCulled = false; glow.renderOrder = 7;
    const tr = new THREE.Mesh(TRAIL_G); tr.frustumCulled = false; tr.renderOrder = 6;
    g.add(glow, tr); g.userData = { glow, tr };
  }
  const M = mats(color), u = g.userData;
  u.glow.material = M.glow; u.tr.material = M.trail;
  u.glow.scale.setScalar(size); u.len = len; u.w = size * 0.42; u.tr.visible = trail;
  u.tr.scale.set(0.001, 0.001, 0.001);
  g.visible = true; scene.add(g);
  return g;
}
// place the bolt; the trail points back along the flight and grows with the distance flown
export function moveBolt(g, x, y, z, vx, vz, flown){
  g.position.set(x, y, z);
  const u = g.userData; if(!u.tr.visible) return;
  g.rotation.set(0, Math.atan2(vx, vz), 0);
  const L = Math.max(0.001, Math.min(u.len, flown));
  u.tr.scale.set(u.w, u.w, L);
}
export function freeBolt(g){ scene.remove(g); boltPool.push(g); }

// ---------------- flashes: muzzle and impact ----------------
const flashes = [], flashPool = [];
export function flashAt(x, y, z, color, size, life = 0.07){
  if(camera.position.distanceToSquared(V.set(x, y, z)) > 2500) return;
  let m = flashPool.pop(); if(!m){ m = new THREE.Mesh(GLOW_G, mats(color).flash.clone()); m.frustumCulled = false; m.renderOrder = 8; }
  m.material.uniforms.c.value.copy(mats(color).flash.uniforms.c.value);
  m.position.set(x, y, z); m.scale.setScalar(size); scene.add(m);
  flashes.push({ m, t:life, T:life, s:size });
}

// ---------------- burn marks ----------------
const SCORCH_G = new THREE.PlaneGeometry(1, 1);
const radial = stops => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); for(const [k, s] of stops) g.addColorStop(k, s); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); };
const burnTex = radial([[0, 'rgba(20,14,6,0.85)'], [0.45, 'rgba(30,22,10,0.55)'], [0.8, 'rgba(36,26,14,0.15)'], [1, 'rgba(36,26,14,0)']]);
const emberTex = radial([[0, 'rgba(255,240,200,1)'], [0.3, 'rgba(255,170,60,0.85)'], [0.7, 'rgba(200,60,10,0.25)'], [1, 'rgba(120,20,0,0)']]);
const burnMat = new THREE.MeshBasicMaterial({ map:burnTex, transparent:true, depthWrite:false, polygonOffset:true, polygonOffsetFactor:-2, polygonOffsetUnits:-2 });
const emberMat = new THREE.MeshBasicMaterial({ map:emberTex, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false, polygonOffset:true, polygonOffsetFactor:-3, polygonOffsetUnits:-3 });
const scorches = [], MAX_SCORCH = LOW ? 12 : 24;
// (nx, ny, nz): the face that was hit
export function scorchAt(x, y, z, nx, ny, nz, size = 0.45){
  if(camera.position.distanceToSquared(V.set(x, y, z)) > 1600) return;
  let S = scorches.length >= MAX_SCORCH ? scorches.shift() : null;
  if(!S){ S = { burn:new THREE.Mesh(SCORCH_G, burnMat.clone()), ember:new THREE.Mesh(SCORCH_G, emberMat.clone()) }; S.burn.renderOrder = 2; S.ember.renderOrder = 3; }
  const rot = Math.random() * Math.PI * 2;
  for(const m of [S.burn, S.ember]){
    m.position.set(x + nx * 0.04, y + ny * 0.04, z + nz * 0.04);
    m.lookAt(m.position.x + nx, m.position.y + ny, m.position.z + nz); m.rotateZ(rot);
    m.scale.setScalar(size * (m === S.ember ? 0.75 : 1)); scene.add(m);
  }
  S.t = 0; scorches.push(S);
}

export function updateShotFx(dt){
  for(let i = flashes.length - 1; i >= 0; i--){
    const F = flashes[i]; F.t -= dt; const k = Math.max(0, F.t / F.T);
    F.m.scale.setScalar(F.s * (0.6 + 0.4 * k)); F.m.material.uniforms.a.value = k;
    if(F.t <= 0){ scene.remove(F.m); flashPool.push(F.m); flashes.splice(i, 1); }
  }
  for(let i = scorches.length - 1; i >= 0; i--){
    const S = scorches[i]; S.t += dt;
    S.ember.material.opacity = Math.max(0, 1 - S.t / 0.6);
    S.burn.material.opacity = Math.min(1, Math.max(0, 1 - (S.t - 3.5) / 1.5));
    if(S.t > 5){ scene.remove(S.burn, S.ember); scorches.splice(i, 1); }
  }
}
export function clearShotFx(){
  for(const F of flashes){ scene.remove(F.m); flashPool.push(F.m); } flashes.length = 0;
  for(const S of scorches) scene.remove(S.burn, S.ember); scorches.length = 0;
}
// shader warm-up at boot
export function shotFxSamples(colors){
  const list = [];
  for(const c of colors){ const M = mats(c); list.push(new THREE.Mesh(GLOW_G, M.glow), new THREE.Mesh(TRAIL_G, M.trail), new THREE.Mesh(GLOW_G, M.flash)); }
  list.push(new THREE.Mesh(SCORCH_G, burnMat), new THREE.Mesh(SCORCH_G, emberMat));
  list.forEach(m => { m.frustumCulled = false; });
  return list;
}
