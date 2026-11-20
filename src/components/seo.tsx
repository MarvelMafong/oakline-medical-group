import type { Metadata } from 'next';
import { SITE_URL, isIndexable } from '@/config/seo.config.mjs';
/** Per-page metadata. Robots, canonical, Open Graph and Twitter all come from the one config. */
export function pageMeta({ title, description, path, image = '/images/og-oakline.png', type = 'website' }: { title: string; description: string; path: string; image?: string; type?: 'website' | 'article' }): Metadata {
  const idx = isIndexable(path);
  const url = `${SITE_URL}${path}`;
  return {
    title, description,
    alternates: { canonical: url },
    robots: idx ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: { title, description, url, type, siteName: 'Oakline Medical Group', locale: 'en_US', images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}${image}`] },
  };
}
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
