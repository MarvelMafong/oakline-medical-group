import Link from 'next/link';
import { SITE_URL, STUDIO, PERSON } from '@/config/seo.config.mjs';
import metrics from '@/data/metrics.json';
import { Icon } from '@/components/Sprite';
import { Blob } from '@/components/Blob';
import { Faq, faqSchema } from '@/components/Faq';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { bg } from '@/components/Img';

const TITLE = 'Healthcare Website Design Case Study: Clinic Website by TekGemm Studio';
const DESC = 'A healthcare website built by TekGemm Studio: appointment requests, doctor pages, staff admin, accessible forms. Oakline is a fictional portfolio clinic.';
export const metadata = pageMeta({ title: TITLE, description: DESC, path: '/case-study/', image: '/images/case-study-og.png' });

const FAQS = [
  { q: 'How much does a clinic or medical practice website cost?', a: 'It depends on the number of pages, the booking flow and any integrations. TekGemm Studio scopes each healthcare website after a short conversation, so the quote matches what your practice needs. Contact the studio for a quote.' },
  { q: 'How long does a healthcare website take to build?', a: 'A focused clinic website with department pages, doctor profiles and an appointment request flow is usually a matter of weeks, not months. Timelines depend on how quickly content and approvals arrive.' },
  { q: 'Can the website take appointment requests?', a: 'Yes. This case study shows a request flow where patients choose a department, a doctor and a time, and staff confirm. It collects no symptoms and takes no payment.' },
  { q: 'Is the website accessible?', a: 'Accessibility is part of the design from the start: contrast, visible focus, large touch targets, labeled forms, a skip link and respect for reduced motion. The measured scores are listed on this page.' },
  { q: 'Will it work well on phones?', a: 'Yes. The layout is designed for small screens first, with a menu, one-tap phone and request buttons, and no horizontal scrolling.' },
  { q: 'Is Oakline a real clinic?', a: 'No. Oakline Medical Group is a fictional clinic created as a portfolio project to show what TekGemm Studio can build for real clinics.' },
];

const m = metrics as { measured: boolean; date: string; target: string; scores: { page: string; seo: number; accessibility: number; bestPractices: number; performance: number; lcp: string; cls: string; tbt: string }[] };

