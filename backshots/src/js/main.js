// Boot, menu, settings, a new floor plan for every match, the match flow, the main loop and the test hooks (window.__bs).
import * as THREE from 'three';
import { renderer, camera, applyQuality, Q, WEBGL2, perfWatch, vfov, baseFov, LEVEL, bakeEnv } from './engine.js';
import { initPost, renderFrame, P } from './post.js';
import { buildLevel } from './level/check.js';
import { bakeLight } from './level/lights.js';
import { loadLevelTex, buildLevelMeshes, LV } from './level/build.js';
import { initLamps, updateLamps, flickerK } from './level/lamps.js';
import { initReflect, REFL } from './level/reflect.js';
import { setLevel, PW, losClear } from './phys.js';
import { buildNav, NAV } from './nav.js';
import { G, on } from './state.js';
import { startMatch, stepMatch, standings } from './match.js';
import { botThink, botReset } from './bots.js';
import { gun, LOOKS } from './fighter.js';
import { PL, playerInput, updateCamera, requestLock, resetView } from './player.js';
import { initViewmodel, updateViewmodel, setRig, VMS } from './viewmodel.js';
import { loadSoldiers, buildSoldier, animSoldier, disposeSoldier } from './soldiers.js';
import { loadGuns } from './gunmodels.js';
import { loadProps, placeProps } from './props.js';
import { loadLootModels, updateLootView, clearLootView } from './lootview.js';
import { LOOT, takeLoot } from './loot.js';
import { Z } from './zone.js';
import { buildMinimap, toggleBigMap } from './minimap.js';
import { initPhysics, buildPhysics, stepPhysics, makeRagdoll, dropRagdoll, segCentres, PH } from './physics.js';
import { initFx, stepFx, clearFx, bloodPool, FX } from './fx.js';
import { initAudio, resumeAudio, startAmbience, updateAmbience, setVolume, uiSound, AU } from './audio.js';
import { initHud, updateHud, showBoard, boardHTML, announce, setLandmarks } from './hud.js';
import { L as LANG, applyLang, tr } from './i18n.js';
import { $, store, esc } from './util.js';

const setLoad = (k, t) => { $('load-bar').style.width = Math.round(k * 100) + '%'; if(t) $('load-txt').textContent = tr(t); };
const MENU = { count:store.get('count', 20), diff:store.get('diff', 'normal'), look:store.get('look', LOOKS[0]) };
const CAM = { free:null, menuT:0 };
const yieldFrame = () => new Promise(r => setTimeout(r, 0));

async function boot(){
  renderer.info.autoReset = false;
  if(!WEBGL2){ $('nogl').hidden = false; $('load').hidden = true; return; }
  applyLang();
  applyQuality(); bakeEnv(); initPost(); initReflect();
  setLoad(0.08, 'Гудят лампы…'); await yieldFrame();
  await Promise.all([initPhysics().catch(e => console.warn('physics off', e)), loadLevelTex()]);
  setLoad(0.3, 'Офисные работники ищут выход…'); await yieldFrame();
  await loadGuns(); await loadSoldiers(k => setLoad(0.3 + k * 0.4));
  setLoad(0.75, 'Расставляем мебель…'); await Promise.all([loadProps(), loadLootModels()]);
  initLamps(); initViewmodel(); initFx(); initHud();
  buildMenu();
  await newFloor(Number(new URLSearchParams(location.search).get('seed')) || randSeed());
  setLoad(1, '');
  $('load').classList.add('off');
  showMenu();
  window.__bsReady = true;
  requestAnimationFrame(loop);
}
const randSeed = () => (Math.random() * 1e9) >>> 0;

// ---- a floor plan: plan, light, meshes, props, physics ----
async function newFloor(seed){
  const L = buildLevel(seed); bakeLight(L);
  G.level = L; setLevel(L); buildNav();
  buildLevelMeshes(L);
  const props = placeProps(L);
  buildPhysics(L, props);
  setLandmarks(L.landmarks);
  buildMinimap(L);
  $('seed').textContent = tr('Этаж № ') + seed;
  CAM.menuT = 0;
  return L;
}

