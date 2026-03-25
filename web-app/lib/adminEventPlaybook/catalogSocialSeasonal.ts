import { buildEvent } from './buildEvent';
import type { PlaybookCategory } from './types';

export const socialImpact: PlaybookCategory = {
  id: 'social-impact',
  titleTr: 'Sosyal etki etkinlikleri',
  titleEn: 'Social Impact Events',
  description: 'Bagis ve gonulluluk; KVKK ve bagkurum anlasmalari.',
  events: [
    buildEvent('yard-sale', 'Community Yard Sale', 'Ic / mahalle bit pazari', 'Ikinci el ve surdurulebilirlik.', 'Ic alan masa duzeni ve yogunluk kontrolu.', ['Katilimci masa ucreti (bagis).', 'Fiyat etiketi ve kasa.'], ['Son saat indirimi ve cam temizligi.']),
    buildEvent('fundraising-gala', 'Fundraising Gala', 'Bagis gecesi', 'Formal mini etkinlik.', 'Dress code ve alkoll servis kurallari.', ['Bagis kurumu yazili mutabakat.', 'Ihale veya bilet.'], ['Muhasabe ve makbuz.']),
    buildEvent('charity-fair', 'Charity Fair', 'Sosyal pazar', 'Satislardan pay.', 'Stant ve hijyen.', ['Vendor yuzde mutabakati.', 'Sozlesme ozet.'], ['Seffaflik raporu paylasimi.']),
    buildEvent('cleanup-day', 'Community Clean-Up Day', 'Temizlik gunu', 'Park veya sokak.', 'Belediye izni ve ekipman.', ['Guvenlik yelekleri ve eldiven.', 'Molada toplanma noktasi.'], ['Cop ayrma ve fotograf.']),
    buildEvent('blood-drive', 'Blood Drive', 'Kan bagisi', 'Saglik ekibi mobil.', 'Kizilay / hastane ile resmi isbirligi.', ['Randevu sistemi ve fast alani.', 'Gizlilik ve saglik formu.'], ['Ic alan SSS afisi.']),
    buildEvent('mentorship', 'Mentorship Program', 'Mentorluk programi', 'Eslestirme ve oturumlar.', 'Gizlilik sozlesmesi.', ['Basvuru formu ve uyum anketi.', 'Toplanti odasi slotlari.'], ['Geribildirim ve program sonu anket.']),
    buildEvent('charity-auction', 'Charity Auction', 'Bagis müzayedesi', 'Canli veya sessiz artirma.', 'Hukuki müzayede kurallari kontrol.', ['Bagislanan ürün ve hizmet listesi.', 'Ödeme tahsilat.'], ['Tesekkür ve basın notu.']),
    buildEvent('social-hackathon', 'Social Impact Hackathon', 'Sosyal hackathon', 'Sosyal problem cozumu.', 'Juri ve teslim formati.', ['Problem tanimi ve veri seti.', 'Ekip olusturma.'], ['Fikri mülkiyet ve acik kaynak tercihi.']),
  ],
};

export const seasonalNewYear: PlaybookCategory = {
  id: 'seasonal-new-year',
  titleTr: 'Yilbasi / yeni yil',
  titleEn: 'New Year',
  description: 'Ocak ayi motivasyon ve planlama.',
  events: [
    buildEvent('goal-workshop', 'Goal-Setting Workshop', 'Hedef belirleme atolyesi', 'Kisisel ve profesyonel hedefler.', 'Calisma kagidi ve kalem.', ['Uzman veya ici moderator.', 'Akıllı hedef sablonu.'], ['Hesaplas partner.', 'Gizlilik: paylasim istege bagli.']),
    buildEvent('new-skills-series', 'New Year, New Skills', 'Yeni beceri serisi', 'Mesai disi mini bootcamp.', 'Haftalik oturum takvimi.', ['Konu basliklari ve kayit.', 'Tekrar video veya not.'], ['Sertifika yok — beklenti yonetimi.']),
    buildEvent('time-capsule', 'Coworking Time Capsule', 'Zaman kapsulu', 'Uye mektuplari ve tahminler.', 'Kutu ve mühür; saklama yeri güvenli.', ['Icerme tarihi ve acilis tarihi yazili.', 'KVKK: kisisel veri icermesin.'], ['Fotograf opsiyonel.']),
  ],
};

export const seasonalEaster: PlaybookCategory = {
  id: 'seasonal-easter',
  titleTr: 'Paskalya temali',
  titleEn: 'Easter',
  description: 'Kulturel ve laik ortamda dikkatli dil.',
  events: [
    buildEvent('easter-egg-decor', 'Easter Egg Decorating', 'Yumurta susleme yarismasi', 'Yaratici ve aile dostu.', 'Masa ortuleri ve boya lekesi.', ['Malzeme tedarigi ve yas gruplari.', 'Juri kategorileri.'], ['Fotograf ve cop.']),
    buildEvent('easter-potluck', 'Around the World Easter Potluck', 'Paskalya potluck', 'Geleneksel yemek paylasimi.', 'Alerjen etiket zorunlu.', ['Ulke temali masalar.', 'Isıticı ve buzdolabi plani.'], ['Diyet bilgisi afiste.']),
  ],
};

