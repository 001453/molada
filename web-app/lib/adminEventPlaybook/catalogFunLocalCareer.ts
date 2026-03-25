import { buildEvent } from './buildEvent';
import type { PlaybookCategory } from './types';

export const funFridays: PlaybookCategory = {
  id: 'fun-fridays',
  titleTr: 'Eğlenceli Cumalar (Fun Fridays)',
  titleEn: 'Fun Fridays',
  description: 'Hafta sonuna rahat geçiş; alkollü etkinliklerde mevzuat ve sorumluluk bilinci.',
  events: [
    buildEvent('happy-hour', 'Happy Hour', 'Happy hour / içecek buluşması', 'Soğuk içecek ve sohbet.', 'Alkol: ruhsat ve yaş sınırı; aşırı tüketim protokolü.', ['İkram bütçesi veya get-your-own netliği.', 'Bitiş saati ve ses sınırı.'], ['Buz, bardak, su istasyonu.', 'Taksi/emin eller kartı afişe.']),
    buildEvent('trivia-night', 'Trivia Night', 'Bilgi yarışması gecesi', 'Ekip trivia ve küçük ödüller.', 'Soru seti telif: kendi yazın veya lisanslı set.', ['Takım oluşturma ve puan tahtası.', 'Ödül: küçük hediye veya ücretsiz kahve kuponu.'], ['Zamanlayıcı ve hakem.', 'Beraberlik kuralı.']),
    buildEvent('charades', 'Charades Challenge', 'Charades / doğaçlama oyunu', 'Beden dili ile eğlence.', 'Gürültü: komşu çalışma saati dışına alın.', ['Kelime listeleri seviyeye göre.', 'Süre ve pas hakkı.'], ['Takım sayısı dengesi.', 'Video çekim izni.']),
    buildEvent('silent-disco', 'Silent Disco', 'Sessiz disko (kulaklık)', 'Kulaklık ile dans ve düşük dış ses.', 'Kulaklık kiralama veya kişisel kulaklık + yayın.', ['Playlist ve kanal sayısı.', 'Şarj ve hijyen (kulaklık temizliği).'], ['Dans alanı zemini ve kayma riski.', 'Foto molaları için ışık planı.']),
    buildEvent('fail-fest', 'Fail Fest', '"Fail Fest" — hatalardan öğrenme', 'Girişimcilerin başarısızlık hikâyesi paylaşımı.', 'Gizlilik: anonim slot veya “Chatham House Rule”.', ['Konuşmacı süre sınırı ve güvenli ortam sözleşmesi.', 'Kayıt yasağı duyurusu.'], ['Kayıt ve mentör köşesi.', 'Duygusal destek bilgisi (isteğe bağlı).']),
    buildEvent('improv-night', 'Improv Comedy Night', 'Doğaçlama komedi gecesi', 'Yerel komedyen veya üye atölyesi.', 'Dışarıdan gelen için ücret ve sahne.', ['Temel kurallar (saygı, “evet ve”).', 'Seyirci katılımı sınırı.'], ['Işık ve mikrofon testi.', 'Hazır çıkış kelimesi.']),
    buildEvent('open-mic', 'Open Mic Night', 'Açık mikrofon', 'Şarkı, şiir, kısa performans.', 'Ses seviyesi ve içerik kuralları.', ['Kayıt sırası ve zaman dilimleri.', 'Enstrüman priz ihtiyacı.'], ['Filigransız hoparlör uğultusu kontrolü.', 'Alkollü açık mikrofon varsa yaş kontrolü.']),
    buildEvent('public-speaking-ws', 'Public Speaking Workshop', 'Toplum önünde konuşma atölyesi', 'İletişim becerisi.', 'Eğitmen sözleşmesi ve katılımcı sayısı.', ['Pratik 2 dk konuşma turu.', 'Video geri bildirim izni.'], ['Podium yoksa ayakta konuşma çemberi.', 'Güvenli geri bildirim formatı.']),
    buildEvent('karaoke-night', 'Karaoke Night', 'Karaoke gecesi', 'Müzik ve stres atma.', 'Telif: ticari karaoke lisansı veya kişisel karaoke uygulaması koşulları.', ['Şarkı kuyruğu yönetimi.', 'Orta ses modu ve komşuluk saati.'], ['Mikrofon kaplaması hijyeni.', 'Su istasyonu.']),
    buildEvent('ugly-sweater', 'Ugly Sweater Party', 'Çirkin kazak partisi', 'Sezonluk neşe ve foto.', 'Süsleme ve güvenlik (LED, alevlenebilir malzeme yok).', ['Oylama kategorileri (en komik, en yaratıcı).', 'Ödüller.'], ['Foto köşesi ve ışık.', 'Katılım isteğe bağlı duyurusu.']),
    buildEvent('pajama-day', 'Pajama Day', 'Pijama günü', 'Rahat gün teması.', 'Profesyonel görüşme varsa hibrit “sade arka plan” alanı ayırın.', ['Giyim minimum saygı sınırı yazın (hijyen, uygunluk).', 'Online katılımcılar için tema duyurusu.'], ['Foto opsiyonel.', 'Klimalı alanda ekstra kat uyarısı.']),
  ],
};

