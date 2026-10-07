import Link from 'next/link';
import { Container } from '@/components/system/container';
import { ImageBlock } from '@/components/system/image-block';
import { whatsappHref } from '@/lib/contact';
import { homeMedia } from '@/lib/home';

export function HomeHero() {
  const chat = whatsappHref();
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid items-end gap-10 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
        <div className="ds-fade">
          <p className="ds-label">Dubai · Food trading</p>
          <h1 className="ds-display mt-5 max-w-xl">Connecting quality food markets worldwide</h1>
          <p className="ds-body mt-6 max-w-xl text-[1.125rem]">
            LAFA General Trading sources food, trades it internationally, and supplies quality products for wholesale. From Dubai, the work is reliable supply into global markets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="ds-btn ds-button">
              Explore products
            </Link>
            {chat ? (
              <a href={chat} className="ds-btn ds-btn-outline ds-button" target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            ) : (
              <Link href="/contact" className="ds-btn ds-btn-outline ds-button">
                Request an enquiry
              </Link>
            )}
          </div>
        </div>
        <ImageBlock
          src={homeMedia.hero.src}
          alt={homeMedia.hero.alt}
          ratio="16 / 9"
          fit="cover"
          priority
          sizes="(min-width: 1024px) 42rem, 100vw"
        />
      </Container>
    </section>
  );
}
