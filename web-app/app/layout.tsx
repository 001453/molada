import type { Metadata } from 'next';
import { site, nav } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  manifest: '/manifest.json',
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <header>
          <div className="container">
            <a href="/" className="logo" aria-label={`${site.name} ana sayfa`}>
              {site.name}
            </a>
            <nav className="nav" aria-label="Ana menü">
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main style={{ paddingTop: '2rem' }}>{children}</main>
        <footer>
          <div className="container">
            <span>© {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.</span>
            <span>
              <a href="/iletisim">İletişim</a>
              {' · '}
              <a href="/kvkk">KVKK</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
