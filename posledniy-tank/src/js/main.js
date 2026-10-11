// Boot, match flow and the main loop.
import * as THREE from 'three';
import { $, TOUCH, store, shuffle, esc, TAU } from './util.js';
import { renderer, scene, camera, resize, applyQuality, setQuality, render, perfWatch, skyTick, buildEnv, bakeSky, sky, Q } from './engine.js';
import { loadNature } from './assets.js';
import { loadTanks } from './tankmodels.js';
import { renderTankIcons } from './icons.js';
import { buildArena, resetCrates, U, A, segHit, blocksSight } from './arena.js';
import { applyLang, tr, L } from './i18n.js';
import { G, on } from './state.js';
import { HEROES, HERO_IDS } from './heroes.js';
import { effectSamples, makeFighter, removeFighters, spawn, stepFighter, updateShots, updateLobs, updatePuddles, updateBeams, updateFighterVisuals, damage } from './combat.js';
import { makeVisual, animate, setTeamLook, kick, disposeVisual } from './anim.js';
import { newBot, botThink } from './bots.js';
import { buildMine, startSpores, updateSpores, clearSpores } from './mode.js';
import { freeBolt, clearShotFx, updateShotFx, shotFxSamples } from './shotfx.js';
import { applyEnv, pickEnv, updateEnv, envLabel, ENV } from './env.js';
import { BALL, startFootball, updateFootball, clearFootball, footballSamples } from './football.js';
import { ROYALE, startRoyale, updateRoyale, clearRoyale, royaleSamples } from './royale.js';
import { playerInput, updateCamera, updateGuide, CAM, releaseLock, lockHint, resetTouch } from './player.js';
import { makeTag, updateTags, updateHud, feed, announce, tickAnnounce, renderHeroes, showEnd, updateCrateBars } from './hud.js';
import { updateFx, clearFx, explosion, hitSpark, sporeBurst } from './fx.js';
import { preloadSfx, unlockAudio, sfx, AU, setSfx, setMusic } from './audio.js';
import { yaInit, yaLoaded, yaTick, yaInterstitial, YA, onYandex } from './yandex.js';

const MENU = { hero:HEROES[store.get('hero', 'shroom')] ? store.get('hero', 'shroom') : 'shroom', diff:store.get('diff', 'normal'), mode:'br' };   // «Последний танк» has one mode: the royale
const placeText = n => L.lang === 'en' ? `#${n} place` : `#${n} место`;
const NAMES = ['Ржавчик', 'Гаечка', 'Болтик', 'Шестерёнка', 'Бампер', 'Дизель', 'Трактор', 'Поршень', 'Карбюратор', 'Клёпка', 'Броня', 'Пыхтун', 'Громыхало', 'Рычаг', 'Домкрат', 'Тарахтун', 'Буксир', 'Катушка'];

// ---------------- boot ----------------
if(onYandex()) await yaInit(); else applyLang();
const setLoad = k => { $('load-bar').style.width = Math.round(k * 100) + '%'; };
await Promise.all([loadNature(k => setLoad(k * 0.7)), loadTanks(), preloadSfx()]);
setLoad(0.92);
renderTankIcons();
buildArena('maze');
{ const e = pickEnv(); applyEnv(e.sky, e.season); }
buildMine();
applyQuality();
addEventListener('resize', resize);
// warm up: put one of every effect in the scene and compile all shaders now, not during the first fight
{
  const samples = effectSamples().concat(royaleSamples(), footballSamples(), shotFxSamples(HERO_IDS.flatMap(h => [HEROES[h].attack.color, HEROES[h].super.color]))); samples.forEach(m => scene.add(m));
  explosion(0, 0, 1.7); hitSpark(0, 1, 0, '#fff'); sporeBurst(0, 1, 0, '#fff', 4);
  for(const H of HERO_IDS){ const V = makeVisual(H); scene.add(V.root); samples.push(V.root); }
  try{ renderer.compile(scene, camera); }catch(e){}
  samples.forEach(m => scene.remove(m)); clearFx(); G.shake = 0;
}
$('load').hidden = true;

