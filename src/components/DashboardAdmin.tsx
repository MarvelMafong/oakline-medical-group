'use client';
import Link from 'next/link';
import { DEPTS, STATUSES, WINDOWS, windowOf } from '@/data/site';
import { useEvents, useRequests } from '@/lib/repos';
import { needsFollowUp } from './RequestsAdmin';
import { Icon } from './Sprite';

const C = { cobalt: '#2448B8', tang: '#F28A45', ink: '#14203A', blue: '#9DB6E6', cream: '#E9C9A6', grey: '#8A93A6' };
const STATUS_COL: Record<string, string> = { Requested: '#F28A45', Confirmed: '#2E8B57', Rescheduled: '#7A5AC8', Cancelled: '#8A93A6', Completed: '#2448B8' };
const ymd = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export function DashboardAdmin() {
  const reqs = useRequests();
  const events = useEvents();
  if (reqs === null || events === null) return <div className="sk" aria-busy="true">Loading dashboard...</div>;

  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => { const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29 + i); return ymd(d); });
  const perDay = days.map((d) => reqs.filter((r) => r.createdAt.slice(0, 10) === d).length);
  const maxDay = Math.max(1, ...perDay);
  const byDept = DEPTS.map((d) => ({ name: d.name, n: reqs.filter((r) => r.dept === d.slug).length }));
  const maxDept = Math.max(1, ...byDept.map((d) => d.n));
  const byStatus = STATUSES.map((s) => ({ s, n: reqs.filter((r) => r.status === s).length }));
  const total = reqs.length || 1;
  const wd = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const heat = wd.map((_, i) => WINDOWS.map((w) => reqs.filter((r) => { const d = new Date(r.date + 'T12:00:00').getDay(); return d === i + 1 && windowOf(r.time) === w; }).length));
  const maxHeat = Math.max(1, ...heat.flat());
  const winTotals = WINDOWS.map((w) => ({ w, n: reqs.filter((r) => windowOf(r.time) === w).length }));
  const started = events.filter((e) => e.name === 'request_started').length;
  const submitted = events.filter((e) => e.name === 'request_submitted').length;
  const views = events.filter((e) => e.name === 'page_view').length;
  const conv = started ? Math.round((Math.min(submitted, started) / started) * 100) : 0;
  const follow = reqs.filter(needsFollowUp).length;
  const recent = reqs.flatMap((r) => r.history.map((h) => ({ ...h, ref: r.ref, name: `${r.firstName} ${r.lastName}` }))).sort((a, b) => b.at.localeCompare(a.at)).slice(0, 8);

  // donut geometry
  let acc = 0;
  const arcs = byStatus.filter((x) => x.n > 0).map((x) => {
    const a0 = (acc / total) * 2 * Math.PI - Math.PI / 2; acc += x.n; const a1 = (acc / total) * 2 * Math.PI - Math.PI / 2;
    const r = 70, ir = 44, cx = 90, cy = 90, big = a1 - a0 > Math.PI ? 1 : 0;
    const p = (a: number, rr: number) => `${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)}`;
    return { s: x.s, d: x.n === total ? `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r}L${cx - 0.01} ${cy - ir}A${ir} ${ir} 0 1 0 ${cx} ${cy - ir}Z` : `M${p(a0, r)}A${r} ${r} 0 ${big} 1 ${p(a1, r)}L${p(a1, ir)}A${ir} ${ir} 0 ${big} 0 ${p(a0, ir)}Z` };
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="help">Live from the data in this browser. Demo data, not real patients.</p>
      <div className="kpis" style={{ marginTop: 14 }}>
        <div className="kpi"><span>Total requests</span><b>{reqs.length}</b></div>
        <div className="kpi"><span>Awaiting confirmation</span><b>{reqs.filter((r) => r.status === 'Requested').length}</b></div>
        <div className="kpi"><span>Needs follow-up (over 48 hours)</span><b>{follow}</b></div>
        <div className="kpi"><span>Request conversion</span><b>{conv}%</b><span>{submitted} sent of {started} started</span></div>
      </div>
      <div className="btnrow" aria-label="Quick actions">
        <Link className="btn sm" href="/admin/requests/?view=followup"><Icon n="list" />Review follow-ups</Link>
        <Link className="btn sm ghost" href="/admin/requests/"><Icon n="list" />All requests</Link>
        <Link className="btn sm ghost" href="/admin/messages/"><Icon n="inbox" />Messages</Link>
        <Link className="btn sm ghost" href="/appointments/"><Icon n="plus" />New request (public form)</Link>
      </div>

      <div className="charts">
        <section className="chart wide2" aria-labelledby="c1"><h2 id="c1">Requests per day</h2><p className="cap3">Last 30 days, by the day they were received.</p>
          <svg viewBox="0 0 640 190" role="img" aria-label={`Bar chart of requests per day over 30 days. Highest day: ${maxDay}.`}>
            {[0, 0.5, 1].map((t) => <g key={t}><line x1="30" x2="636" y1={150 - t * 130} y2={150 - t * 130} stroke="#E3E8F2" /><text x="24" y={154 - t * 130} fontSize="11" textAnchor="end">{Math.round(maxDay * t)}</text></g>)}
            {perDay.map((n, i) => <g key={days[i]}><rect x={36 + i * 20} y={150 - (n / maxDay) * 130} width="14" height={(n / maxDay) * 130} rx="4" fill={C.cobalt}><title>{`${days[i]}: ${n}`}</title></rect>{i % 5 === 0 && <text x={43 + i * 20} y="170" fontSize="11" textAnchor="middle">{days[i].slice(5)}</text>}</g>)}
          </svg></section>

        <section className="chart" aria-labelledby="c2"><h2 id="c2">Requests by department</h2><p className="cap3">All requests.</p>
          <svg viewBox="0 0 360 200" role="img" aria-label="Horizontal bars of requests by department">
            {byDept.map((d, i) => <g key={d.name}><text x="0" y={22 + i * 31} fontSize="13">{d.name}</text><rect x="110" y={8 + i * 31} width={Math.max(2, (d.n / maxDept) * 200)} height="20" rx="6" fill={i % 2 ? C.tang : C.cobalt} /><text x={116 + (d.n / maxDept) * 200} y={23 + i * 31} fontSize="13" fontWeight="700">{d.n}</text></g>)}
          </svg></section>

        <section className="chart" aria-labelledby="c3"><h2 id="c3">Requests by status</h2><p className="cap3">Share of all requests.</p>
          <svg viewBox="0 0 180 180" style={{ maxWidth: 220 }} role="img" aria-label={`Donut chart of status: ${byStatus.map((x) => `${x.s} ${x.n}`).join(', ')}`}>
            {arcs.map((a) => <path key={a.s} d={a.d} fill={STATUS_COL[a.s]} />)}
            <text x="90" y="88" textAnchor="middle" fontSize="26" fontWeight="800">{reqs.length}</text><text x="90" y="106" textAnchor="middle" fontSize="12">requests</text>
          </svg>
          <ul className="legend">{byStatus.map((x) => <li key={x.s}><i style={{ background: STATUS_COL[x.s] }} />{x.s}: {x.n}</li>)}</ul></section>

        <section className="chart" aria-labelledby="c4"><h2 id="c4">Busiest time windows</h2><p className="cap3">Requested visits by weekday and time of day. Darker means busier.</p>
          <svg viewBox="0 0 360 170" role="img" aria-label="Heat map of requested visits by weekday and time window">
            {WINDOWS.map((w, j) => <text key={w} x={96 + j * 84} y="14" fontSize="12" textAnchor="middle">{w}</text>)}
            {wd.map((d, i) => <g key={d}><text x="0" y={42 + i * 27} fontSize="13">{d}</text>{WINDOWS.map((w, j) => { const n = heat[i][j]; return <g key={w}><rect x={56 + j * 84} y={22 + i * 27} width="78" height="23" rx="7" fill={C.cobalt} opacity={0.12 + 0.88 * (n / maxHeat)}><title>{`${d} ${w}: ${n}`}</title></rect><text x={95 + j * 84} y={39 + i * 27} fontSize="12" textAnchor="middle" fill={n / maxHeat > 0.5 ? '#fff' : C.ink} fontWeight="700">{n}</text></g>; })}</g>)}
          </svg>
          <p className="help">Busiest overall: {winTotals.slice().sort((a, b) => b.n - a.n)[0].w}</p></section>

        <section className="chart" aria-labelledby="c5"><h2 id="c5">Conversion funnel</h2><p className="cap3">From this browser&apos;s local event log (no outside trackers).</p>
          <svg viewBox="0 0 360 150" role="img" aria-label={`Funnel: ${views} page views, ${started} requests started, ${submitted} requests sent`}>
            {[['Page views', views, C.blue], ['Requests started', started, C.cobalt], ['Requests sent', submitted, C.tang]].map(([l, n, c], i) => { const mx = Math.max(views, started, 1); const w = Math.max(6, ((n as number) / mx) * 220); return <g key={l as string}><text x="0" y={26 + i * 44} fontSize="13">{l as string}</text><rect x="120" y={10 + i * 44} width={w} height="28" rx="8" fill={c as string} /><text x={128 + w} y={30 + i * 44} fontSize="13" fontWeight="700">{n as number}</text></g>; })}
          </svg></section>

        <section className="chart" aria-labelledby="c6"><h2 id="c6">Recent activity</h2>
          <ul className="hist" style={{ marginTop: 8 }}>{recent.map((h, i) => <li key={i}><b>{h.name}</b> ({h.ref}): {h.text}<br /><small>{new Date(h.at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</small></li>)}</ul></section>
      </div>
    </div>
  );
}
