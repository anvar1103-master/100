const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
const { bakeLight } = await import(R + 'level/lights.js');
const { setLevel } = await import(R + 'phys.js');
const { buildNav, findPath, NAV, randomNode } = await import(R + 'nav.js');
const { G } = await import(R + 'state.js');
G.level = buildLevel(1000); bakeLight(G.level); setLevel(G.level); buildNav();
let ok = 0, fail = 0, t0 = Date.now();
for(let i = 0; i < 200; i++){ const a = randomNode(), b = randomNode(); const p = findPath(a[0], a[1], b[0], b[1]); if(p) ok++; else fail++; }
console.log('paths ok', ok, 'fail', fail, 'ms per path', ((Date.now() - t0) / 200).toFixed(1), 'nodes', NAV.nodes.length);
