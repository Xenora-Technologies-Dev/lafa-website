'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { DESKTOP_MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilLines, lilPath } from '@/lib/lil';

export function LilLines() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const track = ref.current?.querySelector<HTMLElement>('.lil-track');
      if (!track) return;
      const distance = () => Math.max(track.scrollWidth - (track.parentElement?.clientWidth ?? 0), 0);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: () => `+=${distance() + 160}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="lines" className="lil-pin border-t border-[var(--lil-gold)] py-14 lg:flex lg:flex-col lg:justify-center">
      <div className="ds-container">
        <p className="ds-label">The seven lines</p>
        <h2 className="ds-h2 mt-3 max-w-xl">Move through the collection.</h2>
        <p className="ds-small mt-3 max-w-xl">On a large screen the row stays pinned while you scroll. On a phone, swipe the cards.</p>
      </div>
      <div className="lil-scroller mt-8 ps-[max(1.25rem,calc((100vw-72rem)/2))]">
        <div className="lil-track pe-8">
          {lilLines.map((line, index) => (
            <Link key={line.slug} href={lilPath(line.slug)} className="lil-card lil-frame block bg-white/50">
              <div className="relative aspect-[4/5]">
                <Image src={line.image} alt={line.alt} fill sizes="26rem" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="ds-h3 mt-2">{line.title}</h3>
                <p className="ds-small mt-2">{line.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
