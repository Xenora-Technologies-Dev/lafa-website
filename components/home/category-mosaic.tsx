'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { Plate } from '@/components/motion/reveal';
import { Container } from '@/components/system/container';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { productListHref } from '@/lib/products';
import type { ProductCategory } from '@/lib/products/types';

export function CategoryMosaic({ categories }: { categories: ProductCategory[] }) {
  const ref = useRef<HTMLElement>(null);
  const [lead, ...rest] = categories;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const leadImage = ref.current?.querySelector<HTMLElement>('.lead-plate img');
      if (leadImage) {
        gsap.fromTo(
          leadImage,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '.lead-plate',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>('.index-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 18 },
          {
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 92%', toggleActions: 'play none none none' },
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
        {lead ? (
          <div className="mt-12 grid items-end gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-10">
            <Plate className="lead-plate">
              <Link href={productListHref({ category: lead.slug })} className="relative block aspect-[16/9] overflow-hidden">
                <Image
                  src={lead.image.src}
                  alt={lead.image.alt}
                  fill
                  sizes="(min-width: 1024px) 48rem, 100vw"
                  className="object-cover"
                />
              </Link>
            </Plate>
            <div>
              <p className="ds-label">01</p>
              <h3 className="ds-h2 mt-3">
                <Link href={productListHref({ category: lead.slug })} className="hover:text-navy-soft">
                  {lead.title}
                </Link>
              </h3>
              <p className="ds-small mt-3">{lead.summary}</p>
            </div>
          </div>
        ) : null}
        {rest.length ? (
          <ul className="category-index mt-8 lg:mt-6">
            {rest.map((category, index) => (
              <li key={category.slug} className="index-row">
                <Link href={productListHref({ category: category.slug })}>
                  <span className="index-thumb">
                    <Image
                      src={category.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 8rem, 16rem"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-3 block lg:mt-0">
                    <span className="ds-label">{String(index + 2).padStart(2, '0')}</span>
                    <span className="ds-h3 mt-2 block">{category.title}</span>
                    <span className="ds-small mt-2 hidden lg:block">{category.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  );
}
