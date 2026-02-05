'use client';

import { useTranslations } from 'next-intl';
import { Hand, Clock, Wrench, Droplets } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  const steps = [
    { key: 'apply', icon: Hand, number: '01' },
    { key: 'dry', icon: Clock, number: '02' },
    { key: 'work', icon: Wrench, number: '03' },
    { key: 'wash', icon: Droplets, number: '04' },
  ] as const;

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />

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

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollAnimationWrapper key={step.key} delay={i * 150}>
                <div className="relative group">
                  {/* Step card */}
                  <div className="glass rounded-2xl p-8 card-hover text-center relative z-10 h-full">
                    {/* Step number */}
                    <div className="text-5xl font-bold text-accent/10 absolute top-4 right-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6 group-hover:glow transition-all duration-300">
                      <step.icon size={28} className="text-accent" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>

                  {/* Connector dot (desktop) */}
                  <div className="hidden lg:flex absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent glow-sm" />
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>

        {/* Future: Gel-over-hand scroll animation placeholder */}
        <div className="mt-16 text-center">
          <div className="inline-block glass-light rounded-2xl px-8 py-4">
            <p className="text-sm text-text-muted italic">
              {/* This area is reserved for the Veo 3 gel-over-hand visualization */}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
