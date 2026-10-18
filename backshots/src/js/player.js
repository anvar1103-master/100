// The player: mouse and keyboard → the fighter's input, and the first-person camera: head bob, landing dip, recoil
// punch, leaning round corners (the view tilts and slides), aiming zoom, death (the view drops and turns to the killer,
// then follows someone still fighting).
import * as THREE from 'three';
import { G, on } from './state.js';
import { camera, canvas, vfov, baseFov } from './engine.js';
import { gun, eyeX, eyeY, eyeZ } from './fighter.js';
import { lootNear, takeLoot, PICK_R } from './loot.js';
import { clamp, damp, store, sp, spring } from './util.js';

export const PL = { yaw:0, pitch:0, locked:false, keys:new Set(), mouse:{ l:false, r:false }, sens:store.get('sens', 1), aimHold:store.get('aimHold', true),
  dx:0, dy:0, bobT:0, pick:null, landY:sp(), punch:{ p:sp(), y:sp(), r:sp() }, fov:75, autopilot:false, aimToggle:false, deathT:0, watch:null };

const KEY = { fwd:['KeyW', 'ArrowUp'], back:['KeyS', 'ArrowDown'], left:['KeyA', 'ArrowLeft'], right:['KeyD', 'ArrowRight'], crouch:['KeyC', 'ControlLeft'], sprint:['ShiftLeft', 'ShiftRight'], leanL:['KeyQ'], leanR:['KeyE'] };
const down = k => KEY[k].some(c => PL.keys.has(c));

export function requestLock(){ if(PL.autopilot) return; try{ const r = canvas.requestPointerLock({ unadjustedMovement:true }); if(r && r.catch) r.catch(() => { try{ canvas.requestPointerLock(); }catch(e){} }); }catch(e){} }
document.addEventListener('pointerlockchange', () => { PL.locked = document.pointerLockElement === canvas; if(PL.onLock) PL.onLock(PL.locked); });
addEventListener('keydown', e => {
  if(e.repeat) return;
  PL.keys.add(e.code);
  const f = G.me; if(!f || G.state !== 'play') return;
  if(e.code === 'KeyR') f.inp.reload = true;
  if(e.code === 'Space') f.inp.jump = true;
  if(e.code === 'KeyV') f.inp.light = true;
  if(e.code === 'KeyF' && PL.pick && f.alive) takeLoot(f, PL.pick);
  if(e.code === 'KeyH') f.inp.heal = true;
  if(e.code === 'Digit1') f.inp.slot = 0;
  if(e.code === 'Digit2') f.inp.slot = 1;
  if(e.code === 'Tab') e.preventDefault();
});
addEventListener('keyup', e => PL.keys.delete(e.code));
addEventListener('blur', () => { PL.keys.clear(); PL.mouse.l = PL.mouse.r = false; });
canvas.addEventListener('mousedown', e => {
  if(!PL.locked){ if(G.state === 'play') requestLock(); return; }
  if(e.button === 0) PL.mouse.l = true;
  if(e.button === 2){ PL.mouse.r = true; if(!PL.aimHold) PL.aimToggle = !PL.aimToggle; }
});
addEventListener('mouseup', e => { if(e.button === 0) PL.mouse.l = false; if(e.button === 2) PL.mouse.r = false; });
canvas.addEventListener('contextmenu', e => e.preventDefault());
addEventListener('wheel', e => { const f = G.me; if(!f || G.state !== 'play' || !PL.locked || f.guns.length < 2) return; f.inp.slot = (f.cur + (e.deltaY > 0 ? 1 : f.guns.length - 1)) % f.guns.length; }, { passive:true });
addEventListener('mousemove', e => { if(!PL.locked) return; PL.dx += e.movementX; PL.dy += e.movementY; });

export function resetView(f){ PL.yaw = f.yaw; PL.pitch = 0; PL.dx = PL.dy = 0; PL.aimToggle = false; PL.watch = null; }
on('spawn', f => { if(f === G.me) resetView(f); });

export function playerInput(dt){
  const f = G.me; if(!f) return;
  const I = f.inp, W = gun(f).W;
  const zoom = 1 + (W.ads.fov - 1) * f.adsK;
  const k = 0.0022 * PL.sens * (1 + (W.ads.sens / Math.max(0.2, W.ads.fov) * zoom - 1) * f.adsK);
  PL.yaw -= PL.dx * k; PL.pitch = clamp(PL.pitch - PL.dy * k, -1.4, 1.4);
  PL.mdx = PL.dx; PL.mdy = PL.dy; PL.dx = PL.dy = 0;
  if(!f.alive || G.state !== 'play'){ I.fire = false; I.aim = false; return; }
  I.mz = (down('fwd') ? 1 : 0) - (down('back') ? 1 : 0);
  I.mx = (down('right') ? 1 : 0) - (down('left') ? 1 : 0);
  I.crouch = down('crouch');
  I.lean = (down('leanR') ? 1 : 0) - (down('leanL') ? 1 : 0);
  I.fire = PL.mouse.l && PL.locked;
  I.aim = (PL.aimHold ? PL.mouse.r : PL.aimToggle) && PL.locked;
  I.sprint = down('sprint');
  I.yaw = PL.yaw; I.pitch = PL.pitch;
  // what F would pick up: the item nearest where you look, within reach
  let best = null, bs = 1e9;
  for(const it of lootNear(f, PICK_R)){
    const dx = it.x - f.x, dz = it.z - f.z, d = Math.hypot(dx, dz), front = (-Math.sin(f.yaw) * dx - Math.cos(f.yaw) * dz) / (d || 1);
    const s_ = d - front * 0.8; if(front > -0.2 && s_ < bs){ bs = s_; best = it; }
  }
  PL.pick = best;
}

