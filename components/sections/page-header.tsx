'use client';

import { GoldRule, LineMask } from '@/components/motion/reveal';

export function PageHeader({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <header className="max-w-3xl">
      <p className="ds-label">{eyebrow}</p>
      <GoldRule />
      <LineMask>
        <h1 className="mask-title ds-h1 mt-4">{title}</h1>
      </LineMask>
      {lede ? <p className="ds-body mt-4 max-w-2xl">{lede}</p> : null}
    </header>
  );
}
