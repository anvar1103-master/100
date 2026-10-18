// A fighter (the player or a bot — same rules for both): walking, sprinting, crouching, leaning round corners, a hop
// onto desks, the flashlight on the gun, and the gun itself: trigger, rate of fire, bloom, recoil, reloads, swapping
// between two slots. Ammo sits in a pouch by calibre; armour (vest, helmet), medkits and bandages. Firing itself is
// in combat.js. Health comes back only from a medkit or a bandage (it is a battle royale).
import { moveChar, GRAV, ray } from './phys.js';
import { WEAPONS, AMMO, coneOf } from './weapons.js';
import { G, emit } from './state.js';
import { clamp, damp, gauss } from './util.js';

// the office people (models in soldiers.js)
export const LOOKS = ['ch12', 'ch23', 'ch33'];
export const MOVE = { run:4.1, sprint:6.2, crouch:1.9, accel:32, airAccel:6, jump:4.9 };
export const H_STAND = 1.8, H_CROUCH = 1.25, EYE_STAND = 1.64, EYE_CROUCH = 1.1, LEAN = 0.38;
export const HP_MAX = 100;
// using a medkit / a bandage: seconds, health, how many you can carry
export const MEDS = { medkit:{ t:4, hp:50, max:3 }, bandage:{ t:2.2, hp:15, max:6 } };

let nextId = 1;
export const newInput = () => ({ mx:0, mz:0, jump:false, crouch:false, sprint:false, fire:false, aim:false, reload:false, slot:-1, lean:0, light:false, heal:false, yaw:0, pitch:0 });
export function gunState(id, mag){ const W = WEAPONS[id]; return { id, W, mag:mag ?? W.mag }; }
const pouch = () => { const a = {}; for(const k in AMMO) a[k] = 0; return a; };

export function makeFighter(o){
  return {
    id:nextId++, name:o.name, look:o.look || LOOKS[0], bot:!!o.bot,
    x:0, y:0, z:0, vx:0, vy:0, vz:0, r:0.34, h:H_STAND, ground:true,
    yaw:0, pitch:0, crouchK:0, eye:EYE_STAND, leanK:0, lean:0, light:false,
    alive:false, hp:HP_MAX, deadT:0, sinceHit:99, lastAttacker:null, damagers:new Map(), lastHit:null,
    guns:(o.guns || ['ak']).map(id => gunState(id)), cur:0, next:-1, ammo:pouch(), armor:0, armorLv:0, helmet:false, meds:{ medkit:0, bandage:0 }, use:null,
    fireCD:0, trig:false, reload:null, equipT:0, cycleT:0, sprintT:0, bloom:0, adsK:0, recP:0, recY:0, shots:0, lastShotT:-9,
    kills:0, deaths:0, heads:0, place:0, dmgDone:0,
    inp:newInput(), bot_:null, model:null, stepT:0,
  };
}
export const gun = f => f.guns[f.cur];
// rounds for this gun left in the pouch
export const reserve = (f, g = gun(f)) => f.ammo[g.W.ammo] || 0;
// the start: one gun with a full magazine and a spare one or two, nothing else
export function giveLoadout(f, id){
  f.guns = [gunState(id)]; f.cur = 0; f.next = -1; f.ammo = pouch(); f.ammo[WEAPONS[id].ammo] = WEAPONS[id].spawnAmmo;
  f.armor = 0; f.armorLv = 0; f.helmet = false; f.meds = { medkit:0, bandage:0 }; f.use = null;
}

export function spawnFighter(f, sp, yaw){
  Object.assign(f, { x:sp.x, y:sp.y || 0, z:sp.z, vx:0, vy:0, vz:0, yaw, pitch:0, alive:true, hp:HP_MAX, deadT:0, sinceHit:99,
    lastAttacker:null, reload:null, equipT:0.3, cycleT:0, bloom:0, adsK:0, recP:0, recY:0, shots:0, crouchK:0, leanK:0, lean:0, h:H_STAND, eye:EYE_STAND, cur:0, next:-1, trig:false, light:false, use:null });
  f.damagers.clear();
  f.inp.yaw = yaw; f.inp.pitch = 0;
  emit('spawn', f);
}

