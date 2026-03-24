import { site } from '@/lib/site';

export default function HomePage() {
  const hasWhatsApp = site.whatsapp && site.whatsapp.length > 5;
  const whatsappLink = hasWhatsApp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
    : null;

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{site.name}</h1>
          <p className="tagline">{site.tagline}</p>
          <p className="tagline" style={{ marginBottom: 0 }}>
            {site.description}
          </p>
          <span className="location-badge">📍 Üsküdar – Çengelköy – Beylerbeyi · Cadde üstü</span>
        </div>
      </section>

      <div className="container page-content">
        <section className="card">
          <h2>Neler sunuyoruz?</h2>
          <ul className="feature-list">
            <li>Açık çalışma alanı — sıcak / sabit masa (yaklaşık 45 kişi kapasite)</li>
            <li>Üç toplantı odası — 4, 6 ve 12 kişilik (saatlik rezervasyon, üye paneli)</li>
            <li>Beş sessiz kabin — tek kişilik odak alanı</li>
            <li>Çay-kahve ve dinlenme alanı</li>
            <li>Sanal ofis — iş adresi, posta, sekreterya (sözleşmeye tabi)</li>
          </ul>
        </section>

        <section className="card">
          <h2>Konum</h2>
          <p><strong>{site.address}</strong></p>
          <p>{site.locationNote}</p>
          <p>
            <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn">
              Haritada göster
            </a>
          </p>
        </section>

        <section className="card cta-strip">
          <h2>Üyelik ve rezervasyon akışı</h2>
          <p>
            <strong>1)</strong> Üyelik başvurusu → <strong>2)</strong> onay → <strong>3)</strong> giriş ile üye panelinden toplantı / kabin talebi →{' '}
            <strong>4)</strong> onay sonrası giriş kodu ve Wi‑Fi. Fiyat ve özel talepler için iletişim.
          </p>
          <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <a href="/uyelik-basvuru" className="btn">
              Üyelik başvurusu
            </a>
            <a href="/giris" className="btn btn-secondary">
              Üye girişi
            </a>
            <a href={`mailto:${site.email}`} className="btn btn-secondary">
              E-posta
            </a>
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                WhatsApp
              </a>
            )}
            {!whatsappLink && (
              <a href="/iletisim" className="btn btn-secondary">
                İletişim
              </a>
            )}
          </p>
        </section>
      </div>
    </>
  );
}
