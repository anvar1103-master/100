// Portraits for the menu: each hero (holding a blaster) and each gun rendered once into a small image.
import * as THREE from 'three';
import { renderer } from './engine.js';
import { buildHero, animHero, disposeHero } from './heroes.js';
import { buildGun } from './gunmodels.js';
import { HERO_IDS, newInput } from './fighter.js';
import { PRIMARIES } from './weapons.js';

function shoot(scene, cam, w, h){
  const rt = new THREE.WebGLRenderTarget(w * 2, h * 2, { samples:4 });
  rt.texture.colorSpace = THREE.SRGBColorSpace;
  const tm = renderer.toneMapping; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setRenderTarget(rt); renderer.setClearColor(0x000000, 0); renderer.clear(); renderer.render(scene, cam); renderer.setRenderTarget(null);
  renderer.toneMapping = tm;
  const px = new Uint8Array(w * 2 * h * 2 * 4); renderer.readRenderTargetPixels(rt, 0, 0, w * 2, h * 2, px); rt.dispose();
  const c = document.createElement('canvas'); c.width = w * 2; c.height = h * 2; const x = c.getContext('2d'), img = x.createImageData(w * 2, h * 2);
  for(let y = 0; y < h * 2; y++) img.data.set(px.subarray((h * 2 - 1 - y) * w * 8, (h * 2 - y) * w * 8), y * w * 8);
  x.putImageData(img, 0, 0);
  renderer.setClearColor(0x000000, 1);
  return c.toDataURL('image/png');
}
function studio(){
  const s = new THREE.Scene();
  const key = new THREE.DirectionalLight('#FFE8C8', 2.6); key.position.set(-2, 3, 3);
  const rim = new THREE.DirectionalLight('#C8E4FF', 1.8); rim.position.set(2, 2, -3);
  s.add(key, rim, new THREE.HemisphereLight('#E8F0FF', '#4A5A30', 1.6));
  return s;
}
export function makeIcons(){
  const out = { heroes:{}, weapons:{} };
  try{
    for(const id of HERO_IDS){
      const s = studio(), cam = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
      const f = { id:1, hero:id, primary:'hornet', x:0, y:0, z:0, vx:0, vy:0, vz:0, yaw:Math.PI + 0.5, pitch:0.05, alive:true, ground:true, crouchK:0, cur:0, h:1.7, deadT:0, sprintT:0,
        guns:[{ W:{ id:'hornet', reload:{ kind:'mag' }, recoil:{ punch:1 } } }], inp:newInput() };
      const H = buildHero(f, s); H.bodyYaw = f.yaw;
      for(let i = 0; i < 30; i++) animHero(H, 1 / 30);
      cam.position.set(-0.9, 1.25, 3.2); cam.lookAt(0, 0.95, 0);
      out.heroes[id] = shoot(s, cam, 96, 96);
      disposeHero(H);
    }
    for(const id of PRIMARIES.concat('comb')){
      const s = studio(), g = buildGun(id, false), cam = new THREE.PerspectiveCamera(22, 2, 0.05, 20);
      s.add(g.root); g.root.rotation.y = -Math.PI / 2;
      const box = new THREE.Box3().setFromObject(g.root), c = box.getCenter(new THREE.Vector3()), sz = box.getSize(new THREE.Vector3());
      cam.position.set(c.x - 0.2, c.y + 0.1, c.z + Math.max(sz.x, sz.z) * 2.7); cam.lookAt(c);
      out.weapons[id] = shoot(s, cam, 144, 72);
    }
  }catch(e){ console.warn('icons', e); }
  return out;
}
