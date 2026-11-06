'use client';

import { useRef } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { enquirySteps } from '@/lib/content';
import { DESKTOP_MOTION_QUERY, MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(DrawSVGPlugin);
}

export function EnquiryProcess({ title = 'How an enquiry works', showTitle = true }: { title?: string; showTitle?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      gsap.from('.enquiry-line', {
        drawSVG: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
    });
    mm.add(MOTION_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('.enquiry-step').forEach((step) => {
        gsap.fromTo(
          step,
          { y: 16 },
          {
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 90%', toggleActions: 'play none none none' },
          },
        );
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref}>
      {showTitle ? <h2 className="ds-h2">{title}</h2> : null}
      <div className={`relative hidden lg:block ${showTitle ? 'mt-8' : ''}`} aria-hidden="true">
        <svg className="h-4 w-full" viewBox="0 0 1000 8" preserveAspectRatio="none">
          <line className="enquiry-line" x1="0" y1="4" x2="1000" y2="4" stroke="#c4a46a" strokeWidth="1" />
        </svg>
      </div>
      <ol className="procedure mt-2 lg:mt-6">
        {enquirySteps.map((step, index) => (
          <li key={step.title} className="enquiry-step">
            <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="ds-h3 mt-3">{step.title}</h3>
            <p className="ds-small mt-2">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
