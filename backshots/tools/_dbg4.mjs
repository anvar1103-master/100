const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
const { bakeLight } = await import(R + 'level/lights.js');
const { setLevel, PW } = await import(R + 'phys.js');
const nav = await import(R + 'nav.js');
const L = buildLevel(1000); setLevel(L); nav.buildNav();
const N = nav.NAV.n, ok = nav.NAV.ok;
// BFS 8-neighbour without corner cutting from node 0
let start = ok.findIndex(v => v); const vis = new Uint8Array(N * N); const q = [start]; vis[start] = 1;
for(let h = 0; h < q.length; h++){ const c = q[h], a = c % N, b = (c - a) / N; for(let da = -1; da <= 1; da++) for(let db = -1; db <= 1; db++){ if(!da && !db) continue; const na = a + da, nb = b + db; if(na < 0 || nb < 0 || na >= N || nb >= N) continue; const n = nb * N + na; if(!ok[n] || vis[n]) continue; if(da && db && (!ok[b * N + na] || !ok[nb * N + a])) continue; vis[n] = 1; q.push(n); } }
console.log('nav ok', ok.reduce((a, v) => a + v, 0), 'reachable from first', q.length);
let fails = 0;
for(let i = 0; i < 50; i++){ const a = nav.randomNode(), b = nav.randomNode(); const p = nav.findPath(a[0], a[1], b[0], b[1]); if(!p){ fails++; if(fails < 3){ const ai = Math.floor((a[0] + L.ox) / 0.5), ak = Math.floor((a[1] + L.oz) / 0.5), bi = Math.floor((b[0] + L.ox) / 0.5), bk = Math.floor((b[1] + L.oz) / 0.5); console.log('fail', a, b, 'okA', ok[ak * N + ai], 'okB', ok[bk * N + bi], 'visA', vis[ak * N + ai], 'visB', vis[bk * N + bi]); } } }
console.log('fails', fails);
