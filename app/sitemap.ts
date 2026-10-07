import type { MetadataRoute } from 'next';
import { getPublishedCatalogue } from '@/lib/catalogue';
import { listProductCategories, listPublishedProducts, productListHref, productPath } from '@/lib/products';
import { siteOrigin } from '@/lib/site';

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = siteOrigin() || 'http://localhost:3000';
  const [{ posts }, categories, products] = await Promise.all([
    getPublishedCatalogue(),
    listProductCategories(),
    listPublishedProducts(),
  ]);
  const now = new Date();
  const paths = [
    '/',
    '/about',
    '/export',
    '/products',
    '/insights',
    '/contact',
    ...categories.map((category) => productListHref({ category: category.slug })),
    ...products.map((product) => productPath(product)),
    ...posts.map((post) => `/insights/${post.slug}`),
  ];
  return paths.map((path) => ({
    url: `${origin}${path}`,
    lastModified: now,
  }));
}
