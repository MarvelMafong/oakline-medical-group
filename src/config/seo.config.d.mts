export const SITE_URL: string;
export const INDEXABLE_PATHS: string[];
export const STUDIO: { name: string; url: string };
export const PERSON: { name: string; url: string };
export const INDEXNOW_ENABLED: boolean;
export const INDEXNOW_KEY: string;
export function indexablePaths(): string[];
export function isIndexable(path: string): boolean;
