// Small shared helpers: math, random, noise, storage, springs.
export const $ = id => document.getElementById(id);
export const TAU = Math.PI * 2;
export const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = t => t * t * (3 - 2 * t);
export const sstep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
export const damp = (a, b, k, dt) => a + (b - a) * (1 - Math.exp(-k * dt));
export function angDiff(a, b){ let d = (b - a) % TAU; if(d > Math.PI) d -= TAU; if(d < -Math.PI) d += TAU; return d; }

// seeded RNG for the level (one seed = one floor plan); Math.random for gameplay
let rng = Math.random;
export const rand = (a = 0, b = 1) => a + rng() * (b - a);
export const randi = (a, b) => Math.floor(rand(a, b + 1));
export const pick = a => a[Math.floor(rng() * a.length)];
export const chance = p => rng() < p;
export function mulberry(seed){ let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function seeded(seed, fn){ const prev = rng; rng = mulberry(seed); try{ return fn(); } finally { rng = prev; } }
export const shuffle = a => { for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const gauss = () => { let u = 0, v = 0; while(!u) u = Math.random(); while(!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v); };

// 2D gradient noise in [-1, 1] and fractal sums of it (deterministic, used by the map and its dressing)
const PERM = new Uint8Array(512), GX = new Float32Array(256), GY = new Float32Array(256);
{ const r = mulberry(1337); const p = [...Array(256).keys()]; for(let i = 255; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for(let i = 0; i < 512; i++) PERM[i] = p[i & 255]; for(let i = 0; i < 256; i++){ const a = r() * TAU; GX[i] = Math.cos(a); GY[i] = Math.sin(a); } }
export function noise2(x, y){
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10), v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);
  const X = xi & 255, Y = yi & 255;
  const g = (h, dx, dy) => GX[h] * dx + GY[h] * dy;
  const a = g(PERM[PERM[X] + Y], xf, yf), b = g(PERM[PERM[X + 1] + Y], xf - 1, yf);
  const c = g(PERM[PERM[X] + Y + 1], xf, yf - 1), d = g(PERM[PERM[X + 1] + Y + 1], xf - 1, yf - 1);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 1.414;
}
export function fbm2(x, y, oct = 4){ let s = 0, a = 0.5, f = 1, n = 0; for(let i = 0; i < oct; i++){ s += a * noise2(x * f + i * 17.3, y * f - i * 9.1); n += a; a *= 0.5; f *= 2.03; } return s / n; }

export const store = {
  get(k, d){ try{ if(typeof localStorage === 'undefined') return d; const v = localStorage.getItem('bs_' + k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('bs_' + k, JSON.stringify(v)); }catch(e){} }
};
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' })[c]);

// damped spring: s.x chases target (k stiffness, d damping)
export const sp = (x = 0) => ({ x, v:0 });
export function spring(s, target, k, d, dt){ s.v += ((target - s.x) * k - s.v * d) * dt; s.x += s.v * dt; return s.x; }
