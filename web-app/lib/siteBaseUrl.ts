/**
 * Sitemap / JSON-LD için kanonik site kökü.
 * Üretimde NEXT_PUBLIC_SITE_URL mutlaka doldurun (örn. https://www.moladaofis.com).
 */
export function getSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (explicit) return explicit;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  return '';
}
