// Walking routes for the bots: the floor plan's own half-metre grid (every floor cell is a node), A* with diagonal
// moves that never cut corners, extra cost right along walls so routes keep to the middle of corridors, and
// string-pulling so paths run straight where they can.
import { PW } from './phys.js';
import { FLOOR } from './level/gen.js';

export const NAV = { ok:null, cost:null, n:0, nodes:[], s:0.5 };
let N = 0, OFF = 0;
const id = (a, b) => b * N + a;
const cx = a => -OFF + (a + 0.5) * NAV.s;

export function buildNav(){
  const L = PW.L; N = NAV.n = L.W; OFF = L.ox;
  NAV.ok = new Uint8Array(N * N); NAV.cost = new Float32Array(N * N); NAV.nodes.length = 0;
  for(let b = 0; b < N; b++) for(let a = 0; a < N; a++){
    const s = b * L.W + a; if(L.g[s] !== FLOOR) continue;
    // a one-cell gap is too narrow for anyone
    const sol = (i, k) => i < 0 || k < 0 || i >= L.W || k >= L.H || L.g[k * L.W + i] !== FLOOR;
    if((sol(a - 1, b) && sol(a + 1, b)) || (sol(a, b - 1) && sol(a, b + 1))) continue;
    NAV.ok[s] = 1; NAV.cost[s] = L.dist[s] <= 1 ? 2.2 : L.dist[s] === 2 ? 1.3 : 1;
    if(L.dist[s] >= 2) NAV.nodes.push([cx(a), cx(b)]);
  }
  g = new Float32Array(N * N); came = new Int32Array(N * N); seen = new Uint32Array(N * N);
}
const node = v => Math.max(0, Math.min(N - 1, Math.floor((v + OFF) / NAV.s)));
function near(x, z){
  const a0 = node(x), b0 = node(z);
  if(NAV.ok[id(a0, b0)]) return id(a0, b0);
  for(let r = 1; r < 6; r++) for(let d = -r; d <= r; d++) for(const [a, b] of [[a0 + d, b0 - r], [a0 + d, b0 + r], [a0 - r, b0 + d], [a0 + r, b0 + d]]){
    if(a >= 0 && b >= 0 && a < N && b < N && NAV.ok[id(a, b)]) return id(a, b);
  }
  return -1;
}
// can you walk straight from one point to another (every node on the line walkable)?
export function walkLine(ax, az, bx, bz){
  const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / 0.25);
  for(let s = 1; s < n; s++){ const t = s / n; if(!NAV.ok[id(node(ax + (bx - ax) * t), node(az + (bz - az) * t))]) return false; }
  return true;
}
let g = null, came = null, seen = null, closed = null, stamp = 0;
let HF = new Float32Array(1 << 16), HN = new Int32Array(1 << 16), HL = 0;
function hpush(f, c){
  if(HL >= HF.length){ const F = new Float32Array(HF.length * 2), C = new Int32Array(HF.length * 2); F.set(HF); C.set(HN); HF = F; HN = C; }
  let i = HL++; while(i > 0){ const p = (i - 1) >> 1; if(HF[p] <= f) break; HF[i] = HF[p]; HN[i] = HN[p]; i = p; } HF[i] = f; HN[i] = c;
}
function hpop(){
  const top = HN[0], lf = HF[--HL], lc = HN[HL]; let i = 0;
  for(;;){ const l = i * 2 + 1, r = l + 1; if(l >= HL) break; let m = l; if(r < HL && HF[r] < HF[l]) m = r; if(HF[m] >= lf) break; HF[i] = HF[m]; HN[i] = HN[m]; i = m; }
  HF[i] = lf; HN[i] = lc; return top;
}
// weighted A* (the heuristic counts a little extra: far quicker, paths still sensible); returns [[x, z], ...] or null
export function findPath(ax, az, bx, bz){
  const s = near(ax, az), t = near(bx, bz);
  if(s < 0 || t < 0) return null;
  if(walkLine(ax, az, bx, bz)) return [[bx, bz]];
  if(!closed || closed.length !== N * N) closed = new Uint32Array(N * N);
  stamp++; HL = 0;
  const ta = t % N, tb = Math.floor(t / N);
  const h = c => { const a = c % N, b = (c - a) / N, da = Math.abs(a - ta), db = Math.abs(b - tb); return (Math.max(da, db) + 0.414 * Math.min(da, db)) * 1.6; };
  g[s] = 0; came[s] = -1; seen[s] = stamp; hpush(h(s), s);
  let it = 0;
  while(HL && it < 60000){
    const c = hpop();
    if(closed[c] === stamp) continue;
    closed[c] = stamp; it++;
    if(c === t) break;
    const a = c % N, b = (c - a) / N;
    for(let da = -1; da <= 1; da++) for(let db = -1; db <= 1; db++){
      if(!da && !db) continue;
      const na = a + da, nb = b + db; if(na < 0 || nb < 0 || na >= N || nb >= N) continue;
      const n = nb * N + na; if(!NAV.ok[n] || closed[n] === stamp) continue;
      if(da && db && (!NAV.ok[b * N + na] || !NAV.ok[nb * N + a])) continue;
      const ng = g[c] + (da && db ? 1.414 : 1) * NAV.cost[n];
      if(seen[n] !== stamp || ng < g[n]){ seen[n] = stamp; g[n] = ng; came[n] = c; hpush(ng + h(n), n); }
    }
  }
  if(seen[t] !== stamp) return null;
  const cells = []; for(let c = t; c >= 0; c = came[c]) cells.push(c);
  cells.reverse();
  const pts = cells.map(c => [cx(c % N), cx(Math.floor(c / N))]);
  const out = []; let from = [ax, az], i = 0;
  while(i < pts.length - 1){
    let j = Math.min(pts.length - 1, i + 40);
    while(j > i + 1 && !walkLine(from[0], from[1], pts[j][0], pts[j][1])) j--;
    out.push(pts[j]); from = pts[j]; i = j;
  }
  out.push([bx, bz]);
  return out;
}
export function randomNode(){ return NAV.nodes[Math.floor(Math.random() * NAV.nodes.length)]; }
