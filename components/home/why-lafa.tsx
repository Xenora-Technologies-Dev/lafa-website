import { Container } from '@/components/system/container';
import { differentiators } from '@/lib/home';

export function WhyLafa() {
  return (
    <section className="ds-section" aria-labelledby="why-title">
      <Container>
        <p className="ds-label">Why LAFA</p>
        <h2 id="why-title" className="ds-h2 mt-3 max-w-xl">
          A counterpart for food trade, not a storefront.
        </h2>
        <ol className="ds-card-grid mt-12">
          {differentiators.map((item, index) => (
            <li key={item.title} className="ds-card border border-line bg-paper p-5 sm:p-6">
              <span className="ds-label">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="ds-h3 mt-4">{item.title}</h3>
              <p className="ds-small mt-3">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
