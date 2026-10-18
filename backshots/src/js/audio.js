// Sound (from Microgang, moved indoors): recorded CC0 gunshots and handling placed in space — panned, quieter and
// duller with distance, muffled behind walls, the far recordings for distant shots, a hard short office echo — plus a
// low thump under your own shots, bullets cracking past your head; the hum of the lamps near you, the ventilation,
// the crackle of a flickering lamp, a distant thud now and then, footsteps on carpet.
import { G, on } from './state.js';
import { camera } from './engine.js';
import { gun } from './fighter.js';
import { losClear } from './phys.js';
import { store, clamp } from './util.js';

export const AU = { ctx:null, master:null, sfx:null, amb:null, verb:null, buf:{}, vol:store.get('vol', 0.8), ready:false, voices:0, ambOn:false, muted:false };
const FILES = ['rifle_1', 'rifle_2', 'rifle_3', 'rifle_far', 'mag_out_2', 'mag_in_2', 'charge_2', 'dry',
  'shell_1', 'shell_2', 'shell_3', 'shell_4', 'imp_wood', 'imp_stone', 'imp_stone_2', 'imp_flesh_1', 'imp_flesh_2', 'imp_flesh_3', 'whiz_1', 'whiz_2', 'whiz_3',
  'step_1', 'step_2', 'step_3', 'step_4', 'land', 'jump', 'tick', 'hover', 'click', 'head', 'kill', 'hum', 'vent', 'flicker', 'buzz', 'thud',
  'pistol', 'pistol_2', 'revolver_far', 'shotgun', 'shotgun_2', 'shotgun_far', 'sniper', 'sniper_2', 'sniper_far', 'pump', 'bolt', 'shell_in', 'shell_in_2', 'mag_in', 'mag_out', 'charge'];
const SHOT = { ak:['rifle_3', 'rifle_3', 'rifle_1'], m4:['rifle_1', 'rifle_2'], shotgun:['shotgun', 'shotgun_2'], sniper:['sniper', 'sniper_2'], pistol:['pistol', 'pistol_2'] };
const FAR = { ak:'rifle_far', m4:'rifle_far', shotgun:'shotgun_far', sniper:'sniper_far', pistol:'revolver_far' };
const pick = a => a[Math.floor(Math.random() * a.length)];

export function initAudio(){
  if(AU.ctx) return;
  try{ AU.ctx = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return; }
  const C = AU.ctx;
  const comp = C.createDynamicsCompressor(); comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 6; comp.attack.value = 0.002; comp.release.value = 0.2;
  AU.master = C.createGain(); AU.master.gain.value = AU.vol; AU.master.connect(comp); comp.connect(C.destination);
  AU.sfx = C.createGain(); AU.sfx.connect(AU.master);
  AU.amb = C.createGain(); AU.amb.gain.value = 0; AU.amb.connect(AU.master);
  // office echo: hard walls, low ceilings — dense early reflections and a short tail
  AU.verb = C.createConvolver(); AU.verb.buffer = impulse(1.1, 3.4); const vg = C.createGain(); vg.gain.value = 0.7; AU.verb.connect(vg); vg.connect(AU.master);
  AU.ready = true;
  loadAll();
}
function impulse(sec, decay){
  const C = AU.ctx, n = Math.floor(C.sampleRate * sec), b = C.createBuffer(2, n, C.sampleRate);
  for(let ch = 0; ch < 2; ch++){ const d = b.getChannelData(ch); for(let i = 0; i < n; i++){ const t = i / n; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (t < 0.004 ? t / 0.004 : 1) * (0.6 + 0.4 * Math.sin(i * 0.0005 * (ch + 1))); }
    // early reflections off walls a few metres away
    for(const [ms, g] of [[7, 0.55], [13, 0.4], [19, 0.32], [29, 0.22], [41, 0.15]]){ const at = Math.floor(C.sampleRate * ms / 1000 * (1 + ch * 0.07)); if(at < n) d[at] += g * (Math.random() < 0.5 ? -1 : 1); } }
  return b;
}
async function loadAll(){
  await Promise.all(FILES.map(async n => {
    try{ const r = await fetch('assets/sfx/' + n + '.mp3'); if(!r.ok) return; const a = await r.arrayBuffer(); AU.buf[n] = await AU.ctx.decodeAudioData(a); }catch(e){}
  }));
  if(AU.wantAmb) startAmbience();
}
export function resumeAudio(){ initAudio(); if(AU.ctx && AU.ctx.state === 'suspended') AU.ctx.resume(); }
export function setVolume(v){ AU.vol = v; store.set('vol', v); if(AU.master) AU.master.gain.value = AU.muted ? 0 : v; }
export function silence(on){ AU.muted = on; if(AU.master) AU.master.gain.value = on ? 0 : AU.vol; }

