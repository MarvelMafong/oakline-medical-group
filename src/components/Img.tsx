import meta from '@/data/images.json';
type M = Record<string, { w: number; h: number; ws: number[] }>;
const M = meta as M;
/** Responsive picture from pre-generated avif, webp and jpg sizes. width and height always set. */
export function Img({ name, alt, sizes = '(min-width:900px) 40vw, 92vw', eager = false, priority = false, className, style }: { name: string; alt: string; sizes?: string; eager?: boolean; priority?: boolean; className?: string; style?: React.CSSProperties }) {
  const m = M[name];
  if (!m) throw new Error(`Img: unknown image "${name}". Add the file to public/images and run npm run images.`);
  const set = (ext: string) => m.ws.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');
  
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img src={`/images/${name}.jpg`} sizes={sizes} alt={alt} width={m.w} height={m.h}
        loading={eager ? 'eager' : 'lazy'} decoding={eager ? 'sync' : 'async'} {...(priority ? { fetchPriority: 'high' as const } : {})} className={className} style={style} />
    </picture>
  );
}
/** CSS background url for the drifting section backgrounds. */
export function bg(name: string, w = 960): string {
  const m = M[name];
  if (!m) throw new Error(`bg: unknown image "${name}"`);
  const use = m ? m.ws.filter((x) => x <= w).pop() ?? m.ws[0] : w;
  return `url(/images/${name}-${use}.webp)`;
}
