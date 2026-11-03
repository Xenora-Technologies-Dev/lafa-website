'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { ArtImage } from '@/components/media/art-image';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';
import { lilBrand } from '@/lib/lil';

export function LilHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      const timeline = gsap.timeline();
      timeline.fromTo('.lil-logo', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.35, ease: 'power2.inOut' });
      timeline.from('.lil-rise', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, 0.35);
      gsap.to('.lil-butterfly', { y: -12, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('.lil-spark', { opacity: 0.2, duration: 1.1, stagger: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" style={{ backgroundImage: `url(${lilBrand.texture})`, backgroundSize: 'cover' }} />
      <div className="ds-container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="lil-rise ds-label">Lil by lafa</p>
          <div className="lil-logo mt-5 inline-block">
            <Image src={lilBrand.logo} alt="Lil by lafa" width={420} height={210} priority className="h-auto w-64 sm:w-80" />
          </div>
          <Butterfly />
          <h1 className="lil-rise ds-display mt-4">Women&apos;s fashion, quietly finished.</h1>
          <p className="lil-rise ds-body mt-5 max-w-xl">
            Abayas, modern wear, maxi dresses, accessories, hijabs, ethnic wear, and night wear. Ask us about a piece. Nothing on this page carries a price.
          </p>
          <div className="lil-rise mt-8 flex flex-col gap-3 min-[480px]:flex-row">
            <a href="#lines" className="ds-btn ds-btn-lil ds-button w-full min-[480px]:w-auto">
              Explore the collection
            </a>
            <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" label="Enquire on WhatsApp" division="lil" />
          </div>
        </div>
        <figure className="lil-frame relative m-0 aspect-[4/5] lg:aspect-[16/10]">
          <ArtImage
            desktop={lilBrand.hero}
            mobile={lilBrand.heroMobile}
            alt={lilBrand.heroAlt}
            priority
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 40rem, 100vw"
          />
          <figcaption className="campaign-note px-1 py-3">Campaign imagery</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Butterfly() {
  return (
    <span className="lil-butterfly mt-4 inline-flex items-center gap-2 text-[var(--lil-gold)]" aria-hidden="true">
      <svg viewBox="0 0 64 40" className="h-8 w-12" fill="none">
        <path d="M32 20c-6-10-18-14-24-8 6 2 10 8 12 14" stroke="currentColor" strokeWidth="1.2" />
        <path d="M32 20c6-10 18-14 24-8-6 2-10 8-12 14" stroke="currentColor" strokeWidth="1.2" />
        <path d="M32 18c-4 6-8 12-6 16" stroke="currentColor" strokeWidth="1.2" />
        <path d="M32 18c4 6 8 12 6 16" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="32" cy="18" r="1.4" fill="currentColor" />
      </svg>
      <span className="lil-spark size-1.5 rounded-full bg-[var(--lil-gold)]" />
      <span className="lil-spark size-1 rounded-full bg-[var(--lil-blush)]" />
      <span className="lil-spark size-1.5 rounded-full bg-[var(--lil-gold)]" />
    </span>
  );
}
