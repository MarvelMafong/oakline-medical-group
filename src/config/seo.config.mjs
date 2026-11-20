// ONE place that controls indexing: robots meta, X-Robots-Tag header, robots.txt and sitemap.xml.
// Override at build time with SITE_INDEXABLE: "all" (everything indexable) or a comma list of paths, e.g. "/case-study/,/about/".
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://oakline-medical-group.vercel.app').replace(/\/$/, '');
export const INDEXABLE_PATHS = ['/case-study/'];
export const STUDIO = { name: 'TekGemm Studio', url: 'https://tekgemmstudio.com' };
export const PERSON = { name: 'Marvel Mafong', url: 'https://marvelmafong.work' };
export const INDEXNOW_ENABLED = process.env.INDEXNOW === 'on';
export const INDEXNOW_KEY = 'f3a91c27d84b4e6a9c05b17e2d8a64f0';

export function indexablePaths() {
  const o = process.env.SITE_INDEXABLE;
  if (o && o.trim() && o.trim() !== 'default') return o.trim() === 'all' ? ['*'] : o.split(',').map((s) => s.trim());
  return INDEXABLE_PATHS;
}
export function isIndexable(path) {
  const p = indexablePaths();
  return p.includes('*') || p.includes(path);
}
