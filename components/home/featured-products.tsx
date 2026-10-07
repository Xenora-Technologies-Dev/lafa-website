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
            lede="A selection from the published list. Each card opens the product and an enquiry."
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
              title="No products are published yet."
              text="The catalogue fills as lines are published. You can still enquire with the product and the quantity."
              action={
                <Link href="/contact" className="ds-btn ds-button">
                  Request an enquiry
                </Link>
              }
            />
          </div>
        )}
      </Container>
    </section>
  );
}
