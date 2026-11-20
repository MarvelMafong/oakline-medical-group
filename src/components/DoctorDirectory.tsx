'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DEPTS, DOCS, deptBySlug } from '@/data/site';
import { useRequests } from '@/lib/repos';
import { openThisWeek } from '@/lib/availability';
import { Img } from './Img';

const LANGS = [...new Set(DOCS.flatMap((d) => d.languages))].sort();

/** Filters are client state only. They never create crawlable URLs, so there is nothing to index. */
export function DoctorDirectory() {
  const reqs = useRequests();
  const [dept, setDept] = useState('');
  const [lang, setLang] = useState('');
  const [avail, setAvail] = useState('');
  const list = useMemo(() => DOCS.filter((d) => (!dept || d.dept === dept) && (!lang || d.languages.includes(lang)) &&
    (!avail || (avail === 'new' ? d.accepting : reqs ? openThisWeek(d.slug, reqs) : true))), [dept, lang, avail, reqs]);
  return (
    <div>
      <div className="filters" role="search" aria-label="Filter doctors">
        <div className="field" style={{ margin: 0 }}><label htmlFor="fd">Department</label><select id="fd" value={dept} onChange={(e) => setDept(e.target.value)}><option value="">All departments</option>{DEPTS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></div>
        <div className="field" style={{ margin: 0 }}><label htmlFor="fl">Language</label><select id="fl" value={lang} onChange={(e) => setLang(e.target.value)}><option value="">Any language</option>{LANGS.map((l) => <option key={l}>{l}</option>)}</select></div>
        <div className="field" style={{ margin: 0 }}><label htmlFor="fa">Availability</label><select id="fa" value={avail} onChange={(e) => setAvail(e.target.value)}><option value="">Any</option><option value="new">Accepting new patients</option><option value="week">Open times in the next 7 days</option></select></div>
        <button type="button" className="btn ghost sm" onClick={() => { setDept(''); setLang(''); setAvail(''); }}>Clear filters</button>
      </div>
      <p className="help" style={{ margin: '14px 0 0' }} role="status" aria-live="polite">{list.length} {list.length === 1 ? 'doctor' : 'doctors'} shown</p>
      <div className="dgrid">
        {list.map((d) => (
          <Link key={d.slug} className="dcard rv" href={`/doctors/${d.slug}/`}>
            <div className="pimg"><Img name={d.img} alt={`Portrait of ${d.name}`} sizes="(min-width:900px) 30vw, 92vw" style={d.imgPos ? { objectPosition: d.imgPos } : undefined} /></div>
            <h3>{d.name}</h3>
            <p>{deptBySlug(d.dept)?.name} &middot; {d.role}</p>
            <div className="tags"><span className="tagpill">{d.languages.join(', ')}</span><span className="tagpill">{d.accepting ? 'Accepting new patients' : 'Existing patients'}</span></div>
          </Link>
        ))}
      </div>
      {list.length === 0 && <div className="card cr" style={{ marginTop: 16 }}><p>No doctors match those filters. Try clearing one.</p></div>}
    </div>
  );
}
