// First person: your own fighter's arms (the same Mixamo model, drawn arms-only — every other vertex is discarded)
// holding the gun, in their own pass. The arms keep the aiming clip's pose and move with the gun as one piece (that is
// what makes the hands look natural); only the left hand is brought by IK onto this gun's handguard (or under the
// pistol grip) and to the magazine or the loading port when reloading. The gun sits at the hip or, aiming, with its
// sights on the screen centre. Springs add sway, bob, the sprint carry, the recoil kick and the swap; flash, casings.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { G, on, emit } from './state.js';
import { scene, camera, vmMaterial, VM_LAYER, VM } from './engine.js';
import { buildGun } from './gunmodels.js';
import { gun } from './fighter.js';
import { WEAPONS } from './weapons.js';
import { PL } from './player.js';
import { sp, spring, clamp, damp, lerp } from './util.js';
import { T as T_, ambient, AMB_K } from './soldiers.js';
import { lightRGB } from './level/lights.js';
import { zoneTint } from './zone.js';

export const VMS = { root:null, rig:null, cur:null, flash:null, shown:true, look:null, ambU:{ value:new THREE.Color(0.3, 0.27, 0.2) } };
const S = { px:sp(), py:sp(), pz:sp(), rx:sp(), ry:sp(), rz:sp(), swayX:0, swayY:0, sprint:0, lower:0, fireT:9, cycleT:9, reloadOf:null };
const ARM = /^(LeftForeArm|RightForeArm|LeftHand|RightHand)/;          // forearms and hands (the upper arms would fill the screen)
// the support hand wraps the handguard: finger joints curl (radians, about each bone's own x)
const CURL = { Index:[0.75, 1.1, 0.7], Middle:[0.8, 1.15, 0.75], Ring:[0.85, 1.15, 0.7], Pinky:[0.9, 1.1, 0.65], Thumb:[0, 0.35, 0.3] };
// gun pose in camera space: hip (grip position) and the aim distance of the sights
const HIP = { rifle:[0.13, -0.17, -0.34], shotgun:[0.13, -0.17, -0.32], sniper:[0.14, -0.18, -0.36], pistol:[0.1, -0.15, -0.38] };   // grip, hip carry
const ADS_D = { rifle:0.23, shotgun:0.24, sniper:0.12, pistol:0.4 };                  // eye to the sights when aiming
const IKB = ['LeftArm', 'LeftForeArm', 'LeftHand', 'RightArm', 'RightForeArm', 'RightHand'];

