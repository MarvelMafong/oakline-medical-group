'use client';
import { useState } from 'react';
import { SITE } from '@/data/site';
import { messagesRepo } from '@/lib/repos';
import { Icon } from './Sprite';

const TOPICS = ['General question', 'Insurance question', 'Billing question', 'Accessibility request', 'Website feedback'];

/** Saves to the local inbox, which staff see in the admin Messages page. Nothing leaves the browser. */
export function ContactForm() {
  const [f, setF] = useState({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' });
  const [e, setE] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const er: Record<string, string> = {};
    if (!f.name.trim()) er.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) er.email = 'Please enter an email address we can reply to.';
    if (f.message.trim().length < 5) er.message = 'Please write a short message.';
    setE(er);
    if (Object.keys(er).length) { setTimeout(() => (document.querySelector('[data-cerr]') as HTMLElement | null)?.focus(), 0); return; }
    messagesRepo.create({ name: f.name.trim(), email: f.email.trim(), phone: f.phone.trim(), topic: f.topic, message: f.message.trim() });
    setDone(true);
  };
  if (done) return (
    <div className="okbox" role="status" tabIndex={-1} ref={(el) => el?.focus()}><div className="tick"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div><h3 style={{ fontSize: 22 }}>Message received</h3><p>Thank you. It is now in the staff inbox. Please do not include health details in messages.</p><button className="linkbtn" type="button" onClick={() => { setDone(false); setF({ name: '', email: '', phone: '', topic: TOPICS[0], message: '' }); }}>Send another</button></div></div>
  );
  const A = (k: string) => ({ 'aria-invalid': !!e[k], 'aria-describedby': e[k] ? `ce-${k}` : undefined, 'data-cerr': e[k] ? true : undefined }) as const;
  const M = ({ k }: { k: string }) => e[k] ? <span className="msg" id={`ce-${k}`} role="alert"><Icon n="alert" />{e[k]}</span> : null;
  return (
    <form className="form-card" onSubmit={submit} noValidate aria-label="Contact form">
      <div className={`field${e.name ? ' err' : ''}`}><label htmlFor="c-name">Your name</label><input id="c-name" autoComplete="name" value={f.name} onChange={(x) => set('name', x.target.value)} {...A('name')} /><M k="name" /></div>
      <div className={`field${e.email ? ' err' : ''}`}><label htmlFor="c-email">Email</label><input id="c-email" type="email" autoComplete="email" value={f.email} onChange={(x) => set('email', x.target.value)} {...A('email')} /><M k="email" /></div>
      <div className="field"><label htmlFor="c-phone">Phone <span className="opt">(optional)</span></label><input id="c-phone" type="tel" autoComplete="tel" value={f.phone} onChange={(x) => set('phone', x.target.value)} /></div>
      <div className="field"><label htmlFor="c-topic">Topic</label><select id="c-topic" value={f.topic} onChange={(x) => set('topic', x.target.value)}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select></div>
      <div className={`field${e.message ? ' err' : ''}`}><label htmlFor="c-msg">Message</label><textarea id="c-msg" value={f.message} onChange={(x) => set('message', x.target.value)} {...A('message')} /><span className="help">Please do not include symptoms or medical history.</span><M k="message" /></div>
      <button className="btn" type="submit">Send message <Icon n="arrow" /></button>
      <p className="note" style={{ marginTop: 14 }}><b>{SITE.formNote}</b></p>
    </form>
  );
}
