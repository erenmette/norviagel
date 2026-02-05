'use client';

import { useTranslations } from 'next-intl';
import { Shield, Droplets, FlaskConical, Heart, Hand, Zap } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    { key: 'protection', icon: Shield },
    { key: 'washable', icon: Droplets },
    { key: 'siliconeFree', icon: FlaskConical },
    { key: 'skinCare', icon: Heart },
    { key: 'grip', icon: Hand },
    { key: 'fast', icon: Zap },
  ] as const;

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] gradient-radial" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-6 leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <ScrollAnimationWrapper key={feature.key} delay={i * 100}>
              <div className="glass rounded-2xl p-8 card-hover group h-full">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:glow-sm transition-all duration-300">
                  <feature.icon size={24} className="text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`items.${feature.key}.title`)}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {t(`items.${feature.key}.description`)}
                </p>

                {/* Bottom accent line */}
                <div className="mt-6 h-0.5 w-0 bg-accent/50 group-hover:w-full transition-all duration-500" />
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
