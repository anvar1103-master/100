// Everything big that grows or lies on the meadow, built from MAP.items: fly agarics, the puffball, dandelions
// with their leaf rosettes, clover, wild strawberries, flowers, reeds, lily leaves, moss cushions.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { MAP, groundH, WATER } from '../map.js';
import { natureMat } from './shaders.js';
import { tube, lathe, leafGeo, mergeGeometries, mat4, instanced, placed } from './geo.js';
import { leafTex, capTex, gillTex, petalTex, noiseTex, mossTex, normalFrom, toTex } from './textures.js';
import { mulberry, TAU } from '../util.js';

export const PL = { puffballs:[], meshes:[] };
const add = o => { scene.add(o); PL.meshes.push(o); return o; };
const items = k => MAP.items.filter(i => i.k === k);

// a white fibrous stem texture (v along)
let stemT = null;
function stemTex(){
  return stemT || (stemT = noiseTex({ seed:61, size:256, base:'#EFE8D8', cols:['#D9CFBA', '#FFFFFF', '#E6DCC6', '#C9BCA2'], n:900, rmin:1, rmax:3, stretch:9, alpha:0.5, bump:1.5 }));
}

// ---- fly agarics ----
function buildAmanitas(){
  const L = items('amanita'); if(!L.length) return;
  const st = stemTex();
  const stemMat = natureMat(new THREE.MeshStandardMaterial({ map:st.map, normalMap:st.normal, roughness:0.7, color:'#FFFFFF' }), { trans:'#FFF0D0', transK:0.5 });
  const capMat = natureMat(new THREE.MeshPhysicalMaterial({ map:capTex(), roughness:0.42, clearcoat:0.7, clearcoatRoughness:0.25, sheen:0.3, sheenColor:new THREE.Color('#FF9A70') }), { trans:'#FF6040', transK:0.8 });
  const gillMat = natureMat(new THREE.MeshStandardMaterial({ map:gillTex(), roughness:0.85, side:THREE.DoubleSide, emissive:'#5A4A36', emissiveIntensity:0.55 }), {});
  const wartMat = natureMat(new THREE.MeshStandardMaterial({ color:'#FFF8EA', roughness:0.9 }), {});
  const wartG = new THREE.IcosahedronGeometry(1, 1), warts = [];
  const r = mulberry(5);
  for(const m of L){
    const H = m.h, R = m.R, sr = m.sr, capH = R * (m.young ? 0.7 : 0.36), top = H;
    // stem with the bulbous base, a hanging ring (skirt) and a slight taper
    const prof = [[0, 0], [sr * 1.75, 0.05], [sr * 1.9, sr * 0.6], [sr * 1.5, sr * 1.5], [sr * 1.05, sr * 2.6], [sr, H * 0.45], [sr * 0.92, H * 0.72], [sr * 0.86, top - capH * 0.6], [0, top - capH * 0.6]];
    const g = new THREE.Group(); g.position.set(m.x, m.y, m.z); g.rotation.set(m.tilt, m.ry, m.tilt * 0.6);
    const stem = new THREE.Mesh(lathe(prof, 28), stemMat); stem.castShadow = stem.receiveShadow = true; g.add(stem);
    if(!m.young){
      const ring = new THREE.Mesh(lathe([[sr * 0.9, H * 0.74], [sr * 1.5, H * 0.72 - 0.2], [sr * 1.9, H * 0.68 - 0.6], [sr * 1.95, H * 0.66 - 0.75]], 28), new THREE.MeshStandardMaterial({ color:'#F4EEDD', roughness:0.8, side:THREE.DoubleSide }));
      ring.castShadow = true; g.add(ring);
    }
    // cap: a dome (flattened when mature), rim slightly turned down
    const cp = [];
    for(let i = 0; i <= 14; i++){ const t = i / 14, a = t * Math.PI / 2; cp.push([Math.sin(a) * R * (1 - 0.06 * t * t), top - capH * 0.55 + Math.cos(a) * capH * (m.young ? 1 : 0.85 + 0.15 * Math.cos(a))]); }
    cp.push([R * 0.97, top - capH * 0.72]);
    const cap = new THREE.Mesh(lathe(cp, 40), capMat); cap.castShadow = cap.receiveShadow = true; g.add(cap);
    // gills underneath
    const gl = new THREE.Mesh(lathe([[R * 0.96, top - capH * 0.7], [R * 0.6, top - capH * 0.62], [sr * 0.9, top - capH * 0.58]], 40), gillMat); g.add(gl);
    add(g);
    g.updateMatrixWorld(true);
    // white warts on the cap
    const n = Math.round(R * R * (m.young ? 1.6 : 0.9));
    for(let i = 0; i < n; i++){
      const t = Math.sqrt(r()) * 0.93, a = r() * TAU, k = t * Math.PI / 2;
      const px = Math.sin(k) * R * Math.cos(a), pz = Math.sin(k) * R * Math.sin(a), py = top - capH * 0.55 + Math.cos(k) * capH * (m.young ? 1 : 0.85 + 0.15 * Math.cos(k));
      const s = (0.07 + r() * 0.15) * Math.sqrt(R) * (1 - t * 0.55);
      const v = new THREE.Vector3(px, py, pz).applyMatrix4(g.matrixWorld);
      const nrm = new THREE.Vector3(Math.sin(k) * Math.cos(a), Math.cos(k), Math.sin(k) * Math.sin(a));
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), nrm).premultiply(g.quaternion);
      warts.push(new THREE.Matrix4().compose(v, q, new THREE.Vector3(s * 1.3, s * 0.45, s * (1 + r() * 0.4))));
    }
  }
  add(instanced(wartG, wartMat, warts));
}

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

