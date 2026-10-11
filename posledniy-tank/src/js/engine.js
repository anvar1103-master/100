// Renderer, scene, camera, sky, lights and the automatic graphics quality.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { $, TOUCH, store, rand } from './util.js';

export const canvas = $('c');
// Graphics quality, picked once per session (switching reloads the page):
//   low «Быстрая»     Lambert materials, no shadow maps (blob shadows), no outlines — phones by default
//   medium «Средняя»  PBR materials, plain shadows, outlines, no bloom — computers by default
//   high «Красивая»   soft shadows and bloom
// On top of that the frame watcher adapts while you play: bloom off → lower resolution → shadows off, and back up.
export const LEVEL = (() => { const v = store.get('gfx', TOUCH ? 'low' : 'medium'); return ['low', 'medium', 'high'].includes(v) ? v : 'medium'; })();
export const LOW = LEVEL === 'low', HIGH = LEVEL === 'high';
const LAMBERT_DROP = ['roughness', 'metalness', 'envMapIntensity', 'roughnessMap', 'metalnessMap'];
// PBR material on medium/high, a much cheaper Lambert one on low
export function stdMat(o = {}){
  if(!LOW) return new THREE.MeshStandardMaterial(o);
  const l = Object.assign({}, o); for(const k of LAMBERT_DROP) delete l[k];
  return new THREE.MeshLambertMaterial(l);
}
export const renderer = new THREE.WebGLRenderer({ canvas, antialias:!TOUCH, powerPreference:'high-performance', stencil:false });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = !LOW;
// soft shadows cost several texture reads per pixel: phones get the plain filter
renderer.shadowMap.type = HIGH ? THREE.PCFSoftShadowMap : THREE.PCFShadowMap;

export const scene = new THREE.Scene();
export const FOG_COL = new THREE.Color('#B9A08A');   // warm evening haze
scene.fog = new THREE.Fog(FOG_COL, 48, 120);
export const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);

