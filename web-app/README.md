# Molada — Paylaşımlı Ofis Web Sitesi ve Uygulama

Geçici marka adı **Molada** ile tek lokasyon paylaşımlı ofis için web sitesi ve mobil uyumlu (PWA) arayüz. Vercel’e deploy edilmek üzere hazırlanmıştır.

---

## İçerik

- **Ana sayfa:** Tanım, konum, ulaşım, iletişim ve WhatsApp
- **Fiyatlar:** Üyelik ve rezervasyon tabloları (net rakamlar için iletişim)
- **Mekân:** Alanlar, ulaşım, adres
- **İletişim:** Adres, e-posta, telefon, WhatsApp, rezervasyon
- **KVKK:** Aydınlatma metni özeti

Konum ve adres metinlerinde marka/zincir adı kullanılmaz; sadece cadde, ulaşım ve semt vurgulanır.

---

## Geliştirme

```bash
cd web-app
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) açılır.

---

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase proje URL’si (Dashboard → Settings → API)
- `SUPABASE_SERVICE_ROLE_KEY` — **Sadece sunucu (API routes)**; tarayıcıya asla vermeyin. Netlify’da Environment variable olarak ekleyin.
- `NEXT_PUBLIC_ADDRESS` — Tam adres (cadde, no, semt / İstanbul)
- `NEXT_PUBLIC_PHONE` — Telefon
- `NEXT_PUBLIC_EMAIL` — E-posta
- `NEXT_PUBLIC_WHATSAPP` — WhatsApp numarası (örn. 905321234567, başında + yok)
- `NEXT_PUBLIC_MAP_URL` — Google Maps veya harita linki
- `AUTH_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `WIFI_SSID` — uygulama ve admin girişi için
- `DATABASE_URL` / `DIRECT_URL` — yalnızca lokal `npx prisma migrate` vb. için (üretim API’leri Supabase HTTP kullanır)

Bu değerler yoksa `lib/site.ts` içindeki placeholder’lar kullanılır.

Üretim öncesi: **`SECURITY.md`** (anahtarlar, kontrol listesi).

---

## Vercel’e deploy

### 1. Repo’yu Vercel’e bağlama

1. [vercel.com](https://vercel.com) → Login (GitHub/GitLab/Bitbucket).
2. **Add New Project** → Proje reponuzu seçin.
3. **Root Directory** olarak `web-app` seçin (veya sadece web-app klasörünü ayrı repo’da tutuyorsanız root bırakın).
4. **Framework Preset:** Next.js (otomatik algılanır).
5. **Environment Variables:** İsterseniz burada `NEXT_PUBLIC_*` değişkenlerini ekleyin (adres, telefon, e-posta, WhatsApp, harita).
6. **Deploy** tıklayın.

### 2. Sadece web-app klasörünü deploy etme

Proje kökü paylaşımlı-ofis-projesi ise ve sadece site deploy edilecekse:

- Vercel’de **Root Directory** alanına `web-app` yazın; build komutu `npm run build` (Next.js varsayılan) kalabilir.

### 3. Domain

- Vercel varsayılan `*.vercel.app` adresiyle hemen yayında olur.
- Kendi domain’inizi (örn. moladaofis.com) **Project → Settings → Domains** üzerinden ekleyebilirsiniz.

---

## Logo ve marka

- Şu an **metin logosu** kullanılıyor: "Molada" (geçici isim).
- Nihai logo ve marka adı belirlendiğinde: `lib/site.ts` içinde `name` ve gerekirse `tagline` güncelleyin; logo için `app/layout.tsx` veya header’a bir `<img>` veya SVG ekleyebilirsiniz.
- Favicon: `public/favicon.ico` dosyasını ekleyin (şu an yok).

---

## A’dan Z’ye açılış kontrolü

Proje kökündeki **06-checklist/INCELEME-A-Z-WEB-ACILIS.md** dosyasında marka, içerik, teknik, yasal ve operasyon maddeleri listelenmiştir. Deploy öncesi bu listeyi doldurmanız önerilir.

---

## Proje yapısı

```
web-app/
├── app/
│   ├── layout.tsx    # Ortak header/footer, metadata
│   ├── page.tsx      # Ana sayfa
│   ├── fiyat/
│   ├── mekan/
│   ├── iletisim/
│   └── kvkk/
├── lib/
│   └── site.ts       # Marka adı, iletişim, nav
├── public/
│   └── manifest.json # PWA (mobil “uygulama” gibi ekleme)
├── .env.example
├── next.config.js
├── package.json
└── README.md
```

Build çıktısı Vercel’de otomatik oluşturulur; `output: 'standalone'` ile istenirse Docker vb. ortamlarda da çalıştırılabilir.
