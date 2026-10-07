import type { Metadata } from 'next';
import Link from 'next/link';
import { PartnerCta } from '@/components/home/partner-cta';
import { SupplyNotes } from '@/components/home/supply-notes';
import { Container } from '@/components/layout/container';
import { BuyerPanel } from '@/components/sections/buyer-panel';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { PageHeader } from '@/components/sections/page-header';
import { Button } from '@/components/ui/button';
import { FOOD_RANGE } from '@/lib/categories';
import { capabilities } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'LAFA General Trading is a Dubai company. The public site focuses on food wholesale, sourcing, and import and export for business buyers.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article>
      <Container className="py-16 sm:py-20">
        <PageHeader eyebrow="About" title="A Dubai trading house, focused on food." />
        <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-charcoal">
          <p>
            LAFA General Trading is a general trading company based in Dubai, United Arab Emirates. The work is international: sourcing, wholesale supply, and import and export. The focus of this website is food.
          </p>
          <p>
            The food range follows the wholesale activities on the trade licence: {FOOD_RANGE}. General wholesale of non-food goods sits under the same licence and is treated as secondary. This site stays with food.
          </p>
          <p>
            Buyers deal with LAFA by enquiry. Name the product and the quantity. Prices are not published, and there is no cart. Availability is confirmed in the reply.
          </p>
        </div>
        <p className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
          <Button asChild>
            <Link href="/products">See the food range</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Send an enquiry</Link>
          </Button>
        </p>
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
      <SupplyNotes />
      <PartnerCta />
    </article>
  );
}
