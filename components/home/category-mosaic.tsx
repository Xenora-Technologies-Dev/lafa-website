'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { Container } from '@/components/system/container';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { productListHref } from '@/lib/products';
import type { ProductCategory } from '@/lib/products/types';

export function CategoryMosaic({ categories }: { categories: ProductCategory[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('.mosaic-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 28 },
          {
            y: 0,
            duration: 0.7,
            delay: (index % 4) * 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          },
        );
        const image = card.querySelector('img');
        if (!image) return;
        gsap.fromTo(
          image,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="ds-section" aria-labelledby="categories-title">
      <Container>
        <SectionIntro
          index="03"
          eyebrow="Food"
          id="categories-title"
          title="The trading categories."
          lede="Eleven lines from the food catalogue. Open one to see what is listed, or send an enquiry if the specification is not shown. Photographs here are campaign imagery."
        />
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.slug} className={index === 0 ? 'sm:col-span-2 lg:col-span-2' : undefined}>
              <Link href={productListHref({ category: category.slug })} className="mosaic-card reveal-item group block h-full">
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes={index === 0 ? '(min-width: 1024px) 40rem, 100vw' : '(min-width: 1024px) 20rem, 50vw'}
                    className="object-cover"
                  />
                </div>
                <span className="mt-4 block border-t border-line pt-3 transition-colors group-hover:border-gold">
                  <span className="ds-label">{String(index + 1).padStart(2, '0')}</span>
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
