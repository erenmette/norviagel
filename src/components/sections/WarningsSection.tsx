'use client';

import { useTranslations } from 'next-intl';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { AlertTriangle, XCircle, Info } from 'lucide-react';

export default function WarningsSection() {
  const t = useTranslations('warnings');

  const notEffective = [
    'gasoline',
    'turpentine',
    'thinner',
  ];

  const notRecommended = [
    'eczema',
    'openWound',
    'allergy',
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Info size={16} className="text-amber-400" />
            <span className="text-sm font-medium text-amber-400">{t('badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {t('title')}
          </h2>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Not Effective Against */}
          <ScrollAnimationWrapper delay={100}>
            <div className="glass rounded-2xl p-6 border border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle size={20} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t('notEffective.title')}</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">{t('notEffective.description')}</p>
              <ul className="space-y-2">
                {notEffective.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <XCircle size={14} className="text-amber-400 shrink-0" />
                    {t(`notEffective.items.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimationWrapper>

          {/* Not Recommended For */}
          <ScrollAnimationWrapper delay={200}>
            <div className="glass rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <XCircle size={20} className="text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{t('notRecommended.title')}</h3>
              </div>
              <p className="text-sm text-text-secondary mb-4">{t('notRecommended.description')}</p>
              <ul className="space-y-2">
                {notRecommended.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                    <XCircle size={14} className="text-red-400 shrink-0" />
                    {t(`notRecommended.items.${item}`)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollAnimationWrapper>
        </div>

        <ScrollAnimationWrapper delay={300}>
          <p className="text-center text-xs text-text-muted mt-8 max-w-2xl mx-auto">
            {t('disclaimer')}
          </p>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
