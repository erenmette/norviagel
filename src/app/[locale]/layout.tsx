import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Space_Grotesk, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import StickyBuyButton from '@/components/ui/StickyBuyButton';

// Primary font: Space Grotesk — geometric, technical, professional
// To switch back to Inter, change `spaceGrotesk` to `inter` in the body className
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Fallback font: Inter — clean, neutral (uncomment to use instead)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      {/* Switch font: change spaceGrotesk.variable to inter.variable to use Inter */}
      <body className={`${spaceGrotesk.variable} ${inter.variable} noise`}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <main className="min-h-screen pb-20">{children}</main>
            <Footer />
            <CartDrawer />
            <StickyBuyButton />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
