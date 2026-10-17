// Boot, menu, settings, the match flow, the main loop and the test hooks (window.__mg).
import * as THREE from 'three';
import { renderer, scene, camera, bakeSky, applyQuality, Q, WEBGL2, SUN_DIR, SUN_COL, shadowFollow, perfWatch, vfov, baseFov, LEVEL } from './engine.js';
import { initPost, renderFrame, P } from './post.js';
import { buildLayout, groundH } from './map.js';
import { buildGround, tickTerrain } from './nature/terrain.js';
import { buildGrass, tickGrass, GR } from './nature/grass.js';
import { tickNature, setCamFade } from './nature/shaders.js';
import { buildPlants, tickPlants, puffKick } from './nature/plants.js';
import { buildProps } from './nature/props.js';
import { buildModels } from './nature/models.js';
import { buildWorld, WORLD } from './world.js';
import { buildNav } from './nav.js';
import { G, on } from './state.js';
import { startMatch, stepMatch, standings, FFA } from './match.js';
import { botThink, botReset } from './bots.js';
import { HEROES, HERO_IDS, heroOf, setPrimary, gun } from './fighter.js';
import { WEAPONS, PRIMARIES } from './weapons.js';
import { PL, VIEW, playerInput, updateCamera, requestLock, resetView, setView, ownHidden } from './player.js';
import { initViewmodel, updateViewmodel, setArms, VMS } from './viewmodel.js';
import { loadHeroes, buildHero, animHero, disposeHero } from './heroes.js';
import { loadGuns } from './gunmodels.js';
import { initFx, stepFx, clearFx, FX } from './fx.js';
import { initAudio, resumeAudio, startAmbience, setVolume, uiSound, AU } from './audio.js';
import { initHud, updateHud, showBoard, boardHTML, renderDeadPick, announce } from './hud.js';
import { makeIcons } from './icons.js';
import { L, applyLang, tr } from './i18n.js';
import { $, store, esc, clamp } from './util.js';

const setLoad = (k, t) => { $('load-bar').style.width = Math.round(k * 100) + '%'; if(t) $('load-txt').textContent = tr(t); };
const MENU = { hero:heroOf(store.get('hero', 'ranger')), primary:store.get('primary', 'hornet'), count:store.get('count', 12), diff:store.get('diff', 'normal') };
const CAM = { free:null, menuT:0 };
const yieldFrame = () => new Promise(r => setTimeout(r, 0));

async function boot(){
  renderer.info.autoReset = false;
  if(!WEBGL2){ $('nogl').hidden = false; $('load').hidden = true; return; }
  applyLang();
  applyQuality(); bakeSky(); initPost();
  setLoad(0.1, 'Растёт трава…'); await yieldFrame();
  buildLayout(); buildWorld(); buildNav();
  await buildGround();
  setLoad(0.35); await yieldFrame();
  buildGrass();
  setLoad(0.5, 'Распускаются одуванчики…'); await yieldFrame();
  await buildModels();
  buildPlants();
  await buildProps();
  setLoad(0.7, 'Герои чистят бластеры…'); await yieldFrame();
  await loadGuns(); await loadHeroes(k => setLoad(0.7 + k * 0.2));
  initViewmodel(); initFx(); initHud();
  const icons = makeIcons();
  buildMenu(icons);
  setLoad(1, '');
  $('load').classList.add('off');
  showMenu();
  window.__mgReady = true;
  requestAnimationFrame(loop);
}

