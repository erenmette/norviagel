'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-radial" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollAnimationWrapper>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Price */}
          <div className="mt-10 inline-flex items-baseline gap-2">
            <span className="text-text-muted text-lg">{t('price')}</span>
            <span className="text-5xl font-bold text-accent glow-text">&euro;28,95</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/product"
              className="btn-primary text-base px-10 py-4 inline-flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              {t('addToCart')}
            </Link>
            <Link
              href="/product"
              className="btn-secondary text-base px-10 py-4 inline-flex items-center justify-center gap-2"
            >
              {t('buyNow')}
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
