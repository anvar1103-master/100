// One-off asset preparation (see CLAUDE.md «Ассеты»). Usage: node tools/assets.mjs <step> <source dir>
//   info <file.fbx>    — what is inside an FBX
//   mixamo <dir>       — Mixamo characters + animations (unpacked downloads) -> src/assets/models/{chars/*.glb, anims.glb}
//   guns <dir>         — «Free CC0 Guns & Explosives Pack» (unpacked GunsExplosives/) -> src/assets/models/guns/*.glb
//   tex <dir>          — «Backrooms PBR texture pack» (its backrooms/ folder) -> src/assets/tex/*.jpg (1K, normals flipped to OpenGL)
//   props <dir>        — Poly Haven glTF models (folders phm-<id>/ with <id>_1k.gltf) -> src/assets/models/props.glb
//   loot <dir>         — the same for the loot (ammo_box, medical_box, medical_tape, wooden_military_crate) -> loot.glb
//   sfx <dir>          — sounds: see SFX below (sources relative to <dir>; microgang's sounds are copied as they are)
// FBX is read by three.js in headless Chromium (tools/fbx2glb.html), then gltf-transform shrinks textures to webp,
// welds, quantizes and packs with meshopt (the game decodes it with three's MeshoptDecoder, no outside files).
import fs from 'fs'; import path from 'path'; import http from 'http';
import { chromium } from 'playwright';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, dedup, weld, quantize, meshopt, textureCompress, resample, simplify } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
import { execFileSync } from 'child_process';
import { Document } from '@gltf-transform/core';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'src/assets/models');
const [step, src] = process.argv.slice(2);
const PROPS = ['plastic_monobloc_chair_01', 'metal_trash_can', 'WetFloorSign_01', 'metal_office_desk', 'korean_fire_extinguisher_01', 'wall_clock', 'fire_alarm'];
const MG_SFX = ['rifle_1', 'rifle_2', 'rifle_3', 'rifle_far', 'mag_out_2', 'mag_in_2', 'charge_2', 'dry', 'shell_1', 'shell_2', 'shell_3', 'shell_4',
  'imp_flesh_1', 'imp_flesh_2', 'imp_flesh_3', 'imp_stone', 'imp_stone_2', 'imp_wood', 'tick', 'head', 'kill', 'hover', 'click', 'whiz_1', 'whiz_2', 'whiz_3', 'land', 'jump'];
const SFX = [ // [name, source file, options]
  ['hum', 'fs-870708/870708_CHallSmith.mp3', { loop:[4, 14, 1.5], lufs:-22 }], ['vent', 'fs-637804/637804_kyles.mp3', { loop:[10, 24, 2], lufs:-24 }],
  ['flicker', 'fs-777053/777053_kentspublicdomain.mp3', { loop:[0, 7, 1], lufs:-20 }], ['buzz', 'fs-484157/484157_TemperMode.mp3', { t:2.5 }], ['thud', 'fs-653294/653294_Osvoldon.mp3', { t:5, lufs:-20 }],
  ['step_1', 'kenney-impact-sounds/Audio/footstep_carpet_000.ogg', { t:0.4, lufs:-20 }], ['step_2', 'kenney-impact-sounds/Audio/footstep_carpet_001.ogg', { t:0.4, lufs:-20 }],
  ['step_3', 'kenney-impact-sounds/Audio/footstep_carpet_002.ogg', { t:0.4, lufs:-20 }], ['step_4', 'kenney-impact-sounds/Audio/footstep_carpet_003.ogg', { t:0.4, lufs:-20 }],
  ['indoor_tail', 'fs-592264/592264_ikbenraar.mp3', { t:2.5 }]];
