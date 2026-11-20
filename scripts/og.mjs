// Purpose-made social images (1200x630) from SVG. Run once; outputs are committed.
import sharp from 'sharp';
const mk = (kicker, l1, l2, foot) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7E9DA"/><stop offset="1" stop-color="#DCE6F5"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<g fill="none" stroke-width="34"><ellipse cx="930" cy="290" rx="190" ry="210" stroke="#2448B8"/><ellipse cx="1040" cy="400" rx="140" ry="120" stroke="#F28A45"/></g>
<g font-family="Segoe UI, Arial, sans-serif" fill="#14203A">
<text x="70" y="120" font-size="30" font-weight="700" letter-spacing="5" fill="#2448B8">${kicker}</text>
<text x="70" y="270" font-size="78" font-weight="800">${l1}</text>
<text x="70" y="360" font-size="78" font-weight="800">${l2}</text>
<text x="70" y="520" font-size="34" font-weight="600">${foot}</text></g></svg>`;
await sharp(Buffer.from(mk('OAKLINE MEDICAL GROUP', 'Care that connects', 'every stage of life.', 'A fictional clinic website'))).png().toFile('public/images/og-oakline.png');
await sharp(Buffer.from(mk('CASE STUDY', 'A healthcare website,', 'built by TekGemm Studio', 'Designed and built by Marvel Mafong'))).png().toFile('public/images/case-study-og.png');
console.log('og done');
