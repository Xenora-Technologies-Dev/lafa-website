import type { Metadata } from 'next';
import { CategoryMosaic } from '@/components/home/category-mosaic';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HomeHero } from '@/components/home/home-hero';
import { Introduction } from '@/components/home/introduction';
import { PartnerCta } from '@/components/home/partner-cta';
import { TradeBand } from '@/components/home/trade-band';
import { WhyLafa } from '@/components/home/why-lafa';
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
  const [categories, featured] = await Promise.all([listProductCategories(), listFeaturedProducts()]);

  return (
    <>
      <HomeHero />
      <Introduction />
      <CategoryMosaic categories={categories} />
      <FeaturedProducts products={featured} />
      <TradeBand />
      <WhyLafa />
      <PartnerCta />
    </>
  );
}
