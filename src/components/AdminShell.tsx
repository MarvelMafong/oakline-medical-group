'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Icon } from './Sprite';
import { Logo } from './Logo';
import { requestsRepo, useMessages } from '@/lib/repos';

const KEY = 'oakline:admin';
export const DEMO_ID = 'staff@oakline.example';
export const DEMO_PASS = 'oakline-demo';

/** Demo-only gate. Credentials are public on the login page. Nothing here is real security. */
export function AdminGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<'loading' | 'out' | 'in'>('loading');
  const path = usePathname();
  const router = useRouter();
  const msgs = useMessages();
  useEffect(() => { try { setState(sessionStorage.getItem(KEY) === '1' ? 'in' : 'out'); } catch { setState('out'); } }, []);
  useEffect(() => { if (state === 'in' && (path === '/admin/' || path === '/admin')) router.replace('/admin/requests/'); }, [state, path, router]);

  if (state === 'loading') return <div className="sk" aria-busy="true">Loading...</div>;
  if (state === 'out') return <Login onIn={() => { try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ } setState('in'); }} />;
  const unread = msgs ? msgs.filter((m) => !m.read).length : 0;
  const cur = (h: string) => (path.startsWith(h) ? ('page' as const) : undefined);
  return (
    <div className="adm">
      <header className="admbar">
        <Logo size={14} reverse label="Oakline Medical Group, public site" />
        <nav aria-label="Admin" style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Link href="/admin/dashboard/" aria-current={cur('/admin/dashboard')}><Icon n="chart" />Dashboard</Link>
          <Link href="/admin/requests/" aria-current={cur('/admin/requests')}><Icon n="list" />Requests</Link>
          <Link href="/admin/messages/" aria-current={cur('/admin/messages')}><Icon n="inbox" />Messages{unread ? ` (${unread})` : ''}</Link>
        </nav>
        <span className="sp" />
        <button type="button" onClick={() => { if (confirm('Reset all demo data? This restores the sample requests and clears your changes.')) requestsRepo.reset(); }}><Icon n="refresh" />Reset demo data</button>
        <Link href="/">View site</Link>
        <button type="button" onClick={() => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setState('out'); router.push('/admin/'); }}><Icon n="logout" />Sign out</button>
      </header>
      <main id="main" tabIndex={-1} className="admmain">{children}</main>
    </div>
  );
}

function Login({ onIn }: { onIn: () => void }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  return (
    <div className="adm">
      <main id="main" className="login" tabIndex={-1}>
        <div style={{ marginBottom: 18 }}><Logo size={20} label="Oakline Medical Group, public site" /></div>
        <form className="form-card" noValidate aria-label="Staff sign in" onSubmit={(e) => { e.preventDefault(); if (id.trim().toLowerCase() === DEMO_ID && pw === DEMO_PASS) onIn(); else { setErr('That ID and passcode do not match. Use the demo access shown below.'); document.getElementById('a-pw')?.focus(); } }}>
          <h1 style={{ fontSize: 30, marginBottom: 6 }}>Staff sign in</h1>
          <p className="help" style={{ marginBottom: 16 }}>Appointment requests, dashboard and messages.</p>
          <div className={`field${err ? ' err' : ''}`}><label htmlFor="a-id">Staff ID</label><input id="a-id" autoComplete="username" value={id} onChange={(e) => setId(e.target.value)} /></div>
          <div className={`field${err ? ' err' : ''}`}><label htmlFor="a-pw">Passcode</label><input id="a-pw" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} aria-describedby={err ? 'a-err' : undefined} aria-invalid={!!err} />
            {err && <span className="msg" id="a-err" role="alert"><Icon n="alert" />{err}</span>}</div>
          <button className="btn" type="submit"><Icon n="lock" />Sign in</button>
          <div className="okbox" style={{ marginTop: 16 }}><div><b>Demo access: staff@oakline.example / oakline-demo</b></div></div>
          <p className="note" style={{ marginTop: 12 }}>Demonstration form. Requests are not sent to a clinic.</p>
          <p style={{ marginTop: 12 }}><Link className="tlink" href="/">Back to the website</Link></p>
        </form>
      </main>
    </div>
  );
}
