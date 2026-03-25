/**
 * Site genelinde kullanılan marka ve iletişim bilgileri.
 * Gerçek açılış öncesi .env veya bu dosyada güncelleyin.
 */

export const site = {
  name: 'Molada',
  tagline: 'Mahallenizin ofisi',
  description:
    'Cadde üstünde, 400 m² paylaşımlı ofis — açık çalışma alanı (~45 kişi), 3 toplantı odası (4 / 6 / 12 kişi), sessiz kabinler ve çay-kahve. Üsküdar–Çengelköy–Beylerbeyi hattında, toplu taşıma ile tek vasıta.',
  address: process.env.NEXT_PUBLIC_ADDRESS || '__________ Cad. No: __, __________ / İstanbul',
  phone: process.env.NEXT_PUBLIC_PHONE || '+90 (___) ___ __ __',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@example.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '', // örn. 905321234567
  mapUrl: process.env.NEXT_PUBLIC_MAP_URL || 'https://maps.google.com',
  area: '400 m²',
  locationNote: 'Cadde üstünde, kolay ulaşılır konum. Toplu taşıma önünden geçiyor; Üsküdar\'dan tek vasıtayla; Çengelköy, Beylerbeyi yaklaşık 5 dakika.',
} as const;

export const nav = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/fiyat', label: 'Fiyatlar' },
  { href: '/mekan', label: 'Mekân' },
  { href: '/uyelik-basvuru', label: 'Üyelik' },
  { href: '/uye-paneli', label: 'Üye paneli' },
  { href: '/iletisim', label: 'İletişim' },
  { href: '/sss', label: 'SSS' },
  { href: '/kvkk', label: 'KVKK' },
  { href: '/giris', label: 'Giriş' },
] as const;
