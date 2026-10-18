// First person: real first-person arms (Sketchfab, CC-BY — see CREDITS.md), drawn in their own pass. Long guns use the
// gloved arms of the «M16 A2 Rifle – Animated» rig, the pistol the arms of «FPS pistol animations». Each rig holds an
// animated stand-in for its gun (an empty for the M16, the PBody bone for the pistol); our gun model is mounted on it,
// so the animations (idle, reloads, drawing, the pistol's shot) move it with the hands. The left hand is nudged by IK
// onto this gun's handguard. The gun's rest pose sits at the hip or, aiming, with its sights on the screen centre;
// springs add sway, bob, the sprint carry, the recoil kick and the swap. Shotgun shells, pump, bolt, healing pose.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { G, on, emit } from './state.js';
import { scene, camera, vmMaterial, VM_LAYER, VM } from './engine.js';
import { loadGLB } from './assets.js';
import { buildGun } from './gunmodels.js';
import { gun } from './fighter.js';
import { WEAPONS } from './weapons.js';
import { PL } from './player.js';
import { sp, spring, clamp, damp, lerp } from './util.js';
import { ambient, AMB_K } from './soldiers.js';
import { lightRGB } from './level/lights.js';
import { zoneTint } from './zone.js';

export const VMS = { root:null, rig:null, cur:null, flash:null, shown:true, look:null, ambU:{ value:new THREE.Color(0.3, 0.27, 0.2) } };
const S = { px:sp(), py:sp(), pz:sp(), rx:sp(), ry:sp(), rz:sp(), swayX:0, swayY:0, sprint:0, lower:0, fireT:9, cycleT:9 };
// gun pose in camera space: hip (grip position) and the aim distance of the sights
const ADS_D = { rifle:0.23, shotgun:0.24, sniper:0.12, pistol:0.4 };                  // eye to the sights when aiming
// the two rigs: bones of the left arm, the hands (wrist, and a bone toward the knuckles), the gun's stand-ins, clips
const RIG = {
  // eyeGrip: where the eye is from the right palm (rig space: +x left, +y up, +z ahead) for the hip view — both rigs
  // were framed for a lowered «ready» pose, a shooter's view sits higher and farther back
  rifle:{ file:'fp_rifle', gun:'gun', mag:'mag', arm:['L_arm', 'L_elbow', 'L_wrist'], palmR:['R_wrist', 'R_palm'], palmL:['L_wrist', 'L_palm'], eyeGrip:[0.13, 0.17, -0.34],
    // one baked timeline at 30 fps: [start, end] seconds of each piece
    cut:{ idle:[0, 0.3], reload:[0.4, 2.3], reloadEmpty:[2.3, 4.5], draw:[4.5, 6.0] } },
  pistol:{ file:'fp_pistol', gun:'PBody', mag:'Pmag', slide:'Rif', arm:['UpArm_L', 'Forearm_L', 'Hand_L'], palmR:['Hand_R', null], palmL:['Hand_L', null], eyeGrip:[0.06, 0.1, -0.36], tint:0.5,
    clips:{ idle:'FPS_Pistol_Idle', reload:'FPS_Pistol_Reload_easy', reloadEmpty:'FPS_Pistol_Reload_full', fire:'FPS_Pistol_Fire' } },
};
const FP = {};
export async function loadFpArms(){
  await Promise.all(Object.entries(RIG).map(async ([k, R]) => { const g = await loadGLB(`assets/models/${R.file}.glb`); FP[k] = { scene:g.scene, clips:g.animations }; }));
}

