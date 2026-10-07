'use client';

import { useEffect, useState } from 'react';
import { WhatsAppMark } from '@/components/layout/whatsapp-mark';
import { cn } from '@/lib/utils';

export function WhatsAppFab({ href, external }: { href: string; external: boolean }) {
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTucked(entry.isIntersecting && entry.intersectionRatio > 0.2),
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={href}
      className={cn('wa-fab', tucked && 'is-tucked')}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="wa-fab-icon">
        <WhatsAppMark className="size-6" />
      </span>
      <span className="wa-fab-label">WhatsApp enquiry</span>
    </a>
  );
}
