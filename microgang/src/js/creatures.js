// Third-person fighters: upright insect warriors built in code and skinned to a small skeleton, so each fighter is a
// handful of draw calls. Procedural animation: digitigrade legs that step with the ground (two-bone IK), the body
// turning toward the aim, arms holding the gun at its grips, the abdomen and antennae swinging on springs,
// bee wings buzzing in the air, recoil, a hit flinch, and a fall that curls the legs.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { scene } from './engine.js';
import { buildGun } from './gunmodels.js';
import { normalFrom } from './nature/textures.js';
import { G, on } from './state.js';
import { gun } from './fighter.js';
import { clamp, damp, angDiff, sp, spring, lerp } from './util.js';

const LOOK = {
  ant:    { shell:'#6A2A12', dark:'#2A0E06', eye:'#120806', gloss:0.9, iri:0.15, sheen:0, rough:0.3 },
  beetle: { shell:'#22301F', dark:'#0B100A', eye:'#0A0A0A', gloss:1.0, iri:1.0, sheen:0, rough:0.22 },
  bee:    { shell:'#1E170C', dark:'#E0A41C', eye:'#140F08', gloss:0.45, iri:0, sheen:1, rough:0.55, stripe:'#E8B020' },
  hopper: { shell:'#6C9A30', dark:'#40621A', eye:'#3A2A10', gloss:0.6, iri:0.2, sheen:0, rough:0.35 },
  shroom: { shell:'#EADCC0', dark:'#9A3A1A', eye:'#1A1008', gloss:0.15, iri:0, sheen:0.3, rough:0.75, cap:'#A8341A' },
};

// ---- building: pieces placed in the bind pose, each tied to one bone, merged per material ----
class Builder {
  constructor(){ this.bones = []; this.byName = {}; this.parts = { shell:[], eye:[], gun:[], wing:[] }; }
  bone(name, parent, x, y, z){
    const b = new THREE.Bone(); b.name = name; const P = parent ? this.byName[parent] : null;
    b.userData.abs = new THREE.Vector3(x, y, z);
    if(P){ b.position.set(x, y, z).sub(P.userData.abs); P.add(b); } else b.position.set(x, y, z);
    b.userData.idx = this.bones.length; this.bones.push(b); this.byName[name] = b; return b;
  }
  add(mat, geo, bone, color){
    const g = geo.index ? geo.toNonIndexed() : geo.clone();
    const n = g.attributes.position.count, idx = this.byName[bone].userData.idx;
    const si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
    for(let i = 0; i < n; i++){ si[i * 4] = idx; sw[i * 4] = 1; }
    g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4)); g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
    const c = new THREE.Color(color || '#ffffff'), col = new Float32Array(n * 3), P = g.attributes.position;
    let y0 = 1e9, y1 = -1e9; for(let i = 0; i < n; i++){ const y = P.getY(i); if(y < y0) y0 = y; if(y > y1) y1 = y; }
    const jit = mat === 'shell' ? 0.92 + Math.random() * 0.16 : 1;
    for(let i = 0; i < n; i++){ const k = (mat === 'shell' ? 0.78 + 0.32 * (P.getY(i) - y0) / Math.max(1e-3, y1 - y0) : 1) * jit; col[i * 3] = c.r * k; col[i * 3 + 1] = c.g * k; col[i * 3 + 2] = c.b * k; }
    if(!g.attributes.color) g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    if(!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
    for(const k of Object.keys(g.attributes)) if(!['position', 'normal', 'uv', 'color', 'skinIndex', 'skinWeight'].includes(k)) g.deleteAttribute(k);
    this.parts[mat].push(g);
  }
}
const T = (g, x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = sx, sz = sx) => { g = g.clone(); g.scale(sx, sy, sz); g.rotateX(rx); g.rotateY(ry); g.rotateZ(rz); g.translate(x, y, z); return g; };
const SPH = new THREE.SphereGeometry(1, 18, 14), SPH_L = new THREE.SphereGeometry(1, 12, 9);
const CYL = new THREE.CylinderGeometry(1, 1, 1, 12, 1);
// a tapered limb segment between two points
function limbGeo(a, b, r0, r1){
  const d = new THREE.Vector3().subVectors(b, a), L = d.length();
  const g = new THREE.CylinderGeometry(r1, r0, L, 10, 2); g.translate(0, L / 2, 0);
  g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize())); g.translate(a.x, a.y, a.z);
  return g;
}
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// joint positions in the bind pose (facing -z, feet on y=0)
const J = {
  pelvis:V(0, 0.82, 0), thorax:V(0, 0.98, 0), neck:V(0, 1.38, -0.04), head:V(0, 1.46, -0.06), abd:V(0, 0.86, 0.12),
  hipR:V(0.13, 0.8, 0), kneeR:V(0.16, 0.5, -0.12), ankleR:V(0.16, 0.12, 0.1), toeR:V(0.16, 0.0, -0.12),
  shR:V(0.17, 1.3, -0.04), elR:V(0.28, 1.08, -0.06), haR:V(0.2, 1.05, -0.3),
  midR:V(0.15, 1.06, 0.02),
};
const mirror = v => V(-v.x, v.y, v.z);