export const localThursdays: PlaybookCategory = {
  id: 'local-thursdays',
  titleTr: 'Yerel perşembeler (Local Thursdays)',
  titleEn: 'Local Thursdays',
  description: 'Üsküdar–Çengelköy hattındaki üretici ve sanatçılarla iş birliği fırsatları.',
  events: [
    buildEvent('art-exhibition', 'Art Exhibitions', 'Sanat sergisi', 'Yerel sanatçı vitrini.', 'Duvar asmada izin ve sigorta; eser güvenliği.', ['Sergi süresi ve açılış saati.', 'Satış komisyonu anlaşması.'], ['Eser etiketleri ve QR sanatçı biyografisi.', 'Açılış konuşması kısa tutun.']),
    buildEvent('farmers-market', 'Local Farmers Market', 'Yerel üretici pazarı', 'Taze ürün ve el emeği.', 'İç mekânda stant sayısı ve yangın çıkış genişliği.', ['Üretici sözleşmesi ve KDV/oku fatura beklentisi.', 'Hijyen eldiven ve numune kuralları.'], ['Ziyaretçi akış yönü.', 'Poşet politikası (bez önerisi).']),
    buildEvent('craft-beer', 'Local Craft Beer Tasting', 'Yerel birahane tadımı', 'Tadım ve eğitim.', 'Alkol ruhsatı ve yaş; sürücülere alkolsüz alternatif.', ['Bira çeşitleri ve küçük porsiyon.', 'Sunum notları (IBU, stil).'], ['Tükürük tehlikesi için tek kullanımlık bardak protokolü.', 'Taksi bilgisi.']),
    buildEvent('live-music', 'Live Music Performance', 'Canlı müzik', 'Yerel müzisyen.', 'Ses bariyeri ve bitiş saati; komşuluk duyurusu.', ['Ses kontrol listesi ve unplug seçeneği.', 'Müzisyen sözleşmesi ve priz ihtiyacı.'], ['Dinleyici oturma ve ayakta alan ayrımı.', 'Bahşiş kutusu politikası.']),
    buildEvent('local-film', 'Local Film Festival', 'Yerel kısa film gösterimi', 'Yerel yönetmen + soru-cevap.', 'Telif ve gösterim izni.', ['Seçki süresi toplamı ve ara.', 'Moderatör soruları önceden.'], ['Altyazı kontrolü.', 'Karanlık ortamda güvenlik şeritleri.']),
  ],
};

export const careerCorner: PlaybookCategory = {
  id: 'career-corner',
  titleTr: 'Kariyer köşesi (Career Corner)',
  titleEn: 'Career Corner',
  description: 'İş ağı ve gelişim; Molada üye güveni için veri paylaşımına dikkat.',
  events: [
    buildEvent('job-fair', 'Job Fair', 'İş fuarı (mini)', 'İşveren–aday buluşması.', 'Stant sayısı ve gizlilik: CV’ler güvenli toplanmalı.', ['Katılımcı şirket ön eleması ve etik kurallar.', 'Hızlı görüşme masaları zaman çizelgesi.'], ['CV klinik köşesi.', 'Geri bildirim anketi.']),
    buildEvent('networking', 'Networking', 'Networking gecesi', 'Yapılandırılmış tanışma.', 'Ice-breaker ve süre limiti.', ['İsim etiketi ve “aradığım” alanı.', 'Sektör renk kodlu rozet (isteğe bağlı).'], ['Gürültü yönetimi.', 'Takip için LinkedIn QR köşesi.']),
    buildEvent('career-coaching', 'Career Coaching Session', 'Kariyer koçluğu seansı', 'CV ve mülakat.', 'Koç sözleşmesi ve bireysel görüşme slotları.', ['Gizlilik: ses geçirmez kabin rezervasyonu.', 'Ön ödev (CV gönderimi).'], ['Kaynak kitaplığı linki.', 'Ücret şeffaflığı.']),
    buildEvent('share-learn', 'Share & Learn', 'Paylaş ve öğren', 'Üyelerden lightning talk.', 'Sunum süresi 5–7 dk.', ['Konu havuzu ve önceden teknik test.', 'Kayıt izni ayrı onay.'], ['Takvim tekrarı için bekleme listesi.', 'Mentor eşleştirme (isteğe bağlı).']),
  ],
};
