// Physics of the tiny world, no rendering: terrain, colliders, walking characters, bullet rays and line of sight
// through tall grass. Pure module (runs in node for the unit tests).
//
// Colliders (all solid; tops of them are walkable):
//   cyl  {x, z, r, y0, y1}                     vertical cylinder with a flat top (stems, caps, stumps)
//   sph  {x, y, z, r}                          sphere (pebbles, berries, acorns, dew)
//   cap  {ax, ay, az, bx, by, bz, r}           capsule (twigs, roots, stalks)
//   box  {x, y, z, hx, hy, hz, m:[9]}          oriented box, m = 3x3 rotation, columns are the box axes (leaves, shell walls)
// Every collider has mat (impact material: dirt moss stone wood shroom leaf water grass berry shell chitin) and an id.

export const W = {
  groundH:(x, z) => 0, waterAt:(x, z) => -1e9, grassAt:(x, z, o) => 0,
  cols:[], cell:8, half:140, n:0, grid:null, stamp:0, bound:95,
};
let nextId = 1;
export function resetWorld(o){
  Object.assign(W, { cols:[], grid:null }, o);
  W.n = Math.ceil(W.half * 2 / W.cell);
  W.grid = Array.from({ length:W.n * W.n }, () => []);
}
const ci = v => Math.max(0, Math.min(W.n - 1, Math.floor((v + W.half) / W.cell)));
function aabb(c){
  switch(c.t){
    case 'cyl': return [c.x - c.r, c.y0, c.z - c.r, c.x + c.r, c.y1, c.z + c.r];
    case 'sph': return [c.x - c.r, c.y - c.r, c.z - c.r, c.x + c.r, c.y + c.r, c.z + c.r];
    case 'cap': return [Math.min(c.ax, c.bx) - c.r, Math.min(c.ay, c.by) - c.r, Math.min(c.az, c.bz) - c.r, Math.max(c.ax, c.bx) + c.r, Math.max(c.ay, c.by) + c.r, Math.max(c.az, c.bz) + c.r];
    case 'box': { const m = c.m; const ex = Math.abs(m[0]) * c.hx + Math.abs(m[3]) * c.hy + Math.abs(m[6]) * c.hz, ey = Math.abs(m[1]) * c.hx + Math.abs(m[4]) * c.hy + Math.abs(m[7]) * c.hz, ez = Math.abs(m[2]) * c.hx + Math.abs(m[5]) * c.hy + Math.abs(m[8]) * c.hz;
      return [c.x - ex, c.y - ey, c.z - ez, c.x + ex, c.y + ey, c.z + ez]; }
  }
}
export function addCol(c){
  c.id = nextId++; c.mat = c.mat || 'wood'; c.bb = aabb(c); c.s = 0;
  W.cols.push(c);
  const b = c.bb;
  for(let i = ci(b[0]); i <= ci(b[3]); i++) for(let k = ci(b[2]); k <= ci(b[5]); k++) W.grid[i * W.n + k].push(c);
  return c;
}
// a box from a centre, half sizes and yaw / pitch / roll (radians, applied Y then X then Z)
export function boxRot(yaw, pitch = 0, roll = 0){
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cx = Math.cos(pitch), sx = Math.sin(pitch), cz = Math.cos(roll), sz = Math.sin(roll);
  // R = Ry * Rx * Rz, stored column-major (columns = local x, y, z axes in world)
  const r00 = cy * cz + sy * sx * sz, r01 = -cy * sz + sy * sx * cz, r02 = sy * cx;
  const r10 = cx * sz, r11 = cx * cz, r12 = -sx;
  const r20 = -sy * cz + cy * sx * sz, r21 = sy * sz + cy * sx * cz, r22 = cy * cx;
  return [r00, r10, r20, r01, r11, r21, r02, r12, r22];
}
// visit every collider whose box overlaps the given box, once
export function each(x0, y0, z0, x1, y1, z1, fn){
  const s = ++W.stamp;
  for(let i = ci(x0); i <= ci(x1); i++) for(let k = ci(z0); k <= ci(z1); k++){
    for(const c of W.grid[i * W.n + k]){
      if(c.s === s) continue; c.s = s;
      const b = c.bb; if(b[0] > x1 || b[3] < x0 || b[1] > y1 || b[4] < y0 || b[2] > z1 || b[5] < z0) continue;
      if(fn(c) === false) return;
    }
  }
}

