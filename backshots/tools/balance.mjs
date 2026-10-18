// Quick balance without graphics: node tools/balance.mjs [matches] [fighters] — bot-only battle royales in node.
// Prints match length, how many are alive at 30 s / 1 / 2 / 3 / 5 min, kills, headshot share, kill distances,
// how often the victim was lit or in the dark.
const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
const { bakeLight, lightAt } = await import(R + 'level/lights.js');
const { setLevel } = await import(R + 'phys.js');
const { buildNav } = await import(R + 'nav.js');
const { startMatch, stepMatch } = await import(R + 'match.js');
const { botThink } = await import(R + 'bots.js');
const { G, on } = await import(R + 'state.js');
const N = +(process.argv[2] || 4), COUNT = +(process.argv[3] || 20);
const MARKS = [30, 60, 120, 180, 300], alive = MARKS.map(() => 0);
const len = [], dist = [], dark = { lit:0, dark:0 }; let heads = 0, kills = 0, shots = 0, hits = 0, firstKill = [];
on('kill', (t, s, o) => { kills++; if(o.head) heads++; if(s){ dist.push(Math.hypot(s.x - t.x, s.z - t.z)); if(lightAt(G.level, t.x, t.z) < 0.3) dark.dark++; else dark.lit++; } if(!G.match.first){ G.match.first = G.time; firstKill.push(Math.round(G.time)); } });
on('shot', (f, tr) => { shots++; if(tr.some(t => t.hit === 'fighter')) hits++; });
for(let m = 0; m < N; m++){
  const t0 = Date.now();
  G.level = buildLevel(1000 + m * 7919); bakeLight(G.level); setLevel(G.level); buildNav();
  startMatch({ count:COUNT, diff:'normal' }); G.me.bot = true;
  let t = 0, mi = 0; while(G.state === 'play' && t < 600){ for(const f of G.fighters) botThink(f, 1 / 30); stepMatch(1 / 30); t += 1 / 30; while(mi < MARKS.length && t >= MARKS[mi]) alive[mi++] += G.match.alive; }
  while(mi < MARKS.length) alive[mi++] += 1;
  len.push(Math.round(t));
  console.log(`match ${m + 1}: ${Math.round(t)} s, ${G.match.why}, winner ${G.match.winner.name} (${G.match.winner.kills} kills), ${G.fighters.filter(f => f.alive).length} alive, ${Date.now() - t0} ms`);
}
dist.sort((a, b) => a - b);
console.log('length', len.join(' '), 's; first kill at', firstKill.join(' '), 's');
console.log('kills', kills, 'headshots', Math.round(heads / kills * 100) + '%', 'hit rate', Math.round(hits / shots * 100) + '%', 'kill distance median', dist[dist.length >> 1]?.toFixed(1), 'p90', dist[Math.floor(dist.length * 0.9)]?.toFixed(1));
console.log('alive at', MARKS.join(' / '), 's:', alive.map(a => (a / N).toFixed(1)).join(' / '));
console.log('victims in the dark', dark.dark, 'in light', dark.lit);
