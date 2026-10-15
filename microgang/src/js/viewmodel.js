// First person: your insect forelegs holding the gun. Springs drive everything — sway when you turn, bob when you
// walk, the sprint carry, aiming down the sights, the recoil kick — and each gun has its own hand-made reload:
// the chitin magazine drops out and a new one snaps in, shells go one by one into the acorn shotgun, the needle's
// bolt is worked after every shot, the honeycomb cylinder swings out and spills its casings.
import * as THREE from 'three';
import { G, on, emit } from './state.js';
import { scene, camera, vmMaterial, VM_LAYER, VM } from './engine.js';
import { buildGun } from './gunmodels.js';
import { gun } from './fighter.js';
import { PL } from './player.js';
import { sp, spring, clamp, damp, lerp } from './util.js';

export const VMS = { root:null, guns:{}, cur:null, arms:null, species:null, flash:null, shown:true };
const S = { px:sp(), py:sp(), pz:sp(), rx:sp(), ry:sp(), rz:sp(), swayX:0, swayY:0, kick:0, adsK:0, sprint:0, lower:0, fireT:9, act:null, actT:0 };

// ---- arms: segmented chitin forelegs with a two-claw grip, coloured per species ----
const ARM = {
  ant:    { c:'#5A2410', c2:'#3A1608', gloss:0.85, iri:0.1, fuzz:0 },
  beetle: { c:'#1C2A1E', c2:'#0E140F', gloss:1.0, iri:0.9, fuzz:0 },
  bee:    { c:'#1E1810', c2:'#C89020', gloss:0.5, iri:0, fuzz:1 },
  hopper: { c:'#5E8A2C', c2:'#3E5E1A', gloss:0.6, iri:0.15, fuzz:0 },
  shroom: { c:'#E8DCC0', c2:'#B8A47E', gloss:0.15, iri:0, fuzz:0.4 },
};
function armMats(sp){
  const A = ARM[sp] || ARM.ant;
  const shell = vmMaterial(new THREE.MeshPhysicalMaterial({ color:A.c, roughness:sp === 'shroom' ? 0.75 : 0.32, clearcoat:A.gloss, clearcoatRoughness:0.15, iridescence:A.iri, iridescenceIOR:1.5, iridescenceThicknessRange:[250, 700],
    sheen:A.fuzz, sheenColor:new THREE.Color(A.c2), sheenRoughness:0.6 }));
  const joint = vmMaterial(new THREE.MeshPhysicalMaterial({ color:A.c2, roughness:0.45, clearcoat:0.4, sheen:A.fuzz, sheenColor:new THREE.Color('#E8C060') }));
  return { shell, joint };
}
// unit segment along +y (0..1), slightly bulging, ringed at the ends
function segGeo(r0, r1){
  const pts = [[0, 0], [r0 * 0.85, 0.0], [r0, 0.08], [lerp(r0, r1, 0.5) * 1.12, 0.5], [r1, 0.9], [r1 * 0.8, 1]].map(p => new THREE.Vector2(p[0], p[1]));
  return new THREE.LatheGeometry(pts, 14);
}
function buildArm(mats, side, sp){
  const g = new THREE.Group();
  const upper = new THREE.Mesh(segGeo(0.05, 0.04), mats.shell), fore = new THREE.Mesh(segGeo(0.042, 0.03), mats.shell);
  const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.042, 12, 10), mats.joint);
  const hand = new THREE.Group();
  // palm and two hooked claws wrapped round the grip, a thumb spur
  hand.add(new THREE.Mesh(new THREE.SphereGeometry(0.034, 12, 10).scale(1, 0.8, 1.3), mats.joint));
  const claw = (a, l, rz) => { const c = new THREE.Mesh(new THREE.ConeGeometry(0.013, l, 8).translate(0, l / 2, 0), mats.shell); c.rotation.set(a, 0, rz); return c; };
  const c1 = claw(-2.0, 0.07, side * 0.9), c2 = claw(-2.3, 0.065, side * 0.6), th = claw(-0.6, 0.05, -side * 0.9);
  c1.position.set(side * 0.01, 0, -0.01); c2.position.set(side * 0.012, -0.004, 0.014); th.position.set(-side * 0.02, 0.01, -0.005);
  hand.add(c1, c2, th);
  // little spines along the shin (grasshopper, beetle), fuzz rings (bee)
  if(sp === 'hopper' || sp === 'beetle') for(let i = 0; i < 4; i++){ const s = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.03, 5).translate(0, 0.015, 0), mats.joint); s.position.set(0, 0.25 + i * 0.18, side * 0.03); s.rotation.x = side * 1.2; fore.add(s); }
  if(sp === 'bee') for(let i = 0; i < 3; i++){ const r = new THREE.Mesh(new THREE.TorusGeometry(0.047, 0.012, 6, 14).rotateX(Math.PI / 2), mats.joint); r.position.y = 0.2 + i * 0.25; upper.add(r); }
  for(const m of [upper, fore, elbow, ...hand.children, ...fore.children, ...upper.children]) if(m.isMesh){ m.layers.set(VM_LAYER); m.frustumCulled = false; m.receiveShadow = true; }
  g.add(upper, fore, elbow, hand);
  return { g, upper, fore, elbow, hand, side };
}
// two-bone arm from a shoulder (camera space) to a target hand position, elbow bent outward and down
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _c = new THREE.Vector3(), _d = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0), _q = new THREE.Quaternion();
function poseArm(A, sh, hand, handQ, L1, L2){
  const d = _a.subVectors(hand, sh), len = Math.min(d.length(), L1 + L2 - 1e-3);
  d.normalize();
  const pole = _b.set(A.side * 0.8, -1, 0.3).normalize();
  const side = _c.crossVectors(d, pole).normalize(), bend = _d.crossVectors(side, d).normalize();
  const a = (L1 * L1 + len * len - L2 * L2) / (2 * L1 * len), ang = Math.acos(clamp(a, -1, 1));
  const elbow = sh.clone().addScaledVector(d, Math.cos(ang) * L1).addScaledVector(bend, Math.sin(ang) * L1);
  const handP = sh.clone().addScaledVector(d, len);
  const seg = (m, p0, p1) => { const v = p1.clone().sub(p0), l = v.length(); m.position.copy(p0); m.quaternion.setFromUnitVectors(UP, v.normalize()); m.scale.set(1, l, 1); };
  seg(A.upper, sh, elbow); seg(A.fore, elbow, handP);
  A.elbow.position.copy(elbow);
  A.hand.position.copy(handP); A.hand.quaternion.copy(handQ);
}

