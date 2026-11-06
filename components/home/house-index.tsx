'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { MOTION_QUERY, gsap, useGSAP } from '@/lib/gsap';

const entries = [
  {
    href: '/products',
    index: '01',
    title: 'Food',
    text: 'The trading catalogue. Prices are quoted on enquiry.',
  },
  {
    href: '/export',
    index: '02',
    title: 'Trade',
    text: 'Import and export arranged from Dubai.',
  },
  {
    href: '/lil',
    index: '03',
    title: 'Lil',
    text: 'Women’s fashion, by message, call, or email.',
  },
  {
    href: '/contact',
    index: '04',
    title: 'Contact',
    text: 'Write the desk with the goods and the quantity.',
  },
] as const;

export function HouseIndex() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_QUERY, () => {
      gsap.from('.house-cell', {
        y: 16,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <nav ref={ref} className="house-index" aria-label="House">
      {entries.map((entry) => (
        <Link key={entry.href} href={entry.href} className="house-cell">
          <p className="ds-label">{entry.index}</p>
          <p className="ds-h3 mt-3">{entry.title}</p>
          <p className="ds-small mt-2">{entry.text}</p>
        </Link>
      ))}
    </nav>
  );
}
