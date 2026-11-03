'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilBrand, lilLines, lilPath } from '@/lib/lil';

export function LilTeaser() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.fromTo(
        '.lil-chip',
        { y: 16 },
        {
          y: 0,
          stagger: 0.06,
          duration: 0.55,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', toggleActions: 'play none none none' },
        },
      );
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="border-y border-[var(--lil-gold)] bg-[var(--lil-cream)] ds-section" aria-labelledby="lil-teaser-title">
      <div
        className="ds-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        style={{ backgroundImage: `url(${lilBrand.texture})`, backgroundSize: 'cover' }}
      >
        <div>
          <p className="ds-label">04 · Lil by lafa</p>
          <Image src={lilBrand.logo} alt="Lil by lafa" width={280} height={140} className="mt-5 h-auto w-52" />
          <h2 id="lil-teaser-title" className="ds-h2 mt-4 font-[family-name:var(--font-lil)] text-[var(--lil-ink)]">
            A softer room in the same house.
          </h2>
          <p className="ds-body mt-4 max-w-xl text-[var(--lil-cocoa)]">
            Seven lines of women&apos;s fashion. There are no prices on the page. Ask by WhatsApp, phone, or email and we confirm the piece with you.
          </p>
          <Link href="/lil" className="ds-btn ds-btn-lil ds-button mt-8">
            Visit Lil
          </Link>
        </div>
        <ul className="flex flex-wrap gap-3">
          {lilLines.map((line) => (
            <li key={line.slug}>
              <Link href={lilPath(line.slug)} className="lil-chip inline-flex rounded-full border border-[var(--lil-gold)] bg-white/70 px-4 py-2 text-sm text-[var(--lil-ink)]">
                {line.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
