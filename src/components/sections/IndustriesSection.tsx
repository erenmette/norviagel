'use client';

import { useTranslations } from 'next-intl';
import { Car, HardHat, Paintbrush, Scissors, Home, Factory } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function IndustriesSection() {
  const t = useTranslations('industries');

  const industries = [
    { key: 'automotive', icon: Car },
    { key: 'construction', icon: HardHat },
    { key: 'painting', icon: Paintbrush },
    { key: 'hairdressing', icon: Scissors },
    { key: 'roofing', icon: Home },
    { key: 'industry', icon: Factory },
  ] as const;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-surface/50" />
      <div className="absolute inset-0 circuit-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-badge">{t('badge')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        {/* Industries Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {industries.map((industry, i) => (
            <ScrollAnimationWrapper key={industry.key} delay={i * 80}>
              <div className="group relative glass rounded-2xl p-6 lg:p-8 card-hover overflow-hidden h-full">
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-500" />

                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                    <industry.icon size={22} className="text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(`items.${industry.key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {t(`items.${industry.key}.description`)}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