// ---------------- menu ----------------
let preview = null;
function setPreview(id){
  if(preview){ scene.remove(preview.V.root); disposeVisual(preview.V); }
  const V = makeVisual(id); setTeamLook(V, 'me'); scene.add(V.root);
  const s = A.map.id === 'maze' ? { x:0, z:1.2 } : A.spawns[0][1];
  preview = { V, hop:1.2, f:{ id:99, x:s.x, z:s.z - 1.2, vx:0, vz:0, aim:Math.PI, alive:true, atkT:9, supT:0, flash:0, deadT:0, victory:false } };
  V.yaw = V.hullYaw = Math.PI + 0.55; preview.f.aim = Math.PI + 0.25; kick.spawn(V);   // three-quarter view, gun toward the camera
}
function renderMenu(){
  renderHeroes(MENU.hero, id => { MENU.hero = id; store.set('hero', id); sfx('select'); renderMenu(); setPreview(id); });
  for(const b of $('m-diff').querySelectorAll('button')) b.classList.toggle('sel', b.dataset.v === MENU.diff);
  for(const b of $('m-mode').querySelectorAll('.mode-card')) b.classList.toggle('sel', b.dataset.v === MENU.mode);
  $('howto').textContent = tr(TOUCH ? 'Левый палец — бег, правый — поворот камеры. Кнопка атаки: короткое нажатие — автоприцел, с протяжкой — целишься сам. Звезда — супер.' : 'WASD — бег, мышь — камера и прицел, ЛКМ — атака, ПКМ или E — супер, Esc — пауза.');
}
$('m-mode').onclick = e => { const b = e.target.closest('.mode-card'); if(!b || b.dataset.v === MENU.mode) return; MENU.mode = b.dataset.v; store.set('mode', MENU.mode); sfx('select'); renderMenu(); };
$('m-diff').onclick = e => { const v = e.target.dataset.v; if(!v) return; MENU.diff = v; store.set('diff', v); sfx('click'); renderMenu(); };
// ---------------- settings ----------------
const SET = { fps:store.get('fps', false), tod:store.get('tod', 'rand'), season:store.get('season', 'rand') };
function renderSettings(){
  for(const b of $('s-gfx').querySelectorAll('button')) b.classList.toggle('sel', b.dataset.v === Q.level);
  for(const b of $('s-fps').querySelectorAll('button')) b.classList.toggle('sel', (b.dataset.v === '1') === SET.fps);
  for(const b of $('s-tod').querySelectorAll('button')) b.classList.toggle('sel', b.dataset.v === SET.tod);
  for(const b of $('s-season').querySelectorAll('button')) b.classList.toggle('sel', b.dataset.v === SET.season);
  for(const b of $('s-snd').querySelectorAll('button')){ const on = b.dataset.v === 'sfx' ? AU.sfxOn : AU.musicOn; b.classList.toggle('sel', on); b.classList.toggle('off', !on); }
  $('s-sens').value = CAM.sens; $('s-sens-v').textContent = (+CAM.sens).toFixed(2);
  $('fps').hidden = !SET.fps;
}
function openSettings(fromPause){ $('s-gfx-row').hidden = $('s-gfx-note').hidden = !!fromPause; renderSettings(); $('settings').hidden = false; sfx('click'); }
$('m-set').onclick = () => openSettings(false);
$('p-set').onclick = () => openSettings(true);
$('s-close').onclick = () => { $('settings').hidden = true; sfx('click'); };
$('s-gfx').onclick = e => { const v = e.target.dataset.v; if(!v || v === Q.level) return; setQuality(v); sfx('click'); setTimeout(() => location.reload(), 150); };
$('s-fps').onclick = e => { const v = e.target.dataset.v; if(v === undefined) return; SET.fps = v === '1'; store.set('fps', SET.fps); sfx('click'); renderSettings(); };
// time of day and season: picked for the next match (and shown in the menu right away)
$('s-tod').onclick = e => { const v = e.target.dataset.v; if(!v) return; SET.tod = v; store.set('tod', v); sfx('click'); renderSettings(); if(G.state === 'menu'){ const p = pickEnv(); applyEnv(p.sky, p.season); } };
$('s-season').onclick = e => { const v = e.target.dataset.v; if(!v) return; SET.season = v; store.set('season', v); sfx('click'); renderSettings(); if(G.state === 'menu'){ const p = pickEnv(); applyEnv(p.sky, p.season); } };
$('s-snd').onclick = e => { const v = e.target.dataset.v; if(!v) return; unlockAudio(); if(v === 'sfx') setSfx(!AU.sfxOn); else setMusic(!AU.musicOn); sfx('click'); renderSettings(); };
$('s-sens').oninput = e => { CAM.sens = +e.target.value; store.set('sens', CAM.sens); $('s-sens-v').textContent = CAM.sens.toFixed(2); };
renderSettings();
let fpsShown = -1;
function showFps(){ if(!SET.fps || Q.fps === fpsShown) return; fpsShown = Q.fps; const el = $('fps'); el.textContent = Q.fps + ' FPS'; el.className = 'fps' + (Q.fps < 30 ? ' bad' : Q.fps < 50 ? ' mid' : ''); }
$('play').onclick = () => { unlockAudio(); sfx('confirm'); startMatch(); };
function unzoom(){ CAM.zoom = 0; camera.fov = camera.userData.baseFov || 55; camera.updateProjectionMatrix(); }
function showMenu(){
  G.state = 'menu'; G.paused = false; unzoom();
  cleanup();
  $('menu').hidden = false; $('hud').hidden = true; $('end').hidden = true; $('pause').hidden = true;
  renderMenu(); setPreview(MENU.hero);
}
function cleanup(){
  removeFighters(); clearSpores(); clearRoyale(); clearFootball(); clearFx();
  for(const s of G.shots) freeBolt(s.m); G.shots.length = 0; clearShotFx();
  for(const l of G.lobs){ scene.remove(l.m); scene.remove(l.mark); } G.lobs.length = 0;
  for(const p of G.puddles) scene.remove(p.m); G.puddles.length = 0;
  for(const b of G.beams){ scene.remove(b.core); scene.remove(b.outer); } G.beams.length = 0;
  G.match = null;
}

