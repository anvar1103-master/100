// Office things from Poly Haven (one file, a root node per model): desks stand where the floor plan put them
// (they are solid in phys.js), chairs, bins, wet-floor signs and fire extinguishers are loose (physics.js moves
// them), fire alarms and clocks hang on walls. Sizes are measured from the models once.
import * as THREE from 'three';
import { scene } from './engine.js';
import { loadGLB } from './assets.js';

// kind → model node, how tall it should be (metres), collider shape
const KIND = {
  desk:{ node:'metal_office_desk', h:0.76 }, chair:{ node:'plastic_monobloc_chair_01', h:0.82, shape:'box' }, bin:{ node:'metal_trash_can', h:0.5, shape:'cyl' },
  sign:{ node:'WetFloorSign_01', h:0.62, shape:'box' }, extinguisher:{ node:'korean_fire_extinguisher_01', h:0.55, shape:'cyl' },
  alarm:{ node:'fire_alarm', h:0.16 }, clock:{ node:'wall_clock', h:0.32 },
};
const SRC = {};
export const PROPS = { list:[], group:null };
export async function loadProps(){
  const g = await loadGLB('assets/models/props.glb');
  for(const k in KIND){
    const n = g.scene.getObjectByName(KIND[k].node); if(!n) continue;
    n.traverse(m => { if(m.isMesh){ m.castShadow = true; m.receiveShadow = true; } });
    // normalise: scaled to its height, centred on x/z, standing on y = 0
    const holder = new THREE.Group(), c = n.clone(true); c.position.set(0, 0, 0); c.rotation.set(0, 0, 0); c.updateMatrixWorld(true);
    holder.add(c); holder.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(holder); const s = KIND[k].h / Math.max(1e-3, b.max.y - b.min.y); c.scale.multiplyScalar(s); holder.updateMatrixWorld(true);
    b = new THREE.Box3().setFromObject(holder); const ctr = b.getCenter(new THREE.Vector3());
    c.position.x -= ctr.x; c.position.z -= ctr.z; c.position.y -= b.min.y; holder.updateMatrixWorld(true);
    b = new THREE.Box3().setFromObject(holder);
    SRC[k] = { obj:holder, size:b.getSize(new THREE.Vector3()) };
  }
}
export function placeProps(L){
  if(PROPS.group){ scene.remove(PROPS.group); }
  PROPS.group = new THREE.Group(); scene.add(PROPS.group); PROPS.list = [];
  for(const p of L.props){
    const S = SRC[p.kind]; if(!S) continue;
    const o = S.obj.clone(true);
    if(p.wall){
      // hangs on the wall: the model's back goes to the wall, facing out along the wall normal
      o.position.set(p.x, p.kind === 'extinguisher' ? 0 : p.y, p.z); o.rotation.y = p.ry;
      o.position.addScaledVector(new THREE.Vector3(Math.sin(p.ry), 0, Math.cos(p.ry)), Math.max(S.size.z, p.kind === 'extinguisher' ? S.size.x : 0) / 2 + 0.01);
    } else { o.position.set(p.x, 0, p.z); o.rotation.y = p.ry; }
    PROPS.group.add(o);
    const dyn = p.dyn || (p.kind === 'extinguisher' && !p.y);
    PROPS.list.push({ p, obj:o, kind:p.kind, dyn, size:S.size, shape:KIND[p.kind].shape });
  }
  return PROPS.list;
}
