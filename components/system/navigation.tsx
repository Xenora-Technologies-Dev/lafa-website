'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { enquiryMessage, telHref, whatsappHrefFor } from '@/lib/contact';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { contactFacts, phoneLines } from '@/lib/site-facts';
import { cn } from '@/lib/utils';

export type NavItem = { href: string; label: string; external?: boolean; tone?: 'whatsapp' };

function isCurrent(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navigation({
  items,
  action,
}: {
  items: readonly NavItem[];
  action?: NavItem;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const division = pathname.startsWith('/lil') ? 'lil' : 'food';
  const message = enquiryMessage({ division });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const header = buttonRef.current?.closest('header');
    header?.classList.toggle('is-menu-open', open);
    return () => header?.classList.remove('is-menu-open');
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
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
      if (event.key === 'Escape') closeMenu();
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

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
        {action ? (
          <Link href={action.href} className="ds-btn ds-button">
            {action.label}
          </Link>
        ) : null}
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
                    className={cn('ds-nav site-drawer-link block py-4', isCurrent(pathname, item.href) && 'shadow-[inset_3px_0_0_var(--ds-gold)]')}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-6">
              <p className="ds-label">Contact</p>
              <ul className="mt-4 space-y-4">
                {phoneLines.map((line) => (
                  <li key={line.e164}>
                    <p className="text-sm font-semibold text-navy">{line.display}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <a
                        href={whatsappHrefFor(line, message)}
                        className="ds-btn ds-btn-wa ds-btn-sm ds-button"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                      >
                        <WhatsAppMark className="size-4" />
                        WhatsApp
                      </a>
                      <a href={telHref(line)} className="ds-btn ds-btn-outline ds-btn-sm ds-button" onClick={closeMenu}>
                        Call
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              {contactFacts.email ? (
                <p className="ds-small mt-4">
                  <a href={`mailto:${contactFacts.email}`} onClick={closeMenu}>
                    {contactFacts.email}
                  </a>
                </p>
              ) : null}
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <OpenContactButton className="ds-btn ds-btn-wa ds-button w-full" label="WhatsApp" division={division} />
              {action ? (
                <Link href={action.href} className="ds-btn ds-button w-full" onClick={closeMenu}>
                  {action.label}
                </Link>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
