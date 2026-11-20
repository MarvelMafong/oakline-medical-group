import { pageMeta } from '@/components/seo';
import { RequestsAdmin } from '@/components/RequestsAdmin';
export const metadata = pageMeta({ title: 'Appointment requests | Oakline Admin', description: 'Staff view of appointment requests.', path: '/admin/requests/' });
export default function Page() { return <RequestsAdmin />; }
