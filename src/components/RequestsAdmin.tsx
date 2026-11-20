'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DEPTS, STATUSES, deptBySlug, docBySlug, type Status } from '@/data/site';
import { requestsRepo, useRequests } from '@/lib/repos';
import { fmtDate, fmtTime } from '@/lib/availability';
import { csvEscape, downloadText } from '@/lib/ics';
import type { AppointmentRequest } from '@/lib/types';
import { Icon } from './Sprite';

type SortKey = 'createdAt' | 'name' | 'dept' | 'when' | 'status';
const DAY = 86400000;
export const needsFollowUp = (r: AppointmentRequest) => r.status === 'Requested' && Date.now() - new Date(r.createdAt).getTime() > 2 * DAY;

export function RequestsAdmin() {
  const reqs = useRequests();
  const [q, setQ] = useState('');
  const [st, setSt] = useState('');
  const [dp, setDp] = useState('');
  const [view, setView] = useState('');
  const [sort, setSort] = useState<{ k: SortKey; dir: 1 | -1 }>({ k: 'createdAt', dir: -1 });
  const [sel, setSel] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [bulk, setBulk] = useState<Status>('Confirmed');
  const [flash, setFlash] = useState('');
  const close = useCallback(() => setOpen(null), []);
  useEffect(() => { if (new URLSearchParams(window.location.search).get('view') === 'followup') setView('followup'); }, []);

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    const out = (reqs ?? []).filter((r) => (!st || r.status === st) && (!dp || r.dept === dp) && (view !== 'followup' || needsFollowUp(r)) &&
      (!s || `${r.ref} ${r.firstName} ${r.lastName} ${r.phone} ${r.email} ${deptBySlug(r.dept)?.name}`.toLowerCase().includes(s)));
    const val = (r: AppointmentRequest) => sort.k === 'name' ? `${r.lastName} ${r.firstName}` : sort.k === 'dept' ? r.dept : sort.k === 'when' ? r.date + r.time : sort.k === 'status' ? r.status : r.createdAt;
    return out.sort((a, b) => (val(a) < val(b) ? -1 : val(a) > val(b) ? 1 : 0) * sort.dir);
  }, [reqs, q, st, dp, view, sort]);

  if (reqs === null) return <div className="sk" aria-busy="true">Loading requests...</div>;
  const cur = open ? reqs.find((r) => r.id === open) : undefined;
  const allSel = rows.length > 0 && rows.every((r) => sel.includes(r.id));
  const th = (k: SortKey, label: string) => (
    <th scope="col" aria-sort={sort.k === k ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button type="button" onClick={() => setSort((p) => ({ k, dir: p.k === k ? (p.dir === 1 ? -1 : 1) : 1 }))}>{label}<span aria-hidden="true">{sort.k === k ? (sort.dir === 1 ? '▲' : '▼') : ''}</span></button>
    </th>
  );
  const exportCsv = () => {
    const head = ['Reference', 'Status', 'Created', 'First name', 'Last name', 'Phone', 'Email', 'Department', 'Doctor', 'Date', 'Time', 'Reason', 'Contact preference', 'Notes'];
    const lines = [head.join(',')].concat(rows.map((r) => [r.ref, r.status, r.createdAt, r.firstName, r.lastName, r.phone, r.email, deptBySlug(r.dept)?.name ?? '', r.doctor === 'first' ? 'First available' : docBySlug(r.doctor)?.name ?? '', r.date, r.time, r.reason, r.contactPref, r.notes].map((v) => csvEscape(String(v))).join(',')));
    downloadText(`oakline-requests-${new Date().toISOString().slice(0, 10)}.csv`, lines.join('\n'));
    setFlash(`Exported ${rows.length} requests to CSV.`);
  };
  const followCount = reqs.filter(needsFollowUp).length;

  return (
    <div>
      <h1>Appointment requests</h1>
      <p className="help">{reqs.length} total. Changes here show instantly on the patient status lookup.</p>
      <div className="btnrow" style={{ marginTop: 10 }}>
        <button type="button" className="chip" aria-pressed={view === 'followup'} onClick={() => setView(view === 'followup' ? '' : 'followup')}>Needs follow-up ({followCount})</button>
        <button type="button" className="btn sm ghost" onClick={exportCsv}><Icon n="download" />Export CSV</button>
      </div>
      {view === 'followup' && <p className="note" style={{ marginTop: 8 }}>Requests still in Requested status for more than 48 hours. Reach out, then confirm or cancel them.</p>}
      <div className="toolbar2" role="search" aria-label="Filter requests">
        <div className="field" style={{ margin: 0 }}><label htmlFor="rq">Search</label><input id="rq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, reference, phone" /></div>
        <div className="field" style={{ margin: 0 }}><label htmlFor="rst">Status</label><select id="rst" value={st} onChange={(e) => setSt(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
        <div className="field" style={{ margin: 0 }}><label htmlFor="rdp">Department</label><select id="rdp" value={dp} onChange={(e) => setDp(e.target.value)}><option value="">All departments</option>{DEPTS.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}</select></div>
        <div className="field" style={{ margin: 0 }}><label htmlFor="rvw">View</label><select id="rvw" value={view} onChange={(e) => setView(e.target.value)}><option value="">All requests</option><option value="followup">Needs follow-up</option></select></div>
        <button type="button" className="btn sm ghost" onClick={() => { setQ(''); setSt(''); setDp(''); setView(''); }}>Clear</button>
      </div>
      <div role="status" aria-live="polite" className="help" style={{ minHeight: 22 }}>{flash || `${rows.length} shown`}</div>
      {sel.length > 0 && (
        <div className="bulk" role="region" aria-label="Bulk actions">
          <b>{sel.length} selected</b>
          <label className="sr" htmlFor="bs">Set status to</label>
          <select id="bs" value={bulk} onChange={(e) => setBulk(e.target.value as Status)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
          <button type="button" className="btn sm warm" onClick={() => { requestsRepo.bulkStatus(sel, bulk); setFlash(`${sel.length} requests set to ${bulk}.`); setSel([]); }}>Apply</button>
          <button type="button" className="btn sm" onClick={() => { requestsRepo.bulkStatus(sel, 'Confirmed'); setFlash(`${sel.length} requests confirmed.`); setSel([]); }}>Confirm all</button>
          <button type="button" className="linkbtn" style={{ color: '#fff' }} onClick={() => setSel([])}>Clear selection</button>
        </div>
      )}
      <div className="tblwrap" tabIndex={0} role="region" aria-label="Requests table. Scroll sideways on small screens.">
        <table className="tbl">
          <caption className="sr">Appointment requests</caption>
          <thead><tr>
            <th scope="col" style={{ width: 44, padding: '0 12px' }}><input type="checkbox" aria-label="Select all shown" checked={allSel} onChange={() => setSel(allSel ? [] : rows.map((r) => r.id))} /></th>
            {th('createdAt', 'Received')}{th('name', 'Patient')}{th('dept', 'Department')}{th('when', 'Requested time')}{th('status', 'Status')}<th scope="col"><span style={{ padding: '0 12px' }}>Open</span></th>
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={sel.includes(r.id) ? 'sel' : ''}>
                <td><input type="checkbox" aria-label={`Select ${r.firstName} ${r.lastName}`} checked={sel.includes(r.id)} onChange={() => setSel(sel.includes(r.id) ? sel.filter((x) => x !== r.id) : [...sel, r.id])} /></td>
                <td>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}<br /><small>{r.ref}</small></td>
                <td><b>{r.lastName}, {r.firstName}</b><br /><small>{r.phone}</small></td>
                <td>{deptBySlug(r.dept)?.name}<br /><small>{r.doctor === 'first' ? 'First available' : docBySlug(r.doctor)?.name}</small></td>
                <td>{fmtDate(r.date).replace(/, \d{4}$/, '')}<br /><small>{fmtTime(r.time)}</small></td>
                <td><span className={`statusbadge st-${r.status}`}>{r.status}</span>{needsFollowUp(r) && <><br /><small>Needs follow-up</small></>}</td>
                <td><button type="button" className="rowbtn" onClick={() => setOpen(r.id)}>Details<span className="sr"> for {r.firstName} {r.lastName}</span></button></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={7} style={{ padding: 24 }}>No requests match these filters.</td></tr>}
          </tbody>
        </table>
      </div>
      {cur && <Drawer r={cur} onClose={close} onFlash={setFlash} />}
    </div>
  );
}

function Drawer({ r, onClose, onFlash }: { r: AppointmentRequest; onClose: () => void; onFlash: (s: string) => void }) {
  const [note, setNote] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('button,select,textarea,input,a[href]'); if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', k);
    return () => { document.removeEventListener('keydown', k); prev?.focus(); };
  }, [onClose]);
  const setStatus = (s: Status) => { requestsRepo.update(r.id, { status: s }); onFlash(`${r.ref} set to ${s}. The patient lookup shows this now.`); };
  return (
    <div className="drawer" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="dtitle" tabIndex={-1} ref={ref}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <div><h2 id="dtitle" style={{ fontSize: 26 }}>{r.firstName} {r.lastName}</h2><p className="help">{r.ref} . <span className={`statusbadge st-${r.status}`}>{r.status}</span></p></div>
          <button type="button" className="hb" aria-label="Close details" onClick={onClose}><Icon n="close" size={22} /></button>
        </div>
        <dl className="dd" style={{ margin: '14px 0' }}>
          <dt>Department</dt><dd>{deptBySlug(r.dept)?.name}</dd>
          <dt>Doctor</dt><dd>{r.doctor === 'first' ? 'First available' : docBySlug(r.doctor)?.name}</dd>
          <dt>Time</dt><dd>{fmtDate(r.date)} at {fmtTime(r.time)}</dd>
          <dt>Reason</dt><dd>{r.reason}</dd>
          <dt>Preferences</dt><dd>{[r.days.join(', ') || 'Any day', r.windows.join(', ') || 'any time'].join(' / ')}</dd>
          <dt>Phone</dt><dd><a href={`tel:${r.phone}`}>{r.phone}</a></dd>
          <dt>Email</dt><dd>{r.email || 'None given'}</dd>
          <dt>Contact by</dt><dd>{r.contactPref}</dd>
          <dt>New patient</dt><dd>{r.newPatient ? 'Yes' : 'No'}</dd>
        </dl>
        <div className="btnrow" style={{ marginTop: 0 }}>
          <button type="button" className="btn sm" disabled={r.status === 'Confirmed'} onClick={() => setStatus('Confirmed')}><Icon n="check" />Confirm</button>
          <div className="field" style={{ margin: 0 }}><label className="sr" htmlFor="ds">Set status</label><select id="ds" value={r.status} onChange={(e) => setStatus(e.target.value as Status)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
        </div>
        <div className="field" style={{ marginTop: 16 }}><label htmlFor="dn">Staff note</label><textarea id="dn" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the team" /></div>
        <button type="button" className="btn sm ghost" disabled={!note.trim()} onClick={() => { requestsRepo.update(r.id, { notes: (r.notes ? r.notes + '\n' : '') + note.trim() }, `Note: ${note.trim()}`); setNote(''); }}>Save note</button>
        {r.notes && <><h3 style={{ fontSize: 16, marginTop: 14 }}>Notes</h3><p style={{ whiteSpace: 'pre-wrap' }}>{r.notes}</p></>}
        <h3 style={{ fontSize: 16, marginTop: 14 }}>History</h3>
        <ul className="hist">{r.history.slice().reverse().map((h, i) => <li key={i}>{new Date(h.at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} ({h.by}): {h.text}</li>)}</ul>
      </div>
    </div>
  );
}
