'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { ArtImage } from '@/components/media/art-image';
import { Container } from '@/components/system/container';
import { foodMedia } from '@/lib/home';
import { FINE_POINTER_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilBrand } from '@/lib/lil';

export function Divisions() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FINE_POINTER_QUERY, () => {
      const panels = gsap.utils.toArray<HTMLElement>('.division-panel');
      const cleanups: Array<() => void> = [];
      panels.forEach((panel) => {
        const image = panel.querySelector('img');
        if (!image) return;
        gsap.set(image, { scale: 1.08 });
        const xTo = gsap.quickTo(image, 'x', { duration: 0.45, ease: 'power2.out' });
        const yTo = gsap.quickTo(image, 'y', { duration: 0.45, ease: 'power2.out' });
        const onMove = (event: PointerEvent) => {
          const bounds = panel.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          xTo(x * 14);
          yTo(y * 10);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        panel.addEventListener('pointermove', onMove);
        panel.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          panel.removeEventListener('pointermove', onMove);
          panel.removeEventListener('pointerleave', onLeave);
        });
      });
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="border-y border-line bg-paper ds-section" aria-labelledby="divisions-title">
      <Container>
        <SectionIntro
          index="02"
          eyebrow="Divisions"
          id="divisions-title"
          title="Food, and Lil by lafa."
          lede="One trading house. The food catalogue is for business supply. Lil is the fashion line, with enquiries by message, call, or email."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.85fr)]">
          <Link href="/products" className="division-panel group block overflow-hidden border border-line bg-ivory">
            <div className="division-media relative aspect-[16/10] lg:aspect-[16/11]">
              <ArtImage
                desktop={foodMedia.warehouse}
                alt={foodMedia.warehouseAlt}
                sizes="(min-width: 1024px) 46rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="ds-label">Food</p>
              <h3 className="ds-h3 mt-2">The trading catalogue</h3>
              <p className="ds-small mt-3 max-w-xl">Produce, dairy, proteins, oils, beverages, and the rest of the food list. Prices are quoted on enquiry.</p>
            </div>
          </Link>
          <Link href="/lil" className="division-panel group block overflow-hidden border border-[var(--lil-gold)] bg-[var(--lil-cream)]">
            <div className="division-media relative aspect-[16/10] overflow-hidden bg-[var(--lil-cream)] lg:aspect-[4/5]">
              <ArtImage
                desktop={lilBrand.hero}
                mobile={lilBrand.heroMobile}
                alt={lilBrand.heroAlt}
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="ds-label">Lil by lafa</p>
              <h3 className="ds-h3 mt-2 font-[family-name:var(--font-lil)]">Women&apos;s fashion</h3>
              <p className="ds-small mt-3">Seven lines, from abayas to night wear. Ask on WhatsApp, by phone, or by email.</p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