export function initViewmodel(){
  const root = VMS.root = new THREE.Group();
  root.matrixAutoUpdate = false;
  scene.add(root);
  for(const id of ['hornet', 'acorn', 'needle', 'comb']){
    const g = buildGun(id, true); g.root.visible = false; root.add(g.root); VMS.guns[id] = g;
    // muzzle flash: a star facing you and a flame along the barrel
    g.flash = muzzleFlash(); g.muzzle.add(g.flash);
  }
  VMS.light = new THREE.PointLight('#FFB060', 0, 9, 2); VMS.light.layers.enableAll(); scene.add(VMS.light);
  // a soft key light just for the arms and gun (they live in their own layer), so the metal and wood read even in shade
  const key = VMS.key = new THREE.DirectionalLight('#FFF0D8', 1.1); key.layers.set(VM_LAYER); scene.add(key, key.target);
}
let FLASH_T = null;
function flashTex(){
  if(FLASH_T) return FLASH_T;
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,230,1)'); g.addColorStop(0.2, 'rgba(255,210,120,0.9)'); g.addColorStop(0.5, 'rgba(255,140,40,0.35)'); g.addColorStop(1, 'rgba(255,90,20,0)');
  x.fillStyle = g; x.beginPath(); x.translate(64, 64);
  for(let i = 0; i < 10; i++){ const a = i / 10 * Math.PI * 2, r = i % 2 ? 22 : 64; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); } x.closePath(); x.fill();
  FLASH_T = new THREE.CanvasTexture(c); FLASH_T.colorSpace = THREE.SRGBColorSpace;
  return FLASH_T;
}
function muzzleFlash(){
  const g = new THREE.Group(), mat = vmMaterial(new THREE.MeshBasicMaterial({ map:flashTex(), transparent:true, blending:THREE.AdditiveBlending, depthWrite:false, color:'#FFE0B0' }));
  mat.toneMapped = false;
  const front = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.16), mat);
  const side1 = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.2).translate(0, 0.1, 0).rotateX(-Math.PI / 2), mat), side2 = side1.clone(); side2.rotation.z = Math.PI / 2;
  g.add(front, side1, side2);
  g.traverse(o => { o.layers.set(VM_LAYER); o.frustumCulled = false; });
  g.visible = false;
  return g;
}

