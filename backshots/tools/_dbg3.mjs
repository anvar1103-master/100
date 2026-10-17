const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
for(const seed of [1000, 7, 12345]){
  const L = buildLevel(seed), W = L.W, comp = new Int32Array(W * W).fill(-1); let n = 0; const sizes = [];
  for(let s = 0; s < W * W; s++){ if(L.g[s] !== 0 || comp[s] >= 0) continue; const st = [s]; comp[s] = n; let c = 0; while(st.length){ const x = st.pop(); c++; const i = x % W, k = (x - i) / W; for(const [a, b] of [[1,0],[-1,0],[0,1],[0,-1]]){ const ni = i + a, nk = k + b; if(ni < 0 || nk < 0 || ni >= W || nk >= W) continue; const d = nk * W + ni; if(L.g[d] === 0 && comp[d] < 0){ comp[d] = n; st.push(d); } } } sizes.push(c); n++; }
  console.log(seed, 'components', n, sizes.sort((a, b) => b - a).slice(0, 8).join(' '));
}
