// «Последний гриб» (battle royale): ten fighters, each on their own, no respawns.
// Poison fog closes in from the edges; crates and fallen fighters drop power spores — experience (progress.js).
import * as THREE from 'three';
import { scene, stdMat, LOW } from './engine.js';
import { G, emit, on } from './state.js';
import { A, collide, crateAt, hitCrate, updateCrates, colOf, rowOf, tileAt } from './arena.js';
import { glow, smoke, puff, ring, sporeBurst, dmgNumber } from './fx.js';
import { rand, TAU, clamp } from './util.js';
import { sfx } from './audio.js';
import { addXP, PROG } from './progress.js';

// fog: waits, then shrinks to a small circle in the middle; damage grows the longer the match lasts.
// It closes slowly while the field is full and hurries once only a few fighters are left, so the last ones meet in
// a small circle instead of a long one-on-one in an open maze. Everyone has extra health here (no respawns).
export const ROYALE = { fighters:10, wait:25, shrink:120, r1:3.5, dps:650, dpsGrow:6, hp:1.6, dmg:0.75, calm:40, power:{ dmg:0.1, hp:400 } };
// fog speed by fighters left
const fogPace = n => n >= 8 ? 0.75 : n >= 6 ? 1 : n >= 4 ? 1.5 : n === 3 ? 2.2 : 3;

// ---------------- fog visuals: a glowing wall on the edge and a tinted floor outside it ----------------
const FOG = { group:null, wall:null, floor:null, u:{ uR:{ value:40 }, uTime:{ value:0 } } };
const fogVert = 'varying vec3 vW; varying vec2 vUv; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }';
const noise = `float h(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5); }
  float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }`;
function buildFog(){
  const g = new THREE.Group();
  // the wall: an open cylinder of drifting green-violet haze, densest at the bottom
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, LOW ? 48 : 96, 1, true).translate(0, 0.5, 0), new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, side:THREE.DoubleSide, uniforms:FOG.u, vertexShader:fogVert,
    fragmentShader:`uniform float uTime; varying vec3 vW; varying vec2 vUv; ${noise}
      void main(){ float a = atan(vW.z, vW.x) * 9.0;
        float m = n(vec2(a, vW.y * 0.9 - uTime * 0.6)) * 0.6 + n(vec2(a * 2.3 + uTime * 0.3, vW.y * 2.0 - uTime)) * 0.4;
        float k = clamp(1.0 - vUv.y, 0.0, 1.0); k = k * k;
        vec3 col = mix(vec3(0.42, 0.85, 0.3), vec3(0.62, 0.35, 0.95), m);
        gl_FragColor = vec4(col * 1.2, clamp((0.25 + m * 0.6) * k + 0.08 * k, 0.0, 0.85));
        #include <colorspace_fragment>
      }` }));
  wall.scale.set(40, 6, 40); wall.renderOrder = 4; wall.frustumCulled = false;
  // the floor outside the circle: a big plane that discards everything inside
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(140, 140).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, uniforms:FOG.u, vertexShader:fogVert,
    fragmentShader:`uniform float uR; uniform float uTime; varying vec3 vW; ${noise}
      void main(){ float d = length(vW.xz); if(d < uR - 0.6) discard;
        float k = clamp((d - uR + 0.6) / 2.0, 0.0, 1.0);
        float m = n(vW.xz * 0.35 + vec2(uTime * 0.25, -uTime * 0.18)) * 0.7 + n(vW.xz * 1.1 - uTime * 0.4) * 0.3;
        vec3 col = mix(vec3(0.35, 0.75, 0.25), vec3(0.55, 0.3, 0.85), m);
        gl_FragColor = vec4(col, k * (0.32 + m * 0.3));
        #include <colorspace_fragment>
      }` }));
  floor.position.y = 0.09; floor.renderOrder = 3; floor.frustumCulled = false;
  g.add(wall, floor); scene.add(g);
  Object.assign(FOG, { group:g, wall, floor });
}
function removeFog(){ if(FOG.group){ scene.remove(FOG.group); FOG.group.traverse(o => { if(o.geometry){ o.geometry.dispose(); o.material.dispose(); } }); FOG.group = null; } }

