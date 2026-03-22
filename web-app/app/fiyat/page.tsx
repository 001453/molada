import { site } from '@/lib/site';
import { MEETING_ROOMS, OPEN_WORKSPACE_CAPACITY } from '@/lib/coworking';

export const metadata = {
  title: `Fiyatlar — ${site.name}`,
  description: 'Paylaşımlı ofis üyelik, günlük kullanım ve toplantı odası fiyat çerçevesi.',
};

export default function FiyatPage() {
  return (
    <div className="container page-content">
      <h1>Fiyatlar ve paketler</h1>
      <p style={{ marginBottom: '1.25rem' }}>
        Aşağıdaki tablolar çerçevedir; <strong>net fiyat ve sözleşme</strong> için iletişime geçin. Onaylı üyeler,{' '}
        <a href="/uye-paneli">üye paneli</a> üzerinden toplantı odası ve sessiz kabin için <strong>saatlik talep</strong> oluşturur; admin onayı
        sonrası giriş kodu paylaşılır.
      </p>

      <section className="card">
        <h2>Üyelik (aylık / taahhütlü)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-strong)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Paket</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Kimler için</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Not</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sıcak masa</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Esnek çalışan, haftada birkaç gün</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Açık alan (~{OPEN_WORKSPACE_CAPACITY} kişi kapasite)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sabit masa</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Düzenli ofisten çalışan</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Kişiye ayrılmış masa</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sanal ofis</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Şirket adresi, posta</td>
              <td style={{ padding: '0.75rem 0.5rem' }}>Sözleşme ve KVKK kapsamında</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Günlük / düşük taahhüt</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 0 }}>
          Dijital göçebeler ve deneme amaçlı kullanım için <strong>günübirlik geçiş</strong> paketleri. Müsaitlik ve fiyat için iletişim.
        </p>
      </section>

      <section className="card">
        <h2>Toplantı odaları (saatlik)</h2>
        <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
          Her oda ayrı takvim; çakışma önlenir. Üye panelinden talep, yönetim onayı.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-strong)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Oda</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Kapasite</th>
              <th style={{ padding: '0.75rem 0.5rem', color: 'var(--text)' }}>Birim</th>
            </tr>
          </thead>
          <tbody style={{ color: 'var(--text-secondary)' }}>
            {MEETING_ROOMS.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem 0.5rem' }}>{r.labelTr}</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>{r.capacity} kişi</td>
                <td style={{ padding: '0.75rem 0.5rem' }}>Saat (net ücret için iletişim)</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Sessiz kabinler</h2>
        <p style={{ marginTop: 0, color: 'var(--text-secondary)' }}>
          Tek kişilik odak alanları; saatlik rezervasyon üye paneli üzerinden. Ücret için iletişim.
        </p>
      </section>

      <section className="card cta-strip">
        <p>
          <strong>Ödeme:</strong> Havale/EFT, kart veya nakit — sözleşme ve fatura bilgisi ile netleşir.
        </p>
        <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <a href="/uyelik-basvuru" className="btn">
            Üyelik başvurusu
          </a>
          <a href="/iletisim" className="btn btn-secondary">
            Fiyat teklifi
          </a>
        </p>
      </section>
    </div>
  );
}