function skeleton(B){
  B.bone('root', null, 0, 0, 0);
  B.bone('pelvis', 'root', J.pelvis.x, J.pelvis.y, J.pelvis.z);
  B.bone('abd', 'pelvis', J.abd.x, J.abd.y, J.abd.z);
  B.bone('thorax', 'pelvis', J.thorax.x, J.thorax.y, J.thorax.z);
  B.bone('head', 'thorax', J.head.x, J.head.y, J.head.z);
  B.bone('antL', 'head', -0.06, 1.58, -0.14); B.bone('antR', 'head', 0.06, 1.58, -0.14);
  B.bone('gun', 'thorax', 0.1, 1.22, -0.22);
  for(const s of ['R', 'L']){
    const m = s === 'R' ? (v => v) : mirror;
    B.bone('sh' + s, 'thorax', ...m(J.shR).toArray()); B.bone('el' + s, 'sh' + s, ...m(J.elR).toArray()); B.bone('ha' + s, 'el' + s, ...m(J.haR).toArray());
    B.bone('mid' + s, 'thorax', ...m(J.midR).toArray());
    B.bone('hip' + s, 'pelvis', ...m(J.hipR).toArray()); B.bone('knee' + s, 'hip' + s, ...m(J.kneeR).toArray()); B.bone('ankle' + s, 'knee' + s, ...m(J.ankleR).toArray());
    B.bone('wing' + s, 'thorax', s === 'R' ? 0.07 : -0.07, 1.32, 0.08);
  }
}

// limbs common to all: legs (thigh, shin, foot), arms (upper, fore, claw), small middle legs
function limbs(B, L, o = {}){
  const c = L.shell, d = L.dark;
  for(const s of ['R', 'L']){
    const m = s === 'R' ? (v => v) : mirror;
    const hip = m(J.hipR), knee = m(J.kneeR), ank = m(J.ankleR), toe = m(J.toeR);
    const th = o.thigh || 0.075;
    B.add('shell', limbGeo(hip, knee, th, th * 0.75), 'hip' + s, c);
    B.add('shell', T(SPH_L, knee.x, knee.y, knee.z, 0, 0, 0, th * 0.85), 'knee' + s, d);
    B.add('shell', limbGeo(knee, ank, th * 0.7, th * 0.45), 'knee' + s, c);
    B.add('shell', limbGeo(ank, toe, th * 0.45, th * 0.3), 'ankle' + s, d);
    B.add('shell', T(SPH_L, toe.x, toe.y + 0.02, toe.z, 0, 0, 0, 0.035, 0.025, 0.05), 'ankle' + s, d);
    for(const t of [0.33, 0.66]){ const p = ank.clone().lerp(toe, t); B.add('shell', T(SPH_L, p.x, p.y, p.z, 0, 0, 0, th * 0.42), 'ankle' + s, d); }
    for(const k of [-1, 1]) B.add('shell', T(new THREE.ConeGeometry(0.008, 0.05, 5), toe.x + k * 0.012, toe.y + 0.01, toe.z - 0.05, -1.75, 0, 0), 'ankle' + s, d);
    if(o.spines) for(let i = 0; i < 3; i++){ const p = knee.clone().lerp(ank, 0.25 + i * 0.25); B.add('shell', T(new THREE.ConeGeometry(0.012, 0.06, 5), p.x, p.y, p.z + 0.04, 1.2, 0, 0), 'knee' + s, d); }
    const sh = m(J.shR), el = m(J.elR), ha = m(J.haR);
    B.add('shell', limbGeo(sh, el, 0.05, 0.04), 'sh' + s, c);
    B.add('shell', T(SPH_L, el.x, el.y, el.z, 0, 0, 0, 0.042), 'el' + s, d);
    B.add('shell', limbGeo(el, ha, 0.04, 0.03), 'el' + s, c);
    B.add('shell', T(SPH_L, ha.x, ha.y, ha.z, 0, 0, 0, 0.035, 0.03, 0.045), 'ha' + s, d);
    B.add('shell', T(new THREE.ConeGeometry(0.012, 0.07, 6), ha.x, ha.y - 0.03, ha.z - 0.02, 2.4, 0, 0), 'ha' + s, d);
    // the little middle pair, folded against the body
    const mi = m(J.midR), me = mi.clone().add(V(m(V(0.12, 0, 0)).x, -0.08, -0.04)), mf = me.clone().add(V(m(V(0.03, 0, 0)).x, -0.14, 0.02));
    B.add('shell', limbGeo(mi, me, 0.03, 0.022), 'mid' + s, c); B.add('shell', limbGeo(me, mf, 0.022, 0.012), 'mid' + s, d);
  }
}
function antennae(B, L, len = 0.32, elbow = true){
  for(const s of ['R', 'L']){
    const x = s === 'R' ? 0.06 : -0.06, a = V(x, 1.58, -0.14), b = V(x * 2.2, 1.58 + len * 0.55, -0.2), c = V(x * 3, 1.58 + len * (elbow ? 0.45 : 0.95), -0.36 - (elbow ? len * 0.3 : 0));
    B.add('shell', limbGeo(a, b, 0.012, 0.009), 'ant' + s, L.dark); B.add('shell', limbGeo(b, c, 0.009, 0.006), 'ant' + s, L.dark);
    B.add('shell', T(SPH_L, c.x, c.y, c.z, 0, 0, 0, 0.014), 'ant' + s, L.dark);
  }
}
function eyes(B, r, y, z, x){ for(const s of [1, -1]) B.add('eye', T(SPH, x * s, y, z, 0, 0, 0, r, r * 1.15, r * 0.9), 'head'); }