// ---------------- power spores on the ground ----------------
const powGeo = new THREE.OctahedronGeometry(0.24, 0);
const powMat = stdMat({ color:'#FFC93C', emissive:'#FF9A1E', emissiveIntensity:1.3, roughness:0.25, flatShading:true });
const powCore = new THREE.MeshBasicMaterial({ color:new THREE.Color('#FFF4C0').multiplyScalar(2), toneMapped:false });
const shadowGeo = new THREE.PlaneGeometry(0.7, 0.7).rotateX(-Math.PI / 2);
const shadowMat = new THREE.MeshBasicMaterial({ color:'#000', transparent:true, opacity:0.25, depthWrite:false });
function addPower(x, z, vx, vz, vy = 4){
  const m = new THREE.Mesh(powGeo, powMat); m.castShadow = !LOW;
  const core = new THREE.Mesh(powGeo, powCore); core.scale.setScalar(0.45); m.add(core);
  const sh = new THREE.Mesh(shadowGeo, shadowMat); sh.renderOrder = 1; sh.scale.setScalar(0.6);
  scene.add(m, sh);
  G.pickups.push({ kind:'power', x, z, y:0.6, vx, vz, vy, t:0, m, sh, landed:false, ph:rand(0, TAU) });
}
function removePickup(i){ const p = G.pickups[i]; scene.remove(p.m, p.sh); G.pickups.splice(i, 1); }

export function startRoyale(){
  const R0 = Math.hypot(A.hx, A.hz) + 1.5;
  G.match = { mode:'br', t:0, over:false, winner:null, respawn:false, count:[0, 0], alive:ROYALE.fighters, place:0, fog:{ r:R0, r0:R0, tick:0, shrinking:false }, crates:0 };
  removeFog(); buildFog();
  FOG.u.uR.value = R0;
}
export function clearRoyale(){ removeFog(); $tint(0); }

// a spore picked up: experience
export function addPowerTo(f, n = 1){
  addXP(f, PROG.orbXP * n);
  if(f === G.me) dmgNumber(f.x, f.H.height + 0.3, f.z, PROG.orbXP * n, 'xp');
}

on('kill', (f, src) => {
  const M = G.match; if(!M || M.mode !== 'br' || M.over) return;
  // a fallen tank spills spores: more the higher its level
  const n = Math.max(2, (f.lvl || 1) - 1);
  for(let i = 0; i < n; i++){ const a = i / n * TAU + rand(-0.3, 0.3), s = rand(1.2, 2.6); addPower(f.x, f.z, Math.sin(a) * s, Math.cos(a) * s, rand(3, 5)); }
  M.alive = G.fighters.filter(o => o.alive).length;
  f.place = M.alive + 1;
  if(f === G.me){ M.place = f.place; return finish(-1, 'out'); }
  if(M.alive <= 1){
    const w = G.fighters.find(o => o.alive);
    if(w){ w.place = 1; if(w === G.me) M.place = 1; }
    finish(w ? w.team : -1, 'last');
  }
});
on('crateBreak', k => {
  if(!G.match || G.match.mode !== 'br') return;
  G.match.crates++;
  puff(smoke, k.x, 0.6, k.z, { n:14, color:'#A87645', sp:3, upMin:0.4, vy:3, life:0.7, s0:0.25, s1:0.08, grav:6, drag:1.5 });
  sporeBurst(k.x, 0.7, k.z, '#FFC93C', 14);
  sfx('hit_wall', k, 1.3, 0.6);
  // an ordinary crate holds two spores, an armoured one five
  const n = k.big ? 5 : 2;
  for(let i = 0; i < n; i++){ const a = i / n * TAU + rand(-0.4, 0.4), s = rand(0.5, 1.6); addPower(k.x, k.z, Math.sin(a) * s, Math.cos(a) * s, rand(4, 5.5)); }
});

// shots, blasts and beams damage crates through these helpers (called from combat.js)
export function damageCrateAt(x, z, dmg){
  const c = colOf(x), r = rowOf(z);
  if(tileAt(c, r) !== 'C') return false;
  const k = crateAt(c, r); if(!k) return false;
  if(hitCrate(k, dmg)) emit('crateBreak', k);
  return true;
}
export function damageCrate(k, dmg){ if(hitCrate(k, dmg)) emit('crateBreak', k); }
export function damageCratesIn(x, z, rad, dmg){
  for(const k of A.crates) if(k.alive && Math.hypot(k.x - x, k.z - z) < rad + 0.75) damageCrate(k, dmg);
}

let tintEl = null, tintK = -1;
function $tint(k){
  tintEl = tintEl || document.getElementById('fogtint');
  if(!tintEl) return;
  k = Math.round(k * 20) / 20;
  if(k !== tintK){ tintK = k; tintEl.style.opacity = k; }
}
export const fogR = () => G.match && G.match.mode === 'br' ? G.match.fog.r : 1e9;
// where the fog will be a few seconds from now (bots plan ahead)
export function fogAhead(sec){
  const M = G.match; if(!M || M.mode !== 'br') return 1e9;
  const F = M.fog, run = Math.max(0, M.t + sec - Math.max(M.t, ROYALE.wait));
  return Math.max(ROYALE.r1, F.r - fogSpeed(M) * run);
}
const fogSpeed = M => (M.fog.r0 - ROYALE.r1) / ROYALE.shrink * fogPace(M.alive);

