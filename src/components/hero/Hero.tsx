'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Shield, Droplets, FlaskConical, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-primary" />,
});

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToSection = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-hero z-[1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] gradient-radial z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-white">{t('title')}</span>{' '}
              <span className="text-accent glow-text">{t('titleAccent')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-text-secondary max-w-lg leading-relaxed">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/product" className="btn-primary text-base px-8 py-4 text-center">
                {t('cta')}
              </Link>
              <button
                onClick={scrollToSection}
                className="btn-secondary text-base px-8 py-4 text-center"
              >
                {t('ctaSecondary')}
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">{t('stats.protection')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">{t('stats.washable')}</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical size={18} className="text-accent" />
                <span className="text-sm text-text-secondary">{t('stats.siliconeFree')}</span>
              </div>
            </div>
          </div>

          {/* Right - Product Bottle */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem]">
              {/* Glowing rings behind bottle */}
              <div className="absolute inset-0 rounded-full border border-accent/10 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-accent/8 animate-[spin_25s_linear_infinite_reverse]" />

              {/* Glow behind bottle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />

              {/* Actual bottle image */}
              <div className="absolute inset-0 flex items-center justify-center animate-float opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards]">
                <Image
                  src="/images/bottle.png"
                  alt="Norvia Gel Glove"
                  width={240}
                  height={340}
                  className="select-none"
                  style={{ filter: 'drop-shadow(0 10px 40px rgba(0,163,255,0.25))' }}
                  priority
                  draggable={false}
                />
              </div>

              {/* Floating dots */}
              <div className="absolute top-0 left-1/4 w-2 h-2 rounded-full bg-accent/50 animate-float" style={{ animationDelay: '0s' }} />
              <div className="absolute bottom-1/4 right-0 w-3 h-3 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/40 animate-float" style={{ animationDelay: '4s' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ArrowDown size={20} className="text-accent/50" />
        </div>
      </div>
    </section>
  );
}