// ---- sky: gradient, sun glow and drifting clouds (from «Лесная война») ----
// late afternoon: a low sun off to one side (neither team stares into it), golden horizon on the sun's side,
// dusky violet on the far side
export const SUN_DIR = new THREE.Vector3(-0.86, 0.3, 0.22).normalize();
const skyU = { top:{ value:new THREE.Color('#27477E') }, hor:{ value:new THREE.Color('#FFB46A') }, hor2:{ value:new THREE.Color('#9C7FB0') }, sunDir:{ value:SUN_DIR }, t:{ value:0 }, disc:{ value:new THREE.Color('#FFA040') }, cloud:{ value:new THREE.Color('#F6C6A4') }, stars:{ value:0 } };
const skyMat = new THREE.ShaderMaterial({ side:THREE.BackSide, depthWrite:false, fog:false, uniforms:skyU,
  vertexShader:'varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader:`uniform vec3 top; uniform vec3 hor; uniform vec3 hor2; uniform vec3 sunDir; uniform float t; uniform vec3 disc; uniform vec3 cloud; uniform float stars; varying vec3 vDir;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + 1.7; a *= 0.5; } return v; }
void main(){
  vec3 d = normalize(vDir); float h = d.y;
  vec2 dxz = d.xz; float dl = length(dxz); dxz = dl > 1e-3 ? dxz / dl : vec2(0.0, 1.0);
  float side = clamp(dot(dxz, normalize(sunDir.xz)) * 0.5 + 0.5, 0.0, 1.0);
  vec3 horc = mix(hor2, hor, side * side);
  vec3 col = mix(horc, top, pow(clamp(h, 0.0, 1.0), 0.45));
  col = mix(col, horc * 0.8, clamp(-h / 0.3, 0.0, 1.0));
  float s = max(dot(d, sunDir), 0.0);
  col += disc * (pow(s, 1200.0) * 10.0 + pow(s, 40.0) * 0.55 + pow(s, 6.0) * 0.18);
  // night: a field of stars, denser and brighter toward the top
  if(stars > 0.0 && h > 0.02){
    vec2 sp = d.xz / (h + 0.35) * 90.0; vec2 cell = floor(sp); float r = hash(cell);
    float st = step(0.985, r) * smoothstep(0.42, 0.0, length(fract(sp) - 0.5)) * (0.5 + 0.5 * hash(cell + 7.0));
    col += vec3(0.85, 0.9, 1.0) * st * stars * 2.2 * smoothstep(0.02, 0.3, h);
  }
  if(h > 0.0){
    vec2 uv = d.xz / (h + 0.16) * 1.3 + vec2(t * 0.012, t * 0.005);
    float c = smoothstep(0.48, 0.78, fbm(uv)) * smoothstep(0.0, 0.25, h);
    vec3 cc = mix(cloud * vec3(0.75, 0.68, 0.85), cloud, side) * (0.85 + 0.2 * fbm(uv * 2.0 + 3.0)) + disc * pow(s, 5.0) * 0.9 * (1.0 - stars * 0.85);
    col = mix(col, cc, c * 0.9);
  }
  col = clamp(col, 0.0, 8.0); if(!(col.r == col.r && col.g == col.g && col.b == col.b)) col = top;
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}` });
export const sky = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), skyMat);
sky.renderOrder = -10; sky.frustumCulled = false; scene.add(sky);
export function skyTick(dt){ skyU.t.value += dt; }

// image-based light from the sky so standard materials pick up its colours
export function buildEnv(){
  const pm = new THREE.PMREMGenerator(renderer), es = new THREE.Scene();
  es.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), skyMat));
  const gnd = new THREE.Mesh(new THREE.CircleGeometry(49, 24), new THREE.MeshBasicMaterial({ color:'#4A6A2E', side:THREE.DoubleSide }));
  gnd.rotation.x = -Math.PI / 2; gnd.position.y = -4; es.add(gnd);
  if(envRT) envRT.dispose();
  const rt = envRT = pm.fromScene(es, 0.04, 0.1, 200); pm.dispose();
  scene.environment = rt.texture;
}

// render the sky (with its clouds) into a cube texture once and use it as a plain background: nearly free per frame
let skyRT = null, envRT = null;
export function bakeSky(){
  if(skyRT) skyRT.dispose();
  const rt = skyRT = new THREE.WebGLCubeRenderTarget(LOW ? 256 : 512, { type:THREE.HalfFloatType });
  const cc = new THREE.CubeCamera(0.5, 400, rt), es = new THREE.Scene();
  const m = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat); es.add(m);
  cc.update(renderer, es);
  scene.background = rt.texture;
  sky.visible = false;
}

export const hemi = new THREE.HemisphereLight('#AFC2EC', '#4E5E2C', 0.8); scene.add(hemi);
export const sun = new THREE.DirectionalLight('#FFC88C', 2.5);
// Lambert materials get no light from the sky image: a stronger sky light makes up for it
if(LOW){ hemi.intensity = 1.55; sun.intensity = 2.3; }
sun.castShadow = true;
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);
// the time of day: sky colours, sun (or moon), ambient light, haze and exposure; the sky and its light are re-baked
export function setSky(c){
  for(const k of ['top', 'hor', 'hor2', 'disc', 'cloud']) skyU[k].value.set(c[k]);
  skyU.stars.value = c.stars || 0;
  SUN_DIR.set(c.dir[0], c.dir[1], c.dir[2]).normalize();
  sun.color.set(c.sunC); sun.intensity = c.sunI * (LOW ? 0.92 : 1);
  hemi.color.set(c.hs); hemi.groundColor.set(c.hg); hemi.intensity = c.hi * (LOW ? 1.94 : 1);
  FOG_COL.set(c.fog); scene.fog.color.copy(FOG_COL);
  renderer.toneMappingExposure = c.exp;
  sun.position.copy(SUN_DIR).multiplyScalar(70);
  buildEnv(); bakeSky();
}
// the arena is small: one fixed shadow box covers all of it
export function fitShadow(halfX, halfZ){
  const c = sun.shadow.camera, r = Math.hypot(halfX, halfZ) + 3;
  c.left = -r; c.right = r; c.top = r; c.bottom = -r; c.near = 1; c.far = 160; c.updateProjectionMatrix();
  sun.position.copy(SUN_DIR).multiplyScalar(70); sun.target.position.set(0, 0, 0);
}

// ---- canvas textures ----
export function canvasTex(w, h, draw, opt = {}){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = opt.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  if(opt.repeat){ t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  t.anisotropy = 4;
  return t;
}

// ---- quality ----
export const Q = { level:LEVEL, PR:1, post:false, composer:null, bloom:null, perfN:0, perfSum:0, calm:0, shadows:!LOW, fps:0, frames:0, fpsT:0, onShadows:null };
// sharpness: how many screen pixels per CSS pixel the game draws; perfWatch lowers it on slow devices and raises it back
export function maxPR(){ return Math.min(HIGH ? 2.25 : LOW ? 1.5 : 2, devicePixelRatio || 1); }
const minPR = () => Math.min(LOW ? 0.8 : 0.75, devicePixelRatio || 1);
export function resize(){
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = camera.userData.baseFov = camera.aspect < 0.75 ? 72 : camera.aspect < 1.2 ? 62 : 55;
  camera.updateProjectionMatrix();
  if(Q.composer){ Q.composer.setPixelRatio(Q.PR); Q.composer.setSize(w, h); }
}
function initPost(){
  if(Q.composer) return;
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type:THREE.HalfFloatType, samples:2 });
  Q.composer = new EffectComposer(renderer, rt);
  Q.composer.addPass(new RenderPass(scene, camera));
  Q.bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.35, 0.5, 0.92);
  Q.composer.addPass(Q.bloom);
  Q.composer.addPass(new OutputPass());
}
// a new level is stored and the page reloads (materials and shadows are chosen at start)
export function setQuality(level){ store.set('gfx', level); }
export function applyQuality(){
  Q.PR = Math.min(maxPR(), LOW ? 1.25 : HIGH ? 1.75 : 1.5); renderer.setPixelRatio(Q.PR);   // start sharp; perfWatch adapts
  scene.fog.near = LOW ? 30 : 40; scene.fog.far = LOW ? 85 : 110; camera.far = 160; camera.updateProjectionMatrix();
  const sz = HIGH ? 2048 : 1024;
  if(sun.shadow.mapSize.x !== sz){ sun.shadow.mapSize.set(sz, sz); if(sun.shadow.map){ sun.shadow.map.dispose(); sun.shadow.map = null; } }
  if(HIGH){ try{ initPost(); }catch(e){ Q.composer = null; } }
  Q.post = HIGH && !!Q.composer;
  Q.perfN = Q.perfSum = Q.calm = 0;
  resize();
}
// turning shadow maps off mid-game: every material has to be rebuilt once without them
function dropShadows(){
  Q.shadows = false; renderer.shadowMap.enabled = false;
  scene.traverse(o => { if(o.material) for(const m of [].concat(o.material)) m.needsUpdate = true; });
  if(Q.onShadows) Q.onShadows(false);
}
// called every frame with the raw frame time: keeps the game near 60 fps
export function perfWatch(raw, active){
  Q.frames++; Q.fpsT += raw;
  if(Q.fpsT >= 0.5){ Q.fps = Math.round(Q.frames / Q.fpsT); Q.frames = 0; Q.fpsT = 0; }
  if(!active || raw > 0.5 || document.hidden) return;
  Q.perfN++; Q.perfSum += raw;
  if(Q.perfN < 60) return;
  const avg = Q.perfSum / Q.perfN; Q.perfN = 0; Q.perfSum = 0;
  if(avg > 0.0205){
    Q.calm = 0;
    if(Q.post){ Q.post = false; Q.noPost = true; }
    else if(Q.PR > minPR() + 0.01){ Q.PR = Math.max(minPR(), Q.PR * 0.88); renderer.setPixelRatio(Q.PR); resize(); }
    else if(Q.shadows && ++Q.slow >= 2) dropShadows();
  } else if(avg < 0.0135 && ++Q.calm >= 3){
    Q.calm = 0; Q.slow = 0;
    if(Q.PR < maxPR() - 0.01){ Q.PR = Math.min(maxPR(), Q.PR * 1.1); renderer.setPixelRatio(Q.PR); resize(); }
    else if(!Q.post && Q.composer && HIGH && !Q.noPost) Q.post = true;
  }
}
Q.slow = 0;
export function render(){ if(Q.post && Q.composer) Q.composer.render(); else renderer.render(scene, camera); }
export const rnd = rand;
