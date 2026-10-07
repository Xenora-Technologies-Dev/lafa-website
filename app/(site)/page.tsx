import type { Metadata } from 'next';
import { CategoryMosaic } from '@/components/home/category-mosaic';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HomeHero } from '@/components/home/home-hero';
import { Introduction } from '@/components/home/introduction';
import { PartnerCta } from '@/components/home/partner-cta';
import { SupplyNotes } from '@/components/home/supply-notes';
import { TradeBand } from '@/components/home/trade-band';
import { WhyLafa } from '@/components/home/why-lafa';
import { InsightsPreview } from '@/components/sections/insights-preview';
import { BuyerPanel } from '@/components/sections/buyer-panel';
import { CapabilityStrip } from '@/components/sections/capability-strip';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { Container } from '@/components/system/container';
import { getPublishedCatalogue } from '@/lib/catalogue';
import { homeMedia } from '@/lib/home';
import { listFeaturedProducts, listProductCategories } from '@/lib/products';
import { pageMeta } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: 'International food trading from Dubai',
  description:
    'LAFA General Trading connects quality food markets from Dubai. Wholesale sourcing, import, and export for business buyers. Explore the range or send an enquiry.',
  path: '/',
  image: { url: homeMedia.hero.src, alt: homeMedia.hero.alt },
});

export default async function HomePage() {
  const [categories, featured, catalogue] = await Promise.all([
    listProductCategories(),
    listFeaturedProducts(),
    getPublishedCatalogue(),
  ]);

  return (
    <>
      <HomeHero />
      <CapabilityStrip />
      <div className="ds-rise">
        <Introduction />
      </div>
      <div className="ds-rise">
        <CategoryMosaic categories={categories} />
      </div>
      <div className="ds-rise">
        <FeaturedProducts products={featured} />
      </div>
      <div className="ds-rise">
        <BuyerPanel />
      </div>
      <div className="ds-rise">
        <TradeBand />
      </div>
      <div className="ds-rise">
        <WhyLafa />
      </div>
      <div className="ds-rise">
        <SupplyNotes />
      </div>
      <div className="ds-rise">
        <section className="border-t border-line bg-paper">
          <Container className="ds-section">
            <EnquiryProcess title="How an enquiry moves" />
          </Container>
        </section>
      </div>
      <div className="ds-rise">
        <InsightsPreview posts={catalogue.posts.slice(0, 3)} />
      </div>
      <PartnerCta />
    </>
  );
}
