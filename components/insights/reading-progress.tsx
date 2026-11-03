'use client';

import { useRef } from 'react';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

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
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  });

  return <div ref={ref} className="read-progress" aria-hidden="true" />;
}
