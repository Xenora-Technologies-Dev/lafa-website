import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ContactLines } from '@/components/contact/contact-lines';
import { LilHero } from '@/components/lil/lil-hero';
import { LilLines } from '@/components/lil/lil-lines';
import { LilLookbook } from '@/components/lil/lil-lookbook';
import { lilBrand, lilOccasions } from '@/lib/lil';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Lil by lafa',
  description:
    'Lil by lafa is the women’s fashion line of LAFA General Trading in Dubai. Explore seven lines and enquire by WhatsApp, phone, or email.',
  path: '/lil',
  image: { url: lilBrand.ogImage, alt: 'Lil by lafa' },
});

export default function LilPage() {
  return (
    <article>
      <LilHero />
      <LilLines />
      <section className="ds-section border-t border-[var(--lil-gold)]" aria-labelledby="occasion-title">
        <div className="ds-container">
          <h2 id="occasion-title" className="ds-h2">For the day you have in mind</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lilOccasions.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="block h-full border border-[var(--lil-gold)] bg-white/40 p-5">
                  <h3 className="ds-h3">{item.title}</h3>
                  <p className="ds-small mt-2">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <LilLookbook />
      <section className="border-t border-[var(--lil-gold)]">
        <div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <h2 className="ds-h2">Fabric and fit</h2>
            <p className="ds-body mt-4">
              Share the size, fabric, and colour you prefer. We confirm the details in the reply. Campaign images are a guide to the mood of each line.
            </p>
            <p className="ds-small mt-4">Measurements, cloth, and colourways are not listed as stock on this site.</p>
          </div>
          <div className="lil-frame relative aspect-[16/10]">
            <Image src={lilBrand.fabric} alt="Campaign image of a cream fabric texture." fill sizes="40rem" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--lil-gold)] bg-white/30">
        <div className="ds-container grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="lil-frame relative aspect-[16/10]">
            <Image src={lilBrand.rail} alt={lilBrand.railAlt} fill sizes="40rem" className="object-cover" />
          </div>
          <div>
            <h2 className="ds-h2">The rail</h2>
            <p className="ds-body mt-4">
              Pieces can be discussed one at a time or together. Tell us what you are looking for. Terms are confirmed in the reply, not on this page.
            </p>
            <div className="mt-6">
              <ContactLines context={{ division: 'lil', subject: 'the collection' }} />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
