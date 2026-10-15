// The four guns, modelled in code: bevelled profiles of brass, varnished walnut, dark steel, beetle-shell chitin,
// a honeycomb cylinder and a dew-drop scope lens. Gun space: +x right, +y up, muzzle toward -z, origin at the grip.
// buildGun(id) → { root, parts:{...movable parts}, muzzle, eject, sight (ADS eye line), gripL, gripR, len }
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { canvasTex, vmMaterial, VM_LAYER } from './engine.js';
import { photoSet } from './nature/textures.js';
import { mulberry } from './util.js';

// ---- materials (shared) ----
function woodTex(base, dark, seed){
  const r = mulberry(seed), W = 512, H = 128;
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, W, H);
  for(let i = 0; i < 90; i++){
    const y0 = r() * H, a = 0.4 + r() * 0.5, w = 0.6 + r() * 2.2;
    x.strokeStyle = r() < 0.6 ? dark : 'rgba(255,220,170,0.25)'; x.globalAlpha = a * 0.35; x.lineWidth = w;
    x.beginPath(); for(let px = 0; px <= W; px += 16){ const y = y0 + Math.sin(px * 0.01 + i) * 3 + Math.sin(px * 0.043 + i * 2) * 1.5; px ? x.lineTo(px, y) : x.moveTo(px, y); } x.stroke();
  }
  // a few knots / rays
  x.globalAlpha = 0.25; for(let i = 0; i < 6; i++){ x.fillStyle = dark; x.beginPath(); x.ellipse(r() * W, r() * H, 10 + r() * 20, 2 + r() * 3, 0, 0, 7); x.fill(); }
  x.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  return t;
}
function scratchTex(seed){
  // roughness variation: worn edges and fine scratches (linear data)
  return canvasTex(256, 256, (x, W, H) => {
    const r = mulberry(seed); x.fillStyle = '#808080'; x.fillRect(0, 0, W, H);
    for(let i = 0; i < 300; i++){ x.strokeStyle = `rgba(${r() < 0.5 ? '40,40,40' : '200,200,200'},${0.15 + r() * 0.3})`; x.lineWidth = 0.6 + r(); x.beginPath(); const px = r() * W, py = r() * H, a = r() * 6.3, l = 4 + r() * 30; x.moveTo(px, py); x.lineTo(px + Math.cos(a) * l, py + Math.sin(a) * l); x.stroke(); }
    for(let i = 0; i < 40; i++){ x.fillStyle = `rgba(${r() < 0.5 ? '60,60,60' : '170,170,170'},0.2)`; x.beginPath(); x.arc(r() * W, r() * H, 3 + r() * 14, 0, 7); x.fill(); }
  }, { linear:true, repeat:true });
}
let M = null, MV = null, VMODE = false;
// world materials, or (vm) the same ones drawn in the first-person pass
export function gunMats(vm = VMODE){
  if(!M){ M = makeMats(); loadPhotos(); }
  if(!vm) return M;
  if(!MV){ MV = {}; for(const k in M) MV[k] = vmMaterial(M[k].clone()); }
  return MV;
}
// photo textures (CC0) for walnut, brass and steel, when the asset pack has them
async function loadPhotos(){
  const [w, b, st] = await Promise.all([photoSet('walnut'), photoSet('brass'), photoSet('steel')]);
  const apply = (keys, P, o = {}) => { if(!P) return; for(const set of [M, MV]) if(set) for(const k of keys){ const m = set[k]; m.map = P.map; m.normalMap = P.normal; if(P.rough) m.roughnessMap = P.rough; if(o.color) m.color.set(o.color); m.needsUpdate = true; } };
  for(const P of [w, b, st]) if(P) for(const t of [P.map, P.normal, P.rough]) if(t) t.repeat.set(2, 2);
  apply(['walnut'], w, { color:'#FFFFFF' }); apply(['oak'], w, { color:'#D8B080' });
  apply(['brass'], b, { color:'#FFFFFF' }); apply(['bronze'], b, { color:'#E0B890' }); apply(['steel'], st, { color:'#FFFFFF' }); apply(['blued'], st, { color:'#9AA8B8' });
}
function makeMats(){
  const scr = scratchTex(7);
  return {
    walnut:new THREE.MeshPhysicalMaterial({ map:woodTex('#6A3E22', '#2A140A', 3), roughness:0.42, clearcoat:0.7, clearcoatRoughness:0.25, metalness:0 }),
    oak:new THREE.MeshPhysicalMaterial({ map:woodTex('#8A6236', '#3E2812', 5), roughness:0.5, clearcoat:0.5, clearcoatRoughness:0.3 }),
    brass:new THREE.MeshStandardMaterial({ color:'#C9A05A', metalness:1, roughness:0.3, roughnessMap:scr }),
    bronze:new THREE.MeshStandardMaterial({ color:'#A8743E', metalness:1, roughness:0.36, roughnessMap:scr }),
    steel:new THREE.MeshStandardMaterial({ color:'#3C4044', metalness:0.92, roughness:0.38, roughnessMap:scr }),
    blued:new THREE.MeshStandardMaterial({ color:'#22282E', metalness:0.85, roughness:0.32, roughnessMap:scr }),
    chitin:new THREE.MeshPhysicalMaterial({ color:'#4A2410', roughness:0.22, metalness:0.1, clearcoat:1, clearcoatRoughness:0.08, iridescence:0.55, iridescenceIOR:1.45, iridescenceThicknessRange:[200, 650] }),
    acornCup:new THREE.MeshStandardMaterial({ color:'#8C7248', roughness:0.9, metalness:0 }),
    amber:new THREE.MeshPhysicalMaterial({ color:'#FFB02A', emissive:'#FF9A10', emissiveIntensity:1.6, roughness:0.15, clearcoat:1 }),
    honey:new THREE.MeshPhysicalMaterial({ color:'#E8A020', roughness:0.25, metalness:0.2, clearcoat:1, clearcoatRoughness:0.1, emissive:'#7A4206', emissiveIntensity:0.35 }),
    wax:new THREE.MeshStandardMaterial({ color:'#3A2A12', roughness:0.6 }),
    leather:new THREE.MeshStandardMaterial({ color:'#5A3A20', roughness:0.85 }),
    black:new THREE.MeshStandardMaterial({ color:'#121212', roughness:0.6, metalness:0.3 }),
    yellow:new THREE.MeshStandardMaterial({ color:'#E8B818', roughness:0.45 }),
    lens:new THREE.MeshPhysicalMaterial({ color:'#CFEFFF', roughness:0.02, metalness:0, transmission:0, transparent:true, opacity:0.55, clearcoat:1, clearcoatRoughness:0, envMapIntensity:2.5, ior:1.33 }),
    shellRed:new THREE.MeshStandardMaterial({ color:'#A8261C', roughness:0.5 }),
  };
}

