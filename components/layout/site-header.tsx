import { Header } from '@/components/system/header';
import { whatsappAction } from '@/lib/contact';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  const chat = whatsappAction();
  return (
    <Header
      items={primaryNav}
      action={{ href: '/contact', label: 'Enquire' }}
      alternate={{ href: chat.href, label: 'WhatsApp', external: chat.external, tone: 'whatsapp' }}
    />
  );
}
