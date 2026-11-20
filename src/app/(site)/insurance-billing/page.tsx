import Link from 'next/link';
import { SITE } from '@/data/site';
import { Icon } from '@/components/Sprite';
import { Faq, faqSchema } from '@/components/Faq';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { bg } from '@/components/Img';

export const metadata = pageMeta({ title: 'Insurance and Billing | Oakline Medical Group', description: 'How insurance and billing work at Oakline: coverage, estimates, statements and who to call with questions.', path: '/insurance-billing/' });

const FAQS = [
  { q: 'Do you accept my insurance?', a: `We work with many commercial plans, Medicare and self-pay patients. Plan participation changes, so please call ${SITE.phone} to confirm your coverage before your visit.` },
  { q: 'Can I get an estimate before my visit?', a: 'Yes. Call the front desk with your plan details and the department you plan to visit, and staff will explain what to expect.' },
  { q: 'When will I receive a statement?', a: 'After your insurer has processed the claim. Statements list each service so you can read them line by line.' },
  { q: 'Can I pay on this website?', a: 'No. This website never takes payment. Payments are handled with our billing team by phone or at the front desk.' },
  { q: 'What if I have trouble paying?', a: 'Please call us. Our billing team will talk through options with you in a respectful way.' },
  { q: 'Do I need a referral?', a: 'Some plans ask for a referral for specialist visits. Check with your insurer, or call us and we will help you find out.' },
];

export default function Page() {
  return (
    <>
      <section className="sec t-cream pg bgi" style={{ '--bgi': bg('bg-silk-2'), '--bgo': 0.3 } as React.CSSProperties}>
        <div className="wrap pagehead">
          <Crumbs items={[{ name: 'Insurance and Billing' }]} />
          <p className="eyebrow">Insurance and billing</p>
          <h1>Clear answers about coverage and costs</h1>
          <p className="lede">Please confirm your coverage by phone before your visit. Plans change, and a short call avoids surprises.</p>
          <div className="row"><a className="btn" href={`tel:${SITE.tel}`}><Icon n="phone" />Call {SITE.phone}</a><Link className="btn ghost" href="/contact/">Send a message</Link></div>
        </div>
      </section>
      <section className="sec t-off">
        <div className="wrap grid3">
          <div className="card rv"><Icon n="shield" size={30} /><h3 style={{ marginTop: 8 }}>Coverage</h3><p>We work with many commercial plans and Medicare, and we welcome self-pay patients. Bring your insurance card to every visit.</p></div>
          <div className="card cr rv"><Icon n="list" size={30} /><h3 style={{ marginTop: 8 }}>Estimates</h3><p>Call before your visit for a plain-language estimate. We will explain what your plan may cover and what you may owe.</p></div>
          <div className="card cb rv"><Icon n="mail" size={30} /><h3 style={{ marginTop: 8 }}>Statements</h3><p>Statements show each service. If anything is unclear, our billing team is glad to walk through it with you.</p></div>
        </div>
      </section>
      <section className="sec t-blue">
        <div className="wrap faqw"><div><p className="eyebrow">Questions</p><h2 className="rv">Insurance and billing questions</h2><p className="lede rv">This page is general information. It does not guarantee coverage or cost.</p></div><Faq items={FAQS} openFirst /><JsonLd data={faqSchema(FAQS)} /></div>
      </section>
    </>
  );
}
