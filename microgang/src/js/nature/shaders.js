// Shader pieces every plant shares: wind, bending away from fighters walking through, light shining through thin
// leaves and blades (the glow of backlit grass), and the drifting dappled shade of the huge plants overhead.
// natureMat() patches a MeshStandardMaterial with any of them.
import * as THREE from 'three';
import { mulberry } from '../util.js';

export const NU = {
  time:{ value:0 },
  windDir:{ value:new THREE.Vector2(0.8, 0.6).normalize() },
  wind:{ value:1 },
  push:{ value:Array.from({ length:16 }, () => new THREE.Vector4(0, -999, 0, 0)) },   // x, y, z, radius of fighters
  dapple:{ value:null },
  dappleK:{ value:0.55 },
  // over the shoulder: plants between the camera and your hero thin out (segment camA → camB, radius camA.w)
  camA:{ value:new THREE.Vector4(0, -999, 0, 0) },
  camB:{ value:new THREE.Vector3(0, -999, 0) },
};
export function setCamFade(a, b, r){ NU.camA.value.set(a.x, a.y, a.z, r); NU.camB.value.set(b.x, b.y, b.z); }
// a tiling soft noise texture for the dapple (and anything else that wants cheap noise)
{
  const N = 128, d = new Uint8Array(N * N * 4), r = mulberry(77);
  const g = Array.from({ length:(N / 8 + 1) ** 2 }, () => r());
  const L = N / 8 + 1;
  const val = (x, y, s) => { const gx = x / s, gy = y / s, ix = Math.floor(gx), iy = Math.floor(gy), fx = gx - ix, fy = gy - iy, n = N / s;
    const G = (a, b) => g[((a % n) + (b % n) * L) % g.length]; const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    return (G(ix, iy) * (1 - u) + G(ix + 1, iy) * u) * (1 - v) + (G(ix, iy + 1) * (1 - u) + G(ix + 1, iy + 1) * u) * v; };
  for(let y = 0; y < N; y++) for(let x = 0; x < N; x++){
    const a = val(x, y, 16) * 0.6 + val(x, y, 8) * 0.3 + val(x, y, 4) * 0.1, b = val(x + 37, y + 11, 8);
    const i = (y * N + x) * 4; d[i] = a * 255; d[i + 1] = b * 255; d[i + 2] = val(x, y, 4) * 255; d[i + 3] = 255;
  }
  const t = new THREE.DataTexture(d, N, N); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.magFilter = t.minFilter = THREE.LinearFilter; t.needsUpdate = true;
  NU.dapple.value = t;
}
export function tickNature(dt, pushers){
  NU.time.value += dt;
  const P = NU.push.value;
  for(let i = 0; i < P.length; i++){
    const f = pushers[i];
    if(f) P[i].set(f.x, f.y, f.z, f.r); else P[i].set(0, -999, 0, 0);
  }
}

const VS_HEAD = `
uniform float mgTime; uniform vec2 mgWindDir; uniform float mgWind; uniform vec4 mgPush[16];
varying vec3 vMgWorld; varying float vMgH;
// gentle sway plus travelling gusts; h01 is how far up the plant this vertex is (0 root .. 1 tip)
vec3 mgWindAt(vec3 wp, float h01, float stiff){
  float t = mgTime;
  float ph = dot(wp.xz, mgWindDir) * 0.045 - t * 1.3;
  float gust = 0.55 + 0.45 * sin(ph) * sin(ph * 0.37 + 1.7);
  float flutter = sin(t * 3.1 + wp.x * 0.7 + wp.z * 0.9) * 0.18 + sin(t * 5.3 + wp.z * 1.3) * 0.08;
  float a = (gust + flutter) * mgWind * pow(h01, 1.6) / stiff;
  vec2 d = mgWindDir * a + vec2(-mgWindDir.y, mgWindDir.x) * flutter * 0.4 * pow(h01, 1.6) / stiff;
  return vec3(d.x, -0.15 * length(d), d.y);
}
// fighters push blades aside as they walk through
vec3 mgPushAt(vec3 wp, float h01, float span){
  vec3 off = vec3(0.0);
  for(int i = 0; i < 16; i++){
    vec4 p = mgPush[i];
    vec2 d = wp.xz - p.xz; float l = length(d);
    float r = p.w * 3.2 + 0.6;
    if(l < r && wp.y > p.y - 2.0){
      float k = (1.0 - l / r); k = k * k * smoothstep(0.0, 0.2, h01) * (0.4 + h01) * span;
      off.xz += (l > 1e-3 ? d / l : vec2(1.0, 0.0)) * k;
      off.y -= k * 0.35;
    }
  }
  return off;
}`;

