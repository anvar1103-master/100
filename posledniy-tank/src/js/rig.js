// Procedural rigged models. Every part is a rigid piece glued to one bone; all parts of a hero are merged into a
// single SkinnedMesh with vertex colours, so a hero costs one draw call (+ outline + silhouette) whatever its detail.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { stdMat } from './engine.js';

const G = {
  sph:new THREE.SphereGeometry(1, 14, 10), sphLo:new THREE.SphereGeometry(1, 7, 5),
  cyl:new THREE.CylinderGeometry(1, 1, 1, 10), box:new THREE.BoxGeometry(1, 1, 1), cone:new THREE.ConeGeometry(1, 1, 10),
  dome:new THREE.SphereGeometry(1, 18, 7, 0, Math.PI * 2, 0, Math.PI / 2), torus:new THREE.TorusGeometry(1, 0.22, 6, 16),
  disc:new THREE.CircleGeometry(1, 16)
};
G.disc.rotateX(-Math.PI / 2);
const UPV = new THREE.Vector3(0, 1, 0), V = new THREE.Vector3(), M4 = new THREE.Matrix4(), Qt = new THREE.Quaternion(), E = new THREE.Euler();

export class Rig {
  constructor(){ this.bones = {}; this.list = []; this.parts = []; this.root = new THREE.Group(); }
  bone(name, parent, x = 0, y = 0, z = 0){
    const b = new THREE.Bone(); b.name = name; b.position.set(x, y, z);
    (parent ? this.bones[parent] : this.root).add(b);
    this.bones[name] = b; this.list.push(b); return b;
  }
  // raw geometry already in bone space
  add(bone, geo, color, o = {}){ this.parts.push({ bone, geo, color:new THREE.Color(color), glow:o.glow || 0, shade:o.shade ?? 1 }); return geo; }
  // primitive with transform in bone space
  prim(bone, kind, color, pos, scale, rot, o){
    const g = (typeof kind === 'string' ? G[kind] : kind).clone();
    E.set(rot ? rot[0] : 0, rot ? rot[1] : 0, rot ? rot[2] : 0, rot && rot[3] || 'XYZ');
    const s = Array.isArray(scale) ? scale : [scale, scale, scale];
    g.applyMatrix4(M4.compose(V.set(pos[0], pos[1], pos[2]), Qt.setFromEuler(E), new THREE.Vector3(s[0], s[1], s[2])));
    return this.add(bone, g, color, o);
  }
  sph(bone, color, pos, s, rot, o){ return this.prim(bone, 'sph', color, pos, s, rot, o); }
  // a capsule (limb) from a to b
  limb(bone, color, a, b, r, o){
    const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const g = new THREE.CapsuleGeometry(r, Math.max(0.001, len), 3, 8);
    Qt.setFromUnitVectors(UPV, V.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]).normalize());
    g.applyMatrix4(M4.compose(V.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), Qt, new THREE.Vector3(1, 1, 1)));
    return this.add(bone, g, color, o);
  }
  lathe(bone, color, pts, pos = [0, 0, 0], s = 1, seg = 16, o){
    const g = new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg);
    g.scale(s, s, s); g.translate(pos[0], pos[1], pos[2]);
    return this.add(bone, g, color, o);
  }
  tube(bone, color, pts, r, o){
    const g = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(p[0], p[1], p[2]))), 10, r, 5);
    return this.add(bone, g, color, o);
  }
  // cartoon eyes: white, pupil, highlight and an optional brow
  eyes(bone, y, z, sep, r, o = {}){
    for(const s of [-1, 1]){
      this.sph(bone, '#FFFFFF', [s * sep, y, z], [r, r * 1.18, r * 0.62], null, { shade:1.15 });
      this.prim(bone, 'sphLo', o.pupil || '#17131A', [s * sep + s * (o.look || 0), y - r * 0.06, z + r * 0.42], [r * 0.6, r * 0.72, r * 0.34]);
      this.prim(bone, 'sphLo', '#FFFFFF', [s * sep + r * 0.18, y + r * 0.28, z + r * 0.66], r * 0.17, null, { glow:0.6 });
      if(o.brow !== undefined) this.prim(bone, 'box', o.browColor || '#2A1A12', [s * sep, y + r * 1.32, z + r * 0.42], [r * 1.7, r * 0.34, r * 0.4], [0, 0, s * o.brow]);
    }
  }
  build(mat){
    this.root.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(this.root.matrixWorld).invert();
    const geos = [];
    for(const p of this.parts){
      const idx = this.list.indexOf(p.bone);
      const g = p.geo;
      for(const k of Object.keys(g.attributes)) if(!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
      if(!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
      g.applyMatrix4(M4.multiplyMatrices(inv, p.bone.matrixWorld));
      const n = g.attributes.position.count;
      const col = new Float32Array(n * 3), glow = new Float32Array(n), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
      const c = p.color.clone().multiplyScalar(p.shade);
      for(let i = 0; i < n; i++){ col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b; glow[i] = p.glow; si[i * 4] = idx; sw[i * 4] = 1; }
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setAttribute('aGlow', new THREE.BufferAttribute(glow, 1));
      g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
      g.setAttribute('skinWeight', new THREE.BufferAttribute(sw, 4));
      geos.push(g);
    }
    const geo = mergeGeometries(geos);
    geos.forEach(g => g.dispose());
    geo.computeBoundingSphere();
    const skel = new THREE.Skeleton(this.list);
    const mesh = new THREE.SkinnedMesh(geo, mat);
    this.root.add(mesh); mesh.bind(skel);
    mesh.castShadow = true; mesh.frustumCulled = false;
    return { mesh, geo, skel };
  }
}

// ---- hero materials: vertex colours, soft rim light, glow channel, white hit flash ----
export function heroMaterial(){
  const m = stdMat({ vertexColors:true, roughness:0.5, metalness:0.0 });
  m.userData.u = { uFlash:{ value:0 }, uRim:{ value:new THREE.Color('#FFF6DA') }, uTint:{ value:new THREE.Color(0, 0, 0) } };
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = 'attribute float aGlow;\nvarying float vGlow;\n' + sh.vertexShader.replace('#include <color_vertex>', '#include <color_vertex>\n vGlow = aGlow;');
    sh.fragmentShader = 'uniform float uFlash; uniform vec3 uRim; uniform vec3 uTint; varying float vGlow;\n' + sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      float rim = pow(1.0 - clamp(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.6);
      totalEmissiveRadiance += uRim * rim * 0.35 * diffuseColor.rgb + diffuseColor.rgb * vGlow * 1.6 + vec3(uFlash) + uTint;`);
  };
  m.customProgramCacheKey = () => 'hero';
  return m;
}
// inverted hull outline that follows the skin
export function outlineMaterial(width = 0.022){
  const m = new THREE.MeshBasicMaterial({ color:'#13200F', side:THREE.BackSide });
  m.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <skinning_vertex>', `#include <skinning_vertex>\n#ifdef USE_SKINNING\n transformed += normalize(objectNormal) * ${width.toFixed(4)};\n#else\n transformed += normalize(normal) * ${width.toFixed(4)};\n#endif`); };
  m.customProgramCacheKey = () => 'outline' + width;
  return m;
}
// solid colour drawn only where something stands in front of the hero (see-through-walls silhouette)
export function silhouetteMaterial(color){
  const m = new THREE.MeshBasicMaterial({ color, depthWrite:false, depthFunc:THREE.GreaterDepth, fog:false,
    blending:THREE.CustomBlending, blendSrc:THREE.SrcAlphaFactor, blendDst:THREE.OneMinusSrcAlphaFactor, opacity:0.62 });
  // three only blends opaque materials when blending is custom; the alpha comes from opacity
  m.onBeforeCompile = sh => { sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', 'gl_FragColor = vec4(outgoingLight, opacity);'); };
  m.customProgramCacheKey = () => 'sil';
  return m;
}
