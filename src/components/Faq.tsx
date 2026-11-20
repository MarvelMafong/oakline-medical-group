import { Icon } from './Sprite';
/** Accessible accordion on native details/summary. */
export function Faq({ items, openFirst = false, rv = true }: { items: { q: string; a: string }[]; openFirst?: boolean; rv?: boolean }) {
  return (
    <div className="qs">
      {items.map((f, i) => (
        <details key={f.q} className={`q${rv ? ' rv' : ''}`} open={openFirst && i === 0}>
          <summary>{f.q}<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
export function faqSchema(items: { q: string; a: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}
export { Icon };
