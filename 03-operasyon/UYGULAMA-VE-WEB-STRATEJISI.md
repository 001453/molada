# Paylaşımlı Ofis — Uygulama ve Web Sitesi Stratejisi

Rakipler incelendi; aşağıda özet ve **bize özgü** sistem tasarımı yer alıyor. Amaç: onların birebir kopyası değil, tek lokasyon ve ilk faz ihtiyacına göre sade, anlaşılır ve ileride büyütülebilir bir yapı.

---

## 1. Rakiplerin Uygulama ve Web Yaklaşımları (Özet)

### Türkiye — Rezervasyon / yönetim yazılımı

| Rakip | Ne sunuyor | Öne çıkanlar |
|-------|------------|--------------|
| **Booxpace** | Hibrit çalışma için ofis rezervasyon platformu | Bina, toplantı odası, yemekhane, otopark rezervasyonu; mobil + web; analitik; 10–500 çalışan planları (kurumsal odaklı) |
| **EBRoom** (Eczacıbaşı Bilişim) | Ofis masa / oda rezervasyon uygulaması | iOS/Android + web; rezervasyon oluşturma/silme/güncelleme, check-in; şirket/lokasyon/kat planı ve raporlama |
| **eOfis** | Paylaşımlı ofis hizmeti (60 lokasyon) | Saatlik/günlük/haftalık masa ve toplantı odası; üyelik ile tüm lokasyonlara erişim; web üzerinden bilgi ve iletişim |

### Küresel — Büyük zincirler (referans)

| Rakip | Uygulama / web özellikleri |
|-------|----------------------------|
| **WeWork** | Konum haritası, günlük masa / saatlik toplantı odası rezervasyonu, sözleşmesiz “book and show up”, etkinliklere RSVP, ekip kullanım analitiği, hibrit ekip yönetimi |
| **Regus** | Saatlik/günlük esnek masa, toplantı odası, özel ofis, business lounge; 4000+ lokasyon; uygulama üzerinden rezervasyon; aylık abonelik seçenekleri |

### Ortak noktalar (rakiplerde sık görülenler)

- **Rezervasyon:** Toplantı odası / masa saatlik veya günlük; bazen check-in.
- **Çok lokasyon:** Harita, lokasyon listesi, “en yakın ofis” (bizde tek lokasyon — sadeleştirilebilir).
- **Üyelik / giriş:** Kart, mobil anahtar veya uygulama ile giriş takibi.
- **Faturalama:** Abonelik veya kullanıma göre fatura (bazıları entegre yazılım kullanıyor).
- **Marka / bilgilendirme:** Web sitesinde fiyat, paketler, iletişim, bazen canlı sohbet.

Bizim farkımız: Tek lokasyon, aile işletmesi, cadde üstü + çay-kahve; başlangıçta karmaşık yazılım zorunlu değil; “özgün” derken kastımız ihtiyaca göre **sade ve büyütülebilir** bir sistem.

---

## 1.1 Konum Değerleri (Adres ve Ulaşım)

Konum ve adres metinlerinde yalnızca cadde, ulaşım ve semt vurgulanır; marka / zincir adı kullanılmaz.

| Değer | Açıklama | Yazılım / web’de kullanım |
|-------|----------|---------------------------|
| **Konum** | Cadde üstü; görünür ve tarifi kolay adres | Ana sayfa / mekân: “Cadde üstünde, kolay ulaşılır konum” |
| **Ulaşım** | Toplu taşıma önünden geçiyor; Üsküdar’dan tek vasıtayla; Çengelköy, Beylerbeyi ~5 dk | Mekân / iletişim: “Üsküdar–Çengelköy–Beylerbeyi hattında; toplu taşıma ile tek vasıta”, ulaşım sayfası veya harita notu |
| **Erişim** | Tek adres, kolay tarif; günlük hayatla iç içe | Ana sayfa: “Cadde üstünde — bir kahve, toplantı veya çalışma” |
| **Güvenilirlik** | Net adres; “nerede?” sorusuna kolay cevap | Mekân sayfası: tam adres, harita pin (marka/zincir adı yok) |
| **Çay-kahve sinerjisi** | Alışveriş / günlük akışla uyumlu konum; üstte çalışma + kafe | Fiyat / paket: “Çay-kahve alanı”, “Molada çalışma” kampanya fikri |
| **Maliyet** | Aile mülkü; kira avantajı hizmet fiyatına yansıyabilir | Rekabetçi fiyat vurgusu; “Bölgede erişilebilir paylaşımlı ofis” |
| **Yerel topluluk** | Semt / mahalle odaklı; Üsküdar, Çengelköy, Beylerbeyi çevresi; freelance, KOBİ | Üyelik ve etkinlik: “Mahallenizin ofisi”, “Anadolu yakası — tek vasıtayla ulaşım” |

