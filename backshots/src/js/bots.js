// Bot brains for the battle royale (from Microgang's, retuned for dark offices). A bot sees only what walls don't
// hide, and the dark hides a lot: someone standing in shadow is noticed only up close or when they shoot or shine a
// flashlight. Bots hear shots, turn on whoever hurts them, aim with a human delay and wobble (by difficulty), fight
// the recoil imperfectly, fire in bursts at range, reload when it is safe, break line of sight when badly hurt,
// lie in ambush in dark spots that look out onto lit floor, and use the flashlight only to cross the dark. Early on
// they loot (a better gun, armour, ammo, medicine), patch themselves up when it is quiet, pick the gun for the
// distance, and move into the light before the dark catches them.
import { G, on } from './state.js';
import { losClear, PW } from './phys.js';
import { findPath, walkLine, randomNode, NAV } from './nav.js';
import { gun, eyeY, reserve, HP_MAX } from './fighter.js';
import { LOOT, lootNear, wants, takeLoot } from './loot.js';
import { Z, zoneLit, outside, STAGES } from './zone.js';
import { lightAt } from './level/lights.js';
import { angDiff, clamp, rand, gauss } from './util.js';

export const DIFF = {
  easy:  { react:0.6,  err:0.026, settle:1.0, turn:3.0, head:0.06, comp:0.35, burst:0.25, range:0.8, fov:0.5, dark:1.25 },
  normal:{ react:0.42, err:0.022, settle:0.9, turn:4.6, head:0.16, comp:0.6, burst:0.45, range:1, fov:0.38, dark:1 },
  hard:  { react:0.24, err:0.008, settle:0.42, turn:7, head:0.32, comp:0.85, burst:0.7, range:1.15, fov:0.22, dark:0.8 },
};
// preferred distance band, farthest it shoots, farthest it notices someone (in good light)
const BAND = { rifle:[7, 22, 55, 50], shotgun:[2, 7, 20, 34], sniper:[18, 50, 120, 100], pistol:[5, 16, 35, 38] };

function brain(f){
  return f.bot_ || (f.bot_ = { target:null, reactT:rand(0, 0.4), fireDelay:0, err:{ x:0, y:0, tx:0, ty:0, t:0 }, track:0, strafeT:0, strafeDir:1,
    goal:null, goalT:0, path:null, pi:0, pathKey:'', stuckT:0, lx:0, lz:0, retreat:false, lastSeen:null, lastSeenT:-99, heard:null, heardT:-99,
    burstT:0, losT:0, los:false, aimHead:false, crouchT:0, holdT:0, hunt:null });
}
export function botReset(f){ f.bot_ = null; }

// how easy a fighter is to see right now: the light where they stand, their flashlight, their muzzle flash
export function visibility(g){
  let v = clamp(lightAt(PW.L, g.x, g.z), 0, 1.2) * (0.2 + 0.8 * zoneLit(g.x, g.z));
  if(g.light) v = Math.max(v, 1.1);
  if(G.time - g.lastShotT < 0.35) v = Math.max(v, 1.2);
  return v;
}

on('fire', f => {
  for(const b of G.fighters){
    if(!b.bot || b === f || !b.alive) continue;
    const d = Math.hypot(b.x - f.x, b.z - f.z);
    if(d < (gun(f).W.kind === 'pistol' ? 38 : 55)){ const B = brain(b); B.heard = { x:f.x, z:f.z, f, d }; B.heardT = G.time; }
  }
});
on('step', (f, run) => {
  // running footsteps carry a few metres
  for(const b of G.fighters){ if(!b.bot || b === f || !b.alive) continue; const d = Math.hypot(b.x - f.x, b.z - f.z); if(d < (run ? 9 : 5)){ const B = brain(b); B.heard = { x:f.x, z:f.z, f }; B.heardT = G.time; } }
});
on('damage', (t, amt, src) => {
  if(!t.bot || !src || src === t) return;
  const B = brain(t);
  B.lastSeen = { x:src.x, z:src.z }; B.lastSeenT = G.time;
  if(!B.target || Math.random() < 0.6){ B.hunt = src; B.reactT = Math.min(B.reactT, 0.12); }
  B.holdT = 0;
});

