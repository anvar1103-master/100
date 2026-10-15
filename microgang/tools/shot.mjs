// Screenshots for checking the look: node tools/shot.mjs <out-dir> [--dist] [--size=1280x720] [--gfx=medium] "name:x,y,z,tx,ty,tz" ...
// Serves the repo, blocks outside requests, sets the free camera through window.__mg and saves PNGs.
import http from 'http'; import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2), out = args.find(a => !a.startsWith('--') && !a.includes(':')) || '.';
const PAGE = args.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
const [W, H] = (args.find(a => a.startsWith('--size=')) || '--size=1280x720').slice(7).split('x').map(Number);
const gfx = (args.find(a => a.startsWith('--gfx=')) || '--gfx=medium').slice(6);
const extra = (args.find(a => a.startsWith('--js=')) || '').slice(5);
const shots = args.filter(a => a.includes(':') && !a.startsWith('--')).map(a => { const [n, c] = a.split(':'); return { n, c:c.split(',').map(Number) }; });
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.mp3':'audio/mpeg', '.woff2':'font/woff2', '.glb':'model/gltf-binary' };
const server = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0])); if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type':TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); }).listen(0);
const port = server.address().port;
const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport:{ width:W, height:H } });
const page = await ctx.newPage(); const errs = [];
await ctx.route('**/*', r => r.request().url().startsWith('http://localhost:' + port) ? r.continue() : r.abort());
page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if(m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text()); });
await page.addInitScript(g => { try{ localStorage.setItem('mg_gfx', JSON.stringify(g)); }catch(e){} }, gfx);
await page.goto(`http://localhost:${port}${PAGE}?lang=ru&freeze`, { waitUntil:"commit", timeout:120000 });
await page.waitForFunction('window.__mgReady', null, { timeout:240000 });
if(extra) await page.evaluate(extra);
fs.mkdirSync(out, { recursive:true });
for(const s of shots){
  await page.evaluate(c => { __mg.cam(c); __mg.tick(1 / 60); __mg.tick(1 / 60); }, s.c);
  await page.waitForTimeout(300);
  await page.screenshot({ path:path.join(out, s.n + '.png'), timeout:120000 });
  console.log('shot', s.n, JSON.stringify(await page.evaluate(() => __mg.info())));
}
if(errs.length) console.log('console:', [...new Set(errs)].slice(0, 12).join('\n'));
await browser.close(); server.close();
