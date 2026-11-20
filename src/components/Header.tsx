'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DEPTS, SITE } from '@/data/site';
import { Logo } from './Logo';
import { Icon } from './Sprite';
import { Img } from './Img';

const NAV = [
  { href: '/doctors/', label: 'Doctors' },
  { href: '/patient-info/', label: 'First Visit' },
  { href: '/resources/', label: 'Resources' },
  { href: '/contact/', label: 'Contact' },
];

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [open]);
  const cur = (h: string) => (path.startsWith(h) ? ('page' as const) : undefined);
  const dotone = DEPTS.map((d, i) => (
    <Link key={d.slug} href={`/departments/${d.slug}/`}><i style={{ background: i % 2 ? 'var(--tang)' : 'var(--cobalt)', color: i % 2 ? 'var(--ink)' : '#fff' }}>{i + 1}</i><span><b>{d.name}</b><small>{d.short}</small></span></Link>
  ));
  return (
    <header className={`hdr${open ? ' menu-open' : ''}`} id="hdr" ref={ref}>
      <div className="pill">
        <Logo />
        <nav aria-label="Main">
          <ul>
            <li className="has">
              <Link href="/departments/" aria-current={cur('/departments')}>Departments <svg className="chev" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
              <div className="mega">
                <div className="ml">{dotone}</div>
                <Link className="mf" href="/appointments/"><Img name="visit-clinic-space" alt="" sizes="260px" /><span className="mft"><b>Not sure where to start?</b><small>Request a time and our staff will point you to the right team.</small><em>Request an Appointment <Icon n="arrow" size={16} /></em></span></Link>
              </div>
            </li>
            {NAV.map((n) => <li key={n.href}><Link href={n.href} aria-current={cur(n.href)}>{n.label}</Link></li>)}
          </ul>
        </nav>
        <div className="acts">
          <a className="callbtn" href={`tel:${SITE.tel}`} aria-label={`Call ${SITE.phone}`}><Icon n="phone" /><span className="num">{SITE.phone}</span></a>
          <Link className="btn req" href="/appointments/">Request an Appointment</Link>
          <button className="burger" type="button" aria-expanded={open} aria-controls="mm" onClick={() => setOpen(!open)}><Icon n={open ? 'close' : 'menu'} size={22} />Menu</button>
        </div>
        <div className="mmenu" id="mm">
          <Link className="l" href="/departments/">Departments</Link>
          {NAV.map((n) => <Link key={n.href} className="l" href={n.href}>{n.label}</Link>)}
          <Link className="l" href="/about/">About</Link>
          <Link className="l" href="/insurance-billing/">Insurance and Billing</Link>
          <Link className="l" href="/appointments/manage/">Check a request</Link>
          <div className="mchips" aria-label="Departments">{DEPTS.map((d) => <Link key={d.slug} href={`/departments/${d.slug}/`}>{d.name}</Link>)}</div>
          <Link className="btn" href="/appointments/">Request an Appointment</Link>
          <a className="btn ghost" href={`tel:${SITE.tel}`}>Call {SITE.phone}</a>
        </div>
      </div>
    </header>
  );
}
