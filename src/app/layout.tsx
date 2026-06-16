import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://norviaeu.com'),
  title: {
    default: 'Norvia Gel Glove - De Onzichtbare Handschoen',
    template: '%s | Norvia Gel Glove',
  },
  description: 'Bescherm je handen met Norvia Gel Glove. Innovatieve gelhandschoen die een onzichtbare beschermlaag vormt tegen olie, verf, vuil en chemicaliën.',
  keywords: ['gel handschoen', 'handbescherming', 'onzichtbare handschoen', 'Norvia', 'werkhandschoenen'],
  authors: [{ name: 'Norvia' }],
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Norvia Gel Glove',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://norviaeu.com',
    languages: {
      'nl': 'https://norviaeu.com/nl',
      'en': 'https://norviaeu.com/en',
      'x-default': 'https://norviaeu.com/nl',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
