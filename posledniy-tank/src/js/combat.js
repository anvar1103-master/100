// Fighters, movement, attacks, projectiles, damage, supers and visibility (tall grass hides you).
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { scene, camera, Q, stdMat, LOW } from './engine.js';
import { G, emit, isEnemy } from './state.js';
import { HEROES, AMMO } from './heroes.js';
import { makeVisual, animate, kick, setTeamLook, disposeVisual, setOpacity } from './anim.js';
import { collide, segHit, inGrass, A, blocksMove, blocksShot, tileAtXZ, sightClear } from './arena.js';
import { glow, smoke, puff, explosion, hitSpark, sporeBurst, dmgNumber, dust, ring } from './fx.js';
import { clamp, rand, TAU, lerp } from './util.js';
import { sfx } from './audio.js';
import { damageCrateAt, damageCratesIn, damageCrate, ROYALE } from './royale.js';
import { makeBolt, moveBolt, freeBolt, flashAt, scorchAt } from './shotfx.js';

export const SHOT_Y = 0.75;
export const REGEN_DELAY = 3, REGEN_RATE = 0.13;
const RESPAWN = 3, SPAWN_SHIELD = 1.6;
let FID = 0;

export function newInput(){ return { mx:0, mz:0, aim:0, tx:0, tz:0, fire:false, sup:false, aiming:false }; }
export function makeFighter(o){
  const H = HEROES[o.hero];
  const f = { id:++FID, name:o.name, team:o.team, hero:o.hero, H, isMe:!!o.isMe, bot:null, level:o.level || 1,
    x:0, z:0, vx:0, vz:0, kx:0, kz:0, aim:o.team === 0 ? Math.PI : 0,
    alive:false, hp:H.hp, max:H.hp, ammo:AMMO, cdT:0, charge:0, regenT:0, spawnT:0, shieldT:0, deadT:0, respawnT:0.01,
    atkT:9, supT:9, flash:0, stunT:0, revealT:0, inGrass:false, gems:0, kills:0, deaths:0, dmgDone:0, lastHitBy:null,
    pendingBeam:null, inp:newInput(), V:null, tag:null, victory:false, defeat:false };
  // levels add a little power (progression): +5% hp and damage per level above 1
  f.pow = f.pow0 = 1 + (f.level - 1) * 0.05;
  f.max = f.hp = Math.round(H.hp * f.pow);
  f.V = makeVisual(o.hero); f.V.root.visible = false; scene.add(f.V.root);
  G.fighters.push(f);
  return f;
}
export function removeFighters(){
  for(const f of G.fighters){ scene.remove(f.V.root); disposeVisual(f.V); if(f.tag) f.tag.el.remove(); }
  G.fighters.length = 0; G.me = null;
}
export function lookFor(f){ return f === G.me ? 'me' : G.me && f.team === G.me.team ? 'ally' : 'foe'; }

export function spawn(f, at){
  const list = A.spawns[f.team] || A.spawns.ffa;
  const p = at || list[(f.slot ?? 0) % list.length];
  if(!at){ f.power = 0; f.pow = f.pow0; f.max = Math.round(f.H.hp * f.pow0 * (f.hpMul || 1)); }
  f.x = p.x; f.z = p.z; f.vx = f.vz = f.kx = f.kz = 0;
  f.alive = true; f.hp = f.max; f.ammo = AMMO; f.cdT = 0; f.deadT = 0; f.spawnT = 0; f.shieldT = SPAWN_SHIELD; f.regenT = 0;
  // face the enemy side (or the middle of the map when everyone is on their own)
  f.aim = A.spawns[f.team] ? (f.team === 0 ? Math.PI : 0) : openYaw(f.x, f.z); f.V.yaw = f.aim; f.inp.aim = f.aim; f.atkT = f.supT = 9; f.spot = {}; f.pendingBeam = null; f.stunT = 0; f.gems = 0; f.scope = false; f.scopeT = 0; f.burst = null; f.frenzyT = 0; f.bloom = 0;
  f.V.root.visible = true; f.V.root.scale.setScalar(1);
  setTeamLook(f.V, lookFor(f));
  kick.spawn(f.V);
  f.V.root.position.set(f.x, 0, f.z);
  puff(glow, f.x, 0.3, f.z, { n:18, color:lookFor(f) === 'foe' ? '#FF7A6A' : '#8FE0FF', sp:1.5, upMin:0.6, upMax:1, vy:3, life:0.7, s0:0.25, s1:0.05, drag:1.5, soft:true });
  ring(f.x, f.z, 0.2, 1.3, 0.5, lookFor(f) === 'foe' ? '#FF5A4A' : '#6FD8FF');
  emit('spawn', f);
}

// in the maze: face down the most open corridor that leads roughly toward the middle
function openYaw(x, z){
  const mid = Math.atan2(-x, -z); let best = mid, bs = -1e9;
  for(let i = 0; i < 8; i++){
    const a = i * Math.PI / 4, t = segHit(x, z, x + Math.sin(a) * 8, z + Math.cos(a) * 8), len = t < 0 ? 8 : t * 8;
    const sc = len + Math.cos(a - mid) * 3;
    if(sc > bs){ bs = sc; best = a; }
  }
  return best;
}

