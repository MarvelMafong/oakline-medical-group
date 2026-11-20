import meta from '@/data/images.json';
type M = Record<string, { w: number; h: number; ws: number[] }>;
const M = meta as M;
/** Responsive picture from pre-generated avif, webp and jpg sizes. width and height always set. */
export function Img({ name, alt, sizes = '(min-width:900px) 40vw, 92vw', eager = false, className, style }: { name: string; alt: string; sizes?: string; eager?: boolean; className?: string; style?: React.CSSProperties }) {
  const m = M[name];
  if (!m) return null;
  const set = (ext: string) => m.ws.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');
  const last = m.ws[m.ws.length - 1];
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img src={`/images/${name}.jpg`} srcSet={m.ws.map((w) => (w === last ? `/images/${name}.jpg ${w}w` : `/images/${name}-${w}.jpg ${w}w`)).join(', ')} sizes={sizes} alt={alt} width={m.w} height={m.h}
        loading={eager ? 'eager' : 'lazy'} decoding={eager ? 'sync' : 'async'} {...(eager ? { fetchPriority: 'high' as const } : {})} className={className} style={style} />
    </picture>
  );
}
/** CSS background url for the drifting section backgrounds. */
export function bg(name: string, w = 960): string {
  const m = M[name];
  const use = m ? m.ws.filter((x) => x <= w).pop() ?? m.ws[0] : w;
  return `url(/images/${name}-${use}.webp)`;
}
