# Molada — operasyon akışı (referans)

Profesyonel paylaşımlı ofis uygulamalarındaki tipik döngüye uyumludur (üyelik, kaynak rezervasyonu, faturalama aşaması için hazırlık); örnek çerçeve: [Spacebring — coworking işletme planı](https://www.spacebring.com/blog/tips/start-coworking-space).

**İş modeli tuvali (Business Model Canvas)** ile neyin uygulamada, neyin operasyonda olduğunu görmek için: [`IS_MODELI-CANVAS-MOLADA.md`](./IS_MODELI-CANVAS-MOLADA.md).

## Üye tarafı

1. **Üyelik başvurusu** (`/uyelik-basvuru` veya `/giris` alt formu) → plan: sıcak masa / sabit masa / sanal ofis.
2. **Admin onayı** → üyeye Wi‑Fi şifresi atanır.
3. **Giriş** (`/giris`) → **Üye paneli** (`/uye-paneli`).
4. **Rezervasyon talebi** → toplantı odası (A/B/C kapasite) veya sessiz kabin → admin onayı → giriş kodu + (varsa) geçici Wi‑Fi.
5. **Check-in / check-out** (onaylı rezervasyonlarda).

## Yönetim

- **Admin giriş:** `/admin/login` → panel `/admin`.
- Bekleyen üyeler ve rezervasyonlar; onay/red.

## Tek kaynak ayarlar

- Oda isimleri ve kapasiteler: `lib/coworking.ts` (`MEETING_ROOMS`, `SILENT_CABIN_COUNT`, `OPEN_WORKSPACE_CAPACITY`).
- Marka / iletişim: `lib/site.ts`.

## Veritabanı

Yeni sütun: `Reservation.meetingRoomId` (toplantı için 1–3). Şema: `prisma/schema.prisma`, migration: `prisma/migrations/20260319220000_reservation_meeting_room/`.

**Supabase:** `npx prisma migrate deploy` (veya SQL dosyasını SQL Editor’de çalıştırın).
