// Screenshots for checking the picture (software rendering is slow: use sparingly).
//   node tools/shot.mjs <out dir> [medium|high] [--dist] [seed]
// Shots: the menu corridor, the first-person view in a match, a bot close-up, aiming, after a fight (bodies, blood),
// loot on the floor, the edge of the light zone, the floor map.
import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';
import { serve, GL_ARGS } from './serve.mjs';
const [out = 'shots', gfx = 'high'] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const seed = process.argv.slice(2).find(a => /^\d+$/.test(a)) || '4242';
const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
fs.mkdirSync(out, { recursive:true });
const srv = await serve(), port = srv.address().port;
const b = await chromium.launch({ args:GL_ARGS });
const ctx = await b.newContext({ viewport:{ width:1280, height:720 } }), page = await ctx.newPage(), errors = [];
page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if(m.type() === 'error' || m.type() === 'warning') errors.push(m.type() + ': ' + m.text().slice(0, 300)); });
await page.addInitScript(g => { try{ localStorage.setItem('bs_gfx', JSON.stringify(g)); }catch(e){} }, gfx);
const t0 = Date.now();
await page.goto(`http://localhost:${port}${PAGE}?lang=ru&freeze&seed=${seed}`, { waitUntil:'commit' });
for(let i = 0; ; i++){ if(await page.evaluate(() => !!window.__bsReady)) break; if(errors.some(e => !e.startsWith('warning'))){ console.log('load failed:\n' + errors.join('\n')); process.exit(1); } if(i > 1200) throw new Error('not ready'); await page.waitForTimeout(500); }
console.log('loaded in', Date.now() - t0, 'ms');
const snap = async name => { const t = Date.now(); await page.screenshot({ path:path.join(out, name + '.jpg'), quality:85, timeout:600000 }); console.log(name, Date.now() - t, 'ms'); };
await page.evaluate(() => { for(let i = 0; i < 30; i++) __bs.tick(1 / 60); }); await snap('menu');
await page.evaluate(() => __bs.start({ autopilot:true, count:12 }));
await page.evaluate(() => { __bs.autopilot(false); const me = __bs.G.me; me.inp.light = false; __bs.settle(1); __bs.tick(); __bs.tick(); }); await snap('fp');
// a bot in view: put one 4 m in front of the player
await page.evaluate(() => { const G = __bs.G, me = G.me, b = G.fighters[1]; const yaw = me.yaw; b.x = me.x - Math.sin(yaw) * 4; b.z = me.z - Math.cos(yaw) * 4; b.yaw = yaw + Math.PI; b.inp.yaw = b.yaw; b.vx = b.vz = 0; __bs.settle(1); __bs.tick(); __bs.tick(); }); await snap('bot');
await page.evaluate(() => { __bs.G.me.inp.aim = true; __bs.step(30, false, true); __bs.settle(0.5); __bs.tick(); }); await snap('ads');
await page.evaluate(() => { __bs.autopilot(true); __bs.sim(40); for(let i = 0; i < 60; i++) __bs.tick(1 / 30); }); await snap('fight');
await page.evaluate(() => { __bs.autopilot(false); const L = __bs.LOOT.items, me = __bs.G.me; let best = null, bd = 1e9;
  for(const it of L){ if(it.kind !== 'gun') continue; const d = Math.hypot(it.x - me.x, it.z - me.z); if(d < bd && __bs.losClear(it.x + 1.1, 1.2, it.z + 0.9, it.x, 0.2, it.z)){ bd = d; best = it; } }
  if(best){ const near = L.filter(o => Math.hypot(o.x - best.x, o.z - best.z) < 2.5); __bs.cam([best.x + 1.3, 1.25, best.z + 1.0, best.x, 0.1, best.z]); }
  for(let i = 0; i < 20; i++) __bs.tick(1 / 30); }); await snap('loot');
await page.evaluate(() => { __bs.cam(null); const G = __bs.G, me = G.me, Z = __bs.Z; me.alive = true; me.hp = 100; Z.on = true; Z.phase = 'wait'; Z.t = 0;
  Z.cx = me.x + Math.sin(me.yaw) * 3; Z.cz = me.z + Math.cos(me.yaw) * 3; Z.r = 8; __bs.settle(0.5); for(let i = 0; i < 20; i++) __bs.tick(1 / 30); }); await snap('zone');
await page.evaluate(() => { __bs.bigMap(true); __bs.tick(1 / 30); __bs.tick(1 / 30); }); await snap('map');
console.log(JSON.stringify(await page.evaluate(() => ({ s:__bs.s, info:__bs.info(), bench:__bs.bench(5) }))));
console.log('errors:', [...new Set(errors)].slice(0, 15).join('\n'));
await b.close(); srv.close();
