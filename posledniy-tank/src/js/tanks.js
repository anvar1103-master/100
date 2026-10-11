// Tank models. Each tank is three parts — hull (with tracks), turret, barrel — as vertex-coloured geometry in metres,
// facing +z, plus anchor points: where the turret sits on the hull, where the barrel hinges on the turret, the muzzle
// at the barrel tip and where the cartoon eyes go. Parts come from the CC0 model pack when it is loaded
// (setTankModels), otherwise from the built-in toy tanks below, so the game always has tanks to show.
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { HEROES } from './heroes.js';

const C = new THREE.Color();
// give a geometry one flat colour (and the hero material's glow attribute)
function paint(g, color, glow = 0){
  g = g.index ? g.toNonIndexed() : g;
  g.deleteAttribute('uv');
  const n = g.attributes.position.count, col = new Float32Array(n * 3), gl = new Float32Array(n);
  C.set(color);
  for(let i = 0; i < n; i++){ col[i * 3] = C.r; col[i * 3 + 1] = C.g; col[i * 3 + 2] = C.b; gl[i] = glow; }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3)); g.setAttribute('aGlow', new THREE.BufferAttribute(gl, 1));
  return g;
}
const at = (g, x, y, z, rx = 0, ry = 0, rz = 0) => { g.rotateX(rx); g.rotateY(ry); g.rotateZ(rz); g.translate(x, y, z); return g; };
// a box with rounded edges (soft toy look)
function rbox(w, h, d, r, color){
  const seg = 3, g = new THREE.BoxGeometry(w, h, d, seg, seg, seg), p = g.attributes.position, v = new THREE.Vector3();
  const hx = w / 2 - r, hy = h / 2 - r, hz = d / 2 - r;
  for(let i = 0; i < p.count; i++){
    v.fromBufferAttribute(p, i);
    const c = new THREE.Vector3(THREE.MathUtils.clamp(v.x, -hx, hx), THREE.MathUtils.clamp(v.y, -hy, hy), THREE.MathUtils.clamp(v.z, -hz, hz));
    const n = v.clone().sub(c); if(n.lengthSq() > 1e-8) v.copy(c).addScaledVector(n.normalize(), r);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return paint(g, color);
}
const cyl = (r0, r1, h, color, seg = 14) => paint(new THREE.CylinderGeometry(r0, r1, h, seg), color);
const ball = (r, color, sx = 1, sy = 1, sz = 1) => { const g = new THREE.SphereGeometry(r, 16, 10); g.scale(sx, sy, sz); return paint(g, color); };
const merge = list => { const g = mergeGeometries(list); g.computeBoundingSphere(); return g; };

// tracks on both sides: a dark belt, road wheels and a mudguard in the hull colour
function tracks(len, w, col){
  const out = [];
  for(const sx of [-1, 1]){
    out.push(at(rbox(0.24, 0.3, len, 0.1, '#2B2B30'), sx * w, 0.17, 0));
    for(let i = 0; i < 4; i++) out.push(at(cyl(0.1, 0.1, 0.06, '#6A6A72', 12), sx * (w + 0.12), 0.15, -len * 0.36 + i * len * 0.24, 0, 0, Math.PI / 2));
    out.push(at(rbox(0.3, 0.06, len + 0.06, 0.03, col), sx * w, 0.34, 0));
  }
  return out;
}

const BUILT_IN = {
  // «Картечник»: a stubby, wide brawler with a flared blunderbuss gun
  shroom:() => {
    const col = '#D8402F', dark = '#9E2A1F';
    return { len:1.3,
      hull:merge([...tracks(1.3, 0.42, dark), at(rbox(0.86, 0.32, 1.2, 0.1, col), 0, 0.42, 0), at(rbox(0.5, 0.06, 0.3, 0.02, '#F2E6CC'), 0, 0.6, -0.36)]),
      turret:merge([ball(0.38, col, 1, 0.7, 1), at(ball(0.11, '#F2E6CC'), 0.22, 0.12, -0.18), at(ball(0.08, '#F2E6CC'), -0.24, 0.16, -0.08), at(cyl(0.3, 0.36, 0.08, dark), 0, -0.12, 0)]),
      barrel:merge([at(cyl(0.09, 0.1, 0.42, '#3E3A40'), 0, 0, 0.21, Math.PI / 2), at(cyl(0.17, 0.1, 0.16, '#C9A24A'), 0, 0, 0.48, Math.PI / 2)]),
      turretPos:[0, 0.62, 0.02], barrelPos:[0, 0.04, 0.26], muzzle:[0, 0, 0.58], eyes:[0, 0.2, 0.25], eyeR:0.09, eyeSep:0.14 };
  },
  // «Мортира»: a boxy carrier with a fat short mortar that points up
  beetle:() => {
    const col = '#3E5CC8', dark = '#26387E';
    return { len:1.35, restElev:0.45,
      hull:merge([...tracks(1.35, 0.44, dark), at(rbox(0.88, 0.36, 1.26, 0.08, col), 0, 0.44, 0), at(rbox(0.2, 0.12, 0.2, 0.04, '#25252C'), 0.28, 0.66, -0.4), at(rbox(0.2, 0.12, 0.2, 0.04, '#25252C'), -0.28, 0.66, -0.4)]),
      turret:merge([rbox(0.62, 0.3, 0.62, 0.1, col), at(rbox(0.66, 0.06, 0.66, 0.03, dark), 0, -0.14, 0)]),
      barrel:merge([at(cyl(0.15, 0.16, 0.4, '#2E2E36'), 0, 0, 0.18, Math.PI / 2), at(cyl(0.19, 0.19, 0.08, '#C9A24A'), 0, 0, 0.38, Math.PI / 2)]),
      turretPos:[0, 0.77, -0.06], barrelPos:[0, 0.06, 0.2], muzzle:[0, 0, 0.42], eyes:[0, 0.16, 0.3], eyeR:0.09, eyeSep:0.16 };
  },
  // «Дальнобой»: low and long, a small turret and a very long gun with a muzzle brake; wasp stripes
  wasp:() => {
    const col = '#F2C01E', dark = '#2A2420';
    const stripes = [0.3, 0, -0.3].map(z => at(rbox(0.82, 0.05, 0.12, 0.02, dark), 0, 0.58, z));
    return { len:1.45,
      hull:merge([...tracks(1.45, 0.4, dark), at(rbox(0.8, 0.28, 1.4, 0.08, col), 0, 0.42, 0), ...stripes]),
      turret:merge([rbox(0.5, 0.24, 0.56, 0.1, col), at(rbox(0.52, 0.05, 0.12, 0.02, dark), 0, 0.12, -0.1)]),
      barrel:merge([at(cyl(0.05, 0.06, 1.15, '#34343C'), 0, 0, 0.57, Math.PI / 2), at(rbox(0.14, 0.1, 0.16, 0.03, '#2A2420'), 0, 0, 1.14), at(cyl(0.07, 0.07, 0.2, dark), 0, 0.09, 0.12, Math.PI / 2)]),
      turretPos:[0, 0.68, -0.08], barrelPos:[0, 0.02, 0.24], muzzle:[0, 0, 1.24], eyes:[0, 0.13, 0.24], eyeR:0.075, eyeSep:0.13 };
  },
  // «Рикошет»: a round slate-blue tank with banded armour and a ringed gun
  roly:() => {
    const col = '#6E7FA3', band = '#B9C4DE';
    return { len:1.25,
      hull:merge([...tracks(1.25, 0.42, '#4A5575'), at(ball(0.5, col, 0.9, 0.42, 1.25), 0, 0.42, 0), ...[-0.3, 0, 0.3].map(z => at(paint(new THREE.TorusGeometry(0.38, 0.035, 6, 20), band), 0, 0.5, z, 0, 0, 0))]),
      turret:merge([ball(0.34, col, 1, 0.75, 1), at(paint(new THREE.TorusGeometry(0.3, 0.04, 6, 20), band), 0, 0.04, 0, Math.PI / 2)]),
      barrel:merge([at(cyl(0.07, 0.08, 0.6, '#3A4463'), 0, 0, 0.3, Math.PI / 2), at(paint(new THREE.TorusGeometry(0.1, 0.035, 6, 14), '#7FE7FF', 0.8), 0, 0, 0.56)]),
      turretPos:[0, 0.66, 0], barrelPos:[0, 0.02, 0.24], muzzle:[0, 0, 0.64], eyes:[0, 0.18, 0.24], eyeR:0.09, eyeSep:0.14 };
  },
  // «Стрекот»: a light, quick tank with twin rapid-fire guns and an antenna
  hopper:() => {
    const col = '#5DB83A', dark = '#3F8A2A';
    return { len:1.2,
      hull:merge([...tracks(1.2, 0.38, dark), at(rbox(0.74, 0.28, 1.12, 0.1, col), 0, 0.4, 0), at(rbox(0.5, 0.04, 0.5, 0.02, '#C9EE7A'), 0, 0.55, -0.2)]),
      turret:merge([rbox(0.48, 0.26, 0.5, 0.1, col), at(cyl(0.012, 0.012, 0.6, '#2E3A2A', 5), -0.16, 0.38, -0.16), at(ball(0.035, '#B6FF5A'), -0.16, 0.68, -0.16)]),
      barrel:merge([at(cyl(0.04, 0.04, 0.55, '#2E3A2A'), 0.07, 0, 0.28, Math.PI / 2), at(cyl(0.04, 0.04, 0.55, '#2E3A2A'), -0.07, 0, 0.28, Math.PI / 2), at(rbox(0.24, 0.1, 0.12, 0.03, dark), 0, 0, 0.04)]),
      turretPos:[0, 0.66, 0], barrelPos:[0, 0.0, 0.22], muzzle:[0, 0, 0.58], eyes:[0, 0.14, 0.22], eyeR:0.08, eyeSep:0.12 };
  }
};

// models from the CC0 pack, by tank id (set at load time; see assets.js)
let MODELS = null;
export function setTankModels(m){ MODELS = m; CACHE.clear(); }
const CACHE = new Map();
export function tankParts(id){
  if(!CACHE.has(id)) CACHE.set(id, (MODELS && MODELS[id]) || (BUILT_IN[id] || BUILT_IN.shroom)());
  return CACHE.get(id);
}
export const tankIds = () => Object.keys(HEROES);
