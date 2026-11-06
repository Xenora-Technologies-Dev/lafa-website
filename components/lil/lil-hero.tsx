'use client';

import Image from 'next/image';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { ArtImage } from '@/components/media/art-image';
import { GoldRule, LineMask, Plate } from '@/components/motion/reveal';
import { lilBrand } from '@/lib/lil';

export function LilHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" style={{ backgroundImage: `url(${lilBrand.texture})`, backgroundSize: 'cover' }} />
      <div className="ds-container relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="ds-label">Lil by lafa</p>
          <GoldRule />
          <div className="mt-5 inline-block">
            <Image src={lilBrand.logo} alt="Lil by lafa" width={420} height={210} priority className="h-auto w-64 sm:w-80" />
          </div>
          <LineMask>
            <h1 className="mask-title ds-display mt-4">Women&apos;s fashion, quietly finished.</h1>
          </LineMask>
          <p className="ds-body mt-5 max-w-xl">
            Abayas, modern wear, maxi dresses, accessories, hijabs, ethnic wear, and night wear. Ask us about a piece. Nothing on this page carries a price.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
            <a href="#lines" className="ds-btn ds-btn-lil ds-button w-full min-[480px]:w-auto">
              Explore the collection
            </a>
            <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" label="Enquire on WhatsApp" division="lil" />
          </div>
        </div>
        <figure className="m-0">
          <Plate duration={1.35}>
            <div className="lil-frame relative aspect-[4/5] lg:aspect-[16/10]">
              <div className="absolute inset-0">
                <ArtImage
                  desktop={lilBrand.hero}
                  mobile={lilBrand.heroMobile}
                  alt={lilBrand.heroAlt}
                  priority
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 40rem, 100vw"
                />
              </div>
            </div>
          </Plate>
          <figcaption className="campaign-note px-1 py-3">Campaign imagery</figcaption>
        </figure>
      </div>
    </section>
  );
}
