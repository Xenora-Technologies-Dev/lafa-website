import type { ReactNode } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/system/logo';
import type { NavItem } from '@/components/system/navigation';
import { Small } from '@/components/system/type';

function LinkList({ title, items }: { title: string; items: readonly NavItem[] }) {
  return (
    <div className="border-t border-white/15 pt-5">
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
      <div className="ds-container py-14 lg:py-16">
        <div className="border-b border-white/15 pb-10">
          <div className="inline-block bg-paper p-2">
            <BrandLogo variant="footer" decorative />
          </div>
          <Small className="mt-5 max-w-xl">{summary}</Small>
        </div>
        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          <LinkList title="Pages" items={pages} />
          <LinkList title="Food" items={categories} />
          <div className="border-t border-white/15 pt-5">
            <p className="ds-label">Contact</p>
            <div className="mt-4">{contact}</div>
          </div>
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
