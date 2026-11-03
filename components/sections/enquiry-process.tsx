'use client';

import { useRef } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { enquirySteps } from '@/lib/content';
import { DESKTOP_MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(DrawSVGPlugin);
}

export function EnquiryProcess({ title = 'How an enquiry works' }: { title?: string }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION_QUERY, () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
      timeline.from('.enquiry-line', { drawSVG: '0%', ease: 'none', duration: 1 });
      timeline.fromTo(
        '.enquiry-dot',
        { backgroundColor: '#e4dfd6' },
        { backgroundColor: '#c4a46a', stagger: 0.25, duration: 0.2 },
        0,
      );
    });
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.enquiry-step').forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
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
      <h2 className="ds-h2">{title}</h2>
      <div className="relative mt-8 hidden lg:block" aria-hidden="true">
        <svg className="h-4 w-full" viewBox="0 0 1000 8" preserveAspectRatio="none">
          <line className="enquiry-line" x1="0" y1="4" x2="1000" y2="4" stroke="#c4a46a" strokeWidth="2" />
        </svg>
      </div>
      <ol className="ds-card-grid mt-8">
        {enquirySteps.map((step, index) => (
          <li key={step.title} className="enquiry-step border-t border-gold pt-5">
            <span className="enquiry-dot ds-h2 inline-flex size-11 items-center justify-center rounded-full border border-gold text-[1rem] text-gold-deep">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="ds-h3 mt-3">{step.title}</h3>
            <p className="ds-small mt-2">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
