import { setRequestLocale } from 'next-intl/server';
import { getProduct } from '@/lib/shopify';
import ProductContent from '@/components/product/ProductContent';

type Props = {
  params: Promise<{ locale: string }>;
};

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

  return (
    <ProductContent
      images={images}
      variantId={variantId}
      price={price}
      currencyCode={currencyCode}
      available={available}
    />
  );
}
