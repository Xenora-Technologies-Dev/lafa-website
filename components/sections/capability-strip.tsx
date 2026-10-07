import { Container } from '@/components/layout/container';
import { capabilities } from '@/lib/content';

export function CapabilityStrip() {
  return (
    <section className="border-b border-line bg-ivory" aria-label="What LAFA does">
      <Container className="py-10 sm:py-12">
        <ul className="ds-card-grid">
          {capabilities.map((item) => (
            <li key={item.title} className="border-l-2 border-gold pl-4">
              <h2 className="ds-h3">{item.title}</h2>
              <p className="ds-small mt-2">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
