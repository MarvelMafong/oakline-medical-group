// Usage: TOOLS_DIR=<dir with lighthouse> node scripts/lh.mjs <baseUrl>
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const T = process.env.TOOLS_DIR;
const require = createRequire(T + '/');
const lighthouse = (await import(pathToFileURL(require.resolve('lighthouse')).href)).default;
const { launch } = await import(pathToFileURL(require.resolve('chrome-launcher')).href);
const BASE = process.argv[2] || 'http://localhost:4173';
const pages = process.env.PAGES ? process.env.PAGES.split(',') : ['/', '/case-study/', '/appointments/', '/departments/primary-care/', '/resources/', '/admin/dashboard/'];
const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
fs.mkdirSync('reports/lighthouse', { recursive: true });
const rows = [];
for (const mobile of (process.env.FORMS === 'm' ? [true] : [true, false])) {
  for (const p of pages) {
    const cfg = { extends: 'lighthouse:default', settings: { onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], formFactor: mobile ? 'mobile' : 'desktop', screenEmulation: mobile ? undefined : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }, throttlingMethod: 'simulate' } };
    const r = await lighthouse(BASE + p, { port: chrome.port, output: 'json', logLevel: 'error' }, cfg);
    const c = r.lhr.categories, a = r.lhr.audits;
    const row = { page: p, mobile, seo: Math.round(c.seo.score * 100), accessibility: Math.round(c.accessibility.score * 100), bestPractices: Math.round(c['best-practices'].score * 100), performance: Math.round(c.performance.score * 100), lcpMs: Math.round(a['largest-contentful-paint'].numericValue), cls: +((a['cumulative-layout-shift'].numericValue || 0).toFixed(3)), tbtMs: Math.round(a['total-blocking-time'].numericValue) };
    rows.push(row); if (process.env.DETAIL) { const l = a['largest-contentful-paint-element']; console.log('LCP el:', JSON.stringify(l.details?.items?.[0]?.items?.[0]?.node?.snippet || '').slice(0,160)); console.log('main:', JSON.stringify(a['mainthread-work-breakdown'].details?.items?.slice(0,4))); console.log('bootup:', JSON.stringify(a['bootup-time'].details?.items?.slice(0,3).map(i=>[i.url.slice(-40),Math.round(i.total)]))); } console.log(JSON.stringify(row));
    fs.writeFileSync(`reports/lighthouse/${p.replace(/\//g, '_') || 'home'}-${mobile ? 'mobile' : 'desktop'}.json`, JSON.stringify({ row, failing: Object.values(r.lhr.audits).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative').map((x) => `${x.id}: ${x.score}`) }, null, 1));
  }
}
fs.writeFileSync('reports/lighthouse-summary.json', JSON.stringify({ at: new Date().toISOString(), base: BASE, rows }, null, 1));
await chrome.kill();
