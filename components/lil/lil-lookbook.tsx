'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilLookbook } from '@/lib/lil';

export function LilLookbook() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('.look-frame').forEach((frame) => {
        gsap.fromTo(
          frame,
          { clipPath: 'inset(12% 12% 12% 12%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: frame, start: 'top 80%', toggleActions: 'play none none none' },
          },
        );
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="ds-section" aria-labelledby="lookbook-title">
      <div className="ds-container">
        <h2 id="lookbook-title" className="ds-h2">Lookbook</h2>
        <p className="ds-body mt-4 max-w-2xl">Three campaign frames. They show a mood, not a promise of what is in hand today.</p>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {lilLookbook.map((frame) => (
            <li key={frame.src}>
              <figure className="m-0">
                <div className="look-frame lil-frame relative aspect-[4/5]">
                  <Image src={frame.src} alt={frame.alt} fill sizes="(min-width: 1024px) 24rem, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-4">
                  <span className="ds-h3 block">{frame.title}</span>
                  <span className="ds-small mt-2 block">{frame.text}</span>
                  <span className="campaign-note mt-2 block">Campaign imagery</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