export function initViewmodel(){
  const root = VMS.root = new THREE.Group(); root.matrixAutoUpdate = false; scene.add(root);
  VMS.light = new THREE.PointLight('#FFB060', 0, 6, 2); VMS.light.layers.enableAll(); scene.add(VMS.light);
  const key = VMS.key = new THREE.DirectionalLight('#FFF0D8', 0.6); key.layers.set(VM_LAYER); scene.add(key, key.target);
  VMS.amb = new THREE.HemisphereLight('#FFF0C8', '#2A2010', 0.5); VMS.amb.layers.set(VM_LAYER); scene.add(VMS.amb);
}
const pos = (o, out = new THREE.Vector3()) => o.getWorldPosition(out);
// a palm: the wrist bone pulled halfway toward the knuckles (the given bone, or the middle of the wrist's children)
function palm(model, [w, k]){
  const wb = model.getObjectByName(w), p = pos(wb), q = new THREE.Vector3();
  if(k){ pos(model.getObjectByName(k), q); }
  else { const kids = wb.children.filter(c => c.isBone); for(const c of kids) q.add(pos(c)); q.divideScalar(Math.max(1, kids.length)); }
  return p.lerp(q, 0.5);
}
// the stand-in's own axis closest to a world direction
function axisNear(m, dir){
  const e = m.elements, ax = [new THREE.Vector3(e[0], e[1], e[2]), new THREE.Vector3(e[4], e[5], e[6]), new THREE.Vector3(e[8], e[9], e[10])].map(v => v.normalize());
  let best = ax[0], bd = -2; for(const a of ax) for(const s of [1, -1]){ const d = a.dot(dir) * s; if(d > bd){ bd = d; best = a.clone().multiplyScalar(s); } }
  return best;
}
// the rig for a gun (the look no longer matters: everyone wears the same gloves)
export function setRig(look, gid){
  if(VMS.rig && VMS.gid === gid) return;
  if(VMS.rig){ VMS.root.remove(VMS.rig.holder); VMS.rig.mixer.stopAllAction(); }
  const kind = gid === 'pistol' ? 'pistol' : 'rifle', R = RIG[kind], src = FP[kind];
  const model = cloneSkinned(src.scene), holder = new THREE.Group(); holder.matrixAutoUpdate = false; holder.add(model);
  model.traverse(m => {
    if(!m.isMesh) return;
    const mat = m.material.clone(); if(R.tint) mat.color.setScalar(R.tint); ambient(mat, VMS.ambU);
    m.material = vmMaterial(mat); m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; m.layers.set(VM_LAYER);
  });
  // clips
  const mixer = new THREE.AnimationMixer(model), clips = {};
  if(R.cut){ const all = src.clips[0]; for(const k in R.cut) clips[k] = THREE.AnimationUtils.subclip(all, k, Math.round(R.cut[k][0] * 30), Math.round(R.cut[k][1] * 30), 30); }
  else for(const k in R.clips) clips[k] = src.clips.find(c => c.name === R.clips[k]);
  const acts = {}; for(const k in clips) if(clips[k]){ acts[k] = mixer.clipAction(clips[k]); acts[k].setEffectiveWeight(0); }
  acts.idle.setEffectiveWeight(1).play();
  mixer.update(0); holder.updateMatrixWorld(true);
  // our gun on the stand-in: grip in the right palm, barrel along the stand-in's own axis toward the left hand
  const gunP = model.getObjectByName(R.gun), magP = model.getObjectByName(R.mag), slideP = R.slide ? model.getObjectByName(R.slide) : null;
  const pr = palm(model, R.palmR), pl = palm(model, R.palmL);
  let fwdGuess = pl.clone().sub(pr);
  if(kind === 'pistol'){ const cam = model.getObjectByName('Head_Cam'); fwdGuess = pr.clone().sub(pos(cam)); }
  fwdGuess.normalize();
  const fwd = axisNear(gunP.matrixWorld, fwdGuess), up = axisNear(gunP.matrixWorld, new THREE.Vector3(0, 1, 0));
  up.addScaledVector(fwd, -up.dot(fwd)).normalize(); const right = new THREE.Vector3().crossVectors(fwd, up);
  const mountW = new THREE.Matrix4().makeBasis(right, up, fwd.clone().negate()).setPosition(pr);
  const g = buildGun(gid, true);
  g.root.traverse(o => { if(o.isMesh) ambient(o.material, VMS.ambU); });
  const mount = new THREE.Group(); mount.matrixAutoUpdate = false; mount.matrix.copy(gunP.matrixWorld.clone().invert().multiply(mountW)); gunP.add(mount); mount.add(g.root);
  holder.updateMatrixWorld(true);
  const rigInGun = mountW.clone().invert();
  // the rig's own gun (hidden) shows where ours must sit: the pistol by its back and top, scaled to its length; a
  // rifle on the same bore line (its muzzle), the grip staying in the palm
  const ref = model.getObjectByName(kind === 'pistol' ? 'pistol_ref' : 'rifle_ref');
  if(ref){
    const refMesh = ref.isMesh ? ref : ref.getObjectByProperty('isMesh', true), pts = [], rb = new THREE.Box3(), v = new THREE.Vector3();
    for(let i = 0, n = refMesh.geometry.attributes.position.count; i < n; i++){ refMesh.getVertexPosition(i, v); v.applyMatrix4(refMesh.matrixWorld).applyMatrix4(rigInGun); rb.expandByPoint(v); pts.push(v.x, v.y, v.z); }
    ref.traverse(o => { o.visible = false; });
    g.root.updateMatrixWorld(true); const ob = new THREE.Box3().setFromObject(g.root).applyMatrix4(_m.copy(g.root.matrixWorld).invert());
    if(kind === 'pistol'){
      const k = clamp((rb.max.z - rb.min.z) / Math.max(1e-3, ob.max.z - ob.min.z), 0.85, 1.35);
      g.root.scale.setScalar(k);
      g.root.position.set((rb.min.x + rb.max.x) / 2 - (ob.min.x + ob.max.x) / 2 * k, rb.max.y - ob.max.y * k, rb.max.z - ob.max.z * k);
    } else {
      const mz = new THREE.Vector3(); let n = 0;
      for(let i = 0; i < pts.length; i += 3) if(pts[i + 2] < rb.min.z + 0.012){ mz.x += pts[i]; mz.y += pts[i + 1]; n++; }
      mz.divideScalar(Math.max(1, n));
      g.root.position.set(mz.x - g.muzzle.position.x, mz.y - g.muzzle.position.y, 0);
    }
    g.root.updateMatrix(); holder.updateMatrixWorld(true);
  }
  // the eye the animator looked through (rig faces +z, up +y): the gun's pose seen from it is the hip pose
  const eye = pr.clone().add(new THREE.Vector3(...R.eyeGrip));
  const eyeM = new THREE.Matrix4().makeBasis(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, -1)).setPosition(eye);
  const hipM = eyeM.clone().invert().multiply(mountW), hipP = new THREE.Vector3(), hipQ = new THREE.Quaternion(); hipM.decompose(hipP, hipQ, new THREE.Vector3());
  // where the stand-in magazine / slide sit in gun space at rest (their motion is copied onto our parts)
  const inGun = o => o ? pos(o).applyMatrix4(rigInGun) : null;
  // the left palm at rest, in gun space, and where this gun's handguard wants it
  const leftRest = pl.clone().applyMatrix4(rigInGun), leftWant = g.gripL.position.clone().add(g.root.position).add(new THREE.Vector3(0, -0.035, 0));
  g.flash = muzzleFlash(); g.muzzle.add(g.flash);
  const gunHolder = new THREE.Object3D(); gunHolder.matrixAutoUpdate = false; VMS.root.add(gunHolder);
  VMS.root.add(holder);
  const parts = g.parts, home = p => p ? { p, at:p.position.clone() } : null;
  VMS.rig = { kind, R, model, holder, mixer, acts, clips, cur:'idle', g, gunP, mount, magP, slideP, magRest:inGun(magP), slideRest:inGun(slideP), rigInGun, gunHolder,
    leftDelta:kind === 'rifle' ? new THREE.Vector3(0, 0, leftWant.z - leftRest.z) : new THREE.Vector3(), arm:R.arm.map(n => model.getObjectByName(n)),
    mag:home(parts.mag), slide:home(kind === 'pistol' ? parts.bolt : null),
    hipP, hipQ, adsD:ADS_D[WEAPONS[gid].kind] || ADS_D.rifle, sight:g.sight.position.clone().multiplyScalar(g.root.scale.x).add(g.root.position), w:{ idle:1 } };
  VMS.look = look; VMS.gid = gid; VMS.cur = g;
}

