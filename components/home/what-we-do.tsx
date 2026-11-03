'use client';

import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { Container } from '@/components/system/container';
import { capabilities } from '@/lib/content';
import { DESKTOP_MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

export function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_MOTION_QUERY, () => {
      const cards = gsap.utils.toArray<HTMLElement>('.work-card');
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.work-pin',
          start: 'top top',
          end: () => `+=${Math.max(cards.length - 1, 1) * 70}%`,
          pin: true,
          scrub: 0.6,
        },
      });
      cards.forEach((card, index) => {
        if (index === 0) return;
        timeline.fromTo(card, { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1 }, index - 1);
      });
    });

    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          },
        );
      });
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="ds-section" aria-labelledby="work-title">
      <div className="work-pin">
        <Container>
          <SectionIntro
            index="01"
            eyebrow="What we do"
            id="work-title"
            title="Sourcing, supply, import, and export."
            lede="The food desk works with business buyers. Tell us the goods, the quantity, and the market. We reply with availability and a quotation."
          />
          <div className="work-stage mt-10 grid gap-4 lg:min-h-[18rem]">
            {capabilities.map((item, index) => (
              <article key={item.title} className="work-card border border-line bg-paper p-6 sm:p-8">
                <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="ds-h3 mt-3">{item.title}</h3>
                <p className="ds-body mt-3 max-w-xl">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
