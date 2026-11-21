// Static deploy of ./out with LOW upload concurrency (for slow or flaky links). No remote build, no functions.
// Usage: node scripts/deploy-static.mjs [--prod]
// Uses the signed-in Vercel CLI login and the linked project in .vercel/project.json. The token is never printed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const prod = process.argv.includes('--prod');
const { token } = JSON.parse(fs.readFileSync(path.join(process.env.APPDATA, 'com.vercel.cli/Data/auth.json'), 'utf8'));
const proj = JSON.parse(fs.readFileSync('.vercel/project.json', 'utf8'));
const Q = `teamId=${proj.orgId}`;
const H = { Authorization: `Bearer ${token}` };
function walk(d, acc = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, acc) : acc.push(p); } return acc; }
const files = walk('out').map((p) => ({ file: path.relative('out', p).replace(/\\/g, '/'), abs: p }));
files.push({ file: 'vercel.json', abs: 'vercel.json' });
for (const f of files) { f.buf = fs.readFileSync(f.abs); f.sha = crypto.createHash('sha1').update(f.buf).digest('hex'); f.size = f.buf.length; }
console.log('files', files.length, 'bytes', files.reduce((a, f) => a + f.size, 0));
const uniq = [...new Map(files.map((f) => [f.sha, f])).values()];
let done = 0; const queue = [...uniq];
async function up(f) {
  for (let a = 1; a <= 20; a++) {
    try {
      const r = await fetch(`https://api.vercel.com/v2/files?${Q}`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/octet-stream', 'x-vercel-digest': f.sha, 'Content-Length': String(f.size) }, body: f.buf, signal: AbortSignal.timeout(120000) });
      if (r.ok || r.status === 409) return;
      if (r.status === 429 || r.status >= 500) throw new Error('status ' + r.status);
      throw new Error('fatal ' + r.status + ' ' + (await r.text()).slice(0, 200));
    } catch (e) { if (String(e).includes('fatal')) throw e; await new Promise((s) => setTimeout(s, 2500 * Math.min(a, 6))); }
  }
  throw new Error('upload failed for ' + f.file);
}
async function worker() { while (queue.length) { const f = queue.shift(); await up(f); done++; if (done % 25 === 0) console.log('uploaded', done, '/', uniq.length); } }
await Promise.all(Array.from({ length: 3 }, worker));
const body = { name: proj.projectName, project: proj.projectName, files: files.map((f) => ({ file: f.file, sha: f.sha, size: f.size })), projectSettings: { framework: null, buildCommand: null, installCommand: null, outputDirectory: null, devCommand: null }, ...(prod ? { target: 'production' } : {}) };
const r = await fetch(`https://api.vercel.com/v13/deployments?${Q}&skipAutoDetectionConfirmation=1`, { method: 'POST', headers: { ...H, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const j = await r.json();
if (!r.ok) { console.log('deploy error', r.status, JSON.stringify(j).slice(0, 500)); process.exit(1); }
console.log('deployment', j.id, j.readyState, 'https://' + j.url, 'alias', JSON.stringify(j.alias || []));
fs.mkdirSync('reports', { recursive: true });
fs.appendFileSync('reports/deploys.log', `${new Date().toISOString()} ${prod ? 'production' : 'preview'} ${j.id} https://${j.url}\n`);
