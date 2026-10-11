// Bot brains for «Споры»: collect spores, fight at their weapon's best range, protect carriers, run home when hurt.
import { G } from './state.js';
import { A, findPath, losClear, walkClear, inGrass, tileAtXZ, sightClear, segHit, colOf, rowOf } from './arena.js';
import { fogR, fogAhead, ROYALE } from './royale.js';
import { goalOf } from './football.js';
import { canSee, canAttack } from './combat.js';
import { bankShot } from './player.js';
import { rand, clamp, angDiff, TAU } from './util.js';

export const SKILL = { easy:{ err:0.22, react:0.6, lead:0.4, dodge:0.2 }, normal:{ err:0.11, react:0.35, lead:0.75, dodge:0.5 }, hard:{ err:0.05, react:0.18, lead:1, dodge:0.85 } };
const PREF = { shroom:0.5, beetle:0.72, wasp:0.82, roly:0.62, hopper:0.6 };

export function newBot(skill = 'normal'){
  return { S:SKILL[skill], temper:rand() < 0.55 ? 'careful' : 'bold', path:null, pathT:0, gx:null, gz:null, mode:'idle', target:null, seenT:0, mem:new Map(), strafe:rand() < 0.5 ? -1 : 1, strafeT:rand(0.6, 1.6), thinkT:0, holdX:0, holdZ:0, stuck:0, lx:0, lz:0 };
}

const dist = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

function goTo(f, x, z, dt){
  const B = f.bot;
  B.pathT -= dt;
  if(!B.path || B.pathT <= 0 || Math.hypot((B.gx ?? 1e9) - x, (B.gz ?? 1e9) - z) > 1.2){
    B.path = walkClear(f.x, f.z, x, z) ? [{ x, z }] : findPath(f.x, f.z, x, z);
    B.gx = x; B.gz = z; B.pathT = rand(0.5, 0.9);
  }
  if(!B.path || !B.path.length) return [0, 0];
  let p = B.path[0];
  while(B.path.length > 1 && Math.hypot(p.x - f.x, p.z - f.z) < 0.45){ B.path.shift(); p = B.path[0]; }
  const dx = p.x - f.x, dz = p.z - f.z, d = Math.hypot(dx, dz);
  if(d < 0.25) return [0, 0];
  return [dx / d, dz / d];
}

export function botThink(f, dt){
  const B = f.bot, H = f.H, inp = f.inp, M = G.match;
  if(!f.alive || !M) return;
  const now = G.time;
  // ---- perception ----
  let best = null, bestScore = -1e9;
  for(const o of G.fighters){
    if(!o.alive || o.team === f.team) continue;
    if(canSee(f, o)){ B.mem.set(o.id, { x:o.x, z:o.z, t:now, o }); }
    else continue;
    const d = dist(f, o);
    const score = -d + (o.gems || 0) * 1.2 + (G.ball && G.ball.holder === o ? 6 : 0) + (o.power || 0) * 0.5 + (1 - o.hp / o.max) * 4 + (o === B.target ? 2 : 0);
    if(score > bestScore){ bestScore = score; best = o; }
  }
  if(best !== B.target){ B.target = best; B.seenT = 0; } else B.seenT += dt;
  const T = B.target;
  B.shootAt = null;
  let mx = 0, mz = 0;
  B.kick = null;
  if(M.mode === 'br') [mx, mz] = royaleGoal(f, B, T, dt);
  else if(M.mode === 'ball') [mx, mz] = footballGoal(f, B, T, dt);
  else [mx, mz] = sporesGoal(f, B, T, dt);
  fightMoveAndShoot(f, B, T, mx, mz, dt);
  // the ball carrier never shoots: the button kicks, so it only fires for a planned shot or pass
  if(G.ball && G.ball.holder === f){
    inp.fire = inp.sup = false;
    if(B.kick){ inp.tx = B.kick.x; inp.tz = B.kick.z; inp.aim = Math.atan2(B.kick.x - f.x, B.kick.z - f.z); if(B.kick.sup && f.charge >= 1) inp.sup = true; else inp.fire = true; }
  }
}

