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
    'Send a wholesale enquiry to LAFA General Trading. For businesses asking about food supply. No cart and no public prices.',
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
          title="Wholesale enquiries."
          lede="This form is for businesses asking about supply. It is not an order and it does not show a price. Say what you need and the quantity."
        />
        <div id="enquiry-form" className="mt-10 max-w-xl scroll-mt-28">
          <ContactForm key={interest} interest={interest} />
        </div>
      </div>
      <aside className="h-fit border border-line bg-white p-6">
        <h2 className="ds-h3">How to reach us</h2>
        <p className="mt-3 text-sm leading-6 text-stone">
          Use the enquiry form for product, pack, volume, and destination market. The desk replies by email to the address you provide.
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
            Direct phone, WhatsApp, and street address are shared in the reply when they help close the enquiry.
          </p>
        )}
        <p className="mt-5">
          {chat.external ? (
            <a href={chat.href} className="ds-btn ds-btn-wa ds-button w-full" target="_blank" rel="noopener noreferrer">
              <WhatsAppMark className="size-4" />
              WhatsApp enquiry
            </a>
          ) : (
            <a href="#enquiry-form" className="ds-btn ds-btn-wa ds-button w-full">
              <WhatsAppMark className="size-4" />
              WhatsApp enquiry
            </a>
          )}
        </p>
        <p className="mt-4 text-sm leading-6 text-stone">
          Enquiries are for wholesale food supply only. Consumer retail orders are not accepted through this site.
        </p>
      </aside>
    </Container>
  );
}
