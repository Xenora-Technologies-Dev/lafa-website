import type { Metadata } from 'next';
import Link from 'next/link';
import { ClosingBand } from '@/components/home/closing-band';
import { ArtImage } from '@/components/media/art-image';
import { Plate } from '@/components/motion/reveal';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { foodMedia } from '@/lib/home';
import { listProductCategories, productListHref } from '@/lib/products';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Trade',
  description:
    'Import and export from Dubai by LAFA General Trading. Name the product, the destination, and the quantity. Availability and price are confirmed in the reply.',
  path: '/export',
  image: { url: foodMedia.portAerial, alt: foodMedia.portAerialAlt },
});

const documents = [
  { title: 'The goods', text: 'Product or category, and the pack size if you know it.' },
  { title: 'The movement', text: 'Whether the shipment is into the UAE, out of Dubai, or both, and the destination market.' },
  { title: 'The terms to quote', text: 'Any Incoterm you want the quotation to use. The documents for that shipment are confirmed with the reply.' },
] as const;

export default async function ExportPage() {
  const categories = await listProductCategories();
  return (
    <>
      <Container className="ds-section">
        <PageHeader
          eyebrow="Trade"
          title="Import and export, arranged from Dubai."
          lede="Name the product, the destination, and the quantity. We reply with availability and a quotation. Destination markets are confirmed with each enquiry, not published here as a fixed list."
        />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <figure className="m-0">
            <Plate>
              <div className="relative aspect-video overflow-hidden">
                <ArtImage
                  desktop={foodMedia.portAerial}
                  alt={foodMedia.portAerialAlt}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 48rem, 100vw"
                />
              </div>
            </Plate>
            <figcaption className="campaign-note mt-3">Campaign imagery</figcaption>
          </figure>
          <div>
            <h2 className="ds-h3">What to include</h2>
            <ul className="mt-6 space-y-5">
              {documents.map((item, index) => (
                <li key={item.title} className="border-t border-gold pt-4">
                  <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
                  <h3 className="ds-h3 mt-2">{item.title}</h3>
                  <p className="ds-small mt-2">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <figure className="m-0">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ArtImage desktop={foodMedia.container} alt={foodMedia.containerAlt} className="h-full w-full object-cover" sizes="(min-width: 1024px) 36rem, 100vw" />
            </div>
            <figcaption className="campaign-note mt-3">Campaign imagery</figcaption>
          </figure>
          <figure className="m-0">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ArtImage desktop={foodMedia.sourcing} alt={foodMedia.sourcingAlt} className="h-full w-full object-cover" sizes="(min-width: 1024px) 36rem, 100vw" />
            </div>
            <figcaption className="campaign-note mt-3">Campaign imagery</figcaption>
          </figure>
        </div>
        <div className="mt-16">
          <EnquiryProcess title="How a trade enquiry moves" />
        </div>
        <div className="mt-16 border-t border-line pt-10">
          <h2 className="ds-h3">Food categories</h2>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category.slug} className="border-b border-line">
                <Link href={productListHref({ category: category.slug })} className="flex items-baseline justify-between gap-4 py-3 hover:text-navy-soft">
                  <span className="ds-small font-semibold text-navy">{category.title}</span>
                  <span className="ds-label">View range</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/lil" className="ds-btn ds-btn-outline ds-button">
              Lil by lafa
            </Link>
          </p>
        </div>
      </Container>
      <ClosingBand />
    </>
  );
}
