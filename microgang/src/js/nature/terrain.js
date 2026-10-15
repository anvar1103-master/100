// The ground of the meadow (soil, moss, mud by the water, blended by height so moss sits in the dips of the soil)
// and the puddle's water.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { groundH, mossAt, WATER } from '../map.js';
import { natureMat } from './shaders.js';
import { soilTex, mossTex, photoSet } from './textures.js';
import { sstep } from '../util.js';

export const T = { ground:null, water:null };

// grid coordinate → world: even spacing over the meadow, stretching out toward the horizon
const INNER = 150, OUTER = 900;

export async function buildGround(){
  const N = LOW ? 260 : 340, e = 0.35;
  const pos = [], nor = [], mg = [], idx = [];
  const coord = i => { const u = (i / (N - 1)) * 2 - 1, a = Math.abs(u); return Math.sign(u) * (a < 0.82 ? a / 0.82 * INNER : INNER + Math.pow((a - 0.82) / 0.18, 2.0) * (OUTER - INNER)); };
  for(let j = 0; j < N; j++) for(let i = 0; i < N; i++){
    const x = coord(i), z = coord(j), y = groundH(x, z);
    pos.push(x, y, z);
    const nx = groundH(x - e, z) - groundH(x + e, z), nz = groundH(x, z - e) - groundH(x, z + e), l = Math.hypot(nx, 2 * e, nz);
    nor.push(nx / l, 2 * e / l, nz / l);
    const wet = 1 - sstep(WATER - 0.1, WATER + 0.6, y);
    mg.push(mossAt(x, z), wet, 0);
  }
  for(let j = 0; j < N - 1; j++) for(let i = 0; i < N - 1; i++){ const a = j * N + i, b = a + 1, c = a + N, d = c + 1; idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('mg', new THREE.Float32BufferAttribute(mg, 3));
  g.setIndex(idx);
  g.computeBoundingSphere();

  const [soilP, mossP] = await Promise.all([photoSet('soil'), photoSet('moss')]);
  const soil = soilP || soilTex(), moss = mossP || mossTex();
  const mat = natureMat(new THREE.MeshStandardMaterial({ map:soil.map, normalMap:soil.normal, roughness:0.95, metalness:0, normalScale:new THREE.Vector2(1.2, 1.2) }), { dapple:true, key:'ground',
    frag:s => {
      s.uniforms.mgMoss = { value:moss.map }; s.uniforms.mgMossN = { value:moss.normal || soil.normal };
      s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\nattribute vec3 mg; varying vec3 vMg;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvMg = mg;');
      s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D mgMoss; uniform sampler2D mgMossN; varying vec3 vMg;\nfloat mgMw; vec2 mgSu; vec2 mgSu2; vec2 mgMu;')
        .replace('#include <map_fragment>', `
          mgSu = vMgWorld.xz / 6.5; mgSu2 = mat2(0.8, -0.6, 0.6, 0.8) * vMgWorld.xz / 19.0; mgMu = vMgWorld.xz / 4.2;
          vec4 sC = mix(texture2D(map, mgSu), texture2D(map, mgSu2), 0.35);
          vec4 mC = texture2D(mgMoss, mgMu);
          float sH = dot(sC.rgb, vec3(0.33));
          mgMw = smoothstep(0.3, 0.7, vMg.x + (0.5 - sH) * 0.9 + (texture2D(mgDapple, vMgWorld.xz * 0.05).g - 0.5) * 0.5);
          vec3 col = mix(sC.rgb, mC.rgb * vec3(0.95, 1.05, 0.85), mgMw);
          float big = texture2D(mgDapple, vMgWorld.xz * 0.0045 + 0.37).b;
          col *= 0.86 + big * 0.3;
          col = mix(col, col * vec3(0.5, 0.48, 0.42), vMg.y * 0.85);
          diffuseColor.rgb *= col;`)
        .replace('vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;', 'vec3 mapN = mix(texture2D(normalMap, mgSu).xyz, texture2D(mgMossN, mgMu).xyz, mgMw) * 2.0 - 1.0;')
        .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = mix(mix(0.96, 0.82, mgMw), 0.35, vMg.y);');
    } });
  const m = T.ground = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  scene.add(m);
  buildWater();
}

function buildWater(){
  // a patch of grid over the puddle; vertices know the depth below them for the shore fade
  const P = { x:-48, z:-46 }, S = 34, N = 120, pos = [], dep = [], idx = [];
  for(let j = 0; j < N; j++) for(let i = 0; i < N; i++){
    const x = P.x - S + i / (N - 1) * S * 2, z = P.z - S + j / (N - 1) * S * 2;
    pos.push(x, WATER, z); dep.push(WATER - groundH(x, z));
  }
  for(let j = 0; j < N - 1; j++) for(let i = 0; i < N - 1; i++){ const a = j * N + i, b = a + 1, c = a + N, d = c + 1;
    if(Math.max(dep[a], dep[b], dep[c], dep[d]) > -0.3) idx.push(a, c, b, b, c, d); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('depth', new THREE.Float32BufferAttribute(dep, 1));
  g.setIndex(idx);
  const mat = new THREE.ShaderMaterial({ transparent:true, depthWrite:false, fog:true,
    uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { t:{ value:0 }, env:{ value:null }, sunDir:{ value:new THREE.Vector3() }, sunCol:{ value:new THREE.Color() } }]),
    vertexShader:`attribute float depth; varying float vD; varying vec3 vW; varying vec3 vV;
      #include <fog_pars_vertex>
      void main(){ vD = depth; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vV = cameraPosition - w.xyz;
        vec4 mvPosition = viewMatrix * w; gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader:`uniform float t; uniform samplerCube env; uniform vec3 sunDir; uniform vec3 sunCol; varying float vD; varying vec3 vW; varying vec3 vV;
      #include <fog_pars_fragment>
      float h(vec2 p){ return sin(p.x * 1.7 + t * 1.3) * sin(p.y * 1.3 - t * 1.1) * 0.5 + sin(p.x * 3.9 - p.y * 2.7 + t * 2.3) * 0.25 + sin(p.x * 7.1 + p.y * 6.3 - t * 3.1) * 0.12; }
      void main(){
        vec2 p = vW.xz * 0.8; float e = 0.05;
        float amp = 0.12 / (1.0 + length(vV) * 0.06);
        vec3 n = normalize(vec3(-(h(p + vec2(e, 0.0)) - h(p - vec2(e, 0.0))) * amp / e, 1.0, -(h(p + vec2(0.0, e)) - h(p - vec2(0.0, e))) * amp / e));
        vec3 v = normalize(vV);
        float fr = 0.03 + 0.97 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
        vec3 r = reflect(-v, n);
        vec3 refl = textureCube(env, vec3(-r.x, r.y, r.z)).rgb;
        // low reflections show the wall of grass around the meadow, not the sky
        refl = mix(refl, vec3(0.16, 0.24, 0.08), smoothstep(0.42, 0.08, r.y) * 0.9);
        vec3 deep = mix(vec3(0.16, 0.2, 0.09), vec3(0.05, 0.08, 0.04), clamp(vD / 2.0, 0.0, 1.0));
        vec3 col = mix(deep, refl, fr * 0.9);
        float sp = pow(max(dot(r, sunDir), 0.0), 380.0) * 14.0 + pow(max(dot(r, sunDir), 0.0), 40.0) * 0.4;
        col += sunCol * sp;
        float a = clamp(vD / 0.35, 0.0, 1.0) * 0.92;
        gl_FragColor = vec4(col, max(a, fr * a));
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }` });
  const w = T.water = new THREE.Mesh(g, mat);
  w.renderOrder = 2;
  scene.add(w);
}
export function tickTerrain(dt, sunDir, sunCol){
  if(!T.water) return;
  const u = T.water.material.uniforms; u.t.value += dt; u.env.value = scene.background; u.sunDir.value.copy(sunDir); u.sunCol.value.copy(sunCol);
}