Bu değerler web sitesi, sosyal medya ve uygulama metinlerinde **adres ve konumda marka adı kullanılmadan** kullanılır.

---

## 2. Bizim Özgün Sistem Tasarımı (İlk Faz)

Rakiplerle **benzer olmak zorunda değiliz**; tek merkezli, sade ve ileride uygulama/otomasyona açık bir yapı kurguluyoruz.

### 2.1 Web sitesi (temel — ilk faz)

- **Ana sayfa:** Paylaşımlı ofis adı, kısa tanım (cadde üstü, 400 m², açık ofis + toplantı + çay-kahve), konum ve iletişim (adreste marka/zincir adı kullanılmaz).
- **Fiyat ve paketler:** Sıcak masa, sabit masa, sanal ofis, toplantı odası / sessiz kabin (saatlik veya paket dahil) — net, rakamlar görünür (`FIYAT-LISTESI-SABLONU.md` ile uyumlu).
- **Mekân:** Kısa metin + kat planı görseli (ör. `KAT-PLANI-VIZ.html` çıktısı veya statik görsel).
- **İletişim:** Telefon, e-posta, adres; isteğe bağlı: basit iletişim formu veya WhatsApp butonu.
- **Yasal / güven:** KVKK özeti, “Üyelik sözleşmesi ve kurallar” sayfasına link (veya PDF indirme).
- **Dil:** Türkçe ana; ileride İngilizce tek sayfa özet düşünülebilir.

Teknik: Başlangıç için tek sayfalık site (one-page) veya 4–5 sayfa (Ana, Fiyat, Mekân, İletişim, KVKK) yeterli. WordPress, basit statik site veya Carrd/Typeform gibi araçlarla hızlı açılabilir.

### 2.2 Rezervasyon ve üyelik takibi (bize özgü kurgu)

- **Seçenek A — Sade başlangıç:**  
  Web sitesinde “Rezervasyon / bilgi” formu veya “WhatsApp ile rezervasyon” butonu; toplantı odası ve sessiz kabin rezervasyonları Excel/Google Tablo ile takip. Giriş: turnike + kart; süre resepsiyon veya manuel liste ile kontrol.

- **Seçenek B — Hafif yazılım:**  
  Sadece **bizim lokasyonumuza** odaklı, tek lokasyonlu bir rezervasyon modülü: toplantı odası ve sessiz kabin için takvim (gün/saat), üye bilgisi ve paket dahil saat bilgisi. İsteğe bağlı: e-posta/WhatsApp bildirimi. Fatura ayrı (muhasebeci veya e-fatura) kesilebilir.

- **Seçenek C — Hazır ürün (Booxpace / EBRoom benzeri):**  
  Çok lokasyon özelliği kullanılmaz; sadece tek lokasyon + toplantı/sessiz kabin + (isteğe bağlı) üye giriş takibi. Maliyet ve ihtiyaca göre değerlendirilir.

Özgünlük: Rakipler çok lokasyon ve kurumsal kullanıcıya göre tasarlanmış; bizim sistem **tek adres, tek kat, çay-kahve ve yerel müşteri** odaklı — gereksiz özellik eklemeden sade tutulabilir.

### 2.3 Mobil uygulama (ilk fazda zorunlu değil)

