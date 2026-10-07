import { Cta } from '@/components/system/cta';

export function ClosingCta() {
  return (
    <Cta
      title="Tell us the product and the quantity."
      text="Enquiries are for businesses. Nothing on this site is an order, and no price is published."
      action={{ href: '/contact', label: 'Send an enquiry' }}
    />
  );
}
