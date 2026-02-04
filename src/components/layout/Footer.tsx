'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

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
            <p className="text-text-muted text-sm leading-relaxed">
              {t('description')}
            </p>
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
