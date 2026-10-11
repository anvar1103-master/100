// The player's controls and the over-the-shoulder camera.
//   PC: WASD to run, the mouse turns the camera, the crosshair in the middle of the screen is where you shoot.
//   Phones: left thumb runs, dragging anywhere on the right turns the camera; the attack button fires at the
//   crosshair, a quick tap aims at the nearest enemy you can see.
import * as THREE from 'three';
import { camera, canvas, scene } from './engine.js';
import { G } from './state.js';
import { $, clamp, angDiff, TOUCH, store, lerp } from './util.js';
import { canAttack, canSee, SHOT_Y, bouncePath, pathHits } from './combat.js';
import { segHit, A, tileAtXZ, tileHeight } from './arena.js';
import { unlockAudio } from './audio.js';
import { goalOf } from './football.js';

export const CAM = { yaw:Math.PI, pitch:-0.08, x:0, z:0, dist:3.5, pivotH:1.6, shoulder:0.6, sens:store.get('sens', 1), turnTo:null, zoom:0 };
// the sniper's scope: the right mouse button (or Shift) on a computer, the scope button on a phone
const hasScope = () => !!(G.me && G.me.H.attack.scope);
const PITCH_MIN = -0.6, PITCH_MAX = 0.38;
const keys = {}, mouse = { l:false, r:false, x:0, y:0 };
export let locked = false;
export const T = { move:null, atk:null, sup:null, cam:null };   // active touches
export const AIM = { x:0, y:0, z:0, foe:null, inRange:false, gx:0, gz:0, groundHit:false };

function look(dx, dy, k){
  k *= 1 - CAM.zoom * 0.6;   // finer aim through the scope
  CAM.yaw -= dx * k * CAM.sens;
  CAM.pitch = clamp(CAM.pitch - dy * k * CAM.sens, PITCH_MIN, PITCH_MAX);
  CAM.turnTo = null;
}

// ---------------- keyboard & mouse ----------------
addEventListener('keydown', e => {
  keys[e.code] = true;
  if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code) && G.state !== 'menu') e.preventDefault();
  if((e.code === 'KeyE' || e.code === 'Space') && G.me) G.me.wantSup = true;
});
addEventListener('keyup', e => { keys[e.code] = false; });
addEventListener('blur', () => { for(const k in keys) keys[k] = false; mouse.l = mouse.r = false; });
canvas.addEventListener('mousedown', e => {
  unlockAudio();
  if(TOUCH) return;
  if(inMatch() && !locked && canvas.requestPointerLock){ try{ const p = canvas.requestPointerLock(); if(p && p.catch) p.catch(() => {}); }catch(err){} }
  if(e.button === 0) mouse.l = true;
  if(e.button === 2 && G.me){ if(hasScope()) mouse.r = true; else G.me.wantSup = true; }
});
addEventListener('mouseup', e => { if(e.button === 0) mouse.l = false; if(e.button === 2) mouse.r = false; });
canvas.addEventListener('contextmenu', e => e.preventDefault());
addEventListener('mousemove', e => {
  // without pointer lock the camera still follows the mouse while it moves over the field
  if((locked || (inMatch() && !TOUCH)) && !G.paused) look(e.movementX, e.movementY, 0.0026);
  mouse.x = e.clientX; mouse.y = e.clientY;
});
let everLocked = false;
document.addEventListener('pointerlockchange', () => { locked = document.pointerLockElement === canvas; if(locked) everLocked = true; });
export function lockHint(){ const el = $('lockhint'); const v = !locked && !everLocked && !TOUCH && G.state === 'play' && G.match && G.match.t < 12 && G.me && G.me.alive && !G.paused && !mouse.l; if(el.hidden === v) el.hidden = !v; }
export function releaseLock(){ if(document.exitPointerLock && locked) document.exitPointerLock(); }
const inMatch = () => G.state === 'play' || G.state === 'countdown';

