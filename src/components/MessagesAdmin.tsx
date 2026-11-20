'use client';
import { messagesRepo, useMessages } from '@/lib/repos';
import { Icon } from './Sprite';

export function MessagesAdmin() {
  const msgs = useMessages();
  if (msgs === null) return <div className="sk" aria-busy="true">Loading messages...</div>;
  return (
    <div>
      <h1>Messages</h1>
      <p className="help">Messages from the Contact page appear here instantly. {msgs.filter((m) => !m.read).length} unread.</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
        {msgs.map((m) => (
          <article key={m.id} className="card" aria-label={`Message from ${m.name}`} style={m.read ? undefined : { boxShadow: 'var(--sh2), inset 4px 0 0 var(--tang)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
              <h2 style={{ fontSize: 20 }}>{m.name} <span className="tagpill">{m.topic}</span> {!m.read && <span className="statusbadge st-Requested">Unread</span>}</h2>
              <span className="help">{new Date(m.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            </div>
            <p style={{ margin: '8px 0' }}>{m.message}</p>
            <p className="help"><a href={`mailto:${m.email}`}>{m.email}</a>{m.phone && <> . <a href={`tel:${m.phone}`}>{m.phone}</a></>}</p>
            <div className="btnrow" style={{ marginTop: 8 }}>
              <button type="button" className="btn sm ghost" onClick={() => messagesRepo.markRead(m.id, !m.read)}><Icon n="eye" />{m.read ? 'Mark unread' : 'Mark read'}</button>
              <button type="button" className="btn sm ghost" onClick={() => messagesRepo.remove(m.id)}><Icon n="trash" />Delete</button>
            </div>
          </article>
        ))}
        {msgs.length === 0 && <div className="card"><p>No messages yet. Send one from the Contact page to see it here.</p></div>}
      </div>
    </div>
  );
}
