// Release build of «Последний танк»: bundles src/ into dist/web (one minified game.js, no outside requests),
// copies it to ../docs/posledniy-tank for GitHub Pages and (unless --no-zip) packs ../packages/posledniy-tank.zip.
// Usage: node tools/build.mjs [--no-zip]
import * as esbuild from 'esbuild';
import fs from 'fs'; import path from 'path'; import { execFileSync } from 'child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SRC = path.join(ROOT, 'src'), OUT = path.join(ROOT, 'dist', 'web'), YA = path.join(ROOT, 'dist', 'yandex');
const rm = p => fs.rmSync(p, { recursive:true, force:true });
const copy = (a, b) => fs.cpSync(a, b, { recursive:true });
rm(path.join(ROOT, 'dist')); fs.mkdirSync(path.join(OUT, 'js'), { recursive:true });

// ---- scripts: one ES module, three.js tree-shaken in ----
const r = await esbuild.build({
  entryPoints:[path.join(SRC, 'js/main.js')], bundle:true, format:'esm', minify:true, target:'es2022',
  outfile:path.join(OUT, 'js/game.js'), legalComments:'none', metafile:true, logLevel:'warning',
  alias:{ 'three/addons':path.join(ROOT, 'node_modules/three/examples/jsm') }
});
// ---- styles, fonts, assets ----
await esbuild.build({ entryPoints:[path.join(SRC, 'style.css')], minify:true, outfile:path.join(OUT, 'style.css'), logLevel:'warning' });
copy(path.join(SRC, 'fonts'), path.join(OUT, 'fonts'));
copy(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
// ---- page: drop the dev import map, point at the bundle ----
let html = fs.readFileSync(path.join(SRC, 'index.html'), 'utf8');
html = html.replace(/<script type="importmap">[\s\S]*?<\/script>\n?/, '').replace('src="js/main.js"', 'src="js/game.js"');
fs.writeFileSync(path.join(OUT, 'index.html'), html);

// ---- nothing may be fetched from other sites ----
for(const f of walk(OUT)){
  if(!/\.(html|js|css)$/.test(f)) continue;
  const s = fs.readFileSync(f, 'utf8');
  const bad = s.match(/(?:src|href)\s*=\s*["']https?:\/\/[^"']+|url\(\s*["']?https?:\/\/[^)]+|import\s*\(\s*["']https?:\/\/[^"']+|fetch\(\s*["']https?:\/\/[^"']+/g);
  if(bad) throw new Error('external request in ' + path.relative(OUT, f) + ': ' + bad.join(', '));
}
// ---- Yandex variant: the SDK script goes first ----
copy(OUT, YA);
const yh = path.join(YA, 'index.html');
fs.writeFileSync(yh, fs.readFileSync(yh, 'utf8').replace('<link rel="stylesheet" href="fonts/fonts.css">', '<script src="/sdk.js"></script>\n<link rel="stylesheet" href="fonts/fonts.css">'));

// ---- GitHub Pages copy (the repo's Pages serve ../docs): this game lives in its own folder there ----
const DOCS = path.join(ROOT, '..', 'docs', 'posledniy-tank');
rm(DOCS); copy(OUT, DOCS);

const kb = p => Math.round(fs.statSync(p).size / 1024);
console.log('game.js', kb(path.join(OUT, 'js/game.js')), 'KB; web total', Math.round(walk(OUT).reduce((a, f) => a + fs.statSync(f).size, 0) / 1024), 'KB');
if(!process.argv.includes('--no-zip')){
  fs.mkdirSync(path.join(ROOT, '..', 'packages'), { recursive:true });
  for(const [dir, name] of [[OUT, 'posledniy-tank.zip'], [YA, 'posledniy-tank-yandex.zip']]){
    const z = path.join(ROOT, '..', 'packages', name); rm(z);
    execFileSync('zip', ['-q', '-r', '-9', '-X', z, '.'], { cwd:dir });
    console.log(name, kb(z), 'KB');
  }
}
function walk(d){ return fs.readdirSync(d, { withFileTypes:true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]); }
