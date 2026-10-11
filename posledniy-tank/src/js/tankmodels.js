// Loads the CC0 tank models (OpenGameArt, see CREDITS.md) and turns each into the three parts the game animates:
// hull (with tracks and wheels), turret and barrel, in metres facing +z (see tanks.js). The models are flat-coloured
// (sharp at any distance) with a textured tread belt. Each part is a list of pieces, one per material: { geo, map, color, scroll } — scroll is set on
// track belts and says how far their texture slides per metre driven, so the treads roll. Sizes are fitted to the game.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { setTankModels } from './tanks.js';

// which model plays which role, its size (hull length, m) and tweaks; paint: colours for untextured materials, by name
const SPEC = {
  rookie:{ file:'starter',   len:1.4 },
  shroom:{ file:'heavy',     len:1.5 },
  beetle:{ file:'artillery', len:1.35, restElev:0.3 },
  wasp:  { file:'sniper',    len:1.45 },
  roly:  { file:'light',     len:1.35 },
  hopper:{ file:'rapid',     len:1.35, restElev:-0.28 }   // its twin guns point skyward (an anti-aircraft mount): level them
};

// one model → hull / turret / barrel pieces
function convert(scene, S){
  scene.updateMatrixWorld(true);
  const find = rx => { let r = null; scene.traverse(o => { if(!r && rx.test(o.name || '')) r = o; }); return r; };
  const turretN = find(/^turret/i), barrelN = find(/^barrel/i);
  const under = (o, n) => { for(let p = o; p; p = p.parent) if(p === n) return true; return false; };
  const wpos = n => new THREE.Vector3().setFromMatrixPosition(n.matrixWorld);
  const tW = wpos(turretN), bW = wpos(barrelN);
  const meshes = [];
  scene.traverse(o => { if(o.isMesh) meshes.push({ o, part:under(o, barrelN) ? 'barrel' : under(o, turretN) ? 'turret' : 'hull' }); });
  // fit: the hull box (tracks included) centred on x/z and standing on the ground; a little extra height reads better from above
  const hb = new THREE.Box3(), all = new THREE.Box3(), b = new THREE.Box3();
  for(const m of meshes){
    m.o.geometry.computeBoundingBox(); b.copy(m.o.geometry.boundingBox).applyMatrix4(m.o.matrixWorld);
    all.union(b); if(m.part === 'hull') hb.union(b);
  }
  const L = hb.max.z - hb.min.z, W = hb.max.x - hb.min.x, Ht = all.max.y - hb.min.y;
  const s = Math.min(S.len / L, 1.08 / W);
  const sy = THREE.MathUtils.clamp(Ht * s * 1.1, 0.8, 1.2) / Ht;
  const cx = (hb.min.x + hb.max.x) / 2, cz = (hb.min.z + hb.max.z) / 2, y0 = hb.min.y;
  // each piece is baked into its part's frame: the hull's is the tank's ground centre, the turret's its base, the barrel's its hinge
  const frame = { hull:new THREE.Vector3(cx, y0, cz), turret:tW, barrel:bW };
  const parts = { hull:[], turret:[], barrel:[] };
  for(const { o, part } of meshes){
    const M = new THREE.Matrix4().makeScale(s, sy, s * (part === 'barrel' ? S.barrelZ || 1 : 1))
      .multiply(new THREE.Matrix4().makeTranslation(-frame[part].x, -frame[part].y, -frame[part].z)).multiply(o.matrixWorld);
    const g = new THREE.BufferGeometry();
    for(const k of ['position', 'normal', 'uv']) if(o.geometry.attributes[k]) g.setAttribute(k, o.geometry.attributes[k].clone());
    if(o.geometry.index) g.setIndex(o.geometry.index.clone());
    if(!g.attributes.normal) g.computeVertexNormals();
    if(!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(M);
    const mat = o.material, map = mat.map || null;
    // the tread belt: find which way its texture runs along the tank, and how many texture lengths per metre
    let scroll = null;
    if(map && /tread|track/i.test(mat.name || '')) scroll = treadScroll(g);
    const color = S.paint && S.paint[mat.name] ? new THREE.Color(S.paint[mat.name]) : mat.color ? mat.color.clone() : new THREE.Color(1, 1, 1);
    parts[part].push({ geo:g, map, color, scroll, key:mat.uuid });
  }
  // pieces that share a material are merged, so a tank costs a handful of draw calls
  for(const p in parts){
    const byKey = new Map();
    for(const piece of parts[p]){ const k = piece.key + (piece.scroll ? 's' : ''); if(!byKey.has(k)) byKey.set(k, []); byKey.get(k).push(piece); }
    parts[p] = [...byKey.values()].map(list => {
      let gs = list.map(x => x.geo);
      if(gs.some(g => g.index) && !gs.every(g => g.index)) gs = gs.map(g => g.index ? g.toNonIndexed() : g);   // merging needs all alike
      const geo = gs.length > 1 ? mergeGeometries(gs) || gs[0] : gs[0];
      geo.computeBoundingBox(); geo.computeBoundingSphere();
      return { geo, map:list[0].map, color:list[0].color, scroll:list[0].scroll };
    });
  }
  const box = list => { const r = new THREE.Box3(); for(const x of list) r.union(x.geo.boundingBox); return r; };
  const turretPos = [(tW.x - cx) * s, (tW.y - y0) * sy, (tW.z - cz) * s];
  const barrelPos = [(bW.x - tW.x) * s, (bW.y - tW.y) * sy, (bW.z - tW.z) * s];
  const bb = box(parts.barrel);
  // the muzzle: the middle of the barrel's very tip (also right for a raised gun or a twin mount)
  let mx = 0, my = 0, mn = 0; const tip = bb.max.z - (bb.max.z - bb.min.z) * 0.06;
  for(const { geo } of parts.barrel){ const q = geo.attributes.position; for(let i = 0; i < q.count; i++) if(q.getZ(i) >= tip){ mx += q.getX(i); my += q.getY(i); mn++; } }
  const muzzle = mn ? [mx / mn, my / mn, bb.max.z] : [(bb.min.x + bb.max.x) / 2, (bb.min.y + bb.max.y) / 2, bb.max.z];
  return { len:L * s, hull:parts.hull, turret:parts.turret, barrel:parts.barrel, turretPos, barrelPos, muzzle, restElev:S.restElev };
}
// slope of the texture coordinate along the tank's length (least squares over the belt's vertices)
function treadScroll(g){
  const p = g.attributes.position, uv = g.attributes.uv, n = p.count;
  let best = null;
  for(const axis of [0, 1]){
    let sz = 0, sv = 0, szz = 0, szv = 0;
    for(let i = 0; i < n; i++){ const z = p.getZ(i), v = axis ? uv.getY(i) : uv.getX(i); sz += z; sv += v; szz += z * z; szv += z * v; }
    const den = n * szz - sz * sz; if(Math.abs(den) < 1e-9) continue;
    const k = (n * szv - sz * sv) / den;
    if(!best || Math.abs(k) > Math.abs(best.rate)) best = { axis, rate:k };
  }
  return best && Math.abs(best.rate) > 0.05 ? best : null;
}

// load all five (in parallel); if anything fails the game keeps its built-in tanks
export async function loadTanks(onProgress){
  try{
    const ids = Object.keys(SPEC); let done = 0;
    const loader = new GLTFLoader();
    const out = {};
    await Promise.all(ids.map(async id => {
      const g = await loader.loadAsync('assets/tanks/' + SPEC[id].file + '.glb');
      out[id] = convert(g.scene, SPEC[id]);
      g.scene.traverse(o => { if(o.isMesh){ o.geometry.dispose(); o.material.dispose(); } });   // the textures live on in the pieces
      if(onProgress) onProgress(++done / ids.length);
    }));
    setTankModels(out);
  }catch(e){ console.warn('tank models not loaded, using built-in tanks', e); }
}