let FLASH_T = null;
function flashTex(){
  if(FLASH_T) return FLASH_T;
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,235,1)'); gr.addColorStop(0.2, 'rgba(255,215,130,0.9)'); gr.addColorStop(0.5, 'rgba(255,140,40,0.35)'); gr.addColorStop(1, 'rgba(255,90,20,0)');
  x.fillStyle = gr; x.beginPath(); x.translate(64, 64);
  for(let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2, r = i % 2 ? 20 : 64; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill();
  FLASH_T = new THREE.CanvasTexture(c); FLASH_T.colorSpace = THREE.SRGBColorSpace; return FLASH_T;
}
function muzzleFlash(){
  const g = new THREE.Group(), mat = vmMaterial(new THREE.MeshBasicMaterial({ map:flashTex(), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, color:new THREE.Color(2.5, 2.1, 1.6) }));
  const front = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.14), mat);
  const s1 = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 0.22).translate(0, 0.11, 0).rotateX(-Math.PI / 2), mat), s2 = s1.clone(); s2.rotation.z = Math.PI / 2;
  g.add(front, s1, s2); g.traverse(o => { o.layers.set(VM_LAYER); o.frustumCulled = false; }); g.visible = false;
  return g;
}

// play one of the rig's pieces once (fitted to `len` seconds), or go back to idle
function play(R, name, len){
  const a = R.acts[name]; if(!a) return false;
  a.reset(); a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; a.timeScale = len ? R.clips[name].duration / len : 1; a.play();
  R.cur = name; R.curT = 0; R.curLen = len || R.clips[name].duration;
  return true;
}
on('fire', f => { if(f !== G.me || !VMS.rig) return;
  const W = gun(f).W, k = 1 - f.adsK * 0.45, Rc = W.recoil, R = VMS.rig;
  S.pz.v += (0.45 + Rc.punch * 0.18) * k; S.rx.v += (1.0 + Rc.punch * 0.6) * k; S.rz.v += (Math.random() - 0.5) * 1.6 * k; S.py.v += 0.12 * k; S.ry.v += (Math.random() - 0.5) * 0.6 * k;
  S.fireT = 0; const g = R.g; g.flash.rotation.z = Math.random() * 6.3; g.flash.scale.setScalar(0.8 + Math.random() * 0.5);
  if(R.acts.fire && !f.reload) play(R, 'fire');
  emit('casing', f, g.eject, W.id);
});
on('lower', f => { if(f === G.me) S.lowering = true; });
on('pump', f => { if(f === G.me) S.cycleT = 0; });
on('bolt', f => { if(f === G.me) S.cycleT = 0; });
on('equip', f => { if(f !== G.me) return; S.lowering = false; S.lower = 1; S.drawWant = true; });
on('spawn', f => { if(f === G.me){ S.lower = 1; S.lowering = false; S.snap = true; } });

