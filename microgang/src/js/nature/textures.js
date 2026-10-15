// Textures drawn in code: leaves with veins, petals, the fly agaric cap, shell bands, bark and soil fallbacks,
// plus heightmap → normal map. Photo textures (CC0, assets/tex) replace soil, moss, bark and stone when present.
import * as THREE from 'three';
import { mulberry } from '../util.js';
import { loadTex } from '../engine.js';

function cnv(w, h){ const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
export function toTex(c, o = {}){
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = o.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = o.clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.anisotropy = 8; t.generateMipmaps = true; t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}
// grey height canvas → tangent-space normal map
export function normalFrom(hc, k = 2, wrap = true){
  const w = hc.width, h = hc.height, src = hc.getContext('2d').getImageData(0, 0, w, h).data;
  const out = cnv(w, h), ctx = out.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
  const H = (x, y) => { if(wrap){ x = (x + w) % w; y = (y + h) % h; } else { x = Math.max(0, Math.min(w - 1, x)); y = Math.max(0, Math.min(h - 1, y)); } return src[(y * w + x) * 4] / 255; };
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){
    const dx = (H(x + 1, y) - H(x - 1, y)) * k, dy = (H(x, y + 1) - H(x, y - 1)) * k, l = Math.hypot(dx, dy, 1);
    const i = (y * w + x) * 4; d[i] = (-dx / l * 0.5 + 0.5) * 255; d[i + 1] = (dy / l * 0.5 + 0.5) * 255; d[i + 2] = (1 / l * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return toTex(out, { linear:true, clamp:!wrap });
}

// ---- a leaf: blade shape with midrib, side veins and colour variation; alpha cut-out outside the shape ----
// shape(t) gives the half width at t (0 base .. 1 tip); returns { map, normal } on a w×h canvas (u across, v along)
export function leafTex(o){
  const W = o.w || 256, Hh = o.h || 512, r = mulberry(o.seed || 1);
  const c = cnv(W, Hh), x = c.getContext('2d'), hc = cnv(W, Hh), hx = hc.getContext('2d');
  const shape = o.shape || (t => Math.sin(Math.PI * Math.pow(t, 0.8)) * 0.48);
  const path = (ctx) => {
    ctx.beginPath(); ctx.moveTo(W / 2, Hh);
    for(let i = 0; i <= 60; i++){ const t = i / 60, w = shape(t) * W, ser = o.serr ? (Math.abs(Math.sin(t * o.serr * Math.PI)) * W * 0.035) : 0; ctx.lineTo(W / 2 + w + ser, Hh * (1 - t)); }
    for(let i = 60; i >= 0; i--){ const t = i / 60, w = shape(t) * W, ser = o.serr ? (Math.abs(Math.sin(t * o.serr * Math.PI)) * W * 0.035) : 0; ctx.lineTo(W / 2 - w - ser, Hh * (1 - t)); }
    ctx.closePath();
  };
  // body colour: base → tip gradient, mottling
  path(x); x.save(); x.clip();
  const g = x.createLinearGradient(0, Hh, 0, 0); g.addColorStop(0, o.c0 || '#4E8A2C'); g.addColorStop(1, o.c1 || '#7DB443');
  x.fillStyle = g; x.fillRect(0, 0, W, Hh);
  for(let i = 0; i < 260; i++){ x.fillStyle = `rgba(${r() < 0.5 ? '255,250,190' : '20,40,10'},${r() * 0.07})`; const rr = r() * W * 0.12; x.beginPath(); x.arc(r() * W, r() * Hh, rr, 0, 7); x.fill(); }
  if(o.spots) for(let i = 0; i < o.spots; i++){ x.fillStyle = `rgba(110,70,20,${0.25 + r() * 0.35})`; x.beginPath(); x.arc(r() * W, r() * Hh, 3 + r() * 10, 0, 7); x.fill(); }
  // height: veins raised
  hx.fillStyle = '#808080'; hx.fillRect(0, 0, W, Hh);
  const vein = (ctx, col, lw) => {
    ctx.strokeStyle = col; ctx.lineCap = 'round';
    ctx.lineWidth = lw * 2.2; ctx.beginPath(); ctx.moveTo(W / 2, Hh); ctx.quadraticCurveTo(W / 2 + W * 0.01, Hh * 0.5, W / 2, Hh * 0.02); ctx.stroke();
    const n = o.veins || 9;
    for(let i = 1; i <= n; i++){
      const t = i / (n + 1), y0 = Hh * (1 - t * 0.95), w = shape(t) * W;
      for(const s of [-1, 1]){ ctx.lineWidth = lw * (1.3 - t * 0.6); ctx.beginPath(); ctx.moveTo(W / 2, y0); ctx.quadraticCurveTo(W / 2 + s * w * 0.5, y0 - Hh * 0.04, W / 2 + s * w * 0.95, y0 - Hh * 0.1); ctx.stroke(); }
    }
  };
  vein(x, o.vein || 'rgba(225,240,170,0.55)', W * 0.008);
  vein(hx, '#B0B0B0', W * 0.01);
  // fine net of little veins
  x.globalAlpha = 0.1; for(let i = 0; i < 500; i++){ x.strokeStyle = r() < 0.5 ? '#1D3A0E' : '#E8F5B0'; x.lineWidth = 1; x.beginPath(); const px = r() * W, py = r() * Hh; x.moveTo(px, py); x.lineTo(px + (r() - 0.5) * 18, py + (r() - 0.5) * 18); x.stroke(); }
  x.globalAlpha = 1;
  // darker, drier rim
  x.restore(); path(x); x.strokeStyle = o.rim || 'rgba(60,70,20,0.55)'; x.lineWidth = W * 0.012; x.stroke();
  // alpha: cut the outside away
  const a = cnv(W, Hh), ax = a.getContext('2d'); ax.fillStyle = '#000'; ax.fillRect(0, 0, W, Hh); path(ax); ax.fillStyle = '#fff'; ax.fill();
  const id = x.getImageData(0, 0, W, Hh), ad = ax.getImageData(0, 0, W, Hh).data;
  for(let i = 0; i < id.data.length; i += 4) id.data[i + 3] = ad[i];
  x.putImageData(id, 0, 0);
  return { map:toTex(c, { clamp:true }), normal:normalFrom(hc, 3, false) };
}

// a tiling noisy colour texture from a palette (bark, soil fallbacks...)
export function noiseTex(o){
  const N = o.size || 512, r = mulberry(o.seed || 3), c = cnv(N, N), x = c.getContext('2d'), hc = cnv(N, N), hx = hc.getContext('2d');
  x.fillStyle = o.base; x.fillRect(0, 0, N, N); hx.fillStyle = '#808080'; hx.fillRect(0, 0, N, N);
  const blob = (ctx, px, py, rr, col) => { for(const dx of [-N, 0, N]) for(const dy of [-N, 0, N]){ ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(px + dx, py + dy, rr, rr * (o.stretch || 1), 0, 0, 7); ctx.fill(); } };
  for(let i = 0; i < (o.n || 1800); i++){
    const px = r() * N, py = r() * N, rr = (o.rmin || 1) + r() * (o.rmax || 6), col = o.cols[Math.floor(r() * o.cols.length)], hv = Math.floor(100 + r() * 120);
    x.globalAlpha = o.alpha || 0.5; blob(x, px, py, rr, col);
    hx.globalAlpha = 0.5; blob(hx, px, py, rr, `rgb(${hv},${hv},${hv})`);
  }
  x.globalAlpha = 1; hx.globalAlpha = 1;
  if(o.post) o.post(x, hx, N, r);
  return { map:toTex(c), normal:normalFrom(hc, o.bump || 2) };
}

// bark: vertical furrows (v runs along the trunk)
export function barkTex(seed = 5, light = '#7A6248', dark = '#3B2E22'){
  return noiseTex({ seed, size:512, base:light, cols:[dark, '#5C4A36', '#8C7458', '#4A3B2B', '#6E5C46'], n:2600, rmin:2, rmax:9, stretch:7, alpha:0.55, bump:3.5,
    post:(x, hx, N, r) => { for(let i = 0; i < 70; i++){ const px = r() * N; x.strokeStyle = 'rgba(30,22,14,0.5)'; x.lineWidth = 2 + r() * 5; hx.strokeStyle = '#303030'; hx.lineWidth = x.lineWidth;
      for(const ctx of [x, hx]){ ctx.beginPath(); ctx.moveTo(px, 0); for(let y = 0; y <= N; y += 32) ctx.lineTo(px + Math.sin(y * 0.02 + i) * 6 + (r() - 0.5) * 4, y); ctx.stroke(); } } } });
}
export function soilTex(){
  return noiseTex({ seed:9, size:1024, base:'#6B5238', cols:['#4E3A26', '#7E6446', '#8F7A5C', '#3A2B1C', '#9C8A6E', '#5E4A33', '#A89A82'], n:9000, rmin:1, rmax:7, alpha:0.7, bump:4,
    post:(x, hx, N, r) => { for(let i = 0; i < 60; i++){ const px = r() * N, py = r() * N, rr = 6 + r() * 16; const g = x.createRadialGradient(px - rr * 0.3, py - rr * 0.3, 1, px, py, rr);
      g.addColorStop(0, '#B7A88C'); g.addColorStop(1, '#5C4C3A'); x.fillStyle = g; x.beginPath(); x.ellipse(px, py, rr, rr * 0.8, r() * 3, 0, 7); x.fill();
      const hg = hx.createRadialGradient(px, py, 1, px, py, rr); hg.addColorStop(0, '#FFFFFF'); hg.addColorStop(1, '#808080'); hx.fillStyle = hg; hx.beginPath(); hx.ellipse(px, py, rr, rr * 0.8, 0, 0, 7); hx.fill(); } } });
}
export function mossTex(){
  return noiseTex({ seed:11, size:512, base:'#4F7A26', cols:['#3A5E1A', '#6E9A33', '#86B03E', '#2E4A14', '#9CC24E', '#5A8A2A'], n:14000, rmin:0.6, rmax:3, alpha:0.75, bump:5 });
}
export function stoneTex(){
  return noiseTex({ seed:13, size:512, base:'#8C877C', cols:['#6E6A61', '#A9A396', '#7D776C', '#B8B2A4', '#5E5A52', '#9A8F7E'], n:5000, rmin:1, rmax:10, alpha:0.4, bump:2 });
}

// photo textures from assets/tex if the asset pack provided them: { map, normal, rough } or null
export async function photoSet(name){
  const [map, normal, rough] = await Promise.all([loadTex(name + '_diff.jpg'), loadTex(name + '_nor.jpg', { linear:true }), loadTex(name + '_rough.jpg', { linear:true })]);
  if(!map) return null;
  return { map, normal, rough };
}

// the fly agaric cap: radial gradient red → orange rim (u = angle, v = 0 centre .. 1 rim)
export function capTex(c0 = '#C8180E', c1 = '#F0601A', seed = 21){
  const W = 512, H = 256, r = mulberry(seed), c = cnv(W, H), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, c0); g.addColorStop(0.75, c0); g.addColorStop(1, c1);
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  for(let i = 0; i < 900; i++){ x.fillStyle = `rgba(${r() < 0.5 ? '255,200,140' : '90,0,0'},${r() * 0.08})`; x.fillRect(r() * W, r() * H, 2 + r() * 30, 1 + r() * 4); }
  for(let i = 0; i < 120; i++){ x.strokeStyle = 'rgba(90,10,0,0.12)'; x.lineWidth = 1; const px = r() * W; x.beginPath(); x.moveTo(px, H * 0.4); x.lineTo(px + (r() - 0.5) * 8, H); x.stroke(); }
  return toTex(c);
}
// gills under the cap: fine radial lines (u = angle)
export function gillTex(){
  const W = 1024, H = 64, c = cnv(W, H), x = c.getContext('2d');
  x.fillStyle = '#EDE3CC'; x.fillRect(0, 0, W, H);
  for(let i = 0; i < 360; i++){ x.fillStyle = i % 2 ? 'rgba(150,130,100,0.55)' : 'rgba(255,250,235,0.6)'; x.fillRect(i / 360 * W, 0, 1.6, H); }
  return toTex(c);
}
// snail shell: growth bands along u, spiral stripes along v
export function shellTex(){
  const W = 1024, H = 256, r = mulberry(31), c = cnv(W, H), x = c.getContext('2d'), hc = cnv(W, H), hx = hc.getContext('2d');
  x.fillStyle = '#C9A774'; x.fillRect(0, 0, W, H); hx.fillStyle = '#808080'; hx.fillRect(0, 0, W, H);
  for(let i = 0; i < 5; i++){ const y = H * (0.18 + i * 0.17); x.fillStyle = `rgba(${90 + i * 10},50,22,0.75)`; x.fillRect(0, y, W, 6 + r() * 12); }
  for(let i = 0; i < 420; i++){ const px = r() * W, w = 1 + r() * 3; x.fillStyle = `rgba(${r() < 0.5 ? '255,240,210' : '70,40,15'},${0.12 + r() * 0.15})`; x.fillRect(px, 0, w, H); hx.fillStyle = `rgb(${120 + r() * 100},0,0)`; hx.fillRect(px, 0, w, H); }
  return { map:toTex(c), normal:normalFrom(hc, 2) };
}
// a petal (u across, v along) with soft gradient and fine lengthwise lines
export function petalTex(c0, c1, seed = 41){
  const W = 64, H = 256, r = mulberry(seed), c = cnv(W, H), x = c.getContext('2d');
  const g = x.createLinearGradient(0, H, 0, 0); g.addColorStop(0, c0); g.addColorStop(1, c1); x.fillStyle = g; x.fillRect(0, 0, W, H);
  for(let i = 0; i < 40; i++){ x.strokeStyle = `rgba(${r() < 0.5 ? '255,255,255' : '0,0,0'},0.08)`; x.beginPath(); const px = r() * W; x.moveTo(px, H); x.lineTo(px + (r() - 0.5) * 6, 0); x.stroke(); }
  return toTex(c, { clamp:true });
}
