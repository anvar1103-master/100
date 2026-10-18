// Tiny static server for the tests and screenshots: serves the game folder on a free port.
import http from 'http'; import fs from 'fs'; import path from 'path';
export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.mp3':'audio/mpeg', '.woff2':'font/woff2', '.json':'application/json', '.glb':'model/gltf-binary', '.wasm':'application/wasm' };
export function serve(){
  return new Promise(ok => { const s = http.createServer((req, res) => {
    const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if(!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()){ res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type':TYPES[path.extname(p)] || 'application/octet-stream' }); fs.createReadStream(p).pipe(res);
  }).listen(0, () => ok(s)); });
}
export const GL_ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
