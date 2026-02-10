import { setRequestLocale } from 'next-intl/server';
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

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
