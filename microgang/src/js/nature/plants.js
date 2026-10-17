// What grows on the glade that is built in code (the ready-made plants and props are in models.js): the puffball,
// dandelions with their leaf rosettes, moss cushions.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { MAP, groundH } from '../map.js';
import { natureMat } from './shaders.js';
import { tube, lathe, leafGeo, mergeGeometries, mat4, instanced, placed } from './geo.js';
import { leafTex, capTex, gillTex, petalTex, noiseTex, mossTex, normalFrom, toTex } from './textures.js';
import { mulberry, TAU } from '../util.js';

export const PL = { puffballs:[], meshes:[] };
const add = o => { scene.add(o); PL.meshes.push(o); return o; };
const items = k => MAP.items.filter(i => i.k === k);

// ---- the puffball (a bounce pad) ----
function buildPuffballs(){
  for(const p of items('puffball')){
    const t = noiseTex({ seed:71, size:256, base:'#EDE2C6', cols:['#FFFFFF', '#D8C9A6', '#F6EFDD', '#C7B48E'], n:1600, rmin:1, rmax:4, alpha:0.6, bump:3 });
    const m = new THREE.Mesh(new THREE.SphereGeometry(p.R, 40, 24), natureMat(new THREE.MeshStandardMaterial({ map:t.map, normalMap:t.normal, roughness:0.85 }), { trans:'#FFF0D0', transK:0.4 }));
    m.scale.set(1, 0.8, 1); m.position.set(p.x, p.y + p.R * 0.68, p.z); m.castShadow = m.receiveShadow = true;
    add(m);
    PL.puffballs.push({ item:p, mesh:m, squash:0 });
  }
}
export function puffKick(p){ const P = PL.puffballs.find(q => q.item === p); if(P) P.squash = 1; }
export function tickPlants(dt){
  for(const P of PL.puffballs){
    if(P.squash > 0) P.squash = Math.max(0, P.squash - dt * 2.6);
    const k = Math.sin(P.squash * Math.PI) * 0.3;
    P.mesh.scale.set(1 + k * 0.6, 0.8 * (1 - k), 1 + k * 0.6);
  }
}