// ---------------- match ----------------
let countT = 0, endT = 0, lastCount = 0;
// each mode has its own map; switching costs one rebuild, replaying the same mode only resets the crates
function useArena(id){
  if(A.map.id !== id){ buildArena(id); buildMine(A.map.mode !== 'ball' && A.map.mode !== 'br'); }
  else resetCrates();
  // every match gets its own time of day and season (or the ones picked in the settings)
  const e = pickEnv(); applyEnv(e.sky, e.season);
}
function startMatch(opts = {}){
  cleanup();
  if(preview){ scene.remove(preview.V.root); preview = null; }
  const mode = G.mode = 'br';
  document.body.classList.toggle('br', mode === 'br');
  if(mode === 'br') return startRoyaleMatch(opts);
  const ball = mode === 'ball';
  // «Споры» is played on either of its two maps
  useArena(ball ? 'pitch' : opts.map || (Math.random() < 0.5 ? 'glade' : 'creek'));
  if(ball) startFootball(); else startSpores();
  const names = shuffle([...NAMES]);
  const myHero = opts.hero || MENU.hero;
  // allies take the heroes you didn't pick; enemies get a random line-up
  const allyHeroes = shuffle(HERO_IDS.filter(h => h !== myHero)).concat(HERO_IDS).slice(0, 2);
  const foeHeroes = shuffle([...HERO_IDS]);
  const team0 = [allyHeroes[0], myHero, allyHeroes[1]];
  for(let team = 0; team < 2; team++) for(let slot = 0; slot < 3; slot++){
    const isMe = team === 0 && slot === 1;
    const hero = team === 0 ? team0[slot] : foeHeroes[slot];
    const f = makeFighter({ name:isMe ? tr('Ты') : tr(names.pop()), team, hero, isMe });
    f.slot = slot; f.gemsPicked = 0;
    if(isMe) G.me = f; else f.bot = newBot(opts.diff || MENU.diff);
  }
  for(const f of G.fighters){ makeTag(f); spawn(f); }
  if(ball) beginMatch('Дождевикбол', 'Закати гриб-дождевик в ворота соперника: 2 гола — победа');
  else beginMatch('Споры', A.map.name + ' · ' + 'Собери 10 спор и удержи их 15 секунд');
}
// «Последний гриб»: ten fighters, each on their own team, spread over the corners of the maze
function startRoyaleMatch(opts){
  useArena('maze');
  startRoyale(); leftShown = 0;
  const names = shuffle([...NAMES]);
  const myHero = opts.hero || MENU.hero;
  const spots = shuffle(A.spawns.ffa.map((s, i) => i));
  for(let i = 0; i < ROYALE.fighters; i++){
    const isMe = i === 0;
    const f = makeFighter({ name:isMe ? tr('Ты') : tr(names.pop()), team:i, hero:isMe ? myHero : HERO_IDS[Math.floor(Math.random() * HERO_IDS.length)], isMe });
    f.slot = spots[i % spots.length]; f.gemsPicked = 0; f.hpMul = ROYALE.hp;
    if(isMe) G.me = f; else f.bot = newBot(opts.diff || MENU.diff);
  }
  for(const f of G.fighters){ makeTag(f); spawn(f); }
  beginMatch('Последний танк', 'Останься последним! Ломай ящики — в них сила');
}
function beginMatch(title, sub){
  const me = G.me;
  CAM.yaw = me.aim; CAM.x = me.x; CAM.z = me.z; CAM.pitch = -0.08; unzoom(); resetTouch();
  // the sniper gets a scope: the right mouse button on a computer (the super moves to E), a button on a phone
  const scope = !!me.H.attack.scope;
  $('b-scope').hidden = !(TOUCH && scope);
  $('sp-keys').textContent = tr(scope ? 'E · Пробел' : 'ПКМ · E');
  G.state = 'countdown'; countT = 3.2; lastCount = 4; endT = 0;
  $('menu').hidden = true; $('end').hidden = true; $('hud').hidden = false;
  $('touch').hidden = !TOUCH; $('superpc').hidden = TOUCH; $('ammopc').hidden = TOUCH; document.body.classList.toggle('touch-on', TOUCH);
  $('lockhint').hidden = TOUCH;
  const br = G.mode === 'br';
  const ball = G.mode === 'ball';
  $('ico0').className = br ? 'shroom-ico' : ball ? 'ball-ico' : 'gem-ico'; $('ico1').className = br ? 'gem-ico gold' : ball ? 'ball-ico' : 'gem-ico';
  announce(title, tr(sub) + ' · ' + tr(envLabel()), 'sun', 2.6);
}
function countdown(dt){
  countT -= dt;
  const n = Math.ceil(countT);
  if(n !== lastCount && n >= 1 && n <= 3){ lastCount = n; announce(String(n), '', 'sun', 0.8); sfx('countdown'); }
  if(countT <= 0){ G.state = 'play'; announce('В бой!', '', 'sun', 1); sfx('start'); }
}
// look at the hero from the front, from whichever side has no hedge in the way
// (in the narrow maze there may be no clear 5 m anywhere: then take the longest gap and move the camera in)
function frontYaw(f){
  let best = f.V.yaw, bs = -1e9; G.endDist = 4.6;
  for(let i = 0; i < 16; i++){
    const d = (i % 2 ? 1 : -1) * Math.ceil(i / 2) * TAU / 16, a = f.V.yaw + d;
    const t = segHit(f.x, f.z, f.x + Math.sin(a) * 5, f.z + Math.cos(a) * 5, blocksSight), len = t < 0 ? 5 : t * 5;
    const sc = len - Math.abs(d) * 0.35;
    if(sc > bs){ bs = sc; best = a; G.endDist = Math.max(1.8, Math.min(4.6, len - 0.4)); }
    if(len >= 5 && Math.abs(d) < 1.3) break;
  }
  return best;
}
function endRoyale(){
  G.state = 'end'; endT = 0;
  const me = G.me, M = G.match, win = M.place === 1;
  G.result = win ? 'win' : 'lose';
  for(const f of G.fighters){ f.inp.mx = f.inp.mz = 0; f.inp.fire = f.inp.sup = false; }
  // the camera visits you if you won, otherwise whoever knocked you out (or anyone still standing)
  const k = me.lastHitBy;
  G.endFocus = win ? me : k && k.alive ? k : G.fighters.filter(f => f.alive).sort((a, b) => b.kills - a.kills)[0] || me;
  G.endYaw = frontYaw(G.endFocus);
  if(win){ me.victory = true; me.aim = G.endYaw; }
  announce(win ? 'Победа!' : placeText(M.place), win ? 'Ты — последний танк!' : '', win ? 'sun' : 'foe', 2.2);
  sfx(win ? 'win' : 'lose');
  releaseLock();
}
function endMatch(team){
  if(G.match && G.match.mode === 'br') return endRoyale();
  G.state = 'end'; endT = 0;
  const me = G.me, res = team < 0 ? 'draw' : team === me.team ? 'win' : 'lose';
  G.result = res;
  for(const f of G.fighters){
    if(team >= 0 && f.team === team){ if(!f.alive) spawn(f, { x:f.x, z:f.z }); f.victory = true; }
    else if(team >= 0) f.defeat = true;
    f.inp.mx = f.inp.mz = 0;
  }
  // the camera visits the best fighter of the winning side (you, if you won)
  const score = f => f.kills * 3 + f.dmgDone / 1500 + (f.gemsPicked || 0) * 0.6;
  G.endFocus = team < 0 || team === me.team ? me : G.fighters.filter(f => f.team === team).sort((a, b) => score(b) - score(a))[0];
  G.endYaw = frontYaw(G.endFocus);
  for(const f of G.fighters) if(f.victory) f.aim = G.endYaw;
  announce(res === 'win' ? 'Победа!' : res === 'lose' ? 'Поражение' : 'Ничья', '', res === 'win' ? 'sun' : res === 'lose' ? 'foe' : 'ally', 2.2);
  sfx(res === 'lose' ? 'lose' : 'win');
  releaseLock();
}
$('e-again').onclick = () => { sfx('confirm'); yaInterstitial(() => startMatch()); };
$('e-menu').onclick = () => { sfx('click'); yaInterstitial(showMenu); };

