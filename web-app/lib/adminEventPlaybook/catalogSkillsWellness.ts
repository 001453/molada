import { buildEvent } from './buildEvent';
import type { PlaybookCategory } from './types';

export const skillSharpeners: PlaybookCategory = {
  id: 'skill-sharpeners',
  titleTr: 'Beceri catlaklari (Skill Sharpeners)',
  titleEn: 'Skill Sharpeners',
  description: 'Atolye ve seminer; egit icreti ve KDV icin muhasebe notu.',
  events: [
    buildEvent('prod-time', 'Productivity & Time Management', 'Verimlilik ve zaman yonetimi', 'Odak ve planlama becerileri.', 'Beyaz tahta veya dijital zamanlayici.', ['Egitmen veya ici uzman.', 'Uygulama listesi onceden.'], ['Pomodoro canli denemesi.', 'Kisisel hedef karti.']),
    buildEvent('leadership', 'Leadership Skills', 'Liderlik becerileri', 'Iletisim ve delegasyon.', 'Kucuk grup rol oyunu alani.', ['Vaka calismasi materyali.', 'Geri bildirim kurallari.'], ['Guvenli paylasim ortami.', 'Kaynak PDF.']),
    buildEvent('financial-planning', 'Financial Planning', 'Finansal planlama', 'Kisisel butce ve yatirim giris.', 'Yatirim tavsiyasi yasal uyarisi: bilgilendirme amacli.', ['Egitmen yeterlilik/uyari afisi.', 'Ornek tablolar anonim.'], ['Soru-cevap zaman kutusu.', 'Kaynak link listesi.']),
    buildEvent('personal-brand', 'Personal Branding & Networking', 'Kisisel marka ve ag', 'LinkedIn ve pitch.', 'Fotograf kosesi veya ring light.', ['Profil denetim checklist.', 'Hizli pitch 30 sn.'], ['Cift tarafli geri bildirim.', 'Baglanti karti.']),
    buildEvent('storytelling', 'Storytelling & Public Speaking', 'Hikaye ve konusma', 'Anlati becerisi.', 'Video kayit istege bagli acik riza.', ['Yapi: tetik, gelisme, sonuc.', 'Esli pratik.'], ['Sinav gibi baski yok vurgusu.']),
    buildEvent('creativity-innovation', 'Creativity & Innovation', 'Yaraticilik ve inovasyon', 'Design thinking / beyin firtinasi.', 'Yapiskan not ve zamanlayici.', ['Problem somutu secin.', 'Prototip malzemesi (karton).'], ['Paylasim turu.', 'En iyi 3 fikir oylanir.']),
    buildEvent('nutrition', 'Nutrition', 'Beslenme', 'Saglikli ogun pratikleri.', 'Mutfak hijyeninde ornek sunum.', ['Uzman diyetisyen veya beslenme koçu.', 'Alerjen duyurusu.'], ['Ornek tabak veya smoothie (butce).', 'Kaynak brosur.']),
    buildEvent('style-fashion', 'Style and Fashion', 'Stil ve profesyonel gorunum', 'Ofis dress code ve guven.', 'Ayna yoksa mobil telefon ile check.', ['Stilist sozlesmesi.', 'Cesitli vucut tiplerine saygi.'], ['Kapsul gardrop ornegi.']),
    buildEvent('industry-talks', 'Industry Expert Talks', 'Sektor uzmani konusmasi', 'Derinlemesine konu.', 'Panel icin 2 mikrofon ve moderasyon.', ['Uzman teknik test ve slayt.', 'Kayit izni ve kullanim hakki.'], ['Soru havuzu onceden.', 'Networking 15 dk.']),
  ],
};

export const wellness: PlaybookCategory = {
  id: 'wellness',
  titleTr: 'Saglik ve farkindalik (Wellness)',
  titleEn: 'Wellness and Mindfulness',
  description: 'Fiziksel alan yeterli mi kontrol; sigorta ve sakatlanma protokolu.',
  events: [
    buildEvent('workout', 'Workout Sessions', 'Antrenman seansi', 'HIIT / guc / dans.', 'Zemin mat; acil yardim kiti.', ['Egitmen sertifikasi ve katilim formu.', 'Isinma zorunlulugu.'], ['Su ve havalandirma.', 'Modifikasyon secenekleri.']),
    buildEvent('volleyball', 'Volleyball Games', 'Voleybol', 'Takim oyunu.', 'Dis mekan veya salon rezervasyonu.', ['Ag ve top kalitesi.', 'Takim olusturma.'], ['Hava iptali plani.', 'Ilk yardim.']),
    buildEvent('group-runs', 'Group Runs', 'Grup kosusu', 'Sehir kosusu.', 'Emniyet: yansitici, rota, karanlik saat.', ['Baslangic: Molada onu veya net adres.', 'Tempo gruplari (yavas/hizli).'], ['Telefon ve acil numara.', 'Soguma ve sonrası mesaj.']),
    buildEvent('bike-rides', 'Co-worker Bike Rides', 'Bisiklet turu', 'Kentsel tur.', 'Kask kurali ve yol guvenligi brifingi.', ['Rota risk degerlendirmesi.', 'Onarim kiti veya eskort.'], ['Hava ve sis plani.', 'Sigorta hatirlatmasi.']),
    buildEvent('nature-hike', 'Nature Walks or Hikes', 'Doga yuruyusu', 'Sehir disi veya orman.', 'Toplu tasima veya arac; risk ve sigorta uye bazinda.', ['Rehber veya deneyimli lider.', 'Uygunluk ve ayakkabi hatirlatmasi.'], ['Cop al-gotur.', 'Varis saati net.']),
    buildEvent('yoga', 'Yoga Sessions', 'Yoga', 'Esneklik ve nefes.', 'Mat/minder; havalandirma.', ['Kiralik mat ve seviye etiketi.', 'Hamile ve sakatlik alternatifleri.'], ['Muzik lisansi kontrolu.', 'Ortak alan gurultu saatine dikkat.']),
    buildEvent('meditation', 'Meditation Session', 'Meditasyon', 'Kisa farkindalik.', 'Telefon sessiz; sandalye veya minder.', ['Rehber kayit veya canli.', 'Giris-cikis sessizligi.'], ['Dis uyari.', 'Sure 15–30 dk.']),
    buildEvent('health-ws', 'Health and Wellness Workshops', 'Saglik atolyesi', 'Uyku, stres, beslenme.', 'Uzman; tibbi teshis yoktur uyarisi afise.', ['Konu tek odak; katilim limiti.', 'Katilim oncesi soru formu (hassas).'], ['Kaynak listesi.', 'Tibbi tavsiye degildir — operasyon notu.']),
    buildEvent('mindfulness-ws', 'Mindfulness Workshops', 'Farkindalik atolyesi', 'Gunluk pratik.', 'Dusuk ses.', ['Kisa alistirmalar ve kartlar.', 'Ev odevi hafif.'], ['Duygusal tetikleyicide güvenli cikis bilgisi.']),
    buildEvent('sound-healing', 'Sound Healing Workshops', 'Ses / frekans deneyimi', 'Kase veya enstruman.', 'Ses siddeti; epilepsi/psikiyatrik uyari afisi.', ['Egitmen deneyimi ve gönüllülük.', 'Oturma dairesi ve süre.'], ['Sonrasi sessizlik ve su.']),
  ],
};