// ---- shape helpers ----
const V2 = (x, y) => new THREE.Vector2(x, y);
// a side profile (points [forward, up]) extruded across the gun (width w), bevelled, centred on x
function prof(pts, w, bevel = 0.004, curve = 0){
  const s = new THREE.Shape(pts.map(p => V2(p[0], p[1])));
  const g = new THREE.ExtrudeGeometry(s, { depth:Math.max(0.001, w - bevel * 2), bevelEnabled:bevel > 0, bevelThickness:bevel, bevelSize:bevel, bevelSegments:2, curveSegments:curve || 6 });
  g.rotateY(Math.PI / 2);        // shape x → -z (forward), extrusion → +x
  g.translate(-(w - bevel * 2) / 2, 0, 0);
  // wood grain / texture runs along the gun
  const uv = g.attributes.uv, p = g.attributes.position;
  for(let i = 0; i < uv.count; i++) uv.setXY(i, -p.getZ(i) * 4, (p.getY(i) + p.getX(i) * 0.5) * 4);
  return g;
}
// cylinder along -z from z0 to z1 (z1 more negative = forward), at (x, y)
function barrel(r0, r1, z0, z1, x = 0, y = 0, seg = 20, open = false){
  const g = new THREE.CylinderGeometry(r1, r0, Math.abs(z1 - z0), seg, 1, open);
  g.rotateX(-Math.PI / 2); g.translate(x, y, (z0 + z1) / 2);
  return g;
}
function box(w, h, d, x, y, z){ const g = new THREE.BoxGeometry(w, h, d); g.translate(x, y, z); return g; }
function ring(r, tube, z, x = 0, y = 0){ const g = new THREE.TorusGeometry(r, tube, 8, 24); g.translate(x, y, z); return g; }
function hexPrism(r, len, z, x = 0, y = 0){ const g = new THREE.CylinderGeometry(r, r, len, 6); g.rotateX(-Math.PI / 2); g.rotateZ(Math.PI / 6); g.translate(x, y, z); return g; }
function mesh(geos, mat){ const g = Array.isArray(geos) ? mergeGeometries(geos.map(x => x.index ? x.toNonIndexed() : x)) : geos; const m = new THREE.Mesh(g, mat); m.castShadow = true; return m; }
function grp(...ch){ const g = new THREE.Group(); for(const c of ch) if(c) g.add(c); return g; }
const anchor = (x, y, z) => { const o = new THREE.Object3D(); o.position.set(x, y, z); return o; };

