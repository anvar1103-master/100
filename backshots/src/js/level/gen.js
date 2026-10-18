// The floor plan of the Backrooms from a seed. A grid of half-metre cells: the whole floor is cut by walls into
// zones (binary splits), the split walls get doorways, and every zone is furnished by its kind — an office hall with
// loose wall pieces, a maze of short walls, a tall hall of pillars, a cluster of small rooms, an empty hall, a corridor.
// A few zones become landmarks (the pillar hall, a flooded hall, red emergency light, the EXIT dead end, an office
// with desks, a dark hall). check.js then makes everything reachable and places lamps, spawns and loot.
// Pure module: runs in node for the balance runs and tests.
import { mulberry } from '../util.js';

export const CELL = 0.5;                 // metres per cell
export const FLOOR = 0, WALL = 1, PILLAR = 2, DESK = 3;
export const CEIL = 2.8, CEIL_HIGH = 3.7, CEIL_LOW = 2.35, DESK_H = 0.76;
export const LANDMARKS = {
  pillars:{ name:'Зал колонн' }, flood:{ name:'Затопленный зал' }, red:{ name:'Красный свет' },
  exit:{ name:'Выход' }, office:{ name:'Офис' }, dark:{ name:'Тёмный зал' },
};

export function generate(seed, o = {}){
  const rnd = mulberry(seed >>> 0), ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const W = o.size || 220, H = W;
  const g = new Uint8Array(W * H), clear = new Uint8Array(W * H);
  const at = (i, k) => k * W + i;
  const inside = (i, k) => i >= 0 && k >= 0 && i < W && k < H;
  const set = (i, k, v) => { if(inside(i, k)) g[at(i, k)] = v; };
  // outer walls
  for(let i = 0; i < W; i++){ set(i, 0, WALL); set(i, H - 1, WALL); set(0, i, WALL); set(W - 1, i, WALL); }

  // ---- 1) binary splits: wall lines between zones ----
  const leaves = [], splits = [];
  const MIN = 12, MAX = 58;
  (function split(r, depth){
    const w = r.x1 - r.x0 + 1, h = r.y1 - r.y0 + 1;
    const canX = w >= MIN * 2 + 1, canY = h >= MIN * 2 + 1;
    if((!canX && !canY) || (w <= MAX && h <= MAX && depth > 1 && rnd() < 0.3)){ leaves.push(r); return; }
    const alongX = canX && (!canY || w > h * 1.25 || (h <= w * 1.25 && rnd() < 0.5));
    if(alongX){
      const s = r.x0 + MIN + Math.floor(rnd() * (w - MIN * 2));
      for(let k = r.y0; k <= r.y1; k++) set(s, k, WALL);
      splits.push({ ax:'x', s, a:r.y0, b:r.y1 });
      split({ x0:r.x0, y0:r.y0, x1:s - 1, y1:r.y1 }, depth + 1); split({ x0:s + 1, y0:r.y0, x1:r.x1, y1:r.y1 }, depth + 1);
    } else {
      const s = r.y0 + MIN + Math.floor(rnd() * (h - MIN * 2));
      for(let i = r.x0; i <= r.x1; i++) set(i, s, WALL);
      splits.push({ ax:'y', s, a:r.x0, b:r.x1 });
      split({ x0:r.x0, y0:r.y0, x1:r.x1, y1:s - 1 }, depth + 1); split({ x0:r.x0, y0:s + 1, x1:r.x1, y1:r.y1 }, depth + 1);
    }
  })({ x0:1, y0:1, x1:W - 2, y1:H - 2 }, 0);

  // ---- 2) doorways in the split walls (some walls mostly open: the floor flows from zone to zone) ----
  const door = (sp, p, wdt) => {
    for(let d = 0; d < wdt; d++){
      const q = p + d; if(q <= sp.a + 1 || q >= sp.b - 1) continue;
      const [i, k] = sp.ax === 'x' ? [sp.s, q] : [q, sp.s];
      // never open where another wall line meets this one (keeps the corners solid)
      const [pi, pk] = sp.ax === 'x' ? [1, 0] : [0, 1];
      if(g[at(i + pk, k + pi)] === WALL && g[at(i - pk, k - pi)] === WALL) continue;
      g[at(i, k)] = FLOOR;
      for(let e = -2; e <= 2; e++) for(let f = -2; f <= 2; f++) if(inside(i + e, k + f)) clear[at(i + e, k + f)] = 1;
    }
  };
  for(const sp of splits){
    const len = sp.b - sp.a + 1;
    if(rnd() < 0.14 && len > 16){ const w = Math.floor(len * (0.45 + rnd() * 0.3)); door(sp, sp.a + 2 + Math.floor(rnd() * (len - w - 4)), w); continue; }
    const n = 1 + Math.floor(len / 26) + (rnd() < 0.45 ? 1 : 0);
    for(let d = 0; d < n; d++){ const w = rnd() < 0.2 ? ri(6, 9) : ri(3, 5); door(sp, sp.a + 2 + Math.floor(rnd() * Math.max(1, len - w - 4)), w); }
  }

  // ---- 3) zone kinds ----
  const zones = leaves.map((r, id) => {
    const w = r.x1 - r.x0 + 1, h = r.y1 - r.y0 + 1, area = w * h;
    let kind;
    if(Math.min(w, h) <= 10) kind = 'corridor';
    else { const x = rnd(); kind = x < 0.32 ? 'office' : x < 0.52 ? 'maze' : x < 0.66 ? 'pillars' : x < 0.86 ? 'rooms' : 'open'; }
    return { id, ...r, w, h, area, kind, ceil:CEIL, dark:false, wet:0, red:false, landmark:null };
  });
  // landmarks: the biggest roomy zone gets the pillars, others are drawn by size
  const byArea = zones.slice().sort((a, b) => b.area - a.area);
  const take = (pred, kind, lm) => { const z = byArea.find(z => !z.landmark && pred(z)); if(z){ z.landmark = lm; if(kind) z.kind = kind; } return z; };
  take(z => Math.min(z.w, z.h) >= 20, 'pillars', 'pillars');
  take(z => Math.min(z.w, z.h) >= 16 && z.area < 1400, 'open', 'flood');
  take(z => Math.min(z.w, z.h) >= 16, 'office', 'office');
  take(z => Math.min(z.w, z.h) >= 14 && z.kind !== 'corridor', null, 'red');
  take(z => Math.min(z.w, z.h) >= 14 && z.kind !== 'corridor', null, 'dark');
  // EXIT: a smaller zone (a dead end feel)
  { const small = zones.filter(z => !z.landmark && z.kind !== 'corridor' && z.area < 700).sort(() => rnd() - 0.5)[0] || zones.find(z => !z.landmark); if(small) small.landmark = 'exit'; }
  for(const z of zones){
    if(z.kind === 'pillars') z.ceil = CEIL_HIGH;
    if(z.landmark === 'flood') z.wet = 1;
    if(z.landmark === 'red') z.red = true;
    if(z.landmark === 'dark') z.dark = true;
    if(!z.landmark && z.kind !== 'pillars' && z.area < 500 && rnd() < 0.25) z.ceil = CEIL_LOW;
    if(!z.landmark && rnd() < 0.05) z.dark = true;
  }

  // ---- 4) furnishing ----
  const free = (i, k) => inside(i, k) && g[at(i, k)] === FLOOR && !clear[at(i, k)];
  const desks = [];
  // a straight wall piece on the 4-cell lattice of the zone (keeps every gap at least 1.5 m)
  const piece = (z, horiz, i, k, len) => {
    for(let d = 0; d < len; d++){ const a = horiz ? i + d : i, b = horiz ? k : k + d; if(a <= z.x0 || b <= z.y0 || a >= z.x1 || b >= z.y1) break; if(free(a, b)) g[at(a, b)] = WALL; }
  };
  const lat = (lo, hi) => lo + 4 * Math.floor(rnd() * Math.max(1, Math.floor((hi - lo) / 4) + 1));
  for(const z of zones){
    const { x0, y0, x1, y1 } = z;
    if(z.kind === 'office' || z.kind === 'maze'){
      const n = Math.round(z.area / (z.kind === 'maze' ? 55 : 150));
      for(let j = 0; j < n; j++){
        const horiz = rnd() < 0.5, len = z.kind === 'maze' ? ri(4, 11) : ri(4, 15);
        const i = lat(x0 + 4, x1 - 4), k = lat(y0 + 4, y1 - 4);
        piece(z, horiz, i, k, len);
        if(rnd() < 0.3) piece(z, !horiz, horiz ? i + (rnd() < 0.5 ? 0 : len - 1) : i, horiz ? k : k + (rnd() < 0.5 ? 0 : len - 1), ri(3, 8));
      }
    } else if(z.kind === 'pillars'){
      const ox = x0 + 3 + ((z.w - 6) % 8 >> 1), oy = y0 + 3 + ((z.h - 6) % 8 >> 1);
      for(let i = ox; i < x1 - 2; i += 8) for(let k = oy; k < y1 - 2; k += 8)
        for(let a = 0; a < 2; a++) for(let b = 0; b < 2; b++) if(free(i + a, k + b)) g[at(i + a, k + b)] = PILLAR;
    } else if(z.kind === 'rooms'){
      // small rooms: inner splits with one or two doors each
      (function rooms(r, depth){
        const w = r.x1 - r.x0 + 1, h = r.y1 - r.y0 + 1;
        if((w < 17 && h < 17) || depth > 4){ return; }
        const alongX = w >= 17 && (h < 17 || w >= h);
        const s = alongX ? r.x0 + ri(8, w - 9) : r.y0 + ri(8, h - 9);
        const len = alongX ? h : w, a0 = alongX ? r.y0 : r.x0;
        for(let d = 0; d < len; d++){ const [i, k] = alongX ? [s, a0 + d] : [a0 + d, s]; if(free(i, k)) g[at(i, k)] = WALL; }
        const doors = rnd() < 0.35 ? 2 : 1;
        for(let n = 0; n < doors; n++){ const p = a0 + ri(2, Math.max(2, len - 6)); for(let d = 0; d < 3; d++){ const [i, k] = alongX ? [s, p + d] : [p + d, s]; if(inside(i, k) && g[at(i, k)] === WALL) g[at(i, k)] = FLOOR; } }
        if(alongX){ rooms({ x0:r.x0, y0:r.y0, x1:s - 1, y1:r.y1 }, depth + 1); rooms({ x0:s + 1, y0:r.y0, x1:r.x1, y1:r.y1 }, depth + 1); }
        else { rooms({ x0:r.x0, y0:r.y0, x1:r.x1, y1:s - 1 }, depth + 1); rooms({ x0:r.x0, y0:s + 1, x1:r.x1, y1:r.y1 }, depth + 1); }
      })(z, 0);
    } else if(z.kind === 'open'){
      const n = z.landmark === 'flood' ? 0 : ri(1, 3);
      for(let j = 0; j < n; j++) piece(z, rnd() < 0.5, lat(x0 + 4, x1 - 4), lat(y0 + 4, y1 - 4), ri(3, 6));
    }
    // the office: rows of desks (3×2 cells each, 1.5 m × 1 m), chairs placed by check.js
    if(z.landmark === 'office'){
      for(let k = y0 + 4; k + 2 < y1 - 3; k += 6) for(let i = x0 + 4; i + 3 < x1 - 3; i += 6){
        let ok = true; for(let a = -1; a < 4; a++) for(let b = -1; b < 3; b++) if(!free(i + a, k + b)) ok = false;
        if(!ok || rnd() < 0.15) continue;
        for(let a = 0; a < 3; a++) for(let b = 0; b < 2; b++) g[at(i + a, k + b)] = DESK;
        desks.push({ i, k, w:3, h:2 });
      }
    }
  }
  return { seed:seed >>> 0, W, H, g, zones, leaves, splits, desks, rnd };
}
