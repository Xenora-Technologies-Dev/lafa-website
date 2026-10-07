import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { ProductListing } from '@/components/products/product-listing';
import { Container } from '@/components/layout/container';
import { LoadingState } from '@/components/system/states';
import { canonicalCategorySlug, productListHref, queryProducts } from '@/lib/products';
import { pageMeta } from '@/lib/seo';

export const revalidate = 60;

type Search = { q?: string; category?: string; page?: string };

export async function generateMetadata({ searchParams }: { searchParams: Promise<Search> }): Promise<Metadata> {
  const params = await searchParams;
  const result = await queryProducts(params);
  const title = result.category ? result.category.title : 'Products';
  const description = result.category
    ? `${result.category.summary} Wholesale lines from LAFA General Trading. No public prices.`
    : 'Wholesale food products from LAFA General Trading in Dubai. Search the range, filter by category, and enquire. No public prices.';
  const path = productListHref({
    category: result.q ? result.category?.slug : null,
    q: result.q || null,
    page: result.page,
  });
  return pageMeta({
    title,
    description,
    path: result.q ? '/products' : path,
    noindex: Boolean(result.q),
  });
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const requestedCategory = params.category?.trim().toLowerCase() ?? '';
  const canonical = requestedCategory ? await canonicalCategorySlug(requestedCategory) : null;
  const requestedPage = Number.parseInt(params.page ?? '1', 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  if (canonical && canonical !== requestedCategory) {
    redirect(productListHref({ category: canonical, q: params.q, page }));
  }
  if (canonical && !params.q?.trim() && page <= 1) {
    redirect(productListHref({ category: canonical }));
  }

  return (
    <Suspense
      fallback={
        <Container className="ds-section">
          <LoadingState label="Loading products" />
        </Container>
      }
    >
      <ProductListing q={params.q} category={canonical ?? undefined} page={params.page} />
    </Suspense>
  );
}
