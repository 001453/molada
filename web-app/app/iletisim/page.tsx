import { LeadFormMailto } from '../components/LeadFormMailto';
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
          <strong>Üyeler:</strong> Toplantı odası ve sessiz kabin için önce{' '}
          <a href="/uye-paneli">üye panelinden</a> talep oluşturun. Onay sonrası giriş ve kullanım bilgisi paylaşılır.
        </p>
        <p>
          <strong>Henüz üye değilseniz:</strong> <a href="/uyelik-basvuru">Üyelik başvurusu</a> veya aşağıdaki form ile bize yazın; en kısa sürede dönüş yaparız.
        </p>
      </section>

      <section className="card" id="geri-donus">
        <h2>Biz sizi arayalım</h2>
        <p>
          Formu doldurup gönder’e bastığınızda e-posta uygulamanız açılır; mesajı göndererek talebinizi iletirsiniz. Aynı bilgileri doğrudan{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a> adresine de yazabilirsiniz.
        </p>
        <LeadFormMailto />
      </section>
    </div>
  );
}