function perceive(f, D){
  const B = brain(f), ex = f.x, ey = eyeY(f), ez = f.z, sy = Math.sin(f.yaw), cy = Math.cos(f.yaw);
  const band = BAND[gun(f).W.kind];
  let best = null, bs = 1e9;
  for(const g of G.fighters){
    if(g === f || !g.alive) continue;
    const dx = g.x - f.x, dz = g.z - f.z, d = Math.hypot(dx, dz);
    // in the dark you are seen only close by
    const vis = visibility(g), range = band[3] * D.range * (0.12 + 0.88 * Math.min(1, vis / D.dark));
    if(d > range && g !== B.hunt) continue;
    // the eyes cover about ±65° (more on hard); right behind, only someone very close is felt
    const front = (-sy * dx - cy * dz) / (d || 1);
    if(front < D.fov && d > 2.5 && g !== B.hunt && g !== B.target) continue;
    if(!losClear(ex, ey, ez, g.x, g.y + g.h * 0.75, g.z)) continue;
    let s = d - (g === B.target ? 10 : 0) - (g === B.hunt ? 14 : 0) - (1 - g.hp / 100) * 8 + (g.isMe && G.match.diff === 'easy' ? 8 : 0);
    if(s < bs){ bs = s; best = g; }
  }
  if(best && best !== B.target){
    // noticing someone in shadow takes longer
    const vis = visibility(best);
    // and the farther and the less it moves, the longer it takes to be sure
    const dd = Math.hypot(best.x - f.x, best.z - f.z), still = Math.hypot(best.vx, best.vz) < 0.5 && G.time - best.lastShotT > 1;
    B.fireDelay = (D.react * rand(0.7, 1.3) + dd / 45 + (still ? 0.25 : 0)) * (vis < 0.4 ? 1.8 : 1); B.track = 0; B.aimHead = Math.random() < D.head;
  }
  // early on, someone who has not seen you yet is often let walk past (looting matters more than a fair fight),
  // unless they come close or carry something much worse
  const calm = Z.on ? clamp(1 - Z.stage / 3, 0, 1) * (G.match.alive > 4 ? 1 : 0) : clamp(1 - G.time / 240, 0, 1);
  if(best && best !== B.target && calm > 0){
    const dd = Math.hypot(best.x - f.x, best.z - f.z), seen = best.bot_ && best.bot_.target === f;
    if(!seen && dd > 7 && gun(best).W.rank >= gun(f).W.rank - 1 && Math.random() < 0.55 * calm){ B.letGo = best; B.letGoT = G.time; best = null; }
  }
  if(B.letGo && best === B.letGo && G.time - B.letGoT < 4 && !(best.bot_ && best.bot_.target === f) && Math.hypot(best.x - f.x, best.z - f.z) > 6) best = null;
  B.target = best;
  if(best){ B.lastSeen = { x:best.x, z:best.z }; B.lastSeenT = G.time; B.hunt = null; }
}

