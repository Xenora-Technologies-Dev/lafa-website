import type { Metadata } from 'next';
import { CategoryMosaic } from '@/components/home/category-mosaic';
import { ClosingBand } from '@/components/home/closing-band';
import { Divisions } from '@/components/home/divisions';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HomeHero } from '@/components/home/home-hero';
import { LilTeaser } from '@/components/home/lil-teaser';
import { HouseIndex } from '@/components/home/house-index';
import { WhatWeDo } from '@/components/home/what-we-do';
import { SectionIntro } from '@/components/home/section-intro';
import { InsightsPreview } from '@/components/sections/insights-preview';
import { EnquiryProcess } from '@/components/sections/enquiry-process';
import { Container } from '@/components/system/container';
import { getPublishedCatalogue } from '@/lib/catalogue';
import { foodMedia } from '@/lib/home';
import { listFeaturedProducts, listProductCategories } from '@/lib/products';
import { pageMeta } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = pageMeta({
  title: 'Food trading and Lil by lafa',
  description:
    'LAFA General Trading in Dubai supplies food by enquiry and presents Lil by lafa, a women’s fashion line. Message, call, or email either division.',
  path: '/',
  image: { url: foodMedia.hero, alt: foodMedia.heroAlt },
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
      <HouseIndex />
      <WhatWeDo />
      <Divisions />
      <CategoryMosaic categories={categories} />
      <LilTeaser />
      <FeaturedProducts products={featured} />
      <section className="border-t border-line bg-paper">
        <Container className="ds-section">
          <SectionIntro
            index="06"
            eyebrow="Enquiries"
            title="How an enquiry works"
            lede="The same three steps cover food supply. For Lil, name the line and the piece and we reply the same way."
          />
          <div className="mt-10">
            <EnquiryProcess showTitle={false} />
          </div>
        </Container>
      </section>
      <InsightsPreview posts={catalogue.posts.slice(0, 3)} />
      <ClosingBand />
    </>
  );
}
