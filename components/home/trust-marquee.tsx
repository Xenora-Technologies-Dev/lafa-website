'use client';

import { useRef } from 'react';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

const phrases = [
  'Dubai, United Arab Emirates',
  'Food trading',
  'Lil by lafa',
  'Sourcing',
  'Import',
  'Export',
  'Quoted on enquiry',
];

export function TrustMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const tween = gsap.to('.marquee-track', {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      });

      const pause = () => tween.pause();
      const play = () => tween.play();
      const root = ref.current;
      root?.addEventListener('mouseenter', pause);
      root?.addEventListener('mouseleave', play);
      root?.addEventListener('focusin', pause);
      root?.addEventListener('focusout', play);

      const trigger = gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: 'max',
          onUpdate(self) {
            const boost = Math.min(Math.abs(self.getVelocity()) / 3000, 2);
            gsap.to(tween, { timeScale: 1 + boost, duration: 0.25, overwrite: true });
          },
        },
      });

      return () => {
        root?.removeEventListener('mouseenter', pause);
        root?.removeEventListener('mouseleave', play);
        root?.removeEventListener('focusin', pause);
        root?.removeEventListener('focusout', play);
        trigger.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, { scope: ref });

  const group = (
    <div className="marquee-group">
      {phrases.map((phrase) => (
        <span key={phrase} className="ds-label text-[var(--ds-gold-on-dark)]">
          {phrase}
          <span aria-hidden="true" className="ms-6 text-[var(--ds-gold)]">
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={ref} className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}
