'use client';

import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { openContactPanel } from '@/lib/open-contact';
import type { EnquiryDivision } from '@/lib/contact';

export function OpenContactButton({
  className,
  label = 'WhatsApp',
  subject,
  division,
}: {
  className?: string;
  label?: string;
  subject?: string;
  division?: EnquiryDivision;
}) {
  return (
    <button type="button" className={className} onClick={() => openContactPanel({ subject, division })}>
      <WhatsAppMark className="size-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