export function setArms(species){
  if(VMS.species === species && VMS.arms) return;
  if(VMS.arms){ VMS.root.remove(VMS.arms.R.g, VMS.arms.L.g); }
  const m = armMats(species);
  VMS.arms = { R:buildArm(m, 1, species), L:buildArm(m, -1, species) };
  VMS.root.add(VMS.arms.R.g, VMS.arms.L.g);
  VMS.species = species;
}

// ---- per-gun hip and aim positions (camera space) ----
const HIP = { hornet:[0.15, -0.165, -0.47], acorn:[0.15, -0.17, -0.47], needle:[0.16, -0.17, -0.5], comb:[0.15, -0.115, -0.38] };
const ADS_D = { hornet:0.24, acorn:0.24, needle:0.12, comb:0.36 };

// ---- events: shots kick, reload choreography starts ----
on('fire', f => { if(f !== G.me || !VMS.cur) return;
  const W = gun(f).W, k = 1 - f.adsK * 0.5, R = W.recoil;
  S.pz.v += (0.35 + R.punch * 0.15) * k; S.rx.v += (0.8 + R.punch * 0.5) * k; S.rz.v += (Math.random() - 0.5) * 1.5 * k; S.py.v += 0.1 * k;
  S.fireT = 0;
  const g = VMS.cur; g.flash.visible = true; g.flash.rotation.z = Math.random() * 6.3; const s = 0.8 + Math.random() * 0.5 * (W.kind === 'shotgun' ? 1.6 : 1); g.flash.scale.setScalar(W.kind === 'sniper' ? s * 1.4 : s);
  if(g.parts.hammer){ S.hammer = 1; }
  if(g.parts.trigger) S.trigger = 1;
  // casings fly out of the port (the revolver keeps its own until the reload)
  if(W.kind === 'rifle') emit('casing', f, g.eject, W.id);
});
on('pump', f => { if(f === G.me) startAct('pump', gun(f).W.pump); });
on('bolt', f => { if(f === G.me) startAct('bolt', gun(f).W.bolt); });
on('reload', f => { if(f === G.me){ const W = gun(f).W; startAct(W.reload.kind === 'shell' ? 'shellStart' : 'reload', f.reload.total || W.reload.start, f.reload.empty); } });
on('shell', f => { if(f === G.me) startAct('shell', gun(f).W.reload.shell); });
on('reloaded', f => { if(f === G.me && gun(f).W.reload.kind === 'shell') startAct('pumpEnd', gun(f).W.reload.end); });
on('lower', f => { if(f === G.me) S.lowering = true; });
on('equip', f => { if(f === G.me){ S.lowering = false; S.lower = 1; } });
on('spawn', f => { if(f === G.me){ S.lower = 1; S.lowering = false; S.act = null; S.snap = true; } });
function startAct(kind, dur, empty){ S.act = kind; S.actT = 0; S.actDur = Math.max(0.05, dur); S.actEmpty = !!empty; S.actFired = {}; }

const ease = t => t * t * (3 - 2 * t);
const seg = (t, a, b) => ease(clamp((t - a) / (b - a), 0, 1));
const bump = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a), 0, 1));

