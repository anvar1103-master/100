// The battle HUD: how many are left, your kills, the clock; a compass with the landmarks on it (where to go), the
// start countdown, a crosshair that opens with the spread, hit markers (white body, gold head, red kill), arcs toward
// whoever hurt you, health (it does not come back), ammo, the flashlight, the kill feed, the table on Tab, the death
// card with your place. Stage 2: armour and helmet, medicine (H), the two gun slots, what F would pick up, the
// healing bar, the sniper scope, the light zone's clock and the map (minimap.js).
import { G, on } from './state.js';
import { camera } from './engine.js';
import { gun, reserve, MEDS } from './fighter.js';
import { lootName } from './loot.js';
import { Z, zoneClock, outside } from './zone.js';
import { updateMinimap } from './minimap.js';
import { WEAPONS, coneOf } from './weapons.js';
import { standings } from './match.js';
import { PL } from './player.js';
import { P } from './post.js';
import { $, esc, clamp } from './util.js';
import { tr } from './i18n.js';

const H = { hitT:0, annT:0, dirs:[], feed:[], last:{}, hurt:0 };
const txt = (el, v) => { if(el._v !== v){ el._v = v; el.textContent = v; } };
const html = (el, v) => { if(el._h !== v){ el._h = v; el.innerHTML = v; } };
const fmt = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

export function initHud(){
  const strip = $('strip'), L = { 0:'С', 45:'СВ', 90:'В', 135:'ЮВ', 180:'Ю', 225:'ЮЗ', 270:'З', 315:'СЗ' };
  let h = '';
  for(let k = -1; k <= 1; k++) for(let a = 0; a < 360; a += 15){ const x = (a + k * 360) * 3; h += L[a] !== undefined ? `<span class="${a % 90 ? '' : 'big'}" style="left:${x}px">${L[a]}</span>` : `<span class="tk" style="left:${x}px"></span>`; }
  strip.innerHTML = h;
}
// landmark markers on the compass (rebuilt for each floor plan)
export function setLandmarks(list){
  $('marks').innerHTML = list.map((m, i) => `<i data-i="${i}" class="lm lm-${m.kind}"><b>${esc(tr(m.name))}</b><small></small></i>`).join('');
  H.marks = list;
}

on('damage', (t, amt, src, o) => {
  if(src === G.me && t !== G.me) hitMarker(o.head ? 'head' : 'hit');
  if(t === G.me && src && src !== t){
    const el = document.createElement('i'); $('dmgdir').appendChild(el);
    H.dirs.push({ el, x:src.x, z:src.z, t:0 });
    H.hurt = Math.min(1, H.hurt + amt / 50);
  }
});
on('kill', (t, src, o) => {
  const W = o.weapon ? WEAPONS[o.weapon] : null;
  addFeed(src, t, W, o.head, o.zone);
  if(src === G.me && t !== G.me){ hitMarker('kill'); announce(o.head ? 'В голову' : 'Убит', t.name, 1.4); }
  if(t === G.me){
    const k = src && src !== t ? src : null;
    if(o.zone && !k) html($('killer'), tr('Тебя забрала темнота'));
    else html($('killer'), (k ? tr('Тебя убил ') + `<b>${esc(k.name)}</b><small>${esc(tr(W ? W.name : ''))}${o.head ? tr(' · в голову') : ''} · ${Math.round(Math.hypot(k.x - t.x, k.z - t.z))} ${tr('м')}</small>` : tr('Ты погиб')));
    txt($('dead-place'), t.place + tr('-е место из ') + G.fighters.length);
  }
});
on('matchStart', () => { H.hurt = 0; for(const d of H.dirs) d.el.remove(); H.dirs.length = 0; for(const e of H.feed) e.el.remove(); H.feed.length = 0; });

