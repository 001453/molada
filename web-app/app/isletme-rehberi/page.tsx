import type { Metadata } from 'next';
import Link from 'next/link';
import {
  LEGAL_REMINDERS_TR,
  OPERATOR_FEATURES,
  REVENUE_STREAMS_MOLADA,
  SPACE_BRING_INSPIRATION_URL,
  featureStatusTr,
} from '@/lib/operatorBlueprint';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `İşletme, teknoloji ve yol haritası — ${site.name}`,
  description:
    'Paylaşımlı ofis işletmesi: gelir kalemleri, hukuk hatırlatmaları ve Molada web uygulamasında canlı / planlanan özellikler.',
};

const SEVEN_STEPS = [
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
        <Link href="/mekan">Mekân sayfası</Link> ile kapasite ve akış şeffaf; aydınlatma, mutfak, ergonomi tadilat rehberleri fiziksel projede.
      </>
    ),
  },
  {
    title: 'Finansman ve fiyatlandırma',
    molada: (
      <>
        Kira, tadilat, işletme giderleri operasyon bütçesinde; üyelik paketleri{' '}
        <Link href="/fiyat">fiyat</Link> sayfasında güncellenir.
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
    molada: (
      <>
        Yerel SEO, kurucu üye kampanyaları ve Google yorumları operasyon planına bağlı; topluluk takvimi yalnızca{' '}
        <Link href="/topluluk">yerel etkinlik</Link> sayfasındaki planlarla sınırlıdır.
      </>
    ),
  },
];

export default function IsletmeRehberiPage() {
  return (
    <div className="container page-content">
      <h1 style={{ marginTop: 0 }}>İşletme, teknoloji ve yol haritası</h1>
      <p style={{ maxWidth: '65ch' }}>
        Sektörde yaygın <strong>7 adımlı paylaşımlı ofis çerçevesi</strong>, Molada’ya uyarlanmıştır. Özet ilham:{' '}
        <a href={SPACE_BRING_INSPIRATION_URL} target="_blank" rel="noopener noreferrer">
          Spacebring — How to start a coworking space (2026)
        </a>
        . Molada bağımsız bir işletmedir; üçüncü taraf yazılım satın almanız gerekmez — bu site kendi uygulamanızdır.
      </p>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Yedi adım — Molada karşılığı</h2>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          {SEVEN_STEPS.map((s) => (
            <li key={s.title} style={{ marginBottom: '0.85rem' }}>
              <strong style={{ color: 'var(--foreground)' }}>{s.title}</strong>
              <div style={{ marginTop: '0.25rem' }}>{s.molada}</div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Gelir kalemleri (özet)</h2>
        <ul className="feature-list">
          {REVENUE_STREAMS_MOLADA.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Web uygulaması — özellik durumu</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.65rem', borderBottom: '1px solid var(--card-border)' }}>Alan</th>
                <th style={{ textAlign: 'left', padding: '0.65rem', borderBottom: '1px solid var(--card-border)' }}>Açıklama</th>
                <th style={{ textAlign: 'left', padding: '0.65rem', borderBottom: '1px solid var(--card-border)' }}>Durum</th>
              </tr>
            </thead>
            <tbody>
              {OPERATOR_FEATURES.map((row) => (
                <tr key={row.label}>
                  <td style={{ padding: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.06)', fontWeight: 600 }}>{row.label}</td>
                  <td style={{ padding: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                    {row.detail}
                  </td>
                  <td style={{ padding: '0.65rem', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' }}>
                    {featureStatusTr(row.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Hukuk ve uyum — hatırlatma listesi</h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
          Üyelik sözleşmesi, KVKK, ruhsat, sigorta ve fikri mülkiyet için operatör kontrol özeti yalnızca{' '}
          <strong>admin panelinde</strong> tutulur; kağıt sözleşme ve formlar avukat onaylıdır. Hukuki tavsiye değildir.
        </p>
        <ul className="feature-list">
          {LEGAL_REMINDERS_TR.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
