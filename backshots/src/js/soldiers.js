// The fighters' bodies: Mixamo office people on one shared skeleton, so every animation fits everyone. Each fighter
// gets a copy with its own mixer. Walking, running, sprinting and crouch-walking each have 8 directions; the two
// nearest to the way it moves are blended and their cycles share one phase, so the feet never slide. Standing still
// it holds the rifle at rest or aimed. On top: the spine bends to the aim pitch and twists toward the aim, leaning
// tilts it, the reload and hit reactions take over the upper body, each shot kicks the shoulders. A death clip is
// picked by where the bullet came from (front, back, side, head, while running, crouched); physics.js then turns the
// body into a rag doll. The rifle sits in the right hand, placed once from the aiming pose.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { scene } from './engine.js';
import { loadGLB } from './assets.js';
import { buildGun } from './gunmodels.js';
import { G, on } from './state.js';
import { gun, LOOKS } from './fighter.js';
import { lightRGB } from './level/lights.js';
import { zoneTint } from './zone.js';
import { clamp, damp, angDiff, sp, spring } from './util.js';

export const T = { tpl:{}, clips:{}, mount:null, ready:false };
const UPPER = /^(Spine|Spine1|Spine2|Neck|Head|LeftShoulder|RightShoulder|LeftArm|RightArm|LeftForeArm|RightForeArm|LeftHand|RightHand)/;
// gaits: clip prefix, the clip's own ground speed (m/s)
const GAIT = { walk:['walk_', 1.4], run:['run_', 3.4], sprint:['sprint_', 5.6], cwalk:['cwalk_', 1.05] };
const DIRS = ['f', 'fr', 'r', 'br', 'b', 'bl', 'l', 'fl'];       // 45° apart, clockwise seen from above (r = its right)
const DEATHS = ['death_front', 'death_back', 'death_right', 'death_head_front', 'death_head_back', 'death', 'death_crouch', 'death_walk'];

const upperOnly = c => new THREE.AnimationClip(c.name + '_up', c.duration, c.tracks.filter(t => UPPER.test(t.name.split('.')[0])));
export async function loadSoldiers(progress){
  const an = await loadGLB('assets/models/anims.glb');
  for(const c of an.animations) T.clips[c.name] = c;
  for(const n of ['reload', 'reload_2', 'hit', 'hit_walk', 'fire', 'pistol_idle', 'pistol_crouch']) if(T.clips[n]) T.clips[n + '_up'] = upperOnly(T.clips[n]);
  let i = 0;
  await Promise.all(LOOKS.map(async id => {
    const g = await loadGLB(`assets/models/chars/${id}.glb`);
    g.scene.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; const mt = m.material; mt.roughness = Math.max(0.55, mt.roughness ?? 0.8); mt.metalness = 0;
      // hair and lashes are cut-outs
      if(/hair|lash/i.test(m.name) || /hair/i.test(mt.name)){ mt.alphaTest = 0.4; mt.transparent = false; mt.side = THREE.DoubleSide; } } });
    T.tpl[id] = g.scene;
    if(progress) progress(++i / LOOKS.length);
  }));
  // where the rifle sits in the right hand: solved once from the aiming pose, barrel along the line between the hands
  const probe = cloneSkinned(T.tpl[LOOKS[0]]), mx = new THREE.AnimationMixer(probe), B = boneMap(probe);
  mx.clipAction(T.clips.aim).play(); mx.setTime(0.5); probe.updateMatrixWorld(true);
  const rp = palm(B, 'Right'), lp = palm(B, 'Left');
  const fwd = lp.clone().sub(rp).normalize(), up = new THREE.Vector3(0, 1, 0).addScaledVector(fwd, -fwd.y).normalize(), right = new THREE.Vector3().crossVectors(fwd, up);
  // gun space: -z is the muzzle, so +z = -fwd
  const want = new THREE.Matrix4().makeBasis(right, up, fwd.clone().negate()).setPosition(rp);
  T.mount = new THREE.Matrix4().copy(B.RightHand.matrixWorld).invert().multiply(want);
  // the pistol: held in both hands by the pistol pose, barrel along the right arm
  if(T.clips.pistol_idle){
    mx.stopAllAction(); mx.clipAction(T.clips.pistol_idle).play(); mx.setTime(0.5); probe.updateMatrixWorld(true);
    const hp = palm(B, 'Right'), sh = new THREE.Vector3().setFromMatrixPosition(B.RightArm.matrixWorld);
    const f2 = hp.clone().sub(sh).normalize(), u2 = new THREE.Vector3(0, 1, 0).addScaledVector(f2, -f2.y).normalize(), r2 = new THREE.Vector3().crossVectors(f2, u2);
    T.mountPistol = new THREE.Matrix4().copy(B.RightHand.matrixWorld).invert().multiply(new THREE.Matrix4().makeBasis(r2, u2, f2.clone().negate()).setPosition(hp));
  }
  T.ready = true;
}
function boneMap(o){ const b = {}; o.traverse(n => { if(n.isBone) b[n.name] = n; }); return b; }
// the middle of the palm: between the wrist and the middle-finger knuckle, a little toward the thumb side
function palm(B, side){ const w = new THREE.Vector3().setFromMatrixPosition(B[side + 'Hand'].matrixWorld), k = new THREE.Vector3().setFromMatrixPosition(B[side + 'HandMiddle1'].matrixWorld); return w.lerp(k, 0.55); }

