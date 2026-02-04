const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

type ShopifyResponse<T> = {
  data: T;
  errors?: Array<{ message: string }>;
};

export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    console.error('Shopify API errors:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// ============ PRODUCT QUERIES ============

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    seo {
      title
      description
    }
  }
`;

export async function getProduct(handle: string) {
  const query = `
    ${PRODUCT_FRAGMENT}
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFields
      }
    }
  `;

  const data = await shopifyFetch<{ product: ShopifyProduct }>({
    query,
    variables: { handle },
  });

  return data.product;
}

export async function getProducts() {
  const query = `
    ${PRODUCT_FRAGMENT}
    query getProducts {
      products(first: 20) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProduct }> };
  }>({ query });

  return data.products.edges.map((edge) => edge.node);
}

// ============ CART QUERIES ============

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(variantId: string, quantity: number = 1) {
  const query = `
    ${CART_FRAGMENT}
    mutation createCart($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: Array<{ message: string }> };
  }>({
    query,
    variables: {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    },
  });

  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    ${CART_FRAGMENT}
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ message: string }> };
  }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });

  return data.cartLinesAdd.cart;
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const query = `
    ${CART_FRAGMENT}
    mutation updateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ message: string }> };
  }>({
    query,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  });

  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    ${CART_FRAGMENT}
    mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ message: string }> };
  }>({
    query,
    variables: { cartId, lineIds },
  });

  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const query = `
    ${CART_FRAGMENT}
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `;

  const data = await shopifyFetch<{ cart: ShopifyCart }>({
    query,
    variables: { cartId },
  });

  return data.cart;
}

// ============ TYPES ============

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
  images: {
    edges: Array<{
      node: { url: string; altText: string | null; width: number; height: number };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
      };
    }>;
  };
  seo: { title: string | null; description: string | null };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        cost: { totalAmount: { amount: string; currencyCode: string } };
        merchandise: {
          id: string;
          title: string;
          product: {
            title: string;
            handle: string;
            images: {
              edges: Array<{ node: { url: string; altText: string | null } }>;
            };
          };
          price: { amount: string; currencyCode: string };
        };
      };
    }>;
  };
};
