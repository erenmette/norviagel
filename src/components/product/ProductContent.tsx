'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { Shield, Clock, FlaskConical, Hand, Droplets, CheckCircle2, Minus, Plus, ShoppingCart, Zap, Package } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';

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
};

export default function ProductContent({ images, variantId, price, currencyCode, available }: Props) {
  const t = useTranslations('product');
  const { addItem, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

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

  const volumePricing = [
    { qty: '1-9', price: '€28,95', discount: '' },
    { qty: '10-24', price: '€26,05', discount: '-10%' },
    { qty: '25-49', price: '€24,60', discount: '-15%' },
    { qty: '50+', price: '€23,16', discount: '-20%' },
  ];

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
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-accent/10 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[4rem] text-center border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-accent/10 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isLoading || !available}
                  className="flex-1 btn-primary text-base py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <ShoppingCart size={18} />
                  {isLoading ? '...' : t('addToCart')}
                </button>
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
            {volumePricing.map((tier, i) => (
              <ScrollAnimationWrapper key={tier.qty} delay={i * 100}>
                <div className="glass rounded-2xl p-6 text-center card-hover">
                  <p className="text-sm text-text-muted mb-2">{t('quantity')}</p>
                  <p className="text-xl font-bold text-white mb-3">{tier.qty}</p>
                  <p className="text-2xl font-bold text-accent">{tier.price}</p>
                  {tier.discount && (
                    <span className="inline-block mt-2 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                      {tier.discount}
                    </span>
                  )}
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