function hitMarker(kind){
  const h = $('hitm');
  h.className = 'hitm ' + (kind === 'hit' ? '' : kind);
  h.style.opacity = 1; h.style.transform = `scale(${kind === 'kill' ? 1.25 : kind === 'head' ? 1.1 : 0.9})`;
  H.hitT = kind === 'kill' ? 0.4 : 0.18; H.hitK = kind;
}
export function announce(t, sub, d = 2){ html($('ann'), esc(tr(t)) + (sub ? `<small>${esc(tr(sub))}</small>` : '')); $('ann').classList.add('on'); H.annT = d; }
function addFeed(k, v, W, head, zone){
  const el = document.createElement('div');
  if(k === G.me || v === G.me) el.className = 'me';
  el.innerHTML = (k && k !== v ? `<b>${esc(k.name)}</b><em>${esc(tr(W ? W.name : ''))}</em>${head ? '<span class="hs">✕</span> ' : ''}` : zone ? `<em>${esc(tr('темнота'))}</em>` : '') + `<b>${esc(v.name)}</b>`;
  $('feed').prepend(el); H.feed.unshift({ el, t:0 });
  while(H.feed.length > 6) H.feed.pop().el.remove();
}
export function showBoard(on){ $('board').hidden = !on; if(on) html($('board-t'), boardHTML()); }
export function boardHTML(){
  let h = `<tr><th>#</th><th>${tr('Боец')}</th><th>${tr('Убийства')}</th><th>${tr('Урон')}</th><th></th></tr>`;
  standings().forEach((f, i) => { h += `<tr class="${f === G.me ? 'me' : ''}${f.alive ? '' : ' dead'}"><td>${f.alive ? i + 1 : f.place}</td><td>${esc(f.name)}</td><td>${f.kills}</td><td>${f.dmgDone}</td><td>${f.alive ? tr('жив') : ''}</td></tr>`; });
  return h;
}

