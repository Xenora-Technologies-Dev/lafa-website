import Link from 'next/link';
import { BrandLogo } from '@/components/system/logo';
import { Navigation, type NavItem } from '@/components/system/navigation';
import { emailHref, telHref } from '@/lib/contact';
import { contactFacts, phoneLines } from '@/lib/site-facts';

export function Header({
  items,
  action,
}: {
  items: readonly NavItem[];
  action?: NavItem;
}) {
  return (
    <header className="site-header">
      <div className="site-topbar">
        <div className="ds-container flex items-center justify-end gap-x-6 py-2">
          {phoneLines.map((line) => (
            <a key={line.e164} href={telHref(line)}>
              {line.display}
            </a>
          ))}
          {contactFacts.email ? <a href={emailHref()}>{contactFacts.email}</a> : null}
        </div>
      </div>
      <div className="h-px bg-gold" aria-hidden="true" />
      <div className="ds-container site-header-bar">
        <Link href="/" className="site-logo" aria-label="LAFA General Trading, home">
          <BrandLogo priority />
        </Link>
        <Navigation items={items} action={action} />
      </div>
    </header>
  );
}
