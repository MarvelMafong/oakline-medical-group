'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE, deptBySlug, docBySlug } from '@/data/site';
import { requestsRepo, useRequests } from '@/lib/repos';
import { fmtDate, fmtTime } from '@/lib/availability';
import { downloadIcs } from '@/lib/ics';
import { Icon } from './Sprite';
import { SlotPicker } from './SlotPicker';

/** Look up a request by reference and last name, then view status, reschedule or cancel. */
export function ManageRequest() {
  const reqs = useRequests();
  const [ref, setRef] = useState('');
  const [last, setLast] = useState('');
  const [id, setId] = useState<string | null>(null);
  const [err, setErr] = useState('');
  const [mode, setMode] = useState<'view' | 'resched' | 'cancel'>('view');
  const [nd, setNd] = useState({ date: '', time: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => { const q = new URLSearchParams(window.location.search).get('ref'); if (q) setRef(q); }, []);
  if (reqs === null) return <div className="form-card" aria-busy="true"><p>Loading...</p></div>;
  const rec = id ? reqs.find((r) => r.id === id) : undefined;

  const find = (e: React.FormEvent) => {
    e.preventDefault(); setMsg('');
    if (!ref.trim() || !last.trim()) { setErr('Please enter both your reference and your last name.'); return; }
    const r = requestsRepo.find(ref, last);
    if (!r) { setErr('We could not find a request with that reference and last name. Check for typing mistakes, or call the front desk.'); setId(null); return; }
    setErr(''); setId(r.id); setMode('view');
  };

  return (
    <div className="flowgrid">
      <div>
        <form className="form-card" onSubmit={find} noValidate aria-label="Find a request">
          <div className={`field${err ? ' err' : ''}`}><label htmlFor="m-ref">Request reference</label><input id="m-ref" value={ref} onChange={(e) => setRef(e.target.value)} placeholder="OAK-XXXXXX" autoCapitalize="characters" aria-describedby={err ? 'm-err' : undefined} aria-invalid={!!err} /></div>
          <div className={`field${err ? ' err' : ''}`}><label htmlFor="m-last">Last name</label><input id="m-last" value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" aria-invalid={!!err} /></div>
          {err && <p className="msg" id="m-err" role="alert" style={{ marginBottom: 12 }}><Icon n="alert" />{err}</p>}
          <button className="btn" type="submit">Find my request <Icon n="search" /></button>
          <p className="note" style={{ marginTop: 14 }}><b>{SITE.formNote}</b></p>
        </form>
      </div>
      <div>
        {msg && <div className="okbox" role="status" style={{ marginBottom: 14 }}><p>{msg}</p></div>}
        {rec ? (
          <div className="card" aria-live="polite">
            <p><span className={`statusbadge st-${rec.status}`}>{rec.status}</span></p>
            <h2 style={{ fontSize: 26, margin: '8px 0 4px' }}>{deptBySlug(rec.dept)?.name}</h2>
            <p className="help">Reference {rec.ref}</p>
            <ul className="sum" style={{ marginTop: 8 }}>
              <li><span className="k">Doctor</span><span>{rec.doctor === 'first' ? 'First available' : docBySlug(rec.doctor)?.name}</span><span /></li>
              <li><span className="k">Time</span><span>{fmtDate(rec.date)} at {fmtTime(rec.time)}</span><span /></li>
              <li><span className="k">Name</span><span>{rec.firstName} {rec.lastName}</span><span /></li>
              <li><span className="k">Contact</span><span>{rec.phone}</span><span /></li>
            </ul>
            <p className="note" style={{ marginTop: 10 }}>{rec.status === 'Confirmed' ? 'Our staff confirmed this time. See you then.' : rec.status === 'Requested' ? 'Our staff have not confirmed this yet. A request is not a confirmed appointment.' : rec.status === 'Rescheduled' ? 'Your time was changed. Our staff will contact you to confirm.' : rec.status === 'Cancelled' ? 'This request is cancelled.' : 'This visit is complete.'}</p>
            <h3 style={{ fontSize: 18, marginTop: 14 }}>History</h3>
            <ul className="hist">{rec.history.slice().reverse().map((h, i) => <li key={i}>{new Date(h.at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}: {h.text}</li>)}</ul>
            {mode === 'view' && !['Cancelled', 'Completed'].includes(rec.status) && (
              <div className="btnrow">
                <button className="btn sm" type="button" onClick={() => downloadIcs(rec)}><Icon n="calplus" />Add to calendar</button>
                <button className="btn sm ghost" type="button" onClick={() => { setMode('resched'); setNd({ date: '', time: '' }); }}>Reschedule</button>
                <button className="btn sm ghost" type="button" onClick={() => setMode('cancel')}>Cancel request</button>
              </div>
            )}
            {mode === 'cancel' && (
              <div className="okbox" style={{ marginTop: 14 }} role="alertdialog" aria-label="Confirm cancel"><div><p><b>Cancel this request?</b> This frees the time for someone else.</p>
                <div className="btnrow"><button className="btn sm dark" type="button" onClick={() => { requestsRepo.update(rec.id, { status: 'Cancelled' }, 'Cancelled by patient', 'patient'); setMode('view'); setMsg('Your request was cancelled. You can send a new one any time.'); }}>Yes, cancel it</button><button className="btn sm ghost" type="button" onClick={() => setMode('view')}>Keep it</button></div></div></div>
            )}
            {mode === 'resched' && (
              <div style={{ marginTop: 14 }}>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>Choose a new time</h3>
                <SlotPicker dept={rec.dept} doctor={rec.doctor} date={nd.date} time={nd.time} reqs={reqs} ignoreRef={rec.ref} onChange={(date, time) => setNd({ date, time })} />
                <div className="btnrow">
                  <button className="btn sm" type="button" disabled={!nd.date || !nd.time} onClick={() => { requestsRepo.update(rec.id, { date: nd.date, time: nd.time, status: 'Rescheduled' }, `Patient asked to move to ${fmtDate(nd.date)} at ${fmtTime(nd.time)}`, 'patient'); setMode('view'); setMsg('Your new time was sent. Staff will contact you to confirm it.'); }}>Send new time</button>
                  <button className="btn sm ghost" type="button" onClick={() => setMode('view')}>Back</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="card cr"><h3>Where is my reference?</h3><p>It was shown when you sent your request, and it looks like OAK-7K3M9P. Cannot find it? Call <a href={`tel:${SITE.tel}`}>{SITE.phone}</a> and our front desk will help.</p>
            <p style={{ marginTop: 10 }}>No request yet? <Link className="tlink" href="/appointments/">Request an appointment</Link>.</p></div>
        )}
      </div>
    </div>
  );
}
