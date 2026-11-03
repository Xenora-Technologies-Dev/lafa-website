import { Header } from '@/components/system/header';
import { primaryNav } from '@/lib/site';

export function SiteHeader() {
  return <Header items={primaryNav} action={{ href: '/contact', label: 'Enquire' }} />;
}
