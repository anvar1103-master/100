// Movement and bullets on the floor-plan grid, no rendering: a fighter is an upright cylinder that slides along walls
// and pillars, can hop onto desks, never goes through the ceiling. Rays (bullets, sight, camera) walk the grid cell
// by cell (Amanatides-Woo) and stop at walls, pillars, desks, the floor or the ceiling. Pure module (node-friendly).
import { CELL, FLOOR, WALL, PILLAR, DESK, DESK_H } from './level/gen.js';

export const PW = { L:null };
export const GRAV = 15, STEP = 0.12;
export function setLevel(L){ PW.L = L; }

const cell = (i, k) => { const L = PW.L; if(i < 0 || k < 0 || i >= L.W || k >= L.H) return WALL; return L.g[k * L.W + i]; };
export const ceilAt = (x, z) => { const L = PW.L, i = L.ci(x), k = L.ck(z); if(i < 0 || k < 0 || i >= L.W || k >= L.H) return 2.8; return L.ceil[k * L.W + i]; };
// the floor under a point: a desk top or the carpet
export function groundAt(x, z){ return cell(PW.L.ci(x), PW.L.ck(z)) === DESK ? DESK_H : 0; }
export const MAT = { [WALL]:'wall', [PILLAR]:'wall', [DESK]:'metal' };

// ---- walking: ch {x, y, z (feet), vx, vy, vz, r, h, ground} ----
export function moveChar(ch, dt){
  if(!isFinite(ch.vx + ch.vy + ch.vz)){ ch.vx = ch.vy = ch.vz = 0; }
  if(!isFinite(ch.x + ch.y + ch.z)){ const s = PW.L.spawns[0]; ch.x = s.x; ch.y = 0; ch.z = s.z; }
  const n = Math.min(12, Math.max(1, Math.ceil(Math.hypot(ch.vx, ch.vz) * dt / (ch.r * 0.6))));
  const h = dt / n;
  ch.ground = false; ch.wall = false;
  for(let s = 0; s < n; s++){ ch.x += ch.vx * h; ch.z += ch.vz * h; ch.y += ch.vy * h; resolve(ch); }
}
function resolve(ch){
  const L = PW.L, r = ch.r;
  for(let it = 0; it < 3; it++){
    let moved = false;
    const i0 = L.ci(ch.x - r), i1 = L.ci(ch.x + r), k0 = L.ck(ch.z - r), k1 = L.ck(ch.z + r);
    for(let k = k0; k <= k1; k++) for(let i = i0; i <= i1; i++){
      const c = cell(i, k); if(c === FLOOR) continue;
      // a desk is in the way only below its top
      if(c === DESK && ch.y >= DESK_H - STEP) continue;
      const ax = i * CELL - L.ox, az = k * CELL - L.oz;
      const px = Math.max(ax, Math.min(ax + CELL, ch.x)), pz = Math.max(az, Math.min(az + CELL, ch.z));
      let dx = ch.x - px, dz = ch.z - pz, d = Math.hypot(dx, dz);
      if(d >= r) continue;
      if(d < 1e-6){ // centre inside the cell: out through the nearest face
        const fx = [ch.x - ax, ax + CELL - ch.x], fz = [ch.z - az, az + CELL - ch.z], m = Math.min(...fx, ...fz);
        if(m === fx[0]){ dx = -1; dz = 0; d = fx[0]; } else if(m === fx[1]){ dx = 1; dz = 0; d = fx[1]; } else if(m === fz[0]){ dx = 0; dz = -1; d = fz[0]; } else { dx = 0; dz = 1; d = fz[1]; }
        ch.x += dx * (d + r); ch.z += dz * (d + r);
      } else { const p = (r - d) / d; ch.x += dx * p; ch.z += dz * p; dx /= d; dz /= d; }
      const vn = ch.vx * dx + ch.vz * dz; if(vn < 0){ ch.vx -= vn * dx; ch.vz -= vn * dz; }
      ch.wall = true; moved = true;
    }
    if(!moved) break;
  }
  // floor (or desk top) and ceiling
  let gy = 0;
  for(const [ox, oz] of [[0, 0], [r * 0.7, 0], [-r * 0.7, 0], [0, r * 0.7], [0, -r * 0.7]]) if(ch.y >= DESK_H - STEP - 0.02 && groundAt(ch.x + ox, ch.z + oz) > 0) gy = DESK_H;
  if(ch.y <= gy){ ch.y = gy; if(ch.vy < 0) ch.vy = 0; ch.ground = true; }
  const top = ceilAt(ch.x, ch.z) - 0.05;
  if(ch.y + ch.h > top){ ch.y = Math.max(gy, top - ch.h); if(ch.vy > 0) ch.vy = 0; }
}
// is there room for a fighter (radius r) standing at (x, z)?
export function freeAt(x, z, r = 0.35){
  const L = PW.L;
  for(let k = L.ck(z - r); k <= L.ck(z + r); k++) for(let i = L.ci(x - r); i <= L.ci(x + r); i++){
    if(cell(i, k) === FLOOR) continue;
    const ax = i * CELL - L.ox, az = k * CELL - L.oz, px = Math.max(ax, Math.min(ax + CELL, x)), pz = Math.max(az, Math.min(az + CELL, z));
    if(Math.hypot(x - px, z - pz) < r) return false;
  }
  return true;
}

