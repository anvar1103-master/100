// «Дождевикбол» (3 vs 3): roll the puffball mushroom into the other team's goal. Two goals win; a tie at the end of
// time goes to a golden goal. Run over the ball to pick it up; with the ball the attack button kicks (or passes)
// toward the crosshair and the super is a cannon shot that bowls fighters over. A fighter who falls drops the ball.
import * as THREE from 'three';
import { scene, stdMat, canvasTex, LOW } from './engine.js';
import { G, emit, on } from './state.js';
import { A, collide, tileAtXZ, tileX, tileZ } from './arena.js';
import { glow, smoke, puff, ring, sporeBurst } from './fx.js';
import { rand, TAU, clamp } from './util.js';
import { sfx } from './audio.js';

export const BALL = { goals:2, dur:150, golden:60, r:0.36, kick:14, superKick:23, catchT:0.35, friction:1.1 };
const P = { x:0, z:0 };

// ---------------- the ball: a round puffball with a bumpy cap, a soft shadow and a faint beacon above it ----------------
let BV = null;
function buildBall(){
  const tex = canvasTex(128, 64, (g, w, h) => {
    g.fillStyle = '#F1E7D2'; g.fillRect(0, 0, w, h);
    for(let i = 0; i < 260; i++){ g.fillStyle = `rgba(${150 + rand(0, 60) | 0},${130 + rand(0, 50) | 0},${100 + rand(0, 40) | 0},${rand(0.25, 0.6)})`; g.beginPath(); g.arc(rand(0, w), rand(0, h), rand(1, 3.5), 0, TAU); g.fill(); }
    g.fillStyle = 'rgba(120,95,70,.5)'; for(let i = 0; i < 18; i++){ g.beginPath(); g.arc(rand(0, w), rand(0, h), rand(3, 6), 0, TAU); g.fill(); }
  }, { repeat:true });
  const ball = new THREE.Mesh(new THREE.SphereGeometry(BALL.r, 20, 14), stdMat({ map:tex, roughness:0.9 }));
  ball.castShadow = !LOW;
  const nub = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.1, 8), stdMat({ color:'#C9B08A', roughness:0.9 })); nub.position.y = BALL.r; ball.add(nub);
  const shTex = canvasTex(64, 64, g => { const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30); gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); });
  const sh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map:shTex, transparent:true, depthWrite:false }));
  sh.renderOrder = 1;
  // a beacon of light so the ball can be found over the hedges
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 6, 10, 1, true).translate(0, 3, 0), new THREE.MeshBasicMaterial({ color:new THREE.Color('#FFF2C0'), transparent:true, opacity:0.18, depthWrite:false, blending:THREE.AdditiveBlending, toneMapped:false }));
  beam.renderOrder = 5;
  const grp = new THREE.Group(); grp.add(ball, sh, beam); scene.add(grp);
  BV = { grp, ball, sh, beam };
}
// goal frames: two posts and a crossbar at the mouth, a net behind
let GOALS = null;
function buildGoals(){
  const grp = new THREE.Group(), post = new THREE.CylinderGeometry(0.09, 0.09, 1.8, 10), postM = stdMat({ color:'#F4EFE6', roughness:0.6 });
  const netTex = canvasTex(64, 64, g => { g.clearRect(0, 0, 64, 64); g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 2; for(let i = 0; i <= 64; i += 8){ g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 64); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(64, i); g.stroke(); } }, { repeat:true });
  for(const ch of ['g', 'h']){
    let c0 = 1e9, c1 = -1, row = -1;
    for(let r = 0; r < A.H; r++) for(let c = 0; c < A.W; c++) if(A.rows[r][c] === ch){ c0 = Math.min(c0, c); c1 = Math.max(c1, c); row = r; }
    if(row < 0) continue;
    const x0 = tileX(c0) - 0.8, x1 = tileX(c1) + 0.8, inward = ch === 'g' ? 1 : -1, z = tileZ(row) + inward * 0.8;
    for(const x of [x0, x1]){ const m = new THREE.Mesh(post, postM); m.position.set(x, 0.9, z); m.castShadow = true; grp.add(m); }
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, x1 - x0, 10), postM); bar.rotation.z = Math.PI / 2; bar.position.set((x0 + x1) / 2, 1.8, z); grp.add(bar);
    const tex = netTex.clone(); tex.needsUpdate = true; tex.repeat.set((x1 - x0) / 0.5, 1.8 / 0.5);
    const net = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, 1.8), new THREE.MeshBasicMaterial({ map:tex, transparent:true, side:THREE.DoubleSide, depthWrite:false, color:ch === 'g' ? '#FFD0D0' : '#D0ECFF' }));
    net.position.set((x0 + x1) / 2, 0.9, z - inward * 1.5); grp.add(net);
  }
  scene.add(grp); GOALS = grp;
}
// where to shoot at: the middle of a team's goal mouth (the goal that team defends)
export function goalOf(team){
  const ch = team === 0 ? 'h' : 'g'; let sx = 0, sz = 0, n = 0;
  for(let r = 0; r < A.H; r++) for(let c = 0; c < A.W; c++) if(A.rows[r][c] === ch){ sx += tileX(c); sz += tileZ(r); n++; }
  return n ? { x:sx / n, z:sz / n } : { x:0, z:0 };
}

