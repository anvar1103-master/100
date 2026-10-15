// «Одуванчиковая поляна»: the layout of the meadow as plain data — terrain, water, where the tall grass grows,
// and every big thing on it (mushrooms, roots, the snail shell, clover, berries...). Pure: no rendering.
// Visual builders (nature/*.js) and the physics colliders are both made from MAP.items.
import { seeded, rand, randi, pick, chance, fbm2, noise2, sstep, clamp, TAU, lerp } from './util.js';

export const BOUND = 95;            // the playable square is ±BOUND
export const WATER = -0.7;          // the puddle's surface
// zones of the meadow (centre and radius); the grass thins out inside them
export const ZONES = {
  ring:      { x:0,   z:0,   r:20, name:'Кольцо мухоморов' },
  puddle:    { x:-48, z:-46, r:24, name:'Лужа' },
  roots:     { x:54,  z:-50, r:26, name:'Корни' },
  clover:    { x:62,  z:16,  r:20, name:'Клевер' },
  litter:    { x:46,  z:62,  r:20, name:'Листопад' },
  berries:   { x:-2,  z:66,  r:20, name:'Земляника' },
  shell:     { x:-54, z:50,  r:20, name:'Ракушка' },
  dandelions:{ x:-68, z:2,   r:18, name:'Одуванчики' },
  pebbles:   { x:4,   z:-66, r:18, name:'Галька' },
};
const zoneK = (x, z, Z, k = 1) => 1 - sstep(Z.r * 0.55 * k, Z.r * k, Math.hypot(x - Z.x, z - Z.z));

// ---- terrain ----
export function groundH(x, z){
  let h = fbm2(x * 0.018, z * 0.018, 4) * 1.6 + noise2(x * 0.09, z * 0.09) * 0.18;
  // the mushroom ring sits on a low mossy mound
  h += 1.4 * (1 - sstep(4, 24, Math.hypot(x, z)));
  // the puddle: a shallow bowl
  const P = ZONES.puddle, pd = puddleD(x, z);
  h -= 1.7 * (1 - sstep(-6, 4, pd));
  // the roots zone is lumpier, the litter heap rises
  h += 0.9 * zoneK(x, z, ZONES.roots) * (noise2(x * 0.12, z * 0.12) + 0.4);
  h += 1.6 * zoneK(x, z, ZONES.litter, 0.9);
  // beyond the edge the ground climbs a little, so the grass wall reads as a wall
  const e = Math.max(Math.abs(x), Math.abs(z)) - BOUND;
  if(e > 0) h += e * e * 0.012 + e * 0.05;
  return h;
}
// signed distance-ish to the puddle's shoreline (negative inside)
function puddleD(x, z){
  const P = ZONES.puddle, dx = x - P.x, dz = z - P.z, a = Math.atan2(dz, dx);
  const r = 19 + Math.sin(a * 3 + 0.7) * 3 + Math.sin(a * 5 - 1.3) * 1.6;
  return Math.hypot(dx * 0.95, dz * 1.12) - r;
}
export function waterAt(x, z){ return groundH(x, z) < WATER ? WATER : -1e9; }

// what the ground is made of (impacts, footsteps, colour): moss on the mound and by the water, dirt elsewhere
export function groundMat(x, z){
  if(groundH(x, z) < WATER + 0.05) return 'mud';
  const m = mossAt(x, z);
  return m > 0.5 ? 'moss' : 'dirt';
}
export function mossAt(x, z){
  let m = sstep(0.0, 0.35, fbm2(x * 0.03 + 7, z * 0.03 - 3, 3));
  m = Math.max(m, 1 - sstep(10, 22, Math.hypot(x, z)));                  // the mound
  m = Math.max(m, 0.8 * zoneK(x, z, ZONES.shell));
  m = Math.max(m, 0.7 * zoneK(x, z, ZONES.roots, 1.1));
  const pd = puddleD(x, z); if(pd > -1 && pd < 7) m = Math.max(m, 0.75 * (1 - sstep(2, 7, pd)));
  m *= 1 - zoneK(x, z, ZONES.pebbles) * 0.9;
  return clamp(m, 0, 1);
}

