import type { Metadata } from 'next';
import Link from 'next/link';
import { MOLADA_LOCAL_EVENT_PLANS } from '@/lib/localEvents';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Topluluk ve yerel etkinlik planı — ${site.name}`,
  description:
    'Molada’da yalnızca yerel mekân içi planlar: Üsküdar, Çengelköy, Beylerbeyi odaklı topluluk buluşmaları.',
};

function statusBadge(status: 'planlanan' | 'pilot') {
  if (status === 'pilot') return 'Pilot';
  return 'Planlanan';
}

export default function ToplulukPage() {
  return (
    <div className="container page-content">
      <h1 style={{ marginTop: 0 }}>Topluluk ve yerel etkinlik planı</h1>
      <p style={{ maxWidth: '62ch' }}>
        Bu liste <strong>yalnızca Molada mekânı</strong> ve <strong>Anadolu yakası mahalle ağı</strong> içindir. Duyurular{' '}
        <Link href="/iletisim">iletişim</Link> ve üye kanallarıyla paylaşılır.
      </p>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Yerel odak</h2>
        <ul className="feature-list">
          <li>Üyeler: Üsküdar, Çengelköy, Beylerbeyi ve yakın semtlerde çalışan ekipler.</li>
          <li>
            Mekân: Cadde üstü {site.area} paylaşımlı ofis — etkinlikler ortak alan ve toplantı odalarıyla sınırlı.
          </li>
          <li>Komşuluk: BİM hattı ve cadde esnafı ile tanışma turları (açılış dönemi).</li>
        </ul>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Planlanan / pilot buluşmalar</h2>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {MOLADA_LOCAL_EVENT_PLANS.map((e) => (
            <article
              key={e.id}
              style={{
                padding: '1rem 1.15rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '1.05rem' }}>{e.title}</h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 999,
                    background: e.status === 'pilot' ? 'rgba(216,255,63,0.15)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {statusBadge(e.status)}
                </span>
              </div>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>
                <strong>Kimler:</strong> {e.audience}
              </p>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>
                <strong>Sıklık:</strong> {e.cadence}
              </p>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>
                <strong>Format:</strong> {e.format}
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
                <strong>Mekân notu:</strong> {e.locationNote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <p className="cta-strip" style={{ marginTop: '1.5rem' }}>
        Üyeyseniz{' '}
        <Link href="/uye-paneli" className="btn">
          Üye paneli
        </Link>{' '}
        özetine bakın; öneri için{' '}
        <Link href="/iletisim#geri-donus" className="btn btn-secondary">
          iletişim formu
        </Link>
        .
      </p>
    </div>
  );
}
