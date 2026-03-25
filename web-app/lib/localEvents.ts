/**
 * Molada lokali ve Anadolu yakası mahalle odaklı etkinlik / topluluk planı.
 */

export type LocalEventPlan = {
  id: string;
  title: string;
  audience: string;
  cadence: string;
  format: string;
  locationNote: string;
  status: 'planlanan' | 'pilot';
};

export const MOLADA_LOCAL_EVENT_PLANS: LocalEventPlan[] = [
  {
    id: 'cuma-tanisma',
    title: 'Cuma kahvesi — üye tanışması',
    audience: 'Molada üyeleri; Üsküdar, Çengelköy, Beylerbeyi’nde çalışan freelancer ve küçük ekipler.',
    cadence: 'Ayda 2 (pilot dönemde ayda 1)',
    format: '45 dk. açık kahve, kısaca “kim ne iş yapıyor” turu; dış konuşmacı yok.',
    locationNote: 'Yalnızca Molada ortak alanı.',
    status: 'planlanan',
  },
  {
    id: 'mahalle-atolye',
    title: 'Mahalle iş atölyesi (KOBİ + freelancer)',
    audience: 'Cadde ve çevredeki esnaf, avukatlık / muhasebe büroları, tek kişilik şirketler.',
    cadence: 'Ayda 1',
    format: '1 saatlik pratik konu (ör. e-belge, sözleşme ipuçları) — yerel uzman daveti.',
    locationNote: 'Üsküdar ve komşu semtlerden konuşmacı önceliği.',
    status: 'planlanan',
  },
  {
    id: 'acik-kapi',
    title: 'Komşu işletmelere açık kapı turu',
    audience: 'BİM hattı ve cadde üstü işletmeler — paylaşımlı ofis tanıtımı.',
    cadence: 'Açılış öncesi ve ilk 3 ayda 2 tur',
    format: '20 dk. mekân turu + dijital özet.',
    locationNote: 'Yalnızca Molada mekânı.',
    status: 'pilot',
  },
  {
    id: 'sessiz-saat',
    title: 'Ortak alan “sessiz odak” saati',
    audience: 'Tüm üyeler.',
    cadence: 'Hafta içi her gün 10:00–12:00 (iç kural)',
    format: 'Telefon görüşmesi kabinde; ortak alanda düşük ses — topluluk normu.',
    locationNote: 'Mekân ve üye kuralları ile uyumlu.',
    status: 'planlanan',
  },
];
