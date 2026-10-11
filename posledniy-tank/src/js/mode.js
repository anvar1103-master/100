// «Споры» (3 vs 3): the mycelium in the middle releases glowing spores. Carry 10 and hold them for 15 seconds to win.
// A fighter who falls drops every spore they carried.
import * as THREE from 'three';
import { scene, stdMat } from './engine.js';
import { G, emit, on } from './state.js';
import { A } from './arena.js';
import { glow, puff, ring } from './fx.js';
import { rand, TAU, clamp } from './util.js';
import { sfx } from './audio.js';
import { collide } from './arena.js';

export const SPORES = { goal:10, hold:15, interval:5, first:4, dur:180 };

// ---------------- the mycelium (mine) ----------------
let mine = null;
const sporeGeo = new THREE.IcosahedronGeometry(0.2, 0);
const sporeMat = stdMat({ color:'#B583FF', emissive:'#8A4DFF', emissiveIntensity:1.6, roughness:0.2, flatShading:true });
const coreMat = new THREE.MeshBasicMaterial({ color:new THREE.Color('#E9D8FF').multiplyScalar(2), toneMapped:false });
const shadowTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30); gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
const shadowGeo = new THREE.PlaneGeometry(0.7, 0.7); shadowGeo.rotateX(-Math.PI / 2);
const shadowMat = new THREE.MeshBasicMaterial({ map:shadowTex, transparent:true, depthWrite:false });

export function buildMine(show = true){
  if(mine){ scene.remove(mine.g); mine = null; }
  if(!A.mine || !show) return;
  const g = new THREE.Group(); g.position.set(A.mine.x, 0, A.mine.z);
  // mossy mound with a glowing hollow
  const mound = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.35, 0.32, 24), stdMat({ color:'#6E5A3E', roughness:0.95 }));
  mound.position.y = 0.12; mound.receiveShadow = mound.castShadow = true; g.add(mound);
  const moss = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.16, 8, 28), stdMat({ color:'#5E9E3A', roughness:0.9 }));
  moss.rotation.x = Math.PI / 2; moss.position.y = 0.27; g.add(moss);
  // the glowing hollow: a swirl of violet light painted on a canvas, slowly turning
  const c = document.createElement('canvas'); c.width = c.height = 256; const gx = c.getContext('2d');
  const gr = gx.createRadialGradient(128, 128, 10, 128, 128, 128); gr.addColorStop(0, '#F4E8FF'); gr.addColorStop(0.25, '#B58AFF'); gr.addColorStop(0.6, '#5A2AB8'); gr.addColorStop(0.9, '#2A0F5A'); gr.addColorStop(1, '#1A0A30');
  gx.fillStyle = gr; gx.fillRect(0, 0, 256, 256);
  gx.globalCompositeOperation = 'lighter';
  for(let k = 0; k < 5; k++){ gx.strokeStyle = 'rgba(200,160,255,.35)'; gx.lineWidth = 6; gx.beginPath(); for(let a = 0; a < 2.6; a += 0.05){ const r = 18 + a * 40; gx.lineTo(128 + Math.cos(a + k * 1.256) * r, 128 + Math.sin(a + k * 1.256) * r); } gx.stroke(); }
  const holeTex = new THREE.CanvasTexture(c); holeTex.colorSpace = THREE.SRGBColorSpace;
  const holeMat = new THREE.MeshBasicMaterial({ map:holeTex, color:'#FFFFFF' });
  const hole = new THREE.Mesh(new THREE.CircleGeometry(0.78, 32), holeMat); hole.rotation.x = -Math.PI / 2; hole.position.y = 0.29; g.add(hole);
  // a ring of small glowing mushrooms
  const stemM = stdMat({ color:'#F1E6FF', roughness:0.6 });
  const capM = stdMat({ color:'#B07BFF', emissive:'#7A3DFF', emissiveIntensity:0.9, roughness:0.4 });
  const stemG = new THREE.CylinderGeometry(0.05, 0.07, 1, 8), capG = new THREE.SphereGeometry(1, 14, 8, 0, TAU, 0, Math.PI / 2);
  const caps = [];
  for(let i = 0; i < 9; i++){
    const a = i / 9 * TAU + rand(-0.15, 0.15), r = rand(1.2, 1.5), h = rand(0.25, 0.55);
    const s = new THREE.Mesh(stemG, stemM); s.scale.set(1, h, 1); s.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r); s.castShadow = true; g.add(s);
    const c = new THREE.Mesh(capG, capM); c.scale.set(rand(0.14, 0.22), rand(0.1, 0.16), rand(0.14, 0.22)); c.position.set(Math.cos(a) * r, h, Math.sin(a) * r); c.castShadow = true; g.add(c); caps.push(c);
  }
  scene.add(g);
  mine = { g, hole, holeMat, caps, pulse:0 };
}

// ---------------- spores on the ground ----------------
function addSpore(x, z, vx, vz, vy = 4){
  const m = new THREE.Mesh(sporeGeo, sporeMat); m.castShadow = true;
  const core = new THREE.Mesh(sporeGeo, coreMat); core.scale.setScalar(0.5); m.add(core);
  const sh = new THREE.Mesh(shadowGeo, shadowMat); sh.renderOrder = 1;
  scene.add(m, sh);
  G.pickups.push({ x, z, y:0.5, vx, vz, vy, t:0, m, sh, landed:false, ph:rand(0, TAU) });
}
function removeSpore(i){ const p = G.pickups[i]; scene.remove(p.m, p.sh); G.pickups.splice(i, 1); }
export function clearSpores(){ for(let i = G.pickups.length - 1; i >= 0; i--) removeSpore(i); }