export function stepFighter(f, dt){
  if(!f.alive){ f.deadT += dt; return; }
  const I = f.inp, g = gun(f), W = g.W;
  f.yaw = I.yaw; f.pitch = clamp(I.pitch, -1.4, 1.4);
  f.sinceHit += dt;
  if(I.light){ f.light = !f.light; I.light = false; emit('light', f); }

  // ---- crouch, lean ----
  f.crouchK = damp(f.crouchK, I.crouch ? 1 : 0, 12, dt);
  f.h = H_STAND + (H_CROUCH - H_STAND) * f.crouchK;
  f.eye = EYE_STAND + (EYE_CROUCH - EYE_STAND) * f.crouchK;
  // leaning stops short of the wall beside you
  let leanTo = clamp(I.lean, -1, 1);
  if(leanTo){ const rx = Math.cos(f.yaw) * leanTo, rz = -Math.sin(f.yaw) * leanTo, h = ray(f.x, f.y + f.eye, f.z, rx, 0, rz, LEAN + 0.15); if(h) leanTo *= Math.max(0, (h.t - 0.15) / LEAN); }
  f.leanK = damp(f.leanK, leanTo, 10, dt); f.lean = f.leanK * LEAN;

  // ---- aim down sights ----
  const canAds = I.aim && !f.reload && !f.use && f.equipT <= 0 && f.sprintT <= 0;
  f.adsK = clamp(f.adsK + (canAds ? 1 : -1) * dt / W.ads.time, 0, 1);

  // ---- moving ----
  const mx = I.mx, mz = I.mz, ml = Math.hypot(mx, mz) || 1;
  const sprinting = I.sprint && mz > 0.3 && f.ground && f.crouchK < 0.3 && f.adsK < 0.2 && !(I.fire && g.mag > 0 && !f.reload) && !I.lean && !f.use;
  f.sprintT = sprinting ? Math.min(0.25, f.sprintT + dt) : Math.max(0, f.sprintT - dt * 1.5);
  let speed = sprinting ? MOVE.sprint : MOVE.run;
  speed = speed + (MOVE.crouch - speed) * f.crouchK;
  speed *= W.moveK * (1 + (W.ads.move - 1) * f.adsK) * (f.reload ? 0.85 : 1) * (f.use ? 0.5 : 1);
  const sy = Math.sin(f.yaw), cy = Math.cos(f.yaw);
  const wx = (-sy * mz + cy * mx) / Math.max(1, ml), wz = (-cy * mz - sy * mx) / Math.max(1, ml);
  const tx = wx * speed, tz = wz * speed;
  if(f.ground){
    const a = MOVE.accel * dt, dx = tx - f.vx, dz = tz - f.vz, dl = Math.hypot(dx, dz);
    if(dl > a){ f.vx += dx / dl * a; f.vz += dz / dl * a; } else { f.vx = tx; f.vz = tz; }
    if(I.jump && f.crouchK < 0.5){ f.vy = MOVE.jump; f.ground = false; emit('jump', f); }
  } else {
    const a = MOVE.airAccel * dt; f.vx += clamp(tx - f.vx, -a, a); f.vz += clamp(tz - f.vz, -a, a);
  }
  I.jump = false;
  f.vy -= GRAV * dt;
  const vyBefore = f.vy, wasGround = f.ground;
  moveChar(f, dt);
  if(f.ground && !wasGround && -vyBefore > 3) emit('land', f, -vyBefore);
  const hs = Math.hypot(f.vx, f.vz);
  if(f.ground && hs > 0.8){ f.stepT += hs * dt; const stride = sprinting ? 1.7 : f.crouchK > 0.5 ? 1.0 : 1.35; if(f.stepT > stride){ f.stepT -= stride; emit('step', f, sprinting); } }

  // ---- the gun ----
  f.fireCD -= dt; f.cycleT = Math.max(0, f.cycleT - dt);
  f.bloom = Math.max(0, f.bloom - W.spread.recover * dt * (I.fire ? 0.3 : 1));
  const since = G.time - f.lastShotT;
  if(since > 0.1){ const k = 1 - Math.exp(-W.recoil.recover * dt); f.recP -= f.recP * k; f.recY -= f.recY * k; }
  if(since > 0.35) f.shots = 0;
  if(I.slot >= 0 && I.slot < f.guns.length && I.slot !== f.cur && f.next < 0){ f.next = I.slot; f.equipT = 0.25; f.reload = null; f.use = null; f.adsK = 0; emit('lower', f); }
  I.slot = -1;
  // ---- medkit / bandage: the gun goes down for a few seconds, firing cancels it ----
  if(I.heal && !f.use && f.hp < HP_MAX){ const kind = f.meds.medkit && (f.hp <= HP_MAX - 40 || !f.meds.bandage) ? 'medkit' : f.meds.bandage ? 'bandage' : null;
    if(kind){ f.use = { kind, t:0, total:MEDS[kind].t }; f.reload = null; f.adsK = 0; emit('use', f, kind); } }
  I.heal = false;
  if(f.use){
    if(I.fire && !f.trig){ f.use = null; emit('useCancel', f); }
    else if((f.use.t += dt) >= f.use.total){ const k = f.use.kind; f.meds[k]--; f.hp = Math.min(HP_MAX, f.hp + MEDS[k].hp); f.use = null; emit('healed', f, k); }
    f.trig = I.fire; return;
  }
  if(f.equipT > 0){
    f.equipT -= dt;
    if(f.equipT <= 0 && f.next >= 0){ f.cur = f.next; f.next = -1; f.equipT = gun(f).W.equip; f.bloom = 0; emit('equip', f); }
    f.trig = I.fire; return;
  }
  if(I.reload && !f.reload && g.mag < W.mag && reserve(f, g) > 0) startReload(f);
  I.reload = false;
  if(f.reload){
    const R = f.reload; R.t += dt;
    if(W.reload.kind === 'shell'){
      if(I.fire && !f.trig && g.mag > 0 && R.stage === 'shells'){ R.stage = 'end'; R.t = 0; }
      if(R.stage === 'start' && R.t >= W.reload.start){ R.stage = 'shells'; R.t = 0; }
      else if(R.stage === 'shells' && R.t >= W.reload.shell){ R.t = 0; g.mag++; f.ammo[W.ammo]--; emit('shell', f); if(g.mag >= W.mag || reserve(f, g) <= 0) R.stage = 'end'; }
      else if(R.stage === 'end' && R.t >= W.reload.end){ f.reload = null; emit('reloaded', f); }
    } else if(R.t >= R.total){
      const take = Math.min(W.mag - g.mag, reserve(f, g)); g.mag += take; f.ammo[W.ammo] -= take; f.reload = null; emit('reloaded', f);
    }
    f.trig = I.fire; return;
  }
  if(f.cycleT > 0){ f.trig = I.fire; return; }
  const ready = f.fireCD <= 0 && f.sprintT <= 0.05;
  if(I.fire && ready && (W.auto || !f.trig)){
    if(g.mag > 0){
      g.mag--; f.fireCD = 60 / W.rpm; f.shots++; f.lastShotT = G.time;
      emit('fire', f);
      const R = W.recoil, pat = R.pattern ? R.pattern[Math.min(f.shots - 1, R.pattern.length - 1)] : (Math.random() - 0.5) * 2;
      const adsK = 1 - f.adsK * 0.25, cr = f.crouchK > 0.5 ? 0.8 : 1;
      f.recP += R.up * (0.9 + Math.random() * 0.2) * adsK * cr * Math.PI / 180;
      f.recY += (R.side * pat + gauss() * R.side * 0.3) * adsK * cr * Math.PI / 180;
      f.bloom = Math.min(W.spread.max, f.bloom + W.spread.shot);
      if(W.pump){ f.cycleT = W.pump; emit('pump', f); }
      if(W.bolt && g.mag > 0){ f.cycleT = W.bolt; emit('bolt', f); }
    } else if(!f.trig){
      emit('dry', f);
      if(reserve(f, g) > 0) startReload(f);
    }
  }
  if(g.mag === 0 && reserve(f, g) > 0 && !I.fire && f.fireCD <= -0.25) startReload(f);
  f.trig = I.fire;
}
function startReload(f){
  const g = gun(f), W = g.W;
  if(W.reload.kind === 'shell') f.reload = { t:0, stage:'start', total:0 };
  else f.reload = { t:0, total:g.mag === 0 ? W.reload.empty : W.reload.t, empty:g.mag === 0 };
  f.adsK = 0;
  emit('reload', f);
}
// where the fighter is looking (aim includes recoil): unit vector
export function aimDir(f, out){
  const yaw = f.yaw + f.recY, pitch = clamp(f.pitch + f.recP, -1.5, 1.5), cp = Math.cos(pitch);
  out.x = -Math.sin(yaw) * cp; out.y = Math.sin(pitch); out.z = -Math.cos(yaw) * cp;
  return out;
}
// the eye: up from the feet, sideways when leaning
export const eyeY = f => f.y + f.eye - Math.abs(f.lean) * 0.12;
export const eyeX = f => f.x + Math.cos(f.yaw) * f.lean;
export const eyeZ = f => f.z - Math.sin(f.yaw) * f.lean;
export { coneOf };