// «Дождевикбол»: carry the ball toward their goal and shoot through a clear lane; pass when pressed;
// the closest teammate chases a loose ball, two press an enemy carrier, slot 0 guards our goal, the rest get open
// a kick lane: no hedge in the way and no enemy standing near the line
function laneClear(f, x1, z1){
  if(segHit(f.x, f.z, x1, z1) >= 0) return false;
  const dx = x1 - f.x, dz = z1 - f.z, l2 = dx * dx + dz * dz || 1;
  for(const o of G.fighters){
    if(!o.alive || o.team === f.team) continue;
    const t = clamp(((o.x - f.x) * dx + (o.z - f.z) * dz) / l2, 0, 1), px = f.x + dx * t - o.x, pz = f.z + dz * t - o.z;
    if(t > 0.05 && px * px + pz * pz < 1.2 * 1.2) return false;
  }
  return true;
}
function footballGoal(f, B, T, dt){
  const b = G.ball, M = G.match, now = G.time; if(!b || M.resetT > 0) return [0, 0];
  const mine = goalOf(f.team), theirs = goalOf(1 - f.team);
  const mates = G.fighters.filter(o => o.team === f.team && o.alive), holder = b.holder;
  const toGoal = o => Math.hypot(theirs.x - o.x, theirs.z - o.z);
  if(holder === f){
    B.mode = 'carry';
    // aim at a corner of the goal the keeper isn't covering
    const gx = theirs.x + (rand() < 0.5 ? -1 : 1) * rand(0.8, 2.6), dg = toGoal(f), clear = laneClear(f, gx, theirs.z);
    if(dg < 9.5 && clear){ B.kick = { x:gx, z:theirs.z, sup:f.charge >= 1 && dg > 6 }; return [0, 0]; }
    const threat = G.fighters.some(o => o.alive && o.team !== f.team && Math.hypot(o.x - f.x, o.z - f.z) < 3.5);
    if(threat && now > (B.passT || 0)){
      const mate = mates.filter(o => o !== f && toGoal(o) < dg + 2 && Math.hypot(o.x - f.x, o.z - f.z) < 12 && laneClear(f, o.x, o.z)).sort((a, c) => toGoal(a) - toGoal(c))[0];
      if(mate){ B.kick = { x:mate.x + mate.vx * 0.35, z:mate.z + mate.vz * 0.35 }; B.passT = now + 1.2; return [0, 0]; }
      if(dg < 14 && clear){ B.kick = { x:gx, z:theirs.z, sup:f.charge >= 1 }; return [0, 0]; }
    }
    return goTo(f, theirs.x, theirs.z, dt);
  }
  const order = mates.slice().sort((a, c) => Math.hypot(a.x - b.x, a.z - b.z) - Math.hypot(c.x - b.x, c.z - b.z)), rank = order.indexOf(f);
  const dBall = Math.hypot(b.x - f.x, b.z - f.z);
  if(!holder && (rank === 0 || (rank === 1 && dBall < 7))){ B.mode = 'ball'; return goTo(f, b.x + b.vx * 0.3, b.z + b.vz * 0.3, dt); }
  if(holder && holder.team !== f.team && (rank <= 1 || Math.hypot(holder.x - mine.x, holder.z - mine.z) < 10)){ B.mode = 'press'; return goTo(f, holder.x, holder.z, dt); }
  if(f.slot === 0){
    // stand between the ball and our goal; come out for a ball that rolls close
    if(!holder && Math.hypot(b.x - mine.x, b.z - mine.z) < 8){ B.mode = 'ball'; return goTo(f, b.x, b.z, dt); }
    B.mode = 'guard'; const k = 0.16;
    return goTo(f, mine.x + (b.x - mine.x) * k, mine.z + (b.z - mine.z) * k, dt);
  }
  // get open up the pitch, one lane to each side
  B.mode = 'support';
  const side = f.slot === 1 ? -1 : 1, sx = b.x + (theirs.x - b.x) * 0.45 + side * 4, sz = b.z + (theirs.z - b.z) * 0.45;
  return goTo(f, clamp(sx, -A.hx + 2, A.hx - 2), sz, dt);
}

