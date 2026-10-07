import { Store, UtensilsCrossed, Warehouse } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { buyers } from '@/lib/content';

const icons = [Warehouse, Store, UtensilsCrossed];

export function BuyerPanel() {
  return (
    <section className="border-y border-line bg-paper ds-section" aria-labelledby="buyers-title">
      <Container>
        <p className="ds-label">Buyers</p>
        <h2 id="buyers-title" className="ds-h2 mt-3 max-w-xl">
          Who the supply is for
        </h2>
        <p className="ds-body mt-5 max-w-2xl">
          LAFA sells to businesses that buy food for resale or for a kitchen. Consumer orders are not taken through this site.
        </p>
        <ul className="ds-card-grid mt-12">
          {buyers.map((buyer, index) => {
            const Icon = icons[index] ?? Warehouse;
            return (
              <li key={buyer.title} className="ds-card border border-line bg-ivory p-5 sm:p-6">
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