// ---- menu ----
function buildMenu(icons){
  const sp = $('m-hero');
  sp.innerHTML = HERO_IDS.map(id => `<button data-v="${id}"><img alt="" src="${icons.heroes[id] || ''}"><b>${esc(HEROES[id].name)}</b></button>`).join('');
  const wp = $('m-weapon');
  wp.innerHTML = PRIMARIES.map(id => `<button data-v="${id}"><img alt="" src="${icons.weapons[id] || ''}"><b>${esc(WEAPONS[id].name)}</b><small>${esc(WEAPONS[id].what)}</small></button>`).join('');
  const seg = (el, key, cb) => { const upd = () => { for(const b of el.querySelectorAll('button')) b.classList.toggle('on', b.dataset.v === String(MENU[key])); }; for(const b of el.querySelectorAll('button')) b.onclick = () => { MENU[key] = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v; store.set(key, MENU[key]); uiSound('click'); upd(); if(cb) cb(); }; upd(); };
  seg(sp, 'hero'); seg(wp, 'primary', weaponInfo); seg($('m-count'), 'count'); seg($('m-diff'), 'diff');
  weaponInfo();
  $('play').onclick = () => { uiSound('click'); startGame(); };
  $('m-set').onclick = () => openSettings('menu');
  $('p-resume').onclick = resume; $('p-set').onclick = () => openSettings('pause'); $('p-quit').onclick = toMenu;
  $('e-again').onclick = () => { $('end').hidden = true; startGame(); }; $('e-menu').onclick = toMenu;
  for(const b of document.querySelectorAll('button')) b.addEventListener('pointerenter', () => uiSound('hover'));
}
function weaponInfo(){
  const W = WEAPONS[MENU.primary];
  const stat = (n, v) => `<span>${esc(tr(n))}</span><u style="--v:${Math.round(clamp(v, 0.05, 1) * 100)}%"></u>`;
  const dps = W.dmg * W.pellets * W.rpm / 60;
  $('w-info').innerHTML = stat('Урон', W.dmg * W.pellets / 117) + stat('Скорострельность', W.rpm / 700) + stat('Дальность', W.fall ? W.fall[1] / 100 : 1) + stat('Точность', 1 - W.spread.hip / 6) + stat('Подвижность', W.moveK * W.ads.move) + stat('Урон в секунду', dps / 260);
}
function showMenu(){
  G.state = 'menu'; $('menu').hidden = false; $('hud').hidden = true; $('end').hidden = true; $('pause').hidden = true;
  VMS.shown = false;
  initAudioOnGesture();
}
let gestureBound = false;
function initAudioOnGesture(){ if(gestureBound) return; gestureBound = true; const go = () => { resumeAudio(); startAmbience(); }; addEventListener('pointerdown', go); addEventListener('keydown', go); }

// ---- the match ----
const MODELS = new Map();
function startGame(o = {}){
  if(o.primary) MENU.primary = o.primary;
  if(o.hero) MENU.hero = heroOf(o.hero);
  for(const C of MODELS.values()) disposeHero(C);
  MODELS.clear(); clearFx();
  startMatch(Object.assign({ count:MENU.count, diff:MENU.diff, hero:MENU.hero, primary:MENU.primary }, o));
  for(const f of G.fighters){ botReset(f); f.model = buildHero(f); MODELS.set(f, f.model); }
  setArms(G.me.hero);
  VMS.shown = true;
  $('menu').hidden = true; $('end').hidden = true; $('pause').hidden = true; $('hud').hidden = false;
  showBoard(false);
  renderDeadPick(id => { MENU.primary = id; store.set('primary', id); });
  resetView(G.me);
  resumeAudio(); startAmbience();
  if(!o.noLock) requestLock();
  announce('Каждый сам за себя', tr('Первым набери ') + G.match.target + tr(' убийств'), 3);
}
// a gun picked on the death card arrives with the next spawn
on('spawn', f => { if(f === G.me && G.state === 'play' && f.deaths > 0){ setPrimary(f, MENU.primary); f.guns[0].mag = f.guns[0].W.mag; f.guns[0].reserve = f.guns[0].W.reserve; } });
on('pad', (f, c) => puffKick(c.item));
on('matchEnd', M => {
  if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){}
  const me = G.me, win = M.winner === me;
  setTimeout(() => {
    if(G.state !== 'end') return;
    $('e-title').textContent = tr(win ? 'Победа!' : me.place <= 3 ? me.place + '-е место' : 'Бой окончен');
    $('e-sub').textContent = win ? tr('Ты лучший на поляне.') : tr('Победил ') + M.winner.name + ' · ' + M.winner.kills + tr(' убийств');
    const acc = me.shotsFired ? Math.round(me.shotsHit / me.shotsFired * 100) : 0;
    $('e-stats').innerHTML = [[me.kills, 'убийств'], [me.deaths, 'смертей'], [me.heads, 'в голову'], [acc + '%', 'точность']].map(([v, n]) => `<div><b>${v}</b><span>${esc(tr(n))}</span></div>`).join('');
    $('e-board').innerHTML = boardHTML();
    $('end').hidden = false; $('hud').hidden = true;
  }, 1600);
});
// accuracy: shots that touched someone
on('shot', (f, traces) => { f.shotsFired = (f.shotsFired || 0) + 1; if(traces.some(t => t.hit === 'fighter')) f.shotsHit = (f.shotsHit || 0) + 1; });

