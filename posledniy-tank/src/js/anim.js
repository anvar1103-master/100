// Tank visuals and their animation, kept down to earth: the hull turns where it drives and dips on the suspension
// when it pulls away or brakes, the treads roll, the turret follows the aim on its own, the gun recoils with a puff
// of smoke. A new tank drives in out of the bushes; a knocked-out one loses its turret and burns.
// Interface kept from Brawl Green's hero animator (makeVisual / animate / kick / setTeamLook), so the rest of the
// game didn't need to change.
import * as THREE from 'three';
import { HEROES } from './heroes.js';
import { tankParts } from './tanks.js';
import { tankMaterial, tankUniforms, silhouetteMaterial } from './rig.js';
import { spring, sp, clamp, angDiff, TAU, rand } from './util.js';
import { Q } from './engine.js';
import { smoke, glow, puff } from './fx.js';

export const TEAM_COL = { me:'#FFD23F', ally:'#4FC3FF', foe:'#FF4D4D' };
const ringTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  g.strokeStyle = '#fff'; g.lineWidth = 7; g.beginPath(); g.arc(64, 64, 54, 0, TAU); g.stroke();
  g.globalAlpha = 0.18; g.fillStyle = '#fff'; g.beginPath(); g.arc(64, 64, 52, 0, TAU); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const ringGeo = new THREE.PlaneGeometry(1.75, 1.75); ringGeo.rotateX(-Math.PI / 2);
const blobTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 4, 32, 32, 31); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
})();
const blobMat = new THREE.MeshBasicMaterial({ map:blobTex, transparent:true, depthWrite:false });
// one position-only copy of a part for the see-through-walls silhouette
const SIL = new WeakMap();
function silGeo(list){
  if(!SIL.has(list)){
    const g = new THREE.BufferGeometry();
    const pos = []; const v = new THREE.Vector3();
    for(const { geo } of list){ const p = geo.attributes.position, idx = geo.index, n = idx ? idx.count : p.count; for(let i = 0; i < n; i++){ v.fromBufferAttribute(p, idx ? idx.getX(i) : i); pos.push(v.x, v.y, v.z); } }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.computeBoundingSphere();
    SIL.set(list, g);
  }
  return SIL.get(list);
}
// the built-in tanks are one vertex-coloured geometry per part; the loaded models a list of textured pieces
const PIECES = new WeakMap();
const asPieces = part => { if(!part.isBufferGeometry) return part; if(!PIECES.has(part)) PIECES.set(part, [{ geo:part, vc:true }]); return PIECES.get(part); };

export function makeVisual(id){
  const P = tankParts(id);
  const u = tankUniforms();
  const mats = [], scrolls = [];
  const silMat = silhouetteMaterial('#FFFFFF');
  const root = new THREE.Group();
  const hull = new THREE.Group(), turret = new THREE.Group(), barrel = new THREE.Group(), recoil = new THREE.Group();
  root.add(hull); hull.add(turret); turret.add(barrel); barrel.add(recoil);
  turret.position.fromArray(P.turretPos); barrel.position.fromArray(P.barrelPos);
  const part = (list, parent) => {
    list = asPieces(list);
    for(const pc of list){
      let map = pc.map || null;
      // a tread belt gets its own copy of the texture (same image on the GPU) so it can roll with this tank
      if(map && pc.scroll){ map = map.clone(); scrolls.push({ map, axis:pc.scroll.axis, rate:pc.scroll.rate }); }
      const m = tankMaterial(pc.vc ? { vertexColors:true } : { map, color:pc.color }, u); mats.push(m);
      const mesh = new THREE.Mesh(pc.geo, m); mesh.castShadow = true; mesh.renderOrder = 2; parent.add(mesh);
    }
    const s = new THREE.Mesh(silGeo(list), silMat); s.renderOrder = 1; parent.add(s);
  };
  part(P.hull, hull); part(P.turret, turret); part(P.barrel, recoil);
  const muzzle = new THREE.Object3D(); muzzle.position.fromArray(P.muzzle); recoil.add(muzzle);
  const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ map:ringTex, transparent:true, depthWrite:false, color:'#fff', opacity:0.75 }));
  ring.position.y = 0.03; ring.renderOrder = 1; root.add(ring);
  const blob = new THREE.Mesh(ringGeo, blobMat); blob.position.y = 0.025; blob.scale.setScalar(0.95); blob.renderOrder = 1; root.add(blob);
  return { id, H:HEROES[id], root, hull, turret, barrel, recoil, mats, u, scrolls, silMat, ring, blob, muzzle, P, ghost:false,
    yaw:0, hullYaw:0, track:0, lastDust:0, popTurret:null, driveIn:1, reverse:false,
    sp:{ kick:sp(), pitch:sp(), roll:sp(), lift:sp(), elev:sp(), spin:sp() }, prevVX:0, prevVZ:0 };
}
export function disposeVisual(V){ for(const m of V.mats) m.dispose(); for(const s of V.scrolls) s.map.dispose(); V.silMat.dispose(); V.ring.material.dispose(); }
// see-through (hiding in grass, camera pressed against your own tank): op < 1
export function setOpacity(V, op){
  const ghost = op < 1;
  for(const m of V.mats){ if(m.transparent !== ghost){ m.transparent = ghost; m.depthWrite = !ghost; m.needsUpdate = true; } m.opacity = op; }
  V.ghost = ghost;
}