// ---- one fighter's body ----
export function buildSoldier(f, parent = scene){
  const root = new THREE.Group(), model = cloneSkinned(T.tpl[f.look] || T.tpl[LOOKS[0]]);
  root.add(model);
  // own materials (each fighter takes the light of the spot it stands in)
  const amb = { value:new THREE.Color(0.1, 0.09, 0.07) }, mats = new Map();
  model.traverse(m => { if(m.isMesh){ if(!mats.has(m.material)){ const c = m.material.clone(); ambient(c, amb); mats.set(m.material, c); } m.material = mats.get(m.material); } });
  const bones = boneMap(model);
  const mount = new THREE.Group(); mount.matrixAutoUpdate = false; mount.matrix.copy(T.mount); bones.RightHand.add(mount);
  const mixer = new THREE.AnimationMixer(model);
  parent.add(root);
  const H = { f, root, model, bones, mats:[...mats.values()], amb, gun:null, gunId:null, gunMats:[], mount, mixer, acts:{}, w:{}, want:{}, phase:Math.random(), bodyYaw:f.yaw,
    kick:sp(), flinch:sp(), dying:null, rag:false, posed:null, hitT:9, reloadOf:null, hidden:false };
  setSoldierGun(H, gun(f).W.id);
  return H;
}
// the gun in the right hand (a new one when the fighter swaps or picks one up)
function setSoldierGun(H, id){
  if(H.gun){ H.mount.remove(H.gun.root); for(const m of H.gunMats) m.dispose(); H.gunMats = []; }
  const g = buildGun(id, false);
  H.mount.matrix.copy(id === 'pistol' && T.mountPistol ? T.mountPistol : T.mount);
  g.root.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; ambient(m.material = m.material.clone(), H.amb); H.gunMats.push(m.material); } });
  H.mount.add(g.root); H.gun = g; H.gunId = id;
}
// a uniform light term for skinned characters, set per fighter from the baked light where it stands
export function ambient(m, amb){
  if(m.userData.amb) return; m.userData.amb = true;
  const prev = m.onBeforeCompile;
  m.onBeforeCompile = (s, r) => { if(prev) prev(s, r); s.uniforms.uAmb = amb;
    s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 uAmb;')
      .replace('#include <lights_fragment_maps>', '#include <lights_fragment_maps>\nirradiance += uAmb;'); };
  const key = m.customProgramCacheKey && m.customProgramCacheKey !== THREE.Material.prototype.customProgramCacheKey ? m.customProgramCacheKey.bind(m) : null;
  m.customProgramCacheKey = () => (key ? key() : '') + 'amb';
}
export function disposeSoldier(H){
  if(H.root.parent) H.root.parent.remove(H.root);
  H.mixer.stopAllAction(); H.mixer.uncacheRoot(H.model);
  for(const m of H.mats) m.dispose();
  for(const m of H.gunMats) m.dispose();
}
function act(H, name){
  let a = H.acts[name];
  if(!a){ const c = T.clips[name]; if(!c) return null; a = H.acts[name] = H.mixer.clipAction(c); a.setEffectiveWeight(0); a.play(); H.w[name] = 0; }
  if(!a.isRunning() && !a.paused) a.play();
  return a;
}
export function soldierMuzzle(H, out){ return H.gun.muzzle.getWorldPosition(out); }

