import { contactFacts, phoneLines, type PhoneLine } from '@/lib/site-facts';

export type EnquiryDivision = 'food' | 'lil';

export type EnquiryContext = {
  division?: EnquiryDivision;
  subject?: string;
};

export function enquiryMessage(context?: EnquiryContext) {
  const subject = context?.subject?.replace(/\s+/g, ' ').trim();
  if (context?.division === 'lil') {
    return subject
      ? `Hello Lil by lafa, I'm enquiring about ${subject}.`
      : "Hello Lil by lafa, I'm enquiring about the collection.";
  }
  return subject
    ? `Hello LAFA, I'm enquiring about ${subject}.`
    : "Hello LAFA, I'm enquiring about supply.";
}

export function whatsappHrefFor(line: Pick<PhoneLine, 'wa'>, message: string) {
  return `https://wa.me/${line.wa}?text=${encodeURIComponent(message)}`;
}

/** First general line. Prefer the contact panel when both numbers should be offered. */
export function whatsappHref(extra?: string) {
  const line = phoneLines[0];
  if (!line) return '';
  return whatsappHrefFor(line, enquiryMessage({ division: 'food', subject: extra }));
}

/** WhatsApp chat when a number is configured; otherwise the enquiry form. */
export function whatsappAction(extra?: string) {
  const href = whatsappHref(extra);
  if (href) return { href, external: true as const };
  const contact = extra ? `/contact?product=${encodeURIComponent(extra)}` : '/contact';
  return { href: contact, external: false as const };
}

export function telHref(line: Pick<PhoneLine, 'e164'>) {
  return `tel:${line.e164}`;
}

export function emailHref(subject?: string) {
  const email = contactFacts.email.trim();
  if (!email) return '';
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export function confirmedChannels() {
  return [
    ...phoneLines.map((line) => ({
      label: 'Phone',
      value: line.display,
      href: telHref(line),
    })),
    contactFacts.email
      ? { label: 'Email', value: contactFacts.email, href: emailHref() }
      : null,
    contactFacts.streetAddress
      ? { label: 'Address', value: contactFacts.streetAddress, href: '' }
      : null,
  ].filter((item): item is { label: string; value: string; href: string } => Boolean(item));
}
