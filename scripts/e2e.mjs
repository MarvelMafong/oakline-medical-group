// Usage: node scripts/e2e.mjs <baseUrl> [--shots]   (playwright-core resolved from TOOLS_DIR or local)
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire((process.env.TOOLS_DIR || '.') + '/');
const { chromium } = require('playwright-core');
const BASE = (process.argv[2] || 'http://localhost:4173').replace(/\/$/, '');
const shots = process.argv.includes('--shots');
const out = [];
const t = (name, ok, extra = '') => { out.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'} ${name} ${extra}`); };
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
async function ctx(w, h, mobile = false) {
  const c = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, deviceScaleFactor: 1 });
  if (BASE.startsWith('https')) await c.route('**/*', async (route) => {
    const rq = route.request();
    for (let a = 0; a < 4; a++) {
      try {
        const r = await fetch(rq.url(), { method: rq.method(), headers: { 'accept-encoding': 'gzip' }, redirect: 'manual', signal: AbortSignal.timeout(90000) });
        const h = Object.fromEntries([...r.headers.entries()].filter(([k]) => !['content-encoding', 'content-length', 'transfer-encoding'].includes(k)));
        return await route.fulfill({ status: r.status, headers: h, body: Buffer.from(await r.arrayBuffer()) });
      } catch (e) { await new Promise((x) => setTimeout(x, 1500)); }
    }
    await route.abort();
  });
  const p = await c.newPage(); const og = p.goto.bind(p); p.goto = (u, o) => og(u, { waitUntil: "domcontentloaded", ...o }); p.setDefaultTimeout(120000); p.setDefaultNavigationTimeout(120000);
  p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`${p.url()} ${m.text()}`); });
  p.on('response', (r) => { if (r.status() >= 400 && !/__next\.|\/nope\//.test(r.url())) errors.push(`HTTP ${r.status()} ${r.url()}`); });
  p.on('pageerror', (e) => errors.push(`${p.url()} ${e.message}`));
  return [c, p];
}
const scrollAll = async (p) => { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); }); };

