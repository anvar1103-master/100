// Tank visuals and their animation: the hull turns where it drives and rocks on the move, the turret follows the aim
// on its own, the barrel kicks back on every shot; supers, hits, a blown-off turret on death, a victory spin.
// Interface kept from Brawl Green's hero animator (makeVisual / animate / kick / setTeamLook), so the rest of the
// game didn't need to change.
import * as THREE from 'three';
import { HEROES } from './heroes.js';
import { tankParts } from './tanks.js';
import { heroMaterial, outlineMaterial, silhouetteMaterial } from './rig.js';
import { spring, sp, clamp, angDiff, TAU, rand } from './util.js';
import { Q, LOW } from './engine.js';
import { smoke, glow, puff } from './fx.js';

export const TEAM_COL = { me:'#FFD23F', ally:'#4FC3FF', foe:'#FF4D4D' };
const ringTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  g.strokeStyle = '#fff'; g.lineWidth = 9; g.beginPath(); g.arc(64, 64, 52, 0, TAU); g.stroke();
  g.globalAlpha = 0.25; g.fillStyle = '#fff'; g.beginPath(); g.arc(64, 64, 50, 0, TAU); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const ringGeo = new THREE.PlaneGeometry(1.6, 1.6); ringGeo.rotateX(-Math.PI / 2);
const blobTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 4, 32, 32, 31); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
const blobMat = new THREE.MeshBasicMaterial({ map:blobTex, transparent:true, depthWrite:false });
const outlineMat = outlineMaterial(0.03);
// cartoon eyes on the turret: white balls, dark pupils that look where the turret aims, lids that blink
const eyeGeo = new THREE.SphereGeometry(1, 14, 10), eyeWhite = new THREE.MeshBasicMaterial({ color:'#FFFFFF' }), eyeDark = new THREE.MeshBasicMaterial({ color:'#16121C' });

export function makeVisual(id){
  const P = tankParts(id);
  const mat = heroMaterial();
  const silMat = silhouetteMaterial('#FFFFFF');
  const root = new THREE.Group();
  const hull = new THREE.Group(), turret = new THREE.Group(), barrel = new THREE.Group(), recoil = new THREE.Group();
  root.add(hull); hull.add(turret); turret.add(barrel); barrel.add(recoil);
  turret.position.fromArray(P.turretPos); barrel.position.fromArray(P.barrelPos);
  const ols = [], meshes = [];
  const part = (geo, parent) => {
    const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.renderOrder = 2; parent.add(m); meshes.push(m);
    const o = new THREE.Mesh(geo, outlineMat); o.renderOrder = 2; o.visible = !LOW; parent.add(o); ols.push(o);
    const s = new THREE.Mesh(geo, silMat); s.renderOrder = 1; parent.add(s);
    return m;
  };
  part(P.hull, hull); part(P.turret, turret); part(P.barrel, recoil);
  if(P.extra) for(const [geo, where] of P.extra) part(geo, where === 'turret' ? turret : where === 'barrel' ? recoil : hull);
  const muzzle = new THREE.Object3D(); muzzle.position.fromArray(P.muzzle); recoil.add(muzzle);
  // eyes on the front of the turret
  const eyes = new THREE.Group(); eyes.position.fromArray(P.eyes); turret.add(eyes);
  const pupils = [];
  for(const sx of [-1, 1]){
    const w = new THREE.Mesh(eyeGeo, eyeWhite); w.scale.setScalar(P.eyeR); w.position.set(sx * P.eyeSep, 0, 0); eyes.add(w);
    const p = new THREE.Mesh(eyeGeo, eyeDark); p.scale.setScalar(P.eyeR * 0.55); p.position.set(sx * P.eyeSep, 0, P.eyeR * 0.62); eyes.add(p); pupils.push(p);
  }
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ map:ringTex, transparent:true, depthWrite:false, color:'#fff', opacity:0.9 }));
  ring.position.y = 0.03; ring.renderOrder = 1; root.add(ring);
  const blob = new THREE.Mesh(ringGeo, blobMat); blob.position.y = 0.025; blob.scale.setScalar(0.95); blob.renderOrder = 1; root.add(blob);
  return { id, H:HEROES[id], root, hull, turret, barrel, recoil, eyes, pupils, mesh:meshes[0], meshes, mat, silMat, ring, blob, muzzle, P,
    ol:{ get visible(){ return ols[0].visible; }, set visible(v){ for(const o of ols) o.visible = v; } },
    yaw:0, hullYaw:0, track:0, blink:2, lastDust:0, popTurret:null,
    sp:{ kick:sp(), pitch:sp(), roll:sp(), squash:sp(), pop:sp(1), lift:sp(), elev:sp(), spin:sp() }, prevVX:0, prevVZ:0 };
}
export function disposeVisual(V){ V.mat.dispose(); V.silMat.dispose(); }