function sporesGoal(f, B, T, dt){
  const H = f.H, M = G.match, now = G.time;
  const myCount = M.count[f.team], foeCount = M.count[1 - f.team];
  const home = A.spawns[f.team][1] || A.spawns[f.team][0];
  // ---- goal ----
  B.thinkT -= dt;
  if(B.thinkT <= 0){
    B.thinkT = rand(0.2, 0.35);
    const hurt = f.hp < f.max * 0.42;
    if(f.gems >= 3 && hurt) B.mode = 'retreat';
    else if(M.cd && M.cd.team === f.team && f.gems > 0) B.mode = T && dist(f, T) < H.attack.range * 0.8 ? 'fight' : 'hold';
    else if(hurt && T && dist(f, T) < 6 && f.hp < T.hp) B.mode = 'retreat';
    else if(T && dist(f, T) < H.attack.range * 1.35) B.mode = 'fight';
    else if(G.pickups.length && !(M.cd && M.cd.team === f.team)) B.mode = 'collect';
    else if(M.cd && M.cd.team !== f.team) B.mode = 'hunt';
    else B.mode = 'patrol';
  }
  let mx = 0, mz = 0;
  if(B.mode === 'retreat' || B.mode === 'hold'){
    // back toward spawn; a little sideways shuffle when already safe
    const hx = home.x + (f.slot - 1) * 2.5, hz = home.z + (f.team === 0 ? -3 : 3);
    [mx, mz] = goTo(f, hx, hz, dt);
    if(Math.hypot(f.x - hx, f.z - hz) < 1.5){ mx = Math.sin(now * 1.3 + f.id) * 0.4; mz = 0; }
  } else if(B.mode === 'collect'){
    let pk = null, pd = 1e9;
    for(const p of G.pickups){ const d = Math.hypot(p.x - f.x, p.z - f.z) + (p.landed ? 0 : 1); if(d < pd){ pd = d; pk = p; } }
    // don't all three dive for the same spore: the furthest teammate patrols instead
    if(pk) [mx, mz] = goTo(f, pk.x, pk.z, dt);
  } else if(B.mode === 'hunt'){
    // go after the enemy carrier with the most spores (last place we saw them)
    let c = null; for(const o of G.fighters) if(o.alive && o.team !== f.team && (!c || o.gems > c.gems)) c = o;
    const m = c && B.mem.get(c.id);
      const mid = A.mine || { x:0, z:0 };
    const tx = m && now - m.t < 4 ? m.x : mid.x, tz = m && now - m.t < 4 ? m.z : mid.z + (f.team === 0 ? -4 : 4);
    [mx, mz] = goTo(f, tx, tz, dt);
  } else if(B.mode === 'patrol'){
    // hold a spot near the mine on our own side, spread out by slot
    const side = f.team === 0 ? 1 : -1;
    const mid = A.mine || { x:0, z:0 };
    const px = mid.x + (f.slot - 1) * 3.2, pz = mid.z + side * (2.5 + (f.slot === 1 ? 0 : 1.5));
    [mx, mz] = goTo(f, px, pz, dt);
  }
  return [mx, mz];
}

