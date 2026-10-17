// Bullets and damage: hitscan traces from the eye along the aim (with the gun's cone), against the world and
// the fighters' hit boxes (head, thorax, abdomen, legs); damage with distance falloff and head multipliers;
// kills, assists and score. Everything is announced through events for the effects, sounds and HUD.
import { ray, rayCap, HIT } from './phys.js';
import { G, emit, on } from './state.js';
import { gun, aimDir, eyeY, HP_MAX } from './fighter.js';
import { dmgAt, coneOf } from './weapons.js';
import { clamp } from './util.js';

const _d = { x:0, y:0, z:0 };
// hit boxes from the fighter's pose (no animation needed, so bots and tests agree with what you see)
// the heroes are big-headed: a large head, a small body, short legs (scaled down while crouching)
export function hitboxes(f){
  const k = f.h / 1.7, fx = -Math.sin(f.yaw), fz = -Math.cos(f.yaw);
  return [
    { part:'head', t:'sph', x:f.x + fx * 0.15, y:f.y + 1.3 * k, z:f.z + fz * 0.15, r:0.4 },
    { part:'body', t:'cap', ax:f.x + fx * 0.04, ay:f.y + 0.42 * k, az:f.z + fz * 0.04, bx:f.x + fx * 0.08, by:f.y + 0.82 * k, bz:f.z + fz * 0.08, r:0.3 },
    { part:'legs', t:'cap', ax:f.x, ay:f.y + 0.12, az:f.z, bx:f.x, by:f.y + 0.38 * k, bz:f.z, r:0.22 },
  ];
}
const PART_K = { head:1, body:1, legs:0.8 };
// nearest fighter hit by the ray within tmax (not `skip`): { f, t, part } or null
export function rayFighters(ox, oy, oz, dx, dy, dz, tmax, skip){
  let best = null;
  for(const f of G.fighters){
    if(!f.alive || f === skip) continue;
    // quick reject: distance from the ray to the fighter's centre
    const cx = f.x - ox, cy = f.y + 0.9 - oy, cz = f.z - oz, along = cx * dx + cy * dy + cz * dz;
    if(along < -1.5 || along > tmax + 1.5) continue;
    const px = cx - dx * along, py = cy - dy * along, pz = cz - dz * along;
    if(px * px + py * py + pz * pz > 2.6 * 2.6) continue;
    for(const b of hitboxes(f)){
      let t;
      if(b.t === 'sph'){
        const fx = ox - b.x, fy = oy - b.y, fz = oz - b.z, bb = fx * dx + fy * dy + fz * dz, c = fx * fx + fy * fy + fz * fz - b.r * b.r, disc = bb * bb - c;
        t = disc < 0 ? -1 : -bb - Math.sqrt(disc);
      } else t = rayCap(b.ax, b.ay, b.az, b.bx, b.by, b.bz, b.r, ox, oy, oz, dx, dy, dz, tmax);
      if(t >= 0 && t < tmax && (!best || t < best.t || (Math.abs(t - best.t) < 0.05 && b.part === 'head'))) best = { f, t, part:b.part };
    }
  }
  return best;
}

// a random direction inside a cone of half-angle `deg` around d
function inCone(d, deg, out){
  if(deg <= 0){ out.x = d.x; out.y = d.y; out.z = d.z; return out; }
  const a = deg * Math.PI / 180 * Math.sqrt(Math.random()), b = Math.random() * Math.PI * 2;
  // basis around d
  let ux = 0, uy = 1, uz = 0; if(Math.abs(d.y) > 0.9){ ux = 1; uy = 0; }
  let px = d.y * uz - d.z * uy, py = d.z * ux - d.x * uz, pz = d.x * uy - d.y * ux; const pl = Math.hypot(px, py, pz); px /= pl; py /= pl; pz /= pl;
  const qx = d.y * pz - d.z * py, qy = d.z * px - d.x * pz, qz = d.x * py - d.y * px;
  const s = Math.sin(a), c = Math.cos(a), cb = Math.cos(b), sb = Math.sin(b);
  out.x = d.x * c + (px * cb + qx * sb) * s; out.y = d.y * c + (py * cb + qy * sb) * s; out.z = d.z * c + (pz * cb + qz * sb) * s;
  return out;
}