// ---------------- visibility: tall grass hides you unless an enemy is close, or you just attacked or got hit ----------------
export const REVEAL_R = 3.2;
// seeing through hedges: an outline within SEE_R, any distance once a teammate has hit (spotted) the enemy
// in the maze of «Последний гриб» the hedges hide more: you only sense fighters right behind them
export const SEE_R = 10, SEE_R_BR = 6.5, SPOT_T = 3.5;
export const spotted = (team, f) => f.spot && f.spot[team] > 0;
export function canSee(viewer, f){
  if(f.team === viewer.team) return true;
  if(!visibleTo(viewer.team, f)) return false;
  if(spotted(viewer.team, f)) return true;
  const dx = f.x - viewer.x, dz = f.z - viewer.z;
  const r = G.match && G.match.mode === 'br' ? SEE_R_BR : SEE_R;
  return dx * dx + dz * dz < r * r || sightClear(viewer.x, viewer.z, f.x, f.z);
}
export function visibleTo(team, f){
  if(f.team === team) return true;
  if(!f.alive) return true;
  if(!f.inGrass || f.revealT > 0) return true;
  for(const o of G.fighters) if(o.alive && o.team === team && (o.x - f.x) ** 2 + (o.z - f.z) ** 2 < REVEAL_R * REVEAL_R) return true;
  return false;
}

// ---------------- per-frame fighter update ----------------
const P = { x:0, z:0 };
export function stepFighter(f, dt){
  if(!f.alive){
    f.deadT += dt;
    if(G.match && G.match.respawn && !G.match.over){ f.respawnT -= dt; if(f.respawnT <= 0) spawn(f); }
    return;
  }
  const H = f.H, inp = f.inp;
  f.spawnT += dt; f.atkT += dt; f.supT += dt; f.regenT += dt;
  f.shieldT = Math.max(0, f.shieldT - dt); f.revealT = Math.max(0, f.revealT - dt); f.flash = Math.max(0, f.flash - dt * 6);
  f.cdT = Math.max(0, f.cdT - dt); f.stunT = Math.max(0, f.stunT - dt);
  // charges come back one by one
  if(f.frenzyT > 0) f.frenzyT = Math.max(0, f.frenzyT - dt);
  if(f.atkT > 0.3 && f.bloom) f.bloom = Math.max(0, f.bloom - dt * 1.8);   // the spread closes again between bursts
  if(f.ammo < AMMO){ f.ammo = Math.min(AMMO, f.ammo + dt / H.attack.reload * (f.frenzyT > 0 ? 3 : 1)); if(f.ammo >= AMMO && f.isMe) emit('ammoFull', f); }
  // heal up after a few seconds out of the fight
  if(f.regenT > REGEN_DELAY && f.hp < f.max){ const h = Math.min(f.max - f.hp, f.max * REGEN_RATE * dt); f.hp += h; f.healAcc = (f.healAcc || 0) + h; if(f.healAcc > 400){ if(f === G.me) dmgNumber(f.x, H.height + 0.3, f.z, f.healAcc, 'heal'); f.healAcc = 0; } }
  // movement with a short acceleration ramp
  const frozen = G.state !== 'play' || f.stunT > 0 || f.pendingBeam;
  let mx = frozen ? 0 : inp.mx, mz = frozen ? 0 : inp.mz; const ml = Math.hypot(mx, mz); if(ml > 1){ mx /= ml; mz /= ml; }
  // the sniper's scope: charges while held, slows the steps
  const SC = H.attack.scope;
  if(SC && f.scope && G.state === 'play') f.scopeT = (f.scopeT || 0) + dt; else f.scopeT = 0;
  const sp = H.speed * (G.ball && G.ball.holder === f ? 0.9 : 1) * (SC && f.scope ? SC.slow : 1);   // the ball carrier is a touch slower, so defenders can catch up
  const a = 1 - Math.exp(-dt * 18);
  f.vx += (mx * sp - f.vx) * a; f.vz += (mz * sp - f.vz) * a;
  const kd = Math.exp(-dt * 7); f.kx *= kd; f.kz *= kd;
  P.x = f.x + (f.vx + f.kx) * dt; P.z = f.z + (f.vz + f.kz) * dt;
  collide(P, H.rad);
  // fighters gently push each other apart
  for(const o of G.fighters){
    if(o === f || !o.alive) continue;
    const dx = P.x - o.x, dz = P.z - o.z, d2 = dx * dx + dz * dz, r = H.rad + o.H.rad;
    if(d2 < r * r && d2 > 1e-6){ const d = Math.sqrt(d2), k = (r - d) * 0.5 / d; P.x += dx * k; P.z += dz * k; }
  }
  collide(P, H.rad);
  // real velocity after collisions (drives the run animation)
  if(dt > 0){ const rvx = (P.x - f.x) / dt, rvz = (P.z - f.z) / dt; f.vx = lerp(f.vx, rvx, 0.5); f.vz = lerp(f.vz, rvz, 0.5); }
  f.x = P.x; f.z = P.z;
  const g = inGrass(f.x, f.z);
  if(g && !f.inGrass && f.V.root.visible) puff(smoke, f.x, 0.6, f.z, { n:4, color:'#7FC24E', sp:1.2, life:0.5, s0:0.12, s1:0.06, grav:4, drag:1 });
  f.inGrass = g;
  if(Math.hypot(f.vx, f.vz) > 2 && Math.random() < dt * 4 && !f.H.hover && !g) dust(f.x, f.z, 1);
  // aim + attacks
  // the hero turns with the crosshair from the very first second, during the countdown too
  if(!f.pendingBeam && (!frozen || (G.state === 'countdown' && f.stunT <= 0))) f.aim = inp.aim;
  if(f.pendingBeam){ f.pendingBeam.t -= dt; if(f.pendingBeam.t <= 0) fireBeam(f); }
  if(f.burst){ f.burst.t -= dt; while(f.burst && f.burst.t <= 0) burstShot(f); }
  if(!frozen){
    if(inp.sup && f.charge >= 1) doSuper(f, inp.tx, inp.tz);
    else if(inp.fire) doAttack(f, inp.tx, inp.tz);
  }
  inp.fire = inp.sup = false;
}

export function canAttack(f){ return f.alive && f.ammo >= 1 && f.cdT <= 0 && !f.pendingBeam && G.state === 'play'; }
export function muzzlePos(f, out){
  f.V.muzzle.getWorldPosition(out);
  // keep shots at the common shot height so they collide the same for everyone
  out.y = SHOT_Y; return out;
}
const MZ = new THREE.Vector3();

