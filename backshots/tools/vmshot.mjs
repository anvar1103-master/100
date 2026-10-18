// First-person close-ups of every gun, hip and aimed (to tune the hands): node tools/vmshot.mjs <out dir> [ak,m4,shotgun,sniper,pistol]
import fs from 'fs'; import path from 'path';
import { chromium } from 'playwright';
import { serve, GL_ARGS } from './serve.mjs';
const out = process.argv[2] || 'vm'; fs.mkdirSync(out, { recursive:true });
const guns = (process.argv[3] || 'ak,m4,shotgun,sniper,pistol').split(',');
const srv = await serve(), port = srv.address().port;
const b = await chromium.launch({ args:GL_ARGS });
const page = await (await b.newContext({ viewport:{ width:960, height:540 } })).newPage(), errors = [];
page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if(m.type() === 'error') errors.push(m.text().slice(0, 300)); if(m.text().startsWith('vm ')) console.log(m.text()); });
await page.addInitScript(() => { try{ localStorage.setItem('bs_gfx', JSON.stringify('medium')); }catch(e){} });
await page.goto(`http://localhost:${port}/src/index.html?lang=ru&freeze&seed=4242`, { waitUntil:'commit' });
for(let i = 0; ; i++){ if(await page.evaluate(() => !!window.__bsReady)) break; if(errors.length){ console.log(errors.join('\n')); process.exit(1); } if(i > 1200) throw 0; await page.waitForTimeout(500); }
for(const g of guns){
  await page.evaluate(async g => { await __bs.start({ count:2, prep:0, gun:g, zone:false }); const G = __bs.G; for(const f of G.fighters) if(f !== G.me) f.bot = false; __bs.PL.pitch = -0.05; __bs.step(30); __bs.settle(1.5); console.log('vm', JSON.stringify({ vis:__bs.VMS.root.visible, gid:__bs.VMS.gid, shown:__bs.VMS.shown, state:G.state })); }, g);
  for(const [name, aim] of [['hip', false], ['ads', true]]){
    await page.evaluate(aim => { const me = __bs.G.me; __bs.step(aim ? 30 : 2, false, aim); me.inp.aim = aim; __bs.settle(0.6); __bs.tick(); }, aim);
    const t = Date.now(); await page.screenshot({ path:path.join(out, `${g}_${name}.jpg`), quality:85, timeout:600000 }); console.log(g, name, Date.now() - t, 'ms');
  }
}
console.log('errors:', errors.slice(0, 8).join('\n'));
await b.close(); srv.close();
