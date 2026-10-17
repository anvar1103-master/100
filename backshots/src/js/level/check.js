// Finishing the floor plan: no slits too narrow to pass, every floor cell reachable (lost pockets get a doorway or
// are walled up), the zone and ceiling height of every cell, the lamps (on / flickering / dead; dark zones), spawn
// points spread far apart, loot spots in dead ends, props (desks, chairs, bins, signs, wall fittings), landmarks.
// Same idea as the reachability check in Brawl Green's maze (mushroom-brawl/src/js/maps.js), written for this grid.
import { generate, CELL, FLOOR, WALL, PILLAR, DESK, LANDMARKS } from './gen.js';

export function buildLevel(seed, o = {}){
  const L = generate(seed, o), { W, H, g, rnd } = L;
  const at = (i, k) => k * W + i;
  const solid = c => c !== FLOOR;
  L.ox = W * CELL / 2; L.oz = H * CELL / 2;
  L.wx = i => (i + 0.5) * CELL - L.ox; L.wz = k => (k + 0.5) * CELL - L.oz;
  L.ci = x => Math.floor((x + L.ox) / CELL); L.ck = z => Math.floor((z + L.oz) / CELL);

  // ---- slits: a floor cell squeezed between two solid cells is filled (a fighter is wider than one cell) ----
  const fillSlits = () => {
    let total = 0;
    for(let pass = 0; pass < 4; pass++){
      let n = 0;
      for(let k = 1; k < H - 1; k++) for(let i = 1; i < W - 1; i++){
        if(g[at(i, k)] !== FLOOR) continue;
        if((solid(g[at(i - 1, k)]) && solid(g[at(i + 1, k)])) || (solid(g[at(i, k - 1)]) && solid(g[at(i, k + 1)]))){ g[at(i, k)] = WALL; n++; }
      }
      total += n; if(!n) break;
    }
    return total;
  };
  fillSlits();

  // ---- reachability ----
  const comp = new Int32Array(W * H);
  const label = () => {
    comp.fill(-1); const sizes = [];
    for(let s = 0; s < W * H; s++){
      if(g[s] !== FLOOR || comp[s] >= 0) continue;
      const id = sizes.length, st = [s]; comp[s] = id; let n = 0;
      while(st.length){ const c = st.pop(); n++; const i = c % W, k = (c - i) / W;
        for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a, nk = k + b; if(ni < 0 || nk < 0 || ni >= W || nk >= H) continue; const d = at(ni, nk); if(g[d] === FLOOR && comp[d] < 0){ comp[d] = id; st.push(d); } } }
      sizes.push(n);
    }
    return sizes;
  };
  for(let guard = 0; guard < 400; guard++){
    const sizes = label(); if(sizes.length <= 1) break;
    const main = sizes.indexOf(Math.max(...sizes));
    // the first lost pocket: tiny ones are walled up, others get a doorway through the thinnest wall to the rest
    let lost = -1; for(let c = 0; c < sizes.length; c++) if(c !== main){ lost = c; break; }
    if(sizes[lost] < 30){ for(let s = 0; s < W * H; s++) if(comp[s] === lost) g[s] = WALL; continue; }
    let opened = false;
    for(let thick = 1; thick <= 3 && !opened; thick++){
      for(let s = 0; s < W * H && !opened; s++){
        if(comp[s] !== lost) continue;
        const i = s % W, k = (s - i) / W;
        for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
          const ti = i + a * (thick + 1), tk = k + b * (thick + 1);
          if(ti < 1 || tk < 1 || ti >= W - 1 || tk >= H - 1 || g[at(ti, tk)] !== FLOOR || comp[at(ti, tk)] === lost) continue;
          let wall = true; for(let t = 1; t <= thick; t++) if(g[at(i + a * t, k + b * t)] === FLOOR) wall = false;
          if(!wall) continue;
          // a doorway three cells wide across the wall
          for(let t = 1; t <= thick; t++) for(let w = -1; w <= 1; w++){
            const ci = i + a * t + (b ? w : 0), ck = k + b * t + (a ? w : 0);
            if(ci > 0 && ck > 0 && ci < W - 1 && ck < H - 1 && g[at(ci, ck)] !== DESK) g[at(ci, ck)] = FLOOR;
          }
          opened = true; break;
        }
      }
    }
    if(!opened) for(let s = 0; s < W * H; s++) if(comp[s] === lost) g[s] = WALL;
    // a new doorway can leave a slit beside it: fill and check again
    if(guard % 4 === 3) fillSlits();
  }
  if(fillSlits()) for(let guard = 0; guard < 200; guard++){ const sizes = label(); if(sizes.length <= 1) break; const main = sizes.indexOf(Math.max(...sizes)); for(let s = 0; s < W * H; s++) if(comp[s] >= 0 && comp[s] !== main && sizes[comp[s]] < 400) g[s] = WALL; if(label().length > 1) break; }
  label();

  // ---- zone and ceiling height per cell (doorways take the lower of the two sides) ----
  const zone = L.zone = new Int16Array(W * H).fill(-1);
  for(const z of L.zones) for(let k = z.y0; k <= z.y1; k++) for(let i = z.x0; i <= z.x1; i++) zone[at(i, k)] = z.id;
  const ceil = L.ceil = new Float32Array(W * H);
  for(let s = 0; s < W * H; s++){
    if(zone[s] >= 0){ ceil[s] = L.zones[zone[s]].ceil; continue; }
    const i = s % W, k = (s - i) / W; let h = 9;
    for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a, nk = k + b; if(ni < 0 || nk < 0 || ni >= W || nk >= H) continue; const z = zone[at(ni, nk)]; if(z >= 0) h = Math.min(h, L.zones[z].ceil); }
    ceil[s] = h < 9 ? h : 2.8;
    // a doorway cell belongs to a neighbouring zone (for lights, wetness)
    if(g[s] === FLOOR) for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const z = zone[at(Math.min(W - 1, Math.max(0, i + a)), Math.min(H - 1, Math.max(0, k + b)))]; if(z >= 0){ zone[s] = z; break; } }
  }
  // distance (in cells) from every floor cell to the nearest solid one, capped: clearance for spawns, nav, props
  const dist = L.dist = new Uint8Array(W * H).fill(255);
  { const q = []; for(let s = 0; s < W * H; s++) if(g[s] !== FLOOR){ dist[s] = 0; q.push(s); }
    for(let h = 0; h < q.length; h++){ const c = q[h], i = c % W, k = (c - i) / W, d = dist[c];
      if(d >= 12) continue;
      for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a, nk = k + b; if(ni < 0 || nk < 0 || ni >= W || nk >= H) continue; const e = at(ni, nk); if(dist[e] > d + 1){ dist[e] = d + 1; q.push(e); } } } }

  // ---- lamps: a ceiling grid every 4 m inside each zone ----
  L.lamps = [];
  for(const z of L.zones){
    const step = 8, offx = z.x0 + ((z.w % step) >> 1) + 3, offy = z.y0 + ((z.h % step) >> 1) + 3;
    const thin = z.kind === 'corridor';
    const xs = [], ys = [];
    if(thin && z.w < z.h){ xs.push(z.x0 + (z.w >> 1)); for(let k = offy; k < z.y1; k += step) ys.push(k); }
    else if(thin){ ys.push(z.y0 + (z.h >> 1)); for(let i = offx; i < z.x1; i += step) xs.push(i); }
    else { for(let i = offx; i < z.x1; i += step) xs.push(i); for(let k = offy; k < z.y1; k += step) ys.push(k); }
    for(const i0 of xs) for(const k0 of ys){
      // the grid spot or the nearest free one close to it (a lamp never hangs over a wall)
      let i = -1, k = -1;
      for(let r = 0; r <= 2 && i < 0; r++) for(let a = -r; a <= r && i < 0; a++) for(let b = -r; b <= r; b++){
        const ci = i0 + a, ck = k0 + b; if(ci < 1 || ck < 1 || ci >= W - 2 || ck >= H - 2) continue;
        if(g[at(ci, ck)] === FLOOR && g[at(ci, ck + 1)] === FLOOR && dist[at(ci, ck)] >= 1 && dist[at(ci, ck + 1)] >= 1){ i = ci; k = ck; break; }
      }
      if(i < 0) continue;
      let state = 'on';
      const r = rnd();
      if(z.dark) state = r < 0.12 ? 'flicker' : 'off';
      else if(r < 0.07) state = 'flicker'; else if(r < 0.16) state = 'off';
      L.lamps.push({ x:L.wx(i) + CELL / 2, z:L.wz(k) + CELL / 2, y:z.ceil, i, k, zone:z.id, state, red:z.red, ph:rnd() * 100 });
    }
  }
  // patches of dead lamps across zone borders (dark corners to hide in)
  for(let n = 0; n < 4; n++){ const c = L.lamps[Math.floor(rnd() * L.lamps.length)]; if(!c) break; for(const l of L.lamps) if(Math.hypot(l.x - c.x, l.z - c.z) < 5 && rnd() < 0.7) l.state = rnd() < 0.15 ? 'flicker' : 'off'; }

  // ---- wetness (0..1) per cell: the flooded hall, plus puddles here and there ----
  const wet = L.wet = new Uint8Array(W * H);
  for(let s = 0; s < W * H; s++){ const z = zone[s]; if(z >= 0 && L.zones[z].wet) wet[s] = 255; }
  for(let n = 0; n < 26; n++){
    const ci = 4 + Math.floor(rnd() * (W - 8)), ck = 4 + Math.floor(rnd() * (H - 8)), r = 2 + rnd() * 5;
    for(let k = Math.floor(ck - r); k <= ck + r; k++) for(let i = Math.floor(ci - r); i <= ci + r; i++){
      if(i < 0 || k < 0 || i >= W || k >= H) continue; const d = Math.hypot(i - ci, (k - ck) * 1.3) / r; if(d < 1) wet[at(i, k)] = Math.max(wet[at(i, k)], Math.round(255 * Math.min(1, (1 - d) * 2.2)));
    }
  }

  // ---- spawn points: farthest-point sampling over roomy, lit floor ----
  const cand = [];
  for(let k = 2; k < H - 2; k += 2) for(let i = 2; i < W - 2; i += 2){ const s = at(i, k); if(g[s] === FLOOR && dist[s] >= 3 && zone[s] >= 0 && !L.zones[zone[s]].dark && L.ceil[s] > 2.5) cand.push(s); }
  L.spawns = [];
  if(cand.length){
    const pick = [cand[Math.floor(rnd() * cand.length)]], best = new Float32Array(cand.length).fill(1e9);
    while(pick.length < 40){
      const p = pick[pick.length - 1], pi = p % W, pk = (p - pi) / W; let bi = -1, bd = -1;
      for(let c = 0; c < cand.length; c++){ const s = cand[c], i = s % W, k = (s - i) / W, d = Math.hypot(i - pi, k - pk); if(d < best[c]) best[c] = d; if(best[c] > bd){ bd = best[c]; bi = c; } }
      if(bi < 0 || bd < 8) break; pick.push(cand[bi]);
    }
    for(const s of pick){ const i = s % W, k = (s - i) / W; L.spawns.push({ x:L.wx(i), y:0, z:L.wz(k) }); }
  }

  // ---- loot spots: dead ends (three solid sides close by) and the landmark zones ----
  L.loot = [];
  for(let k = 2; k < H - 2; k++) for(let i = 2; i < W - 2; i++){
    const s = at(i, k); if(g[s] !== FLOOR || dist[s] !== 1) continue;
    let sides = 0; for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ let blocked = false; for(let t = 1; t <= 3; t++) if(g[at(i + a * t, k + b * t)] !== FLOOR){ blocked = true; break; } if(blocked) sides++; }
    if(sides >= 3 && rnd() < 0.5) L.loot.push({ x:L.wx(i), z:L.wz(k), deadEnd:true });
  }

  // ---- landmarks and props ----
  L.landmarks = [];
  const zoneCentre = z => { // a floor cell near the middle of the zone
    let best = null, bd = 1e9; const ci = (z.x0 + z.x1) >> 1, ck = (z.y0 + z.y1) >> 1;
    for(let k = z.y0; k <= z.y1; k++) for(let i = z.x0; i <= z.x1; i++){ const s = at(i, k); if(g[s] !== FLOOR) continue; const d = Math.hypot(i - ci, k - ck) - dist[s] * 0.5; if(d < bd){ bd = d; best = [i, k]; } }
    return best;
  };
  for(const z of L.zones) if(z.landmark){ const c = zoneCentre(z); if(c) L.landmarks.push({ kind:z.landmark, name:LANDMARKS[z.landmark].name, x:L.wx(c[0]), z:L.wz(c[1]), zone:z.id }); }
  L.props = [];
  for(const d of L.desks) L.props.push({ kind:'desk', x:L.wx(d.i) + (d.w - 1) * CELL / 2, z:L.wz(d.k) + (d.h - 1) * CELL / 2, ry:rnd() < 0.5 ? 0 : Math.PI, solid:true });
  for(const d of L.desks) if(rnd() < 0.8){ const side = rnd() < 0.5 ? -1 : 1; const x = L.wx(d.i) + CELL, z = L.wz(d.k) + CELL * 0.5 + side * 1.0; if(g[at(L.ci(x), L.ck(z))] === FLOOR) L.props.push({ kind:'chair', x, z, ry:side > 0 ? 0 : Math.PI, dyn:true }); }
  // a wall cell facing open floor at (i, k): returns the outward normal or null
  const facing = (i, k) => { for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a, nk = k + b; if(ni > 0 && nk > 0 && ni < W - 1 && nk < H - 1 && g[at(ni, nk)] === FLOOR && dist[at(ni, nk)] >= 2) return [a, b]; } return null; };
  const nProps = Math.round(W * H / 900);
  for(let n = 0, tries = 0; n < nProps && tries < nProps * 20; tries++){
    const i = 2 + Math.floor(rnd() * (W - 4)), k = 2 + Math.floor(rnd() * (H - 4)), s = at(i, k);
    const z = zone[s] >= 0 ? L.zones[zone[s]] : null;
    if(g[s] === WALL){
      const f = facing(i, k); if(!f) continue;
      const x = L.wx(i) + f[0] * CELL * 0.5, zz = L.wz(k) + f[1] * CELL * 0.5, ry = Math.atan2(f[0], f[1]);
      const r = rnd(), kind = r < 0.35 ? 'extinguisher' : r < 0.6 ? 'alarm' : r < 0.8 ? 'clock' : 'bin';
      if(kind === 'bin'){ L.props.push({ kind, x:x + f[0] * 0.35, z:zz + f[1] * 0.35, ry:rnd() * 6, dyn:true }); }
      else L.props.push({ kind, x, z:zz, ry, wall:true, y:kind === 'clock' ? 2.1 : kind === 'alarm' ? 1.4 : 0 });
      n++;
    } else if(g[s] === FLOOR && dist[s] >= 2 && z && rnd() < 0.3){
      L.props.push({ kind:z.wet || L.wet[s] > 100 ? 'sign' : rnd() < 0.5 ? 'chair' : 'bin', x:L.wx(i), z:L.wz(k), ry:rnd() * 6.28, dyn:true }); n++;
    }
  }
  // the EXIT sign hangs over the dead end of its zone
  const ex = L.landmarks.find(m => m.kind === 'exit');
  if(ex){ L.props.push({ kind:'exit', x:ex.x, z:ex.z, y:L.ceil[at(L.ci(ex.x), L.ck(ex.z))] - 0.25, ry:0 }); L.loot.push({ x:ex.x, z:ex.z, landmark:true }); }
  delete L.rnd;
  return L;
}

// ---- queries used everywhere ----
export function cellAt(L, x, z){ const i = L.ci(x), k = L.ck(z); if(i < 0 || k < 0 || i >= L.W || k >= L.H) return WALL; return L.g[k * L.W + i]; }
export function ceilAt(L, x, z){ const i = L.ci(x), k = L.ck(z); if(i < 0 || k < 0 || i >= L.W || k >= L.H) return 2.8; return L.ceil[k * L.W + i]; }
export function zoneAt(L, x, z){ const i = L.ci(x), k = L.ck(z); if(i < 0 || k < 0 || i >= L.W || k >= L.H) return null; const z_ = L.zone[k * L.W + i]; return z_ >= 0 ? L.zones[z_] : null; }
export { CELL, FLOOR, WALL, PILLAR, DESK };
