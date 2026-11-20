import Link from 'next/link';
/** Approved mark and wordmark, rebuilt as inline SVG. */
export function Logo({ size = 16, reverse = false, sub = false, href = '/', label = 'Oakline Medical Group, home' }: { size?: number; reverse?: boolean; sub?: boolean; href?: string; label?: string }) {
  return (
    <Link className={`lock${reverse ? ' rev' : ''}`} style={{ fontSize: size }} href={href} aria-label={label}>
      <svg className="sym" aria-hidden="true" viewBox="0 0 200 150"><use href="#mk" /></svg>
      <span className="wm"><span className="wm-name">Oakline</span>{sub && <span className="wm-sub">MEDICAL GROUP</span>}</span>
    </Link>
  );
}
