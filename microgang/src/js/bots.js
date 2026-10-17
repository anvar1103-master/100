// Bot brains for «Каждый сам за себя». A bot sees only what isn't hidden by solid things or thick grass, hears
// shots, picks a target, aims with a human-like delay and wobble (by difficulty), fights at the range that suits
// its gun, fights the recoil (imperfectly), reloads when it's safe and backs off to heal when badly hurt.
import { G, on } from './state.js';
import { losClear } from './phys.js';
import { findPath, walkLine, randomNode } from './nav.js';
import { gun, eyeY } from './fighter.js';
import { WORLD } from './world.js';
import { trailD } from './map.js';
import { NAV } from './nav.js';
import { W as PW } from './phys.js';
import { angDiff, clamp, rand, gauss } from './util.js';

export const DIFF = {
  easy:  { react:0.55, err:0.024, settle:0.9, turn:3.2, head:0.05, comp:0.35, burst:0.25, range:0.8, fov:0.55 },
  normal:{ react:0.36, err:0.013, settle:0.6, turn:4.8, head:0.18, comp:0.6,  burst:0.45, range:1,   fov:0.42 },
  hard:  { react:0.22, err:0.007, settle:0.4, turn:7.5, head:0.35, comp:0.85, burst:0.7,  range:1.15, fov:0.3 },
};
// preferred distance band and the farthest it bothers shooting, per gun
// preferred distance band, the farthest it shoots, the farthest it notices someone to go after
const BAND = { hornet:[10, 30, 70, 80], acorn:[2, 8, 26, 70], needle:[24, 70, 140, 150], comb:[6, 20, 45, 60] };

function brain(f){
  return f.bot_ || (f.bot_ = { target:null, reactT:rand(0, 0.4), fireDelay:0, err:{ x:0, y:0, tx:0, ty:0, t:0 }, track:0, strafeT:0, strafeDir:1,
    goal:null, goalT:0, path:null, pi:0, pathKey:'', stuckT:0, lx:0, lz:0, retreat:false, lastSeen:null, lastSeenT:-99, heard:null, heardT:-99,
    burstT:0, burstN:0, losT:0, los:false, aimHead:false, crouchT:0, jumpT:rand(2, 6), scopeT:0 });
}
export function botReset(f){ f.bot_ = null; }

// shots are loud: bots within earshot remember where they came from
on('fire', f => {
  for(const b of G.fighters){
    if(!b.bot || b === f || !b.alive) continue;
    const d = Math.hypot(b.x - f.x, b.z - f.z);
    if(d < (f.guns[f.cur].W.kind === 'sniper' ? 80 : 60)){ const B = brain(b); B.heard = { x:f.x, z:f.z, f }; B.heardT = G.time; }
  }
});
// being shot: turn toward the shooter quickly
on('damage', (t, amt, src) => {
  if(!t.bot || !src || src === t) return;
  const B = brain(t);
  B.lastSeen = { x:src.x, z:src.z }; B.lastSeenT = G.time;
  if(!B.target || Math.random() < 0.6){ B.hunt = src; B.reactT = Math.min(B.reactT, 0.12); }
  B.holdT = 0;
});

function perceive(f, D){
  const B = brain(f), ex = f.x, ey = eyeY(f), ez = f.z, sy = Math.sin(f.yaw), cy = Math.cos(f.yaw);
  const W = gun(f).W, range = BAND[f.primary][3] * D.range;
  let best = null, bs = 1e9;
  for(const g of G.fighters){
    if(g === f || !g.alive) continue;
    const dx = g.x - f.x, dz = g.z - f.z, d = Math.hypot(dx, dz);
    if(d > range && g !== B.hunt) continue;
    // in front of it (or the one who just shot it, or very close)
    const front = (-sy * dx - cy * dz) / (d || 1);
    if(front < D.fov - 0.7 && d > 6 && g !== B.hunt && g !== B.target) continue;
    if(!losClear(ex, ey, ez, g.x, g.y + g.h * 0.75, g.z)) continue;
    let s = d;
    if(g === B.target) s -= 12;
    if(g === B.hunt) s -= 15;
    s -= (1 - g.hp / 100) * 10;
    if(g.isMe && G.match.diff === 'easy') s += 10;
    if(s < bs){ bs = s; best = g; }
  }
  if(best && best !== B.target){ B.fireDelay = D.react * rand(0.7, 1.3); B.track = 0; B.aimHead = Math.random() < D.head; }
  B.target = best;
  if(best){ B.lastSeen = { x:best.x, z:best.z }; B.lastSeenT = G.time; B.hunt = null; }
}

