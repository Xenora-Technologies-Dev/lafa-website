import { contactFacts } from '@/lib/site-facts';

function whatsappNumber() {
  return (process.env.WHATSAPP_NUMBER || contactFacts.whatsapp || '').trim();
}

export function whatsappHref(extra?: string) {
  const digits = whatsappNumber().replace(/[^\d]/g, '');
  if (!digits) return '';
  const line = extra
    ? `Hello LAFA General Trading, I would like to enquire about wholesale supply of ${extra}.`
    : 'Hello LAFA General Trading, I would like to enquire about wholesale supply.';
  return `https://wa.me/${digits}?text=${encodeURIComponent(line)}`;
}

export function confirmedChannels() {
  return [
    contactFacts.phone ? { label: 'Phone', value: contactFacts.phone, href: `tel:${contactFacts.phone.replace(/\s/g, '')}` } : null,
    contactFacts.email ? { label: 'Email', value: contactFacts.email, href: `mailto:${contactFacts.email}` } : null,
    contactFacts.streetAddress ? { label: 'Address', value: contactFacts.streetAddress, href: '' } : null,
  ].filter((item): item is { label: string; value: string; href: string } => Boolean(item));
}