function doAttack(f, tx, tz){
  // a mode can take the button over (in «Дождевикбол» the ball carrier kicks instead of shooting)
  if(G.attackHook && f.alive && f.cdT <= 0 && G.state === 'play' && G.attackHook(f, tx, tz, false)) return;
  if(!canAttack(f)) { if(f.isMe && f.ammo < 1 && f.cdT <= 0) emit('empty', f); return; }
  const H = f.H, W = H.attack;
  f.ammo -= 1; f.cdT = W.cd * (f.frenzyT > 0 ? 0.6 : 1); f.atkT = 0; f.regenT = 0; f.revealT = Math.max(f.revealT, 1.0);
  const aim = Math.atan2(tx - f.x, tz - f.z);
  f.aim = aim; f.V.yaw = aim;   // snap so the shot leaves where the hero faces
  kick.attack(f.V);
  fireWeapon(f, W, aim, tx, tz, false);
  emit('attack', f, false);
}
function doSuper(f, tx, tz){
  if(!f.alive || f.pendingBeam || G.state !== 'play') return;
  if(G.attackHook && G.attackHook(f, tx, tz, true)) return;
  const H = f.H, S = H.super;
  f.charge = 0; f.supT = 0; f.atkT = 0; f.regenT = 0; f.revealT = Math.max(f.revealT, 1.2);
  const aim = Math.atan2(tx - f.x, tz - f.z);
  f.aim = aim; f.V.yaw = aim;
  kick.super(f.V);
  if(S.kind === 'beam'){ f.pendingBeam = { t:S.windup, aim }; emit('super', f, true); sfx('super', f); return; }
  if(S.kind === 'frenzy'){
    // a few seconds of faster, tighter, longer bursts with charges coming back three times as fast
    f.frenzyT = S.time; f.ammo = AMMO; f.bloom = 0;
    ring(f.x, f.z, 0.3, 2, 0.5, S.color);
    puff(glow, f.x, 1.0, f.z, { n:18, color:S.color, sp:3, vy:1.5, life:0.5, s0:0.25, s1:0.03, soft:true });
    emit('super', f, false); sfx('super', f); return;
  }
  fireWeapon(f, S, aim, tx, tz, true);
  emit('super', f, false);
  sfx('super', f);
}

function fireWeapon(f, W, aim, tx, tz, isSuper){
  muzzlePos(f, MZ);
  const pow = f.pow;
  if(W.kind === 'shell'){
    // one shell (or a few in a row: the rest leave from burstShot, gap seconds apart)
    if((W.count || 1) > 1){ f.burst = { n:W.count, t:0, W, pow, isSuper, shell:true }; burstShot(f); }
    else fireShell(f, W, aim, W.dmg * pow, isSuper);
  } else if(W.kind === 'fan'){
    for(let i = 0; i < W.count; i++){
      const a = aim + (W.count > 1 ? (i / (W.count - 1) - 0.5) * W.spread : 0) + rand(-0.015, 0.015);
      addShot(f, MZ.x, MZ.z, a, W, W.dmg * pow, isSuper);
    }
    flashAt(MZ.x, MZ.y, MZ.z, W.color, isSuper ? 1.3 : 0.85, 0.08);
    puff(glow, MZ.x, MZ.y, MZ.z, { n:isSuper ? 16 : 8, color:W.color, sp:isSuper ? 7 : 4, vx:Math.sin(aim) * 4, vz:Math.cos(aim) * 4, life:0.22, s0:0.35, s1:0.05, drag:6 });
    puff(smoke, MZ.x, MZ.y, MZ.z, { n:isSuper ? 10 : 5, color:'#F2E8D0', sp:1.5, vx:Math.sin(aim) * 3, vz:Math.cos(aim) * 3, life:0.5, s0:0.18, s1:0.5, drag:4, soft:true, a:0.6 });
    if(isSuper){ f.kx -= Math.sin(aim) * 7; f.kz -= Math.cos(aim) * 7; G.shake = Math.max(G.shake, f.isMe ? 0.5 : 0); }
    sfx(isSuper ? 'boom' : 'shot_shotgun', f);
  } else if(W.kind === 'burst'){
    // the shots leave one by one along the current aim (see burstShot)
    f.burst = { n:W.count + (f.frenzyT > 0 ? 2 : 0), t:0, W, pow };
    burstShot(f);
  } else if(W.kind === 'bounce'){
    const n = W.count || 1;
    for(let i = 0; i < n; i++) addShot(f, MZ.x, MZ.z, aim + (n > 1 ? (i / (n - 1) - 0.5) * W.spread : 0), W, W.dmg * pow, isSuper);
    flashAt(MZ.x, MZ.y, MZ.z, W.color, isSuper ? 1.4 : 0.6, 0.07);
    puff(glow, MZ.x, MZ.y, MZ.z, { n:isSuper ? 12 : 5, color:W.color, sp:3, life:0.2, s0:0.25, s1:0.04, drag:6 });
    if(isSuper){ f.kx -= Math.sin(aim) * 4; f.kz -= Math.cos(aim) * 4; G.shake = Math.max(G.shake, f.isMe ? 0.35 : 0); }
    sfx(isSuper ? 'boom' : 'shot_pop', f, isSuper ? 0.7 : 1);
  } else if(W.kind === 'needle'){
    const SC = W.scope, k = SC && f.scope ? clamp(f.scopeT / SC.time, 0, 1) : 0;
    if(SC && f.scope){
      // an aimed shot: up to +60% damage once fully charged, further and faster; the charge starts over
      const m = 1 + SC.dmg * k, sw = Object.assign({}, W, { range:W.range * SC.range, speed:W.speed * SC.speed, dmgFar:W.dmgFar * m, size:W.size * (1 + k * 0.5) });
      addShot(f, MZ.x, MZ.z, aim, sw, W.dmg * m * pow, isSuper);
      f.scopeT = 0; if(k >= 1){ flashAt(MZ.x, MZ.y, MZ.z, '#FFF2A0', 1.3, 0.1); sfx('shot_beam', f, 0.5, 1.4); }
    } else addShot(f, MZ.x, MZ.z, aim, W, W.dmg * pow, isSuper);
    flashAt(MZ.x, MZ.y, MZ.z, W.color, 0.7, 0.07);
    puff(glow, MZ.x, MZ.y, MZ.z, { n:6, color:W.color, sp:3, life:0.18, s0:0.3, s1:0.05, drag:6 });
    sfx('shot_beam', f, 0.6);
  } else if(W.kind === 'lob'){
    const d = clamp(Math.hypot(tx - f.x, tz - f.z), 1.5, W.range);
    addLob(f, f.x + Math.sin(aim) * d, f.z + Math.cos(aim) * d, W, W.flight * (0.65 + 0.35 * d / W.range), 0, isSuper);
    sfx('shot_throw', f);
  } else if(W.kind === 'barrage'){
    const d = clamp(Math.hypot(tx - f.x, tz - f.z), 3, W.range);
    for(let i = 0; i < W.count; i++){
      const off = (i - (W.count - 1) / 2) * W.step, dd = clamp(d + off, 1.5, W.range + W.step);
      addLob(f, f.x + Math.sin(aim) * dd + rand(-0.3, 0.3), f.z + Math.cos(aim) * dd + rand(-0.3, 0.3), W, W.flight * (0.7 + 0.3 * dd / W.range), i * 0.08, true);
    }
    sfx('shot_throw', f);
  }
}

