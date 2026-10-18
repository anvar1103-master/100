// Reflections in the wet floor («Красивая» only): the floor is one flat plane, so a mirrored camera renders the
// room upside down into a half-size texture once per frame, and the floor shader mixes it into the wet patches
// (rippled by the carpet's normal map, stronger at grazing angles). Same maths as three's Reflector.
import * as THREE from 'three';
import { renderer, scene, camera, HIGH, Q } from '../engine.js';
import { LV } from './build.js';

const R = { rt:null, cam:new THREE.PerspectiveCamera(), on:HIGH };
const N = new THREE.Vector3(0, 1, 0), _w = new THREE.Vector3(), _l = new THREE.Vector3(), _t = new THREE.Vector3(), _r = new THREE.Matrix4();
const BIAS = new THREE.Matrix4().set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);

export function initReflect(){
  if(!R.on) return;
  R.rt = new THREE.WebGLRenderTarget(256, 256, { type:THREE.HalfFloatType, samples:0 });
  R.rt.texture.colorSpace = THREE.LinearSRGBColorSpace;
  LV.refl.tex.value = R.rt.texture; LV.refl.on.value = 1;
  Q.onResize.push((w, h) => { const pr = renderer.getPixelRatio(); R.rt.setSize(Math.max(64, Math.round(w * pr * 0.5)), Math.max(64, Math.round(h * pr * 0.5))); });
}
export function renderReflection(){
  if(!R.on || !LV.floor || camera.position.y < 0.05) return;
  const C = R.cam;
  _w.setFromMatrixPosition(camera.matrixWorld);
  _r.extractRotation(camera.matrixWorld);
  _l.set(0, 0, -1).applyMatrix4(_r).add(_w);
  // mirrored position, target and up
  C.position.copy(_w).reflect(N).negate(); C.position.y = -_w.y; C.position.x = _w.x; C.position.z = _w.z;
  _t.copy(_l); _t.y = -_t.y;
  C.up.set(0, 1, 0).applyMatrix4(_r).reflect(N);
  C.lookAt(_t);
  C.far = camera.far; C.near = camera.near; C.fov = camera.fov; C.aspect = camera.aspect;
  C.updateMatrixWorld(); C.projectionMatrix.copy(camera.projectionMatrix);
  LV.refl.mat.value.copy(BIAS).multiply(C.projectionMatrix).multiply(C.matrixWorldInverse);
  // draw the room without the floor itself, no shadow re-render
  LV.floor.visible = false;
  const prevRT = renderer.getRenderTarget(), sm = renderer.shadowMap.needsUpdate;
  renderer.shadowMap.needsUpdate = false;
  renderer.setRenderTarget(R.rt); renderer.clear();
  renderer.render(scene, C);
  renderer.setRenderTarget(prevRT); renderer.shadowMap.needsUpdate = sm;
  LV.floor.visible = true;
}
