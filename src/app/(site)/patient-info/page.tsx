import Link from 'next/link';
import { SITE } from '@/data/site';
import { Icon } from '@/components/Sprite';
import { Faq, faqSchema } from '@/components/Faq';
import { pageMeta, JsonLd } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { bg } from '@/components/Img';

export const metadata = pageMeta({ title: 'Patient Info: Your First Visit | Oakline Medical Group', description: 'A first visit guide: what to bring, accessibility, parking and directions, and answers to common questions.', path: '/patient-info/' });

const FAQS = [
  { q: 'How do I request an appointment?', a: `Use the request form online or call ${SITE.phone}. Our staff confirm your time with you. A request is not a confirmed appointment.` },
  { q: 'How early should I arrive?', a: 'About ten minutes before your confirmed time, so check-in is relaxed.' },
  { q: 'Can I bring someone with me?', a: 'Yes. Friends, family and caregivers are welcome in the waiting room and, if you wish, in the visit.' },
  { q: 'Can I get an interpreter?', a: 'Yes. Tell our staff which language you prefer when we call to confirm and we will arrange an interpreter.' },
  { q: 'What if I need to cancel or move my visit?', a: 'Use Check a request with your reference and last name, or call the front desk. Giving notice frees the time for someone else.' },
  { q: 'Is this site for emergencies?', a: 'No. If you think you are having a medical emergency, call 911.' },
];
const BRING = ['A photo ID', 'Your insurance card', 'A list of the medicines you take, with doses', 'Names of other doctors you see, if you know them', 'Two or three questions you would like answered'];

export default function Page() {
  return (
    <>
      <section className="sec t-cream pg bgi" style={{ '--bgi': bg('bg-paper'), '--bgo': 0.32 } as React.CSSProperties}>
        <div className="wrap pagehead">
          <Crumbs items={[{ name: 'Patient Info' }]} />
          <p className="eyebrow">Your first visit</p>
          <h1>Here is what the day looks like</h1>
          <p className="lede">From the first request to the follow up, a short guide to your visit.</p>
          <div className="steps">
            {[['Send a request', 'Pick a department and a time that suits you.'], ['We call to confirm', 'Staff confirm a time or suggest another.'], ['Arrive', 'Check in about ten minutes early.']].map(([t, p], i) => <div key={t} className="step rv"><div className="n">{i + 1}</div><div><h3>{t}</h3><p>{p}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="sec t-off">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div className="card rv"><h2 style={{ fontSize: 26 }}>What to bring</h2><ul className="sched" style={{ marginTop: 12 }}>{BRING.map((b) => <li key={b} style={{ justifyContent: 'flex-start', gap: 10 }}><Icon n="check" size={22} />{b}</li>)}</ul></div>
          <div className="card cr rv"><h2 style={{ fontSize: 26 }}>Accessibility</h2><ul className="sched" style={{ marginTop: 12 }}>{['Step-free entrance and wide doors', 'Accessible exam rooms and restrooms', 'Interpreters on request, including sign language', 'Large print and plain-language materials', 'Quiet room for anyone who needs a calm space', 'Service animals welcome'].map((b) => <li key={b} style={{ justifyContent: 'flex-start', gap: 10, background: 'var(--off)' }}><Icon n="check" size={22} />{b}</li>)}</ul></div>
        </div>
      </section>
      <section className="sec t-blue">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div className="card rv"><h2 style={{ fontSize: 26 }}>Parking and directions</h2>
            <div className="fact" style={{ marginTop: 12 }}><Icon n="pin" /><div><b>{SITE.address[0]}<br />{SITE.address[1]}</b><br />{SITE.addressLine}</div></div>
            <ul style={{ margin: '12px 0 0 20px' }}><li>Free parking is next to the building, with accessible spaces at the main entrance.</li><li>Drop-off is at the front door, under the canopy.</li><li>From the Central Perimeter area, follow signs for Oakline Plaza and look for Suite 200.</li></ul>
            <p className="note" style={{ marginTop: 10 }}>See the <Link href="/contact/">Contact and location page</Link> for hours and phone.</p></div>
          <div><p className="eyebrow">Questions</p><h2 className="rv">Good to know before you come</h2><Faq items={FAQS} openFirst /><JsonLd data={faqSchema(FAQS)} /></div>
        </div>
      </section>
      <section className="sec t-cobalt"><div className="wrap" style={{ textAlign: 'center' }}><h2 className="rv">Ready when you are</h2><div className="row" style={{ justifyContent: 'center' }}><Link className="btn warm" href="/appointments/">Request an Appointment <Icon n="arrow" /></Link></div></div></section>
    </>
  );
}
