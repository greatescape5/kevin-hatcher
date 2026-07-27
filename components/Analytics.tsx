'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// GA4 Measurement ID — paste the excavation site's own ID here (G-XXXXXXXXXX)
// once the GA4 property is created. Leave empty to disable analytics.
const GA_ID = '';

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).gtag) return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '');
    (window as any).gtag('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  );
}
