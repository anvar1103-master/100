// Renderer, scene, cameras, sun and sky, the graphics quality and the frame watcher that keeps it smooth.
import * as THREE from 'three';
import { $, store, clamp } from './util.js';

export const canvas = $('c');
// Graphics quality, chosen in the settings (switching reloads the page):
//   low «Быстрая»     no post-processing, small shadow map, fewer grass blades
//   medium «Средняя»  post: bloom, far blur, colour grade, MSAA; 2048 shadows — the default
//   high «Красивая»   + ambient occlusion, sun rays, denser grass, 4096 shadows, higher resolution
export const LEVEL = (() => { const v = store.get('gfx', 'medium'); return ['low', 'medium', 'high'].includes(v) ? v : 'medium'; })();
export const LOW = LEVEL === 'low', HIGH = LEVEL === 'high';
export const VM_LAYER = 1;           // the first-person arms and gun

let gl2 = true;
try{ const t = document.createElement('canvas').getContext('webgl2'); gl2 = !!t; }catch(e){ gl2 = false; }
export const WEBGL2 = gl2;

export const renderer = new THREE.WebGLRenderer({ canvas, antialias:LOW, powerPreference:'high-performance', stencil:false, alpha:false });
renderer.outputColorSpace = THREE.SRGBColorSpace;
// with post-processing the tone mapping happens in the last effect pass; without it the renderer does it
renderer.toneMapping = LOW ? THREE.AgXToneMapping : THREE.NoToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;   // rendered once per frame by render(), not again for the arms pass
renderer.autoClear = false;

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(72, 1, 0.05, 1600);
camera.layers.set(0);
// the arms and gun are drawn in a second pass with their own field of view (see vmMaterial)
export const vmCam = new THREE.PerspectiveCamera(52, 1, 0.01, 10);
vmCam.layers.set(VM_LAYER);
export const VM = { proj:{ value:new THREE.Matrix4() }, fov:52, env:null, clip:{ value:0 } };

// ---- sun and sky ----
// late golden afternoon: the sun is low, so tall grass glows against it and throws long shadows
export const SUN_DIR = new THREE.Vector3(-0.62, 0.36, -0.7).normalize();
export const SUN_COL = new THREE.Color('#FFD7A0');
export const FOG_COL = new THREE.Color('#C9D6B8');
scene.fog = new THREE.Fog(FOG_COL, 140, 1500);

const skyU = { top:{ value:new THREE.Color('#5D8FCB') }, hor:{ value:new THREE.Color('#F4DDB0') }, low:{ value:new THREE.Color('#B9C7A0') },
  sunDir:{ value:SUN_DIR }, sunCol:{ value:new THREE.Color('#FFE2B0') }, cloud:{ value:new THREE.Color('#FFF4E2') } };
