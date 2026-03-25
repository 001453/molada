import type { MetadataRoute } from 'next';
import { getSiteBaseUrl } from '@/lib/siteBaseUrl';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteBaseUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