const _dir = { x:0, y:0, z:0 }, _p = { x:0, y:0, z:0 };
// the shot: one trace per pellet from the eye
function fire(f){
  const g = gun(f), W = g.W;
  aimDir(f, _d);
  const ox = f.x, oy = eyeY(f), oz = f.z;
  const cone = coneOf(W, f);
  const hits = new Map(), traces = [];
  for(let i = 0; i < W.pellets; i++){
    inCone(_d, cone, _dir);
    const w = ray(ox, oy, oz, _dir.x, _dir.y, _dir.z, W.range);
    const tw = w ? w.t : W.range;
    const wh = w ? { x:w.x, y:w.y, z:w.z, nx:w.nx, ny:w.ny, nz:w.nz, mat:w.mat } : null;
    const fh = rayFighters(ox, oy, oz, _dir.x, _dir.y, _dir.z, tw, f);
    const end = fh ? fh.t : tw;
    traces.push({ x:ox + _dir.x * end, y:oy + _dir.y * end, z:oz + _dir.z * end, dx:_dir.x, dy:_dir.y, dz:_dir.z, hit:fh ? 'fighter' : wh ? wh.mat : null, wh:fh ? null : wh });
    if(fh){
      const dist = fh.t, part = fh.part;
      let dmg = dmgAt(W, dist) * PART_K[part] * (part === 'head' ? W.head : 1);
      const h = hits.get(fh.f) || { dmg:0, head:false, x:0, y:0, z:0, dir:{ x:_dir.x, y:_dir.y, z:_dir.z }, n:0 };
      h.dmg += dmg; h.head = h.head || part === 'head'; h.n++;
      h.x = ox + _dir.x * dist; h.y = oy + _dir.y * dist; h.z = oz + _dir.z * dist;
      hits.set(fh.f, h);
    }
  }
  emit('shot', f, traces, W);
  for(const [t, h] of hits) damage(t, h.dmg, f, { head:h.head, x:h.x, y:h.y, z:h.z, dir:h.dir, weapon:W.id, pellets:h.n });
}
on('fire', fire);

export function damage(t, amt, src, o){
  if(!t.alive || t.shieldT > 0 || G.state === 'end') return;
  amt = Math.round(amt);
  t.hp -= amt; t.sinceHit = 0; t.lastAttacker = src;
  if(src && src !== t) t.damagers.set(src, (t.damagers.get(src) || 0) + amt);
  emit('damage', t, amt, src, o);
  if(t.hp <= 0) kill(t, src, o);
}
export function kill(t, src, o = {}){
  t.hp = 0; t.alive = false; t.deadT = 0; t.deaths++; t.streak = 0;
  t.vx *= 0.3; t.vz *= 0.3;
  let pts = 0;
  if(src && src !== t){
    src.kills++; src.streak++; src.best = Math.max(src.best, src.streak);
    pts = 100 + (o.head ? 50 : 0); src.score += pts; if(o.head) src.heads++;
    // a fresh magazine's worth of ammo for the kill
    for(const g of src.guns) g.reserve = Math.min(g.W.reserve * 1.5, g.reserve + Math.ceil(g.W.mag * (g === src.guns[0] ? 1 : 0.5)));
  }
  // assists: anyone else who did real damage in the last moments
  for(const [a, d] of t.damagers) if(a !== src && a.alive !== undefined && d >= 30){ a.assists++; a.score += 50; emit('assist', a, t); }
  t.damagers.clear();
  emit('kill', t, src, Object.assign({ pts }, o));
}
