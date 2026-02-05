'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useCart } from '@/lib/cart-context';
import { useRouter } from '@/i18n/navigation';
import { ShoppingCart, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import Image from 'next/image';
import ChatWidget from '@/components/chat/ChatWidget';

const VARIANT_ID = 'gid://shopify/ProductVariant/57354473570688';

type BottlePhase = 'idle' | 'rising' | 'shaking' | 'launching';

export default function StickyBar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { cart, addItem, isLoading } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bottlePhase, setBottlePhase] = useState<BottlePhase>('idle');

  const hasItems = cart && cart.totalQuantity > 0;

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async () => {
    await addItem(VARIANT_ID, 1);
    router.push('/product');
  };

  const handleTryNow = () => {
    if (bottlePhase !== 'idle') return;

    // Phase 1: bottle rises from behind bar
    setBottlePhase('rising');

    // Phase 2: bottle shakes after 800ms
    setTimeout(() => setBottlePhase('shaking'), 800);

    // Phase 3: bottle launches upward after 2000ms
    setTimeout(() => setBottlePhase('launching'), 2000);

    // Reset after animation completes
    setTimeout(() => {
      setBottlePhase('idle');
      router.push('/product');
    }, 2800);
  };

  const tryLabel = locale === 'nl' ? 'Nu proberen' : 'Try now';

  return (
    <>
      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Bottle Animation Overlay */}
      {bottlePhase !== 'idle' && (
        <div className="fixed inset-0 z-[45] pointer-events-none flex items-end justify-center">
          <div
            className={cn(
              'transition-all',
              bottlePhase === 'rising' && 'animate-bottle-rise',
              bottlePhase === 'shaking' && 'animate-bottle-shake',
              bottlePhase === 'launching' && 'animate-bottle-launch',
            )}
          >
            <Image
              src="/images/bottle.png"
              alt="Norvia Gel Glove"
              width={300}
              height={420}
              className="select-none"
              style={{ filter: 'drop-shadow(0 0 40px rgba(0,163,255,0.4))' }}
              draggable={false}
            />
          </div>
        </div>
      )}

      {/* Sticky Bar */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        )}
      >
        <div className="bg-primary-dark/95 backdrop-blur-xl border-t border-accent/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {/* Left: Product info (desktop) */}
              <div className="hidden sm:flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">Norvia Gel Glove</p>
                  <p className="text-xs text-text-muted">{formatPrice('28.95', 'EUR')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none justify-end">
                {/* Try Now Button */}
                <button
                  onClick={handleTryNow}
                  disabled={bottlePhase !== 'idle'}
                  className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 text-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,163,255,0.2)] disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  <span className="text-xs sm:text-sm font-medium">{tryLabel}</span>
                </button>

                {/* Chat Button */}
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 text-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]"
                >
                  <MessageCircle size={16} />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">Chat</span>
                </button>

                {/* Buy / Checkout Button with glow */}
                {hasItems ? (
                  <a
                    href={cart.checkoutUrl}
                    className="sticky-glow-btn flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold text-white"
                  >
                    {t('cart.checkout')}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="sticky-glow-btn flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold text-white disabled:opacity-50"
                  >
                    <ShoppingCart size={16} />
                    <span className="hidden sm:inline">{isLoading ? '...' : t('cta.buyNow')}</span>
                    <span className="sm:hidden">{isLoading ? '...' : (locale === 'nl' ? 'Bestellen' : 'Order')}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