// ---- tall grass: density 0..1 and blade height (written to o.h) ----
const PATHS = [[-90, 30, -20, 12], [20, -10, 90, -20], [-10, -90, -4, -24], [6, 24, 30, 90], [-88, -60, -30, -20], [30, -30, 88, 40]];
function pathD(x, z){
  let d = 1e9;
  for(const [ax, az, bx, bz] of PATHS){
    const vx = bx - ax, vz = bz - az, t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz), 0, 1);
    d = Math.min(d, Math.hypot(x - ax - vx * t, z - az - vz * t));
  }
  // a ring path around the mushrooms
  d = Math.min(d, Math.abs(Math.hypot(x, z) - 30));
  return d;
}
export function grassAt(x, z, o){
  const e = Math.max(Math.abs(x), Math.abs(z));
  const wall = sstep(BOUND - 9, BOUND - 2, e);
  let g = sstep(-0.05, 0.25, fbm2(x * 0.03 - 11, z * 0.03 + 5, 4));
  g *= sstep(2.5, 6.5, pathD(x, z));
  for(const k in ZONES){ const Z = ZONES[k]; g *= 1 - 0.92 * zoneK(x, z, Z, k === 'clover' ? 0.7 : 1); }
  if(puddleD(x, z) < 1.5) g = 0;
  g = Math.max(g, wall);
  if(o) o.h = lerp(7, 15, 0.5 + 0.5 * noise2(x * 0.05 + 3, z * 0.05)) + wall * 4;
  return g;
}

// ---- the big things ----
// item kinds: amanita bolete puffball dandelion dleaf clover strawberry berry pinecone acorn acorncap pebble twig root leaf
//             shell web reed lily flower cushion dew trunk
export const MAP = { items:[], spawns:[], built:false };
const free = [];   // rough discs already taken (x, z, r), to keep dressing from overlapping
function room(x, z, r){ for(const f of free) if(Math.hypot(x - f[0], z - f[1]) < r + f[2]) return false; return Math.max(Math.abs(x), Math.abs(z)) < BOUND - 4; }
function take(x, z, r){ free.push([x, z, r]); }
function add(o){ MAP.items.push(o); return o; }
function scatter(Z, n, r, fn, tries = 30){
  for(let i = 0; i < n; i++) for(let t = 0; t < tries; t++){
    const a = rand(0, TAU), d = Math.sqrt(rand()) * Z.r, x = Z.x + Math.cos(a) * d, z = Z.z + Math.sin(a) * d;
    if(!room(x, z, r) || puddleD(x, z) < r) continue;
    take(x, z, r); fn(x, z); break;
  }
}

