'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/lib/cart-context';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

const VARIANT_ID = 'gid://shopify/ProductVariant/57354473570688';

export default function StickyBuyButton() {
  const t = useTranslations();
  const { cart, addItem, isLoading } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const hasItems = cart && cart.totalQuantity > 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 300;
      setHasScrolled(scrolled);
      setIsVisible(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    await addItem(VARIANT_ID, 1);
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      )}
    >
      <div className="bg-primary-dark/95 backdrop-blur-xl border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Product info */}
            <div className="hidden sm:flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-accent">N</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">Norvia Gel Glove</p>
                <p className="text-xs text-text-muted">{formatPrice('28.95', 'EUR')}</p>
              </div>
            </div>

            {/* Right: Action button */}
            {hasItems ? (
              <a
                href={cart.checkoutUrl}
                className="flex-1 sm:flex-none btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 flex items-center justify-center gap-2"
              >
                {t('cart.checkout')}
                <ArrowRight size={16} />
              </a>
            ) : (
              <div className="flex-1 sm:flex-none flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={16} />
                  {isLoading ? '...' : t('cta.buyNow')}
                </button>
                <Link
                  href="/product"
                  className="hidden sm:flex btn-secondary text-sm px-6 py-3 items-center justify-center gap-2"
                >
                  {t('nav.product')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
