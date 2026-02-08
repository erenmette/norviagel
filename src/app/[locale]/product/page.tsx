import { setRequestLocale } from 'next-intl/server';
import { getProduct } from '@/lib/shopify';
import type { VolumeTier } from '@/lib/shopify';
import ProductContent from '@/components/product/ProductContent';

type Props = {
  params: Promise<{ locale: string }>;
};

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
    // Shopify not connected yet — will show placeholders
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
      // Invalid JSON — use defaults
    }
  }

  return (
    <ProductContent
      images={images}
      variantId={variantId}
      price={price}
      currencyCode={currencyCode}
      available={available}
      volumeTiers={volumeTiers}
    />
  );
}
