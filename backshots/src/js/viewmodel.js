// First person: your own fighter's arms (the same Mixamo model, drawn arms-only — every other vertex is discarded)
// holding the rifle, in their own pass. The arms are posed by the aiming clip and play the real reload clip; the whole
// rig is placed so the gun sits at the hip position or, aiming, with its sights on the screen centre. Springs add
// sway when you turn, bob when you walk, the sprint carry, the recoil kick and the swap; a muzzle flash, casings.
import * as THREE from 'three';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { G, on, emit } from './state.js';
import { scene, camera, vmMaterial, VM_LAYER, VM } from './engine.js';
import { buildGun } from './gunmodels.js';
import { gun } from './fighter.js';
import { PL } from './player.js';
import { sp, spring, clamp, damp, lerp } from './util.js';
import { T as T_ } from './soldiers.js';

export const VMS = { root:null, rig:null, cur:null, flash:null, shown:true, look:null };
const S = { px:sp(), py:sp(), pz:sp(), rx:sp(), ry:sp(), rz:sp(), swayX:0, swayY:0, sprint:0, lower:0, fireT:9, reloadOf:null };
const ARM = /^(LeftShoulder|RightShoulder|LeftArm|RightArm|LeftForeArm|RightForeArm|LeftHand|RightHand)/;
// gun pose in camera space: hip (grip position) and the aim distance of the sights
const HIP = [0.15, -0.165, -0.3], ADS_D = 0.22;

