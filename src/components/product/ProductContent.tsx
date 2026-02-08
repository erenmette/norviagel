'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { Shield, Clock, FlaskConical, Hand, Droplets, CheckCircle2, Minus, Plus, ShoppingCart, Zap, Package, PartyPopper } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';
import type { VolumeTier } from '@/lib/shopify';

type ProductImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

type Props = {
  images: ProductImage[];
  variantId: string;
  price: string;
  currencyCode: string;
  available: boolean;
  volumeTiers: VolumeTier[];
};

export default function ProductContent({ images, variantId, price, currencyCode, available, volumeTiers }: Props) {
  const t = useTranslations('product');
  const { addItem, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reachedMilestone, setReachedMilestone] = useState<string | null>(null);
  const prevQuantity = useRef(1);

  const handleAddToCart = async () => {
    await addItem(variantId, quantity);
  };

  const specs = [
    { key: 'duration', icon: Shield },
    { key: 'drying', icon: Clock },
    { key: 'silicone', icon: FlaskConical },
    { key: 'application', icon: Hand },
    { key: 'washing', icon: Droplets },
  ] as const;

  const basePrice = parseFloat(price);

  // Build display tiers from Shopify metafield data + base price
  const displayTiers = useMemo(() => {
    return volumeTiers.map((tier) => {
      const unitPrice = basePrice * (1 - tier.discount / 100);
      const label = tier.max >= 999 ? `${tier.min}+` : `${tier.min}-${tier.max}`;
      const priceStr = `€${unitPrice.toFixed(2).replace('.', ',')}`;
      const discountStr = tier.discount > 0 ? `-${tier.discount}%` : '';
      return { ...tier, label, price: priceStr, unitPrice, discountStr };
    });
  }, [volumeTiers, basePrice]);

  // Build milestones from tiers that have a discount
  const milestones = useMemo(() => {
    return volumeTiers
      .filter((tier) => tier.discount > 0)
      .map((tier) => ({ qty: tier.min, discount: `${tier.discount}%` }));
  }, [volumeTiers]);

  const maxMilestone = milestones.length > 0 ? milestones[milestones.length - 1].qty : 50;
  const progressPercent = Math.min((quantity / maxMilestone) * 100, 100);
  const currentTier = displayTiers.find((t) => quantity >= t.min && quantity <= t.max) || displayTiers[0];
  const nextMilestone = milestones.find((m) => quantity < m.qty);

  const changeQuantity = (newQty: number) => {
    const clamped = Math.max(1, newQty);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);

    // Check if crossing a milestone
    for (const m of milestones) {
      if (prevQuantity.current < m.qty && clamped >= m.qty) {
        setReachedMilestone(m.discount);
        setTimeout(() => setReachedMilestone(null), 2000);
      }
    }

    prevQuantity.current = clamped;
    setQuantity(clamped);
  };

  const currentImage = images[selectedImage];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Product Image */}
          <ScrollAnimationWrapper direction="right">
            <div className="relative">
              <div className="aspect-square rounded-3xl glass glow-border overflow-hidden flex items-center justify-center relative">
                {currentImage ? (
                  <Image
                    src={currentImage.url}
                    alt={currentImage.altText || 'Norvia Gel Glove'}
                    width={currentImage.width}
                    height={currentImage.height}
                    className="w-full h-full object-contain p-6"
                    priority
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-40 h-56 mx-auto rounded-2xl bg-gradient-to-b from-accent/20 to-accent/5 border border-accent/30 flex items-center justify-center animate-float">
                      <span className="text-6xl font-bold text-accent">N</span>
                    </div>
                    <p className="text-sm text-text-muted mt-4 uppercase tracking-widest">Norvia Gel Glove</p>
                  </div>
                )}

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border transition-colors ${
                        i === selectedImage
                          ? 'border-accent glow-sm'
                          : 'border-border glass-light hover:border-accent/50'
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.altText || `Product foto ${i + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimationWrapper>

          {/* Right - Product Info */}
          <ScrollAnimationWrapper direction="left" delay={200}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <p className="text-accent font-medium text-sm uppercase tracking-wider">
                  {t('subtitle')}
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2">
                  {t('title')}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">
                  {formatPrice(price, currencyCode)}
                </span>
                <span className="text-sm text-text-muted">incl. BTW</span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 size={16} className={available ? 'text-green-400' : 'text-red-400'} />
                <span className={`font-medium ${available ? 'text-green-400' : 'text-red-400'}`}>
                  {available ? t('inStock') : t('outOfStock')}
                </span>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed">
                {t('description')}
              </p>

              {/* Quick features */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Shield, text: '4h' },
                  { icon: Droplets, text: 'H₂O' },
                  { icon: Zap, text: '1 min' },
                ].map((feat, i) => (
                  <div key={i} className="glass-light rounded-xl p-3 text-center">
                    <feat.icon size={18} className="text-accent mx-auto mb-1" />
                    <p className="text-xs text-text-secondary font-medium">{feat.text}</p>
                  </div>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  {/* Compact quantity selector */}
                  <div className="glass rounded-xl p-1 flex items-center border border-border shrink-0">
                    <button
                      onClick={() => changeQuantity(quantity - 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-accent/15 active:scale-90 transition-all duration-200 text-text-secondary hover:text-accent"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <span
                        className={`text-lg font-bold text-white transition-all duration-200 ${
                          isAnimating ? 'scale-125 text-accent' : 'scale-100'
                        }`}
                      >
                        {quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => changeQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-accent/15 active:scale-90 transition-all duration-200 text-text-secondary hover:text-accent"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading || !available}
                    className="flex-1 sticky-glow-btn text-base py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-white disabled:opacity-50"
                  >
                    <ShoppingCart size={18} />
                    {isLoading ? '...' : t('addToCart')}
                  </button>
                </div>

                {/* Volume discount progress bar */}
                <div className="glass rounded-2xl p-4 sm:p-5 border border-border relative overflow-hidden">
                  {/* Milestone celebration overlay */}
                  {reachedMilestone && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-accent/10 backdrop-blur-sm rounded-2xl animate-pulse">
                      <div className="flex items-center gap-2 text-accent font-bold text-lg">
                        <PartyPopper size={22} />
                        <span>{reachedMilestone} korting!</span>
                        <PartyPopper size={22} />
                      </div>
                    </div>
                  )}

                  {/* Current tier info */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm text-text-secondary">
                      {currentTier.discountStr
                        ? <span className="text-accent font-semibold">{currentTier.discountStr} korting</span>
                        : <span className="text-text-muted">Geen korting</span>
                      }
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white">
                      {currentTier.unitPrice.toFixed(2).replace('.', ',')} p/st
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2.5 rounded-full bg-surface-light border border-border overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progressPercent}%`,
                        background: 'linear-gradient(90deg, #00A3FF, #33B5FF)',
                        boxShadow: '0 0 12px rgba(0,163,255,0.5), 0 0 24px rgba(0,163,255,0.2)',
                      }}
                    />
                  </div>

                  {/* Milestones as a simple row */}
                  <div className="flex justify-between mt-3 px-1">
                    {milestones.map((m) => {
                      const reached = quantity >= m.qty;
                      return (
                        <div key={m.qty} className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              reached
                                ? 'bg-accent shadow-[0_0_6px_rgba(0,163,255,0.6)]'
                                : 'bg-surface-light border border-border'
                            }`}
                          />
                          <span className={`text-[11px] font-medium ${reached ? 'text-accent' : 'text-text-muted'}`}>
                            {m.qty}x = {m.discount}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Next milestone hint */}
                  {nextMilestone && (
                    <p className="text-[11px] text-text-muted mt-3 text-center">
                      Nog <span className="text-accent font-semibold">{nextMilestone.qty - quantity}</span> voor{' '}
                      <span className="text-accent font-semibold">{nextMilestone.discount}</span> korting
                    </p>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent" /> Siliconenvrij
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent" /> Huidverzorgend
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent" /> Snelle levering
                </span>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Specifications */}
        <div id="specs" className="mt-24">
          <ScrollAnimationWrapper>
            <h2 className="text-3xl font-bold text-white mb-8">{t('specifications')}</h2>
          </ScrollAnimationWrapper>

          <div className="glass rounded-2xl overflow-hidden">
            {specs.map((spec, i) => (
              <ScrollAnimationWrapper key={spec.key} delay={i * 50}>
                <div className="flex items-center gap-4 p-6 border-b border-border last:border-0 hover:bg-accent/5 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <spec.icon size={18} className="text-accent" />
                  </div>
                  <span className="text-text-secondary flex-1">{t(`specs.${spec.key}`)}</span>
                  <span className="text-white font-medium">{t(`specs.${spec.key}Value`)}</span>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>

        {/* Volume Pricing (B2B) */}
        <div className="mt-16">
          <ScrollAnimationWrapper>
            <div className="flex items-center gap-3 mb-8">
              <Package size={24} className="text-accent" />
              <h2 className="text-3xl font-bold text-white">{t('volumePricing')}</h2>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayTiers.map((tier, i) => {
              const isActive = quantity >= tier.min && quantity <= tier.max;
              return (
                <ScrollAnimationWrapper key={tier.label} delay={i * 100}>
                  <div className={`glass rounded-2xl p-6 text-center card-hover transition-all duration-300 ${
                    isActive ? 'border border-accent/40 shadow-[0_0_20px_rgba(0,163,255,0.15)]' : ''
                  }`}>
                    <p className="text-sm text-text-muted mb-2">{t('quantity')}</p>
                    <p className="text-xl font-bold text-white mb-3">{tier.label}</p>
                    <p className={`text-2xl font-bold ${isActive ? 'text-accent' : 'text-text-secondary'}`}>{tier.price}</p>
                    {tier.discountStr && (
                      <span className="inline-block mt-2 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                        {tier.discountStr}
                      </span>
                    )}
                  </div>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
