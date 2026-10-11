// Menu and scoreboard icons are snapshots of the real tank models: each tank is drawn once at boot into a small
// off-screen picture (three-quarter view, soft studio light) that replaces the drawn SVG icon.
import * as THREE from 'three';
import { renderer } from './engine.js';
import { ALL_IDS, ICONS } from './heroes.js';
import { makeVisual, disposeVisual } from './anim.js';

export function renderTankIcons(size = 128){
  try{
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight('#FFFFFF', '#5A5A4E', 2.2));
    const sun = new THREE.DirectionalLight('#FFF4E0', 2.6); sun.position.set(3, 5, 4); scene.add(sun);
    const cam = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
    const rt = new THREE.WebGLRenderTarget(size, size, { samples:4 }); rt.texture.colorSpace = THREE.SRGBColorSpace;
    const px = new Uint8Array(size * size * 4);
    const cv = document.createElement('canvas'); cv.width = cv.height = size; const g = cv.getContext('2d');
    const img = g.createImageData(size, size);
    const prevTarget = renderer.getRenderTarget(), prevClear = renderer.getClearColor(new THREE.Color()), prevAlpha = renderer.getClearAlpha();
    const prevShadow = renderer.shadowMap.enabled; renderer.shadowMap.enabled = false;
    renderer.setClearColor(0x000000, 0);
    for(const id of ALL_IDS){
      const V = makeVisual(id);
      V.ring.visible = V.blob.visible = false;
      V.hull.rotation.y = 0; V.turret.rotation.y = 0.35; V.barrel.rotation.x = -(V.P.restElev || 0);
      scene.add(V.root); V.root.updateMatrixWorld(true);
      // frame the tank: its box, seen from the front-right and a little above
      const box = new THREE.Box3().setFromObject(V.hull), c = box.getCenter(new THREE.Vector3()), r = box.getSize(new THREE.Vector3()).length() * 0.5;
      const d = r / Math.sin(THREE.MathUtils.degToRad(13)) * 0.98;
      cam.position.set(c.x + d * 0.62, c.y + d * 0.42, c.z + d * 0.66); cam.lookAt(c);
      renderer.setRenderTarget(rt); renderer.clear(); renderer.render(scene, cam);
      renderer.readRenderTargetPixels(rt, 0, 0, size, size, px);
      for(let y = 0; y < size; y++) img.data.set(px.subarray((size - 1 - y) * size * 4, (size - y) * size * 4), y * size * 4);   // GL rows run bottom-up
      g.putImageData(img, 0, 0);
      ICONS[id] = `<img class="ticon" alt="" src="${cv.toDataURL('image/png')}">`;
      scene.remove(V.root); disposeVisual(V);
    }
    renderer.setRenderTarget(prevTarget); renderer.setClearColor(prevClear, prevAlpha); renderer.shadowMap.enabled = prevShadow;
    rt.dispose();
  }catch(e){ console.warn('tank icons: keeping the drawn ones', e); }
}
