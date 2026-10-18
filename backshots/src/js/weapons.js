// The guns: numbers only (models in gunmodels.js, firing in combat.js). Angles in degrees, damage to the body
// before the hit-zone multiplier; health is 100. Real-world feel: the AK kicks hard in a burst, the head is lethal.
// Everyone starts with one gun drawn by luck (SPAWN: a pistol most often, a rifle for the lucky few) and one or two
// spare magazines; the rest lies about as loot. rank: which gun a fighter would rather carry.
export const WEAPONS = {
  ak:{ id:'ak', name:'АК-47', kind:'rifle', what:'автомат', ammo:'7.62', mag:30, spawnAmmo:30, rank:4, dmg:31, head:3.3, rpm:600, auto:true, pellets:1,
    fall:[35, 90, 0.72], range:180,
    spread:{ hip:2.4, ads:0.12, move:2.2, air:5, crouch:0.75, shot:0.22, max:3.2, recover:6 },
    recoil:{ up:0.95, side:0.34, punch:1.3, recover:5.5, pattern:[0, 0.2, 0.5, 0.3, -0.3, -0.8, -0.6, 0.1, 0.7, 0.9, 0.4, -0.4, -1, -0.7, 0, 0.8] },
    ads:{ fov:0.78, time:0.24, move:0.6, sens:0.8 }, reload:{ kind:'mag', t:2.4, empty:2.9 }, equip:0.6, moveK:0.95, sound:'rifle' },
  m4:{ id:'m4', name:'M4', kind:'rifle', what:'автомат', ammo:'5.56', mag:30, spawnAmmo:30, rank:4, dmg:26, head:3.6, rpm:760, auto:true, pellets:1,
    fall:[40, 110, 0.75], range:200,
    spread:{ hip:2.1, ads:0.08, move:2, air:5, crouch:0.75, shot:0.15, max:2.6, recover:7 },
    recoil:{ up:0.7, side:0.25, punch:1.0, recover:6.5, pattern:[0, 0.3, 0.5, 0.2, -0.4, -0.7, -0.4, 0.3, 0.8, 0.6, 0, -0.6] },
    ads:{ fov:0.75, time:0.22, move:0.62, sens:0.78 }, reload:{ kind:'mag', t:2.2, empty:2.7 }, equip:0.55, moveK:1, sound:'rifle' },
  shotgun:{ id:'shotgun', name:'Дробовик', kind:'shotgun', what:'помповый дробовик', ammo:'12', mag:6, spawnAmmo:6, rank:2, dmg:13, head:1.6, rpm:70, auto:false, pellets:9,
    fall:[8, 26, 0.3], range:60, pump:0.7,
    spread:{ hip:3.6, ads:2.6, move:0.8, air:2, crouch:0.9, shot:0, max:0, recover:10 },
    recoil:{ up:4, side:0.9, punch:3, recover:4 },
    ads:{ fov:0.86, time:0.25, move:0.7, sens:0.85 }, reload:{ kind:'shell', start:0.4, shell:0.55, end:0.5 }, equip:0.6, moveK:1, sound:'shotgun' },
  sniper:{ id:'sniper', name:'Винтовка', kind:'sniper', what:'снайперская винтовка', ammo:'.308', mag:5, spawnAmmo:5, rank:3, dmg:95, head:2.5, rpm:50, auto:false, pellets:1,
    fall:null, range:300, bolt:1.2,
    spread:{ hip:6, ads:0, move:3, air:8, crouch:0.8, shot:0, max:0, recover:10 },
    recoil:{ up:4.5, side:0.6, punch:3.4, recover:3.4 },
    ads:{ fov:0.25, time:0.32, move:0.45, sens:0.38, scope:true }, reload:{ kind:'mag', t:2.8, empty:3.3 }, equip:0.7, moveK:0.9, sound:'sniper' },
  pistol:{ id:'pistol', name:'Пистолет', kind:'pistol', what:'пистолет', ammo:'9', mag:8, spawnAmmo:16, rank:1, dmg:26, head:3, rpm:300, auto:false, pellets:1,
    fall:[20, 50, 0.6], range:120,
    spread:{ hip:1.4, ads:0.15, move:1.1, air:3.5, crouch:0.8, shot:0.8, max:2.4, recover:5 },
    recoil:{ up:2.4, side:0.5, punch:2, recover:5.5 },
    ads:{ fov:0.85, time:0.16, move:0.8, sens:0.85 }, reload:{ kind:'mag', t:1.6, empty:1.9 }, equip:0.35, moveK:1.05, sound:'pistol' },
};

// the calibres: a box found as loot, the most one carries
export const AMMO = { '7.62':{ name:'7,62 мм', box:30, max:210 }, '5.56':{ name:'5,56 мм', box:30, max:210 }, '12':{ name:'12 калибр', box:8, max:40 }, '.308':{ name:'.308', box:5, max:30 }, '9':{ name:'9 мм', box:16, max:96 } };
// the gun one wakes up with (weights)
export const SPAWN = { pistol:40, shotgun:18, sniper:12, ak:15, m4:15 };
export function pickWeighted(table, r = Math.random()){ let sum = 0; for(const k in table) sum += table[k]; r *= sum; for(const k in table){ r -= table[k]; if(r <= 0) return k; } return Object.keys(table)[0]; }

// damage at a distance (before the hit zone)
export function dmgAt(W, dist){
  if(!W.fall) return W.dmg;
  const [a, b, k] = W.fall, t = Math.min(1, Math.max(0, (dist - a) / (b - a)));
  return W.dmg * (1 + (k - 1) * t * t * (3 - 2 * t));
}
// the current cone (half-angle, degrees) of a fighter's gun
export function coneOf(W, f){
  const S = W.spread, ads = f.adsK || 0;
  let c = S.hip + (S.ads - S.hip) * ads;
  const sp = Math.hypot(f.vx, f.vz) / 4;
  c += S.move * Math.min(1, sp) * (1 - ads * 0.8);
  if(!f.ground) c += S.air;
  if(f.crouchK > 0.5) c *= S.crouch;
  return Math.max(0, c + (f.bloom || 0));
}