// ---- clover: stems with three heart-shaped leaflets (the pale chevron on each) ----
function buildClover(){
  const L = items('clover'); if(!L.length) return;
  const lt = leafTex({ seed:91, w:256, h:256, c0:'#3B7A2A', c1:'#4E9A34', veins:7, rim:'rgba(30,60,15,0.5)', shape:t => { const a = t * Math.PI; return 0.42 * Math.sin(a) * (1 + 0.25 * Math.sin(a * 2)) * (t > 0.88 ? Math.max(0.2, (1 - t) * 6) : 1); } });
  // the pale chevron
  { const c = lt.map.image, x = c.getContext('2d'); x.globalCompositeOperation = 'source-atop'; x.strokeStyle = 'rgba(220,240,200,0.4)'; x.lineWidth = 18; x.beginPath(); x.moveTo(60, 120); x.lineTo(128, 170); x.lineTo(196, 120); x.stroke(); lt.map.needsUpdate = true; }
  const leafM = natureMat(new THREE.MeshStandardMaterial({ map:lt.map, normalMap:lt.normal, alphaTest:0.5, side:THREE.DoubleSide, roughness:0.45 }), { trans:'#C0E880', transK:1.8, wind:1.2, hConst:1, windAmp:0.5 });
  const stemM = natureMat(new THREE.MeshStandardMaterial({ color:'#7FA65A', roughness:0.5 }), { wind:1.2, windH:1, windAmp:0.5, trans:'#C8F090' });
  const lg = leafGeo(0.35, 0.12, 4, 6, 0.08);
  const leaflets = [], stems = [], flowers = [];
  const stemG = new THREE.CylinderGeometry(0.16, 0.2, 1, 6, 4); stemG.translate(0, 0.5, 0);
  for(const c of L){
    stems.push(mat4(c.x, c.y - 0.2, c.z, 0, 0, 0, 1, c.h + 0.2, 1));
    for(let i = 0; i < 3; i++){ const a = c.ry + i / 3 * TAU; leaflets.push(mat4(c.x, c.y + c.h, c.z, -0.22, a, 0, c.s * 0.9, 1, c.s)); }
    if(c.flower) flowers.push(mat4(c.x + 1.5, c.y + c.h * 1.15, c.z, 0, 0, 0, 1.3, 1.5, 1.3));
  }
  add(instanced(stemG, stemM, stems));
  add(instanced(lg, leafM, leaflets));
  if(flowers.length){
    const ft = noiseTex({ seed:93, size:128, base:'#F3E6EE', cols:['#FFFFFF', '#E8B8D0', '#F8F0F4', '#D898B8'], n:500, rmin:1, rmax:4, alpha:0.7, bump:4 });
    add(instanced(new THREE.SphereGeometry(1, 18, 12), natureMat(new THREE.MeshStandardMaterial({ map:ft.map, normalMap:ft.normal, roughness:0.8 }), {}), flowers));
  }
}