// ---------------- events → HUD ----------------
const nameOf = f => `<b style="color:${f === G.me ? 'var(--sun)' : f.team === G.me.team ? 'var(--ally)' : 'var(--foe)'}">${esc(f.name)}</b>`;
on('kill', (o, src) => {
  if(!G.me) return;
  if(src && src !== o) feed(nameOf(src) + ' ⚔ ' + nameOf(o), src === G.me ? 'm' : src.team === G.me.team ? 'a' : 'f');
  else if(!src) feed('☁ ' + nameOf(o), 'f');
  if(G.match && G.match.mode === 'br' && o !== G.me && !G.match.over && G.me.alive) announceLeft();
  if(G.state === 'end') return;   // the last knockout already ended the match: keep the result on screen
  if(src === G.me && o !== G.me){ announce('Подбит!', o.name, 'sun', 1.1); sfx('kill'); }
  if(o === G.me) announce('Тебя подбили', src ? src.name : '', 'foe', 1.6);
});
on('pickup', f => { f.gemsPicked = (f.gemsPicked || 0) + 1; });
on('countdownStart', team => { const ours = team === G.me.team; announce(ours ? 'Споры у нас!' : 'Враг набрал споры!', ours ? 'Держитесь 15 секунд' : 'Отберите их!', ours ? 'ally' : 'foe', 1.8); sfx(ours ? 'super_ready' : 'gem_drop'); });
on('countdownStop', () => { if(G.state === 'play') announce('Отсчёт сброшен', '', 'sun', 1.2); });
on('countdownTick', n => { if(n <= 5) sfx('countdown', null, 0.8); });
on('matchOver', team => endMatch(team));
// «Дождевикбол» events
on('goal', (team, scorer) => {
  const ours = team === G.me.team;
  announce(ours ? 'Гол!' : 'Гол соперника', scorer ? scorer.name : '', ours ? 'sun' : 'foe', 2);
  sfx(ours ? 'win' : 'lose', null, 0.6); G.shake = Math.max(G.shake, 0.4);
  if(scorer) feed(nameOf(scorer) + ' ⚽', scorer === G.me ? 'm' : ours ? 'a' : 'f');
});
on('kickoff', () => {
  // everyone back to their spawn, a short countdown, play on
  for(const f of G.fighters){ f.burst = null; spawn(f); }
  if(G.me){ CAM.yaw = G.me.aim; CAM.x = G.me.x; CAM.z = G.me.z; }
  G.state = 'countdown'; countT = 2.2; lastCount = 3;
});
on('golden', () => announce('Золотой гол!', 'Кто забьёт — тот победил', 'sun', 2.2));
on('ballTaken', f => { if(f === G.me) announce('Мяч у тебя', 'Атака — удар или пас, супер — пушечный удар', 'ally', 1.4); });
// «Последний гриб» events
on('fogHurt', (f, amt) => damage(f, amt, null, false, true));
on('fogStart', () => { if(G.state === 'play'){ announce('Туман сгущается!', 'Держись ближе к центру', 'ally', 2); sfx('gem_drop'); } });
on('power', f => { f.gemsPicked = (f.gemsPicked || 0) + 1; });
let leftShown = 0;
// nudges toward playing for the place: hide and let the others thin out
function announceLeft(){
  const n = G.match.alive;
  if(n > 4 || n <= 1 || n === leftShown) return;
  leftShown = n;
  if(n === 4) announce(L.lang === 'en' ? '4 left' : 'Осталось 4 бойца', 'Займи укрытие', 'sun', 1.6);
  else if(n === 3) announce('Ты в топ-3!', 'Пусть другие дерутся первыми', 'sun', 1.6);
  else announce('Финал!', 'Один на один', 'foe', 1.6);
}
// hit marker on the crosshair: a quick white X, red and bigger on a knockout
let hitT = null;
on('hitMarker', kill => {
  const x = $('hitm'); x.classList.remove('hit', 'killhit'); void x.offsetWidth; x.classList.add(kill ? 'killhit' : 'hit');
  clearTimeout(hitT); hitT = setTimeout(() => x.classList.remove('hit', 'killhit'), kill ? 380 : 180);
});
on('superReady', f => { if(f === G.me) sfx('super_ready'); });
on('empty', f => { if(f === G.me) sfx('empty'); });
on('damage', (o, amt, src) => { if(o === G.me) sfx('hurt', null, 0.7); else if(src === G.me) sfx('hit', null, 0.6); });
on('spawn', f => { if(f === G.me && G.state === 'play'){ sfx('respawn'); CAM.yaw = f.team === 0 ? Math.PI : 0; CAM.x = f.x; CAM.z = f.z; } });

