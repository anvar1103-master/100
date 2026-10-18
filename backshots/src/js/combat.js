// Bullets and damage: hitscan traces from the eye along the aim (inside the gun's cone), against the grid and the
// fighters' hit boxes (head, chest, belly, legs; they follow crouching and leaning); damage falls off with distance
// and depends on where it hits — the head is nearly always fatal. Kills, places. Everything is announced through
// events for the effects, sounds and HUD.
import { ray, rayCap } from './phys.js';
import { G, emit, on } from './state.js';
import { gun, aimDir, eyeX, eyeY, eyeZ } from './fighter.js';
import { dmgAt, coneOf } from './weapons.js';

export function hitboxes(f){
  const k = f.h / 1.8, fx = -Math.sin(f.yaw), fz = -Math.cos(f.yaw), lx = Math.cos(f.yaw) * f.lean, lz = -Math.sin(f.yaw) * f.lean;
  return [
    { part:'head', t:'sph', x:f.x + lx + fx * 0.03, y:f.y + 1.69 * k - Math.abs(f.lean) * 0.12, z:f.z + lz + fz * 0.03, r:0.115 },
    { part:'chest', t:'cap', ax:f.x + lx * 0.45, ay:f.y + 1.14 * k, az:f.z + lz * 0.45, bx:f.x + lx * 0.75, by:f.y + 1.46 * k, bz:f.z + lz * 0.75, r:0.2 },
    { part:'belly', t:'cap', ax:f.x + lx * 0.1, ay:f.y + 0.84 * k, az:f.z + lz * 0.1, bx:f.x + lx * 0.4, by:f.y + 1.1 * k, bz:f.z + lz * 0.4, r:0.17 },
    { part:'legs', t:'cap', ax:f.x, ay:f.y + 0.1, az:f.z, bx:f.x, by:f.y + 0.8 * k, bz:f.z, r:0.16 },
  ];
}
const PART_K = { head:1, chest:1, belly:0.9, legs:0.62 };
// nearest fighter hit by the ray within tmax (not `skip`): { f, t, part } or null
export function rayFighters(ox, oy, oz, dx, dy, dz, tmax, skip){
  let best = null;
  for(const f of G.fighters){
    if(!f.alive || f === skip) continue;
    const cx = f.x - ox, cy = f.y + 0.9 - oy, cz = f.z - oz, along = cx * dx + cy * dy + cz * dz;
    if(along < -1.2 || along > tmax + 1.2) continue;
    const px = cx - dx * along, py = cy - dy * along, pz = cz - dz * along;
    if(px * px + py * py + pz * pz > 1.7 * 1.7) continue;
    for(const b of hitboxes(f)){
      let t;
      if(b.t === 'sph'){
        const fx = ox - b.x, fy = oy - b.y, fz = oz - b.z, bb = fx * dx + fy * dy + fz * dz, c = fx * fx + fy * fy + fz * fz - b.r * b.r, disc = bb * bb - c;
        t = disc < 0 ? -1 : -bb - Math.sqrt(disc);
      } else t = rayCap(b.ax, b.ay, b.az, b.bx, b.by, b.bz, b.r, ox, oy, oz, dx, dy, dz, tmax);
      if(t >= 0 && t < tmax && (!best || t < best.t - 0.02 || (Math.abs(t - best.t) < 0.05 && b.part === 'head'))) best = { f, t, part:b.part };
    }
  }
  return best;
}

function inCone(d, deg, out){
  if(deg <= 0){ out.x = d.x; out.y = d.y; out.z = d.z; return out; }
  const a = deg * Math.PI / 180 * Math.sqrt(Math.random()), b = Math.random() * Math.PI * 2;
  let ux = 0, uy = 1, uz = 0; if(Math.abs(d.y) > 0.9){ ux = 1; uy = 0; }
  let px = d.y * uz - d.z * uy, py = d.z * ux - d.x * uz, pz = d.x * uy - d.y * ux; const pl = Math.hypot(px, py, pz); px /= pl; py /= pl; pz /= pl;
  const qx = d.y * pz - d.z * py, qy = d.z * px - d.x * pz, qz = d.x * py - d.y * px;
  const s = Math.sin(a), c = Math.cos(a), cb = Math.cos(b), sb = Math.sin(b);
  out.x = d.x * c + (px * cb + qx * sb) * s; out.y = d.y * c + (py * cb + qy * sb) * s; out.z = d.z * c + (pz * cb + qz * sb) * s;
  return out;
}

const _d = { x:0, y:0, z:0 }, _dir = { x:0, y:0, z:0 };
function fire(f){
  const g = gun(f), W = g.W;
  aimDir(f, _d);
  const ox = eyeX(f), oy = eyeY(f), oz = eyeZ(f), cone = coneOf(W, f);
  const hits = new Map(), traces = [];
  for(let i = 0; i < W.pellets; i++){
    inCone(_d, cone, _dir);
    const w = ray(ox, oy, oz, _dir.x, _dir.y, _dir.z, W.range);
    const tw = w ? w.t : W.range;
    const wh = w ? { x:w.x, y:w.y, z:w.z, nx:w.nx, ny:w.ny, nz:w.nz, mat:w.mat } : null;
    const fh = rayFighters(ox, oy, oz, _dir.x, _dir.y, _dir.z, tw, f);
    const end = fh ? fh.t : tw;
    traces.push({ ox, oy, oz, x:ox + _dir.x * end, y:oy + _dir.y * end, z:oz + _dir.z * end, dx:_dir.x, dy:_dir.y, dz:_dir.z, t:end, hit:fh ? 'fighter' : wh ? wh.mat : null, wh:fh ? null : wh });
    if(fh){
      const dist = fh.t, part = fh.part;
      const dmg = dmgAt(W, dist) * PART_K[part] * (part === 'head' ? W.head : 1);
      const h = hits.get(fh.f) || { dmg:0, head:false, part, x:0, y:0, z:0, dir:{ x:_dir.x, y:_dir.y, z:_dir.z }, n:0 };
      h.dmg += dmg; h.head = h.head || part === 'head'; h.n++; if(part === 'head') h.part = 'head';
      h.x = ox + _dir.x * dist; h.y = oy + _dir.y * dist; h.z = oz + _dir.z * dist;
      hits.set(fh.f, h);
    }
  }
  emit('shot', f, traces, W);
  for(const [t, h] of hits) damage(t, h.dmg, f, { head:h.head, part:h.part, x:h.x, y:h.y, z:h.z, dir:h.dir, weapon:W.id, pellets:h.n });
}
on('fire', fire);

export function damage(t, amt, src, o){
  if(!t.alive || G.state === 'end') return;
  amt = Math.round(amt);
  t.hp -= amt; t.sinceHit = 0; t.lastAttacker = src; t.lastHit = o;
  if(src && src !== t){ t.damagers.set(src, (t.damagers.get(src) || 0) + amt); src.dmgDone += amt; }
  emit('damage', t, amt, src, o);
  if(t.hp <= 0) kill(t, src, o);
}
export function kill(t, src, o = {}){
  t.hp = 0; t.alive = false; t.deadT = 0; t.deaths++;
  // the place: how many were still standing
  t.place = G.fighters.filter(f => f.alive).length + 1;
  if(src && src !== t){ src.kills++; if(o.head) src.heads++; }
  t.damagers.clear();
  emit('kill', t, src, o);
}
