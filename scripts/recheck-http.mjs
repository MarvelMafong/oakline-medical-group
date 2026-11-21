// Re-check only the URLs that failed on a slow link, with generous retries. Usage: node scripts/recheck-http.mjs <baseUrl> <audit.json> [out.json]
import fs from 'node:fs';
const [base, file, out] = [process.argv[2], process.argv[3], process.argv[4] || 'reports/image-audit-live-http-recheck.json'];
const j = JSON.parse(fs.readFileSync(file, 'utf8'));
const urls = [...new Set(Object.values(j.pages).flatMap((v) => v.problems).filter((x) => x.kind === 'http-bad').map((x) => x.detail.split(' ')[0]))];
const res = [];
for (const u of urls) {
  let note = 'no response', ok = false;
  for (let a = 0; a < 10 && !ok; a++) {
    try {
      const r = await fetch(base + u, { signal: AbortSignal.timeout(180000) });
      const buf = Buffer.from(await r.arrayBuffer());
      const ct = r.headers.get('content-type') || '';
      if (r.status === 200 && buf.length > 0 && /image/.test(ct)) { ok = true; note = `${buf.length} bytes ${ct}`; } else note = `status ${r.status} bytes ${buf.length} ${ct}`;
    } catch (e) { note = String(e.message); await new Promise((s) => setTimeout(s, 3000)); }
  }
  res.push({ url: u, ok, note }); console.log(ok ? 'OK ' : 'BAD', u, note);
}
fs.writeFileSync(out, JSON.stringify({ base, at: new Date().toISOString(), checked: res.length, failing: res.filter((x) => !x.ok).length, results: res }, null, 1));
console.log('checked', res.length, 'failing', res.filter((x) => !x.ok).length);
