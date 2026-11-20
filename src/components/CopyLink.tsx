'use client';
import { useState } from 'react';
import { Icon } from './Sprite';
export function CopyLink({ url }: { url: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" onClick={async () => { try { await navigator.clipboard.writeText(url); } catch { /* ignore */ } setOk(true); setTimeout(() => setOk(false), 2500); }}>
      <Icon n="share" /><span aria-live="polite">{ok ? 'Link copied' : 'Copy link'}</span>
    </button>
  );
}
