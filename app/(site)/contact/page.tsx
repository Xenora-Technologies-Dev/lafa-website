import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { confirmedChannels, whatsappAction } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Send a business enquiry to LAFA General Trading in Dubai. Tell us the product, the quantity, and the market. We reply with availability and a quotation.',
  path: '/contact',
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams;
  const interest = params.product?.trim() || '';
  const channels = confirmedChannels();
  const chat = whatsappAction(interest || undefined);

  return (
    <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:py-20">
      <div>
        <PageHeader
          eyebrow="Contact"
          title="Business enquiries."
          lede="Use this form to ask about supply. Include the product, the quantity, and the market. We reply with availability and a quotation."
        />
        <div id="enquiry-form" className="mt-10 max-w-xl scroll-mt-28">
          <ContactForm key={interest} interest={interest} />
        </div>
      </div>
      <aside className="h-fit border border-line bg-white p-6">
        <h2 className="ds-h3">How to reach us</h2>
        <p className="mt-3 text-sm leading-6 text-stone">
          Use the form for the product, the quantity, and the destination market. We reply by email to the address you provide.
        </p>
        <p className="mt-4 text-sm text-navy">Dubai, United Arab Emirates</p>
        {channels.length ? (
          <ul className="mt-4 space-y-2 text-sm">
            {channels.map((channel) => (
              <li key={channel.label}>
                <span className="text-stone">{channel.label}: </span>
                {channel.href ? <a href={channel.href}>{channel.value}</a> : channel.value}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm leading-6 text-stone">
            Phone, WhatsApp, and a street address are not published here. We reply to the email address you provide.
          </p>
        )}
        {chat.external ? (
          <p className="mt-5">
            <a href={chat.href} className="ds-btn ds-btn-wa ds-button w-full" target="_blank" rel="noopener noreferrer">
              <WhatsAppMark className="size-4" />
              WhatsApp enquiry
            </a>
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-stone">
          Enquiries are for business supply. Orders from individual consumers are not accepted through this site.
        </p>
      </aside>
    </Container>
  );
}
