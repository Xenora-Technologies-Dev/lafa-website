import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { CatalogueCard } from '@/components/products/catalogue-card';
import { ProductGallery } from '@/components/products/product-gallery';
import { ProductListing } from '@/components/products/product-listing';
import { ProductSpecs } from '@/components/products/product-specs';
import { JsonLd } from '@/components/layout/json-ld';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Container } from '@/components/layout/container';
import { canonicalCategorySlug, getProductBySlug, getProductCategory, imageAlt, imageSrc, listProductCategories, listPublishedProducts, listRelatedProducts, productListHref, productPath } from '@/lib/products';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { whatsappAction } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';
import { COMPANY, siteOrigin } from '@/lib/site';

export const revalidate = 60;

export async function generateStaticParams() {
  const [products, categories] = await Promise.all([listPublishedProducts(), listProductCategories()]);
  return [...products.map((product) => ({ slug: product.slug })), ...categories.map((category) => ({ slug: category.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    const category = await getProductCategory(slug);
    if (category) {
      return pageMeta({
        title: category.title,
        description: `${category.summary} Wholesale lines from ${COMPANY}. No public prices.`,
        path: productListHref({ category: category.slug }),
        image: { url: category.image.src, alt: category.image.alt },
      });
    }
    return { title: 'Product' };
  }
  const description = product.seoDescription || `${product.shortDescription} Wholesale enquiry with ${COMPANY}. No public price.`;
  const image = imageSrc(product.image);
  return pageMeta({
    title: product.seoTitle || product.name,
    description,
    path: productPath(product),
    ...(image ? { image: { url: image, alt: imageAlt(product.image, product.name) } } : {}),
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (product && product.slug !== slug) permanentRedirect(productPath(product));
  if (!product) {
    const category = await canonicalCategorySlug(slug);
    if (category && category !== slug) permanentRedirect(productListHref({ category }));
    if (category) return <ProductListing category={category} />;
    notFound();
  }

  const [category, related] = await Promise.all([getProductCategory(product.category), listRelatedProducts(product)]);
  const path = productPath(product);
  const chat = whatsappAction(product.name);
  const origin = siteOrigin();
  const image = imageSrc(product.image);

  return (
    <article>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            ...(category ? [{ name: category.title, path: productListHref({ category: category.slug }) }] : []),
            { name: product.name, path },
          ]}
        />
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
          <ProductGallery image={product.image} gallery={product.gallery} priority />
          <div>
            {category ? (
              <p className="ds-label">
                <Link href={productListHref({ category: category.slug })} className="hover:text-navy">
                  {category.title}
                </Link>
              </p>
            ) : null}
            <h1 className="ds-h1 mt-3">{product.name}</h1>
            <p className="ds-body mt-5">{product.description}</p>
            <ProductSpecs product={product} />
            <p className="ds-small mt-6">Price is quoted on enquiry. Nothing on this page is an order.</p>
            <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="ds-btn ds-button w-full min-[480px]:w-auto">
                Request an enquiry
              </Link>
              {chat.external ? (
                <a href={chat.href} className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" target="_blank" rel="noopener noreferrer">
                  <WhatsAppMark className="size-4" />
                  WhatsApp enquiry
                </a>
              ) : (
                <Link href={chat.href} className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto">
                  <WhatsAppMark className="size-4" />
                  WhatsApp enquiry
                </Link>
              )}
            </div>
          </div>
        </div>
        {related.length ? (
          <section className="mt-16 border-t border-line pt-12" aria-labelledby="related-title">
            <h2 id="related-title" className="ds-h2">
              Related products
            </h2>
            <ul className="ds-card-grid mt-8">
              {related.map((item) => (
                <li key={item.id}>
                  <CatalogueCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: category?.title,
          ...(image && origin ? { image: image.startsWith('http') ? image : `${origin}${image}` } : image ? { image } : {}),
          brand: { '@type': 'Organization', name: COMPANY },
          ...(origin ? { url: `${origin}${path}` } : {}),
        }}
      />
    </article>
  );
}
