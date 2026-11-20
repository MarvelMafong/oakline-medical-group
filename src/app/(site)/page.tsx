import Link from 'next/link';
import { DEPTS, DOCS, SITE } from '@/data/site';
import { ARTICLES } from '@/data/articles';
import { Img, bg } from '@/components/Img';
import { Icon } from '@/components/Sprite';
import { Blob } from '@/components/Blob';
import { Arrow } from '@/components/Arrow';
import { Faq } from '@/components/Faq';
import { QuickRequest } from '@/components/QuickRequest';
import { pageMeta, JsonLd } from '@/components/seo';

export const metadata = pageMeta({
  title: 'Primary Care and More in Sandy Springs, GA | Oakline Medical Group',
  description: 'Approachable, coordinated outpatient care in Sandy Springs, Georgia. Request an appointment with Oakline Medical Group, a fictional clinic.',
  path: '/',
});

const SB = (n: string, o: number) => ({ '--bgi': bg(n), '--bgo': o }) as React.CSSProperties;
const HERO_WORDS = ['Your', 'health', 'deserves', 'connected', 'care.'];
const JOURNEY = [
  { n: '01', t: 'Send a request', p: 'Pick a department and a time that suits you. It takes about a minute.', img: 'stage-working-adults', alt: 'Two adults talking with a smiling doctor at a desk' },
  { n: '02', t: 'We call to confirm', p: 'Our staff confirm a time or suggest another. A request is not a confirmed appointment.', img: 'gallery-reception', alt: 'A bright reception desk with pale blue chairs' },
  { n: '03', t: 'Arrive', p: 'Bring a photo ID and your insurance card, and plan to arrive a little early.', img: 'gallery-open-lobby', alt: 'A tall white lobby filled with daylight' },
  { n: '04', t: 'Meet your team', p: 'Your doctor listens first, then talks through a plan in plain language.', img: 'team-hallway', alt: 'Doctors and nurses talking together in a bright hallway' },
  { n: '05', t: 'Stay connected', p: 'If you need another department, we connect you, so you do not start over.', img: 'team-blue-scrubs', alt: 'Five smiling clinicians standing together' },
];
const GALLERY = [
  ['gallery-reception', 'A bright reception area with a curved white desk and pale blue chairs', 'Reception and waiting'],
  ['gallery-consultation-room', 'A consultation room with light wood cabinets, a desk and a blue exam couch', 'Consultation room'],
  ['gallery-open-lobby', 'A tall white lobby flooded with daylight and potted plants', 'Open lobby'],
  ['gallery-corridor', 'A long bright corridor with teal accents and a curved ceiling', 'Light-filled corridor'],
  ['gallery-quiet-room', 'A quiet room with warm wood chairs, soft light and tall windows', 'Quiet room'],
];
const HFAQ = [
  { q: 'How do I request an appointment?', a: `Use the form on this page or call ${SITE.phone}. Our staff confirm your time with you. A request is not a confirmed appointment.` },
  { q: 'Do I need to share symptoms or medical history online?', a: 'No. The form only asks for a department, a preferred time, your name and your phone number.' },
  { q: 'What should I bring to my first visit?', a: 'A photo ID, your insurance card and a list of the medicines you take.' },
  { q: 'Do you accept my insurance?', a: 'Accepted plans are listed on our Insurance and Billing page. Please confirm your coverage by phone before your visit.' },
  { q: 'Can I ask for a specific doctor?', a: 'Yes. Choose a doctor in the full request flow, or mention the doctor when we call to confirm.' },
  { q: 'What if I need more than one department?', a: 'We help arrange the next step and keep your care connected, so you do not start over.' },
];
const Tall = ({ s }: { s: (typeof DEPTS)[number] }) => <Img name={s.img} alt="" sizes="(min-width:820px) 33vw, 92vw" />;
const alts: Record<string, string> = {
  'primary-care': 'A doctor fitting a blood pressure cuff on a patient in a bright office', 'womens-health': 'A nurse in teal scrubs holding a clipboard in a bright clinic corridor',
  pediatrics: 'A mother and her daughter with a doctor using a stethoscope', cardiology: 'A cardiologist in a white coat holding a small red heart',
  dermatology: "A dermatologist gently examining a patient's skin in a bright treatment room", diagnostics: 'A technologist guiding a patient into a CT scanner in a bright imaging room',
};

