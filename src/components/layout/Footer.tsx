'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

// TikTok icon component (lucide doesn't have one)
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

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-primary-dark border-t border-border">
      {/* Gradient overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center font-bold text-lg text-white">
                N
              </div>
              <div>
                <span className="text-lg font-bold text-white">Norvia</span>
                <span className="text-lg font-light text-accent ml-1">Gel Glove</span>
              </div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              {t('description')}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('product')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/product" className="text-sm text-text-muted hover:text-accent transition-colors">
                  Norvia Gel Glove
                </Link>
              </li>
              <li>
                <Link href="/product#specs" className="text-sm text-text-muted hover:text-accent transition-colors">
                  {t('shipping')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-text-muted hover:text-accent transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-muted hover:text-accent transition-colors">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('support')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Mail size={14} className="text-accent flex-shrink-0" />
                <a href="mailto:gelgloves@carpartsroosendaal.nl" className="hover:text-accent transition-colors">
                  gelgloves@carpartsroosendaal.nl
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-text-muted">
                <Phone size={14} className="text-accent flex-shrink-0" />
                <a href="tel:+3116585222" className="hover:text-accent transition-colors">
                  +31 16585222
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <MapPin size={14} className="text-accent flex-shrink-0 mt-0.5" />
                <span>{t('address')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            {t('copyright', { year })}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-text-muted hover:text-accent transition-colors">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-accent transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
