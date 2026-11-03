'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { ArtImage } from '@/components/media/art-image';
import { Container } from '@/components/system/container';
import { foodMedia } from '@/lib/home';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilBrand } from '@/lib/lil';

export function Divisions() {
  const ref = useRef<HTMLElement>(null);

  useGSAP((context, contextSafe) => {
    void context;
    if (!contextSafe) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const onMove = contextSafe((event: Event) => {
        const pointer = event as PointerEvent;
        const panel = pointer.currentTarget as HTMLElement;
        const image = panel.querySelector('img');
        if (!image) return;
        const bounds = panel.getBoundingClientRect();
        const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
        const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
        gsap.to(image, { x: x * 18, y: y * 12, duration: 0.45, ease: 'power2.out' });
        gsap.to(panel, { scale: 1.015, duration: 0.45, ease: 'power2.out' });
      });
      const onLeave = contextSafe((event: Event) => {
        const panel = event.currentTarget as HTMLElement;
        const image = panel.querySelector('img');
        if (image) gsap.to(image, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
        gsap.to(panel, { scale: 1, duration: 0.45, ease: 'power2.out' });
      });
      const panels = gsap.utils.toArray<HTMLElement>('.division-panel');
      panels.forEach((panel) => {
        panel.addEventListener('pointermove', onMove);
        panel.addEventListener('pointerleave', onLeave);
      });
      return () => {
        panels.forEach((panel) => {
          panel.removeEventListener('pointermove', onMove);
          panel.removeEventListener('pointerleave', onLeave);
        });
      };
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
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Link href="/products" className="division-panel group block overflow-hidden border border-line bg-ivory">
            <div className="relative aspect-[16/10] overflow-hidden">
              <ArtImage
                desktop={foodMedia.warehouse}
                alt={foodMedia.warehouseAlt}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <p className="ds-label">Food</p>
              <h3 className="ds-h3 mt-2">The trading catalogue</h3>
              <p className="ds-small mt-3">Produce, dairy, proteins, oils, beverages, and the rest of the food list. Prices are quoted on enquiry.</p>
            </div>
          </Link>
          <Link href="/lil" className="division-panel group block overflow-hidden border border-[var(--lil-gold)] bg-[var(--lil-cream)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--lil-cream)]">
              <ArtImage
                desktop={lilBrand.hero}
                mobile={lilBrand.heroMobile}
                alt={lilBrand.heroAlt}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
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
