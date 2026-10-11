// Loads the packed nature models (Quaternius, CC0). Each model becomes a list of parts that can be instanced.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const NATURE = {};
export async function loadNature(onProgress){
  let gltf;
  if(window.BG_NATURE_B64){
    // claude.ai preview build: the pack sits next to the page as base64 text (that host doesn't serve .glb files)
    const txt = await (await fetch(window.BG_NATURE_B64)).text();
    const bin = Uint8Array.from(atob(txt.trim()), c => c.charCodeAt(0));
    const cib = window.createImageBitmap; window.createImageBitmap = undefined;   // textures through <img>, not fetch()
    const p = new Promise((res, rej) => new GLTFLoader().parse(bin.buffer, '', res, rej));
    window.createImageBitmap = cib;
    gltf = await p;
    if(onProgress) onProgress(1);
  } else gltf = await new Promise((res, rej) => new GLTFLoader().load('assets/nature.glb', res, e => { if(onProgress && e.total) onProgress(e.loaded / e.total); }, rej));
  for(const model of gltf.scene.children){
    model.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(model.matrixWorld).invert();
    const parts = [];
    const box = new THREE.Box3();
    model.traverse(o => {
      if(!o.isMesh) return;
      const m = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
      parts.push({ geometry:o.geometry, map:o.material.map || null, matName:o.material.name || '', matrix:m });
      const g = o.geometry; g.computeBoundingBox(); box.union(g.boundingBox.clone().applyMatrix4(m));
    });
    NATURE[model.name] = { parts, box, size:box.getSize(new THREE.Vector3()) };
  }
  return NATURE;
}
