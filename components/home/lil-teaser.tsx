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
      gsap.from('.lil-row', {
        y: 16,
        duration: 0.55,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: ref.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="border-y border-[var(--lil-gold)] bg-[var(--lil-cream)] ds-section" aria-labelledby="lil-teaser-title">
      <div className="ds-container grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
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
        <ol className="ds-ledger lil-ledger">
          {lilLines.map((line, index) => (
            <li key={line.slug} className="lil-row">
              <p className="ds-label">{String(index + 1).padStart(2, '0')}</p>
              <div>
                <h3 className="ds-h3 font-[family-name:var(--font-lil)]">
                  <Link href={lilPath(line.slug)} className="hover:text-[var(--lil-ink)]">
                    {line.title}
                  </Link>
                </h3>
                <p className="ds-small mt-1">{line.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
