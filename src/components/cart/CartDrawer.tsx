'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useCart } from '@/lib/cart-context';
import { X, Minus, Plus, Trash2, ShoppingBag, Tag, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const lines = cart?.lines.edges.map((edge) => edge.node) || [];
  const totalQuantity = cart?.totalQuantity || 0;

  // Calculate savings when 12+ items (€2 per item)
  const hasVolumeDiscount = totalQuantity >= 12;
  const savingsAmount = hasVolumeDiscount ? totalQuantity * 2 : 0;
  const itemsNeededForDiscount = hasVolumeDiscount ? 0 : 12 - totalQuantity;
  const progressPercent = Math.min((totalQuantity / 12) * 100, 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 glass border-l border-border flex flex-col transition-transform duration-300 ease-out ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-accent" />
            <h2 className="text-lg font-semibold">{t('title')}</h2>
            {cart && cart.totalQuantity > 0 && (
              <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-text-muted hover:text-white transition-colors hover:rotate-90 duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Volume Discount Progress Bar */}
        {lines.length > 0 && (
          <div className={`mx-6 mt-4 p-4 rounded-xl glass-light border border-border transition-all duration-500 delay-100 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag size={16} className={hasVolumeDiscount ? 'text-green-400' : 'text-accent'} />
                <span className={`text-sm font-semibold ${hasVolumeDiscount ? 'text-green-400' : 'text-white'}`}>
                  {hasVolumeDiscount
                    ? (locale === 'nl' ? 'Volumekorting actief!' : 'Volume discount active!')
                    : (locale === 'nl' ? 'Volumekorting' : 'Volume discount')}
                </span>
              </div>
              {hasVolumeDiscount && (
                <CheckCircle2 size={18} className="text-green-400" />
              )}
            </div>

            {/* Glowing Progress Bar */}
            <div className="relative h-3 rounded-full bg-surface-light border border-border overflow-hidden">
              {/* Animated background glow */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: hasVolumeDiscount
                    ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(0,163,255,0.5), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              />

              {/* Progress fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: hasVolumeDiscount
                    ? 'linear-gradient(90deg, #22C55E, #4ADE80)'
                    : 'linear-gradient(90deg, #00A3FF, #33B5FF)',
                  boxShadow: hasVolumeDiscount
                    ? '0 0 20px rgba(34,197,94,0.6), 0 0 40px rgba(34,197,94,0.3)'
                    : '0 0 20px rgba(0,163,255,0.6), 0 0 40px rgba(0,163,255,0.3)',
                }}
              />

              {/* Animated shine effect */}
              <div
                className="absolute inset-y-0 w-20 rounded-full"
                style={{
                  left: `${Math.min(progressPercent - 10, 90)}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: progressPercent > 0 ? 'pulse 1.5s ease-in-out infinite' : 'none',
                }}
              />
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center mt-2">
              <span className="text-text-muted text-xs">
                {totalQuantity} / 12 {locale === 'nl' ? 'stuks' : 'units'}
              </span>
              {hasVolumeDiscount ? (
                <span className="text-green-400 text-xs font-semibold">
                  {locale === 'nl' ? 'Je bespaart' : 'You save'} €{savingsAmount.toFixed(2).replace('.', ',')}!
                </span>
              ) : (
                <span className="text-accent text-xs font-medium">
                  {locale === 'nl'
                    ? `Nog ${itemsNeededForDiscount} voor korting`
                    : `${itemsNeededForDiscount} more for discount`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full text-center transition-all duration-500 delay-150 ${
              isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <ShoppingBag size={48} className="text-text-muted/30 mb-4" />
              <p className="text-text-muted">{t('empty')}</p>
              <button
                onClick={closeCart}
                className="mt-4 btn-secondary text-sm"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line, index) => {
                const image = line.merchandise.product.images.edges[0]?.node;
                return (
                  <div
                    key={line.id}
                    className={`flex gap-4 p-4 rounded-xl glass-light transition-all duration-300 ${
                      isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ transitionDelay: `${150 + index * 50}ms` }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg bg-surface overflow-hidden flex-shrink-0">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || line.merchandise.product.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted">
                          <ShoppingBag size={24} />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white truncate">
                        {line.merchandise.product.title}
                      </h3>
                      <p className="text-sm text-accent font-semibold mt-1">
                        {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateItem(line.id, Math.max(0, line.quantity - 1))}
                            disabled={isLoading}
                            className="p-1.5 hover:text-accent transition-colors disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="p-1.5 hover:text-accent transition-colors disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem([line.id])}
                          disabled={isLoading}
                          className="p-1.5 text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className={`p-6 border-t border-border space-y-3 transition-all duration-300 delay-200 ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Savings Display */}
            {hasVolumeDiscount && (
              <div className="flex items-center justify-between text-green-400">
                <span className="text-sm">{locale === 'nl' ? 'Korting' : 'Discount'}</span>
                <span className="text-sm font-semibold">-€{savingsAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-text-secondary">{t('subtotal')}</span>
              <span className="text-lg font-bold text-white">
                {formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            <p className="text-xs text-text-muted text-center">
              {t('shippingAtCheckout')}
            </p>
            <a
              href={cart.checkoutUrl}
              className="block w-full btn-primary text-center text-base py-4"
            >
              {t('checkout')}
            </a>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </>
  );
}
