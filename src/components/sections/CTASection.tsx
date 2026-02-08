'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, ArrowRight, Instagram } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

// TikTok icon component
const TikTokIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/norvia_gel_glove_eu/',
  tiktok: 'https://www.tiktok.com/@www.norviaeu.com',
};

export default function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  const followText = locale === 'nl' ? 'Volg ons' : 'Follow us';

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

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <p className="text-text-muted text-sm mb-4">{followText}</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300"
              >
                <Instagram size={18} className="text-purple-400 group-hover:text-purple-300" />
                <span className="text-sm text-purple-400 group-hover:text-purple-300 font-medium">Instagram</span>
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-all duration-300"
              >
                <TikTokIcon size={18} className="text-white/70 group-hover:text-white" />
                <span className="text-sm text-white/70 group-hover:text-white font-medium">TikTok</span>
              </a>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
