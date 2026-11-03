import type { Metadata } from 'next';
import { CompanyFacts } from '@/components/company/company-facts';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactLines } from '@/components/contact/contact-lines';
import { Container } from '@/components/layout/container';
import { PageHeader } from '@/components/sections/page-header';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact LAFA General Trading in Dubai by WhatsApp, phone, or email at info@lafatrading.com. Enquiries cover the food division and Lil by lafa.',
  path: '/contact',
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; division?: string }>;
}) {
  const params = await searchParams;
  const interest = params.product?.trim() || '';
  const division = params.division === 'lil' ? 'lil' : 'food';

  return (
    <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:py-20">
      <div>
        <PageHeader
          eyebrow="Contact"
          title="Write, call, or message."
          lede="Use the form for the division, the product or piece, and the quantity or size if you know it. You can also reach either phone line directly."
        />
        <div id="enquiry-form" className="mt-10 max-w-xl scroll-mt-28">
          <ContactForm key={`${interest}-${division}`} interest={interest} division={division} />
        </div>
      </div>
      <aside className="h-fit space-y-4">
        <h2 className="ds-h3">How to reach us</h2>
        <p className="text-sm leading-6 text-stone">Both numbers are general lines. Email reaches the same desk.</p>
        <ContactLines context={{ division, subject: interest || undefined }} />
        <CompanyFacts />
      </aside>
    </Container>
  );
}
