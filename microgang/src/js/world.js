// The meadow as the physics sees it: colliders for every big thing on the map, spawn points, bounce pads.
// Pure (no rendering), so it also works in the unit tests.
import { resetWorld, addCol, boxRot, freeAt, W } from './phys.js';
import { MAP, buildLayout, groundH, waterAt, grassAt, groundMat, WATER, BOUND } from './map.js';
import { mulberry, TAU } from './util.js';

export const WORLD = { spawns:[], pads:[] };

export function buildWorld(){
  buildLayout();
  resetWorld({ groundH, waterAt, grassAt, waterLevel:WATER, half:160, cell:8, bound:BOUND });
  W.groundMat = groundMat;
  WORLD.pads.length = 0;
  for(const it of MAP.items){
    switch(it.k){
      case 'amanita': {
        const capH = it.R * (it.young ? 0.7 : 0.36);
        addCol({ t:'cyl', x:it.x, z:it.z, r:it.sr * 1.05, y0:it.y - 1, y1:it.y + it.h - capH * 0.6, mat:'shroom' });
        // the cap: a thick disc you can stand on (its top a little under the dome's crown)
        addCol({ t:'cyl', x:it.x, z:it.z, r:it.R * 0.94, y0:it.y + it.h - capH * 0.72, y1:it.y + it.h - capH * (it.young ? 0.1 : 0.06), mat:'shroom', cap:true });
        break; }
      case 'puffball': {
        const c = addCol({ t:'sph', x:it.x, y:it.y + it.R * 0.68, z:it.z, r:it.R * 0.95, mat:'shroom' });
        c.bounce = it.launch; c.item = it; WORLD.pads.push(c);
        break; }
      case 'dandelion': addCol({ t:'cyl', x:it.x, z:it.z, r:0.55, y0:it.y - 1, y1:it.y + it.h, mat:'grass' }); break;
      case 'dleaf': {
        const L = it.L, cx = it.x + Math.cos(it.a) * L * 0.5, cz = it.z + Math.sin(it.a) * L * 0.5;
        addCol({ t:'box', x:cx, y:Math.max(it.y, groundH(cx, cz)) + 0.1 + Math.sin(it.lift * 0.5) * L * 0.5, z:cz, hx:it.w * 0.32, hy:0.08, hz:L * 0.5, m:boxRot(Math.PI / 2 - it.a, -it.lift * 0.5), mat:'leaf', see:true });
        break; }
      case 'clover': addCol({ t:'cyl', x:it.x, z:it.z, r:0.2, y0:it.y - 1, y1:it.y + it.h, mat:'grass', see:true }); break;
      case 'strawberry': addCol({ t:'cyl', x:it.x, z:it.z, r:0.35, y0:it.y - 1, y1:it.y + it.h * 0.8, mat:'grass', see:true }); break;
      case 'berry': addCol({ t:'sph', x:it.x, y:it.y + it.r * 0.9, z:it.z, r:it.r * 0.95, mat:'berry' }); break;
      case 'flower': addCol({ t:'cyl', x:it.x, z:it.z, r:0.18, y0:it.y - 1, y1:it.y + it.h, mat:'grass', see:true }); break;
      case 'reed': addCol({ t:'cyl', x:it.x, z:it.z, r:it.r, y0:it.y - 1, y1:it.y + it.h, mat:'grass' }); break;
      case 'lily': addCol({ t:'cyl', x:it.x, z:it.z, r:it.R * 0.9, y0:WATER - 0.4, y1:WATER + 0.1, mat:'leaf' }); break;
      case 'pebble': {
        const R = it.r * 0.95, top = it.y + it.r * it.sq * 1.5;
        addCol({ t:'sph', x:it.x, y:top - R, z:it.z, r:R, mat:'stone' });
        break; }
      case 'cushion': { const R = it.r * 0.9; addCol({ t:'sph', x:it.x, y:it.y - 0.2 + it.r * 0.55 - R, z:it.z, r:R, mat:'moss' }); break; }
      case 'twig': {
        const mx = (it.ax + it.bx) / 2, my = (it.ay + it.by) / 2 - (it.sag || 0), mz = (it.az + it.bz) / 2;
        addCol({ t:'cap', ax:it.ax, ay:it.ay, az:it.az, bx:mx, by:my, bz:mz, r:it.r, mat:'wood' });
        addCol({ t:'cap', ax:mx, ay:my, az:mz, bx:it.bx, by:it.by, bz:it.bz, r:it.r * 0.9, mat:'wood' });
        break; }
      case 'root': {
        const P = it.pts;
        for(let i = 0; i < P.length - 1; i++){ const s = (i + 0.5) / (P.length - 1); addCol({ t:'cap', ax:P[i][0], ay:P[i][1], az:P[i][2], bx:P[i + 1][0], by:P[i + 1][1], bz:P[i + 1][2], r:it.r * (1.25 - s * 0.55) * 0.95, mat:'wood' }); }
        break; }
      case 'leaf': {
        const lift = it.pitch > 0.1 ? Math.sin(it.pitch) * it.L * 0.5 : 0.05;
        addCol({ t:'box', x:it.x, y:it.y + lift, z:it.z, hx:it.L * 0.28, hy:0.12, hz:it.L * 0.5, m:boxRot(it.ry, -it.pitch, it.roll), mat:'leaf', see:it.pitch < 0.1 });
        break; }
      case 'acorn': {
        const s = it.s;
        if(it.lying){ const dx = Math.cos(it.ry), dz = -Math.sin(it.ry); addCol({ t:'cap', ax:it.x - dx * 0.7 * s, ay:it.y + 0.85 * s, az:it.z - dz * 0.7 * s, bx:it.x + dx * 0.5 * s, by:it.y + 0.85 * s, bz:it.z + dz * 0.5 * s, r:0.85 * s, mat:'wood' }); }
        else addCol({ t:'cap', ax:it.x, ay:it.y + 0.6 * s, az:it.z, bx:it.x, by:it.y + 1.6 * s, bz:it.z, r:0.88 * s, mat:'wood' });
        break; }
      case 'acorncap': addCol({ t:'cyl', x:it.x, z:it.z, r:1.1 * it.s * 1.2, y0:it.y - 0.3, y1:it.y + 0.85 * it.s * 1.2, mat:'wood' }); break;
      case 'pinecone': {
        const dx = Math.cos(it.ry), dz = -Math.sin(it.ry), y = it.y + it.R * 0.75;
        // the cone lies along its yaw direction: thick in the middle, thin at the ends
        addCol({ t:'cap', ax:it.x - dx * it.L * 0.22, ay:y, az:it.z - dz * it.L * 0.22, bx:it.x + dx * it.L * 0.18, by:y, bz:it.z + dz * it.L * 0.18, r:it.R * 0.8, mat:'wood' });
        break; }
      case 'shell': {
        // a chamber you can walk into: a ring of wall pieces with a gap facing the opening, and a roof
        const R = it.R, n = 14, open = it.ry, cy = it.y;
        for(let i = 0; i < n; i++){
          const a = i / n * TAU, da = Math.atan2(Math.sin(a - open), Math.cos(a - open));
          if(Math.abs(da) < 0.55) continue;
          const x = it.x + Math.cos(a) * R * 0.85, z = it.z - Math.sin(a) * R * 0.85;
          addCol({ t:'cap', ax:x, ay:cy - 0.5, az:z, bx:x, by:cy + R * 1.5, bz:z, r:R * 0.22, mat:'shell' });
        }
        addCol({ t:'box', x:it.x, y:cy + R * 1.45, z:it.z, hx:R * 0.95, hy:R * 0.35, hz:R * 0.95, m:boxRot(0), mat:'shell' });
        break; }
    }
  }
  buildSpawns();
  return WORLD;
}

// spawn points: open, dry, not inside anything, spread over the meadow
function buildSpawns(){
  const r = mulberry(99), S = WORLD.spawns; S.length = 0;
  for(let i = 0; i < 4000 && S.length < 64; i++){
    const x = (r() * 2 - 1) * (BOUND - 6), z = (r() * 2 - 1) * (BOUND - 6), y = groundH(x, z);
    if(waterAt(x, z) > -1e8 || !freeAt(x, y, z, 0.9, 2.2)) continue;
    if(S.some(s => Math.hypot(s.x - x, s.z - z) < 14)) continue;
    S.push({ x, y, z });
  }
}