export function setTeamLook(V, kind){
  V.ring.material.color.set(TEAM_COL[kind]);
  V.silMat.color.set(kind === 'foe' ? '#FF3B3B' : kind === 'me' ? '#FFE58A' : '#7FD8FF');
}

const W = new THREE.Vector3();
export function animate(V, f, dt, t){
  const S = V.sp, H = V.H, root = V.root, u = V.u;
  // ---------------- knocked out: the ammo cooks off, the turret is thrown, the wreck chars, burns and sinks ----------------
  if(!f.alive){
    const d = f.deadT;
    if(!V.popTurret){ V.popTurret = { vy:7, vx:rand(-1.4, 1.4), vz:rand(-1.4, 1.4), spin:rand(-7, 7), tilt:rand(0.6, 1.4), y:0 }; }
    const pt = V.popTurret;
    pt.vy -= 18 * dt; pt.y = Math.max(0, pt.y + pt.vy * dt);
    const k = Math.min(d, 0.75);
    V.turret.position.set(V.P.turretPos[0] + pt.vx * k, V.P.turretPos[1] + pt.y, V.P.turretPos[2] + pt.vz * k);
    V.turret.rotation.set(k * pt.tilt * 0.9, V.turret.rotation.y + pt.spin * dt * (pt.y > 0 ? 1 : 0), k * pt.tilt * 0.5);
    u.uBurn.value = Math.min(1, d * 2.5); u.uFlash.value = Math.max(0, 0.6 - d * 2);
    root.position.set(f.x, -Math.max(0, d - 2.2) * 0.5, f.z);
    V.ring.visible = false; V.blob.visible = false;
    if(d < 2.8){
      if(Math.random() < dt * 14) puff(smoke, f.x + rand(-0.35, 0.35), 0.55, f.z + rand(-0.35, 0.35), { n:1, color:'#1E1B19', sp:0.35, vy:1.8, life:1.6, s0:0.3, s1:1.1, drag:0.5, soft:true, a:0.75 });
      if(Math.random() < dt * 16) puff(glow, f.x + rand(-0.3, 0.3), 0.45, f.z + rand(-0.3, 0.3), { n:1, color:Math.random() < 0.5 ? '#FF7A1E' : '#FFB347', sp:0.4, vy:1.4, life:0.45, s0:0.22, s1:0.04, soft:true });
    }
    root.visible = d < 3.2;
    return;
  }
  if(V.popTurret){ V.popTurret = null; V.turret.position.fromArray(V.P.turretPos); V.turret.rotation.set(0, 0, 0); u.uBurn.value = 0; }
  V.ring.visible = true; V.blob.visible = !Q.shadows;
  // ---------------- hull: turns toward where it drives, dips on the suspension when it pulls away, brakes or turns ----------------
  const spd = Math.hypot(f.vx, f.vz), moving = spd > 0.4;
  if(moving){
    // backs up rather than spinning round when the way is right behind it
    let want = Math.atan2(f.vx, f.vz);
    const back = Math.abs(angDiff(V.hullYaw, want)) > 2.3;
    if(back) want += Math.PI;
    V.hullYaw += clamp(angDiff(V.hullYaw, want), -dt * 5, dt * 5);
    V.reverse = back;
  }
  const ax = (f.vx - V.prevVX) / Math.max(dt, 1e-3), az = (f.vz - V.prevVZ) / Math.max(dt, 1e-3);
  V.prevVX = f.vx; V.prevVZ = f.vz;
  const cy = Math.cos(V.hullYaw), sy = Math.sin(V.hullYaw);
  const afwd = ax * sy + az * cy, aside = ax * cy - az * sy;
  spring(S.pitch, clamp(-afwd * 0.009, -0.07, 0.07), 120, 9, dt);
  spring(S.roll, clamp(aside * 0.006, -0.05, 0.05), 120, 9, dt);
  spring(S.kick, 0, 160, 13, dt); spring(S.lift, 0, 80, 11, dt);
  spring(S.elev, V.P.restElev || 0, 90, 12, dt); spring(S.spin, 0, 40, 8, dt);
  // the treads roll with the distance driven (backwards when reversing)
  V.track += (f.vx * sy + f.vz * cy) * dt;
  for(const s of V.scrolls){ if(s.axis) s.map.offset.y = -V.track * s.rate; else s.map.offset.x = -V.track * s.rate; }
  const rumble = moving ? Math.sin(V.track * 11) * 0.008 : Math.sin(t * 34 + f.id) * 0.0025;   // engine idle shiver, track rumble
  V.hull.rotation.set(S.pitch.x - S.kick.x * 0.02, V.hullYaw, S.roll.x, 'YXZ');
  V.hull.position.y = rumble + S.lift.x;
  // driving in on spawn: the tank rolls the last couple of metres into place
  let ox = 0, oz = 0;
  if(V.driveIn < 1){
    V.driveIn = Math.min(1, V.driveIn + dt / 0.75);
    const back = (1 - V.driveIn) ** 2 * 2.2; ox = -sy * back; oz = -cy * back;
    if(Math.random() < dt * 30) puff(smoke, f.x + ox, 0.12, f.z + oz, { n:1, color:'#B8A585', sp:0.6, vy:0.5, life:0.7, s0:0.2, s1:0.5, drag:2, soft:true, a:0.45 });
  }
  root.position.set(f.x + ox, 0, f.z + oz);
  root.rotation.set(0, 0, 0);
  // dust from the tracks and a puff of exhaust when pulling away
  if(moving && t - V.lastDust > 0.08 && !f.inGrass){
    V.lastDust = t;
    const bx = f.x - sy * V.P.len * 0.5, bz = f.z - cy * V.P.len * 0.5;
    for(const side of [1, -1]) puff(smoke, bx + side * cy * 0.38, 0.1, bz - side * sy * 0.38, { n:1, color:'#B8A585', sp:0.4, vy:0.4, life:0.7, s0:0.16, s1:0.45, drag:2, soft:true, a:0.4 });
  }
  if(afwd > 8 && Math.random() < dt * 24) puff(smoke, f.x - sy * V.P.len * 0.55, 0.5, f.z - cy * V.P.len * 0.55, { n:1, color:'#3E3E42', sp:0.3, vy:1.1, life:0.7, s0:0.1, s1:0.4, drag:1, soft:true, a:0.55 });
  // ---------------- turret: follows the aim on its own, with a little lag (the heavy turret turns slower) ----------------
  const aimHold = f.atkT < 0.6 || f.supT < 0.9 || f.aiming || !moving;
  const wantT = aimHold ? f.aim : V.hullYaw + (V.reverse ? Math.PI : 0);
  const turn = V.id === 'shroom' ? 7 : 10;
  V.yaw += clamp(angDiff(V.yaw, wantT), -dt * turn, dt * turn);
  V.turret.rotation.set(0, angDiff(V.hullYaw, V.yaw) + S.spin.x, 0);
  // ---------------- barrel: recoil, elevation for lobs ----------------
  let elev = S.elev.x;
  if(H.attack.kind === 'lob' && f.atkT < 0.5) elev += Math.sin(Math.min(1, f.atkT / 0.5) * Math.PI) * 0.35;
  V.barrel.rotation.x = -elev;
  V.recoil.position.z = -Math.max(0, S.kick.x) * 0.05;
  // ---------------- supers ----------------
  if(f.supT < 1.2){
    const s = f.supT;
    if(V.id === 'beetle') V.barrel.rotation.x -= Math.sin(Math.min(1, s / 0.9) * Math.PI) * 0.35;
    else if(V.id === 'wasp'){ const Wu = H.super.windup; u.uTint.value.setRGB(0.35, 0.28, 0.05).multiplyScalar(s < Wu ? s / Wu : 0); }
  }
  // ---------------- victory / defeat ----------------
  if(f.victory){ V.barrel.rotation.x = -0.32; V.turret.rotation.y += Math.sin(t * 0.8) * 0.5; }
  else if(f.defeat) V.barrel.rotation.x = 0.12;
  // ---------------- hit flash ----------------
  u.uFlash.value = Math.max(0, f.flash) * 0.45;
  root.scale.setScalar(1);
  root.visible = true;
}

// kicks for the springs, called from gameplay events
export const kick = {
  attack(V){
    V.sp.kick.v += V.id === 'shroom' ? 30 : V.id === 'wasp' ? 32 : V.id === 'hopper' ? 7 : 18;
    V.sp.pitch.v -= V.id === 'hopper' ? 0.15 : 0.5;
    // muzzle smoke
    V.muzzle.getWorldPosition(W);
    puff(smoke, W.x, W.y, W.z, { n:V.id === 'hopper' ? 1 : 3, color:'#8C8A86', sp:0.6, vy:0.6, life:0.8, s0:0.12, s1:0.55, drag:2.5, soft:true, a:0.5 });
  },
  super(V){ V.sp.kick.v += 34; V.sp.pitch.v -= 0.9; if(V.id === 'roly') V.sp.spin.v += 8; },
  hurt(V){ V.sp.roll.v += (Math.random() - 0.5) * 1.6; V.sp.pitch.v += (Math.random() - 0.5) * 0.8; },
  spawn(V){ V.driveIn = 0; },
  land(V){ V.sp.pitch.v -= 0.6; }
};