// ---------------- touch ----------------
function stickAt(x, y){ const b = $('stick'); b.style.left = x + 'px'; b.style.top = y + 'px'; b.hidden = false; }
function onTouchStart(e){
  unlockAudio();
  if(!inMatch() || G.paused) return;
  let game = false;
  for(const t of e.changedTouches){
    // pause and every other interface button keep their normal tap; only the battle field drives the stick and camera
    if(t.target.closest && t.target.closest('button:not([data-btn]), input, .screen')) continue;
    game = true;
    const tgt = t.target.closest && t.target.closest('[data-btn]');
    if(tgt){
      const kind = tgt.dataset.btn;
      if(kind === 'scope'){ T.scopeOn = !T.scopeOn; tgt.classList.toggle('on', T.scopeOn); continue; }
      if((kind === 'atk' && !T.atk) || (kind === 'sup' && !T.sup && G.me && G.me.charge >= 1)){
        T[kind] = { id:t.identifier, x:t.clientX, y:t.clientY, moved:0, t0:performance.now(), el:tgt };
        tgt.classList.add('on');
      }
      continue;
    }
    if(t.clientX < innerWidth * 0.42 && !T.move){ T.move = { id:t.identifier, x0:t.clientX, y0:t.clientY, dx:0, dy:0 }; stickAt(t.clientX, t.clientY); }
    else if(!T.cam) T.cam = { id:t.identifier, x:t.clientX, y:t.clientY };
  }
  if(game) e.preventDefault();
}
// drop every held touch (pause, end of match): the stick and buttons start fresh afterwards
export function resetTouch(){
  for(const k of ['atk', 'sup']) if(T[k]){ T[k].el.classList.remove('on'); T[k] = null; }
  T.move = T.cam = null; $('stick').hidden = true; $('knob').style.transform = '';
  T.scopeOn = false; $('b-scope').classList.remove('on'); mouse.r = false;
}
const TOUCH_K = 0.0055;
function onTouchMove(e){
  if(!T.move && !T.cam && !T.atk && !T.sup) return;
  for(const t of e.changedTouches){
    if(T.move && t.identifier === T.move.id){
      let dx = t.clientX - T.move.x0, dy = t.clientY - T.move.y0; const d = Math.hypot(dx, dy), R = 56;
      if(d > R){ T.move.x0 += dx * (1 - R / d); T.move.y0 += dy * (1 - R / d); dx = t.clientX - T.move.x0; dy = t.clientY - T.move.y0; stickAt(T.move.x0, T.move.y0); }
      T.move.dx = dx / R; T.move.dy = dy / R;
      $('knob').style.transform = `translate(${dx}px,${dy}px)`;
      continue;
    }
    if(T.cam && t.identifier === T.cam.id){ look(t.clientX - T.cam.x, t.clientY - T.cam.y, TOUCH_K); T.cam.x = t.clientX; T.cam.y = t.clientY; continue; }
    // dragging a held attack button also turns the camera, so you can aim and shoot with one thumb
    for(const k of ['atk', 'sup']){
      const B = T[k]; if(!B || t.identifier !== B.id) continue;
      const dx = t.clientX - B.x, dy = t.clientY - B.y;
      B.moved += Math.abs(dx) + Math.abs(dy);
      look(dx, dy, TOUCH_K * 0.8); B.x = t.clientX; B.y = t.clientY;
    }
  }
  e.preventDefault();
}
function onTouchEnd(e){
  for(const t of e.changedTouches){
    if(T.move && t.identifier === T.move.id){ T.move = null; $('stick').hidden = true; $('knob').style.transform = ''; }
    if(T.cam && t.identifier === T.cam.id) T.cam = null;
    for(const k of ['atk', 'sup']){
      const B = T[k]; if(!B || t.identifier !== B.id) continue;
      B.el.classList.remove('on');
      const me = G.me;
      if(me && me.alive){
        // a quick tap: aim at the nearest enemy we can see; a drag: shoot where the crosshair is
        const tap = B.moved < 14 && performance.now() - B.t0 < 350;
        const pt = (tap && autoTarget(k === 'sup')) || aimFor(me, k === 'sup');
        me.inp.tx = pt.x; me.inp.tz = pt.z;
        if(k === 'sup') me.inp.sup = true; else me.inp.fire = true;
        me.inp.locked = true;
        if(tap && pt.foe) CAM.turnTo = Math.atan2(pt.x - me.x, pt.z - me.z);
      }
      T[k] = null;
    }
  }
}
document.addEventListener('touchstart', onTouchStart, { passive:false });
document.addEventListener('touchmove', onTouchMove, { passive:false });
document.addEventListener('touchend', onTouchEnd); document.addEventListener('touchcancel', onTouchEnd);

