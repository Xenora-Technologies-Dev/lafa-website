import { Container } from '@/components/system/container';
import { supplyNotes } from '@/lib/content';

export function SupplyNotes() {
  return (
    <section className="ds-section border-t border-line" aria-labelledby="supply-notes-title">
      <Container>
        <p className="ds-label">Before you enquire</p>
        <h2 id="supply-notes-title" className="ds-h2 mt-3 max-w-xl">
          What the desk needs in order to reply.
        </h2>
        <p className="ds-body mt-5 max-w-2xl">
          A short brief is enough. Prices stay off this site. The reply confirms whether the line can be supplied, and on what terms.
        </p>
        <ol className="ds-card-grid mt-12">
          {supplyNotes.map((note, index) => (
            <li key={note.title} className="ds-card border border-line bg-paper p-5 sm:p-6">
              <span className="ds-label">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="ds-h3 mt-4">{note.title}</h3>
              <p className="ds-small mt-3">{note.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
