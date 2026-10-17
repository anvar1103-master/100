// «Грибная опушка»: a small glade on the forest floor, as plain data — terrain, the trodden trails, where the tall
// grass grows, and every big thing on it. Pure: no rendering. Visual builders (nature/*.js) and the physics colliders
// are both made from MAP.items.
//
// Layout (north is −z): the fly agaric ring in the middle (a puffball throws you up onto the caps); a ring trail
// around it with spokes to eight places at the edges, each its own kind of fight:
//   N  the hollow fallen log — a tunnel, and a plank up onto its back
//   E  the boulders — hard cover, a staircase of stones onto the big flat one that looks over the ring
//   S  the picnic — a spoon up onto the basket, from there into the giant teacup (a nest with walls), strawberries
//   W  the clover thicket — leaves overhead, thin stems, close quarters
//   NE the stump with bracket fungi for steps (high ground)   SE the old stump's roots spread over the ground
//   SW dandelions with their leaf rosettes                     NW lost toys: a staircase of toy blocks, a beach ball
// Between the trails the grass stands three to five times taller than a hero: slow and hidden ways round.
import { seeded, rand, randi, pick, chance, fbm2, noise2, sstep, clamp, TAU, lerp } from './util.js';

export const BOUND = 50;            // the playable square is ±BOUND (the grass wall starts a few steps in)
export const WATER = -100;          // no water on this map
export const ZONES = {
  ring:    { x:0,   z:0,   r:13, name:'Мухоморный круг' },
  log:     { x:0,   z:-33, r:13, name:'Бревно' },
  stones:  { x:33,  z:1,   r:12, name:'Валуны' },
  picnic:  { x:1,   z:33,  r:12, name:'Пикник' },
  clover:  { x:-33, z:0,   r:12, name:'Клевер' },
  stump:   { x:31,  z:-31, r:9,  name:'Пень' },
  roots:   { x:31,  z:31,  r:10, name:'Корни' },
  dande:   { x:-31, z:31,  r:9,  name:'Одуванчики' },
  toys:    { x:-31, z:-31, r:9,  name:'Кубики' },
};
const zoneK = (x, z, Z, k = 1) => 1 - sstep(Z.r * 0.6 * k, Z.r * k, Math.hypot(x - Z.x, z - Z.z));

// ---- trails: a ring round the middle, spokes to the eight places ----
const RING_R = 21;
const SPOKES = [[0, -RING_R, 0, -27], [RING_R, 0, 26, 0.5], [0, RING_R, 1, 31], [-RING_R, 0, -44, 0],
  [15, -15, 27, -27], [15, 15, 28, 28], [-15, 15, -28, 28], [-15, -15, -28, -28],
  // along the log's south face, round its west end and back along its north side (a hidden way round)
  [-18, -27, 16, -27], [-23, -28, -23, -40], [-23, -40, 18, -40], [18, -40, 22, -33]];
function segD(x, z, ax, az, bx, bz){
  const vx = bx - ax, vz = bz - az, t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz), 0, 1);
  return Math.hypot(x - ax - vx * t, z - az - vz * t);
}
export function trailD(x, z){
  // the ring wobbles a little so it doesn't look drawn with a compass
  const a = Math.atan2(z, x), r = RING_R + Math.sin(a * 3 + 1) * 1.2;
  let d = Math.abs(Math.hypot(x, z) - r);
  for(const s of SPOKES) d = Math.min(d, segD(x, z, s[0], s[1], s[2], s[3]) + noise2(x * 0.2, z * 0.2) * 0.5);
  return d;
}
// 1 on a trail, fading over its edge (half width ~1.6)
export function trailAt(x, z){ return 1 - sstep(1.1, 2.3, trailD(x, z)); }

// ---- terrain ----
export function groundH(x, z){
  let h = fbm2(x * 0.03, z * 0.03, 4) * 0.9 + noise2(x * 0.11, z * 0.11) * 0.15;
  // the ring sits on a low mossy mound
  h += 1.1 * (1 - sstep(6, 16, Math.hypot(x, z)));
  // the strawberry clearing is a shallow dish, the roots corner and the stump a little raised
  h -= 0.5 * zoneK(x, z, ZONES.picnic);
  h += 0.7 * zoneK(x, z, ZONES.roots, 1.2) + 0.5 * zoneK(x, z, ZONES.stump, 1.2);
  // trails are worn a hand's breadth into the ground
  h -= 0.12 * trailAt(x, z);
  // beyond the edge the ground climbs, so the grass wall reads as a wall
  const e = Math.max(Math.abs(x), Math.abs(z)) - BOUND;
  if(e > 0) h += e * e * 0.012 + e * 0.05;
  return h;
}
export function waterAt(){ return -1e9; }

