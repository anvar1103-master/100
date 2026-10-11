// Phone-screen check: the menu, settings, pause, a royale battle and its end screen on three phone sizes
// (two small landscapes and a portrait). Reports every button or input that sticks out of the screen and saves
// screenshots for a look.
//   node tools/ui-check.mjs <out-dir> [--dist]
// Needs the repo served on http://localhost:8125 (see CLAUDE.md).
import { chromium } from 'playwright';
import fs from 'fs';
const OUT = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '/tmp/ui-check';
const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
fs.mkdirSync(OUT, { recursive:true });
const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let problems = 0;
for(const [w, h] of [[667, 375], [740, 360], [390, 844]]){
  const ctx = await browser.newContext({ viewport:{ width:w, height:h }, hasTouch:true, isMobile:true, deviceScaleFactor:1 });
  const p = await ctx.newPage(); p.setDefaultTimeout(900000);
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`http://localhost:8125${PAGE}?lang=ru`);
  await p.waitForFunction('window.__bgReady', null, { timeout:120000 });
  const check = async name => {
    const out = await p.evaluate(() => [...document.querySelectorAll('button, input, .tbtn')].filter(e => e.offsetParent && !e.closest('[hidden]')).map(e => ({ t:(e.textContent || e.id).trim().slice(0, 18), b:e.getBoundingClientRect() }))
      .filter(o => o.b.width && (o.b.left < -1 || o.b.top < -1 || o.b.right > innerWidth + 1 || o.b.bottom > innerHeight + 1)).map(o => `«${o.t}» ${Math.round(o.b.left)},${Math.round(o.b.top)}–${Math.round(o.b.right)},${Math.round(o.b.bottom)}`));
    await p.screenshot({ path:`${OUT}/${w}x${h}_${name}.png` });
    problems += out.length;
    console.log(`${w}x${h} ${name.padEnd(8)} ${out.length ? 'OFF SCREEN: ' + out.join(' | ') : 'ok'}`);
  };
  await check('menu');
  await p.evaluate(() => document.getElementById('m-set').click()); await check('settings');
  await p.evaluate(() => { document.getElementById('s-close').click(); __bg.start({ mode:'br', skipCount:true }); __bg.pause(true); }); await check('pause');
  await p.evaluate(() => { __bg.pause(false); }); await check('battle');
  await p.evaluate(() => { __bg.autopilot(true); for(let i = 0; i < 80 && __bg.s.state !== 'end'; i++) __bg.sim(5); __bg.sim(4); }); await check('end');
  if(errs.length) console.log(`${w}x${h} SCRIPT ERRORS: ${errs.slice(0, 3).join(' | ')}`);
  await ctx.close();
}
console.log(problems ? `${problems} element(s) off screen` : 'everything fits', '— screenshots in', OUT);
await browser.close();