// ambush spots: dark floor within a few metres of lit floor (you see them, they don't see you)
let SPOTS = null, SPOT_L = null;
function spots(){
  if(SPOTS && SPOT_L === PW.L) return SPOTS;
  SPOT_L = PW.L; SPOTS = [];
  for(const [x, z] of NAV.nodes){
    if(lightAt(PW.L, x, z) > 0.22) continue;
    let lit = 0; for(let a = 0; a < 8; a++){ const ang = a * Math.PI / 4; for(const r of [3, 5]){ if(lightAt(PW.L, x + Math.cos(ang) * r, z + Math.sin(ang) * r) > 0.6) lit++; } }
    if(lit >= 3) SPOTS.push([x, z]);
  }
  return SPOTS;
}
// the light is going: get inside the next circle in time
function zoneGoal(f){
  if(!Z.on) return null;
  const c = Z.b || { cx:Z.cx, cz:Z.cz, r:Z.r }, d = Math.hypot(f.x - c.cx, f.z - c.cz);
  const late = Z.phase === 'shrink' || (Z.b && Z.phase === 'wait' && Z.t > 0 && (STAGE_WAIT() - Z.t) < d / 3 + 25);
  if(!(outside(f.x, f.z) || (late && d > c.r - 3))) return null;
  // just inside the edge on the near side, not the middle (everyone in the middle is a massacre)
  const want = Math.max(c.r * 0.3, c.r - rand(6, 14)), ux = (f.x - c.cx) / (d || 1), uz = (f.z - c.cz) / (d || 1), a = rand(-0.5, 0.5);
  const vx = ux * Math.cos(a) - uz * Math.sin(a), vz = ux * Math.sin(a) + uz * Math.cos(a);
  return { x:c.cx + vx * want, z:c.cz + vz * want, zone:true };
}
const STAGE_WAIT = () => (STAGES[Z.stage] || { wait:0 }).wait;
// the most wanted item within reach: a better gun, armour, ammo for the gun in hand, medicine when hurt
function lootGoal(f, kitted){
  let best = null, bs = 0;
  for(const it of LOOT.items){
    const d = Math.hypot(it.x - f.x, it.z - f.z); if(d > roam() || !wants(f, it)) continue;
    // someone else is already heading there: leave it (two looters meeting over one vest is how fights start)
    if(it.claim && it.claim !== f && it.claim.alive && it.claim.bot_ && it.claim.bot_.goal && it.claim.bot_.goal.item === it) continue;
    let v = it.kind === 'vest' ? 4 : it.kind === 'helmet' ? 2.5 : it.kind === 'ammo' ? (reserve(f) < gun(f).W.mag ? 4 : 1) : f.hp < 70 ? 3 : 1;
    if(it.kind === 'gun') v = 2 + (WRANK[it.gun] - Math.min(...f.guns.map(g => g.W.rank))) * 1.5;
    if((kitted || G.time > 100) && v < 3) continue;
    const s = v / (6 + d);
    if(s > bs){ bs = s; best = it; }
  }
  return best;
}
const WRANK = { pistol:1, shotgun:2, sniper:3, ak:4, m4:4 };
// how far a bot strays from where it is: at first the rooms around it, later the whole floor
const roam = () => Math.min(40, 14 + G.time * 0.2);
function goal(f){
  const B = brain(f);
  const zg = zoneGoal(f); if(zg) return zg;
  // the fewer are left, the more everyone hunts
  // the hunt grows as the light closes in (and when only a handful are left)
  const left = G.match.alive || G.fighters.length, late = Math.max(Z.on ? clamp((Z.stage - 1 + (Z.phase === 'shrink' ? 0.5 : 0)) / 3, 0, 1) : 0, clamp(1 - (left - 2) / 4, 0, 1)), early = clamp(1 - G.time / 150, 0, 1);
  const armed = gun(f).W.rank;
  if(B.lastSeen && G.time - B.lastSeenT < 7 && (armed > 1 || f.hp > 60 || Math.random() < 0.3)) return { x:B.lastSeen.x + rand(-3, 3), z:B.lastSeen.z + rand(-3, 3) };
  if(B.heard && G.time - B.heardT < 7 && Math.random() < 0.12 + 0.7 * late - 0.1 * early && (B.heard.d || 0) < 30 + late * 30) return { x:B.heard.x + rand(-5, 5), z:B.heard.z + rand(-5, 5) };
  // kitted out (a rifle and armour): loot only what really matters, otherwise sit and listen more
  const kitted = gun(f).W.rank >= 3 && f.armor > 0 && reserve(f) >= gun(f).W.mag;
  const it = lootGoal(f, kitted);
  if(it && Math.random() < 0.9 - late * 0.5){ it.claim = f; return { x:it.x, z:it.z, item:it }; }
  // lie in wait in the dark now and then
  if(Math.random() < (G.time < 40 ? 0.15 : kitted ? 0.7 : 0.45) * (1 - late * 0.6) && spots().length){
    const S = spots(), near = [];
    for(let i = 0; i < 40; i++){ const p = S[Math.floor(Math.random() * S.length)]; const d = Math.hypot(p[0] - f.x, p[1] - f.z); if(d > 5 && d < 35) near.push(p); if(near.length >= 4) break; }
    if(near.length){ const p = near[Math.floor(Math.random() * near.length)]; return { x:p[0], z:p[1], ambush:true, kitted }; }
  }
  // search a dead end (that is where loot lies; stage 2 puts it there) and linger a moment
  const loot = PW.L.loot;
  if(loot.length && Math.random() < 0.4 * (1 - late)){
    for(let i = 0; i < 12; i++){ const p = loot[Math.floor(Math.random() * loot.length)], d = Math.hypot(p.x - f.x, p.z - f.z); if(d > 4 && d < 30) return { x:p.x, z:p.z, search:true }; }
  }
  // hunt: head roughly toward someone
  if(Math.random() < 0.15 + late * 0.75 - early * 0.1){
    const others = G.fighters.filter(o => o !== f && o.alive);
    if(others.length){ others.sort((a, b) => Math.hypot(a.x - f.x, a.z - f.z) - Math.hypot(b.x - f.x, b.z - f.z));
      const o = others[Math.floor(Math.random() * Math.min(3, others.length))], k = 0.8 + late * 0.2, j = 6 * (1 - late) + 2;
      return { x:f.x + (o.x - f.x) * k + rand(-j, j), z:f.z + (o.z - f.z) * k + rand(-j, j) }; }
  }
  for(let i = 0; i < 30; i++){ const n = randomNode(); if(Math.hypot(n[0] - f.x, n[1] - f.z) < roam() * 1.5) return { x:n[0], z:n[1] }; }
  const n = randomNode(); return { x:n[0], z:n[1] };
}
function waypoint(f, gx, gz, chase){
  const B = brain(f), key = Math.round(gx / 3) + ',' + Math.round(gz / 3);
  B.repT = (B.repT || 0) - 1;
  if(!B.path || B.pathKey !== key || (chase && B.repT <= 0)){
    B.path = findPath(f.x, f.z, gx, gz); B.pathKey = key; B.pi = 0; B.repT = 45;
    if(!B.path) return [gx, gz];
  }
  // next waypoint once close — but round a corner only when the way to the one after is clear
  while(B.pi < B.path.length - 1){ const d = Math.hypot(B.path[B.pi][0] - f.x, B.path[B.pi][1] - f.z); if(d < 0.25 || (d < 0.8 && walkLine(f.x, f.z, B.path[B.pi + 1][0], B.path[B.pi + 1][1]))) B.pi++; else break; }
  const w = B.path[B.pi];
  if(Math.hypot(w[0] - f.x, w[1] - f.z) > 12 && !walkLine(f.x, f.z, w[0], w[1])){ B.path = null; return [gx, gz]; }
  return w;
}

