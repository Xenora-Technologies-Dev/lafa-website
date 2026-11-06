'use client';

import { useRef } from 'react';
import { SectionIntro } from '@/components/home/section-intro';
import { Container } from '@/components/system/container';
import { capabilities } from '@/lib/content';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

export function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('.ledger-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 20 },
          {
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 90%', toggleActions: 'play none none none' },
          },
        );
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="ds-section" aria-labelledby="work-title">
      <Container>
        <div className="lg:grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionIntro
              index="01"
              eyebrow="What we do"
              id="work-title"
              title="Sourcing, supply, import, and export."
              lede="The food desk works with business buyers. Tell us the goods, the quantity, and the market. We reply with availability and a quotation."
            />
          </div>
          <ol className="ds-ledger mt-10 lg:mt-2">
            {capabilities.map((item, index) => (
              <li key={item.title} className="ledger-row">
                <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
                <div>
                  <h3 className="ds-h3">{item.title}</h3>
                  <p className="ds-body mt-2 max-w-xl">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