// play a buffer; pos = world position (or null for "in your head"); o: vol, rate, send (echo amount), far muffling
export function play(name, pos, o = {}){
  if(!AU.ready || !AU.buf[name] || AU.voices > 40) return;
  const C = AU.ctx, src = C.createBufferSource(); src.buffer = AU.buf[name];
  src.playbackRate.value = (o.rate || 1) * (1 + (Math.random() - 0.5) * (o.vary ?? 0.06));
  let g = C.createGain(), vol = o.vol ?? 1, node = src;
  if(pos){
    const dx = pos.x - camera.position.x, dy = pos.y - camera.position.y, dz = pos.z - camera.position.z, d = Math.hypot(dx, dy, dz);
    if(d > (o.max || 150)) return;
    vol *= 1 / (1 + d * (o.fall ?? 0.05));
    // left/right from the camera's right vector
    const e = camera.matrixWorld.elements, pan = clamp((dx * e[0] + dy * e[1] + dz * e[2]) / Math.max(1, d), -1, 1) * 0.85;
    // behind walls: muffled and quieter
    const hidden = o.occlude !== false && d > 2 && G.level && !losClear(camera.position.x, camera.position.y, camera.position.z, pos.x, pos.y, pos.z);
    if(hidden) vol *= 0.45;
    const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = clamp(18000 / (1 + d * 0.06), 900, 18000) * (hidden ? 0.08 : 1);
    const p = C.createStereoPanner(); p.pan.value = pan;
    node.connect(lp); lp.connect(p); node = p;
    if(o.send !== 0){ const s = C.createGain(); s.gain.value = (o.send ?? 0.25) * Math.min(1, 0.3 + d / 60); p.connect(s); s.connect(AU.verb); }
  } else if(o.send){ const s = C.createGain(); s.gain.value = o.send; src.connect(s); s.connect(AU.verb); }
  g.gain.value = vol; node.connect(g); g.connect(o.bus || AU.sfx);
  AU.voices++; src.onended = () => { AU.voices--; };
  src.start(C.currentTime + (o.delay || 0));
  return src;
}
// a short sine drop under your own shots: the punch you feel
function thump(k){
  const C = AU.ctx; if(!C) return;
  const o = C.createOscillator(), g = C.createGain(), t = C.currentTime;
  o.type = 'sine'; o.frequency.setValueAtTime(110 * (0.9 + Math.random() * 0.2), t); o.frequency.exponentialRampToValueAtTime(38, t + 0.14);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.7 * k, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  o.connect(g); g.connect(AU.sfx); o.start(t); o.stop(t + 0.22);
}
// noise burst through a filter (synth fallbacks and little effects)
function noise(dur, freq, q, vol, type = 'bandpass', pos){
  const C = AU.ctx; if(!C) return;
  const n = Math.floor(C.sampleRate * dur), b = C.createBuffer(1, n, C.sampleRate), d = b.getChannelData(0);
  for(let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
  const s = C.createBufferSource(); s.buffer = b; const f = C.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = C.createGain(); g.gain.value = vol; s.connect(f); f.connect(g); g.connect(AU.sfx); s.start();
}

export function startAmbience(){
  AU.wantAmb = true;
  if(!AU.ready || AU.ambOn || !AU.buf.vent) return;
  AU.ambOn = true;
  const loop = (n, v, bus = AU.amb) => { const s = AU.ctx.createBufferSource(); s.buffer = AU.buf[n]; s.loop = true; const g = AU.ctx.createGain(); g.gain.value = v; s.connect(g); g.connect(bus); s.start(); return g; };
  loop('vent', 0.32);
  // the hum of the two nearest lamps and the crackle of the nearest flickering one: panned loops, retuned each frame
  AU.hums = [0, 1].map(() => { const p = AU.ctx.createStereoPanner(); p.connect(AU.amb); const g = loop('hum', 0, p); return { g, p }; });
  { const p = AU.ctx.createStereoPanner(); p.connect(AU.amb); AU.flick = { g:loop('flicker', 0, p), p }; }
  AU.amb.gain.setTargetAtTime(1, AU.ctx.currentTime, 1.5);
}
// every frame: lamp hum and crackle follow you; a far thud now and then
export function updateAmbience(dt, lamps, flickK){
  if(!AU.ambOn || !AU.hums) return;
  const cx = camera.position.x, cz = camera.position.z, e = camera.matrixWorld.elements;
  const near = []; let fl = null, fd = 1e9;
  for(const l of lamps){ if(l.state === 'off') continue; const d = Math.hypot(l.x - cx, l.z - cz); if(d > 12) continue; if(l.state === 'flicker' && d < fd){ fd = d; fl = l; } near.push([d, l]); }
  near.sort((a, b) => a[0] - b[0]);
  AU.hums.forEach((h, i) => { const n = near[i]; const v = n ? 0.5 / (1 + n[0] * 0.45) : 0; h.g.gain.setTargetAtTime(v, AU.ctx.currentTime, 0.3);
    if(n){ const dx = n[1].x - cx, dz = n[1].z - cz; h.p.pan.setTargetAtTime(clamp((dx * e[0] + dz * e[2]) / Math.max(1, n[0]), -1, 1) * 0.7, AU.ctx.currentTime, 0.2); } });
  if(fl){ const k = flickK ? flickK(fl) : 1, v = (k < 0.5 ? 0.9 : 0.35) / (1 + fd * 0.35); AU.flick.g.gain.setTargetAtTime(v, AU.ctx.currentTime, 0.05);
    const dx = fl.x - cx, dz = fl.z - cz; AU.flick.p.pan.setTargetAtTime(clamp((dx * e[0] + dz * e[2]) / Math.max(1, fd), -1, 1) * 0.7, AU.ctx.currentTime, 0.2); }
  else AU.flick.g.gain.setTargetAtTime(0, AU.ctx.currentTime, 0.2);
  AU.thudT = (AU.thudT ?? 25) - dt;
  if(AU.thudT <= 0){ AU.thudT = 25 + Math.random() * 45; const a = Math.random() * 6.28; play('thud', { x:cx + Math.cos(a) * 60, y:1.5, z:cz + Math.sin(a) * 60 }, { vol:0.6, fall:0.01, max:200, send:0.6, occlude:false }); }
}

// ---- events → sounds ----
const near = (f, max = 60) => !G.me || Math.hypot(f.x - camera.position.x, f.z - camera.position.z) < max;
on('fire', f => {
  if(!AU.ready) return;
  const W = gun(f).W;
  if(f === G.me){
    play(pick(SHOT[W.id]), null, { vol:0.9, send:0.55, vary:0.05 });
    thump(W.kind === 'sniper' || W.kind === 'shotgun' ? 1 : 0.55);
    // the last rounds in the magazine click a little higher: you feel it running dry
    const g = gun(f); if(g.mag <= 3 && W.mag > 6 && g.mag >= 0) play('dry', null, { vol:0.18, rate:1.5 });
  } else {
    const d = Math.hypot(f.x - camera.position.x, f.z - camera.position.z);
    play(d > 24 ? FAR[W.id] : pick(SHOT[W.id]), { x:f.x, y:f.y + 1.4, z:f.z }, { vol:W.kind === 'sniper' ? 1.4 : 1, fall:0.035, max:300, send:0.6 });
  }
});
on('vmSound', (n, delay) => play(n, null, { vol:0.75, delay:delay || 0 }));
on('pump', f => { if(near(f, 25)) play('pump', f === G.me ? null : { x:f.x, y:f.y + 1.3, z:f.z }, { vol:0.7, delay:0.12 }); });
on('bolt', f => { if(near(f, 25)) play('bolt', f === G.me ? null : { x:f.x, y:f.y + 1.3, z:f.z }, { vol:0.7, delay:0.15 }); });
on('shell', f => { if(near(f, 18)) play(pick(['shell_in', 'shell_in_2']), f === G.me ? null : { x:f.x, y:f.y + 1.2, z:f.z }, { vol:0.6 }); });
on('take', (f, it) => { if(f === G.me) play(it.kind === 'gun' ? 'charge' : it.kind === 'ammo' ? 'mag_in' : 'click', null, { vol:0.5, rate:it.kind === 'gun' ? 1 : 1.1 }); });
on('use', f => { if(f === G.me) play('click', null, { vol:0.4, rate:0.7 }); });
on('healed', f => { if(f === G.me) play('click', null, { vol:0.5, rate:1.3 }); });
on('armorBroke', f => { if(near(f, 15)) play('imp_stone_2', { x:f.x, y:f.y + 1.2, z:f.z }, { vol:0.6, rate:0.8 }); });
on('dry', f => { if(f === G.me) play('dry', null, { vol:0.7 }); });
on('reload', f => { if(f !== G.me && near(f, 25)) play('mag_out_2', { x:f.x, y:f.y + 1, z:f.z }, { vol:0.6 }); });
on('equip', f => { if(f === G.me) play('charge_2', null, { vol:0.4, rate:1.2 }); });
on('casingHit', (c, k) => play(pick(['shell_1', 'shell_2', 'shell_3', 'shell_4']), { x:c.x, y:c.y, z:c.z }, { vol:0.35 * k + 0.1, send:0.1 }));
on('magLand', d => play('imp_wood', d.o.position, { vol:0.35, rate:1.3 }));
let impT = 0;
on('impactSound', (mat, x, y, z) => {
  const now = AU.ctx ? AU.ctx.currentTime : 0; if(now - impT < 0.03) return; impT = now;
  const n = mat === 'water' || mat === 'flesh' ? 'imp_flesh_2' : mat === 'metal' ? pick(['shell_1', 'shell_3', 'imp_stone_2']) : mat === 'floor' ? 'imp_wood' : pick(['imp_stone', 'imp_stone_2']);
  play(n, { x, y, z }, { vol:mat === 'floor' ? 0.3 : 0.45, rate:mat === 'floor' ? 0.7 : mat === 'metal' ? 1.2 : 1, fall:0.08, max:60, send:0.2 });
});
on('damage', (t, amt, src, o) => {
  if(o.zone){ if(t === G.me) play('buzz', null, { vol:0.5, rate:0.6 }); return; }
  if(t === G.me){ play(pick(['imp_flesh_1', 'imp_flesh_3']), null, { vol:0.8 }); return; }
  play(pick(['imp_flesh_1', 'imp_flesh_2', 'imp_flesh_3']), { x:o.x, y:o.y, z:o.z }, { vol:0.6, fall:0.06, send:0.1 });
  if(src === G.me){ play(o.head ? 'head' : 'tick', null, { vol:o.head ? 0.7 : 0.55, vary:0.02 }); }
});
on('kill', (t, src) => { if(src === G.me) play('kill', null, { vol:0.75, vary:0 }); });
on('whiz', (f, x, y, z) => play(pick(['whiz_1', 'whiz_2', 'whiz_3']), { x, y, z }, { vol:0.8, send:0.05 }));
on('step', (f, run) => {
  if(f !== G.me && !near(f, 25)) return;
  play('step_' + (1 + Math.floor(Math.random() * 4)), f === G.me ? null : { x:f.x, y:f.y, z:f.z }, { vol:f === G.me ? (run ? 0.4 : 0.28) : run ? 0.7 : 0.45, fall:0.15, send:0.05, rate:run ? 1.05 : 0.95 });
});
on('jump', f => { if(f === G.me) play('jump', null, { vol:0.3 }); });
on('land', (f, v) => { if(f === G.me) play('land', null, { vol:Math.min(0.7, v * 0.06) }); });
on('light', f => { if(near(f, 12)) play('click', f === G.me ? null : { x:f.x, y:f.y + 1.3, z:f.z }, { vol:0.35, rate:0.8 }); });
export function uiSound(n){ play(n, null, { vol:0.5, vary:0 }); }
