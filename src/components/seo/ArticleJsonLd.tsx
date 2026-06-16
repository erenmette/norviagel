// JSON-LD structured data for blog articles, FAQs and breadcrumbs.
// Rendered server-side so search engines pick it up without JS.

export function ArticleJsonLd({
  headline,
  description,
  image,
  datePublished,
  url,
}: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  url: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified: datePublished,
    author: { '@type': 'Organization', name: 'Norvia Gel Glove' },
    publisher: {
      '@type': 'Organization',
      name: 'Norvia Gel Glove',
      logo: { '@type': 'ImageObject', url: 'https://norviaeu.com/images/logo_echt.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  );
}
