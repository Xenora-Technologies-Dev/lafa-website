import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { COMPANY, metadataBaseUrl } from '@/lib/site';
import './globals.css';

/**
 * Self-hosted faces. A failed next/font/google download leaves only a
 * metric-adjusted Arial fallback, and Chrome draws garbage glyphs when
 * ascent-override is above 100%. adjustFontFallback stays off so a missing
 * file falls through to the system font instead.
 */
const sans = localFont({
  src: [
    { path: '../fonts/source-sans-3-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/source-sans-3-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-source-sans',
  display: 'swap',
  adjustFontFallback: false,
});

const serif = localFont({
  src: [
    { path: '../fonts/newsreader-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/newsreader-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/newsreader-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/newsreader-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: false,
});

const lil = localFont({
  src: [
    { path: '../fonts/cormorant-garamond-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/cormorant-garamond-500-italic.woff2', weight: '500', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  adjustFontFallback: false,
});

export const viewport: Viewport = {
  themeColor: '#0c2340',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: 'General trading company in Dubai',
    template: '%s | LAFA General Trading',
  },
  description:
    'LAFA General Trading is a general trading company based in Dubai, United Arab Emirates. We source goods and arrange wholesale supply, import, and export for business buyers.',
  applicationName: COMPANY,
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: COMPANY,
    images: [
      {
        url: '/images/lil/lil-og-share-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Lil by lafa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/lil/lil-og-share-1200x630.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${lil.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