export function updateHud(dt){
  const f = G.me, M = G.match; if(!f || !M) return;
  const g = gun(f), W = g.W;
  txt($('alive'), String(M.alive)); txt($('my-k'), String(f.kills)); txt($('timer'), fmt(M.timeLeft));
  // compass: 3 px per degree; yaw 0 faces -z = north
  const deg = ((-f.yaw * 180 / Math.PI) % 360 + 360) % 360;
  $('strip').style.transform = `translateX(${-deg * 3}px)`;
  if(H.marks){
    const els = $('marks').children, cw = $('marks').clientWidth / 2;
    for(let i = 0; i < els.length; i++){
      const m = H.marks[i], a = Math.atan2(m.x - f.x, -(m.z - f.z)) * 180 / Math.PI;
      let rel = ((a - deg) % 360 + 540) % 360 - 180;
      const el = els[i], on = Math.abs(rel) < 70;
      el.style.opacity = on ? 1 : 0; el.style.transform = `translateX(${(rel * 3).toFixed(1)}px)`;
      txt(el.lastChild, Math.round(Math.hypot(m.x - f.x, m.z - f.z)) + ' ' + tr('м'));
      void cw;
    }
  }
  // the countdown before shooting is allowed
  $('prep').hidden = !(M.prep > 0);
  if(M.prep > 0) txt($('prep-n'), String(Math.ceil(M.prep)));
  // health
  txt($('hp-n'), String(Math.max(0, Math.ceil(f.hp))));
  $('hp-bar').style.width = clamp(f.hp, 0, 100) + '%';
  $('hp-bar').parentElement.className = 'hpbar' + (f.hp < 35 ? ' low' : '');
  H.hurt = Math.max(0, H.hurt - dt * 0.7);
  const low = f.alive ? clamp((50 - f.hp) / 50, 0, 1) : 0;
  $('hurt').style.opacity = Math.min(1, H.hurt + low * 0.5).toFixed(3);
  P.hurt = Math.max(low * 0.8, H.hurt * 0.6);
  // armour, helmet, medicine
  $('arbar').hidden = !(f.armor > 0); $('ar-bar').style.width = clamp(f.armor, 0, 100) + '%';
  $('helm').hidden = !f.helmet;
  txt($('n-medkit'), String(f.meds.medkit)); txt($('n-bandage'), String(f.meds.bandage));
  $('n-medkit').parentElement.classList.toggle('zero', !f.meds.medkit); $('n-bandage').parentElement.classList.toggle('zero', !f.meds.bandage);
  // the slots, ammo, flashlight
  html($('slots'), f.guns.length > 1 ? f.guns.map((s_, i) => `<div class="${i === f.cur ? 'on' : ''}"><b>${i + 1}</b>${esc(tr(s_.W.name))} · ${s_.mag}/${reserve(f, s_)}</div>`).join('') : '');
  txt($('wname'), tr(W.name)); txt($('mag'), String(g.mag)); txt($('res'), String(reserve(f, g)));
  $('mag').parentElement.className = 'ammo' + (g.mag <= Math.ceil(W.mag * 0.25) ? ' low' : '');
  $('rhint').hidden = !(g.mag <= Math.ceil(W.mag * 0.25) && reserve(f, g) > 0 && !f.reload && !f.use);
  // pick up, healing, the scope
  const it = f.alive ? PL.pick : null;
  $('pick').hidden = !it;
  if(it) html($('pick'), `<kbd>F</kbd> ${esc(tr('подобрать'))} ${esc(tr(lootName(it)))}` + (it.kind === 'gun' && f.guns.length >= 2 && !f.guns.some(q => q.id === it.gun) ? `<small>${esc(tr('вместо '))}${esc(tr(W.name))}</small>` : it.kind === 'vest' && f.armor > 0 ? `<small>${esc(tr('броня '))}${Math.round(f.armor)} → ${it.armor}</small>` : ''));
  $('use').hidden = !f.use;
  if(f.use){ txt($('use-t'), tr(f.use.kind === 'medkit' ? 'Аптечка…' : 'Бинт…')); $('use-bar').style.width = Math.round(f.use.t / f.use.total * 100) + '%'; }
  $('scope').hidden = !(W.ads.scope && f.adsK > 0.85 && f.alive);
  // the zone
  const zc = zoneClock(), zt = $('zone-t');
  if(!Z.on || zc.done){ txt(zt, ''); zt.className = 'zone-t'; }
  else if(outside(f.x, f.z) && f.alive){ txt(zt, tr('Ты в темноте! Беги к свету')); zt.className = 'zone-t out'; }
  else if(zc.moving){ txt(zt, tr('Свет уходит · ') + fmt(zc.left)); zt.className = 'zone-t warn'; }
  else { txt(zt, tr('Свет погаснет через ') + fmt(zc.wait)); zt.className = 'zone-t' + (zc.wait < 20 ? ' warn' : ''); }
  updateMinimap(dt);
  $('torch').className = 'torch' + (f.light ? ' on' : '');
  // crosshair: the gap shows the real cone; hidden while aiming down the sights or sprinting
  const x = $('xhair'), half = Math.tan(camera.fov * Math.PI / 360), cone = Math.tan(coneOf(W, f) * Math.PI / 180);
  x.style.setProperty('--g', clamp(cone / half * innerHeight / 2, 3, 110).toFixed(1) + 'px');
  x.classList.toggle('off', f.adsK > 0.5 || f.sprintT > 0.1 || !f.alive || !!f.use);
  if(H.hitT > 0){ H.hitT -= dt; $('hitm').style.opacity = clamp(H.hitT / (H.hitK === 'kill' ? 0.4 : 0.18), 0, 1).toFixed(2); }
  if(H.annT > 0){ H.annT -= dt; if(H.annT <= 0) $('ann').classList.remove('on'); }
  for(let i = H.dirs.length - 1; i >= 0; i--){
    const d = H.dirs[i]; d.t += dt;
    if(d.t > 1.4){ d.el.remove(); H.dirs.splice(i, 1); continue; }
    const a = Math.atan2(-(d.x - f.x), -(d.z - f.z)) - f.yaw;
    d.el.style.transform = `rotate(${-a}rad)`; d.el.style.opacity = (1 - d.t / 1.4).toFixed(2);
  }
  for(const e of H.feed){ e.t += dt; e.el.style.opacity = e.t > 7 ? 0 : 1; }
  $('dead').hidden = f.alive;
  if(!f.alive){ const w = PL.watch; txt($('watch'), w ? tr('Смотришь: ') + w.name : ''); }
  $('lockhint').hidden = PL.locked || !f.alive || PL.autopilot;
  if(!$('board').hidden) html($('board-t'), boardHTML());
}
on('zoneShrink', () => { if(G.me && G.me.alive) announce('Свет уходит', 'Иди в круг на карте', 2.6); });
on('zoneWait', z => { if(G.me && G.me.alive && z.phase !== 'done') announce('За кругом темно', 'Новый круг на карте', 2.2); });
