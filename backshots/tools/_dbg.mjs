const R = new URL('../src/js/', import.meta.url).href;
const { buildLevel } = await import(R + 'level/check.js');
const { bakeLight } = await import(R + 'level/lights.js');
const { setLevel } = await import(R + 'phys.js');
const { buildNav } = await import(R + 'nav.js');
const { startMatch, stepMatch } = await import(R + 'match.js');
const { botThink } = await import(R + 'bots.js');
const { G } = await import(R + 'state.js');
G.level = buildLevel(1000); bakeLight(G.level); setLevel(G.level); buildNav();
startMatch({ count:20, diff:'normal' }); G.me.bot = true;
let t = 0, moved = 0, last = G.fighters.map(f => [f.x, f.z]), tgt = 0, hold = 0, lightOn = 0, samples = 0, near = 0;
while(t < 120){ for(const f of G.fighters) botThink(f, 1 / 30); stepMatch(1 / 30); t += 1 / 30;
  if(Math.round(t * 30) % 30 === 0){ samples++; G.fighters.forEach((f, i) => { if(!f.alive) return; moved += Math.hypot(f.x - last[i][0], f.z - last[i][1]); last[i] = [f.x, f.z]; if(f.bot_?.target) tgt++; if(f.bot_?.holdT > 0) hold++; if(f.light) lightOn++;
    let nd = 1e9; for(const o of G.fighters) if(o !== f && o.alive) nd = Math.min(nd, Math.hypot(o.x - f.x, o.z - f.z)); near += nd; }); }
}
const alive = G.fighters.filter(f => f.alive).length;
console.log('alive', alive, 'avg speed', (moved / samples / alive).toFixed(2), 'm/s; with target', (tgt / samples).toFixed(1), 'holding', (hold / samples).toFixed(1), 'lights', (lightOn / samples).toFixed(1), 'nearest enemy avg', (near / samples / alive).toFixed(1));
console.log(G.fighters.map(f => f.name + ':' + (f.alive ? 'A' : 'D') + ' ' + f.kills).join(', '));
