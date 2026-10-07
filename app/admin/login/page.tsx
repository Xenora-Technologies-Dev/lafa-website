import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/components/admin/login-form';
import { adminConfigured } from '@/lib/auth';
import { safeAdminPath } from '@/lib/site';

export const metadata = {
  title: { absolute: 'Admin sign-in | LAFA General Trading' },
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const params = await searchParams;
  const nextPath = safeAdminPath(params.next);
  const ready = adminConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ivory px-5 py-16">
      <div className="w-full max-w-md border border-line bg-white p-6 sm:p-8">
        <Image src="/logo.png" alt="LAFA General Trading" width={160} height={160} className="h-24 w-24 object-contain" priority />
        <h1 className="mt-6 font-serif text-3xl text-navy">Admin</h1>
        <p className="mt-3 text-sm leading-6 text-stone">
          This address is not linked from the public site. Give it only to the person who manages the catalogue.
        </p>
        {ready ? (
          <div className="mt-6">
            <LoginForm nextPath={nextPath} />
          </div>
        ) : (
          <div className="mt-6 space-y-3 text-sm leading-6 text-stone">
            <p>Sign-in is not configured yet. Set both of these in the environment, then restart:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <code>ADMIN_PASSWORD</code> — at least 12 characters
              </li>
              <li>
                <code>ADMIN_AUTH_SECRET</code> — at least 16 random characters
              </li>
            </ul>
            <p>There is no password in this repository.</p>
          </div>
        )}
        <p className="mt-6">
          <Link href="/" className="text-sm font-semibold text-gold-deep hover:text-navy">
            Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}