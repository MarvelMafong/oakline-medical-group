import type { Metadata, Viewport } from 'next';
import './globals.css';
import './app.css';
import { SITE_URL } from '@/config/seo.config.mjs';
import { Sprite } from '@/components/Sprite';
import { Motion } from '@/components/Motion';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Oakline Medical Group', template: '%s' },
  description: 'Oakline Medical Group, a fictional multi-specialty clinic in Sandy Springs, Georgia. A website project by TekGemm Studio.',
  applicationName: 'Oakline Medical Group',
  authors: [{ name: 'Marvel Mafong', url: 'https://marvelmafong.work' }],
  icons: { icon: '/icon.svg' },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#FAFAF7', colorScheme: 'only light' };

const boot = `(function(){var d=document.documentElement;if(!(window.CSS&&CSS.supports&&CSS.supports('animation-timeline','view()')))d.classList.add('js')})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="only light" />
        <link rel="preload" href="/fonts/figtree-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/atkinson-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Sprite />
        {children}
        <Motion />
      </body>
    </html>
  );
}