// tap: the nearest enemy we can see, preferring the ones in front of the camera
export function autoTarget(sup){
  const me = G.me, W = sup ? me.H.super : me.H.attack;
  // with the ball a quick tap shoots at the other goal
  if(G.ball && G.ball.holder === me){ const g = goalOf(1 - me.team); return { x:g.x, z:g.z, foe:null }; }
  const lob = W.kind === 'lob' || W.kind === 'barrage' || W.kind === 'beam';
  let best = null, bs = 1e9;
  for(const o of G.fighters){
    if(!o.alive || o.team === me.team || !canSee(me, o)) continue;
    const d = Math.hypot(o.x - me.x, o.z - me.z);
    if(d > W.range * 1.15) continue;
    const off = Math.abs(angDiff(CAM.yaw, Math.atan2(o.x - me.x, o.z - me.z)));
    const blocked = !lob && segHit(me.x, me.z, o.x, o.z) >= 0;
    const score = d + off * 4 + (blocked ? 10 : 0);
    if(score < bs){ bs = score; best = o; }
  }
  if(!best) return null;
  if(W.kind === 'bounce' && segHit(me.x, me.z, best.x, best.z) >= 0){ const b = bankShot(me, best, W); if(b) return { x:me.x + Math.sin(b) * 6, z:me.z + Math.cos(b) * 6, foe:best }; }
  const d = Math.hypot(best.x - me.x, best.z - me.z), tl = W.kind === 'lob' || W.kind === 'barrage' ? W.flight * 0.8 : d / (W.speed || 40);
  return { x:best.x + best.vx * tl * 0.7, z:best.z + best.vz * tl * 0.7, foe:best };
}
// a ricochet that reaches the target: try directions around it and keep the one whose path passes closest to straight
export function bankShot(f, o, W){
  const base = Math.atan2(o.x - f.x, o.z - f.z);
  for(let i = 1; i <= 36; i++){
    const a = base + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * 0.17;
    if(pathHits(bouncePath(f.x, f.z, a, W.range, W.bounces), o.x, o.z, o.H.rad + 0.1)) return a;
  }
  return null;
}
// where a weapon goes when fired at the crosshair: lobs land where the crosshair meets the ground
function aimFor(me, sup){
  const W = sup ? me.H.super : me.H.attack;
  if(W.kind === 'lob' || W.kind === 'barrage'){
    const a = Math.atan2(AIM.gx - me.x, AIM.gz - me.z);
    const d = AIM.groundHit ? clamp(Math.hypot(AIM.gx - me.x, AIM.gz - me.z), 1.5, W.range) : W.range;
    return { x:me.x + Math.sin(a) * d, z:me.z + Math.cos(a) * d };
  }
  return { x:AIM.x, z:AIM.z };
}

// ---------------- the crosshair ray ----------------
const camFwd = new THREE.Vector3();
function castAim(me){
  const o = camera.position, d = camFwd;
  // the ground under the crosshair (lobs) — far away when looking up
  AIM.groundHit = d.y < -0.01;
  const tg = AIM.groundHit ? (o.y - 0.05) / -d.y : 40;
  AIM.gx = o.x + d.x * Math.min(tg, 40); AIM.gz = o.z + d.z * Math.min(tg, 40);
  // first wall, rock or ground along the ray — starting level with the hero: the see-through hedges between the
  // camera and the hero must not catch the shot
  const s0 = Math.max(0.6, (me.x - o.x) * d.x + (me.z - o.z) * d.z);
  let t = Math.min(tg, 40);
  for(let s = s0; s < t; s += 0.2){
    const x = o.x + d.x * s, y = o.y + d.y * s, z = o.z + d.z * s;
    if(y < tileHeight(tileAtXZ(x, z))){ t = s; break; }
  }
  // enemies on the ray (vertical cylinders)
  AIM.foe = null;
  const dl = Math.hypot(d.x, d.z) || 1e-6;
  for(const f of G.fighters){
    if(!f.alive || f.team === me.team || !f.seen) continue;
    const px = f.x - o.x, pz = f.z - o.z, along = (px * d.x + pz * d.z) / (dl * dl);
    if(along <= s0 - 0.6 || along >= t) continue;
    const cx = o.x + d.x * along - f.x, cz = o.z + d.z * along - f.z, y = o.y + d.y * along;
    if(cx * cx + cz * cz < (f.H.rad + 0.15) ** 2 && y > -0.2 && y < f.H.height + (f.H.hover || 0) + 0.3){ t = along; AIM.foe = f; }
  }
  AIM.x = o.x + d.x * t; AIM.y = o.y + d.y * t; AIM.z = o.z + d.z * t;
  // a point right next to the hero gives no direction: shoot along the camera instead
  if(Math.hypot(AIM.x - me.x, AIM.z - me.z) < 1.2){ AIM.x = me.x + Math.sin(CAM.yaw) * 8; AIM.z = me.z + Math.cos(CAM.yaw) * 8; }
  const W = me.H.attack;
  AIM.inRange = !!AIM.foe && Math.hypot(AIM.foe.x - me.x, AIM.foe.z - me.z) < W.range + 0.5;
}