// a tank shell: a bright tracer, a big muzzle flash and a cloud of smoke; the gun's blast pushes the tank back a little
function fireShell(f, W, aim, dmg, isSuper){
  muzzlePos(f, MZ);
  addShot(f, MZ.x, MZ.z, aim, W, dmg, isSuper);
  const sa = Math.sin(aim), ca = Math.cos(aim);
  flashAt(MZ.x, MZ.y, MZ.z, '#FFC46B', isSuper ? 1.5 : 1.1, 0.08);
  puff(glow, MZ.x, MZ.y, MZ.z, { n:isSuper ? 10 : 6, color:'#FFB04A', sp:3, vx:sa * 5, vz:ca * 5, life:0.16, s0:0.32, s1:0.05, drag:7 });
  puff(smoke, MZ.x, MZ.y, MZ.z, { n:isSuper ? 9 : 6, color:'#9A968E', sp:1.4, vx:sa * 3.5, vz:ca * 3.5, life:0.9, s0:0.2, s1:0.75, drag:3.5, soft:true, a:0.55 });
  f.kx -= sa * (isSuper ? 3 : 1.6); f.kz -= ca * (isSuper ? 3 : 1.6);
  if(f.isMe) G.shake = Math.max(G.shake, isSuper ? 0.4 : 0.22);
  sfx('shot_shotgun', f, 0.9, isSuper ? 0.62 : 0.72);
}
// where a shell bursts: fire, smoke, a crater; everyone near takes part of the damage (the one it struck took it all already)
function shellBlast(s, x, z){
  const S = s.W.splash, r = S.r;
  explosion(x, z, r * 0.75, '#FF9A3E');
  sfx(s.isSuper ? 'boom_big' : 'boom', { x, z }, 0.8);
  for(const o of G.fighters){
    if(!o.alive || o.team === s.team || o === s.direct) continue;
    const d = Math.hypot(o.x - x, o.z - z);
    if(d > r + o.H.rad) continue;
    damage(o, s.dmg * S.k, s.owner, s.isSuper);
    if(s.knock){ const l = d || 1; o.kx += (o.x - x) / l * s.knock * 2.5; o.kz += (o.z - z) / l * s.knock * 2.5; o.stunT = Math.max(o.stunT, 0.25); }
  }
  damageCratesIn(x, z, r * 0.8, s.dmg * S.k);
}
// a small shell's hit on the ground or a hedge: a puff of dirt and sparks
function dirtHit(x, z){
  puff(smoke, x, 0.4, z, { n:3, color:'#7A6448', sp:1.6, upMin:0.3, life:0.6, s0:0.14, s1:0.4, drag:3, soft:true, a:0.55 });
  puff(smoke, x, 0.3, z, { n:4, color:'#5C4632', sp:3.5, upMin:0.5, life:0.6, s0:0.06, s1:0.04, grav:12, drag:0.5 });
}

// one shot of a burst: follows the hero's aim, the spread opens up with every shot fired in a row
function burstShot(f){
  const B = f.burst; if(!B || !f.alive){ f.burst = null; return; }
  if(B.shell){
    if(B.n < B.W.count) kick.attack(f.V);
    fireShell(f, B.W, f.aim, B.W.dmg * B.pow, B.isSuper);
    B.n--; B.t += B.W.gap; if(B.n <= 0) f.burst = null;
    return;
  }
  const W = B.W, tight = f.frenzyT > 0 ? 0.3 : 1;
  f.bloom = Math.min(1, (f.bloom || 0) + W.bloom);
  const spread = W.spread * (1 + f.bloom * 4) * tight;
  muzzlePos(f, MZ);
  const a = f.aim + (Math.random() + Math.random() - 1) * spread;
  addShot(f, MZ.x, MZ.z, a, W, W.dmg * B.pow, false);
  flashAt(MZ.x, MZ.y, MZ.z, W.color, 0.45, 0.05);
  sfx('shot_pop', f, 0.55, 1.3 + Math.random() * 0.2);
  f.V.sp.kick.v += 4; f.atkT = 0;
  B.n--; B.t += W.gap;
  if(B.n <= 0) f.burst = null;
}

