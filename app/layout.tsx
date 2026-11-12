import type { Metadata } from 'next';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Analytics from '@/components/Analytics';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://kevinhatcherexcavation.com'),
  title: {
    default: 'Site Preparation & Excavation in Sandpoint, ID | Kevin Hatcher Excavation',
    template: '%s | Kevin Hatcher Excavation',
  },
  description:
    'Site preparation, grading, excavation, and demolition in Sandpoint & North Idaho. 40+ years on residential and commercial site prep, foundation work and wall repair, septic systems, and driveways. Free quotes.',
  keywords: [
    'site preparation Sandpoint',
    'site prep North Idaho',
    'excavation Sandpoint ID',
    'construction site preparation',
    'site grading',
    'foundation contractor Sandpoint',
    'foundation wall repair',
    'demolition Sandpoint',
    'demolition Kootenai County Idaho',
    'excavating company near me',
    'land clearing Sandpoint',
    'septic systems Bonner County',
    'excavation Bonners Ferry ID',
    'grading and site preparation',
  ],
  openGraph: {
    title: 'Kevin Hatcher Excavation — Site Prep & Excavation in North Idaho',
    description:
      'Site preparation, grading, excavation, and septic systems across Sandpoint and North Idaho. Over 40 years of experience.',
    url: 'https://kevinhatcherexcavation.com',
    siteName: 'Kevin Hatcher Excavation',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/hero.jpg',
        width: 1920,
        height: 1440,
        alt: 'Kevin Hatcher Excavation preparing a building site in North Idaho',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