// ---------------- pause ----------------
function setPause(p){
  if(G.state !== 'play' && G.state !== 'countdown') p = false;
  G.paused = p; $('pause').hidden = !p;
  if(p){ releaseLock(); resetTouch(); }
}
$('pause-btn').onclick = () => setPause(true);
$('p-resume').onclick = () => { sfx('click'); setPause(false); };
$('p-quit').onclick = () => { sfx('click'); setPause(false); showMenu(); };
addEventListener('keydown', e => { if((e.code === 'Escape' || e.code === 'KeyP') && (G.state === 'play' || G.state === 'countdown')) setPause(!G.paused); });
document.addEventListener('visibilitychange', () => { if(document.hidden && G.state === 'play') setPause(true); });

// ---------------- loop ----------------
const PUSH_R = 0.95, endCam = new THREE.Vector3();
function tick(dt){
  G.time += dt; U.time.value = G.time; skyTick(dt);
  yaTick();
  const live = G.state === 'play' || G.state === 'countdown' || G.state === 'end';
  if(live){
    if(G.state === 'countdown') countdown(dt);
    if((G.state === 'play' || G.state === 'countdown') && G.me && G.me.alive && !G.me.bot && !G.noInput) playerInput(dt);
    for(const f of G.fighters) if(f.bot && G.state === 'play') botThink(f, dt);
    for(const f of G.fighters) stepFighter(f, dt);
    updateShots(dt); updateLobs(dt); updatePuddles(dt); updateBeams(dt); updateShotFx(dt);
    updateSpores(dt, G.time); updateRoyale(dt, G.time); updateFootball(dt, G.time);
    if(G.state === 'end'){ endT += dt; if(endT > 2.6 && $('end').hidden){ showEnd(G.result); $('hud').hidden = true; } }
  }
  updateFighterVisuals(dt, G.time);
  // grass bends away from everyone walking through it
  let n = 0;
  for(const f of G.fighters) if(f.alive && n < U.push.value.length) U.push.value[n++].set(f.x, f.z, PUSH_R);
  if(preview && n < U.push.value.length) U.push.value[n++].set(preview.f.x, preview.f.z, PUSH_R);
  for(; n < U.push.value.length; n++) U.push.value[n].set(0, 0, 0);
  if(G.me && G.me.alive && G.state !== 'menu') U.me.value.set(G.me.x, G.me.z, 2.2); else U.me.value.set(0, 0, 0);
  // camera
  if(G.dbgCam){ camera.position.set(G.dbgCam[0], G.dbgCam[1], G.dbgCam[2]); camera.lookAt(G.dbgCam[3], G.dbgCam[4], G.dbgCam[5]); }
  else if(G.state === 'menu' && preview){
    const p = preview, f = p.f;
    p.hop -= dt; f.victory = p.hop > 0; f.supT += dt;
    animate(p.V, f, dt, G.time);
    const off = innerWidth / innerHeight > 1.3 ? 0.35 : 0;
    camera.position.set(f.x + off * 1.5, 1.55, f.z - 4.4);
    camera.lookAt(f.x + off, 0.75, f.z);
  } else if(G.state === 'end' && G.me){
    const f = G.endFocus || G.me, a = G.endYaw + Math.sin(G.time * 0.3) * 0.35;
    const ed = G.endDist || 4.6;
    endCam.set(f.x + Math.sin(a) * ed, 2.7 + (4.6 - ed) * 0.35, f.z + Math.cos(a) * ed);
    camera.position.lerp(endCam, 1 - Math.exp(-dt * 2.5));
    camera.lookAt(f.x, 0.8, f.z);
  } else if(G.me) updateCamera(dt);
  updateGuide(); lockHint();
  updateFx(dt); updateEnv(dt, G.time);
  updateTags(); updateCrateBars();
  if(G.state !== 'menu') updateHud();
  tickAnnounce(dt);
  sky.position.copy(camera.position);
}
let last = performance.now();
function frame(now){
  const raw = (now - last) / 1000; last = now;
  let dt = Math.min(0.05, raw);
  if(G.state === 'end' && endT < 1.2) dt *= 0.4;
  if(!G.paused && !YA.adOn) tick(dt);
  perfWatch(raw, G.state === 'play');
  showFps();
  render();
  requestAnimationFrame(frame);
}

