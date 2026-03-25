/**
 * Admin içi — dış kaynak ve “sonra incelenecek” kayıtları.
 * Genel sitede yayınlanmaz; gerçek mekân etkinliği değildir.
 */

type ReviewItem = {
  id: string;
  kind: 'arastirma' | 'etkinlik_taslak';
  title: string;
  url: string;
  note: string;
};

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'daas-devices-for-teams',
    kind: 'etkinlik_taslak',
    title: 'Device as a Service (DaaS) — Devices for Teams',
    url: 'https://devicesforteams.hardsoftcomputers.co.uk/',
    note:
      'İşletmelere cihaz kiralama + yönetim + destek (UK / £, FCA). Molada operasyonu veya üyelere “ek hizmet / iş ortağı” fikri olarak sonra incelenecek; Türkiye alternatifleri ile kıyaslanmalı.',
  },
];

export function AdminReviewQueue() {
  return (
    <div className="admin-print-area">
      <div
        className="card"
        style={{
          border: '2px dashed var(--card-border)',
          background: 'rgba(139, 92, 246, 0.08)',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
          <strong>İç not:</strong> Bu sekme, sitedeki <strong>/topluluk</strong> etkinlik takvimiyle karıştırılmamalıdır.
          Aşağıdaki kayıtlar araştırma veya ileride değerlendirilecek dış kaynaklar içindir; tarih ve aksiyon sizin
          takviminize yazılır.
        </p>
      </div>

      <div style={{ marginTop: '1.25rem', display: 'grid', gap: '1rem' }}>
        {REVIEW_ITEMS.map((item) => (
          <article key={item.id} className="card" style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 999,
                  background: item.kind === 'etkinlik_taslak' ? 'rgba(216,255,63,0.2)' : 'rgba(255,255,255,0.08)',
                }}
              >
                {item.kind === 'etkinlik_taslak' ? 'Etkinlik taslağı' : 'Araştırma'}
              </span>
            </div>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--text-secondary)' }}>{item.note}</p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.url}
              </a>
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
