'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_QUERY, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

export function Reveal({ children, className, selector = '.reveal-item' }: { children: ReactNode; className?: string; selector?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 22 },
          {
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function GoldRule() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  });

  return <span ref={ref} className="gold-rule" aria-hidden="true" />;
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
