import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Analytics from '@/components/Analytics';

export const metadata: Metadata = {
  title: 'Kevin Hatcher Excavation | Sandpoint, North Idaho',
  description:
    'Excavation, site prep, septic systems, land clearing, grading, and road building for residential and commercial clients across Sandpoint and North Idaho. Get a free quote today.',
  openGraph: {
    title: 'Kevin Hatcher Excavation',
    description:
      'Over 40 years of excavation expertise in North Idaho. Site prep, septic systems, and more.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
