// The floor plan as meshes: carpet (with wet patches that turn glossy and, on «Красивая», reflect), wallpaper walls
// and pillars (darker at the skirting and in grime bands), a brown skirting board, drop-ceiling tiles at each zone's
// height (with steps where heights meet), the lamp panels (one instanced mesh; dead lamps grey, flickering ones
// driven by lamps.js) and the EXIT sign. Every surface takes the baked light (lights.js) as its light map; live lamps
// only add highlights and shadows on top. One mesh per material.
import * as THREE from 'three';
import { scene, loadTex, canvasTex, HIGH } from '../engine.js';
import { CELL, FLOOR, WALL, PILLAR, DESK } from './gen.js';
import { LIGHT_RES } from './lights.js';

export const LV = { group:null, mats:{}, lm:null, wetTex:null, lamps:null, diffuser:null, refl:{ tex:{ value:null }, mat:{ value:new THREE.Matrix4() }, on:{ value:0 } }, uni:{ time:{ value:0 } } };
const TEX = {};
export async function loadLevelTex(){
  const sets = ['wallpaper', 'carpet', 'ceiling_tiles', 'painted_wall_2'];
  await Promise.all(sets.flatMap(k => [['col', false], ['nor', true], ['rough', true]].map(async ([t, lin]) => { TEX[k + '_' + t] = await loadTex(`${k}_${t}.jpg`, { linear:lin }); })));
}

// shared shader bits: grime (low-frequency stains), wetness, light-map scale, dimmed live diffuse
const NOISE = `
float bsH(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float bsN(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(bsH(i), bsH(i + vec2(1, 0)), f.x), mix(bsH(i + vec2(0, 1)), bsH(i + vec2(1, 1)), f.x), f.y); }
float bsF(vec2 p){ return bsN(p) * 0.55 + bsN(p * 2.3 + 7.1) * 0.3 + bsN(p * 5.1 - 3.7) * 0.15; }`;
function levelMat(o){
  const m = new THREE.MeshStandardMaterial({ map:o.map, normalMap:o.nor, roughnessMap:o.rough, roughness:1, metalness:0, lightMap:LV.lm, lightMapIntensity:o.lmK ?? 3.2,
    vertexColors:!!o.vcol, normalScale:new THREE.Vector2(o.ns ?? 1, o.ns ?? 1) });
  m.onBeforeCompile = s => {
    s.uniforms.uDirK = { value:o.dirK ?? 0.4 }; s.uniforms.uTime = LV.uni.time;
    if(o.wet){ s.uniforms.wetMap = { value:LV.wetTex }; s.uniforms.reflTex = LV.refl.tex; s.uniforms.reflMat = LV.refl.mat; s.uniforms.reflOn = LV.refl.on; }
    s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;' + (o.wet ? '\nuniform mat4 reflMat; varying vec4 vReflUv;' : ''))
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWP = (modelMatrix * vec4(transformed, 1.0)).xyz;' + (o.wet ? '\nvReflUv = reflMat * vec4(vWP, 1.0);' : ''));
    s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nuniform float uDirK; uniform float uTime; varying vec3 vWP;' + NOISE +
        (o.wet ? '\nuniform sampler2D wetMap; uniform sampler2D reflTex; uniform float reflOn; varying vec4 vReflUv; float bsWet;' : ''))
      .replace('#include <map_fragment>', `#include <map_fragment>
        ${o.grime ? `{ float gr = bsF(vec2(vWP.x + vWP.z, vWP.y * 1.7) * 0.45); float low = smoothstep(0.9, 0.0, vWP.y);
          diffuseColor.rgb *= mix(1.0, 0.72, smoothstep(0.55, 0.85, gr)) * mix(1.0, 0.8, low * smoothstep(0.35, 0.7, bsF(vWP.xz * 1.3 + vWP.y))); }` : ''}
        ${o.wet ? `{ vec2 wuv = (vWP.xz + ${(o.size / 2).toFixed(2)}) / ${o.size.toFixed(2)};
          float w = texture2D(wetMap, wuv).r; w = smoothstep(0.15, 0.85, w + (bsF(vWP.xz * 0.9) - 0.5) * 0.5);
          bsWet = w; diffuseColor.rgb *= 1.0 - 0.5 * w;
          diffuseColor.rgb *= mix(0.86, 1.0, bsF(vWP.xz * 0.35)); }` : ''}`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>' + (o.wet ? '\nroughnessFactor = mix(roughnessFactor, 0.05, bsWet);' : ''))
      .replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>' + (o.wet ? '\nnormal = normalize(mix(normal, normalize(vNormal), bsWet * 0.9));' : ''))
      .replace('#include <aomap_fragment>', '#include <aomap_fragment>\nreflectedLight.directDiffuse *= uDirK;')
      .replace('#include <opaque_fragment>', (o.wet ? `if(reflOn > 0.5 && bsWet > 0.01){
          vec4 ru = vReflUv; ru.xy += normal.xz * 0.02 * ru.w;
          vec3 rc = texture2DProj(reflTex, ru).rgb;
          float fr = 0.05 + 0.95 * pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 5.0);
          outgoingLight += rc * bsWet * (0.25 + 0.75 * fr);
        }\n` : '') + '#include <opaque_fragment>');
  };
  m.customProgramCacheKey = () => 'lvl' + (o.wet ? 'w' : '') + (o.grime ? 'g' : '');
  return m;
}

