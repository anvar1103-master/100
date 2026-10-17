// The heroes: ready-made cartoon adventurers and skeletons (KayKit, CC0) on one shared skeleton, so every animation
// fits every hero. Each fighter gets its own copy with an animation mixer: the legs play the walk/run/strafe/crouch/jump
// cycles that match how it moves, the upper body holds the gun (aim, reload, sprint carry), the spine bends to the
// aim pitch, recoil and hit flinches are added on top, and a death clip plays when it falls. The blaster sits in the
// right hand slot of the skeleton.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { scene } from './engine.js';
import { loadGLB } from './assets.js';
import { buildGun } from './gunmodels.js';
import { G, on } from './state.js';
import { gun, H_STAND } from './fighter.js';
import { clamp, damp, angDiff, sp, spring } from './util.js';

export { HEROES, HERO_IDS } from './fighter.js';
import { HEROES, HERO_IDS } from './fighter.js';

// the rig is ~2.27 tall to the top of the head; fighters are H_STAND tall
const RIG_H = 2.27;
export const HERO_SCALE = H_STAND / RIG_H;
const GUN_SCALE = 1.0;          // blasters at their own size next to a 1.7-tall hero
const LOWER = new Set(['root', 'hips', 'upperlegl', 'lowerlegl', 'footl', 'toesl', 'upperlegr', 'lowerlegr', 'footr', 'toesr']);

const T = { tpl:{}, clips:{}, mounts:{}, ready:false };
// the aiming clips start by raising the gun; the game holds them at a moment where the gun is up and still
const AIM_T = 0.8;
// a clip cut down to the lower body or the upper body (by bone)
function part(clip, lower){
  const tracks = clip.tracks.filter(t => { const b = t.name.split('.')[0]; return lower ? LOWER.has(b) : !LOWER.has(b); })
    // the hips carry the walk's bob and sway but not the clip's own turning or drifting
    .filter(t => !(t.name === 'root.position' || t.name === 'root.quaternion'));
  return new THREE.AnimationClip(clip.name + (lower ? '_lo' : '_up'), clip.duration, tracks);
}
function full(clip){ return new THREE.AnimationClip(clip.name, clip.duration, clip.tracks.filter(t => t.name !== 'root.position')); }

export async function loadHeroes(progress){
  const an = await loadGLB('assets/models/anims.glb');
  const byName = n => an.animations.find(a => a.name === n);
  const C = T.clips;
  for(const [k, n] of [['idle', 'Idle_A'], ['run', 'Running_A'], ['back', 'Walking_Backwards'], ['left', 'Running_Strafe_Left'], ['right', 'Running_Strafe_Right'],
    ['crouch', 'Crouching'], ['sneak', 'Sneaking'], ['air', 'Jump_Idle'], ['sprint', 'Running_HoldingRifle']]) C[k + '_lo'] = part(byName(n), true);
  for(const [k, n] of [['aim2', 'Ranged_2H_Aiming'], ['aim1', 'Ranged_1H_Aiming'], ['reload2', 'Ranged_2H_Reload'], ['reload1', 'Ranged_1H_Reload'], ['sprint', 'Running_HoldingRifle']]) C[k + '_up'] = part(byName(n), false);
  for(const [k, n] of [['deathA', 'Death_A'], ['deathB', 'Death_B'], ['cheer', 'Cheering'], ['wave', 'Waving'], ['idleFull', 'Idle_B']]) C[k] = full(byName(n));
  let i = 0;
  await Promise.all(HERO_IDS.map(async id => {
    const g = await loadGLB(`assets/models/heroes/${id}.glb`);
    const o = g.scene;
    o.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; if(m.material.map) m.material.map.anisotropy = 4; m.material.roughness = 0.85; m.material.metalness = 0; } });
    T.tpl[id] = o;
    if(progress) progress(++i / HERO_IDS.length);
  }));
  // where the gun sits in the hand: solved once from the aiming poses, so the barrel points straight ahead
  const probe = cloneSkinned(T.tpl.ranger), mx = new THREE.AnimationMixer(probe), bones = boneMap(probe);
  probe.scale.setScalar(HERO_SCALE);
  // (posed the way the game poses it: legs from the idle, arms from the aim)
  for(const [kind, clip] of [['2h', C.aim2_up], ['1h', C.aim1_up]]){
    mx.stopAllAction(); mx.clipAction(C.idle_lo).play(); const a = mx.clipAction(clip); a.play(); a.time = AIM_T; mx.update(0); probe.updateMatrixWorld(true);
    const hs = bones.handslotr.matrixWorld, hp = new THREE.Vector3().setFromMatrixPosition(hs);
    // the model faces +z: the gun's barrel (its -z) turns to +z, its top stays up
    const want = new THREE.Matrix4().compose(hp, new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI), new THREE.Vector3(GUN_SCALE, GUN_SCALE, GUN_SCALE));
    T.mounts[kind] = new THREE.Matrix4().copy(hs).invert().multiply(want);
  }
  T.ready = true;
}
function boneMap(o){ const b = {}; o.traverse(n => { if(n.isBone) b[n.name] = n; }); return b; }

