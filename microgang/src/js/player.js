// The player: mouse and keyboard → the fighter's input, and the camera: over the shoulder (third person, the default)
// or through the eyes (first person, a setting). Bob, landing dip, recoil kick and punch, aiming zoom, the sniper
// scope's breathing sway. Over the shoulder the shot is steered from the eye to whatever the crosshair covers.
import * as THREE from 'three';
import { G, on } from './state.js';
import { camera, canvas, vfov, baseFov, Q } from './engine.js';
import { gun } from './fighter.js';
import { ray, W as PW } from './phys.js';
import { rayFighters } from './combat.js';
import { clamp, damp, store, sp, spring } from './util.js';

export const PL = { yaw:0, pitch:0, locked:false, keys:new Set(), mouse:{ l:false, r:false }, sens:store.get('sens', 1), aimHold:store.get('aimHold', true),
  dx:0, dy:0, bobT:0, landY:sp(), punch:{ p:sp(), y:sp(), r:sp() }, sway:{ x:0, y:0, t:0, breath:1, held:false }, fov:72, autopilot:false, aimToggle:false, deathT:0 };

// 3: over the shoulder, 1: first person
export const VIEW = { mode:store.get('view', 3) === 1 ? 1 : 3 };
export function setView(v){ VIEW.mode = +v === 1 ? 1 : 3; store.set('view', VIEW.mode); TP.len = -1; }
const TP = { len:-1, scopeK:0, aim:new THREE.Vector3() };
// your own hero is hidden in first person and while looking through the scope
export function ownHidden(){ const f = G.me; return !!f && f.alive && (VIEW.mode === 1 || TP.scopeK > 0.55); }

const KEY = { fwd:['KeyW', 'ArrowUp'], back:['KeyS', 'ArrowDown'], left:['KeyA', 'ArrowLeft'], right:['KeyD', 'ArrowRight'], jump:['Space'], crouch:['KeyC', 'ControlLeft'], sprint:['ShiftLeft', 'ShiftRight'], reload:['KeyR'] };
const down = k => KEY[k].some(c => PL.keys.has(c));

