import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/contact-form';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { confirmedChannels, whatsappHref } from '@/lib/contact';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Send a wholesale enquiry to LAFA General Trading. For businesses. No cart. Phone, email, and address are added when LAFA confirms them.',
  path: '/contact',
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams;
  const interest = params.product?.trim() || '';
  const channels = confirmedChannels();
  const chat = whatsappHref(interest || undefined);

  return (
    <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <PageHeader
          eyebrow="Contact"
          title="Wholesale enquiries."
          lede="This form is for businesses asking about supply. It is not an order and it does not show a price. Say what you need and the quantity."
        />
        <div className="mt-10 max-w-xl">
          <ContactForm key={interest} interest={interest} />
        </div>
      </div>
      <aside className="h-fit border border-line bg-white p-6">
        <h2 className="ds-h3">Company details</h2>
        <p className="mt-3 text-sm leading-6 text-stone">
          Phone, WhatsApp, email, and street address are added here once LAFA confirms them. They are not shown yet, and no stand-in number or inbox is used.
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
        ) : null}
        {chat ? (
          <p className="mt-4">
            <a href={chat} className="text-sm font-semibold text-gold-deep hover:text-navy">
              WhatsApp chat
            </a>
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-6 text-stone">
          On the published site, enquiries are kept for LAFA to read. An email notification is not switched on until the inbox is named.
        </p>
      </aside>
    </Container>
  );
}
