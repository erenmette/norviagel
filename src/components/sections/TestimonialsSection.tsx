'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = ['jan', 'annelies', 'dirk'] as const;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface/30" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] gradient-radial opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            {t('title')}
          </h2>
        </ScrollAnimationWrapper>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((key, i) => (
            <ScrollAnimationWrapper key={key} delay={i * 150}>
              <div className="glass rounded-2xl p-8 card-hover h-full flex flex-col">
                {/* Quote icon */}
                <Quote size={32} className="text-accent/20 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-accent fill-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-text-secondary leading-relaxed flex-1 mb-6">
                  &ldquo;{t(`items.${key}.text`)}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">
                      {t(`items.${key}.name`).charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {t(`items.${key}.name`)}
                    </p>
                    <p className="text-xs text-text-muted">
                      {t(`items.${key}.role`)}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
