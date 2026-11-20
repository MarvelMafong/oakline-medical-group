import { deptBySlug, docBySlug, SITE } from '@/data/site';
import type { AppointmentRequest } from './types';

const stamp = (date: string, time: string, addMin = 0) => {
  const [y, m, d] = date.split('-').map(Number);
  const [h, mi] = time.split(':').map(Number);
  const t = new Date(y, m - 1, d, h, mi + addMin);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${t.getFullYear()}${p(t.getMonth() + 1)}${p(t.getDate())}T${p(t.getHours())}${p(t.getMinutes())}00`;
};

export function buildIcs(r: AppointmentRequest): string {
  const dept = deptBySlug(r.dept)?.name ?? 'Oakline';
  const doc = r.doctor === 'first' ? 'first available doctor' : docBySlug(r.doctor)?.name ?? '';
  const status = r.status === 'Confirmed' ? 'Confirmed' : 'Requested, awaiting staff confirmation';
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Oakline Medical Group//Request//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    `UID:${r.ref}@oakline.example`, `DTSTAMP:${stamp(r.createdAt.slice(0, 10), '00:00')}Z`,
    `DTSTART:${stamp(r.date, r.time)}`, `DTEND:${stamp(r.date, r.time, 30)}`,
    `SUMMARY:${dept} appointment request (${r.status})`,
    `DESCRIPTION:Reference ${r.ref}. ${status}. With ${doc}. Our staff will call to confirm. A request is not a confirmed appointment.`,
    `LOCATION:${SITE.address.join(', ')}`, 'STATUS:TENTATIVE', 'END:VEVENT', 'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

export function downloadIcs(r: AppointmentRequest) {
  const blob = new Blob([buildIcs(r)], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `oakline-${r.ref}.ics`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function csvEscape(v: string) { return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; }
export function downloadText(name: string, text: string, type = 'text/csv') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  a.download = name; document.body.appendChild(a); a.click(); a.remove();
}
