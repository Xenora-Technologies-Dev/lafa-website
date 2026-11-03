import type { Metadata } from 'next';
import Link from 'next/link';
import { PartnerCta } from '@/components/home/partner-cta';
import { Container } from '@/components/layout/container';
import { BuyerPanel } from '@/components/sections/buyer-panel';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { PageHeader } from '@/components/sections/page-header';
import { Button } from '@/components/ui/button';
import { capabilities } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'LAFA General Trading is a general trading company based in Dubai, United Arab Emirates. We arrange sourcing, wholesale supply, import, and export for business buyers.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article>
      <Container className="py-16 sm:py-20">
        <PageHeader eyebrow="About" title="A general trading company based in Dubai." />
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-charcoal">
          <p>
            LAFA General Trading is a general trading company in Dubai, United Arab Emirates. We work with businesses that need goods sourced, supplied wholesale, or moved across borders.
          </p>
          <p>
            Our work covers sourcing, wholesale supply, import into the UAE, and export to other markets. The catalogue on this site lists food wholesale lines — produce, dairy, oils, proteins, beverages, and related goods — together with general wholesale for other products. If a specification is not listed, name it in an enquiry.
          </p>
          <p>
            Supply is arranged enquiry by enquiry. Share the product, the quantity, and the market, and we confirm availability and price in our reply.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
          <Button asChild className="w-full min-[480px]:w-auto">
            <Link href="/products">View the trading range</Link>
          </Button>
          <Button asChild variant="outline" className="w-full min-[480px]:w-auto">
            <Link href="/contact">Send an enquiry</Link>
          </Button>
        </div>
        <ul className="ds-card-grid mt-16">
          {capabilities.map((item) => (
            <li key={item.title} className="border border-line bg-paper p-5">
              <h2 className="ds-h3">{item.title}</h2>
              <p className="ds-small mt-2">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16 max-w-5xl">
          <EnquiryProcess title="How supply is arranged" />
        </div>
      </Container>
      <BuyerPanel />
      <PartnerCta />
    </article>
  );
}
