import { DOCS, docsOf, docBySlug, windowOf, type Doc } from '@/data/site';
import type { AppointmentRequest } from './types';

export const pad = (n: number) => String(n).padStart(2, '0');
export const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseYmd = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const fmtDate = (s: string) => parseYmd(s).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
export const fmtShort = (s: string) => parseYmd(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
export const fmtTime = (t: string) => { const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };

function slotsFor(doc: Doc, date: Date): string[] {
  const sch = doc.schedule.filter((s) => s.day === date.getDay());
  const out: string[] = [];
  for (const s of sch) {
    let [h, m] = s.start.split(':').map(Number);
    const [eh, em] = s.end.split(':').map(Number);
    while (h * 60 + m + 30 <= eh * 60 + em) { out.push(`${pad(h)}:${pad(m)}`); m += 30; if (m >= 60) { h++; m -= 60; } }
  }
  return out;
}

const active = (r: AppointmentRequest) => r.status !== 'Cancelled';

export type Slot = { time: string; window: string; left: number };

/** Open slots for a department and a doctor (or "first" for any doctor in the department). */
export function openSlots(dept: string, doctor: string, date: string, reqs: AppointmentRequest[], ignoreRef?: string): Slot[] {
  const scope = doctor === 'first' ? docsOf(dept) : [docBySlug(doctor)].filter(Boolean) as Doc[];
  const d = parseYmd(date);
  const cap = new Map<string, number>();
  scope.forEach((doc) => slotsFor(doc, d).forEach((t) => cap.set(t, (cap.get(t) ?? 0) + 1)));
  const taken = reqs.filter((r) => active(r) && r.date === date && r.ref !== ignoreRef && (doctor === 'first' ? r.dept === dept : r.doctor === doctor));
  return [...cap.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([time, c]) => ({
    time, window: windowOf(time), left: c - taken.filter((r) => r.time === time).length,
  })).filter((s) => s.left > 0);
}

export function bookableDates(daysAhead = 28): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 1; i <= daysAhead; i++) { const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i); out.push(ymd(d)); }
  return out;
}

export function hasOpening(dept: string, doctor: string, date: string, reqs: AppointmentRequest[]) {
  return openSlots(dept, doctor, date, reqs).length > 0;
}

/** Next open dates for a doctor within a window of days (used by the directory filter). */
export function openThisWeek(doctor: string, reqs: AppointmentRequest[]): boolean {
  const doc = docBySlug(doctor);
  if (!doc) return false;
  return bookableDates(7).some((d) => hasOpening(doc.dept, doctor, d, reqs));
}

export const scheduleText = (doc: Doc) => {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return doc.schedule.map((s) => `${names[s.day]} ${fmtTime(s.start)} to ${fmtTime(s.end)}`);
};
export { DOCS };
