import Link from 'next/link';
import { Container } from '@/components/system/container';
import { introductionFacts } from '@/lib/home';

export function Introduction() {
  return (
    <section className="ds-section" aria-labelledby="introduction-title">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:gap-20">
        <div>
          <p className="ds-label">LAFA Trading</p>
          <h2 id="introduction-title" className="ds-h2 mt-3 max-w-xl">
            A Dubai house for international food trade.
          </h2>
          <div className="mt-6 max-w-xl space-y-4">
            <p className="ds-body">
              LAFA General Trading is based in Dubai. The company sources food, supplies it wholesale, and handles import and export for buyers who need a reliable counterpart.
            </p>
            <p className="ds-body">
              The relationship is the work: a product, a quantity, and a market. Availability and price are confirmed in the reply. This site is not a shop and it does not take orders.
            </p>
          </div>
          <p className="ds-small mt-6">
            <Link href="/about" className="font-semibold text-navy hover:text-gold-deep">
              About the company
            </Link>
            <span aria-hidden="true"> · </span>
            <Link href="/export" className="font-semibold text-navy hover:text-gold-deep">
              Export
            </Link>
          </p>
        </div>
        <dl className="border-t border-line">
          {introductionFacts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-1 gap-1 border-b border-line py-4 min-[420px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[420px]:items-baseline min-[420px]:gap-4">
              <dt className="ds-label text-stone">{fact.label}</dt>
              <dd className="text-sm leading-6 text-navy">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
