// Visual physics on Rapier (WebAssembly inlined in the bundle, no outside files): the walls, pillars, desks, floor and
// ceilings as solid boxes; loose props (chairs, bins, signs, extinguishers) that fighters push and bullets knock
// around; rag dolls. When a fighter dies the death clip starts, then its bones are handed to eleven bodies joined at
// the hips, neck, shoulders, elbows (hinges), hips and knees (hinges) — they carry on with the clip's momentum plus the
// bullet's push, slump against walls and furniture, and can be shot again. The game rules never wait for physics.
import RAPIER from '@dimforge/rapier3d-compat';
import * as THREE from 'three';
import { G, on } from './state.js';
import { CELL, FLOOR, WALL, PILLAR, DESK, DESK_H } from './level/gen.js';
import { gun } from './fighter.js';

export const PH = { R:null, world:null, ready:false, props:[], rags:[], kin:new Map(), acc:0, hits:[] };
const GRP_WORLD = 0x0001, GRP_PROP = 0x0002, GRP_RAG = 0x0004, GRP_KIN = 0x0008;
const groups = (member, filter) => (member << 16) | filter;

export async function initPhysics(){ await RAPIER.init(); PH.R = RAPIER; PH.ready = true; }

// greedy rectangles over a cell mask → boxes
function rects(L, test){
  const W = L.W, H = L.H, used = new Uint8Array(W * H), out = [];
  for(let k = 0; k < H; k++) for(let i = 0; i < W; i++){
    const s = k * W + i; if(used[s] || !test(s)) continue;
    let w = 1; while(i + w < W && !used[s + w] && test(s + w)) w++;
    let h = 1; grow: while(k + h < H){ for(let a = 0; a < w; a++){ const t = (k + h) * W + i + a; if(used[t] || !test(t)) break grow; } h++; }
    for(let b = 0; b < h; b++) for(let a = 0; a < w; a++) used[(k + b) * W + i + a] = 1;
    out.push({ i, k, w, h });
  }
  return out;
}
export function buildPhysics(L, propList){
  if(!PH.ready) return;
  if(PH.world){ PH.world.free(); }
  const R = PH.R, w = PH.world = new R.World({ x:0, y:-9.81, z:0 });
  PH.props = []; PH.rags = []; PH.kin.clear(); PH.acc = 0;
  const fixed = w.createRigidBody(R.RigidBodyDesc.fixed());
  const box = (x, y, z, hx, hy, hz, fr = 0.7) => w.createCollider(R.ColliderDesc.cuboid(hx, hy, hz).setTranslation(x, y, z).setFriction(fr).setCollisionGroups(groups(GRP_WORLD, 0xffff)), fixed);
  const size = L.W * CELL;
  box(0, -0.25, 0, size / 2, 0.25, size / 2, 0.9);
  for(const r of rects(L, s => L.g[s] === WALL || L.g[s] === PILLAR)) box(r.i * CELL - L.ox + r.w * CELL / 2, 2, r.k * CELL - L.oz + r.h * CELL / 2, r.w * CELL / 2, 2, r.h * CELL / 2);
  for(const r of rects(L, s => L.g[s] === DESK)) box(r.i * CELL - L.ox + r.w * CELL / 2, DESK_H / 2, r.k * CELL - L.oz + r.h * CELL / 2, r.w * CELL / 2, DESK_H / 2, r.h * CELL / 2, 0.5);
  for(const hgt of [...new Set(L.ceil)]) for(const r of rects(L, s => (L.g[s] === FLOOR || L.g[s] === DESK) && L.ceil[s] === hgt)) box(r.i * CELL - L.ox + r.w * CELL / 2, hgt + 0.2, r.k * CELL - L.oz + r.h * CELL / 2, r.w * CELL / 2, 0.2, r.h * CELL / 2);
  // loose props
  for(const P of propList){
    if(!P.dyn) continue;
    const o = P.obj, s = P.size;
    const b = w.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(o.position.x, s.y / 2 + 0.002, o.position.z).setRotation(quatY(o.rotation.y)).setLinearDamping(0.2).setAngularDamping(0.6).setCanSleep(true));
    const cd = P.shape === 'cyl' ? R.ColliderDesc.cylinder(s.y / 2, Math.max(s.x, s.z) / 2) : R.ColliderDesc.cuboid(s.x / 2, s.y / 2, s.z / 2);
    cd.setDensity(P.kind === 'extinguisher' ? 900 : P.kind === 'chair' ? 120 : 160).setFriction(0.6).setRestitution(0.15).setCollisionGroups(groups(GRP_PROP, 0xffff));
    w.createCollider(cd, b);
    b.sleep();
    PH.props.push({ P, b, off:s.y / 2 });
  }
}
const quatY = a => ({ x:0, y:Math.sin(a / 2), z:0, w:Math.cos(a / 2) });

