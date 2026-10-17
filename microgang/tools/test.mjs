// Automated check in headless Chromium (playwright).
//   node tools/test.mjs          — tests the source (src/)
//   node tools/test.mjs --dist   — tests the release build (dist/web, run npm run build first)
// Serves the folder on a local port, blocks every outside request, then: plays full free-for-all bot matches
// (12 and 16 fighters) to the end, checks the player's moving, shooting, reloading and weapon swap, the pause when
// the mouse is released, valid spawn points, stable memory over several matches, and English with no Russian left.
import http from 'http'; import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.mp3':'audio/mpeg', '.woff2':'font/woff2', '.json':'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type':TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;
const fails = [];
const ok = (cond, msg) => { console.log((cond ? '  ok   ' : '  FAIL ') + msg); if(!cond) fails.push(msg); };

const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
async function open(lang, gfx = 'low'){
  const ctx = await browser.newContext({ viewport:{ width:1280, height:720 } });
  const page = await ctx.newPage(), errors = [], outside = [];
  await ctx.route('**/*', r => { const u = r.request().url(); if(u.startsWith('http://localhost:' + port)) r.continue(); else { outside.push(u); r.abort(); } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(g => { try{ localStorage.clear(); localStorage.setItem('mg_gfx', JSON.stringify(g)); }catch(e){} }, gfx);
  // ?freeze: the test drives frames itself (the software renderer is slow)
  await page.goto(`http://localhost:${port}${PAGE}?lang=${lang}&freeze`, { waitUntil:'commit', timeout:120000 });
  try{ await page.waitForFunction('window.__mgReady', null, { timeout:600000 }); }
  catch(e){ console.log('  the game did not load; errors:', errors.slice(0, 5).join(' | ')); throw e; }
  return { ctx, page, errors, outside };
}

console.log('Microgang test:', PAGE);
{
  const { ctx, page, errors, outside } = await open('ru');
  ok(true, 'the game loads');
  // ---- full bot matches ----
  for(const count of [12, 16]){
    const r = await page.evaluate(n => {
      __mg.start({ autopilot:true, count:n });
      const G = __mg.G, byW = {}, heads = { n:0 };
      const off = [];
      let s; for(let i = 0; i < 60; i++){ s = __mg.sim(10); if(s.state === 'end') break; }
      for(const f of G.fighters) byW[f.primary] = (byW[f.primary] || 0) + f.kills;
      return { s, n:G.fighters.length, byW, deaths:G.fighters.reduce((a, f) => a + f.deaths, 0), places:G.fighters.map(f => f.place).sort((a, b) => a - b).join(',') };
    }, count);
    ok(r.s.state === 'end' && r.n === count, `${count} fighters: the match ends (${r.s.why === 'kills' ? 'winner reached ' + 25 + ' kills' : 'time ran out'}: ${r.s.winner}, ${r.s.t} s, ${r.s.kills} kills in all)`);
    ok(r.s.kills >= (count === 12 ? 60 : 70), `${count} fighters: plenty of fighting (${r.s.kills} kills, ${r.deaths} deaths; kills by gun ${JSON.stringify(r.byW)})`);
    ok(Object.values(r.byW).filter(v => v > 0).length >= 3, `${count} fighters: every primary gun gets kills`);
    ok(r.places === Array.from({ length:count }, (_, i) => i + 1).join(','), `${count} fighters: everyone gets a place`);
    // the end screen shows up
    await page.evaluate(() => { for(let i = 0; i < 3; i++) __mg.tick(1); });
    await page.waitForTimeout(1800);
    const endShown = await page.evaluate(() => !document.getElementById('end').hidden && document.querySelectorAll('#e-board tr').length > 5);
    ok(endShown, `${count} fighters: the end screen with the table`);
  }
  // ---- the player: walk, shoot, reload, swap, pick a new gun while dead ----
  const p = await page.evaluate(() => {
    __mg.start({});
    const G = __mg.G, me = G.me, t = G.fighters[1];
    G.fighters.forEach((f, i) => { if(i > 1){ f.x = -40 + i * 4; f.z = 44; } });
    me.x = -22; me.z = 0; t.x = -31; t.z = 0.5; for(const f of [me, t]){ f.vx = f.vz = 0; f.shieldT = 0; }
    __mg.step(30);
    const x0 = me.x, z0 = me.z;
    me.inp.mz = 1; __mg.PL.yaw = Math.PI / 2; __mg.step(90); me.inp.mz = 0;
    const walked = Math.hypot(me.x - x0, me.z - z0);
    me.x = -22; me.z = 0; __mg.step(30);
    const hp0 = t.hp, mag0 = me.guns[0].mag;
    let n = 0; while(t.alive && n++ < 80){ __mg.aimAt(t); __mg.step(4, true); }
    const shot = { killed:!t.alive, used:mag0 - me.guns[0].mag, kills:me.kills };
    // reload
    me.inp.reload = true; __mg.step(2); const reloading = !!me.reload; __mg.step(200);
    const reloaded = me.guns[0].mag === 30;
    // swap to the revolver and back
    me.inp.slot = 1; __mg.step(60); const swapped = me.cur === 1 && me.guns[1].W.id === 'comb';
    me.inp.slot = 0; __mg.step(60);
    // shotgun shells go in one by one; the sniper's bolt cycles
    return { walked, ...shot, reloading, reloaded, swapped, back:me.cur === 0 };
  });
  ok(p.walked > 4.5, `the player walks (${p.walked.toFixed(1)} steps in 1.5 s)`);
  ok(p.killed && p.kills === 1 && p.used > 0, `the player shoots a bot dead (${p.used} rounds)`);
  ok(p.reloading && p.reloaded, 'reload refills the magazine');
  ok(p.swapped && p.back, 'swapping to the pistol and back');
  const w = await page.evaluate(() => {
    const G = __mg.G, out = {};
    for(const id of ['acorn', 'needle']){
      __mg.start({ primary:id });
      const me = G.me, t = G.fighters[1]; G.fighters.forEach((f, i) => { if(i > 1){ f.x = -40 + i * 4; f.z = 44; } });
      me.x = -22; me.z = 0; t.x = -26; t.z = 0.3; for(const f of [me, t]){ f.vx = f.vz = 0; f.shieldT = 0; } __mg.step(30);
      // aim down the sights first (the sniper is wild from the hip), then one shot
      __mg.aimAt(t); __mg.step(30, false, true); __mg.aimAt(t); __mg.step(2, true, true); const one = me.guns[0].mag, hp = t.hp;
      __mg.step(20, true, true); const cycled = me.guns[0].mag;   // pump / bolt: no second shot this soon
      me.inp.reload = true; __mg.step(400);
      out[id] = { one, cycled, full:me.guns[0].mag, hp };
    }
    return out;
  });
  ok(w.acorn.one === 5 && w.acorn.cycled >= 4 && w.acorn.full === 6 && w.acorn.hp < 60, `shotgun: one shot per pump hurts badly up close, shells reload to full (${JSON.stringify(w.acorn)})`);
  ok(w.needle.one === 4 && w.needle.full === 5 && w.needle.hp <= 0, `sniper: one aimed body hit kills, bolt between shots (${JSON.stringify(w.needle)})`);
  const d = await page.evaluate(() => {
    __mg.start({}); const G = __mg.G, me = G.me;
    localStorage.setItem('mg_primary', JSON.stringify('hornet'));
    me.shieldT = 0; me.hp = 1; me.sinceHit = 0;
    const k = G.fighters[1];
    // killed: the death card, the pick, then back in with the new gun
    me.hp = 0; me.alive = false; me.deadT = 0; me.deaths++;
    __mg.tick(1 / 60);
    const card = !document.getElementById('dead').hidden;
    document.querySelector('#deadpick [data-w="needle"]').click();
    __mg.step(260);
    return { card, alive:me.alive, gun:me.guns[0].W.id };
  });
  ok(d.card && d.alive && d.gun === 'needle', `death card, a new gun picked there, back in after the wait (${JSON.stringify(d)})`);
  // Review focus: losing the mouse pauses
  const paused = await page.evaluate(() => { __mg.start({}); return __mg.lockLost(); });
  ok(paused, 'releasing the mouse pauses the game');
  // Review focus: every spawn point is free and on the ground; spawns never land inside things
  const sp = await page.evaluate(() => {
    let bad = 0; const G = __mg.G;
    for(const s of __mg.WORLD.spawns) if(Math.abs(s.y - __mg.ground(s.x, s.z)) > 0.1) bad++;
    __mg.start({ autopilot:true });
    for(let i = 0; i < 20; i++){ __mg.sim(4); for(const f of G.fighters) if(f.alive && f.y < __mg.ground(f.x, f.z) - 0.6) bad++; }
    return { n:__mg.WORLD.spawns.length, bad };
  });
  ok(sp.n >= 30 && sp.bad === 0, `spawn points are spread and valid (${sp.n} points, ${sp.bad} bad)`);
  // Review focus: memory stays flat over several matches
  const mem = await page.evaluate(() => {
    const geo = () => __mg.info().geos;
    __mg.start({ autopilot:true }); __mg.sim(20); __mg.tick(1 / 60); const a = geo();
    for(let i = 0; i < 3; i++){ __mg.start({ autopilot:true }); __mg.sim(20); __mg.tick(1 / 60); }
    return { a, b:geo() };
  });
  ok(mem.b - mem.a < 20, `geometries stay flat over matches (${mem.a} → ${mem.b})`);
  ok(errors.length === 0, 'no script errors' + (errors.length ? ': ' + [...new Set(errors)].slice(0, 3).join(' | ') : ''));
  ok(outside.length === 0, 'no requests to other sites' + (outside.length ? ': ' + outside.slice(0, 3).join(', ') : ''));
  await ctx.close();
}
{
  const { ctx, page, errors } = await open('en');
  const cyr = () => page.evaluate(() => { const out = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while((n = w.nextNode())){ const el = n.parentElement; if(!el || el.closest('[hidden]') || getComputedStyle(el).display === 'none' || getComputedStyle(el).visibility === 'hidden') continue; if(/[А-Яа-яЁё]/.test(n.nodeValue) && n.nodeValue.trim() !== 'Русский') out.add(n.nodeValue.trim()); } return [...out]; });
  let left = await cyr();
  await page.evaluate(() => { document.getElementById('m-set').click(); });
  left = left.concat(await cyr());
  await page.evaluate(() => { document.getElementById('s-close').click(); __mg.start({ autopilot:true }); __mg.sim(40); __mg.tick(1 / 60); document.getElementById('board').hidden = false; });
  left = left.concat(await cyr());
  await page.evaluate(() => { const G = __mg.G; G.me.alive = false; G.me.deadT = 0; __mg.tick(1 / 60); });
  left = left.concat(await cyr());
  await page.evaluate(() => { for(let i = 0; i < 60; i++){ const s = __mg.sim(10); if(s.state === 'end') break; } __mg.tick(1); });
  await page.waitForTimeout(1800);
  left = left.concat(await cyr());
  ok(left.length === 0, 'English: no Russian left on screen' + (left.length ? ': ' + [...new Set(left)].slice(0, 8).join(' | ') : ''));
  ok(errors.length === 0, 'English: no script errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
await browser.close(); server.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : '\nall checks passed');
process.exit(fails.length ? 1 : 0);