// ---- closest points ----
const _p = { x:0, y:0, z:0 }, _q = { x:0, y:0, z:0 };
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
// closest points between segments p1-q1 and p2-q2 (Ericson); writes _p (on the first) and _q (on the second)
function segSeg(p1x, p1y, p1z, q1x, q1y, q1z, p2x, p2y, p2z, q2x, q2y, q2z){
  const d1x = q1x - p1x, d1y = q1y - p1y, d1z = q1z - p1z, d2x = q2x - p2x, d2y = q2y - p2y, d2z = q2z - p2z;
  const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z;
  const a = d1x * d1x + d1y * d1y + d1z * d1z, e = d2x * d2x + d2y * d2y + d2z * d2z, f = d2x * rx + d2y * ry + d2z * rz;
  let s, t;
  if(a <= 1e-9 && e <= 1e-9){ s = t = 0; }
  else if(a <= 1e-9){ s = 0; t = clamp01(f / e); }
  else {
    const c = d1x * rx + d1y * ry + d1z * rz;
    if(e <= 1e-9){ t = 0; s = clamp01(-c / a); }
    else {
      const b = d1x * d2x + d1y * d2y + d1z * d2z, den = a * e - b * b;
      s = den > 1e-9 ? clamp01((b * f - c * e) / den) : 0;
      t = (b * s + f) / e;
      if(t < 0){ t = 0; s = clamp01(-c / a); } else if(t > 1){ t = 1; s = clamp01((b - c) / a); }
    }
  }
  _p.x = p1x + d1x * s; _p.y = p1y + d1y * s; _p.z = p1z + d1z * s;
  _q.x = p2x + d2x * t; _q.y = p2y + d2y * t; _q.z = p2z + d2z * t;
}
// closest point on an oriented box to a point -> _q
function boxPoint(c, px, py, pz){
  const m = c.m, dx = px - c.x, dy = py - c.y, dz = pz - c.z;
  let lx = dx * m[0] + dy * m[1] + dz * m[2], ly = dx * m[3] + dy * m[4] + dz * m[5], lz = dx * m[6] + dy * m[7] + dz * m[8];
  lx = Math.max(-c.hx, Math.min(c.hx, lx)); ly = Math.max(-c.hy, Math.min(c.hy, ly)); lz = Math.max(-c.hz, Math.min(c.hz, lz));
  _q.x = c.x + m[0] * lx + m[3] * ly + m[6] * lz; _q.y = c.y + m[1] * lx + m[4] * ly + m[7] * lz; _q.z = c.z + m[2] * lx + m[5] * ly + m[8] * lz;
}
// closest points between a vertical segment (x, y0..y1, z) and a collider: _p on the segment, _q on the collider
function closest(c, x, y0, y1, z){
  switch(c.t){
    case 'sph': { const y = Math.max(y0, Math.min(y1, c.y)); _p.x = x; _p.y = y; _p.z = z;
      const dx = x - c.x, dy = y - c.y, dz = z - c.z, d = Math.hypot(dx, dy, dz) || 1e-6; _q.x = c.x + dx / d * c.r; _q.y = c.y + dy / d * c.r; _q.z = c.z + dz / d * c.r;
      if(d < c.r){ _q.x = x; _q.y = y; _q.z = z; _q.inside = true; } else _q.inside = false; _q.top = c.y + c.r; return; }
    case 'cap': segSeg(x, y0, z, x, y1, z, c.ax, c.ay, c.az, c.bx, c.by, c.bz); { _q.top = _q.y + c.r;
      const dx = _p.x - _q.x, dy = _p.y - _q.y, dz = _p.z - _q.z, d = Math.hypot(dx, dy, dz) || 1e-6;
      if(d < c.r){ _q.inside = true; _q.cx = _q.x; _q.cy = _q.y; _q.cz = _q.z; _q.x = _p.x; _q.y = _p.y; _q.z = _p.z; }
      else { _q.inside = false; _q.x += dx / d * c.r; _q.y += dy / d * c.r; _q.z += dz / d * c.r; } return; }
    case 'box': {
      // golden-section search along the segment for the point nearest the box (distance is convex in t)
      let a = 0, b = 1; const g = 0.618034;
      const dist = t => { const y = y0 + (y1 - y0) * t; boxPoint(c, x, y, z); return (_q.x - x) ** 2 + (_q.y - y) ** 2 + (_q.z - z) ** 2; };
      let t1 = b - g * (b - a), t2 = a + g * (b - a), f1 = dist(t1), f2 = dist(t2);
      for(let i = 0; i < 14; i++){ if(f1 < f2){ b = t2; t2 = t1; f2 = f1; t1 = b - g * (b - a); f1 = dist(t1); } else { a = t1; t1 = t2; f1 = f2; t2 = a + g * (b - a); f2 = dist(t2); } }
      const t = (a + b) / 2, y = y0 + (y1 - y0) * t; _p.x = x; _p.y = y; _p.z = z; boxPoint(c, x, y, z);
      _q.inside = (_q.x - x) ** 2 + (_q.y - y) ** 2 + (_q.z - z) ** 2 < 1e-10; _q.top = c.bb[4]; return; }
  }
}