// ambush spots for shotguns: thick grass right next to a trail (people walk past within a few steps)
let SPOTS = null;
function spots(){
  if(SPOTS) return SPOTS;
  SPOTS = NAV.nodes.filter(([x, z]) => { const d = trailD(x, z); return d > 2.6 && d < 6 && PW.grassAt(x, z, { h:0 }) > 0.55; });
  return SPOTS;
}
function goal(f){
  const B = brain(f);
  if(B.lastSeen && G.time - B.lastSeenT < 6) return { x:B.lastSeen.x + rand(-4, 4), z:B.lastSeen.z + rand(-4, 4) };
  if(B.heard && G.time - B.heardT < 6 && f.primary !== 'needle' && Math.random() < 0.85) return { x:B.heard.x + rand(-6, 6), z:B.heard.z + rand(-6, 6) };
  // a shotgun often goes to lie in wait in the grass by a trail
  if(f.primary === 'acorn' && Math.random() < 0.6 && spots().length){
    const S = spots(), near = [];
    for(let i = 0; i < 40; i++){ const p = S[Math.floor(Math.random() * S.length)]; const d = Math.hypot(p[0] - f.x, p[1] - f.z); if(d > 6 && d < 40) near.push(p); if(near.length >= 4) break; }
    if(near.length){ const p = near[Math.floor(Math.random() * near.length)]; return { x:p[0], z:p[1], ambush:true }; }
  }
  // snipers like the high caps: walk to the puffball now and then
  if(f.primary === 'needle' && Math.random() < 0.3 && WORLD.pads.length){ const p = WORLD.pads[0]; return { x:p.x, z:p.z, pad:true }; }
  // hunt: head roughly toward someone (everyone is an enemy here); snipers keep their distance
  if(Math.random() < (f.primary === 'needle' ? 0.35 : 0.65)){
    const others = G.fighters.filter(o => o !== f && o.alive);
    if(others.length){ others.sort((a, b) => Math.hypot(a.x - f.x, a.z - f.z) - Math.hypot(b.x - f.x, b.z - f.z));
      const o = others[Math.floor(Math.random() * Math.min(3, others.length))]; const k = f.primary === 'needle' ? 0.5 : 0.85;
      return { x:f.x + (o.x - f.x) * k + rand(-8, 8), z:f.z + (o.z - f.z) * k + rand(-8, 8) }; }
  }
  const n = randomNode(); return { x:n[0], z:n[1] };
}
function waypoint(f, gx, gz, chase){
  const B = brain(f), key = Math.round(gx / 4) + ',' + Math.round(gz / 4);
  B.repT = (B.repT || 0) - 1;
  if(!B.path || B.pathKey !== key || (chase && B.repT <= 0)){
    B.path = findPath(f.x, f.z, gx, gz); B.pathKey = key; B.pi = 0; B.repT = 40;
    if(!B.path) return [gx, gz];
  }
  while(B.pi < B.path.length - 1 && Math.hypot(B.path[B.pi][0] - f.x, B.path[B.pi][1] - f.z) < 1.6) B.pi++;
  const w = B.path[B.pi];
  if(Math.hypot(w[0] - f.x, w[1] - f.z) > 14 && !walkLine(f.x, f.z, w[0], w[1])){ B.path = null; return [gx, gz]; }
  return w;
}