// ---- fighters push props: kinematic capsules that follow them ----
function syncKinematic(){
  const R = PH.R, w = PH.world;
  for(const f of G.fighters){
    let k = PH.kin.get(f);
    if(!f.alive){ if(k){ w.removeRigidBody(k); PH.kin.delete(f); } continue; }
    if(!k){ k = w.createRigidBody(R.RigidBodyDesc.kinematicPositionBased().setTranslation(f.x, f.y + 0.9, f.z)); w.createCollider(R.ColliderDesc.capsule(0.55, 0.3).setCollisionGroups(groups(GRP_KIN, GRP_PROP)), k); PH.kin.set(f, k); }
    k.setNextKinematicTranslation({ x:f.x, y:f.y + f.h / 2, z:f.z });
  }
}

// ---- rag dolls ----
// body segments: [name, from bone, to bone (or null: a sphere), radius]; joints: [child, parent, at bone, hinge axis or null, limits]
const SEG = [['pelvis', 'Hips', 'Spine1', 0.15], ['torso', 'Spine1', 'Neck', 0.16], ['head', 'Head', null, 0.11],
  ['uarmL', 'LeftArm', 'LeftForeArm', 0.055], ['farmL', 'LeftForeArm', 'LeftHand', 0.045], ['uarmR', 'RightArm', 'RightForeArm', 0.055], ['farmR', 'RightForeArm', 'RightHand', 0.045],
  ['thighL', 'LeftUpLeg', 'LeftLeg', 0.08], ['shinL', 'LeftLeg', 'LeftFoot', 0.06], ['thighR', 'RightUpLeg', 'RightLeg', 0.08], ['shinR', 'RightLeg', 'RightFoot', 0.06]];
const JOINT = [['torso', 'pelvis', 'Spine1'], ['head', 'torso', 'Head'], ['uarmL', 'torso', 'LeftArm'], ['farmL', 'uarmL', 'LeftForeArm', 'elbow'], ['uarmR', 'torso', 'RightArm'], ['farmR', 'uarmR', 'RightForeArm', 'elbow'],
  ['thighL', 'pelvis', 'LeftUpLeg'], ['shinL', 'thighL', 'LeftLeg', 'knee'], ['thighR', 'pelvis', 'RightUpLeg'], ['shinR', 'thighR', 'RightLeg', 'knee']];
// bones driven by the bodies, parents before children
const DRIVE = [['Hips', 'pelvis'], ['Spine1', 'torso'], ['Head', 'head'], ['LeftArm', 'uarmL'], ['LeftForeArm', 'farmL'], ['RightArm', 'uarmR'], ['RightForeArm', 'farmR'],
  ['LeftUpLeg', 'thighL'], ['LeftLeg', 'shinL'], ['RightUpLeg', 'thighR'], ['RightLeg', 'shinR']];
const _a = new THREE.Vector3(), _b = new THREE.Vector3(), _q = new THREE.Quaternion(), _m = new THREE.Matrix4(), _s = new THREE.Vector3(), UPY = new THREE.Vector3(0, 1, 0);
const wpos = (bone, out) => out.setFromMatrixPosition(bone.matrixWorld);