export function setTeamLook(V, kind){
  V.ring.material.color.set(TEAM_COL[kind]);
  V.silMat.color.set(kind === 'foe' ? '#FF3B3B' : kind === 'me' ? '#FFE58A' : '#7FD8FF');
}

export function animate(V, f, dt, t){
  const S = V.sp, H = V.H, root = V.root;
  // ---------------- knocked out: the turret blows off, the wreck smokes and sinks ----------------
  if(!f.alive){
    const d = f.deadT;
    if(!V.popTurret){ V.popTurret = { vy:6.5, vx:rand(-1.5, 1.5), vz:rand(-1.5, 1.5), spin:rand(-9, 9), y:0 }; V.mat.userData.u.uTint.value.setRGB(-0.35, -0.38, -0.4); }
    const pt = V.popTurret;
    pt.vy -= 18 * dt; pt.y = Math.max(0, pt.y + pt.vy * dt);
    V.turret.position.set(V.P.turretPos[0] + pt.vx * Math.min(d, 0.7), V.P.turretPos[1] + pt.y, V.P.turretPos[2] + pt.vz * Math.min(d, 0.7));
    V.turret.rotation.set(Math.min(d, 0.7) * pt.spin * 0.25, V.turret.rotation.y + pt.spin * dt * (pt.y > 0 ? 1 : 0), Math.min(d, 0.7) * 0.6);
    root.position.set(f.x, -Math.max(0, d - 0.9) * 0.6, f.z);
    V.ring.visible = false; V.blob.visible = false;
    if(Math.random() < dt * 12 && d < 2) puff(smoke, f.x + rand(-0.3, 0.3), 0.6, f.z + rand(-0.3, 0.3), { n:1, color:'#2A2622', sp:0.4, vy:1.6, life:1.2, s0:0.35, s1:0.9, drag:0.6, soft:true, a:0.7 });
    if(Math.random() < dt * 8 && d < 1.2) puff(glow, f.x, 0.5, f.z, { n:1, color:'#FF8A2E', sp:0.6, vy:1.2, life:0.4, s0:0.25, s1:0.05, soft:true });
    root.visible = d < 2.2;
    return;
  }
  if(V.popTurret){ V.popTurret = null; V.turret.position.fromArray(V.P.turretPos); V.turret.rotation.set(0, 0, 0); V.mat.userData.u.uTint.value.setRGB(0, 0, 0); }
  V.ring.visible = true; V.blob.visible = !Q.shadows;
  // ---------------- hull: turns toward where it drives, rocks on starts, stops and turns ----------------
  const spd = Math.hypot(f.vx, f.vz), moving = spd > 0.4;
  if(moving){ const want = Math.atan2(f.vx, f.vz), d = angDiff(V.hullYaw, want); V.hullYaw += clamp(d, -dt * 7, dt * 7); }
  const ax = (f.vx - V.prevVX) / Math.max(dt, 1e-3), az = (f.vz - V.prevVZ) / Math.max(dt, 1e-3);
  V.prevVX = f.vx; V.prevVZ = f.vz;
  const cy = Math.cos(V.hullYaw), sy = Math.sin(V.hullYaw);
  const afwd = ax * sy + az * cy, aside = ax * cy - az * sy;
  spring(S.pitch, clamp(-afwd * 0.012, -0.12, 0.12), 140, 10, dt);
  spring(S.roll, clamp(aside * 0.01, -0.1, 0.1), 140, 10, dt);
  spring(S.kick, 0, 220, 14, dt); spring(S.squash, 0, 260, 12, dt); spring(S.pop, 1, 220, 12, dt);
  spring(S.lift, 0, 80, 11, dt); spring(S.elev, V.P.restElev || 0, 90, 12, dt); spring(S.spin, 0, 40, 8, dt);
  V.track += spd * dt;
  const rumble = moving ? Math.sin(V.track * 9) * 0.012 : Math.sin(t * 30 + f.id) * 0.003;   // engine idle shiver, track rumble
  V.hull.rotation.set(S.pitch.x - S.kick.x * 0.06, V.hullYaw, S.roll.x, 'YXZ');
  V.hull.position.y = rumble + S.lift.x;
  V.hull.scale.set(1 + S.squash.x * 0.06, 1 - S.squash.x * 0.1, 1 + S.squash.x * 0.06);
  root.position.set(f.x, 0, f.z);
  root.rotation.set(0, 0, 0);
  // dust from the tracks and a puff of exhaust when pulling away
  if(moving && t - V.lastDust > 0.09 && !f.inGrass){
    V.lastDust = t;
    const bx = f.x - sy * V.P.len * 0.5, bz = f.z - cy * V.P.len * 0.5;
    puff(smoke, bx + cy * 0.35, 0.12, bz - sy * 0.35, { n:1, color:'#C9B48C', sp:0.5, vy:0.5, life:0.6, s0:0.18, s1:0.4, drag:2, soft:true, a:0.45 });
    puff(smoke, bx - cy * 0.35, 0.12, bz + sy * 0.35, { n:1, color:'#C9B48C', sp:0.5, vy:0.5, life:0.6, s0:0.18, s1:0.4, drag:2, soft:true, a:0.45 });
  }
  if(afwd > 8 && Math.random() < dt * 20) puff(smoke, f.x - sy * V.P.len * 0.55, 0.55, f.z - cy * V.P.len * 0.55, { n:1, color:'#5A5A5E', sp:0.3, vy:1, life:0.6, s0:0.12, s1:0.35, drag:1, soft:true, a:0.5 });
  // ---------------- turret: follows the aim on its own (a little lag), the super spin adds a full turn ----------------
  const aimHold = f.atkT < 0.6 || f.supT < 0.9 || f.aiming || !moving;
  const wantT = aimHold ? f.aim : V.hullYaw;
  V.yaw += clamp(angDiff(V.yaw, wantT), -dt * 12, dt * 12);
  V.turret.rotation.y = angDiff(V.hullYaw, V.yaw) + S.spin.x;
  // ---------------- barrel: recoil, elevation for lobs, a lazy droop when idle ----------------
  const kind = H.attack.kind;
  let elev = S.elev.x;
  if(kind === 'lob' && f.atkT < 0.5) elev += Math.sin(Math.min(1, f.atkT / 0.5) * Math.PI) * 0.6;
  if(f.scope) elev += 0.02;
  V.barrel.rotation.x = -elev;
  V.recoil.position.z = -Math.max(0, S.kick.x) * 0.045;
  // a gunner in a frenzy: the barrel shivers
  if(f.frenzyT > 0) V.recoil.rotation.z = Math.sin(t * 60) * 0.06; else V.recoil.rotation.z = 0;
  // ---------------- supers ----------------
  if(f.supT < 1.2){
    const s = f.supT;
    if(V.id === 'shroom'){ const c = s < 0.1 ? s / 0.1 : Math.max(0, 1 - (s - 0.1) / 0.3); V.hull.position.y -= c * 0.06; }
    else if(V.id === 'beetle'){ V.barrel.rotation.x -= Math.sin(Math.min(1, s / 0.9) * Math.PI) * 0.7; }
    else if(V.id === 'wasp'){ const W = H.super.windup, k = s < W ? s / W : Math.max(0, 1 - (s - W) / 0.4); V.hull.position.y += k * 0.08; V.mat.userData.u.uTint.value.setRGB(0.5, 0.38, 0.05).multiplyScalar(s < W ? s / W : 0); }
  } else if(V.id === 'wasp') V.mat.userData.u.uTint.value.setRGB(0, 0, 0);
  // ---------------- victory / defeat ----------------
  if(f.victory){
    const j = Math.abs(Math.sin(t * 5 + f.id));
    root.position.y = j * 0.35;
    V.turret.rotation.y += t * 4;
    V.barrel.rotation.x = -0.4 - Math.sin(t * 8) * 0.15;
  } else if(f.defeat){ V.barrel.rotation.x = 0.25; }
  // ---------------- eyes: pupils look ahead, blink now and then, squint when hit ----------------
  V.blink -= dt;
  const shut = V.blink < 0 || f.flash > 0.5;
  V.eyes.scale.y = shut ? 0.15 : 1;
  if(V.blink < -0.12) V.blink = 1.8 + Math.random() * 3.5;
  // ---------------- hit flash, spawn pop ----------------
  V.mat.userData.u.uFlash.value = Math.max(0, f.flash) * 0.55;
  root.scale.setScalar(Math.max(0.01, S.pop.x));
  root.visible = true;
}

// kicks for the springs, called from gameplay events
export const kick = {
  attack(V){ V.sp.kick.v += V.id === 'shroom' ? 26 : V.id === 'wasp' ? 30 : V.id === 'hopper' ? 6 : 16; V.sp.pitch.v -= 0.8; },
  super(V){ V.sp.kick.v += 34; V.sp.squash.v += 4; V.sp.pitch.v -= 1.6; if(V.id === 'roly') V.sp.spin.v += 22; },
  hurt(V){ V.sp.squash.v += 3; V.sp.roll.v += (Math.random() - 0.5) * 3; },
  spawn(V){ V.sp.pop.x = 0.05; V.sp.pop.v = 0; V.sp.lift.x = 1.2; V.sp.lift.v = -2; },
  land(V){ V.sp.squash.v -= 4; }
};
