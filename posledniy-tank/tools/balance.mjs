// Bot-only balance and pacing run for «Последний гриб» (headless Chromium, no rendering needed).
//   node tools/balance.mjs [matches=25] [--dist]
// Needs the repo served on http://localhost:8125 (see CLAUDE.md). Every fighter is a bot; the rotating "me" hero
// keeps the hero mix even. Prints one line per hero (average place of 10, win %, top-3 %, knockouts, damage) and the
// average match length. Lower average place = stronger.
import { chromium } from 'playwright';
const N = +process.argv.find(a => /^\d+$/.test(a)) || 25;
const PAGE = process.argv.includes('--dist') ? '/dist/web/index.html' : '/src/index.html';
const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await browser.newPage({ viewport:{ width:320, height:180 } }); p.setDefaultTimeout(900000);
const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:8125' + PAGE + '?lang=ru');
await p.waitForFunction('window.__bgReady', null, { timeout:120000 });
await p.evaluate(() => __bg.pause(true));
const heroes = await p.evaluate(() => [...document.querySelectorAll('#heroes [data-h]')].map(b => b.dataset.h));
const st = {}, ends = [], firsts = [];
for(let m = 0; m < N; m++){
  const r = await p.evaluate(([m, H]) => {
    __bg.start({ mode:'br', hero:H[m % H.length], skipCount:true }); __bg.autopilot(true);
    const G = __bg.G, M = G.match; G.me = null;   // everyone is a bot; nobody ends the match early
    let first = null; const fn = () => { if(first === null) first = M.t; }; (G.hooks.kill = G.hooks.kill || []).unshift(fn);
    try{ for(let i = 0; i < 400 && M.alive > 1; i++) __bg.sim(1); }catch(e){}
    G.hooks.kill.splice(G.hooks.kill.indexOf(fn), 1);
    const w = G.fighters.find(f => f.alive); if(w) w.place = 1;
    const out = { end:M.t, first, list:G.fighters.map(f => [f.hero, f.place || 1, f.kills, Math.round(f.dmgDone)]) };
    G.me = G.fighters[0]; __bg.showMenu();
    return out;
  }, [m, heroes]);
  ends.push(r.end); if(r.first !== null) firsts.push(r.first);
  for(const [h, pl, k, d] of r.list){ const s = st[h] || (st[h] = { n:0, pl:0, win:0, top3:0, k:0, d:0 }); s.n++; s.pl += pl; s.win += pl === 1; s.top3 += pl <= 3; s.k += k; s.d += d; }
}
const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0;
console.log(`balance: ${N} royale matches (${PAGE})`);
for(const [h, s] of Object.entries(st).sort((a, b) => a[1].pl / a[1].n - b[1].pl / b[1].n))
  console.log(h.padEnd(8), 'n', String(s.n).padStart(3), ' place', (s.pl / s.n).toFixed(2), ' win%', String(Math.round(s.win / s.n * 100)).padStart(3), ' top3%', String(Math.round(s.top3 / s.n * 100)).padStart(3), ' kills', (s.k / s.n).toFixed(2), ' dmg', Math.round(s.d / s.n));
console.log(`match length ${avg(ends)} s, first knockout at ${avg(firsts)} s` + (errs.length ? `, ERRORS: ${errs.slice(0, 3).join(' | ')}` : ', no errors'));
await browser.close();
