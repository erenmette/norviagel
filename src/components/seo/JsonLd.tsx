'use client';

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  sku?: string;
  price: string;
  priceCurrency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  url?: string;
}

export function ProductJsonLd({
  name,
  description,
  image,
  sku = 'NORVIA-GEL-GLOVE-250ML',
  price,
  priceCurrency = 'EUR',
  availability = 'InStock',
  brand = 'Norvia',
  url,
}: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency,
      availability: `https://schema.org/${availability}`,
      ...(url && { url }),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  logo?: string;
}

export function OrganizationJsonLd({
  name = 'Norvia Gel Glove',
  url = 'https://norviagel.vercel.app',
  email = 'gelgloves@carpartsroosendaal.nl',
  telephone = '+31 16585222',
  address = {
    streetAddress: 'Gastelseweg 59',
    addressLocality: 'Roosendaal',
    addressCountry: 'Netherlands',
  },
  logo,
}: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    ...(logo && { logo }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface LocalBusinessJsonLdProps {
  name?: string;
  url?: string;
  email?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  image?: string;
  priceRange?: string;
}

export function LocalBusinessJsonLd({
  name = 'Norvia Gel Glove',
  url = 'https://norviagel.vercel.app',
  email = 'gelgloves@carpartsroosendaal.nl',
  telephone = '+31 16585222',
  address = {
    streetAddress: 'Gastelseweg 59',
    addressLocality: 'Roosendaal',
    addressCountry: 'Netherlands',
  },
  image,
  priceRange,
}: LocalBusinessJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    email,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    ...(image && { image }),
    ...(priceRange && { priceRange }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
