// Time of day and season (after «Лесная война»): day, sunset or a starry night; summer, autumn or winter.
// The sky and its light are re-baked once per match; the arena recolours through one shared uniform (arena.js
// seasonize); a small cloud of particles around the camera adds falling snow, autumn leaves or night fireflies.
import * as THREE from 'three';
import { scene, camera, setSky, LOW } from './engine.js';
import { A, U } from './arena.js';
import { pick, rand, store } from './util.js';

export const SKIES = {
  day:{ name:'День', top:'#3B78C8', hor:'#CFE6F5', hor2:'#A9CBE8', disc:'#FFF4D0', cloud:'#FFFFFF', dir:[-0.5, 0.78, 0.35], sunC:'#FFF2D8', sunI:2.6, hs:'#BFD8F2', hg:'#5A6E34', hi:0.95, fog:'#BCD2DE', exp:1.0, stars:0 },
  dusk:{ name:'Закат', top:'#27477E', hor:'#FFB46A', hor2:'#9C7FB0', disc:'#FFA040', cloud:'#F6C6A4', dir:[-0.86, 0.3, 0.22], sunC:'#FFC88C', sunI:2.5, hs:'#AFC2EC', hg:'#4E5E2C', hi:0.8, fog:'#B9A08A', exp:1.0, stars:0 },
  night:{ name:'Ночь', top:'#060D24', hor:'#22355A', hor2:'#1A2848', disc:'#C8D6FF', cloud:'#141C2E', dir:[0.35, 0.72, -0.6], sunC:'#A8BEFF', sunI:1.15, hs:'#7090D0', hg:'#1E2A22', hi:0.75, fog:'#1C2A40', exp:1.35, stars:1 }
};
export const SEASONS = { summer:'Лето', autumn:'Осень', winter:'Зима' };
export const ENV = { sky:'dusk', season:'summer' };

// a random pick unless the settings say otherwise (summer and day a bit more often)
export function pickEnv(){
  const t = store.get('tod', 'rand'), s = store.get('season', 'rand');
  return { sky:SKIES[t] ? t : pick(['day', 'day', 'dusk', 'night']), season:SEASONS[s] ? s : pick(['summer', 'summer', 'autumn', 'winter']) };
}

export function applyEnv(sky, season){
  sky = SKIES[sky] ? sky : 'dusk'; season = SEASONS[season] ? season : 'summer';
  if(sky !== ENV.sky || !ENV.baked){ setSky(SKIES[sky]); ENV.baked = true; }
  ENV.sky = sky; ENV.season = season;
  restyleArena();
  buildParticles();
}
// the arena's own pieces that don't go through the shader uniform
export function restyleArena(){
  const winter = ENV.season === 'winter', autumn = ENV.season === 'autumn';
  U.season.value.set(winter ? 1 : 0, autumn ? 1 : 0, 0);
  // the painted forest on the horizon is unlit: dim it at night (its season colour comes from the shared uniform)
  const k = ENV.sky === 'night' ? 0.32 : ENV.sky === 'dusk' ? 1 : 1.08;
  for(const m of A.bands || []) m.material.color.copy(m.userData.tint).multiplyScalar(k);
  if(A.waterMat){ A.waterMat.color.set(winter ? '#D4ECF4' : '#2C86A8'); A.waterMat.opacity = winter ? 0.96 : 0.9; A.waterMat.roughness = winter ? 0.35 : 0.2; }
  for(const m of A.flowers || []) m.visible = !winter;
}

