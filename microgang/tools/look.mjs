// Screenshots of arranged scenes: node tools/look.mjs <outdir> <low/medium/high> <steps.json>
// steps: [{ n:name, js:"code run in page", ticks:3 }]
import http from 'http'; import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [OUT, GFX, STEPS] = process.argv.slice(2);
const steps = JSON.parse(fs.readFileSync(STEPS, 'utf8'));
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.mp3':'audio/mpeg', '.woff2':'font/woff2' };
const server = http.createServer((req, res) => { const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0])); if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type':TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res); }).listen(0);
const port = server.address().port;
const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport:{ width:+(process.env.W || 1280), height:+(process.env.H || 720) } });
const page = await ctx.newPage(); const errs = [];
page.on('pageerror', e => errs.push('PAGE: ' + e.message + ' ' + (e.stack || '').split('\n').slice(0, 3).join(' | ')));
page.on('console', m => { if(m.type() === 'error' || m.type() === 'warning') errs.push(m.type() + ': ' + m.text().slice(0, 300)); });
await page.addInitScript(g => { try{ localStorage.setItem('mg_gfx', JSON.stringify(g)); }catch(e){} }, GFX || 'medium');
await page.goto(`http://localhost:${port}/src/index.html?lang=${process.env.LANG2 || 'ru'}&freeze`, { waitUntil:'commit', timeout:120000 });
await page.waitForFunction('window.__mgReady', null, { timeout:300000 });
fs.mkdirSync(OUT, { recursive:true });
for(const s of steps){
  const r = await page.evaluate(s.js || 'null');
  await page.evaluate(n => { for(let k = 0; k < n; k++) __mg.tick(1 / 60); }, s.ticks ?? 3);
  if(s.n) await page.screenshot({ path:path.join(OUT, s.n + '.png'), timeout:120000 });
  console.log(s.n || '-', r === undefined ? '' : JSON.stringify(r));
}
console.log([...new Set(errs)].filter(e => !e.includes('willReadFrequently')).slice(0, 15).join('\n'));
await browser.close(); server.close();
