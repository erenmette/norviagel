import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async redirects() {
    return [
      // Oude JouwWeb-pagina's (nog in Google geindexeerd) naar nieuwe equivalenten.
      // permanent (308) zodat Google de ranking overzet en de oude URL vervangt.
      { source: '/productinformatie', destination: '/nl/product', permanent: true },
      { source: '/klantgetuigenissen', destination: '/nl/product', permanent: true },
      { source: '/reviews', destination: '/nl/product', permanent: true },
      { source: '/over-ons', destination: '/nl/about', permanent: true },
      // Paden zonder taalcode naar de Nederlandse versie (voorkomt 404 bij oude links)
      { source: '/product', destination: '/nl/product', permanent: true },
      { source: '/about', destination: '/nl/about', permanent: true },
      { source: '/contact', destination: '/nl/contact', permanent: true },
      { source: '/blog', destination: '/nl/blog', permanent: true },
      { source: '/blog/:slug', destination: '/nl/blog/:slug', permanent: true },
      { source: '/b2b', destination: '/nl/b2b', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
