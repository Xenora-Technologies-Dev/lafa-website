import Link from 'next/link';
import { OpenContactButton } from '@/components/contact/open-contact-button';
import { Footer } from '@/components/system/footer';
import { emailHref, telHref } from '@/lib/contact';
import { listProductCategories, productListHref } from '@/lib/products';
import { COMPANY, footerNav } from '@/lib/site';
import { confirmedPlace, contactFacts, phoneLines, socialLinks, unconfirmedCompanyFacts } from '@/lib/site-facts';

export async function SiteFooter() {
  const categories = await listProductCategories();
  const year = new Date().getFullYear();

  return (
    <Footer
      summary={`${COMPANY} is a general trading company in ${confirmedPlace.locality}, ${confirmedPlace.country}. The food division arranges sourcing, supply, import, and export. Lil by lafa is the women's fashion line. Prices are quoted on enquiry.`}
      pages={footerNav}
      categories={categories.map((category) => ({ href: productListHref({ category: category.slug }), label: category.title }))}
      legal={`\u00A9 ${year} ${COMPANY}. All rights reserved.`}
      contact={
        <div className="space-y-2">
          <p className="ds-small">
            {confirmedPlace.locality}, {confirmedPlace.country}
          </p>
          <p className="ds-small">Street address: {unconfirmedCompanyFacts.streetAddress}</p>
          {phoneLines.map((line) => (
            <p key={line.e164} className="ds-small">
              <a href={telHref(line)}>{line.display}</a>
            </p>
          ))}
          {contactFacts.email ? (
            <p className="ds-small">
              <a className="ds-accent-text" href={emailHref()}>
                {contactFacts.email}
              </a>
            </p>
          ) : null}
          <p className="pt-3">
            <OpenContactButton className="ds-btn ds-btn-wa ds-btn-sm ds-button" label="WhatsApp" />
          </p>
          {socialLinks.length ? (
            <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a className="ds-small ds-accent-text" href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="pt-2">
            <Link href="/lil" className="ds-small ds-accent-text">
              Lil by lafa
            </Link>
          </p>
          <p>
            <Link href="/contact" className="ds-small ds-accent-text">
              Send an enquiry
            </Link>
          </p>
        </div>
      }
    />
  );
}