// ---- one fighter's model ----
export function buildHero(f, parent = scene){
  const id = HEROES[f.hero] ? f.hero : 'ranger';
  const root = new THREE.Group(), model = cloneSkinned(T.tpl[id]);
  model.scale.setScalar(HERO_SCALE);
  root.add(model);
  // own material copy, so the hit flash reddens only this fighter
  const mats = new Map(), meshes = [];
  model.traverse(m => { if(m.isMesh){ if(!mats.has(m.material)) mats.set(m.material, m.material.clone()); m.material = mats.get(m.material); meshes.push(m); } });
  const bones = boneMap(model);
  // both guns are in the hand; the one not in use is hidden
  const guns = {};
  for(const gid of [f.primary, 'comb']){
    if(guns[gid]) continue;
    const g = buildGun(gid, false), mount = new THREE.Group();
    mount.matrixAutoUpdate = false;
    mount.add(g.root); bones.handslotr.add(mount);
    g.root.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; } });
    guns[gid] = { g, mount };
  }
  const mixer = new THREE.AnimationMixer(model), A = {};
  for(const k in T.clips){ const a = mixer.clipAction(T.clips[k]); a.enabled = true; a.setEffectiveWeight(0); a.play(); A[k] = a; }
  for(const k of ['deathA', 'deathB', 'cheer', 'wave']){ A[k].stop(); A[k].setLoop(THREE.LoopOnce, 1); A[k].clampWhenFinished = true; }
  for(const k of ['aim2_up', 'aim1_up']){ A[k].time = AIM_T; A[k].paused = true; }
  A.reload2_up.setLoop(THREE.LoopOnce, 1); A.reload1_up.setLoop(THREE.LoopOnce, 1); A.reload2_up.clampWhenFinished = A.reload1_up.clampWhenFinished = true;
  parent.add(root);
  const H = { f, root, model, bones, meshes, mats:[...mats.values()], guns, mixer, A, W:{}, bodyYaw:f.yaw, flash:0, kick:sp(), flinch:sp(), deadK:0, dying:null,
    hidden:false, end:null, lastReload:null };
  for(const k in A) H.W[k] = 0;
  return H;
}
export function disposeHero(H){
  if(H.root.parent) H.root.parent.remove(H.root);
  H.mixer.stopAllAction(); H.mixer.uncacheRoot(H.model);
  for(const m of H.mats) m.dispose();
}

const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _v = new THREE.Vector3(), _ax = new THREE.Vector3();
// turn a bone by `ang` around a world-space axis (after the animation has posed it)
function turnBone(b, axis, ang){
  if(!ang) return;
  b.parent.getWorldQuaternion(_q2);
  _v.copy(axis).applyQuaternion(_q2.invert());
  _q.setFromAxisAngle(_v, ang);
  b.quaternion.premultiply(_q);
}

// the gun in the hand and where its muzzle is (world space)
export function heroMuzzle(H, out){
  const e = H.guns[gun(H.f).W.id]; if(!e) return out.set(H.f.x, H.f.y + 1.2, H.f.z);
  return e.g.muzzle.getWorldPosition(out);
}