// ---- «Шершень»: assault rifle — brass receiver, walnut furniture, curved chitin magazine, hornet-striped handguard ----
function hornet(){
  const m = gunMats(), root = new THREE.Group(), parts = {};
  // receiver (brass), with the dust cover line and ejection port
  root.add(mesh([prof([[-0.06, 0.0], [0.26, 0.0], [0.27, 0.02], [0.27, 0.085], [0.2, 0.095], [-0.02, 0.095], [-0.06, 0.07]], 0.062, 0.005)], m.brass));
  root.add(mesh([box(0.004, 0.026, 0.07, 0.033, 0.06, -0.12), box(0.064, 0.006, 0.24, 0, 0.098, -0.09)], m.blued));
  // pistol grip (walnut), angled back
  root.add(mesh(prof([[0.0, 0.0], [0.05, 0.0], [0.02, -0.12], [-0.035, -0.13], [-0.045, -0.115], [-0.02, -0.005]], 0.046, 0.007), m.walnut));
  // trigger guard + trigger
  root.add(mesh([prof([[0.05, -0.002], [0.14, -0.002], [0.14, -0.012], [0.06, -0.06], [0.05, -0.055]], 0.008, 0.002)], m.blued));
  parts.trigger = mesh(prof([[0.085, -0.005], [0.095, -0.005], [0.09, -0.04], [0.083, -0.04]], 0.006, 0.0015), m.brass); root.add(parts.trigger);
  // stock (walnut) with a chitin butt plate
  root.add(mesh(prof([[-0.06, 0.088], [-0.06, 0.005], [-0.12, -0.03], [-0.32, -0.06], [-0.33, -0.058], [-0.33, 0.07], [-0.3, 0.085], [-0.14, 0.085]], 0.05, 0.008), m.walnut));
  root.add(mesh(prof([[-0.33, -0.058], [-0.345, -0.058], [-0.345, 0.07], [-0.33, 0.07]], 0.052, 0.004), m.chitin));
  // barrel, gas tube, handguard (walnut with wasp stripes), muzzle «sting»
  root.add(mesh([barrel(0.013, 0.012, -0.26, -0.68, 0, 0.06, 20), barrel(0.008, 0.008, -0.27, -0.5, 0, 0.092, 12)], m.steel));
  root.add(mesh(prof([[0.27, 0.012], [0.53, 0.016], [0.54, 0.03], [0.54, 0.085], [0.53, 0.098], [0.27, 0.1]], 0.058, 0.01), m.walnut));
  for(const z of [-0.33, -0.39, -0.45]) root.add(mesh(ring(0.034, 0.006, z, 0, 0.057), m.black));
  root.add(mesh([ring(0.034, 0.0045, -0.36, 0, 0.057), ring(0.034, 0.0045, -0.42, 0, 0.057)], m.yellow));
  root.add(mesh([barrel(0.02, 0.016, -0.66, -0.74, 0, 0.06, 6), barrel(0.016, 0.004, -0.74, -0.79, 0, 0.06, 6)], m.bronze));
  // sights: a peep ring on a mount at the back, a hooded front post with an amber bead (you look through the ring)
  const peep = new THREE.TorusGeometry(0.011, 0.0035, 8, 20); peep.translate(0, 0.142, -0.04);
  root.add(mesh([box(0.012, 0.026, 0.03, 0, 0.114, -0.04), box(0.0035, 0.022, 0.014, 0.0155, 0.142, -0.04), box(0.0035, 0.022, 0.014, -0.0155, 0.142, -0.04), peep,
    box(0.022, 0.028, 0.022, 0, 0.11, -0.58), box(0.0035, 0.024, 0.0035, 0, 0.134, -0.58), new THREE.TorusGeometry(0.016, 0.003, 6, 16, Math.PI).translate(0, 0.13, -0.58)], m.blued));
  root.add(mesh(new THREE.SphereGeometry(0.0028, 10, 8).translate(0, 0.1465, -0.58), m.amber));
  // charging handle (moves on reload), rivets
  parts.bolt = mesh([box(0.03, 0.012, 0.012, 0.045, 0.075, -0.17)], m.blued); root.add(parts.bolt);
  for(let i = 0; i < 4; i++) root.add(mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.066, 8).rotateZ(Math.PI / 2).translate(0, 0.02 + (i % 2) * 0.05, 0.02 - Math.floor(i / 2) * 0.18), m.bronze));
  // the curved chitin magazine (a separate part: drops out on reload)
  const magG = []; for(let i = 0; i < 8; i++){ const t = i / 7; const g = box(0.038, 0.032, 0.066, 0, 0, 0); g.rotateX(-t * 0.45); g.translate(0, -0.01 - t * 0.175, -0.15 - t * t * 0.07); magG.push(g); }
  parts.mag = new THREE.Group(); parts.mag.add(mesh(magG, m.chitin)); parts.mag.add(mesh(box(0.04, 0.012, 0.07, 0, -0.192, -0.226).rotateX(-0.45), m.brass));
  parts.mag.userData.home = new THREE.Vector3(); root.add(parts.mag);
  return { root, parts, muzzle:anchor(0, 0.06, -0.8), eject:anchor(0.04, 0.065, -0.13), sight:anchor(0, 0.1445, 0), gripR:anchor(0, -0.04, 0.0), gripL:anchor(0, 0.03, -0.42), len:0.8, mag:true };
}

