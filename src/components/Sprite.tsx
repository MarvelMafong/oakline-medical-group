import { SPRITE } from './sprite-data';
/** One inline SVG sprite (logo mark and icons), referenced with <use>. */
export function Sprite() {
  return <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: SPRITE }} />;
}
export function Icon({ n, size, className }: { n: string; size?: number; className?: string }) {
  return <svg aria-hidden="true" className={className} width={size} height={size} focusable="false"><use href={`#i-${n}`} /></svg>;
}
