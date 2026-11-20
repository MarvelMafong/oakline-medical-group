import type { Status } from '@/data/site';

export type HistoryEntry = { at: string; by: 'patient' | 'staff' | 'system'; text: string };

export type AppointmentRequest = {
  id: string;
  ref: string; // OAK-XXXXXX
  status: Status;
  dept: string; // dept slug
  reason: string; // category only, never symptoms
  days: string[];
  windows: string[];
  doctor: string; // doctor slug or 'first'
  date: string; // YYYY-MM-DD preferred slot
  time: string; // HH:MM
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  contactPref: 'Phone' | 'Text' | 'Email';
  newPatient: boolean;
  notes: string; // staff notes
  createdAt: string; // ISO
  updatedAt: string;
  history: HistoryEntry[];
};

export type NewRequest = Omit<AppointmentRequest, 'id' | 'ref' | 'status' | 'notes' | 'createdAt' | 'updatedAt' | 'history'>;

export type ContactMessage = {
  id: string; name: string; email: string; phone: string; topic: string; message: string;
  createdAt: string; read: boolean;
};

export type AnalyticsEvent = { at: string; name: string; props?: Record<string, string | number> };

/** Swap these for Neon-backed implementations later. UI code only talks to these interfaces. */
export interface RequestsRepo {
  all(): AppointmentRequest[];
  create(input: NewRequest): AppointmentRequest;
  find(ref: string, lastName: string): AppointmentRequest | undefined;
  update(id: string, patch: Partial<AppointmentRequest>, note?: string, by?: HistoryEntry['by']): void;
  bulkStatus(ids: string[], status: Status): void;
  reset(): void;
}
export interface MessagesRepo {
  all(): ContactMessage[];
  create(m: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage;
  markRead(id: string, read: boolean): void;
  remove(id: string): void;
  reset(): void;
}
export interface AnalyticsProvider {
  track(name: string, props?: Record<string, string | number>): void;
}
