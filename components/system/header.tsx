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
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="h-px bg-gold" aria-hidden="true" />
      <div className="ds-container relative flex items-center justify-between gap-4 py-3">
        <Link href="/" className="shrink-0" aria-label="LAFA General Trading, home">
          <BrandLogo priority />
        </Link>
        <Navigation items={items} action={action} alternate={alternate} />
      </div>
    </header>
  );
}
