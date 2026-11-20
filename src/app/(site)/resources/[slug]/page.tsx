import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES, articleBySlug, readMins, slugify } from '@/data/articles';
import { docBySlug } from '@/data/site';
import { SITE_URL } from '@/config/seo.config.mjs';
import { Img } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Arrow } from '@/components/Arrow';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { CopyLink } from '@/components/CopyLink';

export const dynamicParams = false;
export function generateStaticParams() { return ARTICLES.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug)!;
  return pageMeta({ title: `${a.title} | Oakline Health Resources`, description: a.summary, path: `/resources/${a.slug}/`, type: 'article' });
}
const fmt = (s: string) => new Date(s + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const author = docBySlug(a.authorSlug);
  const url = `${SITE_URL}/resources/${a.slug}/`;
  const rel = a.related.map((s) => articleBySlug(s)).filter(Boolean) as typeof ARTICLES;
  const enc = encodeURIComponent;
  return (
    <section className="sec t-off pg">
      <div className="wrap">
        <Crumbs items={[{ name: 'Health Resources', href: '/resources/' }, { name: a.title }]} />
        <p className="eyebrow">{a.category}</p>
        <h1 style={{ fontSize: 'clamp(32px,6.4vw,56px)', marginBottom: 12, maxWidth: '20ch' }}>{a.title}</h1>
        <p className="lede">{a.summary}</p>
        <p className="byline" style={{ marginTop: 10 }}><span>By {author ? <Link href={`/doctors/${author.slug}/`}>{a.author}</Link> : a.author}</span><span>Published {fmt(a.date)}</span><span>Updated {fmt(a.updated)}</span><span>{readMins(a)} min read</span></p>
        <div className="cover"><Img name={a.img} eager alt="" sizes="(min-width:900px) 1100px, 92vw" style={a.imgPos ? { objectPosition: a.imgPos } : undefined} /></div>
        <div className="art">
          <article className="prose">
            {a.sections.map((s) => <section key={s.h}><h2 id={slugify(s.h)}>{s.h}</h2>{s.p.map((p, i) => <p key={i}>{p}</p>)}</section>)}
            {a.refs.length > 0 && <><h2 id="learn-more">Learn more</h2><ul>{a.refs.map((r) => <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.t}</a></li>)}</ul></>}
            <p className="note" style={{ marginTop: 24 }}>This article is general information, not medical advice. It cannot diagnose or treat anything. Talk with your own doctor about your health. In an emergency, call 911.</p>
            <div className="sharerow" aria-label="Share this article">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer"><Icon n="share" />Share on Facebook</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer"><Icon n="share" />Share on LinkedIn</a>
              <a href={`mailto:?subject=${enc(a.title)}&body=${enc(url)}`}><Icon n="mail" />Email</a>
              <CopyLink url={url} />
            </div>
          </article>
          <aside className="toc card" aria-label="Table of contents">
            <h2 style={{ fontSize: 18 }}>In this article</h2>
            <ol>{a.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`}>{s.h}</a></li>)}</ol>
            <Link className="btn sm" href="/appointments/" style={{ marginTop: 14 }}>Request an Appointment <Icon n="arrow" /></Link>
          </aside>
        </div>
        <h2 style={{ marginTop: 40 }}>Related articles</h2>
        <div className="rgrid">{rel.map((r) => <Link key={r.slug} className="rc rv" href={`/resources/${r.slug}/`}><div className="rph"><Img name={r.img} alt="" sizes="(min-width:820px) 33vw, 92vw" /></div><span className="tag">{r.category}</span><h3>{r.title}</h3><span className="more">Read article <Arrow /></span></Link>)}</div>
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.summary, datePublished: a.date, dateModified: a.updated, author: { '@type': 'Person', name: a.author }, image: `${SITE_URL}/images/${a.img}.jpg`, mainEntityOfPage: url, publisher: { '@type': 'Organization', name: 'Oakline Medical Group (fictional)' } }} />
      </div>
    </section>
  );
}