// ---- desktop flow
let [c, p] = await ctx(1280, 800);
await p.goto(BASE + '/'); await p.waitForSelector('h1');
t('home h1', /connected/.test(await p.textContent('h1')));
await scrollAll(p);
if (shots) { await p.waitForTimeout(1800); await p.screenshot({ path: 'shots/case-home.png' }); }
t('no horizontal scroll (desktop home)', await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
await p.goto(BASE + '/appointments/'); await p.waitForSelector('text=Which department?');
await p.check('input[name=dept][value=cardiology]', { force: true });
await p.selectOption('#f-reason', 'New patient visit');
await p.click('button:has-text("Next")');
await p.click('label.slot:has-text("Any day")'); await p.click('label.slot:has-text("Any time")');
await p.click('button:has-text("Next")');
await p.click('button:has-text("Next")'); // doctor: first available
await p.waitForSelector('.cal');
await p.click('button.calc:not([disabled])');
await p.click('label.slot >> nth=0');
await p.click('button:has-text("Next")');
await p.fill('#f-firstName', 'Test'); await p.fill('#f-lastName', 'Patient'); await p.fill('#f-phone', '404-555-0199'); await p.fill('#f-email', 'seraphielray@gmail.com');
await p.click('button:has-text("Next")');
await p.waitForSelector('text=Review your request');
if (shots) { await p.screenshot({ path: 'shots/case-booking.png' }); }
await p.check('#f-understand', { force: true });
await p.click('button:has-text("Send request")');
await p.waitForSelector('.refbox');
const ref = (await p.textContent('.refbox')).trim();
t('request reference shown', /^OAK-[A-Z0-9]{6}$/.test(ref), ref);
// admin
await p.goto(BASE + '/admin/'); await p.waitForSelector('#a-id');
await p.fill('#a-id', 'staff@oakline.example'); await p.fill('#a-pw', 'oakline-demo'); await p.click('button:has-text("Sign in")');
await p.waitForSelector('text=Appointment requests');
await p.fill('#rq', ref); await p.waitForSelector(`tr:has-text("${ref}")`);
t('request appears in admin', true);
await p.click(`tr:has-text("${ref}") button.rowbtn`); await p.click('button:has-text("Confirm")');
await p.keyboard.press('Escape');
// patient lookup
await p.goto(BASE + '/appointments/manage/'); await p.fill('#m-ref', ref); await p.fill('#m-last', 'Patient'); await p.click('button:has-text("Find my request")');
await p.waitForSelector('.statusbadge');
t('status change shows on lookup', (await p.textContent('.statusbadge')).trim() === 'Confirmed');
// admin dashboard + shot
await p.goto(BASE + '/admin/dashboard/'); await p.waitForSelector('.chart'); await p.waitForTimeout(500);
t('dashboard charts', (await p.locator('.chart svg').count()) >= 4);
if (shots) await p.screenshot({ path: 'shots/case-admin.png' });
// contact -> inbox
await p.goto(BASE + '/contact/'); await p.fill('#c-name', 'Test Person'); await p.fill('#c-email', 'seraphielray@gmail.com'); await p.fill('#c-msg', 'Hello from the test'); await p.click('button:has-text("Send message")');
await p.waitForSelector('text=Message received');
await p.goto(BASE + '/admin/messages/'); await p.waitForSelector('text=Hello from the test'); t('contact message in inbox', true);
// resources search
await p.goto(BASE + '/resources/'); await p.fill('#rs', 'medicine');
await p.waitForTimeout(300);
const n = await p.locator('.rgrid .rc').count(); t('article search', n >= 1 && n < 8, `${n} results`);
await p.click('button.chip:has-text("Family")'); await p.fill('#rs', ''); await p.waitForTimeout(200);
t('article category filter', (await p.locator('.rgrid .rc').count()) === 1);
// doctors filter
await p.goto(BASE + '/doctors/'); await p.selectOption('#fd', 'cardiology'); await p.waitForTimeout(200);
t('doctor filter', (await p.locator('.dgrid .dcard').count()) === 2);
// 404
const r404 = await p.goto(BASE + '/nope/'); t('404 page', r404.status() === 404 && (await p.textContent('h1')).includes('could not find'));
// every page: no horizontal scroll desktop
const pages = ['/', '/departments/', '/departments/primary-care/', '/doctors/', '/doctors/jordan-ellis/', '/resources/', '/resources/talking-about-heart-health/', '/about/', '/patient-info/', '/insurance-billing/', '/contact/', '/privacy/', '/terms/', '/case-study/', '/appointments/', '/appointments/manage/'];
for (const u of pages) { await p.goto(BASE + u); await p.waitForTimeout(150); const ok = await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1); if (!ok) t('h-scroll desktop ' + u, false); }
await c.close();

// ---- mobile
[c, p] = await ctx(390, 844, true);
for (const u of pages.concat(['/admin/'])) {
  await p.goto(BASE + u); await p.waitForTimeout(200);
  const w = await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  if (w[0] > w[1] + 1) t('h-scroll mobile ' + u, false, `${w}`);
}
await p.goto(BASE + '/'); await scrollAll(p); await p.waitForTimeout(1500);
t('mobile burger menu', await p.locator('.burger').isVisible());
await p.click('.burger'); t('mobile menu opens', await p.locator('#mm').isVisible());
await p.click('.burger');
if (shots) { await p.waitForTimeout(500); await p.screenshot({ path: 'shots/case-mobile.png' }); }
await c.close();
t('no console errors', errors.length === 0, errors.slice(0, 5).join(' || '));
await browser.close();
console.log(out.every(Boolean) ? 'ALL PASS' : 'SOME FAILED');
process.exit(out.every(Boolean) ? 0 : 1);
