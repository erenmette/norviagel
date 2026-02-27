import type { MetadataRoute } from 'next';

const BASE_URL = 'https://norviagel.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['nl', 'en'] as const;
  const currentDate = new Date();

  // Define pages with their SEO settings
  const pages = [
    {
      path: '',
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      path: '/product',
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      path: '/about',
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      path: '/contact',
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return sitemapEntries;
}
