'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { Shield, Clock, FlaskConical, Hand, Droplets, CheckCircle2, Minus, Plus, ShoppingCart, Zap, Package, Truck, Play } from 'lucide-react';
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

  const scrollToVideos = () => {
    document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Gallery tiles: product images with a video tile inserted as the 3rd slot
  const videoPoster = '/videos/norvia-1.jpg';
  const insertAt = Math.min(2, images.length);
  const galleryTiles: ({ type: 'image'; img: ProductImage; index: number } | { type: 'video' })[] = [
    ...images.slice(0, insertAt).map((img, i) => ({ type: 'image' as const, img, index: i })),
    { type: 'video' as const },
    ...images.slice(insertAt).map((img, i) => ({ type: 'image' as const, img, index: insertAt + i })),
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
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

              {/* Thumbnails + video gallery link */}
              <div className="flex flex-wrap gap-3 mt-4">
                {galleryTiles.map((tile, k) =>
                  tile.type === 'image' ? (
                    <button
                      key={`img-${tile.index}`}
                      onClick={() => setSelectedImage(tile.index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border transition-colors ${
                        tile.index === selectedImage
                          ? 'border-accent glow-sm'
                          : 'border-border glass-light hover:border-accent/50'
                      }`}
                    >
                      <Image
                        src={tile.img.url}
                        alt={tile.img.altText || `Product foto ${tile.index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ) : (
                    <button
                      key="video-link"
                      onClick={scrollToVideos}
                      aria-label={t('watchVideos')}
                      className="group relative w-20 h-20 rounded-xl overflow-hidden border-2 border-accent glow-sm animate-pulse-glow"
                    >
                      <Image
                        src={videoPoster}
                        alt={t('watchVideos')}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-primary-dark/50 flex items-center justify-center group-hover:bg-primary-dark/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play size={16} className="text-white ml-0.5" fill="white" />
                        </div>
                      </div>
                      <span className="absolute bottom-0 inset-x-0 bg-accent text-white text-[9px] font-bold text-center py-0.5 uppercase tracking-wide">
                        {t('videosTab')}
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Clear call-out to the video showcase */}
              <button
                onClick={scrollToVideos}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass-light border border-accent/30 text-sm font-semibold text-white hover:border-accent hover:glow transition-all"
              >
                <Play size={16} className="text-accent" fill="currentColor" />
                {t('watchVideos')}
              </button>
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
              <div id="order" className="space-y-5 pt-4 scroll-mt-28">

                {/* PRIMARY: Single Unit Purchase - Most Prominent */}
                <div className="rounded-2xl p-5 relative overflow-hidden" style={{
                  background: 'linear-gradient(135deg, rgba(0,163,255,0.12) 0%, rgba(0,163,255,0.04) 100%)',
                  border: '2px solid rgba(0,163,255,0.4)',
                }}>
                  {/* Per Stuk Badge */}
                  <span className="inline-flex bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                    {t('perUnitBadge')}
                  </span>

                  {/* Header with clear messaging */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 border border-accent/30">
                      <span className="text-2xl font-black text-accent">1×</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-lg">{t('orderOneBottle')}</p>
                      <p className="text-text-secondary text-sm">{t('noBoxJustUnit')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black text-accent">{formatPrice(price, currencyCode)}</p>
                      <p className="text-xs text-text-muted">{t('perUnitInclVat')}</p>
                    </div>
                  </div>

                  {/* Quantity selector + Add to cart */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary font-medium">{t('quantity')}:</span>
                      <div className="rounded-xl p-1 flex items-center border border-accent/30 bg-accent/10">
                        <button
                          onClick={() => changeQuantity(quantity - 1)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-accent/20 active:scale-90 transition-all duration-200 text-accent"
                        >
                          <Minus size={16} />
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center">
                          <span className={`text-xl font-bold text-white transition-all duration-200 ${
                            isAnimating ? 'scale-125 text-accent' : 'scale-100'
                          }`}>
                            {quantity}
                          </span>
                        </div>
                        <button
                          onClick={() => changeQuantity(quantity + 1)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-accent/20 active:scale-90 transition-all duration-200 text-accent"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="text-sm text-text-muted">{quantity === 1 ? t('unit') : t('units')}</span>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isLoading || !available}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: 'linear-gradient(135deg, #00A3FF 0%, #0080CC 100%)',
                        boxShadow: '0 4px 20px rgba(0,163,255,0.4)',
                      }}
                    >
                      <ShoppingCart size={18} />
                      {isLoading ? '...' : t('addToCart')}
                    </button>
                  </div>

                  {/* Volume discount active indicator */}
                  {quantity >= 12 && (
                    <div className="mt-3 text-center">
                      <span className="inline-flex items-center gap-1.5 text-sm text-green-400 bg-green-500/15 px-4 py-2 rounded-full font-medium">
                        <CheckCircle2 size={16} />
                        {t('volumeDiscountActive')}
                      </span>
                    </div>
                  )}
                </div>

                {/* SECONDARY: Box option as subtle upsell */}
                <div className="glass-light rounded-xl p-4 border border-border hover:border-green-500/30 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                        <Package size={18} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm flex items-center gap-2">
                          {t('boxTip')}
                        </p>
                        <p className="text-green-400 text-xs">{t('boxTipSavings')}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="rounded-lg p-0.5 flex items-center border border-green-500/20 bg-green-500/5">
                        <button
                          onClick={() => changeBoxQuantity(boxQuantity - 1)}
                          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-green-500/15 active:scale-90 transition-all duration-200 text-green-400"
                        >
                          <Minus size={14} />
                        </button>
                        <div className="w-8 h-8 flex items-center justify-center">
                          <span className={`text-sm font-bold text-white transition-all duration-200 ${
                            isBoxAnimating ? 'scale-110 text-green-400' : 'scale-100'
                          }`}>
                            {boxQuantity}
                          </span>
                        </div>
                        <button
                          onClick={() => changeBoxQuantity(boxQuantity + 1)}
                          className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-green-500/15 active:scale-90 transition-all duration-200 text-green-400"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={handleAddBoxToCart}
                        disabled={isLoading || !available}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white text-sm disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                        }}
                      >
                        <ShoppingCart size={14} />
                        €{boxTotal}
                      </button>
                    </div>
                  </div>
                  <p className="text-text-muted text-xs mt-2 pl-13">
                    {boxQuantity} {boxQuantity === 1 ? t('box') : t('boxes')} = {boxQuantity * 12} {t('units')}
                  </p>
                </div>

              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 pt-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-accent" /> {t('badges.siliconeFree')}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-accent" /> {t('badges.greaseFree')}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-accent" /> {t('badges.skinCaring')}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-accent" /> {t('badges.dermatological')}
                </span>
                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                  <CheckCircle2 size={14} className="text-accent" /> {t('badges.iso')}
                </span>
                <span className="flex items-center gap-1.5 bg-green-500/10 px-2 py-1 rounded-full text-green-400">
                  <Truck size={14} /> {t('badges.fastDelivery')}
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

        {/* Certifications */}
        <div className="mt-20">
          <ScrollAnimationWrapper>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Gecertificeerde Kwaliteit</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center card-hover min-h-[160px]">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Shield size={40} className="text-accent" />
                </div>
                <span className="text-sm font-semibold text-white">ISO 9001</span>
                <span className="text-xs text-text-muted mt-1">Kwaliteitsmanagement</span>
              </div>
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center card-hover min-h-[160px]">
                <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} className="text-accent" />
                </div>
                <span className="text-sm font-semibold text-white">GMP</span>
                <span className="text-xs text-text-muted mt-1">Good Manufacturing</span>
              </div>
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center card-hover min-h-[160px]">
                <div className="w-20 h-20 mb-4 relative">
                  <Image
                    src="/images/ce keurmerk.png"
                    alt="CE Keurmerk"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-white">CE Keurmerk</span>
                <span className="text-xs text-text-muted mt-1">Europees keurmerk</span>
              </div>
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center card-hover min-h-[160px]">
                <div className="w-20 h-20 mb-4 relative">
                  <Image
                    src="/images/dermatologisch getest certificering.png"
                    alt="Dermatologisch Getest"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-semibold text-white">Dermatologisch</span>
                <span className="text-xs text-text-muted mt-1">Getest & veilig</span>
              </div>
              <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center card-hover min-h-[160px]">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                  <FlaskConical size={40} className="text-green-400" />
                </div>
                <span className="text-sm font-semibold text-white">Parabeenvrij</span>
                <span className="text-xs text-text-muted mt-1">Geen parabenen</span>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
}