// segment centres of the current pose (remembered each frame while dying, for the hand-over velocity)
export function segCentres(H){
  H.model.updateMatrixWorld(true);
  const out = {};
  for(const [n, a, b] of SEG){ wpos(H.bones[a], _a); if(b) wpos(H.bones[b], _b); else _b.copy(_a).add(UPY.clone().multiplyScalar(0.12)); out[n] = _a.clone().lerp(_b, 0.5); }
  return out;
}
export function makeRagdoll(H, push){
  if(!PH.ready || !PH.world || H.rag) return;
  const R = PH.R, w = PH.world, B = H.bones, now = segCentres(H), prev = H.prevSeg || now, dt = Math.max(1 / 120, H.segDt || 1 / 60);
  const bodies = {};
  H.model.updateMatrixWorld(true);
  for(const [n, a, b, r] of SEG){
    wpos(B[a], _a); if(b) wpos(B[b], _b); else _b.copy(_a).addScaledVector(UPY, 0.2);
    const c = now[n], len = Math.max(0.05, _a.distanceTo(_b) - (b ? r * 1.2 : 0));
    // bodies start unrotated (joint axes then read the same in world and local space); the shape is turned instead
    const body = w.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(c.x, c.y, c.z).setLinearDamping(0.35).setAngularDamping(1.6).setCcdEnabled(n === 'head' || n === 'torso'));
    const v = _b.clone().sub(_a).normalize(); _q.setFromUnitVectors(UPY, v);
    const cd = b ? R.ColliderDesc.capsule(len / 2, r) : R.ColliderDesc.ball(r);
    cd.setRotation({ x:_q.x, y:_q.y, z:_q.z, w:_q.w }).setDensity(n === 'torso' || n === 'pelvis' ? 1050 : 900).setFriction(0.8).setRestitution(0.02).setCollisionGroups(groups(GRP_RAG, GRP_WORLD | GRP_PROP));
    w.createCollider(cd, body);
    const p = prev[n] || c; body.setLinvel({ x:(c.x - p.x) / dt, y:(c.y - p.y) / dt, z:(c.z - p.z) / dt }, true);
    bodies[n] = { body, c0:c.clone() };
  }
  for(const [cn, pn, at, hinge] of JOINT){
    wpos(B[at], _a);
    const c = bodies[cn], p = bodies[pn];
    const a1 = { x:_a.x - p.c0.x, y:_a.y - p.c0.y, z:_a.z - p.c0.z }, a2 = { x:_a.x - c.c0.x, y:_a.y - c.c0.y, z:_a.z - c.c0.z };
    let j;
    if(hinge){
      // the hinge axis: across the bend (perpendicular to both segments; the body's right if they are straight)
      const up = _b.copy(p.c0).sub(_a).normalize(), dn = c.c0.clone().sub(_a).normalize();
      let ax = new THREE.Vector3().crossVectors(up, dn);
      if(ax.lengthSq() < 1e-4) ax.set(Math.cos(H.bodyYaw), 0, -Math.sin(H.bodyYaw));
      ax.normalize();
      j = w.createImpulseJoint(R.JointData.revolute(a1, a2, { x:ax.x, y:ax.y, z:ax.z }), p.body, c.body, true);
      if(j.setLimits) j.setLimits(hinge === 'knee' ? -0.05 : -0.05, hinge === 'knee' ? 2.3 : 2.4);
    } else j = w.createImpulseJoint(R.JointData.spherical(a1, a2), p.body, c.body, true);
    if(j.setContactsEnabled) j.setContactsEnabled(false);
  }
  // offsets: bone world rotation relative to its (unrotated) body
  const drive = DRIVE.map(([bn, sn]) => { const bone = B[bn]; bone.updateMatrixWorld(true); bone.matrixWorld.decompose(_a, _q, _s); return { bone, b:bodies[sn].body, q0:_q.clone(), p0:_a.clone(), c0:bodies[sn].c0 }; });
  // the bullet's push on the part it hit
  if(push){
    let best = null, bd = 1e9; for(const n in bodies){ const d = bodies[n].c0.distanceTo(push.at); if(d < bd){ bd = d; best = bodies[n]; } }
    if(best) best.body.applyImpulseAtPoint({ x:push.dir.x * push.k, y:push.dir.y * push.k + push.k * 0.15, z:push.dir.z * push.k }, { x:push.at.x, y:push.at.y, z:push.at.z }, true);
  }
  H.mixer.stopAllAction(); H.rag = { bodies, drive, t:0 };
  PH.rags.push(H);
  // keep a few rag dolls live; older ones freeze where they lie
  while(PH.rags.length > 8){ freeze(PH.rags.shift()); }
}
function freeze(H){ if(!H.rag || !H.rag.bodies) return; for(const n in H.rag.bodies) PH.world.removeRigidBody(H.rag.bodies[n].body); H.rag.bodies = null; }
export function dropRagdoll(H){ if(H.rag && H.rag.bodies && PH.world){ for(const n in H.rag.bodies) PH.world.removeRigidBody(H.rag.bodies[n].body); } const i = PH.rags.indexOf(H); if(i >= 0) PH.rags.splice(i, 1); H.rag = false; }
const _pq = new THREE.Quaternion(), _bq = new THREE.Quaternion();
function poseRagdoll(H){
  const D = H.rag; if(!D || !D.bodies) return;
  for(const d of D.drive){
    const r = d.b.rotation(), t = d.b.translation();
    _bq.set(r.x, r.y, r.z, r.w);
    const q = _bq.clone().multiply(d.q0);
    if(d.bone.name === 'Hips'){ _a.copy(d.p0).sub(d.c0).applyQuaternion(_bq).add(_b.set(t.x, t.y, t.z)); d.bone.parent.worldToLocal(d.bone.position.copy(_a)); }
    d.bone.parent.getWorldQuaternion(_pq);
    d.bone.quaternion.copy(_pq.invert().multiply(q));
    d.bone.updateMatrixWorld(true);
  }
}

