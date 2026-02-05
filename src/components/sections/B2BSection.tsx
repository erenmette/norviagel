'use client';

import { useTranslations } from 'next-intl';
import { Package, Receipt, Truck, HeadphonesIcon, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function B2BSection() {
  const t = useTranslations('b2b');

  const benefits = [
    { key: 'volume', icon: Package },
    { key: 'invoice', icon: Receipt },
    { key: 'delivery', icon: Truck },
    { key: 'support', icon: HeadphonesIcon },
  ] as const;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 circuit-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 lg:p-16 glow-border overflow-hidden relative">
          {/* Background gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <ScrollAnimationWrapper>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
                  {t('title')}
                </h2>
                <p className="text-lg text-text-secondary mt-6 leading-relaxed">
                  {t('subtitle')}
                </p>

                <a
                  href={`mailto:${t('ctaEmail')}?subject=B2B Offerte Norvia Gel Glove`}
                  className="inline-flex items-center gap-2 btn-primary text-base px-8 py-4 mt-8"
                >
                  {t('cta')}
                  <ArrowRight size={18} />
                </a>
              </div>
            </ScrollAnimationWrapper>

            {/* Right - Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <ScrollAnimationWrapper key={benefit.key} delay={i * 100}>
                  <div className="glass-light rounded-xl p-6 card-hover h-full">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <benefit.icon size={20} className="text-accent" />
                    </div>
                    <p className="text-sm font-medium text-white">
                      {t(`benefits.${benefit.key}`)}
                    </p>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