// ---------------- per-frame: input → the hero's intent ----------------
export function playerInput(dt){
  const me = G.me; if(!me) return;
  const inp = me.inp;
  let fx = 0, fz = 0;
  if(T.move){ fx = -T.move.dy; fz = T.move.dx; }
  else { fx = (keys.KeyW || keys.ArrowUp ? 1 : 0) - (keys.KeyS || keys.ArrowDown ? 1 : 0); fz = (keys.KeyD || keys.ArrowRight ? 1 : 0) - (keys.KeyA || keys.ArrowLeft ? 1 : 0); }
  const l = Math.hypot(fx, fz); if(l > 1){ fx /= l; fz /= l; }
  const sy = Math.sin(CAM.yaw), cy = Math.cos(CAM.yaw);
  // camera forward is (sin yaw, cos yaw); right is (-cos yaw, sin yaw)
  inp.mx = sy * fx - cy * fz; inp.mz = cy * fx + sy * fz;
  // a tap-aimed shot swings the camera toward its target
  if(CAM.turnTo !== null){ const d = angDiff(CAM.yaw, CAM.turnTo); CAM.yaw += d * Math.min(1, dt * 8); if(Math.abs(d) < 0.02) CAM.turnTo = null; }
  castAim(me);
  if(!inp.locked){ const p = aimFor(me, false); inp.tx = p.x; inp.tz = p.z; }
  inp.locked = false;
  inp.aim = Math.atan2(inp.tx - me.x, inp.tz - me.z);
  me.aiming = true;
  me.scope = hasScope() && (mouse.r || keys.ShiftLeft || keys.ShiftRight || !!T.scopeOn);
  if(!TOUCH){
    if(mouse.l && canAttack(me)){ const p = aimFor(me, false); inp.tx = p.x; inp.tz = p.z; inp.fire = true; }
    if(me.wantSup){ me.wantSup = false; if(me.charge >= 1){ const p = aimFor(me, true); inp.tx = p.x; inp.tz = p.z; inp.sup = true; } }
  }
}

// ---------------- over-the-shoulder camera ----------------
const target = new THREE.Vector3();
const outside = ch => ch === 'X';
export function updateCamera(dt){
  const me = G.me; if(!me) return;
  const k = 1 - Math.exp(-dt * 14);
  CAM.x = lerp(CAM.x, me.x, k); CAM.z = lerp(CAM.z, me.z, k);
  const sy = Math.sin(CAM.yaw), cy = Math.cos(CAM.yaw), cp = Math.cos(CAM.pitch), sp = Math.sin(CAM.pitch);
  camFwd.set(sy * cp, sp, cy * cp);
  const rx = -cy, rz = sy;                                    // right of the camera
  const px = CAM.x + rx * CAM.shoulder * 0.4, pz = CAM.z + rz * CAM.shoulder * 0.4, py = CAM.pivotH;
  // wanted spot: behind and a little to the right. Hedges in the way turn see-through (arena.js), so the camera
  // keeps its distance; it only pulls in to stay inside the fence
  // the scope pulls the camera in over the shoulder and narrows the view
  CAM.zoom += ((me.scope && me.alive ? 1 : 0) - CAM.zoom) * Math.min(1, dt * 12);
  const base = camera.userData.baseFov || 55, fov = base * (1 - CAM.zoom * 0.55);
  if(Math.abs(camera.fov - fov) > 0.01){ camera.fov = fov; camera.updateProjectionMatrix(); }
  let dist = CAM.dist * (1 - CAM.zoom * 0.55);
  const wx = px - camFwd.x * dist + rx * CAM.shoulder, wz = pz - camFwd.z * dist + rz * CAM.shoulder;
  const hit = segHit(px, pz, wx, wz, outside);
  let cx = wx, cz = wz, cyy = py - camFwd.y * dist + 0.25;
  if(hit >= 0){ const kk = Math.max(0.3, hit - 0.12); cx = px + (wx - px) * kk; cz = pz + (wz - pz) * kk; cyy = py + (cyy - py) * kk; }
  cyy = Math.max(0.35, cyy);
  if(G.shake > 0){ const s = G.shake * 0.12; cx += (Math.random() - 0.5) * s; cyy += (Math.random() - 0.5) * s; cz += (Math.random() - 0.5) * s; G.shake = Math.max(0, G.shake - dt * 2.5); }
  camera.position.set(cx, cyy, cz);
  target.set(cx + camFwd.x * 10, cyy + camFwd.y * 10, cz + camFwd.z * 10);
  camera.lookAt(target);
}

