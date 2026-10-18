// Loot (logic only, runs in node too): guns, ammo boxes, vests, helmets, medkits and bandages lying on the floor.
// Ordinary rooms get ordinary things; dead ends and landmark zones get the good stuff (rifles, the sniper, the
// heavy vest), so walking into a dead end is worth the risk. The fallen drop everything they carried.
// Taking: guns and armour by choice (F for the player), ammo and medicine picked up on the way.
import { G, emit, on } from './state.js';
import { WEAPONS, AMMO, pickWeighted } from './weapons.js';
import { gunState, gun, MEDS } from './fighter.js';
import { PW } from './phys.js';

export const LOOT = { items:[], next:1, perM2:90 };       // a room item per this many square metres of floor
// what a spot holds: kind weights, then which gun
const TABLE = {
  room:{ kind:{ gun:20, ammo:36, bandage:16, medkit:7, vest:11, helmet:10 }, gun:{ pistol:30, shotgun:26, ak:15, m4:15, sniper:14 }, vest2:0.25 },
  good:{ kind:{ gun:36, ammo:20, bandage:6, medkit:15, vest:13, helmet:10 }, gun:{ pistol:4, shotgun:18, ak:28, m4:28, sniper:22 }, vest2:0.55 },
};
export const PICK_R = 1.6;           // how far you can reach an item
export const AUTO = { ammo:true, medkit:true, bandage:true };

// a spot a fighter can stand on: items hugging a wall move a step out into the room
function reachable(o){
  const L = PW.L; if(!L || !L.dist) return;
  const i0 = L.ci(o.x), k0 = L.ck(o.z), ok = (i, k) => i > 0 && k > 0 && i < L.W - 1 && k < L.H - 1 && L.g[k * L.W + i] === 0 && L.dist[k * L.W + i] >= 2;
  if(ok(i0, k0)) return;
  let best = null, bd = 1e9;
  for(let k = k0 - 3; k <= k0 + 3; k++) for(let i = i0 - 3; i <= i0 + 3; i++){ if(!ok(i, k)) continue; const d = Math.hypot(i - i0, k - k0); if(d < bd){ bd = d; best = [i, k]; } }
  if(best){ o.x = L.wx(best[0]) + (Math.random() - 0.5) * 0.2; o.z = L.wz(best[1]) + (Math.random() - 0.5) * 0.2; }
}
function add(o){ reachable(o); const it = Object.assign({ id:LOOT.next++, y:0, ry:Math.random() * 6.283 }, o); LOOT.items.push(it); emit('lootAdd', it); return it; }
export function lootName(it){
  if(it.kind === 'gun') return WEAPONS[it.gun].name;
  if(it.kind === 'ammo') return 'Патроны ' + AMMO[it.ammo].name;
  if(it.kind === 'vest') return it.lv > 1 ? 'Тяжёлый бронежилет' : 'Бронежилет';
  return { helmet:'Шлем', medkit:'Аптечка', bandage:'Бинт' }[it.kind];
}
function roll(tab, x, z, extra){
  const kind = pickWeighted(tab.kind);
  if(kind === 'gun'){ const id = pickWeighted(tab.gun); add({ kind, gun:id, mag:WEAPONS[id].mag, x, z }); add({ kind:'ammo', ammo:WEAPONS[id].ammo, n:AMMO[WEAPONS[id].ammo].box, x:x + 0.35, z:z + 0.2 }); return; }
  if(kind === 'ammo'){ const id = pickWeighted(tab.gun); add({ kind, ammo:WEAPONS[id].ammo, n:AMMO[WEAPONS[id].ammo].box * (extra ? 2 : 1), x, z }); return; }
  if(kind === 'vest'){ const lv = Math.random() < tab.vest2 ? 2 : 1; add({ kind, lv, armor:lv * 50, x, z }); return; }
  add({ kind, x, z });
}

