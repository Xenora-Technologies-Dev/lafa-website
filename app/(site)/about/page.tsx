import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingBand } from '@/components/home/closing-band';
import { CompanyFacts } from '@/components/company/company-facts';
import { ArtImage } from '@/components/media/art-image';
import { Container } from '@/components/layout/container';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { PageHeader } from '@/components/sections/page-header';
import { capabilities } from '@/lib/content';
import { foodMedia } from '@/lib/home';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About',
  description:
    'LAFA General Trading is based in Dubai. The food division arranges sourcing, supply, import, and export. Lil by lafa is the women’s fashion line.',
  path: '/about',
  image: { url: foodMedia.warehouse, alt: foodMedia.warehouseAlt },
});

const values = [
  { title: 'Specification first', text: 'We work from the goods, the quantity, and the market you name.' },
  { title: 'One reply', text: 'Availability and price come back in the quotation, not as a public rate card.' },
  { title: 'Two divisions', text: 'Food stays on the trading catalogue. Lil by lafa is fashion, reached the same way: message, call, or email.' },
] as const;

export default function AboutPage() {
  return (
    <article>
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <PageHeader eyebrow="About" title="A trading house in Dubai, with a fashion line beside it." />
          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-charcoal">
            <p>
              LAFA General Trading works from Dubai, United Arab Emirates. The food division sources goods and arranges supply, import, and export for business buyers.
            </p>
            <p>
              Lil by lafa is the women’s fashion line: abayas, modern wear, maxi dresses, accessories, hijabs, ethnic wear, and night wear. Those pages do not show prices.
            </p>
            <p>If a food specification is not listed, name it in an enquiry. The reply confirms availability and price.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
            <Link href="/products" className="ds-btn ds-button w-full min-[480px]:w-auto">
              View the food range
            </Link>
            <Link href="/lil" className="ds-btn ds-btn-outline ds-button w-full min-[480px]:w-auto">
              Visit Lil
            </Link>
          </div>
        </div>
        <figure className="m-0">
          <div className="relative aspect-[16/10] overflow-hidden">
            <ArtImage desktop={foodMedia.warehouse} alt={foodMedia.warehouseAlt} className="h-full w-full object-cover" sizes="(min-width: 1024px) 36rem, 100vw" />
          </div>
          <figcaption className="campaign-note mt-3">Campaign imagery</figcaption>
        </figure>
      </Container>
      <section className="border-t border-line bg-paper">
        <Container className="ds-section">
          <h2 className="ds-h2">What we do</h2>
          <ul className="ds-card-grid mt-8">
            {capabilities.map((item) => (
              <li key={item.title} className="border border-line bg-ivory p-5">
                <h3 className="ds-h3">{item.title}</h3>
                <p className="ds-small mt-2">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="border-t border-line">
        <Container className="ds-section">
          <h2 className="ds-h2">How we work</h2>
          <ul className="mt-8 grid gap-6 lg:grid-cols-3">
            {values.map((item) => (
              <li key={item.title} className="border-t border-gold pt-5">
                <h3 className="ds-h3">{item.title}</h3>
                <p className="ds-small mt-2">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <CompanyFacts />
          </div>
          <div className="mt-16 max-w-5xl">
            <EnquiryProcess title="How supply is arranged" />
          </div>
        </Container>
      </section>
      <ClosingBand />
    </article>
  );
}
