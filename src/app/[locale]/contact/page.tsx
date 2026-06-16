import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';
import type { Metadata } from 'next';
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://norviaeu.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const metadata = {
    nl: {
      title: 'Contact Norvia Gel Glove | Klantenservice & B2B',
      description: 'Neem contact op met Norvia Gel Glove voor vragen, B2B aanvragen of ondersteuning. Bereikbaar via email, telefoon of bezoek ons in Roosendaal.',
    },
    en: {
      title: 'Contact Norvia Gel Glove | Customer Service & B2B',
      description: 'Contact Norvia Gel Glove for questions, B2B inquiries or support. Reach us by email, phone or visit us in Roosendaal, Netherlands.',
    },
  };

  const { title, description } = metadata[locale as keyof typeof metadata] || metadata.nl;

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        'nl': `${BASE_URL}/nl/contact`,
        'en': `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <LocalBusinessJsonLd />
      <ContactContent />
    </>
  );
}

function ContactContent() {
  const t = useTranslations('contact');
  const tFooter = useTranslations('footer');

  const contactItems = [
    {
      icon: Mail,
      labelKey: 'email',
      value: 'gelgloves@carpartsroosendaal.nl',
      href: 'mailto:gelgloves@carpartsroosendaal.nl',
    },
    {
      icon: Phone,
      labelKey: 'phone',
      value: '+31 16585222',
      href: 'tel:+3116585222',
    },
    {
      icon: MapPin,
      labelKey: 'address',
      value: tFooter('address'),
      href: null,
    },
    {
      icon: Clock,
      labelKey: 'hours',
      value: t('hoursValue'),
      href: null,
    },
  ] as const;

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-badge">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-6">
            {t('title')}
          </h1>
          <p className="text-lg text-text-secondary mt-4">
            {t('subtitle')}
          </p>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactItems.map((item, i) => (
              <ScrollAnimationWrapper key={item.labelKey} delay={i * 100}>
                <div className="glass rounded-2xl p-6 card-hover flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">{t(item.labelKey)}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white hover:text-accent transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>

          {/* B2B CTA */}
          <ScrollAnimationWrapper delay={200}>
            <div className="glass rounded-2xl p-8 glow-border h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white mb-4">{t('b2b.title')}</h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {t('b2b.text')}
              </p>
              <a
                href="mailto:gelgloves@carpartsroosendaal.nl?subject=B2B Offerte Norvia Gel Glove"
                className="btn-primary text-center py-4"
              >
                {t('b2b.cta')}
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
}
