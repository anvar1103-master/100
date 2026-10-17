// A fighter (the player or a bot — same rules for both): moving on the meadow, crouching, jumping, bounce pads,
// and the gun in its hands: trigger, rate of fire, bloom, recoil, reloads, swapping. Firing itself is in combat.js.
import { moveChar, GRAV } from './phys.js';
import { WEAPONS, SIDEARM, coneOf } from './weapons.js';
import { G, emit } from './state.js';
import { clamp, damp, gauss } from './util.js';

// the heroes (models in heroes.js): name, and the colour of what flies when they're hit (skeletons crumble into bone dust)
export const HEROES = {
  ranger:      { id:'ranger',       name:'Следопыт',        blood:'#B3242C' },
  knight:      { id:'knight',       name:'Рыцарь',          blood:'#B3242C' },
  barbarian:   { id:'barbarian',    name:'Варвар',          blood:'#B3242C' },
  mage:        { id:'mage',         name:'Волшебница',      blood:'#B3242C' },
  rogue:       { id:'rogue',        name:'Разбойница',      blood:'#B3242C' },
  hooded:      { id:'hooded',       name:'Тень',            blood:'#B3242C' },
  skel_warrior:{ id:'skel_warrior', name:'Костяной воин',   blood:'#E6DCC4', bones:true },
  skel_rogue:  { id:'skel_rogue',   name:'Костяной плут',   blood:'#E6DCC4', bones:true },
  skel_minion: { id:'skel_minion',  name:'Костяшка',        blood:'#E6DCC4', bones:true },
  skel_mage:   { id:'skel_mage',    name:'Костяной колдун', blood:'#E6DCC4', bones:true },
};
export const HERO_IDS = Object.keys(HEROES);
export const heroOf = id => HEROES[id] ? id : 'ranger';
export const MOVE = { walk:5.2, sprint:7.8, crouch:2.7, accel:55, airAccel:14, friction:12, jump:7.4, pad:24.5 };
export const H_STAND = 1.7, H_CROUCH = 1.2, EYE_STAND = 1.42, EYE_CROUCH = 1.0;
export const HP_MAX = 100, REGEN_DELAY = 4, REGEN_RATE = 26, SHIELD_T = 2;

let nextId = 1;
export const newInput = () => ({ mx:0, mz:0, jump:false, crouch:false, sprint:false, fire:false, aim:false, reload:false, slot:-1, yaw:0, pitch:0 });
function gunState(id){ const W = WEAPONS[id]; return { id, W, mag:W.mag, reserve:W.reserve }; }

export function makeFighter(o){
  const f = {
    id:nextId++, name:o.name, hero:heroOf(o.hero), bot:!!o.bot, primary:o.primary || 'hornet',
    x:0, y:0, z:0, vx:0, vy:0, vz:0, r:0.38, h:H_STAND, ground:false, gN:null,
    yaw:0, pitch:0, crouchK:0, eye:EYE_STAND,
    alive:false, hp:HP_MAX, deadT:0, shieldT:0, sinceHit:99, lastAttacker:null, damagers:new Map(),
    guns:[gunState(o.primary || 'hornet'), gunState(SIDEARM)], cur:0, next:-1,
    fireCD:0, trig:false, reload:null, equipT:0, cycleT:0, sprintT:0, bloom:0, adsK:0, recP:0, recY:0, shots:0, lastShotT:-9,
    kills:0, deaths:0, assists:0, score:0, streak:0, best:0, heads:0,
    inp:newInput(), bot_:null, model:null, stepT:0, landV:0, padT:0,
  };
  return f;
}
export const gun = f => f.guns[f.cur];
// a new primary (chosen while dead) takes effect at the next spawn
export function setPrimary(f, id){ if(f.primary === id) return; f.primary = id; f.guns[0] = gunState(id); }

export function spawnFighter(f, sp, yaw){
  Object.assign(f, { x:sp.x, y:sp.y + 0.05, z:sp.z, vx:0, vy:0, vz:0, yaw, pitch:0, alive:true, hp:HP_MAX, deadT:0, shieldT:SHIELD_T, sinceHit:99,
    lastAttacker:null, reload:null, equipT:0.3, cycleT:0, bloom:0, adsK:0, recP:0, recY:0, shots:0, crouchK:0, h:H_STAND, eye:EYE_STAND, cur:0, next:-1, trig:false });
  f.damagers.clear();
  for(const g of f.guns){ g.mag = g.W.mag; g.reserve = g.W.reserve; }
  f.inp.yaw = yaw; f.inp.pitch = 0;
  emit('spawn', f);
}