// ---------------- straight shots ----------------
const shotGeo = new THREE.SphereGeometry(1, 10, 8), needleGeo = new THREE.CapsuleGeometry(0.5, 2.2, 3, 8);
needleGeo.rotateX(Math.PI / 2);
const matCache = {};
const glowMat = (c, k = 2.4) => matCache[c + k] || (matCache[c + k] = new THREE.MeshBasicMaterial({ color:new THREE.Color(c).multiplyScalar(k), toneMapped:false }));
function addShot(f, x, z, a, W, dmg, isSuper){
  // a glowing bolt with a trail; the sniper's is long and thin, autocannon rounds are short (and trail-less on phones)
  // tank shells are tracers: a hot head and a long streak behind it
  const needle = W.kind === 'needle', bounce = W.kind === 'bounce', shell = W.kind === 'shell', sz = W.size || 0.2;
  const m = makeBolt(W.color, needle || bounce || shell ? sz * 2.4 : sz * 2.2, needle ? 3.6 : shell ? 2.6 : bounce ? (isSuper ? 2.6 : 1.8) : isSuper ? 1.8 : 1.4, needle || bounce || shell || !LOW);
  moveBolt(m, x, SHOT_Y, z, Math.sin(a), Math.cos(a), 0);
  G.shots.push({ owner:f, team:f.team, x, z, x0:f.x, z0:f.z, vx:Math.sin(a) * W.speed, vz:Math.cos(a) * W.speed, range:W.range, dist:0, dmg, W, isSuper, m, knock:W.knock || 0,
    bounces:W.bounces || 0, seg:0, hits:W.pierce ? new Set() : null });
}
// ricochet: which way to turn at the point (x, z) where a shot moving (vx, vz) met a wall
function reflect(x, z, vx, vz){
  const sx = Math.sign(vx) || 1, sz = Math.sign(vz) || 1;
  const wx = blocksShot(tileAtXZ(x + sx * 0.06, z - sz * 0.06)), wz = blocksShot(tileAtXZ(x - sx * 0.06, z + sz * 0.06));
  if(wx && !wz) return [-vx, vz];
  if(wz && !wx) return [vx, -vz];
  return [-vx, -vz];   // a corner: straight back
}
// the path a bouncing shot will take: corner points from the start to where it runs out (aim guide, bots)
export function bouncePath(x, z, a, range, bounces){
  const pts = [{ x, z }]; let vx = Math.sin(a), vz = Math.cos(a), left = range;
  for(let b = 0; b <= bounces && left > 0.05; b++){
    const ex = x + vx * left, ez = z + vz * left, t = segHit(x, z, ex, ez);
    if(t < 0){ pts.push({ x:ex, z:ez }); break; }
    const hx = x + (ex - x) * t - vx * 0.03, hz = z + (ez - z) * t - vz * 0.03;
    pts.push({ x:hx, z:hz }); left -= Math.hypot(hx - x, hz - z);
    if(b === bounces) break;
    [vx, vz] = reflect(hx + vx * 0.03, hz + vz * 0.03, vx, vz); x = hx; z = hz;
  }
  return pts;
}
// does that path pass (unblocked) through the circle at (px, pz)?
export function pathHits(pts, px, pz, r){
  for(let i = 1; i < pts.length; i++) if(segPointDist2(pts[i - 1].x, pts[i - 1].z, pts[i].x, pts[i].z, px, pz) < r * r) return true;
  return false;
}
function segPointDist2(ax, az, bx, bz, px, pz){
  const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz;
  let t = l2 > 0 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0; t = clamp(t, 0, 1);
  const qx = ax + dx * t - px, qz = az + dz * t - pz; return qx * qx + qz * qz;
}
export function updateShots(dt){
  for(let i = G.shots.length - 1; i >= 0; i--){
    const s = G.shots[i];
    const step = Math.hypot(s.vx, s.vz) * dt;
    let nx = s.x + s.vx * dt, nz = s.z + s.vz * dt, end = false;
    if(s.dist + step >= s.range){ const k = (s.range - s.dist) / step; nx = s.x + s.vx * dt * k; nz = s.z + s.vz * dt * k; end = true; }
    const wall = segHit(s.x, s.z, nx, nz);
    if(wall >= 0){
      nx = s.x + (nx - s.x) * wall; nz = s.z + (nz - s.z) * wall; end = true; hitSpark(nx, SHOT_Y, nz, s.W.color); sfx('hit_wall', { x:nx, z:nz }, 0.35, s.bounces > 0 ? 1.5 : 1);
      // a crate takes the hit (look a hair past the point where the shot stopped)
      const l = Math.hypot(s.vx, s.vz) || 1;
      // a flash and a burn mark on the face that was hit (the side facing the shooter)
      flashAt(nx, SHOT_Y, nz, s.W.color, (s.W.size || 0.2) * 4, 0.09);
      const ax = Math.abs(s.vx) > Math.abs(s.vz);
      scorchAt(nx, SHOT_Y, nz, ax ? -Math.sign(s.vx) : 0, 0, ax ? 0 : -Math.sign(s.vz), s.W.kind === 'needle' ? 0.55 : 0.32);
      damageCrateAt(nx + s.vx / l * 0.08, nz + s.vz / l * 0.08, s.W.dmgFar ? lerp(s.dmg, s.W.dmgFar * s.owner.pow, clamp(s.dist / s.range, 0, 1)) : s.dmg);
      // a ricochet: turn off the wall and fly on, a little faster
      if(s.bounces > 0){
        [s.vx, s.vz] = reflect(nx, nz, s.vx, s.vz); s.rico = (s.rico || 0) + 1;
        if(!s.hits){ s.vx *= 1.08; s.vz *= 1.08; }
        s.bounces--; end = false; s.bounced = true;
        const l2 = Math.hypot(s.vx, s.vz) || 1; nx += s.vx / l2 * 0.03; nz += s.vz / l2 * 0.03;   // step off the wall
      }
    }
    // fighters along the path
    for(const o of G.fighters){
      if(!o.alive || o.team === s.team) continue;
      const r = o.H.rad + (s.W.size || 0.2) * 0.8;
      if(segPointDist2(s.x, s.z, nx, nz, o.x, o.z) < r * r){
        if(s.hits){ if(s.hits.has(o)) continue; s.hits.add(o); }   // the big roller hits each fighter once and rolls on
        let dmg = s.dmg;
        if(s.W.dmgFar) dmg = lerp(s.dmg, s.W.dmgFar * s.owner.pow, clamp((s.dist + step) / s.range, 0, 1));
        if(s.rico && s.W.ricochet) dmg *= s.W.ricochet;   // a bank shot hits harder
        damage(o, dmg, s.owner, s.isSuper);
        if(s.knock){ const l = Math.hypot(s.vx, s.vz); o.kx += s.vx / l * s.knock * 2.2; o.kz += s.vz / l * s.knock * 2.2; o.stunT = Math.max(o.stunT, 0.25); }
        hitSpark(o.x, SHOT_Y + 0.1, o.z, s.W.color); flashAt(o.x, SHOT_Y + 0.1, o.z, s.W.color, 0.7, 0.08);
        if(s.hits) continue;
        s.direct = o; end = true; nx = o.x; nz = o.z; break;
      }
    }
    s.dist += Math.hypot(nx - s.x, nz - s.z);
    s.x = nx; s.z = nz;
    if(s.bounced){ s.seg = s.dist; s.bounced = false; }   // the trail starts over after a ricochet
    moveBolt(s.m, nx, SHOT_Y, nz, s.vx, s.vz, s.dist - s.seg);
    // trail
    if(Math.random() < 0.25) glow.emit({ x:nx, y:SHOT_Y, z:nz, vx:0, vy:0, vz:0, life:s.W.kind === 'needle' ? 0.3 : 0.16, t:0, s0:(s.W.size || 0.2) * (s.W.kind === 'needle' ? 1.6 : 1.4), s1:0.02, r:1, g:0.8, b:0.4, a:0.7, grav:0, drag:0, soft:1 });
    if(end){
      if(s.W.splash) shellBlast(s, nx, nz); else if(!s.direct) dirtHit(nx, nz);
      freeBolt(s.m); G.shots.splice(i, 1);
    }
  }
}

