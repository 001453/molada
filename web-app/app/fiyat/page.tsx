import { site } from '@/lib/site';

export const metadata = {
  title: `Fiyatlar — ${site.name}`,
  description: 'Paylaşımlı ofis üyelik ve rezervasyon fiyatları.',
};

export default function FiyatPage() {
  return (
    <div className="container page-content">
      <h1>Fiyatlar</h1>
      <p style={{ marginBottom: '2rem' }}>
        Güncel fiyatlar ve paketler için aşağıdaki tabloyu referans alabilirsiniz. Net rakamlar için lütfen bizimle iletişime geçin.
      </p>

      <section className="card">
        <h2>Üyelik (aylık)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-strong)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Hizmet</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Birim</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Not</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sıcak masa (hot desk)</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Günlük / saatlik</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Bilgi için iletişime geçin</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sabit masa (dedicated desk)</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Aylık</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Kişiye ayrılmış masa, dolap</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sanal ofis</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Aylık</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Adres + posta + sekreterya</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Rezervasyon</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-strong)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Hizmet</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Birim</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Not</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Toplantı odası (16 kişi)</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Saat</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Rezervasyona tabidir</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sessiz kabin (1 kişi)</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Saat</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Rezervasyona tabidir</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card cta-strip">
        <p>
          <strong>Ödeme koşulları:</strong> Ödeme vadesi ve yöntemleri (havale/EFT, kredi kartı, nakit) sözleşme ve fiyat listesinde belirtilir.
        </p>
        <p>
          <a href="/iletisim" className="btn">Fiyat ve rezervasyon için iletişime geçin</a>
        </p>
      </section>
    </div>
  );
}
