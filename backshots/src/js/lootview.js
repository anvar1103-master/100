// What loot looks like: guns lie on their side, an ammo can, a first-aid case, a roll of tape for the bandage, the
// armour in a wooden army crate (no free realistic vest or helmet model exists — see CREDITS.md). One object per item,
// added and removed with the loot events; only the items near the camera are drawn.
import * as THREE from 'three';
import { scene, camera } from './engine.js';
import { loadGLB } from './assets.js';
import { buildGun } from './gunmodels.js';
import { on } from './state.js';
import { LOOT } from './loot.js';
import { ambient, AMB_K } from './soldiers.js';
import { lightRGB } from './level/lights.js';
import { G } from './state.js';

// kind → model node, size (tallest side, metres), lying flat
const KIND = {
  ammo:{ node:'ammo_box', h:0.26 }, medkit:{ node:'medical_box', h:0.1, flat:true }, bandage:{ node:'medical_tape', h:0.09 },
  vest:{ node:'wooden_military_crate', h:0.36 }, helmet:{ node:'wooden_military_crate', h:0.24 },
};
const SRC = {}, GUN = {}, VIEW = new Map();
export const LV_LOOT = { group:null, near:32 };
function normalise(n, h){
  const holder = new THREE.Group(), c = n.clone(true); c.position.set(0, 0, 0); c.rotation.set(0, 0, 0); c.scale.set(1, 1, 1);
  holder.add(c); holder.updateMatrixWorld(true);
  let b = new THREE.Box3().setFromObject(holder); const sz = b.getSize(new THREE.Vector3());
  c.scale.multiplyScalar(h / Math.max(1e-3, sz.y)); holder.updateMatrixWorld(true);
  b = new THREE.Box3().setFromObject(holder); const ctr = b.getCenter(new THREE.Vector3());
  c.position.x -= ctr.x; c.position.z -= ctr.z; c.position.y -= b.min.y;
  holder.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; } });
  return holder;
}
export async function loadLootModels(){
  const g = await loadGLB('assets/models/loot.glb');
  for(const k in KIND){ const n = g.scene.getObjectByName(KIND[k].node); if(n) SRC[k] = normalise(n, KIND[k].h); }
  LV_LOOT.group = new THREE.Group(); scene.add(LV_LOOT.group);
}
// a gun lying on its left side
function gunLying(id){
  if(!GUN[id]){
    const g = buildGun(id, false), holder = new THREE.Group(), tilt = new THREE.Group();
    tilt.rotation.z = Math.PI / 2; tilt.add(g.root); holder.add(tilt); holder.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(holder), ctr = b.getCenter(new THREE.Vector3());
    tilt.position.set(-ctr.x, -b.min.y + 0.002, -ctr.z);
    holder.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; } });
    GUN[id] = holder;
  }
  return GUN[id].clone(true);
}
function make(it){
  let o;
  if(it.kind === 'gun') o = gunLying(it.gun);
  else if(SRC[it.kind]) o = SRC[it.kind].clone(true);
  else return null;
  // lit like the bodies: its own copy of the materials with the baked light of the spot it lies on
  const rgb = G.level ? lightRGB(G.level, it.x, it.z, [0, 0, 0]) : [0.05, 0.05, 0.05], amb = { value:new THREE.Color(0.05 + rgb[0] * AMB_K, 0.045 + rgb[1] * AMB_K, 0.035 + rgb[2] * AMB_K) }, mats = new Map();
  o.traverse(m => { if(m.isMesh){ if(!mats.has(m.material)){ const c = m.material.clone(); ambient(c, amb); mats.set(m.material, c); } m.material = mats.get(m.material); } });
  o.userData.mats = [...mats.values()];
  o.position.set(it.x, it.y || 0, it.z); o.rotation.y = it.ry;
  o.matrixAutoUpdate = false; o.updateMatrix();
  return o;
}
on('lootAdd', it => { if(!LV_LOOT.group) return; const o = make(it); if(o){ LV_LOOT.group.add(o); VIEW.set(it, o); } });
const drop = o => { LV_LOOT.group.remove(o); for(const m of o.userData.mats) m.dispose(); };
on('lootRemove', it => { const o = VIEW.get(it); if(o){ drop(o); VIEW.delete(it); } });
export function clearLootView(){ for(const o of VIEW.values()) drop(o); VIEW.clear(); }
// draw only what is near (the rest stays in the list)
let acc = 0;
export function updateLootView(dt){
  if((acc += dt) < 0.2) return; acc = 0;
  const cx = camera.position.x, cz = camera.position.z, r2 = LV_LOOT.near * LV_LOOT.near;
  for(const [it, o] of VIEW){ const dx = it.x - cx, dz = it.z - cz, near = dx * dx + dz * dz < r2; o.visible = near; if(near && dx * dx + dz * dz < 196 !== o.userData.cast){ const c = o.userData.cast = dx * dx + dz * dz < 196; o.traverse(m => { if(m.isMesh) m.castShadow = c; }); } }
}
export { LOOT };
