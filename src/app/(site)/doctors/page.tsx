import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { DoctorDirectory } from '@/components/DoctorDirectory';
import { bg } from '@/components/Img';

export const metadata = pageMeta({ title: 'Our Doctors | Oakline Medical Group', description: 'Meet the people behind your care. Filter Oakline doctors by department, language and availability.', path: '/doctors/' });

export default function Page() {
  return (
    <section className="sec t-off pg bgi" style={{ '--bgi': bg('bg-capsule'), '--bgo': 0.4 } as React.CSSProperties}>
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Doctors' }]} />
        <p className="eyebrow">Our people</p>
        <h1>Meet the people behind your care</h1>
        <p className="lede">Doctors across six departments who work as one team. Filter by department, language or availability.</p>
        <DoctorDirectory />
      </div>
    </section>
  );
}