// ---- «Жёлудь»: pump shotgun — oak and brass, a fore-end of acorn cup, steel tube ----
function acorn(){
  const m = gunMats(), root = new THREE.Group(), parts = {};
  root.add(mesh(prof([[-0.05, 0.0], [0.2, 0.0], [0.21, 0.02], [0.21, 0.09], [0.15, 0.1], [-0.02, 0.1], [-0.05, 0.08]], 0.07, 0.006), m.blued));
  root.add(mesh([box(0.072, 0.03, 0.12, 0, 0.05, -0.08)], m.brass));
  root.add(mesh(prof([[0.0, 0.0], [0.05, 0.0], [0.025, -0.12], [-0.03, -0.13], [-0.04, -0.115], [-0.015, -0.005]], 0.05, 0.008), m.oak));
  root.add(mesh(prof([[0.05, -0.002], [0.14, -0.002], [0.14, -0.012], [0.06, -0.06], [0.05, -0.055]], 0.009, 0.002), m.brass));
  root.add(mesh(prof([[-0.05, 0.09], [-0.05, 0.005], [-0.12, -0.035], [-0.34, -0.07], [-0.35, -0.066], [-0.35, 0.075], [-0.31, 0.09]], 0.055, 0.009), m.oak));
  root.add(mesh(prof([[-0.35, -0.066], [-0.365, -0.066], [-0.365, 0.075], [-0.35, 0.075]], 0.058, 0.004), m.black));
  // barrel above the magazine tube
  root.add(mesh([barrel(0.022, 0.021, -0.2, -0.72, 0, 0.068, 24), barrel(0.016, 0.016, -0.2, -0.62, 0, 0.02, 16)], m.steel));
  root.add(mesh([ring(0.022, 0.004, -0.72, 0, 0.068), barrel(0.012, 0.012, -0.61, -0.635, 0, 0.044, 10)], m.blued));
  const rib = [box(0.012, 0.004, 0.56, 0, 0.114, -0.43)]; for(let i = 0; i < 9; i++) rib.push(box(0.007, 0.024, 0.012, 0, 0.1, -0.19 - i * 0.065));
  root.add(mesh(rib, m.blued));
  root.add(mesh([new THREE.SphereGeometry(0.0045, 10, 8).translate(0, 0.12, -0.7), new THREE.SphereGeometry(0.003, 8, 6).translate(0, 0.118, -0.42)], m.brass));
  // the pump: an acorn cup — scaly, moves back and forth
  const pump = new THREE.Group();
  const cup = new THREE.LatheGeometry([V2(0.03, 0), V2(0.036, 0.02), V2(0.038, 0.1), V2(0.034, 0.17), V2(0.028, 0.18)].map(p => p), 20); cup.rotateX(-Math.PI / 2); cup.translate(0, 0.022, -0.3);
  pump.add(mesh(cup, m.acornCup));
  for(let i = 0; i < 5; i++) pump.add(mesh(ring(0.037, 0.004, -0.31 - i * 0.034, 0, 0.022), m.oak));
  parts.pump = pump; root.add(pump);
  parts.trigger = mesh(prof([[0.085, -0.005], [0.095, -0.005], [0.09, -0.04], [0.083, -0.04]], 0.006, 0.0015), m.brass); root.add(parts.trigger);
  return { root, parts, muzzle:anchor(0, 0.068, -0.74), eject:anchor(0.04, 0.07, -0.08), sight:anchor(0, 0.121, 0), gripR:anchor(0, -0.04, 0), gripL:anchor(0, 0.01, -0.38), len:0.74, shell:true };
}

