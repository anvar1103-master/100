// Automated check in headless Chromium (needs: npm i -D playwright, or a global playwright).
//   node tools/test.mjs          — tests the source (src/)
//   node tools/test.mjs --dist   — tests the release build (dist/web, run npm run build first)
// It serves the repo on a local port, blocks every outside request, then:
//   loads the game, plays one royale per tank class to the end, checks the progression (start on the Recruit, upgrades,
//   class choice, bots growing) and that the English screen has no Russian left.
import http from 'http'; import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.glb':'model/gltf-binary', '.mp3':'audio/mpeg', '.woff2':'font/woff2', '.png':'image/png', '.json':'application/json' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type':TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
}).listen(0);
const port = server.address().port;
const fails = [];
const ok = (cond, msg) => { console.log((cond ? '  ok   ' : '  FAIL ') + msg); if(!cond) fails.push(msg); };

const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
async function open(lang){
  const ctx = await browser.newContext({ viewport:{ width:1280, height:720 } });
  const page = await ctx.newPage(), errors = [], outside = [];
  await ctx.route('**/*', r => { const u = r.request().url(); if(u.startsWith('http://localhost:' + port)) r.continue(); else { outside.push(u); r.abort(); } });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  await page.goto(`http://localhost:${port}${PAGE}?lang=${lang}`);
  await page.waitForFunction('window.__bgReady', null, { timeout:120000 });
  return { ctx, page, errors, outside };
}

console.log('«Последний танк» test:', PAGE);
{
  const { ctx, page, errors, outside } = await open('ru');
  ok(true, 'the game loads');
  // one royale per tank: ten tanks, fog, crates; the match ends when you fall or are the last one left
  for(const hero of ['shroom', 'beetle', 'wasp', 'roly', 'hopper']){
    await page.evaluate(h => { __bg.start({ mode:'br', hero:h, skipCount:true }); __bg.autopilot(true); }, hero);
    let s; for(let i = 0; i < 60; i++){ await page.evaluate(() => __bg.sim(5)); s = await page.evaluate(() => __bg.s); if(s.state === 'end') break; }
    const r = await page.evaluate(() => ({ crates:__bg.G.match.crates, power:__bg.G.fighters.reduce((a, f) => a + (f.gemsPicked || 0), 0), knock:__bg.G.fighters.filter(f => !f.alive).length }));
    ok(s.state === 'end' && s.mode === 'br' && s.place >= 1, `${hero}: royale ends (#${s.place}, ${s.t} s, fog ${s.fog} m, ${r.knock} knocked out, ${r.crates} crates, ${r.power} power picked)`);
    ok(r.crates > 0 && r.knock > 0, `${hero}: crates break and tanks fight`);
  }
  // progression: everyone starts on the Recruit; the player's upgrade button and class choice work; bots level up,
  // spend their points and take classes by themselves
  const pr = await page.evaluate(() => {
    __bg.start({ mode:'br', skipCount:true });
    const G = __bg.G, me = G.me, start = G.fighters.every(f => f.hero === 'rookie');
    __bg.prog.addXP(me, 400); __bg.tick(1 / 30);
    document.querySelector('#ups-list [data-up="hp"]').click(); __bg.tick(1 / 30);
    const evoShown = !document.getElementById('evo').hidden;
    document.querySelector('#evo-list [data-c="shroom"]').click();
    const cls = me.hero;
    __bg.autopilot(true); __bg.sim(70);
    return { start, up:me.up.hp, evoShown, cls, evolved:G.fighters.filter(f => f.hero !== 'rookie').length, maxLvl:Math.max(...G.fighters.map(f => f.lvl)) };
  });
  ok(pr.start && pr.up === 1 && pr.evoShown && pr.cls === 'shroom', 'progression: start on the Recruit, upgrade button, class choice');
  ok(pr.evolved >= 4 && pr.maxLvl >= 5, `progression: bots level up and take classes (${pr.evolved} of 10 with a class, top level ${pr.maxLvl})`);
  ok(errors.length === 0, 'no script errors' + (errors.length ? ': ' + errors.slice(0, 3).join(' | ') : ''));
  ok(outside.length === 0, 'no requests to other sites' + (outside.length ? ': ' + outside.slice(0, 3).join(', ') : ''));
  await ctx.close();
}
{
  const { ctx, page } = await open('en');
  const cyr = () => page.evaluate(() => { const out = new Set(); const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while((n = w.nextNode())){ const el = n.parentElement; if(!el || el.closest('[hidden]') || getComputedStyle(el).display === 'none') continue; if(/[А-Яа-яЁё]/.test(n.nodeValue)) out.add(n.nodeValue.trim()); } return [...out]; });
  let left = await cyr();
  await page.evaluate(() => { __bg.start({ mode:'br', hero:'shroom', skipCount:true }); __bg.autopilot(true); __bg.sim(30); });
  left = left.concat(await cyr());
  await page.evaluate(() => { __bg.sim(200); __bg.sim(4); });
  left = left.concat(await cyr());
  ok(left.length === 0, 'English: no Russian text on screen' + (left.length ? ': ' + left.slice(0, 5).join(' | ') : ''));
  await ctx.close();
}
await browser.close(); server.close();
console.log(fails.length ? `\n${fails.length} check(s) failed` : '\nall checks passed');
process.exit(fails.length ? 1 : 0);