// ---- menu ----
function buildMenu(){
  const seg = (el, key) => { const upd = () => { for(const b of el.querySelectorAll('button')) b.classList.toggle('on', b.dataset.v === String(MENU[key])); };
    for(const b of el.querySelectorAll('button')) b.onclick = () => { MENU[key] = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v; store.set(key, MENU[key]); uiSound('click'); upd(); }; upd(); };
  seg($('m-count'), 'count'); seg($('m-diff'), 'diff');
  const gseg = $('m-gfx'); for(const b of gseg.querySelectorAll('button')){ b.classList.toggle('on', b.dataset.v === LEVEL); b.onclick = () => { if(b.dataset.v !== LEVEL){ store.set('gfx', b.dataset.v); location.reload(); } }; }
  $('play').onclick = () => { uiSound('click'); startGame(); };
  $('m-set').onclick = () => openSettings('menu');
  $('p-resume').onclick = resume; $('p-set').onclick = () => openSettings('pause'); $('p-quit').onclick = toMenu;
  $('d-again').onclick = () => startGame(); $('d-menu').onclick = toMenu;
  $('e-again').onclick = () => { $('end').hidden = true; startGame(); }; $('e-menu').onclick = toMenu;
  for(const b of document.querySelectorAll('button')) b.addEventListener('pointerenter', () => uiSound('hover'));
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
// the wet-floor reflection leaves out fighters farther than 15 m
REFL.hide.push(on => { for(const H of MODELS.values()) if(H.dist > 15){ if(on){ H.wasVis = H.root.visible; H.root.visible = false; } else H.root.visible = H.wasVis; } });
let usedFloor = false;
async function startGame(o = {}){
  for(const H of MODELS.values()){ dropRagdoll(H); disposeSoldier(H); }
  MODELS.clear(); clearFx();
  // every match on a new floor (the menu's floor is used for the first one)
  if(usedFloor || o.seed){ $('gen').hidden = false; await yieldFrame(); await newFloor(o.seed || randSeed()); $('gen').hidden = true; }
  usedFloor = true;
  clearLootView();
  startMatch(Object.assign({ count:MENU.count, diff:MENU.diff, look:MENU.look }, o));
  for(const f of G.fighters){ botReset(f); f.model = buildSoldier(f); MODELS.set(f, f.model); }
  setRig(G.me.look, gun(G.me).W.id);
  VMS.shown = true;
  $('menu').hidden = true; $('end').hidden = true; $('pause').hidden = true; $('hud').hidden = false; $('dead').hidden = true;
  showBoard(false); toggleBigMap(false);
  resetView(G.me);
  resumeAudio(); startAmbience();
  if(!o.noLock) requestLock();
  announce('Последний выживший', tr('Бойцов: ') + G.fighters.length + tr(' · найди выход или останься один'), 3.5);
}
on('matchEnd', M => {
  if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){}
  const me = G.me, win = M.winner === me;
  setTimeout(() => {
    if(G.state !== 'end') return;
    $('e-title').textContent = tr(win ? 'Победа!' : me.place + '-е место');
    $('e-sub').textContent = win ? tr('Ты остался один в закулисье.') : tr('Победил ') + M.winner.name + ' · ' + M.winner.kills + tr(' убийств');
    const acc = me.shotsFired ? Math.round(me.shotsHit / me.shotsFired * 100) : 0;
    $('e-stats').innerHTML = [[me.kills, 'убийств'], [me.dmgDone, 'урона'], [me.heads, 'в голову'], [acc + '%', 'точность']].map(([v, n]) => `<div><b>${v}</b><span>${esc(tr(n))}</span></div>`).join('');
    $('e-board').innerHTML = boardHTML();
    $('end').hidden = false; $('hud').hidden = true;
  }, 1800);
});
// dead: free the mouse so the buttons on the death card can be clicked
on('kill', t => { if(t === G.me && !PL.autopilot) setTimeout(() => { if(G.me === t && document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){} }, 1500); });
on('shot', (f, traces) => { f.shotsFired = (f.shotsFired || 0) + 1; if(traces.some(t => t.hit === 'fighter')) f.shotsHit = (f.shotsHit || 0) + 1; });

