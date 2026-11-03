import { Cta } from '@/components/system/cta';
import { whatsappAction } from '@/lib/contact';

export function PartnerCta() {
  const chat = whatsappAction();
  return (
    <Cta
      title="Discuss supply with LAFA."
      text="Tell us the product, the quantity, and the market. We reply with availability and a quotation."
      action={{ href: '/contact', label: 'Send an enquiry' }}
      secondary={chat.external ? { href: chat.href, label: 'WhatsApp enquiry', external: true } : undefined}
    />
  );
}
