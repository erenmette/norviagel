import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { Package, Receipt, Truck, Headphones, Building2, ArrowRight, Mail, Phone, CheckCircle2 } from 'lucide-react';
import { FaqJsonLd, BreadcrumbJsonLd } from '@/components/seo/ArticleJsonLd';

const BASE_URL = 'https://norviaeu.com';
const EMAIL = 'gelgloves@carpartsroosendaal.nl';
const PHONE = '+31 16585222';

type Props = { params: Promise<{ locale: string }> };

const COPY = {
  nl: {
    metaTitle: 'B2B handbescherming met volumekorting | Norvia Gel Glove',
    metaDescription: 'Norvia Gel Glove zakelijk: vloeibare handschoen met volumekorting, betaling op factuur en snelle levering in heel Europa. Vraag vrijblijvend een offerte aan.',
    badge: 'Zakelijk',
    title: 'B2B en zakelijke bestellingen',
    subtitle: 'Voorzie je hele team van handbescherming. Norvia Gel Glove is de vloeibare handschoen voor werkplaatsen, groothandels en bedrijven, met volumekorting, betaling op factuur en snelle levering in heel Europa.',
    ctaPrimary: 'Vraag offerte aan',
    ctaSecondary: 'Neem contact op',
    benefitsTitle: 'Waarom Norvia Gel Glove zakelijk',
    benefits: [
      { icon: Package, title: 'Volumekorting', text: 'Vanaf 12 stuks betaal je 26,95 euro per stuk. Voor grotere aantallen maken we scherpe staffelprijzen op maat.' },
      { icon: Receipt, title: 'Betaling op factuur', text: 'Zakelijke klanten kunnen op factuur bestellen, zodat je administratie soepel blijft lopen.' },
      { icon: Truck, title: 'Snelle levering', text: 'Snelle en betrouwbare levering in heel Europa, ook bij grotere orders voor je team.' },
      { icon: Headphones, title: 'Persoonlijk contact', text: 'Een vaste contactpersoon die met je meedenkt over de juiste aantallen en herhaalbestellingen.' },
    ],
    pricingTitle: 'Staffelprijzen',
    pricingNote: 'Grotere volumes of een vaste afname? Neem contact op voor een offerte op maat.',
    tiers: [
      { range: '1 tot 11 stuks', price: '28,95', unit: 'per stuk', highlight: false, label: 'Standaard' },
      { range: '12 stuks of meer', price: '26,95', unit: 'per stuk', highlight: true, label: 'Doosprijs' },
      { range: 'Groothandel', price: 'Op aanvraag', unit: 'staffelkorting', highlight: false, label: 'Maatwerk' },
    ],
    sectorsTitle: 'Gemaakt voor de werkvloer',
    sectors: ['Automotive en werkplaatsen', 'Bouw en afbouw', 'Schilders en klussers', 'Kappers en salons', 'Industrie en techniek', 'Dakdekkers en installateurs'],
    contactTitle: 'Klaar om te bestellen voor je team?',
    contactText: 'Stuur ons je gewenste aantallen, dan ontvang je snel een offerte met de beste prijs per stuk.',
    faqTitle: 'Veelgestelde vragen B2B',
    faq: [
      { q: 'Vanaf welk aantal krijg ik volumekorting?', a: 'Vanaf 12 stuks betaal je 26,95 euro per stuk in plaats van 28,95 euro. Voor grotere aantallen maken we een offerte met scherpere staffelprijzen.' },
      { q: 'Kan ik op factuur betalen?', a: 'Ja, zakelijke klanten kunnen op factuur bestellen. Neem contact op zodat we dit voor je account inregelen.' },
      { q: 'Leveren jullie in heel Europa?', a: 'Ja, we leveren snel en betrouwbaar in heel Europa, ook grotere orders voor een compleet team.' },
      { q: 'Kan ik herhaalbestellingen plaatsen?', a: 'Zeker. Je vaste contactpersoon helpt je met herhaalbestellingen en de juiste aantallen voor jouw verbruik.' },
    ],
  },
  en: {
    metaTitle: 'B2B hand protection with volume discount | Norvia',
    metaDescription: 'Norvia Gel Glove for business: a liquid glove with volume discount, payment on invoice and fast delivery across Europe. Request a free quote.',
    badge: 'Business',
    title: 'B2B and business orders',
    subtitle: 'Equip your whole team with hand protection. Norvia Gel Glove is the liquid glove for workshops, wholesalers and companies, with volume discount, payment on invoice and fast delivery across Europe.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'Contact us',
    benefitsTitle: 'Why Norvia Gel Glove for business',
    benefits: [
      { icon: Package, title: 'Volume discount', text: 'From 12 units you pay 26.95 euro per unit. For larger quantities we create sharp tiered pricing tailored to you.' },
      { icon: Receipt, title: 'Payment on invoice', text: 'Business customers can order on invoice, keeping your administration running smoothly.' },
      { icon: Truck, title: 'Fast delivery', text: 'Fast and reliable delivery across Europe, also for larger orders for your team.' },
      { icon: Headphones, title: 'Personal contact', text: 'A dedicated contact who helps you with the right quantities and repeat orders.' },
    ],
    pricingTitle: 'Tiered pricing',
    pricingNote: 'Larger volumes or a fixed supply? Get in touch for a tailored quote.',
    tiers: [
      { range: '1 to 11 units', price: '28.95', unit: 'per unit', highlight: false, label: 'Standard' },
      { range: '12 units or more', price: '26.95', unit: 'per unit', highlight: true, label: 'Box price' },
      { range: 'Wholesale', price: 'On request', unit: 'tiered discount', highlight: false, label: 'Custom' },
    ],
    sectorsTitle: 'Made for the work floor',
    sectors: ['Automotive and workshops', 'Construction and finishing', 'Painters and DIY pros', 'Hairdressers and salons', 'Industry and technology', 'Roofers and installers'],
    contactTitle: 'Ready to order for your team?',
    contactText: 'Send us your desired quantities and you will quickly receive a quote with the best price per unit.',
    faqTitle: 'Frequently asked questions B2B',
    faq: [
      { q: 'From what quantity do I get a volume discount?', a: 'From 12 units you pay 26.95 euro per unit instead of 28.95 euro. For larger quantities we provide a quote with sharper tiered pricing.' },
      { q: 'Can I pay on invoice?', a: 'Yes, business customers can order on invoice. Get in touch so we can set this up for your account.' },
      { q: 'Do you deliver across Europe?', a: 'Yes, we deliver quickly and reliably across Europe, including larger orders for an entire team.' },
      { q: 'Can I place repeat orders?', a: 'Absolutely. Your dedicated contact helps you with repeat orders and the right quantities for your usage.' },
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === 'en' ? COPY.en : COPY.nl;
  const canonical = `${BASE_URL}/${locale}/b2b`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical,
      languages: { nl: `${BASE_URL}/nl/b2b`, en: `${BASE_URL}/en/b2b`, 'x-default': `${BASE_URL}/nl/b2b` },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: canonical,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function B2BPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = locale === 'en' ? COPY.en : COPY.nl;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('B2B offerte Norvia Gel Glove')}`;

  return (
    <div className="pt-28 sm:pt-32 pb-20">
      <FaqJsonLd items={c.faq} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `${BASE_URL}/${locale}` },
          { name: c.title, url: `${BASE_URL}/${locale}/b2b` },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20 uppercase tracking-wide">
            <Building2 size={14} /> {c.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 leading-tight">{c.title}</h1>
          <p className="text-lg text-text-secondary mt-5 leading-relaxed">{c.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a href={mailto} className="btn-primary inline-flex items-center justify-center gap-2">
              {c.ctaPrimary} <ArrowRight size={18} />
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors">
              {c.ctaSecondary}
            </Link>
            <Link href="/product" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors">
              {locale === 'en' ? 'View product' : 'Bekijk product'}
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">{c.benefitsTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.benefits.map((b) => (
              <div key={b.title} className="glass rounded-2xl p-6 card-hover h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <b.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-white font-semibold mb-2">{b.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{c.pricingTitle}</h2>
          <p className="text-text-muted mb-8">{c.pricingNote}</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {c.tiers.map((tier) => (
              <div
                key={tier.range}
                className={`glass rounded-2xl p-6 text-center card-hover ${tier.highlight ? 'border-2 border-accent/50' : 'border border-border'}`}
              >
                <p className="text-xs text-text-muted uppercase tracking-wide">{tier.label}</p>
                <p className="text-lg font-bold text-white mt-2">{tier.range}</p>
                <p className={`text-3xl font-black mt-3 ${tier.highlight ? 'text-accent' : 'text-white'}`}>
                  {tier.price.match(/[0-9]/) ? `€${tier.price}` : tier.price}
                </p>
                <p className="text-xs text-text-muted mt-1">{tier.unit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">{c.sectorsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.sectors.map((s) => (
              <div key={s} className="glass-light rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                <span className="text-text-secondary text-sm">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{c.faqTitle}</h2>
          <div className="space-y-3">
            {c.faq.map((f) => (
              <div key={f.q} className="glass rounded-2xl p-5 sm:p-6">
                <p className="text-white font-semibold mb-2">{f.q}</p>
                <p className="text-text-secondary leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 glass glow-border rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{c.contactTitle}</h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">{c.contactText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={mailto} className="btn-primary inline-flex items-center justify-center gap-2">
              <Mail size={18} /> {EMAIL}
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors">
              <Phone size={18} /> {PHONE}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
