// The frame: world pass, (ambient occlusion on «Красивая»), the gun-in-hands pass, bloom and tone mapping, then the
// «body camera» pass: a touch of barrel distortion, colour fringes toward the edges, film grain that crawls in the
// dark, vignette, a tired office colour grade, the red edge of pain. The wet-floor reflection is rendered before.
import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass, ClearPass, Effect, EffectAttribute, BlendFunction, BloomEffect, ToneMappingEffect, ToneMappingMode, SMAAEffect, SMAAPreset } from 'postprocessing';
import { N8AOPostPass } from 'n8ao';
import { renderer, scene, camera, vmCam, HIGH, Q } from './engine.js';
import { renderReflection } from './level/reflect.js';

export const P = { composer:null, bloom:null, ao:null, cam:null, hurt:0, flash:0, aim:0 };

class BodycamEffect extends Effect {
  constructor(){
    super('BodycamEffect', `
uniform float time; uniform float grain; uniform float vig; uniform float ca; uniform float distort; uniform float hurt; uniform float flash; uniform float sat;
float bcH(vec2 p){ p = fract(p * vec2(443.897, 441.423)); p += dot(p, p.yx + 19.19); return fract((p.x + p.y) * p.x); }
void mainImage(const in vec4 inputColor, const in vec2 uv0, out vec4 outputColor){
  // barrel distortion of a wide body-camera lens, colour fringes growing toward the edges
  vec2 c0 = uv0 - 0.5; vec2 uv = 0.5 + c0 * (1.0 - distort * 0.25 + distort * dot(c0, c0));
  vec2 c = uv - 0.5; float r2 = dot(c, c);
  vec2 off = c * ca * r2 * 2.0;
  vec3 col = vec3(texture2D(inputBuffer, uv + off).r, texture2D(inputBuffer, uv).g, texture2D(inputBuffer, uv - off).b);
  float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
  // grade: a little drained, warm mids, cool blacks
  col = mix(vec3(l), col, sat);
  col = col * vec3(1.03, 1.0, 0.92) + vec3(0.0, 0.004, 0.012) * (1.0 - l);
  // grain: stronger in the dark, like a small sensor pushed hard
  float n = bcH(uv * resolution + fract(time * 13.7) * 91.0) - 0.5;
  col += n * grain * (0.35 + 0.65 * (1.0 - clamp(l * 1.6, 0.0, 1.0)));
  float v = smoothstep(0.95, 0.18, length(c * vec2(1.25, 1.0)));
  col *= mix(1.0 - vig, 1.0, v);
  // pain: colour drains and the edges go red
  float e = smoothstep(0.2, 0.75, length(c));
  col = mix(col, vec3(l) * vec3(1.0, 0.72, 0.66), hurt * e * 0.75);
  col += vec3(0.9, 0.06, 0.02) * hurt * e * e * 0.35;
  col += flash;
  outputColor = vec4(clamp(col, 0.0, 1.0), inputColor.a);
}`, { attributes:EffectAttribute.CONVOLUTION, blendFunction:BlendFunction.NORMAL, uniforms:new Map([
      ['time', new THREE.Uniform(0)], ['grain', new THREE.Uniform(0.045)], ['vig', new THREE.Uniform(0.42)], ['ca', new THREE.Uniform(0.012)],
      ['distort', new THREE.Uniform(0.16)], ['hurt', new THREE.Uniform(0)], ['flash', new THREE.Uniform(0)], ['sat', new THREE.Uniform(0.88)] ]) });
  }
}

export function initPost(){
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const C = P.composer = new EffectComposer(renderer, { frameBufferType:THREE.HalfFloatType, multisampling:HIGH ? Math.min(4, renderer.capabilities.maxSamples || 0) : 0 });
  C.addPass(new RenderPass(scene, camera));
  if(HIGH){
    const ao = P.ao = new N8AOPostPass(scene, camera, size.x, size.y);
    Object.assign(ao.configuration, { aoRadius:1.1, distanceFalloff:0.8, intensity:2.4, color:new THREE.Color('#0E0A04'), halfRes:true, gammaCorrection:false, aoSamples:12, denoiseSamples:6 });
    C.addPass(ao);
  }
  // the gun: clear only the depth, keep the world's for the effects (the gun marks itself with alpha 0)
  const vm = new RenderPass(scene, vmCam);
  vm.clearPass.setClearFlags(false, true, false); vm.ignoreBackground = true; vm.skipShadowMapUpdate = true; vm.needsDepthBlit = false;
  C.addPass(vm);
  C.addPass(new ClearPass(false, true, false));
  P.bloom = new BloomEffect({ intensity:HIGH ? 0.85 : 0.7, luminanceThreshold:0.82, luminanceSmoothing:0.3, mipmapBlur:true, radius:0.78 });
  const fx = [P.bloom, new ToneMappingEffect({ mode:ToneMappingMode.ACES_FILMIC })];
  if(!HIGH) fx.push(new SMAAEffect({ preset:SMAAPreset.MEDIUM }));
  C.addPass(new EffectPass(camera, ...fx));
  P.cam = new BodycamEffect();
  C.addPass(new EffectPass(camera, P.cam));
  Q.onResize.push((w, h) => { C.setSize(w, h); });
}

export function renderFrame(dt){
  vmCam.position.copy(camera.position); vmCam.quaternion.copy(camera.quaternion); vmCam.updateMatrixWorld();
  renderer.shadowMap.needsUpdate = HIGH;      // drawn once, by whichever pass renders first
  renderReflection();
  const u = P.cam.uniforms;
  u.get('time').value += dt || 0.016;
  u.get('hurt').value = P.hurt; u.get('flash').value = P.flash;
  P.composer.render(dt);
}
