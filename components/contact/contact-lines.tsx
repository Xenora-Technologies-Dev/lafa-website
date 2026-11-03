import { emailHref, enquiryMessage, telHref, whatsappHrefFor, type EnquiryContext } from '@/lib/contact';
import { contactFacts, phoneLines } from '@/lib/site-facts';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';

export function ContactLines({ context, compact = false }: { context?: EnquiryContext; compact?: boolean }) {
  const message = enquiryMessage(context);
  const mailSubject = context?.subject ? `Enquiry: ${context.subject}` : 'Enquiry';

  return (
    <ul className={compact ? 'space-y-3' : 'space-y-4'}>
      {phoneLines.map((line) => (
        <li key={line.e164} className="border border-line bg-paper p-4">
          <p className="text-base font-semibold text-navy">{line.display}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={whatsappHrefFor(line, message)} className="ds-btn ds-btn-wa ds-btn-sm ds-button" target="_blank" rel="noopener noreferrer">
              <WhatsAppMark className="size-4" />
              Chat on WhatsApp
            </a>
            <a href={telHref(line)} className="ds-btn ds-btn-outline ds-btn-sm ds-button">
              Call
            </a>
          </div>
        </li>
      ))}
      {contactFacts.email ? (
        <li className="border border-line bg-paper p-4">
          <p className="ds-label">Email</p>
          <a className="mt-2 inline-block text-navy" href={emailHref(mailSubject)}>
            {contactFacts.email}
          </a>
        </li>
      ) : null}
    </ul>
  );
}
