// Things lying on the meadow (pebbles, twigs, roots, fallen leaves, acorns, cones, the snail shell, a spider web,
// dew drops) and the giants beyond it (tree trunks, burdock leaves) that tell you how small you are.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { MAP, groundH, BOUND } from '../map.js';
import { natureMat } from './shaders.js';
import { tube, lathe, leafGeo, rockGeo, mergeGeometries, mat4, instanced } from './geo.js';
import { leafTex, barkTex, stoneTex, shellTex, noiseTex, photoSet, mossTex } from './textures.js';
import { mulberry, TAU, lerp } from '../util.js';

const add = o => { scene.add(o); return o; };
const items = k => MAP.items.filter(i => i.k === k);

let BARK = null, STONE = null;
async function textures(){
  const [b, s] = await Promise.all([photoSet('bark'), photoSet('rock')]);
  BARK = b || barkTex(); STONE = s || stoneTex();
}

// ---- pebbles: a handful of lumpy shapes, instanced with colour variety ----
function buildPebbles(){
  const L = items('pebble'); if(!L.length) return;
  // triplanar in the pebble's own space: the photo texture wraps round without stretching
  const m = natureMat(new THREE.MeshStandardMaterial({ map:STONE.map, roughness:0.85 }), { key:'pebble',
    frag:s => {
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vOP; varying vec3 vON;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvOP = position; vON = normal;');
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vOP; varying vec3 vON;').replace('#include <map_fragment>', `
        vec3 bw = pow(abs(normalize(vON)), vec3(4.0)); bw /= dot(bw, vec3(1.0));
        vec3 tp = vOP * 0.9;
        diffuseColor *= texture2D(map, tp.yz) * bw.x + texture2D(map, tp.xz + 0.37) * bw.y + texture2D(map, tp.xy + 0.71) * bw.z;`);
    } });
  const V = 6, geos = Array.from({ length:V }, (_, i) => rockGeo(300 + i, LOW ? 2 : 3, 0.18 + i * 0.03)), lists = geos.map(() => []), cols = geos.map(() => []);
  const r = mulberry(17), tints = ['#B9B2A2', '#A39C8E', '#C9C0AC', '#8F8A80', '#B5A58C', '#9C9A92'].map(c => new THREE.Color(c));
  for(const p of L){
    const v = Math.floor(r() * V), s = p.r;
    lists[v].push(mat4(p.x, p.y + s * p.sq * 0.55, p.z, (r() - 0.5) * 0.3, p.ry, (r() - 0.5) * 0.3, s, s * p.sq, s * (0.8 + r() * 0.4)));
    cols[v].push(tints[Math.floor(r() * tints.length)]);
  }
  geos.forEach((g, i) => { if(lists[i].length) add(instanced(g, m, lists[i], cols[i])); });
}

// ---- twigs and roots: tapered bark tubes; roots carry moss on their tops ----
function buildWood(){
  const twigs = [], roots = [];
  const r = mulberry(19);
  for(const t of items('twig')){
    const a = new THREE.Vector3(t.ax, t.ay, t.az), b = new THREE.Vector3(t.bx, t.by, t.bz), mid = a.clone().lerp(b, 0.5);
    mid.y -= t.sag || 0; mid.x += (r() - 0.5) * 0.8; mid.z += (r() - 0.5) * 0.8;
    const pts = [a, a.clone().lerp(mid, 0.5), mid, mid.clone().lerp(b, 0.5), b];
    twigs.push(tube(pts, s => t.r * (1 - s * 0.25), 10, 0, { vScale:3, uRep:1, wobble:0.08, seed:r() * 50, caps:true, segLen:0.8 }));
    // a broken-off side shoot or two
    for(let i = 0; i < 2; i++){ const s = 0.2 + r() * 0.6, p = pts[0].clone().lerp(pts[4], s), d = new THREE.Vector3(r() - 0.5, r() * 0.6, r() - 0.5).normalize().multiplyScalar(1.5 + r() * 3);
      twigs.push(tube([p, p.clone().add(d)], q => t.r * 0.45 * (1 - q * 0.6), 6, 3, { caps:true, vScale:3 })); }
  }
  for(const t of items('root')){
    const pts = t.pts.map(p => new THREE.Vector3(p[0], p[1], p[2]));
    roots.push(tube(pts, s => t.r * (1.25 - s * 0.55), 18, 0, { vScale:6, uRep:2, wobble:0.12, seed:t.ax, segLen:1 }));
  }
  const bark = natureMat(new THREE.MeshStandardMaterial({ map:BARK.map, normalMap:BARK.normal, roughnessMap:BARK.rough || null, roughness:0.92, normalScale:new THREE.Vector2(1.6, 1.6), color:'#C8B8A8' }), {});
  if(twigs.length){ const m = new THREE.Mesh(mergeGeometries(twigs), bark); m.castShadow = m.receiveShadow = true; add(m); }
  if(roots.length){
    const mt = mossTex();
    const rm = natureMat(new THREE.MeshStandardMaterial({ map:BARK.map, normalMap:BARK.normal, roughness:0.92, normalScale:new THREE.Vector2(2, 2), color:'#B0A090' }), { key:'root',
      frag:s => { s.uniforms.mgMoss = { value:mt.map };
        s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D mgMoss;').replace('#include <map_fragment>', `#include <map_fragment>
          { vec3 wn = inverseTransformDirection(normalize(vNormal), viewMatrix);
            float mk = smoothstep(0.35, 0.75, wn.y + (texture2D(mgMoss, vMgWorld.xz * 0.21).g - 0.5) * 0.6);
            diffuseColor.rgb = mix(diffuseColor.rgb, texture2D(mgMoss, vMgWorld.xz * 0.23).rgb * 0.95, mk); }`); } });
    const m = new THREE.Mesh(mergeGeometries(roots), rm); m.castShadow = m.receiveShadow = true; add(m);
  }
}

// ---- fallen leaves: big curled sheets in four autumn colours ----
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

// ---- acorns, acorn cups, pine cones ----
function capGeo(){
  // the scaly cup: a bowl
  return lathe([[0, -0.05], [0.55, 0.0], [0.95, 0.25], [1.12, 0.55], [1.12, 0.72], [0.98, 0.78], [0.88, 0.62], [0.6, 0.45], [0, 0.4]], 28);
}
function buildNuts(){
  const nutT = noiseTex({ seed:211, size:256, base:'#8A6A2C', cols:['#6E5020', '#A4823C', '#5A4018', '#B89A50'], n:600, rmin:2, rmax:8, stretch:4, alpha:0.35, bump:1 });
  const capT = noiseTex({ seed:213, size:256, base:'#8C7650', cols:['#6A563A', '#A89068', '#5A4A30', '#C0A880'], n:2600, rmin:2, rmax:5, alpha:0.75, bump:6 });
  const nutM = natureMat(new THREE.MeshPhysicalMaterial({ map:nutT.map, normalMap:nutT.normal, roughness:0.35, clearcoat:0.6, clearcoatRoughness:0.3 }), {});
  const capM = natureMat(new THREE.MeshStandardMaterial({ map:capT.map, normalMap:capT.normal, normalScale:new THREE.Vector2(2.5, 2.5), roughness:0.95, side:THREE.DoubleSide }), {});
  const nutG = lathe([[0, -1.25], [0.25, -1.18], [0.62, -0.85], [0.86, -0.3], [0.9, 0.2], [0.82, 0.55], [0.5, 0.75], [0, 0.78]], 28);
  const cg = capGeo();
  const nuts = [], caps = [];
  for(const a of items('acorn')){
    const s = a.s;
    const base = a.lying ? mat4(a.x, a.y + 0.85 * s, a.z, 0, a.ry, Math.PI / 2 - 0.1, s) : mat4(a.x, a.y + 1.2 * s, a.z, 0.05, a.ry, 0.05, s);
    nuts.push(base);
    caps.push(new THREE.Matrix4().multiplyMatrices(base, mat4(0, 0.35, 0, 0, 0, 0, 1)));
  }
  for(const c of items('acorncap')) caps.push(c.flip ? mat4(c.x, c.y + 0.75 * c.s, c.z, Math.PI, c.ry, 0, c.s * 1.2) : mat4(c.x, c.y + 0.02, c.z, 0.08, c.ry, 0, c.s * 1.2));
  if(nuts.length) add(instanced(nutG, nutM, nuts));
  if(caps.length) add(instanced(cg, capM, caps));
  // pine cones: woody scales in a Fibonacci spiral around a tapering core
  const C = items('pinecone'); if(!C.length) return;
  const sc = new THREE.BoxGeometry(1, 0.22, 1.1, 2, 1, 2); sc.translate(0, 0, 0.55);
  { const p = sc.attributes.position; for(let i = 0; i < p.count; i++){ const z = p.getZ(i), x = p.getX(i); p.setY(i, p.getY(i) + z * z * 0.18 - Math.abs(x) * 0.12); p.setX(i, x * (1 - z * 0.25)); } sc.computeVertexNormals(); }
  const scT = noiseTex({ seed:221, size:256, base:'#7A5230', cols:['#5A3A20', '#9A7048', '#4A2E18', '#B08A5A'], n:900, rmin:2, rmax:6, stretch:2, alpha:0.5, bump:2 });
  const scM = natureMat(new THREE.MeshStandardMaterial({ map:scT.map, normalMap:scT.normal, roughness:0.9 }), {});
  const mats = [], cols = [], tip = new THREE.Color('#C8A070'), base = new THREE.Color('#6A4A2A');
  const X = new THREE.Vector3(), Y = new THREE.Vector3(), Z = new THREE.Vector3(), B = new THREE.Matrix4(), P = new THREE.Vector3();
  for(const c of C){
    // the cone lies on its side: its axis (local y) turned to horizontal along the yaw
    const root = mat4(c.x, c.y + c.R * 0.8, c.z, 0, c.ry, Math.PI / 2 + c.roll * 0.2, 1);
    const n = 150;
    for(let i = 0; i < n; i++){
      const t = i / n, y = (t - 0.45) * c.L, a = i * 2.39996;
      const prof = Math.sin(Math.PI * Math.min(1, Math.pow(t, 0.65) * 1.02)), core = c.R * 0.28 * prof + 0.15, len = c.R * (0.25 + 0.75 * prof);
      const out = new THREE.Vector3(Math.cos(a), 0, Math.sin(a)), th = 0.5 + (1 - t) * 0.35;
      // scales flare outward and lean back toward the stalk end (local -y)
      Z.copy(out).multiplyScalar(Math.cos(th)).addScaledVector(new THREE.Vector3(0, -1, 0), Math.sin(th)).normalize();
      X.set(-Math.sin(a), 0, Math.cos(a)); Y.crossVectors(Z, X).normalize();
      B.makeBasis(X, Y, Z).scale(new THREE.Vector3(len * 0.62, len * 0.55, len));
      B.setPosition(P.copy(out).multiplyScalar(core).setY(y));
      mats.push(new THREE.Matrix4().multiplyMatrices(root, B)); cols.push(base.clone().lerp(tip, 0.25 + prof * 0.4));
    }
  }
  add(instanced(sc, scM, mats, cols));
}

// ---- the empty snail shell: a growing spiral tube lying on its side, opening to the east ----
function buildShell(){
  const S = items('shell')[0]; if(!S) return;
  const st = shellTex();
  const pts = [], R = S.R;
  // a logarithmic spiral in the x-y plane with a little drift along z (the shell's axis)
  const turns = 2.6, n = 90;
  for(let i = 0; i <= n; i++){ const t = i / n, a = t * turns * TAU, rr = R * 0.12 * Math.exp(t * 1.9); pts.push(new THREE.Vector3(Math.cos(a) * rr, Math.sin(a) * rr, -t * R * 0.55)); }
  const g = tube(pts, t => R * 0.08 * Math.exp(t * 1.95), 28, n, { vScale:R * 4, uRep:1 });
  const m = natureMat(new THREE.MeshPhysicalMaterial({ map:st.map, normalMap:st.normal, roughness:0.35, clearcoat:0.5, clearcoatRoughness:0.35, side:THREE.DoubleSide }), { trans:'#FFC880', transK:0.5 });
  const mesh = new THREE.Mesh(g, m); mesh.castShadow = mesh.receiveShadow = true;
  const grp = new THREE.Group(); grp.add(mesh);
  // lie it down: spiral plane vertical, opening facing +x after the yaw
  mesh.rotation.set(0, Math.PI / 2, 0);
  grp.position.set(S.x, S.y + R * 0.92, S.z); grp.rotation.y = S.ry;
  add(grp);
}

// ---- a spider web between stems: radial threads, a spiral, dew beads ----
function buildWebs(){
  for(const w of items('web')){
    const pos = [], r = mulberry(Math.round(w.x * 7)), spokes = 22, R = w.R;
    for(let i = 0; i < spokes; i++){ const a = i / spokes * TAU; pos.push(0, 0, 0, Math.cos(a) * R, Math.sin(a) * R, 0); }
    let prev = null;
    for(let k = 0; k < spokes * 14; k++){ const a = k / spokes * TAU, rr = R * (0.12 + k / (spokes * 14) * 0.85), p = [Math.cos(a) * rr, Math.sin(a) * rr - (r() * 0.05), 0]; if(prev) pos.push(...prev, ...p); prev = p; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const l = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color:'#F8F4EA', transparent:true, opacity:0.55 }));
    l.position.set(w.x, w.y, w.z); l.rotation.y = w.ry; add(l);
    // beads of dew sparkle along the threads
    const beads = [];
    for(let i = 0; i < 160; i++){ const k = Math.floor(r() * (pos.length / 6)), t = r(); beads.push(new THREE.Matrix4().makeTranslation(lerp(pos[k * 6], pos[k * 6 + 3], t), lerp(pos[k * 6 + 1], pos[k * 6 + 4], t), 0).scale(new THREE.Vector3(1, 1, 1).multiplyScalar(0.06 + r() * 0.1))); }
    const im = instanced(new THREE.SphereGeometry(1, 8, 6), dewMat(), beads, null, false);
    im.position.copy(l.position); im.rotation.copy(l.rotation); add(im);
    // the two stems it hangs between
    const sg = new THREE.CylinderGeometry(0.35, 0.45, 1, 8); sg.translate(0, 0.5, 0);
    const sm = natureMat(new THREE.MeshStandardMaterial({ color:'#7A9A44', roughness:0.5 }), { wind:3, windH:1, windAmp:0.3, perH:0.1, trans:'#D0F090' });
    const d = new THREE.Vector3(Math.cos(w.ry), 0, -Math.sin(w.ry)).multiplyScalar(R * 1.05);
    add(instanced(sg, sm, [mat4(w.x + d.x, groundH(w.x + d.x, w.z + d.z) - 0.2, w.z + d.z, 0, 0, 0.04, 1, w.y + R + 6 - groundH(w.x, w.z), 1), mat4(w.x - d.x, groundH(w.x - d.x, w.z - d.z) - 0.2, w.z - d.z, 0, 0, -0.04, 1, w.y + R + 4 - groundH(w.x, w.z), 1)]));
  }
}

// ---- dew: clear drops that catch the sun ----
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

// ---- beyond the meadow: giant trunks and burdock leaves, softened by the far blur ----
function buildBackdrop(){
  const bark = natureMat(new THREE.MeshStandardMaterial({ map:BARK.map, normalMap:BARK.normal, roughness:0.95, color:'#9A8A7A' }), { dapple:false });
  const trunks = items('trunk').concat([{ x:-210, z:-150, r:30, h:520 }, { x:-170, z:210, r:24, h:520 }, { x:230, z:150, r:36, h:520 }, { x:40, z:-260, r:20, h:520 }]);
  for(const t of trunks){
    const prof = [[t.r * 1.9, -6], [t.r * 1.3, 4], [t.r * 1.08, 20], [t.r, 60], [t.r * 0.96, t.h]];
    const g = lathe(prof, 40);
    const uv = g.attributes.uv; for(let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 8, uv.getY(i) * t.h / 40);
    const m = new THREE.Mesh(g, bark); m.position.set(t.x, groundH(t.x, t.z), t.z); add(m);
  }
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
  await textures();
  buildPebbles(); buildWood(); buildLeaves(); buildNuts(); buildShell(); buildWebs(); buildDew(); buildBackdrop();
}
