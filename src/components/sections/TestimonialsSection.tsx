'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import reviews from '@/data/reviews';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const locale = useLocale() as 'nl' | 'en';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] gradient-radial opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            {t('title')}
          </h2>
        </ScrollAnimationWrapper>

        {/* Average rating summary */}
        <ScrollAnimationWrapper className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-light/50 border border-border">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-accent fill-accent" />
              ))}
            </div>
            <span className="text-sm text-text-secondary font-medium">
              5.0 — {reviews.length} {locale === 'nl' ? 'beoordelingen' : 'reviews'}
            </span>
          </div>
        </ScrollAnimationWrapper>

        {/* Review Cards — scroll horizontally on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {reviews.map((review, i) => (
            <ScrollAnimationWrapper
              key={review.id}
              delay={i * 100}
              className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-start"
            >
              <div className="glass rounded-2xl p-8 card-hover h-full flex flex-col">
                {/* Quote icon */}
                <Quote size={28} className="text-accent/20 mb-3" />

                {/* Stars + date row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={
                          j < review.rating
                            ? 'text-accent fill-accent'
                            : 'text-text-muted'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-muted">
                    {formatDate(review.date)}
                  </span>
                </div>

                {/* Text */}
                <p className="text-text-secondary leading-relaxed flex-1 mb-6 text-sm">
                  &ldquo;{review.text[locale]}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-text-muted truncate">
                      {review.role[locale]}
                    </p>
                  </div>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-accent/70" title={locale === 'nl' ? 'Geverifieerde aankoop' : 'Verified purchase'}>
                      <BadgeCheck size={16} />
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