export default function Page() {
  const url = `${SITE_URL}/case-study/`;
  const graph = [
    { '@context': 'https://schema.org', '@type': 'CreativeWork', name: 'Oakline Medical Group website (portfolio project)', url, description: DESC, creator: { '@id': `${SITE_URL}/#person` }, publisher: { '@id': `${SITE_URL}/#org` }, about: 'Healthcare website design and development', inLanguage: 'en-US', image: `${SITE_URL}/images/case-study-og.png` },
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: STUDIO.name, url: STUDIO.url, sameAs: [STUDIO.url, PERSON.url], founder: { '@id': `${SITE_URL}/#person` } },
    { '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#person`, name: PERSON.name, url: PERSON.url, jobTitle: 'Web designer and developer', worksFor: { '@id': `${SITE_URL}/#org` }, sameAs: [PERSON.url, STUDIO.url] },
    faqSchema(FAQS),
  ];
  return (
    <>
      <JsonLd data={graph} />
      <section className="sec t-cream pg bgi" style={{ '--bgi': bg('bg-silk-1'), '--bgo': 0.45 } as React.CSSProperties}>
        <div className="wrap">
          <Crumbs items={[{ name: 'Case study' }]} />
          <div className="cs-hero">
            <div>
              <p className="eyebrow">Case study</p>
              <h1 style={{ fontSize: 'clamp(34px,7vw,64px)', marginBottom: 16 }}>A healthcare website, designed and built by TekGemm Studio</h1>
              <p className="lede">A complete clinic website: appointment requests, department pages, doctor profiles, a staff admin with a dashboard, health resources and accessible forms. Designed and built by <a href={PERSON.url} target="_blank" rel="noopener">{PERSON.name}</a> at <a href={STUDIO.url} target="_blank" rel="noopener">{STUDIO.name}</a>.</p>
              <div className="row">
                <a className="btn" href={STUDIO.url} target="_blank" rel="noopener">Contact TekGemm Studio <Icon n="ext" /></a>
                <Link className="btn ghost" href="/">Explore the Oakline website</Link>
              </div>
              <p className="cta-note"><b>Oakline Medical Group is a fictional clinic</b> created as a portfolio project. No real patients, doctors or reviews appear on it.</p>
            </div>
            <div className="shot rv"><img src="/images/case-home.webp" width={1280} height={800} alt="Screenshot of the Oakline Medical Group home page on desktop" fetchPriority="high" /></div>
          </div>
        </div>
      </section>

      <section className="sec t-off">
        <div className="wrap">
          <p className="eyebrow">Who built it</p>
          <h2 className="rv">One designer and developer, from idea to launch</h2>
          <p className="lede rv"><a href={PERSON.url} target="_blank" rel="noopener">{PERSON.name}</a> designs and builds websites for clinics, medical practices and healthcare businesses through <a href={STUDIO.url} target="_blank" rel="noopener">{STUDIO.name}</a>. This project shows the full range: brand, design, content structure, accessible interaction and fast delivery.</p>
          <div className="grid3" style={{ marginTop: 18 }}>
            <div className="card rv"><h3>The problem</h3><p>Patients want connected care, an easy way to ask for a visit and a site that works for everyone, on any phone, in a few seconds. Clinics also need staff to manage those requests without extra software.</p></div>
            <div className="card cr rv"><h3>The approach</h3><p>One team feel across six departments, a request flow that never asks for symptoms or payment, and a calm, readable design that stays out of the way.</p></div>
            <div className="card cb rv"><h3>The result</h3><p>A fast, accessible site with a working request flow, a staff admin and a dashboard. Everything runs in the browser, so it is simple to host and cheap to run.</p><Blob /></div>
          </div>
        </div>
      </section>

      <section className="sec t-blue">
        <div className="wrap">
          <p className="eyebrow">Design decisions</p>
          <h2 className="rv">Warm, clear and easy to read</h2>
          <div className="grid2">
            <div className="card rv"><h3>Palette and type</h3><p>Cobalt for trust, tangerine for warmth, cream and soft blue for calm. Large, readable type with a hyperlegible body font. Cards use soft shadows and gradients instead of outlines.</p></div>
            <div className="card rv"><h3>Motion with purpose</h3><p>Content rises into view as you scroll, photos settle into place and rings turn slowly. It all respects reduced motion settings, and content is never hidden if scripts do not run.</p></div>
            <div className="card rv"><h3>Accessibility first</h3><p>Visible focus, a skip link, labeled forms with clear error messages, 44 pixel touch targets and accessible accordions. Designed to the WCAG 2.2 AA level.</p></div>
            <div className="card rv"><h3>Mobile first</h3><p>A hamburger menu, one-tap phone and request buttons, and layouts that never scroll sideways. Patients can reach the phone, a department and the request form in one tap.</p></div>
          </div>
        </div>
      </section>

      <section className="sec t-cream">
        <div className="wrap">
          <p className="eyebrow">What was built</p>
          <h2 className="rv">A complete clinic website</h2>
          <ul className="sched" style={{ marginTop: 14 }}>
            {['Appointment request flow with a calendar, slot picker, save and resume, confirmation reference and calendar download', 'Request lookup to check status, reschedule or cancel', 'Six department pages from one template, each with services, doctors and FAQs', 'Doctor directory with filters and profile pages', 'Staff admin: requests table with search, filters, sorting, bulk actions, notes and CSV export', 'Dashboard with live charts built as inline SVG', 'Health resources with search, category and tag filters and full articles', 'Accessible contact form with a staff inbox', 'First visit guide, insurance and billing page, privacy and terms'].map((x) => <li key={x} className="rv" style={{ background: 'var(--off)', boxShadow: 'var(--sh)', borderRadius: 16, justifyContent: 'flex-start', gap: 10 }}><Icon n="check" size={22} />{x}</li>)}
          </ul>
          <div className="shots">
            <figure className="shot rv"><img src="/images/case-booking.webp" width={1280} height={800} loading="lazy" alt="Screenshot of the appointment request flow on desktop" /><figcaption>The appointment request flow.</figcaption></figure>
            <figure className="shot rv"><img src="/images/case-mobile.webp" width={390} height={844} loading="lazy" alt="Screenshot of the home page on a phone" /><figcaption>The home page on a phone.</figcaption></figure>
            <figure className="shot rv" style={{ gridColumn: '1/-1' }}><img src="/images/case-admin.webp" width={1280} height={800} loading="lazy" alt="Screenshot of the staff dashboard with charts" /><figcaption>The staff dashboard.</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="sec t-off">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Technical approach</p>
            <h2 className="rv">Static, fast and ready for search</h2>
            <p>The site is built with Next.js and TypeScript and published as static files, so pages load quickly and there is no server to maintain. Data sits behind a clean repository layer, so a real database and email service can be added later without changing the screens. Images are prepared at several sizes in modern formats, fonts are self-hosted, and no third-party scripts run.</p>
            <p style={{ marginTop: 10 }}>Pages carry structured data, unique titles and descriptions, a sitemap and clear internal links.</p>
          </div>
          <div className="card">
            <h2 style={{ fontSize: 24 }}>Measured outcomes</h2>
            {m.measured ? (
              <>
                <p className="help" style={{ margin: '6px 0 10px' }}>Lighthouse results from the live site, recorded {m.date}. {m.target}</p>
                <div className="tblwrap" style={{ boxShadow: 'none' }} tabIndex={0} role="region" aria-label="Lighthouse results. Scroll sideways on small screens.">
                  <table className="dtable"><thead><tr><th scope="col">Page</th><th scope="col">SEO</th><th scope="col">Accessibility</th><th scope="col">Best practices</th><th scope="col">Mobile performance</th><th scope="col">LCP</th><th scope="col">CLS</th></tr></thead>
                    <tbody>{m.scores.map((s) => <tr key={s.page}><th scope="row">{s.page}</th><td>{s.seo}</td><td>{s.accessibility}</td><td>{s.bestPractices}</td><td>{s.performance}</td><td>{s.lcp}</td><td>{s.cls}</td></tr>)}</tbody></table>
                </div>
              </>
            ) : <p style={{ marginTop: 8 }}>Scores are recorded from the live site after each release.</p>}
            <p className="help" style={{ marginTop: 10 }}>These are lab measurements from the live build. They are not claims about any client.</p>
          </div>
        </div>
      </section>

      <section className="sec t-cream">
        <div className="wrap faqw">
          <div><p className="eyebrow">Questions</p><h2 className="rv">Hiring a healthcare web developer</h2><p className="lede rv">Short answers for clinic owners, practice managers and healthcare startups.</p></div>
          <Faq items={FAQS} openFirst />
        </div>
      </section>

      <section className="sec t-cobalt">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <h2 className="rv">Need a website for your clinic or practice?</h2>
          <p className="lede" style={{ margin: '0 auto' }}>Talk to {STUDIO.name} about a fast, accessible website with booking that fits your practice.</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <a className="btn warm" href={STUDIO.url} target="_blank" rel="noopener">Contact TekGemm Studio <Icon n="ext" /></a>
            <a className="btn ghost" href={PERSON.url} target="_blank" rel="noopener">Marvel&apos;s portfolio</a>
          </div>
        </div>
      </section>
    </>
  );
}
