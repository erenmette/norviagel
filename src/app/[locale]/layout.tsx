import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/lib/cart-context';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import StickyBar from '@/components/ui/StickyBar';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'nl' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} noise`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <div className="fixed top-0 left-0 right-0 z-50">
              <AnnouncementBar />
            </div>
            <Header />
            <main className="min-h-screen pb-20">{children}</main>
            <Footer />
            <CartDrawer />
            <StickyBar />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
