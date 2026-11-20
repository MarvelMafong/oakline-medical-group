// Usage: TOOLS_DIR=<dir with playwright-core> node scripts/image-audit.mjs <baseUrl> [--static-only] [--out reports/image-audit.json]
// Pass 1 (static): every img, source, srcset, inline url() and CSS url() in out/ must exist as a file.
// Pass 2 (http): each referenced URL returns 200, is not empty, and has an image content-type (live or local).
// Pass 3 (browser): every route at 1280 and 390 px, fully scrolled; flags naturalWidth 0, blank image slots, and hidden reveal states.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '');
const staticOnly = process.argv.includes('--static-only');
const httpOnly = process.argv.includes('--http-only');
const outIdx = process.argv.indexOf('--out');
const OUT = outIdx > -1 ? process.argv[outIdx + 1] : 'reports/image-audit.json';
const problems = [];
const report = { base: BASE, at: new Date().toISOString(), pages: {}, summary: {} };
const add = (page, kind, detail) => { problems.push({ page, kind, detail }); (report.pages[page] ||= { refs: 0, problems: [] }).problems.push({ kind, detail }); };

function walk(d, acc = []) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p, acc) : acc.push(p); } return acc; }
let routes = walk('out').filter((f) => f.endsWith('index.html')).map((f) => '/' + path.relative('out', path.dirname(f)).replace(/\\/g, '/') + '/').map((r) => r.replace('//', '/')).filter((r) => !['/404/', '/_not-found/'].includes(r));

