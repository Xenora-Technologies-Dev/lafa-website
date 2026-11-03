'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { OpenContactButton } from '@/components/contact/open-contact-button';
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
        timeline.from(split.lines, { yPercent: 100, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0);
        timeline.from('.hero-rise', { y: 18, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, 0.35);
        timeline.fromTo(
          '.hero-visual',
          { clipPath: 'inset(8% 8% 8% 8%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.out' },
          0.1,
        );
        timeline.fromTo('.hero-visual img', { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0.1);
      };

      play();
      document.fonts?.ready.then(() => {
        if (!alive) return;
        ScrollTrigger.refresh();
      });

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
    });

    return () => {
      alive = false;
      split?.revert();
      mm.revert();
    };
  }, { scope: ref });

  return (
    <section ref={ref} className="border-b border-line bg-navy-deep text-foam">
      <Container className="grid items-end gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
        <div className="on-dark">
          <p className="hero-rise ds-label">Dubai, United Arab Emirates</p>
          <h1 className="hero-title ds-display mt-5 max-w-xl">Food for trade. Fashion, as Lil.</h1>
          <p className="hero-rise ds-body mt-6 max-w-xl">
            LAFA General Trading sources food and arranges import and export from Dubai. Lil by lafa is the house line for women: abayas, modern wear, dresses, hijabs, and the quieter pieces around them.
          </p>
          <div className="hero-rise mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Link href="/products" className="ds-btn ds-button w-full min-[480px]:w-auto">
              Browse the food range
            </Link>
            <Link href="/lil" className="ds-btn ds-btn-outline ds-button w-full min-[480px]:w-auto">
              Explore Lil
            </Link>
            <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" label="WhatsApp" division="food" />
          </div>
        </div>
        <figure className="hero-visual relative m-0 aspect-[4/5] lg:aspect-[16/9]">
          <ArtImage
            desktop={foodMedia.hero}
            mobile={foodMedia.heroMobile}
            alt={foodMedia.heroAlt}
            priority
            sizes="(min-width: 1024px) 42rem, 100vw"
            className="h-full w-full object-cover"
          />
          <figcaption className="campaign-note mt-3 text-foam/80">Campaign imagery</figcaption>
        </figure>
      </Container>
    </section>
  );
}
