// Build-time responsive images: webp + avif + resized jpg per width. Originals stay as the jpg fallback.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
const dir = 'public/images';
const WIDTHS = [360, 640, 960, 1280];
const meta = {};
// Staff portraits cropped from the team photos (square crops, so no new photos are invented).
const CROPS = [
  ['staff-brooks','team-blue-scrubs',0,95,235,235],['staff-okafor','team-blue-scrubs',95,110,225,225],
  ['staff-vance','team-blue-scrubs',205,70,215,215],['staff-hart','team-blue-scrubs',310,105,205,205],
  ['staff-lindqvist','team-blue-scrubs',420,120,200,200],['staff-whitaker','team-hallway',350,20,260,260],
];
for (const [out, from, left, top, width, height] of CROPS) {
  const o = path.join(dir, out + '.jpg');
  if (!fs.existsSync(o)) await sharp(path.join(dir, from + '.jpg')).extract({ left, top, width, height }).jpeg({ quality: 88 }).toFile(o);
}
const files = fs.readdirSync(dir).filter((f) => /^[a-z0-9-]+\.jpg$/.test(f) && !/-\d+\.jpg$/.test(f));
for (const f of files) {
  const name = f.replace('.jpg', '');
  const src = path.join(dir, f);
  const info = await sharp(src).metadata();
  meta[name] = { w: info.width, h: info.height };
  const ws = [...new Set(WIDTHS.filter((w) => w < info.width).concat([info.width]))];
  for (const w of ws) {
    for (const [ext, fn] of [['webp', (s) => s.webp({ quality: 74 })], ['avif', (s) => s.avif({ quality: 52, effort: 3 })], ['jpg', (s) => s.jpeg({ quality: 78, mozjpeg: true })]]) {
      const out = path.join(dir, `${name}-${w}.${ext}`);
      if (w === info.width && ext === 'jpg') continue;
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs) continue;
      await fn(sharp(src).resize({ width: w })).toFile(out);
    }
  }
  meta[name].ws = ws;
}
fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/images.json', JSON.stringify(meta, null, 1));
console.log('images ready:', Object.keys(meta).length);
