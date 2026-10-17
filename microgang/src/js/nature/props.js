// Simple things built in code: fallen leaves and dew drops on the glade, and the huge burdock leaves beyond it.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { MAP, groundH, BOUND } from '../map.js';
import { natureMat } from './shaders.js';
import { leafGeo, mat4, instanced } from './geo.js';
import { leafTex } from './textures.js';
import { mulberry, TAU } from '../util.js';

const add = o => { scene.add(o); return o; };
const items = k => MAP.items.filter(i => i.k === k);

function buildLeaves(){
  const L = items('leaf'); if(!L.length) return;
  const sets = [
    leafTex({ seed:201, w:384, h:640, c0:'#5C8A2A', c1:'#8AB040', veins:9, rim:'rgba(90,70,20,0.6)', spots:6 }),
    leafTex({ seed:202, w:384, h:640, c0:'#C89A2A', c1:'#E8C04A', veins:9, vein:'rgba(255,240,180,0.5)', spots:14 }),
    leafTex({ seed:203, w:384, h:640, c0:'#B0501E', c1:'#D8782A', veins:9, vein:'rgba(255,210,150,0.45)', spots:10 }),
    leafTex({ seed:204, w:384, h:640, c0:'#6A4A26', c1:'#8C6A3C', veins:9, vein:'rgba(220,190,140,0.35)', spots:20 }),
  ];
  const r = mulberry(23);
  sets.forEach((t, k) => {
    const list = L.filter(l => l.tint === k); if(!list.length) return;
    const m = natureMat(new THREE.MeshStandardMaterial({ map:t.map, normalMap:t.normal, alphaTest:0.5, side:THREE.DoubleSide, roughness:k === 3 ? 0.9 : 0.6 }), { trans:k === 0 ? '#C0E070' : '#FFD080', transK:1.2 });
    for(const l of list){
      const g = leafGeo(l.curl * 0.6, 0.12, 8, 14, 0); g.scale(l.L * 0.62, l.L * 0.6, l.L); g.translate(0, 0, -l.L * 0.5);
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(l.x, l.y + (l.pitch > 0.1 ? Math.sin(l.pitch) * l.L * 0.5 : 0.05), l.z); mesh.rotation.set(-l.pitch, l.ry, l.roll, 'YXZ');
      mesh.castShadow = mesh.receiveShadow = true; add(mesh);
    }
  });
}

// ---- dew drops: tiny lenses on the ground ----
let DEW = null;
function dewMat(){
  if(DEW) return DEW;
  DEW = new THREE.MeshPhysicalMaterial({ color:'#FFFFFF', roughness:0.02, metalness:0, transparent:true, opacity:0.42, envMapIntensity:2.2, clearcoat:1, clearcoatRoughness:0, ior:1.33, specularIntensity:1 });
  return DEW;
}
function buildDew(){
  const L = items('dew'); if(!L.length) return;
  const g = new THREE.SphereGeometry(1, 20, 14); g.scale(1, 0.72, 1);
  add(instanced(g, dewMat(), L.map(d => mat4(d.x, d.y + d.r * 0.55, d.z, 0, 0, 0, d.r)), null, false));
}

// ---- beyond the glade: burdock leaves as tall as houses, softened by the far blur ----
function buildBackdrop(){
  // burdock: huge leaves on stalks ringing the meadow behind the grass wall
  const lt = leafTex({ seed:231, w:512, h:640, c0:'#2E5A1E', c1:'#477A2A', veins:11, shape:t => 0.5 * Math.sin(Math.PI * Math.pow(t, 0.6)) * (t < 0.15 ? 0.6 + t * 2.6 : 1) });
  const lm = natureMat(new THREE.MeshStandardMaterial({ map:lt.map, normalMap:lt.normal, alphaTest:0.5, side:THREE.DoubleSide, roughness:0.6 }), { trans:'#B0E070', transK:1.4, wind:6, hBy:'uv', windAmp:1.4, dapple:false });
  const lg = leafGeo(0.25, 0.25, 6, 12, 0.55);
  const r = mulberry(29), mats = [];
  for(let i = 0; i < 26; i++){
    const a = r() * TAU, d = BOUND + 30 + r() * 50, x = Math.cos(a) * d * 1.2, z = Math.sin(a) * d * 1.2;
    if(Math.max(Math.abs(x), Math.abs(z)) < BOUND + 25) continue;
    const n = 4 + Math.floor(r() * 3), y = groundH(x, z) - 2;
    for(let j = 0; j < n; j++){ const s = 34 + r() * 26; mats.push(mat4(x, y, z, -0.75 - r() * 0.45, r() * TAU, 0, s * 0.75, s, s)); }
  }
  add(instanced(lg, lm, mats, null, false));
}

export async function buildProps(){
  buildLeaves(); buildDew();
}
