// Progression in the spirit of diep.io: every tank starts as the same «Новобранец». Experience comes from power
// spores (crates and fallen tanks drop them), from damage dealt and from knockouts. Every level gives a point to put
// into one of five stats; at level PROG.classLevel the tank turns into one of the five classes (new model, new gun,
// a super). Bots level, spend and choose by themselves; the player uses the panels below (buttons or keys 1–5).
import { scene } from './engine.js';
import { G, emit, on } from './state.js';
import { HEROES, HERO_IDS, ICONS, AMMO } from './heroes.js';
import { makeVisual, disposeVisual, setTeamLook } from './anim.js';
import { lookFor } from './combat.js';
import { glow, smoke, puff, ring } from './fx.js';
import { sfx } from './audio.js';
import { $, esc, TOUCH } from './util.js';

export const PROG = { orbXP:50, dmgXP:0.04, killXP:220, classLevel:4, maxLevel:12, maxUp:5, start:'rookie', rookieHp:1.3 };
// what each point does (see rebuild)
export const STATS = [
  { k:'hp',  name:'Броня',       hint:'+12% прочности' },
  { k:'dmg', name:'Урон',        hint:'+8% урона' },
  { k:'rel', name:'Перезарядка', hint:'+9% быстрее' },
  { k:'rng', name:'Дальность',   hint:'+7% дальше' },
  { k:'spd', name:'Скорость',    hint:'+5% быстрее ход' }
];
export const xpNeed = L => 60 + 25 * (L - 1);   // experience from level L to the next
// bots' taste in upgrades, by the class they are heading for
const TASTE = {
  rookie:{ hp:2, dmg:2, rel:2, rng:1, spd:1 }, shroom:{ hp:3, dmg:2, rel:1, rng:1, spd:2 }, beetle:{ hp:1, dmg:2, rel:3, rng:2, spd:1 },
  wasp:{ hp:1, dmg:3, rel:2, rng:2, spd:1 }, roly:{ hp:2, dmg:2, rel:2, rng:1, spd:1 }, hopper:{ hp:2, dmg:2, rel:2, rng:1, spd:2 }
};

// a fresh start (each new match)
export function resetProgress(f){
  f.lvl = 1; f.xp = 0; f.pts = 0; f.power = 0; f.up = { hp:0, dmg:0, rel:0, rng:0, spd:0 };
  rebuild(f, 'full');
}
// the fighter's own copy of its tank's numbers with the upgrades in. mode: 'full' heals to full, 'add' adds the
// health a new Броня point brings, 'ratio' keeps the share of health (a class change)
export function rebuild(f, mode = 'add'){
  const H = JSON.parse(JSON.stringify(HEROES[f.hero])), u = f.up;
  H.speed *= 1 + 0.05 * u.spd;
  for(const W of [H.attack, H.super]){
    if(W.range) W.range *= 1 + 0.07 * u.rng;
    if(W.speed) W.speed *= 1 + 0.04 * u.rng;
  }
  H.attack.reload *= 1 - 0.09 * u.rel;
  if(H.attack.cd) H.attack.cd *= 1 - 0.06 * u.rel;
  f.H = H; if(f.V) f.V.H = H;
  f.pow = (f.pow0 || 1) * (1 + 0.08 * u.dmg);
  // the starter is a little tougher, so fewer tanks are knocked out before they ever pick a class
  const max = Math.round(H.hp * (f.pow0 || 1) * (f.hpMul || 1) * (1 + 0.12 * u.hp) * (f.hero === PROG.start ? PROG.rookieHp : 1)), old = f.max || max;
  if(mode === 'full' || !f.max) f.hp = max;
  else if(mode === 'ratio') f.hp = Math.max(1, Math.round(f.hp / old * max));
  else f.hp = Math.min(max, f.hp + Math.max(0, max - old));
  f.max = max;
}

