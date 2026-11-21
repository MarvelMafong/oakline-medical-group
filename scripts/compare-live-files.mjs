// Compare every referenced image on the live site with the local out/ file (size via HEAD). Usage: node scripts/compare-live-files.mjs <baseUrl>
import fs from 'node:fs';
import path from 'node:path';
const base = process.argv[2];
const a = JSON.parse(fs.readFileSync('reports/image-audit-live-http.json', 'utf8'));
const urls = new Set();
function walk(d, acc = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, acc) : acc.push(p); } return acc; }
for (const f of walk('out/images')) urls.add('/' + path.relative('out', f).split(path.sep).join('/'));
const res = []; const list = [...urls]; let i = 0;
async function worker() { while (i < list.length) { const u = list[i++]; const local = fs.statSync('out' + u).size; let live = -1, status = 0;
  for (let t = 0; t < 8 && live < 0; t++) { try { const r = await fetch(base + u, { method: 'HEAD', signal: AbortSignal.timeout(60000) }); status = r.status; live = Number(r.headers.get('content-length') ?? -2); if (live === -2) live = -1; } catch { await new Promise((s) => setTimeout(s, 2000)); } }
  res.push({ u, local, live, status, same: live === local }); } }
await Promise.all(Array.from({ length: 6 }, worker));
const bad = res.filter((x) => !x.same);
fs.writeFileSync('reports/live-file-compare.json', JSON.stringify({ base, at: new Date().toISOString(), files: res.length, differing: bad.length, bad }, null, 1));
console.log('files', res.length, 'differing', bad.length); bad.slice(0, 10).forEach((x) => console.log(JSON.stringify(x)));