showMenu();
yaLoaded();
requestAnimationFrame(frame);

// ---------------- test hooks (used by tools/test.mjs) ----------------
window.__bg = {
  start(o = {}){ if(o.hero) MENU.hero = o.hero; if(o.diff) MENU.diff = o.diff; if(o.mode) MENU.mode = o.mode; startMatch(o); if(o.skipCount){ countT = 0; G.state = 'play'; } },
  autopilot(on){ if(G.me) G.me.bot = on ? newBot('normal') : null; },
  sim(sec, step = 1 / 30){ const n = Math.round(sec / step); for(let i = 0; i < n; i++){ tick(step); if(G.state === 'end' && endT > 3) break; } },
  get s(){ const M = G.match; return { state:G.state, mode:M && M.mode, t:M && +M.t.toFixed(1), count:M && [...M.count], alive:M && M.alive, place:M && M.place, fog:M && M.fog && +M.fog.r.toFixed(1), cd:M && M.cd && { team:M.cd.team, t:+M.cd.t.toFixed(1) }, over:M && M.over, winner:M && M.winner, why:M && M.why, pickups:G.pickups.length,
    me:G.me && { hp:Math.round(G.me.hp), alive:G.me.alive, x:+G.me.x.toFixed(1), z:+G.me.z.toFixed(1), gems:G.me.gems, charge:+G.me.charge.toFixed(2), ammo:+G.me.ammo.toFixed(2) } }; },
  board:() => G.fighters.map(f => `${f.name}[${f.hero}/t${f.team}] k${f.kills} d${f.deaths} g${f.gemsPicked} dmg${Math.round(f.dmgDone)}`),
  fighters:() => G.fighters, G, A, CAM, menu:MENU, showMenu, cam(a){ G.dbgCam = a; },
  env(sky, season){ applyEnv(sky, season); }, get envNow(){ return { ...ENV }; },
  info:() => ({ calls:renderer.info.render.calls, tris:renderer.info.render.triangles, geos:renderer.info.memory.geometries, tex:renderer.info.memory.textures, progs:renderer.info.programs.length, PR:Q.PR, post:Q.post }),
  post(v){ Q.post = !!v && !!Q.composer; Q.noPost = !v; },
  pause:setPause, tr, L, tick, dmg:damage,
  // frame-time benchmark for tools: n frames of game update + render, waiting for the GPU each frame
  bench(n = 60, pr){ if(pr){ renderer.setPixelRatio(pr); resize(); } const gl = renderer.getContext(), t0 = performance.now(); const px = new Uint8Array(4); for(let i = 0; i < n; i++){ tick(1 / 60); render(); gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); } return (performance.now() - t0) / n; }
};
window.__bgReady = true;
