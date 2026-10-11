// Loads the CC0 tank models (OpenGameArt, see CREDITS.md) and turns each into the three parts the game animates:
// hull (with tracks and wheels), turret and barrel, as vertex-coloured geometry in metres facing +z (see tanks.js).
// Every tank is repainted in its role colour; the light and dark of its original texture are kept as shading detail,
// so panels, hatches and rivets still read. Sizes are fitted to the game: a hull about as long as a hero is wide.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { setTankModels } from './tanks.js';

// which model plays which role, its paint, size (hull length, m) and tweaks
const SPEC = {
  shroom:{ file:'heavy_tank',     body:'#D8402F', len:1.4 },
  beetle:{ file:'artillery_tank', body:'#3E5CC8', len:1.3, restElev:0.35, gun:'dark' },
  wasp:  { file:'sniper_tank',    body:'#F2C01E', len:1.45, barrelZ:1.5 },
  roly:  { file:'light_tank',     body:'#6E7FA3', len:1.3, barrelZ:1.3 },
  hopper:{ file:'rapid_tank',     body:'#5DB83A', len:1.25 }
};
const PAINT = { track:'#2B2B30', wheel:'#7A7A84', gun:'#3A3A44' };

// what a mesh is, from its node or material names: tracks and wheels stay dark, guns gunmetal, the rest takes the paint
function kindOf(o, root){
  const names = [o.material.name || ''];
  for(let n = o; n && n !== root; n = n.parent) names.push(n.name || '');
  const s = names.join(' ');
  if(/track|tread/i.test(s)) return 'track';
  if(/wheel/i.test(s)) return 'wheel';
  if(/barrel|gun/i.test(s)) return 'gun';
  if(/miniturret/i.test(s)) return 'dark';
  return 'body';
}

// brightness of a texture at a uv (images are read once into a canvas)
const PIX = new Map();
function pixels(img){
  if(!PIX.has(img)){
    const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently:true }); g.drawImage(img, 0, 0);
    PIX.set(img, { w:c.width, h:c.height, d:g.getImageData(0, 0, c.width, c.height).data });
  }
  return PIX.get(img);
}
function lumAt(P, u, v){
  u -= Math.floor(u); v -= Math.floor(v);
  const x = Math.min(P.w - 1, Math.floor(u * P.w)), y = Math.min(P.h - 1, Math.floor(v * P.h)), i = (y * P.w + x) * 4;
  return (0.3 * P.d[i] + 0.59 * P.d[i + 1] + 0.11 * P.d[i + 2]) / 255;
}

