/**
 * Molada — vitrin “hizmetler” listesi (JUSTWork tarzı ızgara için veri).
 * Sadece gerçekten sunduğunuz şeyleri yazın; yanıltıcı iddia eklemeyin.
 */

export type Amenity = { title: string; detail: string };

export const MOLADA_AMENITIES: Amenity[] = [
  { title: 'Hızlı internet', detail: 'İş odaklı bağlantı; onaylı üyelere Wi‑Fi erişimi.' },
  { title: 'Toplantı odaları', detail: '4, 6 ve 12 kişilik odalar; üye panelinden talep.' },
  { title: 'Sessiz kabinler', detail: 'Tek kişilik odak alanları; saatlik rezervasyon akışı.' },
  { title: 'Çay, kahve, su', detail: 'Ortak mutfak ve dinlenme alanı ile günlük ikram.' },
  { title: 'Dijital üyelik', detail: 'Başvuru, onay ve rezervasyon talepleri web üzerinden.' },
  { title: 'Sanal ofis', detail: 'İş adresi ve posta — sözleşme ve pakete göre.' },
  { title: 'Cadde üstü konum', detail: 'Üsküdar – Çengelköy – Beylerbeyi hattında ulaşım.' },
  { title: 'Esnek üyelik', detail: 'Sıcak masa, sabit masa ve günlük kullanım seçenekleri.' },
];

export type MembershipHighlight = { title: string; subtitle: string; href: string; cta: string };

export const MEMBERSHIP_HIGHLIGHTS: MembershipHighlight[] = [
  {
    title: 'Açık çalışma',
    subtitle: 'Sıcak veya sabit masa; ~45 kişi kapasiteli ortak alan.',
    href: '/fiyat',
    cta: 'Paketlere bak',
  },
  {
    title: 'Toplantı & odak',
    subtitle: 'Üç toplantı odası + beş sessiz kabin; panelden talep.',
    href: '/uye-paneli',
    cta: 'Üye paneli',
  },
  {
    title: 'Sanal ofis',
    subtitle: 'Şirket adresi ve posta hizmeti; ayrı sözleşme.',
    href: '/uyelik-basvuru',
    cta: 'Başvuru',
  },
];
