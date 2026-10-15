// The frame: world pass, (ambient occlusion), arms-and-gun pass, then one effect pass —
// far blur and golden haze (the macro-photo look that makes everything feel huge), bloom, sun rays, tone mapping, grade.
import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, Pass, Effect, EffectAttribute, BlendFunction, BloomEffect, ToneMappingEffect, ToneMappingMode,
  KawaseBlurPass, KernelSize, GodRaysEffect } from 'postprocessing';
import { N8AOPostPass } from 'n8ao';
import { renderer, scene, camera, vmCam, LOW, HIGH, Q, SUN_DIR, SUN_COL, sun } from './engine.js';

export const P = { composer:null, macro:null, bloom:null, rays:null, ao:null, sunMesh:null, blurRT:null, aim:0 };

// far blur + haze: everything past ~45 steps softens like the background of a macro photo,
// and the air glows warm toward the sun
class MacroEffect extends Effect {
  constructor(blurTex){
    super('MacroEffect', `
uniform sampler2D blurTex; uniform vec2 farRange; uniform float maxBlur; uniform vec3 hazeCol; uniform vec3 sunCol; uniform vec3 sunView;
uniform mat4 projInv; uniform float hazeK; uniform float aim;
void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor){
  float vz = -getViewZ(depth);
  if(inputColor.a < 0.5){ outputColor = vec4(inputColor.rgb, 1.0); return; }   // the first-person gun stays sharp
  bool sky = depth >= 0.99999;
  float k = sky ? 1.0 : smoothstep(farRange.x, farRange.y, vz);
  // aiming down the sights pulls the focus in a little tighter around the centre
  // aiming down the sights: distant things come into focus (you need to see your target)
  k *= 1.0 - aim * 0.75;
  vec3 b = texture2D(blurTex, uv).rgb;
  vec3 c = mix(inputColor.rgb, b, k * maxBlur);
  vec4 vp = projInv * vec4(uv * 2.0 - 1.0, 1.0, 1.0); vec3 vd = normalize(vp.xyz / vp.w);
  float s = max(dot(vd, sunView), 0.0);
  float hz = sky ? 0.0 : (1.0 - exp(-max(vz - 12.0, 0.0) * hazeK));
  vec3 hcol = hazeCol + sunCol * (pow(s, 5.0) * 0.9 + pow(s, 24.0) * 1.2);
  c = mix(c, hcol, hz * 0.4);
  outputColor = vec4(c, inputColor.a);
}`, { attributes:EffectAttribute.DEPTH, uniforms:new Map([
      ['blurTex', new THREE.Uniform(blurTex)], ['farRange', new THREE.Uniform(new THREE.Vector2(60, 230))], ['maxBlur', new THREE.Uniform(0.8)],
      ['hazeCol', new THREE.Uniform(new THREE.Color('#B9C9A8'))], ['sunCol', new THREE.Uniform(new THREE.Color('#FFC27A'))],
      ['sunView', new THREE.Uniform(new THREE.Vector3())], ['projInv', new THREE.Uniform(new THREE.Matrix4())],
      ['hazeK', new THREE.Uniform(0.0018)], ['aim', new THREE.Uniform(0)] ]) });
  }
}
// gentle colour grade and vignette after tone mapping: lifted warm shadows, rich greens, golden highlights
class GradeEffect extends Effect {
  constructor(){
    super('GradeEffect', `
uniform float sat; uniform float contrast; uniform vec3 lift; uniform vec3 gain; uniform float vig; uniform float hurt;
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
  vec3 c = inputColor.rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(l), c, sat);
  c = clamp((c - 0.5) * contrast + 0.5, 0.0, 1.0);
  c = c * gain + lift * (1.0 - c);
  vec2 q = uv - 0.5; q.x *= 1.25;
  float v = smoothstep(0.75, 0.2, length(q));
  c *= mix(1.0 - vig, 1.0, v);
  // low health drains the colour toward the edges
  float e = smoothstep(0.25, 0.75, length(q));
  c = mix(c, vec3(l) * vec3(1.0, 0.75, 0.7), hurt * e * 0.7);
  outputColor = vec4(c, inputColor.a);
}`, { blendFunction:BlendFunction.NORMAL, uniforms:new Map([
      ['sat', new THREE.Uniform(1.12)], ['contrast', new THREE.Uniform(1.05)], ['lift', new THREE.Uniform(new THREE.Vector3(0.02, 0.018, 0.0))],
      ['gain', new THREE.Uniform(new THREE.Vector3(1.03, 1.0, 0.94))], ['vig', new THREE.Uniform(0.32)], ['hurt', new THREE.Uniform(0)] ]) });
  }
}
// blurs the current frame into a separate small target (the chain itself stays sharp)
class BlurCopyPass extends Pass {
  constructor(rt){ super('BlurCopyPass'); this.needsSwap = false; this.rt = rt; this.blur = new KawaseBlurPass({ kernelSize:KernelSize.MEDIUM }); }
  render(r, input){ this.blur.render(r, input, this.rt); }
  setSize(w, h){ this.rt.setSize(Math.max(1, Math.round(w / 3)), Math.max(1, Math.round(h / 3))); this.blur.setSize(w / 3, h / 3); }
}

