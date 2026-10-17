// The four guns: numbers only (models are in gunmodels.js, firing in combat.js). Angles in degrees.
// The models are toy blasters; they fire like real guns.
export const WEAPONS = {
  hornet:{ id:'hornet', name:'«Шершень»', kind:'rifle', what:'автомат', mag:30, reserve:150, dmg:22, head:1.6, rpm:640, auto:true, pellets:1,
    fall:[26, 66, 0.55], range:320,
    spread:{ hip:1.7, ads:0.1, move:1.9, air:4.5, crouch:0.75, shot:0.18, max:3.4, recover:7 },
    recoil:{ up:0.7, side:0.26, punch:1.0, recover:6.5, pattern:[0, 0.3, 0.5, 0.2, -0.4, -0.7, -0.4, 0.3, 0.8, 0.6, 0, -0.6, -0.9, -0.3, 0.5] },
    ads:{ fov:0.72, time:0.2, move:0.62, sens:0.78 }, reload:{ kind:'mag', t:2.05, empty:2.55 }, equip:0.5, moveK:0.95, sound:'rifle' },
  acorn:{ id:'acorn', name:'«Жёлудь»', kind:'shotgun', what:'помповый дробовик', mag:6, reserve:30, dmg:15, head:1.3, rpm:80, auto:false, pellets:10,
    fall:[14, 34, 0.35], range:120, pump:0.55,
    spread:{ hip:3.2, ads:2.2, move:0.8, air:2, crouch:0.9, shot:0, max:0, recover:10 },
    recoil:{ up:3.6, side:0.8, punch:2.6, recover:4.5 },
    ads:{ fov:0.85, time:0.22, move:0.7, sens:0.85 }, reload:{ kind:'shell', start:0.35, shell:0.5, end:0.45 }, equip:0.55, moveK:1.05, sound:'shotgun' },
  needle:{ id:'needle', name:'«Игла»', kind:'sniper', what:'снайперская винтовка', mag:5, reserve:25, dmg:100, head:2.0, rpm:50, auto:false, pellets:1,
    fall:null, range:600, bolt:1.0,
    spread:{ hip:5.5, ads:0, move:3, air:8, crouch:0.8, shot:0, max:0, recover:10 },
    recoil:{ up:4.2, side:0.6, punch:3.2, recover:3.6 },
    ads:{ fov:0.24, time:0.3, move:0.45, sens:0.38, scope:true }, reload:{ kind:'mag', t:2.6, empty:3.1 }, equip:0.65, moveK:0.9, sound:'sniper' },
  comb:{ id:'comb', name:'«Оса»', kind:'pistol', what:'пистолет', mag:8, reserve:40, dmg:38, head:1.7, rpm:220, auto:false, pellets:1,
    fall:[24, 60, 0.6], range:260,
    spread:{ hip:1.2, ads:0.12, move:1.0, air:3.5, crouch:0.8, shot:0.9, max:2.4, recover:5 },
    recoil:{ up:2.6, side:0.5, punch:2.2, recover:5.5 },
    ads:{ fov:0.82, time:0.16, move:0.8, sens:0.85 }, reload:{ kind:'mag', t:1.5, empty:1.8 }, equip:0.35, moveK:1.0, sound:'pistol' },
};
export const PRIMARIES = ['hornet', 'acorn', 'needle'];
export const SIDEARM = 'comb';

// damage at a distance (before the head multiplier)
export function dmgAt(W, dist){
  if(!W.fall) return W.dmg;
  const [a, b, k] = W.fall, t = Math.min(1, Math.max(0, (dist - a) / (b - a)));
  return W.dmg * (1 + (k - 1) * t * t * (3 - 2 * t));
}
// the current cone (half-angle, degrees) for a fighter's gun
export function coneOf(W, f){
  const S = W.spread, ads = f.adsK || 0;
  let c = S.hip + (S.ads - S.hip) * ads;
  const sp = Math.hypot(f.vx, f.vz) / 5;
  c += S.move * Math.min(1, sp) * (1 - ads * 0.82);
  if(!f.ground) c += S.air;
  if(f.crouchK > 0.5) c *= S.crouch;
  return Math.max(0, c + (f.bloom || 0));
}
