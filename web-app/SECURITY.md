# Güvenlik notları (Molada web-app)

## Asla repoya eklenmemeli

- `.env`, `.env.local`, gerçek anahtarlar
- `SUPABASE_SERVICE_ROLE_KEY` — sadece sunucu ortam değişkeni (Netlify)

## Üretim kontrol listesi

1. **`AUTH_SECRET`** — uzun, rastgele; `change-me` kullanma.
2. **`ADMIN_PASSWORD`** — güçlü şifre; mümkünse düzenli değiştir.
3. Supabase Dashboard’da **service_role** sızdıysa anahtarı **rotate** et.
4. API yanıtlarında stack trace / DB ayrıntısı dönülmez (genel hata mesajları).

## Bilinen sınırlar (ileride güçlendirilebilir)

- Admin / üyelik formlarında **rate limiting** yok (brute-force azaltmak için eklenebilir).
- **2FA** admin için yok.

## Teknik

- `lib/supabaseAdmin.ts` → `server-only`: yanlışlıkla client bundle’a çekilmesini engeller.
- HTTP güvenlik başlıkları: `next.config.js` içinde `headers`.
