// Usage: node scripts/verify-live.mjs <baseUrl> [outFile]
// Crawls every route found in ./out, fetches it from baseUrl and records pass/fail per SEO check.
import fs from 'node:fs';
import path from 'node:path';
const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '');
const OUT = process.argv[3] || 'reports/live-results.json';
const INDEXABLE = ['/case-study/'];

function walk(d, acc = []) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p, acc); else acc.push(p); } return acc; }
const routes = walk('out').filter((f) => f.endsWith('index.html')).map((f) => '/' + path.relative('out', path.dirname(f)).replace(/\\/g, '/') + '/').map((r) => r.replace('//', '/')).filter((r) => !['/404/', '/_not-found/'].includes(r));
const results = {};
const fail = {};
const rec = (id, ok, note = '') => { results[id] = results[id] === false ? false : ok; if (!ok) (fail[id] ||= []).push(note); };
const get = async (p, opt = {}) => { for (let a = 0; a < 4; a++) { try { const t0 = Date.now(); const r = await fetch(BASE + p, { redirect: 'manual', headers: { 'accept-encoding': 'gzip, br' }, signal: AbortSignal.timeout(120000), ...opt }); const first = Date.now() - t0; const buf = await r.arrayBuffer(); return { first, status: r.status, headers: r.headers, text: async () => Buffer.from(buf).toString('utf8') }; } catch (e) { if (a === 3) throw e; await new Promise((x) => setTimeout(x, 2000)); } } };
const attr = (h, re) => (h.match(re) || [])[1];