const BODY = {
  ant(B, L){
    B.add('shell', T(SPH, 0, 1.16, 0, 0, 0, 0, 0.17, 0.22, 0.17), 'thorax', L.shell);                    // thorax
    B.add('shell', T(SPH, 0, 0.93, 0.02, 0, 0, 0, 0.07, 0.07, 0.07), 'pelvis', L.dark);                     // petiole
    B.add('shell', T(SPH, 0, 0.8, 0.42, -0.5, 0, 0, 0.25, 0.32, 0.25), 'abd', L.shell);                     // gaster
    B.add('shell', T(SPH, 0, 1.47, -0.08, 0, 0, 0, 0.17, 0.15, 0.17), 'head', L.shell);
    B.add('shell', T(SPH_L, 0, 1.42, -0.21, 0.3, 0, 0, 0.08, 0.05, 0.05), 'head', L.dark);                                   // clypeus
    for(const s of [1, -1]) B.add('shell', T(new THREE.ConeGeometry(0.035, 0.16, 6), s * 0.07, 1.39, -0.24, -1.9, 0, -s * 0.5), 'head', L.dark);   // mandibles
    B.add('shell', T(SPH, 0, 1.29, 0.0, 0, 0, 0, 0.13, 0.1, 0.13), 'thorax', L.shell);                                     // pronotum
    B.add('shell', T(SPH, 0, 1.05, 0.07, 0, 0, 0, 0.1, 0.09, 0.1), 'thorax', L.shell);                                     // propodeum
    B.add('shell', T(SPH_L, 0, 0.98, 0.14, -0.4, 0, 0, 0.045, 0.085, 0.04), 'pelvis', L.shell);                             // petiole node
    for(let i = 0; i < 3; i++) B.add('shell', T(new THREE.TorusGeometry(1, 0.06, 6, 20), 0, 0.86 - i * 0.08, 0.34 + i * 0.1, -0.5 + Math.PI / 2, 0, 0, 0.24 - i * 0.03), 'abd', L.dark);   // gaster bands
    eyes(B, 0.05, 1.5, -0.17, 0.12); antennae(B, L, 0.36, true); limbs(B, L);
  },
  beetle(B, L){
    B.add('shell', T(SPH, 0, 1.15, 0, 0, 0, 0, 0.22, 0.25, 0.21), 'thorax', L.shell);
    B.add('shell', T(SPH, 0, 0.86, 0.3, -0.35, 0, 0, 0.29, 0.34, 0.3), 'abd', L.shell);
    for(const s of [1, -1]) B.add('shell', T(SPH, s * 0.12, 0.98, 0.3, -0.35, 0, s * 0.1, 0.17, 0.33, 0.3), 'abd', L.shell);          // elytra
    B.add('shell', T(new THREE.BoxGeometry(0.014, 0.62, 0.03), 0, 1.04, 0.5, -0.35, 0, 0), 'abd', L.dark);                     // the seam between them
    B.add('shell', T(SPH, 0, 1.25, -0.04, 0.25, 0, 0, 0.26, 0.15, 0.24), 'thorax', L.shell);                                // pronotum shield
    B.add('shell', T(SPH, 0, 1.43, -0.1, 0, 0, 0, 0.15, 0.13, 0.15), 'head', L.shell);
    // the rhino horn: a curved cone off the head, a short one off the thorax
    const horn = new THREE.ConeGeometry(0.06, 0.38, 8); horn.translate(0, 0.19, 0);
    B.add('shell', T(horn, 0, 1.45, -0.22, -0.5, 0, 0), 'head', L.dark);
    B.add('shell', T(new THREE.ConeGeometry(0.05, 0.2, 8).translate(0, 0.1, 0), 0, 1.36, -0.1, -0.3, 0, 0), 'thorax', L.dark);
    eyes(B, 0.035, 1.44, -0.2, 0.11); antennae(B, L, 0.16, false); limbs(B, L, { thigh:0.095, spines:true });
  },
  bee(B, L){
    B.add('shell', T(SPH, 0, 1.17, 0, 0, 0, 0, 0.2, 0.22, 0.2), 'thorax', L.dark);                          // fuzzy golden thorax
    // striped abdomen: black and gold bands, a stinger
    for(let i = 0; i < 5; i++){ const t = i / 4; B.add('shell', T(SPH, 0, 0.92 - t * 0.2, 0.22 + t * 0.32, -0.6, 0, 0, 0.22 - Math.abs(t - 0.4) * 0.12, 0.08, 0.22 - Math.abs(t - 0.4) * 0.12), 'abd', i % 2 ? L.shell : L.stripe); }
    B.add('shell', T(new THREE.ConeGeometry(0.02, 0.14, 6), 0, 0.68, 0.62, 2.2, 0, 0), 'abd', L.shell);
    B.add('shell', T(new THREE.TorusGeometry(0.15, 0.05, 8, 20), 0, 1.33, -0.02, Math.PI / 2, 0, 0), 'thorax', L.stripe);       // fuzzy collar
    for(const s of ['R', 'L']){ const x = s === 'R' ? 0.16 : -0.16; B.add('shell', T(SPH_L, x, 0.32, -0.02, 0, 0, 0, 0.05, 0.08, 0.05), 'knee' + s, '#F0C030'); }   // pollen baskets
    B.add('shell', T(SPH, 0, 1.47, -0.07, 0, 0, 0, 0.15, 0.16, 0.13), 'head', L.shell);
    eyes(B, 0.075, 1.5, -0.12, 0.11); antennae(B, L, 0.3, true); limbs(B, L, { thigh:0.07 });
    for(const s of ['R', 'L']){ const x = s === 'R' ? 1 : -1; const w = new THREE.CircleGeometry(1, 16); w.scale(0.14, 0.38, 1); w.translate(0, 0.38, 0);
      B.add('wing', T(w, x * 0.07, 1.32, 0.08, -1.2, 0, -x * 0.35), 'wing' + s, '#FFFFFF'); }
  },
  hopper(B, L){
    B.add('shell', T(SPH, 0, 1.15, 0.02, 0.15, 0, 0, 0.16, 0.24, 0.18), 'thorax', L.shell);
    B.add('shell', T(SPH, 0, 0.84, 0.36, -0.95, 0, 0, 0.15, 0.42, 0.15), 'abd', L.shell);
    B.add('shell', T(SPH, 0, 1.47, -0.08, -0.25, 0, 0, 0.13, 0.2, 0.15), 'head', L.shell);
    B.add('shell', T(SPH, 0, 1.3, 0.02, 0.1, 0, 0, 0.18, 0.11, 0.21), 'thorax', L.dark);                                    // saddle pronotum
    for(let i = 0; i < 4; i++) B.add('shell', T(new THREE.TorusGeometry(1, 0.05, 6, 18), 0, 0.92 - i * 0.1, 0.24 + i * 0.12, -0.95 + Math.PI / 2, 0, 0, 0.145), 'abd', L.dark);
    eyes(B, 0.055, 1.53, -0.12, 0.11); antennae(B, L, 0.55, false); limbs(B, L, { thigh:0.1, spines:true });
    for(const s of ['R', 'L']){ const x = s === 'R' ? 1 : -1; const w = new THREE.PlaneGeometry(0.12, 0.7); w.translate(0, -0.35, 0);
      B.add('wing', T(w, x * 0.06, 1.3, 0.06, -1.25, 0, -x * 0.12), 'wing' + s, '#B8D080'); }
  },
  shroom(B, L){
    B.add('shell', T(new THREE.CylinderGeometry(0.15, 0.2, 0.55, 14), 0, 1.12, 0), 'thorax', L.shell);    // stem body
    B.add('shell', T(SPH, 0, 0.85, 0.05, 0, 0, 0, 0.22, 0.15, 0.22), 'abd', L.shell);                       // bulb
    // the cap: a broad dome with white spots
    const cap = new THREE.SphereGeometry(1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    B.add('shell', T(cap, 0, 1.45, -0.02, 0, 0, 0, 0.36, 0.24, 0.36), 'head', L.cap);
    B.add('shell', T(new THREE.CircleGeometry(1, 20), 0, 1.45, -0.02, Math.PI / 2, 0, 0, 0.35), 'head', '#E8D8B8');
    for(let i = 0; i < 7; i++){ const a = i * 2.4, r = 0.2 + (i % 3) * 0.05; B.add('shell', T(SPH_L, Math.cos(a) * r, 1.45 + 0.2 * Math.sqrt(1 - (r / 0.36) ** 2), Math.sin(a) * r - 0.02, 0, 0, 0, 0.035, 0.015, 0.035), 'head', '#F8F0E0'); }
    B.add('shell', T(SPH, 0, 1.36, -0.05, 0, 0, 0, 0.13, 0.12, 0.13), 'head', L.shell);
    B.add('shell', T(new THREE.TorusGeometry(0.17, 0.025, 6, 20), 0, 1.24, 0, Math.PI / 2 + 0.15, 0, 0), 'thorax', '#F4EAD4');           // a skirt ring on the stem
    eyes(B, 0.03, 1.38, -0.16, 0.06); limbs(B, L, { thigh:0.085 });
  },
};

// materials per species (cloned per fighter so a hit can flash one fighter)
let DETAIL = null;
function detail(){
  if(DETAIL) return DETAIL;
  const pit = document.createElement('canvas'); pit.width = pit.height = 256; const x = pit.getContext('2d');
  x.fillStyle = '#808080'; x.fillRect(0, 0, 256, 256);
  for(let i = 0; i < 900; i++){ const r = 0.6 + Math.random() * 1.6; x.fillStyle = `rgba(30,30,30,${0.3 + Math.random() * 0.4})`; x.beginPath(); x.arc(Math.random() * 256, Math.random() * 256, r, 0, 7); x.fill(); }
  for(let i = 0; i < 60; i++){ x.strokeStyle = `rgba(${Math.random() < 0.5 ? '60,60,60' : '190,190,190'},0.35)`; x.lineWidth = 0.7; x.beginPath(); const px = Math.random() * 256, py = Math.random() * 256; x.moveTo(px, py); x.lineTo(px + (Math.random() - 0.5) * 50, py + (Math.random() - 0.5) * 50); x.stroke(); }
  const hex = document.createElement('canvas'); hex.width = hex.height = 128; const h = hex.getContext('2d');
  h.fillStyle = '#404040'; h.fillRect(0, 0, 128, 128);
  for(let j = 0; j < 12; j++) for(let i = 0; i < 12; i++){ const cx = i * 11 + (j % 2) * 5.5, cy = j * 9.5 + 5; const g = h.createRadialGradient(cx, cy, 0, cx, cy, 5.6); g.addColorStop(0, '#E0E0E0'); g.addColorStop(1, '#404040'); h.fillStyle = g; h.beginPath(); h.arc(cx, cy, 5.4, 0, 7); h.fill(); }
  DETAIL = { pits:normalFrom(pit, 2.5), hex:normalFrom(hex, 3) };
  DETAIL.pits.repeat.set(3, 3); DETAIL.hex.repeat.set(5, 5);
  return DETAIL;
}
function mats(sp){
  const L = LOOK[sp], D = detail();
  return {
    shell:new THREE.MeshPhysicalMaterial({ vertexColors:true, normalMap:D.pits, normalScale:new THREE.Vector2(0.6, 0.6), roughness:L.rough, clearcoat:L.gloss, clearcoatRoughness:0.18, iridescence:L.iri, iridescenceIOR:1.5, iridescenceThicknessRange:[250, 750], sheen:L.sheen, sheenColor:new THREE.Color('#F0C060'), sheenRoughness:0.5, emissive:'#000000' }),
    eye:new THREE.MeshPhysicalMaterial({ color:L.eye, normalMap:D.hex, normalScale:new THREE.Vector2(0.8, 0.8), roughness:0.08, clearcoat:1, clearcoatRoughness:0.02, iridescence:0.4 }),
    gun:new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.4, metalness:0.55 }),
    wing:new THREE.MeshPhysicalMaterial({ vertexColors:true, transparent:true, opacity:0.32, side:THREE.DoubleSide, roughness:0.1, iridescence:1, iridescenceIOR:1.4, depthWrite:false }),
  };
}

