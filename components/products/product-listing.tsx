import Link from 'next/link';
import { CatalogueCard } from '@/components/products/catalogue-card';
import { Pagination } from '@/components/products/pagination';
import { ProductFilters } from '@/components/products/product-filters';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { EmptyState } from '@/components/system/states';
import { listProductCategories, productListHref, queryProducts } from '@/lib/products';

export async function ProductListing({
  q = '',
  category,
  page,
}: {
  q?: string;
  category?: string;
  page?: string;
}) {
  const [result, categories] = await Promise.all([
    queryProducts({ q, category, page }),
    listProductCategories(),
  ]);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    ...(result.category ? [{ name: result.category.title, path: productListHref({ category: result.category.slug }) }] : []),
  ];

  const lede = result.category
    ? result.category.summary
    : 'Wholesale food from Dubai. Filter by category or search the list. Prices are quoted on enquiry.';

  const emptyTitle = result.q || result.unknownCategory
    ? 'No products match.'
    : result.category
      ? 'No lines in this category right now.'
      : 'No products match your filters.';

  const emptyText = result.q || result.unknownCategory
    ? 'Try another category, or send an enquiry with the product and the quantity.'
    : 'Clear the filters, browse another category, or send an enquiry with the product and quantity you need.';

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8">
        <PageHeader eyebrow="Products" title={result.category ? result.category.title : 'The food range.'} lede={lede} />
      </div>
      <ProductFilters categories={categories} category={result.category?.slug ?? null} q={result.q} />
      <p className="ds-small mt-6">
        {result.total === 0 ? 'No products' : result.total === 1 ? '1 product' : `${result.total} products`}
        {result.q ? ` for “${result.q}”` : ''}
      </p>
      {result.products.length ? (
        <ul className="ds-card-grid mt-8">
          {result.products.map((product) => (
            <li key={product.id}>
              <CatalogueCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8">
          <EmptyState
            title={emptyTitle}
            text={emptyText}
            action={
              <Link href={result.q || result.category ? '/products' : '/contact'} className="ds-btn ds-button">
                {result.q || result.category ? 'Clear filters' : 'Send an enquiry'}
              </Link>
            }
          />
        </div>
      )}
      <Pagination page={result.page} pageCount={result.pageCount} category={result.category?.slug ?? null} q={result.q} />
    </Container>
  );
}