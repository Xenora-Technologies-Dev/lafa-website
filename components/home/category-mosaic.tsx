import Link from 'next/link';
import { Container } from '@/components/system/container';
import { ImageBlock } from '@/components/system/image-block';
import { SectionHeading } from '@/components/system/section-heading';
import { productListHref } from '@/lib/products';
import type { ProductCategory } from '@/lib/products/types';

export function CategoryMosaic({ categories }: { categories: ProductCategory[] }) {
  return (
    <section className="border-y border-line bg-ivory ds-section" aria-labelledby="categories-title">
      <Container>
        <SectionHeading
          id="categories-title"
          eyebrow="The range"
          title="Food categories we trade"
          lede="Licensed food wholesale groups. Open a category to browse the lines we trade."
        />
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.slug} className={index === 0 ? 'sm:col-span-2' : undefined}>
              <Link href={productListHref({ category: category.slug })} className="group block h-full">
                <ImageBlock
                  src={category.image.src}
                  alt={category.image.alt}
                  ratio={index === 0 ? '16 / 9' : '1 / 1'}
                  fit="cover"
                  sizes={index === 0 ? '(min-width: 1024px) 40rem, 100vw' : '(min-width: 1024px) 20rem, 50vw'}
                />
                <span className="mt-4 block border-t border-line pt-3 transition-colors group-hover:border-gold">
                  <span className="ds-label">View range</span>
                  <h3 className="ds-h3 mt-2">{category.title}</h3>
                  <span className="ds-small mt-2 block">{category.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