// ---- wild strawberries: serrated trifoliate leaves on long stalks, red berries with seeds and a green calyx ----
function buildStrawberries(){
  const L = items('strawberry');
  const lt = leafTex({ seed:101, w:256, h:384, c0:'#2F6420', c1:'#4D8A2E', veins:10, serr:16, vein:'rgba(200,230,150,0.35)', shape:t => 0.44 * Math.sin(Math.PI * Math.pow(t, 0.75)) });
  const leafM = natureMat(new THREE.MeshPhysicalMaterial({ map:lt.map, normalMap:lt.normal, normalScale:new THREE.Vector2(2, 2), alphaTest:0.5, side:THREE.DoubleSide, roughness:0.38, clearcoat:0.3 }), { trans:'#A8D870', transK:1.3, wind:2, hConst:1, windAmp:0.4 });
  const stemM = natureMat(new THREE.MeshStandardMaterial({ color:'#6E8A40', roughness:0.6 }), { wind:2, windH:1, windAmp:0.4 });
  const lg = leafGeo(0.3, 0.18, 4, 8, 0.12), stemG = new THREE.CylinderGeometry(0.12, 0.16, 1, 5, 3); stemG.translate(0, 0.5, 0);
  const leaves = [], stems = [], r = mulberry(103);
  for(const s of L){
    const n = 4 + Math.floor(r() * 3);
    for(let i = 0; i < n; i++){
      const a = s.ry + i / n * TAU + r() * 0.4, h = s.h * (0.7 + r() * 0.35), d = 1.5 + r() * 1.5, x = s.x + Math.cos(a) * d, z = s.z + Math.sin(a) * d;
      stems.push(mat4(s.x, s.y - 0.2, s.z, Math.atan2(d, h) * Math.sin(a) * 0, 0, 0, 1, h, 1));
      for(let j = 0; j < 3; j++){ const b = a + (j - 1) * 0.9; leaves.push(mat4(s.x + Math.cos(a) * 0.3, s.y + h, s.z + Math.sin(a) * 0.3, -0.35 - Math.abs(j - 1) * 0.1, Math.PI / 2 - b, 0, s.s * 0.62, 1, s.s * (j === 1 ? 1.05 : 0.9))); }
    }
  }
  add(instanced(stemG, stemM, stems)); add(instanced(lg, leafM, leaves));
  // berries
  const B = items('berry'); if(!B.length) return;
  const bc = document.createElement('canvas'); bc.width = 512; bc.height = 256; const bh = document.createElement('canvas'); bh.width = 512; bh.height = 256;
  { const x = bc.getContext('2d'), h = bh.getContext('2d'), g = x.createLinearGradient(0, 0, 0, 256); g.addColorStop(0, '#E8F0B0'); g.addColorStop(0.15, '#F04030'); g.addColorStop(1, '#B0100C'); x.fillStyle = g; x.fillRect(0, 0, 512, 256);
    h.fillStyle = '#808080'; h.fillRect(0, 0, 512, 256);
    for(let j = 0; j < 14; j++) for(let i = 0; i < 26; i++){ const px = (i + (j % 2) * 0.5) / 26 * 512, py = 20 + j / 14 * 226; x.fillStyle = '#F2D040'; x.beginPath(); x.ellipse(px, py, 3.5, 5, 0, 0, 7); x.fill(); h.fillStyle = '#404040'; h.beginPath(); h.ellipse(px, py, 7, 9, 0, 0, 7); h.fill(); h.fillStyle = '#C0C0C0'; h.beginPath(); h.ellipse(px, py, 3, 4, 0, 0, 7); h.fill(); } }
  const berryM = new THREE.MeshPhysicalMaterial({ map:toTex(bc), normalMap:normalFrom(bh, 3), roughness:0.3, clearcoat:0.8, clearcoatRoughness:0.2, sheen:0.2, sheenColor:new THREE.Color('#FF8080') });
  const greenM = new THREE.MeshPhysicalMaterial({ map:toTex(bc), normalMap:normalFrom(bh, 3), roughness:0.4, clearcoat:0.5, color:'#C8E890' });
  const bg = lathe([[0, -1.1], [0.45, -1.0], [0.8, -0.6], [0.98, -0.05], [0.9, 0.45], [0.55, 0.78], [0, 0.85]], 24);
  const calyx = leafGeo(0.2, 0.05, 2, 4, 0.2); calyx.scale(0.35, 1, 0.9);
  const ripe = [], green = [], cal = [];
  for(const b of B){
    const m = mat4(b.x, b.y + b.r * 0.9, b.z, 0.3, b.ry, 0.2, b.r);
    (b.ripe ? ripe : green).push(m);
    for(let i = 0; i < 8; i++) cal.push(new THREE.Matrix4().multiplyMatrices(m, mat4(0, 0.8, 0, -0.5, i / 8 * TAU, 0, 1.3)));
  }
  add(instanced(bg, berryM, ripe)); if(green.length) add(instanced(bg, greenM, green));
  add(instanced(calyx, natureMat(new THREE.MeshStandardMaterial({ color:'#4F8A2C', side:THREE.DoubleSide, roughness:0.5 }), { trans:'#B0E070' }), cal));
}