// «Последний гриб»: play for the place, not for knockouts.
//   - loot first (crates, power), fight only up close or when shot at
//   - weigh a fight before taking it: health × power against the enemy's; walk away from fights we'd lose
//   - don't run into someone else's fight: wait at the edge and finish the winner
//   - break off, hide (tall grass if there is some) and heal when hurt
//   - move to the next safe circle early and sit in cover there; ambush from grass; never chase into the fog
// Each bot has a temper: careful ones hide and wait, bold ones hunt once they have some power.
const strength = o => o.hp * (1 + 0.15 * (o.power || 0));
const inZone = (x, z, r) => Math.hypot(x, z) < r;
// a cover spot near (x, z) inside radius lim: tall grass if any, otherwise any open tile next to a hedge
function coverNear(x, z, lim, rad = 7){
  let best = null, bs = 1e9;
  for(let i = 0; i < 22; i++){
    const a = rand(0, TAU), d = rand(0, rad), px = x + Math.sin(a) * d, pz = z + Math.cos(a) * d;
    if(!inZone(px, pz, lim)) continue;
    const ch = tileAtXZ(px, pz); if(ch !== '.' && ch !== '"') continue;
    let sc = d + (ch === '"' ? -6 : 0);
    if(ch === '.'){ let walls = 0; for(const [dx, dz] of [[1.6, 0], [-1.6, 0], [0, 1.6], [0, -1.6]]) if(tileAtXZ(px + dx, pz + dz) === '#') walls++; sc -= walls * 1.5; }
    if(sc < bs){ bs = sc; best = { x:px, z:pz }; }
  }
  return best;
}
function royaleGoal(f, B, T, dt){
  const H = f.H, M = G.match, now = G.time, R = fogR(), soon = Math.min(R, fogAhead(8));
  const rc = Math.hypot(f.x, f.z), bold = B.temper === 'bold';
  B.holdFire = false;
  B.thinkT -= dt;
  if(B.thinkT <= 0){
    B.thinkT = rand(0.25, 0.4);
    B.crate = null; B.pk = null;
    const d = T ? dist(f, T) : 1e9, range = H.attack.range;
    const hitMe = now - (f.hurtAt || -9) < 1.5 && f.lastHitBy && f.lastHitBy.alive;   // someone is shooting at us right now
    const calm = M.t < ROYALE.calm * (bold ? 0.75 : 1.1) && !hitMe;
    const late = M.alive <= 4;
    // our odds against the target: health and power on both sides
    const odds = T ? strength(f) / Math.max(1, strength(T)) : 9;
    // is the target busy fighting somebody else?
    // a target running away isn't worth a chase across the maze
    const fleeing = T && (T.x - f.x) * T.vx + (T.z - f.z) * T.vz > 0 && Math.hypot(T.vx, T.vz) > 2;
    const busy = T && now - (T.hurtAt || -9) < 1.5 && T.lastHitBy && T.lastHitBy !== f && T.lastHitBy.alive && dist(T, T.lastHitBy) < 12;
    // the loot phase: nobody starts a fight, only answers one (or someone walks right into us)
    const quiet = calm && T && !hitMe;
    B.quiet = quiet;
    if(rc > soon - 2.5) B.mode = 'zone';
    else if(f.hp < f.max * 0.4 && (!T || d > range * 0.6)) B.mode = 'heal';
    else if(T && hitMe && f.lastHitBy === T && odds < (calm ? 1.3 : 0.7) && d > 3) B.mode = 'retreat';
    else if(quiet){ const loot = lootNear(f, soon); B.mode = loot ? (loot.pk ? 'collect' : 'crate') : 'hold'; if(loot){ B.pk = loot.pk; B.crate = loot.crate; } }
    else if(T && busy && odds < 2.5 && T.hp > T.max * 0.35) B.mode = 'wait';            // let them wear each other down
    else if(T && d < range * (calm ? 0.6 : 1.3) && !(fleeing && d > range * 0.9) && (odds > (M.alive <= 2 ? 0.8 : late ? 1.15 : bold ? 1.0 : 1.35) || hitMe || d < range * 0.45)) B.mode = 'fight';
    else if(T && d < range * 1.3) B.mode = 'avoid';                                     // a fight we'd lose: slip away
    else {
      const loot = lootNear(f, soon);
      if(loot && (loot.pk || !late)){ B.mode = loot.pk ? 'collect' : 'crate'; B.pk = loot.pk; B.crate = loot.crate; }
      else {
        let seen = null; for(const m of B.mem.values()) if(m.o.alive && now - m.t < 5 && inZone(m.x, m.z, soon) && (!seen || m.t > seen.t)) seen = m;
        // only the bold hunt, and only with health and a little power; in the final everyone closes in
        if(seen && !calm && f.hp > f.max * 0.8 && (M.alive <= 2 || (bold && (f.power || 0) >= 4 && M.alive <= 6 && !late))){ B.mode = 'hunt'; B.huntX = seen.x; B.huntZ = seen.z; }
        else B.mode = 'hold';
      }
    }
    if(B.mode !== B.lastMode){ B.spot = null; B.lastMode = B.mode; }
  }
  const lim = Math.max(2, soon - 2.5);
  B.noChase = !!T && !inZone(T.x, T.z, soon - 1);   // never follow anyone out into the fog
  // a bot in hiding doesn't give itself away: it shoots only at close range or when shot at
  if(B.mode === 'heal' || B.mode === 'hold' || B.mode === 'wait' || B.mode === 'avoid' || B.quiet) B.holdFire = true;
  if(B.mode === 'zone'){
    // into the circle early, toward cover on our side of the middle
    if(!B.spot || !inZone(B.spot.x, B.spot.z, lim)){ const k = Math.min(soon * 0.55, rc) / (rc || 1); B.spot = coverNear(f.x * k, f.z * k, lim, 5) || { x:f.x * k, z:f.z * k }; }
    return goTo(f, B.spot.x, B.spot.z, dt);
  }
  if((B.mode === 'retreat' || B.mode === 'avoid') && T){
    // away from the threat, never out into the fog, preferably into cover
    const d = dist(f, T) || 1;
    if(!B.spot || now > (B.spotT || 0)){
      let ax = f.x + (f.x - T.x) / d * 7, az = f.z + (f.z - T.z) / d * 7;
      const ra = Math.hypot(ax, az); if(ra > lim){ ax *= lim / ra; az *= lim / ra; }
      B.spot = coverNear(ax, az, lim, 4) || { x:ax, z:az }; B.spotT = now + 1.5;
    }
    return goTo(f, B.spot.x, B.spot.z, dt);
  }
  if(B.mode === 'heal' || B.mode === 'hold' || B.mode === 'wait'){
    // sit still in cover; 'wait' keeps a distance from the fight it is watching
    if(!B.spot || !inZone(B.spot.x, B.spot.z, lim)){
      let cx = f.x, cz = f.z;
      if(B.mode === 'wait' && T){ const d = dist(f, T) || 1, keep = f.H.attack.range + 2; cx = T.x + (f.x - T.x) / d * keep; cz = T.z + (f.z - T.z) / d * keep; }
      // late in the match, hold somewhere that stays safe for a while
      if(B.mode === 'hold' && rc > soon * 0.7){ const k = soon * 0.5 / (rc || 1); cx = f.x * k; cz = f.z * k; }
      B.spot = coverNear(cx, cz, lim) || { x:cx, z:cz };
    }
    if(Math.hypot(B.spot.x - f.x, B.spot.z - f.z) > 0.8) return goTo(f, B.spot.x, B.spot.z, dt);
    // a slow look around while waiting so the body isn't frozen solid
    if(!T) f.inp.aim += dt * 0.4;
    return [0, 0];
  }
  if(B.mode === 'collect' && B.pk && G.pickups.includes(B.pk)) return goTo(f, B.pk.x, B.pk.z, dt);
  if(B.mode === 'crate' && B.crate && B.crate.alive){
    const k = B.crate, d = Math.hypot(k.x - f.x, k.z - f.z), want = Math.min(H.attack.range * 0.7, 6);
    // a clear shot means the first thing the ray meets is the crate itself
    const t = segHit(f.x, f.z, k.x, k.z), hx = f.x + (k.x - f.x) * t, hz = f.z + (k.z - f.z) * t;
    const clear = t < 0 || (colOf(hx + (k.x - f.x) / (d || 1) * 0.08) === k.c && rowOf(hz + (k.z - f.z) / (d || 1) * 0.08) === k.r);
    if(d < want + 0.5 && (clear || H.attack.kind === 'lob')){ B.shootAt = k; return [Math.sin(now * 1.7 + f.id) * 0.3, Math.cos(now * 1.3 + f.id) * 0.3]; }
    return goTo(f, k.x, k.z, dt);
  }
  if(B.mode === 'hunt'){
    if(Math.hypot(B.huntX - f.x, B.huntZ - f.z) > 1.2) return goTo(f, B.huntX, B.huntZ, dt);
    B.thinkT = 0;
  }
  return [0, 0];
}
// the nearest power spore, or crate, lying inside the safe area
// (loot a rival we can see is closer to is theirs: going for it only starts a fight)
function lootNear(f, soon){
  const rivals = G.fighters.filter(o => o.alive && o !== f && f.bot.mem.has(o.id) && G.time - f.bot.mem.get(o.id).t < 3);
  const mine = (x, z, d) => !rivals.some(o => Math.hypot(o.x - x, o.z - z) < d - 0.5);
  let pk = null, pd = 14;
  for(const p of G.pickups){ const d = Math.hypot(p.x - f.x, p.z - f.z); if(d < pd && inZone(p.x, p.z, soon - 1.5) && mine(p.x, p.z, d)){ pd = d; pk = p; } }
  if(pk) return { pk };
  let kc = null, kd = 18;
  for(const k of A.crates){ if(!k.alive) continue; const d = Math.hypot(k.x - f.x, k.z - f.z); if(d < kd && inZone(k.x, k.z, soon - 1.5) && mine(k.x, k.z, d)){ kd = d; kc = k; } }
  return kc ? { crate:kc } : null;
}

