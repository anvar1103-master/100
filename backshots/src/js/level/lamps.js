// Live light on top of the baked map: a small pool of spot lights hangs under the lamps nearest the camera (with
// shadows on «Красивая»), so fighters, props and the gun in your hands are lit by the lamps they stand under and cast
// shadows; flickering lamps stutter (panel, light and buzz together); the flashlight on your gun and on the bots'
// guns; a flash of light for every shot. Lights are never hidden (that would recompile every material), only dimmed.
import * as THREE from 'three';
import { scene, camera, HIGH } from '../engine.js';
import { G, on } from '../state.js';
import { losClear } from '../phys.js';
import { LV, LAMP } from './build.js';
import { gun } from '../fighter.js';

export const LAMPS = { spots:[], flash:null, botFlash:[], muzzle:[], flick:new Map(), pickT:0 };
const WARM = new THREE.Color(1.0, 0.9, 0.74), RED = new THREE.Color(1.0, 0.2, 0.12);

export function initLamps(){
  const n = HIGH ? 7 : 4, shadows = HIGH ? 3 : 0;
  for(let i = 0; i < n; i++){
    const s = new THREE.SpotLight(WARM, 0, 9.5, 1.2, 0.85, 1.4);
    if(i < shadows){ s.castShadow = true; s.shadow.mapSize.set(512, 512); s.shadow.bias = -0.0006; s.shadow.normalBias = 0.03; s.shadow.camera.near = 0.2; s.shadow.camera.far = 9; }
    s.target.position.set(0, -1, 0); s.add(s.target);
    scene.add(s); LAMPS.spots.push({ s, lamp:null, k:0, want:0 });
  }
  // the flashlight on your gun
  const f = LAMPS.flash = new THREE.SpotLight('#FFF4E0', 0, 30, 0.38, 0.55, 1.2);
  if(HIGH){ f.castShadow = true; f.shadow.mapSize.set(1024, 1024); f.shadow.bias = -0.0004; f.shadow.camera.near = 0.15; f.shadow.camera.far = 30; }
  scene.add(f, f.target);
  for(let i = 0; i < 2; i++){ const b = new THREE.SpotLight('#FFF0D8', 0, 22, 0.4, 0.6, 1.3); scene.add(b, b.target); LAMPS.botFlash.push(b); }
  for(let i = 0; i < 2; i++){ const m = new THREE.PointLight('#FFB45A', 0, 10, 1.8); scene.add(m); LAMPS.muzzle.push({ l:m, t:9 }); }
}

// how bright a flickering lamp is right now (0..1): long steady stretches broken by stutters and blackouts
export function flickerK(l, t){
  const a = Math.sin(t * 0.7 + l.ph) + Math.sin(t * 1.9 + l.ph * 1.7);
  if(a < 0.9) return 0.92 + 0.08 * Math.sin(t * 31 + l.ph);               // mostly on, a faint shimmer
  const b = Math.sin(t * 23 + l.ph * 3) + Math.sin(t * 57 + l.ph);       // stutter
  return a > 1.6 ? 0.04 : b > 0.4 ? 1 : 0.15;
}