export function botThink(f, dt){
  if(!f.alive) return;
  const B = brain(f), D = DIFF[G.match.diff] || DIFF.normal, I = f.inp, g = gun(f), W = g.W;
  I.jump = false; I.reload = false; I.lean = 0;
  B.holdT = Math.max(0, B.holdT - dt);
  B.reactT -= dt; B.fireDelay -= dt; B.strafeT -= dt; B.goalT -= dt; B.losT -= dt;
  if(B.reactT <= 0){ B.reactT = D.react * rand(0.6, 1.1); perceive(f, D); }
  let T = B.target;
  if(T && !T.alive){ T = B.target = null; }
  // the gun for the distance (a shotgun up close, the rifle or the sniper far off); an empty one is put away
  if(f.guns.length > 1 && f.next < 0 && !f.reload && !f.use && f.equipT <= 0){ const s_ = bestSlot(f, T ? Math.hypot(T.x - f.x, T.z - f.z) : 20); if(s_ !== f.cur && (!T || B.fireDelay > 0 || g.mag === 0 || Math.random() < dt * 2)) I.slot = s_; }
  // loot: take what lies at hand and is worth it
  if((B.lootT = (B.lootT || 0) - dt) <= 0){ B.lootT = 0.4; for(const it of lootNear(f)) if(wants(f, it)){ takeLoot(f, it); break; } }
  if(B.goal && B.goal.item && !B.goal.held && LOOT.items.indexOf(B.goal.item) < 0 && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) > 1.5) B.goalT = 0;
  // patch up when it is quiet
  if(!T && !f.use && f.hp < 75 && (f.meds.medkit || f.meds.bandage) && f.sinceHit > 2.5 && G.time - B.lastSeenT > 3 && !outside(f.x, f.z)) I.heal = true;
  if(T && f.sinceHit < 1.5 && (f.hp < 35 || (f.hp < 60 && T.hp > f.hp + 25 && Math.random() < dt * 4))) B.retreat = true;
  if(B.retreat && (!T || f.sinceHit > 5)) B.retreat = false;
  const ex = f.x, ey = eyeY(f), ez = f.z;
  let wx = 0, wz = 0, sprint = false;
  I.aim = false; I.fire = false; I.crouch = false;
  // the flashlight: on to cross the dark when nobody is known to be around, off as soon as there is a fight
  const here = lightAt(PW.L, f.x, f.z);
  const wantLight = !T && !B.holdT && here < 0.18 && G.time - B.lastSeenT > 6 && G.time - B.heardT > 4;
  if(wantLight !== f.light && Math.random() < dt * 3) I.light = true;
  if(T){
    const dx = T.x - f.x, dz = T.z - f.z, d = Math.hypot(dx, dz) || 0.01;
    const band = BAND[W.kind];
    B.track += dt;
    const E = B.err; E.t -= dt;
    if(E.t <= 0){ E.t = rand(0.25, 0.6);
      const e = D.err * (1 + Math.max(0, 1 - B.track / D.settle) * 2.5) * (1 + d / 80) * (visibility(T) < 0.4 ? 1.6 : 1); E.tx = gauss() * e; E.ty = gauss() * e * 0.7; if(Math.random() < 0.1) B.aimHead = Math.random() < D.head; }
    E.x += (E.tx - E.x) * Math.min(1, dt * 5); E.y += (E.ty - E.y) * Math.min(1, dt * 5);
    const py = T.y + (B.aimHead ? T.h * 0.93 : T.h * 0.66);
    const ax = T.x - ex, ay = py - ey, az = T.z - ez, hd = Math.hypot(ax, az);
    const yawT = Math.atan2(-ax, -az) + E.x, pitT = Math.atan2(ay, hd) + E.y;
    const mt = D.turn * dt;
    I.yaw = f.yaw + clamp(angDiff(f.yaw, yawT - f.recY * D.comp), -mt, mt);
    I.pitch = f.pitch + clamp(pitT - f.recP * D.comp - f.pitch, -mt, mt);
    if(B.losT <= 0){ B.losT = 0.18; B.los = losClear(ex, ey, ez, T.x, T.y + T.h * 0.7, T.z); }
    const tol = Math.atan2(0.4, d) + 0.02;
    const aligned = Math.abs(angDiff(f.yaw + f.recY, yawT - E.x)) < tol * 1.6 && Math.abs(f.pitch + f.recP - (pitT - E.y)) < tol * 1.6;
    I.aim = B.los && d > 14 && W.kind !== 'shotgun' && !B.retreat;
    let fire = B.los && B.fireDelay <= 0 && aligned && d < band[2] * D.range && !f.reload;
    if(W.auto && d > 25 && f.adsK < 0.7) fire = false;
    if(W.auto && d > 18){ if(B.burstT > 0){ B.burstT -= dt; fire = false; } else if(f.shots >= 3 + Math.round(D.burst * 7)){ B.burstT = rand(0.2, 0.45); } }
    I.fire = fire;
    if(I.aim && Math.random() < dt * 0.4) B.crouchT = rand(0.6, 2);
    B.crouchT -= dt; I.crouch = B.crouchT > 0;
    let radial = d > band[1] ? 1 : d < band[0] ? -1 : 0;
    if(B.retreat) radial = -1;
    if(B.strafeT <= 0){ B.strafeT = rand(0.4, 1.4); B.strafeDir = Math.random() < 0.5 ? -1 : 1; }
    const ux = dx / d, uz = dz / d, strafe = I.aim ? (d > 30 ? 0.25 : 0.45) : 0.85;
    wx = ux * radial - uz * B.strafeDir * strafe; wz = uz * radial + ux * B.strafeDir * strafe;
    if(!B.los && d > 2.5 && !B.retreat){ const [cx, cz] = waypoint(f, T.x, T.z, true), cl = Math.hypot(cx - f.x, cz - f.z) || 1; wx = (cx - f.x) / cl; wz = (cz - f.z) / cl; sprint = d > 18; }
    if(B.retreat){ wx = -ux - uz * B.strafeDir * 0.6; wz = -uz + ux * B.strafeDir * 0.6; if(!B.los || Math.random() < 0.5) I.fire = fire = false; sprint = !fire; }
  } else {
    if(B.goal && B.goal.ambush && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 1.5 && !B.goal.held){ B.goal.held = true; B.holdT = rand(10, 24) * (B.goal.kitted ? 1.4 : 1); B.goalT = B.holdT; }
    if(B.goal && B.goal.item && LOOT.items.indexOf(B.goal.item) < 0 && !B.goal.held && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 1.5){ B.goal.held = true; B.holdT = rand(2.5, 6); B.goalT = B.holdT; }
    if(B.goal && B.goal.search && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 1.2 && !B.goal.held){ B.goal.held = true; B.holdT = rand(3, 7); B.goalT = B.holdT; B.searching = true; }
    // a goal reached: stop, look round the room for a while before moving on (more so once kitted out)
    if(B.goal && !B.goal.held && !B.goal.zone && !B.goal.ambush && !B.goal.item && !B.goal.search && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 2){ B.goal.held = true; B.goal.search = true; B.holdT = rand(3, 9) * (gun(f).W.rank >= 3 ? 1.5 : 1); B.goalT = B.holdT; }
    if(!B.goal || B.goalT <= 0 || (!B.goal.ambush && !B.goal.item && !B.goal.held && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 2) || (B.goal.item && !B.goal.held && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 0.9)){ B.goal = goal(f); B.goalT = rand(7, 14) + (B.goal.ambush || B.goal.item || B.goal.zone ? Math.hypot(B.goal.x - f.x, B.goal.z - f.z) / 2 : 0); B.path = null; B.holdT = 0; }
    const [px, pz] = waypoint(f, B.goal.x, B.goal.z);
    const dx = px - f.x, dz = pz - f.z, d = Math.hypot(dx, dz) || 1;
    wx = dx / d; wz = dz / d;
    if(B.holdT > 0){ wx = wz = 0; I.crouch = !(B.goal && B.goal.search); }
    // in ambush it watches the lit side; heard something: looks there
    let look;
    if(B.heard && G.time - B.heardT < 3) look = Math.atan2(-(B.heard.x - f.x), -(B.heard.z - f.z));
    else if(B.holdT > 0){ if(B.lookYaw === undefined || Math.random() < dt * 0.3) B.lookYaw = brightestYaw(f); look = B.lookYaw; }
    else look = Math.atan2(-wx, -wz) + Math.sin(G.time * 0.7 + f.id) * 0.45;
    const mt = D.turn * 0.55 * dt;
    I.yaw = f.yaw + clamp(angDiff(f.yaw, look), -mt, mt); I.pitch = f.pitch * (1 - Math.min(1, dt * 3));
    if(g.mag < W.mag * 0.5 && !f.reload) I.reload = true;
    if(f.use) wx = wz = 0;
    sprint = (B.goal.zone && outside(f.x, f.z)) || (G.time > 75 && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) > 14) && !f.reload && B.holdT <= 0 && (B.sprintRoll = B.goalT > 0 ? B.sprintRoll ?? Math.random() < 0.6 : Math.random() < 0.6);
  }
  // no fight going on: careful steps through the rooms (a walk), unless the dark is coming or the goal is far
  let pace = 1;
  if(!T && !sprint && B.goal && B.goal.zone) pace = Z.phase === 'shrink' ? 1 : 0.7;
  else if(!T && !sprint && G.time - B.lastSeenT > 5) pace = B.goal && B.goal.item && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 8 ? 0.6 : 0.42;
  const m = Math.min(1, Math.hypot(wx, wz)) * pace, sy = Math.sin(I.yaw), cy = Math.cos(I.yaw);
  I.mz = (-wx * sy - wz * cy) * m; I.mx = (wx * cy - wz * sy) * m;
  I.sprint = sprint && I.mz > 0.5 && !I.fire;
  B.stuckT += dt; if(m > 0.3) B.pushT = (B.pushT || 0) + dt;
  if(B.stuckT > 1.2){ const moved = Math.hypot(f.x - B.lx, f.z - B.lz), pushed = B.pushT > 1.0; B.pushT = 0; if(pushed && moved < 0.6 && B.holdT <= 0){ I.jump = Math.random() < 0.3; B.strafeDir *= -1; B.goal = null; B.path = null; } B.stuckT = 0; B.lx = f.x; B.lz = f.z; }
}
// which slot suits a fight at distance d: the gun's band, its rank, rounds left
function bestSlot(f, d){
  let best = f.cur, bs = -1e9;
  f.guns.forEach((g, i) => {
    const W = g.W, b = BAND[W.kind], left = g.mag + reserve(f, g);
    if(!left) return;
    let s = W.rank - (d > b[2] ? 3 : 0) - (d < b[0] * 0.5 && W.kind === 'sniper' ? 3 : 0) + (W.kind === 'shotgun' && d < 9 ? 3 : 0) + (i === f.cur ? 0.5 : 0);
    if(s > bs){ bs = s; best = i; }
  });
  return best;
}
// the direction with the most light a few metres out (an ambusher faces it)
function brightestYaw(f){
  let best = f.yaw, bl = -1;
  for(let a = 0; a < 8; a++){ const yaw = a * Math.PI / 4, l = lightAt(PW.L, f.x - Math.sin(yaw) * 4, f.z - Math.cos(yaw) * 4) + lightAt(PW.L, f.x - Math.sin(yaw) * 7, f.z - Math.cos(yaw) * 7);
    if(l > bl && losClear(f.x, 1.5, f.z, f.x - Math.sin(yaw) * 4, 1.5, f.z - Math.cos(yaw) * 4)){ bl = l; best = yaw; } }
  return best;
}
