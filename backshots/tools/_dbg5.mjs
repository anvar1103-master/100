const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
const { bakeLight } = await import(R + 'level/lights.js');
const { setLevel } = await import(R + 'phys.js');
const { buildNav } = await import(R + 'nav.js');
const { startMatch, stepMatch } = await import(R + 'match.js');
const { botThink } = await import(R + 'bots.js');
const { G } = await import(R + 'state.js');
G.level = buildLevel(1000); bakeLight(G.level); setLevel(G.level); buildNav();
startMatch({ count:20, diff:'normal' }); G.me.bot = true;
let t = 0;
while(t < 540 && G.state === 'play'){ for(const f of G.fighters) botThink(f, 1 / 30); stepMatch(1 / 30); t += 1 / 30;
  if(Math.abs(t % 60) < 1 / 30 && t > 100){ const A = G.fighters.filter(f => f.alive);
    console.log(Math.round(t), A.map(f => `${f.name}@${f.x.toFixed(0)},${f.z.toFixed(0)} hold${(f.bot_.holdT || 0).toFixed(0)} tgt${f.bot_.target ? 1 : 0} goal${f.bot_.goal ? Math.hypot(f.bot_.goal.x - f.x, f.bot_.goal.z - f.z).toFixed(0) : '-'} path${f.bot_.path ? f.bot_.path.length : 0} v${Math.hypot(f.vx, f.vz).toFixed(1)}`).join(' | ')); }
}
const { findPath, walkLine } = await import(R + 'nav.js');
const { losClear } = await import(R + 'phys.js');
const A = G.fighters.filter(f => f.alive);
const [a, b] = A.slice(1);
console.log('pair', a.name, a.x.toFixed(2), a.z.toFixed(2), b.name, b.x.toFixed(2), b.z.toFixed(2));
console.log('path', JSON.stringify(findPath(a.x, a.z, b.x, b.z)), 'walkLine', walkLine(a.x, a.z, b.x, b.z), 'los', losClear(a.x, 1.6, a.z, b.x, 1.3, b.z));
const L = G.level; for(let k = L.ck(a.z) - 3; k <= L.ck(a.z) + 3; k++){ let row = ''; for(let i = L.ci(a.x) - 6; i <= L.ci(a.x) + 6; i++){ const isA = i === L.ci(a.x) && k === L.ck(a.z), isB = i === L.ci(b.x) && k === L.ck(b.z); row += isA ? 'A' : isB ? 'B' : '.#PD'[L.g[k * L.W + i]]; } console.log(row); }
console.log('goalA', JSON.stringify(a.bot_.goal), 'stuck', a.bot_.stuckT, 'inp', JSON.stringify({ mx:a.inp.mx, mz:a.inp.mz }));