const _v = new THREE.Vector3(), _d = new THREE.Vector3();
export function updateLamps(dt){
  const L = G.level; if(!L || !LV.diffuser) return;
  const t = G.time + performance.now() * 0.0003, cx = camera.position.x, cz = camera.position.z;
  // ---- flickering panels near you ----
  let dirty = false;
  for(let i = 0; i < L.lamps.length; i++){
    const l = L.lamps[i]; if(l.state !== 'flicker') continue;
    if(Math.abs(l.x - cx) > 40 || Math.abs(l.z - cz) > 40) continue;
    const k = flickerK(l, t); LAMPS.flick.set(l, k);
    LV.diffuser.setColorAt(i, _c.copy(l.red ? LAMP.red : LAMP.warm).multiplyScalar(k).lerp(LAMP.dead, k < 0.2 ? 0.8 : 0)); dirty = true;
  }
  if(dirty) LV.diffuser.instanceColor.needsUpdate = true;
  // ---- the live lights go to the nearest lamps you can see (re-picked a few times a second) ----
  LAMPS.pickT -= dt;
  if(LAMPS.pickT <= 0){
    LAMPS.pickT = 0.2;
    camera.getWorldDirection(_d);
    const cand = [];
    for(const l of L.lamps){
      if(l.state === 'off') continue;
      const dx = l.x - cx, dz = l.z - cz, d = Math.hypot(dx, dz); if(d > 16) continue;
      const front = (dx * _d.x + dz * _d.z) / (d || 1);
      let s = d - front * 4;
      if(l.state === 'flicker') s -= 3;
      cand.push([s, l]);
    }
    cand.sort((a, b) => a[0] - b[0]);
    const chosen = [];
    for(const [, l] of cand){ if(chosen.length >= LAMPS.spots.length) break; if(losClear(cx, camera.position.y, cz, l.x, l.y - 0.3, l.z) || Math.hypot(l.x - cx, l.z - cz) < 5) chosen.push(l); }
    // keep lights on lamps that stay chosen (no popping), hand the rest out
    const free = LAMPS.spots.filter(S => !S.lamp || !chosen.includes(S.lamp));
    for(const S of LAMPS.spots) if(S.lamp && !chosen.includes(S.lamp)) S.want = 0;
    for(const l of chosen){ if(LAMPS.spots.some(S => S.lamp === l && S.want > 0)) continue; const S = free.find(S => S.k < 0.05) || free.find(S => S.want === 0); if(S){ S.lamp = l; S.want = 1; S.s.position.set(l.x, l.y - 0.08, l.z); S.s.color.copy(l.red ? RED : WARM); } }
  }
  for(const S of LAMPS.spots){
    S.k += (S.want - S.k) * Math.min(1, dt * 6);
    const fl = S.lamp && S.lamp.state === 'flicker' ? (LAMPS.flick.get(S.lamp) ?? 1) : 1;
    S.s.intensity = 16 * S.k * fl;
    if(S.k < 0.02 && S.want === 0) S.lamp = null;
  }
  // ---- flashlights ----
  const me = G.me, F = LAMPS.flash;
  if(me && me.alive && me.light && G.state === 'play'){
    F.intensity = 55;
    camera.getWorldDirection(_d);
    _v.set(0.12, -0.12, -0.25).applyMatrix4(camera.matrixWorld); F.position.copy(_v);
    F.target.position.copy(_v).addScaledVector(_d, 6); F.target.updateMatrixWorld();
  } else F.intensity = 0;
  const lit = G.fighters.filter(f => f !== me && f.alive && f.light).sort((a, b) => Math.hypot(a.x - cx, a.z - cz) - Math.hypot(b.x - cx, b.z - cz));
  LAMPS.botFlash.forEach((b, i) => {
    const f = lit[i];
    if(!f || Math.hypot(f.x - cx, f.z - cz) > 40){ b.intensity = 0; return; }
    b.intensity = 40;
    const cp = Math.cos(f.pitch);
    b.position.set(f.x + Math.cos(f.yaw) * 0.15, f.y + f.eye - 0.25, f.z - Math.sin(f.yaw) * 0.15);
    b.target.position.set(b.position.x - Math.sin(f.yaw) * cp * 6, b.position.y + Math.sin(f.pitch) * 6, b.position.z - Math.cos(f.yaw) * cp * 6); b.target.updateMatrixWorld();
  });
  for(const m of LAMPS.muzzle){ m.t += dt; m.l.intensity = m.t < 0.05 ? 30 * (1 - m.t / 0.05) : 0; }
}
const _c = new THREE.Color();
// a shot lights up its surroundings for a moment (yours and the nearest other one)
on('fire', f => {
  const cx = camera.position.x, cz = camera.position.z;
  if(Math.hypot(f.x - cx, f.z - cz) > 30) return;
  const m = f === G.me ? LAMPS.muzzle[0] : LAMPS.muzzle[1]; if(!m) return;
  const yaw = f.yaw, k = gun(f).W.kind === 'shotgun' ? 1.4 : 1;
  m.l.position.set(f.x - Math.sin(yaw) * 0.8, f.y + f.eye - 0.15, f.z - Math.cos(yaw) * 0.8); m.t = 0; m.l.distance = 10 * k;
});
