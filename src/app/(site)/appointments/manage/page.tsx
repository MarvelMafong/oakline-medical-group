import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';
import { ManageRequest } from '@/components/ManageRequest';

export const metadata = pageMeta({ title: 'Check, Reschedule or Cancel a Request | Oakline Medical Group', description: 'Look up an Oakline appointment request with your reference and last name. See its status, reschedule or cancel.', path: '/appointments/manage/' });

export default function Page() {
  return (
    <section className="sec t-blue pg">
      <div className="wrap pagehead">
        <Crumbs items={[{ name: 'Request an Appointment', href: '/appointments/' }, { name: 'Check a request' }]} />
        <p className="eyebrow">Your request</p>
        <h1>Check, change or cancel a request</h1>
        <p className="lede">Enter the reference you received and your last name.</p>
        <ManageRequest />
      </div>
    </section>
  );
}
