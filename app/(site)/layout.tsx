import type { ReactNode } from 'react';
import { ContactDock } from '@/components/contact/contact-dock';
import { JsonLd } from '@/components/layout/json-ld';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { MotionRoot } from '@/components/motion/motion-root';
import { COMPANY, siteOrigin } from '@/lib/site';
import { confirmedPlace, contactFacts, phoneLines } from '@/lib/site-facts';

function organizationJsonLd() {
  const origin = siteOrigin();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY,
    ...(origin ? { url: origin, logo: `${origin}/logo.png` } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: confirmedPlace.locality,
      addressCountry: 'AE',
    },
    email: contactFacts.email,
    contactPoint: phoneLines.map((line) => ({
      '@type': 'ContactPoint',
      telephone: line.e164,
      email: contactFacts.email,
      contactType: 'customer service',
      areaServed: 'AE',
      availableLanguage: ['English'],
    })),
    description:
      'General trading company in Dubai, United Arab Emirates. The food division arranges sourcing, supply, import, and export. Lil by lafa is the women’s fashion line.',
  };
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <MotionRoot>
      <div className="site-has-wa flex min-h-screen flex-col">
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
        <ContactDock />
        <JsonLd data={organizationJsonLd()} />
      </div>
    </MotionRoot>
  );
}
