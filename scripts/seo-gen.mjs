// Build-time static files: robots.txt, sitemap.xml, llms.txt, IndexNow key file and vercel.json (headers). All driven by seo.config.mjs.
import fs from 'node:fs';
import { SITE_URL, STUDIO, PERSON, indexablePaths, INDEXNOW_KEY } from '../src/config/seo.config.mjs';
const paths = indexablePaths();
const all = paths.includes('*');
const list = all ? ['/', '/case-study/'] : paths; // "all" mode: extend sitemap from routes.json if present
let routes = list;
if (all && fs.existsSync('src/data/routes.json')) routes = JSON.parse(fs.readFileSync('src/data/routes.json', 'utf8'));
const caseImgs = ['/images/case-study-og.png', '/images/case-home.png', '/images/case-booking.png', '/images/case-admin.png', '/images/case-mobile.png'].filter((p) => fs.existsSync('public' + p));
const sm = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>${r === '/case-study/' ? caseImgs.map((i) => `<image:image><image:loc>${SITE_URL}${i}</image:loc></image:image>`).join('') : ''}</url>`).join('\n') + `\n</urlset>\n`;
fs.writeFileSync('public/sitemap.xml', sm);
const bots = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot'];
fs.writeFileSync('public/robots.txt', `# Crawling is allowed so crawlers can read the noindex directive on non-indexable pages.\nUser-agent: *\nAllow: /\n\n${bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync('public/llms.txt', `# ${STUDIO.name}\n\n> ${STUDIO.name} is a web design and development studio led by ${PERSON.name}. It designs and builds fast, accessible websites for clinics, medical practices and healthcare businesses.\n\n## Key pages\n- [Healthcare website case study: Oakline Medical Group](${SITE_URL}/case-study/): A portfolio project. A complete clinic website with an appointment request flow, department and doctor pages, a staff admin with dashboard, health resources and accessible forms. Oakline is a fictional clinic.\n- [${STUDIO.name}](${STUDIO.url}): The studio website. Contact the studio here about a clinic or healthcare website.\n- [${PERSON.name}](${PERSON.url}): Portfolio of the designer and developer.\n\n## Facts\n- Oakline Medical Group is a fictional clinic created as a portfolio project. It is not a real healthcare provider and gives no medical advice.\n- Only the case study page is intended for search indexing. All other pages are marked noindex.\n- Technical approach: static site, TypeScript, accessible by design (WCAG 2.2 AA targets), no third-party trackers.\n`);
fs.writeFileSync(`public/${INDEXNOW_KEY}.txt`, INDEXNOW_KEY + '\n');
const sec = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" },
];
const imm = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }];
const headers = [
  { source: '/((?!case-study)[^.]*)', headers: [{ key: 'X-Robots-Tag', value: all ? 'index, follow' : 'noindex, follow' }, { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
  { source: '/case-study/', headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }, { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
  { source: '/images/(.*)', headers: imm },
  { source: '/_next/static/(.*)', headers: imm },
  { source: '/fonts/(.*)', headers: imm },
  { source: '/(.*)', headers: sec },
];
if (all) headers.splice(0, 2);
fs.writeFileSync('vercel.json', JSON.stringify({ $schema: 'https://openapi.vercel.sh/vercel.json', git: { deploymentEnabled: false }, trailingSlash: true, cleanUrls: false, headers }, null, 2) + '\n');
console.log('seo files written; indexable:', paths.join(','));
