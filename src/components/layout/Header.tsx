'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { cart, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isLangOpen && !(e.target as Element).closest('[data-lang-switcher]')) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isLangOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale as 'nl' | 'en' });
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/product', label: t('product') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled || isMobileMenuOpen
          ? 'bg-primary/95 backdrop-blur-xl border-b border-border py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo_echt.png"
                alt="Norvia"
                width={40}
                height={40}
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white">Norvia</span>
              <span className="text-lg font-light text-accent ml-1">Gel Glove</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:text-accent relative',
                  pathname === link.href
                    ? 'text-accent'
                    : 'text-text-secondary'
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative" data-lang-switcher>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
              >
                <Globe size={16} />
                <span className="uppercase">{locale}</span>
                <ChevronDown size={14} className={cn('transition-transform', isLangOpen && 'rotate-180')} />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-primary-dark/95 backdrop-blur-xl border border-border rounded-lg overflow-hidden min-w-[120px] shadow-xl">
                  <button
                    onClick={() => switchLocale('nl')}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm text-left hover:bg-accent/10 transition-colors',
                      locale === 'nl' ? 'text-accent' : 'text-text-secondary'
                    )}
                  >
                    Nederlands
                  </button>
                  <button
                    onClick={() => switchLocale('en')}
                    className={cn(
                      'w-full px-4 py-2.5 text-sm text-left hover:bg-accent/10 transition-colors',
                      locale === 'en' ? 'text-accent' : 'text-text-secondary'
                    )}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-text-secondary hover:text-accent transition-colors"
            >
              <ShoppingCart size={20} />
              {cart && cart.totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.totalQuantity}
                </span>
              )}
            </button>

            {/* CTA Button (Desktop) */}
            <Link href="/product" className="hidden md:block btn-primary text-sm">
              {t('buyNow')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - animated slide down */}
        <div
          ref={menuRef}
          className={cn(
            'md:hidden overflow-hidden transition-all duration-400 ease-out',
            isMobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          )}
        >
          <nav className="pb-4 border-t border-border pt-4 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block text-base font-medium py-3 px-4 rounded-xl transition-all duration-300',
                  pathname === link.href
                    ? 'text-accent bg-accent/10'
                    : 'text-text-secondary hover:text-accent hover:bg-accent/5'
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/product"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block btn-primary text-center mt-3"
            >
              {t('buyNow')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