// ---- flowers: daisies, buttercups, bluebells on thin stems ----
function buildFlowers(){
  const L = items('flower'); if(!L.length) return;
  const stemG = new THREE.CylinderGeometry(0.13, 0.17, 1, 6, 6); stemG.translate(0, 0.5, 0);
  const stemM = natureMat(new THREE.MeshStandardMaterial({ color:'#6F9A40', roughness:0.5 }), { wind:1, windH:1, windAmp:0.9, perH:0.08, trans:'#C8F090' });
  const stems = [];
  const by = { daisy:[], buttercup:[], bluebell:[] };
  for(const f of L){ stems.push(mat4(f.x, f.y - 0.2, f.z, 0, 0, 0, 1, f.h, 1)); by[f.type].push(f); }
  add(instanced(stemG, stemM, stems));
  const headM = (opt) => natureMat(new THREE.MeshStandardMaterial(Object.assign({ side:THREE.DoubleSide, roughness:0.55 }, opt)), { wind:1, hConst:1, windAmp:0.9, trans:'#FFF6D0', transK:1.6 });
  const petal = leafGeo(0.15, 0.03, 2, 6, 0.03);
  // daisy: white ray petals with pink tips, yellow disc
  if(by.daisy.length){
    const pm = headM({ map:petalTex('#FFFFFF', '#F8E2EA', 7) }), mats = [], discs = [];
    for(const f of by.daisy){ const top = mat4(f.x, f.y + f.h, f.z, 0.25, f.ry, 0, 1);
      for(let i = 0; i < 22; i++) mats.push(new THREE.Matrix4().multiplyMatrices(top, mat4(0, 0, 0, -0.12, i / 22 * TAU, 0, 0.55, 1, 2.6)));
      discs.push(new THREE.Matrix4().multiplyMatrices(top, mat4(0, 0.05, 0, 0, 0, 0, 0.75, 0.35, 0.75))); }
    add(instanced(petal, pm, mats));
    const dt = noiseTex({ seed:111, size:128, base:'#F0B820', cols:['#E89A10', '#FFD84A', '#C88008'], n:600, rmin:1, rmax:3, alpha:0.8, bump:4 });
    add(instanced(new THREE.SphereGeometry(1, 16, 10), headM({ map:dt.map, normalMap:dt.normal, side:THREE.FrontSide, roughness:0.85 }), discs));
  }
  // buttercup: five glossy cupped petals
  if(by.buttercup.length){
    const pm = natureMat(new THREE.MeshPhysicalMaterial({ map:petalTex('#E8B800', '#FFE640', 9), side:THREE.DoubleSide, roughness:0.15, clearcoat:1, clearcoatRoughness:0.08 }), { wind:1, hConst:1, windAmp:0.9, trans:'#FFE070', transK:1.4 });
    const cup = leafGeo(0.9, 0.0, 4, 6, -0.25), mats = [];
    for(const f of by.buttercup){ const top = mat4(f.x, f.y + f.h, f.z, 0.2, f.ry, 0, 1);
      for(let i = 0; i < 5; i++) mats.push(new THREE.Matrix4().multiplyMatrices(top, mat4(0, 0, 0, -0.55, i / 5 * TAU, 0, 1.5, 1, 1.6))); }
    add(instanced(cup, pm, mats));
  }
  // bluebell: a few nodding bells on an arched tip
  if(by.bluebell.length){
    const bm = headM({ color:'#6A6FD8', roughness:0.5 });
    const bell = lathe([[0, 0], [0.35, -0.1], [0.55, -0.6], [0.62, -1.3], [0.9, -1.75], [1.05, -1.8]], 18);
    const mats = [];
    for(const f of by.bluebell) for(let i = 0; i < 4; i++) mats.push(mat4(f.x + Math.cos(f.ry) * (0.6 + i * 0.5), f.y + f.h - i * 1.3, f.z + Math.sin(f.ry) * (0.6 + i * 0.5), 0.35, f.ry + i, 0, 0.9 - i * 0.08));
    add(instanced(bell, bm, mats));
  }
}