const P = { x:0, z:0 };
export function updateRoyale(dt, t){
  const M = G.match; if(!M || M.mode !== 'br') return;
  FOG.u.uTime.value = t;
  updateCrates(dt);
  const F = M.fog;
  if(G.state === 'play' && !M.over){
    M.t += dt;
    const was = F.shrinking;
    if(M.t >= ROYALE.wait) F.r = Math.max(ROYALE.r1, F.r - fogSpeed(M) * dt);
    F.shrinking = M.t >= ROYALE.wait && F.r > ROYALE.r1;
    if(F.shrinking && !was) emit('fogStart');
    // fog damage, twice a second
    F.tick -= dt;
    if(F.tick <= 0){
      F.tick = 0.5;
      const dps = ROYALE.dps + ROYALE.dpsGrow * M.t;
      for(const f of G.fighters) if(f.alive && Math.hypot(f.x, f.z) > F.r){ f.inFog = (f.inFog || 0) + 1; emit('fogHurt', f, dps * 0.5); }
    }
  }
  FOG.u.uR.value = F.r;
  if(FOG.wall) FOG.wall.scale.set(F.r, 6, F.r);
  const me = G.me;
  $tint(me && me.alive && Math.hypot(me.x, me.z) > F.r && G.state !== 'end' ? 0.85 : 0);
  if(me && me.alive && Math.hypot(me.x, me.z) > F.r - 3 && Math.random() < dt * 8){
    const a = rand(0, TAU), d = rand(1, 4);
    puff(smoke, me.x + Math.sin(a) * d, rand(0.3, 1.6), me.z + Math.cos(a) * d, { n:1, color:Math.random() < 0.5 ? '#8BD86A' : '#A77CF0', sp:0.3, vy:0.3, life:1.4, s0:0.5, s1:1.1, drag:0.5, soft:true, a:0.35 });
  }
  // power spores: arc out, bounce, then bob and spin waiting to be picked up
  for(let i = G.pickups.length - 1; i >= 0; i--){
    const p = G.pickups[i]; p.t += dt;
    if(!p.landed){
      p.vy -= 16 * dt; p.x += p.vx * dt; p.z += p.vz * dt; p.y += p.vy * dt;
      P.x = p.x; P.z = p.z; if(collide(P, 0.25)){ p.x = P.x; p.z = P.z; p.vx *= -0.4; p.vz *= -0.4; }
      if(p.y < 0.5){ p.y = 0.5; if(Math.abs(p.vy) > 2){ p.vy = -p.vy * 0.4; p.vx *= 0.6; p.vz *= 0.6; } else p.landed = true; }
    }
    const bob = p.landed ? Math.sin(t * 3 + p.ph) * 0.08 : 0;
    p.m.position.set(p.x, p.y + bob, p.z); p.m.rotation.y = t * 2 + p.ph;
    p.sh.position.set(p.x, 0.04, p.z);
    if(Math.random() < dt * 3) glow.emit({ x:p.x + rand(-0.2, 0.2), y:p.y, z:p.z + rand(-0.2, 0.2), vx:0, vy:0.5, vz:0, life:0.6, t:0, s0:0.08, s1:0.01, r:1, g:0.8, b:0.3, a:1, grav:0, drag:0.5, soft:1 });
    if(p.t < 0.35 || G.state !== 'play') continue;
    for(const f of G.fighters){
      if(!f.alive || (f.x - p.x) ** 2 + (f.z - p.z) ** 2 > 0.9 * 0.9) continue;
      removePickup(i); addPowerTo(f, 1);
      puff(glow, f.x, 1.0, f.z, { n:12, color:'#FFD45A', sp:2, vy:1.5, life:0.45, s0:0.18, s1:0.02, soft:true });
      ring(f.x, f.z, 0.3, 1.2, 0.4, '#FFC93C');
      sfx('gem', f, f === G.me ? 1 : 0.6, 0.85 + Math.min(10, f.lvl || 1) * 0.03);
      emit('power', f);
      break;
    }
  }
}
function finish(team, why){
  const M = G.match; M.over = true; M.winner = team; M.why = why;
  emit('matchOver', team, why);
}

// shader warm-up at boot: the fog and a power spore, so the first royale match doesn't stall on compiling
export function royaleSamples(){
  buildFog(); const list = [...FOG.group.children]; scene.remove(FOG.group); FOG.group = null;
  const m = new THREE.Mesh(powGeo, powMat); m.add(new THREE.Mesh(powGeo, powCore)); list.push(m, new THREE.Mesh(shadowGeo, shadowMat));
  return list;
}
