import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Icon } from '@/components/Sprite';
import { DEPTS } from '@/data/site';
import { bg } from '@/components/Img';

export const metadata = { title: 'Page not found | Oakline Medical Group', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <div className="frame" id="top">
      <Header />
      <main id="main" tabIndex={-1}>
        <section className="sec t-cream pg bgi not-found" style={{ '--bgi': bg('bg-silk-2'), '--bgo': 0.4 } as React.CSSProperties}>
          <div className="wrap">
            <p className="eyebrow">Error 404</p>
            <h1 style={{ fontSize: 'clamp(40px,9vw,80px)', marginBottom: 14 }}>We could not find that page</h1>
            <p className="lede">The link may be old or mistyped. Here are some good places to go next.</p>
            <div className="row"><Link className="btn" href="/">Back to Home <Icon n="arrow" /></Link><Link className="btn ghost" href="/appointments/">Request an Appointment</Link></div>
            <div className="tags" style={{ marginTop: 22 }}>{DEPTS.map((d) => <Link className="chip" key={d.slug} href={`/departments/${d.slug}/`}>{d.name}</Link>)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
