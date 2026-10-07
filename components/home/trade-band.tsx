import Link from 'next/link';
import { Container } from '@/components/system/container';
import { ImageBlock } from '@/components/system/image-block';
import { homeMedia } from '@/lib/home';

export function TradeBand() {
  return (
    <section className="border-y border-line bg-paper" aria-labelledby="trade-title">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-24">
        <div>
          <p className="ds-label">Export</p>
          <h2 id="trade-title" className="ds-h2 mt-3">
            International sourcing, handled as a trade.
          </h2>
          <p className="ds-body mt-5">
            LAFA buys and supplies food across markets, with Dubai as the base. Import and export are part of the same desk: find the goods, agree the quantity, and move the shipment for a business buyer.
          </p>
          <p className="ds-body mt-4">
            Tell us the product, the destination market, and the volume. The reply covers availability. Nothing here is a standing offer.
          </p>
          <p className="mt-8">
            <Link href="/export" className="ds-btn ds-btn-outline ds-button">
              Read about export
            </Link>
          </p>
        </div>
        <ImageBlock
          src={homeMedia.trade.src}
          alt={homeMedia.trade.alt}
          ratio="16 / 9"
          fit="cover"
          sizes="(min-width: 1024px) 48rem, 100vw"
        />
      </Container>
    </section>
  );
}