// ---- puddle plants: rushes, floating lily leaves, duckweed ----
function buildWaterPlants(){
  const R = items('reed');
  if(R.length){
    const g = new THREE.CylinderGeometry(0.55, 1, 1, 8, 8); g.translate(0, 0.5, 0);
    const m = natureMat(new THREE.MeshStandardMaterial({ color:'#6E8E3A', roughness:0.4 }), { wind:1, windH:1, windAmp:0.12, perH:1, trans:'#D0F090', transK:1.4 });
    add(instanced(g, m, R.map(r => mat4(r.x, r.y - 0.3, r.z, r.lean, r.ry, r.lean * 0.5, r.r, r.h, r.r))));
    // brown seed tufts on a third of them
    const tg = new THREE.CapsuleGeometry(1, 3, 4, 8);
    const tm = natureMat(new THREE.MeshStandardMaterial({ color:'#6A4A2A', roughness:0.9 }), { wind:1, hConst:1, windAmp:0.12 * 20 });
    add(instanced(tg, tm, R.filter((r, i) => i % 3 === 0).map(r => mat4(r.x + Math.sin(r.ry) * r.lean * r.h, r.y + r.h - 1, r.z + Math.cos(r.ry) * r.lean * r.h, r.lean, r.ry, 0, r.r * 1.6, 1, r.r * 1.6))));
  }
  const Ly = items('lily');
  if(Ly.length){
    const lt = leafTex({ seed:121, w:512, h:512, c0:'#3A6A24', c1:'#4E8A30', veins:14, rim:'rgba(120,60,40,0.6)', shape:t => 0.5 * Math.sqrt(Math.max(0, 1 - Math.pow(t * 2 - 1, 2))) });
    const m = new THREE.MeshPhysicalMaterial({ map:lt.map, normalMap:lt.normal, alphaTest:0.5, roughness:0.25, clearcoat:0.8, clearcoatRoughness:0.1, side:THREE.DoubleSide });
    const g = leafGeo(-0.05, 0.02, 8, 8, 0); g.translate(0, 0, -0.5);
    const im = instanced(g, m, Ly.map(l => mat4(l.x, WATER + 0.06, l.z, 0, l.ry, 0, l.R * 2, 1, l.R * 2)), null, false);
    add(im);
    // duckweed: tiny round leaves drifting near the shore
    const dg = new THREE.CircleGeometry(0.35, 8); dg.rotateX(-Math.PI / 2);
    const r = mulberry(123), dm = [];
    for(let i = 0; i < 700; i++){ const a = r() * TAU, d = 10 + r() * 14, x = -48 + Math.cos(a) * d, z = -46 + Math.sin(a) * d; if(groundH(x, z) < WATER - 0.05) dm.push(mat4(x, WATER + 0.03, z, 0, r() * TAU, 0, 0.7 + r() * 0.8)); }
    add(instanced(dg, new THREE.MeshStandardMaterial({ color:'#7DB040', roughness:0.4 }), dm, null, false));
  }
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
  buildAmanitas(); buildPuffballs(); buildDandelions(); buildClover(); buildStrawberries(); buildFlowers(); buildWaterPlants(); buildCushions();
}