// one model → hull / turret / barrel parts
function convert(scene, S){
  scene.updateMatrixWorld(true);
  const find = rx => { let r = null; scene.traverse(o => { if(!r && rx.test(o.name || '')) r = o; }); return r; };
  const turretN = find(/^turret/i), barrelN = find(/^barrel/i);
  const under = (o, n) => { for(let p = o; p; p = p.parent) if(p === n) return true; return false; };
  const wpos = n => new THREE.Vector3().setFromMatrixPosition(n.matrixWorld);
  const tW = wpos(turretN), bW = wpos(barrelN);
  // every face of every mesh: which part, its corners (in the part's own frame, unscaled), kind and brightness
  const faces = { hull:[], turret:[], barrel:[] };
  const v = new THREE.Vector3();
  scene.traverse(o => {
    if(!o.isMesh) return;
    const part = under(o, barrelN) ? 'barrel' : under(o, turretN) ? 'turret' : 'hull';
    const origin = part === 'barrel' ? bW : part === 'turret' ? tW : new THREE.Vector3();
    const g = o.geometry, pos = g.attributes.position, uv = g.attributes.uv, idx = g.index;
    const map = o.material.map && o.material.map.image ? pixels(o.material.map.image) : null;
    const base = o.material.color ? 0.3 * o.material.color.r + 0.59 * o.material.color.g + 0.11 * o.material.color.b : 1;
    const k0 = kindOf(o, scene), kind = k0 === 'gun' && S.gun ? S.gun : k0, n = idx ? idx.count : pos.count;
    for(let i = 0; i < n; i += 3){
      const c = [], ids = [0, 1, 2].map(k => idx ? idx.getX(i + k) : i + k);
      for(const j of ids){ v.fromBufferAttribute(pos, j).applyMatrix4(o.matrixWorld).sub(origin); c.push(v.x, v.y, v.z); }
      let lum = base;
      if(map && uv){ let u = 0, w = 0; for(const j of ids){ u += uv.getX(j) / 3; w += uv.getY(j) / 3; } lum *= lumAt(map, u, w); }
      faces[part].push({ c, kind, lum });
    }
  });
  // fit: hull box centred on x/z and standing on the ground; the toy look gets a little extra height
  const hb = new THREE.Box3();
  for(const f of faces.hull) for(let k = 0; k < 9; k += 3) hb.expandByPoint(v.set(f.c[k], f.c[k + 1], f.c[k + 2]));
  let top = hb.max.y;
  for(const [p, o] of [['turret', tW], ['barrel', bW]]) for(const f of faces[p]) for(let k = 1; k < 9; k += 3) top = Math.max(top, f.c[k] + o.y);
  const L = hb.max.z - hb.min.z, W = hb.max.x - hb.min.x, Ht = top - hb.min.y;
  const s = Math.min(S.len / L, 1.08 / W);
  const sy = THREE.MathUtils.clamp(Ht * s * 1.2, 0.85, 1.2) / Ht;
  const cx = (hb.min.x + hb.max.x) / 2, cz = (hb.min.z + hb.max.z) / 2, y0 = hb.min.y;
  // shading detail: how much lighter or darker each face is than the average of its kind
  const mean = {};
  for(const p in faces) for(const f of faces[p]){ const m = mean[f.kind] || (mean[f.kind] = [0, 0]); m[0] += f.lum; m[1]++; }
  const body = new THREE.Color(S.body), dark = body.clone().multiplyScalar(0.62), col = new THREE.Color();
  const build = (list, ox, oy, oz, zs = 1) => {
    const n = list.length * 3, P = new Float32Array(n * 3), C = new Float32Array(n * 3);
    list.forEach((f, i) => {
      const m = mean[f.kind], d = THREE.MathUtils.clamp(1 + (f.lum - m[0] / m[1]) * 1.4, 0.6, 1.35);
      if(f.kind === 'body') col.copy(body); else if(f.kind === 'dark') col.copy(dark); else col.set(PAINT[f.kind]);
      col.multiplyScalar(d);
      for(let k = 0; k < 3; k++){
        const a = (i * 3 + k) * 3;
        P[a] = (f.c[k * 3] - ox) * s; P[a + 1] = (f.c[k * 3 + 1] - oy) * sy; P[a + 2] = (f.c[k * 3 + 2] - oz) * s * zs;
        C[a] = col.r; C[a + 1] = col.g; C[a + 2] = col.b;
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setAttribute('color', new THREE.BufferAttribute(C, 3));
    g.setAttribute('aGlow', new THREE.BufferAttribute(new Float32Array(n), 1));
    g.computeVertexNormals(); g.computeBoundingBox(); g.computeBoundingSphere();
    return g;
  };
  const hull = build(faces.hull, cx, y0, cz), turret = build(faces.turret, 0, 0, 0), barrel = build(faces.barrel, 0, 0, 0, S.barrelZ || 1);
  const turretPos = [(tW.x - cx) * s, (tW.y - y0) * sy, (tW.z - cz) * s];
  const barrelPos = [(bW.x - tW.x) * s, (bW.y - tW.y) * sy, (bW.z - tW.z) * s];
  const bb = barrel.boundingBox, tb = turret.boundingBox;
  const muzzle = [(bb.min.x + bb.max.x) / 2, (bb.min.y + bb.max.y) / 2, bb.max.z];
  // eyes: on the turret's front face, above the gun, as far forward as the armour reaches at that height
  const eyeR = THREE.MathUtils.clamp((tb.max.y - tb.min.y) * 0.22, 0.065, 0.1);
  const eyeSep = Math.min(0.15, (tb.max.x - tb.min.x) * 0.22);
  const ey = THREE.MathUtils.clamp(Math.max(barrelPos[1] + bb.max.y + eyeR * 0.9, tb.min.y + (tb.max.y - tb.min.y) * 0.55), tb.min.y + eyeR, tb.max.y - eyeR * 0.5);
  let ez = -1e9; const tp = turret.attributes.position;
  for(let i = 0; i < tp.count; i++) if(Math.abs(tp.getY(i) - ey) < eyeR * 1.5 && Math.abs(tp.getX(i)) < eyeSep + eyeR * 2) ez = Math.max(ez, tp.getZ(i));
  if(ez < -1e8) ez = tb.max.z;
  return { len:L * s, hull, turret, barrel, turretPos, barrelPos, muzzle, eyes:[0, ey, ez - eyeR * 0.3], eyeR, eyeSep, restElev:S.restElev };
}

// load all five (in parallel); if anything fails the game keeps its built-in toy tanks
export async function loadTanks(onProgress){
  try{
    const ids = Object.keys(SPEC); let done = 0;
    const loader = new GLTFLoader();
    const out = {};
    await Promise.all(ids.map(async id => {
      const g = await loader.loadAsync('assets/tanks/' + SPEC[id].file + '.glb');
      out[id] = convert(g.scene, SPEC[id]);
      g.scene.traverse(o => { if(o.isMesh){ o.geometry.dispose(); if(o.material.map) o.material.map.dispose(); o.material.dispose(); } });
      if(onProgress) onProgress(++done / ids.length);
    }));
    PIX.clear();
    setTankModels(out);
  }catch(e){ console.warn('tank models not loaded, using built-in tanks', e); }
}