// the gun for third person: one merged geometry with vertex colours from its materials, both guns in the hands
function gunGeo(id){
  const g = buildGun(id, false), list = [];
  g.root.updateMatrixWorld(true);
  g.root.traverse(o => {
    if(!o.isMesh || !o.visible) return;
    const geo = (o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone()).applyMatrix4(o.matrixWorld);
    const c = o.material.color ? o.material.color.clone() : new THREE.Color('#888');
    if(o.material.map && !o.material.metalness) c.multiplyScalar(0.55);
    const n = geo.attributes.position.count, col = new Float32Array(n * 3); for(let i = 0; i < n; i++){ col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    for(const k of Object.keys(geo.attributes)) if(!['position', 'normal', 'color'].includes(k)) geo.deleteAttribute(k);
    list.push(geo);
  });
  const geo = mergeGeometries(list);
  return { geo, gripR:g.gripR.position.clone(), gripL:g.gripL.position.clone(), muzzle:g.muzzle.position.clone() };
}
const GUNS = {};
function gunCache(id){ return GUNS[id] || (GUNS[id] = gunGeo(id)); }

export function buildCreature(f, parent = scene){
  const B = new Builder(); skeleton(B);
  const L = Object.assign({}, LOOK[f.species]);
  BODY[f.species](B, L);
  // both guns ride on the gun bone; the one not in use is scaled away
  B.bone('gunP', 'gun', 0.1, 1.22, -0.22); B.bone('gunS', 'gun', 0.1, 1.22, -0.22);
  const gp = gunCache(f.primary), gs = gunCache('comb');
  B.add('gun', gp.geo.clone().translate(0.1, 1.22, -0.22), 'gunP');
  B.add('gun', gs.geo.clone().translate(0.1, 1.22, -0.22), 'gunS');
  const root = B.byName.root, M = mats(f.species), meshes = [];
  root.updateMatrixWorld(true);
  const skel = new THREE.Skeleton(B.bones);
  const group = new THREE.Group(); group.add(root);
  for(const k of ['shell', 'eye', 'gun', 'wing']){
    if(!B.parts[k].length) continue;
    const geo = mergeGeometries(B.parts[k]);
    geo.computeBoundingSphere();
    const m = new THREE.SkinnedMesh(geo, M[k]);
    m.bind(skel, new THREE.Matrix4());
    m.castShadow = k !== 'wing'; m.receiveShadow = true; m.frustumCulled = false;
    group.add(m); meshes.push(m);
  }
  parent.add(group);
  const C = { f, group, root, bones:B.byName, mats:M, meshes, gp, gs,
    rest:{}, bodyYaw:f.yaw, phase:0, abd:{ x:sp(), y:sp() }, ant:sp(), flash:0, kick:0, flinch:sp(), deadK:0, wingT:0 };
  for(const n in B.byName) C.rest[n] = B.byName[n].position.clone();
  return C;
}
export function disposeCreature(C){ if(C.group.parent) C.group.parent.remove(C.group); for(const m of C.meshes){ m.geometry.dispose(); } for(const k in C.mats) C.mats[k].dispose(); }

// ---- two-bone IK in a parent bone's space ----
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3(), _v3 = new THREE.Vector3(), _q1 = new THREE.Quaternion(), _m1 = new THREE.Matrix4();
function ik(C, a, b, c, target, pole){
  // a: upper bone, b: lower bone (child of a), c: end bone (child of b); target in world space
  const A = C.bones[a], Bn = C.bones[b], Cn = C.bones[c];
  const P = A.parent; P.updateMatrixWorld(true);
  const inv = _m1.copy(P.matrixWorld).invert();
  const t = _v1.copy(target).applyMatrix4(inv);
  const origin = C.rest[a];
  const L1 = C.rest[b].length(), L2 = C.rest[c].length();
  const d = _v2.subVectors(t, origin); let len = d.length(); if(!(len > 1e-5) || !isFinite(len)){ d.set(0, -1, 0); len = L1 + L2 - 1e-3; } len = clamp(len, Math.abs(L1 - L2) + 1e-3, L1 + L2 - 1e-3); d.normalize();
  const pl = _v3.copy(pole).normalize();
  const side = new THREE.Vector3().crossVectors(d, pl);
  if(side.lengthSq() < 1e-8) side.set(1, 0, 0).cross(d);
  if(side.lengthSq() < 1e-8) side.set(0, 0, 1);
  side.normalize();
  const bend = new THREE.Vector3().crossVectors(side, d).normalize();
  const ca = clamp((L1 * L1 + len * len - L2 * L2) / (2 * L1 * len), -1, 1), ang = Math.acos(ca);
  const kneeDir = d.clone().multiplyScalar(Math.cos(ang)).addScaledVector(bend, Math.sin(ang));
  A.quaternion.setFromUnitVectors(C.rest[b].clone().normalize(), kneeDir);
  if(!isFinite(A.quaternion.x + A.quaternion.w)) A.quaternion.identity();
  // the lower bone points from the knee to the target, in A's rotated space
  const knee = origin.clone().addScaledVector(kneeDir, L1), toT = t.clone().sub(knee).normalize();
  toT.applyQuaternion(_q1.copy(A.quaternion).invert());
  Bn.quaternion.setFromUnitVectors(C.rest[c].clone().normalize(), toT);
  if(!isFinite(Bn.quaternion.x + Bn.quaternion.w)) Bn.quaternion.identity();
}

const _t = new THREE.Vector3(), _w = new THREE.Vector3(), _e = new THREE.Euler();
export function animCreature(C, dt){
  const f = C.f, B = C.bones;
  const vis = f.alive || f.deadT < 3.2;
  C.group.visible = vis && !(f === G.me && f.alive);
  if(!C.group.visible) return;
  // ---- body yaw: follows the aim; the hips turn toward where it walks ----
  const hs = Math.hypot(f.vx, f.vz);
  C.bodyYaw += angDiff(C.bodyYaw, f.yaw) * Math.min(1, dt * (hs > 0.5 ? 10 : 4));
  const root = B.root;
  root.position.set(f.x, f.y, f.z);
  // ---- death: tip over backward and curl up, then sink ----
  C.deadK = f.alive ? 0 : Math.min(1, C.deadK + dt * 1.8);
  const dk = C.deadK * C.deadK * (3 - 2 * C.deadK);
  root.rotation.set(-1.45 * dk, C.bodyYaw, 0.3 * dk * Math.sin(f.id), 'YXZ');
  if(!f.alive){ root.position.y += 0.25 * dk - Math.max(0, f.deadT - 2.2) * 0.4; }
  // ---- gait ----
  const ground = f.ground || !f.alive;
  const stride = 1.5 + Math.min(1, hs / 7) * 0.9;
  if(ground) C.phase += hs * dt / stride * Math.PI;
  const crouch = f.crouchK;
  const pel = B.pelvis;
  pel.position.copy(C.rest.pelvis);
  pel.position.y += -0.06 - crouch * 0.42 + (ground && hs > 0.5 ? Math.abs(Math.sin(C.phase)) * 0.04 : 0) - (f.alive ? 0 : 0.2 * dk);
  // lean into the run
  const fwdV = (-f.vx * Math.sin(C.bodyYaw) - f.vz * Math.cos(C.bodyYaw));
  pel.rotation.set(-clamp(fwdV * 0.03, -0.15, 0.25) + crouch * 0.25, 0, 0);
  // thorax and head follow the aim pitch; recoil kicks the shoulders back
  C.kick = Math.max(0, C.kick - dt * 8);
  spring(C.flinch, 0, 120, 12, dt);
  const pitch = f.alive ? f.pitch : 0;
  B.thorax.rotation.set(pitch * 0.45 - C.kick * 0.15 + C.flinch.x - crouch * 0.2, angDiff(C.bodyYaw, f.yaw) * 0.6, 0);
  B.head.rotation.set(pitch * 0.4, 0, 0);
  B.gun.rotation.set(pitch * 0.55 + C.kick * 0.25, 0, 0);
  // which gun is in hand
  const prim = f.cur === 0;
  B.gunP.scale.setScalar(prim ? 1 : 1e-4); B.gunS.scale.setScalar(prim ? 1e-4 : 1);
  // abdomen swings on a spring (lags behind accelerations), breathes
  spring(C.abd.x, clamp(-fwdV * 0.05, -0.3, 0.3) + (f.alive ? 0 : 0.5 * dk), 40, 6, dt);
  B.abd.rotation.set(C.abd.x.x + Math.sin(G.time * 2 + f.id) * 0.03, 0, Math.sin(C.phase) * 0.06);
  // antennae flick
  spring(C.ant, clamp(fwdV * 0.06, -0.3, 0.4) + (f.alive ? 0 : 0.6), 60, 5, dt);
  B.antL.rotation.set(C.ant.x + Math.sin(G.time * 3.1 + f.id) * 0.08, 0, 0); B.antR.rotation.set(C.ant.x + Math.sin(G.time * 2.7 + f.id * 2) * 0.08, 0, 0);
  // wings: folded, buzzing in the air (bee), fluttering open when falling dead
  C.wingT += dt;
  const flap = !ground && f.alive ? Math.sin(C.wingT * 90) * 0.6 + 0.8 : 0;
  B.wingR.rotation.set(0, flap * 0.6, -flap * 0.4); B.wingL.rotation.set(0, -flap * 0.6, flap * 0.4);
  // middle legs twitch
  B.midR.rotation.set(Math.sin(G.time * 1.3 + f.id) * 0.1 + (f.alive ? 0 : 1.2 * dk), 0, 0); B.midL.rotation.set(Math.sin(G.time * 1.1 + f.id) * 0.1 + (f.alive ? 0 : 1.2 * dk), 0, 0);
  root.updateMatrixWorld(true);
  // ---- legs: feet step along the ground (world-space targets), knees bend forward, ankles back (digitigrade) ----
  const cy = Math.cos(C.bodyYaw), sy = Math.sin(C.bodyYaw);
  for(const s of ['R', 'L']){
    const sign = s === 'R' ? 1 : -1, ph = C.phase + (s === 'R' ? 0 : Math.PI);
    let fwd = 0, lift = 0;
    if(ground && hs > 0.4){ fwd = Math.cos(ph) * stride * 0.32; lift = Math.max(0, Math.sin(ph)) * 0.22 * Math.min(1, hs / 3); }
    if(!f.alive){ fwd = 0.2; lift = 0.5 * dk; }
    else if(!ground){ fwd = 0.15 * sign; lift = 0.25; }
    // foot target in the body frame: under the hip, moved along the walking direction
    const mvx = hs > 0.4 ? f.vx / hs : -sy, mvz = hs > 0.4 ? f.vz / hs : -cy;
    const ox = cy * 0.14 * sign, oz = -sy * 0.14 * sign;
    _t.set(f.x + ox + mvx * fwd, f.y + 0.12 + lift + (f.alive ? 0 : 0.4 * dk), f.z + oz + mvz * fwd);
    if(crouch > 0.01) _t.addScaledVector(_w.set(-sy, 0, -cy), -crouch * 0.12);
    // pole: knees point forward
    _w.set(0, 0, -1);
    ik(C, 'hip' + s, 'knee' + s, 'ankle' + s, _t, _w);
    B['ankle' + s].rotation.set(-0.2 + lift * 1.5, 0, 0);
  }
  // ---- arms reach the gun's grips ----
  root.updateMatrixWorld(true);
  const gb = prim ? B.gunP : B.gunS, gd = prim ? C.gp : C.gs;
  for(const s of ['R', 'L']){
    const grip = s === 'R' ? gd.gripR : gd.gripL;
    // grips are in the gun's own space, which is the gun bone's space
    _t.copy(grip).applyMatrix4(gb.matrixWorld);
    ik(C, 'sh' + s, 'el' + s, 'ha' + s, _t, _w.set(s === 'R' ? 1 : -1, -1.2, 0.4));
  }
  // hit flash
  C.flash = Math.max(0, C.flash - dt * 6);
  C.mats.shell.emissive.setRGB(C.flash * 0.5, C.flash * 0.15, C.flash * 0.1);
}

on('fire', f => { if(f.model) f.model.kick = 1; });
on('damage', (t, amt) => { if(t.model){ t.model.flash = 1; t.model.flinch.v -= 2 + amt * 0.04; } });