export function buildLevelMeshes(L){
  if(LV.group){ scene.remove(LV.group); LV.group.traverse(o => { if(o.geometry) o.geometry.dispose(); }); }
  const G = LV.group = new THREE.Group(); scene.add(G);
  const W = L.W, H = L.H, size = W * CELL, at = (i, k) => k * W + i;
  // ---- light map and wetness map ----
  const B = L.light, n = B.n, half = new Uint16Array(n * n * 4);
  for(let i = 0; i < n * n; i++){ for(let c = 0; c < 3; c++) half[i * 4 + c] = THREE.DataUtils.toHalfFloat(Math.min(60000, B.data[i * 3 + c])); half[i * 4 + 3] = THREE.DataUtils.toHalfFloat(1); }
  if(LV.lm) LV.lm.dispose();
  LV.lm = new THREE.DataTexture(half, n, n, THREE.RGBAFormat, THREE.HalfFloatType); LV.lm.channel = 1;
  LV.lm.magFilter = LV.lm.minFilter = THREE.LinearFilter; LV.lm.colorSpace = THREE.LinearSRGBColorSpace; LV.lm.needsUpdate = true;
  const wd = new Uint8Array(W * H * 4); for(let s = 0; s < W * H; s++){ wd[s * 4] = L.wet[s]; wd[s * 4 + 3] = 255; }
  if(LV.wetTex) LV.wetTex.dispose();
  LV.wetTex = new THREE.DataTexture(wd, W, H, THREE.RGBAFormat); LV.wetTex.magFilter = LV.wetTex.minFilter = THREE.LinearFilter; LV.wetTex.needsUpdate = true;

  const M = LV.mats = {
    floor:levelMat({ map:TEX.carpet_col, nor:TEX.carpet_nor, rough:TEX.carpet_rough, wet:true, size, lmK:3.0, dirK:0.45, ns:0.8 }),
    wall:levelMat({ map:TEX.wallpaper_col, nor:TEX.wallpaper_nor, rough:TEX.wallpaper_rough, vcol:true, grime:true, lmK:3.0, dirK:0.35 }),
    trim:levelMat({ map:TEX.painted_wall_2_col, nor:TEX.painted_wall_2_nor, rough:TEX.painted_wall_2_rough, vcol:true, lmK:2.6, dirK:0.5 }),
    ceil:levelMat({ map:TEX.ceiling_tiles_col, nor:TEX.ceiling_tiles_nor, rough:TEX.ceiling_tiles_rough, vcol:true, lmK:1.5, dirK:0.6 }),
  };
  // geometry builders: positions, normals, uv (texture), uv1 (light map), colours
  const mk = () => ({ p:[], n:[], uv:[], uv1:[], c:[], idx:[] });
  const quad = (S, a, b, c, d, nrm, uvs, lmOff, cols) => {
    const base = S.p.length / 3;
    for(const [v, uv, col] of [[a, uvs[0], cols?.[0]], [b, uvs[1], cols?.[1]], [c, uvs[2], cols?.[2]], [d, uvs[3], cols?.[3]]]){
      S.p.push(v[0], v[1], v[2]); S.n.push(nrm[0], nrm[1], nrm[2]); S.uv.push(uv[0], uv[1]);
      S.uv1.push((v[0] + nrm[0] * lmOff + size / 2) / size, (v[2] + nrm[2] * lmOff + size / 2) / size);
      const k = col ?? 1; S.c.push(k, k, k);
    }
    S.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  const toMesh = (S, mat, shadow) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(S.p, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(S.n, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(S.uv, 2)); g.setAttribute('uv1', new THREE.Float32BufferAttribute(S.uv1, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(S.c, 3)); g.setIndex(S.idx);
    const m = new THREE.Mesh(g, mat); m.receiveShadow = true; m.castShadow = !!shadow; m.matrixAutoUpdate = false; G.add(m); return m;
  };
  const X = i => i * CELL - L.ox, Z = k => k * CELL - L.oz;
  // ---- floor: one plane, carpet tile 2 m ----
  { const S = mk(), e = size / 2; quad(S, [-e, 0, e], [e, 0, e], [e, 0, -e], [-e, 0, -e], [0, 1, 0], [[-e / 2, -e / 2], [e / 2, -e / 2], [e / 2, e / 2], [-e / 2, e / 2]], 0); LV.floor = toMesh(S, M.floor); }
  // ---- ceiling: runs of open cells of the same height ----
  { const S = mk(), TS = 2.4;
    const open = s => L.g[s] === FLOOR || L.g[s] === DESK;
    for(let k = 0; k < H; k++){ let i = 0; while(i < W){ const s = at(i, k); if(!open(s)){ i++; continue; } const h = L.ceil[s]; let j = i; while(j + 1 < W && open(at(j + 1, k)) && L.ceil[at(j + 1, k)] === h) j++;
      const x0 = X(i), x1 = X(j + 1), z0 = Z(k), z1 = Z(k + 1);
      quad(S, [x0, h, z0], [x1, h, z0], [x1, h, z1], [x0, h, z1], [0, -1, 0], [[x0 / TS, z0 / TS], [x1 / TS, z0 / TS], [x1 / TS, z1 / TS], [x0 / TS, z1 / TS]], 0, [0.9, 0.9, 0.9, 0.9]);
      i = j + 1; } }
    LV.ceil = toMesh(S, M.ceil); }
  // ---- walls, pillars, steps between ceiling heights, skirting ----
  { const S = mk(), T = mk(), TW = 1.35, TH = 0.11;
    const solid = s => L.g[s] === WALL || L.g[s] === PILLAR;
    const open = (i, k) => i >= 0 && k >= 0 && i < W && k < H && (L.g[at(i, k)] === FLOOR || L.g[at(i, k)] === DESK);
    // a face of solid cell (i, k) toward neighbour (i+a, k+b); merge along the face while height and kind match
    for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){
      const along = a ? [0, 1] : [1, 0];
      const done = new Uint8Array(W * H);
      for(let k = 0; k < H; k++) for(let i = 0; i < W; i++){
        const s = at(i, k); if(done[s] || !solid(s) || !open(i + a, k + b)) continue;
        const h = L.ceil[at(i + a, k + b)];
        let len = 1; while(true){ const ni = i + along[0] * len, nk = k + along[1] * len; if(ni >= W || nk >= H) break; const ns = at(ni, nk); if(!solid(ns) || !open(ni + a, nk + b) || L.ceil[at(ni + a, nk + b)] !== h) break; done[ns] = 1; len++; }
        done[s] = 1;
        // face plane position and its two ends
        const fx = a > 0 ? X(i + 1) : a < 0 ? X(i) : null, fz = b > 0 ? Z(k + 1) : b < 0 ? Z(k) : null;
        let p0, p1;
        if(a){ p0 = [fx, Z(k)]; p1 = [fx, Z(k + len)]; } else { p0 = [X(i), fz]; p1 = [X(i + len), fz]; }
        // wind so the face looks outward
        if(a > 0 || b < 0) [p0, p1] = [p1, p0];
        const u0 = a ? p0[1] : p0[0], u1 = a ? p1[1] : p1[0], nrm = [a, 0, b];
        const ys = [0, 0.3, h - 0.35, h], cs = [0.55, 0.95, 1.0, 0.82];
        for(let r = 0; r < 3; r++){
          const y0 = ys[r], y1 = ys[r + 1];
          quad(S, [p0[0], y0, p0[1]], [p1[0], y0, p1[1]], [p1[0], y1, p1[1]], [p0[0], y1, p0[1]], nrm,
            [[u0 / TW, y0 / TW], [u1 / TW, y0 / TW], [u1 / TW, y1 / TW], [u0 / TW, y1 / TW]], 0.3, [cs[r], cs[r], cs[r + 1], cs[r + 1]]);
        }
        // skirting board: a strip standing 2 cm proud, with its top
        const o = 0.02, q0 = [p0[0] + a * o, p0[1] + b * o], q1 = [p1[0] + a * o, p1[1] + b * o];
        quad(T, [q0[0], 0, q0[1]], [q1[0], 0, q1[1]], [q1[0], TH, q1[1]], [q0[0], TH, q0[1]], nrm, [[u0, 0], [u1, 0], [u1, TH], [u0, TH]], 0.3, [0.7, 0.7, 1, 1]);
        quad(T, [q0[0], TH, q0[1]], [q1[0], TH, q1[1]], [p1[0], TH, p1[1]], [p0[0], TH, p0[1]], [0, 1, 0], [[u0, 0], [u1, 0], [u1, 0.02], [u0, 0.02]], 0.3, [1, 1, 1, 1]);
      }
    }
    // ceiling steps: where an open cell meets an open cell with a higher ceiling, a face hangs from high to low
    for(let k = 0; k < H; k++) for(let i = 0; i < W; i++){
      if(!open(i, k)) continue; const h = L.ceil[at(i, k)];
      for(const [a, b] of [[1, 0], [0, 1], [-1, 0], [0, -1]]){
        if(!open(i + a, k + b)) continue; const h2 = L.ceil[at(i + a, k + b)]; if(h2 >= h) continue;
        // seen from (i, k), the taller side: the face sits on the shared edge, facing back into (i, k)
        const nrm = [-a, 0, -b];
        let p0, p1;
        if(a){ const fx = a > 0 ? X(i + 1) : X(i); p0 = [fx, Z(k)]; p1 = [fx, Z(k + 1)]; } else { const fz = b > 0 ? Z(k + 1) : Z(k); p0 = [X(i), fz]; p1 = [X(i + 1), fz]; }
        if(-a > 0 || -b < 0) [p0, p1] = [p1, p0];
        const u0 = a ? p0[1] : p0[0], u1 = a ? p1[1] : p1[0];
        quad(S, [p0[0], h2, p0[1]], [p1[0], h2, p1[1]], [p1[0], h, p1[1]], [p0[0], h, p0[1]], nrm, [[u0 / TW, h2 / TW], [u1 / TW, h2 / TW], [u1 / TW, h / TW], [u0 / TW, h / TW]], 0.3, [0.85, 0.85, 0.75, 0.75]);
      }
    }
    LV.walls = toMesh(S, M.wall, true); LV.trim = toMesh(T, M.trim);
  }
  buildLamps(L);
  buildExit(L);
  return G;
}

// ---- lamp panels: housing + glowing diffuser, one instanced mesh each ----
export const LAMP = { warm:new THREE.Color(1.0, 0.93, 0.8).multiplyScalar(5.5), red:new THREE.Color(1.0, 0.15, 0.08).multiplyScalar(5), dead:new THREE.Color(0.11, 0.105, 0.095) };
function buildLamps(L){
  const n = L.lamps.length;
  const house = new THREE.InstancedMesh(new THREE.BoxGeometry(0.66, 0.05, 1.26), new THREE.MeshStandardMaterial({ color:'#B8B2A2', roughness:0.5, metalness:0.6 }), n);
  const diff = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.58, 1.18).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color:'#ffffff', toneMapped:true, fog:false }), n);
  const m4 = new THREE.Matrix4();
  L.lamps.forEach((l, i) => {
    m4.makeTranslation(l.x, l.y - 0.02, l.z); house.setMatrixAt(i, m4);
    m4.makeTranslation(l.x, l.y - 0.047, l.z); diff.setMatrixAt(i, m4);
    diff.setColorAt(i, l.state === 'on' ? (l.red ? LAMP.red : LAMP.warm) : LAMP.dead);
  });
  for(const m of [house, diff]){ m.frustumCulled = false; m.instanceMatrix.needsUpdate = true; LV.group.add(m); }
  diff.instanceColor.needsUpdate = true;
  LV.lamps = house; LV.diffuser = diff;
}
// the EXIT sign: a box with a glowing green face (both sides)
function buildExit(L){
  const p = L.props.find(q => q.kind === 'exit'); if(!p) return;
  const tex = canvasTex(256, 96, (x, w, h) => { x.fillStyle = '#0B2A12'; x.fillRect(0, 0, w, h); x.fillStyle = '#5BFF8A'; x.font = 'bold 62px Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EXIT', w / 2, h / 2 + 3);
    x.strokeStyle = '#5BFF8A'; x.lineWidth = 4; x.strokeRect(6, 6, w - 12, h - 12); });
  const face = new THREE.MeshBasicMaterial({ map:tex, color:new THREE.Color(2.2, 2.2, 2.2), toneMapped:true });
  const body = new THREE.MeshStandardMaterial({ color:'#DDD8CC', roughness:0.6 });
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.18, 0.06), [body, body, body, body, face, face]);
  box.position.set(p.x, p.y, p.z); box.rotation.y = p.ry; LV.group.add(box);
  const light = new THREE.PointLight('#40FF70', 3, 6, 2); light.position.set(p.x, p.y - 0.2, p.z); LV.group.add(light);
  LV.exitLight = light;
}