// place the floor's loot at the start of a match
export function placeLoot(L){
  LOOT.items.length = 0;
  const taken = [], far = (x, z, r) => taken.every(p => Math.hypot(p[0] - x, p[1] - z) > r);
  // dead ends and landmarks: the good stuff (one spot per dead end — neighbouring cells are the same dead end)
  const good = L.loot.slice().sort(() => Math.random() - 0.5);
  for(const p of good){ if(!far(p.x, p.z, 5)) continue; taken.push([p.x, p.z]); roll(TABLE.good, p.x, p.z, true); if(Math.random() < 0.35) roll(TABLE.room, p.x + 0.4, p.z - 0.4); }
  // rooms: along the walls, a thing every few metres of floor
  const W = L.W; let floor = 0; for(let s = 0; s < L.g.length; s++) if(L.g[s] === 0) floor++;
  const want = Math.round(floor * 0.25 / LOOT.perM2);
  for(let n = 0, tries = 0; n < want && tries < want * 40; tries++){
    const i = 2 + Math.floor(Math.random() * (W - 4)), k = 2 + Math.floor(Math.random() * (L.H - 4)), s = k * W + i;
    if(L.g[s] !== 0 || L.dist[s] < 1 || L.dist[s] > 2) continue;
    const x = L.wx(i), z = L.wz(k); if(!far(x, z, 7)) continue;
    taken.push([x, z]); roll(TABLE.room, x, z); n++;
  }
  return LOOT.items;
}
// the items a fighter could take now (closest first)
export function lootNear(f, r = PICK_R){
  const out = [];
  for(const it of LOOT.items){ const d = Math.hypot(it.x - f.x, it.z - f.z); if(d < r && Math.abs(it.y - f.y) < 1.2) out.push([d, it]); }
  return out.sort((a, b) => a[0] - b[0]).map(a => a[1]);
}
// would this fighter want it (bots, auto pickup)
export function wants(f, it){
  if(it.kind === 'ammo') return (f.ammo[it.ammo] || 0) < AMMO[it.ammo].max && (f.guns.some(g => g.W.ammo === it.ammo) || f.guns.length < 2);
  if(it.kind === 'medkit' || it.kind === 'bandage') return f.meds[it.kind] < MEDS[it.kind].max;
  if(it.kind === 'vest') return it.armor > f.armor + 5;
  if(it.kind === 'helmet') return !f.helmet;
  if(it.kind === 'gun'){ const W = WEAPONS[it.gun]; if(f.guns.some(g => g.id === it.gun)) return false; if(f.guns.length < 2) return true; return W.rank > Math.min(...f.guns.map(g => g.W.rank)); }
  return false;
}
function remove(it){ const i = LOOT.items.indexOf(it); if(i >= 0){ LOOT.items.splice(i, 1); emit('lootRemove', it); } }
// take an item; a gun with both hands full swaps for the one you hold (bots: the worst one) and drops it
export function takeLoot(f, it){
  if(!f.alive || LOOT.items.indexOf(it) < 0) return false;
  if(it.kind === 'ammo'){ const max = AMMO[it.ammo].max, have = f.ammo[it.ammo] || 0, take = Math.min(it.n, max - have); if(take <= 0) return false; f.ammo[it.ammo] = have + take; it.n -= take; if(it.n <= 0) remove(it); }
  else if(it.kind === 'medkit' || it.kind === 'bandage'){ if(f.meds[it.kind] >= MEDS[it.kind].max) return false; f.meds[it.kind]++; remove(it); }
  else if(it.kind === 'vest'){ const old = f.armor; if(old >= it.armor) return false; if(old > 5) add({ kind:'vest', lv:f.armorLv, armor:Math.round(old), x:f.x, z:f.z }); f.armor = it.armor; f.armorLv = it.lv; remove(it); }
  else if(it.kind === 'helmet'){ if(f.helmet) return false; f.helmet = true; remove(it); }
  else if(it.kind === 'gun'){
    const same = f.guns.find(g => g.id === it.gun);
    if(same){ const a = WEAPONS[it.gun].ammo; f.ammo[a] = Math.min(AMMO[a].max, f.ammo[a] + it.mag); remove(it); emit('take', f, it); return true; }
    const g = gunState(it.gun, it.mag);
    if(f.guns.length < 2){ f.guns.push(g); remove(it); f.inp.slot = f.guns.length - 1; }
    else {
      let slot = f.cur; if(f.bot){ slot = 0; for(let i = 1; i < f.guns.length; i++) if(f.guns[i].W.rank < f.guns[slot].W.rank) slot = i; }
      const old = f.guns[slot]; f.guns[slot] = g; remove(it);
      add({ kind:'gun', gun:old.id, mag:old.mag, x:f.x + Math.sin(f.yaw) * 0.3, z:f.z + Math.cos(f.yaw) * 0.3 });
      if(slot === f.cur){ f.reload = null; f.equipT = g.W.equip; f.adsK = 0; emit('equip', f); } else f.inp.slot = slot;
    }
  }
  emit('take', f, it);
  return true;
}
// walking over ammo and medicine picks it up
export function autoPickup(f){
  for(const it of lootNear(f, 1.1)) if(AUTO[it.kind] && wants(f, it)) takeLoot(f, it);
}
// the fallen leave everything on the floor around them
on('kill', t => {
  const items = [];
  for(const g of t.guns) items.push({ kind:'gun', gun:g.id, mag:g.mag });
  for(const a in t.ammo) if(t.ammo[a] > 0) items.push({ kind:'ammo', ammo:a, n:t.ammo[a] });
  for(let i = 0; i < t.meds.medkit; i++) items.push({ kind:'medkit' });
  for(let i = 0; i < Math.min(2, t.meds.bandage); i++) items.push({ kind:'bandage' });
  if(t.armor > 5) items.push({ kind:'vest', lv:t.armorLv || 1, armor:Math.round(t.armor) });
  if(t.helmet) items.push({ kind:'helmet' });
  items.forEach((o, i) => {
    // a little ring around the body, on free floor
    let x = t.x, z = t.z;
    for(let k = 0; k < 6; k++){ const a = i * 2.4 + k * 0.9, r = 0.45 + (i % 3) * 0.3; const nx = t.x + Math.cos(a) * r, nz = t.z + Math.sin(a) * r; if(PW.L && PW.L.g[PW.L.ck(nz) * PW.L.W + PW.L.ci(nx)] === 0){ x = nx; z = nz; break; } }
    add(Object.assign(o, { x, z }));
  });
});
export { gun };
