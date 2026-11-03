import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Newsreader, Source_Sans_3 } from 'next/font/google';
import Script from 'next/script';
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
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
  adjustFontFallback: true,
});

const lil = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
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
      <body className="min-h-screen bg-ivory font-sans text-charcoal antialiased">
        <Script id="js-class" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js')`}
        </Script>
        {children}
      </body>
    </html>
  );
}
