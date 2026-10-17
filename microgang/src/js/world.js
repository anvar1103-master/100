// The glade as the physics sees it: colliders for every big thing on the map, spawn points, bounce pads.
// Pure (no rendering), so it also works in node (unit tests, the balance tool).
import { resetWorld, addCol, boxRot, freeAt, W } from './phys.js';
import { MAP, AGARIC, buildLayout, groundH, waterAt, grassAt, groundMat, BOUND } from './map.js';
import { mulberry, TAU } from './util.js';

export const WORLD = { spawns:[], pads:[] };

// sizes of the ready-made models in their own units (bounds: x0 y0 z0 x1 y1 z1), measured on the files
export const MODEL_BOUNDS = {
  Rock_Medium_1:[-1.73, -0.27, -1.15, 1.5, 1.99, 1.84], Rock_Medium_2:[-1.71, -0.05, -1.16, 1.34, 1.85, 1.32], Rock_Medium_3:[-1.82, -0.32, -0.89, 1.6, 2.0, 2.59],
  Mushroom_Laetiporus:[-0.65, -0.16, -0.33, 0.72, 0.61, 0.77], tt_picnic_basket_square:[-0.76, 0, -0.56, 0.76, 0.68, 0.56],
  kay_toyblock:[-1, 0, -1, 1, 2, 1], kay_puzzle_cube:[-0.21, 0, -0.21, 0.21, 0.42, 0.21],
};
// a box collider for a model's bounds (scaled s, turned ry), shrunk a little so it hugs a rounded shape
function boundsBox(b, x, y, z, s, ry, k = 0.82, mat = 'stone', o = {}){
  const cx = (b[0] + b[3]) / 2 * s, cz = (b[2] + b[5]) / 2 * s, c = Math.cos(ry), sn = Math.sin(ry);
  const top = y + b[4] * s * (o.top || 0.94), bot = y + b[1] * s - 0.3;
  return addCol({ t:'box', x:x + cx * c + cz * sn, y:(top + bot) / 2, z:z - cx * sn + cz * c, hx:(b[3] - b[0]) / 2 * s * k, hy:(top - bot) / 2, hz:(b[5] - b[2]) / 2 * s * k, m:boxRot(ry), mat });
}
// a lying tube (the log) as a ring of capsules round its length; `open` leaves gaps at some angles
function tubeShell(ax, az, bx, bz, cy, R, rc, mat, open){
  const n = 18, dx = bx - ax, dz = bz - az, L = Math.hypot(dx, dz), px = -dz / L, pz = dx / L;
  for(let i = 0; i < n; i++){
    const a = i / n * TAU; if(open && open(a)) continue;
    const ox = px * Math.cos(a) * R, oy = Math.sin(a) * R, oz = pz * Math.cos(a) * R;
    addCol({ t:'cap', ax:ax + ox, ay:cy + oy, az:az + oz, bx:bx + ox, by:cy + oy, bz:bz + oz, r:rc, mat });
  }
}
// a model point (its own units, before turning) → world, for an item at x,y,z turned ry with size s
const at = (it, px, py, pz) => { const c = Math.cos(it.ry || 0), sn = Math.sin(it.ry || 0), s = it.s; return [it.x + (px * c + pz * sn) * s, it.y + py * s, it.z + (-px * sn + pz * c) * s]; };
// the old stump's roots (model azimuth in its own space, reach, height near the trunk)
const ROOTS = [[0, 0.85, 0.2], [1.4, 0.9, 0.26], [2.65, 0.94, 0.3], [3.66, 0.97, 0.38], [5.06, 0.98, 0.38]];

