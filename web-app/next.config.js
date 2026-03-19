/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
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
