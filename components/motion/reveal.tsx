'use client';

import { useRef, type ReactNode } from 'react';
import { MOTION_QUERY, REDUCED_QUERY, ScrollTrigger, SplitText, gsap, useGSAP } from '@/lib/gsap';

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

export function LineMask({ children, className, selector = '.mask-title' }: { children: ReactNode; className?: string; selector?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let split: SplitText | null = null;
    let alive = true;
    const mm = gsap.matchMedia();

    mm.add(REDUCED_QUERY, () => {
      gsap.set(selector, { clearProps: 'all' });
    });

    mm.add(MOTION_QUERY, () => {
      const run = () => {
        if (!alive || !ref.current) return;
        split?.revert();
        const target = ref.current.querySelector(selector);
        if (!target) return;
        split = SplitText.create(target, { type: 'lines', mask: 'lines', aria: 'auto' });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });
      };

      const ready = document.fonts?.ready;
      if (ready) void ready.then(run);
      else run();

      return () => {
        split?.revert();
      };
    });

    return () => {
      alive = false;
      split?.revert();
      mm.revert();
    };
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function Plate({
  children,
  className,
  duration = 1.05,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const plate = ref.current;
      if (!plate) return;
      gsap.fromTo(
        plate,
        { clipPath: 'inset(8% 8% 8% 8%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: plate,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
      const image = plate.querySelector('img');
      if (!image) return;
      gsap.fromTo(
        image,
        { scale: 1.08 },
        {
          scale: 1,
          duration: duration + 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: plate,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
    return () => mm.revert();
  }, { scope: ref, dependencies: [duration] });

  return (
    <div ref={ref} className={className ? `plate ${className}` : 'plate'}>
      {children}
    </div>
  );
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