if (process.env.ONLY) routes = process.env.ONLY.split(',');
const refsOf = (html) => {
  const set = new Set();
  for (const m of html.matchAll(/(?:src|href)="(\/images\/[^"]+)"/g)) set.add(m[1]);
  for (const m of html.matchAll(/srcSet="([^"]+)"|srcset="([^"]+)"/g)) for (const part of (m[1] || m[2]).split(',')) { const u = part.trim().split(/\s+/)[0]; if (u.startsWith('/')) set.add(u); }
  for (const m of html.matchAll(/url\(([^)]+)\)/g)) { const u = m[1].replace(/&quot;|["']/g, ''); if (u.startsWith('/images/')) set.add(u); }
  return [...set];
};

// ---- pass 1: static
const allRefs = new Map(); // url -> pages
for (const r of routes) {
  const file = path.join('out', r, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const refs = refsOf(html);
  (report.pages[r] ||= { refs: 0, problems: [] }).refs = refs.length;
  for (const u of refs) {
    (allRefs.get(u) || allRefs.set(u, []).get(u)).push(r);
    const f = path.join('out', decodeURIComponent(u));
    if (!fs.existsSync(f)) add(r, 'missing-file', u);
    else if (fs.statSync(f).size === 0) add(r, 'zero-bytes', u);
  }
  // alt-less or dimension-less images are not blank but are recorded for completeness
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])) add(r, 'img-without-dimensions', m[0].slice(0, 100));
}
// the CSS files are also scanned (backgrounds, masks)
for (const f of walk('out/_next/static').filter((x) => x.endsWith('.css'))) {
  const css = fs.readFileSync(f, 'utf8');
  for (const m of css.matchAll(/url\(([^)]+)\)/g)) {
    const u = m[1].replace(/["']/g, '');
    if (u.startsWith('/') && !u.startsWith('/_next') && !fs.existsSync(path.join('out', u))) add('css:' + path.basename(f), 'missing-file', u);
    if (u.startsWith('/') && !u.startsWith('/_next')) allRefs.set(u, [...(allRefs.get(u) || []), 'css']);
  }
}
report.summary.uniqueImageUrls = allRefs.size;

// ---- pass 2: http
if (!staticOnly) {
  const urls = [...allRefs.keys()];
  let i = 0;
  const worker = async () => {
    while (i < urls.length) {
      const u = urls[i++];
      let ok = false, note = '';
      for (let a = 0; a < 4 && !ok; a++) {
        try {
          const r = await fetch(BASE + u, { signal: AbortSignal.timeout(90000) });
          const buf = Buffer.from(await r.arrayBuffer());
          const ct = r.headers.get('content-type') || '';
          if (r.status !== 200) note = `status ${r.status}`;
          else if (buf.length === 0) note = 'zero bytes';
          else if (!/image|font/.test(ct)) note = `content-type ${ct}`;
          else ok = true;
        } catch (e) { note = String(e.message || e); await new Promise((s) => setTimeout(s, 1500)); }
      }
      if (!ok) add((allRefs.get(u) || ['?'])[0], 'http-bad', `${u} ${note}`);
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));
}

// ---- pass 3: browser
if (!staticOnly && !httpOnly) {
  const require = createRequire((process.env.TOOLS_DIR || '.') + '/');
  const { chromium } = require('playwright-core');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const c = await browser.newContext({ viewport: { width: w, height: h }, isMobile: w < 500 });
    if (BASE.startsWith('https')) await c.route('**/*', async (route) => {
      const rq = route.request();
      for (let a = 0; a < 4; a++) { try { const r = await fetch(rq.url(), { headers: { 'accept-encoding': 'gzip' }, redirect: 'manual', signal: AbortSignal.timeout(90000) }); const hd = Object.fromEntries([...r.headers.entries()].filter(([k]) => !['content-encoding', 'content-length', 'transfer-encoding'].includes(k))); return await route.fulfill({ status: r.status, headers: hd, body: Buffer.from(await r.arrayBuffer()) }); } catch { await new Promise((s) => setTimeout(s, 1500)); } }
      await route.abort();
    });
    let p = await c.newPage(); p.setDefaultTimeout(180000);
    for (const r of routes) {
     try {
      await p.goto(BASE + r, { waitUntil: 'domcontentloaded' });
      await p.waitForTimeout(600);
      // scroll slowly down the page and sideways through every scroller so lazy and scroll-driven images load
      await p.evaluate(async () => {
        const sleep = (ms) => new Promise((s) => setTimeout(s, ms));
        const H = () => document.documentElement.scrollHeight;
        for (let y = 0; y < H(); y += Math.max(250, innerHeight * 0.5)) { scrollTo(0, y); await sleep(160); }
        scrollTo(0, H()); await sleep(250);
        for (const hs of document.querySelectorAll('.hs')) { hs.scrollIntoView({ block: 'center' }); await sleep(150); for (let x = 0; x <= hs.scrollWidth; x += hs.clientWidth * 0.6) { hs.scrollLeft = x; await sleep(160); } hs.scrollLeft = 0; }
      });
      // wait for network images to settle (bounded)
      await p.evaluate(async () => { const t = Date.now(); while (Date.now() - t < 20000) { const pend = [...document.images].filter((i) => !i.complete); if (!pend.length) break; await new Promise((s) => setTimeout(s, 300)); } });
      // visit each image slot again so scroll-driven reveals reach their end state, then evaluate
      await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
      const res = await p.evaluate(async () => {
        const sleep = (ms) => new Promise((s) => setTimeout(s, ms));
        const bad = [];
        const imgs = [...document.images];
        for (const im of imgs) {
          if (im.closest('.mega')) { if (im.naturalWidth === 0) bad.push(['naturalWidth0', 'mega ' + im.currentSrc]); continue; } // menu panel is hidden until hover by design; it must still be loaded
          if (!im.offsetParent && getComputedStyle(im).position !== 'fixed') { if (im.naturalWidth === 0 && !im.closest('.mega,.side')) bad.push(['hidden-image-never-loaded', (im.currentSrc || im.src).split('/').pop()]); continue; }
          im.scrollIntoView({ block: 'center', inline: 'center' });
          for (let t = 0; t < 30; t++) { await sleep(100); let hid = false; for (let el = im, d = 0; el && d < 7; el = el.parentElement, d++) { const s = getComputedStyle(el); if (parseFloat(s.opacity) < 0.98 || /inset\(\s*(100|9\d)/.test(s.clipPath)) hid = true; } if (!hid) break; }
          const r = im.getBoundingClientRect();
          const cs = getComputedStyle(im);
          const name = (im.currentSrc || im.src).split('/').pop();
          if (!im.complete || im.naturalWidth === 0) { bad.push(['naturalWidth0', name]); continue; }
          if (r.width < 2 || r.height < 2) bad.push(['zero-size-slot', name]);
          // walk up to find hidden ancestors (reveal, clip, scale)
          for (let el = im, d = 0; el && d < 7; el = el.parentElement, d++) {
            const s = getComputedStyle(el);
            if (parseFloat(s.opacity) < 0.05) { bad.push(['opacity-0', name + ' via ' + (el.className || el.tagName)]); break; }
            if (/inset\(\s*(100%|9\d(\.\d+)?%)/.test(s.clipPath) ) { bad.push(['clip-closed', name + ' via ' + (el.className || el.tagName) + ' ' + s.clipPath]); break; }
            if (s.display === 'none' && el !== im) { break; } // intentionally hidden (e.g. desktop-only figure on mobile)
            if (s.visibility === 'hidden' && !im.closest('.mega')) { bad.push(['visibility-hidden', name]); break; }
          }
        }
        // empty image slots: containers that should hold an image but have none rendered
        for (const slot of document.querySelectorAll('.dph,.pimg,.rph,.cover,.sc,.gc,.jc,.lp,.side,.team,.wide,.mf,.mini')) {
          if (getComputedStyle(slot).display === 'none') continue;
          const r = slot.getBoundingClientRect(); if (r.width < 4 || r.height < 4) continue;
          if (slot.closest('[hidden]')) continue;
          const im = slot.querySelector('img'); if (!im || im.naturalWidth === 0) { bad.push(['empty-slot', slot.className]); continue; }
          slot.scrollIntoView({ block: 'center', inline: 'center' }); await sleep(1100);
          const a = slot.getBoundingClientRect(), b = im.getBoundingClientRect();
          const needH = !slot.classList.contains('jc');
          if (b.width < a.width - 6 || (needH && b.height < a.height - 6)) bad.push(['slot-not-covered', slot.className + ' slot ' + Math.round(a.width) + 'x' + Math.round(a.height) + ' img ' + Math.round(b.width) + 'x' + Math.round(b.height)]);
        }
        // background images: sections with --bgi must resolve to a real, decodable image
        for (const el of document.querySelectorAll('.bgi')) {
          const v = el.style.getPropertyValue('--bgi'); const m = v.match(/url\(([^)]+)\)/); if (!m) { bad.push(['bgi-missing-var', el.id || el.className]); continue; }
          const ok = await new Promise((res) => { const i = new Image(); i.onload = () => res(i.naturalWidth > 0); i.onerror = () => res(false); i.src = m[1].replace(/["']/g, ''); });
          if (!ok) bad.push(['bgi-broken', m[1]]);
        }
        return { bad, count: imgs.length };
      });
      for (const [k, d] of res.bad) add(r, `browser-${w}-${k}`, d);
      (report.pages[r] ||= { refs: 0, problems: [] })[`images${w}`] = res.count;
      if (process.env.VERBOSE) console.log(w, r, res.count, res.bad.length, process.env.DETAIL ? JSON.stringify(res.bad) : "");
     } catch (e) { add(r, `browser-${w}-page-crash`, String(e.message).split(" ")[0]); try { await p.close(); } catch {} p = await c.newPage(); p.setDefaultTimeout(180000); }
    }
    await c.close();
  }
  await browser.close();
}

const kinds = {};
problems.forEach((x) => { kinds[x.kind] = (kinds[x.kind] || 0) + 1; });
report.summary = { ...report.summary, routes: routes.length, problems: problems.length, byKind: kinds };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 1));
console.log(`routes ${routes.length}, unique image urls ${allRefs.size}, problems ${problems.length}`, JSON.stringify(kinds));
problems.slice(0, 25).forEach((x) => console.log(' -', x.page, x.kind, String(x.detail).slice(0, 140)));
process.exit(problems.filter((x) => x.kind !== 'img-without-dimensions').length ? 1 : 0);
