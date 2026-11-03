import Link from 'next/link';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { Container } from '@/components/system/container';
import { ImageBlock } from '@/components/system/image-block';
import { whatsappAction } from '@/lib/contact';
import { homeMedia } from '@/lib/home';

export function HomeHero() {
  const chat = whatsappAction();
  return (
    <section className="border-b border-line bg-paper">
      <Container className="grid items-end gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:py-20">
        <div className="ds-fade">
          <p className="ds-label">Dubai, United Arab Emirates</p>
          <h1 className="ds-display mt-5 max-w-xl">General trading, based in Dubai</h1>
          <p className="ds-body mt-6 max-w-xl text-[1.0625rem] sm:text-[1.125rem]">
            LAFA General Trading sources goods for business buyers, supplies them on a wholesale basis, and arranges import and export from the United Arab Emirates.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <Link href="/products" className="ds-btn ds-button w-full min-[480px]:w-auto">
              Explore the range
            </Link>
            {chat.external ? (
              <a href={chat.href} className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" target="_blank" rel="noopener noreferrer">
                <WhatsAppMark className="size-4" />
                WhatsApp enquiry
              </a>
            ) : (
              <Link href="/contact" className="ds-btn ds-btn-outline ds-button w-full min-[480px]:w-auto">
                Send an enquiry
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
