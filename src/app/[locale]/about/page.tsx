import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Shield, Users, FlaskConical, Globe } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <ScrollAnimationWrapper className="text-center max-w-3xl mx-auto mb-20">
          <span className="section-badge">{t('nav.about')}</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
            Norvia <span className="text-accent">Gel Glove</span>
          </h1>
          <p className="text-lg text-text-secondary mt-6 leading-relaxed">
            {t('footer.description')}
          </p>
        </ScrollAnimationWrapper>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Shield, title: 'Bescherming', text: 'Tot 4 uur onzichtbare bescherming voor je handen.' },
            { icon: FlaskConical, title: 'Innovatie', text: 'Siliconenvrije formule die beschermt en verzorgt.' },
            { icon: Users, title: 'Professionals', text: 'Ontwikkeld voor professionals in elke sector.' },
            { icon: Globe, title: 'Europa', text: 'Snelle levering door heel Europa.' },
          ].map((item, i) => (
            <ScrollAnimationWrapper key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-8 card-hover text-center h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.text}</p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>

        {/* Story */}
        <ScrollAnimationWrapper>
          <div className="glass rounded-3xl p-8 lg:p-16 glow-border">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Ons Verhaal</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Norvia Gel Glove is ontstaan vanuit een simpele observatie: professionals in de automotive, bouw en industrie verdienen
                betere handbescherming. Traditionele handschoenen beperken grip en gevoel, scheuren gemakkelijk en zijn
                niet duurzaam.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Wij ontwikkelden een innovatieve gel die een onzichtbare beschermlaag vormt op de huid. Geen beperkingen,
                geen afval, geen compromissen. Gewoon schone, beschermde en verzorgde handen na elke werkdag.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Vanuit Roosendaal leveren wij aan professionals en bedrijven door heel Europa.
                Of je nu monteur, schilder, kapper of dakdekker bent — Norvia Gel Glove is er voor jou.
              </p>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
}
