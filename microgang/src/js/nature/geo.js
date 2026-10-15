// Geometry helpers for the plants and props: tapered tubes along curves, lathes with good UVs, bent leaf sheets,
// lumpy rocks, and merging.
import * as THREE from 'three';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { mulberry, noise2 } from '../util.js';

export { mergeGeometries };
// a tube through pts (Vector3[]), radius rad(t) (t 0..1 along), uv: u around ×uRep, v along in world length / vScale
export function tube(pts, rad, radial = 12, along = 0, o = {}){
  const curve = pts.length > 2 ? new THREE.CatmullRomCurve3(pts) : new THREE.LineCurve3(pts[0], pts[1]);
  const n = along || Math.max(4, Math.ceil(curve.getLength() / (o.segLen || 1.2)));
  const frames = curve.computeFrenetFrames(n, false);
  const pos = [], nor = [], uv = [], idx = [];
  const len = curve.getLength();
  for(let i = 0; i <= n; i++){
    const t = i / n, p = curve.getPointAt(t), N = frames.normals[i], B = frames.binormals[i], r = rad(t);
    for(let j = 0; j <= radial; j++){
      const a = j / radial * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      const wob = o.wobble ? 1 + o.wobble * noise2(t * 9 + (o.seed || 0), j * 0.7) : 1;
      const nx = N.x * c + B.x * s, ny = N.y * c + B.y * s, nz = N.z * c + B.z * s;
      pos.push(p.x + nx * r * wob, p.y + ny * r * wob, p.z + nz * r * wob);
      nor.push(nx, ny, nz);
      uv.push(j / radial * (o.uRep || 1), t * len / (o.vScale || 4));
    }
  }
  for(let i = 0; i < n; i++) for(let j = 0; j < radial; j++){ const a = i * (radial + 1) + j, b = a + radial + 1; idx.push(a, b, a + 1, a + 1, b, b + 1); }
  if(o.caps){
    // close the ends with a fan
    for(const [i, flip] of [[0, true], [n, false]]){
      const t = i / n, p = curve.getPointAt(t), T = curve.getTangentAt(t).multiplyScalar(flip ? -1 : 1), base = pos.length / 3;
      pos.push(p.x, p.y, p.z); nor.push(T.x, T.y, T.z); uv.push(0.5, 0.5);
      for(let j = 0; j <= radial; j++){ const k = (i * (radial + 1) + j) * 3; pos.push(pos[k], pos[k + 1], pos[k + 2]); nor.push(T.x, T.y, T.z); const a = j / radial * Math.PI * 2; uv.push(0.5 + Math.cos(a) * 0.5, 0.5 + Math.sin(a) * 0.5); }
      for(let j = 0; j < radial; j++) flip ? idx.push(base, base + 2 + j, base + 1 + j) : idx.push(base, base + 1 + j, base + 2 + j);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}
// lathe from [radius, y] points; uv u = angle 0..1, v = 0..1 along the profile by arc length
export function lathe(prof, seg = 32, phi = Math.PI * 2){
  const pts = prof.map(p => new THREE.Vector2(Math.max(0, p[0]), p[1]));
  const g = new THREE.LatheGeometry(pts, seg, 0, phi);
  // re-do v by arc length so textures don't stretch on steep parts
  let L = 0; const acc = [0];
  for(let i = 1; i < pts.length; i++){ L += pts[i].distanceTo(pts[i - 1]); acc.push(L); }
  const uv = g.attributes.uv;
  for(let i = 0; i < uv.count; i++){ const k = i % pts.length; uv.setY(i, acc[k] / (L || 1)); }
  return g;
}
// a leaf sheet: length along +z from 0..1, width x -0.5..0.5, curled (edges up), arched (middle up), uv for leafTex
export function leafGeo(curl = 0.3, arch = 0.1, nx = 6, nz = 14, droop = 0){
  const g = new THREE.PlaneGeometry(1, 1, nx, nz);
  g.rotateX(-Math.PI / 2); g.translate(0, 0, 0.5);
  const p = g.attributes.position, uv = g.attributes.uv;
  for(let i = 0; i < p.count; i++){
    const x = p.getX(i), z = p.getZ(i);
    const y = x * x * curl * 1.4 + Math.sin(z * Math.PI) * arch - z * z * droop;
    p.setY(i, y);
    uv.setXY(i, x + 0.5, z);
  }
  g.computeVertexNormals();
  return g;
}
// a lumpy rock: icosphere pushed by noise; returns geometry with uv from spherical mapping
export function rockGeo(seed, detail = 3, lump = 0.22){
  let g = new THREE.IcosahedronGeometry(1, detail); g.deleteAttribute('uv'); g.deleteAttribute('normal'); g = mergeVertices(g);
  const p = g.attributes.position, r = mulberry(seed);
  const o1 = r() * 100, o2 = r() * 100;
  const v = new THREE.Vector3(), uv = [];
  for(let i = 0; i < p.count; i++){
    v.fromBufferAttribute(p, i).normalize();
    const n = noise2(v.x * 1.6 + o1, v.z * 1.6 + v.y * 0.7 + o2) * lump + noise2(v.x * 4 + o2, v.y * 4 - o1) * lump * 0.35;
    v.multiplyScalar(1 + n);
    p.setXYZ(i, v.x, v.y, v.z);
    uv.push(Math.atan2(v.z, v.x) / (Math.PI * 2) + 0.5, v.y * 0.5 + 0.5);
  }
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  return g;
}
// place geometry copies with a matrix into a list for merging
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler();
export function placed(g, x, y, z, rx, ry, rz, sx, sy, sz){
  _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e);
  _m.compose(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx, sy ?? sx, sz ?? sx));
  return g.clone().applyMatrix4(_m);
}
export function mat4(x, y, z, rx, ry, rz, sx, sy, sz){
  _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e);
  return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx, sy ?? sx, sz ?? sx));
}
// an instanced mesh from a list of matrices (and optional colours)
export function instanced(geo, mat, mats, cols, shadow = true){
  const im = new THREE.InstancedMesh(geo, mat, Math.max(1, mats.length));
  im.count = mats.length;
  mats.forEach((m, i) => im.setMatrixAt(i, m));
  if(cols) cols.forEach((c, i) => im.setColorAt(i, c));
  im.instanceMatrix.needsUpdate = true;
  if(mats.length) im.computeBoundingSphere();
  im.castShadow = shadow; im.receiveShadow = true;
  return im;
}
