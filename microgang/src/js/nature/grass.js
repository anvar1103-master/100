// Tall grass: each blade is a folded ribbon several times taller than a fighter. Blades grow in clumps where the
// map says so and as a dense wall around the meadow; they sway, glow when the sun is behind them and bend aside as
// fighters push through. Split into square chunks so the camera and the shadow pass skip what they can't see.
import * as THREE from 'three';
import { scene, LOW, HIGH } from '../engine.js';
import { groundH, grassAt, BOUND } from '../map.js';
import { natureMat } from './shaders.js';
import { mulberry, sstep } from '../util.js';

export const GR = { chunks:[], count:0, seedHeads:null };

// unit blade: height 0..1 along y, width -0.5..0.5 along x, the midrib pushed forward (+z) so it reads as folded
function bladeGeo(seg = 7){
  const pos = [], nor = [], uv = [], idx = [];
  for(let i = 0; i <= seg; i++){
    const t = i / seg, w = (1 - Math.pow(t, 2.2)) * 0.5 + 0.02 * (1 - t), fold = 0.08 * (1 - t);
    const row = [[-w, 0], [0, fold], [w, 0]];
    for(const [x, z] of row){ pos.push(x, t, z); uv.push(x / Math.max(w, 1e-3) * 0.5 + 0.5, t); }
    // normals of the two halves tilt outward
    nor.push(-0.35, 0, 1, 0, 0, 1, 0.35, 0, 1);
  }
  for(let i = 0; i < seg; i++){ const a = i * 3; idx.push(a, a + 3, a + 1, a + 1, a + 3, a + 4, a + 1, a + 4, a + 2, a + 2, a + 4, a + 5); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

function bladeMat(){
  const m = new THREE.MeshStandardMaterial({ color:'#ffffff', roughness:0.55, metalness:0, side:THREE.DoubleSide, vertexColors:false });
  return natureMat(m, { wind:1.0, windH:1, windAmp:0.11, perH:1, push:true, pushSpan:0.16, trans:'#E0F09A', transK:1.25, key:'blade',
    frag:s => {
      // per-instance: bend forward, colour (base, tip), dryness
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute vec4 ib; attribute vec3 ic; varying vec3 vIc; varying vec2 vBuv; varying float vDry;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
          transformed.z += ib.x * position.y * position.y;
          transformed.x += ib.y * position.y * position.y;
          vIc = ic; vBuv = uv; vDry = ib.z;`)
        .replace('#include <beginnormal_vertex>', `#include <beginnormal_vertex>
          objectNormal = normalize(objectNormal + vec3(0.0, -ib.x * 2.0 * position.y * 0.3, 0.0));`);
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 vIc; varying vec2 vBuv; varying float vDry;')
        .replace('#include <map_fragment>', `
          float t = vBuv.y;
          vec3 base = vIc * 0.42, tip = mix(vIc * 1.15 + vec3(0.08, 0.06, -0.02), vec3(0.78, 0.7, 0.38), vDry);
          vec3 col = mix(base, tip, smoothstep(0.0, 0.85, t));
          // midrib and fine lengthwise veins
          float x = abs(vBuv.x - 0.5);
          col *= 1.0 + (1.0 - smoothstep(0.0, 0.04, x)) * 0.22;
          col *= 0.94 + 0.06 * sin(vBuv.x * 60.0);
          // a dry, brownish tip on some blades
          col = mix(col, vec3(0.55, 0.45, 0.25), smoothstep(0.82, 1.0, t) * vDry);
          diffuseColor.rgb *= col;`)
        .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = mix(0.42, 0.7, vDry);');
    } });
}

// ---- placement ----
const COLS = ['#5E9A2E', '#6BA834', '#4F8C2A', '#79B23C', '#87B83E', '#5A9030', '#6E9E2C'].map(c => new THREE.Color(c));
const DRY = new THREE.Color('#A39A55');
export function buildGrass(){
  const r = mulberry(4242), geo = bladeGeo(LOW ? 5 : 7), geoLo = bladeGeo(3), mat = bladeMat();
  const depth = natureMat(new THREE.MeshDepthMaterial({ depthPacking:THREE.RGBADepthPacking, side:THREE.DoubleSide }), { wind:1.0, windH:1, windAmp:0.11, perH:1, push:true, pushSpan:0.16, key:'bladeD',
    frag:s => { s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute vec4 ib;').replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed.z += ib.x * position.y * position.y; transformed.x += ib.y * position.y * position.y;'); } });
  const CH = 24, EXT = 100, nC = Math.ceil(EXT * 2 / CH), cells = Array.from({ length:nC * nC }, () => []);
  const k = LOW ? 0.45 : HIGH ? 1.25 : 1;
  const o = { h:0 };
  const put = (x, z, h, w, lean) => {
    const ix = Math.floor((x + EXT) / CH), iz = Math.floor((z + EXT) / CH);
    if(ix < 0 || iz < 0 || ix >= nC || iz >= nC) return;
    cells[ix * nC + iz].push([x, z, h, w, lean, r() * Math.PI * 2, r(), r(), r()]);
  };
  // clumps: a tuft of 4-12 blades fanning from one root
  const clump = (x, z, h, n, spread) => {
    for(let i = 0; i < n; i++){
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * spread;
      put(x + Math.cos(a) * d, z + Math.sin(a) * d, h * (0.55 + r() * 0.6), 0.32 + r() * 0.35, 0.15 + r() * 0.5);
    }
  };
  // inside the meadow: jittered grid, density from the map
  const step = 2.2;
  for(let z = -BOUND; z <= BOUND; z += step) for(let x = -BOUND; x <= BOUND; x += step){
    const px = x + (r() - 0.5) * step, pz = z + (r() - 0.5) * step;
    const d = grassAt(px, pz, o);
    if(d < 0.04 || r() > d * k * 1.15) continue;
    clump(px, pz, o.h, 4 + Math.floor(r() * 8 * d), 0.9 + d * 0.8);
  }
  // beyond the edge: the wall of the meadow, taller and thicker, thinning far out (the far blur hides that)
  const step2 = 3.0;
  for(let z = -EXT; z <= EXT; z += step2) for(let x = -EXT; x <= EXT; x += step2){
    const e = Math.max(Math.abs(x), Math.abs(z));
    if(e < BOUND) continue;
    const px = x + (r() - 0.5) * step2, pz = z + (r() - 0.5) * step2;
    const keep = (1 - sstep(BOUND + 15, EXT, e)) * 0.85 + 0.15;
    if(r() > keep * (LOW ? 0.6 : 1)) continue;
    clump(px, pz, 14 + r() * 10, 5 + Math.floor(r() * 7), 1.6);
  }
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();
  for(let ci = 0; ci < cells.length; ci++){
    const L = cells[ci]; if(!L.length) continue;
    const g = geo.clone();
    const ib = new Float32Array(L.length * 4), ic = new Float32Array(L.length * 3);
    const im = new THREE.InstancedMesh(g, mat, L.length);
    let minY = 1e9, maxY = -1e9;
    for(let i = 0; i < L.length; i++){
      const [x, z, h, w, lean, yaw, a, b, c] = L[i];
      const y = groundH(x, z) - 0.2;
      _e.set((a - 0.5) * 0.18, yaw, (b - 0.5) * 0.18, 'YXZ'); _q.setFromEuler(_e);
      _m.compose(_p.set(x, y, z), _q, _s.set(w, h, w));
      im.setMatrixAt(i, _m);
      const dry = c < 0.12 ? 0.6 + c * 3 : c > 0.93 ? 0.35 : 0;
      ib.set([lean * (0.6 + a * 0.6) * h * 0.22 / w, (b - 0.5) * h * 0.06 / w, dry, 0], i * 4);
      _c.copy(COLS[Math.floor(a * COLS.length) % COLS.length]).lerp(DRY, dry * 0.5);
      ic.set([_c.r, _c.g, _c.b], i * 3);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y + h);
    }
    const aib = new THREE.InstancedBufferAttribute(ib, 4), aic = new THREE.InstancedBufferAttribute(ic, 3);
    g.setAttribute('ib', aib); g.setAttribute('ic', aic);
    // a lighter blade for far away, sharing the same instances
    const lo = geoLo.clone(); lo.setAttribute('ib', aib); lo.setAttribute('ic', aic);
    im.userData.hi = g; im.userData.lo = lo;
    im.instanceMatrix.needsUpdate = true;
    im.computeBoundingSphere();
    // bounding sphere padded for the sway
    im.boundingSphere.radius += 3;
    im.castShadow = !LOW; im.receiveShadow = true;
    im.customDepthMaterial = depth;
    scene.add(im);
    im.userData.c = new THREE.Vector3((Math.floor(ci / nC) + 0.5) * CH - EXT, 0, (ci % nC + 0.5) * CH - EXT);
    GR.chunks.push(im); GR.count += L.length;
  }
  return GR;
}
// near chunks: full blades with shadows; far ones: three-segment blades, no shadows (the far blur hides the difference)
export function tickGrass(cam){
  for(const im of GR.chunks){
    const d = Math.hypot(im.userData.c.x - cam.x, im.userData.c.z - cam.z), far = d > 66;
    const g = far ? im.userData.lo : im.userData.hi;
    if(im.geometry !== g){ im.geometry = g; }
    im.castShadow = !LOW && d < 80;
  }
}
