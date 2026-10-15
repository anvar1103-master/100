// Sound: recorded CC0 gunshots and handling (assets/sfx), placed in space — panned left/right, muffled and
// quieter with distance, the far recordings for distant shots, a forest echo tail — plus a synthesized low thump
// under your own shots for weight, bullets cracking past your head, the meadow ambience.
import { G, on } from './state.js';
import { camera } from './engine.js';
import { gun } from './fighter.js';
import { store, clamp } from './util.js';
import { groundMat, grassAt } from './map.js';

export const AU = { ctx:null, master:null, sfx:null, amb:null, verb:null, buf:{}, vol:store.get('vol', 0.8), ready:false, voices:0, ambOn:false, muted:false };
const FILES = ['rifle_1', 'rifle_2', 'rifle_3', 'rifle_far', 'shotgun', 'shotgun_2', 'shotgun_far', 'sniper', 'sniper_2', 'sniper_far', 'revolver', 'revolver_2', 'revolver_far',
  'mag_out', 'mag_in', 'charge', 'pump', 'shell_in', 'shell_in_2', 'bolt', 'cyl_open', 'cyl_close', 'cyl_click', 'dry', 'dry_2',
  'shell_1', 'shell_2', 'shell_3', 'shell_4', 'imp_dirt_1', 'imp_dirt_2', 'imp_dirt_3', 'imp_wood', 'imp_wood_2', 'imp_stone', 'imp_stone_2',
  'imp_flesh_1', 'imp_flesh_2', 'imp_flesh_3', 'splash', 'splash_2', 'splash_3', 'whiz_1', 'whiz_2', 'whiz_3',
  'step_grass_1', 'step_grass_2', 'step_grass_3', 'step_grass_4', 'step_dirt_1', 'step_dirt_2', 'step_dirt_3', 'step_dirt_4', 'land', 'jump',
  'tick', 'hover', 'click', 'head', 'kill', 'amb_meadow', 'amb_wind'];
const SHOT = { hornet:['rifle_1', 'rifle_2', 'rifle_3'], acorn:['shotgun', 'shotgun_2'], needle:['sniper', 'sniper_2'], comb:['revolver', 'revolver_2'] };
const FAR = { hornet:'rifle_far', acorn:'shotgun_far', needle:'sniper_far', comb:'revolver_far' };
const pick = a => a[Math.floor(Math.random() * a.length)];

export function initAudio(){
  if(AU.ctx) return;
  try{ AU.ctx = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return; }
  const C = AU.ctx;
  const comp = C.createDynamicsCompressor(); comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 6; comp.attack.value = 0.002; comp.release.value = 0.2;
  AU.master = C.createGain(); AU.master.gain.value = AU.vol; AU.master.connect(comp); comp.connect(C.destination);
  AU.sfx = C.createGain(); AU.sfx.connect(AU.master);
  AU.amb = C.createGain(); AU.amb.gain.value = 0; AU.amb.connect(AU.master);
  // forest echo: a generated impulse response, fed by a send bus
  AU.verb = C.createConvolver(); AU.verb.buffer = impulse(1.6, 2.6); const vg = C.createGain(); vg.gain.value = 0.55; AU.verb.connect(vg); vg.connect(AU.master);
  AU.ready = true;
  loadAll();
}
function impulse(sec, decay){
  const C = AU.ctx, n = Math.floor(C.sampleRate * sec), b = C.createBuffer(2, n, C.sampleRate);
  for(let ch = 0; ch < 2; ch++){ const d = b.getChannelData(ch); for(let i = 0; i < n; i++){ const t = i / n; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (t < 0.02 ? t / 0.02 : 1) * (0.6 + 0.4 * Math.sin(i * 0.0005 * (ch + 1))); } }
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
    const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = clamp(18000 / (1 + d * 0.06), 900, 18000);
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
  if(!AU.ready || AU.ambOn || !AU.buf.amb_meadow) return;
  AU.ambOn = true;
  for(const [n, v] of [['amb_meadow', 0.5], ['amb_wind', 0.32]]){
    const s = AU.ctx.createBufferSource(); s.buffer = AU.buf[n]; s.loop = true; const g = AU.ctx.createGain(); g.gain.value = v; s.connect(g); g.connect(AU.amb); s.start();
  }
  AU.amb.gain.setTargetAtTime(1, AU.ctx.currentTime, 1.5);
}