const types = { '.html':'text/html', '.js':'text/javascript' };
function serve(){ return new Promise(ok => { const s = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split('?')[0]); const f = u.startsWith('/src/') ? path.join(SRC, u.slice(5)) : path.join(ROOT, u);
  fs.readFile(f, (e, d) => { if(e){ r.writeHead(404); r.end(); return; } r.writeHead(200, { 'content-type':types[path.extname(f)] || 'application/octet-stream' }); r.end(d); });
}).listen(8139, () => ok(s)); }); }
const SRC = src && path.resolve(fs.statSync(src).isDirectory() ? src : path.dirname(src));
const rel = f => '/src/' + path.relative(SRC, f).split(path.sep).map(encodeURIComponent).join('/');
await MeshoptEncoder.ready; await MeshoptDecoder.ready; await MeshoptSimplifier.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder':MeshoptEncoder, 'meshopt.decoder':MeshoptDecoder });
async function shrink(b64, out, { tex = 1024, anim = false, ratio = 0 } = {}){
  const doc = await io.readBinary(Buffer.from(b64, 'base64'));
  const steps = [dedup(), prune()];
  if(!anim) steps.push(weld(), ...(ratio ? [simplify({ simplifier:MeshoptSimplifier, ratio, error:0.002 })] : []), textureCompress({ encoder:sharp, targetFormat:'webp', resize:[tex, tex], quality:82 }));
  else steps.push(resample());
  steps.push(quantize({ quantizePosition:14, quantizeNormal:10, quantizeTexcoord:12, quantizeWeight:8 }), meshopt({ encoder:MeshoptEncoder, level:'medium' }));
  await doc.transform(...steps);
  fs.mkdirSync(path.dirname(out), { recursive:true }); fs.writeFileSync(out, await io.writeBinary(doc));
  console.log(path.relative(ROOT, out), Math.round(fs.statSync(out).size / 1024), 'KB');
}
if(step === 'tex'){
  const T = path.join(ROOT, 'src/assets/tex'); fs.mkdirSync(T, { recursive:true });
  for(const k of ['wallpaper', 'carpet', 'ceiling_tiles', 'painted_wall_2']){
    const one = async (suf, out, opt = {}) => { let im = sharp(path.join(SRC, k, k + '_' + suf + '.png')).resize(1024, 1024);
      if(opt.flipG){ const { data, info } = await im.raw().toBuffer({ resolveWithObject:true }); for(let i = 1; i < data.length; i += info.channels) data[i] = 255 - data[i];
        im = sharp(data, { raw:info }); }
      if(opt.grey) im = im.greyscale();
      await im.jpeg({ quality:opt.q || 84, mozjpeg:true }).toFile(path.join(T, out)); console.log(out, Math.round(fs.statSync(path.join(T, out)).size / 1024), 'KB'); };
    await one('color', k + '_col.jpg'); await one('normal', k + '_nor.jpg', { flipG:true, q:90 }); await one('rough', k + '_rough.jpg', { grey:true, q:80 });
  }
  process.exit(0);
}
if(step === 'props' || step === 'loot'){
  const IDS = step === 'loot' ? ['ammo_box', 'medical_box', 'medical_tape', 'wooden_military_crate'] : PROPS, NAME = step + '.glb';
  const docs = [];
  const out = new Document(); const scene = out.createScene('Props'); out.createBuffer();
  for(const d of fs.readdirSync(SRC).filter(d => d.startsWith('phm-'))){
    const id = d.slice(4), f = fs.readdirSync(path.join(SRC, d)).find(x => x.endsWith('.gltf'));
    if(!IDS.includes(id) || !f) continue;
    const doc = await io.read(path.join(SRC, d, f));
    await doc.transform(dedup(), prune(), weld(), textureCompress({ encoder:sharp, targetFormat:'webp', resize:[512, 512], quality:80 }));
    const tmp = path.join('/tmp', 'prop_' + id + '.glb'); fs.writeFileSync(tmp, await io.writeBinary(doc)); docs.push([id, tmp]);
  }
  // merge into one file: each model under a root node named by its id
  const { mergeDocuments } = await import('@gltf-transform/functions');
  for(const [id, tmp] of docs){
    const d = await io.read(tmp); const sc = d.getRoot().getDefaultScene() || d.getRoot().listScenes()[0];
    const root = d.createNode(id); for(const n of sc.listChildren()){ sc.removeChild(n); root.addChild(n); } sc.addChild(root);
    const map = mergeDocuments(out, d); const r2 = map.get(root); scene.addChild(r2);
    for(const s2 of out.getRoot().listScenes()) if(s2 !== scene) s2.dispose();
  }
  for(const b of out.getRoot().listBuffers().slice(1)) b.dispose();
  out.getRoot().listAccessors().forEach(a => a.setBuffer(out.getRoot().listBuffers()[0]));
  await out.transform(dedup(), prune(), quantize(), meshopt({ encoder:MeshoptEncoder, level:'medium' }));
  if(step === 'loot') await out.transform(simplify({ simplifier:MeshoptSimplifier, ratio:0.5, error:0.0005 }));
  fs.writeFileSync(path.join(OUT, NAME), await io.writeBinary(out)); console.log(NAME, Math.round(fs.statSync(path.join(OUT, NAME)).size / 1024), 'KB');
  process.exit(0);
}
if(step === 'sfx'){
  const S = path.join(ROOT, 'src/assets/sfx'); fs.mkdirSync(S, { recursive:true });
  const MG = path.join(ROOT, '../microgang/src/assets/sfx');
  for(const f of MG_SFX) fs.copyFileSync(path.join(MG, f + '.mp3'), path.join(S, f + '.mp3'));
  const ff = (args) => execFileSync('ffmpeg', ['-nostdin', '-loglevel', 'error', '-y', ...args], { timeout:60000 });
  for(const [name, file, o = {}] of SFX){
    const inp = path.join(SRC, file), out = path.join(S, name + '.mp3');
    if(o.loop){ const [st, L, F] = o.loop; // seamless loop: the tail is cross-faded into the head
      ff(['-ss', String(st), '-i', inp, '-ss', String(st + L), '-i', inp, '-filter_complex', `[0]atrim=0:${L},asetpts=PTS-STARTPTS,afade=t=in:d=${F}[a];[1]atrim=0:${F},asetpts=PTS-STARTPTS,afade=t=out:d=${F}[b];[a][b]amix=inputs=2:duration=first:normalize=0,loudnorm=I=${o.lufs || -20}:TP=-2`, '-ac', '1', '-ar', '44100', '-b:a', '80k', out]); }
    else ff(['-ss', String(o.ss || 0), ...(o.t ? ['-t', String(o.t)] : []), '-i', inp, '-af', `silenceremove=start_periods=1:start_threshold=-50dB,afade=t=out:st=${Math.max(0, (o.t || 2) - 0.08)}:d=0.08,loudnorm=I=${o.lufs || -16}:TP=-1.5`, '-ac', '1', '-ar', '44100', '-b:a', '96k', out]);
    console.log(name + '.mp3', Math.round(fs.statSync(out).size / 1024), 'KB');
  }
  process.exit(0);
}
const srv = await serve();
const browser = await chromium.launch({ args:['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage(); page.on('pageerror', e => console.log('[page]', e.message));
page.on('console', m => { if(m.type() === 'error') console.log('[page]', m.text().slice(0, 200)); });
await page.goto('http://localhost:8139/tools/fbx2glb.html'); await page.waitForFunction(() => window.ready);
const ev = (fn, ...a) => page.evaluate(([fn, a]) => window[fn](...a), [fn, a]);
try{
  if(step === 'info') console.log(JSON.stringify(await ev('info', rel(path.resolve(src))), null, 1));
  if(step === 'mixamo'){
    // characters: the big FBX files at the top of the folder (Mixamo names them Ch<NN>_nonPBR.fbx)
    for(const f of fs.readdirSync(SRC).filter(f => /^Ch\d+.*\.fbx$/i.test(f)))
      await shrink(await ev('character', rel(path.join(SRC, f)), 1024), path.join(OUT, 'chars', f.replace(/_nonPBR/i, '').replace(/\.fbx$/i, '.glb').toLowerCase()), { ratio:0.5 });
    // animations: game name <- file (relative to SRC); keepRoot for deaths and moves whose travel matters
    const A = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/anims.json'), 'utf8'));
    const list = A.map(([name, file, keepRoot]) => ({ name, url:rel(path.join(SRC, file)), keepRoot:!!keepRoot }));
    await shrink(await ev('anims', list), path.join(OUT, 'anims.glb'), { anim:true });
  }
  if(step === 'guns'){
    const G = { ak:['AK-47/AK47', 1], m4:['M4A1/M4A1', 0], shotgun:['Shotgun/Shotgun', 1], sniper:['Sniper/Sniper', 1], pistol:['Pistol_MK/Makarov', 1] };
    for(const [id, [base, dxGuess]] of Object.entries(G)){
      const dir = path.join(SRC, path.dirname(base)), stem = path.basename(base), files = fs.readdirSync(dir);
      const pick = re => { const f = files.find(x => re.test(x)); return f ? rel(path.join(dir, f)) : null; };
      const nor = files.find(x => /Normal/i.test(x)), dx = nor ? /DirectX/i.test(nor) || (dxGuess && !/OpenGL/i.test(nor)) : false;
      await shrink(await ev('gun', rel(path.join(dir, stem + '.fbx')), { col:pick(/Base_?Color/i), nor:pick(/Normal/i), rough:pick(/Rough/i), metal:pick(/Metal/i) }, dx), path.join(OUT, 'guns', id + '.glb'));
    }
  }
} finally { await browser.close(); srv.close(); }