export function startFootball(){
  clearFootball();
  buildBall(); buildGoals();
  const c = A.mine || { x:0, z:0 };
  G.match = { mode:'ball', t:0, dur:BALL.dur, over:false, winner:null, respawn:true, count:[0, 0], golden:false, resetT:0 };
  G.ball = { x:c.x, z:c.z, y:BALL.r, vx:0, vz:0, vy:0, holder:null, kicker:null, kickT:9, power:false, spin:0, home:{ x:c.x, z:c.z } };
  G.attackHook = kickHook;
}
export function clearFootball(){
  if(BV){ scene.remove(BV.grp); BV = null; }
  if(GOALS){ scene.remove(GOALS); GOALS = null; }
  G.ball = null; G.attackHook = null;
}

// the attack and super buttons kick when you hold the ball (combat.js asks before firing)
function kickHook(f, tx, tz, isSuper){
  const b = G.ball; if(!b || b.holder !== f) return false;
  const a = Math.atan2(tx - f.x, tz - f.z), sp = isSuper ? BALL.superKick : BALL.kick;
  b.holder = null; b.kicker = f; b.kickT = 0; b.power = isSuper;
  b.x = f.x + Math.sin(a) * 0.7; b.z = f.z + Math.cos(a) * 0.7; b.vx = Math.sin(a) * sp; b.vz = Math.cos(a) * sp; b.vy = isSuper ? 2.5 : 3.2;
  f.aim = a; f.V.yaw = a; f.atkT = 0; f.cdT = 0.3; f.revealT = Math.max(f.revealT, 1);
  if(isSuper){ f.charge = 0; f.supT = 0; }
  puff(smoke, b.x, 0.4, b.z, { n:isSuper ? 16 : 8, color:'#E8DCC0', sp:2.5, life:0.6, s0:0.2, s1:0.5, drag:3, soft:true, a:0.7 });
  if(isSuper) sporeBurst(b.x, 0.5, b.z, '#FFE07A', 16);
  sfx(isSuper ? 'boom' : 'shot_throw', f, isSuper ? 0.7 : 1, isSuper ? 1 : 1.3);
  emit('kick', f, isSuper);
  return true;
}

on('kill', f => { const b = G.ball; if(b && b.holder === f){ b.holder = null; b.kicker = null; b.kickT = 0.2; b.vx = rand(-2, 2); b.vz = rand(-2, 2); b.vy = 3; } });

function score(team){
  const M = G.match, b = G.ball;
  M.count[team]++; b.vx = b.vz = 0; b.holder = null; M.resetT = 2.6;
  const scorer = b.kicker && b.kicker.team === team ? b.kicker : null;
  if(scorer) scorer.gemsPicked = (scorer.gemsPicked || 0) + 1;   // the end screen counts goals in this column
  sporeBurst(b.x, 0.6, b.z, team === 0 ? '#6FD8FF' : '#FF6A5A', 40);
  ring(b.x, b.z, 0.3, 3, 0.7, team === 0 ? '#6FD8FF' : '#FF5A4A');
  emit('goal', team, scorer);
  if(M.count[team] >= BALL.goals || M.golden) finish(team, 'goals');
}
function finish(team, why){ const M = G.match; M.over = true; M.winner = team; M.why = why; emit('matchOver', team, why); }

