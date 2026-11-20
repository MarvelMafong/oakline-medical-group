'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DAYS, DEPTS, DOCS, REASONS, SITE, WINDOWS, WINDOW_HOURS, deptBySlug, docBySlug, docsOf } from '@/data/site';
import { analytics, draftStore, requestsRepo, useDraft, useRequests } from '@/lib/repos';
import { fmtDate, fmtTime } from '@/lib/availability';
import { downloadIcs } from '@/lib/ics';
import type { AppointmentRequest } from '@/lib/types';
import { Icon } from './Sprite';
import { Img } from './Img';
import { SlotPicker } from './SlotPicker';

type Data = {
  dept: string; reason: string; days: string[]; windows: string[]; doctor: string; date: string; time: string;
  firstName: string; lastName: string; phone: string; email: string; contactPref: 'Phone' | 'Text' | 'Email'; newPatient: boolean; understand: boolean;
};
const EMPTY: Data = { dept: '', reason: '', days: [], windows: [], doctor: 'first', date: '', time: '', firstName: '', lastName: '', phone: '', email: '', contactPref: 'Phone', newPatient: true, understand: false };
const STEPS = ['Department', 'Days and times', 'Doctor', 'Date and time', 'Your details', 'Review'];

export function AppointmentFlow() {
  const reqs = useRequests();
  const draft = useDraft();
  const [d, setD] = useState<Data>(EMPTY);
  const [step, setStep] = useState(0);
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [done, setDone] = useState<AppointmentRequest | null>(null);
  const [notice, setNotice] = useState('');
  const [ready, setReady] = useState(false);
  const head = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);

  // Prefill from the query string (department and doctor links) or restore a saved draft.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const dept = q.get('dept'); const doc = q.get('doctor');
    const saved = draftStore.get();
    if (dept || doc) {
      const dp = doc ? docBySlug(doc)?.dept ?? dept ?? '' : dept ?? '';
      if (deptBySlug(dp)) { setD({ ...EMPTY, dept: dp, doctor: doc && docBySlug(doc) ? doc : 'first' }); setStep(doc ? 1 : 0); }
    } else if (saved) {
      setD({ ...EMPTY, ...(saved.data as Partial<Data>) }); setStep(saved.step);
      setNotice('We restored your saved request. You can pick up where you left off, or start over.');
    }
    setReady(true);
  }, []);

  // Auto-save progress (save and resume). Nothing is sent anywhere.
  useEffect(() => {
    if (!ready || done) return;
    if (d.dept || d.firstName) draftStore.set({ step, data: d as unknown as Record<string, unknown>, savedAt: new Date().toISOString() });
    if (d.dept && !started.current) { started.current = true; analytics.track('request_started', { dept: d.dept, source: 'flow' }); }
  }, [d, step, ready, done]);

  useEffect(() => { if (ready) head.current?.focus({ preventScroll: false }); }, [step, done, ready]);

  const set = useCallback(<K extends keyof Data>(k: K, v: Data[K]) => setD((p) => ({ ...p, [k]: v })), []);
  const toggle = (k: 'days' | 'windows', v: string) => setD((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) { if (!d.dept) e.dept = 'Please choose a department.'; if (!d.reason) e.reason = 'Please choose a reason for the visit.'; }
    if (s === 1 && !d.days.length && !d.windows.length) e.days = 'Pick at least one day or time of day, or choose "Any day" and "Any time" below.';
    if (s === 3) { if (!d.date) e.date = 'Please choose a date.'; else if (!d.time) e.date = 'Please choose a time.'; }
    if (s === 4) {
      if (!d.firstName.trim()) e.firstName = 'Please enter your first name.';
      if (!d.lastName.trim()) e.lastName = 'Please enter your last name.';
      if (d.phone.replace(/\D/g, '').length < 10) e.phone = 'Please enter a phone number with area code.';
      if (d.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = 'That email address does not look right.';
    }
    if (s === 5 && !d.understand) e.understand = 'Please confirm you understand a request is not a confirmed appointment.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };
  const focusErr = (e: Record<string, string>) => { const k = Object.keys(e)[0]; setTimeout(() => (document.getElementById(`f-${k}`) ?? document.querySelector('[role=alert]'))?.scrollIntoView({ block: 'center' }), 0); };
  const next = () => {
    if (!validate(step)) { setTimeout(() => (document.querySelector('[data-err]') as HTMLElement | null)?.focus(), 0); return; }
    analytics.track('step_completed', { step: step + 1 });
    setStep(step + 1);
  };
  const back = () => { setErrs({}); setStep(Math.max(0, step - 1)); };
  const submit = () => {
    if (!validate(5)) return;
    const rec = requestsRepo.create({
      dept: d.dept, reason: d.reason, days: d.days, windows: d.windows, doctor: d.doctor, date: d.date, time: d.time,
      firstName: d.firstName.trim(), lastName: d.lastName.trim(), phone: d.phone.trim(), email: d.email.trim(), contactPref: d.contactPref, newPatient: d.newPatient,
    });
    draftStore.set(null);
    setDone(rec);
  };
  const reset = () => { draftStore.set(null); setD(EMPTY); setStep(0); setErrs({}); setNotice(''); setDone(null); started.current = false; };
  const saveLater = () => setNotice('Saved on this device. Come back to this page any time to continue. Nothing has been sent.');

  if (!ready || reqs === null || draft === undefined) return <div className="form-card" aria-busy="true"><p>Loading the request form...</p></div>;

  if (done) {
    const dept = deptBySlug(done.dept)!;
    return (
      <div className="flowgrid">
        <div className="okbox" role="status" style={{ alignItems: 'flex-start' }}>
          <div className="tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
          <div>
            <h2 ref={head} tabIndex={-1} style={{ fontSize: 28 }}>We received your request</h2>
            <p>Your request reference is</p>
            <p><span className="refbox" aria-label={`Reference ${done.ref.split('').join(' ')}`}>{done.ref}</span></p>
            <p style={{ marginTop: 12 }}>Status: <span className={`statusbadge st-${done.status}`}>{done.status}</span></p>
            <p style={{ marginTop: 8 }}>Our staff will contact you by {done.contactPref.toLowerCase()} to confirm. <b>A request is not a confirmed appointment.</b> Keep this reference and your last name to check, change or cancel your request.</p>
            <div className="btnrow">
              <button className="btn" type="button" onClick={() => downloadIcs(done)}><Icon n="calplus" />Add to calendar</button>
              <Link className="btn ghost" href="/appointments/manage/">Check this request</Link>
              <button className="btn ghost" type="button" onClick={reset}>Request another</button>
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Your request</h3>
          <ul className="sum">
            <li><span className="k">Department</span><span>{dept.name}</span><span /></li>
            <li><span className="k">Doctor</span><span>{done.doctor === 'first' ? 'First available' : docBySlug(done.doctor)?.name}</span><span /></li>
            <li><span className="k">Requested time</span><span>{fmtDate(done.date)} at {fmtTime(done.time)}</span><span /></li>
            <li><span className="k">Name</span><span>{done.firstName} {done.lastName}</span><span /></li>
          </ul>
          <p className="note" style={{ marginTop: 10 }}>{SITE.formNote}</p>
        </div>
      </div>
    );
  }

  const dept = deptBySlug(d.dept);
  const docs = d.dept ? docsOf(d.dept) : [];
  const E = ({ k }: { k: string }) => errs[k] ? <span className="msg" id={`e-${k}`} role="alert"><Icon n="alert" />{errs[k]}</span> : null;
  const inv = (k: string) => ({ 'aria-invalid': !!errs[k], 'aria-describedby': errs[k] ? `e-${k}` : undefined, 'data-err': errs[k] ? true : undefined } as const);

  return (
    <div>
      <ol className="prog" aria-label="Progress">
        {STEPS.map((s, i) => <li key={s} className={i < step ? 'done' : i === step ? 'cur' : ''} aria-current={i === step ? 'step' : undefined}><span /><small><span className="sr">Step {i + 1}: </span>{s}</small></li>)}
      </ol>
      {notice && <div className="okbox" role="status" style={{ marginBottom: 14 }}><div><p>{notice}</p>{draftStore.get() && <button className="linkbtn" type="button" onClick={reset}>Start over</button>}</div></div>}
      <div className="flowgrid">
        <form className="form-card" noValidate aria-label="Appointment request" onSubmit={(e) => { e.preventDefault(); step === 5 ? submit() : next(); }}>
          <h2 ref={head} tabIndex={-1} style={{ fontSize: 26, marginBottom: 4 }}>{['Which department?', 'When suits you?', 'Choose a doctor', 'Pick a date and time', 'Your details', 'Review your request'][step]}</h2>
          <p className="help" style={{ marginBottom: 16 }}>Step {step + 1} of {STEPS.length}. We never ask about symptoms or medical history.</p>

          {step === 0 && (<>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 16px' }}><legend className="sr">Department</legend>
              <div className="choice" id="f-dept">{DEPTS.map((x) => (
                <label className="opt" key={x.slug}><input type="radio" name="dept" value={x.slug} checked={d.dept === x.slug} onChange={() => setD((p) => ({ ...p, dept: x.slug, doctor: 'first', date: '', time: '' }))} {...inv('dept')} />
                  <span className="mini"><Img name={x.img} alt="" sizes="48px" /></span><span><b>{x.name}</b><small>{x.short}</small></span></label>
              ))}</div><E k="dept" /></fieldset>
            <div className={`field${errs.reason ? ' err' : ''}`}><label htmlFor="f-reason">What is the visit for?</label>
              <select id="f-reason" value={d.reason} onChange={(e) => set('reason', e.target.value)} {...inv('reason')}><option value="">Choose a category</option>{REASONS.map((r) => <option key={r}>{r}</option>)}</select>
              <span className="help">Pick a category only. Please do not enter symptoms or health details.</span><E k="reason" /></div>
          </>)}

          {step === 1 && (<>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 16px' }} id="f-days"><legend style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>Preferred days</legend>
              <div className="slots">{DAYS.map((x) => <label className="slot" key={x}><input type="checkbox" checked={d.days.includes(x)} onChange={() => toggle('days', x)} /><span>{x}</span></label>)}
                <label className="slot"><input type="checkbox" checked={d.days.length === DAYS.length} onChange={() => set('days', d.days.length === DAYS.length ? [] : [...DAYS])} /><span>Any day</span></label></div></fieldset>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 8px' }}><legend style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>Preferred time of day</legend>
              <div className="slots">{WINDOWS.map((x) => <label className="slot" key={x}><input type="checkbox" checked={d.windows.includes(x)} onChange={() => toggle('windows', x)} /><span>{x} <small style={{ marginLeft: 6, fontWeight: 400 }}>{WINDOW_HOURS[x]}</small></span></label>)}
                <label className="slot"><input type="checkbox" checked={d.windows.length === WINDOWS.length} onChange={() => set('windows', d.windows.length === WINDOWS.length ? [] : [...WINDOWS])} /><span>Any time</span></label></div></fieldset>
            <E k="days" />
            <p className="help">These help our staff match you. You will pick an exact time in step 4.</p>
          </>)}

          {step === 2 && (
            <fieldset style={{ border: 0, padding: 0 }}><legend className="sr">Doctor</legend>
              <div className="choice">
                <label className="opt"><input type="radio" name="doc" checked={d.doctor === 'first'} onChange={() => setD((p) => ({ ...p, doctor: 'first', date: '', time: '' }))} /><span className="mini" style={{ display: 'grid', placeItems: 'center', background: 'var(--cream)', color: 'var(--cobalt)' }}><Icon n="user" size={26} /></span><span><b>First available</b><small>The soonest time with any {dept?.name} doctor</small></span></label>
                {docs.map((x) => (
                  <label className="opt" key={x.slug}><input type="radio" name="doc" checked={d.doctor === x.slug} onChange={() => setD((p) => ({ ...p, doctor: x.slug, date: '', time: '' }))} /><span className="mini"><Img name={x.img} alt="" sizes="48px" /></span><span><b>{x.name}</b><small>{x.role}{x.accepting ? '' : ', not accepting new patients'}</small></span></label>
                ))}
              </div></fieldset>
          )}

          {step === 3 && d.dept && (<>
            <p className="help" style={{ marginBottom: 10 }}>Weekdays in the next four weeks. Days you prefer are marked in cream. Times shown are open now. Your request holds the time until staff confirm.</p>
            <SlotPicker dept={d.dept} doctor={d.doctor} date={d.date} time={d.time} days={d.days} windows={d.windows} reqs={reqs} onChange={(date, time) => setD((p) => ({ ...p, date, time }))} />
            <div style={{ marginTop: 8 }}><E k="date" /></div>
          </>)}

          {step === 4 && (<>
            <div className="grid2">
              <div className={`field${errs.firstName ? ' err' : ''}`}><label htmlFor="f-firstName">First name</label><input id="f-firstName" autoComplete="given-name" value={d.firstName} onChange={(e) => set('firstName', e.target.value)} {...inv('firstName')} /><E k="firstName" /></div>
              <div className={`field${errs.lastName ? ' err' : ''}`}><label htmlFor="f-lastName">Last name</label><input id="f-lastName" autoComplete="family-name" value={d.lastName} onChange={(e) => set('lastName', e.target.value)} {...inv('lastName')} /><E k="lastName" /></div>
            </div>
            <div className={`field${errs.phone ? ' err' : ''}`}><label htmlFor="f-phone">Phone number</label><input id="f-phone" type="tel" autoComplete="tel" inputMode="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} {...inv('phone')} /><E k="phone" /></div>
            <div className={`field${errs.email ? ' err' : ''}`}><label htmlFor="f-email">Email <span className="opt">(optional)</span></label><input id="f-email" type="email" autoComplete="email" value={d.email} onChange={(e) => set('email', e.target.value)} {...inv('email')} /><E k="email" /></div>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 14px' }}><legend style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>How should we reach you?</legend>
              <div className="slots">{(['Phone', 'Text', 'Email'] as const).map((x) => <label className="slot" key={x}><input type="radio" name="cp" checked={d.contactPref === x} onChange={() => set('contactPref', x)} /><span>{x}</span></label>)}</div></fieldset>
            <fieldset style={{ border: 0, padding: 0 }}><legend style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>Have you visited Oakline before?</legend>
              <div className="slots"><label className="slot"><input type="radio" name="np" checked={d.newPatient} onChange={() => set('newPatient', true)} /><span>No, I am new</span></label><label className="slot"><input type="radio" name="np" checked={!d.newPatient} onChange={() => set('newPatient', false)} /><span>Yes</span></label></div></fieldset>
          </>)}

          {step === 5 && (<>
            <ul className="sum">
              <li><span className="k">Department</span><span>{dept?.name}</span><button className="linkbtn" type="button" onClick={() => setStep(0)}>Change</button></li>
              <li><span className="k">Reason</span><span>{d.reason}</span><button className="linkbtn" type="button" onClick={() => setStep(0)}>Change</button></li>
              <li><span className="k">Preferences</span><span>{[d.days.length ? d.days.join(', ') : 'Any day', d.windows.length ? d.windows.join(', ') : 'any time'].join(' / ')}</span><button className="linkbtn" type="button" onClick={() => setStep(1)}>Change</button></li>
              <li><span className="k">Doctor</span><span>{d.doctor === 'first' ? 'First available' : docBySlug(d.doctor)?.name}</span><button className="linkbtn" type="button" onClick={() => setStep(2)}>Change</button></li>
              <li><span className="k">Requested time</span><span>{d.date && fmtDate(d.date)} at {d.time && fmtTime(d.time)}</span><button className="linkbtn" type="button" onClick={() => setStep(3)}>Change</button></li>
              <li><span className="k">Name</span><span>{d.firstName} {d.lastName}</span><button className="linkbtn" type="button" onClick={() => setStep(4)}>Change</button></li>
              <li><span className="k">Contact</span><span>{d.phone}{d.email ? `, ${d.email}` : ''} ({d.contactPref})</span><button className="linkbtn" type="button" onClick={() => setStep(4)}>Change</button></li>
            </ul>
            <label className="check" htmlFor="f-understand"><input id="f-understand" type="checkbox" checked={d.understand} onChange={(e) => set('understand', e.target.checked)} {...inv('understand')} /><span>I understand this is a request. Staff will contact me to confirm, and it is not a confirmed appointment.</span></label>
            <E k="understand" />
          </>)}

          <div className="btnrow" style={{ marginTop: 20 }}>
            {step > 0 && <button type="button" className="btn ghost" onClick={back}>Back</button>}
            <button type="submit" className="btn">{step === 5 ? 'Send request' : 'Next'} <Icon n="arrow" /></button>
            <button type="button" className="linkbtn" onClick={saveLater}>Save and finish later</button>
          </div>
          <p className="note" style={{ marginTop: 14 }}><b>{SITE.formNote}</b></p>
        </form>
        <aside className="card cr" aria-label="Your selections so far">
          <h3 style={{ fontSize: 20 }}>{dept ? dept.name : 'Your request'}</h3>
          <p className="help" style={{ marginBottom: 8 }}>{dept ? dept.short : 'Choose a department to begin.'}</p>
          {dept && <p style={{ marginBottom: 6 }}>Doctor: <b>{d.doctor === 'first' ? 'First available' : docBySlug(d.doctor)?.name}</b></p>}
          {d.date && d.time && <p>Time: <b>{fmtDate(d.date)}, {fmtTime(d.time)}</b></p>}
          <p className="note" style={{ marginTop: 12 }}>Need to speak to a person? Call <a href={`tel:${SITE.tel}`}>{SITE.phone}</a>.</p>
          <p className="note" style={{ marginTop: 8 }}>{DOCS.length} doctors across six departments. Staff confirm every request.</p>
        </aside>
      </div>
    </div>
  );
}
