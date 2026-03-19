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
            <li>Açık çalışma alanı (sıcak masa / sabit masa)</li>
            <li>Toplantı odası (16 kişi)</li>
            <li>Sessiz kabinler (5 adet)</li>
            <li>Çay-kahve ve dinlenme alanı</li>
            <li>Sanal ofis (adres, posta, sekreterya)</li>
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
          <h2>Hemen iletişime geçin</h2>
          <p>Fiyatlar ve rezervasyon için bize ulaşın.</p>
          <p>
            <a href={`mailto:${site.email}`} className="btn">
              E-posta
            </a>
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn">
                WhatsApp ile yazın
              </a>
            )}
            {!whatsappLink && (
              <a href="/iletisim" className="btn">İletişim</a>
            )}
          </p>
        </section>
      </div>
    </>
  );
}
