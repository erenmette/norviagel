'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { Building2, Shield, Truck, Award, Users } from 'lucide-react';

export default function DistributorSection() {
  const t = useTranslations('distributor');

  const benefits = [
    { key: 'original', icon: Shield },
    { key: 'exclusive', icon: Award },
    { key: 'delivery', icon: Truck },
    { key: 'support', icon: Users },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <ScrollAnimationWrapper direction="right">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/images/blije mannen die gel gebruiken.jpeg"
                alt="Professionals using Norvia Gel Glove"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />

              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <Building2 size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('companyName')}</p>
                      <p className="text-xs text-text-secondary">{t('companyRole')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Right - Content */}
          <ScrollAnimationWrapper direction="left" delay={200}>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Building2 size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">{t('badge')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {t('title')}
              </h2>

              <p className="text-lg text-text-secondary leading-relaxed">
                {t('description')}
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {benefits.map((benefit, i) => (
                  <div key={benefit.key} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <benefit.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{t(`benefits.${benefit.key}.title`)}</p>
                      <p className="text-xs text-text-muted">{t(`benefits.${benefit.key}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 border-accent pl-4 italic text-text-secondary mt-6">
                "{t('quote')}"
              </blockquote>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