// ---- dandelions: hollow stem, flower or seed clock, the rosette of jagged leaves ----
function buildDandelions(){
  const L = items('dandelion'); if(!L.length) return;
  const stemMat = natureMat(new THREE.MeshStandardMaterial({ color:'#8DB85A', roughness:0.45 }), { wind:1, windH:1, windAmp:1.4, trans:'#D8F0A0', transK:1.6 });
  const petal = petalTex('#E9A20E', '#FFE24A');
  const petalG = leafGeo(0.25, 0.04, 2, 6, 0.05); petalG.scale(0.42, 1, 2.6);
  const bractG = leafGeo(0.2, 0.0, 2, 5, 0.3); bractG.scale(0.3, 1, 2.0);
  const seedStalk = new THREE.CylinderGeometry(0.018, 0.018, 1, 4, 1, true); seedStalk.translate(0, 0.5, 0);
  // pappus: a starburst of fine hairs on a camera-independent disc
  const pc = document.createElement('canvas'); pc.width = pc.height = 128; { const x = pc.getContext('2d'); x.translate(64, 64);
    for(let i = 0; i < 70; i++){ const a = i / 70 * TAU + Math.random() * 0.05; x.strokeStyle = `rgba(255,255,250,${0.5 + Math.random() * 0.4})`; x.lineWidth = 1.1; x.beginPath(); x.moveTo(0, 0); const l = 52 + Math.random() * 10; x.quadraticCurveTo(Math.cos(a) * l * 0.5, Math.sin(a) * l * 0.5 - 4, Math.cos(a) * l, Math.sin(a) * l); x.stroke(); } }
  const pap = toTex(pc, { clamp:true });
  const papG = new THREE.CircleGeometry(1, 12);
  for(const d of L){
    const H = d.h, lean = d.lean, ry = d.ry;
    const top = new THREE.Vector3(Math.sin(ry) * lean * H, H, Math.cos(ry) * lean * H);
    const pts = [new THREE.Vector3(0, -0.2, 0), new THREE.Vector3(top.x * 0.2, H * 0.3, top.z * 0.2), new THREE.Vector3(top.x * 0.6, H * 0.7, top.z * 0.6), top];
    const sg = tube(pts, t => 0.52 - t * 0.12, 10, 24);
    // the stem's local height drives its sway: scale y into 0..1 for natureMat (windH = 1 in units of the stem)
    const sp = sg.attributes.position; for(let i = 0; i < sp.count; i++) sp.setY(i, sp.getY(i));
    const g = new THREE.Group(); g.position.set(d.x, d.y, d.z); add(g);
    const sm = natureMat(stemMat.clone(), { wind:1, windH:H, windAmp:1.4, trans:'#D8F0A0', transK:1.6 });
    const stem = new THREE.Mesh(sg, sm); stem.castShadow = stem.receiveShadow = true; g.add(stem);
    const headMat = (m) => natureMat(m, { wind:1, hConst:1, windAmp:1.4, trans:'#FFE080', transK:1.2 });
    const head = new THREE.Group(); head.position.copy(top); g.add(head);
    if(d.head === 'flower'){
      // rings of strap petals around a dense centre, green bracts below
      const pm = headMat(new THREE.MeshStandardMaterial({ map:petal, roughness:0.6, side:THREE.DoubleSide }));
      const mats = [];
      for(let ring = 0; ring < 5; ring++){ const n = 34 - ring * 4, tilt = 0.08 + ring * 0.3, s = 1.3 - ring * 0.2;
        for(let i = 0; i < n; i++){ const a = i / n * TAU + ring * 0.37; mats.push(mat4(0, 0.5 + ring * 0.14, 0, -tilt, a, 0, s, s, s)); } }
      head.add(instanced(petalG, pm, mats));
      const bm = headMat(new THREE.MeshStandardMaterial({ color:'#6E9A34', roughness:0.6, side:THREE.DoubleSide }));
      const bmats = []; for(let i = 0; i < 14; i++){ const a = i / 14 * TAU; bmats.push(mat4(0, 0.3, 0, 2.3, a, 0, 1.2)); }
      head.add(instanced(bractG, bm, bmats));
      const c = new THREE.Mesh(new THREE.SphereGeometry(1.1, 20, 12), headMat(new THREE.MeshStandardMaterial({ color:'#E7A010', roughness:0.8 }))); c.scale.set(1, 0.55, 1); c.position.y = 0.6; head.add(c);
    } else {
      // seed clock: stalks radiating from the receptacle, a pappus at each end
      const rec = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 10), headMat(new THREE.MeshStandardMaterial({ color:'#8A7A50', roughness:0.9 }))); head.add(rec);
      const r = mulberry(Math.round(d.x * 13 + d.z * 7)), sm2 = [], pm2 = [], n = LOW ? 110 : 220;
      for(let i = 0; i < n; i++){
        const y = 1 - (i + 0.5) / n * 1.75, rr = Math.sqrt(Math.max(0, 1 - y * y)), a = i * 2.39996;
        const dir = new THREE.Vector3(Math.cos(a) * rr, y, Math.sin(a) * rr);
        if(dir.y < -0.6) continue;
        const len = 4.2 + r() * 0.5, q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        sm2.push(new THREE.Matrix4().compose(dir.clone().multiplyScalar(0.6), q, new THREE.Vector3(1, len, 1)));
        const q2 = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir);
        pm2.push(new THREE.Matrix4().compose(dir.clone().multiplyScalar(0.6 + len), q2, new THREE.Vector3(1.25, 1.25, 1.25)));
      }
      head.add(instanced(seedStalk, headMat(new THREE.MeshStandardMaterial({ color:'#F2EEDC', roughness:0.6 })), sm2, null, false));
      const pp = instanced(papG, headMat(new THREE.MeshStandardMaterial({ map:pap, transparent:true, alphaTest:0.08, depthWrite:false, side:THREE.DoubleSide, roughness:0.5, color:'#FFFFFF', emissive:'#2A2620' })), pm2, null, false);
      pp.renderOrder = 3; head.add(pp);
    }
  }
  // leaf rosettes (all dandelions share one instanced mesh)
  const lt = leafTex({ seed:81, w:256, h:768, c0:'#3F7424', c1:'#6CA23A', veins:12, serr:9, shape:t => (0.18 + 0.27 * Math.sin(Math.PI * Math.pow(t, 0.9))) * (0.55 + 0.45 * Math.abs(Math.sin(t * 7.5))) });
  const lm = natureMat(new THREE.MeshStandardMaterial({ map:lt.map, normalMap:lt.normal, alphaTest:0.5, side:THREE.DoubleSide, roughness:0.5 }), { trans:'#C8E880', transK:1.4, wind:4, hBy:'uv', windAmp:0.4 });
  const lg = leafGeo(0.18, 0.25, 6, 18, 0.0);
  const mats = items('dleaf').map(l => { const y = groundH(l.x + Math.cos(l.a) * l.L * 0.5, l.z + Math.sin(l.a) * l.L * 0.5);
    return mat4(l.x, Math.max(l.y, y) + 0.05, l.z, -l.lift * 0.5, Math.PI / 2 - l.a, 0, l.w, 1, l.L); });
  add(instanced(lg, lm, mats));
}

