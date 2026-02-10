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
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-transparent via-accent/5 to-transparent">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Award size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        {/* Certifications Grid - Larger Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {certifications.map((cert, i) => (
            <ScrollAnimationWrapper key={cert.key} delay={i * 100}>
              <div className="glass rounded-3xl p-8 text-center card-hover group h-full flex flex-col items-center justify-center min-h-[280px] border border-accent/10 hover:border-accent/30 transition-all duration-300">
                {cert.image ? (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 mb-6 relative">
                    <Image
                      src={cert.image}
                      alt={t(`items.${cert.key}.title`)}
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center mb-6 group-hover:glow-sm group-hover:border-accent/40 transition-all duration-300">
                    <cert.icon size={48} className="text-accent" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-2">
                  {t(`items.${cert.key}.title`)}
                </h3>
                <p className="text-sm text-text-muted">
                  {t(`items.${cert.key}.description`)}
                </p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Trust Message */}
        <ScrollAnimationWrapper delay={500}>
          <div className="mt-16 text-center">
            <div className="glass rounded-2xl p-6 max-w-3xl mx-auto border border-accent/10">
              <p className="text-base text-text-secondary">
                {t('trustMessage')}
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
