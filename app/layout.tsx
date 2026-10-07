import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Newsreader, Source_Sans_3 } from 'next/font/google';
import { COMPANY, metadataBaseUrl } from '@/lib/site';
import './globals.css';

const sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-sans',
  display: 'swap',
  adjustFontFallback: true,
});

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: '#0c2340',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: 'Food wholesale in Dubai | LAFA General Trading',
    template: '%s | LAFA General Trading',
  },
  description:
    'LAFA General Trading is a Dubai company for food wholesale, sourcing, and import and export. Business buyers enquire for availability. No public prices and no cart.',
  applicationName: COMPANY,
  icons: { icon: '/logo.png', apple: '/logo.png' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    siteName: COMPANY,
    images: [{ url: '/logo.png', alt: COMPANY }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/home/lafa-hero.jpg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-charcoal antialiased">{children}</body>
    </html>
  );
}
