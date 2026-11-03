import Link from 'next/link';
import { FoodBrowser } from '@/components/products/food-browser';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { ImageBlock } from '@/components/system/image-block';
import { resolveCatalogueImage } from '@/lib/products/category-meta';
import { listProductCategories, listPublishedProducts, productListHref, queryProducts } from '@/lib/products';

export async function ProductListing({
  q = '',
  category,
  page,
}: {
  q?: string;
  category?: string;
  page?: string;
}) {
  const [result, categories, products] = await Promise.all([
    queryProducts({ q, category, page }),
    listProductCategories(),
    listPublishedProducts(),
  ]);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Food', path: '/products' },
    ...(result.category ? [{ name: result.category.title, path: productListHref({ category: result.category.slug }) }] : []),
  ];

  const lede = result.category
    ? result.category.summary
    : 'The food division, supplied from Dubai. Filter by category or search the list. Prices are quoted on enquiry.';

  const cards = products.map((product) => {
    const image = resolveCatalogueImage(product.category, product.image);
    const categoryTitle = categories.find((item) => item.slug === product.category)?.title;
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categorySlug: product.category,
      categoryTitle,
      shortDescription: product.shortDescription,
      imageUrl: image.src,
      imageAlt: image.alt,
    };
  });

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
        <PageHeader eyebrow="Food" title={result.category ? result.category.title : 'The food range.'} lede={lede} />
        {result.category ? (
          <ImageBlock
            src={result.category.image.src}
            alt={result.category.image.alt}
            caption="Campaign imagery"
            ratio="16 / 9"
            fit="cover"
            sizes="18rem"
          />
        ) : null}
      </div>
      <FoodBrowser
        products={cards}
        categories={categories.map((item) => ({ slug: item.slug, title: item.title }))}
        initialCategory={result.category?.slug ?? null}
        initialQuery={result.q}
        initialPage={result.page}
      />
      {result.q || result.unknownCategory ? (
        <p className="ds-small mt-6">
          Nothing in this search? <Link href="/contact">Send an enquiry</Link> with the product and the quantity.
        </p>
      ) : null}
    </Container>
  );
}
