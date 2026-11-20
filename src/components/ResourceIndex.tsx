'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ARTICLES, CATEGORIES, TAGS, readMins } from '@/data/articles';
import { Img } from './Img';
import { Arrow } from './Arrow';
import { Icon } from './Sprite';

/** Search, category filters and tag filters. Client state only (no crawlable filter URLs). */
export function ResourceIndex() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [tag, setTag] = useState('');
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ARTICLES.filter((a) => (!cat || a.category === cat) && (!tag || a.tags.includes(tag)) &&
      (!s || [a.title, a.summary, a.category, a.tags.join(' '), a.sections.map((x) => x.h + ' ' + x.p.join(' ')).join(' ')].join(' ').toLowerCase().includes(s)));
  }, [q, cat, tag]);
  return (
    <div>
      <div className="filters" role="search" style={{ gridTemplateColumns: undefined }}>
        <div className="field" style={{ margin: 0 }}><label htmlFor="rs">Search articles</label><input id="rs" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try checkup, medicines or children" /></div>
      </div>
      <div style={{ marginTop: 14 }}>
        <p className="cap" style={{ margin: '0 0 8px' }}>Category</p>
        <div className="tags" role="group" aria-label="Filter by category">
          <button type="button" className="chip" aria-pressed={!cat} onClick={() => setCat('')}>All</button>
          {CATEGORIES.map((c) => <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(cat === c ? '' : c)}>{c}</button>)}
        </div>
        <p className="cap" style={{ margin: '16px 0 8px' }}>Tags</p>
        <div className="tags" role="group" aria-label="Filter by tag">
          {TAGS.map((t) => <button key={t} type="button" className="chip" aria-pressed={tag === t} onClick={() => setTag(tag === t ? '' : t)}>{t}</button>)}
        </div>
      </div>
      <p className="help" style={{ margin: '16px 0 0' }} role="status" aria-live="polite">{list.length} {list.length === 1 ? 'article' : 'articles'} shown{(q || cat || tag) && <> . <button className="linkbtn" type="button" onClick={() => { setQ(''); setCat(''); setTag(''); }}>Clear all</button></>}</p>
      <div className="rgrid">
        {list.map((a) => (
          <Link key={a.slug} className="rc rv" href={`/resources/${a.slug}/`}>
            <div className="rph"><Img name={a.img} alt="" sizes="(min-width:820px) 33vw, 92vw" style={a.imgPos ? { objectPosition: a.imgPos } : undefined} /></div>
            <span className="tag">{a.category}</span><h3>{a.title}</h3>
            <p style={{ margin: '0 18px', fontSize: 15 }}>{a.summary}</p>
            <p className="help" style={{ margin: '0 18px' }}>{a.author} &middot; {readMins(a)} min read</p>
            <span className="more">Read article <Arrow /></span>
          </Link>
        ))}
      </div>
      {list.length === 0 && <div className="card cr" style={{ marginTop: 16 }}><Icon n="search" size={24} /><p>No articles match your search. Try a shorter word, or clear the filters.</p></div>}
    </div>
  );
}
