import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEPTS, SITE, deptBySlug, deptByName, docsOf } from '@/data/site';
import { ARTICLES } from '@/data/articles';
import { Img, bg } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Blob } from '@/components/Blob';
import { Arrow } from '@/components/Arrow';
import { Faq, faqSchema } from '@/components/Faq';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const dynamicParams = false;
export function generateStaticParams() { return DEPTS.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = deptBySlug((await params).slug)!;
  return pageMeta({ title: `${d.name} in Sandy Springs, GA | Oakline Medical Group`, description: d.intro.slice(0, 155), path: `/departments/${d.slug}/` });
}

const KINDS = ['wh', 'pe', 'dm', 'dx'];

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const d = deptBySlug((await params).slug);
  if (!d) notFound();
  const docs = docsOf(d.slug);
  const first = d.name.toLowerCase().split(' ')[0].replace(/'s$/, '');
  const rel = ARTICLES.filter((a) => a.tags.some((t) => t.includes(first)) || a.category.toLowerCase().includes(first) || a.author.length && docs.some((x) => x.slug === a.authorSlug)).slice(0, 3);
  const articles = rel.length ? rel : ARTICLES.slice(0, 3);
  return (
    <>
      <section className="sec t-cream pg bgi" style={{ '--bgi': bg('bg-silk-1'), '--bgo': 0.4 } as React.CSSProperties}>
        <div className="wrap">
          <Crumbs items={[{ name: 'Departments', href: '/departments/' }, { name: d.name }]} />
          <div className="hero2">
            <div>
              <p className="eyebrow">Department</p>
              <h1 style={{ fontSize: 'clamp(38px,8vw,72px)', marginBottom: 16 }}>{d.name}</h1>
              <p className="lede">{d.intro}</p>
              <div className="row">
                <Link className="btn" href={`/appointments/?dept=${d.slug}`}>Request an Appointment <Icon n="arrow" /></Link>
                <a className="btn ghost" href={`tel:${SITE.tel}`}>Call {SITE.phone}</a>
              </div>
            </div>
            <div className="loops" style={{ aspectRatio: '1/1' }}>
              <figure className="lp a" style={{ width: '82%', height: '88%' }}><Img name={d.img} eager sizes="(min-width:900px) 420px, 80vw" alt={`${d.name} at Oakline Medical Group`} style={d.imgPos ? { objectPosition: d.imgPos } : undefined} /></figure>
              <svg className="lring ra" viewBox="0 0 520 546" aria-hidden="true"><ellipse className="dr" pathLength={1} cx="215" cy="240" rx="215" ry="238" fill="none" stroke="#2448B8" strokeWidth="3.5" /></svg>
              <div className="badge"><Icon n="cal" /><span><b>Let&apos;s find a time that works for you.</b></span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec t-off">
        <div className="wrap">
          <p className="eyebrow">What we offer</p>
          <h2 className="rv">{d.name} services</h2>
          <p className="lede rv"><b>Who it is for:</b> {d.who}</p>
          <div className="bento" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
            {d.services.map((s, i) => {
              const k = KINDS[i % 4];
              return (
                <div key={s.t} className={`dc ${k} rv`} style={{ minHeight: 180, alignContent: 'end' }}>
                  {k !== 'pe' && <Blob a={i % 2 ? 'var(--cobalt)' : 'var(--cream)'} b={i % 2 ? 'var(--cream)' : 'var(--tang)'} />}
                  <h3 style={{ fontSize: 22 }}>{s.t}</h3><p>{s.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec t-blue">
        <div className="wrap">
          <p className="eyebrow">Your team</p>
          <h2 className="rv">Meet the {d.name} doctors</h2>
          <div className="people">
            {docs.map((x, i) => <article key={x.slug} className="pp rv"><div className={`pimg c${(i % 3) + 1}`}><Img name={x.img} alt={`Portrait of ${x.name}`} sizes="(min-width:820px) 30vw, 92vw" style={x.imgPos ? { objectPosition: x.imgPos } : undefined} /></div><h3>{x.name}</h3><p>{x.role}</p><Link className="tlink" href={`/doctors/${x.slug}/`}>View profile</Link></article>)}
          </div>
        </div>
      </section>

      <section className="sec t-cream">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Your first visit</p>
            <h2 className="rv">What to expect</h2>
            <ul className="sched" style={{ marginTop: 14 }}>{d.visit.map((v) => <li key={v} className="rv" style={{ background: 'var(--off)', boxShadow: 'var(--sh)', borderRadius: 16, padding: '12px 16px', justifyContent: 'flex-start', gap: 10 }}><Icon n="check" size={22} />{v}</li>)}</ul>
            <p style={{ marginTop: 18 }}>Connected to: {d.connects.map((c, i) => <span key={c}>{i > 0 && ', '}<Link href={`/departments/${deptByName(c)?.slug}/`}>{c}</Link></span>)}.</p>
          </div>
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="rv">{d.name} questions</h2>
            <Faq items={d.faqs} openFirst />
            <JsonLd data={faqSchema(d.faqs)} />
          </div>
        </div>
      </section>

      <section className="sec t-off">
        <div className="wrap">
          <p className="eyebrow">Helpful reading</p>
          <h2 className="rv">Related health resources</h2>
          <div className="rgrid">{articles.map((a) => <Link key={a.slug} className="rc rv" href={`/resources/${a.slug}/`}><div className="rph"><Img name={a.img} alt="" sizes="(min-width:820px) 33vw, 92vw" /></div><span className="tag">{a.category}</span><h3>{a.title}</h3><span className="more">Read article <Arrow /></span></Link>)}</div>
        </div>
      </section>

      <section className="sec t-cobalt">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="rv">Ready to request a time in {d.name}?</h2>
          <p className="lede" style={{ margin: '0 auto' }}>It takes about a minute. Our staff confirm every request.</p>
          <div className="row" style={{ justifyContent: 'center' }}><Link className="btn warm" href={`/appointments/?dept=${d.slug}`}>Request an Appointment <Icon n="arrow" /></Link></div>
        </div>
      </section>
    </>
  );
}
