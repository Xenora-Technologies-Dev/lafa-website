'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArtImage } from '@/components/media/art-image';
import { Container } from '@/components/system/container';
import { MOTION_QUERY, REDUCED_QUERY, ScrollTrigger, SplitText, gsap, useGSAP } from '@/lib/gsap';
import { foodMedia } from '@/lib/home';

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    let split: SplitText | null = null;
    let alive = true;
    const mm = gsap.matchMedia();

    mm.add(REDUCED_QUERY, () => {
      gsap.set('.hero-title, .hero-rise, .hero-visual', { opacity: 1, y: 0, clearProps: 'clipPath,transform' });
    });

    mm.add(MOTION_QUERY, () => {
      const play = () => {
        if (!alive) return;
        split?.revert();
        split = SplitText.create('.hero-title', { type: 'lines', mask: 'lines', aria: 'auto' });
        const timeline = gsap.timeline();
        timeline.from(split.lines, { yPercent: 110, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0);
        timeline.from('.hero-rise', { y: 18, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' }, 0.35);
        timeline.fromTo(
          '.hero-visual',
          { clipPath: 'inset(8% 8% 8% 8%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.out' },
          0.1,
        );
        timeline.fromTo('.hero-visual img', { scale: 1.08 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0.1);
      };

      const begin = () => {
        if (!alive) return;
        play();
        ScrollTrigger.refresh();
        gsap.to('.hero-visual img', {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      };

      const ready = document.fonts?.ready;
      if (ready) void ready.then(begin);
      else begin();
    });

    return () => {
      alive = false;
      split?.revert();
      mm.revert();
    };
  }, { scope: ref });

  return (
    <section ref={ref} className="border-b border-line bg-navy-deep text-foam">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.82fr)] lg:gap-16 lg:py-24">
        <div className="on-dark min-w-0 max-w-full">
          <p className="hero-rise ds-label">Dubai, United Arab Emirates</p>
          <h1 className="hero-title ds-display mt-5 max-w-xl">Food, sourced and moved from Dubai.</h1>
          <p className="hero-rise ds-body mt-6 max-w-xl">
            LAFA General Trading sources food and arranges import and export from Dubai. Lil by lafa is the house line for women: abayas, modern wear, dresses, hijabs, and the quieter pieces around them.
          </p>
          <div className="hero-rise hero-actions">
            <Link href="/products" className="ds-btn ds-button">
              Browse the food range
            </Link>
            <Link href="/lil" className="ds-text-link">
              Explore Lil
            </Link>
            <Link href="/contact" className="ds-text-link">
              Send an enquiry
            </Link>
          </div>
        </div>
        <figure className="m-0">
          <div className="hero-visual relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <div className="absolute inset-0">
              <ArtImage
                desktop={foodMedia.hero}
                mobile={foodMedia.heroMobile}
                alt={foodMedia.heroAlt}
                priority
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <figcaption className="campaign-note mt-3 text-foam/80">Campaign imagery</figcaption>
        </figure>
      </Container>
    </section>
  );
}
