import sharp from 'sharp';
const { buildLevel } = await import('../src/js/level/check.js');
const { bakeLight } = await import('../src/js/level/lights.js');
const seed = +(process.argv[2] || 7);
let t = Date.now(); const L = buildLevel(seed); const tg = Date.now() - t;
t = Date.now(); bakeLight(L); const tb = Date.now() - t;
console.log('gen', tg, 'ms bake', tb, 'ms; zones', L.zones.length, 'lamps', L.lamps.length, 'on', L.lamps.filter(l => l.state === 'on').length, 'spawns', L.spawns.length, 'loot', L.loot.length, 'props', L.props.length);
console.log('landmarks', L.landmarks.map(m => m.name + '@' + m.x.toFixed(0) + ',' + m.z.toFixed(0)).join('; '));
console.log('kinds', JSON.stringify(L.zones.reduce((a, z) => (a[z.kind] = (a[z.kind] || 0) + 1, a), {})));
const S = 3, W = L.W, img = Buffer.alloc(W * S * W * S * 3);
const B = L.light, n = B.n;
for(let k = 0; k < W; k++) for(let i = 0; i < W; i++){
  const c = L.g[k * W + i];
  for(let a = 0; a < S; a++) for(let b = 0; b < S; b++){
    const px = i * S + a, py = k * S + b, o = (py * W * S + px) * 3;
    if(c === 1){ img[o] = 30; img[o + 1] = 30; img[o + 2] = 36; continue; }
    if(c === 2){ img[o] = 90; img[o + 1] = 60; img[o + 2] = 60; continue; }
    if(c === 3){ img[o] = 40; img[o + 1] = 120; img[o + 2] = 200; continue; }
    const p = Math.floor((px + 0.5) / S / 2 * B.res), q = Math.floor((py + 0.5) / S / 2 * B.res), lo = (q * n + p) * 3;
    const f = v => Math.min(255, Math.round(Math.pow(v, 0.6) * 220));
    img[o] = f(B.data[lo]); img[o + 1] = f(B.data[lo + 1]); img[o + 2] = f(B.data[lo + 2]);
    if(L.wet[k * W + i] > 128){ img[o + 2] = Math.min(255, img[o + 2] + 60); }
  }
}
const mark = (x, z, r, col) => { const i = L.ci(x), k = L.ck(z); for(let a = -r; a <= r; a++) for(let b = -r; b <= r; b++){ const px = i * S + a, py = k * S + b; if(px < 0 || py < 0 || px >= W * S || py >= W * S) continue; const o = (py * W * S + px) * 3; img[o] = col[0]; img[o + 1] = col[1]; img[o + 2] = col[2]; } };
for(const s of L.spawns) mark(s.x, s.z, 2, [0, 255, 0]);
for(const l of L.loot) mark(l.x, l.z, 1, [255, 0, 255]);
for(const m of L.landmarks) mark(m.x, m.z, 4, [255, 60, 0]);
for(const l of L.lamps) if(l.state === 'flicker') mark(l.x, l.z, 1, [0, 200, 255]);
await sharp(img, { raw:{ width:W * S, height:W * S, channels:3 } }).png().toFile(process.argv[3] || '/tmp/claude-0/-home-user/7c0c5173-d5f5-5d18-ad5a-25690e4473bb/scratchpad/map.png');
