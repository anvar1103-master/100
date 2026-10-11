// Small shared helpers: math, random, storage, device flags.
export const $ = id => document.getElementById(id);
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = t => t * t * (3 - 2 * t);
export const TOUCH = matchMedia('(pointer:coarse)').matches || 'ontouchstart' in window && navigator.maxTouchPoints > 0;

// seeded RNG for map dressing so every match looks the same; Math.random for gameplay
let rng = Math.random;
export const rand = (a = 0, b = 1) => a + rng() * (b - a);
export const pick = a => a[Math.floor(rng() * a.length)];
export function seeded(seed, fn){
  let s = seed >>> 0;
  const prev = rng;
  rng = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  try{ return fn(); } finally { rng = prev; }
}
export function angDiff(a, b){ let d = (b - a) % TAU; if(d > Math.PI) d -= TAU; if(d < -Math.PI) d += TAU; return d; }
export const shuffle = a => { for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export const store = {
  get(k, d){ try{ const v = localStorage.getItem('pt_' + k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('pt_' + k, JSON.stringify(v)); }catch(e){} }
};

export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' })[c]);

// critically damped-ish spring: x chases target, v is velocity (k stiffness, d damping)
export function spring(s, target, k, d, dt){
  s.v += ((target - s.x) * k - s.v * d) * dt;
  s.x += s.v * dt;
  return s.x;
}
export const sp = (x = 0) => ({ x, v:0 });
