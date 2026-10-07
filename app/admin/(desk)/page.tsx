import Link from 'next/link';
import { AdminError } from '@/components/admin/database-required';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { loadAdmin } from '@/lib/admin';
import { adminConfigured } from '@/lib/auth';
import { databaseConfigured, imageKitConfigured } from '@/lib/db';
import { adminCounts } from '@/lib/queries';

export default async function AdminHomePage() {
  const counts = databaseConfigured() ? await loadAdmin(() => adminCounts()) : null;

  return (
    <div className="max-w-4xl">
      <h1 className="font-serif text-4xl text-navy">Overview</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-stone">
        Published products and insights are read from Neon on the public site (cached for about a minute). Drafts stay hidden. Prices are not stored.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatusCard title="Database" ready={databaseConfigured()} missing="DATABASE_URL" />
        <StatusCard title="ImageKit" ready={imageKitConfigured()} missing="IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT" />
        <StatusCard title="Sign-in" ready={adminConfigured()} missing="ADMIN_PASSWORD and ADMIN_AUTH_SECRET" />
      </div>
      {counts && !counts.ok ? (
        <div className="mt-6">
          <AdminError message={counts.error} />
        </div>
      ) : null}
      {counts?.ok ? (
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Categories" value={String(counts.data.categories)} href="/admin/categories" />
          <Stat
            label="Products"
            value={`${counts.data.publishedProducts} published · ${counts.data.draftProducts} draft`}
            href="/admin/products"
          />
          <Stat
            label="Insights"
            value={`${counts.data.publishedPosts} published · ${counts.data.draftPosts} draft`}
            href="/admin/insights"
          />
          <Stat label="Enquiries" value={String(counts.data.enquiries)} href="/admin/enquiries" />
        </dl>
      ) : null}
      {!databaseConfigured() ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-stone">
          Connect Neon and run <code>npm run db:setup</code> before adding products. Without <code>DATABASE_URL</code>, the public catalogue shows licensed category shells with no products.
        </p>
      ) : null}
    </div>
  );
}

function StatusCard({ title, ready, missing }: { title: string; ready: boolean; missing: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-3" />
        <p className="text-sm font-semibold text-navy">{ready ? 'Configured' : 'Not configured'}</p>
        {ready ? null : <p className="mt-2 text-xs leading-5 text-stone">{missing}</p>}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="border border-line bg-white px-4 py-4">
      <dt className="text-xs font-semibold tracking-[0.14em] text-stone uppercase">{label}</dt>
      <dd className="mt-2 text-sm text-navy">{value}</dd>
      <Link href={href} className="mt-3 inline-block text-sm font-semibold text-gold-deep hover:text-navy">
        Open
      </Link>
    </div>
  );
}