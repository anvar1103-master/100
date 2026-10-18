// Baked light: how brightly the steady lamps light every spot of the floor (4 samples per metre), with soft shadows
// from walls and pillars (two rays per lamp to the ends of its panel), a broad bounce term and darkening near walls.
// The renderer uses it as a light map for floor, walls and ceiling; the bots use it to see (a fighter in the dark is
// spotted later). Flickering lamps are left out of the bake: they are drawn live. Pure module (node-friendly).
import { CELL, FLOOR, DESK } from './gen.js';

export const LIGHT_RES = 4;                       // samples per metre
export const WARM = [1.0, 0.9, 0.72], RED = [1.0, 0.16, 0.1];

export function bakeLight(L){
  const n = Math.round(L.W * CELL * LIGHT_RES), data = new Float32Array(n * n * 3), seen = new Uint8Array(n * n);
  const W = L.W, g = L.g, size = L.W * CELL;
  const solid = (x, z) => { const i = Math.floor((x + L.ox) / CELL), k = Math.floor((z + L.oz) / CELL); if(i < 0 || k < 0 || i >= W || k >= L.H) return true; const c = g[k * W + i]; return c !== FLOOR && c !== DESK; };
  // 2D line of sight through the cell grid (Amanatides-Woo walk)
  const los = (ax, az, bx, bz) => {
    let i = Math.floor((ax + L.ox) / CELL), k = Math.floor((az + L.oz) / CELL);
    const ti = Math.floor((bx + L.ox) / CELL), tk = Math.floor((bz + L.oz) / CELL);
    const dx = bx - ax, dz = bz - az, si = dx > 0 ? 1 : -1, sk = dz > 0 ? 1 : -1;
    const tdx = Math.abs(CELL / (dx || 1e-9)), tdz = Math.abs(CELL / (dz || 1e-9));
    let tx = ((si > 0 ? (i + 1) * CELL - (ax + L.ox) : (ax + L.ox) - i * CELL)) / Math.abs(dx || 1e-9);
    let tz = ((sk > 0 ? (k + 1) * CELL - (az + L.oz) : (az + L.oz) - k * CELL)) / Math.abs(dz || 1e-9);
    for(let s = 0; s < 80; s++){
      if(i === ti && k === tk) return true;
      if(tx < tz){ i += si; tx += tdx; } else { k += sk; tz += tdz; }
      if(i === ti && k === tk) return true;
      if(i < 0 || k < 0 || i >= W || k >= L.H) return false;
      const c = g[k * W + i]; if(c !== FLOOR && c !== DESK) return false;
    }
    return true;
  };
  const R = 8.5, R2 = R * R;
  for(const l of L.lamps){
    if(l.state !== 'on') continue;
    const col = l.red ? RED : WARM, h = l.y, h2 = h * h, k0 = h2 * h2;   // centre of the floor under it = 1
    const p0 = Math.max(0, Math.floor((l.x - R + size / 2) * LIGHT_RES)), p1 = Math.min(n - 1, Math.ceil((l.x + R + size / 2) * LIGHT_RES));
    const q0 = Math.max(0, Math.floor((l.z - R + size / 2) * LIGHT_RES)), q1 = Math.min(n - 1, Math.ceil((l.z + R + size / 2) * LIGHT_RES));
    for(let q = q0; q <= q1; q++) for(let p = p0; p <= p1; p++){
      const x = (p + 0.5) / LIGHT_RES - size / 2, z = (q + 0.5) / LIGHT_RES - size / 2;
      const dx = x - l.x, dz = z - l.z, d2 = dx * dx + dz * dz; if(d2 > R2) continue;
      if(solid(x, z)) continue;
      // soft shadow: the two ends of the 1.2 m panel
      const v = (los(l.x, l.z - 0.45, x, z) ? 0.5 : 0) + (los(l.x, l.z + 0.45, x, z) ? 0.5 : 0);
      if(!v) continue;
      const r2 = d2 + h2, direct = k0 / (r2 * r2), bounce = 0.32 / (1 + d2 / 18);
      const e = (direct + bounce) * v * (1 - d2 / R2);
      const o = (q * n + p) * 3; data[o] += e * col[0]; data[o + 1] += e * col[1]; data[o + 2] += e * col[2];
    }
  }
  // near walls the light dims a little (corners darker), dark floors keep a faint glow; solid samples copy their neighbours
  for(let q = 0; q < n; q++) for(let p = 0; p < n; p++){
    const x = (p + 0.5) / LIGHT_RES - size / 2, z = (q + 0.5) / LIGHT_RES - size / 2;
    const i = Math.floor((x + L.ox) / CELL), k = Math.floor((z + L.oz) / CELL), s = k * W + i, o = (q * n + p) * 3;
    if(g[s] !== FLOOR && g[s] !== DESK) continue;
    seen[q * n + p] = 1;
    const ao = 0.72 + 0.28 * Math.min(1, (L.dist[s] - 0.5) / 3);
    for(let c = 0; c < 3; c++) data[o + c] = data[o + c] * ao + 0.012 * WARM[c];
  }
  for(let it = 0; it < 3; it++){
    const add = [];
    for(let q = 1; q < n - 1; q++) for(let p = 1; p < n - 1; p++){
      if(seen[q * n + p]) continue;
      let r = 0, gg = 0, b = 0, m = 0;
      for(const [a, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const j = (q + c) * n + p + a; if(seen[j]){ r += data[j * 3]; gg += data[j * 3 + 1]; b += data[j * 3 + 2]; m++; } }
      if(m) add.push([q * n + p, r / m, gg / m, b / m]);
    }
    for(const [j, r, gg, b] of add){ data[j * 3] = r; data[j * 3 + 1] = gg; data[j * 3 + 2] = b; seen[j] = 1; }
  }
  L.light = { n, res:LIGHT_RES, data };
  return L.light;
}

// how lit a spot is (0 = pitch dark, ~1 = right under a lamp), for the bots' eyes
export function lightAt(L, x, z){
  const B = L.light; if(!B) return 1;
  const size = L.W * CELL, p = Math.floor((x + size / 2) * B.res), q = Math.floor((z + size / 2) * B.res);
  if(p < 0 || q < 0 || p >= B.n || q >= B.n) return 0;
  const o = (q * B.n + p) * 3; return (B.data[o] + B.data[o + 1] + B.data[o + 2]) / 2.6;
}

// the baked light colour at a spot (raw, before the material's light-map scale) — characters take it as ambient
export function lightRGB(L, x, z, out){
  const B = L.light; out[0] = out[1] = out[2] = 0; if(!B) return out;
  const size = L.W * CELL, p = Math.floor((x + size / 2) * B.res), q = Math.floor((z + size / 2) * B.res);
  if(p < 0 || q < 0 || p >= B.n || q >= B.n) return out;
  const o = (q * B.n + p) * 3; out[0] = B.data[o]; out[1] = B.data[o + 1]; out[2] = B.data[o + 2]; return out;
}