// ---- events → sounds ----
const near = (f, max = 60) => !G.me || Math.hypot(f.x - camera.position.x, f.z - camera.position.z) < max;
on('fire', f => {
  if(!AU.ready) return;
  const W = gun(f).W;
  if(f === G.me){
    play(pick(SHOT[W.id]), null, { vol:W.kind === 'sniper' ? 1 : 0.85, send:W.kind === 'sniper' ? 0.5 : 0.3, vary:0.05 });
    thump(W.kind === 'sniper' || W.kind === 'shotgun' ? 1 : 0.55);
    // the last rounds in the magazine click a little higher: you feel it running dry
    const g = gun(f); if(g.mag <= 3 && W.mag > 6 && g.mag >= 0) play('dry_2', null, { vol:0.25, rate:1.4 });
  } else {
    const d = Math.hypot(f.x - camera.position.x, f.z - camera.position.z);
    play(d > 28 ? FAR[W.id] : pick(SHOT[W.id]), { x:f.x, y:f.y + 1.4, z:f.z }, { vol:W.kind === 'sniper' ? 1.4 : 1, fall:0.03, max:400, send:0.45 });
  }
});
on('vmSound', n => play(n, null, { vol:0.75 }));
on('dry', f => { if(f === G.me) play('dry', null, { vol:0.7 }); });
on('reload', f => { if(f !== G.me && near(f, 30)) play('mag_out', { x:f.x, y:f.y + 1, z:f.z }, { vol:0.6 }); });
on('equip', f => { if(f === G.me) play('charge', null, { vol:0.4, rate:1.25 }); });
on('casingHit', (c, k) => play(pick(['shell_1', 'shell_2', 'shell_3', 'shell_4']), { x:c.x, y:c.y, z:c.z }, { vol:0.35 * k + 0.1, send:0.1 }));
on('magLand', d => play('imp_wood_2', d.o.position, { vol:0.35, rate:1.3 }));
let impT = 0;
on('impactSound', (mat, x, y, z) => {
  const now = AU.ctx ? AU.ctx.currentTime : 0; if(now - impT < 0.03) return; impT = now;
  const n = mat === 'water' || mat === 'mud' ? pick(['splash', 'splash_2', 'splash_3']) : mat === 'wood' || mat === 'shell' ? pick(['imp_wood', 'imp_wood_2']) : mat === 'stone' ? pick(['imp_stone', 'imp_stone_2'])
    : mat === 'berry' || mat === 'shroom' ? 'imp_flesh_2' : pick(['imp_dirt_1', 'imp_dirt_2', 'imp_dirt_3']);
  play(n, { x, y, z }, { vol:0.45, fall:0.08, max:60, send:0.15 });
});
on('damage', (t, amt, src, o) => {
  if(t === G.me){ play(pick(['imp_flesh_1', 'imp_flesh_3']), null, { vol:0.8 }); return; }
  play(pick(['imp_flesh_1', 'imp_flesh_2', 'imp_flesh_3']), { x:o.x, y:o.y, z:o.z }, { vol:0.6, fall:0.06, send:0.1 });
  if(src === G.me){ play(o.head ? 'head' : 'tick', null, { vol:o.head ? 0.7 : 0.55, vary:0.02 }); }
});
on('kill', (t, src) => { if(src === G.me) play('kill', null, { vol:0.75, vary:0 }); });
on('whiz', (f, x, y, z) => play(pick(['whiz_1', 'whiz_2', 'whiz_3']), { x, y, z }, { vol:0.8, send:0.05 }));
on('step', (f, run) => {
  if(f !== G.me && !near(f, 25)) return;
  const grass = !f.gN && (groundMat(f.x, f.z) === 'moss' || grassAt(f.x, f.z) > 0.3);
  play((grass ? 'step_grass_' : 'step_dirt_') + (1 + Math.floor(Math.random() * 4)), f === G.me ? null : { x:f.x, y:f.y, z:f.z }, { vol:f === G.me ? (run ? 0.35 : 0.25) : 0.5, fall:0.15, send:0 });
});
on('jump', f => { if(f === G.me) play('jump', null, { vol:0.3 }); });
on('land', (f, v) => { if(f === G.me) play('land', null, { vol:Math.min(0.7, v * 0.06) }); });
on('pad', f => { if(near(f, 50)){ noise(0.5, 260, 0.8, 0.5, 'lowpass'); play('imp_dirt_2', f === G.me ? null : { x:f.x, y:f.y, z:f.z }, { rate:0.6, vol:0.6 }); } });
on('pump', f => { if(f !== G.me && near(f, 30)) play('pump', { x:f.x, y:f.y + 1, z:f.z }, { vol:0.5, delay:0.12 }); });
on('bolt', f => { if(f !== G.me && near(f, 30)) play('bolt', { x:f.x, y:f.y + 1, z:f.z }, { vol:0.5, delay:0.1 }); });
export function uiSound(n){ play(n, null, { vol:0.5, vary:0 }); }
