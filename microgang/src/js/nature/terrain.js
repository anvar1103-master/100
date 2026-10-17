// The ground of the glade: soil and moss (moss settles in the dips of the soil) and the trodden trails, packed and
// pale, that run between the zones.
import * as THREE from 'three';
import { scene, LOW } from '../engine.js';
import { groundH, mossAt, trailAt } from '../map.js';
import { natureMat } from './shaders.js';
import { soilTex, mossTex, photoSet } from './textures.js';

export const T = { ground:null };

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
    mg.push(mossAt(x, z), trailAt(x, z), 0);
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
          // trails: packed, sandy earth with a few pebble specks
          vec3 trail = mix(sC.rgb, vec3(0.66, 0.52, 0.34), 0.78) * (0.92 + 0.16 * texture2D(mgDapple, vMgWorld.xz * 0.21).r);
          col = mix(col, trail, smoothstep(0.15, 0.85, vMg.y + (texture2D(mgDapple, vMgWorld.xz * 0.08).g - 0.5) * 0.4));
          diffuseColor.rgb *= col;`)
        .replace('vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;', 'vec3 mapN = mix(texture2D(normalMap, mgSu).xyz, texture2D(mgMossN, mgMu).xyz, mgMw) * 2.0 - 1.0;')
        .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = mix(0.96, 0.85, mgMw);');
    } });
  const m = T.ground = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  scene.add(m);
}

export function tickTerrain(){}
