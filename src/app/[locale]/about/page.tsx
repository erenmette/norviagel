import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Shield, Users, FlaskConical, Globe } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';
import Image from 'next/image';
import type { Metadata } from 'next';

const BASE_URL = 'https://norviagel.vercel.app';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    nl: {
      title: 'Over Norvia Gel Glove | Ons Verhaal & Missie',
      description: 'Leer meer over Norvia Gel Glove - de innovatieve gel die een onzichtbare beschermlaag vormt op je handen. Ontdek onze missie en certificeringen.',
    },
    en: {
      title: 'About Norvia Gel Glove | Our Story & Mission',
      description: 'Learn more about Norvia Gel Glove - the innovative gel that forms an invisible protective layer on your hands. Discover our mission and certifications.',
    },
  };

  const { title, description } = metadata[locale as keyof typeof metadata] || metadata.nl;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        'nl': `${BASE_URL}/nl/about`,
        'en': `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');
  const tNav = useTranslations('nav');

  const values = [
    { key: 'protection', icon: Shield },
    { key: 'innovation', icon: FlaskConical },
    { key: 'professionals', icon: Users },
    { key: 'europe', icon: Globe },
  ] as const;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-badge">{tNav('about')}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
            Norvia <span className="text-accent">Gel Glove</span>
          </h1>
          <p className="text-lg text-text-secondary mt-6 leading-relaxed">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((item, i) => (
            <ScrollAnimationWrapper key={item.key} delay={i * 100}>
              <div className="glass rounded-2xl p-8 card-hover text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(`values.${item.key}.title`)}</h3>
                <p className="text-sm text-text-secondary">{t(`values.${item.key}.text`)}</p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Certifications Banner */}
        <ScrollAnimationWrapper className="mb-20">
          <div className="glass rounded-3xl p-8 flex flex-col md:flex-row items-center justify-center gap-8">
            <Image
              src="/images/certificeringen.png"
              alt="Certificeringen - Paraben Free, GMP, ISO 9001"
              width={200}
              height={400}
              className="object-contain"
            />
            <div className="flex flex-col items-center md:items-start gap-4">
              <Image
                src="/images/ce keurmerk.png"
                alt="CE Keurmerk"
                width={100}
                height={100}
                className="object-contain"
              />
              <Image
                src="/images/dermatologisch getest certificering.png"
                alt="Dermatologisch Getest"
                width={120}
                height={120}
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Story */}
        <ScrollAnimationWrapper>
          <div className="glass rounded-3xl p-8 lg:p-16 glow-border">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">{t('story.title')}</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('story.p1')}
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                {t('story.p2')}
              </p>
              <p className="text-text-secondary leading-relaxed">
                {t('story.p3')}
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
}