export function buildWorld(){
  buildLayout();
  resetWorld({ groundH, waterAt, grassAt, waterLevel:undefined, half:90, cell:6, bound:BOUND });
  W.groundMat = groundMat;
  WORLD.pads.length = 0;
  for(const it of MAP.items){
    switch(it.k){
      case 'agaric': {
        const A = AGARIC[it.mdl], s = it.s;
        addCol({ t:'cyl', x:it.x, z:it.z, r:A.sr * s, y0:it.y - 1, y1:it.y + A.cb * s, mat:'shroom' });
        // the cap: a thick disc you can stand on (its top a little under the crown)
        addCol({ t:'cyl', x:it.x, z:it.z, r:A.R * s * 0.95, y0:it.y + A.cb * s, y1:it.y + A.ct * s, mat:'shroom', cap:true });
        break; }
      case 'puffball': {
        const c = addCol({ t:'sph', x:it.x, y:it.y + it.R * 0.68, z:it.z, r:it.R * 0.95, mat:'shroom' });
        c.bounce = true; c.item = it; WORLD.pads.push(c);
        break; }
      case 'rock': boundsBox(MODEL_BOUNDS[it.mdl], it.x, it.y, it.z, it.s, it.ry, 0.8); break;
      case 'clover': addCol({ t:'cyl', x:it.x, z:it.z, r:0.22, y0:it.y - 1, y1:it.y + 1.0 * it.s, mat:'grass', see:true }); break;
      case 'flower': addCol({ t:'cyl', x:it.x, z:it.z, r:0.26, y0:it.y - 1, y1:it.y + 1.8 * it.s, mat:'grass', see:true }); break;
      case 'flax': addCol({ t:'cyl', x:it.x, z:it.z, r:0.3, y0:it.y - 1, y1:it.y + 0.9 * it.s, mat:'grass', see:true }); break;
      case 'fern': addCol({ t:'cyl', x:it.x, z:it.z, r:0.5, y0:it.y - 1, y1:it.y + 0.25 * it.s, mat:'grass', see:true }); break;
      case 'shrooms': addCol({ t:'cyl', x:it.x, z:it.z, r:0.07 * it.s, y0:it.y - 1, y1:it.y + 0.4 * it.s, mat:'shroom' }); break;
      case 'laeti': boundsBox(MODEL_BOUNDS.Mushroom_Laetiporus, it.x, it.y, it.z, it.s, it.ry, 0.75, 'shroom', { top:0.75 }); break;
      case 'log': {
        // hollow, open at both ends: the walls are a ring of capsules (mid-wall radius, half the wall thick)
        tubeShell(it.ax, it.az, it.bx, it.bz, it.cy, it.R * 0.85, it.R * 0.16, 'wood');
        break; }
      case 'plank': case 'spoon': {
        const w = it.k === 'plank' ? it.w : 0.12 * it.s, t = it.k === 'plank' ? it.t : 0.3;
        addCol({ t:'box', x:it.x, y:it.y, z:it.z, hx:w / 2, hy:t / 2, hz:it.L / 2, m:boxRot(it.ry, it.rx), mat:it.k === 'plank' ? 'wood' : 'stone' });
        break; }
      case 'stump': addCol({ t:'cyl', x:it.x, z:it.z, r:it.r, y0:it.y - 1, y1:it.y + it.h, mat:'wood' }); break;
      case 'rootstump': {
        const s = it.s;
        addCol({ t:'cyl', x:it.x, z:it.z, r:0.36 * s, y0:it.y - 1, y1:it.y + 0.95 * s, mat:'wood' });
        for(const [a, reach, h] of ROOTS){ const c = Math.cos(a), sn = Math.sin(a);
          const p0 = at(it, c * 0.4, h * 0.7, sn * 0.4), p1 = at(it, c * reach * 0.92, 0.04, sn * reach * 0.92);
          addCol({ t:'cap', ax:p0[0], ay:p0[1], az:p0[2], bx:p1[0], by:p1[1], bz:p1[2], r:0.075 * s, mat:'wood' }); }
        break; }
      case 'cup': {
        // the teacup: a wall of upright capsules round the rim, a floor inside
        const s = it.s, R = 0.228 * s, top = it.y + 0.245 * s, n = 26;
        for(let i = 0; i < n; i++){ const a = i / n * TAU, x = it.x + Math.cos(a) * R, z = it.z + Math.sin(a) * R;
          addCol({ t:'cap', ax:x, ay:it.y + 0.3, az:z, bx:x, by:top - 0.5, bz:z, r:0.5, mat:'stone' }); }
        addCol({ t:'cyl', x:it.x, z:it.z, r:R - 0.4, y0:it.y - 1, y1:it.y + 0.035 * s, mat:'stone' });
        break; }
      case 'basket': boundsBox(MODEL_BOUNDS.tt_picnic_basket_square, it.x, it.y, it.z, it.s, it.ry, 0.97, 'wood', { top:1 }); break;
      case 'jar': addCol({ t:'cyl', x:it.x, z:it.z, r:0.19 * it.s, y0:it.y - 1, y1:it.y + 0.48 * it.s, mat:'stone' }); break;
      case 'berry': addCol({ t:'sph', x:it.x, y:it.y + 0.08 * it.s, z:it.z, r:0.055 * it.s, mat:'berry' }); break;
      case 'apple': addCol({ t:'sph', x:it.x, y:it.y + 0.18 * it.s, z:it.z, r:0.2 * it.s, mat:'berry' }); break;
      case 'block': boundsBox(MODEL_BOUNDS.kay_toyblock, it.x, it.y, it.z, it.s, it.ry, 1, 'wood', { top:1 }); break;
      case 'puzzle': boundsBox(MODEL_BOUNDS.kay_puzzle_cube, it.x, it.y, it.z, it.s, it.ry, 1, 'wood', { top:1 }); break;
      case 'ball': addCol({ t:'sph', x:it.x, y:it.y + it.s, z:it.z, r:it.s * 0.98, mat:'leaf' }); break;
      case 'dandelion': addCol({ t:'cyl', x:it.x, z:it.z, r:0.5, y0:it.y - 1, y1:it.y + it.h, mat:'grass' }); break;
      case 'dleaf': {
        const L = it.L, cx = it.x + Math.cos(it.a) * L * 0.5, cz = it.z + Math.sin(it.a) * L * 0.5;
        addCol({ t:'box', x:cx, y:Math.max(it.y, groundH(cx, cz)) + 0.1 + Math.sin(it.lift * 0.5) * L * 0.5, z:cz, hx:it.w * 0.32, hy:0.08, hz:L * 0.5, m:boxRot(Math.PI / 2 - it.a, -it.lift * 0.5), mat:'leaf', see:true });
        break; }
      case 'cushion': { const R = it.r * 0.9; addCol({ t:'sph', x:it.x, y:it.y - 0.2 + it.r * 0.55 - R, z:it.z, r:R, mat:'moss' }); break; }
      case 'leaf': {
        const lift = it.pitch > 0.1 ? Math.sin(it.pitch) * it.L * 0.5 : 0.05;
        addCol({ t:'box', x:it.x, y:it.y + lift, z:it.z, hx:it.L * 0.28, hy:0.12, hz:it.L * 0.5, m:boxRot(it.ry, -it.pitch, it.roll), mat:'leaf', see:it.pitch < 0.1 });
        break; }
    }
  }
  buildSpawns();
  return WORLD;
}

// spawn points: open, not inside anything, spread over the glade
function buildSpawns(){
  const r = mulberry(99), S = WORLD.spawns; S.length = 0;
  for(let i = 0; i < 6000 && S.length < 56; i++){
    const x = (r() * 2 - 1) * (BOUND - 7), z = (r() * 2 - 1) * (BOUND - 7), y = groundH(x, z);
    if(!freeAt(x, y, z, 0.9, 2.2)) continue;
    if(S.some(s => Math.hypot(s.x - x, s.z - z) < 8.5)) continue;
    S.push({ x, y, z });
  }
}
