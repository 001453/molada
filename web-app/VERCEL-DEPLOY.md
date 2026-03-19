# Vercel’e Ekleme — Adım Adım

Site ve uygulama tek proje; Vercel’e ekleyince hem web hem mobil tarayıcıda “uygulama gibi” kullanılabilir (PWA).

---

## 1. Hazırlık

- `web-app` klasöründe `npm install` ve `npm run build` çalıştığını kontrol edin.
- İletişim bilgilerini girin: `.env.example` → `.env.local` kopyalayıp doldurun (veya Vercel’de Environment Variables ekleyin).

---

## 2. Vercel’e proje ekleme

1. **vercel.com** → Giriş yapın (GitHub / GitLab / Bitbucket).
2. **Add New** → **Project**.
3. Repoyu seçin (paylasimli-ofis-projesi veya web-app’i push ettiğiniz repo).
4. **Root Directory:** `web-app` seçin (veya sadece web-app’i ayrı repo yaptıysanız boş bırakın).
5. **Framework Preset:** Next.js (otomatik).
6. **Build Command:** `npm run build` (varsayılan).
7. **Output Directory:** boş (Next.js varsayılan).
8. **Environment Variables:** İsterseniz ekleyin:
   - `NEXT_PUBLIC_ADDRESS`
   - `NEXT_PUBLIC_PHONE`
   - `NEXT_PUBLIC_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP`
   - `NEXT_PUBLIC_MAP_URL`
   - `DATABASE_URL` (Vercel/Postgres veya başka veritabanı bağlantısı)
   - `AUTH_SECRET` (JWT imza secret)
   - `ADMIN_USERNAME` (admin kullanıcı adı)
   - `ADMIN_PASSWORD` (admin şifre)
   - `WIFI_SSID` (router/SSID adı)
9. **Deploy** tıklayın.

---

## 3. Domain (isteğe bağlı)

- Vercel `*.vercel.app` adresi verir; hemen yayındasınız.
- Kendi domain: **Project → Settings → Domains** → domain ekleyin, DNS’te Vercel’e yönlendirin.

---

## 4. Site = Uygulama

- Aynı URL mobilde açılır; responsive tasarım kullanılır.
- `manifest.json` sayesinde tarayıcıda “Ana ekrana ekle” ile uygulama gibi kullanılabilir.
- Ayrı bir native uygulama yok; tek codebase yeterli.

---

**Eksik kontrolü:** Proje kökünde `06-checklist/INCELEME-A-Z-WEB-ACILIS.md` dosyasını açılış öncesi doldurun.