const _m = new THREE.Matrix4(), _p = new THREE.Vector3(), _e = new THREE.Euler(), _sh = new THREE.Vector3(), _hp = new THREE.Vector3(), _hq = new THREE.Quaternion(), _gq = new THREE.Quaternion();
export function updateViewmodel(dt){
  const f = G.me;
  const show = !!f && f.alive && G.state === 'play' && VMS.shown;
  VMS.root.visible = show;
  if(VMS.light) VMS.light.intensity = Math.max(0, VMS.light.intensity - dt * 400);
  if(!show) return;
  const g = gun(f), W = g.W, id = W.id;
  if(!VMS.cur || VMS.cur.id !== id){ if(VMS.cur) VMS.cur.root.visible = false; VMS.cur = VMS.guns[id]; VMS.cur.root.visible = true; S.act = null; }
  if(VMS.species !== f.species) setArms(f.species);
  const GM = VMS.cur, P = GM.parts;
  VM.clip.value = f.adsK * (id === 'comb' ? 0.1 : 0.21);
  // scoped: the scope overlay takes over, the gun is out of view
  const scoped = W.ads.scope && f.adsK > 0.92;
  GM.root.visible = !scoped; VMS.arms.R.g.visible = VMS.arms.L.g.visible = !scoped;
  // ---- springs toward the pose ----
  const ads = f.adsK, hip = HIP[id];
  S.sprint = damp(S.sprint, f.sprintT > 0.05 ? 1 : 0, 9, dt);
  S.lower = damp(S.lower, S.lowering ? 1 : 0, S.lowering ? 18 : 9, dt);
  // sway: the gun lags behind when you turn
  S.swayX = damp(S.swayX, clamp((PL.mdx || 0) * 0.0009, -0.06, 0.06), 10, dt);
  S.swayY = damp(S.swayY, clamp((PL.mdy || 0) * 0.0009, -0.05, 0.05), 10, dt);
  const sw = 1 - ads * 0.8;
  // bob
  const hs = Math.hypot(f.vx, f.vz), bk = Math.min(1, hs / 6) * (f.ground ? 1 : 0) * (1 - ads * 0.85), bt = PL.bobT;
  // aim position: the sight's line sits on the screen centre
  const sight = GM.sight.position;
  let tx = lerp(hip[0], -sight.x, ads), ty = lerp(hip[1], -sight.y, ads), tz = lerp(hip[2], -ADS_D[id] - sight.z, ads);
  let trx = 0, try_ = 0, trz = 0;
  tx += Math.sin(bt) * 0.012 * bk - S.swayX * sw; ty += -Math.abs(Math.cos(bt)) * 0.012 * bk + S.swayY * sw;
  trz += -S.swayX * 1.5 * sw; trx += S.swayY * 0.8 * sw; try_ += S.swayX * 0.8 * sw;
  // idle breathing
  const br = Math.sin(G.time * 1.6) * 0.003 * (1 - ads * 0.9); ty += br;
  // sprint: the gun swings down across the body
  tx += -0.06 * S.sprint; ty += -0.05 * S.sprint; try_ += 0.75 * S.sprint; trx += -0.35 * S.sprint; trz += 0.25 * S.sprint;
  if(S.sprint > 0.1){ tx += Math.sin(bt) * 0.025 * S.sprint; ty += -Math.abs(Math.cos(bt)) * 0.02 * S.sprint; }
  // crouch tilt, airborne lift
  trz += 0.05 * f.crouchK * (1 - ads);
  if(!f.ground) ty += 0.012;
  // lowering for a weapon swap / raising after it
  ty -= S.lower * 0.32; trx -= S.lower * 0.9;
  // ---- the reload / pump / bolt choreography ----
  let magOff = 0, magVis = 1, pump = 0, boltRot = 0, boltBack = 0, cylOut = 0, lhand = new THREE.Vector3(), handBlend = 0, charge = 0;
  if(S.act){
    S.actT += dt; const t = Math.min(1, S.actT / S.actDur), A = S.act;
    const once = (k, at, fn) => { if(t >= at && !S.actFired[k]){ S.actFired[k] = true; fn(); } };
    if(A === 'reload' && W.reload.kind === 'mag'){
      // tilt in, mag out, hand away, new mag in, snap, (charge if it was empty), back
      const tilt = seg(t, 0, 0.14) * (1 - seg(t, 0.84, 1));
      trz += 0.45 * tilt; trx += 0.12 * tilt; tx -= 0.03 * tilt; ty += 0.02 * tilt;
      magOff = seg(t, 0.14, 0.3) * 0.35 * (1 - seg(t, 0.46, 0.64)); magVis = t > 0.3 && t < 0.46 ? 0 : 1;
      once('out', 0.16, () => emit('vmSound', 'mag_out')); once('drop', 0.24, () => emit('magDrop', f, GM.parts.mag, id));
      once('in', 0.64, () => { emit('vmSound', 'mag_in'); S.rx.v -= 0.5; S.py.v += 0.12; });
      handBlend = bump(t, 0.2, 0.7); lhand.set(0.04, -0.25 * seg(t, 0.25, 0.4) * (1 - seg(t, 0.46, 0.62)), 0.1);
      if(S.actEmpty){ charge = bump(t, 0.72, 0.86); once('ch', 0.74, () => emit('vmSound', id === 'needle' ? 'bolt' : 'charge')); }
    } else if(A === 'reload' && W.reload.kind === 'cylinder'){
      // swing the cylinder out, tip the gun up so the casings fall, load, flick it shut
      const tilt = seg(t, 0, 0.12) * (1 - seg(t, 0.82, 1));
      trz += 0.55 * tilt; trx += 0.5 * seg(t, 0.15, 0.3) * (1 - seg(t, 0.4, 0.5)); ty += 0.04 * tilt;
      cylOut = seg(t, 0.08, 0.18) * (1 - seg(t, 0.76, 0.84));
      once('open', 0.1, () => emit('vmSound', 'cyl_open')); once('spill', 0.32, () => { for(let i = 0; i < 6; i++) emit('casing', f, GM.parts.cyl, 'comb'); });
      handBlend = bump(t, 0.4, 0.78); lhand.set(-0.04, -0.12, 0.05);
      once('load', 0.62, () => emit('vmSound', 'shell_in')); once('close', 0.8, () => { emit('vmSound', 'cyl_close'); S.rz.v += 1.2; });
    } else if(A === 'shellStart'){
      trz += 0.5 * seg(t, 0, 1); ty += 0.03 * seg(t, 0, 1);
    } else if(A === 'shell'){
      // the gun stays tipped while shells go in; the left hand brings each one up to the port
      trz += 0.5; ty += 0.03; handBlend = bump(t, 0, 1); lhand.set(0.02, -0.1 + 0.06 * seg(t, 0.3, 0.7), 0.25);
      once('in', 0.55, () => { emit('vmSound', 'shell_in'); S.py.v += 0.1; });
    } else if(A === 'pumpEnd' || A === 'pump'){
      if(A === 'pumpEnd'){ trz += 0.5 * (1 - seg(t, 0.4, 1)); ty += 0.03 * (1 - seg(t, 0.4, 1)); }
      pump = bump(t, A === 'pump' ? 0.12 : 0.1, A === 'pump' ? 0.8 : 0.6);
      once('pk', A === 'pump' ? 0.15 : 0.1, () => { emit('vmSound', 'pump'); });
      if(A === 'pump') once('ej', 0.4, () => emit('casing', f, GM.eject, 'acorn'));
      trx += pump * 0.06;
    } else if(A === 'bolt'){
      // lift, pull, (casing out), push, lock
      boltRot = seg(t, 0.08, 0.28) * (1 - seg(t, 0.75, 0.92)); boltBack = seg(t, 0.28, 0.45) * (1 - seg(t, 0.55, 0.72));
      once('up', 0.08, () => emit('vmSound', 'bolt')); once('ej', 0.45, () => emit('casing', f, GM.eject, 'needle'));
      trz += 0.12 * bump(t, 0.05, 0.95); ty -= 0.015 * bump(t, 0.05, 0.95);
      handBlend = bump(t, 0.02, 0.98) * 0.85;
    }
    if(t >= 1) S.act = null;
  }
  // flash fades in a couple of frames, the light with it
  S.fireT += dt;
  GM.flash.visible = S.fireT < 0.045;
  if(S.fireT < dt * 1.5 && VMS.light){ GM.muzzle.getWorldPosition(VMS.light.position); VMS.light.intensity = W.kind === 'sniper' || W.kind === 'shotgun' ? 70 : 40; }
  // springs (pose + kick); right after a spawn they start at the pose
  if(S.snap){ S.snap = false; for(const [s_, v] of [[S.px, tx], [S.py, ty], [S.pz, tz], [S.rx, trx], [S.ry, try_], [S.rz, trz]]){ s_.x = v; s_.v = 0; } }
  const K = 220, D = 22;
  spring(S.px, tx, K, D, dt); spring(S.py, ty, K, D, dt); spring(S.pz, tz, K * 0.8, D * 0.8, dt);
  spring(S.rx, trx, K, D, dt); spring(S.ry, try_, K, D, dt); spring(S.rz, trz, K, D, dt);
  const kz = S.pz.x, krx = S.rx.x;
  // ---- place the root at the camera, the gun inside it ----
  VMS.root.matrix.copy(camera.matrixWorld); VMS.root.matrixWorldNeedsUpdate = true;
  VMS.key.position.set(-0.6, 1, 0.4).applyMatrix4(camera.matrixWorld); VMS.key.target.position.set(0.2, -0.3, -1).applyMatrix4(camera.matrixWorld); VMS.key.target.updateMatrixWorld();
  VMS.root.updateMatrixWorld(true);
  const root = GM.root;
  root.position.set(S.px.x, S.py.x, kz);
  root.rotation.set(krx, S.ry.x, S.rz.x, 'YXZ');
  // parts
  if(P.mag){ P.mag.position.copy(P.mag.userData.home).add(_p.set(0, -magOff, magOff * 0.15)); P.mag.visible = magVis > 0; }
  if(P.pump){ P.pump.position.copy(P.pump.userData.home); P.pump.position.z += pump * 0.09; }
  if(P.bolt && id === 'needle'){ P.bolt.rotation.set(0, 0, boltRot * 1.2); P.bolt.position.copy(P.bolt.userData.home); P.bolt.position.z += boltBack * 0.08; }
  if(P.bolt && id === 'hornet'){ P.bolt.position.copy(P.bolt.userData.home); P.bolt.position.z += charge * 0.07; }
  if(P.cyl){ P.cyl.position.copy(P.cyl.userData.home); P.cyl.position.x -= cylOut * 0.06; P.cyl.position.y -= cylOut * 0.02; P.cyl.rotation.set(0, 0, 0); if(S.fireT < 0.15) P.cyl.rotation.z = -seg(S.fireT, 0, 0.12) * Math.PI / 3; }
  if(P.hammer){ S.hammer = Math.max(0, (S.hammer || 0) - dt * 8); P.hammer.rotation.x = S.hammer * 0.5; }
  if(P.trigger){ S.trigger = Math.max(0, (S.trigger || 0) - dt * 10); P.trigger.position.z = P.trigger.userData.home.z + S.trigger * 0.008; }
  root.updateMatrixWorld(true);
  // ---- arms reach the grips (in root space = camera space) ----
  const A = VMS.arms;
  root.updateMatrix();
  _gq.setFromEuler(root.rotation);
  const handTo = (anchor, out) => out.copy(anchor.position).applyMatrix4(root.matrix);
  const rP = handTo(GM.gripR, new THREE.Vector3()), lP = handTo(GM.gripL, new THREE.Vector3());
  if(handBlend > 0){ lP.lerp(new THREE.Vector3(rP.x - 0.1, rP.y - 0.05, rP.z).add(lhand), handBlend * 0.85); }
  _hq.copy(_gq).multiply(_q.setFromEuler(_e.set(0.4, 0, 0)));
  poseArm(A.R, _sh.set(0.26, -0.44, 0.06), rP, _hq, 0.38, 0.36);
  _hq.copy(_gq).multiply(_q.setFromEuler(_e.set(1.2, 0, -0.3)));
  poseArm(A.L, _sh.set(-0.2, -0.46, -0.12), lP, _hq, 0.5, 0.46);
}
// a free-floating piece for world effects: world position of a gun anchor
export function anchorWorld(obj, out){ return obj.getWorldPosition(out); }
