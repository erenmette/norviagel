import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { getProduct } from '@/lib/shopify';
import type { VolumeTier } from '@/lib/shopify';
import ProductContent from '@/components/product/ProductContent';
import VideoShowcase from '@/components/sections/VideoShowcase';
import { ProductJsonLd } from '@/components/seo/JsonLd';
import { getAllPosts, getPostContent } from '@/lib/blog';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

const BASE_URL = 'https://norviaeu.com';

const SEO_DEFAULTS = {
  nl: {
    title: 'Norvia Gel Glove Kopen | €28,95 | Snelle Levering',
    description: 'Bestel de Norvia Gel Glove - beschermt je handen 4 uur tegen olie, verf en vuil. Siliconenvrij en huidverzorgend. \u2713 Snelle levering \u2713 Veilig betalen',
  },
  en: {
    title: 'Buy Norvia Gel Glove | €28.95 | Fast Delivery',
    description: 'Order the Norvia Gel Glove - protects your hands for 4 hours against oil, paint and dirt. Silicone-free and skin-caring. \u2713 Fast delivery \u2713 Secure payment',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const defaults = SEO_DEFAULTS[locale as keyof typeof SEO_DEFAULTS] || SEO_DEFAULTS.nl;

  let product = null;
  try {
    product = await getProduct('norvia-gel-glove');
  } catch {
    // Shopify not connected - use defaults
  }

  // Get price for metadata
  const price = product?.variants.edges[0]?.node.price.amount || '28.95';

  // Use Shopify SEO data if available, otherwise use defaults
  const title = product?.seo?.title || defaults.title;
  const description = product?.seo?.description || defaults.description;

  // Get product images for OpenGraph
  const images = product?.images.edges.map((e) => ({
    url: e.node.url,
    width: e.node.width,
    height: e.node.height,
    alt: e.node.altText || 'Norvia Gel Glove',
  })) || [];

  const canonicalUrl = `${BASE_URL}/${locale}/product`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'nl': `${BASE_URL}/nl/product`,
        'en': `${BASE_URL}/en/product`,
        'x-default': `${BASE_URL}/nl/product`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Norvia Gel Glove',
      locale: locale === 'nl' ? 'nl_NL' : 'en_US',
      type: 'website',
      images: images.length > 0 ? images : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? images.map(img => img.url) : undefined,
    },
    other: {
      'product:price:amount': price,
      'product:price:currency': 'EUR',
    },
  };
}

const DEFAULT_VOLUME_TIERS: VolumeTier[] = [
  { min: 1, max: 11, discount: 0 },      // €28,95
  { min: 12, max: 999, discount: 6.9 },  // €26,95 (€2 korting)
];

export default async function ProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let product = null;
  try {
    product = await getProduct('norvia-gel-glove');
  } catch {
    // Shopify not connected yet - will show placeholders
  }

  const images = product?.images.edges.map((e) => e.node) || [];
  const variant = product?.variants.edges[0]?.node;
  const price = variant?.price.amount || '28.95';
  const currencyCode = variant?.price.currencyCode || 'EUR';
  const variantId = variant?.id || 'gid://shopify/ProductVariant/57354473570688';
  const available = product?.availableForSale ?? true;

  let volumeTiers = DEFAULT_VOLUME_TIERS;
  if (product?.volumeTiers?.value) {
    try {
      const parsed = JSON.parse(product.volumeTiers.value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        volumeTiers = parsed;
      }
    } catch {
      // Invalid JSON - use defaults
    }
  }

  const productImage = images[0]?.url || 'https://norviaeu.com/images/bottle.png';
  const productDescription = product?.description || 'Norvia Gel Glove - Innovatieve gel die een onzichtbare beschermlaag vormt op de handen. Tot 4 uur bescherming tegen olie, verf, vuil en chemicalien.';

  const relatedPosts = getAllPosts().slice(0, 3);
  const blogLabel = locale === 'en' ? 'Hand protection tips' : 'Tips over handbescherming';
  const blogSub =
    locale === 'en'
      ? 'Read our practical guides for mechanics, painters and hairdressers.'
      : 'Lees onze praktische gidsen voor monteurs, schilders en kappers.';
  const b2bLine = locale === 'en' ? 'Ordering for your team? See our B2B page.' : 'Bestellen voor je team? Bekijk onze B2B-pagina.';

  return (
    <>
      <ProductJsonLd
        name="Norvia Gel Glove"
        description={productDescription}
        image={productImage}
        price={price}
        priceCurrency={currencyCode}
        availability={available ? 'InStock' : 'OutOfStock'}
        url="https://norviaeu.com/product"
      />
      <ProductContent
        images={images}
        variantId={variantId}
        price={price}
        currencyCode={currencyCode}
        available={available}
        volumeTiers={volumeTiers}
      />

      <VideoShowcase />

      {/* Internal links to blog content and B2B for SEO and discovery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-border pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{blogLabel}</h2>
          <p className="text-text-muted mt-2">{blogSub}</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {relatedPosts.map((p) => {
              const c = getPostContent(p, locale);
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group glass rounded-xl p-5 border border-border hover:border-accent/40 transition-colors"
                >
                  <p className="text-xs text-accent font-medium">{locale === 'en' ? p.tag.en : p.tag.nl}</p>
                  <p className="text-sm font-semibold text-white mt-1 group-hover:text-accent transition-colors leading-snug">
                    {c.title}
                  </p>
                </Link>
              );
            })}
          </div>
          <div className="mt-6">
            <Link href="/b2b" className="text-accent hover:underline text-sm font-medium">
              {b2bLine}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