// ---- rays ----
export const HIT = { t:0, x:0, y:0, z:0, nx:0, ny:1, nz:0, mat:'floor' };
const hit = (t, ox, oy, oz, dx, dy, dz, nx, ny, nz, mat) => { HIT.t = t; HIT.x = ox + dx * t; HIT.y = oy + dy * t; HIT.z = oz + dz * t; HIT.nx = nx; HIT.ny = ny; HIT.nz = nz; HIT.mat = mat; return HIT; };
// first thing the ray (unit direction) meets within tmax, or null
export function ray(ox, oy, oz, dx, dy, dz, tmax){
  const L = PW.L;
  let i = L.ci(ox), k = L.ck(oz);
  const si = dx > 0 ? 1 : -1, sk = dz > 0 ? 1 : -1;
  const adx = Math.abs(dx) < 1e-9 ? 1e-9 : Math.abs(dx), adz = Math.abs(dz) < 1e-9 ? 1e-9 : Math.abs(dz);
  const tdx = CELL / adx, tdz = CELL / adz;
  const lx = ox + L.ox, lz = oz + L.oz;
  let tx = (si > 0 ? (i + 1) * CELL - lx : lx - i * CELL) / adx, tz = (sk > 0 ? (k + 1) * CELL - lz : lz - k * CELL) / adz;
  let tIn = 0, nx = 0, nz = 0, first = true;
  for(let s = 0; s < 1200; s++){
    const tOut = Math.min(tx, tz, tmax), c = cell(i, k);
    if(c === WALL || c === PILLAR){ if(!first) return hit(tIn, ox, oy, oz, dx, dy, dz, nx, 0, nz, 'wall'); }
    else if(c === DESK){
      const yIn = oy + dy * tIn;
      if(!first && yIn < DESK_H && yIn >= 0) return hit(tIn, ox, oy, oz, dx, dy, dz, nx, 0, nz, 'metal');
      if(dy < 0){ const t = (DESK_H - oy) / dy; if(t >= tIn && t <= tOut && oy >= DESK_H) return hit(t, ox, oy, oz, dx, dy, dz, 0, 1, 0, 'metal'); }
    }
    if(c !== WALL || first){
      // floor and ceiling inside this cell's stretch of the ray
      if(dy < 0){ const t = -oy / dy; if(t >= tIn && t <= tOut) return hit(t, ox, oy, oz, dx, dy, dz, 0, 1, 0, 'floor'); }
      else if(dy > 0 && c !== WALL && c !== PILLAR){ const ch = L.ceil[Math.max(0, Math.min(L.H - 1, k)) * L.W + Math.max(0, Math.min(L.W - 1, i))]; const t = (ch - oy) / dy; if(t >= tIn && t <= tOut) return hit(t, ox, oy, oz, dx, dy, dz, 0, -1, 0, 'ceil'); }
    }
    if(tOut >= tmax) return null;
    first = false;
    if(tx < tz){ i += si; tIn = tx; tx += tdx; nx = -si; nz = 0; } else { k += sk; tIn = tz; tz += tdz; nx = 0; nz = -sk; }
    if(i < -1 || k < -1 || i > L.W || k > L.H) return null;
  }
  return null;
}
// nothing solid between two points?
export function losClear(ax, ay, az, bx, by, bz){
  const dx = bx - ax, dy = by - ay, dz = bz - az, d = Math.hypot(dx, dy, dz);
  if(d < 1e-4) return true;
  return !ray(ax, ay, az, dx / d, dy / d, dz / d, d - 0.05);
}
// distance from a ray to a capsule (a..b, radius r): entry t or -1 (bullets against hit boxes)
export function rayCap(ax, ay, az, bx, by, bz, r, ox, oy, oz, dx, dy, dz, tmax){
  // sample-free: closest approach between the ray and the segment, then a sphere test at that point
  const ux = bx - ax, uy = by - ay, uz = bz - az, wx = ox - ax, wy = oy - ay, wz = oz - az;
  const a = dx * dx + dy * dy + dz * dz, b = dx * ux + dy * uy + dz * uz, c = ux * ux + uy * uy + uz * uz, d = dx * wx + dy * wy + dz * wz, e = ux * wx + uy * wy + uz * wz;
  const den = a * c - b * b;
  let s = den > 1e-9 ? (b * e - c * d) / den : 0, t = den > 1e-9 ? (a * e - b * d) / den : (c > 0 ? e / c : 0);
  t = Math.max(0, Math.min(1, t));
  const px = ax + ux * t, py = ay + uy * t, pz = az + uz * t;
  const fx = ox - px, fy = oy - py, fz = oz - pz, bb = fx * dx + fy * dy + fz * dz, cc = fx * fx + fy * fy + fz * fz - r * r, disc = bb * bb - cc;
  if(disc < 0) return -1;
  s = -bb - Math.sqrt(disc);
  return s >= 0 && s <= tmax ? s : (cc < 0 ? 0 : -1);
}