// ---- walking characters ----
// ch: {x, y, z (feet), vx, vy, vz, r, h, ground, gN (ground collider or null)}
export const GRAV = 22, STEP = 0.5;
export function moveChar(ch, dt){
  if(!isFinite(ch.vx + ch.vy + ch.vz)){ ch.vx = ch.vy = ch.vz = 0; }
  if(!isFinite(ch.x + ch.y + ch.z)){ ch.x = 0; ch.y = 5; ch.z = 0; }
  const n = Math.min(24, Math.max(1, Math.ceil(Math.hypot(ch.vx, ch.vy, ch.vz) * dt / (ch.r * 0.8))));
  const h = dt / n, wasGround = ch.ground;
  ch.ground = false; ch.gN = null; ch.ceil = false; ch.wall = false;
  for(let i = 0; i < n; i++){
    ch.x += ch.vx * h; ch.y += ch.vy * h; ch.z += ch.vz * h;
    resolve(ch);
  }
  // stick to the ground when walking down small slopes and steps
  if(!ch.ground && wasGround && ch.vy <= 0.5){
    const y = ch.y; ch.y -= 0.38; resolve(ch);
    if(!ch.ground) ch.y = y;
  }
  // the edge of the meadow: a soft wall of dense grass
  const B = W.bound;
  if(ch.x > B){ ch.x = B; ch.vx = Math.min(0, ch.vx); ch.wall = true; } else if(ch.x < -B){ ch.x = -B; ch.vx = Math.max(0, ch.vx); ch.wall = true; }
  if(ch.z > B){ ch.z = B; ch.vz = Math.min(0, ch.vz); ch.wall = true; } else if(ch.z < -B){ ch.z = -B; ch.vz = Math.max(0, ch.vz); ch.wall = true; }
}
function resolve(ch){
  const r = ch.r;
  for(let it = 0; it < 3; it++){
    let moved = false;
    const y0 = ch.y + r, y1 = ch.y + ch.h - r;
    each(ch.x - r, ch.y, ch.z - r, ch.x + r, ch.y + ch.h, ch.z + r, c => {
      if(c.t === 'cyl'){
        const dx = ch.x - c.x, dz = ch.z - c.z, d = Math.hypot(dx, dz);
        if(d >= c.r + r) return;
        if(ch.y >= c.y1 - STEP && (d < c.r + r * 0.6 || ch.vy <= 0.5)){
          // on top (or stepping up onto it)
          if(ch.y < c.y1){ ch.y = c.y1; moved = true; }
          if(ch.y <= c.y1 + 0.02){ ch.ground = true; ch.gN = c; if(ch.vy < 0) ch.vy = 0; }
          return;
        }
        if(ch.y + ch.h <= c.y0 + 0.02 || ch.y >= c.y1) return;
        if(ch.y + ch.h > c.y0 && ch.y + ch.h - 0.6 < c.y0 && d < c.r){ ch.y = c.y0 - ch.h; if(ch.vy > 0) ch.vy = 0; ch.ceil = true; moved = true; return; }
        const k = (c.r + r - d) / (d || 1e-6);
        ch.x += (d ? dx : 1) * k; ch.z += (d ? dz : 0) * k; ch.wall = true; moved = true;
        return;
      }
      closest(c, ch.x, y0, y1, ch.z);
      let nx = _p.x - _q.x, ny = _p.y - _q.y, nz = _p.z - _q.z, d = Math.hypot(nx, ny, nz);
      let pen;
      if(_q.inside){
        // centre line inside the shape: push out along the direction from the shape's centre
        const cx = c.t === 'cap' ? _q.cx : c.x, cy = c.t === 'cap' ? _q.cy : c.y, cz = c.t === 'cap' ? _q.cz : c.z;
        nx = _p.x - cx; ny = _p.y - cy; nz = _p.z - cz; d = Math.hypot(nx, ny, nz) || 1e-6;
        nx /= d; ny /= d; nz /= d; pen = r + (c.r || 0.3) * 0.5;
      } else {
        if(d >= r) return;
        if(d < 1e-6){ nx = 0; ny = 1; nz = 0; d = 1; } else { nx /= d; ny /= d; nz /= d; }
        pen = r - d;
      }
      if(ny <= 0.55 && !_q.inside && ch.vy <= 0.5 && _q.top - ch.y <= STEP && _q.y - ch.y < STEP){
        // a low thing in the way (twig, root, pebble): climb onto it rather than stopping
        const dh = Math.hypot(_q.x - ch.x, _q.z - ch.z), need = _q.y + Math.sqrt(Math.max(0, r * r - dh * dh)) - (ch.y + r);
        if(need > 0){ ch.y += Math.min(need, STEP); ch.ground = true; ch.gN = c; if(ch.vy < 0) ch.vy = 0; moved = true; return; }
      }
      if(ny > 0.55){
        // standing on it: lift straight up so slopes don't slide you sideways
        ch.y += pen / ny; ch.ground = true; ch.gN = c; if(ch.vy < 0) ch.vy = 0;
      } else {
        ch.x += nx * pen; ch.y += ny * pen; ch.z += nz * pen;
        if(ny < -0.55){ if(ch.vy > 0) ch.vy = 0; ch.ceil = true; } else {
          ch.wall = true;
          // a low ledge: hop up onto it instead of stopping dead
          const vn = ch.vx * nx + ch.vz * nz; if(vn < 0){ ch.vx -= vn * nx; ch.vz -= vn * nz; }
        }
      }
      moved = true;
    });
    const g = W.groundH(ch.x, ch.z);
    if(ch.y <= g){ ch.y = g; ch.ground = true; if(ch.vy < 0) ch.vy = 0; }
    if(!moved) break;
  }
}
// is a character of radius r and height h free at (x, y, z)?
export function freeAt(x, y, z, r, h){
  let free = true;
  each(x - r, y + 0.05, z - r, x + r, y + h, z + r, c => {
    if(c.t === 'cyl'){ if(Math.hypot(x - c.x, z - c.z) < c.r + r && y + h > c.y0 && y + 0.05 < c.y1){ free = false; return false; } return; }
    closest(c, x, y + r + 0.05, y + h - r, z);
    if(_q.inside || Math.hypot(_p.x - _q.x, _p.y - _q.y, _p.z - _q.z) < r){ free = false; return false; }
  });
  return free;
}

