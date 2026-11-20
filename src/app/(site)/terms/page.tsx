import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const metadata = pageMeta({ title: 'Terms | Oakline Medical Group', description: 'Terms for using this demonstration website. Oakline Medical Group is a fictional clinic and gives no medical advice.', path: '/terms/' });

export default function Page() {
  return (
    <section className="sec t-off pg"><div className="wrap pagehead prose">
      <Crumbs items={[{ name: 'Terms' }]} />
      <h1>Terms</h1>
      <p className="lede">Please read these short terms before using this website.</p>
      <h2>A demonstration only</h2>
      <p>Oakline Medical Group is a fictional clinic, and Oakline is a working name pending trademark and domain checks. This site shows how a clinic website could work. It is not a real healthcare provider.</p>
      <h2>No medical advice</h2>
      <p>Nothing here is medical advice, a diagnosis or a treatment recommendation. The health resources are general reading only. Talk with your own doctor about your health. In an emergency, call 911.</p>
      <h2>Requests are not appointments</h2>
      <p>The request forms are a demonstration. No clinic receives them, and no appointment is created. Doctors and people shown on the site are fictional.</p>
      <h2>No payments</h2>
      <p>This site never takes payment.</p>
      <h2>Content and credit</h2>
      <p>The design and code are the work of Marvel Mafong at TekGemm Studio. Please do not present this demonstration as a real clinic.</p>
    </div></section>
  );
}
