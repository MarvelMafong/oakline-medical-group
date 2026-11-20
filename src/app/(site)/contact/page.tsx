import { SITE } from '@/data/site';
import { Icon } from '@/components/Sprite';
import { ContactForm } from '@/components/ContactForm';
import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { bg } from '@/components/Img';

export const metadata = pageMeta({ title: 'Contact and Location | Oakline Medical Group', description: 'Phone, hours and location for Oakline Medical Group in Sandy Springs, Georgia, plus a contact form.', path: '/contact/' });

const HOURS = [['Monday to Friday', '8 AM to 5 PM'], ['Saturday', 'Closed'], ['Sunday', 'Closed']];

export default function Page() {
  return (
    <section className="sec t-blue pg bgi" style={{ '--bgi': bg('bg-dna'), '--bgo': 0.14 } as React.CSSProperties}>
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Contact' }]} />
        <p className="eyebrow">Contact and location</p>
        <h1>We&apos;re here when you need us</h1>
        <p className="lede">Call, send a message or stop by. For an emergency, call 911.</p>
        <div className="flowgrid">
          <div className="grid2" style={{ alignContent: 'start' }}>
            <div className="card rv" style={{ gridColumn: '1/-1' }}>
              <div className="fact"><Icon n="phone" /><div><b><a href={`tel:${SITE.tel}`}>{SITE.phone}</a></b><br />Our front desk is glad to help.</div></div>
              <div className="fact" style={{ marginTop: 12 }}><Icon n="pin" /><div><b>{SITE.address[0]}<br />{SITE.address[1]}</b><br />{SITE.addressLine}</div></div>
            </div>
            <div className="card cr rv" style={{ gridColumn: '1/-1' }}>
              <div className="fact"><Icon n="clock" /><div style={{ width: '100%' }}><b>Hours</b>
                <dl className="dd" style={{ marginTop: 6 }}>{HOURS.map(([d, h]) => <><dt key={d}>{d}</dt><dd key={h + d}>{h}</dd></>)}</dl></div></div>
            </div>
            <div className="card cb rv" style={{ gridColumn: '1/-1' }}>
              <h2 style={{ fontSize: 22 }}>Getting here</h2>
              <p style={{ marginTop: 6 }}>Free parking is next to the building, with accessible spaces at the main entrance. Drop-off is under the canopy at the front door. We are in Suite 200.</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
