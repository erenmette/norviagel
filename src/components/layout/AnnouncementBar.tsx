'use client';

import { useLocale } from 'next-intl';
import { Truck, Instagram } from 'lucide-react';

// TikTok icon component
const TikTokIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/norvia_gel_glove_eu/',
  tiktok: 'https://www.tiktok.com/@www.norviaeu.com',
};

export default function AnnouncementBar() {
  const locale = useLocale();

  const text = locale === 'nl'
    ? 'Voor 15:00 besteld, morgen in huis binnen Nederland'
    : 'Order before 15:00, delivered tomorrow in the Netherlands';

  return (
    <div className="bg-accent/10 border-b border-accent/15 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Social links - left side */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={14} />
          </a>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/70 hover:text-accent transition-colors"
            aria-label="TikTok"
          >
            <TikTokIcon size={14} />
          </a>
        </div>

        {/* Main announcement - center */}
        <div className="flex items-center justify-center gap-2 flex-1">
          <Truck size={14} className="text-accent shrink-0" />
          <p className="text-xs sm:text-sm text-accent font-medium text-center">{text}</p>
        </div>

        {/* Spacer for balance on desktop */}
        <div className="hidden sm:block w-[52px]"></div>
      </div>
    </div>
  );
}
