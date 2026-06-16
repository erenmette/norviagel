import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Hero from '@/components/hero/Hero';
import ProblemSection from '@/components/sections/ProblemSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import WarningsSection from '@/components/sections/WarningsSection';
import DistributorSection from '@/components/sections/DistributorSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import B2BSection from '@/components/sections/B2BSection';
import CTASection from '@/components/sections/CTASection';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

const BASE_URL = 'https://norviaeu.com';

const metadataByLocale = {
  nl: {
    title: 'Norvia Gel Glove - De Onzichtbare Beschermende Handschoen',
    description: 'Bescherm je handen tot 4 uur tegen olie, verf en chemicaliën met Norvia Gel Glove. Siliconenvrij, huidverzorgend en afwasbaar met water. Bestel nu voor €28,95.',
    ogLocale: 'nl_NL',
  },
  en: {
    title: 'Norvia Gel Glove - The Invisible Protective Glove',
    description: 'Protect your hands for up to 4 hours against oil, paint and chemicals with Norvia Gel Glove. Silicone-free, skin-caring and washable with water. Order now for €28.95.',
    ogLocale: 'en_US',
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const localeKey = locale as keyof typeof metadataByLocale;
  const meta = metadataByLocale[localeKey] || metadataByLocale.nl;

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: 'Norvia Gel Glove',
      locale: meta.ogLocale,
      type: 'website',
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        nl: `${BASE_URL}/nl`,
        en: `${BASE_URL}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <ProblemSection />
      <FeaturesSection />
      <CertificationsSection />
      <IndustriesSection />
      <HowItWorksSection />
      <WarningsSection />
      <DistributorSection />
      <TestimonialsSection />
      <B2BSection />
      <CTASection />
    </>
  );
}