export function initPost(){
  if(LOW) return;
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const C = P.composer = new EffectComposer(renderer, { frameBufferType:THREE.HalfFloatType, multisampling:Math.min(4, renderer.capabilities.maxSamples || 0) });
  const world = new RenderPass(scene, camera);
  C.addPass(world);
  if(HIGH){
    const ao = P.ao = new N8AOPostPass(scene, camera, size.x, size.y);
    Object.assign(ao.configuration, { aoRadius:2.2, distanceFalloff:1.2, intensity:2.2, color:new THREE.Color('#1A1608'), halfRes:true, gammaCorrection:false, aoSamples:12, denoiseSamples:6 });
    C.addPass(ao);
  }
  // blur a copy of the world before the arms are drawn, so the gun never smears into the background
  P.blurRT = new THREE.WebGLRenderTarget(Math.max(1, size.x / 3), Math.max(1, size.y / 3), { type:THREE.HalfFloatType, depthBuffer:false });
  C.addPass(new BlurCopyPass(P.blurRT));
  // arms and gun: clear only the depth of this buffer, keep the world's depth for the effects (the gun marks itself with alpha 0)
  const vm = new RenderPass(scene, vmCam);
  vm.clearPass.setClearFlags(false, true, false); vm.ignoreBackground = true; vm.skipShadowMapUpdate = true; vm.needsDepthBlit = false;
  C.addPass(vm);
  P.macro = new MacroEffect(P.blurRT.texture);
  P.bloom = new BloomEffect({ intensity:0.55, luminanceThreshold:0.82, luminanceSmoothing:0.25, mipmapBlur:true, radius:0.72 });
  const fx = [P.macro, P.bloom];
  if(HIGH){
    const m = P.sunMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8), new THREE.MeshBasicMaterial({ color:SUN_COL.clone().multiplyScalar(1.6), transparent:true, depthWrite:false, fog:false }));
    m.frustumCulled = false; m.scale.setScalar(26);
    scene.add(m);
    P.rays = new GodRaysEffect(camera, m, { density:0.92, decay:0.93, weight:0.42, exposure:0.42, samples:48, clampMax:1, resolutionScale:0.5, blur:true });
    fx.push(P.rays);
  }
  const tm = new ToneMappingEffect({ mode:ToneMappingMode.ACES_FILMIC });
  P.grade = new GradeEffect();
  C.addPass(new EffectPass(camera, ...fx, tm));
  C.addPass(new EffectPass(camera, P.grade));
  Q.onResize.push((w, h) => { C.setSize(w, h); });
}

const _v = new THREE.Vector3();
export function renderFrame(){
  vmCam.position.copy(camera.position); vmCam.quaternion.copy(camera.quaternion); vmCam.updateMatrixWorld();
  renderer.shadowMap.needsUpdate = Q.shadows;
  if(P.composer && Q.post){
    const u = P.macro.uniforms;
    _v.copy(SUN_DIR).transformDirection(camera.matrixWorldInverse); u.get('sunView').value.copy(_v);
    u.get('projInv').value.copy(camera.projectionMatrixInverse);
    u.get('aim').value = P.aim;
    if(P.sunMesh) P.sunMesh.position.copy(camera.position).addScaledVector(SUN_DIR, 900);
    P.composer.render();
  } else {
    renderer.setRenderTarget(null); renderer.clear();
    renderer.render(scene, camera);
    renderer.shadowMap.needsUpdate = false;
    const bg = scene.background; scene.background = null;
    renderer.render(scene, vmCam);
    scene.background = bg;
  }
}
