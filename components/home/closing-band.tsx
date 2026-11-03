import Link from 'next/link';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { Container } from '@/components/system/container';
import { emailHref, telHref } from '@/lib/contact';
import { contactFacts, phoneLines } from '@/lib/site-facts';

export function ClosingBand() {
  return (
    <section className="on-dark bg-navy-deep" aria-labelledby="closing-title">
      <Container className="ds-section">
        <p className="ds-label">Enquire</p>
        <h2 id="closing-title" className="ds-h2 mt-3 max-w-2xl">
          Both lines are open, and so is the inbox.
        </h2>
        <p className="ds-body mt-4 max-w-2xl">
          Food supply and Lil by lafa use the same numbers. Say which division the note is for, and the product or piece if you have one.
        </p>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {phoneLines.map((line) => (
            <li key={line.e164}>
              <a href={telHref(line)} className="ds-btn ds-btn-outline ds-button">
                {line.display}
              </a>
            </li>
          ))}
          {contactFacts.email ? (
            <li>
              <a href={emailHref()} className="ds-btn ds-btn-outline ds-button">
                {contactFacts.email}
              </a>
            </li>
          ) : null}
        </ul>
        <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row">
          <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" label="WhatsApp" />
          <Link href="/contact" className="ds-btn ds-button w-full min-[480px]:w-auto">
            Write an enquiry
          </Link>
        </div>
      </Container>
    </section>
  );
}
