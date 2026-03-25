import { site } from '@/lib/site';
import { getSiteBaseUrl } from '@/lib/siteBaseUrl';

/** Yerel isletme / SEO — NEXT_PUBLIC_SITE_URL uretimde tanimli olmali. */
export function SiteJsonLd() {
  const base = getSiteBaseUrl();
  if (!base) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.description,
    url: base,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address,
      addressLocality: 'Istanbul',
      addressCountry: 'TR',
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
