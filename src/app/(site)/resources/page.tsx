import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { ResourceIndex } from '@/components/ResourceIndex';
import { bg } from '@/components/Img';

export const metadata = pageMeta({ title: 'Health Resources | Oakline Medical Group', description: 'General, plain-language reading to help you prepare for visits. It never replaces advice from your own doctor.', path: '/resources/' });

export default function Page() {
  return (
    <section className="sec t-off pg bgi" style={{ '--bgi': bg('bg-stethoscope'), '--bgo': 0.45 } as React.CSSProperties}>
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Health Resources' }]} />
        <p className="eyebrow">Health resources</p>
        <h1>Helpful reading, in plain words</h1>
        <p className="lede">General guidance to help you prepare. It is not medical advice and never replaces advice from your own doctor. In an emergency, call 911.</p>
        <ResourceIndex />
      </div>
    </section>
  );
}
