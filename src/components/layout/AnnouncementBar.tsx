'use client';

import { useLocale } from 'next-intl';
import { Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const locale = useLocale();

  const text = locale === 'nl'
    ? 'Voor 15:00 besteld, morgen in huis binnen Nederland'
    : 'Order before 15:00, delivered tomorrow in the Netherlands';

  return (
    <div className="bg-accent/10 border-b border-accent/15 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <Truck size={14} className="text-accent shrink-0" />
        <p className="text-xs sm:text-sm text-accent font-medium text-center">{text}</p>
      </div>
    </div>
  );
}
