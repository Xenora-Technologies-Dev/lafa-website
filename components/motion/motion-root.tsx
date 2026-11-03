'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_QUERY, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';

export function MotionRoot({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    document.documentElement.classList.add('js');
    const header = ref.current?.querySelector<HTMLElement>('.site-header');
    const mm = gsap.matchMedia();

    mm.add(MOTION_QUERY, () => {
      if (!header) return;
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate(self) {
          const y = self.scroll();
          header.classList.toggle('is-scrolled', y > 8);
          if (header.classList.contains('is-menu-open')) {
            header.classList.remove('is-hidden');
            return;
          }
          if (self.direction === 1 && y > 72) header.classList.add('is-hidden');
          else header.classList.remove('is-hidden');
        },
      });
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      if (!header) return;
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);

    return () => {
      mm.revert();
      window.removeEventListener('load', refresh);
    };
  }, { scope: ref });

  return <div ref={ref}>{children}</div>;
}
