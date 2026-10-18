// Automated check in headless Chromium (playwright).
//   node tools/test.mjs          — tests the source (src/)
//   node tools/test.mjs --dist   — tests the release build (dist/web, run npm run build first)
// Floor plans for several seeds (one connected floor, no slits, spawns, lamps, landmarks) and a quick bot match with
// loot and the zone in node; then in the browser: a full bot battle royale to the last one standing, the end screen,
// the player walking, shooting a bot dead and reloading, picking up a gun, armour and medicine, healing, the zone
// hurting outside, the map, rag dolls and loose props in the physics, the pause when the mouse is released, stable
// memory over matches, «Красивая» loads clean too, English with no Russian left, and not one request to another site.
import { chromium } from 'playwright';
import { serve, GL_ARGS } from './serve.mjs';

const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
const fails = [];
const ok = (cond, msg) => { console.log((cond ? '  ok   ' : '  FAIL ') + msg); if(!cond) fails.push(msg); };
console.log('Backshots test:', PAGE);

// ---- floor plans (node) ----
{
  const { buildLevel } = await import('../src/js/level/check.js');
  const { bakeLight } = await import('../src/js/level/lights.js');
  let bad = [];
  for(const seed of [1, 77, 4242, 99991, 123456789]){
    const L = buildLevel(seed), W = L.W, comp = new Int32Array(W * W).fill(-1); let n = 0, slits = 0;
    for(let s = 0; s < W * W; s++){ if(L.g[s] !== 0 || comp[s] >= 0) continue; const st = [s]; comp[s] = n;
      while(st.length){ const x = st.pop(), i = x % W, k = (x - i) / W; for(const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]){ const ni = i + a, nk = k + b; if(ni < 0 || nk < 0 || ni >= W || nk >= W) continue; const d = nk * W + ni; if(L.g[d] === 0 && comp[d] < 0){ comp[d] = n; st.push(d); } } } n++; }
    for(let k = 1; k < W - 1; k++) for(let i = 1; i < W - 1; i++){ const s = k * W + i; if(L.g[s] !== 0) continue; const sol = t => L.g[t] !== 0; if((sol(s - 1) && sol(s + 1)) || (sol(s - W) && sol(s + W))) slits++; }
    bakeLight(L);
    const lit = L.lamps.filter(l => l.state === 'on').length;
    if(n !== 1 || slits || L.spawns.length < 25 || lit < 120 || L.landmarks.length < 5) bad.push({ seed, parts:n, slits, spawns:L.spawns.length, lit, marks:L.landmarks.length });
  }
  ok(!bad.length, 'floor plans: one connected floor, no slits, 25+ spawns, 120+ lit lamps, 5+ landmarks (5 seeds)' + (bad.length ? ' ' + JSON.stringify(bad) : ''));
}

// ---- loot, guns by luck and the zone (node) ----
{
  const R = '../src/js/';
  const { buildLevel } = await import(R + 'level/check.js'); const { bakeLight } = await import(R + 'level/lights.js');
  const { setLevel } = await import(R + 'phys.js'); const { buildNav } = await import(R + 'nav.js');
  const { startMatch, stepMatch } = await import(R + 'match.js'); const { botThink } = await import(R + 'bots.js');
  const { G, on } = await import(R + 'state.js'); const { LOOT } = await import(R + 'loot.js'); const { Z } = await import(R + 'zone.js');
  let taken = 0, zoneHurt = 0, kinds = new Set(); on('take', () => taken++); on('damage', (t, a, s, o) => { if(o && o.zone) zoneHurt++; });
  const L = G.level = buildLevel(77); bakeLight(L); setLevel(L); buildNav();
  startMatch({ count:20, diff:'normal' }); G.me.bot = true;
  for(const f of G.fighters) kinds.add(f.guns[0].id);
  const items = LOOT.items.length, inside = LOOT.items.every(it => L.g[L.ck(it.z) * L.W + L.ci(it.x)] === 0);
  let t = 0, alive30 = 0; while(G.state === 'play' && t < 600){ for(const f of G.fighters) botThink(f, 1 / 30); stepMatch(1 / 30); t += 1 / 30; if(!alive30 && t >= 30) alive30 = G.match.alive; }
  ok(items > 60 && inside, `loot on the floor (${items} items, all on open floor)`);
  ok(kinds.size >= 3, `fighters start with different guns (${[...kinds].join(', ')})`);
  ok(taken > 20, `bots pick things up (${taken} times)`);
  ok(Z.stage >= 1 && zoneHurt > 0 || G.state === 'end' && t < 300, `the zone shrinks and hurts outside (stage ${Z.stage}, ${zoneHurt} hits)`);
  ok(alive30 >= 15, `a calm start: ${alive30} of 20 alive after 30 s; match ${Math.round(t)} s`);
}

