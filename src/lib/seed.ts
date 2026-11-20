import { DEPTS, docsOf, REASONS, WINDOWS, DAYS, windowOf } from '@/data/site';
import type { AppointmentRequest, ContactMessage, AnalyticsEvent, HistoryEntry } from './types';
import { ymd, pad } from './availability';

const FIRST = ['Avery', 'Jamal', 'Priya', 'Lena', 'Marcus', 'Sofia', 'Daniel', 'Hannah', 'Omar', 'Grace', 'Ethan', 'Imani', 'Lucas', 'Mei', 'Noah', 'Tessa', 'Andre', 'Rosa', 'Kai', 'Nora', 'Victor', 'Dana', 'Miles', 'Alina'];
const LAST = ['Calloway', 'Brennan', 'Singh', 'Moreau', 'Whitfield', 'Alvarez', 'Park', 'Okoye', 'Lindgren', 'Harper', 'Nakamura', 'Duarte', 'Fischer', 'Osei', 'Bennett', 'Rahman', 'Kowalski', 'Mbeki', 'Hollis', 'Tran'];

let seedState = 20260101;
const rnd = () => { seedState = (seedState * 1664525 + 1013904223) % 4294967296; return seedState / 4294967296; };
const pick = <T,>(a: readonly T[]): T => a[Math.floor(rnd() * a.length)];
const refChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const makeRef = () => 'OAK-' + Array.from({ length: 6 }, () => refChars[Math.floor(Math.random() * refChars.length)]).join('');
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

export function seedRequests(): AppointmentRequest[] {
  seedState = 20260101;
  const now = new Date();
  const out: AppointmentRequest[] = [];
  const used = new Set<string>();
  for (let i = 0; i < 42; i++) {
    const age = Math.floor(rnd() * 30); // days ago created
    const created = new Date(now.getFullYear(), now.getMonth(), now.getDate() - age, 8 + Math.floor(rnd() * 9), Math.floor(rnd() * 60));
    const dept = pick(DEPTS);
    const doc = pick(docsOf(dept.slug));
    const target = new Date(created.getFullYear(), created.getMonth(), created.getDate() + 2 + Math.floor(rnd() * 12));
    for (let g = 0; g < 8 && !doc.schedule.some((s) => s.day === target.getDay()); g++) target.setDate(target.getDate() + 1);
    const sch = doc.schedule.find((s) => s.day === target.getDay()) ?? doc.schedule[0];
    const startMin = Number(sch.start.slice(0, 2)) * 60 + Number(sch.start.slice(3));
    const endMin = Number(sch.end.slice(0, 2)) * 60 + Number(sch.end.slice(3));
    const slotCount = Math.floor((endMin - startMin) / 30);
    const m = startMin + 30 * Math.floor(rnd() * slotCount);
    const time = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    const date = ymd(target);
    const key = `${doc.slug}${date}${time}`;
    if (used.has(key)) continue;
    used.add(key);
    const past = target < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const r = rnd();
    const status = past ? (r < 0.72 ? 'Completed' : r < 0.9 ? 'Cancelled' : 'Requested') : r < 0.5 ? 'Confirmed' : r < 0.62 ? 'Rescheduled' : r < 0.7 ? 'Cancelled' : 'Requested';
    const first = pick(FIRST); const last = pick(LAST);
    const hist: HistoryEntry[] = [{ at: created.toISOString(), by: 'patient', text: 'Request submitted online' }];
    if (status !== 'Requested') hist.push({ at: new Date(created.getTime() + 3600000 * (3 + Math.floor(rnd() * 30))).toISOString(), by: 'staff', text: `Status set to ${status}` });
    out.push({
      id: uid() + i, ref: makeRef(), status, dept: dept.slug, reason: pick(REASONS),
      days: [pick(DAYS), pick(DAYS)].filter((v, k, a) => a.indexOf(v) === k), windows: [pick(WINDOWS), windowOf(time)].filter((v, k, a) => a.indexOf(v) === k),
      doctor: rnd() < 0.55 ? doc.slug : 'first', date, time, firstName: first, lastName: last,
      phone: `(404) 555-01${pad(Math.floor(rnd() * 90) + 10)}`, email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
      contactPref: pick(['Phone', 'Phone', 'Text', 'Email'] as const), newPatient: rnd() < 0.4,
      notes: status === 'Confirmed' ? 'Confirmed by phone.' : '', createdAt: created.toISOString(), updatedAt: hist[hist.length - 1].at, history: hist,
    });
  }
  // doctor 'first' requests keep the dept capacity honest, but make slot owners consistent
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function seedMessages(): ContactMessage[] {
  const now = Date.now();
  const mk = (i: number, name: string, topic: string, message: string, read: boolean): ContactMessage => ({
    id: 'm' + i, name, email: `${name.split(' ')[0].toLowerCase()}@example.com`, phone: '(404) 555-0150', topic, message, createdAt: new Date(now - i * 86400000 * 2).toISOString(), read,
  });
  return [
    mk(1, 'Jordan Hale', 'Insurance question', 'Could someone call me about which plans are accepted before my first visit?', false),
    mk(2, 'Maria Delgado', 'General question', 'Is there a ramp at the main entrance, and where is the closest accessible parking?', false),
    mk(3, 'Chris Ito', 'Billing question', 'I would like to know how to get an itemized statement from my last visit.', true),
  ];
}

export function seedEvents(reqs: AppointmentRequest[]): AnalyticsEvent[] {
  seedState = 777;
  const ev: AnalyticsEvent[] = [];
  reqs.forEach((r) => {
    ev.push({ at: r.createdAt, name: 'request_submitted', props: { dept: r.dept } });
    ev.push({ at: r.createdAt, name: 'request_started', props: { dept: r.dept } });
  });
  const now = Date.now();
  for (let i = 0; i < 38; i++) ev.push({ at: new Date(now - Math.floor(rnd() * 30) * 86400000).toISOString(), name: 'request_started', props: { dept: pick(DEPTS).slug } });
  return ev;
}