export function botThink(f, dt){
  if(!f.alive || !f.bot) return;
  const B = brain(f), D = DIFF[G.match.diff] || DIFF.normal, I = f.inp, g = gun(f), W = g.W;
  I.jump = false; I.reload = false;
  B.holdT = Math.max(0, (B.holdT || 0) - dt);
  B.reactT -= dt; B.fireDelay -= dt; B.strafeT -= dt; B.goalT -= dt; B.jumpT -= dt; B.losT -= dt;
  if(B.reactT <= 0){ B.reactT = D.react * rand(0.6, 1.1); perceive(f, D); }
  let T = B.target;
  if(T && !T.alive){ T = B.target = null; }
  if(f.hp < 38 && T && f.sinceHit < 2) B.retreat = true;
  if(B.retreat && (f.hp > 85 || (!T && f.sinceHit > 6))) B.retreat = false;
  const ex = f.x, ey = eyeY(f), ez = f.z;
  let wx = 0, wz = 0, sprint = false;
  I.aim = false; I.fire = false; I.crouch = false;
  // the primary is empty and the enemy is close: pull the pistol
  const dT = T ? Math.hypot(T.x - f.x, T.z - f.z) : 1e9;
  if(T && f.cur === 0 && g.mag === 0 && dT < 30) I.slot = 1;
  else if(!T && f.cur === 1 && f.guns[0].mag + f.guns[0].reserve > 0) I.slot = 0;
  if(T){
    const dx = T.x - f.x, dz = T.z - f.z, d = Math.hypot(dx, dz) || 0.01;
    const band = BAND[f.cur === 0 ? f.primary : 'comb'];
    // aim point: chest or head, with a wobble that settles while tracking
    B.track += dt;
    const E = B.err; E.t -= dt;
    if(E.t <= 0){ E.t = rand(0.25, 0.6); const steady = W.kind === 'sniper' && f.adsK > 0.9 && Math.hypot(f.vx, f.vz) < 1 ? 0.45 : 1;
      const e = D.err * steady * (1 + Math.max(0, 1 - B.track / D.settle) * 2.5) * (1 + d / (W.kind === 'sniper' ? 200 : 90)); E.tx = gauss() * e; E.ty = gauss() * e * 0.7; if(Math.random() < 0.1) B.aimHead = Math.random() < D.head; }
    E.x += (E.tx - E.x) * Math.min(1, dt * 5); E.y += (E.ty - E.y) * Math.min(1, dt * 5);
    const py = T.y + (B.aimHead ? T.h * 0.76 : T.h * 0.42);
    const ax = T.x - ex, ay = py - ey, az = T.z - ez, hd = Math.hypot(ax, az);
    const yawT = Math.atan2(-ax, -az) + E.x, pitT = Math.atan2(ay, hd) + E.y;
    // fight the recoil: the aim is view + recoil, so pull the view down by part of it
    const mt = D.turn * dt;
    I.yaw = f.yaw + clamp(angDiff(f.yaw, yawT - f.recY * D.comp), -mt, mt);
    I.pitch = f.pitch + clamp(pitT - f.recP * D.comp - f.pitch, -mt, mt);
    if(B.losT <= 0){ B.losT = 0.18; B.los = losClear(ex, ey, ez, T.x, T.y + T.h * 0.7, T.z); }
    const tol = Math.atan2(0.45, d) + 0.02;
    const aligned = Math.abs(angDiff(f.yaw + f.recY, yawT - E.x)) < tol * 1.6 && Math.abs(f.pitch + f.recP - (pitT - E.y)) < tol * 1.6;
    // aim down sights for long shots (snipers always), crouch for steadiness now and then
    I.aim = B.los && (W.kind === 'sniper' ? d > 12 : d > 20 && W.kind !== 'shotgun') && !B.retreat;
    let fire = B.los && B.fireDelay <= 0 && aligned && d < band[2] * D.range && !f.reload;
    // long shots wait for the sights to come up
    if(W.kind === 'sniper' && I.aim && f.adsK < 0.95) fire = false;
    if(W.auto && d > 30 && f.adsK < 0.7) fire = false;
    // rifles in bursts at range
    if(W.auto && d > 25){ if(B.burstT > 0){ B.burstT -= dt; fire = false; } else if(f.shots >= 3 + Math.round(D.burst * 8)){ B.burstT = rand(0.18, 0.4); } }
    I.fire = fire;
    if(I.aim && W.kind === 'sniper' && Math.random() < dt * 0.6) B.crouchT = rand(0.6, 2);
    B.crouchT -= dt; I.crouch = B.crouchT > 0;
    // movement: keep the range band, strafe, chase around cover when it can't see
    let radial = d > band[1] ? 1 : d < band[0] ? -1 : 0;
    if(B.retreat) radial = -1;
    if(B.strafeT <= 0){ B.strafeT = rand(0.4, 1.4); B.strafeDir = Math.random() < 0.5 ? -1 : 1; if(Math.random() < 0.12 && W.kind !== 'sniper') I.jump = true; }
    const ux = dx / d, uz = dz / d, strafe = I.aim ? (W.kind === 'sniper' ? 0 : d > 30 ? 0.25 : 0.45) : 0.9;
    wx = ux * radial - uz * B.strafeDir * strafe; wz = uz * radial + ux * B.strafeDir * strafe;
    if(!B.los && d > 3 && !B.retreat){ const [cx, cz] = waypoint(f, T.x, T.z, true), cl = Math.hypot(cx - f.x, cz - f.z) || 1; wx = (cx - f.x) / cl; wz = (cz - f.z) / cl; sprint = d > 20; }
    if(B.retreat){ wx = -ux + -uz * B.strafeDir * 0.5; wz = -uz + ux * B.strafeDir * 0.5; sprint = !fire; }
    // a shotgun lying in wait keeps still and hidden until they come close (or it is found)
    else if(W.kind === 'shotgun' && B.holdT > 0 && d > 12){ wx = wz = 0; sprint = false; I.fire = false; I.crouch = true; }
    // otherwise it closes in through the grass where it can, weaving when it has to cross the open
    else if(W.kind === 'shotgun' && d > 13){
      const [cx, cz] = waypoint(f, T.x, T.z, true), cl = Math.hypot(cx - f.x, cz - f.z) || 1;
      wx = (cx - f.x) / cl - uz * B.strafeDir * 0.3; wz = (cz - f.z) / cl + ux * B.strafeDir * 0.3; sprint = !I.fire;
    }
  } else {
    // roam toward a goal along the paths, glancing around
    if(B.goal && B.goal.ambush && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 2.5 && !B.goal.held){ B.goal.held = true; B.holdT = rand(9, 16); B.goalT = B.holdT; }
    if(!B.goal || B.goalT <= 0 || (!B.goal.ambush && Math.hypot(B.goal.x - f.x, B.goal.z - f.z) < 2.5)){ B.goal = goal(f); B.goalT = rand(6, 12); B.path = null; B.holdT = 0; }
    const [px, pz] = waypoint(f, B.goal.x, B.goal.z);
    const dx = px - f.x, dz = pz - f.z, d = Math.hypot(dx, dz) || 1;
    wx = dx / d; wz = dz / d;
    // in the ambush: crouched and still, watching the trail
    if(B.holdT > 0){ wx = wz = 0; I.crouch = true; }
    const look = B.heard && G.time - B.heardT < 3 ? Math.atan2(-(B.heard.x - f.x), -(B.heard.z - f.z)) : Math.atan2(-wx, -wz) + Math.sin(G.time * 0.7 + f.id) * 0.5;
    const mt = D.turn * 0.55 * dt;
    I.yaw = f.yaw + clamp(angDiff(f.yaw, look), -mt, mt); I.pitch = f.pitch * (1 - Math.min(1, dt * 3));
    if(g.mag < W.mag * 0.5 && !f.reload) I.reload = true;
    sprint = Math.hypot(B.goal.x - f.x, B.goal.z - f.z) > 10 && !f.reload;
    if(B.jumpT <= 0){ B.jumpT = rand(4, 9); if(Math.random() < 0.25) I.jump = true; }
  }
  // turn the wanted world direction into stick input relative to where it faces
  const m = Math.min(1, Math.hypot(wx, wz)), sy = Math.sin(I.yaw), cy = Math.cos(I.yaw);
  I.mz = (-wx * sy - wz * cy) * m; I.mx = (wx * cy - wz * sy) * m;
  I.sprint = sprint && I.mz > 0.5 && !I.fire;
  // stuck: hop and try another way
  B.stuckT += dt;
  if(B.stuckT > 1.1){ const moved = Math.hypot(f.x - B.lx, f.z - B.lz); if(m > 0.3 && moved < 0.8){ I.jump = true; B.strafeDir *= -1; B.goal = null; B.path = null; } B.stuckT = 0; B.lx = f.x; B.lz = f.z; }
}
