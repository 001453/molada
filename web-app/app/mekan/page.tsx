import { site } from '@/lib/site';

export const metadata = {
  title: `Mekân — ${site.name}`,
  description: 'Paylaşımlı ofis alanı, kat planı ve ulaşım bilgisi.',
};

export default function MekanPage() {
  return (
    <div className="container page-content">
      <h1>Mekân</h1>
      <p style={{ marginBottom: '1.5rem' }}>
        {site.area} tek kat — cadde üstünde, kolay ulaşılır konum.
      </p>

      <section className="card">
        <h2>Alanlar</h2>
        <ul className="feature-list">
          <li><strong>Giriş ve resepsiyon</strong> — Turnike, kayıt, anahtar/kart</li>
          <li><strong>Açık ofis</strong> — 45 masa (3 sıra x 15), sıcak ve sabit masa</li>
          <li><strong>Toplantı odası</strong> — 16 kişi, ekran/projeksiyon</li>
          <li><strong>Sessiz kabinler</strong> — 5 adet, tek kişilik</li>
          <li><strong>Çay-kahve ve dinlenme</strong> — Ortak kullanım</li>
          <li><strong>WC</strong> — Yeterli kabin, engelli erişimi</li>
        </ul>
      </section>

      <section className="card">
        <h2>Ulaşım</h2>
        <p>{site.locationNote}</p>
        <p><strong>Adres:</strong> {site.address}</p>
        <p>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Haritada göster
          </a>
        </p>
      </section>

      <section className="card">
        <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>
          Kat planı görseli veya fotoğraf açılış öncesi eklenecektir. Referans: proje içi KAT-PLANI-VIZ.html.
        </p>
      </section>
    </div>
  );
}