// ---- «Игла»: bolt-action sniper — long fluted barrel, walnut stock with cheek rest, brass scope with a dew-drop lens ----
function needle(){
  const m = gunMats(), root = new THREE.Group(), parts = {};
  root.add(mesh(prof([[-0.04, 0.02], [0.24, 0.02], [0.25, 0.04], [0.25, 0.085], [-0.04, 0.085]], 0.05, 0.005), m.blued));
  root.add(mesh(prof([[0.32, 0.03], [0.28, 0.0], [0.0, -0.005], [-0.02, -0.12], [-0.07, -0.13], [-0.08, -0.11], [-0.06, -0.02], [-0.12, -0.045], [-0.4, -0.07], [-0.41, -0.066], [-0.41, 0.09], [-0.36, 0.095], [-0.2, 0.11], [-0.1, 0.11], [-0.06, 0.075], [0.32, 0.075]], 0.056, 0.009), m.walnut));
  root.add(mesh(prof([[-0.41, -0.066], [-0.425, -0.066], [-0.425, 0.09], [-0.41, 0.09]], 0.058, 0.004), m.chitin));
  root.add(mesh(prof([[0.05, -0.002], [0.14, -0.002], [0.14, -0.012], [0.06, -0.06], [0.05, -0.055]], 0.008, 0.002), m.blued));
  // the needle barrel: thin, long, fluted, with a slim brass tip
  root.add(mesh([barrel(0.016, 0.011, -0.25, -0.95, 0, 0.055, 18)], m.steel));
  for(let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2; root.add(mesh(box(0.003, 0.003, 0.36, Math.cos(a) * 0.0135, 0.055 + Math.sin(a) * 0.0135, -0.6), m.blued)); }
  root.add(mesh([barrel(0.012, 0.006, -0.95, -1.02, 0, 0.055, 12)], m.brass));
  // scope: brass tube, rings, turrets, the dew-drop objective
  const sc = [barrel(0.02, 0.02, 0.06, -0.26, 0, 0.14, 24), barrel(0.028, 0.02, -0.26, -0.32, 0, 0.14, 24), barrel(0.031, 0.031, -0.32, -0.36, 0, 0.14, 24), barrel(0.022, 0.02, 0.1, 0.06, 0, 0.14, 24)];
  root.add(mesh(sc, m.brass));
  root.add(mesh([ring(0.024, 0.006, -0.05, 0, 0.14), ring(0.024, 0.006, -0.2, 0, 0.14), box(0.012, 0.05, 0.02, 0, 0.11, -0.05), box(0.012, 0.05, 0.02, 0, 0.11, -0.2),
    barrel(0.008, 0.008, 0, 0.02, 0, 0.17, 10).rotateX(Math.PI / 2).translate(0, 0.12, -0.1), new THREE.CylinderGeometry(0.009, 0.009, 0.02, 10).rotateZ(Math.PI / 2).translate(0.03, 0.14, -0.12)], m.blued));
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.03, 24, 16).scale(1, 1, 0.45).translate(0, 0.14, -0.36), m.lens); root.add(lens);
  parts.lens = lens;
  // bolt with a round knob (cycles after each shot)
  const bolt = new THREE.Group();
  bolt.add(mesh([barrel(0.012, 0.012, 0.05, -0.07, 0.012, 0.075, 12)], m.steel));
  bolt.add(mesh([new THREE.CylinderGeometry(0.005, 0.005, 0.06, 8).rotateZ(Math.PI / 2 - 0.3).translate(0.04, 0.07, 0.03)], m.steel));
  bolt.add(mesh(new THREE.SphereGeometry(0.012, 12, 10).translate(0.07, 0.06, 0.03), m.walnut));
  bolt.userData.pivot = new THREE.Vector3(0.012, 0.075, 0.03);
  parts.bolt = bolt; root.add(bolt);
  parts.trigger = mesh(prof([[0.085, -0.005], [0.095, -0.005], [0.09, -0.04], [0.083, -0.04]], 0.006, 0.0015), m.brass); root.add(parts.trigger);
  parts.mag = new THREE.Group(); parts.mag.add(mesh(box(0.034, 0.04, 0.08, 0, -0.01, -0.14), m.blued)); root.add(parts.mag);
  return { root, parts, muzzle:anchor(0, 0.055, -1.03), eject:anchor(0.035, 0.08, -0.03), sight:anchor(0, 0.14, 0.05), gripR:anchor(0, -0.045, 0), gripL:anchor(0, 0.0, -0.36), len:1.03, scope:true, mag:true };
}

