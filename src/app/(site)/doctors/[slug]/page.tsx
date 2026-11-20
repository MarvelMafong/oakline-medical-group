import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DOCS, SITE, deptBySlug, docBySlug } from '@/data/site';
import { scheduleText } from '@/lib/availability';
import { ARTICLES } from '@/data/articles';
import { Img } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Arrow } from '@/components/Arrow';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const dynamicParams = false;
export function generateStaticParams() { return DOCS.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = docBySlug((await params).slug)!;
  return pageMeta({ title: `${d.name}, ${d.role} | Oakline Medical Group`, description: d.bio.slice(0, 155), path: `/doctors/${d.slug}/` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const d = docBySlug((await params).slug);
  if (!d) notFound();
  const dept = deptBySlug(d.dept)!;
  const mine = ARTICLES.filter((a) => a.authorSlug === d.slug);
  return (
    <section className="sec t-cream pg">
      <div className="wrap">
        <Crumbs items={[{ name: 'Doctors', href: '/doctors/' }, { name: d.name }]} />
        <div className="hero2" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">{dept.name}</p>
            <h1 style={{ fontSize: 'clamp(36px,7vw,64px)', marginBottom: 12 }}>{d.name}</h1>
            <p className="lede" style={{ marginBottom: 10 }}>{d.role}</p>
            <p>{d.bio}</p>
            <div className="grid2" style={{ marginTop: 20 }}>
              <div className="card"><h2 style={{ fontSize: 20 }}>Specialties</h2><ul className="tags" style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>{d.specialties.map((s) => <li key={s} className="tagpill">{s}</li>)}</ul></div>
              <div className="card"><h2 style={{ fontSize: 20 }}>Languages</h2><p style={{ marginTop: 8 }}>{d.languages.join(', ')}</p><p className="help" style={{ marginTop: 8 }}>{d.accepting ? 'Accepting new patients.' : 'Currently seeing existing patients.'} Ask for an interpreter at any time.</p></div>
            </div>
            <div className="card" style={{ marginTop: 16 }}><h2 style={{ fontSize: 20 }}>Weekly schedule</h2><ul className="sched" style={{ marginTop: 8 }}>{scheduleText(d).map((s) => <li key={s}>{s}</li>)}</ul><p className="help" style={{ marginTop: 8 }}>Open times are shown when you request a visit.</p></div>
            <div className="row">
              <Link className="btn" href={`/appointments/?doctor=${d.slug}`}>Request with this doctor <Icon n="arrow" /></Link>
              <a className="btn ghost" href={`tel:${SITE.tel}`}>Call {SITE.phone}</a>
            </div>
          </div>
          <div className="pimg" style={{ aspectRatio: '4/5', borderRadius: '999px 999px 22px 22px', maxWidth: 420, justifySelf: 'center', width: '100%' }}><Img name={d.img} eager alt={`Portrait of ${d.name}`} sizes="(min-width:900px) 420px, 90vw" style={d.imgPos ? { objectPosition: d.imgPos } : undefined} /></div>
        </div>
        {mine.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <h2>Articles by {d.name}</h2>
            <div className="rgrid">{mine.map((a) => <Link key={a.slug} className="rc rv" href={`/resources/${a.slug}/`}><div className="rph"><Img name={a.img} alt="" sizes="(min-width:820px) 33vw, 92vw" /></div><span className="tag">{a.category}</span><h3>{a.title}</h3><span className="more">Read article <Arrow /></span></Link>)}</div>
          </div>
        )}
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Person', name: d.name, jobTitle: d.role, description: d.bio, knowsLanguage: d.languages }} />
      </div>
    </section>
  );
}