export function initViewmodel(){
  const root = VMS.root = new THREE.Group(); root.matrixAutoUpdate = false; scene.add(root);
  VMS.light = new THREE.PointLight('#FFB060', 0, 6, 2); VMS.light.layers.enableAll(); scene.add(VMS.light);
  const key = VMS.key = new THREE.DirectionalLight('#FFF0D8', 0.6); key.layers.set(VM_LAYER); scene.add(key, key.target);
  VMS.amb = new THREE.HemisphereLight('#FFF0C8', '#2A2010', 0.5); VMS.amb.layers.set(VM_LAYER); scene.add(VMS.amb);
}
// the rig for a look (office person) and a gun
export function setRig(look, gid){
  if(VMS.rig && VMS.look === look && VMS.gid === gid) return;
  if(VMS.rig){ VMS.root.remove(VMS.rig.holder); VMS.rig.mixer.stopAllAction(); }
  const model = cloneSkinned(T_.tpl[look]), holder = new THREE.Group(); holder.matrixAutoUpdate = false; holder.add(model);
  const bones = {}; model.traverse(n => { if(n.isBone) bones[n.name] = n; });
  model.traverse(m => {
    if(!m.isSkinnedMesh) return;
    // arms only: mark each vertex by its strongest bone
    const geo = m.geometry.clone(), si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight, names = m.skeleton.bones.map(b => b.name), mask = new Float32Array(si.count);
    for(let i = 0; i < si.count; i++){ let best = 0, bw = -1; for(let k = 0; k < 4; k++){ const w = sw.getComponent(i, k); if(w > bw){ bw = w; best = si.getComponent(i, k); } } mask[i] = ARM.test(names[best] || '') ? 1 : 0; }
    geo.setAttribute('armMask', new THREE.BufferAttribute(mask, 1)); m.geometry = geo;
    const mat = m.material.clone(), prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (s, r) => { if(prev) prev(s, r);
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute float armMask; varying float vArm;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvArm = armMask;');
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vArm;').replace('void main() {', 'void main() {\n  if(vArm < 0.5) discard;'); };
    m.material = vmMaterial(mat); m.material.customProgramCacheKey = () => 'vmarm';
    m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; m.layers.set(VM_LAYER);
  });
  model.traverse(o => { if(!o.isSkinnedMesh && o.isMesh) o.visible = false; });
  const g = buildGun(gid, true), mount = new THREE.Group(); mount.matrixAutoUpdate = false; mount.matrix.copy(T_.mount); mount.add(g.root); bones.RightHand.add(mount);
  g.flash = muzzleFlash(); g.muzzle.add(g.flash);
  const mixer = new THREE.AnimationMixer(model);
  const aim = mixer.clipAction(T_.clips.aim); aim.play(); aim.time = 0.5; aim.paused = true;
  const reload = mixer.clipAction(T_.clips.reload); reload.setLoop(THREE.LoopOnce, 1); reload.clampWhenFinished = true;
  mixer.update(0); holder.updateMatrixWorld(true);
  // the gun's pose inside the rig (aiming clip): the rig is placed through its inverse
  const gunInRig = new THREE.Matrix4().copy(g.root.matrixWorld);
  VMS.root.add(holder);
  VMS.rig = { model, holder, bones, mixer, aim, reload, g, gunInRigInv:gunInRig.clone().invert(), sight:g.sight.position.clone() };
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
on('equip', f => { if(f === G.me){ S.lowering = false; S.lower = 1; } });
on('spawn', f => { if(f === G.me){ S.lower = 1; S.lowering = false; S.snap = true; S.reloadOf = null; } });

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _one = new THREE.Vector3(1, 1, 1);
export function updateViewmodel(dt){
  const f = G.me;
  const show = !!f && f.alive && G.state === 'play' && VMS.shown && !!VMS.rig;
  VMS.root.visible = show;
  if(VMS.light) VMS.light.intensity = Math.max(0, VMS.light.intensity - dt * 500);
  if(!show) return;
  const R = VMS.rig, g = gun(f), W = g.W;
  if(VMS.gid !== W.id || VMS.look !== f.look) setRig(f.look, W.id);
  VM.clip.value = f.adsK * 0.12;
  // ---- reload clip on the arms ----
  if(f.reload && S.reloadOf !== f.reload){ S.reloadOf = f.reload; R.reload.reset(); R.reload.timeScale = R.reload.getClip().duration / Math.max(0.5, f.reload.total || 2.4); R.reload.setEffectiveWeight(1); R.reload.play(); emit('vmSound', 'mag_out_2', 0.35); }
  if(!f.reload && R.reload.isRunning()){ R.reload.fadeOut(0.25); }
  if(f.reload){ const tt = f.reload.t / Math.max(0.5, f.reload.total); if(tt > 0.62 && !f.reload.inSnd){ f.reload.inSnd = true; emit('vmSound', 'mag_in_2'); } if(f.reload.empty && tt > 0.86 && !f.reload.chSnd){ f.reload.chSnd = true; emit('vmSound', 'charge_2'); } }
  R.mixer.update(dt);
  // ---- springs toward the pose ----
  const ads = f.adsK * f.adsK * (3 - 2 * f.adsK);
  S.sprint = damp(S.sprint, f.sprintT > 0.05 ? 1 : 0, 8, dt);
  S.lower = damp(S.lower, S.lowering ? 1 : 0, S.lowering ? 16 : 7, dt);
  S.swayX = damp(S.swayX, clamp((PL.mdx || 0) * 0.0008, -0.05, 0.05), 9, dt);
  S.swayY = damp(S.swayY, clamp((PL.mdy || 0) * 0.0008, -0.04, 0.04), 9, dt);
  const sw = 1 - ads * 0.85;
  const hs = Math.hypot(f.vx, f.vz), bk = Math.min(1, hs / 5) * (f.ground ? 1 : 0) * (1 - ads * 0.85), bt = PL.bobT;
  // hip: the grip at HIP; aiming: the sight on the centre line at ADS_D
  const sx = R.sight.x, sy = R.sight.y, sz = R.sight.z;
  let tx = lerp(HIP[0], -sx, ads), ty = lerp(HIP[1], -sy, ads), tz = lerp(HIP[2], -ADS_D - sz, ads);
  let trx = 0, try_ = 0, trz = 0;
  tx += Math.sin(bt) * 0.011 * bk - S.swayX * sw; ty += -Math.abs(Math.cos(bt)) * 0.012 * bk + S.swayY * sw;
  trz += -S.swayX * 1.4 * sw; trx += S.swayY * 0.7 * sw; try_ += S.swayX * 0.7 * sw;
  ty += Math.sin(G.time * 1.5) * 0.0028 * (1 - ads * 0.9);
  tx += -0.05 * S.sprint; ty += -0.06 * S.sprint; try_ += 0.6 * S.sprint; trx += -0.3 * S.sprint; trz += 0.3 * S.sprint;
  if(S.sprint > 0.1){ tx += Math.sin(bt) * 0.022 * S.sprint; ty += -Math.abs(Math.cos(bt)) * 0.02 * S.sprint; }
  trz += 0.05 * f.crouchK * (1 - ads) - f.leanK * 0.12;
  if(!f.ground) ty += 0.012;
  ty -= S.lower * 0.3; trx -= S.lower * 0.8;
  if(S.snap){ S.snap = false; for(const [s_, v] of [[S.px, tx], [S.py, ty], [S.pz, tz], [S.rx, trx], [S.ry, try_], [S.rz, trz]]){ s_.x = v; s_.v = 0; } }
  const K = 210, D = 22;
  spring(S.px, tx, K, D, dt); spring(S.py, ty, K, D, dt); spring(S.pz, tz, K * 0.8, D * 0.8, dt);
  spring(S.rx, trx, K, D, dt); spring(S.ry, try_, K, D, dt); spring(S.rz, trz, K, D, dt);
  // ---- place: camera → gun pose → rig through the gun's inverse ----
  VMS.root.matrix.copy(camera.matrixWorld); VMS.root.matrixWorldNeedsUpdate = true; VMS.root.updateMatrixWorld(true);
  _e.set(S.rx.x, S.ry.x, S.rz.x, 'YXZ'); _q.setFromEuler(_e);
  // rotate around the sight when aiming (it stays on the centre), around the grip from the hip
  _m.compose(_p.set(S.px.x, S.py.x, S.pz.x), _q, _one);
  R.holder.matrix.copy(_m).multiply(R.gunInRigInv);
  R.holder.matrixWorldNeedsUpdate = true;
  R.holder.updateMatrixWorld(true);
  // muzzle flash and light
  S.fireT += dt;
  R.g.flash.visible = S.fireT < 0.04;
  if(S.fireT < dt * 1.5 && VMS.light){ R.g.muzzle.getWorldPosition(VMS.light.position); VMS.light.intensity = 25; }
  VMS.key.position.set(-0.6, 1, 0.4).applyMatrix4(camera.matrixWorld); VMS.key.target.position.set(0.2, -0.3, -1).applyMatrix4(camera.matrixWorld); VMS.key.target.updateMatrixWorld();
}