function toMenu(){
  G.state = 'menu'; G.paused = false;
  for(const H of MODELS.values()){ dropRagdoll(H); disposeSoldier(H); } MODELS.clear(); clearFx();
  clearLootView(); LOOT.items.length = 0; Z.on = false;
  G.fighters.length = 0; G.me = null;
  if(document.exitPointerLock) try{ document.exitPointerLock(); }catch(e){}
  $('dead').hidden = true; toggleBigMap(false);
  showMenu();
}
function pause(){ if(G.state !== 'play' || PL.autopilot || (G.me && !G.me.alive)) return; G.paused = true; $('pause').hidden = false; showBoard(false); }
function resume(){ $('pause').hidden = true; $('settings').hidden = true; G.paused = false; requestLock(); }
PL.onLock = locked => { if(!locked && G.state === 'play' && !PL.autopilot && !G.paused) pause(); };
addEventListener('keydown', e => {
  if(e.code === 'Tab' && G.state === 'play'){ e.preventDefault(); showBoard(true); }
  if(e.code === 'KeyM' && G.state === 'play' && !e.repeat) toggleBigMap($('bigmap').hidden);
  if(e.code === 'Escape' && G.state === 'play' && G.paused && !PL.locked && $('settings').hidden) resume();
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
  seg('s-fps', store.get('fps', 1), v => { store.set('fps', +v); $('fps').hidden = !+v; });
  seg('s-lang', LANG.lang, v => { store.set('lang', v); const u = new URL(location.href); u.searchParams.set('lang', v); location.href = u.toString(); });
  const slide = (id, val, fmt, cb) => { const el = $(id), out = $(id + '-v'); el.value = val; out.textContent = fmt(+val); el.oninput = () => { out.textContent = fmt(+el.value); cb(+el.value); }; };
  slide('s-sens', PL.sens, v => v.toFixed(2), v => { PL.sens = v; store.set('sens', v); });
  slide('s-fov', baseFov(), v => String(v), v => store.set('fov', v));
  slide('s-vol', AU.vol, v => String(Math.round(v * 100)), v => setVolume(v));
  $('s-close').onclick = () => { $('settings').hidden = true; if(setFrom === 'pause') $('pause').hidden = false; uiSound('click'); };
}
$('fps').hidden = !store.get('fps', 1);

// ---- main loop ----
let last = performance.now(), frozen = /[?&]freeze/.test(location.search);
function simStep(dt){
  if(G.state !== 'play' || G.paused) return;
  if(G.me && !PL.autopilot) playerInput(dt);
  for(const f of G.fighters) if(f.bot || (f === G.me && PL.autopilot)) botThink(f, dt);
  stepMatch(dt);
}
// the fallen: the death clip plays, then physics takes the body (at once if a wall is right behind)
function deaths(dt){
  for(const H of MODELS.values()){
    const f = H.f; if(f.alive || H.rag){ if(H.rag && H.rag.t !== undefined){ H.rag.t += dt; if(!H.pooled && H.rag.t > 2.2 && H.rag.bodies){ H.pooled = true; const t = H.rag.bodies.pelvis.body.translation(); bloodPool(t.x, t.z); } } continue; }
    if(!PH.world || !H.root.visible) continue;
    if(H.handoff === undefined){
      const o = f.lastHit, dx = o && o.dir ? o.dir.x : 0, dz = o && o.dir ? o.dir.z : 0, dl = Math.hypot(dx, dz) || 1;
      let near = false; for(const r of [0.5, 0.9, 1.3]){ const i = PW.L.ci(f.x + dx / dl * r), k = PW.L.ck(f.z + dz / dl * r); if(PW.L.g[k * PW.L.W + i] === 1 || PW.L.g[k * PW.L.W + i] === 2){ near = true; break; } }
      H.handoff = near ? 0.08 : o && o.head ? 0.45 : 0.7;
    }
    if(H.deathT !== undefined && H.deathT >= H.handoff){ makeRagdoll(H, H.push); }
  }
}
function frame(dt, raw){
  renderer.info.reset();
  simStep(dt);
  if(CAM.free){ const c = CAM.free; camera.position.set(c[0], c[1], c[2]); camera.lookAt(c[3], c[4], c[5]); camera.fov = vfov(baseFov(), camera.aspect); camera.updateProjectionMatrix(); camera.updateMatrixWorld(); }
  else if((G.state === 'play' || G.state === 'end') && G.me) updateCamera(dt);
  else menuCamera(dt);
  P.aim = G.me && G.state === 'play' ? G.me.adsK : 0;
  const me = G.me;
  const cx = camera.position.x, cz = camera.position.z;
  for(const H of MODELS.values()){
    // far fighters: animated a few times a second, no shadows; near ones every frame
    const d = Math.hypot(H.f.x - cx, H.f.z - cz), near = d < 22;
    H.dist = d; H.acc = (H.acc || 0) + dt;
    if(!near && H.f.alive && (H.skip = ((H.skip || 0) + 1) % 3)) continue;
    const step = H.acc; H.acc = 0;
    if(!H.f.alive && !H.rag && H.dying){ H.prevSeg = segCentres(H); H.segDt = step; }
    animSoldier(H, step, H.f === me && me.alive);
    const cast = d < 14;
    if(H.cast !== cast){ H.cast = cast; H.root.traverse(m => { if(m.isMesh) m.castShadow = cast; }); }
  }
  deaths(dt);
  stepPhysics(dt);
  updateViewmodel(dt);
  updateLamps(dt);
  stepFx(dt);
  updateLootView(dt);
  if(G.level) updateAmbience(dt, G.level.lamps, l => flickerK(l, G.time + performance.now() * 0.0003));
  LV.uni.time.value += dt;
  if(G.state === 'play' || G.state === 'end') updateHud(dt);
  renderFrame(dt);
  if(raw !== undefined){ perfWatch(raw, G.state === 'play'); if(!$('fps').hidden) $('fps').textContent = Q.fps + ' FPS'; }
}
// the menu: a slow walk down the corridors of this floor
function menuCamera(dt){
  CAM.menuT += dt;
  const L = G.level; if(!L) return;
  if(!CAM.path || CAM.pi >= CAM.path.length){
    const a = NAV.nodes[Math.floor(Math.random() * NAV.nodes.length)], b = NAV.nodes[Math.floor(Math.random() * NAV.nodes.length)];
    CAM.path = [a, b]; CAM.pi = 1; CAM.pos = new THREE.Vector3(a[0], 1.6, a[1]); CAM.look = new THREE.Vector3(b[0], 1.5, b[1]);
    import('./nav.js').then(m => { const p = m.findPath(a[0], a[1], b[0], b[1]); if(p) CAM.path = [a, ...p]; });
  }
  const t = CAM.path[CAM.pi], dx = t[0] - CAM.pos.x, dz = t[1] - CAM.pos.z, d = Math.hypot(dx, dz);
  if(d < 0.5) CAM.pi++; else { CAM.pos.x += dx / d * dt * 1.1; CAM.pos.z += dz / d * dt * 1.1; }
  CAM.look.lerp(new THREE.Vector3(t[0], 1.45, t[1]), Math.min(1, dt * 0.8));
  camera.position.set(CAM.pos.x, 1.62 + Math.sin(CAM.menuT * 2.2) * 0.012, CAM.pos.z);
  camera.lookAt(CAM.look);
  camera.fov = vfov(80, camera.aspect); camera.updateProjectionMatrix(); camera.updateMatrixWorld();
}
function loop(now){
  const raw = Math.min(0.25, (now - last) / 1000); last = now;
  if(!frozen) frame(Math.min(raw, 1 / 20), raw);
  requestAnimationFrame(loop);
}
addEventListener('visibilitychange', () => { if(document.hidden && G.state === 'play') pause(); });

// ---- test hooks ----
window.__bs = {
  async start(o = {}){ PL.autopilot = !!o.autopilot; await startGame(Object.assign({ noLock:true }, o)); return true; },
  autopilot(b = true){ PL.autopilot = b; },
  sim(sec){ const n = Math.round(sec * 60); for(let i = 0; i < n && G.state === 'play'; i++) simStep(1 / 60); frame(1 / 60); return this.s; },
  tick(dt = 1 / 60){ frame(dt); },
  cam(c){ CAM.free = c; }, freeze(b = true){ frozen = b; },
  get s(){ const M = G.match, me = G.me; return { state:G.state, t:Math.round(G.time), alive:M ? M.alive : 0, kills:G.fighters.reduce((a, f) => a + f.kills, 0), me:me ? { k:me.kills, alive:me.alive, hp:Math.round(me.hp), mag:gun(me).mag, place:me.place } : null, winner:M && M.winner ? M.winner.name : null, why:M && M.why, seed:G.level && G.level.seed }; },
  info(){ const i = renderer.info; return { calls:i.render.calls, tris:i.render.triangles, geos:i.memory.geometries, tex:i.memory.textures, progs:i.programs ? i.programs.length : 0, fps:Q.fps, pr:Q.PR, rags:PH.rags.length, props:PH.props.length }; },
  bench(n = 30){ const t0 = performance.now(); for(let i = 0; i < n; i++) frame(1 / 60); return (performance.now() - t0) / n; },
  lockLost(){ PL.onLock(false); return !$('pause').hidden; },
  settle(sec = 0.5){ const n = Math.round(sec * 60); for(let i = 0; i < n; i++){ updateCamera(1 / 60); for(const H of MODELS.values()) animSoldier(H, 1 / 60, H.f === G.me && G.me.alive); updateViewmodel(1 / 60); } },
  aimAt(t, head){ const me = G.me, dx = t.x - me.x, dz = t.z - me.z, dy = t.y + (head ? t.h * 0.93 : t.h * 0.66) - (me.y + me.eye);
    PL.yaw = Math.atan2(-dx, -dz); PL.pitch = Math.atan2(dy, Math.hypot(dx, dz)); me.inp.yaw = PL.yaw; me.inp.pitch = PL.pitch; me.yaw = PL.yaw; me.pitch = PL.pitch; },
  step(n, fire = false, aim = false){ const me = G.me; for(let i = 0; i < n; i++){ me.inp.fire = fire; me.inp.aim = aim; me.inp.yaw = PL.yaw; me.inp.pitch = PL.pitch; stepMatch(1 / 60); } },
  newFloor, toMenu, G, PL, P, Q, PH, VMS, MODELS, camera, standings, LOOT, Z, takeLoot, losClear, bigMap:toggleBigMap,
};
boot();