// what the ground is made of (impacts, footsteps): moss on the mound and in the hollows, packed dirt elsewhere
export function groundMat(x, z){ return trailAt(x, z) > 0.5 ? 'dirt' : mossAt(x, z) > 0.5 ? 'moss' : 'dirt'; }
export function mossAt(x, z){
  let m = sstep(-0.05, 0.3, fbm2(x * 0.05 + 7, z * 0.05 - 3, 3));
  m = Math.max(m, 1 - sstep(8, 15, Math.hypot(x, z)));
  m = Math.max(m, 0.8 * zoneK(x, z, ZONES.clover), 0.7 * zoneK(x, z, ZONES.roots, 1.1), 0.7 * zoneK(x, z, ZONES.stump, 1.1));
  m *= 1 - zoneK(x, z, ZONES.stones) * 0.7;
  m *= 1 - trailAt(x, z) * 0.9;
  return clamp(m, 0, 1);
}

// ---- tall grass: density 0..1 and blade height (written to o.h) ----
export function grassAt(x, z, o){
  const e = Math.max(Math.abs(x), Math.abs(z));
  const wall = sstep(BOUND - 7, BOUND - 2, e);
  let g = sstep(-0.15, 0.2, fbm2(x * 0.045 - 11, z * 0.045 + 5, 4));
  g *= sstep(2.2, 5.5, trailD(x, z));
  for(const k in ZONES){ const Z = ZONES[k]; g *= 1 - 0.95 * zoneK(x, z, Z, k === 'clover' ? 0.75 : k === 'ring' ? 1.05 : 1); }
  g = Math.max(g, wall);
  if(o) o.h = lerp(5.5, 10, 0.5 + 0.5 * noise2(x * 0.06 + 3, z * 0.06)) + wall * 4;
  return g;
}

// ---- the big things ----
// Ready-made models carry `mdl` (the model's name) and how it's placed: x y z, turn ry (and tilt rx rz), size s or
// sx sy sz, oy (a lift in the model's own units after scaling). `k` says what the physics makes of it (world.js).
// Built in code: puffball, dandelion + dleaf, cushion, leaf, dew.
// model sizes used for placing (own units): fly agarics — height, cap underside, cap top, cap radius, stem radius
export const AGARIC = {
  aq_fly_agaric_big:  { H:0.198, cb:0.158, ct:0.192, R:0.088, sr:0.021 },
  aq_fly_agaric_basic:{ H:0.186, cb:0.135, ct:0.18,  R:0.073, sr:0.021 },
  aq_fly_agaric_small:{ H:0.085, cb:0.038, ct:0.08,  R:0.04,  sr:0.02 },
};
export const MAP = { items:[], built:false };
const free = [];   // rough discs already taken (x, z, r), to keep dressing from overlapping
function room(x, z, r){ for(const f of free) if(Math.hypot(x - f[0], z - f[1]) < r + f[2]) return false; return Math.max(Math.abs(x), Math.abs(z)) < BOUND - 5; }
function take(x, z, r){ free.push([x, z, r]); }
function add(o){ MAP.items.push(o); return o; }
// n things in a zone, away from trails and each other
function scatter(Z, n, r, fn, o = {}){
  for(let i = 0; i < n; i++) for(let t = 0; t < 40; t++){
    const a = rand(0, TAU), d = Math.sqrt(rand()) * Z.r * (o.k || 1), x = Z.x + Math.cos(a) * d, z = Z.z + Math.sin(a) * d;
    if(!room(x, z, r) || (o.trail !== false && trailD(x, z) < r + 1.2)) continue;
    take(x, z, r); fn(x, z); break;
  }
}
const ROCKS = ['Rock_Medium_1', 'Rock_Medium_2', 'Rock_Medium_3'], CLOVERS = ['Clover_1', 'Clover_2'], FLOWERS = ['Flower_3_Single', 'Flower_4_Single', 'Flower_3_Group', 'Flower_4_Group'];
// a board-like thing (plank, spoon) lying from a to b: centre, turn and tilt
function along(a, b){
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], h = Math.hypot(dx, dz);
  return { x:(a[0] + b[0]) / 2, y:(a[1] + b[1]) / 2, z:(a[2] + b[2]) / 2, ry:Math.atan2(dx, dz), rx:-Math.atan2(dy, h), L:Math.hypot(h, dy) };
}

