'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useCart } from '@/lib/cart-context';
import { useRouter } from '@/i18n/navigation';
import { ShoppingCart, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import ChatWidget from '@/components/chat/ChatWidget';

const VARIANT_ID = 'gid://shopify/ProductVariant/57354473570688';

type AnimPhase =
  | 'idle'
  | 'hand-enter'     // Hand rises from below
  | 'bottle-enter'   // Bottle rises, hand swaps to protected
  | 'bottle-shake'   // Bottle shakes
  | 'bottle-exit'    // Bottle launches upward
  | 'dirt-enter'     // Dirt falls from above
  | 'dirt-repel'     // Protected hand repels dirt
  | 'cleanup';       // Protected hand descends

export default function StickyBar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const { cart, addItem, isLoading } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [phase, setPhase] = useState<AnimPhase>('idle');
  const [handSwapped, setHandSwapped] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const hasItems = cart && cart.totalQuantity > 0;

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  // Preload animation images
  useEffect(() => {
    const srcs = ['/images/hand.png', '/images/beschermde-hand.png', '/images/vuil.png', '/images/bottle.png'];
    srcs.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleAddToCart = async () => {
    await addItem(VARIANT_ID, 1);
    router.push('/product');
  };

  const handleTryNow = () => {
    if (phase !== 'idle') return;

    const schedule = (fn: () => void, ms: number) => {
      timeoutsRef.current.push(setTimeout(fn, ms));
    };

    setPhase('hand-enter');                               // 0ms    - hand rises
    schedule(() => setPhase('bottle-enter'), 900);        // 900ms  - bottle rises
    schedule(() => setHandSwapped(true), 1300);           // 1300ms - swap hand behind bottle
    schedule(() => setPhase('bottle-shake'), 2000);       // 2000ms - bottle shakes
    schedule(() => setPhase('bottle-exit'), 3200);        // 3200ms - bottle launches
    schedule(() => setPhase('dirt-enter'), 4000);         // 4000ms - dirt falls
    schedule(() => setPhase('dirt-repel'), 4800);         // 4800ms - dirt repelled
    schedule(() => setPhase('cleanup'), 5800);            // 5800ms - protected hand descends
    schedule(() => {                                      // 6600ms - navigate
      setPhase('idle');
      setHandSwapped(false);
      timeoutsRef.current = [];
      router.push('/product');
    }, 6600);
  };

  const tryLabel = locale === 'nl' ? 'Nu proberen' : 'Try now';

  // Determine which elements are visible per phase
  const showHand = ['hand-enter', 'bottle-enter'].includes(phase);
  const showBottle = ['bottle-enter', 'bottle-shake', 'bottle-exit'].includes(phase);
  const showProtected = ['bottle-enter', 'bottle-shake', 'bottle-exit', 'dirt-enter', 'dirt-repel', 'cleanup'].includes(phase);
  const showDirt = ['dirt-enter', 'dirt-repel'].includes(phase);
  const showShockwave = phase === 'dirt-repel';

  return (
    <>
      {/* Chat Widget */}
      <ChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Story Animation Overlay */}
      {phase !== 'idle' && (
        <div className="fixed inset-0 z-[45] pointer-events-none overflow-hidden">
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-primary-dark/85 backdrop-blur-sm animate-[fadeIn_0.4s_ease-out_forwards]" />

          {/* Unprotected Hand */}
          {showHand && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center z-10',
                phase === 'hand-enter' && 'animate-[story-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]',
              )}
              style={{
                opacity: handSwapped ? 0 : 1,
                transition: 'opacity 0.6s ease-out',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hand.png"
                alt="Unprotected hand"
                className="select-none w-[260px] sm:w-[340px] h-auto"
                style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.1))' }}
                draggable={false}
              />
            </div>
          )}

          {/* Protected Hand */}
          {showProtected && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center z-10',
                phase === 'cleanup' && 'animate-[story-sink_0.8s_ease-in_forwards]',
              )}
              style={{
                opacity: handSwapped ? 1 : 0,
                transition: 'opacity 0.6s ease-out',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/beschermde-hand.png"
                alt="Protected hand"
                className="select-none w-[260px] sm:w-[340px] h-auto"
                style={{
                  filter: phase === 'dirt-repel'
                    ? 'drop-shadow(0 0 50px rgba(0,163,255,0.7)) drop-shadow(0 0 100px rgba(0,163,255,0.4))'
                    : 'drop-shadow(0 0 25px rgba(0,163,255,0.3))',
                  transition: 'filter 0.3s ease',
                }}
                draggable={false}
              />
              {/* Shield glow ring on repel */}
              {showShockwave && (
                <div
                  className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full animate-[story-shield-glow_0.8s_ease-out_forwards]"
                />
              )}
            </div>
          )}

          {/* Bottle */}
          {showBottle && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center z-20',
                phase === 'bottle-enter' && 'animate-[story-bottle-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                phase === 'bottle-exit' && 'animate-[story-bottle-launch_0.8s_cubic-bezier(0.5,0,1,0.5)_forwards]',
              )}
            >
              <div className={phase === 'bottle-shake' ? 'animate-[story-shake_1.2s_ease-in-out]' : ''}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bottle.png"
                  alt="Norvia Gel Glove"
                  className="select-none w-[300px] sm:w-[380px] h-auto"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(0,163,255,0.4))' }}
                  draggable={false}
                />
              </div>
            </div>
          )}

          {/* Dirt / Vuil */}
          {showDirt && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center z-[15]',
                phase === 'dirt-enter' && 'animate-[story-dirt-fall_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]',
                phase === 'dirt-repel' && 'animate-[story-dirt-repel_0.9s_cubic-bezier(0.2,0,0.9,0.1)_forwards]',
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/vuil.png"
                alt="Dirt"
                className="select-none w-[110vw] max-w-none h-auto"
                draggable={false}
              />
            </div>
          )}

          {/* Shockwave rings */}
          {showShockwave && (
            <div className="absolute inset-0 flex items-center justify-center z-[25]">
              <div className="animate-[story-shockwave_0.7s_ease-out_forwards] w-48 h-48 rounded-full border-2 border-accent/70" />
              <div className="animate-[story-shockwave_0.7s_ease-out_0.1s_forwards] w-40 h-40 rounded-full border border-accent/50 absolute" />
              <div className="animate-[story-shockwave_0.7s_ease-out_0.2s_forwards] w-32 h-32 rounded-full border border-accent/30 absolute" />
            </div>
          )}
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

              {/* Actions — symmetric: try | chat | buy */}
              <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-none">
                {/* Try Now Button */}
                <button
                  onClick={handleTryNow}
                  disabled={phase !== 'idle'}
                  className="sticky-glow-btn-alt flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold text-white disabled:opacity-50"
                >
                  <Sparkles size={16} />
                  <span>{tryLabel}</span>
                </button>

                {/* Chat Button */}
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="relative group flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 text-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,163,255,0.2)]"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm font-medium hidden sm:inline">Chat</span>
                </button>

                {/* Buy / Checkout Button with glow */}
                {hasItems ? (
                  <a
                    href={cart.checkoutUrl}
                    className="sticky-glow-btn flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold text-white"
                  >
                    {t('cart.checkout')}
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="sticky-glow-btn flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold text-white disabled:opacity-50"
                  >
                    <ShoppingCart size={16} />
                    <span>{isLoading ? '...' : t('cta.buyNow')}</span>
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
