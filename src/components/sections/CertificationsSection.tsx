'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { Shield, Award, Leaf, Heart, CheckCircle2 } from 'lucide-react';

export default function CertificationsSection() {
  const t = useTranslations('certifications');

  const certifications = [
    {
      key: 'iso',
      icon: Award,
      image: null,
    },
    {
      key: 'gmp',
      icon: Shield,
      image: null,
    },
    {
      key: 'ce',
      icon: CheckCircle2,
      image: '/images/ce keurmerk.png',
    },
    {
      key: 'dermatological',
      icon: Heart,
      image: '/images/dermatologisch getest certificering.png',
    },
    {
      key: 'parabenFree',
      icon: Leaf,
      image: null,
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Award size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {certifications.map((cert, i) => (
            <ScrollAnimationWrapper key={cert.key} delay={i * 100}>
              <div className="glass rounded-2xl p-6 text-center card-hover group h-full flex flex-col items-center justify-center min-h-[180px]">
                {cert.image ? (
                  <div className="w-16 h-16 mb-4 relative">
                    <Image
                      src={cert.image}
                      alt={t(`items.${cert.key}.title`)}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:glow-sm transition-all duration-300">
                    <cert.icon size={28} className="text-accent" />
                  </div>
                )}
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t(`items.${cert.key}.title`)}
                </h3>
                <p className="text-xs text-text-muted">
                  {t(`items.${cert.key}.description`)}
                </p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Trust Message */}
        <ScrollAnimationWrapper delay={500}>
          <div className="mt-12 text-center">
            <p className="text-sm text-text-secondary max-w-2xl mx-auto">
              {t('trustMessage')}
            </p>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
