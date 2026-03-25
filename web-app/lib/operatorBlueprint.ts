/**
 * Paylasimli ofis isletmesi cercevesi — Molada web/uygulama gercekligine gore durum.
 * Kaynak ozeti: Spacebring — How to start a coworking space (2026 ozet rehber).
 */

export type FeatureStatus = 'live' | 'partial' | 'planned' | 'external';

export type OperatorFeature = {
  label: string;
  detail: string;
  status: FeatureStatus;
};

export const OPERATOR_FEATURES: OperatorFeature[] = [
  {
    label: 'Web sitesi ve yerel görünürlük',
    detail:
      'Tanıtım, fiyat, mekân, iletişim; sitemap/robots; Google İşletme Profili ayrı yönetilir.',
    status: 'live',
  },
  {
    label: 'Üyelik başvurusu (dijital)',
    detail: 'Form, admin onayı; KVKK sayfası.',
    status: 'live',
  },
  {
    label: 'Üye paneli ve rezervasyon talebi',
    detail:
      'Toplantı odası (4/6/12) ve sessiz kabin; çakışma kontrolü; onay sonrası giriş kodu ve seans Wi‑Fi.',
    status: 'live',
  },
  {
    label: 'Admin onay akışı',
    detail: 'Üyelik ve rezervasyon listeleri; not alanı.',
    status: 'live',
  },
  {
    label: 'Ödeme / abonelik otomasyonu',
    detail:
      'Kredi kartı, fatura, sözleşme yenileme — üçüncü parti veya manuel; uygulama içi tahsilat yol haritası.',
    status: 'planned',
  },
  {
    label: 'Fiziksel erişim kontrolü',
    detail: 'Kapı / kart / uygulama entegrasyonu — ayrı proje.',
    status: 'planned',
  },
  {
    label: 'Yedek internet hattı',
    detail: 'İş sınıfı birincil hat + operasyonel yedek — tesis tarafında.',
    status: 'external',
  },
  {
    label: 'Topluluk ve yerel etkinlik planı',
    detail: 'Yalnızca Molada lokali; duyuru: site + iletişim.',
    status: 'partial',
  },
];

export const REVENUE_STREAMS_MOLADA = [
  'Aylık üyelik (sıcak / sabit masa)',
  'Günlük veya deneme kullanımı (paketlere göre)',
  'Toplantı odası ve kabin saatlik kullanım (üye talebi + onay)',
  'Sanal ofis (adres, posta — ayrı sözleşme)',
  'İleride: dışarıdan saatlik toplantı kirası (politikaya bağlı)',
];

export const LEGAL_REMINDERS_TR = [
  'Ticari işletme tescili ve ruhsatlar belediye / mevzuata göre tamamlanır.',
  'Kira sözleşmesi ve üye sözleşmesi avukat ile uyumlu hale getirilir.',
  'KVKK aydınlatma, açık rıza, kamera ve envanter dokümanları güncel tutulur.',
  'İşyeri sigortası ve genel sorumluluk poliçesi değerlendirilir.',
];

export const SPACE_BRING_INSPIRATION_URL =
  'https://www.spacebring.com/blog/tips/start-coworking-space';

export function featureStatusTr(s: FeatureStatus): string {
  switch (s) {
    case 'live':
      return 'Canlı (web + uygulama)';
    case 'partial':
      return 'Kısmen';
    case 'planned':
      return 'Yol haritası';
    case 'external':
      return 'Tesis / dış süreç';
    default:
      return s;
  }
}