// ---------------- weather particles around the camera ----------------
const dot = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d'); const gr = g.createRadialGradient(16, 16, 0, 16, 16, 15); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.5, 'rgba(255,255,255,.7)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); })();
const leaf = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.beginPath(); g.ellipse(16, 16, 13, 7, 0.6, 0, Math.PI * 2); g.fill(); return new THREE.CanvasTexture(c); })();
const W = { pts:null, kind:null, p:null, v:null, ph:null };
const BOX = { x:16, y:9, z:16 };
function buildParticles(){
  if(W.pts){ scene.remove(W.pts); W.pts.geometry.dispose(); W.pts.material.dispose(); W.pts = null; }
  const kind = ENV.season === 'winter' ? 'snow' : ENV.season === 'autumn' ? 'leaves' : ENV.sky === 'night' ? 'flies' : null;
  W.kind = kind; if(!kind) return;
  const n = (kind === 'snow' ? 160 : kind === 'leaves' ? 60 : 50) * (LOW ? 0.5 : 1) | 0;
  const pos = new Float32Array(n * 3), col = new Float32Array(n * 3), c = new THREE.Color();
  W.v = new Float32Array(n * 3); W.ph = new Float32Array(n);
  for(let i = 0; i < n; i++){
    pos[i * 3] = rand(-BOX.x, BOX.x); pos[i * 3 + 1] = rand(0, BOX.y); pos[i * 3 + 2] = rand(-BOX.z, BOX.z);
    W.ph[i] = rand(0, 100);
    if(kind === 'snow'){ c.set('#FFFFFF'); W.v[i * 3 + 1] = -rand(0.8, 1.6); }
    else if(kind === 'leaves'){ c.set(pick(['#E8A33C', '#C8562A', '#D9C24A', '#B5452E'])); W.v[i * 3 + 1] = -rand(0.5, 1.0); }
    else { c.set('#D8FF7A'); pos[i * 3 + 1] = rand(0.3, 3); }
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const flies = kind === 'flies';
  const m = new THREE.PointsMaterial({ size:kind === 'snow' ? 0.09 : kind === 'leaves' ? 0.16 : 0.14, map:kind === 'leaves' ? leaf : dot, vertexColors:true, transparent:true, depthWrite:false,
    alphaTest:kind === 'leaves' ? 0.4 : 0, blending:flies ? THREE.AdditiveBlending : THREE.NormalBlending, toneMapped:!flies, fog:!flies });
  if(flies) m.color.setScalar(2.2);
  W.pts = new THREE.Points(g, m); W.pts.frustumCulled = false; W.pts.renderOrder = 5;
  scene.add(W.pts);
}
// particles live in a box that follows the camera and wrap around its edges
export function updateEnv(dt, t){
  if(!W.pts) return;
  const p = W.pts.geometry.attributes.position, a = p.array, n = p.count, cx = camera.position.x, cz = camera.position.z;
  for(let i = 0; i < n; i++){
    const k = i * 3, ph = W.ph[i];
    if(W.kind === 'snow'){ a[k] += Math.sin(t * 0.8 + ph) * 0.25 * dt; a[k + 1] += W.v[k + 1] * dt; a[k + 2] += Math.cos(t * 0.7 + ph) * 0.2 * dt; }
    else if(W.kind === 'leaves'){ a[k] += (Math.sin(t * 1.6 + ph) * 0.9 + 0.3) * dt; a[k + 1] += W.v[k + 1] * dt; a[k + 2] += Math.cos(t * 1.3 + ph) * 0.6 * dt; }
    else { a[k] += Math.sin(t * 0.5 + ph) * 0.5 * dt; a[k + 1] += Math.sin(t * 0.9 + ph * 2) * 0.25 * dt; a[k + 2] += Math.cos(t * 0.45 + ph) * 0.5 * dt; }
    // wrap into the box around the camera
    let dx = a[k] - cx, dz = a[k + 2] - cz;
    if(dx > BOX.x) a[k] -= BOX.x * 2; else if(dx < -BOX.x) a[k] += BOX.x * 2;
    if(dz > BOX.z) a[k + 2] -= BOX.z * 2; else if(dz < -BOX.z) a[k + 2] += BOX.z * 2;
    if(a[k + 1] < 0) a[k + 1] += BOX.y; else if(a[k + 1] > BOX.y) a[k + 1] -= BOX.y;
  }
  p.needsUpdate = true;
  // fireflies blink
  if(W.kind === 'flies') W.pts.material.opacity = 0.75 + Math.sin(t * 3) * 0.25;
}
export const envLabel = () => SKIES[ENV.sky].name + ', ' + SEASONS[ENV.season].toLowerCase();
