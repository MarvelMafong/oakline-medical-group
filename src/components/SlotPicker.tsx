'use client';
import { useMemo } from 'react';
import { WINDOWS } from '@/data/site';
import { bookableDates, fmtDate, fmtTime, openSlots, parseYmd } from '@/lib/availability';
import type { AppointmentRequest } from '@/lib/types';

/** Calendar (weekdays, next four weeks) plus slot buttons, driven by local availability. */
export function SlotPicker({ dept, doctor, date, time, days = [], windows = [], reqs, ignoreRef, onChange }: {
  dept: string; doctor: string; date: string; time: string; days?: string[]; windows?: string[]; reqs: AppointmentRequest[]; ignoreRef?: string; onChange: (date: string, time: string) => void;
}) {
  const cells = useMemo(() => {
    const dates = bookableDates(28).filter((d) => { const w = parseYmd(d).getDay(); return w >= 1 && w <= 5; });
    const first = parseYmd(dates[0]).getDay() - 1; // blank cells before the first weekday
    return { pad: first, dates };
  }, []);
  const slots = date ? openSlots(dept, doctor, date, reqs, ignoreRef) : [];
  const dn = (d: string) => parseYmd(d).toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div>
      <div className="cal" role="group" aria-label="Choose a date. Weekdays only.">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => <span key={d} className="calh" aria-hidden="true">{d}</span>)}
        {Array.from({ length: cells.pad }).map((_, i) => <span key={`p${i}`} />)}
        {cells.dates.map((d) => {
          const n = openSlots(dept, doctor, d, reqs, ignoreRef).length;
          const dt = parseYmd(d);
          const pref = days.includes(dn(d));
          return (
            <button key={d} type="button" className={`calc${d === date ? ' on' : ''}${pref ? ' pref' : ''}`} disabled={n === 0} aria-pressed={d === date}
              aria-label={`${fmtDate(d)}, ${n ? `${n} times open` : 'no times open'}${pref ? ', a day you prefer' : ''}`} onClick={() => onChange(d, '')}>
              <small>{dt.getDate() === 1 || d === cells.dates[0] ? dt.toLocaleDateString('en-US', { month: 'short' }) : ' '}</small>
              <b>{dt.getDate()}</b>
              <small>{n ? `${n} open` : 'Full'}</small>
            </button>
          );
        })}
      </div>
      <div aria-live="polite" style={{ marginTop: 18 }}>
        {!date && <p className="help">Choose a date to see open times.</p>}
        {date && slots.length === 0 && <p className="help">No open times on this date. Please choose another.</p>}
        {date && slots.length > 0 && (
          <>
            <p style={{ font: '700 16px var(--fb)', marginBottom: 8 }}>Open times on {fmtDate(date)}</p>
            {WINDOWS.map((w) => {
              const s = slots.filter((x) => x.window === w);
              if (!s.length) return null;
              return (
                <fieldset key={w} style={{ border: 0, padding: 0, margin: '0 0 12px' }}>
                  <legend className="help" style={{ marginBottom: 6 }}>{w}{windows.includes(w) ? ' (your preference)' : ''}</legend>
                  <div className="slots">{s.map((x) => (
                    <label className="slot" key={x.time}><input type="radio" name="slot" checked={x.time === time} onChange={() => onChange(date, x.time)} /><span>{fmtTime(x.time)}</span></label>
                  ))}</div>
                </fieldset>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
