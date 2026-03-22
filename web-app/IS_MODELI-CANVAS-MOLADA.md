# Coworking Business Model Canvas → Molada eşlemesi

Kaynak: klasik **iş modeli tuvali** (Coworking Business Model). Görsel: proje `assets/` altında saklanan canvas PNG.

Bu dosya **ne işimize yarar** sorusunun cevabı: her kutuyu **şimdi yaptığımız / uygulama / operasyon / sonra** diye ayırırız.

---

## Özet tablo

| Canvas kutusu | Molada’da şimdi | Uygulama (`web-app`) | Operasyon (siz) | Sonra (ürün) |
|---------------|-----------------|----------------------|-----------------|--------------|
| **Değer önerisi** | Profesyonel ortam, esneklik, maliyet | Metin: ana sayfa, mekân | Üye deneyimini gerçekten bu vaatle hizala | — |
| **Müşteri segmentleri** | — | — | Pazarlama mesajı (freelance, KOBİ, uzaktan çalışan) | İsterseniz segment alanı DB’de |
| **Müşteri ilişkileri** | Kısmen | Üye paneli, admin onayı, e-posta yok | Yüz yüze karşılama, tanıştırma | E-posta bildirimi, basit duyuru |
| **Kanallar** | Web sitesi | molada.netlify.app | Sosyal medya, Google İşletme, etkinlik | Newsletter entegrasyonu |
| **Gelir akışları** | Üyelik, toplantı, kabin, sanal ofis (metin) | Başvuru + rezervasyon akışı | Fiyat teklifi, sözleşme, tahsilat | Ödeme API, fatura |
| **Temel kaynaklar** | Mekân, internet, odalar | Wi‑Fi atama, oda/kabin rezervasyonu | Router yedek, SLA | İsteğe bağlı erişim donanımı |
| **Temel faaliyetler** | Kısmen | Onay, rezervasyon yönetimi | Topluluk, etkinlik, tanıştırma | — |
| **Temel iş ortakları** | — | — | Kira sahibi, banka, temizlik, ISP, yerel işletmeler | — |
| **Maliyet yapısı** | — | — | `05-finans/BUTCE-SABLONU.md` vb. | — |

---

## 1) Değer önerisi (Value proposition)

Canvas: profesyonel ortam, üretkenlik, iş–yaşam, esneklik, maliyet verimliliği.

**Kullanım:** Web metinlerinde ve satış görüşmesinde aynı cümleleri kullanın. **Mekân sayfasına** kısa bir blok eklendi (bkz. kod).

---

## 2) Müşteri segmentleri

Canvas: freelancer, girişimci, uzaktan çalışan, KOBİ, dijital göçebe, startup, kurumsal uydu, dernek.

**Kullanım:**  
- Google İşletme / Instagram biyografisinde **2 segment** seçin (örn. “freelance + KOBİ”).  
- İlk kampanyada hepsini hedeflemeyin.

*(İleride uygulama: başvuru formuna “segment” seçimi opsiyonel eklenebilir.)*

---

## 3) Müşteri ilişkileri

Canvas: kolaylaştırma, topluluk, yüz yüze, çevrimiçi.

**Molada uygulaması:** çevrimiçi üyelik + panel + rezervasyon = **çevrimiçi** kısmı.  
**Eksik:** otomatik e-posta, üye dizini, mesajlaşma.

**Operasyon:** Haftada bir “tanışma” veya kahve saati — canvas’taki **topluluk** burada karşılanır.

---

## 4) Kanallar

Canvas: web, sosyal medya, e-posta, PR, etkinlik.

**Molada:** **Web** hazır.  
**Siz:** sosyal + Google profili + açılış etkinliği.

---

## 5) Gelir akışları

Canvas: üyelik, toplantı, etkinlik, katma değer (posta, sanal ofis, baskı…).

**Molada:** üyelik başvurusu + plan alanı; toplantı/kabin talebi; sanal ofis plan seçeneği.  
**Eksik:** tahsilat, fatura, paket süresi (aylık/yıllık).

**Sonra:** ödeme sağlayıcı + sözleşme PDF.

---

## 6) Temel kaynaklar

Canvas: internet, profesyonel mekân, toplantı odaları.

**Molada:** rezervasyon + Wi‑Fi mantığı bunu destekler.  
**Operasyon:** internet yedek hattı, ergonomi, temizlik takvimi.

---

## 7) Temel faaliyetler

Canvas: tanıştırma, topluluk kurma.

**Molada:** admin onayı = operasyonel kontrol.  
**Siz:** üyeleri birbirine tanıtma rutini (canvas’ın kalbi).

---

## 8) Temel iş ortakları

Canvas: mal sahibi, yatırımcı/banka, hizmet sağlayıcılar, teknoloji, yerel işletmeler, etkinlik.

**Kullanım:** Açılış öncesi **tek sayfa ortak listesi** (kim, ne için aranır). Kod gerektirmez.

---

## 9) Maliyet yapısı

Canvas: kira, personel, faturalar, pazarlama, bakım, hukuk.

**Kullanım:** Repo’daki finans şablonlarıyla hizalayın (`05-finans/`).

---

## Sonraki ürün öncelikleri (canvas’tan çıkan)

1. **E-posta** — onay ve rezervasyon (ilişki + kanal).  
2. **Ödeme / fatura** — gelir akışını kapatır.  
3. **Etkinlik duyurusu** — basit statik sayfa veya bülten.  
4. (İleri) **üye dizini** (opt-in) — ağ etkisi.

---

*Bu belge, canvas görselindeki başlıkları işletme ve yazılım kararlarına çevirir; Spacebring gibi tam otomasyon yerine Molada’nın aşamalı yol haritasını netleştirir.*
