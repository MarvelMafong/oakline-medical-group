// Build-time responsive images: webp + avif + resized jpg per width. Originals stay as the jpg fallback.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const dir = 'public/images';
const WIDTHS = [360, 640, 960, 1280];
const meta = {};
// Staff portraits cropped from the team photos (square crops, so no new photos are invented).
const CROPS = [
  // [name, source, left, top, width, height, upscale]  single-person, tight portrait crops. No second person at any edge.
  ['staff-brooks', 'dept-womens-health', 20, 8, 250, 300, 2],
  ['staff-whitaker', 'dept-cardiology', 75, 28, 250, 300, 2],
  ['staff-vance', 'team-hallway', 410, 38, 178, 235, 3],
  ['staff-okafor', 'team-blue-scrubs', 22, 138, 124, 150, 4],
  ['staff-hart', 'team-blue-scrubs', 393, 114, 88, 146, 5],
  ['staff-lindqvist', 'team-blue-scrubs', 494, 148, 122, 150, 4],
];
for (const [out, from, left, top, width, height, up] of CROPS) {
  const o = path.join(dir, out + '.jpg');
  if (!fs.existsSync(o)) await sharp(path.join(dir, from + '.jpg')).extract({ left, top, width, height }).resize({ width: width * up, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).jpeg({ quality: 90 }).toFile(o);
}
const files = fs.readdirSync(dir).filter((f) => /^[a-z0-9-]+\.jpg$/.test(f) && !/-\d{3,4}\.jpg$/.test(f));
for (const f of files) {
  const name = f.replace('.jpg', '');
  const src = path.join(dir, f);
  const info = await sharp(src).metadata();
  meta[name] = { w: info.width, h: info.height };
  const ws = [...new Set(WIDTHS.filter((w) => w < info.width).concat([info.width]))];
  for (const w of ws) {
    for (const [ext, fn] of [['webp', (s) => s.webp({ quality: 74 })], ['avif', (s) => s.avif({ quality: 52, effort: 3 })], ]) {
      const out = path.join(dir, `${name}-${w}.${ext}`);
      if (w === info.width && ext === 'jpg') continue;
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs) continue;
      await fn(sharp(src).resize({ width: w })).toFile(out);
    }
  }
  meta[name].ws = ws;
}
for (const f of fs.existsSync('shots') ? fs.readdirSync('shots') : []) { const o = 'public/images/case-' + f.replace(/^case-/, '').replace('.png', '.webp'); if (!fs.existsSync(o)) await sharp('shots/' + f).webp({ quality: 80 }).toFile(o); const o6 = o.replace('.webp', '-640.webp'); if (!fs.existsSync(o6)) await sharp('shots/' + f).resize({ width: 640 }).webp({ quality: 78 }).toFile(o6); }
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/images.json', JSON.stringify(meta, null, 1));
console.log('images ready:', Object.keys(meta).length);
