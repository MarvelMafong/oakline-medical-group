'use client';
import { useSyncExternalStore } from 'react';

/** Tiny browser store. Backed by localStorage today; repositories wrap it so Neon can replace it later. */
export type Store<T> = {
  get(): T;
  set(next: T): void;
  reset(): void;
  subscribe(cb: () => void): () => void;
};

const listeners = new Map<string, Set<() => void>>();
const cache = new Map<string, unknown>();

export function createStore<T>(key: string, seed: () => T): Store<T> {
  const k = `oakline:v1:${key}`;
  const subs = listeners.get(k) ?? new Set<() => void>();
  listeners.set(k, subs);
  const emit = () => subs.forEach((f) => f());
  const read = (): T => {
    if (cache.has(k)) return cache.get(k) as T;
    let v: T | undefined;
    try {
      const raw = window.localStorage.getItem(k);
      if (raw) v = JSON.parse(raw) as T;
    } catch { /* storage blocked */ }
    if (v === undefined) {
      v = seed();
      try { window.localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
    }
    cache.set(k, v);
    return v;
  };
  const write = (v: T) => {
    cache.set(k, v);
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ }
    emit();
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === k || e.key === null) { cache.delete(k); emit(); }
    });
  }
  return {
    get: read,
    set: write,
    reset: () => { cache.delete(k); try { window.localStorage.removeItem(k); } catch { /* ignore */ } write(seed()); },
    subscribe: (cb) => { subs.add(cb); return () => { subs.delete(cb); }; },
  };
}

/** Returns null on the server and during hydration, then the stored value. */
export function useStore<T>(s: Store<T>): T | null {
  return useSyncExternalStore(s.subscribe, s.get, () => null);
}
