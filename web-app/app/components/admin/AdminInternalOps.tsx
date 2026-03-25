'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  LEGAL_REMINDERS_TR,
  OPERATOR_FEATURES,
  REVENUE_STREAMS_MOLADA,
  SPACE_BRING_INSPIRATION_URL,
  featureStatusTr,
} from '@/lib/operatorBlueprint';
import { MOLADA_LOCAL_EVENT_PLANS } from '@/lib/localEvents';

const SEVEN_STEPS: { title: string; molada: ReactNode }[] = [
  {
    title: 'Temel plan ve niş',
    molada:
      'Mahallenin ofisi: freelancer, küçük ekipler, sanal ofis — açık alan + toplantı + kabin. İş planı dokümanlarınız iç operasyon klasörünüzde tutulur.',
  },
  {
    title: 'Pazar araştırması',
    molada:
      'Üsküdar–Çengelköy–Beylerbeyi hattında rakip fiyat ve hizmet karşılaştırması; Google İşletme Profili ve yerel arama (coworking, paylaşımlı ofis) izlenir.',
  },
  {
    title: 'Mekân ve deneyim',
    molada: (
      <>
        <Link href="/mekan">Mekân sayfası</Link> (herkese açık vitrin) ile kapasite ve akış; tadilat rehberleri fiziksel projede.
      </>
    ),
  },
  {
    title: 'Finansman ve fiyatlandırma',
    molada: (
      <>
        Kira, tadilat, işletme giderleri operasyon bütçesinde; üyelik paketleri <Link href="/fiyat">fiyat</Link> sayfasında güncellenir.
      </>
    ),
  },
  {
    title: 'Hukuk ve uyum',
    molada: (
      <>
        <Link href="/kvkk">KVKK</Link>, üye sözleşmesi, kira ve ruhsat avukat / belediye süreçleriyle tamamlanır.
      </>
    ),
  },
  {
    title: 'Teknoloji ve operasyon',
    molada: 'Aşağıdaki tablo Molada uygulamasının bugünkü durumunu özetler.',
  },
  {
    title: 'Pazarlama ve topluluk',
    molada:
      'Yerel SEO ve kampanyalar operasyon planına bağlı; iç etkinlik taslakları bu paneldeki “Yerel planlar” ve “Etkinlik playbook” ile yönetilir — halka açık URL yoktur.',
  },
];

function statusBadge(status: 'planlanan' | 'pilot') {
  if (status === 'pilot') return 'Pilot';
  return 'Planlanan';
}

/**
 * Üyelerin ve ziyaretçilerin görmemesi gereken operatör özeti (işletme tablosu, iç etkinlik planı).
 */
export function AdminInternalOps() {
  return (
    <div className="admin-print-area">
      <div
        className="card no-print"
        style={{
          border: '2px dashed rgba(216, 255, 63, 0.35)',
          background: 'rgba(216, 255, 63, 0.06)',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.65 }}>
          <strong>Yalnızca operasyon:</strong> Bu bölüm web menüsünde yoktur. Yerel etkinlik taslağı ve işletme yol haritasını üyelere duyurmadan önce
          iletişim ve üye kanallarınızda ayrıca paylaşırsınız.
        </p>
      </div>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Yerel etkinlik planı (iç taslak)</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
          Duyuruya çıkmadan önce tarih ve saat operasyon takvimine yazılır.
        </p>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {MOLADA_LOCAL_EVENT_PLANS.map((e) => (
            <article
              key={e.id}
              style={{
                padding: '1rem 1.1rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--card-border)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{e.title}</h3>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: 999,
                    background: e.status === 'pilot' ? 'rgba(216,255,63,0.15)' : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {statusBadge(e.status)}
                </span>
              </div>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.9rem' }}>
                <strong>Kimler:</strong> {e.audience}
              </p>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.9rem' }}>
                <strong>Sıklık:</strong> {e.cadence}
              </p>
              <p style={{ margin: '0 0 0.35rem', fontSize: '0.9rem' }}>
                <strong>Format:</strong> {e.format}
              </p>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)' }}>
                <strong>Mekân notu:</strong> {e.locationNote}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>İşletme, teknoloji ve yol haritası</h2>
        <p style={{ maxWidth: '65ch', fontSize: '0.95rem' }}>
          Sektörde yaygın <strong>7 adımlı paylaşımlı ofis çerçevesi</strong>, Molada’ya uyarlanmıştır. Özet ilham:{' '}
          <a href={SPACE_BRING_INSPIRATION_URL} target="_blank" rel="noopener noreferrer">
            Spacebring — How to start a coworking space
          </a>
          .
        </p>

        <h3 style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>Yedi adım — Molada karşılığı</h3>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.92rem' }}>
          {SEVEN_STEPS.map((s) => (
            <li key={s.title} style={{ marginBottom: '0.85rem' }}>
              <strong style={{ color: 'var(--foreground)' }}>{s.title}</strong>
              <div style={{ marginTop: '0.25rem' }}>{s.molada}</div>
            </li>
          ))}
        </ol>

        <h3 style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>Gelir kalemleri (özet)</h3>
        <ul className="feature-list">
          {REVENUE_STREAMS_MOLADA.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h3 style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>Web uygulaması — özellik durumu</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--card-border)' }}>Alan</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--card-border)' }}>Açıklama</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--card-border)' }}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {OPERATOR_FEATURES.map((row) => (
                <tr key={row.label}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 600 }}>{row.label}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                    {row.detail}
                  </td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>
                    {featureStatusTr(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '1.05rem', marginTop: '1.25rem' }}>Hukuk — hatırlatma listesi</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)' }}>Hukuki tavsiye değildir.</p>
        <ul className="feature-list">
          {LEGAL_REMINDERS_TR.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <p className="no-print" style={{ marginTop: '1rem' }}>
        <button className="btn" type="button" onClick={() => window.print()}>
          Bu operasyon özetini yazdır
        </button>
      </p>
    </div>
  );
}