// ---- moss cushions: soft lumpy domes with spore capsules on fine stalks ----
function buildCushions(){
  const L = items('cushion'); if(!L.length) return;
  const mt = mossTex();
  const g = new THREE.SphereGeometry(1, 28, 14, 0, TAU, 0, Math.PI / 2);
  const p = g.attributes.position; for(let i = 0; i < p.count; i++){ const x = p.getX(i), y = p.getY(i), z = p.getZ(i); const n = 1 + Math.sin(x * 5) * Math.cos(z * 6) * 0.06; p.setXYZ(i, x * n, y * n, z * n); }
  g.computeVertexNormals();
  const m = natureMat(new THREE.MeshStandardMaterial({ map:mt.map, normalMap:mt.normal, normalScale:new THREE.Vector2(2, 2), roughness:0.95 }), { trans:'#C8F080', transK:0.6 });
  add(instanced(g, m, L.map(c => mat4(c.x, c.y - 0.2, c.z, 0, c.ry, 0, c.r, c.r * 0.55, c.r))));
  // sporophytes: hair-thin red-brown stalks with a nodding capsule
  const sg = new THREE.CylinderGeometry(0.02, 0.03, 1, 4); sg.translate(0, 0.5, 0);
  const cg = new THREE.CapsuleGeometry(0.07, 0.22, 3, 6); cg.rotateZ(1.2);
  const r = mulberry(131), st = [], caps = [];
  for(const c of L) for(let i = 0; i < Math.round(c.r * 9); i++){
    const a = r() * TAU, d = Math.sqrt(r()) * c.r * 0.8, x = c.x + Math.cos(a) * d, z = c.z + Math.sin(a) * d, y = c.y - 0.2 + c.r * 0.55 * Math.sqrt(Math.max(0, 1 - (d / c.r) ** 2)), h = 0.9 + r() * 0.9;
    st.push(mat4(x, y, z, (r() - 0.5) * 0.3, 0, (r() - 0.5) * 0.3, 1, h, 1)); caps.push(mat4(x, y + h, z, 0, r() * TAU, 0, 1));
  }
  const sm = natureMat(new THREE.MeshStandardMaterial({ color:'#8A3A1A', roughness:0.6 }), { wind:3, windH:1, windAmp:0.15, perH:1 });
  add(instanced(sg, sm, st, null, false));
  add(instanced(cg, natureMat(new THREE.MeshStandardMaterial({ color:'#6A4A20', roughness:0.5 }), { wind:3, hConst:1, windAmp:0.25 }), caps, null, false));
}

export function buildPlants(){
  buildPuffballs(); buildDandelions(); buildCushions();
}