export default function Home() {
  const [pc, ...rest] = DEPTS;
  const lead = DOCS.filter((d) => ['jordan-ellis', 'sam-rivera', 'casey-morgan'].includes(d.slug));
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebSite', name: 'Oakline Medical Group', url: 'https://oakline-medical-group-zeta.vercel.app/', description: 'A fictional clinic website built as a portfolio project by TekGemm Studio.' }} />
      <section className="sec t-cream hero bgi" style={SB('bg-silk-1', 0.45)}>
        <div className="wrap">
          <div className="hero2">
            <div>
              <p className="eyebrow rise" style={{ '--d': '0s' } as React.CSSProperties}>Sandy Springs, Georgia</p>
              <h1>{HERO_WORDS.map((w, i) => <span key={w}>{i === 3 ? <em><span className="w" style={{ '--i': i } as React.CSSProperties}>{w}</span></em> : <span className="w" style={{ '--i': i } as React.CSSProperties}>{w}</span>}{' '}</span>)}</h1>
              <p className="lede rise" style={{ '--d': '.7s' } as React.CSSProperties}>Explore approachable, coordinated healthcare for every stage of life at Oakline Medical Group in Sandy Springs, Georgia.</p>
              <div className="row rise" style={{ '--d': '.85s' } as React.CSSProperties}>
                <Link className="btn" href="/appointments/">Request an Appointment <Icon n="arrow" /></Link>
                <Link className="btn ghost" href="/departments/">Explore Our Departments</Link>
              </div>
            </div>
            <div className="loops">
              <figure className="lp a"><Img name="hero-consultation" eager sizes="(min-width:900px) 360px, 70vw" alt="A doctor in a white coat clasping hands with a laughing patient seated on an exam table" /></figure>
              <svg className="lring ra" viewBox="0 0 520 546" aria-hidden="true"><ellipse className="dr" pathLength={1} cx="182" cy="224" rx="192" ry="234" fill="none" stroke="#2448B8" strokeWidth="3.5" /></svg>
              <figure className="lp b"><Img name="hero-care-team" eager sizes="(min-width:900px) 270px, 52vw" alt="A pediatrician listening to a baby's heartbeat while the baby's mother smiles" /></figure>
              <svg className="lring rb" viewBox="0 0 520 546" aria-hidden="true"><ellipse className="dr d2" pathLength={1} cx="385" cy="382" rx="144" ry="174" fill="none" stroke="#F28A45" strokeWidth="3.5" /><g style={{ animation: 'spin 40s linear infinite', transformOrigin: '385px 382px' }}><circle cx="241" cy="382" r="8" fill="#F28A45" /></g></svg>
              <div className="badge"><Icon n="cal" /><span><b>Let&apos;s find a time that works for you.</b></span></div>
            </div>
          </div>
          <div className="quick">
            <a className="qa" href={`tel:${SITE.tel}`}><Icon n="phone" /><div><b>Call {SITE.phone}</b><span>Speak with our front desk</span></div></a>
            <Link className="qa" href="/departments/"><Icon n="user" /><div><b>Find a department</b><span>Six departments, one team</span></div></Link>
            <Link className="qa" href="/appointments/"><Icon n="cal" /><div><b>Request a time</b><span>Our staff will confirm</span></div></Link>
          </div>
        </div>
      </section>

      <section className="sec t-off bgi" id="departments" style={SB('bg-leaf', 0.75)}>
        <div className="wrap">
          <p className="eyebrow">Our departments</p>
          <h2>Healthcare that works together</h2>
          <p className="lede">Six departments under one roof, sharing one team approach, so the people caring for you stay connected.</p>
          <div className="bento">
            <Link className="dc pc rv" href={`/departments/${pc.slug}/`}><div className="dph tall"><Img name={pc.img} alt={alts[pc.slug]} sizes="(min-width:820px) 66vw, 92vw" /></div><h3>{pc.name}</h3><p>Everyday health, checkups and a team that knows your story. Primary care in Sandy Springs, GA, with a direct line to every other department.</p><span className="more">View department <Icon n="arrow" /></span><div className="chips" aria-label="Connected departments">{pc.connects.map((c) => <span key={c}>{c}</span>)}</div></Link>
            {rest.map((d) => {
              const colored = ['wh', 'dm', 'dx'].includes(d.card);
              const rings = d.card === 'wh' ? ['var(--cream)', 'var(--tang)'] : d.card === 'dm' ? ['var(--cobalt)', 'var(--cream)'] : ['var(--cobalt)', 'var(--tang)'];
              const blurb: Record<string, string> = { 'womens-health': 'Care that fits each season of life.', pediatrics: 'Friendly visits for growing families.', cardiology: 'Heart care, explained plainly.', dermatology: 'Skin care from first concern to follow up.', diagnostics: 'Tests and imaging coordinated with your team.' };
              return (
                <Link key={d.slug} className={`dc ${d.card} rv${colored ? ' ph2' : ''}`} href={`/departments/${d.slug}/`}>
                  <div className={`dph${d.card === 'cd' ? ' top' : ''}${d.card === 'dx' ? ' dg' : ''}`}><Img name={d.img} alt={alts[d.slug]} sizes="(min-width:820px) 33vw, 92vw" style={d.imgPos ? { objectPosition: d.imgPos } : undefined} /></div>
                  {colored && <Blob a={rings[0]} b={rings[1]} />}
                  <h3>{d.name}</h3><p>{blurb[d.slug]}</p><span className="more">View department <Icon n="arrow" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec t-cobalt bgi" id="promise" style={SB('bg-dna-molecule', 0.3)}>
        <div className="wrap">
          <p className="eyebrow">What we build around</p>
          <h2 className="rv">Care that connects every stage of life</h2>
          <div className="prom">
            <div className="pr rv"><span className="big" aria-hidden="true">1</span><h3>One team, six departments</h3><p>Your care stays linked, so you never have to repeat yourself.</p></div>
            <div className="pr rv"><span className="big" aria-hidden="true">2</span><h3>A request, not a hurdle</h3><p>Ask for a time in about a minute. Our staff confirm it with you by phone.</p></div>
            <div className="pr rv"><span className="big" aria-hidden="true">3</span><h3>Plain words</h3><p>We explain things clearly and leave room for your questions.</p></div>
          </div>
        </div>
      </section>

      <section className="sec t-blue bgi" id="stages" style={SB('bg-atrium', 0.55)}>
        <div className="wrap">
          <p className="eyebrow">Every stage of life</p>
          <h2 className="rv">One team as your needs change</h2>
          <p className="lede rv">Your family can start in one department and be connected to another without starting over. Meet the people behind your care.</p>
          <div className="stages">
            <div className="sc s1 rv"><Img name="stage-parents-and-children" alt="A pediatrician checking a baby while the mother looks on and smiles" sizes="(min-width:820px) 33vw, 92vw" /><div className="cap2"><b>Parents and children</b><span>Pediatrics and Primary Care, together</span></div></div>
            <div className="sc s2 rv"><Img name="stage-working-adults" alt="A smiling doctor explaining results to two adults at a white desk" sizes="(min-width:820px) 33vw, 92vw" /><div className="cap2"><b>Working adults</b><span>Visits that respect your schedule</span></div></div>
            <div className="sc s3 rv"><Img name="stage-older-adults" alt="A doctor with a hand on an older patient's shoulder while a nurse smiles with a clipboard" sizes="(min-width:820px) 33vw, 92vw" /><div className="cap2"><b>Established adults and older patients</b><span>Large print, clear contact, unhurried time</span></div></div>
          </div>
        </div>
      </section>

      <section className="sec t-cream bgi" id="journey" style={SB('bg-paper', 0.32)}>
        <div className="wrap"><p className="eyebrow">Your first visit</p><h2 className="rv">Here is what the day looks like</h2><p className="lede rv">Swipe sideways through each step, from the first request to the follow up.</p></div>
        <div className="hs" tabIndex={0} role="region" aria-label="First visit steps. Scroll sideways.">
          <ol className="trk">{JOURNEY.map((j, i) => <li key={j.n} className={`jc c${i + 1}${i === 0 ? ' rv' : ''}`}><Img name={j.img} alt={j.alt} sizes="300px" /><span className="jn">{j.n}</span><h3>{j.t}</h3><p>{j.p}</p><Blob a="var(--cream)" b={i === 1 ? 'var(--cobalt)' : 'var(--tang)'} /></li>)}</ol>
        </div>
        <ScrollCtl />
      </section>

      <section className="sec t-cream bgi" id="how" style={SB('bg-silk-2', 0.3)}>
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2 className="rv">Let&apos;s find a time that works for you</h2>
          <div className="steps">
            <div className="step rv"><div className="n">1</div><div><h3>Send a request</h3><p>Choose a department, an optional doctor and a time. No symptoms or medical history needed.</p></div></div>
            <div className="step rv"><div className="n">2</div><div><h3>We confirm</h3><p>Our staff reply to confirm a time or suggest another. A request is not a confirmed appointment.</p></div></div>
            <div className="step rv"><div className="n">3</div><div><h3>Your team connects</h3><p>Your care stays linked across departments, so you do not repeat yourself.</p></div></div>
          </div>
        </div>
      </section>

      <section className="sec t-off bgi" id="people" style={SB('bg-capsule', 0.4)}>
        <div className="wrap">
          <p className="eyebrow">Our people</p>
          <h2 className="rv">Meet the people behind your care</h2>
          <div className="people">
            {lead.map((d, i) => <article key={d.slug} className="pp rv"><div className={`pimg c${i + 1}`}><Img name={d.img} alt={`Portrait of ${d.name}`} sizes="(min-width:820px) 30vw, 92vw" /></div><h3>{d.name}</h3><p>{DEPTS.find((x) => x.slug === d.dept)?.name}</p><Link className="tlink" href={`/doctors/${d.slug}/`}>View profile</Link></article>)}
          </div>
          <figure className="team rv"><Img name="team-hallway" alt="Doctors and nurses talking together in a bright hallway" sizes="(min-width:820px) 1100px, 92vw" /><figcaption><b>One team behind every visit</b><span>Doctors, nurses and staff, working as one.</span></figcaption><Blob /></figure>
        </div>
      </section>

      <section className="sec t-blue" id="inside">
        <div className="wrap"><p className="eyebrow">Inside Oakline</p><h2 className="rv">Rooms made for unhurried visits</h2><p className="lede rv">Calm light, clear signs and room to breathe.</p></div>
        <div className="hs gal" tabIndex={0} role="region" aria-label="Photo gallery. Scroll sideways.">
          <ul className="trk">{GALLERY.map(([n, a, c], i) => <li key={n} className={`gc g${i + 1}${i === 0 ? ' rv' : ''}`}><Img name={n} alt={a} sizes="440px" /><span>{c}</span></li>)}</ul>
        </div>
        <ScrollCtl />
      </section>

      <section className="sec t-off bgi" id="resources" style={SB('bg-stethoscope', 0.45)}>
        <div className="wrap"><p className="eyebrow">Health resources</p><h2 className="rv">Helpful reading, in plain words</h2><p className="lede rv">General guidance to help you prepare. It never replaces advice from your own doctor.</p>
          <div className="rgrid">{ARTICLES.slice(0, 3).map((a) => <Link key={a.slug} className="rc rv" href={`/resources/${a.slug}/`}><div className="rph"><Img name={a.img} alt="" sizes="(min-width:820px) 33vw, 92vw" /></div><span className="tag">{a.category}</span><h3>{a.title}</h3><span className="more">Read article <Arrow /></span></Link>)}</div>
          <p style={{ marginTop: 18 }}><Link className="tlink" href="/resources/">Browse all health resources</Link></p>
        </div>
      </section>

      <section className="sec t-cream bgi" id="faq" style={SB('bg-leaf', 0.7)}>
        <div className="wrap faqw"><div><p className="eyebrow">Questions</p><h2 className="rv">Good to know before you call</h2><p className="lede rv">Short answers to what people ask us most.</p></div><Faq items={HFAQ} openFirst /></div>
        <JsonLd data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: HFAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }} />
      </section>

      <section className="sec t-blue bgi" id="visit" style={SB('bg-dna', 0.14)}>
        <div className="wrap">
          <p className="eyebrow">Plan your visit</p>
          <h2 className="rv">We&apos;re here when you need us</h2>
          <figure className="wide rv"><Img name="visit-clinic-space" alt="A bright reception area with a curved white desk and pale blue waiting chairs" sizes="(min-width:820px) 1100px, 92vw" /><figcaption>Central Perimeter, Sandy Springs</figcaption></figure>
          <div className="duo">
            <div className="panel">
              <div className="fact"><Icon n="pin" /><div><b>{SITE.addressLine}</b><br />Full address shown on the <Link href="/contact/">Contact page</Link>.</div></div>
              <div className="fact"><Icon n="clock" /><div><b>{SITE.hours}</b></div></div>
              <div className="fact"><Icon n="phone" /><div><b><a href={`tel:${SITE.tel}`}>{SITE.phone}</a></b><br />Our front desk is glad to help.</div></div>
            </div>
            <div className="panel" style={{ background: 'var(--cream)' }}>
              <div className="fact"><Icon n="shield" /><div><b>Insurance</b><br />Accepted plans are displayed on the <Link href="/insurance-billing/">Insurance and Billing page</Link>, with a note to confirm your coverage by phone before your visit.</div></div>
              <Link className="btn ghost" href="/appointments/" style={{ justifySelf: 'start' }}>Request an Appointment</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec t-cream bgi" id="request" style={SB('bg-paper', 0.32)}>
        <div className="wrap">
          <p className="eyebrow">Request an appointment</p>
          <h2>Tell us what works for you</h2>
          <QuickRequest />
        </div>
      </section>
    </>
  );
}

function ScrollCtl() {
  return (
    <div className="wrap"><div className="hctl"><div className="hbar" aria-hidden="true"><i /></div><div className="hbtns">
      <button type="button" className="hb" data-dir="-1" aria-label="Previous"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      <button type="button" className="hb" data-dir="1" aria-label="Next"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    </div></div></div>
  );
}
