'use client';

import { useTranslations } from 'next-intl';
import { Hand, Droplets, Trash2, Scissors, ArrowRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

export default function ProblemSection() {
  const t = useTranslations('problem');

  const problems = [
    { key: 'grip', icon: Hand },
    { key: 'sweat', icon: Droplets },
    { key: 'waste', icon: Trash2 },
    { key: 'tears', icon: Scissors },
  ] as const;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 circuit-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem Side */}
          <ScrollAnimationWrapper direction="right">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
                {t('title')}
              </h2>
              <p className="text-lg text-text-secondary mt-6 leading-relaxed">
                {t('subtitle')}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {problems.map((problem, i) => (
                  <div
                    key={problem.key}
                    className="glass-light rounded-xl p-4 card-hover"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <problem.icon size={20} className="text-red-400/80 mb-2" />
                    <p className="text-sm text-text-secondary">
                      {t(`problems.${problem.key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Solution Side */}
          <ScrollAnimationWrapper direction="left" delay={200}>
            <div className="relative">
              <div className="glass rounded-2xl p-8 lg:p-10 glow-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <ArrowRight size={20} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-accent">
                    {t('solutionTitle')}
                  </h3>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {t('solutionText')}
                </p>

                {/* Visual element */}
                <div className="mt-8 relative h-32 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/20 to-accent/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-2 border-red-400/30 flex items-center justify-center">
                        <Hand size={24} className="text-red-400/60" />
                      </div>
                      <ArrowRight size={24} className="text-accent animate-pulse" />
                      <div className="w-16 h-16 rounded-full border-2 border-accent/50 glow-sm flex items-center justify-center">
                        <Hand size={24} className="text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
