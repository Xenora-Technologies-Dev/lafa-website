import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { PageHeader } from '@/components/sections/page-header';
import { Button } from '@/components/ui/button';
import { FOOD_RANGE } from '@/lib/categories';
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
        <p className="mt-8">
          <Button asChild variant="outline">
            <Link href="/products">See the food range</Link>
          </Button>
        </p>
        <div className="mt-16 max-w-5xl">
          <EnquiryProcess title="How supply is arranged" />
        </div>
      </Container>
    </article>
  );
}