function fightMoveAndShoot(f, B, T, mx, mz, dt){
  const H = f.H, inp = f.inp, now = G.time;
  // ---- fighting: keep the weapon's best distance and strafe ----
  if(T && (B.mode === 'fight' || dist(f, T) < H.attack.range)){
    const d = dist(f, T), want = H.attack.range * PREF[f.hero];
    const dx = (T.x - f.x) / (d || 1), dz = (T.z - f.z) / (d || 1);
    B.strafeT -= dt; if(B.strafeT <= 0){ B.strafeT = rand(0.5, 1.4); B.strafe = -B.strafe; }
    if(B.mode === 'fight'){
      let ax = 0, az = 0;
      if(B.noChase){}
      else if(d > want + 1 || !losClear(f.x, f.z, T.x, T.z) && f.hero !== 'beetle') [ax, az] = goTo(f, T.x, T.z, dt);
      else if(d < want - 1.5){ ax = -dx; az = -dz; }
      mx = ax * 0.9 + -dz * B.strafe * 0.7; mz = az * 0.9 + dx * B.strafe * 0.7;
    }
  }
  // ---- dodge incoming shots ----
  if(Math.random() < B.S.dodge){
    for(const s of G.shots){
      if(s.team === f.team) continue;
      const rx = f.x - s.x, rz = f.z - s.z, sv = Math.hypot(s.vx, s.vz), along = (rx * s.vx + rz * s.vz) / sv;
      if(along < 0 || along > 6) continue;
      const side = (rx * s.vz - rz * s.vx) / sv;
      if(Math.abs(side) < 1.1){ const k = side >= 0 ? 1 : -1; mx += s.vz / sv * k * 1.4; mz += -s.vx / sv * k * 1.4; break; }
    }
  }
  // step out of burning puddles
  for(const p of G.puddles) if(p.team !== f.team){ const dx = f.x - p.x, dz = f.z - p.z, d = Math.hypot(dx, dz); if(d < p.r + 0.5){ mx += dx / (d || 1) * 1.5; mz += dz / (d || 1) * 1.5; } }
  // unstick: if we haven't moved for a while, wiggle and re-path
  const moved = Math.hypot(f.x - B.lx, f.z - B.lz); B.lx = f.x; B.lz = f.z;
  if(Math.hypot(mx, mz) > 0.3 && moved < 0.01) B.stuck += dt; else B.stuck = Math.max(0, B.stuck - dt);
  if(B.stuck > 0.6){ B.path = null; mx += rand(-1, 1); mz += rand(-1, 1); if(B.stuck > 1.2) B.stuck = 0; }
  // a sniper bot with a clear long shot stops, scopes in and lets the shot charge (unless it is being shot at)
  const SC = H.attack.scope;
  f.scope = !!(SC && T && canAttack(f) && dist(f, T) > 7 && dist(f, T) < H.attack.range * SC.range * 0.95 && losClear(f.x, f.z, T.x, T.z) && now - (f.hurtAt || -9) > 1 && !(G.ball && G.ball.holder === f));
  if(f.scope){ mx *= 0.2; mz *= 0.2; }
  const ml = Math.hypot(mx, mz); if(ml > 1){ mx /= ml; mz /= ml; }
  inp.mx = mx; inp.mz = mz;
  // ---- aim and shoot ----
  if(ml > 0.1) inp.aim = Math.atan2(mx, mz);
  inp.fire = inp.sup = false;
  if(T){
    const d = dist(f, T), W = H.attack, Sp = H.super;
    const speed = W.speed || (W.range / (W.flight || 0.8));
    const tl = (W.kind === 'lob' ? W.flight * (0.65 + 0.35 * d / W.range) : d / speed) * B.S.lead;
    let tx = T.x + T.vx * tl, tz = T.z + T.vz * tl;
    const err = B.S.err * (1 + (T.inGrass ? 0.5 : 0));
    const a = Math.atan2(tx - f.x, tz - f.z) + rand(-err, err);
    tx = f.x + Math.sin(a) * d; tz = f.z + Math.cos(a) * d;
    inp.aim = a; inp.tx = tx; inp.tz = tz;
    const los = losClear(f.x, f.z, T.x, T.z);
    // hiding bots keep quiet until the enemy is close or they are found
    const hurt = G.time - (f.hurtAt || -9) < 1.5;
    const ready = B.seenT > B.S.react && (!B.holdFire || hurt || (!B.quiet && d < W.range * 0.55));
    // supers: shotgun up close, bombs on anyone in reach, beam lined up from far
    if(ready && f.charge >= 1){
      if((Sp.kind === 'shell' && d < Sp.range * 0.85 && los) || (Sp.kind === 'fan' && d < Sp.range * 0.75 && los) || (Sp.kind === 'barrage' && d < Sp.range) || (Sp.kind === 'beam' && d < Sp.range * 0.9) || (Sp.kind === 'bounce' && d < 11) || (Sp.kind === 'frenzy' && d < W.range && los)) inp.sup = true;
    }
    if(!inp.sup && ready && canAttack(f)){
      const inRange = d < W.range * (W.kind === 'fan' ? 0.85 : W.kind === 'lob' ? 1.0 : 0.95) * (f.scope ? W.scope.range : 1);
      const charging = f.scope && f.scopeT < W.scope.time * (B.S.react > 0.3 ? 0.7 : 0.95);   // still charging a scoped shot
      // keep one charge in reserve unless the target is close or weak
      // (a gunner in a frenzy just keeps firing; outside it, bursts wait until the spread has closed a little)
      const spare = f.frenzyT > 0 || ((f.ammo >= 2 || d < W.range * 0.6 || T.hp < T.max * 0.4) && !(W.kind === 'burst' && (f.bloom || 0) > 0.6 && d > W.range * 0.5));
      if(inRange && (los || W.kind === 'lob') && spare && !charging) inp.fire = true;
      // the slingshot banks a pebble off a hedge when the enemy hides behind a corner (looked up a few times a second)
      else if(W.kind === 'bounce' && !los && d < W.range * 0.8 && spare && now > (B.bankT || 0)){
        B.bankT = now + 0.3;
        const b = bankShot(f, T, W);
        if(b !== null){ inp.aim = b; inp.tx = f.x + Math.sin(b) * 6; inp.tz = f.z + Math.cos(b) * 6; inp.fire = true; }
      }
    }
  } else if(B.shootAt){
    // break the crate in front of us (no reason to keep a charge in reserve here)
    const k = B.shootAt;
    inp.aim = Math.atan2(k.x - f.x, k.z - f.z); inp.tx = k.x; inp.tz = k.z;
    if(canAttack(f) && f.ammo >= 1) inp.fire = true;
  } else if(f.hero === 'beetle' && !B.holdFire && canAttack(f) && f.ammo >= 2.5){
    // bomb the bush where an enemy was last seen
    for(const m of B.mem.values()){
      if(!m.o.alive || now - m.t > 2.5 || now - m.t < 0.4) continue;
      const d = Math.hypot(m.x - f.x, m.z - f.z);
      if(d < H.attack.range && (inGrass(m.x, m.z) || !sightClear(f.x, f.z, m.x, m.z))){ inp.aim = Math.atan2(m.x - f.x, m.z - f.z); inp.tx = m.x; inp.tz = m.z; inp.fire = true; break; }
    }
  }
}
