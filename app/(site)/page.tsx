import type { Metadata } from 'next';
import { CategoryMosaic } from '@/components/home/category-mosaic';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HomeHero } from '@/components/home/home-hero';
import { Introduction } from '@/components/home/introduction';
import { PartnerCta } from '@/components/home/partner-cta';
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
  title: 'General trading from Dubai',
  description:
    'LAFA General Trading is a general trading company in Dubai, United Arab Emirates. We source goods and arrange wholesale supply, import, and export for business buyers.',
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
        <section className="border-t border-line bg-paper">
          <Container className="ds-section">
            <EnquiryProcess title="How an enquiry works" />
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
