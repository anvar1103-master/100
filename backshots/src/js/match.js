// The battle royale (stage 1 prototype: no zone and no loot yet — everyone starts with the AK): every fighter
// appears at a spawn point far from the others, has a few seconds to look around before shooting is allowed,
// nobody comes back, the last one standing wins. The fallen player
// watches the rest of the fight. A time cap ends a stalled match (the healthiest of the survivors wins).
import { G, emit } from './state.js';
import { makeFighter, spawnFighter, stepFighter, LOOKS } from './fighter.js';
import { shuffle, store } from './util.js';
import './combat.js';

export const BR = { time:9 * 60, prep:6 };
const BOT_NAMES = ['Клерк', 'Бухгалтер', 'Стажёр', 'Курьер', 'Менеджер', 'Охранник', 'Завхоз', 'Аналитик', 'Секретарь', 'Юрист', 'Кадровик',
  'Сисадмин', 'Логист', 'Кассир', 'Аудитор', 'Методист', 'Маркетолог', 'Диспетчер', 'Снабженец', 'Инженер', 'Архивист', 'Сметчик', 'Оператор', 'Табельщик', 'Ревизор'];

export function startMatch(o = {}){
  const L = G.level, n = o.count || store.get('count', 20);
  G.fighters.length = 0; G.time = 0; G.paused = false;
  const names = shuffle(BOT_NAMES.slice());
  const me = makeFighter({ name:o.name || store.get('nick', 'Ты'), look:o.look || LOOKS[0] });
  me.isMe = true; G.fighters.push(me); G.me = me;
  for(let i = 1; i < n; i++) G.fighters.push(makeFighter({ name:names[(i - 1) % names.length], look:LOOKS[i % LOOKS.length], bot:true }));
  G.match = { mode:'br', timeLeft:o.time || BR.time, over:false, winner:null, diff:o.diff || store.get('diff', 'normal'), alive:n, seed:L.seed, prep:o.prep ?? BR.prep };
  // the spawn list is ordered most-spread-first: take as many as there are fighters, then shuffle who gets which
  const sp = shuffle(L.spawns.slice(0, Math.max(n, 2)));
  // face the most open direction from the spawn point
  G.fighters.forEach((f, i) => { const s = sp[i % sp.length]; spawnFighter(f, s, openYaw(L, s)); });
  G.state = 'play';
  emit('matchStart', G.match);
}
function openYaw(L, s){
  let best = 0, bd = -1;
  for(let a = 0; a < 8; a++){ const yaw = a * Math.PI / 4, dx = -Math.sin(yaw), dz = -Math.cos(yaw); let d = 0; for(; d < 30; d++){ const i = L.ci(s.x + dx * d * 0.5), k = L.ck(s.z + dz * d * 0.5); if(L.g[k * L.W + i] !== 0) break; } if(d > bd){ bd = d; best = yaw; } }
  return best;
}

export function stepMatch(dt){
  const M = G.match; if(!M || G.state !== 'play') return;
  G.time += dt;
  M.timeLeft = Math.max(0, M.timeLeft - dt);
  // the first seconds: look around and move, nobody can shoot yet
  if(M.prep > 0){ M.prep -= dt; for(const f of G.fighters) f.inp.fire = false; }
  for(const f of G.fighters) stepFighter(f, dt);
  M.alive = G.fighters.reduce((a, f) => a + (f.alive ? 1 : 0), 0);
  if(M.alive <= 1) endMatch('last');
  else if(M.timeLeft <= 0) endMatch('time');
}
export function standings(){
  return G.fighters.slice().sort((a, b) => (b.alive - a.alive) || (a.alive ? b.hp - a.hp : a.place - b.place) || b.kills - a.kills);
}
function endMatch(why){
  const M = G.match; if(M.over) return;
  M.over = true; M.why = why;
  const st = standings(); st.forEach((f, i) => { if(f.alive || !f.place) f.place = i + 1; });
  M.winner = st[0];
  G.state = 'end';
  emit('matchEnd', M);
}