export function startSpores(){
  clearSpores();
  G.match = { mode:'spores', t:0, dur:SPORES.dur, over:false, winner:null, respawn:true, count:[0, 0], cd:null, mineT:SPORES.first, hot:false, spawned:0 };
}

on('kill', (f) => {
  if(!G.match || G.match.mode !== 'spores' || !f.gems) return;
  // spill every carried spore around the fallen fighter
  const n = f.gems; f.gems = 0;
  for(let i = 0; i < n; i++){ const a = i / n * TAU + rand(-0.3, 0.3), s = rand(1.5, 3.2); addSpore(f.x, f.z, Math.sin(a) * s, Math.cos(a) * s, rand(3, 5)); }
  sfx('gem_drop', f);
});

const P = { x:0, z:0 };
export function updateSpores(dt, t){
  const M = G.match; if(!M || M.mode !== 'spores') return;
  if(mine){
    mine.pulse = Math.max(0, mine.pulse - dt * 1.5);
    const glowK = 0.9 + Math.sin(t * 3) * 0.12 + mine.pulse * 1.2;
    mine.holeMat.color.setScalar(glowK);
    mine.hole.rotation.z = t * 0.6;
    if(Math.random() < dt * 6) glow.emit({ x:A.mine.x + rand(-0.5, 0.5), y:0.35, z:A.mine.z + rand(-0.5, 0.5), vx:0, vy:rand(0.5, 1.2), vz:0, life:1.1, t:0, s0:0.1, s1:0.02, r:0.75, g:0.55, b:1, a:1, grav:0, drag:0.3, soft:1 });
    mine.caps.forEach((c, i) => { c.position.y += Math.sin(t * 2 + i) * 0.0008; });
  }
  if(G.state === 'play' && !M.over){
    M.t += dt;
    M.mineT -= dt;
    if(M.mineT <= 0){
      M.mineT = SPORES.interval; M.spawned++;
      const a = rand(0, TAU), s = rand(0.8, 2.2);
      addSpore(A.mine.x, A.mine.z, Math.sin(a) * s, Math.cos(a) * s, 5.5);
      if(mine) mine.pulse = 1;
      puff(glow, A.mine.x, 0.5, A.mine.z, { n:16, color:'#C9A0FF', sp:2.5, upMin:0.5, vy:2, life:0.7, s0:0.25, s1:0.04, soft:true });
      ring(A.mine.x, A.mine.z, 0.5, 2.2, 0.6, '#B583FF');
      sfx('respawn', A.mine, 0.6);
    }
  }
  // spores: arc out, bounce, then bob and spin waiting to be picked up
  for(let i = G.pickups.length - 1; i >= 0; i--){
    const p = G.pickups[i]; p.t += dt;
    if(!p.landed){
      p.vy -= 16 * dt; p.x += p.vx * dt; p.z += p.vz * dt; p.y += p.vy * dt;
      P.x = p.x; P.z = p.z; if(collide(P, 0.25)){ p.x = P.x; p.z = P.z; p.vx *= -0.4; p.vz *= -0.4; }
      if(p.y < 0.45){ p.y = 0.45; if(Math.abs(p.vy) > 2){ p.vy = -p.vy * 0.4; p.vx *= 0.6; p.vz *= 0.6; } else p.landed = true; }
    }
    const bob = p.landed ? Math.sin(t * 3 + p.ph) * 0.08 : 0;
    p.m.position.set(p.x, p.y + bob, p.z); p.m.rotation.y = t * 2 + p.ph; p.m.rotation.x = 0.3;
    p.sh.position.set(p.x, 0.04, p.z);
    if(Math.random() < dt * 3) glow.emit({ x:p.x + rand(-0.2, 0.2), y:p.y, z:p.z + rand(-0.2, 0.2), vx:0, vy:0.5, vz:0, life:0.6, t:0, s0:0.08, s1:0.01, r:0.75, g:0.6, b:1, a:1, grav:0, drag:0.5, soft:1 });
    if(p.t < 0.35 || G.state !== 'play') continue;
    for(const f of G.fighters){
      if(!f.alive || (f.x - p.x) ** 2 + (f.z - p.z) ** 2 > 0.85 * 0.85) continue;
      f.gems++; removeSpore(i);
      puff(glow, f.x, 1.0, f.z, { n:10, color:'#C9A0FF', sp:2, vy:1.5, life:0.4, s0:0.16, s1:0.02, soft:true });
      sfx('gem', f, f === G.me ? 1 : 0.7, 1 + Math.min(10, f.gems) * 0.03);
      emit('pickup', f);
      break;
    }
  }
  // team totals and the countdown
  M.count[0] = M.count[1] = 0;
  for(const f of G.fighters) if(f.alive) M.count[f.team] += f.gems;
  if(M.over) return;
  const c = M.count, lead = c[0] >= SPORES.goal && c[0] > c[1] ? 0 : c[1] >= SPORES.goal && c[1] > c[0] ? 1 : -1;
  if(lead < 0){ if(M.cd){ emit('countdownStop', M.cd.team); M.cd = null; } }
  else if(!M.cd || M.cd.team !== lead){ M.cd = { team:lead, t:SPORES.hold }; emit('countdownStart', lead); }
  else if(G.state === 'play'){
    const before = Math.ceil(M.cd.t);
    M.cd.t -= dt;
    if(Math.ceil(M.cd.t) !== before && M.cd.t > 0) emit('countdownTick', Math.ceil(M.cd.t));
    if(M.cd.t <= 0) return finish(lead, 'spores');
  }
  M.hot = !!M.cd || M.dur - M.t < 30;
  if(M.t >= M.dur && !M.cd) finish(c[0] > c[1] ? 0 : c[1] > c[0] ? 1 : -1, 'time');
}
function finish(team, why){
  const M = G.match; M.over = true; M.winner = team; M.why = why;
  emit('matchOver', team, why);
}