// ---------------- the lob arc: dots along the flight and a ring where the bomb lands ----------------
const guide = new THREE.Group(); guide.visible = false; scene.add(guide);
const gMat = new THREE.MeshBasicMaterial({ color:'#FFFFFF', transparent:true, opacity:0.75, depthWrite:false, depthTest:false });
const gSup = new THREE.MeshBasicMaterial({ color:'#FFD23F', transparent:true, opacity:0.85, depthWrite:false, depthTest:false });
const ringG = new THREE.RingGeometry(0.86, 1, 40); ringG.rotateX(-Math.PI / 2);
const gRing = new THREE.Mesh(ringG, gMat); gRing.renderOrder = 6; guide.add(gRing);
const dotG = new THREE.SphereGeometry(0.06, 8, 6);
const dots = []; for(let i = 0; i < 16; i++){ const d = new THREE.Mesh(dotG, gMat); d.renderOrder = 6; guide.add(d); dots.push(d); }
export function updateGuide(){
  const me = G.me;
  const show = me && me.alive && G.state === 'play' && (!TOUCH || T.atk || T.sup);
  const sup = TOUCH ? !!T.sup : me && me.charge >= 1 && keys.KeyE;
  const W = me && (sup ? me.H.super : me.H.attack);
  const lob = W && (W.kind === 'lob' || W.kind === 'barrage');
  if(show && W && W.kind === 'bounce') return bounceGuide(me, W, sup);
  guide.visible = !!(show && lob); if(!guide.visible) return;
  gRing.visible = true; dots.forEach(d => { d.visible = true; });
  const mat = sup ? gSup : gMat; mat.opacity = canAttack(me) || sup ? 0.8 : 0.3;
  gRing.material = mat; dots.forEach(d => d.material = mat);
  const p = aimFor(me, sup), d = Math.hypot(p.x - me.x, p.z - me.z), h = 3.2 + d * 0.2;
  gRing.position.set(p.x, 0.07, p.z); gRing.scale.setScalar(W.radius);
  dots.forEach((dt, i) => { const k = (i + 1) / (dots.length + 1); dt.position.set(lerp(me.x, p.x, k), lerp(1.0, 0.15, k) + Math.sin(k * Math.PI) * h, lerp(me.z, p.z, k)); });
}
export const lobHeight = d => 3.2 + d * 0.2;
// the ricochet guide: dots along the path the pebble will take, the ring hidden
function bounceGuide(me, W, sup){
  guide.visible = true; gRing.visible = false;
  const mat = sup ? gSup : gMat; mat.opacity = canAttack(me) || sup ? 0.8 : 0.3; dots.forEach(d => d.material = mat);
  const p = aimFor(me, sup), pts = bouncePath(me.x, me.z, Math.atan2(p.x - me.x, p.z - me.z), Math.min(W.range, 14), W.bounces);
  let total = 0; for(let i = 1; i < pts.length; i++) total += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
  const gap = Math.max(0.55, total / dots.length);
  let seg = 1, along = 0, left = gap * 0.6;
  for(const dt of dots){
    while(seg < pts.length){ const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b.x - a.x, b.z - a.z); if(along + left <= L){ along += left; break; } left -= L - along; along = 0; seg++; }
    if(seg >= pts.length){ dt.visible = false; continue; }
    const a = pts[seg - 1], b = pts[seg], L = Math.hypot(b.x - a.x, b.z - a.z) || 1;
    dt.visible = true; dt.position.set(a.x + (b.x - a.x) * along / L, SHOT_Y, a.z + (b.z - a.z) * along / L); left = gap;
  }
}
