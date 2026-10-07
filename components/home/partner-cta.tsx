import { Cta } from '@/components/system/cta';
import { whatsappHref } from '@/lib/contact';

export function PartnerCta() {
  const chat = whatsappHref();
  return (
    <Cta
      title="Looking for a reliable food trading partner?"
      text="Tell us the product, the market, and the quantity. The reply is a wholesale quotation, not an online order."
      action={{ href: '/contact', label: 'Request an enquiry' }}
      secondary={chat ? { href: chat, label: 'WhatsApp us', external: true } : undefined}
    />
  );
}
