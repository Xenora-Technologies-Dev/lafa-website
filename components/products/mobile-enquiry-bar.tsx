'use client';

import { useRef } from 'react';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { MOTION_QUERY, ScrollTrigger, gsap, useGSAP } from '@/lib/gsap';
import { telHref } from '@/lib/contact';
import { phoneLines } from '@/lib/site-facts';

export function MobileEnquiryBar({ subject }: { subject: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = ref.current;
    const specs = document.getElementById('product-specs');
    if (!bar || !specs) return;
    const mm = gsap.matchMedia();
    mm.add(`(max-width: 767px) and ${MOTION_QUERY}`, () => {
      gsap.set(bar, { yPercent: 110 });
      ScrollTrigger.create({
        trigger: specs,
        start: 'bottom top',
        onEnter: () => {
          bar.classList.add('is-visible');
          gsap.to(bar, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          bar.classList.remove('is-visible');
          gsap.to(bar, { yPercent: 110, duration: 0.3, ease: 'power2.in' });
        },
      });
    });
    mm.add('(max-width: 767px) and (prefers-reduced-motion: reduce)', () => {
      ScrollTrigger.create({
        trigger: specs,
        start: 'bottom top',
        onEnter: () => bar.classList.add('is-visible'),
        onLeaveBack: () => bar.classList.remove('is-visible'),
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <div ref={ref} className="enquiry-bar" data-mobile-enquiry>
      <OpenContactButton className="ds-btn ds-btn-wa ds-btn-sm ds-button flex-1" label="WhatsApp" division="food" subject={subject} />
      {phoneLines.map((line) => (
        <a key={line.e164} href={telHref(line)} className="ds-btn ds-btn-outline ds-btn-sm ds-button">
          {line.display.replace('+971 ', '')}
        </a>
      ))}
    </div>
  );
}
