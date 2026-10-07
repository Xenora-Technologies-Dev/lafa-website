import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ErrorState } from '@/components/system/states';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="content" className="flex-1">
        <Container className="ds-section">
          <ErrorState
            title="Page not found."
            text="That page is not on this site. Unpublished categories and products are not listed."
            action={
              <ul className="flex flex-wrap gap-5">
                <li>
                  <Link className="ds-small font-semibold text-navy hover:text-gold-deep" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="ds-small font-semibold text-navy hover:text-gold-deep" href="/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="ds-small font-semibold text-navy hover:text-gold-deep" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            }
          />
        </Container>
      </main>
      <SiteFooter />
    </div>
  );
}