const titles = new Map();
const linkSet = new Set();
const pages = {};
for (const r of routes) {
  const t0 = Date.now();
  const res = await get(r);
  const ttfb = res.first ?? (Date.now() - t0);
  const html = await res.text();
  rec('status', res.status === 200, `${r} ${res.status}`);
  rec('ttfb', ttfb < 800, `${r} ${ttfb}ms`);
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) || '';
  const canon = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const h1 = (html.match(/<h1[ >]/g) || []).length;
  const xr = res.headers.get('x-robots-tag') || '';
  const idx = INDEXABLE.includes(r);
  pages[r] = { title, desc, robots, canon, h1, xr };
  rec('titles', !!title && title.length <= 70, `${r} title`);
  titles.set(title, [...(titles.get(title) || []), r]);
  rec('descs', !!desc && desc.length >= 50 && desc.length <= 170, `${r} desc ${desc?.length}`);
  rec('h1', h1 === 1 || r.startsWith('/admin'), `${r} h1=${h1}`);
  rec('canonical', !!canon && canon.endsWith(r) && canon.startsWith('https://'), `${r} ${canon}`);
  rec('indexing', idx ? !/noindex/.test(robots) && !/noindex/.test(xr) : /noindex/.test(robots) && /noindex/.test(xr), `${r} meta=${robots} header=${xr}`);
  rec('og', /property="og:title"/.test(html) && /name="twitter:card"/.test(html) && /og:image/.test(html), `${r} og`);
  rec('ssr', />[^<]{20,}</.test(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '')), `${r} no static text`);
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  imgs.forEach((i) => { rec('alt', /\balt=/.test(i), `${r} ${i.slice(0, 80)}`); rec('imgdims', /\bwidth=/.test(i) && /\bheight=/.test(i), `${r} ${i.slice(0, 80)}`); });
  rec('nothirdparty', !/<script[^>]+src="https?:\/\/(?!oakline)/.test(html) && !/<link[^>]+href="https?:\/\/(?!oakline)[^"]+\.css/.test(html), `${r} external asset`);
  rec('nopopups', !/role="dialog"|modal|popup/i.test(html.replace(/<script[\s\S]*?<\/script>/g, '')), `${r} dialog markup`);
  rec('lang', /<html lang="en-US"/.test(html), `${r} lang`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { const j = JSON.parse(m[1]); (Array.isArray(j) ? j : [j]).forEach((x) => rec('schema', !!x['@type'] && !!x['@context'], `${r} bad schema`)); } catch { rec('schema', false, `${r} invalid JSON-LD`); } }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) linkSet.add(m[1]);
  if (r === '/case-study/') {
    pages[r].sameAs = /"sameAs":\["https:\/\/tekgemmstudio.com","https:\/\/marvelmafong.work"\]/.test(html);
    rec('sameas', pages[r].sameAs, 'sameAs');
    for (const t of ['"FAQPage"', '"Organization"', '"Person"', '"BreadcrumbList"', '"CreativeWork"']) rec('casestudy-schema', html.includes(t), t);
    rec('casestudy-links', html.includes('https://tekgemmstudio.com') && html.includes('https://marvelmafong.work'), 'links');
    rec('rcheck', /rel="noopener"/.test(html), 'noopener');
    results.caseSize = html.length;
    for (const m of html.matchAll(/src="(\/images\/case[^"]+)"/g)) { const ir = await get(m[1]); rec('caseimgs', ir.status === 200, m[1]); }
    results.caseImgCount = [...html.matchAll(/src="(\/images\/case[^"]+)"/g)].length;
  }
  if (r === '/' ) {
    rec('cache-html', /max-age=0|no-cache|must-revalidate/.test(res.headers.get('cache-control') || ''), `html cache ${res.headers.get('cache-control')}`);
    rec('gzip', BASE.includes('localhost') || /gzip|br/.test(res.headers.get('content-encoding') || ''), `encoding ${res.headers.get('content-encoding')}`);
    rec('secheaders', ['strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'content-security-policy'].every((h) => res.headers.get(h)), 'security headers');
    rec('cdn', /vercel/i.test(res.headers.get('server') || '') || !!res.headers.get('x-vercel-id'), `server=${res.headers.get('server')}`);
    // static asset caching
    const css = attr(html, /href="(\/_next\/static\/[^"]+\.css)"/);
    if (css) { const cr = await get(css); rec('cache-assets', /immutable/.test(cr.headers.get('cache-control') || ''), `css cache ${cr.headers.get('cache-control')}`); }
    const font = await get('/fonts/figtree-var.woff2'); rec('cache-fonts', /immutable/.test(font.headers.get('cache-control') || '') && font.status === 200, 'font cache');
    rec('fontpreload', /rel="preload"[^>]*figtree/.test(html) || /figtree[^>]*rel="preload"/.test(html), 'font preload');
    rec('hero-eager', /fetchPriority="high"|fetchpriority="high"/.test(html), 'hero priority');
  }
}
for (const [t, rs] of titles) rec('dup-titles', rs.length === 1, `${t}: ${rs.join(',')}`);

// internal links
const bad = [];
for (const l of linkSet) { const p = l.endsWith('/') || l.includes('.') ? l : l + '/'; const res = await get(p); if (res.status !== 200) bad.push(`${l} ${res.status}`); }
rec('links', bad.length === 0, bad.join('; '));
const linked = new Set([...linkSet].map((l) => (l.endsWith('/') ? l : l + '/')));
const orphans = routes.filter((r) => r !== '/' && !r.startsWith('/admin') && !linked.has(r));
rec('orphans', orphans.length === 0, orphans.join(', '));
rec('urlform', routes.every((r) => r === r.toLowerCase() && r.endsWith('/')), 'url form');

// redirects: no-slash form is one hop
const nr = await get('/case-study'); const loc = nr.headers.get('location') || '';
rec('redirect', [301, 308, 307].includes(nr.status) && loc.endsWith('/case-study/'), `no-slash ${nr.status} ${loc}`);
if (loc) { const second = await get(loc.replace(BASE, '')); rec('redirect-chain', second.status === 200, 'chain'); }

// 404 (real 404 status, not a soft 404)
const nf = await get('/this-page-does-not-exist/'); const nfh = await nf.text();
rec('notfound', nf.status === 404 && /We could not find that page/.test(nfh), `status ${nf.status}`);
rec('soft404', nf.status === 404, 'soft 404');

// sitemap, robots, llms, indexnow
const sm = await (await get('/sitemap.xml')).text();
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
rec('sitemap', locs.length === 1 && locs[0].endsWith('/case-study/'), `locs=${locs.join(',')}`);
rec('imgsitemap', /image:loc/.test(sm), 'image sitemap');
const rb = await get('/robots.txt'); const rbt = await rb.text();
rec('robots', rb.status === 200 && /Sitemap:/.test(rbt) && /GPTBot/.test(rbt), 'robots');
const ll = await get('/llms.txt'); rec('llms', ll.status === 200 && /TekGemm/.test(await ll.text()), 'llms');
const ix = await get('/f3a91c27d84b4e6a9c05b17e2d8a64f0.txt'); rec('indexnow', ix.status === 200, 'indexnow key');
rec('https', BASE.startsWith('https://') || BASE.includes('localhost'), BASE);

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, at: new Date().toISOString(), routes: routes.length, results, fail, pages }, null, 1));
const failed = Object.keys(fail);
console.log(`routes: ${routes.length}  checks: ${Object.keys(results).length}  failing: ${failed.length}`);
failed.forEach((k) => console.log(' FAIL', k, '->', fail[k].slice(0, 3).join(' | ')));
process.exit(failed.length ? 1 : 0);
