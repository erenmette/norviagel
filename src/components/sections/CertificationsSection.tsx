'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { Award } from 'lucide-react';

export default function CertificationsSection() {
  const t = useTranslations('certifications');

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

        {/* Main Certifications Display */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-center mb-16">
          {/* Left - Combined Certifications Image */}
          <ScrollAnimationWrapper delay={100} className="md:col-span-1">
            <div className="glass rounded-3xl p-8 flex items-center justify-center min-h-[400px]">
              <Image
                src="/images/certificeringen.png"
                alt="Certificeringen - Paraben Free, GMP, ISO 9001"
                width={250}
                height={500}
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </ScrollAnimationWrapper>

          {/* Center - CE Mark */}
          <ScrollAnimationWrapper delay={200} className="md:col-span-1">
            <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-40 h-40 mb-6 relative">
                <Image
                  src="/images/ce keurmerk.png"
                  alt="CE Keurmerk"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('items.ce.title')}</h3>
              <p className="text-text-secondary">{t('items.ce.description')}</p>
            </div>
          </ScrollAnimationWrapper>

          {/* Right - Dermatologically Tested */}
          <ScrollAnimationWrapper delay={300} className="md:col-span-1">
            <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="w-40 h-40 mb-6 relative">
                <Image
                  src="/images/dermatologisch getest certificering.png"
                  alt="Dermatologisch Getest"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t('items.dermatological.title')}</h3>
              <p className="text-text-secondary">{t('items.dermatological.description')}</p>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Trust Message */}
        <ScrollAnimationWrapper delay={400}>
          <div className="text-center">
            <div className="glass rounded-2xl p-8 max-w-4xl mx-auto border border-accent/10">
              <p className="text-lg text-text-secondary leading-relaxed">
                {t('trustMessage')}
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
