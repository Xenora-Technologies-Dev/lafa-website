import Link from 'next/link';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { Footer } from '@/components/system/footer';
import { confirmedChannels, whatsappAction } from '@/lib/contact';
import { listProductCategories, productListHref } from '@/lib/products';
import { COMPANY, footerNav } from '@/lib/site';
import { socialLinks } from '@/lib/site-facts';

export async function SiteFooter() {
  const categories = await listProductCategories();
  const channels = confirmedChannels();
  const chat = whatsappAction();
  const year = new Date().getFullYear();
  const email = channels.find((channel) => channel.label === 'Email');
  const others = channels.filter((channel) => channel.label !== 'Email');

  return (
    <Footer
      summary={`${COMPANY} sources and supplies wholesale food from Dubai. Import, export, and trade for business buyers. Prices are quoted on enquiry.`}
      pages={footerNav}
      categories={categories.map((category) => ({ href: productListHref({ category: category.slug }), label: category.title }))}
      legal={`\u00A9 ${year} ${COMPANY}. All rights reserved.`}
      contact={
        <div className="space-y-2">
          <p className="ds-small">Dubai, United Arab Emirates</p>
          {email ? (
            <p className="ds-small">
              Email:{' '}
              <a className="ds-accent-text" href={email.href}>
                {email.value}
              </a>
            </p>
          ) : null}
          <p className="pt-3">
            {chat.external ? (
              <a href={chat.href} className="ds-btn ds-btn-wa ds-btn-sm ds-button" target="_blank" rel="noopener noreferrer">
                <WhatsAppMark className="size-4" />
                WhatsApp enquiry
              </a>
            ) : (
              <Link href={chat.href} className="ds-btn ds-btn-wa ds-btn-sm ds-button">
                <WhatsAppMark className="size-4" />
                WhatsApp enquiry
              </Link>
            )}
          </p>
          {others.map((channel) => (
            <p key={channel.label} className="ds-small">
              {channel.label}: {channel.href ? <a href={channel.href}>{channel.value}</a> : channel.value}
            </p>
          ))}
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
            <Link href="/contact" className="ds-small ds-accent-text">
              Send an enquiry
            </Link>
          </p>
        </div>
      }
    />
  );
}
