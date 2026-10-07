'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { cn } from '@/lib/utils';

export type NavItem = { href: string; label: string; external?: boolean; tone?: 'whatsapp' };

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
  const content = (
    <>
      {item.tone === 'whatsapp' ? <WhatsAppMark className="size-4 shrink-0" /> : null}
      <span>{item.label}</span>
    </>
  );
  if (item.external) {
    return (
      <a href={item.href} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {content}
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

  useEffect(() => {
    const media = window.matchMedia('(min-width: 720px)');
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const header = buttonRef.current?.closest('header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  const whatsappClass = 'ds-btn ds-btn-wa ds-button';

  return (
    <div className="site-header-tools">
      <nav className="site-nav-desktop" aria-label="Primary">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
            className="ds-nav site-nav-link"
          >
            {item.label}
          </Link>
        ))}
        {alternate ? (
          <ItemLink item={alternate} className={alternate.tone === 'whatsapp' ? whatsappClass : 'ds-nav site-nav-link'} />
        ) : null}
        {action ? <ItemLink item={action} className="ds-btn ds-button" /> : null}
      </nav>
      <button
        ref={buttonRef}
        type="button"
        className="site-nav-toggle ds-btn ds-btn-outline ds-button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>
      {open ? (
        <div className="site-nav-drawer">
          <button type="button" className="site-nav-backdrop" aria-label="Close menu" onClick={closeMenu} />
          <nav ref={drawerRef} id={menuId} className="site-nav-panel" aria-label="Primary">
            <div className="flex items-center justify-between">
              <p className="ds-label">Menu</p>
              <button type="button" className="ds-btn ds-btn-quiet ds-btn-sm ds-button" onClick={closeMenu}>
                <X className="size-4" aria-hidden="true" />
                Close
              </button>
            </div>
            <ul className="mt-6 flex flex-col">
              {items.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                    className={cn(
                      'ds-nav block py-4',
                      isCurrent(pathname, item.href) && 'shadow-[inset_3px_0_0_var(--ds-gold)]',
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              {alternate ? (
                <ItemLink
                  item={alternate}
                  className={alternate.tone === 'whatsapp' ? `${whatsappClass} w-full` : 'ds-btn ds-btn-outline ds-button w-full'}
                  onClick={closeMenu}
                />
              ) : null}
              {action ? <ItemLink item={action} className="ds-btn ds-button w-full" onClick={closeMenu} /> : null}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
