'use client';
import { createStore, useStore } from './store';
import { seedRequests, seedMessages, seedEvents, makeRef, uid } from './seed';
import type { AppointmentRequest, ContactMessage, AnalyticsEvent, RequestsRepo, MessagesRepo, AnalyticsProvider, NewRequest, HistoryEntry } from './types';
import type { Status } from '@/data/site';

// ---- local (browser) implementations. Replace these objects with Neon-backed ones; UI code does not change. ----
export const requestStore = createStore<AppointmentRequest[]>('requests', seedRequests);
export const messageStore = createStore<ContactMessage[]>('messages', seedMessages);
export const eventStore = createStore<AnalyticsEvent[]>('events', () => seedEvents(requestStore.get()));
export type Draft = { step: number; data: Record<string, unknown>; savedAt: string } | null;
export const draftStore = createStore<Draft>('draft', () => null);

const now = () => new Date().toISOString();

export const requestsRepo: RequestsRepo = {
  all: () => requestStore.get(),
  create(input: NewRequest) {
    const list = requestStore.get();
    let ref = makeRef();
    while (list.some((r) => r.ref === ref)) ref = makeRef();
    const t = now();
    const rec: AppointmentRequest = { ...input, id: uid(), ref, status: 'Requested', notes: '', createdAt: t, updatedAt: t, history: [{ at: t, by: 'patient', text: 'Request submitted online' }] };
    requestStore.set([rec, ...list]);
    analytics.track('request_submitted', { dept: input.dept });
    return rec;
  },
  find(ref, lastName) {
    const r = ref.trim().toUpperCase();
    return requestStore.get().find((x) => x.ref === r && x.lastName.trim().toLowerCase() === lastName.trim().toLowerCase());
  },
  update(id, patch, note, by: HistoryEntry['by'] = 'staff') {
    requestStore.set(requestStore.get().map((r) => {
      if (r.id !== id) return r;
      const t = now();
      const h = [...r.history];
      if (patch.status && patch.status !== r.status) h.push({ at: t, by, text: `Status set to ${patch.status}` });
      if (note) h.push({ at: t, by, text: note });
      return { ...r, ...patch, updatedAt: t, history: h };
    }));
  },
  bulkStatus(ids, status: Status) {
    const t = now();
    requestStore.set(requestStore.get().map((r) => (ids.includes(r.id) && r.status !== status ? { ...r, status, updatedAt: t, history: [...r.history, { at: t, by: 'staff', text: `Status set to ${status} (bulk)` }] } : r)));
  },
  reset() { requestStore.reset(); messageStore.reset(); draftStore.set(null); eventStore.set(seedEvents(requestStore.get())); },
};

export const messagesRepo: MessagesRepo = {
  all: () => messageStore.get(),
  create(m) {
    const rec: ContactMessage = { ...m, id: uid(), createdAt: now(), read: false };
    messageStore.set([rec, ...messageStore.get()]);
    analytics.track('contact_submitted');
    return rec;
  },
  markRead: (id, read) => messageStore.set(messageStore.get().map((m) => (m.id === id ? { ...m, read } : m))),
  remove: (id) => messageStore.set(messageStore.get().filter((m) => m.id !== id)),
  reset: () => messageStore.reset(),
};

/** Local, privacy-safe event layer. Swap for a GA4 provider later; nothing third-party loads today. */
export const analytics: AnalyticsProvider = {
  track(name, props) {
    if (typeof window === 'undefined') return;
    const list = eventStore.get();
    eventStore.set([...list, { at: now(), name, props }].slice(-1500));
  },
};

export const useRequests = () => useStore(requestStore);
export const useMessages = () => useStore(messageStore);
export const useEvents = () => useStore(eventStore);
export const useDraft = () => useStore(draftStore);
