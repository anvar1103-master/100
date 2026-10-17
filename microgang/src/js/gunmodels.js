// The four guns: ready-made toy blasters (Kenney Blaster Kit, CC0). Gun space: +x right, +y up, muzzle toward -z,
// origin at the grip. buildGun(id, vm) → { root, parts:{ mag, scope }, muzzle, eject, sight (aim eye line), gripL, gripR, len }
// vm: the first-person copy (smaller, drawn in the arms-and-gun pass).
import * as THREE from 'three';
import { vmMaterial, VM_LAYER } from './engine.js';
import { loadGLB } from './assets.js';

// per gun: model file, grip (where the right hand holds), muzzle, left hand, the aim eye line, the casing port —
// measured on the models in their own units
const SPEC = {
  hornet:{ file:'blaster-d', grip:[0, -0.061, 0.166], muzzle:[0, 0.056, -0.46], left:[0, -0.044, -0.245], sight:[0, 0.165, 0.12], eject:[0.07, 0.06, -0.05], vm:0.62 },
  acorn: { file:'blaster-o', grip:[0, -0.053, 0.131], muzzle:[0, 0.0, -0.2], left:[0, -0.05, -0.08], sight:[0, 0.17, 0.08], eject:[0.12, 0.05, 0.0], vm:0.8 },
  needle:{ file:'blaster-f', grip:[0, -0.07, 0.359], muzzle:[0, 0.053, -0.66], left:[0, -0.01, -0.175], sight:[0, 0.193, 0.26], eject:[0.08, 0.05, 0.05], vm:0.55 },
  comb:  { file:'blaster-j', grip:[0, -0.053, 0.228], muzzle:[0, 0.095, -0.31], left:[-0.02, -0.075, 0.235], sight:[0, 0.175, 0.16], eject:[0.07, 0.08, 0.0], vm:0.75 },
};
export const GUN_IDS = Object.keys(SPEC);
const SRC = {};
export async function loadGuns(){
  await Promise.all(GUN_IDS.map(async id => {
    const g = await loadGLB(`assets/models/guns/${SPEC[id].file}.glb`);
    g.scene.traverse(m => { if(m.isMesh){ m.material.roughness = 0.55; m.material.metalness = 0.05; if(m.material.map) m.material.map.anisotropy = 4; } });
    SRC[id] = g.scene;
  }));
}

// simple materials for the brass casings flying out
let M = null;
export function gunMats(){
  if(!M) M = { brass:new THREE.MeshStandardMaterial({ color:'#E0B04A', roughness:0.3, metalness:0.9 }), shellRed:new THREE.MeshStandardMaterial({ color:'#C83A2A', roughness:0.5 }) };
  return M;
}

export function buildGun(id, vm = false){
  const S = SPEC[id], s = vm ? S.vm : 1;
  const root = new THREE.Group(), body = SRC[id].clone(true);
  // the grip goes to the origin
  body.scale.setScalar(s); body.position.set(-S.grip[0] * s, -S.grip[1] * s, -S.grip[2] * s);
  root.add(body);
  const at = p => { const o = new THREE.Object3D(); o.position.set((p[0] - S.grip[0]) * s, (p[1] - S.grip[1]) * s, (p[2] - S.grip[2]) * s); return o; };
  const parts = {};
  body.traverse(o => { if(o.name === 'magazine') parts.mag = o; if(o.name === 'scope') parts.scope = o; });
  if(vm){
    // first-person copies get their own materials (own projection) and live on the arms layer
    const mats = new Map();
    body.traverse(o => { if(o.isMesh){ if(!mats.has(o.material)){ const m = vmMaterial(o.material.clone()); m.userData.world = o.material; mats.set(o.material, m); } o.material = mats.get(o.material); } });
    root.traverse(o => { o.layers.set(VM_LAYER); if(o.isMesh){ o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; } });
  }
  const G = { root, parts, muzzle:at(S.muzzle), eject:at(S.eject), sight:at(S.sight), gripR:at(S.grip), gripL:at(S.left), len:(S.grip[2] - S.muzzle[2]) * s, id };
  for(const k of ['muzzle', 'eject', 'sight', 'gripL', 'gripR']){ G.root.add(G[k]); if(vm) G[k].layers.set(VM_LAYER); }
  for(const k in parts){ const p = parts[k]; p.userData.home = p.position.clone(); p.userData.homeR = p.rotation.clone(); }
  return G;
}

// shells and casings that fly out (world space), per gun
export function casingGeo(id){
  if(id === 'acorn') return new THREE.CylinderGeometry(0.012, 0.012, 0.05, 10);
  if(id === 'needle') return new THREE.CylinderGeometry(0.006, 0.008, 0.06, 8);
  return new THREE.CylinderGeometry(0.0055, 0.006, 0.032, 8);
}