const _m = new THREE.Matrix4(), _m2 = new THREE.Matrix4(), _m3 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _qi = new THREE.Quaternion(), _e = new THREE.Euler(), _rgb = [0, 0, 0];
const _A = new THREE.Vector3(), _B = new THREE.Vector3(), _C = new THREE.Vector3(), _T = new THREE.Vector3(), _d = new THREE.Vector3(), _e1 = new THREE.Vector3(), _sc = new THREE.Vector3(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const _n3 = new THREE.Matrix3(), _qa = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _qt = new THREE.Quaternion(), _qh = new THREE.Quaternion(), _pole = new THREE.Vector3(), _pp = new THREE.Vector3();
const ease = t => t * t * (3 - 2 * t);
const seg = (t, a, b) => ease(clamp((t - a) / (b - a), 0, 1));
const bump = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a), 0, 1));
function aimBone(bone, from, to){
  _qa.setFromUnitVectors(from.normalize(), to.normalize());
  bone.getWorldQuaternion(_qt); _qt.premultiply(_qa);
  bone.parent.getWorldQuaternion(_qp); bone.quaternion.copy(_qp.invert().multiply(_qt)); bone.updateMatrixWorld(true);
}
// two-bone IK to a point; the hand keeps its world rotation; the elbow bends toward `pole`
function ik([a, b, c], target, pole){
  c.getWorldQuaternion(_qh);
  pos(a, _A); pos(b, _B); pos(c, _C);
  const l1 = _A.distanceTo(_B), l2 = _B.distanceTo(_C), dist = clamp(_A.distanceTo(target), 0.02, l1 + l2 - 1e-4);
  _d.subVectors(target, _A).normalize();
  _pp.copy(pole).addScaledVector(_d, -pole.dot(_d)); if(_pp.lengthSq() < 1e-6) _pp.set(0, -1, 0); _pp.normalize();
  const ang = Math.acos(clamp((l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist), -1, 1));
  const elbow = _e1.copy(_d).multiplyScalar(Math.cos(ang) * l1).addScaledVector(_pp, Math.sin(ang) * l1).add(_A);
  aimBone(a, _sc.subVectors(_B, _A), _v.subVectors(elbow, _A));
  pos(b, _B); pos(c, _C);
  aimBone(b, _sc.subVectors(_C, _B), _v.subVectors(target, _B));
  c.parent.getWorldQuaternion(_qp); c.quaternion.copy(_qp.invert().multiply(_qh)); c.updateMatrixWorld(true);
}
// copy a stand-in's motion (in gun space) onto one of our gun's parts
function follow(R, part, proxy, rest){
  if(!part || !proxy || !rest) return;
  pos(proxy, _v).applyMatrix4(_m.copy(R.mount.matrixWorld).invert()).sub(rest);
  const s = part.p.parent.getWorldScale(_sc).x / Math.max(1e-6, R.mount.getWorldScale(_v2).x);
  part.p.position.copy(part.at).addScaledVector(_v, 1 / s);
}

