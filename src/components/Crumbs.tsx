import Link from 'next/link';
import { JsonLd } from './seo';
import { SITE_URL } from '@/config/seo.config.mjs';
export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  const all = [{ name: 'Home', href: '/' }, ...items];
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <ol>{all.map((c, i) => <li key={c.name}>{c.href && i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}</li>)}</ol>
      </nav>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${SITE_URL}${c.href ?? ''}` })) }} />
    </>
  );
}