export function addXP(f, n){
  if(!f.alive || f.lvl >= PROG.maxLevel || !(n > 0)) return;
  f.xp += n;
  while(f.lvl < PROG.maxLevel && f.xp >= xpNeed(f.lvl)){
    f.xp -= xpNeed(f.lvl); f.lvl++; f.pts++; f.power = f.lvl - 1;
    if(f === G.me || f.seen){ ring(f.x, f.z, 0.3, 1.5, 0.5, '#FFD45A'); puff(glow, f.x, 0.8, f.z, { n:14, color:'#FFE08A', sp:1.6, vy:2, life:0.6, s0:0.18, s1:0.02, soft:true }); }
    if(f === G.me) sfx('super_ready', f, 0.7, 1.15);
    emit('levelUp', f);
    if(f.bot) botGrow(f);
  }
  if(f.lvl >= PROG.maxLevel) f.xp = 0;
}
// put one point into a stat; false when there is no point or the stat is full
export function spend(f, k){
  if(!f.alive || f.pts <= 0 || !(k in f.up) || f.up[k] >= PROG.maxUp) return false;
  f.up[k]++; f.pts--;
  rebuild(f, 'add');
  if(f === G.me){ sfx('select', f, 0.8, 1.2); puff(glow, f.x, 0.6, f.z, { n:8, color:'#9FE6FF', sp:1.2, vy:1.5, life:0.4, s0:0.14, s1:0.02, soft:true }); }
  return true;
}
// the rookie becomes one of the five classes: a new tank rolls out of a cloud of smoke
export const canEvolve = f => f.alive && f.hero === PROG.start && f.lvl >= PROG.classLevel;
export function evolve(f, cls){
  if(!canEvolve(f) || !HERO_IDS.includes(cls)) return false;
  const old = f.V;
  f.hero = cls; rebuild(f, 'ratio');
  const V = makeVisual(cls);
  V.yaw = old.yaw; V.hullYaw = old.hullYaw; V.root.position.copy(old.root.position); V.root.visible = old.root.visible;
  setTeamLook(V, lookFor(f)); scene.add(V.root);
  scene.remove(old.root); disposeVisual(old);
  f.V = V;
  f.ammo = AMMO; f.burst = null; f.pendingBeam = null; f.scope = false; f.charge = Math.max(f.charge, 0.35);
  if(f === G.me || f.seen){
    puff(smoke, f.x, 0.6, f.z, { n:16, color:'#B9B3A8', sp:2.2, upMin:0.2, vy:1.2, life:0.9, s0:0.3, s1:0.9, drag:2, soft:true, a:0.6 });
    puff(glow, f.x, 0.8, f.z, { n:20, color:'#FFD45A', sp:3, vy:2, life:0.6, s0:0.2, s1:0.03, soft:true });
    ring(f.x, f.z, 0.3, 2.2, 0.6, '#FFD45A');
  }
  sfx('super', f, f === G.me ? 1 : 0.5);
  emit('evolve', f);
  return true;
}
// bots: spend points by taste and take their planned class as soon as they may
function botGrow(f){
  const T = TASTE[f.plan] || TASTE.rookie;
  while(f.pts > 0){
    const open = STATS.map(s => s.k).filter(k => f.up[k] < PROG.maxUp); if(!open.length) break;
    let r = Math.random() * open.reduce((a, k) => a + T[k], 0), pick = open[0];
    for(const k of open){ r -= T[k]; if(r <= 0){ pick = k; break; } }
    spend(f, pick);
  }
  if(canEvolve(f)) evolve(f, f.plan || HERO_IDS[Math.floor(Math.random() * HERO_IDS.length)]);
}

// experience from fighting
on('damage', (o, amt, src) => { if(src && src !== o && src.lvl && G.match && G.match.mode === 'br') addXP(src, amt * PROG.dmgXP); });
on('kill', (f, src) => { if(src && src !== f && src.lvl && G.match && G.match.mode === 'br') addXP(src, PROG.killXP); });

// ---------------- the player's panels: level bar, upgrade points, class choice ----------------
let built = false;
const last = {};
function build(){
  built = true;
  $('ups-list').innerHTML = STATS.map((s, i) => `<button class="up" data-up="${s.k}"><span class="uk">${i + 1}</span><span class="un">${esc(s.name)}</span><i class="pips">${'<u></u>'.repeat(PROG.maxUp)}</i><b>+</b></button>`).join('');
  for(const b of $('ups-list').children) b.onclick = () => { if(G.me) spend(G.me, b.dataset.up); };
}
function buildEvo(){
  $('evo-list').innerHTML = HERO_IDS.map((id, i) => { const H = HEROES[id]; return `<button class="evc" data-c="${id}">${ICONS[id]}<b>${esc(H.name)}</b><small>${i + 1} · ${esc(H.role)}</small></button>`; }).join('');
  for(const b of $('evo-list').children) b.onclick = () => { if(G.me) evolve(G.me, b.dataset.c); };
}
export function updateProgressUI(){
  const me = G.me, on = !!(me && G.match && G.match.mode === 'br' && G.state !== 'menu' && G.state !== 'end');
  if(!built) build();
  const lv = $('lv');
  if(lv.hidden === on) lv.hidden = !on;
  if(!on){ if(!$('ups').hidden) $('ups').hidden = true; if(!$('evo').hidden) $('evo').hidden = true; return; }
  const top = me.lvl >= PROG.maxLevel, pct = top ? 100 : Math.min(100, me.xp / xpNeed(me.lvl) * 100);
  if(last.lvl !== me.lvl){ last.lvl = me.lvl; $('lv-n').textContent = me.lvl; }
  const pk = pct.toFixed(0); if(last.pct !== pk){ last.pct = pk; $('lv-xp').style.width = pk + '%'; }
  // upgrade points
  const showUps = me.alive && me.pts > 0;
  if($('ups').hidden === showUps) $('ups').hidden = !showUps;
  if(showUps){
    const key = me.pts + ':' + Object.values(me.up).join('');
    if(last.ups !== key){
      last.ups = key; $('ups-n').textContent = me.pts;
      for(const b of $('ups-list').children){ const n = me.up[b.dataset.up]; b.classList.toggle('full', n >= PROG.maxUp); [...b.querySelector('.pips').children].forEach((p, i) => p.classList.toggle('on', i < n)); }
    }
  }
  // the class choice
  const showEvo = canEvolve(me);
  if($('evo').hidden === showEvo){ if(showEvo) buildEvo(); $('evo').hidden = !showEvo; }
}
// keys 1–5: a class while the choice is open, otherwise an upgrade
addEventListener('keydown', e => {
  const me = G.me; if(!me || !me.alive || G.state !== 'play' || G.paused || !G.match || G.match.mode !== 'br') return;
  const n = /^Digit([1-5])$/.exec(e.code) || /^Numpad([1-5])$/.exec(e.code); if(!n) return;
  const i = +n[1] - 1;
  if(canEvolve(me)) evolve(me, HERO_IDS[i]); else spend(me, STATS[i].k);
});
export const progressHint = () => TOUCH ? '' : ' · 1–5';
