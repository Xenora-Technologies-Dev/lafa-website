import type { ReactNode } from 'react';
import { JsonLd } from '@/components/layout/json-ld';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { contactFacts, COMPANY, siteOrigin } from '@/lib/site';

function organizationJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY,
    ...(origin ? { url: origin, logo: `${origin}/logo.png` } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
      ...(contactFacts.streetAddress ? { streetAddress: contactFacts.streetAddress } : {}),
    },
    ...(contactFacts.email ? { email: contactFacts.email } : {}),
    ...(contactFacts.phone ? { telephone: contactFacts.phone } : {}),
    description: 'Dubai food trading company for wholesale sourcing, import, and export.',
  };
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <JsonLd data={organizationJsonLd()} />
    </div>
  );
}