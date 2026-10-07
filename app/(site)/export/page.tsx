import type { Metadata } from 'next';
import Link from 'next/link';
import { PartnerCta } from '@/components/home/partner-cta';
import { SupplyNotes } from '@/components/home/supply-notes';
import { Container } from '@/components/layout/container';
import { ImageBlock } from '@/components/system/image-block';
import { PageHeader } from '@/components/sections/page-header';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { homeMedia } from '@/lib/home';
import { listProductCategories, productListHref } from '@/lib/products';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Export',
  description:
    'Food export from Dubai by LAFA General Trading. Tell us the product, the destination market, and the quantity. Wholesale enquiries only.',
  path: '/export',
  image: { url: homeMedia.trade.src, alt: homeMedia.trade.alt },
});

export default async function ExportPage() {
  const categories = await listProductCategories();
  return (
    <>
      <Container className="ds-section">
        <PageHeader
          eyebrow="Export"
          title="Food supplied beyond Dubai."
          lede="LAFA sources food and supplies it to business buyers in other markets. Name the product, the destination, and the quantity."
        />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <ImageBlock
            src={homeMedia.trade.src}
            alt={homeMedia.trade.alt}
            ratio="16 / 9"
            fit="cover"
            priority
            sizes="(min-width: 1024px) 48rem, 100vw"
          />
          <div>
            <h2 className="ds-h3">What to send</h2>
            <p className="ds-body mt-4">
              An export enquiry needs the product, the pack if you know it, the volume, and the market it is going to. Availability and price come back from the desk. This page is not a rate sheet.
            </p>
            <div className="mt-10">
              <EnquiryProcess title="How an export enquiry moves" />
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-line pt-10">
          <h2 className="ds-h3">Categories</h2>
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
        </div>
      </Container>
      <SupplyNotes />
      <PartnerCta />
    </>
  );
}
