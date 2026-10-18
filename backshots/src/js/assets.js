// Ready-made models (glTF, meshopt-packed by tools/assets.mjs) from src/assets/models, loaded once and cached.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder), cache = new Map();
export function loadGLB(url){
  if(!cache.has(url)) cache.set(url, new Promise((res, rej) => loader.load(url, res, undefined, e => rej(new Error('model ' + url + ': ' + (e && e.message || e))))));
  return cache.get(url);
}
