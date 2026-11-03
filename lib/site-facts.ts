/**
 * Published contact details and company facts.
 * Phone numbers and the inbox are confirmed.
 * Legal name, street address, licence, and hours stay as neutral placeholders
 * until LAFA confirms them. Do not replace those placeholders with guessed data.
 */

export type PhoneLine = {
  /** Display text, for example +971 50 300 3692. Both lines are general. */
  display: string;
  /** E.164 value for tel: links. */
  e164: string;
  /** Digits for wa.me, without a plus sign. */
  wa: string;
};

export const phoneLines: readonly PhoneLine[] = [
  { display: '+971 50 300 3692', e164: '+971503003692', wa: '971503003692' },
  { display: '+971 50 755 3730', e164: '+971507553730', wa: '971507553730' },
];

export const contactFacts = {
  email: 'info@lafatrading.com',
  /** First published line. Prefer `phoneLines` when showing both numbers. */
  phone: phoneLines[0]?.display ?? '',
  whatsapp: phoneLines[0]?.wa ?? '',
  streetAddress: '',
};

/** Place of business already stated on the site. Not a street address. */
export const confirmedPlace = {
  locality: 'Dubai',
  country: 'United Arab Emirates',
} as const;

/** Neutral stand-ins. Render the label with the placeholder; do not invent a value. */
export const unconfirmedCompanyFacts = {
  legalName: 'To be confirmed',
  streetAddress: 'To be confirmed',
  licenceNumber: 'To be confirmed',
  hours: 'To be confirmed',
} as const;

/** Public profile URLs. Leave empty until LAFA confirms them. */
export const socialLinks: readonly { label: string; href: string }[] = [];
