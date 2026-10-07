import Link from 'next/link';
import { CatalogueCard } from '@/components/products/catalogue-card';
import { Container } from '@/components/system/container';
import { SectionHeading } from '@/components/system/section-heading';
import { EmptyState } from '@/components/system/states';
import type { Product } from '@/lib/products/types';

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="ds-section" aria-labelledby="featured-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="featured-title"
            eyebrow="From the catalogue"
            title="Featured products"
            lede="A selection from the catalogue. Each card opens the product page and an enquiry."
          />
          <Link href="/products" className="ds-small font-semibold text-navy hover:text-gold-deep">
            All products
          </Link>
        </div>
        {products.length ? (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <CatalogueCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12">
            <EmptyState
              title="Browse the full catalogue."
              text="Open the products list to review the food range, or send an enquiry with the product and quantity you need."
              action={
                <Link href="/products" className="ds-btn ds-button">
                  View products
                </Link>
              }
            />
          </div>
        )}
      </Container>
    </section>
  );
}