// ---------------- rockets fired up and over the hedges ----------------
// a rocket along +z: olive body, dark nose, tail fins; it turns to fly along its arc
const bombGeo = (() => {
  const body = new THREE.CylinderGeometry(0.065, 0.065, 0.42, 10); body.rotateX(Math.PI / 2);
  const nose = new THREE.ConeGeometry(0.065, 0.14, 10); nose.rotateX(Math.PI / 2); nose.translate(0, 0, 0.28);
  const fin1 = new THREE.BoxGeometry(0.22, 0.015, 0.1); fin1.translate(0, 0, -0.18);
  const fin2 = new THREE.BoxGeometry(0.015, 0.22, 0.1); fin2.translate(0, 0, -0.18);
  return mergeGeometries([body.toNonIndexed(), nose.toNonIndexed(), fin1.toNonIndexed(), fin2.toNonIndexed()]);
})();
const bombMat = stdMat({ color:'#5E6644', roughness:0.6, metalness:0.3 });
const markGeo = new THREE.RingGeometry(0.9, 1, 36); markGeo.rotateX(-Math.PI / 2);
function addLob(f, x1, z1, W, T, delay, isSuper){
  const m = new THREE.Mesh(bombGeo, bombMat); m.castShadow = true;
  const fuse = new THREE.Mesh(shotGeo, glowMat('#FFC04A', 3)); fuse.scale.set(0.06, 0.06, 0.12); fuse.position.z = -0.26; m.add(fuse);   // the motor's flame
  m.visible = false; scene.add(m);
  const mark = new THREE.Mesh(markGeo, new THREE.MeshBasicMaterial({ color:lookFor(f) === 'foe' ? '#FF4A3A' : '#5FC8FF', transparent:true, opacity:0, depthWrite:false }));
  mark.position.set(x1, 0.05, z1); mark.scale.setScalar(W.radius); mark.renderOrder = 3; scene.add(mark);
  // start from the throwing hand
  muzzlePos(f, MZ);
  G.lobs.push({ owner:f, team:f.team, x0:MZ.x, z0:MZ.z, y0:1.0, x1, z1, T, t:-delay, W, isSuper, m, mark, h:3.2 + Math.hypot(x1 - f.x, z1 - f.z) * 0.2 });
}
export function updateLobs(dt){
  for(let i = G.lobs.length - 1; i >= 0; i--){
    const L = G.lobs[i]; L.t += dt;
    if(L.t < 0) continue;
    const k = Math.min(1, L.t / L.T);
    const x = lerp(L.x0, L.x1, k), z = lerp(L.z0, L.z1, k), y = lerp(L.y0, 0.15, k) + Math.sin(k * Math.PI) * L.h;
    // nose along the flight: look a step ahead on the arc
    const k2 = Math.min(1, k + 0.02), ax = lerp(L.x0, L.x1, k2), az = lerp(L.z0, L.z1, k2), ay = lerp(L.y0, 0.15, k2) + Math.sin(k2 * Math.PI) * L.h;
    L.m.visible = true; L.m.position.set(x, y, z); if(k < 1) L.m.lookAt(ax, ay, az);
    L.mark.material.opacity = 0.25 + 0.55 * k; L.mark.scale.setScalar(L.W.radius * (1.25 - 0.25 * k));
    // the motor's flame and a smoke trail
    if(Math.random() < 0.7) glow.emit({ x, y, z, vx:rand(-0.3, 0.3), vy:0.2, vz:rand(-0.3, 0.3), life:0.2, t:0, s0:0.14, s1:0.02, r:1, g:0.7, b:0.3, a:1, grav:0, drag:1, soft:0 });
    if(Math.random() < 0.8) puff(smoke, x, y, z, { n:1, color:'#BDB8AE', sp:0.15, life:0.9, s0:0.1, s1:0.42, drag:1.5, soft:true, a:0.45 });
    if(k >= 1){
      scene.remove(L.m); scene.remove(L.mark); L.mark.material.dispose();
      G.lobs.splice(i, 1);
      blast(L.owner, L.x1, L.z1, L.W, L.isSuper);
    }
  }
}
function blast(owner, x, z, W, isSuper){
  explosion(x, z, W.radius, W.color);
  sfx(isSuper ? 'boom_big' : 'boom', { x, z });
  for(const o of G.fighters){
    if(!o.alive || o.team === owner.team) continue;
    const d = Math.hypot(o.x - x, o.z - z);
    if(d > W.radius + o.H.rad) continue;
    damage(o, W.dmg * owner.pow, owner, isSuper);
    if(W.knock){ const l = d || 1; o.kx += (o.x - x) / l * W.knock * 3; o.kz += (o.z - z) / l * W.knock * 3; o.stunT = Math.max(o.stunT, 0.3); }
  }
  damageCratesIn(x, z, W.radius, W.dmg * owner.pow);
  if(W.puddle) addPuddle(owner, x, z, W.puddle);
}