function toMenu(){
  G.state = 'menu'; G.paused = false;
  for(const C of MODELS.values()) disposeHero(C); MODELS.clear(); clearFx();
  G.fighters.length = 0; G.me = null;
  if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){}
  showMenu();
}
function pause(){ if(G.state !== 'play' || PL.autopilot) return; G.paused = true; $('pause').hidden = false; showBoard(false); }
function resume(){ $('pause').hidden = true; $('settings').hidden = true; G.paused = false; requestLock(); }
PL.onLock = locked => { if(!locked && G.state === 'play' && !PL.autopilot && !G.paused) pause(); };
addEventListener('keydown', e => {
  if(e.code === 'Tab' && G.state === 'play'){ e.preventDefault(); showBoard(true); }
  if(e.code === 'Escape' && G.state === 'play' && G.paused && !PL.locked && $('settings').hidden) resume();
  if(G.state === 'play' && G.me && !G.me.alive && /^Digit[123]$/.test(e.code)){ MENU.primary = PRIMARIES[+e.code.slice(5) - 1]; store.set('primary', MENU.primary); renderDeadPick(id => { MENU.primary = id; store.set('primary', id); }); }
});
addEventListener('keyup', e => { if(e.code === 'Tab') showBoard(false); });

// ---- settings ----
let setFrom = 'menu';
function openSettings(from){
  setFrom = from; $('settings').hidden = false; $('pause').hidden = true;
  const seg = (id, val, cb) => { const el = $(id); const upd = v => { for(const b of el.querySelectorAll('button')) b.classList.toggle('on', b.dataset.v === String(v)); }; upd(val); for(const b of el.querySelectorAll('button')) b.onclick = () => { upd(b.dataset.v); cb(b.dataset.v); uiSound('click'); }; };
  seg('s-gfx', LEVEL, v => { if(v !== LEVEL){ store.set('gfx', v); location.reload(); } });
  seg('s-aim', PL.aimHold ? 'hold' : 'toggle', v => { PL.aimHold = v === 'hold'; store.set('aimHold', PL.aimHold); });
  seg('s-blood', FX.blood, v => { FX.blood = v; store.set('blood', v); });
  seg('s-view', VIEW.mode, v => setView(+v));
  seg('s-fps', store.get('fps', 0), v => { store.set('fps', +v); $('fps').hidden = !+v; });
  seg('s-lang', L.lang, v => { store.set('lang', v); const u = new URL(location.href); u.searchParams.set('lang', v); location.href = u.toString(); });
  const slide = (id, val, fmt, cb) => { const el = $(id), out = $(id + '-v'); el.value = val; out.textContent = fmt(+val); el.oninput = () => { out.textContent = fmt(+el.value); cb(+el.value); }; };
  slide('s-sens', PL.sens, v => v.toFixed(2), v => { PL.sens = v; store.set('sens', v); });
  slide('s-fov', baseFov(), v => String(v), v => store.set('fov', v));
  slide('s-vol', AU.vol, v => String(Math.round(v * 100)), v => setVolume(v));
  $('s-close').onclick = () => { $('settings').hidden = true; if(setFrom === 'pause') $('pause').hidden = false; uiSound('click'); };
}
$('fps').hidden = !store.get('fps', 0);

// ---- main loop ----
let last = performance.now(), frozen = /[?&]freeze/.test(location.search);
function simStep(dt){
  if(G.state !== 'play' || G.paused) return;
  if(G.me && !PL.autopilot) playerInput(dt);
  for(const f of G.fighters) if(f.bot || (f === G.me && PL.autopilot)) botThink(f, dt);
  stepMatch(dt);
}
const pushers = [];
const _pv = new THREE.Vector3();
function frame(dt, raw){
  renderer.info.reset();
  simStep(dt);
  // camera: first person in a match, a slow drift over the meadow in the menu
  if(CAM.free){ const c = CAM.free; camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); camera.fov = vfov(baseFov(), camera.aspect); camera.updateProjectionMatrix(); camera.updateMatrixWorld(); }
  else if((G.state === 'play' || G.state === 'end') && G.me) updateCamera(dt);
  else menuCamera(dt);
  P.aim = G.me && G.state === 'play' ? G.me.adsK : 0;
  for(const C of MODELS.values()) animHero(C, dt, C.f === G.me && ownHidden());
  updateViewmodel(dt);
  pushers.length = 0;
  // fighters push the grass aside; you push a wider circle so blades don't fill the screen
  for(const f of G.fighters) if(f.alive && pushers.length < 16) pushers.push(f === G.me ? { x:f.x, y:f.y, z:f.z, r:0.7 } : f);
  tickNature(dt, pushers);
  // over the shoulder, blades between the camera and your hero thin out so you can see yourself
  const me = G.me;
  if(me && VIEW.mode === 3 && (G.state === 'play' || G.state === 'end') && !CAM.free){ _pv.set(me.x, me.y + me.h * 0.6, me.z); setCamFade(camera.position, _pv, 1.25); }
  else setCamFade(camera.position, camera.position, 0);
  tickTerrain(dt, SUN_DIR, SUN_COL); tickPlants(dt); tickGrass(camera.position);
  stepFx(dt);
  if(G.state === 'play') updateHud(dt);
  shadowFollow(camera.position.x, camera.position.y, camera.position.z);
  renderFrame();
  if(raw !== undefined){ perfWatch(raw, G.state === 'play'); if(!$('fps').hidden) $('fps').textContent = Q.fps + ' FPS'; }
}
function menuCamera(dt){
  CAM.menuT += dt;
  const t = CAM.menuT * 0.035, r = 34 + Math.sin(t * 1.7) * 6;
  camera.position.set(Math.cos(t) * r, 2.4 + Math.sin(t * 2.3) * 0.8, Math.sin(t) * r);
  camera.lookAt(Math.cos(t + 0.5) * 6, 7 + Math.sin(t * 1.3) * 2, Math.sin(t + 0.5) * 6);
  camera.fov = vfov(78, camera.aspect); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
}
function loop(now){
  const raw = Math.min(0.25, (now - last) / 1000); last = now;
  if(!frozen) frame(Math.min(raw, 1 / 20), raw);
  requestAnimationFrame(loop);
}
addEventListener('visibilitychange', () => { if(document.hidden && G.state === 'play') pause(); });

