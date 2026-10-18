// Renderer, scene, cameras, the graphics level and the frame watcher that keeps it smooth.
// Two levels, chosen in the settings (switching reloads the page):
//   medium «Средняя»   bloom, film grain, vignette; live lamps without shadows; plain floor — for weaker PCs
//   high «Красивая»    + ambient occlusion, reflections in wet floor, shadows from the nearest lamps and the
//                      flashlight, MSAA, higher resolution — the default on desktops
import * as THREE from 'three';
import { $, store, clamp } from './util.js';

export const canvas = $('c');
export const LEVEL = (() => { const v = store.get('gfx', 'high'); return v === 'medium' ? 'medium' : 'high'; })();
export const HIGH = LEVEL === 'high';
export const VM_LAYER = 1;           // the first-person gun and arms

let gl2 = true;
try{ gl2 = !!document.createElement('canvas').getContext('webgl2'); }catch(e){ gl2 = false; }
export const WEBGL2 = gl2;

export const renderer = new THREE.WebGLRenderer({ canvas, antialias:false, powerPreference:'high-performance', stencil:false, alpha:false });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.NoToneMapping;          // the effect pass tone-maps
renderer.shadowMap.enabled = HIGH;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.autoClear = false;

export const scene = new THREE.Scene();
// stale office air: a warm haze that swallows the far end of long halls
export const FOG_COL = new THREE.Color('#2A2412');
scene.fog = new THREE.FogExp2(FOG_COL, 0.028);
scene.background = new THREE.Color('#060504');
export const camera = new THREE.PerspectiveCamera(75, 1, 0.04, 140);
// a dim yellow office around everything, for reflections in metal (guns, lamp housings) and a little fill light
export function bakeEnv(){
  const pm = new THREE.PMREMGenerator(renderer), env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 10), new THREE.MeshBasicMaterial({ color:'#5A4E24', side:THREE.BackSide }));
  const lamp = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 2.4).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color:new THREE.Color(6, 5.6, 4.6), side:THREE.DoubleSide })); lamp.position.y = 1.45;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color:'#2E2414' })); floor.position.y = -1.45;
  env.add(room, lamp, floor);
  scene.environment = pm.fromScene(env, 0.04).texture; scene.environmentIntensity = 0.35; pm.dispose();
}
camera.layers.set(0);
export const vmCam = new THREE.PerspectiveCamera(54, 1, 0.01, 10);
vmCam.layers.set(VM_LAYER);
export const VM = { proj:{ value:new THREE.Matrix4() }, fov:54, clip:{ value:0 } };

// ---- viewmodel material: same lighting, own projection, depth squeezed in front of everything (from Microgang) ----
export function vmMaterial(mat){
  const prev = mat.onBeforeCompile;
  mat.onBeforeCompile = (s, r) => {
    if(prev) prev(s, r);
    s.uniforms.vmProj = VM.proj; s.uniforms.vmClip = VM.clip;
    s.vertexShader = s.vertexShader.replace('void main() {', 'uniform mat4 vmProj;\nvoid main() {')
      .replace('#include <project_vertex>', `#include <project_vertex>
      gl_Position = vmProj * mvPosition;
      gl_Position.z = (gl_Position.z / gl_Position.w * 0.02 - 0.98) * gl_Position.w;`);
    s.fragmentShader = s.fragmentShader.replace('void main() {', 'uniform float vmClip;\nvoid main() {')
      .replace(/}\s*$/, '  gl_FragColor.a = 0.0;\n}');
    if(s.fragmentShader.includes('vViewPosition')) s.fragmentShader = s.fragmentShader.replace('void main() {\n', 'void main() {\n  if(length(vViewPosition) < vmClip) discard;\n');
  };
  mat.customProgramCacheKey = () => 'vm' + (prev ? prev.toString().length : 0);
  return mat;
}

const texLoader = new THREE.TextureLoader();
export function loadTex(name, o = {}){
  return new Promise(res => texLoader.load('assets/tex/' + name, t => {
    t.colorSpace = o.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = HIGH ? 8 : 4;
    res(t);
  }, undefined, () => res(null)));
}
export function canvasTex(w, h, draw, opt = {}){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = opt.linear ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  if(opt.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

// ---- size and quality ----
export const Q = { level:LEVEL, PR:1, fps:0, frames:0, fpsT:0, perfN:0, perfSum:0, calm:0, onResize:[] };
export function maxPR(){ return Math.min(HIGH ? 1.6 : 1.15, devicePixelRatio || 1); }
const minPR = () => Math.min(HIGH ? 0.75 : 0.6, devicePixelRatio || 1);
export function baseFov(){ return clamp(store.get('fov', 82), 65, 105); }
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
// keeps the game near 60 fps by trading resolution
export function perfWatch(raw, active){
  Q.frames++; Q.fpsT += raw;
  if(Q.fpsT >= 0.5){ Q.fps = Math.round(Q.frames / Q.fpsT); Q.frames = 0; Q.fpsT = 0; }
  if(!active || raw > 0.5 || document.hidden || Q.locked) return;
  Q.perfN++; Q.perfSum += raw;
  if(Q.perfN < 60) return;
  const avg = Q.perfSum / Q.perfN; Q.perfN = 0; Q.perfSum = 0;
  if(avg > 0.0195){ Q.calm = 0; if(Q.PR > minPR() + 0.01){ Q.PR = Math.max(minPR(), Q.PR * 0.88); resize(); } }
  else if(avg < 0.0135 && ++Q.calm >= 3){ Q.calm = 0; if(Q.PR < maxPR() - 0.01){ Q.PR = Math.min(maxPR(), Q.PR * 1.08); resize(); } }
}
addEventListener('resize', () => resize());
