import { Container } from '@/components/layout/container';
import { capabilities } from '@/lib/content';

export function CapabilityStrip() {
  return (
    <section aria-label="What LAFA does">
      <Container>
        <ul className="grid border-b border-line sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <li key={item.title} className="border-b border-line px-1 py-8 sm:px-6 lg:border-b-0 lg:border-l lg:first:border-l-0">
              <h2 className="ds-h3">{item.title}</h2>
              <p className="ds-small mt-2">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
