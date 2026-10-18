// The zone «свет гаснет» (logic only, runs in node too): a circle of working light. Outside it the lamps die (a dim red
// emergency glow stays), the air hums and hurts, more with every stage. Five stages: a pause with the next circle
// already shown, then the light pulls in toward it; each new circle lies inside the old one, on walkable floor.
import { G, emit } from './state.js';
import { NAV } from './nav.js';
import { damage } from './combat.js';

// pause, shrink time (s), new radius as a share of the first one, damage per second outside
export const STAGES = [
  { wait:100, shrink:60, k:0.68, dps:1 },
  { wait:60, shrink:45, k:0.42, dps:2 },
  { wait:50, shrink:40, k:0.22, dps:4 },
  { wait:40, shrink:30, k:0.08, dps:7 },
  { wait:30, shrink:30, k:0, dps:12 },
];
export const Z = { on:false, stage:0, phase:'wait', t:0, cx:0, cz:0, r:1, R0:1, a:null, b:null, dps:0, edge:3 };

function nextCentre(a, r){
  // a floor node no farther from the old centre than the room the new circle leaves
  const room = Math.max(0, a.r - r) * 0.85, N = NAV.nodes;
  for(let i = 0; i < 200 && N.length; i++){ const n = N[Math.floor(Math.random() * N.length)]; if(Math.hypot(n[0] - a.cx, n[1] - a.cz) <= room) return [n[0], n[1]]; }
  return [a.cx, a.cz];
}
export function initZone(L, o = {}){
  const c = (L.W - 1) / 2, cx = L.wx(c), cz = L.wz(c), R0 = Math.hypot(L.W, L.H) * 0.25 + 2;
  Object.assign(Z, { on:o.zone !== false, stage:0, phase:'wait', t:0, cx, cz, r:R0, R0, dps:0, a:{ cx, cz, r:R0 }, b:null });
  planNext();
}
function planNext(){
  const S = STAGES[Z.stage]; if(!S) return;
  const r = S.k * Z.R0, [cx, cz] = nextCentre(Z.a, r);
  Z.b = { cx, cz, r };
}
export function stepZone(dt){
  if(!Z.on || Z.phase === 'done') return;
  const S = STAGES[Z.stage];
  Z.t += dt;
  if(Z.phase === 'wait'){
    if(Z.t >= S.wait){ Z.phase = 'shrink'; Z.t = 0; Z.dps = S.dps; emit('zoneShrink', Z); }
  } else {
    const k = Math.min(1, Z.t / S.shrink);
    Z.cx = Z.a.cx + (Z.b.cx - Z.a.cx) * k; Z.cz = Z.a.cz + (Z.b.cz - Z.a.cz) * k; Z.r = Z.a.r + (Z.b.r - Z.a.r) * k;
    if(k >= 1){
      Z.a = { cx:Z.cx, cz:Z.cz, r:Z.r }; Z.stage++; Z.t = 0;
      if(Z.stage >= STAGES.length){ Z.phase = 'done'; Z.b = null; }
      else { Z.phase = 'wait'; planNext(); }
      emit('zoneWait', Z);
    }
  }
  // the dark hurts: once a second, armour does not help
  for(const f of G.fighters){
    if(!f.alive) continue;
    if(outside(f.x, f.z)){ f.zoneT = (f.zoneT || 0) + dt; if(f.zoneT >= 1){ f.zoneT -= 1; damage(f, Math.max(1, Z.dps), null, { zone:true, part:'chest' }); } }
    else f.zoneT = 0;
  }
}
export const outside = (x, z) => Z.on && Math.hypot(x - Z.cx, z - Z.cz) > Z.r;
// how much working light is left at a point: 1 inside, down to 0 a few metres past the edge
export function zoneLit(x, z){
  if(!Z.on) return 1;
  const d = Math.hypot(x - Z.cx, z - Z.cz) - Z.r;
  return d <= 0 ? 1 : d >= Z.edge ? 0 : 1 - d / Z.edge;
}
// seconds until the light starts to pull in (0 while it is moving), and whether the next circle is known
export function zoneClock(){
  const S = STAGES[Z.stage];
  if(!Z.on || !S) return { wait:0, moving:false, done:true };
  return Z.phase === 'wait' ? { wait:S.wait - Z.t, moving:false } : { wait:0, moving:true, left:S.shrink - Z.t };
}
// the light a body takes from the floor's baked light, dimmed to the red glow past the edge (matches the level shader)
const DARK = [0.075, 0.018, 0.014];
export function zoneTint(x, z, rgb){
  const k = zoneLit(x, z); if(k >= 1) return rgb;
  for(let c = 0; c < 3; c++) rgb[c] *= k + (1 - k) * DARK[c];
  return rgb;
}
