'use client';
import Link from 'next/link';
import { useState } from 'react';
import { DEPTS, SITE, WINDOWS, docsOf } from '@/data/site';
import { requestsRepo, useRequests, analytics } from '@/lib/repos';
import { bookableDates, openSlots } from '@/lib/availability';
import type { AppointmentRequest } from '@/lib/types';
import { Icon } from './Sprite';
import { Img } from './Img';

/** Home form: a quick request. The system picks the soonest open time in the chosen window; staff confirm. */
export function QuickRequest() {
  const reqs = useRequests();
  const [dept, setDept] = useState(DEPTS[0].slug);
  const [win, setWin] = useState<string>(WINDOWS[0]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState<{ n?: boolean; p?: boolean }>({});
  const [done, setDone] = useState<AppointmentRequest | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const bad = { n: !name.trim(), p: phone.replace(/\D/g, '').length < 10 };
    setErr(bad);
    if (bad.n) return document.getElementById('qn')?.focus();
    if (bad.p) return document.getElementById('qp')?.focus();
    const all = reqs ?? [];
    let pick: { date: string; time: string } | null = null;
    for (const d of bookableDates(28)) {
      const s = openSlots(dept, 'first', d, all);
      const m = s.find((x) => x.window === win) ?? null;
      if (m) { pick = { date: d, time: m.time }; break; }
    }
    if (!pick) for (const d of bookableDates(28)) { const s = openSlots(dept, 'first', d, all)[0]; if (s) { pick = { date: d, time: s.time }; break; } }
    const parts = name.trim().split(/\s+/);
    analytics.track('request_started', { dept, source: 'home' });
    const rec = requestsRepo.create({
      dept, reason: 'Other scheduling request', days: [], windows: [win], doctor: 'first', date: pick?.date ?? bookableDates(1)[0], time: pick?.time ?? '09:00',
      firstName: parts[0], lastName: parts.slice(1).join(' ') || parts[0], phone: phone.trim(), email: '', contactPref: 'Phone', newPatient: false,
    });
    setDone(rec);
    void docsOf;
  };

  return (
    <div className="duo">
      {!done ? (
        <>
          <form className="form-card" onSubmit={submit} noValidate aria-label="Quick appointment request form">
            <div className="field"><label htmlFor="qd">Department</label><select id="qd" value={dept} onChange={(e) => setDept(e.target.value)}>{DEPTS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></div>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 18px' }}><legend style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>Preferred time</legend>
              <div className="slots">{WINDOWS.map((w) => <label className="slot" key={w}><input type="radio" name="qt" checked={win === w} onChange={() => setWin(w)} /><span>{w}</span></label>)}</div></fieldset>
            <div className={`field${err.n ? ' err' : ''}`}><label htmlFor="qn">Full name</label><input id="qn" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!err.n} aria-describedby="qne" />
              {err.n && <span className="msg" id="qne" role="alert"><Icon n="alert" />Please enter your name so we know who to call.</span>}</div>
            <div className={`field${err.p ? ' err' : ''}`}><label htmlFor="qp">Phone number</label><input id="qp" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!err.p} aria-describedby="qpe" />
              {err.p && <span className="msg" id="qpe" role="alert"><Icon n="alert" />Please enter a phone number we can reach you on.</span>}</div>
            <button className="btn" type="submit">Send request <Icon n="arrow" /></button>
            <p className="note" style={{ marginTop: 14 }}><b>{SITE.formNote}</b> We never ask for symptoms or medical history here.</p>
            <p className="note" style={{ marginTop: 8 }}>Want to pick a doctor and an exact time? <Link href="/appointments/" className="tlink">Use the full request flow</Link>.</p>
          </form>
          <figure className="side" id="side"><Img name="hero-consultation" alt="A doctor and a patient laughing together in a bright exam room" sizes="(min-width:820px) 40vw, 0px" /><figcaption><b>Let&apos;s find a time that works for you.</b><span>Our staff will confirm your request by phone.</span></figcaption></figure>
        </>
      ) : (
        <div className="okbox" role="status" tabIndex={-1} ref={(el) => el?.focus()} style={{ alignSelf: 'start', gridColumn: '1/-1' }}>
          <div className="tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div><h3 style={{ fontSize: 22 }}>We received your request</h3>
            <p>Your reference is <b>{done.ref}</b>. Our team will contact you to confirm a time. A request is not a confirmed appointment.</p>
            <p style={{ marginTop: 8 }}><Link className="tlink" href="/appointments/manage/">Check your request</Link> with your reference and last name.</p></div>
        </div>
      )}
    </div>
  );
}
