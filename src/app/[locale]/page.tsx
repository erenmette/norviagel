import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/hero/Hero';
import ProblemSection from '@/components/sections/ProblemSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
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
      <IndustriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <B2BSection />
      <CTASection />
    </>
  );
}