export function initViewmodel(){
  const root = VMS.root = new THREE.Group(); root.matrixAutoUpdate = false; scene.add(root);
  VMS.light = new THREE.PointLight('#FFB060', 0, 6, 2); VMS.light.layers.enableAll(); scene.add(VMS.light);
  const key = VMS.key = new THREE.DirectionalLight('#FFF0D8', 0.6); key.layers.set(VM_LAYER); scene.add(key, key.target);
  VMS.amb = new THREE.HemisphereLight('#FFF0C8', '#2A2010', 0.5); VMS.amb.layers.set(VM_LAYER); scene.add(VMS.amb);
}
// the rig for a look (office person) and a gun
export function setRig(look, gid){
  if(VMS.rig && VMS.look === look && VMS.gid === gid) return;
  if(VMS.rig){ VMS.root.remove(VMS.rig.holder); VMS.root.remove(VMS.rig.gunHolder); VMS.rig.mixer.stopAllAction(); }
  const model = cloneSkinned(T_.tpl[look]), holder = new THREE.Group(); holder.matrixAutoUpdate = false; holder.add(model);
  const bones = {}; model.traverse(n => { if(n.isBone) bones[n.name] = n; });
  model.traverse(m => {
    if(!m.isSkinnedMesh) return;
    // arms only: mark each vertex by its strongest bone
    const geo = m.geometry.clone(), si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight, names = m.skeleton.bones.map(b => b.name), mask = new Float32Array(si.count);
    for(let i = 0; i < si.count; i++){ let best = 0, bw = -1; for(let k = 0; k < 4; k++){ const w = sw.getComponent(i, k); if(w > bw){ bw = w; best = si.getComponent(i, k); } } mask[i] = ARM.test(names[best] || '') ? 1 : 0; }
    geo.setAttribute('armMask', new THREE.BufferAttribute(mask, 1)); m.geometry = geo;
    const mat = m.material.clone(); ambient(mat, VMS.ambU); const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (s, r) => { if(prev) prev(s, r);
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute float armMask; varying float vArm;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvArm = armMask;');
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vArm;').replace('void main() {', 'void main() {\n  if(vArm < 0.5) discard;'); };
    m.material = vmMaterial(mat); m.material.customProgramCacheKey = () => 'vmarm';
    m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; m.layers.set(VM_LAYER);
  });
  model.traverse(o => { if(!o.isSkinnedMesh && o.isMesh) o.visible = false; });
  const g = buildGun(gid, true);
  g.root.traverse(o => { if(o.isMesh) ambient(o.material, VMS.ambU); });
  g.flash = muzzleFlash(); g.muzzle.add(g.flash);
  const mixer = new THREE.AnimationMixer(model);
  const aim = mixer.clipAction(T_.clips.aim); aim.play(); aim.time = 0.5; aim.paused = true;
  mixer.update(0);
  const _cq = new THREE.Quaternion(), _ax = new THREE.Vector3(1, 0, 0);
  for(const fn in CURL) CURL[fn].forEach((a, j) => { const b = bones['LeftHand' + fn + (j + 1)]; if(b && a) b.quaternion.multiply(_cq.setFromAxisAngle(_ax, a)); });
  holder.updateMatrixWorld(true);
  // hands relative to the gun in the aiming pose (the gun mounted in the right hand as the third-person models hold it)
  const mount = new THREE.Group(); mount.matrixAutoUpdate = false; mount.matrix.copy(T_.mount); bones.RightHand.add(mount); mount.add(g.root);
  holder.updateMatrixWorld(true);
  const gunM = g.root.matrixWorld.clone(), gunInv = gunM.clone().invert();
  const offR = gunInv.clone().multiply(bones.RightHand.matrixWorld), offL = gunInv.clone().multiply(bones.LeftHand.matrixWorld);
  // the left palm (between wrist and middle knuckle), in gun space: it goes onto the handguard
  const palmL = new THREE.Vector3().setFromMatrixPosition(bones.LeftHand.matrixWorld).lerp(new THREE.Vector3().setFromMatrixPosition(bones.LeftHandMiddle1.matrixWorld), 0.55).applyMatrix4(gunInv);
  const wristL = new THREE.Vector3().setFromMatrixPosition(offL);
  offL.setPosition(wristL.add(g.gripL.position.clone().add(new THREE.Vector3(0.008, -0.05, 0)).sub(palmL)));
  mount.remove(g.root); bones.RightHand.remove(mount);
  // the gun now lives in camera space; the rig rides with it as one piece (its pose relative to the gun is kept)
  const gunHolder = new THREE.Group(); gunHolder.matrixAutoUpdate = false; gunHolder.add(g.root); g.root.position.set(0, 0, 0); g.root.quaternion.identity(); g.root.updateMatrix();
  VMS.root.add(gunHolder);
  const rigInGun = gunInv.clone();
  const base = {}; for(const n of IKB) base[n] = bones[n].quaternion.clone();
  VMS.root.add(holder);
  const kind = WEAPONS[gid].kind;
  VMS.rig = { model, holder, bones, mixer, aim, g, gunHolder, rigInGun, offR, offL, base, kind, hip:HIP[kind] || HIP.rifle, adsD:ADS_D[kind] || ADS_D.rifle, sight:g.sight.position.clone(), magHome:g.parts.mag ? g.parts.mag.position.clone() : null };
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

on('fire', f => { if(f !== G.me || !VMS.rig) return;
  const W = gun(f).W, k = 1 - f.adsK * 0.45, R = W.recoil;
  S.pz.v += (0.45 + R.punch * 0.18) * k; S.rx.v += (1.0 + R.punch * 0.6) * k; S.rz.v += (Math.random() - 0.5) * 1.6 * k; S.py.v += 0.12 * k; S.ry.v += (Math.random() - 0.5) * 0.6 * k;
  S.fireT = 0; const g = VMS.rig.g; g.flash.rotation.z = Math.random() * 6.3; g.flash.scale.setScalar(0.8 + Math.random() * 0.5);
  emit('casing', f, g.eject, W.id);
});
on('lower', f => { if(f === G.me) S.lowering = true; });
on('pump', f => { if(f === G.me) S.cycleT = 0; });
on('bolt', f => { if(f === G.me) S.cycleT = 0; });
on('equip', f => { if(f === G.me){ S.lowering = false; S.lower = 1; } });
on('spawn', f => { if(f === G.me){ S.lower = 1; S.lowering = false; S.snap = true; S.reloadOf = null; } });

const _hm = new THREE.Matrix4(), _hp = new THREE.Vector3(), _mp = new THREE.Vector3(), _mp2 = new THREE.Vector3(), _v3 = new THREE.Vector3(), _rgb = [0, 0, 0], _m2 = new THREE.Matrix4(), _m3 = new THREE.Matrix4(), _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _one = new THREE.Vector3(1, 1, 1);
const ease = t => t * t * (3 - 2 * t);
const seg = (t, a, b) => ease(clamp((t - a) / (b - a), 0, 1));
const bump = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a), 0, 1));
// two-bone IK: shoulder → elbow → wrist reaches the target matrix (position and hand rotation); the elbow keeps the
// side it bends to in the animation
const _A = new THREE.Vector3(), _B = new THREE.Vector3(), _C = new THREE.Vector3(), _T = new THREE.Vector3(), _n = new THREE.Vector3(), _d = new THREE.Vector3(), _e1 = new THREE.Vector3(), _e2 = new THREE.Vector3(), _qa = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _qt = new THREE.Quaternion(), _sc = new THREE.Vector3();
function aimBone(bone, from, to){
  _qa.setFromUnitVectors(from.normalize(), to.normalize());
  bone.getWorldQuaternion(_qt); _qt.premultiply(_qa);
  bone.parent.getWorldQuaternion(_qp); bone.quaternion.copy(_qp.invert().multiply(_qt)); bone.updateMatrixWorld(true);
}
// two-bone IK; the elbow bends toward `pole` (a world direction: down and out to the side, like a real arm)
const _pole = new THREE.Vector3(), _pp = new THREE.Vector3();
function ik(B, side, target, pole){
  const a = B[side + 'Arm'], b = B[side + 'ForeArm'], c = B[side + 'Hand'];
  a.getWorldPosition(_A); b.getWorldPosition(_B); c.getWorldPosition(_C); _T.setFromMatrixPosition(target);
  const l1 = _A.distanceTo(_B), l2 = _B.distanceTo(_C), dist = clamp(_A.distanceTo(_T), 0.02, l1 + l2 - 1e-3);
  _d.subVectors(_T, _A).normalize();
  // the bend plane holds the shoulder→target line and the pole
  _pp.copy(pole).addScaledVector(_d, -pole.dot(_d)); if(_pp.lengthSq() < 1e-6) _pp.set(0, -1, 0); _pp.normalize();
  const ang = Math.acos(clamp((l1 * l1 + dist * dist - l2 * l2) / (2 * l1 * dist), -1, 1));
  const elbow = _e1.copy(_d).multiplyScalar(Math.cos(ang) * l1).addScaledVector(_pp, Math.sin(ang) * l1).add(_A);
  aimBone(a, _sc.subVectors(_B, _A), _d.subVectors(elbow, _A));
  b.getWorldPosition(_B); c.getWorldPosition(_C);
  aimBone(b, _sc.subVectors(_C, _B), _d.subVectors(_T, _B));
  // the hand takes the target's rotation
  target.decompose(_sc, _qt, _d); c.parent.getWorldQuaternion(_qp); c.quaternion.copy(_qp.invert().multiply(_qt)); c.updateMatrixWorld(true);
}
export function updateViewmodel(dt){
  const f = G.me;
  const show = !!f && f.alive && G.state === 'play' && VMS.shown && !!VMS.rig;
  VMS.root.visible = show;
  if(VMS.light) VMS.light.intensity = Math.max(0, VMS.light.intensity - dt * 500);
  if(!show) return;
  const R = VMS.rig, g = gun(f), W = g.W;
  if(VMS.gid !== W.id || VMS.look !== f.look) setRig(f.look, W.id);
  VM.clip.value = f.adsK * 0.12;
  if(G.level){ zoneTint(f.x, f.z, lightRGB(G.level, f.x, f.z, _rgb)); VMS.ambU.value.setRGB(0.05 + _rgb[0] * AMB_K * 0.8, 0.045 + _rgb[1] * AMB_K * 0.8, 0.035 + _rgb[2] * AMB_K * 0.8); }
  // ---- reload: the gun tips, the left hand pulls the magazine down and out of view, brings a new one, slaps it in ----
  let magOff = 0, magVis = true, hand = 0, handDrop = 0, tilt = 0, charge = 0, pump = 0, bolt = 0, shellHand = 0;
  if(f.reload && W.reload.kind === 'shell'){
    // shells one by one: the gun rolls over, the left hand goes under to the loading port for each
    const R_ = f.reload, Rw = W.reload;
    tilt = R_.stage === 'start' ? seg(R_.t, 0, Rw.start) : R_.stage === 'end' ? 1 - seg(R_.t, 0, Rw.end) : 1;
    if(R_.stage === 'shells') shellHand = bump(R_.t, 0, Rw.shell);
    if(R_.stage === 'end') pump = bump(R_.t, 0, Rw.end * 0.9);
  } else if(f.reload){
    const t = clamp(f.reload.t / Math.max(0.5, f.reload.total), 0, 1), R_ = f.reload;
    const once = (k, at, fn) => { if(t >= at && !R_[k]){ R_[k] = true; fn(); } };
    tilt = seg(t, 0, 0.12) * (1 - seg(t, 0.85, 1));
    hand = seg(t, 0.06, 0.18) * (1 - seg(t, 0.72, 0.84));
    magOff = seg(t, 0.2, 0.34) * (1 - seg(t, 0.5, 0.64)); magVis = !(t > 0.34 && t < 0.5);
    handDrop = seg(t, 0.22, 0.36) * (1 - seg(t, 0.44, 0.58));
    once('s1', 0.2, () => emit('vmSound', 'mag_out_2')); once('s2', 0.62, () => { emit('vmSound', 'mag_in_2'); S.rx.v -= 0.6; S.py.v += 0.15; });
    if(R_.empty){ charge = bump(t, 0.76, 0.9); once('s3', 0.77, () => emit('vmSound', 'charge_2')); }
  }
  // pump and bolt after a shot
  S.cycleT += dt;
  if(W.pump && S.cycleT < W.pump) pump = bump(S.cycleT, 0.08, W.pump * 0.85);
  if(W.bolt && S.cycleT < W.bolt) bolt = bump(S.cycleT, 0.12, W.bolt * 0.9);
  // medicine: the gun goes down out of the way
  S.heal = damp(S.heal || 0, f.use ? 1 : 0, 9, dt);
  // ---- springs toward the pose ----
  const ads = f.adsK * f.adsK * (3 - 2 * f.adsK);
  S.sprint = damp(S.sprint, f.sprintT > 0.05 ? 1 : 0, 8, dt);
  S.lower = damp(S.lower, S.lowering ? 1 : 0, S.lowering ? 16 : 7, dt);
  S.swayX = damp(S.swayX, clamp((PL.mdx || 0) * 0.0008, -0.05, 0.05), 9, dt);
  S.swayY = damp(S.swayY, clamp((PL.mdy || 0) * 0.0008, -0.04, 0.04), 9, dt);
  const sw = 1 - ads * 0.85;
  const hs = Math.hypot(f.vx, f.vz), bk = Math.min(1, hs / 5) * (f.ground ? 1 : 0) * (1 - ads * 0.85), bt = PL.bobT;
  // hip: the rig's eyes at the camera, the gun a little low and right; aiming: the sights on the centre line
  const Sg = R.sight, HP = R.hip;
  let tx = lerp(HP[0], -Sg.x, ads), ty = lerp(HP[1], -Sg.y, ads), tz = lerp(HP[2], -Sg.z - R.adsD, ads);
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
  // ---- place: camera → gun pose → rig through the gun's inverse ----
  VMS.root.matrix.copy(camera.matrixWorld); VMS.root.matrixWorldNeedsUpdate = true; VMS.root.updateMatrixWorld(true);
  _e.set(S.rx.x, S.ry.x, S.rz.x, 'YXZ'); _q.setFromEuler(_e);
  // the gun: at its pose, turned around the sight (kick, sway)
  _m.makeTranslation(Sg.x, Sg.y, Sg.z).multiply(_m2.makeRotationFromQuaternion(_q)).multiply(_m3.makeTranslation(-Sg.x, -Sg.y, -Sg.z));
  R.gunHolder.matrix.makeTranslation(S.px.x, S.py.x, S.pz.x).multiply(_m); R.gunHolder.matrixWorldNeedsUpdate = true; R.gunHolder.updateMatrixWorld(true);
  if(R.g.parts.mag && R.magHome){ R.g.parts.mag.position.copy(R.magHome); R.g.parts.mag.position.y -= magOff * 0.3; R.g.parts.mag.visible = magVis; }
  const P_ = R.g.parts;
  if(P_.pump){ P_.pump.position.copy(P_.pump.userData.home); P_.pump.position.z += pump * 0.085 / Math.max(1e-3, P_.pump.parent.getWorldScale(_sc).z / R.gunHolder.getWorldScale(_p).z); }
  if(P_.bolt && W.bolt){ P_.bolt.position.copy(P_.bolt.userData.home); P_.bolt.position.z += bolt * 0.07 / Math.max(1e-3, P_.bolt.parent.getWorldScale(_sc).z / R.gunHolder.getWorldScale(_p).z); }
  // the rig rides with the gun; the arms keep the aiming pose, the left hand is placed by IK
  R.holder.matrix.multiplyMatrices(R.gunHolder.matrix, R.rigInGun);
  R.holder.matrixWorldNeedsUpdate = true;
  for(const n of IKB) R.bones[n].quaternion.copy(R.base[n]);
  R.holder.updateMatrixWorld(true);
  _hm.multiplyMatrices(R.gunHolder.matrixWorld, _m.makeTranslation(0, 0, pump * 0.085).multiply(R.offL));
  if(shellHand > 0){ _hp.setFromMatrixPosition(_hm); R.g.eject.getWorldPosition(_mp); _mp.add(_v3.set(0, -0.06, 0).applyQuaternion(camera.quaternion)); _hp.lerp(_mp, shellHand * 0.85); _hm.setPosition(_hp); }
  if(hand > 0){
    // the left hand goes to the magazine, then down out of view and back
    _hp.setFromMatrixPosition(_hm); _mp.set(0, -0.12 - handDrop * 0.35, 0.03 + handDrop * 0.1).applyMatrix4(R.gunHolder.matrixWorld);
    if(R.g.parts.mag){ R.g.parts.mag.getWorldPosition(_mp2); _mp.lerp(_mp2.add(_v3.set(0, -handDrop * 0.4, 0)), 0.7); }
    _hp.lerp(_mp, hand); _hm.setPosition(_hp);
  }
  // the left elbow points down and a little out to the left (camera space)
  _pole.set(-0.45, -1, 0.15).applyQuaternion(camera.quaternion).normalize();
  ik(R.bones, 'Left', _hm, _pole);
  // muzzle flash and light
  S.fireT += dt;
  R.g.flash.visible = S.fireT < 0.04;
  if(S.fireT < dt * 1.5 && VMS.light){ R.g.muzzle.getWorldPosition(VMS.light.position); VMS.light.intensity = 25; }
  VMS.key.position.set(-0.6, 1, 0.4).applyMatrix4(camera.matrixWorld); VMS.key.target.position.set(0.2, -0.3, -1).applyMatrix4(camera.matrixWorld); VMS.key.target.updateMatrixWorld();
}
