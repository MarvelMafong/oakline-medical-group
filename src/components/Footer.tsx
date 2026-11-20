import Link from 'next/link';
import { DEPTS, SITE } from '@/data/site';
import { Logo } from './Logo';
import { Icon } from './Sprite';

export function Footer() {
  return (
    <footer className="foot">
      <div className="fgrid">
        <div><Logo size={20} reverse sub label="Oakline Medical Group, home" /><p style={{ marginTop: 14 }}>{SITE.tagline}</p></div>
        <div><b>Departments</b><ul className="fl">{DEPTS.map((d) => <li key={d.slug}><Link href={`/departments/${d.slug}/`}>{d.name}</Link></li>)}</ul></div>
        <div><b>Patients</b><ul className="fl"><li><Link href="/appointments/">Request an Appointment</Link></li><li><Link href="/appointments/manage/">Check a request</Link></li><li><Link href="/patient-info/">Your first visit</Link></li><li><Link href="/doctors/">Doctors</Link></li><li><Link href="/insurance-billing/">Insurance and Billing</Link></li><li><Link href="/resources/">Health Resources</Link></li></ul></div>
        <div><b>Contact</b><ul className="fl"><li><a href={`tel:${SITE.tel}`}>{SITE.phone}</a></li><li>{SITE.addressLine}</li><li>{SITE.hours}</li><li><Link href="/contact/">Contact and location</Link></li><li><Link href="/about/">About</Link></li><li><Link href="/privacy/">Privacy</Link> and <Link href="/terms/">Terms</Link></li></ul></div>
      </div>
      <div className="fcr">
        <div className="by"><span className="byk">Designed and built by</span><b className="byn">Marvel Mafong <span>at TekGemm Studio</span></b></div>
        <div className="byb">
          <a className="credit" href="https://tekgemmstudio.com" target="_blank" rel="noopener">Visit TekGemm Studio <Icon n="ext" size={16} /></a>
          <a className="credit alt" href="https://marvelmafong.work" target="_blank" rel="noopener">Marvel&apos;s portfolio <Icon n="ext" size={16} /></a>
          <Link className="cslink" href="/case-study/">Case study</Link>
        </div>
        <p className="fine">{SITE.fine}</p>
      </div>
    </footer>
  );
}
