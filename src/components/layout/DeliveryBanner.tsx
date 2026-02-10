'use client';

import { useTranslations } from 'next-intl';
import { Truck, Clock } from 'lucide-react';

export default function DeliveryBanner() {
  const t = useTranslations('deliveryBanner');

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-accent text-white">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium">
          <Truck size={16} className="shrink-0" />
          <span>{t('message')}</span>
          <span className="hidden sm:inline text-white/80">|</span>
          <span className="hidden sm:flex items-center gap-1 text-white/80">
            <Clock size={14} />
            {t('cutoff')}
          </span>
        </div>
      </div>
    </div>
  );
}
