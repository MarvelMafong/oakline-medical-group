import { pageMeta } from '@/components/seo';
import { DashboardAdmin } from '@/components/DashboardAdmin';
export const metadata = pageMeta({ title: 'Dashboard | Oakline Admin', description: 'Staff dashboard with live charts from local demo data.', path: '/admin/dashboard/' });
export default function Page() { return <DashboardAdmin />; }
