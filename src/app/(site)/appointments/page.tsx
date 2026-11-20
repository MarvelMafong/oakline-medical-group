import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { AppointmentFlow } from '@/components/AppointmentFlow';

export const metadata = pageMeta({ title: 'Request an Appointment | Oakline Medical Group', description: 'Request an appointment with Oakline Medical Group. Choose a department, a doctor and a time. Staff confirm every request.', path: '/appointments/' });

export default function Page() {
  return (
    <section className="sec t-cream pg">
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Request an Appointment' }]} />
        <p className="eyebrow">Request an appointment</p>
        <h1>Let&apos;s find a time that works for you</h1>
        <p className="lede">Choose a department, an optional doctor and a time. Our staff confirm every request. No symptoms or medical history needed.</p>
        <AppointmentFlow />
      </div>
    </section>
  );
}