export function buildLayout(){
  if(MAP.built) return MAP;
  MAP.items.length = 0; free.length = 0;
  seeded(20261017, () => {
    const g = (x, z) => groundH(x, z);
    const agaric = (mdl, x, z, h, ry) => { const A = AGARIC[mdl]; add({ k:'agaric', mdl, x, z, y:g(x, z), s:h / A.H, ry, h }); take(x, z, A.R * h / A.H * 0.5); };
    const rock = (x, z, s, ry, v = randi(0, 2), o = {}) => add(Object.assign({ k:'rock', mdl:ROCKS[v], x, z, y:g(x, z), s, ry }, o));
    // -- the fly agaric ring with a puffball in the middle: four caps to stand on, young ones between --
    { for(const [a, d, h, mdl] of [[0.55, 10, 11.5, 'aq_fly_agaric_big'], [2.1, 9.5, 9, 'aq_fly_agaric_basic'], [3.6, 10.5, 13, 'aq_fly_agaric_big'], [5.0, 9.5, 10, 'aq_fly_agaric_basic']])
        agaric(mdl, Math.cos(a) * d, Math.sin(a) * d, h, rand(0, TAU));
      add({ k:'puffball', x:0, z:0, y:g(0, 0), R:2.2 }); take(0, 0, 3.2);
      for(let i = 0; i < 7; i++){ const a = i / 7 * TAU + 0.3, d = rand(5.5, 7.5), x = Math.cos(a) * d, z = Math.sin(a) * d;
        if(room(x, z, 1.4)) agaric(i % 3 ? 'aq_fly_agaric_small' : 'aq_fly_agaric_basic', x, z, i % 3 ? rand(2.4, 3.4) : rand(4, 5), rand(0, TAU)); }
      // mossy stones for cover inside the ring
      for(const [a, d] of [[1.3, 6], [2.9, 6.5], [4.3, 6], [5.8, 6.5]]){ const x = Math.cos(a) * d, z = Math.sin(a) * d; rock(x, z, rand(0.55, 0.7), rand(0, TAU)); take(x, z, 2); }
      scatter(ZONES.ring, 5, 1.8, (x, z) => add({ k:'cushion', x, z, y:g(x, z), r:rand(1.3, 2.2), ry:rand(0, TAU) }), { k:0.85 });
    }
    // -- N: the hollow fallen log, a tunnel; a plank leans on its west end to walk up onto it --
    { const L = ZONES.log, a = [L.x - 17, L.z - 0.5], b = [L.x + 13, L.z - 1.5], R = 3.3, sink = 0.8;
      const cy = Math.min(g(a[0], a[1]), g(b[0], b[1]), g(L.x, L.z)) - sink + R;
      // the model lies along its x, 2.06 long, 0.35 in radius with its axis 0.342 up
      const sy = R / 0.35, lx = b[0] - a[0], lz = b[1] - a[1];
      add({ k:'log', mdl:'sg_log_hollow', ax:a[0], az:a[1], bx:b[0], bz:b[1], cy, R, x:(a[0] + b[0]) / 2, z:(a[1] + b[1]) / 2, y:cy - 0.342 * sy, ry:-Math.atan2(lz, lx), sx:Math.hypot(lx, lz) / 2.06, sy, sz:sy });
      for(let t = 0; t <= 1; t += 0.04) take(lerp(a[0], b[0], t), lerp(a[1], b[1], t), 3.6);
      // the plank: from the grass south-west of the log up onto its back
      const top = [a[0] + 3, cy + R + 0.12, lerp(a[1], b[1], 0.1)], foot = [a[0] - 5, g(a[0] - 5, a[1] + 6) + 0.1, a[1] + 6];
      const P = along(foot, top);
      add({ k:'plank', mdl:'kay_plank', x:P.x, y:P.y, z:P.z, ry:P.ry, rx:P.rx, L:P.L, w:2.4, t:0.45, sx:2.4 / 0.4, sy:0.45 / 0.15, sz:P.L / 1.5, oy:-0.075 });
      take(foot[0], foot[2], 2.5); take(P.x, P.z, 2.5);
      scatter(L, 4, 1.8, (x, z) => add({ k:'fern', mdl:'Fern_1', x, z, y:g(x, z), s:rand(4, 5), ry:rand(0, TAU) }), { k:1.1 });
      scatter(L, 6, 1.6, (x, z) => add({ k:'leaf', x, z, y:g(x, z) + 0.12, L:rand(6, 9), ry:rand(0, TAU), pitch:rand(0, 0.05), roll:rand(-0.05, 0.05), tint:randi(0, 3), curl:rand(0.1, 0.5) }));
    }
    // -- E: the boulders; the big flat one in the middle is climbed by a staircase of smaller stones --
    { const B = ZONES.stones;
      for(const [x, z, v, s, ry] of [[B.x, B.z, 0, 2.25, 0.9], [B.x - 2, B.z - 8, 1, 2.1, 2.2], [B.x + 6, B.z + 8, 2, 2.3, 4.1], [B.x + 7, B.z - 5, 0, 1.9, 3.0], [B.x - 11, B.z - 2, 2, 1.5, 1.4]]){ rock(x, z, s, ry, v); take(x, z, s * 1.8); }
      for(const [dx, dz, s] of [[-4.6, 1.5, 1.8], [-6.5, 4.2, 1.2], [-6.2, 7.0, 0.6]]){ const x = B.x + dx, z = B.z + dz; rock(x, z, s, rand(0, TAU), 1, { step:true }); take(x, z, 1.5); }
      scatter(B, 8, 1.6, (x, z) => rock(x, z, rand(0.45, 0.8), rand(0, TAU)), { k:1.15 });
    }
    // -- S: the picnic: a spoon leans on the basket, from the basket you step onto the teacup's rim and drop inside --
    { const S = ZONES.picnic;
      const bx = S.x + 6, bz = S.z + 4, bs = 7, bry = 0.15;
      add({ k:'basket', mdl:'tt_picnic_basket_square', x:bx, z:bz, y:g(bx, bz), s:bs, ry:bry }); take(bx, bz, 6.5);
      const cs = 22, cr = 0.243 * cs, ux = Math.cos(bry), uz = -Math.sin(bry), d = 0.76 * bs + cr + 0.2, cx = bx + ux * d, cz = bz + uz * d;
      add({ k:'cup', mdl:'tt_mug', x:cx, z:cz, y:g(cx, cz) - 0.3, s:cs, ry:-0.6 }); take(cx, cz, cr + 0.5);
      // the spoon: bowl on the grass to the west, handle resting on the basket's lid
      const btop = g(bx, bz) + 0.68 * bs, hi = [bx - ux * 3.6, btop + 0.25, bz - uz * 3.6], lo = [bx - ux * 12.5, g(bx - ux * 12.5, bz + 3) + 0.25, bz + 3];
      const P = along(lo, hi), ss = P.L / 0.582;
      add({ k:'spoon', mdl:'tt_spoon', x:P.x, y:P.y, z:P.z, ry:P.ry, rx:P.rx, L:P.L, s:ss, oy:-0.06 }); take(lo[0], lo[2], 3); take(P.x, P.z, 3);
      add({ k:'jar', mdl:'tt_jam_jar', x:bx - 2, z:bz - 6.2, y:g(bx - 2, bz - 6.2), s:8, ry:0.4 }); take(bx - 2, bz - 6.2, 2);
      scatter(S, 6, 2, (x, z) => add({ k:'berry', mdl:'kn_strawberry', x, z, y:g(x, z), s:rand(18, 24), ry:rand(0, TAU) }), { k:1.25 });
      scatter(S, 2, 2.4, (x, z) => add({ k:'apple', mdl:'tt_apple', x, z, y:g(x, z), s:rand(8, 10), ry:rand(0, TAU) }), { k:1.3 });
    }
    // -- W: the clover thicket: stems you can weave between, a roof of leaves; flax and ferns at its back --
    { const C = ZONES.clover;
      for(let i = 0; i < 120 && MAP.items.filter(o => o.k === 'clover').length < 40; i++){ const a = rand(0, TAU), d = Math.sqrt(rand()) * C.r * 1.15, x = C.x + Math.cos(a) * d, z = C.z + Math.sin(a) * d;
        if(room(x, z, 1.5) && trailD(x, z) > 1.8){ add({ k:'clover', mdl:CLOVERS[randi(0, 1)], x, z, y:g(x, z), s:rand(5, 7.5), ry:rand(0, TAU) }); take(x, z, 1.5); } }
      for(const [dx, dz] of [[-9, -6], [-10, 7], [-4, 11]]){ const x = C.x + dx, z = C.z + dz; if(room(x, z, 2.5)){ add({ k:'fern', mdl:'Fern_1', x, z, y:g(x, z), s:rand(6, 7.5), ry:rand(0, TAU) }); take(x, z, 2.5); } }
      scatter(C, 3, 1, (x, z) => add({ k:'flax', mdl:'kay_flax_flower', x, z, y:g(x, z), s:rand(11, 14), ry:rand(0, TAU) }), { k:1.2 });
      scatter(C, 4, 1, (x, z) => add({ k:'flower', mdl:FLOWERS[randi(0, 3)], x, z, y:g(x, z), s:rand(4.5, 6), ry:rand(0, TAU) }), { k:1.2 });
    }
    // -- NE: the old stump; bracket fungi on its side are the steps up --
    { const T = ZONES.stump, sx = T.x + 2, sz = T.z - 2, ss = 24, sr = 0.2 * ss;
      add({ k:'stump', mdl:'fs_stump_round', x:sx, z:sz, y:g(sx, sz) - 0.2, s:ss, ry:0.3, r:sr, h:0.2 * ss - 0.2 }); take(sx, sz, sr + 1.5);
      // shelves round the south-west side, each a hop higher; the last hop is onto the stump
      for(let i = 0; i < 4; i++){ const a = 2.3 + i * 0.5, x = sx + Math.cos(a) * (sr + 0.9), z = sz - Math.sin(a) * (sr + 0.9), top = g(sx, sz) + 0.98 * (i + 1);
        add({ k:'laeti', mdl:'Mushroom_Laetiporus', x, z, s:4.2, top, y:top - 0.61 * 4.2 * 0.75, ry:a - Math.PI / 2, shelf:true }); }
      scatter(T, 2, 1.4, (x, z) => add({ k:'shrooms', mdl:'Mushroom_Common', x, z, y:g(x, z), s:rand(12, 16), ry:rand(0, TAU) }), { k:1.3 });
    }
    // -- SE: a big old stump with its roots spread over the ground: run between them, hide behind them --
    { const R = ZONES.roots, x = R.x + 2, z = R.z + 2;
      add({ k:'rootstump', mdl:'fs_stump_roots', x, z, y:g(x, z) - 0.3, s:12, ry:0.4 }); take(x, z, 7);
      scatter(R, 3, 1.5, (x, z) => add({ k:'cushion', x, z, y:g(x, z), r:rand(1.5, 2.5), ry:rand(0, TAU) }), { k:1.3 });
      scatter(R, 2, 2, (x, z) => add({ k:'shrooms', mdl:'Mushroom_Common', x, z, y:g(x, z), s:rand(12, 16), ry:rand(0, TAU) }), { k:1.3 });
    }
    // -- SW: dandelions with their rosettes (low cover) --
    { const D = ZONES.dande;
      for(const [dx, dz, h, head] of [[2, -3, 22, 'seed'], [-5, 4, 18, 'flower'], [5, 5, 16, 'flower'], [-3, -7, 14, 'flower']]){
        const x = D.x + dx, z = D.z + dz;
        add({ k:'dandelion', x, z, y:g(x, z), h, head, lean:rand(-0.05, 0.05), ry:rand(0, TAU) }); take(x, z, 1.4);
        const n = randi(6, 8);
        for(let j = 0; j < n; j++){ const a = j / n * TAU + rand(-0.2, 0.2); add({ k:'dleaf', x, z, y:g(x, z), a, L:rand(7, 10), w:rand(2, 2.8), lift:rand(0.05, 0.3) }); }
      }
      scatter(D, 4, 1, (x, z) => add({ k:'flower', mdl:FLOWERS[randi(0, 3)], x, z, y:g(x, z), s:rand(4, 5.5), ry:rand(0, TAU) }), { k:1.3 });
    }
    // -- NW: lost toys: toy blocks make a staircase up to a lookout, a beach ball, a puzzle cube --
    { const N = ZONES.toys;
      const blocks = [['kay_toyblock_red', -3, -3, 2.2, 0.05], ['kay_toyblock_blue', 0.6, -2, 1.65, -0.04], ['kay_toyblock_striped', 3.1, -0.85, 1.1, 0.03], ['kay_toyblock_red', 4.6, 0.1, 0.55, 0.1]];
      for(const [mdl, dx, dz, s, ry] of blocks){ const x = N.x + dx, z = N.z + dz; add({ k:'block', mdl, x, z, y:g(x, z) - 0.05, s, ry }); take(x, z, s * 1.2); }
      add({ k:'ball', mdl:'kp_beach_ball', x:N.x - 6, z:N.z + 5, y:g(N.x - 6, N.z + 5) - 0.3, s:3.2, ry:0.7 }); take(N.x - 6, N.z + 5, 3.6);
      add({ k:'puzzle', mdl:'kay_puzzle_cube', x:N.x + 5, z:N.z - 7, y:g(N.x + 5, N.z - 7), s:8, ry:0.5 }); take(N.x + 5, N.z - 7, 2.6);
      scatter(N, 3, 1.6, (x, z) => add({ k:'leaf', x, z, y:g(x, z) + 0.12, L:rand(6, 9), ry:rand(0, TAU), pitch:rand(0, 0.05), roll:rand(-0.06, 0.06), tint:randi(0, 3), curl:rand(0.1, 0.5) }), { k:1.2 });
    }
    // -- in the grass between the places: lone stones, flowers, ferns and mushrooms to steer by --
    for(let i = 0; i < 60; i++){ const x = rand(-BOUND + 7, BOUND - 7), z = rand(-BOUND + 7, BOUND - 7); if(!room(x, z, 1.6) || trailD(x, z) < 3) continue;
      const k = rand();
      if(k < 0.28){ rock(x, z, rand(0.45, 0.85), rand(0, TAU)); take(x, z, 2); }
      else if(k < 0.5){ add({ k:'flower', mdl:FLOWERS[randi(0, 3)], x, z, y:g(x, z), s:rand(4.5, 6.5), ry:rand(0, TAU) }); take(x, z, 1.2); }
      else if(k < 0.68){ add({ k:'fern', mdl:'Fern_1', x, z, y:g(x, z), s:rand(4, 5.5), ry:rand(0, TAU) }); take(x, z, 2.5); }
      else if(k < 0.8){ add({ k:'cushion', x, z, y:g(x, z), r:rand(1.2, 2.2), ry:rand(0, TAU) }); take(x, z, 2); }
      else if(k < 0.9){ agaric('aq_fly_agaric_small', x, z, rand(2.2, 3.2), rand(0, TAU)); }
      else { add({ k:'shrooms', mdl:'Mushroom_Common', x, z, y:g(x, z), s:rand(10, 14), ry:rand(0, TAU) }); take(x, z, 2); }
    }
    // dew drops on the ground
    for(let i = 0; i < 30; i++){ const x = rand(-BOUND, BOUND), z = rand(-BOUND, BOUND); add({ k:'dew', x, z, y:g(x, z), r:rand(0.25, 0.7) }); }
    // -- beyond the edge: giants that tell you how small you are (bushes, trees), outside the grass wall --
    for(let i = 0; i < 22; i++){ const a = i / 22 * TAU + rand(-0.1, 0.1), d = rand(66, 80), x = Math.cos(a) * d, z = Math.sin(a) * d;
      add({ k:'far', mdl:'Bush_Common_Flowers', x, z, y:g(x, z) - 1, s:rand(16, 24), ry:rand(0, TAU) }); }
    for(const [x, z, mdl, s] of [[86, 86, 'CommonTree_1', 38], [-120, -90, 'CommonTree_1', 40], [-60, -150, 'Pine_4', 34], [70, -140, 'CommonTree_3', 36], [150, -40, 'CommonTree_1', 42], [-160, 30, 'CommonTree_3', 40], [-100, 140, 'Pine_4', 36], [40, 160, 'CommonTree_3', 38]])
      add({ k:'far', mdl, x, z, y:g(x, z) - 2, s, ry:rand(0, TAU) });
  });
  MAP.built = true;
  return MAP;
}
