// Quick balance without graphics: node tools/balance.mjs [matches] — 12-fighter bot matches, kills per fighter by gun, kill distances
const R = new URL('../src/js/', import.meta.url).href;
const { buildWorld } = await import(R + 'world.js');
const { buildNav } = await import(R + 'nav.js');
const { startMatch, stepMatch } = await import(R + 'match.js');
const { botThink } = await import(R + 'bots.js');
const { G, on } = await import(R + 'state.js');
buildWorld(); buildNav();
const N = +(process.argv[2] || 4), byW = {}, n = {}, killsW = {}, len = [];
const dist = {}, dmgW = {}, shotsW = {};
on('kill', (t, s, o) => { killsW[o.weapon] = (killsW[o.weapon] || 0) + 1; if(s){ const d = Math.hypot(s.x - t.x, s.z - t.z); (dist[o.weapon] = dist[o.weapon] || []).push(d); } });
on('damage', (t, a, s, o) => { dmgW[o.weapon] = (dmgW[o.weapon] || 0) + a; });
on('shot', (f, tr, W) => { shotsW[W.id] = (shotsW[W.id] || 0) + 1; });
for(let m = 0; m < N; m++){
  startMatch({ count:12, diff:'normal' }); G.me.bot = true;
  let t = 0; while(G.state === 'play' && t < 480){ for(const f of G.fighters) botThink(f, 1 / 60); stepMatch(1 / 60); t += 1 / 60; }
  len.push(Math.round(t));
  for(const f of G.fighters){ byW[f.primary] = (byW[f.primary] || 0) + f.kills; n[f.primary] = (n[f.primary] || 0) + 1; }
}
console.log('match length', len.join(' '), 's');
for(const k in byW) console.log(k.padEnd(7), 'kills per fighter', (byW[k] / n[k]).toFixed(1));
console.log('kills by gun used', JSON.stringify(killsW));
for(const k in dist){ const a = dist[k].sort((x, y) => x - y); console.log(k, 'kill dist median', a[a.length >> 1].toFixed(0), 'p25', a[a.length >> 2].toFixed(0), 'dmg/shot', (dmgW[k] / shotsW[k]).toFixed(1), 'shots', shotsW[k]); }
