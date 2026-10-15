// Walking routes for the bots: a 2-step grid over the meadow marking where a fighter fits, A* over it,
// and string-pulling so paths run straight where they can.
import { freeAt, W } from './phys.js';
import { groundH, waterAt, WATER, BOUND } from './map.js';

const CELL = 2, N = Math.floor(BOUND * 2 / CELL), OFF = BOUND;
export const NAV = { ok:null, cost:null, nodes:[] };
const id = (i, k) => i * N + k;
const cx = i => -OFF + (i + 0.5) * CELL;

export function buildNav(){
  NAV.ok = new Uint8Array(N * N); NAV.cost = new Float32Array(N * N); NAV.nodes.length = 0;
  for(let i = 0; i < N; i++) for(let k = 0; k < N; k++){
    const x = cx(i), z = cx(k), y = groundH(x, z);
    const deep = waterAt(x, z) > -1e8 ? WATER - y : 0;
    if(deep > 0.8) continue;
    if(!freeAt(x, y, z, 0.55, 1.6)) continue;
    // too steep?
    const s = Math.abs(groundH(x + 1, z) - groundH(x - 1, z)) + Math.abs(groundH(x, z + 1) - groundH(x, z - 1));
    if(s > 2.4) continue;
    NAV.ok[id(i, k)] = 1;
    NAV.cost[id(i, k)] = 1 + (deep > 0 ? 2 : 0) + W.grassAt(x, z, { h:0 }) * -0.3;
    NAV.nodes.push([x, z]);
  }
}
const cell = v => Math.max(0, Math.min(N - 1, Math.floor((v + OFF) / CELL)));
// nearest walkable cell to (x, z)
function near(x, z){
  let i0 = cell(x), k0 = cell(z);
  if(NAV.ok[id(i0, k0)]) return id(i0, k0);
  for(let r = 1; r < 8; r++) for(let a = -r; a <= r; a++) for(const [i, k] of [[i0 + a, k0 - r], [i0 + a, k0 + r], [i0 - r, k0 + a], [i0 + r, k0 + a]]){
    if(i >= 0 && k >= 0 && i < N && k < N && NAV.ok[id(i, k)]) return id(i, k);
  }
  return -1;
}
// can you walk straight from cell a to cell b (every grid cell on the line walkable)?
export function walkLine(ax, az, bx, bz){
  const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / (CELL * 0.5));
  for(let s = 1; s < n; s++){ const t = s / n; if(!NAV.ok[id(cell(ax + (bx - ax) * t), cell(az + (bz - az) * t))]) return false; }
  return true;
}
// binary heap A*; returns [[x, z], ...] ending at the goal, or null
const g = new Float32Array(N * N), came = new Int32Array(N * N), seen = new Uint32Array(N * N); let stamp = 0;
export function findPath(ax, az, bx, bz){
  const s = near(ax, az), t = near(bx, bz);
  if(s < 0 || t < 0) return null;
  if(walkLine(ax, az, bx, bz)) return [[bx, bz]];
  stamp++;
  const heap = [], ti = Math.floor(t / N), tk = t % N;
  const h = c => { const i = Math.floor(c / N), k = c % N, dx = Math.abs(i - ti), dk = Math.abs(k - tk); return Math.max(dx, dk) + 0.414 * Math.min(dx, dk); };
  const push = (c, f) => { heap.push([f, c]); let i = heap.length - 1; while(i > 0){ const p = (i - 1) >> 1; if(heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if(heap.length){ heap[0] = last; let i = 0; for(;;){ const l = i * 2 + 1, r = l + 1; let m = i; if(l < heap.length && heap[l][0] < heap[m][0]) m = l; if(r < heap.length && heap[r][0] < heap[m][0]) m = r; if(m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
  g[s] = 0; came[s] = -1; seen[s] = stamp; push(s, h(s));
  let it = 0;
  while(heap.length && it++ < 6000){
    const [, c] = pop();
    if(c === t) break;
    const i = Math.floor(c / N), k = c % N;
    for(let di = -1; di <= 1; di++) for(let dk = -1; dk <= 1; dk++){
      if(!di && !dk) continue;
      const ni = i + di, nk = k + dk; if(ni < 0 || nk < 0 || ni >= N || nk >= N) continue;
      const n = id(ni, nk); if(!NAV.ok[n]) continue;
      if(di && dk && (!NAV.ok[id(i + di, k)] || !NAV.ok[id(i, k + dk)])) continue;
      const ng = g[c] + (di && dk ? 1.414 : 1) * NAV.cost[n];
      if(seen[n] !== stamp || ng < g[n]){ seen[n] = stamp; g[n] = ng; came[n] = c; push(n, ng + h(n)); }
    }
  }
  if(seen[t] !== stamp) return null;
  const cells = []; for(let c = t; c >= 0; c = came[c]) cells.push(c);
  cells.reverse();
  // string-pull: keep only the corners
  const pts = cells.map(c => [cx(Math.floor(c / N)), cx(c % N)]);
  const out = []; let from = [ax, az], i = 0;
  while(i < pts.length - 1){
    let j = pts.length - 1;
    while(j > i + 1 && !walkLine(from[0], from[1], pts[j][0], pts[j][1])) j--;
    out.push(pts[j]); from = pts[j]; i = j;
  }
  out.push([bx, bz]);
  return out;
}
export function randomNode(){ return NAV.nodes[Math.floor(Math.random() * NAV.nodes.length)]; }
