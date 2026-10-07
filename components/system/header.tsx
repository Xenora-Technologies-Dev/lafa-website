import Link from 'next/link';
import { BrandLogo } from '@/components/system/logo';
import { Navigation, type NavItem } from '@/components/system/navigation';

export function Header({
  items,
  action,
  alternate,
}: {
  items: readonly NavItem[];
  action?: NavItem;
  alternate?: NavItem;
}) {
  return (
    <header className="site-header">
      <div className="h-px bg-gold" aria-hidden="true" />
      <div className="ds-container site-header-bar">
        <Link href="/" className="site-logo" aria-label="LAFA General Trading, home">
          <BrandLogo priority />
        </Link>
        <Navigation items={items} action={action} alternate={alternate} />
      </div>
    </header>
  );
}