// ---- test hooks ----
window.__mg = {
  start(o = {}){ PL.autopilot = !!o.autopilot; startGame(Object.assign({ noLock:true }, o)); return true; },
  autopilot(b = true){ PL.autopilot = b; },
  // fast-forward the simulation (no rendering) — bots, bullets, the match clock
  sim(sec){ const n = Math.round(sec * 60); for(let i = 0; i < n && G.state === 'play'; i++) simStep(1 / 60); frame(1 / 60); return this.s; },
  tick(dt = 1 / 60){ frame(dt); },
  cam(c){ CAM.free = c; }, freeze(b = true){ frozen = b; },
  get s(){ const M = G.match, me = G.me; return { state:G.state, t:Math.round(G.time), left:M ? Math.round(M.timeLeft) : 0, kills:G.fighters.reduce((a, f) => a + f.kills, 0), me:me ? { k:me.kills, d:me.deaths, alive:me.alive, hp:Math.round(me.hp), w:gun(me).W.id, mag:gun(me).mag, place:me.place } : null, winner:M && M.winner ? M.winner.name : null, why:M && M.why }; },
  info(){ const i = renderer.info; return { calls:i.render.calls, tris:i.render.triangles, geos:i.memory.geometries, tex:i.memory.textures, progs:i.programs ? i.programs.length : 0, blades:GR.count, fps:Q.fps, pr:Q.PR }; },
  bench(n = 30){ const t0 = performance.now(); for(let i = 0; i < n; i++) frame(1 / 60); return (performance.now() - t0) / n; },
  lockLost(){ PL.onLock(false); return !$('pause').hidden; },
  // advance animation only (viewmodel springs, creatures) without drawing
  settle(sec = 0.5){ const n = Math.round(sec * 60); for(let i = 0; i < n; i++){ updateCamera(1 / 60); for(const C of MODELS.values()) animHero(C, 1 / 60, C.f === G.me && ownHidden()); updateViewmodel(1 / 60); } },
  // aim the player at a fighter's chest (or head)
  aimAt(t, head){ const me = G.me, dx = t.x - me.x, dz = t.z - me.z, dy = t.y + (head ? t.h * 0.76 : t.h * 0.42) - (me.y + me.eye);
    PL.yaw = Math.atan2(-dx, -dz); PL.pitch = Math.atan2(dy, Math.hypot(dx, dz)); me.inp.yaw = PL.yaw; me.inp.pitch = PL.pitch; me.yaw = PL.yaw; me.pitch = PL.pitch; },
  // run the match for n frames with only the player acting (bots stand still): fire held or not
  step(n, fire = false, aim = false){ const me = G.me; for(let i = 0; i < n; i++){ me.inp.fire = fire; me.inp.aim = aim; me.inp.yaw = PL.yaw; me.inp.pitch = PL.pitch; stepMatch(1 / 60); } },
  view(v){ setView(v); return VIEW.mode; },
  ground:groundH, toMenu, G, PL, P, Q, WORLD, VMS, scene, camera,
};
boot();