// ---- rays (bullets, sight, camera) ----
export const HIT = { t:0, x:0, y:0, z:0, nx:0, ny:1, nz:0, mat:'dirt', col:null };
function rayCyl(c, ox, oy, oz, dx, dy, dz, tmax){
  let best = Infinity, n = 0;
  // side
  const fx = ox - c.x, fz = oz - c.z, a = dx * dx + dz * dz;
  if(a > 1e-9){
    const b = fx * dx + fz * dz, cc = fx * fx + fz * fz - c.r * c.r, disc = b * b - a * cc;
    if(disc >= 0){ const t = (-b - Math.sqrt(disc)) / a; const y = oy + dy * t; if(t >= 0 && t < tmax && y >= c.y0 && y <= c.y1){ best = t; n = 1; } }
  }
  // caps
  if(Math.abs(dy) > 1e-9) for(const [yy, s] of [[c.y1, 2], [c.y0, 3]]){
    const t = (yy - oy) / dy; if(t < 0 || t >= best || t >= tmax) continue;
    const x = ox + dx * t - c.x, z = oz + dz * t - c.z; if(x * x + z * z <= c.r * c.r){ best = t; n = s; }
  }
  if(n === 0) return -1;
  const hx = ox + dx * best, hz = oz + dz * best;
  if(n === 1){ const l = Math.hypot(hx - c.x, hz - c.z) || 1; HIT.nx = (hx - c.x) / l; HIT.ny = 0; HIT.nz = (hz - c.z) / l; }
  else { HIT.nx = 0; HIT.ny = n === 2 ? 1 : -1; HIT.nz = 0; }
  return best;
}
function raySph(cx, cy, cz, r, ox, oy, oz, dx, dy, dz, tmax){
  const fx = ox - cx, fy = oy - cy, fz = oz - cz, b = fx * dx + fy * dy + fz * dz, c = fx * fx + fy * fy + fz * fz - r * r;
  if(c > 0 && b > 0) return -1;
  const disc = b * b - c; if(disc < 0) return -1;
  let t = -b - Math.sqrt(disc); if(t < 0) t = 0; if(t >= tmax) return -1;
  HIT.nx = (fx + dx * t) / r; HIT.ny = (fy + dy * t) / r; HIT.nz = (fz + dz * t) / r;
  return t;
}
// ray against a capsule: the nearest of the two end spheres and the cylinder between them
export function rayCap(ax, ay, az, bx, by, bz, r, ox, oy, oz, dx, dy, dz, tmax){
  const ex = bx - ax, ey = by - ay, ez = bz - az, L2 = ex * ex + ey * ey + ez * ez;
  let best = -1, bnx = 0, bny = 0, bnz = 0;
  const take = t => { if(t >= 0 && (best < 0 || t < best)){ best = t; bnx = HIT.nx; bny = HIT.ny; bnz = HIT.nz; } };
  if(L2 > 1e-9){
    const L = Math.sqrt(L2), ux = ex / L, uy = ey / L, uz = ez / L;
    const fx = ox - ax, fy = oy - ay, fz = oz - az;
    const dd = dx * ux + dy * uy + dz * uz, fd = fx * ux + fy * uy + fz * uz;
    const px = dx - ux * dd, py = dy - uy * dd, pz = dz - uz * dd, qx = fx - ux * fd, qy = fy - uy * fd, qz = fz - uz * fd;
    const a = px * px + py * py + pz * pz, b = px * qx + py * qy + pz * qz, c = qx * qx + qy * qy + qz * qz - r * r;
    if(a > 1e-9){
      const disc = b * b - a * c;
      if(disc >= 0){
        const t = (-b - Math.sqrt(disc)) / a, s = fd + dd * t;
        if(t >= 0 && t < tmax && s >= 0 && s <= L){
          const hx = fx + dx * t - ux * s, hy = fy + dy * t - uy * s, hz = fz + dz * t - uz * s;
          HIT.nx = hx / r; HIT.ny = hy / r; HIT.nz = hz / r; take(t);
        }
      }
    }
  }
  take(raySph(ax, ay, az, r, ox, oy, oz, dx, dy, dz, tmax));
  take(raySph(bx, by, bz, r, ox, oy, oz, dx, dy, dz, tmax));
  if(best >= 0){ HIT.nx = bnx; HIT.ny = bny; HIT.nz = bnz; }
  return best;
}
function rayBox(c, ox, oy, oz, dx, dy, dz, tmax){
  const m = c.m, fx = ox - c.x, fy = oy - c.y, fz = oz - c.z;
  const lo = [fx * m[0] + fy * m[1] + fz * m[2], fx * m[3] + fy * m[4] + fz * m[5], fx * m[6] + fy * m[7] + fz * m[8]];
  const ld = [dx * m[0] + dy * m[1] + dz * m[2], dx * m[3] + dy * m[4] + dz * m[5], dx * m[6] + dy * m[7] + dz * m[8]];
  const he = [c.hx, c.hy, c.hz];
  let t0 = 0, t1 = tmax, ax = -1, sg = 1;
  for(let i = 0; i < 3; i++){
    if(Math.abs(ld[i]) < 1e-9){ if(Math.abs(lo[i]) > he[i]) return -1; continue; }
    let ta = (-he[i] - lo[i]) / ld[i], tb = (he[i] - lo[i]) / ld[i], s = -1;
    if(ta > tb){ const q = ta; ta = tb; tb = q; s = 1; }
    if(ta > t0){ t0 = ta; ax = i; sg = s; }
    if(tb < t1) t1 = tb;
    if(t0 > t1) return -1;
  }
  if(ax < 0) ax = 1;
  const k = ax * 3; HIT.nx = m[k] * sg; HIT.ny = m[k + 1] * sg; HIT.nz = m[k + 2] * sg;
  return t0;
}
// nearest world hit of the ray (unit direction) within tmax; null if none. Fills HIT.
// skip(c) can ignore colliders (e.g. thin grass for sight lines).
export function ray(ox, oy, oz, dx, dy, dz, tmax, skip){
  let best = tmax, col = null, nx = 0, ny = 1, nz = 0, mat = null;
  // colliders: walk the grid cells the ray passes through (Amanatides-Woo), nearest first
  const s = ++W.stamp, C = W.cell;
  let gx = Math.floor((ox + W.half) / C), gz = Math.floor((oz + W.half) / C);
  const stx = dx > 0 ? 1 : -1, stz = dz > 0 ? 1 : -1;
  const tdx = Math.abs(dx) > 1e-9 ? C / Math.abs(dx) : Infinity, tdz = Math.abs(dz) > 1e-9 ? C / Math.abs(dz) : Infinity;
  let tmx = Math.abs(dx) > 1e-9 ? ((gx + (dx > 0 ? 1 : 0)) * C - W.half - ox) / dx : Infinity;
  let tmz = Math.abs(dz) > 1e-9 ? ((gz + (dz > 0 ? 1 : 0)) * C - W.half - oz) / dz : Infinity;
  let tEnter = 0;
  for(let guard = 0; guard < 400 && tEnter <= best; guard++){
    if(gx >= 0 && gz >= 0 && gx < W.n && gz < W.n){
      for(const c of W.grid[gx * W.n + gz]){
        if(c.s === s) continue; c.s = s;
        if(skip && skip(c)) continue;
        let th;
        switch(c.t){
          case 'cyl': th = rayCyl(c, ox, oy, oz, dx, dy, dz, best); break;
          case 'sph': th = raySph(c.x, c.y, c.z, c.r, ox, oy, oz, dx, dy, dz, best); break;
          case 'cap': th = rayCap(c.ax, c.ay, c.az, c.bx, c.by, c.bz, c.r, ox, oy, oz, dx, dy, dz, best); break;
          case 'box': th = rayBox(c, ox, oy, oz, dx, dy, dz, best); break;
        }
        if(th >= 0 && th < best){ best = th; col = c; nx = HIT.nx; ny = HIT.ny; nz = HIT.nz; mat = c.mat; }
      }
    } else if((gx < 0 && stx < 0) || (gz < 0 && stz < 0) || (gx >= W.n && stx > 0) || (gz >= W.n && stz > 0)) break;
    if(tmx < tmz){ tEnter = tmx; tmx += tdx; gx += stx; } else { tEnter = tmz; tmz += tdz; gz += stz; }
  }
  // terrain: march, then bisect
  const tg = rayGround(ox, oy, oz, dx, dy, dz, best);
  if(tg >= 0 && tg < best){ best = tg; col = null; mat = 'ground'; nx = HIT.nx; ny = HIT.ny; nz = HIT.nz; }
  // water surface
  if(dy < -1e-4){
    const lvl = W.waterLevel;
    if(lvl !== undefined && oy > lvl){
      const t = (lvl - oy) / dy;
      if(t < best && W.waterAt(ox + dx * t, oz + dz * t) > -1e8){ best = t; col = null; mat = 'water'; nx = 0; ny = 1; nz = 0; }
    }
  }
  if(mat === null) return null;
  HIT.t = best; HIT.x = ox + dx * best; HIT.y = oy + dy * best; HIT.z = oz + dz * best;
  HIT.nx = nx; HIT.ny = ny; HIT.nz = nz; HIT.mat = mat === 'ground' ? W.groundMat(HIT.x, HIT.z) : mat; HIT.col = col;
  return HIT;
}
W.groundMat = () => 'dirt';
function rayGround(ox, oy, oz, dx, dy, dz, tmax){
  let t = 0, prev = oy - W.groundH(ox, oz);
  if(prev < 0) return -1;
  const st = 0.6;
  while(t < tmax){
    const nt = Math.min(tmax, t + st * (1 + t * 0.02));
    const y = oy + dy * nt, g = W.groundH(ox + dx * nt, oz + dz * nt), h = y - g;
    if(h < 0){
      let a = t, b = nt;
      for(let i = 0; i < 10; i++){ const m = (a + b) / 2; if(oy + dy * m - W.groundH(ox + dx * m, oz + dz * m) < 0) b = m; else a = m; }
      const x = ox + dx * b, z = oz + dz * b, e = 0.15;
      const gx = W.groundH(x + e, z) - W.groundH(x - e, z), gz = W.groundH(x, z + e) - W.groundH(x, z - e);
      const l = Math.hypot(gx, 2 * e, gz); HIT.nx = -gx / l; HIT.ny = 2 * e / l; HIT.nz = -gz / l;
      return b;
    }
    if(nt >= tmax) break;
    t = nt;
  }
  return -1;
}
// can a see b? solid things block; dense tall grass blocks once the sight line has gone through enough of it
// (looking from inside a thicket outwards works: the first couple of steps don't count much)
export function losClear(ax, ay, az, bx, by, bz){
  const dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.hypot(dx, dy, dz);
  if(L < 1e-3) return true;
  if(grassCover(ax, ay, az, bx, by, bz) > 2.2) return false;
  return !ray(ax, ay, az, dx / L, dy / L, dz / L, L - 0.3, c => c.see);
}
// how much dense grass (density × length) a sight line passes through, below the grass tops
export function grassCover(ax, ay, az, bx, by, bz){
  const dx = bx - ax, dy = by - ay, dz = bz - az, L = Math.hypot(dx, dy, dz);
  const n = Math.min(160, Math.ceil(L / 0.7)), st = L / n;
  let acc = 0;
  for(let i = 1; i < n; i++){
    const t = i / n, x = ax + dx * t, y = ay + dy * t, z = az + dz * t;
    const g = W.grassAt(x, z, GR); if(g <= 0) continue;
    if(y - W.groundH(x, z) < GR.h) acc += g * st;
    if(acc > 3) break;
  }
  return acc;
}
const GR = { h:0 };   // grassAt writes the grass height here