export function animHero(H, dt, hide){
  const f = H.f, A = H.A, Wt = H.W;
  const vis = (f.alive || f.deadT < 3.2) && !hide;
  H.root.visible = vis;
  if(!vis) return;
  const g = gun(f), W = g.W, oneH = W.id === 'comb';
  // ---- which gun is in the hand ----
  for(const gid in H.guns){ const e = H.guns[gid]; e.g.root.visible = gid === W.id && f.alive; e.mount.matrix.copy(T.mounts[gid === 'comb' ? '1h' : '2h']); e.mount.matrixWorldNeedsUpdate = true; }
  // ---- facing: the body turns to the aim (the legs strafe underneath) ----
  const hs = Math.hypot(f.vx, f.vz);
  if(f.alive) H.bodyYaw += angDiff(H.bodyYaw, f.yaw) * Math.min(1, dt * 14);
  H.root.position.set(f.x, f.y, f.z);
  H.root.rotation.set(0, H.bodyYaw + Math.PI, 0);
  // ---- target weights ----
  const want = {};
  for(const k in A) want[k] = 0;
  const end = G.state === 'end' && G.match && G.match.winner === f;
  if(!f.alive){
    if(!H.dying){ H.dying = Math.random() < 0.5 ? 'deathA' : 'deathB'; A[H.dying].reset().play(); }
    want[H.dying] = 1;
  } else if(end){
    if(!H.end){ H.end = 'cheer'; A.cheer.reset().setLoop(THREE.LoopRepeat, Infinity).play(); }
    want.cheer = 1;
  } else {
    if(H.dying){ A[H.dying].stop(); H.dying = null; }
    H.end = null;
    // legs: forward/back/side mix by how it moves relative to where it faces
    const fx = -Math.sin(H.bodyYaw), fz = -Math.cos(H.bodyYaw);
    const fwd = (f.vx * fx + f.vz * fz), side = (f.vx * -fz + f.vz * fx);       // side > 0: moving to its right
    const crouch = f.crouchK > 0.5, sprint = f.sprintT > 0.05;
    H.airT = f.ground ? 0 : (H.airT || 0) + dt;
    if(H.airT > 0.12){ want.air_lo = 1; }
    else if(hs < 0.35){ want[crouch ? 'crouch_lo' : 'idle_lo'] = 1; }
    else if(crouch){ want.sneak_lo = 1; }
    else if(sprint){ want.sprint_lo = 1; }
    else {
      const s = Math.max(hs, 1e-3);
      want.run_lo = Math.max(0, fwd) / s; want.back_lo = Math.max(0, -fwd) / s;
      want.right_lo = Math.max(0, side) / s; want.left_lo = Math.max(0, -side) / s;
      // a gentle shuffle when barely moving
      if(hs < 1.2){ const k = hs / 1.2; for(const n of ['run_lo', 'back_lo', 'left_lo', 'right_lo']) want[n] *= k; want.idle_lo = 1 - k; }
    }
    // upper body: sprint carry, reload, or the gun up
    if(sprint && !f.reload) want.sprint_up = 1;
    else if(f.reload){
      const k = oneH ? 'reload1_up' : 'reload2_up';
      if(H.lastReload !== f.reload){ H.lastReload = f.reload; const a = A[k]; a.reset(); a.setEffectiveTimeScale(a.getClip().duration / Math.max(0.3, reloadTime(f))); a.play(); }
      want[k] = 1;
    } else want[oneH ? 'aim1_up' : 'aim2_up'] = 1;
    // cycle speeds follow the ground speed
    const run = clamp(hs / 5.4, 0.6, 1.6);
    for(const n of ['run_lo', 'back_lo', 'left_lo', 'right_lo']) A[n].timeScale = run;
    A.sprint_lo.timeScale = A.sprint_up.timeScale = clamp(hs / 7.2, 0.7, 1.4);
    A.sneak_lo.timeScale = clamp(hs / 2.4, 0.6, 1.6);
  }
  // ---- fade toward the targets (deaths and cheering cut in fast) ----
  const fast = !f.alive || end;
  for(const k in A){
    const w = Wt[k] = damp(Wt[k], want[k], fast ? 22 : 12, dt);
    A[k].setEffectiveWeight(w < 0.002 ? 0 : w);
  }
  H.mixer.update(dt);
  // ---- on top of the clips: aim pitch through the spine, recoil kick, hit flinch ----
  const B = H.bones;
  spring(H.kick, 0, 260, 18, dt); spring(H.flinch, 0, 120, 12, dt);
  if(f.alive){
    H.root.updateMatrixWorld(true);
    // the character's right (world): pitching the aim up turns the chest back around it
    _ax.set(Math.cos(H.bodyYaw), 0, -Math.sin(H.bodyYaw));
    const p = clamp(f.pitch, -1.2, 1.2);
    turnBone(B.spine, _ax, p * 0.45 - H.flinch.x * 0.5);
    B.spine.updateMatrixWorld(true);
    turnBone(B.chest, _ax, p * 0.45 + H.kick.x * 0.6);
    B.chest.updateMatrixWorld(true);
    turnBone(B.head, _ax, -p * 0.35);
    // aim yaw not yet caught up by the body: the chest twists the rest
    const twist = angDiff(H.bodyYaw, f.yaw);
    if(Math.abs(twist) > 0.01){ _v.set(0, 1, 0); turnBone(B.chest, _v, twist); }
  } else {
    // the fallen sink into the moss after a while
    if(f.deadT > 2.2) H.root.position.y -= (f.deadT - 2.2) * 0.4;
  }
  H.root.updateMatrixWorld(true);
  // hit flash
  H.flash = Math.max(0, H.flash - dt * 6);
  for(const m of H.mats) m.emissive.setRGB(H.flash * 0.55, H.flash * 0.12, H.flash * 0.1);
}
function reloadTime(f){ const W = gun(f).W, R = f.reload; if(W.reload.kind === 'shell') return W.reload.start + W.reload.shell * Math.max(1, W.mag - gun(f).mag) + W.reload.end; return R.total || W.reload.t; }

on('fire', f => { if(f.model){ f.model.kick.v += gun(f).W.recoil.punch * 1.6; } });
on('damage', (t, amt) => { if(t.model){ t.model.flash = 1; t.model.flinch.v += 2 + amt * 0.05; } });
on('spawn', f => { if(f.model){ const H = f.model; H.bodyYaw = f.yaw; H.dying = null; for(const k of ['deathA', 'deathB']){ H.A[k].stop(); H.W[k] = 0; } } });
