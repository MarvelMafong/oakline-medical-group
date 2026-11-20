import { AdminGate } from '@/components/AdminShell';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