// ---------------- burning puddles ----------------
const puddleGeo = new THREE.CircleGeometry(1, 32); puddleGeo.rotateX(-Math.PI / 2);
const puddleU = { uTime:{ value:0 } };
const puddleMat = new THREE.ShaderMaterial({ transparent:true, depthWrite:false, uniforms:Object.assign({ uK:{ value:1 } }, puddleU),
  vertexShader:'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader:`uniform float uTime; uniform float uK; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
    void main(){ vec2 p = vUv - 0.5; float d = length(p) * 2.0;
      float e = n(p * 7.0 + uTime * 0.7) * 0.25 + n(p * 15.0 - uTime) * 0.12;
      float a = 1.0 - smoothstep(0.82, 1.0, d + e * 0.6);
      float bub = smoothstep(0.62, 0.8, n(p * 12.0 + vec2(uTime * 0.5, -uTime * 0.8)));
      vec3 col = mix(vec3(0.95, 0.35, 0.05), vec3(1.0, 0.8, 0.25), bub + (1.0 - d) * 0.4);
      gl_FragColor = vec4(col * 1.6, a * 0.78 * uK);
      #include <colorspace_fragment>
    }` });
function addPuddle(owner, x, z, P){
  const m = new THREE.Mesh(puddleGeo, puddleMat.clone()); m.material.uniforms.uTime = puddleU.uTime;
  m.position.set(x, 0.045, z); m.scale.setScalar(0.2); m.renderOrder = 3; scene.add(m);
  G.puddles.push({ owner, team:owner.team, x, z, r:P.r, dps:P.dps * owner.pow, t:0, life:P.t, tick:0, m });
}
export function updatePuddles(dt){
  puddleU.uTime.value += dt;
  for(let i = G.puddles.length - 1; i >= 0; i--){
    const p = G.puddles[i]; p.t += dt; p.tick -= dt;
    const k = p.t / p.life;
    p.m.scale.setScalar(p.r * Math.min(1, p.t / 0.15));
    p.m.material.uniforms.uK.value = k > 0.75 ? (1 - k) / 0.25 : 1;
    if(Math.random() < dt * 14) glow.emit({ x:p.x + rand(-p.r, p.r) * 0.7, y:0.1, z:p.z + rand(-p.r, p.r) * 0.7, vx:0, vy:rand(0.6, 1.4), vz:0, life:0.5, t:0, s0:0.14, s1:0.02, r:1, g:0.6, b:0.15, a:1, grav:0, drag:0.5, soft:1 });
    if(p.tick <= 0){
      p.tick = 0.25;
      for(const o of G.fighters) if(o.alive && o.team !== p.team && (o.x - p.x) ** 2 + (o.z - p.z) ** 2 < (p.r + o.H.rad * 0.5) ** 2) damage(o, p.dps * 0.25, p.owner, false, true);
    }
    if(p.t >= p.life){ scene.remove(p.m); p.m.material.dispose(); G.puddles.splice(i, 1); }
  }
}

// ---------------- the wasp's piercing beam ----------------
const beamGeo = new THREE.CylinderGeometry(1, 1, 1, 12, 1, true); beamGeo.rotateX(Math.PI / 2); beamGeo.translate(0, 0, 0.5);
function fireBeam(f){
  const S = f.H.super, aim = f.pendingBeam.aim; f.pendingBeam = null;
  f.aim = aim;
  muzzlePos(f, MZ);
  const x0 = MZ.x, z0 = MZ.z, x1 = x0 + Math.sin(aim) * S.range, z1 = z0 + Math.cos(aim) * S.range;
  for(const o of G.fighters){
    if(!o.alive || o.team === f.team) continue;
    const r = S.width / 2 + o.H.rad;
    if(segPointDist2(x0, z0, x1, z1, o.x, o.z) < r * r){ damage(o, S.dmg * f.pow, f, true); o.kx += Math.sin(aim) * 6; o.kz += Math.cos(aim) * 6; hitSpark(o.x, SHOT_Y, o.z, S.color); }
  }
  for(const k of A.crates) if(k.alive && segPointDist2(x0, z0, x1, z1, k.x, k.z) < (S.width / 2 + 0.7) ** 2) damageCrate(k, S.dmg * f.pow);
  const core = new THREE.Mesh(beamGeo, glowMat('#FFF6C0', 3)), outer = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color:new THREE.Color(S.color).multiplyScalar(2), transparent:true, opacity:0.55, depthWrite:false, blending:THREE.AdditiveBlending }));
  for(const m of [core, outer]){ m.position.set(x0, SHOT_Y + 0.05, z0); m.rotation.y = aim; scene.add(m); }
  core.scale.set(0.08, 0.08, S.range); outer.scale.set(S.width * 0.5, S.width * 0.5, S.range);
  G.beams.push({ core, outer, t:0, life:0.45, w:S.width });
  for(let d = 0; d < S.range; d += 0.6) puff(glow, x0 + Math.sin(aim) * d, SHOT_Y, z0 + Math.cos(aim) * d, { n:1, color:S.color, sp:1.5, life:0.5, s0:0.25, s1:0.02, drag:2, soft:true });
  f.kx -= Math.sin(aim) * 5; f.kz -= Math.cos(aim) * 5;
  kick.super(f.V);
  if(f.isMe) G.shake = Math.max(G.shake, 0.4);
  sfx('shot_beam', f, 1.2);
}
export function updateBeams(dt){
  for(let i = G.beams.length - 1; i >= 0; i--){
    const b = G.beams[i]; b.t += dt; const k = b.t / b.life;
    const w = (1 - k) * b.w * 0.5;
    b.outer.scale.x = b.outer.scale.y = Math.max(0.001, w); b.core.scale.x = b.core.scale.y = Math.max(0.001, 0.08 * (1 - k));
    b.outer.material.opacity = 0.55 * (1 - k);
    if(k >= 1){ scene.remove(b.core); scene.remove(b.outer); b.outer.material.dispose(); G.beams.splice(i, 1); }
  }
}

// ---------------- damage, death ----------------
export function damage(o, amount, src, isSuper, quiet){
  if(!o.alive || o.shieldT > 0 || amount <= 0 || (G.match && G.match.over)) return 0;
  // fighters hit softer in «Последний гриб» (no respawns: fights last long enough to run, hide and heal)
  if(src && G.match && G.match.mode === 'br') amount *= ROYALE.dmg;
  amount = Math.round(amount);
  o.hp -= amount; o.flash = 1; o.hurtAt = G.time; o.regenT = 0; o.revealT = Math.max(o.revealT, 0.6); o.lastHitBy = src;
  if(src && src.team !== o.team){ o.spot = o.spot || {}; o.spot[src.team] = SPOT_T; }
  if(src){
    src.dmgDone += amount; src.regenT = Math.min(src.regenT, REGEN_DELAY * 0.5);
    if(!isSuper && src.charge < 1){ src.charge = Math.min(1, src.charge + amount / src.H.super.charge); if(src.charge >= 1) emit('superReady', src); }
  }
  if(!quiet) kick.hurt(o.V);
  const meTeam = G.me ? G.me.team : 0;
  if((G.me && canSee(G.me, o)) || o === G.me || src === G.me) dmgNumber(o.x, o.H.height + 0.25, o.z, amount, o === G.me ? 'me' : src === G.me ? 'mine' : '');
  emit('damage', o, amount, src);
  if(src === G.me && o !== G.me) emit('hitMarker', o.hp <= 0);
  if(o.hp <= 0) kill(o, src);
  return amount;
}
export function kill(o, src){
  o.hp = 0; o.alive = false; o.deadT = 0; o.deaths++; o.respawnT = RESPAWN; o.pendingBeam = null; o.burst = null; o.frenzyT = 0;
  if(src && src !== o) src.kills++;
  sporeBurst(o.x, 0.8, o.z, o.H.color, 34);
  sfx('die', o);
  emit('kill', o, src);
}

export function updateFighterVisuals(dt, t){
  const meTeam = G.me ? G.me.team : 0;
  for(const f of G.fighters){
    const V = f.V;
    if(f.spot) for(const k in f.spot) f.spot[k] = Math.max(0, f.spot[k] - dt);
    f.seen = G.me ? canSee(G.me, f) : true;
    animate(V, f, dt, t);
    if(f.alive && !f.seen) V.root.visible = false;
    // hiding in grass: you and your allies turn see-through
    // and your own hero fades when the camera is pressed right up against it
    let op = f.alive && f.inGrass && f.team === meTeam ? 0.55 : 1;
    if(f === G.me && G.state !== 'menu'){ const cd = camera.position.distanceTo(V.root.position) - 0.6; if(cd < 2.2) op = Math.min(op, Math.max(0.15, (cd - 0.6) / 1.6)); }
    setOpacity(V, op);
    // spawn shield shimmer
    if(f.shieldT > 0) V.u.uTint.value.setScalar(0.035 + Math.sin(t * 20) * 0.025);
    else if(f.frenzyT > 0) V.u.uTint.value.setRGB(0.25, 0.2, 0.02).multiplyScalar(0.6 + Math.sin(t * 18) * 0.4);
    else if(V.id !== 'wasp' || f.supT >= 1.2) V.u.uTint.value.setScalar(0);
  }
}

// compile every effect shader while the menu loads, so the first explosion, puddle or beam doesn't stall a frame
export function effectSamples(){
  const f = { team:0, x:0, z:0, pow:1, H:{ attack:{} }, V:null };
  const list = [];
  const pm = new THREE.Mesh(puddleGeo, puddleMat.clone()); pm.material.uniforms.uTime = puddleU.uTime; list.push(pm);
  list.push(new THREE.Mesh(bombGeo, bombMat), new THREE.Mesh(markGeo, new THREE.MeshBasicMaterial({ transparent:true, depthWrite:false })));
  list.push(new THREE.Mesh(beamGeo, glowMat('#FFF6C0', 3)), new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ transparent:true, opacity:0.5, depthWrite:false, blending:THREE.AdditiveBlending })));
  list.push(new THREE.Mesh(shotGeo, glowMat('#FF6B4A', 2.2)), new THREE.Mesh(needleGeo, glowMat('#FFB21E', 2.2)));
  return list;
}
