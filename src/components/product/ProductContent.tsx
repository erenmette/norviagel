'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { Shield, Clock, FlaskConical, Hand, Droplets, CheckCircle2, Minus, Plus, ShoppingCart, Zap, Package } from 'lucide-react';
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
  const [boxQuantity, setBoxQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBoxAnimating, setIsBoxAnimating] = useState(false);

  const handleAddToCart = async () => {
    await addItem(variantId, quantity);
  };

  const handleAddBoxToCart = async () => {
    await addItem(variantId, boxQuantity * 12);
  };

  const specs = [
    { key: 'duration', icon: Shield },
    { key: 'drying', icon: Clock },
    { key: 'silicone', icon: FlaskConical },
    { key: 'application', icon: Hand },
    { key: 'washing', icon: Droplets },
  ] as const;

  const basePrice = parseFloat(price);
  const boxPrice = 26.95;
  const boxTotal = (boxQuantity * 12 * boxPrice).toFixed(2).replace('.', ',');
  const boxSavings = (boxQuantity * 12 * 2).toFixed(2).replace('.', ',');

  const changeQuantity = (newQty: number) => {
    const clamped = Math.max(1, newQty);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    setQuantity(clamped);
  };

  const changeBoxQuantity = (newQty: number) => {
    const clamped = Math.max(1, Math.min(10, newQty));
    setIsBoxAnimating(true);
    setTimeout(() => setIsBoxAnimating(false), 200);
    setBoxQuantity(clamped);
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
                  { icon: Zap, text: '2 min' },
                ].map((feat, i) => (
                  <div key={i} className="glass-light rounded-xl p-3 text-center">
                    <feat.icon size={18} className="text-accent mx-auto mb-1" />
                    <p className="text-xs text-text-secondary font-medium">{feat.text}</p>
                  </div>
                ))}
              </div>

              {/* Purchase Options */}
              <div className="space-y-4 pt-4">

                {/* Box Purchase Option - Most Prominent */}
                <div className="rounded-2xl p-4 relative overflow-hidden" style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 100%)',
                  border: '2px solid rgba(34,197,94,0.3)',
                }}>
                  {/* Best Value Badge */}
                  <div className="absolute -top-0 -right-0">
                    <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                      BESTE DEAL
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Package size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-bold">{t('buyBox')}</p>
                      <p className="text-green-400 text-sm">€26,95 per stuk</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Box quantity selector */}
                    <div className="rounded-xl p-1 flex items-center border border-green-500/30 bg-green-500/10 shrink-0">
                      <button
                        onClick={() => changeBoxQuantity(boxQuantity - 1)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-500/20 active:scale-90 transition-all duration-200 text-green-400"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-12 h-10 flex items-center justify-center">
                        <span className={`text-lg font-bold text-white transition-all duration-200 ${
                          isBoxAnimating ? 'scale-125 text-green-400' : 'scale-100'
                        }`}>
                          {boxQuantity}
                        </span>
                      </div>
                      <button
                        onClick={() => changeBoxQuantity(boxQuantity + 1)}
                        className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-green-500/20 active:scale-90 transition-all duration-200 text-green-400"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex-1 text-center">
                      <p className="text-text-muted text-xs">{boxQuantity} {boxQuantity === 1 ? 'doos' : 'dozen'} = {boxQuantity * 12} stuks</p>
                    </div>

                    <button
                      onClick={handleAddBoxToCart}
                      disabled={isLoading || !available}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                        boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
                      }}
                    >
                      <ShoppingCart size={16} />
                      {isLoading ? '...' : `€${boxTotal}`}
                    </button>
                  </div>

                  <p className="text-green-400 text-xs mt-2 text-center">
                    {t('addBoxToCart')} - {t('save')} €{boxSavings}!
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-border"></div>
                  <span className="text-text-muted text-sm">of bestel per stuk</span>
                  <div className="flex-1 h-px bg-border"></div>
                </div>

                {/* Single Item Purchase */}
                <div className="flex items-center gap-3">
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
                    className="flex-1 btn-primary text-base py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-white disabled:opacity-50"
                  >
                    <ShoppingCart size={18} />
                    {isLoading ? '...' : t('addToCart')}
                  </button>
                </div>

                {/* Volume discount hint for single items */}
                {quantity < 12 && (
                  <p className="text-center text-xs text-text-muted">
                    Tip: Bestel 12+ stuks voor €26,95 per stuk
                  </p>
                )}
                {quantity >= 12 && (
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                      <CheckCircle2 size={14} />
                      Volumekorting actief: €26,95 per stuk
                    </span>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent" /> Siliconenvrij
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-accent" /> Vetvrij
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

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {/* 1-11 stuks */}
            <ScrollAnimationWrapper delay={0}>
              <div className="glass rounded-2xl p-6 text-center card-hover">
                <p className="text-sm text-text-muted mb-2">Aantal</p>
                <p className="text-xl font-bold text-white mb-3">1 - 11</p>
                <p className="text-2xl font-bold text-accent">€28,95</p>
                <p className="text-xs text-text-muted mt-1">per stuk</p>
              </div>
            </ScrollAnimationWrapper>

            {/* 12+ stuks */}
            <ScrollAnimationWrapper delay={100}>
              <div className="glass rounded-2xl p-6 text-center card-hover border border-green-500/30">
                <p className="text-sm text-text-muted mb-2">Aantal</p>
                <p className="text-xl font-bold text-white mb-3">12+ (doos)</p>
                <p className="text-2xl font-bold text-green-400">€26,95</p>
                <p className="text-xs text-text-muted mt-1">per stuk</p>
                <span className="inline-block mt-2 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                  Bespaar €2,00
                </span>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