export function updateViewmodel(dt){
  const f = G.me;
  const show = !!f && f.alive && G.state === 'play' && VMS.shown && !!VMS.rig;
  VMS.root.visible = show;
  if(VMS.light) VMS.light.intensity = Math.max(0, VMS.light.intensity - dt * 500);
  if(!show) return;
  const g = gun(f), W = g.W;
  if(VMS.gid !== W.id) setRig(f.look, W.id);
  const R = VMS.rig;
  VM.clip.value = f.adsK * 0.12;
  if(G.level){ zoneTint(f.x, f.z, lightRGB(G.level, f.x, f.z, _rgb)); VMS.ambU.value.setRGB(0.05 + _rgb[0] * AMB_K * 0.8, 0.045 + _rgb[1] * AMB_K * 0.8, 0.035 + _rgb[2] * AMB_K * 0.8); }
  // ---- which animation: reloads and drawing play once, then back to idle ----
  const shell = f.reload && W.reload.kind === 'shell';
  if(f.reload && !shell && R.reloadOf !== f.reload){
    R.reloadOf = f.reload; const empty = f.reload.empty && R.acts.reloadEmpty;
    play(R, empty ? 'reloadEmpty' : 'reload', f.reload.total);
  }
  if(S.drawWant){ S.drawWant = false; if(R.acts.draw && play(R, 'draw', W.equip + 0.2)) S.lower = 0; }
  if(R.cur !== 'idle'){
    R.curT += dt;
    if(R.curT >= R.curLen || (R.cur.startsWith('reload') && !f.reload) || (f.reload && R.cur === 'draw')) R.cur = 'idle';
  }
  for(const k in R.acts){
    const a = R.acts[k], want = k === R.cur ? 1 : 0, w = R.w[k] = damp(R.w[k] || 0, want, k === R.cur ? 14 : 8, dt);
    if(w < 0.002 && !want){ if(a.isRunning()) a.stop(); continue; }
    if(!a.isRunning()) a.play();
    a.setEffectiveWeight(w);
  }
  // sounds at points of the reload
  if(f.reload && !shell){
    const t = clamp(f.reload.t / Math.max(0.5, f.reload.total), 0, 1), Rr = f.reload, empty = Rr.empty && R.acts.reloadEmpty;
    const once = (k, at, fn) => { if(t >= at && !Rr[k]){ Rr[k] = true; fn(); } };
    once('s1', empty ? 0.25 : 0.3, () => emit('vmSound', 'mag_out_2')); once('s2', empty ? 0.5 : 0.58, () => emit('vmSound', 'mag_in_2'));
    if(empty) once('s3', 0.7, () => emit('vmSound', 'charge_2'));
  }
  // shotgun shells (no clip for it): the gun rolls over, the left hand goes under to the loading port for each
  let tilt = 0, pump = 0, bolt = 0, shellHand = 0;
  if(shell){
    const Rr = f.reload, Rw = W.reload;
    tilt = Rr.stage === 'start' ? seg(Rr.t, 0, Rw.start) : Rr.stage === 'end' ? 1 - seg(Rr.t, 0, Rw.end) : 1;
    if(Rr.stage === 'shells') shellHand = bump(Rr.t, 0, Rw.shell);
    if(Rr.stage === 'end') pump = bump(Rr.t, 0, Rw.end * 0.9);
  }
  S.cycleT += dt;
  if(W.pump && S.cycleT < W.pump) pump = bump(S.cycleT, 0.08, W.pump * 0.85);
  if(W.bolt && S.cycleT < W.bolt) bolt = bump(S.cycleT, 0.12, W.bolt * 0.9);
  S.heal = damp(S.heal || 0, f.use ? 1 : 0, 9, dt);
  // ---- springs toward the pose ----
  const ads = f.adsK * f.adsK * (3 - 2 * f.adsK);
  S.sprint = damp(S.sprint, f.sprintT > 0.05 ? 1 : 0, 8, dt);
  S.lower = damp(S.lower, S.lowering ? 1 : 0, S.lowering ? 16 : 7, dt);
  S.swayX = damp(S.swayX, clamp((PL.mdx || 0) * 0.0008, -0.05, 0.05), 9, dt);
  S.swayY = damp(S.swayY, clamp((PL.mdy || 0) * 0.0008, -0.04, 0.04), 9, dt);
  const sw = 1 - ads * 0.85;
  const hs = Math.hypot(f.vx, f.vz), bk = Math.min(1, hs / 5) * (f.ground ? 1 : 0) * (1 - ads * 0.85), bt = PL.bobT;
  // hip: as the animator framed it; aiming: the sights on the centre line, the gun square to the view
  const Sg = R.sight, HP = R.hipP;
  let tx = lerp(HP.x, -Sg.x, ads), ty = lerp(HP.y, -Sg.y, ads), tz = lerp(HP.z, -Sg.z - R.adsD, ads);
  let trx = 0, try_ = 0, trz = 0;
  tx += Math.sin(bt) * 0.011 * bk - S.swayX * sw; ty += -Math.abs(Math.cos(bt)) * 0.012 * bk + S.swayY * sw;
  trz += -S.swayX * 1.4 * sw; trx += S.swayY * 0.7 * sw; try_ += S.swayX * 0.7 * sw;
  ty += Math.sin(G.time * 1.5) * 0.0028 * (1 - ads * 0.9);
  tx += -0.05 * S.sprint; ty += -0.06 * S.sprint; try_ += 0.6 * S.sprint; trx += -0.3 * S.sprint; trz += 0.3 * S.sprint;
  if(S.sprint > 0.1){ tx += Math.sin(bt) * 0.022 * S.sprint; ty += -Math.abs(Math.cos(bt)) * 0.02 * S.sprint; }
  trz += 0.05 * f.crouchK * (1 - ads) - f.leanK * 0.12 + tilt * 0.5; trx += tilt * 0.15; tx -= tilt * 0.03; ty += tilt * 0.03;
  if(!f.ground) ty += 0.012;
  ty -= S.lower * 0.3; trx -= S.lower * 0.8;
  ty -= S.heal * 0.22; trx -= S.heal * 0.6; tx += S.heal * 0.05;
  trz += bolt * 0.25; trx += bolt * 0.08; ty -= bolt * 0.015; tz += pump * 0.012;
  if(S.snap){ S.snap = false; for(const [s_, v] of [[S.px, tx], [S.py, ty], [S.pz, tz], [S.rx, trx], [S.ry, try_], [S.rz, trz]]){ s_.x = v; s_.v = 0; } }
  const K = 210, D = 22;
  spring(S.px, tx, K, D, dt); spring(S.py, ty, K, D, dt); spring(S.pz, tz, K * 0.8, D * 0.8, dt);
  spring(S.rx, trx, K, D, dt); spring(S.ry, try_, K, D, dt); spring(S.rz, trz, K, D, dt);
  // ---- place: camera → the gun's rest pose → the rig through the gun's inverse; the clip moves the gun from there ----
  VMS.root.matrix.copy(camera.matrixWorld); VMS.root.matrixWorldNeedsUpdate = true; VMS.root.updateMatrixWorld(true);
  _e.set(S.rx.x, S.ry.x, S.rz.x, 'YXZ'); _q.setFromEuler(_e);
  _m.makeTranslation(Sg.x, Sg.y, Sg.z).multiply(_m2.makeRotationFromQuaternion(_q)).multiply(_m3.makeTranslation(-Sg.x, -Sg.y, -Sg.z));
  _q2.copy(R.hipQ).slerp(_qi, ads);
  R.gunHolder.matrix.makeTranslation(S.px.x, S.py.x, S.pz.x).multiply(_m3.makeRotationFromQuaternion(_q2)).multiply(_m); R.gunHolder.matrixWorldNeedsUpdate = true; R.gunHolder.updateMatrixWorld(true);
  R.holder.matrix.multiplyMatrices(R.gunHolder.matrix, R.rigInGun); R.holder.matrixWorldNeedsUpdate = true;
  R.mixer.update(dt);
  R.holder.updateMatrixWorld(true);
  // the stand-ins' magazine and slide move our gun's parts; pump and bolt by hand
  follow(R, R.mag, R.magP, R.magRest);
  follow(R, R.slide, R.slideP, R.slideRest);
  const P_ = R.g.parts;
  if(P_.pump){ P_.pump.position.copy(P_.pump.userData.home); P_.pump.position.z += pump * 0.085 / Math.max(1e-3, P_.pump.parent.getWorldScale(_sc).z / R.mount.getWorldScale(_v2).z); }
  if(P_.bolt && W.bolt){ P_.bolt.position.copy(P_.bolt.userData.home); P_.bolt.position.z += bolt * 0.07 / Math.max(1e-3, P_.bolt.parent.getWorldScale(_sc).z / R.mount.getWorldScale(_v2).z); }
  // the left hand: onto this gun's handguard while it just holds the gun (the clip owns it during reloads), to the
  // loading port for shells, back along with the pump
  const hold = R.w.idle || 0, wrist = R.arm[2];
  if(R.kind === 'rifle' && (hold > 0.01 || shellHand > 0 || pump > 0)){
    pos(wrist, _T);
    _v.copy(R.leftDelta).multiplyScalar(hold); _v.z += pump * 0.085;
    _T.add(_v.applyMatrix3(_n3.setFromMatrix4(R.mount.matrixWorld)));
    if(shellHand > 0){ R.g.eject.getWorldPosition(_v2); _v2.add(_sc.set(0, -0.08, 0.02).applyQuaternion(camera.quaternion)); _T.lerp(_v2, shellHand * 0.8); }
    _pole.set(-0.4, -1, 0.2).applyQuaternion(camera.quaternion).normalize();
    ik(R.arm, _T, _pole);
  }
  // muzzle flash and light
  S.fireT += dt;
  R.g.flash.visible = S.fireT < 0.04;
  if(S.fireT < dt * 1.5 && VMS.light){ R.g.muzzle.getWorldPosition(VMS.light.position); VMS.light.intensity = 25; }
  VMS.key.position.set(-0.6, 1, 0.4).applyMatrix4(camera.matrixWorld); VMS.key.target.position.set(0.2, -0.3, -1).applyMatrix4(camera.matrixWorld); VMS.key.target.updateMatrixWorld();
}