// ---- «Соты»: revolver — brass frame, hexagonal steel barrel, a honeycomb cylinder, ebony grip with a bee medallion ----
function comb(){
  const m = gunMats(), root = new THREE.Group(), parts = {};
  root.add(mesh(prof([[-0.03, 0.035], [0.075, 0.035], [0.085, 0.05], [0.085, 0.1], [0.06, 0.11], [-0.03, 0.105], [-0.045, 0.08]], 0.034, 0.004), m.brass));
  root.add(mesh(prof([[0.0, 0.04], [0.04, 0.03], [0.03, -0.08], [-0.02, -0.1], [-0.04, -0.085], [-0.03, 0.02]], 0.04, 0.008), m.wax));
  root.add(mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.042, 16).rotateZ(Math.PI / 2).translate(0, -0.03, 0.0), m.brass));
  root.add(mesh(prof([[0.035, 0.035], [0.1, 0.035], [0.1, 0.028], [0.045, -0.01], [0.035, -0.006]], 0.008, 0.002), m.brass));
  parts.trigger = mesh(prof([[0.06, 0.03], [0.068, 0.03], [0.065, 0.0], [0.058, 0.0]], 0.006, 0.0015), m.steel); root.add(parts.trigger);
  // hammer
  parts.hammer = mesh(prof([[-0.035, 0.095], [-0.01, 0.1], [-0.008, 0.112], [-0.02, 0.115], [-0.045, 0.105]], 0.01, 0.002), m.steel); root.add(parts.hammer);
  // hex barrel with an ejector rod under it
  root.add(mesh([hexPrism(0.016, 0.22, -0.2, 0, 0.088), barrel(0.005, 0.005, -0.15, -0.26, 0, 0.062, 8)], m.steel));
  root.add(mesh([box(0.006, 0.014, 0.01, 0, 0.108, -0.3), box(0.018, 0.008, 0.012, 0, 0.11, -0.01)], m.blued));
  root.add(mesh(new THREE.SphereGeometry(0.003, 8, 6).translate(0, 0.117, -0.3), m.amber));
  // the honeycomb cylinder: a hex prism with six hex chambers glowing honey-gold
  const cyl = new THREE.Group();
  const body = hexPrism(0.034, 0.07, 0, 0, 0); cyl.add(mesh(body, m.honey));
  for(let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2; cyl.add(mesh(hexPrism(0.0085, 0.072, 0, Math.cos(a) * 0.021, Math.sin(a) * 0.021), m.wax)); }
  cyl.add(mesh(barrel(0.006, 0.006, 0.04, -0.04, 0, 0, 10), m.steel));
  cyl.position.set(0, 0.072, -0.05);
  parts.cyl = cyl; root.add(cyl);
  return { root, parts, muzzle:anchor(0, 0.088, -0.32), eject:anchor(0.02, 0.07, -0.05), sight:anchor(0, 0.118, 0.03), gripR:anchor(0, -0.03, 0.0), gripL:anchor(-0.02, -0.045, 0.005), len:0.32, revolver:true };
}

const BUILD = { hornet, acorn, needle, comb };
// vm: build with first-person materials on the arms-and-gun layer
export function buildGun(id, vm = false){
  VMODE = vm;
  const G = BUILD[id]();
  VMODE = false;
  if(vm) G.root.traverse(o => { o.layers.set(VM_LAYER); if(o.isMesh){ o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; } });
  for(const k of ['muzzle', 'eject', 'sight', 'gripL', 'gripR']) G.root.add(G[k]);
  for(const k in G.parts){ const p = G.parts[k]; p.userData.home = p.position.clone(); p.userData.homeR = p.rotation.clone(); }
  G.id = id;
  return G;
}

// shells and casings that fly out (world space), per gun
export function casingGeo(id){
  if(id === 'acorn'){ const g = new THREE.CylinderGeometry(0.012, 0.012, 0.05, 10); return g; }
  if(id === 'needle') return new THREE.CylinderGeometry(0.006, 0.008, 0.06, 8);
  return new THREE.CylinderGeometry(0.0055, 0.006, 0.032, 8);
}