export function buildLayout(){
  if(MAP.built) return MAP;
  MAP.items.length = 0; free.length = 0;
  seeded(20251015, () => {
    const g = (x, z) => groundH(x, z);
    // -- the fly agaric ring with a puffball in the middle --
    { const n = 5;
      for(let i = 0; i < n; i++){
        const a = i / n * TAU + 0.4, d = 12.5 + rand(-1, 1.5), x = Math.cos(a) * d, z = Math.sin(a) * d, H = [21, 13, 17, 10.5, 15][i], R = [8.5, 5.6, 7, 4.6, 6.2][i];
        add({ k:'amanita', x, z, y:g(x, z), h:H, R, sr:R * 0.17, tilt:rand(-0.08, 0.08), ry:rand(0, TAU) }); take(x, z, R * 0.5);
      }
      add({ k:'puffball', x:0, z:0, y:g(0, 0), R:2.3, launch:[0, 17.5, 0] }); take(0, 0, 3);
      // a little brood of young agarics
      for(let i = 0; i < 6; i++){ const a = rand(0, TAU), d = rand(18, 24), x = Math.cos(a) * d, z = Math.sin(a) * d;
        if(room(x, z, 1.4)){ add({ k:'amanita', x, z, y:g(x, z), h:rand(2.4, 4), R:rand(1.3, 2), sr:0.3, tilt:rand(-0.15, 0.15), ry:rand(0, TAU), young:true }); take(x, z, 1.4); } }
    }
    // -- the puddle: reeds, floating leaves, a twig bridge, lily leaves --
    { const P = ZONES.puddle;
      add({ k:'twig', ax:P.x - 21, ay:g(P.x - 21, P.z + 6) - 0.4, az:P.z + 6, bx:P.x + 19, by:g(P.x + 19, P.z - 9) - 0.3, bz:P.z - 9, r:1.05, sag:1.4, bridge:true });
      for(let i = 0; i < 7; i++){ const a = rand(0, TAU), d = rand(3, 13), x = P.x + Math.cos(a) * d, z = P.z + Math.sin(a) * d;
        if(puddleD(x, z) < -3 && room(x, z, 3.2)){ add({ k:'lily', x, z, y:WATER + 0.06, R:rand(3, 4.6), ry:rand(0, TAU) }); take(x, z, 3.2); } }
      for(let i = 0; i < 70; i++){ const a = rand(0, TAU), x = P.x + Math.cos(a) * rand(14, 26), z = P.z + Math.sin(a) * rand(14, 26), pd = puddleD(x, z);
        if(pd > -3 && pd < 2.5 && room(x, z, 0.6)){ add({ k:'reed', x, z, y:g(x, z), h:rand(14, 28), r:rand(0.25, 0.42), lean:rand(-0.1, 0.1), ry:rand(0, TAU) }); take(x, z, 0.6); } }
      for(let i = 0; i < 26; i++){ const a = rand(0, TAU), x = P.x + Math.cos(a) * rand(17, 28), z = P.z + Math.sin(a) * rand(17, 28);
        if(puddleD(x, z) > 1 && room(x, z, 1.5)){ add({ k:'pebble', x, z, y:g(x, z), r:rand(0.6, 1.8), sq:rand(0.5, 0.8), ry:rand(0, TAU) }); take(x, z, 1.4); } }
    }
    // -- roots of the giant tree (its trunk stands beyond the grass, to the north-east) --
    { const T = { x:150, z:-130 };
      add({ k:'trunk', x:T.x, z:T.z, r:48, h:520 });
      const roots = [[58, -96, 26, -38, 3.6], [100, -60, 40, -30, 3.0], [70, -100, 60, -40, 2.4], [96, -88, 30, -66, 2.8], [102, -40, 64, -16, 2.2]];
      for(const [ax, az, bx, bz, r] of roots){
        const it = add({ k:'root', ax, az, bx, bz, r, ay:g(ax, az) + r * 0.25, by:g(bx, bz) - r * 0.9, arch:r * 0.9, pts:[] });
        for(let i = 0; i <= 6; i++){ const s = i / 6; it.pts.push([lerp(ax, bx, s) + Math.sin(s * 7 + ax) * 1.2, lerp(it.ay, it.by, s) + Math.sin(s * Math.PI) * it.arch + rand(-0.3, 0.3), lerp(az, bz, s)]); }
        take((ax + bx) / 2, (az + bz) / 2, 3);
      }
      const R = ZONES.roots;
      scatter(R, 5, 3.2, (x, z) => add({ k:'pinecone', x, z, y:g(x, z), L:rand(9, 12), R:rand(3.4, 4.2), ry:rand(0, TAU), roll:rand(-0.3, 0.3) }));
      scatter(R, 7, 1.8, (x, z) => add({ k:'acorn', x, z, y:g(x, z), s:rand(1.3, 1.7), ry:rand(0, TAU), lying:chance(0.6) }));
      scatter(R, 6, 1.5, (x, z) => add({ k:'acorncap', x, z, y:g(x, z), s:rand(1.4, 1.8), ry:rand(0, TAU), flip:chance(0.5) }));
      scatter(R, 9, 2, (x, z) => add({ k:'pebble', x, z, y:g(x, z), r:rand(1.2, 3.4), sq:rand(0.45, 0.75), ry:rand(0, TAU) }));
    }
    // -- clover field --
    { const C = ZONES.clover;
      for(let i = 0; i < 46; i++){ const a = rand(0, TAU), d = Math.sqrt(rand()) * C.r * 1.05, x = C.x + Math.cos(a) * d, z = C.z + Math.sin(a) * d;
        if(room(x, z, 1.1)){ add({ k:'clover', x, z, y:g(x, z), h:rand(4.5, 8), s:rand(2.1, 3.1), ry:rand(0, TAU), flower:chance(0.12) }); take(x, z, 1.1); } }
    }
    // -- leaf litter heap: big fallen leaves, some propped up as ramps, twigs --
    { const L = ZONES.litter;
      scatter(L, 9, 3.5, (x, z) => add({ k:'leaf', x, z, y:g(x, z) + 0.15, L:rand(9, 13), ry:rand(0, TAU), pitch:chance(0.4) ? rand(0.18, 0.32) : rand(0, 0.05), roll:rand(-0.08, 0.08), tint:randi(0, 3), curl:rand(0.1, 0.5) }));
      for(let i = 0; i < 5; i++){ const a = rand(0, TAU), x = L.x + Math.cos(a) * rand(4, 18), z = L.z + Math.sin(a) * rand(4, 18), b = a + rand(-1, 1), len = rand(10, 20);
        add({ k:'twig', ax:x, ay:g(x, z) + 0.3, az:z, bx:x + Math.cos(b) * len, by:g(x + Math.cos(b) * len, z + Math.sin(b) * len) + rand(0.3, 1.8), bz:z + Math.sin(b) * len, r:rand(0.35, 0.6), sag:0 }); }
      scatter(L, 6, 1.5, (x, z) => add({ k:'pebble', x, z, y:g(x, z), r:rand(0.8, 2), sq:rand(0.5, 0.8), ry:rand(0, TAU) }));
    }
    // -- wild strawberries --
    { const B = ZONES.berries;
      scatter(B, 9, 3, (x, z) => {
        add({ k:'strawberry', x, z, y:g(x, z), h:rand(6, 9), s:rand(3, 3.8), ry:rand(0, TAU) });
        for(let j = 0; j < randi(1, 3); j++){ const a = rand(0, TAU), d = rand(2.5, 4.5); add({ k:'berry', x:x + Math.cos(a) * d, z:z + Math.sin(a) * d, y:g(x, z), r:rand(1.3, 2.2), ry:rand(0, TAU), ripe:chance(0.8) }); }
      });
    }
    // -- the empty snail shell, stones and moss cushions --
    { const S = ZONES.shell;
      add({ k:'shell', x:S.x, z:S.z, y:g(S.x, S.z), R:7.5, ry:-0.4 }); take(S.x, S.z, 9.5);
      scatter(S, 8, 2.4, (x, z) => add({ k:'pebble', x, z, y:g(x, z), r:rand(1.4, 3.6), sq:rand(0.5, 0.8), ry:rand(0, TAU) }));
      scatter(S, 9, 2, (x, z) => add({ k:'cushion', x, z, y:g(x, z), r:rand(1.6, 3.2), ry:rand(0, TAU) }));
    }
    // -- dandelion grove --
    { const D = ZONES.dandelions;
      const spots = [[D.x + 4, D.z - 6, 44, 'seed'], [D.x - 7, D.z + 7, 37, 'flower'], [D.x + 9, D.z + 9, 32, 'flower'], [-22, -30, 40, 'seed'], [30, 34, 38, 'flower'], [70, -8, 35, 'seed'], [-28, 76, 33, 'flower'], [20, -84, 42, 'seed']];
      for(const [x, z, h, head] of spots){
        add({ k:'dandelion', x, z, y:g(x, z), h, head, lean:rand(-0.06, 0.06), ry:rand(0, TAU) }); take(x, z, 1.5);
        const n = randi(5, 8);
        for(let j = 0; j < n; j++){ const a = j / n * TAU + rand(-0.2, 0.2); add({ k:'dleaf', x, z, y:g(x, z), a, L:rand(11, 16), w:rand(2.2, 3.2), lift:rand(0.05, 0.35) }); }
      }
      scatter(D, 12, 1, (x, z) => add({ k:'flower', x, z, y:g(x, z), h:rand(8, 14), type:pick(['daisy', 'daisy', 'buttercup', 'bluebell']), ry:rand(0, TAU) }));
    }
    // -- pebble flat (open ground: long sight lines) with acorns --
    { const Pz = ZONES.pebbles;
      scatter(Pz, 16, 2, (x, z) => add({ k:'pebble', x, z, y:g(x, z), r:rand(1, 4.2), sq:rand(0.4, 0.75), ry:rand(0, TAU) }));
      scatter(Pz, 4, 1.8, (x, z) => add({ k:'acorn', x, z, y:g(x, z), s:rand(1.3, 1.6), ry:rand(0, TAU), lying:chance(0.5) }));
    }
    // -- all over: lone flowers, pebbles, twigs, leaves, a few more dandelions' leaves, dew --
    for(let i = 0; i < 70; i++){ const x = rand(-BOUND + 6, BOUND - 6), z = rand(-BOUND + 6, BOUND - 6); if(puddleD(x, z) < 2 || !room(x, z, 1.4)) continue;
      const k = rand();
      if(k < 0.3){ add({ k:'pebble', x, z, y:g(x, z), r:rand(0.6, 2.6), sq:rand(0.45, 0.8), ry:rand(0, TAU) }); take(x, z, 1.5); }
      else if(k < 0.5){ add({ k:'flower', x, z, y:g(x, z), h:rand(8, 15), type:pick(['daisy', 'buttercup', 'bluebell', 'daisy']), ry:rand(0, TAU) }); take(x, z, 1); }
      else if(k < 0.68){ add({ k:'leaf', x, z, y:g(x, z) + 0.12, L:rand(6, 10), ry:rand(0, TAU), pitch:rand(0, 0.05), roll:rand(-0.05, 0.05), tint:randi(0, 3), curl:rand(0.1, 0.6) }); take(x, z, 3); }
      else if(k < 0.8){ const b = rand(0, TAU), len = rand(8, 18), bx = x + Math.cos(b) * len, bz = z + Math.sin(b) * len;
        if(Math.max(Math.abs(bx), Math.abs(bz)) < BOUND - 4 && puddleD(bx, bz) > 2){ add({ k:'twig', ax:x, ay:g(x, z) + 0.25, az:z, bx, by:g(bx, bz) + 0.25, bz, r:rand(0.28, 0.5), sag:0 }); take((x + bx) / 2, (z + bz) / 2, 2); } }
      else if(k < 0.9){ add({ k:'cushion', x, z, y:g(x, z), r:rand(1.2, 2.6), ry:rand(0, TAU) }); take(x, z, 2); }
      else { add({ k:'acorn', x, z, y:g(x, z), s:rand(1.2, 1.6), ry:rand(0, TAU), lying:true }); take(x, z, 1.6); }
    }
    // a spider web strung between two reeds/stems near the puddle and one by the dandelions
    add({ k:'web', x:-28, z:-62, y:g(-28, -62) + 6, R:7, ry:0.9 });
    add({ k:'web', x:-60, z:16, y:g(-60, 16) + 7, R:6, ry:-0.4 });
    // dew drops on the ground and on leaves
    for(let i = 0; i < 40; i++){ const x = rand(-BOUND, BOUND), z = rand(-BOUND, BOUND); if(puddleD(x, z) < 1) continue; add({ k:'dew', x, z, y:g(x, z), r:rand(0.25, 0.8) }); }
  });
  MAP.built = true;
  return MAP;
}