const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _v = new THREE.Vector3(), _ax = new THREE.Vector3();
function turnBone(b, axis, ang){
  if(!ang || !b) return;
  b.parent.getWorldQuaternion(_q2);
  _v.copy(axis).applyQuaternion(_q2.invert());
  _q.setFromAxisAngle(_v, ang);
  b.quaternion.premultiply(_q);
}
const _rgb = [0, 0, 0];
export const AMB_K = 4.5;      // matches the light-map scale of the walls
const TURNED = ['Spine', 'Spine1', 'Spine2', 'Neck', 'Head', 'RightArm', 'LeftArm'];

export function animSoldier(H, dt, hide){
  const f = H.f, want = H.want;
  const vis = !hide && (f.alive || f.deadT < 60);
  H.root.visible = vis;
  if(!vis || H.rag) return;
  // ambient from the baked light (plus your flashlight on them)
  const L = G.level; if(L){ zoneTint(f.x, f.z, lightRGB(L, f.x, f.z, _rgb)); H.amb.value.setRGB(0.06 + _rgb[0] * AMB_K, 0.05 + _rgb[1] * AMB_K, 0.04 + _rgb[2] * AMB_K); }
  for(const k in want) want[k] = 0;
  const hs = Math.hypot(f.vx, f.vz);
  if(f.alive){
    H.bodyYaw += angDiff(H.bodyYaw, f.yaw) * Math.min(1, dt * (hs > 0.5 ? 12 : 6));
    const lag = angDiff(H.bodyYaw, f.yaw); if(Math.abs(lag) > 0.8) H.bodyYaw = f.yaw - Math.sign(lag) * 0.8;
  }
  H.root.position.set(f.x, f.y, f.z);
  H.root.rotation.set(0, H.bodyYaw + Math.PI, 0);
  let fast = false;
  // the dead drop their gun (it lies on the floor as loot)
  if(H.gun) H.gun.root.visible = f.alive;
  if(f.alive && f.guns.length && H.gunId !== gun(f).W.id) setSoldierGun(H, gun(f).W.id);
  if(!f.alive){
    if(!H.dying){ H.dying = pickDeath(H); const a = act(H, H.dying); a.reset(); a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; a.timeScale = 1; a.play(); H.deathT = 0; }
    want[H.dying] = 1; fast = true; H.deathT += dt;
  } else {
    if(H.dying){ H.acts[H.dying].stop(); H.dying = null; }
    // ---- legs: gait by speed and stance, two nearest of eight directions ----
    const fx = -Math.sin(H.bodyYaw), fz = -Math.cos(H.bodyYaw);
    const fwd = f.vx * fx + f.vz * fz, side = f.vx * -fz + f.vz * fx;
    const crouch = f.crouchK > 0.5, sprint = f.sprintT > 0.05;
    const aimed = f.adsK > 0.1 || G.time - f.lastShotT < 2.5 || (f.bot_ && f.bot_.target);
    H.airT = f.ground ? 0 : (H.airT || 0) + dt;
    const gait = crouch ? 'cwalk' : sprint ? 'sprint' : hs < 2.4 ? 'walk' : 'run';
    const [pre, gs] = GAIT[gait];
    const move = clamp((hs - 0.25) / 0.6, 0, 1);
    if(H.airT > 0.15) want.jump_loop = 1;
    else {
      const still = crouch ? (aimed ? 'crouch_aim' : 'crouch') : (aimed ? 'aim' : 'idle');
      want[still] = 1 - move;
      if(move > 0){
        let a = Math.atan2(side, fwd); if(a < 0) a += Math.PI * 2;
        const s = a / (Math.PI / 4), i0 = Math.floor(s) % 8, i1 = (i0 + 1) % 8, t = s - Math.floor(s);
        want[pre + DIRS[i0]] = (want[pre + DIRS[i0]] || 0) + move * (1 - t); want[pre + DIRS[i1]] = (want[pre + DIRS[i1]] || 0) + move * t;
        // one shared phase for all the moving cycles
        H.phase = (H.phase + dt * hs / (gs * T.clips[pre + 'f'].duration)) % 1;
      }
    }
    // ---- upper body: reload, flinch ----
    if(f.reload){
      if(H.reloadOf !== f.reload){ H.reloadOf = f.reload; const a = act(H, 'reload_up'); a.reset(); a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; a.timeScale = T.clips.reload.duration / Math.max(0.5, f.reload.total || 2.4); a.play(); }
      want.reload_up = 7;
    }
    // a pistol: the arms take the pistol pose (the legs keep walking as they do)
    if(gun(f) && gun(f).W.kind === 'pistol' && !f.reload) want[crouch && T.clips.pistol_crouch_up ? 'pistol_crouch_up' : 'pistol_idle_up'] = 5;
    H.hitT += dt;
    if(H.hitT < 0.5) want[hs > 1.5 ? 'hit_walk_up' : 'hit_up'] = 3 * (1 - H.hitT / 0.5);
  }
  // ---- fade weights; idle actions stop ----
  for(const k in H.acts){
    const a = H.acts[k], wv = want[k] || 0;
    let w = H.w[k] = damp(H.w[k] || 0, wv, fast ? 18 : 10, dt);
    if(w < 0.003 && wv === 0){ if(a.isRunning()) a.stop(); H.w[k] = 0; continue; }
    if(!a.isRunning()) a.play();
    a.setEffectiveWeight(w);
    // moving cycles follow the shared phase
    if(/^(walk|run|sprint|cwalk)_/.test(k)){ a.timeScale = 0; a.time = H.phase * a.getClip().duration; }
  }
  for(const k in want) if(want[k] > 0 && !H.acts[k]) act(H, k);
  // the mixer leaves bones alone when nothing changes them: undo last frame's extra turns first
  const B = H.bones;
  if(H.posed) for(const n of TURNED) if(B[n]) B[n].quaternion.copy(H.posed[n]);
  H.mixer.update(dt);
  H.posed = H.posed || {};
  for(const n of TURNED) if(B[n]) (H.posed[n] = H.posed[n] || new THREE.Quaternion()).copy(B[n].quaternion);
  spring(H.kick, 0, 260, 20, dt); spring(H.flinch, 0, 120, 12, dt);
  if(f.alive){
    H.root.updateMatrixWorld(true);
    // the character's right: pitching the aim up turns the spine back around it
    _ax.set(Math.cos(H.bodyYaw), 0, -Math.sin(H.bodyYaw));
    const p = clamp(f.pitch, -1.1, 1.1);
    turnBone(B.Spine, _ax, p * 0.3 - H.flinch.x * 0.4); B.Spine.updateMatrixWorld(true);
    turnBone(B.Spine1, _ax, p * 0.3); B.Spine1.updateMatrixWorld(true);
    turnBone(B.Spine2, _ax, p * 0.3 + H.kick.x * 0.5); B.Spine2.updateMatrixWorld(true);
    turnBone(B.Head, _ax, -p * 0.25);
    const twist = angDiff(H.bodyYaw, f.yaw);
    if(Math.abs(twist) > 0.01){ _v.set(0, 1, 0); turnBone(B.Spine1, _v, twist * 0.5); B.Spine1.updateMatrixWorld(true); turnBone(B.Spine2, _v, twist * 0.5); }
    // lean: the spine tilts toward the side
    if(Math.abs(f.leanK) > 0.01){ _v.set(-Math.sin(H.bodyYaw), 0, -Math.cos(H.bodyYaw)); turnBone(B.Spine, _v, f.leanK * 0.35); }
  }
  H.root.updateMatrixWorld(true);
}
// which death fits: the bullet's direction against the way the body faces, the head, running or crouched
function pickDeath(H){
  const f = H.f, o = f.lastHit;
  if(f.crouchK > 0.5) return 'death_crouch';
  if(Math.hypot(f.vx, f.vz) > 3 && Math.random() < 0.6) return 'death_walk';
  if(!o || !o.dir) return 'death';
  // bullet travelling along +facing = shot from behind
  const fx = -Math.sin(H.bodyYaw), fz = -Math.cos(H.bodyYaw), along = o.dir.x * fx + o.dir.z * fz, side = o.dir.x * -fz + o.dir.z * fx;
  if(Math.abs(side) > Math.abs(along) * 1.2) return Math.random() < 0.7 ? 'death_right' : 'death';
  if(along > 0) return o.head ? 'death_head_back' : 'death_back';
  return o.head ? 'death_head_front' : (Math.random() < 0.75 ? 'death_front' : 'death');
}
export { DEATHS };

on('fire', f => { if(f.model) f.model.kick.v += gun(f).W.recoil.punch * 1.4; });
on('damage', (t, amt, src, o) => { if(t.model && t.alive && !(o && o.zone)){ t.model.hitT = 0; t.model.flinch.v += 2.5 + amt * 0.06; } });
