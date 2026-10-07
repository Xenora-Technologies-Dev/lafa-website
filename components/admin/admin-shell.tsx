'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/insights', label: 'Insights' },
  { href: '/admin/enquiries', label: 'Enquiries' },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-ivory md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="border-b border-white/10 bg-navy-deep text-foam md:min-h-screen md:border-r md:border-b-0">
        <div className="px-5 py-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#e4d2a8] uppercase">LAFA</p>
          <p className="mt-1 font-serif text-2xl">Admin</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col md:px-3" aria-label="Admin">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn('px-3 py-2 text-sm whitespace-nowrap', active ? 'bg-white/10 text-gold' : 'text-foam hover:bg-white/5')}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-4 px-5 py-4 text-sm md:flex-col">
          <Link href="/" className="text-[#d9d0c2] hover:text-white">
            View site
          </Link>
          <button type="button" className="text-left text-[#d9d0c2] hover:text-white" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </aside>
      <div className="px-5 py-8 sm:px-8">{children}</div>
    </div>
  );
}
