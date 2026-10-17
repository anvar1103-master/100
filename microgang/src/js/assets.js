// Ready-made models (glTF) from src/assets/models, loaded once and cached.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader(), cache = new Map();
export function loadGLB(url){
  if(!cache.has(url)) cache.set(url, new Promise((res, rej) => loader.load(url, res, undefined, e => rej(new Error('model ' + url + ': ' + (e && e.message || e))))));
  return cache.get(url);
}