export function stepFighter(f, dt){
  if(!f.alive){ f.deadT += dt; return; }
  const I = f.inp, g = gun(f), W = g.W;
  f.yaw = I.yaw; f.pitch = clamp(I.pitch, -1.45, 1.45);
  f.shieldT = Math.max(0, f.shieldT - dt);
  // health comes back after a few quiet seconds
  f.sinceHit += dt;
  if(f.sinceHit > REGEN_DELAY && f.hp < HP_MAX) f.hp = Math.min(HP_MAX, f.hp + REGEN_RATE * dt);

  // ---- crouch ----
  const wantC = I.crouch && !f.padT;
  f.crouchK = damp(f.crouchK, wantC ? 1 : 0, 14, dt);
  f.h = H_STAND + (H_CROUCH - H_STAND) * f.crouchK;
  f.eye = EYE_STAND + (EYE_CROUCH - EYE_STAND) * f.crouchK;

  // ---- aim down sights ----
  const canAds = I.aim && !f.reload && f.equipT <= 0 && f.sprintT <= 0;
  f.adsK = clamp(f.adsK + (canAds ? 1 : -1) * dt / W.ads.time, 0, 1);

  // ---- moving ----
  const mx = I.mx, mz = I.mz, ml = Math.hypot(mx, mz) || 1;
  const sprinting = I.sprint && mz > 0.3 && f.ground && f.crouchK < 0.3 && f.adsK < 0.2 && !(I.fire && g.mag > 0 && !f.reload);
  f.sprintT = sprinting ? Math.min(0.2, f.sprintT + dt) : Math.max(0, f.sprintT - dt * 1.5);
  let speed = sprinting ? MOVE.sprint : MOVE.walk;
  speed = speed + (MOVE.crouch - speed) * f.crouchK;
  speed *= W.moveK * (1 + (W.ads.move - 1) * f.adsK);
  const sy = Math.sin(f.yaw), cy = Math.cos(f.yaw);
  // forward is -z at yaw 0
  const wx = (-sy * mz + cy * mx) / Math.max(1, ml), wz = (-cy * mz - sy * mx) / Math.max(1, ml);
  const tx = wx * speed, tz = wz * speed;
  if(f.ground){
    const a = MOVE.accel * dt;
    const dx = tx - f.vx, dz = tz - f.vz, dl = Math.hypot(dx, dz);
    if(dl > a){ f.vx += dx / dl * a; f.vz += dz / dl * a; } else { f.vx = tx; f.vz = tz; }
    if(I.jump && f.crouchK < 0.6){ f.vy = MOVE.jump; f.ground = false; emit('jump', f); }
  } else {
    // air control: steer, never speed up past the target
    const a = MOVE.airAccel * dt;
    f.vx += clamp(tx - f.vx, -a, a) * (Math.abs(tx) > 0.1 ? 1 : 0.2); f.vz += clamp(tz - f.vz, -a, a) * (Math.abs(tz) > 0.1 ? 1 : 0.2);
  }
  I.jump = false;
  f.vy -= GRAV * dt;
  const vyBefore = f.vy, wasGround = f.ground;
  moveChar(f, dt);
  if(f.ground && !wasGround){ f.landV = -vyBefore; if(f.landV > 4) emit('land', f, f.landV); f.padT = 0; }
  // bounce pad (the puffball): up you go
  if(f.ground && f.gN && f.gN.bounce){
    f.vy = MOVE.pad; f.ground = false; f.padT = 1; emit('pad', f, f.gN);
  }
  // fell out of the world somehow: put back on the ground
  if(f.y < -30){ f.y = 5; f.vy = 0; }
  // footsteps
  const hs = Math.hypot(f.vx, f.vz);
  if(f.ground && hs > 1){ f.stepT += hs * dt; const stride = sprinting ? 2.4 : 1.9; if(f.stepT > stride){ f.stepT -= stride; emit('step', f, sprinting); } }

  // ---- the gun ----
  f.fireCD -= dt; f.cycleT = Math.max(0, f.cycleT - dt);
  f.bloom = Math.max(0, f.bloom - W.spread.recover * dt * (I.fire ? 0.35 : 1));
  // recoil drifts back once you stop shooting
  const since = G.time - f.lastShotT;
  if(since > 0.09){ const k = 1 - Math.exp(-W.recoil.recover * dt); f.recP -= f.recP * k; f.recY -= f.recY * k; }
  if(since > 0.3) f.shots = 0;
  // swapping
  if(I.slot >= 0 && I.slot !== f.cur && f.next < 0){ f.next = I.slot; f.equipT = 0.22; f.reload = null; f.adsK = 0; emit('lower', f); }
  I.slot = -1;
  if(f.equipT > 0){
    f.equipT -= dt;
    if(f.equipT <= 0 && f.next >= 0){ f.cur = f.next; f.next = -1; f.equipT = gun(f).W.equip; f.bloom = 0; emit('equip', f); }
    f.trig = I.fire; return;
  }
  // reloading
  if(I.reload && !f.reload && g.mag < W.mag && g.reserve > 0) startReload(f);
  I.reload = false;
  if(f.reload){
    const R = f.reload; R.t += dt;
    if(W.reload.kind === 'shell'){
      // shells go in one by one; pulling the trigger with a shell in the tube stops the reload
      if(I.fire && !f.trig && g.mag > 0 && R.stage === 'shells'){ R.stage = 'end'; R.t = 0; }
      if(R.stage === 'start' && R.t >= W.reload.start){ R.stage = 'shells'; R.t = 0; }
      else if(R.stage === 'shells' && R.t >= W.reload.shell){ R.t = 0; g.mag++; g.reserve--; emit('shell', f); if(g.mag >= W.mag || g.reserve <= 0){ R.stage = 'end'; } }
      else if(R.stage === 'end' && R.t >= W.reload.end){ f.reload = null; emit('reloaded', f); }
    } else if(R.t >= R.total){
      const take = Math.min(W.mag - g.mag, g.reserve); g.mag += take; g.reserve -= take; f.reload = null; emit('reloaded', f);
    }
    f.trig = I.fire; return;
  }
  // pump / bolt cycling after a shot
  if(f.cycleT > 0){ f.trig = I.fire; return; }
  // pulling the trigger
  const ready = f.fireCD <= 0 && f.sprintT <= 0.05;
  if(I.fire && ready && (W.auto || !f.trig)){
    if(g.mag > 0){
      g.mag--; f.fireCD = 60 / W.rpm; f.shots++; f.lastShotT = G.time;
      emit('fire', f);                     // combat.js traces the bullets
      // recoil: the aim climbs, with a little sideways pattern; bloom opens the cone
      const R = W.recoil, pat = R.pattern ? R.pattern[Math.min(f.shots - 1, R.pattern.length - 1)] : (Math.random() - 0.5) * 2;
      const adsK = 1 - f.adsK * 0.25, cr = f.crouchK > 0.5 ? 0.8 : 1;
      f.recP += R.up * (0.9 + Math.random() * 0.2) * adsK * cr * Math.PI / 180;
      f.recY += (R.side * pat + gauss() * R.side * 0.25) * adsK * cr * Math.PI / 180;
      f.bloom = Math.min(W.spread.max, f.bloom + W.spread.shot);
      f.shieldT = 0;
      if(W.pump){ f.cycleT = W.pump; emit('pump', f); }
      if(W.bolt && g.mag > 0){ f.cycleT = W.bolt; emit('bolt', f); }
    } else if(!f.trig){
      emit('dry', f);
      if(g.reserve > 0) startReload(f);
      else if(f.cur === 0) { f.next = 1; f.equipT = 0.2; }
    }
  }
  // empty and nothing pressed: reload by itself
  if(g.mag === 0 && g.reserve > 0 && !I.fire && f.fireCD <= -0.25) startReload(f);
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
  const yaw = f.yaw + f.recY, pitch = clamp(f.pitch + f.recP, -1.5, 1.5);
  const cp = Math.cos(pitch);
  out.x = -Math.sin(yaw) * cp; out.y = Math.sin(pitch); out.z = -Math.cos(yaw) * cp;
  return out;
}
export const eyeY = f => f.y + f.eye;
