import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { ErrorState } from '@/components/system/states';

export default function SiteNotFound() {
  return (
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
  );
}
