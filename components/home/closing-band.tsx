import Link from 'next/link';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { Container } from '@/components/system/container';
import { emailHref, telHref } from '@/lib/contact';
import { confirmedPlace, contactFacts, phoneLines } from '@/lib/site-facts';

export function ClosingBand() {
  return (
    <section className="on-dark bg-navy-deep" aria-labelledby="closing-title">
      <Container className="ds-section grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <p className="ds-label">Enquire</p>
          <h2 id="closing-title" className="ds-h2 mt-4 max-w-xl">
            Write, call, or message the desk.
          </h2>
          <p className="ds-body mt-4 max-w-xl">
            Food supply and Lil by lafa use the same numbers. Say which division the note is for, and the product or piece if you have one.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 min-[480px]:flex-row min-[480px]:items-center">
            <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full min-[480px]:w-auto" label="WhatsApp" />
            <Link href="/contact" className="ds-text-link">
              Write an enquiry
            </Link>
          </div>
        </div>
        <dl className="contact-table">
          <div>
            <dt className="ds-label">Place</dt>
            <dd className="ds-body">
              {confirmedPlace.locality}, {confirmedPlace.country}
            </dd>
          </div>
          <div>
            <dt className="ds-label">Phone</dt>
            <dd className="flex flex-col gap-1">
              {phoneLines.map((line) => (
                <a key={line.e164} className="ds-body" href={telHref(line)}>
                  {line.display}
                </a>
              ))}
            </dd>
          </div>
          {contactFacts.email ? (
            <div>
              <dt className="ds-label">Email</dt>
              <dd>
                <a className="ds-body" href={emailHref()}>
                  {contactFacts.email}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </Container>
    </section>
  );
}
