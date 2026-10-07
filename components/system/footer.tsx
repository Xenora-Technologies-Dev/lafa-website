import type { ReactNode } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/system/logo';
import type { NavItem } from '@/components/system/navigation';
import { Small } from '@/components/system/type';

function LinkList({ title, items }: { title: string; items: readonly NavItem[] }) {
  return (
    <div>
      <p className="ds-label">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a href={item.href} className="ds-small" target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className="ds-small">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer({
  summary,
  pages,
  categories,
  contact,
  legal,
}: {
  summary: string;
  pages: readonly NavItem[];
  categories: readonly NavItem[];
  contact: ReactNode;
  legal: string;
}) {
  return (
    <footer className="on-dark mt-auto border-t border-gold bg-navy-deep text-foam">
      <div className="ds-container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-block bg-paper p-2">
            <BrandLogo variant="footer" decorative />
          </div>
          <Small className="mt-5 max-w-sm">{summary}</Small>
        </div>
        <LinkList title="Pages" items={pages} />
        <LinkList title="Products" items={categories} />
        <div>
          <p className="ds-label">Contact</p>
          <div className="mt-4">{contact}</div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="ds-container site-footer-legal py-4">
          <Small>{legal}</Small>
        </div>
      </div>
    </footer>
  );
}
