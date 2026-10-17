// Ready-made plants, stones and giants (Quaternius Stylized Nature MegaKit, CC0) placed from MAP.items: one instanced
// mesh per model part, so a hundred clover stems cost a few draw calls. Plants sway in the wind and glow when the sun
// is behind them, like the grass.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { MAP } from '../map.js';
import { loadGLB } from '../assets.js';
import { natureMat } from './shaders.js';

// how each kind of thing moves and shades (anything not listed stands still and casts a shadow)
const LOOK = {
  clover: { wind:{ stiff:1, h:1.15, amp:0.06 }, trans:'#C8F090' },
  flower: { wind:{ stiff:1, h:2.2, amp:0.05 }, trans:'#FFF0C0' },
  flax:   { wind:{ stiff:1, h:1.0, amp:0.05 }, trans:'#E0F0C0' },
  fern:   { wind:{ stiff:2, h:0.8, amp:0.05 }, trans:'#C8F090' },
  shrooms:{ trans:'#FFE8C8' },
  agaric: { trans:'#FF9070', transK:0.4 },
  // the hollow log is one flat colour on its own: painted bark wrapped round it by world position
  log:    { tri:{ tex:'Bark_NormalTree', k:0.16, tint:'#D8B898' } },
  far:    { far:true },
};
export const NM = { meshes:[], tex:{} };

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _o = new THREE.Matrix4();
// the world matrix of a placed item (see map.js: x y z, ry rx rz, s or sx sy sz, oy)
export function itemMatrix(it, out){
  _e.set(it.rx || 0, it.ry || 0, it.rz || 0, 'YXZ'); _q.setFromEuler(_e);
  if(it.s) _s.setScalar(it.s); else _s.set(it.sx, it.sy, it.sz);
  out.compose(_p.set(it.x, it.y, it.z), _q, _s);
  if(it.oy) out.multiply(_o.makeTranslation(0, it.oy, 0));
  return out;
}
export async function buildModels(){
  const [nat, props] = await Promise.all([loadGLB('assets/models/nature.glb'), loadGLB('assets/models/props.glb')]);
  const src = {};
  for(const gl of [nat, props]){
    gl.scene.updateMatrixWorld(true);
    for(const c of gl.scene.children) src[c.name] = c;
    gl.scene.traverse(o => { if(o.isMesh && o.material.map) NM.tex[o.material.name] = o.material.map; });
  }
  const mats = new Map();
  const matFor = (m, kind) => {
    const key = m.uuid + kind; if(mats.has(key)) return mats.get(key);
    const K = LOOK[kind] || {}, n = m.clone();
    n.roughness = Math.max(0.6, n.roughness ?? 1); n.metalness = 0;
    if(n.alphaTest > 0) n.alphaTest = 0.45;
    if(n.map) n.map.anisotropy = 4;
    const o = K.wind ? { wind:K.wind.stiff, windH:K.wind.h, windAmp:K.wind.amp, perH:1 } : {};
    if(K.trans) Object.assign(o, { trans:K.trans, transK:K.transK || 1.2 });
    if(K.far) o.dapple = false;
    // leaves between the camera and your hero thin out, like the grass
    if(K.wind) o.fadeCam = true;
    if(K.tri && NM.tex[K.tri.tex]){
      const t = NM.tex[K.tri.tex]; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.needsUpdate = true;
      n.map = t; n.color.set(K.tri.tint);
      o.frag = sh => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `
        vec3 mgWn = normalize(inverseTransformDirection(vNormal, viewMatrix));
        vec3 mgBw = pow(abs(mgWn), vec3(4.0)); mgBw /= dot(mgBw, vec3(1.0));
        vec3 mgTp = vMgWorld * ${K.tri.k.toFixed(3)};
        diffuseColor *= texture2D(map, mgTp.zy) * mgBw.x + texture2D(map, mgTp.xz) * mgBw.y + texture2D(map, mgTp.xy) * mgBw.z;`); };
    }
    o.key = 'nm-' + kind + '-' + m.name;
    const r = natureMat(n, o); mats.set(key, r); return r;
  };
  // every model-placed item, grouped by kind and model
  const groups = new Map();
  for(const it of MAP.items){ if(!it.mdl) continue; const k = it.k + '|' + it.mdl; if(!groups.has(k)) groups.set(k, []); groups.get(k).push(it); }
  for(const [key, list] of groups){
    const [kind, name] = key.split('|'), root = src[name], K = LOOK[kind] || {};
    if(!root){ console.warn('model missing', name); continue; }
    const parts = [];
    // (relative to the file's scene, not to the model's own node: that node may carry the un-squeezing of its vertices)
    root.traverse(o => { if(o.isMesh) parts.push({ mesh:o, local:o.matrixWorld.clone() }); });
    for(const P of parts){
      const im = new THREE.InstancedMesh(P.mesh.geometry, matFor(P.mesh.material, kind), list.length);
      list.forEach((it, i) => im.setMatrixAt(i, itemMatrix(it, _m).multiply(P.local)));
      im.instanceMatrix.needsUpdate = true;
      im.computeBoundingSphere();
      im.castShadow = !K.far && !LOW; im.receiveShadow = !K.far;
      scene.add(im); NM.meshes.push(im);
    }
  }
}