// ---- stepping ----
const STEP = 1 / 60;
export function stepPhysics(dt){
  if(!PH.world) return;
  syncKinematic();
  PH.acc = Math.min(PH.acc + dt, STEP * 4);
  while(PH.acc >= STEP){ PH.world.step(); PH.acc -= STEP; }
  for(const p of PH.props){ if(p.b.isSleeping()) continue; const t = p.b.translation(), r = p.b.rotation(); p.P.obj.position.set(t.x, t.y - p.off, t.z); p.P.obj.quaternion.set(r.x, r.y, r.z, r.w);
    // the model's origin is at its foot: shift the centre offset by the rotation
    _a.set(0, -p.off, 0).applyQuaternion(p.P.obj.quaternion); p.P.obj.position.set(t.x + _a.x, t.y + _a.y, t.z + _a.z); }
  for(const H of PH.rags) poseRagdoll(H);
}

// ---- bullets knock props and bodies about: a ray through the physics world along every shot ----
on('shot', (f, traces, W) => {
  if(!PH.world) return;
  const R = PH.R, k = W.kind === 'shotgun' ? 3 : W.kind === 'sniper' ? 14 : W.kind === 'pistol' ? 3.5 : 6;
  for(const t of traces){
    const ray = new R.Ray({ x:t.ox, y:t.oy, z:t.oz }, { x:t.dx, y:t.dy, z:t.dz });
    const hit = PH.world.castRay(ray, t.t + 0.05, true, undefined, groups(0xffff, GRP_PROP | GRP_RAG));
    if(!hit) continue;
    const body = hit.collider.parent(), p = ray.pointAt(hit.timeOfImpact ?? hit.toi);
    body.wakeUp();
    body.applyImpulseAtPoint({ x:t.dx * k, y:t.dy * k + k * 0.1, z:t.dz * k }, p, true);
    const isRag = PH.rags.some(H => H.rag && H.rag.bodies && Object.values(H.rag.bodies).some(o => o.body === body));
    PH.hits.push({ x:p.x, y:p.y, z:p.z, dx:t.dx, dy:t.dy, dz:t.dz, rag:isRag });
  }
});
// a dying fighter: remember the bullet for the rag doll's push
on('kill', (t, src, o) => { if(t.model && o && o.dir) t.model.push = { at:new THREE.Vector3(o.x, o.y, o.z), dir:new THREE.Vector3(o.dir.x, o.dir.y, o.dir.z), k:(o.head ? 9 : 14) * (o.weapon && gun(src || t).W.kind === 'shotgun' ? 1.6 : 1) }; });
