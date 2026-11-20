import { pageMeta } from '@/components/seo';
import { MessagesAdmin } from '@/components/MessagesAdmin';
export const metadata = pageMeta({ title: 'Messages | Oakline Admin', description: 'Staff inbox for contact messages.', path: '/admin/messages/' });
export default function Page() { return <MessagesAdmin />; }
