import type { Metadata } from 'next';
import { SiteJsonLd } from '@/app/components/SiteJsonLd';
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
        <SiteJsonLd />
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
            <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', alignItems: 'center' }}>
              <a href="/topluluk">Topluluk</a>
              <span aria-hidden>·</span>
              <a href="/isletme-rehberi">İşletme rehberi</a>
              <span aria-hidden>·</span>
              <a href="/sss">SSS</a>
              <span aria-hidden>·</span>
              <a href="/iletisim">İletişim</a>
              <span aria-hidden>·</span>
              <a href="/kvkk">KVKK</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
