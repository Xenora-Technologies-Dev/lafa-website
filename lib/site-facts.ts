/**
 * Confirmed contact facts only. Leave blank until LAFA supplies them.
 * Empty values are not rendered as phone, email, WhatsApp, or street address.
 * Do not invent stand-in numbers, inboxes, or addresses.
 */
export const contactFacts = {
  phone: '',
  whatsapp: '',
  email: '',
  streetAddress: '',
};

/** Public profile URLs. Leave empty until LAFA confirms them. */
export const socialLinks: readonly { label: string; href: string }[] = [];
