// The map: the floor plan drawn once per floor (lit floor pale, dark floor dark, walls as lines), the landmarks, the
// light zone (the circle now, the next one dashed, the dark outside shaded) and where shots were just heard. A small
// round map in the corner turns with you (you always face up); M opens the whole floor, north up.
import { G, on } from './state.js';
import { lightAt } from './level/lights.js';
import { Z } from './zone.js';
import { $, clamp } from './util.js';
import { tr } from './i18n.js';

const PX = 2;                     // canvas pixels per floor cell (cells are 0.5 m)
const MM = { base:null, L:null, shots:[], big:false, acc:0 };
const COL = { lm:{ pillars:'#E8D9A8', flood:'#7EC8F0', red:'#FF5A4A', exit:'#5BFF8A', office:'#F0C070', dark:'#B08CFF' } };

export function buildMinimap(L){
  const W = L.W, c = document.createElement('canvas'); c.width = c.height = W * PX;
  const x = c.getContext('2d'), img = x.createImageData(W * PX, W * PX), d = img.data;
  for(let k = 0; k < W; k++) for(let i = 0; i < W; i++){
    const s = k * W + i, v = L.g[s];
    let r, g, b, a = 255;
    if(v === 0){ const l = clamp(lightAt(L, L.wx(i), L.wz(k)), 0, 1); r = 28 + l * 92; g = 24 + l * 78; b = 14 + l * 40; if(L.wet[s] > 110){ r *= 0.75; g *= 0.9; b = b * 1.2 + 25; } }
    else if(v === 1){ // a wall: drawn only where it touches floor (an outline), the rest is empty
      let edge = false; for(const [a1, b1] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a1, nk = k + b1; if(ni >= 0 && nk >= 0 && ni < W && nk < W && L.g[nk * W + ni] !== 1) edge = true; }
      if(edge){ r = 215; g = 200; b = 150; } else a = 0;
    } else { r = 150; g = 140; b = 110; }       // pillars, desks
    for(let py = 0; py < PX; py++) for(let px = 0; px < PX; px++){ const o = ((k * PX + py) * W * PX + i * PX + px) * 4; d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = a; }
  }
  x.putImageData(img, 0, 0);
  MM.base = c; MM.L = L; MM.shots.length = 0;
}
on('fire', f => { if(f !== G.me && G.me && Math.hypot(f.x - G.me.x, f.z - G.me.z) < 60) MM.shots.push({ x:f.x + (Math.random() - 0.5) * 4, z:f.z + (Math.random() - 0.5) * 4, t:0 }); if(MM.shots.length > 40) MM.shots.shift(); });
on('matchStart', () => { MM.shots.length = 0; });
export function toggleBigMap(on){ MM.big = on; $('bigmap').hidden = !on; }