- İlk fazda **web sitesi mobil uyumlu (responsive)** olsa yeterli: fiyat, iletişim, rezervasyon formu veya yönlendirme telefonda da çalışsın.
- İleride üye sayısı ve talep artarsa: sadece **rezervasyon + giriş bilgisi** (ör. QR / kart numarası hatırlatma) odaklı, tek lokasyonlu küçük bir uygulama düşünülebilir. Rakiplerdeki “yüzlerce lokasyon, harita, etkinlik” gibi modüller bizim ölçeğimiz için gerekmez.

### 2.4 Giriş ve güvenlik (sistemle uyumlu)

- Turnike/kart: Üyelik süresi ile senkron (süre bitince geçiş kapanır) — `OPERASYON-HAZIRLIK-LISTESI.md` ile uyumlu.
- Rezervasyon sistemi (Excel veya yazılım): Hangi üyenin hangi saatte toplantı odası / sessiz kabin kullandığı kayıt altında; gerektiğinde raporlama.
- Misafir: Web/mobil değil, resepsiyonda kayıt (`MISAFIR-KAYIT-FORMU-VE-KVKK.md`).

---

## 3. Özet Tablo — Rakipler vs Bizim Tasarım

| Konu | Rakiplerde sık görülen | Bizim özgün tasarım (ilk faz) |
|------|------------------------|---------------------------------|
| Web | Çok sayfa, çok lokasyon, harita | Tek lokasyon, 4–5 sayfa: Ana, Fiyat, Mekân, İletişim, KVKK; net fiyat |
| Rezervasyon | Uygulama + web, çok lokasyon | Web formu veya WhatsApp + Excel; isteğe hafif yazılım (tek lokasyon) |
| Mobil uygulama | Var (WeWork, Regus, EBRoom) | İlk fazda yok; web responsive yeterli |
| Giriş | Kart / mobil anahtar, check-in | Turnike + kart; süre resepsiyon/yazılım ile senkron |
| Faturalama | Bazıları entegre | Ayrı (muhasebeci / e-fatura); ileride entegre modül eklenebilir |
| Etkinlik / topluluk | WeWork tarzı etkinlik listesi | İlk fazda sade; ileride basit “etkinlik duyurusu” sayfası eklenebilir |

---

## 4. Yapılacaklar (Checklist ile uyumlu)

- [ ] Web sitesi içeriği netleştirildi (metin, fiyat, görsel, iletişim)
- [ ] Web sitesi yayına alındı (tek sayfa veya 4–5 sayfa); mobil uyumlu
- [ ] Rezervasyon yöntemi seçildi: form/WhatsApp + Excel **veya** hafif yazılım (**hangi:** _________)
- [ ] Fiyat listesi web’de güncel; KVKK ve sözleşme linkleri eklendi
- [ ] İleride (isteğe bağlı): rezervasyon modülü veya küçük mobil uygulama ihtiyacı tekrar değerlendirilecek

**Hazır site/uygulama:** Proje içinde `web-app/` klasöründe Next.js ile Vercel’e deploy edilebilir site ve mobil uyumlu arayüz hazırdır. Geçici marka adı **Molada** kullanılmaktadır; logo ve isim değişince `web-app/lib/site.ts` güncellenir. A’dan Z’ye açılış incelemesi: `06-checklist/INCELEME-A-Z-WEB-ACILIS.md`.

---

---

## 5. WeWork Benzeri Yazılım Sistemi (Kurulabilir Yapı)

WeWork tarzı deneyimi tek lokasyon ve konum değerleriyle (cadde üstü, ulaşım, semt) uyumlu biçimde kurabilmek için aşağıdaki yazılım katmanları tasarlanabilir. Hepsi aynı anda değil; ilk fazda web + rezervasyon, sonra üyelik/giriş ve isteğe topluluk eklenebilir.

### 5.1 Kullanıcı deneyimi (WeWork’e benzer akış)

- **Rezervasyon:** Masa (günlük/saatlik) ve toplantı odası / sessiz kabin (saatlik) — “seç, öde veya paket dahilinde kullan, gel”.
- **Sözleşmesiz deneme:** Günlük/saatlik için “kayıt ol, rezervasyon yap, gel” (WeWork’teki “book and show up”); aylık üyelik ayrı akış.
- **Tek ekran / tek lokasyon:** Harita yerine tek adres (cadde, semt); tüm rezervasyon ve bilgi bu lokasyona göre (adreste marka adı kullanılmaz).
- **Mobil uyum:** Web responsive; ileride küçük uygulama: rezervasyon, kapı/kart bilgisi, duyurular.

