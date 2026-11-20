import Link from 'next/link';
import { DEPTS, docsOf } from '@/data/site';
import { Img, bg } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Blob } from '@/components/Blob';
import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const metadata = pageMeta({ title: 'Departments | Oakline Medical Group', description: "Six connected departments: Primary Care, Women's Health, Pediatrics, Cardiology, Dermatology and Diagnostics. One team, one plan.", path: '/departments/' });

const RINGS: Record<string, [string, string]> = { wh: ['var(--cream)', 'var(--tang)'], dm: ['var(--cobalt)', 'var(--cream)'], dx: ['var(--cobalt)', 'var(--tang)'] };

export default function Page() {
  return (
    <section className="sec t-off pg bgi" style={{ '--bgi': bg('bg-leaf'), '--bgo': 0.7 } as React.CSSProperties}>
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Departments' }]} />
        <p className="eyebrow">Our departments</p>
        <h1>Healthcare that works together</h1>
        <p className="lede">Six departments under one roof, sharing one team approach, so the people caring for you stay connected.</p>
        <div className="bento">
          {DEPTS.map((d) => {
            const colored = RINGS[d.card];
            const n = docsOf(d.slug).length;
            return (
              <Link key={d.slug} className={`dc ${d.card} rv${colored ? ' ph2' : ''}`} href={`/departments/${d.slug}/`}>
                <div className={`dph${d.card === 'pc' ? ' tall' : ''}${d.card === 'cd' ? ' top' : ''}`}><Img name={d.img} alt="" sizes="(min-width:820px) 33vw, 92vw" style={d.imgPos ? { objectPosition: d.imgPos } : undefined} /></div>
                {colored && <Blob a={colored[0]} b={colored[1]} />}
                <h3>{d.name}</h3><p>{d.short}. {n} {n === 1 ? 'doctor' : 'doctors'}.</p><span className="more">View department <Icon n="arrow" /></span>
                {d.card === 'pc' && <div className="chips" aria-label="Connected departments">{d.connects.map((c) => <span key={c}>{c}</span>)}</div>}
              </Link>
            );
          })}
        </div>
        <div className="row"><Link className="btn" href="/appointments/">Request an Appointment <Icon n="arrow" /></Link><Link className="btn ghost" href="/doctors/">Meet our doctors</Link></div>
      </div>
    </section>
  );
}