on('land', (f, v) => { if(f === G.me) PL.landY.v -= Math.min(4, v * 0.4); });
on('fire', f => {
  if(f !== G.me) return;
  const R = gun(f).W.recoil, k = 1 - f.adsK * 0.35;
  PL.punch.p.v += R.punch * 0.7 * k; PL.punch.y.v += (Math.random() - 0.5) * R.punch * 0.5 * k; PL.punch.r.v += (Math.random() - 0.5) * R.punch * 0.9 * k;
});
on('damage', (t, amt, src) => { if(t !== G.me || !src) return; PL.punch.p.v += 2 + amt * 0.06; PL.punch.r.v += (Math.random() - 0.5) * 4; PL.punch.y.v += (Math.random() - 0.5) * 2; });

const _e = new THREE.Euler(0, 0, 0, 'YXZ');
export function updateCamera(dt){
  const f = G.me; if(!f) return;
  const W = gun(f).W;
  spring(PL.landY, 0, 90, 13, dt);
  for(const s of [PL.punch.p, PL.punch.y, PL.punch.r]) spring(s, 0, 170, 16, dt);
  let x = eyeX(f), y = eyeY(f), z = eyeZ(f), yaw = f.yaw + f.recY, pitch = f.pitch + f.recP, roll = 0;
  if(f.alive){
    const hs = Math.hypot(f.vx, f.vz);
    if(f.ground && hs > 0.4) PL.bobT += hs * dt * 1.25;
    const bk = Math.min(1, hs / 5) * (1 - f.adsK * 0.8) * (f.ground ? 1 : 0.2);
    y += (Math.abs(Math.sin(PL.bobT)) - 0.5) * 0.05 * bk + PL.landY.x * 0.05;
    roll += Math.sin(PL.bobT) * 0.005 * bk;
    const side = (f.vx * Math.cos(f.yaw) - f.vz * Math.sin(f.yaw)) / 6;
    PL.lean = damp(PL.lean || 0, -side * 0.02, 8, dt); roll += PL.lean - f.leanK * 0.2;
    PL.deathT = 0; PL.watch = null;
  } else {
    // death: the view drops and tips over, turns to the killer; later it follows a survivor
    PL.deathT += dt;
    const t = Math.min(1, PL.deathT / 0.8);
    if(PL.deathT < 4){
      y = f.y + 0.25 + (f.eye - 0.25) * (1 - t); roll = t * 0.7; pitch = f.pitch * (1 - t) - 0.1 * t;
      const k = f.lastAttacker;
      if(k && PL.deathT > 0.9){ const want = Math.atan2(-(k.x - f.x), -(k.z - f.z)); PL.deathYaw = PL.deathYaw === undefined ? f.yaw : PL.deathYaw; PL.deathYaw += Math.atan2(Math.sin(want - PL.deathYaw), Math.cos(want - PL.deathYaw)) * Math.min(1, dt * 3); yaw = PL.deathYaw; }
    } else {
      if(!PL.watch || !PL.watch.alive) PL.watch = (f.lastAttacker && f.lastAttacker.alive) ? f.lastAttacker : G.fighters.find(o => o.alive) || null;
      const w = PL.watch;
      if(w){ x = eyeX(w); y = eyeY(w); z = eyeZ(w); yaw = w.yaw + w.recY; pitch = w.pitch + w.recP; roll = 0; }
    }
  }
  if(f.alive) PL.deathYaw = undefined;
  const d2r = Math.PI / 180;
  _e.set(pitch + PL.punch.p.x * d2r, yaw + PL.punch.y.x * d2r, roll + PL.punch.r.x * d2r, 'YXZ');
  camera.quaternion.setFromEuler(_e);
  camera.position.set(x, y, z);
  const base = vfov(baseFov(), camera.aspect), e3 = f.adsK * f.adsK * (3 - 2 * f.adsK);
  const fov = base * (1 + (W.ads.fov - 1) * e3) * (f.sprintT > 0.05 ? 1.05 : 1);
  PL.fov = damp(PL.fov, fov, 16, dt);
  if(Math.abs(camera.fov - PL.fov) > 0.01){ camera.fov = PL.fov; camera.updateProjectionMatrix(); }
  camera.updateMatrixWorld();
}
