import Link from 'next/link';
import { CatalogueCard } from '@/components/products/catalogue-card';
import { Reveal } from '@/components/motion/reveal';
import { SectionIntro } from '@/components/home/section-intro';
import { Container } from '@/components/system/container';
import { EmptyState } from '@/components/system/states';
import type { Product } from '@/lib/products/types';

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="ds-section" aria-labelledby="featured-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro
            index="05"
            eyebrow="From the catalogue"
            id="featured-title"
            title="Featured food lines."
            lede="A selection from the current food catalogue. Open a product to review it, add it to an enquiry list, or message us."
          />
          <Link href="/products" className="ds-text-link">
            All food lines
          </Link>
        </div>
        {products.length ? (
          <Reveal>
            <ul className="ds-rail-cards mt-12">
              {products.map((product) => (
                <li key={product.id} className="reveal-item">
                  <CatalogueCard product={product} />
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <div className="mt-12">
            <EmptyState
              title="Browse the full catalogue."
              text="Open the catalogue, or send an enquiry with the goods and quantity you need."
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