export const seasonalValentines: PlaybookCategory = {
  id: 'seasonal-valentines',
  titleTr: 'Sevgililer gunu',
  titleEn: "Valentine's Day",
  description: 'Iste romantizm: gonulluluk ve mahremiyet.',
  events: [
    buildEvent('speed-dating', 'Speed Dating', 'Hizli tanisma', 'Kisa gorüşmeler.', 'Mahremiyet ve taciz protokolü.', ['Katilim esitligi ve cikis hakkı.', 'Ice-breaker kartlari.'], ['Gürültü ve süre zili.']),
    buildEvent('valentine-cards', 'Valentine Card Making', 'Kart yapimi atolyesi', 'El yapimi kart.', 'Masa ve malzeme.', ['Igne ve makas guvenligi.', 'Paylasim istemeyenler icin cikis.'], ['Sonuclari zorunlu paylasmayin.']),
    buildEvent('romcom-day', 'Rom-Com Movies Day', 'Romantik komedi gunu', 'Uzun izleme.', 'Ses ve komşu saati.', ['Film secimi ve ara.', 'Battaniye ve minder.'], ['Alkoll icecek politikası.']),
  ],
};

export const seasonalHalloween: PlaybookCategory = {
  id: 'seasonal-halloween',
  titleTr: 'Cadilar bayrami temasi',
  titleEn: 'Halloween',
  description: 'Kostum ve guvenlik; cocuk varsa gozetmen.',
  events: [
    buildEvent('halloween-psych', 'Facing Your Fears Talk', 'Korku psikolojisi konusmasi', 'Egitimsel konusma.', 'Uzman ve tetikleyici uyari afisi.', ['Karanlikta cikis plani.', 'Soru formati onceden.'], ['Kaynak brosur.']),
    buildEvent('pitch-fears', 'Pitch Your Fears', 'Korkularini pitch et', 'Is kaygisi icin metaforik pitch.', 'Guvenli alan kurallari.', ['Sure limiti ve alkış protokolu.', 'Kayıt yok duyurusu.'], ['Mentor kosesi.']),
    buildEvent('halloween-party', 'Halloween Costume Party', 'Kostum partisi', 'Muzik ve dans.', 'Ates ve maskelerde gorunurluk.', ['Kostum guvenligi (silah benzeri yasak).', 'DJ veya liste.'], ['Fotograf kosesi.']),
    buildEvent('pumpkin-contest', 'Pumpkin Carving', 'Balkabagi oyma', 'Kesici alet guvenligi.', 'Hazirlik alani ayri.', ['Eldiven ve cop.', 'Yarismada yas gruplari.'], ['Leke temizligi.']),
    buildEvent('spooky-movie', 'Spooky Movie Night', 'Korku filmi gecesi', 'Film ve popcorn.', 'Telif ve ses.', ['Istege bagli katilim — korku tetikleyici uyari.', 'Ara mola.'], []),
  ],
};

export const seasonalThanksgiving: PlaybookCategory = {
  id: 'seasonal-thanksgiving',
  titleTr: 'Sukran gunu temasi (AB kulturu)',
  titleEn: 'Thanksgiving',
  description: 'Turkiyede daha az bilinen; expat uyeler veya tema gunu.',
  events: [
    buildEvent('gratitude-ws', 'Gratitude Workshop', 'Sukran ve farkindalik', 'Paylasim dairesi.', 'Duygusal guvenlik.', ['Moderator egitimi.', 'Istege bagli paylasim.'], ['Ses kaydi yok.']),
    buildEvent('thanksgiving-potluck', 'Thanksgiving Potluck', 'Paylasimli yemek', 'Buyuk masa.', 'Firin ve servis.', ['Kim ne getiriyor listesi.', 'Diyet etiketleri.'], ['Oturma plani.']),
    buildEvent('thanksgiving-volunteer', 'Volunteer Day', 'Gonullu gunu', 'Dis bagis.', 'Ulasim ve sigorta.', ['STK ile yazili isbirligi.', 'Guvenlik brifingi.'], ['Katilim listesi.']),
    buildEvent('friendsgiving', 'Friendsgiving', 'Arkadas Sukrani', 'Yurtdisinda kalanlar.', 'Rezervasyon ve kisi basi ucret.', ['Masa buyuklugu.', 'Icecek politikasi.'], ['Tesekkur konusmasi sure limiti.']),
  ],
};

export const seasonalChristmas: PlaybookCategory = {
  id: 'seasonal-christmas',
  titleTr: 'Noel / yilbasi temasi',
  titleEn: 'Christmas',
  description: 'Susleme ve elektrik guvenligi; kulturel duyarlilik.',
  events: [
    buildEvent('secret-santa', 'Secret Santa', 'Secret Santa hediylesme', 'Eslestirme ve limit.', 'Hediye kutusu ve gizlilik.', ['Katilim son tarihi ve butce tavani.', 'Istemedigini beyan edenler icin cikis.'], ['Acilim ritueli ve fotograf.']),
    buildEvent('cookie-gingerbread', 'Cookie and Gingerbread Decorating', 'Kurabiye ve zencefilli ev', 'Cocuk ve yetiskin.', 'Firin ve alerjen.', ['Malzeme esit dagitim.', 'Yarisma kategorileri.'], ['Paketleme.']),
    buildEvent('christmas-karaoke', 'Christmas Karaoke', 'Noel karaoke', 'Sarki listesi.', 'Ses ve komsu.', ['Telif dostu karaoke seti.', 'Dekorasyon guvenligi.'], ['Icecek politikasi.']),
  ],
};