// world → canvas pixels of the base map
const toPx = (L, v) => (v + L.ox) / 0.5 * PX;
function drawZone(x, L, scale){
  if(!Z.on) return;
  const cx = toPx(L, Z.cx), cz = toPx(L, Z.cz), r = Z.r / 0.5 * PX;
  // the dark outside: a shaded ring out to far away
  x.save(); x.beginPath(); x.arc(cx, cz, r, 0, Math.PI * 2); x.rect(-4000, -4000, 8000 + L.W * PX, 8000 + L.W * PX); x.fillStyle = 'rgba(70, 0, 0, 0.45)'; x.fill('evenodd'); x.restore();
  x.lineWidth = 2 / scale; x.strokeStyle = 'rgba(255, 240, 210, 0.95)'; x.beginPath(); x.arc(cx, cz, r, 0, Math.PI * 2); x.stroke();
  if(Z.b){ x.setLineDash([6 / scale, 5 / scale]); x.strokeStyle = 'rgba(255, 255, 255, 0.85)'; x.beginPath(); x.arc(toPx(L, Z.b.cx), toPx(L, Z.b.cz), Z.b.r / 0.5 * PX, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); }
}
function drawMarks(x, L, scale, upright){
  for(const m of L.landmarks){
    const px = toPx(L, m.x), pz = toPx(L, m.z);
    x.save(); x.translate(px, pz); x.rotate(upright); x.scale(1 / scale, 1 / scale);
    x.fillStyle = COL.lm[m.kind] || '#fff'; x.strokeStyle = 'rgba(0,0,0,0.7)'; x.lineWidth = 2;
    x.beginPath(); x.moveTo(0, -6); x.lineTo(5, 0); x.lineTo(0, 6); x.lineTo(-5, 0); x.closePath(); x.fill(); x.stroke();
    if(MM.big){ x.font = '600 12px "Barlow Condensed", sans-serif'; x.textAlign = 'center'; x.lineWidth = 3; x.strokeText(tr(m.name), 0, -10); x.fillText(tr(m.name), 0, -10); }
    x.restore();
  }
  for(const s of MM.shots){ const a = 1 - s.t / 2.5; if(a <= 0) continue; x.save(); x.translate(toPx(L, s.x), toPx(L, s.z)); x.scale(1 / scale, 1 / scale); x.fillStyle = `rgba(255, 70, 40, ${a.toFixed(2)})`; x.beginPath(); x.arc(0, 0, 4, 0, Math.PI * 2); x.fill(); x.restore(); }
}
function drawMe(x, f, scale, yaw){
  x.save(); x.translate(toPx(MM.L, f.x), toPx(MM.L, f.z)); x.rotate(yaw); x.scale(1 / scale, 1 / scale);
  x.fillStyle = 'rgba(255, 220, 120, 0.18)'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 34, -Math.PI / 2 - 0.6, -Math.PI / 2 + 0.6); x.closePath(); x.fill();
  x.fillStyle = '#FFE08A'; x.strokeStyle = '#1A1408'; x.lineWidth = 2;
  x.beginPath(); x.moveTo(0, -8); x.lineTo(6, 6); x.lineTo(0, 3); x.lineTo(-6, 6); x.closePath(); x.fill(); x.stroke();
  x.restore();
}
export function updateMinimap(dt){
  const f = G.me, L = MM.L; if(!f || !L || L !== G.level) return;
  for(const s of MM.shots) s.t += dt;
  if((MM.acc += dt) < 1 / 30) return; MM.acc = 0;
  const watched = f.alive ? f : null;
  // the corner map: 30 m around you, turned so you face up
  const c = $('mini'), x = c.getContext('2d'), S = c.width, scale = S / (60 / 0.5 * PX);
  x.clearRect(0, 0, S, S);
  x.save(); x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2); x.clip();
  x.fillStyle = 'rgba(8, 6, 3, 0.75)'; x.fillRect(0, 0, S, S);
  if(watched){
    x.translate(S / 2, S / 2); x.rotate(f.yaw); x.scale(scale, scale); x.translate(-toPx(L, f.x), -toPx(L, f.z));
    x.imageSmoothingEnabled = false; x.drawImage(MM.base, 0, 0);
    drawZone(x, L, scale); drawMarks(x, L, scale, -f.yaw); drawMe(x, f, scale, -f.yaw);
  }
  x.restore();
  x.strokeStyle = 'rgba(255, 236, 190, 0.5)'; x.lineWidth = 1.5; x.beginPath(); x.arc(S / 2, S / 2, S / 2 - 1, 0, Math.PI * 2); x.stroke();
  // north on the rim
  if(watched){ const a = f.yaw - Math.PI / 2; x.fillStyle = '#FFE08A'; x.font = '700 12px "Barlow Condensed", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tr('С'), S / 2 + Math.cos(a) * (S / 2 - 9), S / 2 + Math.sin(a) * (S / 2 - 9)); }
  // the whole floor
  if(MM.big){
    const b = $('bigmap'), y = b.getContext('2d'), B = b.width, sc = B / MM.base.width;
    y.clearRect(0, 0, B, B); y.fillStyle = 'rgba(8, 6, 3, 0.85)'; y.fillRect(0, 0, B, B);
    y.save(); y.scale(sc, sc); y.imageSmoothingEnabled = false; y.drawImage(MM.base, 0, 0);
    drawZone(y, L, sc); drawMarks(y, L, sc, 0); if(watched) drawMe(y, f, sc, -f.yaw);
    y.restore();
  }
}
