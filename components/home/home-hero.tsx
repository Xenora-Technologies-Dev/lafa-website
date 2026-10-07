import Link from 'next/link';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { Container } from '@/components/system/container';
import { ImageBlock } from '@/components/system/image-block';
import { whatsappAction } from '@/lib/contact';
import { homeMedia } from '@/lib/home';

export function HomeHero() {
  const chat = whatsappAction();
  const whatsappClass = 'ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto';
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid items-end gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
        <div className="ds-fade">
          <p className="ds-label">Dubai · Food trading</p>
          <h1 className="ds-display mt-5 max-w-xl">Connecting quality food markets worldwide</h1>
          <p className="ds-body mt-6 max-w-xl text-[1.0625rem] sm:text-[1.125rem]">
            LAFA General Trading sources food, trades it internationally, and supplies quality products for wholesale. From Dubai, the work is reliable supply into global markets.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Link href="/products" className="ds-btn ds-button w-full min-[480px]:w-auto">
              Explore products
            </Link>
            {chat.external ? (
              <a href={chat.href} className={whatsappClass} target="_blank" rel="noopener noreferrer">
                <WhatsAppMark className="size-4" />
                WhatsApp enquiry
              </a>
            ) : (
              <Link href={chat.href} className={whatsappClass}>
                <WhatsAppMark className="size-4" />
                WhatsApp enquiry
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
          className="ds-fade"
        />
      </Container>
    </section>
  );
}
