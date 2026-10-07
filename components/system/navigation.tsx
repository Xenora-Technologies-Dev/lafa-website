'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NavItem = { href: string; label: string; external?: boolean };

function isCurrent(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ItemLink({
  item,
  className,
  onClick,
}: {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function Navigation({
  items,
  action,
  alternate,
}: {
  items: readonly NavItem[];
  action?: NavItem;
  alternate?: NavItem;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector('a')?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
            className="ds-nav py-1"
          >
            {item.label}
          </Link>
        ))}
        {alternate ? <ItemLink item={alternate} className="ds-nav py-1" /> : null}
        {action ? <ItemLink item={action} className="ds-btn ds-button" /> : null}
      </nav>
      <button
        ref={buttonRef}
        type="button"
        className="ds-btn ds-btn-outline ds-btn-sm ds-button lg:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        {open ? 'Close' : 'Menu'}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-navy/50" aria-label="Close menu" onClick={closeMenu} />
          <nav
            ref={drawerRef}
            id={menuId}
            className="absolute top-0 right-0 flex h-full w-[min(100%,22rem)] flex-col border-l border-line bg-paper px-6 py-6"
            aria-label="Primary"
          >
            <div className="flex items-center justify-between">
              <p className="ds-label">Menu</p>
              <button type="button" className="ds-btn ds-btn-quiet ds-btn-sm ds-button" onClick={closeMenu}>
                Close
              </button>
            </div>
            <ul className="mt-6 flex flex-col">
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                    className={cn('ds-nav block py-4', isCurrent(pathname, item.href) && 'shadow-[inset_2px_0_0_var(--ds-gold)]')}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              {alternate ? <ItemLink item={alternate} className="ds-btn ds-btn-outline ds-button w-full" onClick={closeMenu} /> : null}
              {action ? <ItemLink item={action} className="ds-btn ds-button w-full" onClick={closeMenu} /> : null}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