### 5.2 Yazılım modülleri (kurulabilir sistem)

| Modül | İşlev | WeWork benzeri özellik | Tek lokasyon uyarlaması |
|-------|--------|------------------------|--------------------------|
| **Web / landing** | Tanıtım, fiyat, konum (cadde, ulaşım, semt), iletişim | Çok lokasyon listesi | Tek sayfa veya 4–5 sayfa; cadde üstü, ulaşım vurgusu (adreste marka adı yok) |
| **Rezervasyon** | Toplantı odası, sessiz kabin, (isteğe) sıcak masa saat/gün | Takvim, saat seçimi, anında onay | Tek lokasyon takvimi; paket dahil saat veya ücretli saat |
| **Üyelik / hesap** | Kayıt, giriş, paket (sıcak/sabit/sanal), sözleşme onayı | Üyelik planları, fatura | Üye profili, paket süresi, turnike/kart ile senkron |
| **Giriş / erişim** | Kart veya QR; süre bitince erişim kapanır | Mobil anahtar, check-in | Turnike + kart; isteğe QR (uygulama içi) |
| **Ödeme / fatura** | Paket ücreti, ek saat, toplantı odası ücreti | Entegre ödeme, abonelik | e-fatura / muhasebeci ile; ileride entegre ödeme API |
| **Duyuru / topluluk** | Etkinlik, kurallar, iletişim | WeWork etkinlik listesi, RSVP | Basit duyuru sayfası veya e-posta/WhatsApp; isteğe RSVP |

### 5.3 Teknoloji seçenekleri (sistemi kurmak için)

- **Kendi geliştirme:** Web (React/Next.js veya sade HTML), rezervasyon backend (Node/Python vb.), basit üye/giriş veritabanı; mobil için PWA veya ileride React Native / Flutter.
- **Hazır + özelleştirme:** Calendly / Cal.com benzeri rezervasyon + kendi sitesi; üyelik için Memberstack, Stripe Billing veya yerel ödeme + basit panel.
- **Tek çatı:** Booxpace, EBRoom vb. tek lokasyon kullanımı; marka ve metinler konum değerleriyle (cadde, ulaşım, semt; adreste marka adı kullanılmaz) doldurulur.

### 5.4 Konum değerlerinin yazılıma yansıması

- Uygulama / web’de konum ve adres: Cadde üstü, tam adres, harita pin — **adreste ve konum metinlerinde marka/zincir adı kullanılmaz.**
- Ulaşım: “Toplu taşıma önünden geçiyor; Üsküdar’dan tek vasıta; Çengelköy, Beylerbeyi ~5 dakika” — mekân veya iletişim sayfasında kısa ulaşım notu.
- Rezervasyon ve fiyat metinleri: “Molada çalışma”, “Mahallenizin ofisi”, “Anadolu yakası — tek vasıtayla ulaşım” gibi kısa vurgular.
- Topluluk / duyuru: Kahve saati, networking — WeWork tarzı etkinlik, tek lokasyon ve yerel dilde.

Bu yapı ile WeWork benzeri “rezervasyon + üyelik + giriş + topluluk” deneyimi, konum değerleriyle (cadde üstü, ulaşım, semt — adreste marka adı kullanılmaz) tek lokasyonda kurulabilir; yazılım adım adım (önce web + rezervasyon, sonra üyelik/giriş, sonra topluluk) büyütülebilir.

---

**Referanslar:**  
Fiyat → `03-operasyon/FIYAT-LISTESI-SABLONU.md`  
Üyelik ve operasyon → `03-operasyon/UYELIK-VE-FIYATLANDIRMA.md`  
Operasyon hazırlık → `06-checklist/OPERASYON-HAZIRLIK-LISTESI.md`  
Toplantı kuralları → `02-hukuksal/TOPLANTI-ODASI-KULLANIM-KURALLARI.md`
