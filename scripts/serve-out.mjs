// Tiny static server for ./out that mimics Vercel (trailing-slash redirect, 404 page). Local testing only.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
const port = Number(process.argv[2] || 4173);
const root = path.resolve('out');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml', '.json': 'application/json', '.ico': 'image/x-icon' };
const vj = fs.existsSync('vercel.json') ? JSON.parse(fs.readFileSync('vercel.json', 'utf8')) : { headers: [] };
const rules = (vj.headers || []).map((h) => ({ re: new RegExp('^' + h.source.replace(/\(\.\*\)/g, '.*') + '$'), h: h.headers }));
http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  u = u.replace(/(__next.[^/]*?).(__PAGE__.txt)$/, '$1/$2');
  let f = path.join(root, u);
  const send = (code, file) => {
    const hdr = { 'content-type': types[path.extname(file)] || 'application/octet-stream', server: 'Vercel-local' };
    rules.forEach((r) => { try { if (r.re.test(u)) r.h.forEach((x) => { hdr[x.key.toLowerCase()] = x.value; }); } catch { /* ignore */ } });
    const comp = /text|javascript|json|xml|svg/.test(hdr['content-type']) && /gzip/.test(req.headers['accept-encoding'] || '');
    if (comp) hdr['content-encoding'] = 'gzip';
    res.writeHead(code, hdr); const rs = fs.createReadStream(file); (comp ? rs.pipe(zlib.createGzip()) : rs).pipe(res);
  };
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!u.endsWith('/')) { res.writeHead(308, { location: u + '/' }); return res.end(); } f = path.join(f, 'index.html'); }
  if (fs.existsSync(f) && fs.statSync(f).isFile()) return send(200, f);
  const nf = path.join(root, '404.html'); send(404, fs.existsSync(nf) ? nf : f);
}).listen(port, () => console.log('serving out on', port));
