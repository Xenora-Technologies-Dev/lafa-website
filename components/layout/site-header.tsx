import { Header } from '@/components/system/header';
import { whatsappAction } from '@/lib/contact';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  const chat = whatsappAction();
  return (
    <Header
      items={primaryNav}
      action={{ href: '/contact', label: 'Enquire' }}
      alternate={
        chat.external ? { href: chat.href, label: 'WhatsApp', external: true, tone: 'whatsapp' } : undefined
      }
    />
  );
}
