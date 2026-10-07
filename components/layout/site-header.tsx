import { Header } from '@/components/system/header';
import { whatsappHref } from '@/lib/contact';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  const chat = whatsappHref();
  return (
    <Header
      items={primaryNav}
      action={{ href: '/contact', label: 'Enquire' }}
      alternate={chat ? { href: chat, label: 'WhatsApp', external: true } : undefined}
    />
  );
}
