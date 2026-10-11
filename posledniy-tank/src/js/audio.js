// Sound: Kenney CC0 samples for effects, a small procedural band for music (adapted from «Лесная война»).
import { store, clamp } from './util.js';
import { G } from './state.js';
import { camera } from './engine.js';

export const AU = { ctx:null, master:null, sfxGain:null, music:null, buffers:{}, muted:store.get('muted', false), musicOn:store.get('music', true), sfxOn:store.get('sfx', true), noise:null, ad:false };
const NAMES = ['shot_shotgun', 'shot_pop', 'shot_beam', 'shot_throw', 'boom', 'boom_big', 'hit', 'hit2', 'hit_wall', 'hurt', 'die', 'super_ready', 'super', 'gem', 'gem_drop', 'heal', 'empty', 'click', 'select', 'confirm', 'step', 'rustle', 'countdown', 'start', 'win', 'lose', 'respawn', 'kill'];
const raw = {};
// fetch the files early (cheap), decode once the audio context exists (needs a user gesture)
export function preloadSfx(){ return Promise.all(NAMES.map(n => fetch('assets/sfx/' + n + '.mp3').then(r => r.arrayBuffer()).then(b => { raw[n] = b; }).catch(() => {}))); }
export function unlockAudio(){
  if(AU.ctx){ if(AU.ctx.state === 'suspended' && !AU.ad && !document.hidden) AU.ctx.resume(); return; }
  try{
    const C = new (window.AudioContext || window.webkitAudioContext)();
    AU.ctx = C;
    const comp = C.createDynamicsCompressor(); comp.threshold.value = -10; comp.knee.value = 12; comp.ratio.value = 3; comp.attack.value = 0.005; comp.release.value = 0.2; comp.connect(C.destination);
    AU.master = C.createGain(); AU.master.gain.value = AU.muted ? 0 : 0.8; AU.master.connect(comp);
    AU.sfxGain = C.createGain(); AU.sfxGain.gain.value = AU.sfxOn ? 1 : 0; AU.sfxGain.connect(AU.master);
    AU.noise = C.createBuffer(1, C.sampleRate, C.sampleRate); const d = AU.noise.getChannelData(0); for(let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    for(const n of NAMES) if(raw[n]) C.decodeAudioData(raw[n].slice(0), b => { AU.buffers[n] = b; }, () => {});
    musicStart();
  }catch(e){ AU.ctx = null; }
}
export function setMuted(v){ AU.muted = v; store.set('muted', v); if(AU.master) AU.master.gain.value = v ? 0 : 0.8; }
export function setSfx(v){ AU.sfxOn = v; store.set('sfx', v); if(AU.sfxGain) AU.sfxGain.gain.value = v ? 1 : 0; }
export function setMusic(v){ AU.musicOn = v; store.set('music', v); if(MUS.gain) MUS.gain.gain.value = v ? MUS.vol : 0; }
// pause everything (ads, hidden tab)
export function silence(on){ if(!AU.ctx) return; try{ on ? AU.ctx.suspend() : AU.ctx.resume(); }catch(e){} }

const last = {};
let voices = 0;
const VOL = { shot_shotgun:0.55, shot_pop:0.4, shot_beam:0.45, shot_throw:0.7, boom:0.75, boom_big:0.95, hit:0.6, hit2:0.5, hit_wall:0.35, hurt:0.55, die:0.7, super_ready:0.5, super:0.55, gem:0.45, gem_drop:0.45, heal:0.3, empty:0.4, click:0.5, select:0.5, confirm:0.5, step:0.18, rustle:0.35, countdown:0.6, start:0.8, win:0.7, lose:0.7, respawn:0.4, kill:0.55 };
// src: a fighter or {x, z} for positional sound; nothing for UI sounds
export function sfx(name, src, vol = 1, rate = 1){
  const C = AU.ctx; if(!C || AU.muted || !AU.sfxOn) return;
  const b = AU.buffers[name]; if(!b) return;
  const now = performance.now(); if(last[name] && now - last[name] < 70) return; last[name] = now;
  if(voices >= 12) return;
  let v = (VOL[name] || 0.5) * vol, pan = 0;
  if(src && src !== G.me){
    const lx = G.me && G.me.alive ? G.me.x : camera.position.x, lz = G.me && G.me.alive ? G.me.z : camera.position.z;
    const dx = src.x - lx, dz = src.z - lz, d = Math.hypot(dx, dz);
    v *= clamp(1.4 / (1 + d * 0.12), 0, 1);
    if(v < 0.03) return;
    const cy = camera.rotation.y; pan = clamp((dx * Math.cos(cy) - dz * Math.sin(cy)) / (d + 4), -0.7, 0.7);
  }
  const s = C.createBufferSource(); s.buffer = b; s.playbackRate.value = rate;
  const g = C.createGain(); g.gain.value = v;
  s.connect(g);
  if(pan && C.createStereoPanner){ const p = C.createStereoPanner(); p.pan.value = pan; g.connect(p); p.connect(AU.sfxGain); } else g.connect(AU.sfxGain);
  voices++; s.onended = () => voices--;
  s.start();
}

// ---------------- procedural music ----------------
const MUS = { gain:null, next:0, step:0, timer:null, vol:0.11 };
const NOTE = n => 440 * Math.pow(2, (n - 69) / 12);
// a bouncy major progression: I – V – vi – IV
const CHORDS = [[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]];
function mOsc(t, type, f, p, d, a){ const C = AU.ctx, o = C.createOscillator(), g = C.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(p, t + (a || 0.01)); g.gain.exponentialRampToValueAtTime(0.0001, t + (a || 0.01) + d); o.connect(g); g.connect(MUS.gain); o.start(t); o.stop(t + d + 0.2); return o; }
function mNoise(t, type, f, p, d){ const C = AU.ctx, s = C.createBufferSource(); s.buffer = AU.noise; const fl = C.createBiquadFilter(); fl.type = type; fl.frequency.value = f; const g = C.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(p, t + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, t + d); s.connect(fl); fl.connect(g); g.connect(MUS.gain); s.start(t, Math.random() * 0.5); s.stop(t + d + 0.05); }
function musicStart(){
  if(MUS.timer) return;
  MUS.gain = AU.ctx.createGain(); MUS.gain.gain.value = AU.musicOn ? MUS.vol : 0;
  const lp = AU.ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 2400; lp.Q.value = 0.5;
  MUS.gain.connect(lp); lp.connect(AU.master);
  MUS.next = AU.ctx.currentTime + 0.15; MUS.timer = setInterval(musicTick, 90);
}
function musicTick(){
  const C = AU.ctx;
  if(!C || !AU.musicOn || AU.muted || C.state !== 'running'){ if(C) MUS.next = Math.max(MUS.next, C.currentTime + 0.05); return; }
  const battle = G.state === 'play' || G.state === 'countdown', hot = battle && G.match && G.match.hot;
  const spb = 60 / (battle ? (hot ? 142 : 128) : 96) / 2;
  while(MUS.next < C.currentTime + 0.35){
    const t = MUS.next, s = MUS.step, bar = Math.floor(s / 8) % 4, beat = s % 8, ch = CHORDS[bar];
    const arp = ch[[0, 1, 2, 1, 2, 1, 0, 2][beat]] + 12 + (beat === 4 && bar % 2 ? 12 : 0);
    if(!battle || beat % 2 === 0 || hot) mOsc(t, 'triangle', NOTE(arp), battle ? 0.035 : 0.045, battle ? 0.14 : 0.3);
    if(beat === 0 || (battle && beat === 4)) mOsc(t, 'triangle', NOTE(ch[0] - 12), battle ? 0.12 : 0.07, spb * (battle ? 3.4 : 7), 0.02);
    if(!battle && beat === 0) for(const n of ch) mOsc(t, 'sine', NOTE(n), 0.016, spb * 7.6, 0.5);
    if(battle){
      if(beat % 4 === 0){ const k = mOsc(t, 'sine', 130, 0.3, 0.16, 0.003); k.frequency.exponentialRampToValueAtTime(45, t + 0.14); }
      if(beat % 4 === 2) mNoise(t, 'bandpass', 1900, 0.1, 0.12);
      mNoise(t, 'bandpass', 6000, beat % 2 ? 0.008 : 0.016, 0.03);
    }
    MUS.next += spb; MUS.step++;
  }
}
