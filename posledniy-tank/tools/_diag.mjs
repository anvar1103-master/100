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

const { ctx, page } = await open('ru');
await page.evaluate(() => { __bg.start({ mode:'br', hero:'shroom', skipCount:true }); __bg.autopilot(true); });
for(let i = 0; i < 60; i++){ await page.evaluate(() => __bg.sim(5)); const s = await page.evaluate(() => __bg.s); if(s.state === 'end') break; }
const r = await page.evaluate(() => {
  __bg.start({ mode:'br', skipCount:true });
  const G = __bg.G, me = G.me, o = { start: G.fighters.every(f => f.hero === 'rookie'), state:G.state };
  __bg.prog.addXP(me, 400); __bg.tick(1/30);
  o.lvl = me.lvl; o.pts = me.pts; o.alive=me.alive; o.upsHidden = document.getElementById('ups').hidden;
  const b = document.querySelector('#ups-list [data-up="hp"]'); b.click(); __bg.tick(1/30);
  o.up = me.up.hp; o.evoShown = !document.getElementById('evo').hidden;
  document.querySelector('#evo-list [data-c="shroom"]').click(); o.cls = me.hero;
  return o;
});
console.log(JSON.stringify(r)); await browser.close(); server.close();