export function requestLock(){ if(PL.autopilot) return; try{ const r = canvas.requestPointerLock({ unadjustedMovement:true }); if(r && r.catch) r.catch(() => { try{ canvas.requestPointerLock(); }catch(e){} }); }catch(e){} }
document.addEventListener('pointerlockchange', () => { PL.locked = document.pointerLockElement === canvas; if(PL.onLock) PL.onLock(PL.locked); });
addEventListener('keydown', e => {
  if(e.repeat) return;
  PL.keys.add(e.code);
  const f = G.me; if(!f || G.state !== 'play') return;
  if(e.code === 'KeyR') f.inp.reload = true;
  if(e.code === 'Digit1') f.inp.slot = 0;
  if(e.code === 'Digit2') f.inp.slot = 1;
  if(e.code === 'KeyQ') f.inp.slot = 1 - f.cur;
  if(e.code === 'Space') f.inp.jump = true;
  if(e.code === 'Tab') e.preventDefault();
  if(e.code === 'KeyV') setView(VIEW.mode === 1 ? 3 : 1);
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
addEventListener('wheel', e => { const f = G.me; if(f && G.state === 'play' && PL.locked) f.inp.slot = 1 - f.cur; }, { passive:true });
addEventListener('mousemove', e => { if(!PL.locked) return; PL.dx += e.movementX; PL.dy += e.movementY; });

export function resetView(f){ PL.yaw = f.yaw; PL.pitch = 0; PL.dx = PL.dy = 0; PL.aimToggle = false; PL.sway.breath = 1; }
on('spawn', f => { if(f === G.me){ resetView(f); TP.len = -1; } });

// read input into the fighter (every frame, before the simulation)
export function playerInput(dt){
  const f = G.me; if(!f) return;
  const I = f.inp, W = gun(f).W;
  // mouse look: slower when aiming (scaled by the zoom so the feel stays the same)
  const zoom = 1 + (W.ads.fov - 1) * f.adsK;
  const k = 0.0022 * PL.sens * (1 + (W.ads.sens / Math.max(0.2, W.ads.fov) * zoom - 1) * f.adsK);
  PL.yaw -= PL.dx * k; PL.pitch = clamp(PL.pitch - PL.dy * k, -1.45, 1.45);
  PL.lookV = Math.hypot(PL.dx, PL.dy) / Math.max(dt, 1e-3);
  PL.mdx = PL.dx; PL.mdy = PL.dy; PL.dx = PL.dy = 0;
  if(!f.alive || G.state !== 'play'){ I.fire = false; I.aim = false; return; }
  I.mz = (down('fwd') ? 1 : 0) - (down('back') ? 1 : 0);
  I.mx = (down('right') ? 1 : 0) - (down('left') ? 1 : 0);
  I.crouch = down('crouch');
  I.fire = PL.mouse.l && PL.locked;
  I.aim = (PL.aimHold ? PL.mouse.r : PL.aimToggle) && PL.locked;
  // sprint (Shift) — while the sniper scope is up, Shift holds your breath instead
  const scoped = W.ads.scope && f.adsK > 0.8;
  I.sprint = down('sprint') && !scoped;
  // scope sway: a slow figure of eight that breath-holding stills for a few seconds
  const S = PL.sway;
  if(scoped){
    S.held = down('sprint') && S.breath > 0;
    S.breath = clamp(S.breath + (S.held ? -dt / 3.5 : dt / 5), 0, 1);
    S.t += dt;
    const a = (S.held ? 0.12 : 1) * (f.crouchK > 0.5 ? 0.55 : 1) * (1 + Math.min(1, Math.hypot(f.vx, f.vz) / 3)) * 0.0045;
    S.x = Math.sin(S.t * 0.9) * a; S.y = Math.sin(S.t * 1.8) * a * 0.6;
  } else { S.x *= 0.9; S.y *= 0.9; S.held = false; S.breath = clamp(S.breath + dt / 5, 0, 1); }
  I.yaw = PL.yaw + S.x; I.pitch = PL.pitch + S.y;
  if(VIEW.mode === 3 && TP.scopeK < 0.5) converge(f, I);
}

// over the shoulder the eye and the camera are in different places: find what the crosshair covers and point the
// shot (from the eye) at it, so bullets land under the crosshair
const _d = new THREE.Vector3();
function converge(f, I){
  const c = camera.position, cp = Math.cos(PL.pitch);
  _d.set(-Math.sin(PL.yaw) * cp, Math.sin(PL.pitch), -Math.cos(PL.yaw) * cp);
  const ex = f.x, ey = f.y + f.eye, ez = f.z;
  // start the search level with the hero, so nothing between the camera and the hero is picked
  const t0 = Math.max(0, (ex - c.x) * _d.x + (ey - c.y) * _d.y + (ez - c.z) * _d.z);
  const ox = c.x + _d.x * t0, oy = c.y + _d.y * t0, oz = c.z + _d.z * t0, far = 260;
  const w = ray(ox, oy, oz, _d.x, _d.y, _d.z, far), tw = w ? w.t : far;
  const h = rayFighters(ox, oy, oz, _d.x, _d.y, _d.z, tw, f);
  let t = h ? h.t : tw;
  if(t < 1.5) t = 30;
  const px = ox + _d.x * t - ex, py = oy + _d.y * t - ey, pz = oz + _d.z * t - ez;
  TP.aim.set(ox + _d.x * t, oy + _d.y * t, oz + _d.z * t);
  I.yaw = Math.atan2(-px, -pz) + PL.sway.x; I.pitch = Math.atan2(py, Math.hypot(px, pz)) + PL.sway.y;
}

on('land', (f, v) => { if(f === G.me) PL.landY.v -= Math.min(4, v * 0.35); });
on('fire', f => {
  if(f !== G.me) return;
  // the camera punch: a quick visual kick on top of the real recoil (it doesn't move the aim)
  const R = gun(f).W.recoil, k = 1 - f.adsK * 0.35;
  PL.punch.p.v += R.punch * 0.6 * k; PL.punch.y.v += (Math.random() - 0.5) * R.punch * 0.5 * k; PL.punch.r.v += (Math.random() - 0.5) * R.punch * 0.8 * k;
});
on('damage', (t, amt, src) => {
  if(t !== G.me || !src) return;
  // flinch away from the hit
  PL.punch.p.v += 1.5 + amt * 0.05; PL.punch.r.v += (Math.random() - 0.5) * 3;
});

const _e = new THREE.Euler(0, 0, 0, 'YXZ');
export function updateCamera(dt){
  const f = G.me; if(!f) return;
  const W = gun(f).W;
  // springs: landing dip, punch
  spring(PL.landY, 0, 90, 13, dt);
  for(const s of [PL.punch.p, PL.punch.y, PL.punch.r]) spring(s, 0, 160, 16, dt);
  // over the shoulder the camera follows the mouse (the hero's aim is steered to the crosshair from it)
  const tp = VIEW.mode === 3 && f.alive;
  let x = f.x, y = f.y + f.eye, z = f.z, yaw = (tp ? PL.yaw : f.yaw) + f.recY, pitch = (tp ? PL.pitch : f.pitch) + f.recP, roll = 0;
  if(f.alive){
    // head bob: steps up and down, a little side sway, much less while aiming
    const hs = Math.hypot(f.vx, f.vz);
    if(f.ground && hs > 0.5) PL.bobT += hs * dt * 0.95;
    const bk = Math.min(1, hs / 5) * (1 - f.adsK * 0.85) * (f.ground ? 1 : 0.2);
    y += (Math.abs(Math.sin(PL.bobT)) - 0.5) * 0.045 * bk + PL.landY.x * 0.05;
    roll += Math.sin(PL.bobT) * 0.004 * bk;
    // strafing leans the view a touch
    const side = (f.vx * Math.cos(f.yaw) - f.vz * Math.sin(f.yaw)) / 6;
    PL.lean = damp(PL.lean || 0, -side * 0.025, 8, dt); roll += PL.lean;
    PL.deathT = 0;
  } else {
    // death: the view drops and tips over, then turns to whoever did it
    PL.deathT += dt;
    const t = Math.min(1, PL.deathT / 0.7);
    y = f.y + f.eye * (1 - t * 0.75); roll = t * 0.55; pitch = f.pitch * (1 - t) - 0.15 * t;
    const k = f.lastAttacker;
    if(k && k.alive && PL.deathT > 0.8){ const want = Math.atan2(-(k.x - f.x), -(k.z - f.z)); PL.deathYaw = PL.deathYaw === undefined ? f.yaw : PL.deathYaw; PL.deathYaw += Math.atan2(Math.sin(want - PL.deathYaw), Math.cos(want - PL.deathYaw)) * Math.min(1, dt * 3); yaw = PL.deathYaw; }
  }
  if(f.alive) PL.deathYaw = undefined;
  const d2r = Math.PI / 180;
  const cy = yaw + PL.punch.y.x * d2r, cpch = pitch + PL.punch.p.x * d2r;
  _e.set(cpch, cy, (roll + PL.punch.r.x * d2r) * (VIEW.mode === 1 ? 1 : 0.3), 'YXZ');
  camera.quaternion.setFromEuler(_e);
  // over the shoulder: a boom behind and to the right of the head; it pulls in when aiming and when something is in
  // the way; the sniper scope takes you to the eye
  const scopeT = VIEW.mode === 3 && W.ads.scope ? clamp((f.adsK - 0.35) / 0.55, 0, 1) : 0;
  TP.scopeK = f.alive ? scopeT * scopeT * (3 - 2 * scopeT) : 0;
  if(VIEW.mode === 3 && TP.scopeK < 1){
    const ads = f.alive ? f.adsK * f.adsK * (3 - 2 * f.adsK) : 0;
    // aiming moves the camera in a little and out over the shoulder, so the big head doesn't fill the view
    const right = 0.85 + 0.2 * ads, up = 0.45 + 0.02 * ads, back = (f.alive ? 3.5 : 4.4) - 0.95 * ads;
    const px = f.x, py = f.y + (f.alive ? f.h * 0.84 : 0.9), pz = f.z;
    const sy = Math.sin(cy), cyy = Math.cos(cy), sp_ = Math.sin(cpch), cp_ = Math.cos(cpch);
    // camera axes: right (cos, 0, -sin), back = -forward
    const rx = cyy, rz = -sy, bx = Math.sin(cy) * cp_, by = -sp_, bz = Math.cos(cy) * cp_;
    // the shoulder point first (sideways from the head), then the boom back from it
    let sx = px + rx * right, sy2 = py + up, sz = pz + rz * right;
    const hs = ray(px, py, pz, rx, 0, rz, right + 0.25);
    if(hs){ const k = Math.max(0, hs.t - 0.25); sx = px + rx * k; sz = pz + rz * k; }
    let len = back;
    const hb = ray(sx, sy2, sz, bx, by, bz, back + 0.3);
    if(hb) len = Math.max(0.35, hb.t - 0.3);
    TP.len = TP.len < 0 || len < TP.len ? len : damp(TP.len, len, 5, dt);
    let cx = sx + bx * TP.len, cy2 = sy2 + by * TP.len, cz = sz + bz * TP.len;
    const gh = PW.groundH ? PW.groundH(cx, cz) : -1e9;
    if(cy2 < gh + 0.3) cy2 = gh + 0.3;
    x = x + (cx - x) * (1 - TP.scopeK); y = y + (cy2 - y) * (1 - TP.scopeK); z = z + (cz - z) * (1 - TP.scopeK);
  }
  camera.position.set(x, y, z);
  // field of view: the setting, narrowed by aiming (the scope narrows it a lot; over the shoulder a little less)
  const base = vfov(baseFov(), camera.aspect), e3 = f.adsK * f.adsK * (3 - 2 * f.adsK);
  const zk = VIEW.mode === 3 && !W.ads.scope ? 0.6 : 1;
  const fov = base * (1 + (W.ads.fov - 1) * e3 * zk) * (f.sprintT > 0.05 ? 1.04 : 1);
  PL.fov = damp(PL.fov, fov, 18, dt);
  if(Math.abs(camera.fov - PL.fov) > 0.01){ camera.fov = PL.fov; camera.updateProjectionMatrix(); }
  camera.updateMatrixWorld();
}
