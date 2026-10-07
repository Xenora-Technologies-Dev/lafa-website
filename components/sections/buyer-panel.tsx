import { Store, UtensilsCrossed, Warehouse } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { buyers } from '@/lib/content';

const icons = [Warehouse, Store, UtensilsCrossed];

export function BuyerPanel() {
  return (
    <section className="border-y border-line bg-white">
      <Container className="py-16 sm:py-20">
        <p className="ds-label">Buyers</p>
        <h2 className="ds-h2 mt-3">Who the supply is for</h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-3">
          {buyers.map((buyer, index) => {
            const Icon = icons[index] ?? Warehouse;
            return (
              <li key={buyer.title}>
                <Icon className="size-5 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="ds-h3 mt-4">{buyer.title}</h3>
                <p className="ds-small mt-2">{buyer.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
