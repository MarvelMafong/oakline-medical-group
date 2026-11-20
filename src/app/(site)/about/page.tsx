import Link from 'next/link';
import { DEPTS, DOCS } from '@/data/site';
import { Img, bg } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Blob } from '@/components/Blob';
import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const metadata = pageMeta({ title: 'About Oakline Medical Group', description: 'Oakline is a multi-specialty outpatient clinic in Sandy Springs built around one idea: care that connects every stage of life.', path: '/about/' });

export default function Page() {
  return (
    <>
      <section className="sec t-cream pg bgi" style={{ '--bgi': bg('bg-silk-1'), '--bgo': 0.4 } as React.CSSProperties}>
        <div className="wrap">
          <Crumbs items={[{ name: 'About' }]} />
          <div className="hero2">
            <div>
              <p className="eyebrow">About Oakline</p>
              <h1 style={{ fontSize: 'clamp(36px,7.5vw,68px)', marginBottom: 16 }}>Care that connects every stage of life</h1>
              <p className="lede">Oakline Medical Group is an outpatient clinic in Sandy Springs, Georgia, where six departments share one team approach, so the people caring for you stay connected.</p>
              <div className="row"><Link className="btn" href="/appointments/">Request an Appointment <Icon n="arrow" /></Link><Link className="btn ghost" href="/doctors/">Meet our doctors</Link></div>
            </div>
            <figure className="team rv" style={{ margin: 0, aspectRatio: '4/3' }}><Img name="team-blue-scrubs" alt="Five smiling clinicians standing together" sizes="(min-width:900px) 520px, 92vw" /><figcaption><b>One team behind every visit</b><span>Doctors, nurses and staff, working as one.</span></figcaption><Blob /></figure>
          </div>
        </div>
      </section>
      <section className="sec t-off">
        <div className="wrap">
          <p className="eyebrow">What we believe</p>
          <h2 className="rv">Three promises we build around</h2>
          <div className="grid3">
            <div className="card rv"><h3>One team</h3><p>Primary Care, Women&apos;s Health, Pediatrics, Cardiology, Dermatology and Diagnostics share a plan, so you never have to repeat yourself.</p></div>
            <div className="card cr rv"><h3>A request, not a hurdle</h3><p>Ask for a time in about a minute. Our staff confirm it with you by phone. We never ask for symptoms or medical history online.</p></div>
            <div className="card cb rv"><h3>Plain words</h3><p>We explain things clearly, leave room for questions and make visits easy for every age, language and ability.</p></div>
          </div>
        </div>
      </section>
      <section className="sec t-blue">
        <div className="wrap">
          <p className="eyebrow">Our team</p>
          <h2 className="rv">{DOCS.length} doctors, {DEPTS.length} departments</h2>
          <div className="tags" style={{ marginTop: 14 }}>{DEPTS.map((d) => <Link key={d.slug} className="chip" href={`/departments/${d.slug}/`}>{d.name}</Link>)}</div>
          <p style={{ marginTop: 18 }}>Read about each doctor on the <Link href="/doctors/">doctors page</Link>, or learn what to expect on the <Link href="/patient-info/">first visit guide</Link>.</p>
        </div>
      </section>
    </>
  );
}
