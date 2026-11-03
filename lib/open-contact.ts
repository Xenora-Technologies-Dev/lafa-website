import type { EnquiryContext } from '@/lib/contact';

export const OPEN_CONTACT_EVENT = 'lafa:open-contact';

export function openContactPanel(detail?: EnquiryContext) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<EnquiryContext>(OPEN_CONTACT_EVENT, { detail }));
}
