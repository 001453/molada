import type { MetadataRoute } from 'next';
import { getSiteBaseUrl } from '@/lib/siteBaseUrl';

const PATHS = [
  '/',
  '/fiyat',
  '/mekan',
  '/uyelik-basvuru',
  '/uye-paneli',
  '/iletisim',
  '/kvkk',
  '/giris',
  '/sss',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteBaseUrl();
  if (!base) return [];
  const now = new Date();
  return PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? ('daily' as const) : ('weekly' as const),
    priority: path === '/' ? 1 : 0.7,
  }));
}