const srv = await serve(), port = srv.address().port;
const browser = await chromium.launch({ args:GL_ARGS });
async function open(lang, gfx = 'medium'){
  const ctx = await browser.newContext({ viewport:{ width:1280, height:720 } });
  const page = await ctx.newPage(), errors = [], outside = [];
  await ctx.route('**/*', r => { const u = r.request().url(); if(u.startsWith('http://localhost:' + port)) r.continue(); else { outside.push(u); r.abort(); } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  await page.addInitScript(g => { try{ localStorage.clear(); localStorage.setItem('bs_gfx', JSON.stringify(g)); }catch(e){} }, gfx);
  await page.goto(`http://localhost:${port}${PAGE}?lang=${lang}&freeze`, { waitUntil:'commit', timeout:120000 });
  for(let i = 0; ; i++){ if(await page.evaluate(() => !!window.__bsReady)) break; if(errors.length || i > 1200){ console.log('  the game did not load:', errors.slice(0, 5).join(' | ')); throw new Error('load'); } await page.waitForTimeout(500); }
  return { ctx, page, errors, outside };
}
{
  const { ctx, page, errors, outside } = await open('ru');
  ok(true, 'the game loads');
  // ---- a full bot battle royale ----
  const r = await page.evaluate(async () => {
    await __bs.start({ autopilot:true, count:15 });
    let s; for(let i = 0; i < 60; i++){ s = __bs.sim(10); if(s.state === 'end') break; }
    const G = __bs.G;
    return { s, n:G.fighters.length, places:G.fighters.map(f => f.place).sort((a, b) => a - b).join(','), info:__bs.info() };
  });
  ok(r.s.state === 'end' && r.n === 15, `15 fighters: the match ends (${r.s.why === 'last' ? 'last one standing' : 'time ran out'}: ${r.s.winner}, ${r.s.t} s, ${r.s.kills} kills)`);
  ok(r.s.kills >= 10, `plenty of fighting (${r.s.kills} kills)`);
  ok(r.places === Array.from({ length:15 }, (_, i) => i + 1).join(','), 'everyone gets a place 1..15');
  ok(r.info.rags > 0 && r.info.props > 20, `rag dolls and loose props in the physics (${r.info.rags} rag dolls, ${r.info.props} props)`);
  await page.evaluate(() => { for(let i = 0; i < 3; i++) __bs.tick(1); });
  await page.waitForTimeout(2200);
  ok(await page.evaluate(() => !document.getElementById('end').hidden && document.querySelectorAll('#e-board tr').length > 5), 'the end screen with the table');
  // ---- the player: walk, shoot, reload ----
  const p = await page.evaluate(async () => {
    await __bs.start({ count:3, prep:0, gun:'ak', zone:false });
    const G = __bs.G, me = G.me, t = G.fighters[1];
    // the target stands 6 m in front, in the open
    let yaw = me.yaw, d = 6;
    for(let a = 0; a < 16; a++){ const y = me.yaw + a * Math.PI / 8; if(__bs.losClear(me.x, 1.5, me.z, me.x - Math.sin(y) * 7, 1.5, me.z - Math.cos(y) * 7)){ yaw = y; break; } }
    t.x = me.x - Math.sin(yaw) * d; t.z = me.z - Math.cos(yaw) * d; t.vx = t.vz = 0; t.bot = false;
    __bs.step(10);
    const hp0 = t.hp, mag0 = me.guns[0].mag;
    let n = 0; while(t.alive && n++ < 60){ __bs.aimAt(t); __bs.step(4, true); }
    const shot = { killed:!t.alive, used:mag0 - me.guns[0].mag, kills:me.kills, hp0 };
    me.inp.reload = true; __bs.step(2); const reloading = !!me.reload; __bs.step(240);
    const reloaded = me.guns[0].mag === 30;
    // walk forward for a second
    const x0 = me.x, z0 = me.z; me.inp.mz = 1; __bs.step(60); me.inp.mz = 0;
    return { ...shot, reloading, reloaded, walked:Math.hypot(me.x - x0, me.z - z0), state:G.state };
  });
  ok(p.killed && p.kills === 1 && p.used > 0, `the player shoots a bot dead (${p.used} rounds)`);
  ok(p.reloading && p.reloaded, 'reload refills the magazine');
  ok(p.walked > 1.5, `the player walks (${p.walked.toFixed(1)} m in 1 s)`);
  // ---- loot: a gun, a vest, a medkit at your feet; healing; the vest takes a hit; the zone hurts ----
  const l = await page.evaluate(async () => {
    await __bs.start({ count:3, prep:0, gun:'pistol', zone:false });
    const G = __bs.G, me = G.me, L = __bs.LOOT;
    for(const f of G.fighters) if(f !== me) f.bot = false;
    const put = o => { const it = Object.assign({ id:9000 + L.items.length, y:0, ry:0, x:me.x, z:me.z }, o); L.items.push(it); return it; };
    const g = put({ kind:'gun', gun:'m4', mag:30 }), v = put({ kind:'vest', lv:2, armor:100 }), m = put({ kind:'medkit' });
    __bs.takeLoot(me, g); __bs.takeLoot(me, v); __bs.step(5); __bs.step(40);
    const gunOk = me.guns.length === 2 && me.guns.some(q => q.id === 'm4'), vestOk = me.armor === 100;
    __bs.step(10); const medOk = me.meds.medkit === 1 && !L.items.includes(m);
    me.hp = 40; me.inp.heal = true; __bs.step(2); const healing = !!me.use; __bs.step(260); const healed = me.hp;
    return { gunOk, vestOk, medOk, healing, healed };
  });
  ok(l.gunOk && l.vestOk, 'picking up a second gun and a vest');
  ok(l.medOk && l.healing && l.healed >= 90, `walking over a medkit takes it; healing (${l.healed} hp)`);
  const z = await page.evaluate(async () => {
    await __bs.start({ count:3, prep:0, zone:true });
    const G = __bs.G, me = G.me, Z = __bs.Z; for(const f of G.fighters) if(f !== me) f.bot = false;
    Z.r = 1; Z.cx = me.x + 50; Z.cz = me.z; Z.dps = 5; const hp = me.hp; __bs.step(130);
    __bs.tick(); const map = document.getElementById('mini').getContext('2d').getImageData(90, 90, 1, 1).data[3] > 0;
    return { lost:hp - me.hp, text:document.getElementById('zone-t').textContent, map };
  });
  ok(z.lost >= 8 && z.text.length > 3, `the dark outside the zone hurts (${z.lost} hp in 2 s: «${z.text}»)`);
  ok(z.map, 'the map is drawn');
  const paused = await page.evaluate(async () => { await __bs.start({ count:4 }); return __bs.lockLost(); });
  ok(paused, 'releasing the mouse pauses the game');
  const mem = await page.evaluate(async () => {
    const geo = () => __bs.info().geos;
    await __bs.start({ autopilot:true, count:10 }); __bs.sim(15); __bs.tick(1 / 60); const a = geo();
    for(let i = 0; i < 2; i++){ await __bs.start({ autopilot:true, count:10 }); __bs.sim(15); __bs.tick(1 / 60); }
    return { a, b:geo() };
  });
  ok(mem.b - mem.a < 40, `geometries stay flat over matches (${mem.a} → ${mem.b})`);
  ok(errors.length === 0, 'no script errors' + (errors.length ? ': ' + [...new Set(errors)].slice(0, 3).join(' | ') : ''));
  ok(outside.length === 0, 'no requests to other sites' + (outside.length ? ': ' + outside.slice(0, 3).join(', ') : ''));
  await ctx.close();
}
{
  const { ctx, page, errors } = await open('ru', 'high');
  await page.evaluate(async () => { await __bs.start({ autopilot:true, count:6 }); __bs.sim(5); __bs.tick(); __bs.tick(); });
  ok(errors.length === 0, '«Красивая»: loads and draws with no script errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
{
  const { ctx, page, errors } = await open('en');
  const cyr = () => page.evaluate(() => { const out = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while((n = w.nextNode())){ const el = n.parentElement; if(!el || el.closest('[hidden]') || getComputedStyle(el).display === 'none' || getComputedStyle(el).visibility === 'hidden') continue; if(/[А-Яа-яЁё]/.test(n.nodeValue) && n.nodeValue.trim() !== 'Русский') out.add(n.nodeValue.trim()); } return [...out]; });
  let left = await cyr();
  await page.evaluate(() => { document.getElementById('m-set').click(); });
  left = left.concat(await cyr());
  await page.evaluate(async () => { document.getElementById('s-close').click(); await __bs.start({ autopilot:true, count:8 }); __bs.sim(20); __bs.tick(1 / 60); document.getElementById('board').hidden = false; });
  left = left.concat(await cyr());
  await page.evaluate(() => { const G = __bs.G; G.me.hp = 0; G.me.alive = false; G.me.deadT = 0; G.me.place = 5; __bs.tick(1 / 60); });
  left = left.concat(await cyr());
  await page.evaluate(() => { for(let i = 0; i < 60; i++){ const s = __bs.sim(10); if(s.state === 'end') break; } __bs.tick(1); });
  await page.waitForTimeout(2200);
  left = left.concat(await cyr());
  ok(left.length === 0, 'English: no Russian left on screen' + (left.length ? ': ' + [...new Set(left)].slice(0, 8).join(' | ') : ''));
  ok(errors.length === 0, 'English: no script errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  await ctx.close();
}
await browser.close(); srv.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : '\nall checks passed');
process.exit(fails.length ? 1 : 0);
