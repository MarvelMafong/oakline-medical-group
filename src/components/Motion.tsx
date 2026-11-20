'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/lib/repos';

/** Scroll motion: native animation-timeline in CSS, with the script fallback (rv, --rp/--ri/--ro, rAF engine) for browsers without it. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const nat = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'view()'));
    const rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const cleanups: (() => void)[] = [];
    analytics.track('page_view', { path });

    // 1. reveal fallback
    const rv = [...document.querySelectorAll<HTMLElement>('.rv')];
    if (!nat) {
      root.classList.add('js');
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        rv.forEach((e) => io.observe(e));
        cleanups.push(() => io.disconnect());
      } else rv.forEach((e) => e.classList.add('in'));
    }

    // 2. horizontal scrollers
    document.querySelectorAll<HTMLElement>('.hs').forEach((hs) => {
      const sec = hs.closest('section');
      const bar = sec?.querySelector<HTMLElement>('.hbar i');
      const upd = () => { const m = hs.scrollWidth - hs.clientWidth; if (bar) bar.style.width = 14 + 86 * (m > 0 ? hs.scrollLeft / m : 0) + '%'; };
      hs.addEventListener('scroll', upd, { passive: true }); upd();
      sec?.querySelectorAll<HTMLElement>('.hb').forEach((b) => {
        const f = () => { const c = hs.querySelector('li'); const w = c ? c.getBoundingClientRect().width + 18 : 300; hs.scrollBy({ left: w * Number(b.dataset.dir), behavior: 'smooth' }); };
        b.addEventListener('click', f); cleanups.push(() => b.removeEventListener('click', f));
      });
      let down = false, sx = 0, sl = 0;
      const pd = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; down = true; sx = e.clientX; sl = hs.scrollLeft; hs.classList.add('drag'); };
      const pu = () => { down = false; hs.classList.remove('drag'); };
      const pm = (e: PointerEvent) => { if (down) hs.scrollLeft = sl - (e.clientX - sx); };
      hs.addEventListener('pointerdown', pd); window.addEventListener('pointerup', pu); hs.addEventListener('pointermove', pm);
      cleanups.push(() => { hs.removeEventListener('scroll', upd); hs.removeEventListener('pointerdown', pd); window.removeEventListener('pointerup', pu); hs.removeEventListener('pointermove', pm); });
    });

    // 3. header: stuck state and scroll spy for in-page anchors
    const pill = document.querySelector('.hdr .pill');
    const links = [...document.querySelectorAll<HTMLElement>('[data-spy]')];
    const spy = () => {
      const y = window.scrollY;
      let cur: string | null = null;
      links.forEach((l) => { const s = document.getElementById(l.dataset.spy!); if (!s) return; const r = s.getBoundingClientRect(); if (r.top < innerHeight * 0.45 && r.bottom > innerHeight * 0.3) cur = l.dataset.spy!; });
      links.forEach((l) => { if (l.dataset.spy === cur) l.setAttribute('aria-current', 'true'); else if (l.dataset.spyonly) l.removeAttribute('aria-current'); });
      pill?.classList.toggle('stuck', y > 40);
    };
    addEventListener('scroll', spy, { passive: true }); addEventListener('resize', spy); spy();
    cleanups.push(() => { removeEventListener('scroll', spy); removeEventListener('resize', spy); });

    // 4. parallax and reveal engine for browsers without animation-timeline
    if (!rm && !nat) {
      root.classList.add('js-par');
      const imgs = [...document.querySelectorAll<HTMLElement>('.dph img,.gc img,.jc>img,.pimg img,.wide img,.sc>img,.side img,.space img,.team img,.art img')];
      const cards = [...document.querySelectorAll<HTMLElement>('.dc,.pp,.step,.rc,.pr,.q,.sc,.team,.gc,.jc,.wide')];
      const bgs = [...document.querySelectorAll<HTMLElement>('.bgi')];
      const lps = document.querySelector<HTMLElement>('.loops');
      const kmap = [0.7, 1.2, 1.7, 0.9, 1.4];
      const prog = (r: DOMRect, vh: number) => { const c = r.top + r.height / 2; return Math.max(-1.2, Math.min(1.2, (c - vh / 2) / (vh / 2 + r.height / 2))); };
      const ez = (x: number) => { x = Math.max(0, Math.min(1, x)); return 1 - Math.pow(1 - x, 3); };
      let tk = false;
      const reveal = (vh: number) => {
        const dh = root.scrollHeight, bot = Math.max(0, Math.min(1, (scrollY + vh - (dh - 340)) / 340));
        rv.forEach((el) => {
          const r = el.getBoundingClientRect(); if (r.top > vh + 200 && bot < 1) return;
          let idx = 0, s: Element | null = el; while ((s = s.previousElementSibling)) idx++; idx = Math.min(idx, 5);
          let p = (vh * 0.97 - r.top) / (vh * 0.5) - idx * 0.07; if (bot > 0 && r.top < vh) p = Math.max(p, bot * 1.4);
          const e = ez(p), i = ez((p - 0.18) / 0.82);
          el.style.setProperty('--rp', e.toFixed(3)); el.style.setProperty('--ro', Math.min(1, e * 1.7).toFixed(3)); el.style.setProperty('--ri', i.toFixed(3));
        });
      };
      const upd = () => {
        tk = false; const vh = innerHeight;
        imgs.forEach((el) => { const r = (el.parentElement as HTMLElement).getBoundingClientRect(); if (r.bottom < -80 || r.top > vh + 80) return; el.style.setProperty('--py', (prog(r, vh) * -6).toFixed(2) + '%'); });
        cards.forEach((el, i) => { const r = el.getBoundingClientRect(); if (r.bottom < -120 || r.top > vh + 120) return; el.style.setProperty('--cy', (prog(r, vh) * -34 * kmap[i % 5]).toFixed(1) + 'px'); });
        bgs.forEach((el) => { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; el.style.setProperty('--bp', (prog(r, vh) * -7).toFixed(2) + '%'); });
        reveal(vh);
        if (lps) { const r = lps.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh) lps.style.setProperty('--hy', (scrollY * -0.06).toFixed(1) + 'px'); }
      };
      const req = () => { if (!tk) { tk = true; requestAnimationFrame(upd); } };
      addEventListener('scroll', req, { passive: true }); addEventListener('resize', req); upd();
      cleanups.push(() => { removeEventListener('scroll', req); removeEventListener('resize', req); root.classList.remove('js-par'); });
    } else if (!nat) {
      // reduced motion without native support: show everything
      rv.forEach((e) => e.classList.add('in'));
    }
    return () => cleanups.forEach((f) => f());
  }, [path]);
  return null;
}