export function updateFootball(dt, t){
  const M = G.match, b = G.ball; if(!M || M.mode !== 'ball' || !b) return;
  if(G.state === 'play' && !M.over){
    M.t += dt;
    if(M.t >= M.dur && !M.golden && !M.resetT){
      if(M.count[0] !== M.count[1]) return finish(M.count[0] > M.count[1] ? 0 : 1, 'time');
      M.golden = true; emit('golden');
    }
    if(M.golden && M.t >= M.dur + BALL.golden) return finish(-1, 'time');
  }
  // after a goal: a short pause, then everyone lines up again and the ball goes back to the middle
  if(M.resetT > 0 && !M.over){
    M.resetT -= dt;
    if(M.resetT <= 0){ M.resetT = 0; Object.assign(b, { x:b.home.x, z:b.home.z, y:BALL.r, vx:0, vz:0, vy:0, holder:null, kicker:null, kickT:9 }); emit('kickoff'); }
  }
  b.kickT += dt;
  if(b.holder){
    // carried: the ball rolls along in front of the carrier
    const f = b.holder;
    b.x = f.x + Math.sin(f.aim) * 0.62; b.z = f.z + Math.cos(f.aim) * 0.62; b.y = BALL.r + Math.abs(Math.sin(t * 9)) * 0.06; b.vx = f.vx; b.vz = f.vz;
    P.x = b.x; P.z = b.z; collide(P, BALL.r * 0.8); b.x = P.x; b.z = P.z;
  } else if(!M.resetT || M.resetT > 0){
    // loose: roll, slow down, bounce off hedges, rocks and the fence
    const steps = Math.max(1, Math.ceil(Math.hypot(b.vx, b.vz) * dt / 0.25));
    for(let i = 0; i < steps; i++){
      const h = dt / steps, px = b.x, pz = b.z;
      P.x = b.x + b.vx * h; P.z = b.z + b.vz * h;
      if(collide(P, BALL.r)){
        if(Math.abs(P.x - (px + b.vx * h)) > 1e-4) b.vx = -b.vx * 0.65;
        if(Math.abs(P.z - (pz + b.vz * h)) > 1e-4) b.vz = -b.vz * 0.65;
        if(Math.hypot(b.vx, b.vz) > 4) sfx('hit_wall', b, 0.4, 0.7);
      }
      b.x = P.x; b.z = P.z;
    }
    const k = Math.exp(-dt * BALL.friction * (b.y > BALL.r + 0.05 ? 0.3 : 1)); b.vx *= k; b.vz *= k;
    b.vy -= 18 * dt; b.y += b.vy * dt; if(b.y < BALL.r){ b.y = BALL.r; b.vy = Math.abs(b.vy) > 2 ? -b.vy * 0.45 : 0; }
    if(b.power && Math.hypot(b.vx, b.vz) < 8) b.power = false;
    // goal?
    if(!M.over && !M.resetT){
      const ch = tileAtXZ(b.x, b.z);
      if(ch === 'g') score(0); else if(ch === 'h') score(1);
    }
    // pick-up: anyone who runs into a slow enough ball; the kicker must wait a moment
    if(!M.resetT && G.state === 'play'){
      const speed = Math.hypot(b.vx, b.vz);
      for(const f of G.fighters){
        if(!f.alive || (f.x - b.x) ** 2 + (f.z - b.z) ** 2 > (f.H.rad + BALL.r + 0.1) ** 2) continue;
        if(b.power && f.team !== (b.kicker && b.kicker.team)){
          // the cannon shot bowls an enemy over instead of being caught
          const l = speed || 1; f.kx += b.vx / l * 7; f.kz += b.vz / l * 7; f.stunT = Math.max(f.stunT, 0.5);
          b.vx *= 0.7; b.vz *= 0.7; b.power = false; emit('ballHit', f, b.kicker); continue;
        }
        if(f === b.kicker && b.kickT < BALL.catchT) continue;
        if(f !== b.kicker && b.kickT < 0.08) continue;
        if(speed > 16 && f.team === (b.kicker && b.kicker.team) && f !== b.kicker) continue;
        b.holder = f; b.power = false; b.vy = 0; sfx('gem', f, f === G.me ? 0.6 : 0.3, 0.7); emit('ballTaken', f);
        break;
      }
    }
  }
  // visuals
  if(BV){
    BV.grp.visible = M.resetT <= 0 || M.resetT > 2.2;
    BV.ball.position.set(b.x, b.y, b.z);
    const sp = Math.hypot(b.vx, b.vz); if(sp > 0.05){ b.spin += sp * dt / BALL.r; BV.ball.rotation.set(b.spin * Math.cos(Math.atan2(b.vx, b.vz)), 0, -b.spin * Math.sin(Math.atan2(b.vx, b.vz))); }
    BV.sh.position.set(b.x, 0.03, b.z); BV.sh.scale.setScalar(0.9 + (b.y - BALL.r) * 0.2);
    BV.beam.position.set(b.x, 0, b.z); BV.beam.material.opacity = b.holder ? 0.1 : 0.2 + Math.sin(t * 4) * 0.05;
    if(sp > 9 && Math.random() < dt * 30) glow.emit({ x:b.x, y:b.y, z:b.z, vx:0, vy:0.4, vz:0, life:0.35, t:0, s0:0.18, s1:0.02, r:1, g:0.95, b:0.75, a:0.8, grav:0, drag:0, soft:1 });
  }
}
// shader warm-up at boot
export function footballSamples(){ buildBall(); const g = BV.grp; scene.remove(g); BV = null; return [g]; }
