import { pageMeta } from '@/components/seo';
import { Crumbs } from '@/components/Crumbs';

export const metadata = pageMeta({ title: 'Privacy | Oakline Medical Group', description: 'This website is a demonstration. It sets no cookies beyond local demo storage in your browser and sends nothing to a server.', path: '/privacy/' });

export default function Page() {
  return (
    <section className="sec t-off pg"><div className="wrap pagehead prose">
      <Crumbs items={[{ name: 'Privacy' }]} />
      <h1>Privacy</h1>
      <p className="lede">This website is a demonstration of a clinic website. Oakline Medical Group is a fictional clinic.</p>
      <h2>What happens to what you type</h2>
      <p>Forms on this site (appointment requests, status lookups and the contact form) save what you enter in your own browser, using local storage on your device. Nothing is sent to a server, a clinic or any other person.</p>
      <h2>Cookies and tracking</h2>
      <p>This site sets no cookies beyond local demo storage in your browser. It loads no third-party scripts, advertising or analytics services. Simple counts of page views and form steps are kept locally in your browser so the demo dashboard can show them.</p>
      <h2>Health information</h2>
      <p>Please do not enter symptoms, medical history or other health details anywhere on this site. The forms never ask for them. This site makes no claim to meet healthcare privacy regulations, because it is not a real healthcare service.</p>
      <h2>Clearing your data</h2>
      <p>You can remove everything this site saved by clearing site data in your browser settings. Staff can also use the Reset demo data action in the admin area.</p>
      <h2>Questions</h2>
      <p>This site was designed and built by Marvel Mafong at TekGemm Studio. Visit tekgemmstudio.com to get in touch.</p>
    </div></section>
  );
}