export const skyMat = new THREE.ShaderMaterial({ side:THREE.BackSide, depthWrite:false, fog:false, uniforms:skyU,
  vertexShader:'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader:`uniform vec3 top; uniform vec3 hor; uniform vec3 low; uniform vec3 sunDir; uniform vec3 sunCol; uniform vec3 cloud; varying vec3 vDir;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }
void main(){
  vec3 d = normalize(vDir); float h = d.y;
  float s = max(dot(d, sunDir), 0.0);
  vec3 col = mix(hor, top, pow(clamp(h, 0.0, 1.0), 0.55));
  col = mix(col, low, clamp(-h * 3.0, 0.0, 1.0));
  // warm light scattered around the sun
  col += sunCol * (pow(s, 6.0) * 0.35 + pow(s, 48.0) * 0.6);
  col += sunCol * pow(s, 2400.0) * 40.0;
  if(h > 0.0){
    vec2 uv = d.xz / (h + 0.2) * 1.6;
    float c = smoothstep(0.5, 0.82, fbm(uv)) * smoothstep(0.0, 0.3, h);
    vec3 cc = cloud * (0.82 + 0.25 * fbm(uv * 2.3 + 4.0)) + sunCol * pow(s, 4.0) * 0.8;
    col = mix(col, cc, c * 0.75);
  }
  col = clamp(col, 0.0, 60.0);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}` });

export const hemi = new THREE.HemisphereLight('#D8E6FF', '#6A7A44', 1.35);
export const sun = new THREE.DirectionalLight(SUN_COL, 2.8);
sun.castShadow = true;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.08;
sun.shadow.mapSize.set(LOW ? 1024 : HIGH ? 4096 : 2048, LOW ? 1024 : HIGH ? 4096 : 2048);
sun.shadow.radius = 2;
const SH = LOW ? 36 : 52;   // half size of the shadow box around the player
{ const c = sun.shadow.camera; c.left = -SH; c.right = SH; c.top = SH; c.bottom = -SH; c.near = 1; c.far = 400; c.updateProjectionMatrix(); }
for(const l of [hemi, sun]) l.layers.enableAll();
scene.add(hemi, sun, sun.target);

// the shadow box follows a point (the player), snapped to whole shadow texels so shadows don't shimmer
const _sv = new THREE.Vector3();
export function shadowFollow(x, y, z){
  const texel = SH * 2 / sun.shadow.mapSize.x;
  // move in light space: snap the light-space x/y of the centre
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), SUN_DIR);
  _sv.set(x, y, z).applyQuaternion(q.clone().invert());
  _sv.x = Math.round(_sv.x / texel) * texel; _sv.y = Math.round(_sv.y / texel) * texel;
  _sv.applyQuaternion(q);
  sun.target.position.copy(_sv);
  sun.position.copy(_sv).addScaledVector(SUN_DIR, 200);
  sun.target.updateMatrixWorld(); sun.updateMatrixWorld();
}

// sky into a cube texture once (a plain background, nearly free) and image-based light from it
let skyRT = null, envRT = null, vmEnvRT = null;
export function bakeSky(){
  if(skyRT) skyRT.dispose();
  const rt = skyRT = new THREE.WebGLCubeRenderTarget(LOW ? 256 : 512, { type:THREE.HalfFloatType });
  const cc = new THREE.CubeCamera(0.5, 400, rt), es = new THREE.Scene();
  es.add(new THREE.Mesh(new THREE.SphereGeometry(100, 48, 24), skyMat));
  cc.update(renderer, es);
  scene.background = rt.texture;
  // the environment: sky above, a green-brown meadow below (what tiny warriors see around them)
  const pm = new THREE.PMREMGenerator(renderer), env = new THREE.Scene();
  env.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMat));
  const gnd = new THREE.Mesh(new THREE.SphereGeometry(48, 32, 16, 0, Math.PI * 2, Math.PI * 0.5, Math.PI * 0.5), new THREE.MeshBasicMaterial({ color:'#5A5E3C', side:THREE.BackSide }));
  env.add(gnd);
  // a ring of tall blades around the horizon tints reflections a little green
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(45, 45, 14, 32, 1, true), new THREE.MeshBasicMaterial({ color:'#76885A', side:THREE.BackSide }));
  ring.position.y = 2; env.add(ring);
  if(envRT) envRT.dispose();
  envRT = pm.fromScene(env, 0.02, 0.1, 200);
  scene.environment = envRT.texture;
  scene.environmentIntensity = 0.85;
  // the gun in your hands gets a neutral, warmer surround so brass looks like brass
  gnd.material.color.set('#6A5E4A'); ring.material.color.set('#9A8E78');
  if(vmEnvRT) vmEnvRT.dispose();
  vmEnvRT = pm.fromScene(env, 0.03, 0.1, 200); pm.dispose();
  VM.env = vmEnvRT.texture;
}

// ---- viewmodel material: same lighting, own projection, depth squeezed in front of everything ----
export function vmMaterial(mat){
  const prev = mat.onBeforeCompile;
  if(VM.env && 'envMap' in mat && !mat.envMap){ mat.envMap = VM.env; mat.envMapIntensity = 1.1; }
  mat.onBeforeCompile = (s, r) => {
    if(prev) prev(s, r);
    s.uniforms.vmProj = VM.proj; s.uniforms.vmClip = VM.clip;
    s.vertexShader = s.vertexShader.replace('void main() {', 'uniform mat4 vmProj;\nvoid main() {')
      .replace('#include <project_vertex>', `#include <project_vertex>
      gl_Position = vmProj * mvPosition;
      gl_Position.z = (gl_Position.z / gl_Position.w * 0.02 - 0.98) * gl_Position.w;`);
    // alpha 0 marks first-person pixels for the effect pass (no far blur or haze on the gun);
    // while aiming, whatever is right at your cheek (the stock) is not drawn, as in most shooters
    s.fragmentShader = s.fragmentShader.replace('void main() {', 'uniform float vmClip;\nvoid main() {')
      .replace(/}\s*$/, '  gl_FragColor.a = 0.0;\n}');
    if(s.fragmentShader.includes('vViewPosition')) s.fragmentShader = s.fragmentShader.replace('void main() {\n', 'void main() {\n  if(length(vViewPosition) < vmClip) discard;\n');
  };
  mat.customProgramCacheKey = () => 'vm' + (prev ? prev.toString().length : 0);
  return mat;
}

// ---- canvas textures ----
export function canvasTex(w, h, draw, opt = {}){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = opt.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  if(opt.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}
const texLoader = new THREE.TextureLoader();
// a texture from src/assets/tex; resolves to null when the file is missing (the caller falls back)
export function loadTex(name, o = {}){
  return new Promise(res => texLoader.load('assets/tex/' + name, t => {
    t.colorSpace = o.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
    res(t);
  }, undefined, () => res(null)));
}

// ---- size and quality ----
export const Q = { level:LEVEL, PR:1, post:!LOW, shadows:true, fps:0, frames:0, fpsT:0, perfN:0, perfSum:0, calm:0, slow:0, onResize:[] };
export function maxPR(){ return Math.min(HIGH ? 1.75 : LOW ? 1 : 1.35, devicePixelRatio || 1); }
const minPR = () => Math.min(0.7, devicePixelRatio || 1);
export function baseFov(){ return clamp(store.get('fov', 78), 60, 100); }
// vertical FOV from the horizontal one the player chose: kept horizontal up to 16:9, wider screens see more to the sides
export function vfov(hfov, aspect){ const a = Math.min(aspect, 16 / 9); return THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(hfov) / 2) / a)); }
export function resize(){
  const w = innerWidth, h = innerHeight;
  renderer.setPixelRatio(Q.PR);
  renderer.setSize(w, h, false);
  camera.aspect = vmCam.aspect = w / h;
  camera.updateProjectionMatrix();
  vmCam.fov = VM.fov; vmCam.updateProjectionMatrix(); VM.proj.value.copy(vmCam.projectionMatrix);
  for(const f of Q.onResize) f(w, h);
}
export function applyQuality(){ Q.PR = maxPR(); resize(); }
// called every frame with the raw frame time: keeps the game near 60 fps by trading resolution
export function perfWatch(raw, active){
  Q.frames++; Q.fpsT += raw;
  if(Q.fpsT >= 0.5){ Q.fps = Math.round(Q.frames / Q.fpsT); Q.frames = 0; Q.fpsT = 0; }
  if(!active || raw > 0.5 || document.hidden || Q.locked) return;
  Q.perfN++; Q.perfSum += raw;
  if(Q.perfN < 60) return;
  const avg = Q.perfSum / Q.perfN; Q.perfN = 0; Q.perfSum = 0;
  if(avg > 0.0195){
    Q.calm = 0;
    if(Q.PR > minPR() + 0.01){ Q.PR = Math.max(minPR(), Q.PR * 0.88); resize(); }
  } else if(avg < 0.0135 && ++Q.calm >= 3){
    Q.calm = 0;
    if(Q.PR < maxPR() - 0.01){ Q.PR = Math.min(maxPR(), Q.PR * 1.08); resize(); }
  }
}
addEventListener('resize', () => resize());
