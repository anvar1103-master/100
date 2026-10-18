// The guns: ready-made models («Free CC0 Guns & Explosives Pack»), real size. Gun space: +x right, +y up, muzzle
// toward -z, origin at the grip (where the right hand holds). buildGun(id, vm) → { root, parts:{ mag, bolt },
// muzzle, eject, sight (the aim eye line), gripL, gripR, id }. vm: the first-person copy (drawn in the gun pass).
import * as THREE from 'three';
import { vmMaterial, VM_LAYER } from './engine.js';
import { loadGLB } from './assets.js';

// measured on the models (metres, model space): grip, muzzle, left hand, sight line, casing port; named moving parts
const SPEC = {
  ak:     { grip:[0.002, -0.088, 0.29], muzzle:[0.002, 0.022, -0.32], left:[0.002, -0.03, -0.07], sight:[0.002, 0.047, 0.13], eject:[0.03, 0.012, 0.08], mag:'Magazine', bolt:'Ejection_Port' },
  m4:     { grip:[0, -0.088, 0.075], muzzle:[0, 0.03, -0.54], left:[0, 0.0, -0.25], sight:[0, 0.079, 0.07], eject:[0.035, 0.02, -0.02], mag:'Magazine', bolt:'Charging_Handle' },
  shotgun:{ grip:[0, -0.088, 0.43], muzzle:[0, 0.022, -0.4], left:[0, -0.03, -0.06], sight:[0, 0.052, 0.2], eject:[0.03, 0, 0.25], pump:'Fore_Stock' },
  sniper: { grip:[-0.255, -1.21, 4.85], muzzle:[-0.257, -1.07, 4.06], left:[-0.257, -1.15, 4.45], sight:[-0.256, -1.046, 4.8], eject:[-0.23, -1.11, 4.75], mag:'Magazine', bolt:'Bolt' },
  pistol: { grip:[0.005, -0.02, 0.095], muzzle:[0.004, 0.047, -0.13], left:[0.004, -0.02, 0.09], sight:[0.004, 0.066, 0.02], eject:[0.02, 0.05, -0.02], mag:'Magazine', bolt:'Slide' },
};
export const GUN_IDS = Object.keys(SPEC);
const SRC = {};
export async function loadGuns(ids = GUN_IDS){
  await Promise.all(ids.map(async id => {
    const g = await loadGLB(`assets/models/guns/${id}.glb`);
    g.scene.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; const t = m.material.map; if(t) t.anisotropy = 4; m.material.envMapIntensity = 0.6; } });
    SRC[id] = g.scene;
  }));
}

let M = null;
export function gunMats(){
  if(!M) M = { brass:new THREE.MeshStandardMaterial({ color:'#C9973E', roughness:0.32, metalness:0.95 }), shellRed:new THREE.MeshStandardMaterial({ color:'#A8281C', roughness:0.5 }) };
  return M;
}

export function buildGun(id, vm = false){
  const S = SPEC[id];
  const root = new THREE.Group(), body = SRC[id].clone(true);
  body.position.set(-S.grip[0], -S.grip[1], -S.grip[2]);
  root.add(body);
  const at = p => { const o = new THREE.Object3D(); o.position.set(p[0] - S.grip[0], p[1] - S.grip[1], p[2] - S.grip[2]); return o; };
  const parts = {};
  body.traverse(o => { if(o.name === S.mag) parts.mag = o; if(o.name === S.bolt) parts.bolt = o; if(o.name === S.pump) parts.pump = o; });
  if(vm){
    const mats = new Map();
    body.traverse(o => { if(o.isMesh){ if(!mats.has(o.material)){ const m = vmMaterial(o.material.clone()); m.userData.world = o.material; mats.set(o.material, m); } o.material = mats.get(o.material); } });
    root.traverse(o => { o.layers.set(VM_LAYER); if(o.isMesh){ o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; } });
  }
  const g = { root, parts, muzzle:at(S.muzzle), eject:at(S.eject), sight:at(S.sight), gripR:at(S.grip), gripL:at(S.left), id };
  for(const k of ['muzzle', 'eject', 'sight', 'gripL', 'gripR']){ g.root.add(g[k]); if(vm) g[k].layers.set(VM_LAYER); }
  for(const k in parts){ const p = parts[k]; p.userData.home = p.position.clone(); p.userData.homeR = p.rotation.clone(); }
  return g;
}
export function casingGeo(id){
  if(id === 'shotgun') return new THREE.CylinderGeometry(0.011, 0.011, 0.065, 10);
  if(id === 'sniper') return new THREE.CylinderGeometry(0.006, 0.0075, 0.07, 8);
  if(id === 'pistol') return new THREE.CylinderGeometry(0.0048, 0.0048, 0.019, 8);
  return new THREE.CylinderGeometry(0.0055, 0.006, 0.039, 8);
}
