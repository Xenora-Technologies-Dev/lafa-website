import type { ReactNode } from 'react';
import { databaseConfigured } from '@/lib/db';

export function DatabaseRequired({ children }: { children: ReactNode }) {
  if (databaseConfigured()) return children;
  return (
    <div className="max-w-xl border border-line bg-white px-5 py-6">
      <h1 className="font-serif text-3xl text-navy">Database not connected</h1>
      <p className="mt-3 text-sm leading-6 text-stone">
        Set <code className="text-navy">DATABASE_URL</code> to the Neon pooled connection string, then run{' '}
        <code className="text-navy">npm run db:setup</code>. The public site keeps showing the licensed categories until products are published.
      </p>
    </div>
  );
}

export function AdminError({ message }: { message: string }) {
  return <p className="max-w-xl border border-line bg-white px-5 py-4 text-sm leading-6 text-stone">{message}</p>;
}
