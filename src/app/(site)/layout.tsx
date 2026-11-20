import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="frame" id="top">
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
