// The battle HUD: crosshair that opens with the spread, hit markers (white body, gold head, red kill), arcs that
// point to whoever hurt you, health and its regeneration, ammo with a row of rounds, compass, kill feed, the
// scoreboard on Tab, the death card with the killer and a weapon pick, the dew-drop sniper scope.
import { G, on } from './state.js';
import { camera } from './engine.js';
import { gun } from './fighter.js';
import { WEAPONS, PRIMARIES, coneOf } from './weapons.js';
import { rayFighters } from './combat.js';
import { ray } from './phys.js';
import { standings, leader, FFA } from './match.js';
import { PL, VIEW } from './player.js';
import { P } from './post.js';
import { $, esc, store, clamp } from './util.js';
import { tr } from './i18n.js';

const H = { hitT:0, annT:0, ptsT:0, dirs:[], feed:[], last:{} };
const txt = (el, v) => { if(el._v !== v){ el._v = v; el.textContent = v; } };
const html = (el, v) => { if(el._h !== v){ el._h = v; el.innerHTML = v; } };
const fmt = s => { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const ord = n => n + '-е место';

export function initHud(){
  // compass strip: letters every 45°, ticks every 15°
  const strip = $('strip'), L = { 0:'С', 45:'СВ', 90:'В', 135:'ЮВ', 180:'Ю', 225:'ЮЗ', 270:'З', 315:'СЗ' };
  let h = '';
  for(let k = -1; k <= 1; k++) for(let a = 0; a < 360; a += 15){ const x = (a + k * 360) * 3; h += L[a] !== undefined ? `<span class="${a % 90 ? '' : 'big'}" style="left:${x}px">${L[a]}</span>` : `<span class="tk" style="left:${x}px"></span>`; }
  strip.innerHTML = h;
}

// ---- events ----
on('damage', (t, amt, src, o) => {
  if(src === G.me && t !== G.me){ hitMarker(o.head ? 'head' : 'hit'); }
  if(t === G.me && src && src !== t){
    // an arc around the centre toward the attacker
    const el = document.createElement('i'); $('dmgdir').appendChild(el);
    H.dirs.push({ el, x:src.x, z:src.z, t:0 });
    H.hurt = Math.min(1, (H.hurt || 0) + amt / 60);
  }
});
on('kill', (t, src, o) => {
  const W = o.weapon ? WEAPONS[o.weapon] : null;
  addFeed(src, t, W, o.head);
  if(src === G.me && t !== G.me){
    hitMarker('kill');
    const s = src.streak, msg = s === 2 ? 'Двойное убийство' : s === 3 ? 'Тройное убийство' : s >= 4 ? 'Серия ×' + s : '';
    showPts('+' + o.pts, o.head ? 'В голову' : '');
    if(msg) announce(msg);
  }
  if(t === G.me){
    const k = src && src !== t ? src : null;
    html($('killer'), k ? tr('Тебя убил ') + `<b>${esc(k.name)}</b><small>${esc(tr(W ? W.name : ''))}${o.head ? tr(' · в голову') : ''} · ${Math.round(Math.hypot(k.x - t.x, k.z - t.z))} ${tr('шагов')}</small>` : tr('Ты погиб'));
  }
});
on('assist', a => { if(a === G.me) showPts('+50', 'Помощь'); });
on('spawn', f => { if(f === G.me){ H.hurt = 0; for(const d of H.dirs) d.el.remove(); H.dirs.length = 0; } });

function hitMarker(kind){
  const h = $('hitm');
  h.className = 'hitm ' + (kind === 'hit' ? '' : kind);
  h.style.opacity = 1; h.style.transform = `scale(${kind === 'kill' ? 1.25 : kind === 'head' ? 1.1 : 0.9})`;
  H.hitT = kind === 'kill' ? 0.4 : 0.18; H.hitK = kind;
}
function showPts(v, sub){ const p = $('pts'); html(p, esc(v) + (sub ? `<small>${esc(tr(sub))}</small>` : '')); p.classList.add('on'); H.ptsT = 1.3; }
export function announce(t, sub, d = 2){ html($('ann'), esc(tr(t)) + (sub ? `<small>${esc(tr(sub))}</small>` : '')); $('ann').classList.add('on'); H.annT = d; }
function addFeed(k, v, W, head){
  const el = document.createElement('div');
  if(k === G.me || v === G.me) el.className = 'me';
  el.innerHTML = (k && k !== v ? `<b>${esc(k.name)}</b><em>${esc(tr(W ? W.name : ''))}</em>${head ? `<span class="hs">✕</span> ` : ''}` : '') + `<b>${esc(v.name)}</b>`;
  $('feed').prepend(el);
  H.feed.unshift({ el, t:0 });
  while(H.feed.length > 6){ H.feed.pop().el.remove(); }
}

export function showBoard(on){
  $('board').hidden = !on;
  if(!on) return;
  html($('board-t'), boardHTML());
}
export function boardHTML(){
  let h = `<tr><th>#</th><th>${tr('Боец')}</th><th>${tr('Убийства')}</th><th>${tr('Смерти')}</th><th>${tr('Помощь')}</th><th>${tr('Очки')}</th></tr>`;
  standings().forEach((f, i) => { h += `<tr class="${f === G.me ? 'me' : ''}"><td>${i + 1}</td><td>${esc(f.name)}</td><td>${f.kills}</td><td>${f.deaths}</td><td>${f.assists}</td><td>${f.score}</td></tr>`; });
  return h;
}

// ---- every frame ----
export function updateHud(dt){
  const f = G.me, M = G.match; if(!f || !M) return;
  const g = gun(f), W = g.W;
  // top
  txt($('my-k'), String(f.kills)); txt($('tgt'), String(M.target));
  const lead = leader(), st = standings(), place = st.indexOf(f) + 1;
  html($('lead'), lead && lead !== f ? `${tr('Лидер')}: <b>${esc(lead.name)}</b> · ${lead.kills}` : tr('Ты лидер'));
  txt($('timer'), fmt(M.timeLeft)); txt($('place'), tr(ord(place)));
  // compass: 3 px per degree; yaw 0 faces -z = north
  const deg = ((-f.yaw * 180 / Math.PI) % 360 + 360) % 360;
  $('strip').style.transform = `translateX(${-deg * 3}px)`;
  // health
  txt($('hp-n'), String(Math.ceil(f.hp)));
  $('hp-bar').style.width = clamp(f.hp, 0, 100) + '%';
  $('hp-bar').parentElement.className = 'hpbar' + (f.hp < 35 ? ' low' : '') + (f.alive && f.hp < 100 && f.sinceHit > 4 ? ' regen' : '');
  H.hurt = Math.max(0, (H.hurt || 0) - dt * 0.8);
  const low = f.alive ? clamp((45 - f.hp) / 45, 0, 1) : 0;
  $('hurt').style.opacity = Math.min(1, H.hurt + low * 0.6).toFixed(3);
  if(P.grade) P.grade.uniforms.get('hurt').value = low * 0.8;
  // ammo
  txt($('wname'), tr(W.name)); txt($('mag'), String(g.mag)); txt($('res'), String(g.reserve));
  $('mag').parentElement.className = 'ammo' + (g.mag <= Math.ceil(W.mag * 0.25) ? ' low' : '');
  const rk = W.id + ':' + g.mag;
  if(H.last.rounds !== rk){ H.last.rounds = rk; let r = ''; for(let i = 0; i < W.mag; i++) r += i < g.mag ? '<i></i>' : '<i class="e"></i>'; html($('rounds'), r); $('rounds').className = 'rounds' + (W.mag <= 6 ? ' big' : ''); }
  $('rhint').hidden = !(g.mag <= Math.ceil(W.mag * 0.25) && g.reserve > 0 && !f.reload);
  txt($('slot1-n'), tr(f.guns[0].W.name));
  $('slot1').className = f.cur === 0 ? 'on' : ''; $('slot2').className = f.cur === 1 ? 'on' : '';
  // crosshair: the gap shows the real cone; hidden while aiming down the sights or sprinting
  const x = $('xhair');
  const half = Math.tan(camera.fov * Math.PI / 360), cone = Math.tan(coneOf(W, f) * Math.PI / 180);
  const gap = clamp(cone / half * innerHeight / 2, 3, 120);
  x.style.setProperty('--g', gap.toFixed(1) + 'px');
  // (over the shoulder there are no sights to look down, so the crosshair stays; the scope has its own)
  x.classList.toggle('off', (VIEW.mode === 1 || W.ads.scope ? f.adsK > 0.5 : false) || f.sprintT > 0.1 || !f.alive);
  // whose name is under the crosshair
  H.tagT = (H.tagT || 0) - dt;
  if(H.tagT <= 0 && f.alive){
    H.tagT = 0.1;
    const d = camera.getWorldDirection(H.v || (H.v = camera.position.clone()));
    const w = ray(camera.position.x, camera.position.y, camera.position.z, d.x, d.y, d.z, 200);
    const h = rayFighters(camera.position.x, camera.position.y, camera.position.z, d.x, d.y, d.z, w ? w.t : 200, f);
    const t = $('tag');
    if(h){ txt(t, h.f.name); t.style.opacity = 1; x.classList.add('foe'); } else { t.style.opacity = 0; x.classList.remove('foe'); }
  }
  // hit marker fade
  if(H.hitT > 0){ H.hitT -= dt; const h = $('hitm'); h.style.opacity = clamp(H.hitT / (H.hitK === 'kill' ? 0.4 : 0.18), 0, 1).toFixed(2); }
  if(H.ptsT > 0){ H.ptsT -= dt; if(H.ptsT <= 0) $('pts').classList.remove('on'); }
  if(H.annT > 0){ H.annT -= dt; if(H.annT <= 0) $('ann').classList.remove('on'); }
  // damage arcs turn with you
  for(let i = H.dirs.length - 1; i >= 0; i--){
    const d = H.dirs[i]; d.t += dt;
    if(d.t > 1.4){ d.el.remove(); H.dirs.splice(i, 1); continue; }
    const a = Math.atan2(-(d.x - f.x), -(d.z - f.z)) - f.yaw;
    d.el.style.transform = `rotate(${-a}rad)`; d.el.style.opacity = (1 - d.t / 1.4).toFixed(2);
  }
  for(const e of H.feed){ e.t += dt; e.el.style.opacity = e.t > 6 ? 0 : 1; }
  // scope
  const scoped = W.ads.scope && f.adsK > 0.92 && f.alive;
  $('scope').hidden = !scoped;
  if(scoped){ $('breath').style.setProperty('--b', (PL.sway.breath * 100).toFixed(0) + '%'); }
  // death card
  $('dead').hidden = f.alive;
  if(!f.alive) txt($('dead-n'), String(Math.max(1, Math.ceil(FFA.respawn - f.deadT))));
  $('lockhint').hidden = PL.locked || !f.alive || PL.autopilot;
  if(!$('board').hidden) html($('board-t'), boardHTML());
}

// weapon pick on the death card (takes effect at the next spawn)
export function renderDeadPick(onPick){
  const cur = store.get('primary', 'hornet');
  $('deadpick').innerHTML = PRIMARIES.map((id, i) => `<button data-w="${id}" class="${id === cur ? 'on' : ''}">${i + 1} · ${esc(tr(WEAPONS[id].name))}</button>`).join('');
  for(const b of $('deadpick').querySelectorAll('button')) b.onclick = () => { onPick(b.dataset.w); renderDeadPick(onPick); };
}