// o: { wind: stiffness (bigger = stiffer) or 0, windH: plant height used for h01 (instance-local y / windH),
//      push: true for grass, trans: colour of light through the leaf (or null), dapple: true, hang: bend from the top down }
export function natureMat(mat, o = {}){
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (s, r) => {
    if(prev) prev(s, r);
    s.uniforms.mgTime = NU.time; s.uniforms.mgWindDir = NU.windDir; s.uniforms.mgWind = NU.wind; s.uniforms.mgPush = NU.push;
    s.uniforms.mgDapple = NU.dapple; s.uniforms.mgDappleK = NU.dappleK;
    s.uniforms.mgCamA = NU.camA; s.uniforms.mgCamB = NU.camB;
    s.vertexShader = s.vertexShader.replace('#include <common>', '#include <common>\n' + VS_HEAD);
    // displacement happens in world space, after the instance/model transform
    let disp = '';
    if(o.wind || o.push){
      disp = `
      float mgH01 = clamp(${o.hConst != null ? o.hConst.toFixed(3) : o.hBy === 'uv' ? 'uv.y' : 'position.y / ' + (o.windH || 1).toFixed(3)}, 0.0, 1.0);
      vMgH = mgH01;
      vec3 mgOff = vec3(0.0);
      float mgIH = 1.0;
      ${o.perH ? '#ifdef USE_INSTANCING\n mgIH = length(instanceMatrix[1].xyz) * ' + o.perH.toFixed(4) + ';\n#endif' : ''}
      ${o.wind ? `mgOff += mgWindAt(mgWp.xyz, mgH01, ${o.wind.toFixed(3)}) * ${(o.windAmp || 1).toFixed(3)} * mgIH;` : ''}
      ${o.push ? `mgOff += mgPushAt(mgWp.xyz, mgH01, ${(o.pushSpan || 1).toFixed(3)} * mgIH);` : ''}
      mgWp.xyz += mgOff; mgOffW = mgOff;`;
    }
    s.vertexShader = s.vertexShader.replace('#include <project_vertex>', `
      vec3 mgOffW = vec3(0.0);
      vec4 mgWp = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        mgWp = instanceMatrix * mgWp;
      #endif
      mgWp = modelMatrix * mgWp;
      ${disp}
      vMgWorld = mgWp.xyz;
      vec4 mvPosition = viewMatrix * mgWp;
      gl_Position = projectionMatrix * mvPosition;`);
    // shadow lookups use the swayed position too
    s.vertexShader = s.vertexShader.replace('#include <worldpos_vertex>', `#include <worldpos_vertex>
      #ifdef USE_SHADOWMAP
        worldPosition.xyz += mgOffW;
      #endif`);
    let fsHead = `uniform float mgTime; uniform sampler2D mgDapple; uniform float mgDappleK; varying vec3 vMgWorld; varying float vMgH;
    float mgDappleAt(vec3 wp){
      vec2 uv = wp.xz * 0.0065 + vec2(mgTime * 0.0035, mgTime * 0.0021);
      float n = texture2D(mgDapple, uv).r * 0.7 + texture2D(mgDapple, uv * 2.7 + 0.3).g * 0.3;
      return mix(1.0, 0.32, smoothstep(0.5, 0.68, n) * mgDappleK);
    }`;
    if((o.push || o.fadeCam) && !mat.isMeshDepthMaterial){
      fsHead += `
    uniform vec4 mgCamA; uniform vec3 mgCamB;
    void mgCamFade(){
      vec3 ab = mgCamB - mgCamA.xyz, ap = vMgWorld - mgCamA.xyz;
      float t = clamp(dot(ap, ab) / max(dot(ab, ab), 1e-4), 0.0, 1.0);
      float d = length(ap - ab * t), r = mgCamA.w * (0.55 + 0.45 * t);
      float k = 1.0 - smoothstep(r * 0.55, r, d);
      if(k > 0.0 && fract(sin(dot(floor(gl_FragCoord.xy), vec2(12.9898, 78.233))) * 43758.5453) < k * 0.94) discard;
    }`;
      s.fragmentShader = s.fragmentShader.replace('void main() {', 'void main() {\n  mgCamFade();');
    }
    s.fragmentShader = s.fragmentShader.replace('#include <common>', '#include <common>\n' + fsHead);
    // the directional (sun) light: dapple shade, and light glowing through thin leaves from behind
    const trans = o.trans ? new THREE.Color(o.trans) : null;
    const add = `
      ${o.dapple !== false ? 'directLight.color *= mgDappleAt(vMgWorld);' : ''}
      ${trans ? `{
        float back = pow(saturate(dot(-geometryViewDir, directLight.direction)), 3.0);
        float wrap = saturate(-dot(geometryNormal, directLight.direction)) * 0.35 + 0.25;
        reflectedLight.directDiffuse += diffuseColor.rgb * vec3(${trans.r.toFixed(3)}, ${trans.g.toFixed(3)}, ${trans.b.toFixed(3)}) * directLight.color * (back * ${(o.transK || 1.6).toFixed(3)} + wrap * 0.35);
      }` : ''}`;
    let lfb = THREE.ShaderChunk.lights_fragment_begin;
    const i0 = lfb.indexOf('getDirectionalLightInfo');
    const j = lfb.indexOf('RE_Direct( directLight', i0), k = lfb.indexOf(';', j) + 1;
    lfb = lfb.slice(0, j) + add + '\n' + lfb.slice(j, k) + lfb.slice(k);
    s.fragmentShader = s.fragmentShader.replace('#include <lights_fragment_begin>', lfb);
    if(o.frag) o.frag(s);
  };
  const key = JSON.stringify([o.wind, o.windH, o.push, o.trans, o.dapple, o.windAmp, o.hBy, o.pushSpan, o.perH, o.transK, o.hConst, !!o.frag, o.key, o.fadeCam]);
  mat.customProgramCacheKey = () => key;
  return mat;
}
