// «Каждый сам за себя»: everyone against everyone. First to the kill target wins, or the leader when time runs out.
// The fallen come back after a short wait at the spawn point farthest from danger, briefly shielded.
import { G, emit, on } from './state.js';
import { makeFighter, spawnFighter, stepFighter, SPECIES_IDS } from './fighter.js';
import { PRIMARIES } from './weapons.js';
import { WORLD } from './world.js';
import { losClear } from './phys.js';
import { shuffle, store } from './util.js';
import './combat.js';

export const FFA = { target:25, time:8 * 60, respawn:3 };
const BOT_NAMES = ['Жужа', 'Хитин', 'Щелкун', 'Мурашка', 'Сверчок', 'Стрекот', 'Шмель', 'Тля', 'Короед', 'Усач', 'Скарабей', 'Медведка',
  'Жужелица', 'Овод', 'Пасечник', 'Листоед', 'Слизняк', 'Носорог', 'Опёнок', 'Моховик', 'Гусеница', 'Комарик', 'Светлячок', 'Златка'];

export function startMatch(o = {}){
  const n = o.count || store.get('count', 12);
  G.fighters.length = 0; G.time = 0; G.paused = false;
  const names = shuffle(BOT_NAMES.slice());
  const me = makeFighter({ name:o.name || store.get('nick', 'Ты'), species:o.species || store.get('species', 'ant'), primary:o.primary || store.get('primary', 'hornet') });
  me.isMe = true;
  G.fighters.push(me); G.me = me;
  for(let i = 1; i < n; i++){
    const f = makeFighter({ name:names[(i - 1) % names.length], species:SPECIES_IDS[i % SPECIES_IDS.length], bot:true, primary:PRIMARIES[(i + 1) % PRIMARIES.length] });
    G.fighters.push(f);
  }
  G.match = { mode:'ffa', target:o.target || FFA.target, timeLeft:o.time || FFA.time, over:false, winner:null, diff:o.diff || store.get('diff', 'normal'), started:false };
  // everyone appears at once, spread over the meadow
  const sp = shuffle(WORLD.spawns.slice());
  G.fighters.forEach((f, i) => { const s = sp[i % sp.length]; spawnFighter(f, s, Math.atan2(s.x, s.z)); });
  G.state = 'play';
  emit('matchStart', G.match);
}

// the spawn point whose nearest living enemy is farthest away, and not in anyone's sight
export function pickSpawn(f){
  let best = null, bestS = -1e9;
  for(const s of WORLD.spawns){
    let near = 1e9, seen = false;
    for(const o of G.fighters){
      if(o === f || !o.alive) continue;
      const d = Math.hypot(o.x - s.x, o.z - s.z); near = Math.min(near, d);
      if(d < 70 && !seen && losClear(o.x, o.y + o.eye, o.z, s.x, s.y + 1.4, s.z)) seen = true;
    }
    const sc = Math.min(near, 80) - (seen ? 60 : 0) + Math.random() * 12;
    if(sc > bestS){ bestS = sc; best = s; }
  }
  return best || WORLD.spawns[0];
}

export function stepMatch(dt){
  const M = G.match; if(!M || G.state !== 'play') return;
  G.time += dt;
  M.timeLeft = Math.max(0, M.timeLeft - dt);
  for(const f of G.fighters){
    stepFighter(f, dt);
    if(!f.alive && f.deadT >= FFA.respawn && !f.holdRespawn){
      const s = pickSpawn(f);
      // face the middle of the meadow
      spawnFighter(f, s, Math.atan2(s.x, s.z));
    }
  }
  const lead = leader();
  if(lead && lead.kills >= M.target) endMatch('kills');
  else if(M.timeLeft <= 0) endMatch('time');
}
export function leader(){ let b = null; for(const f of G.fighters) if(!b || f.kills > b.kills || (f.kills === b.kills && f.score > b.score)) b = f; return b; }
export function standings(){ return G.fighters.slice().sort((a, b) => b.kills - a.kills || b.score - a.score || a.deaths - b.deaths); }
function endMatch(why){
  const M = G.match; if(M.over) return;
  M.over = true; M.why = why; M.winner = leader();
  const st = standings(); st.forEach((f, i) => f.place = i + 1);
  G.state = 'end';
  emit('matchEnd', M);
}
