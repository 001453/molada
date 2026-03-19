import { site } from '@/lib/site';

export const metadata = {
  title: `İletişim — ${site.name}`,
  description: 'Adres, telefon, e-posta ve rezervasyon iletişimi.',
};

export default function IletisimPage() {
  const hasWhatsApp = site.whatsapp && site.whatsapp.length > 5;
  const whatsappLink = hasWhatsApp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
    : null;

  return (
    <div className="container page-content">
      <h1>İletişim</h1>
      <p style={{ marginBottom: '2rem' }}>
        Rezervasyon, üyelik ve genel bilgi için aşağıdaki kanallardan bize ulaşabilirsiniz.
      </p>

      <section className="card">
        <h2>Adres</h2>
        <p style={{ fontSize: '1.05rem' }}>{site.address}</p>
        <p>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="btn">
            Haritada aç
          </a>
        </p>
      </section>

      <section className="card">
        <h2>İletişim bilgileri</h2>
        <p>
          <strong>E-posta:</strong>{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          <strong>Telefon:</strong> {site.phone}
        </p>
        {whatsappLink && (
          <p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn">
              WhatsApp ile yazın
            </a>
          </p>
        )}
      </section>

      <section className="card">
        <h2>Rezervasyon</h2>
        <p>
          Toplantı odası ve sessiz kabin rezervasyonu için e-posta, telefon veya WhatsApp üzerinden iletişime geçin. Rezervasyon talebiniz en kısa sürede yanıtlanacaktır.
        </p>
      </section>
    </div>
  );
}
