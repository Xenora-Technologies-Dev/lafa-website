import { Cta } from '@/components/system/cta';
import { whatsappAction } from '@/lib/contact';

export function PartnerCta() {
  const chat = whatsappAction();
  return (
    <Cta
      title="Looking for a reliable food trading partner?"
      text="Tell us the product, the market, and the quantity. The reply is a wholesale quotation, not an online order."
      action={{ href: '/contact', label: 'Request an enquiry' }}
      secondary={{ href: chat.href, label: 'WhatsApp enquiry', external: chat.external }}
    />
  );
}
