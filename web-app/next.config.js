/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/topluluk', destination: '/', permanent: true },
      { source: '/isletme-rehberi', destination: '/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  experimental: {
    // Netlify gibi "standalone" paketleyen ortamlarda bazı alt modüller
    // (örn: `styled-jsx/style`) otomatik trace edilmediği için runtime'da
    // bulunamıyor. API route'ları için styled-jsx'i trace'e zorlayalım.
    outputFileTracingIncludes: {
      '/api/**': ['node_modules/styled-jsx/**'],
    },
  },
};

module.exports = nextConfig;
