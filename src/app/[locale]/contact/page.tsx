import { setRequestLocale } from 'next-intl/server';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ScrollAnimationWrapper from '@/components/sections/ScrollAnimationWrapper';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimationWrapper className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-badge">Contact</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-6">
            Neem Contact Op
          </h1>
          <p className="text-lg text-text-secondary mt-4">
            Heb je vragen over Norvia Gel Glove of wil je een B2B offerte aanvragen? Wij helpen je graag.
          </p>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: Mail,
                label: 'E-mail',
                value: 'gelgloves@carpartsroosendaal.nl',
                href: 'mailto:gelgloves@carpartsroosendaal.nl',
              },
              {
                icon: Phone,
                label: 'Telefoon',
                value: '+31 16585222',
                href: 'tel:+3116585222',
              },
              {
                icon: MapPin,
                label: 'Adres',
                value: 'Gastelseweg 59, Roosendaal',
                href: null,
              },
              {
                icon: Clock,
                label: 'Bereikbaar',
                value: 'Ma - Vr: 09:00 - 17:00',
                href: null,
              },
            ].map((item, i) => (
              <ScrollAnimationWrapper key={i} delay={i * 100}>
                <div className="glass rounded-2xl p-6 card-hover flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted mb-1">{item.label}</p>
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
              <h2 className="text-2xl font-bold text-white mb-4">B2B Offerte</h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Wil je Norvia Gel Glove bestellen voor je team of bedrijf?
                Stuur ons een e-mail met je gewenste hoeveelheid en wij sturen je
                een offerte op maat met volumekorting.
              </p>
              <a
                href="mailto:gelgloves@carpartsroosendaal.nl?subject=B2B Offerte Norvia Gel Glove"
                className="btn-primary text-center py-4"
              >
                Offerte Aanvragen
              </a>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
}
