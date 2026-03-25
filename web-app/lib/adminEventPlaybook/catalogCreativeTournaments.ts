import { buildEvent } from './buildEvent';
import type { PlaybookCategory } from './types';

export const creativeCorner: PlaybookCategory = {
  id: 'creative-corner',
  titleTr: 'Yaratici kose (Creative Corner)',
  titleEn: 'Creative Corner',
  description: 'Mutfak ve sanat; yangin, gaz ve alkol ile ilgili ruhsat ve hijyen.',
  events: [
    buildEvent('cooking-class', 'Cooking Classes', 'Mutfak atolyesi', 'Seftan pratik yemek.', 'Ocak kapasitesi ve davlumbaz; yangin sondurucu.', ['Malzeme listesi ve paylasimli maliyet.', 'Kesici alet guvenligi.'], ['Pisirme istasyonlari rotasyonu.', 'Tadim hijyeni.']),
    buildEvent('cocktail-class', 'Cocktail Making Classes', 'Kokteyl sinifi', 'Mixology deneyimi.', 'Alkol ruhsati ve yas; alkolsuz secenek.', ['Ekipman ve buz tedariki.', 'Olcu ve sorumlu tuketim.'], ['Taksi bilgisi.', 'Cam kirigi proseduru.']),
    buildEvent('art-class', 'Art Classes', 'Resim / heykel giris', 'Gorsel sanat.', 'Soli ve malzeme lekesi: ortu.', ['Kursiyer basina palet ve firca.', 'Kuruma alani.'], ['Fotograf eser izni.'], []),
    buildEvent('music-instrument', 'Musical Instrument Classes', 'Enstruman dersi', 'Grup veya bireysel.', 'Ses yalitimi ve saat.', ['Enstruman kiralik listesi.', 'Baslangic seviyesi grubu.'], ['Komşu saati disinda prova.'], []),
    buildEvent('dance-ws', 'Dance Workshops', 'Dans atolyesi', 'Salsa, hip hop vb.', 'Zemin ve ayakkabi; spor hasari riski.', ['Uzman ve isinma zorunlu.', 'Suya ihtiyac.'], ['Video paylasim izni.'], []),
    buildEvent('acting-ws', 'Acting Workshops', 'Oyunculuk', 'Sahne guveni.', 'Oyun alani ve gurultu.', ['Isinma oyunlari.', 'Duygusal guvenlik kurallari.'], ['Kamera opsiyonel.'], []),
    buildEvent('coffee-brew', 'Coffee Brewing Workshops', 'Kahve demleme', 'V60, espresso giris.', 'Elektrik ve su; atik zemin.', ['Cekirdek tedariki ve ogutme.', 'Barista veya ici uzman.'], ['Tadim bardagi hijyeni.'], []),
    buildEvent('chocolate-ws', 'Chocolate Making Workshops', 'Cikolata atolyesi', 'Tatli deneyim.', 'Sicaklik ve buzdolabi.', ['Alerjen (sut, findik) buyuk uyari.', 'Eldiven ve bone.'], ['Paketleme.'], []),
    buildEvent('cheese-tasting', 'Cheese Tasting', 'Peynir tadimi', 'Lokaller ve sarap bilgisi (sarapsiz da olur).', 'Soguk zincir.', ['Tedarikci ve aciklama kartlari.', 'Vejetaryen alternatif.'], ['Cop ayristirma ve soguk zincir kapanisi.']),
    buildEvent('floral-ws', 'Floral Arrangement Workshops', 'Cicek tanzim', 'Tasarim temelleri.', 'Su lekesi ve cop.', ['Cicek tedariki ve budama makasi.', 'Herkes giderken buket gotursin.'], ['Fotograf kosesi.'], []),
    buildEvent('ps-ws-dup', 'Public Speaking (Creative)', 'Konusma atolyesi (yaratici)', 'Yaratici anlatim.', 'Sahne ve zaman.', ['Oyunlasdirilmis alistirmalar.', 'Guvenli geri bildirim.'], ['Kucuk gosteri finali.'], []),
  ],
};

export const tournaments: PlaybookCategory = {
  id: 'tournaments',
  titleTr: 'Turnuvalar ve yarislar',
  titleEn: 'Tournaments and Contests',
  description: 'Fikri orgutluk ve kurallar yazili; hakem ve skor tablosu.',
  events: [
    buildEvent('ping-pong', 'Ping Pong Tournament', 'Masa tenisi turnuvasi', 'Eslestirme ve elemeler.', 'Masa ve ag; top stogu;', ['Turnuva usulu (tek/çift).', 'Odul ve fair play.'], ['Mac zamanlayicisi.', 'Istasyon dinlenmesi.']),
    buildEvent('darts', 'Darts Tournament', 'Dart turnuvasi', 'Hedef ve skor.', 'Guvenlik: civiye dikkat, cocuk alani.', ['Cift eleme veya lig.', 'Skor karti.'], ['Bitis kutlamasi olculu.']),
    buildEvent('chess', 'Chess Tournament', 'Satranç', 'Klasik turnuva.', 'Sessiz alan ve saat.', ['FIDE veya klasik saat ayari.', 'Beraberlik kurali.'], ['Notasyon opsiyonel.']),
    buildEvent('baking', 'Baking Competition', 'Hamur yarisı', 'Juri ve puan.', 'Firın kapasitesi veya evde getir.', ['Juri kriterleri seffafligi.', 'Alerjen etiketi zorunlu.'], ['Dondurucu veya paylasim masasi.']),
    buildEvent('talent-show', 'Talent Show', 'Yetenek gosterisi', 'Oylama veya juri.', 'Sahne ve isik.', ['Sure limiti katilimci basina.', 'Cocuk katiliminda veli izni.'], ['Teknik prova listesi.']),
    buildEvent('jenga', 'Jenga Tournament', 'Kule oyunu turnuvasi', 'Eliminasyon.', 'Dusuk masa ve video yoksa hakem.', ['Tur basina süre.', 'Dusus sayimi.'], []),
    buildEvent('blind-wine', 'Blind Wine-Tasting', 'Kor tadim sarap', 'Egitim tadim.', 'Ruhsat ve yas;', ['Sarap tedariki ve numaralandirma.', 'Tukurme kaplari.'], ['Surucu uyarisi.', 'Not kagidi.']),
    buildEvent('public-speaking-comp', 'Public Speaking Competition', 'Konusma yarisı', 'Juri kriterleri.', 'Zaman ve zil;', ['Konu kutuphanesi veya serbest.', 'Zaman asimi diskalifiye.'], ['Seyirci oylamasi opsiyonel.']),
    buildEvent('millionaire-quiz', 'Who Wants to Be a Millionaire? quiz', 'Milyoner tarzi bilgi yarisi', 'Formatli soru seti.', 'Telif: kendi soru havuzu;', ['Joker haklari ve kurallar afiste.', 'Odul mutabakati.'], ['Teknik sorun yedek sorusu.']),
    buildEvent('standup-contest', 'Stand-Up Comedy Contest', 'Stand-up yarisı', 'Yerel komedi.', 'Icerik kurallari (nefret sozu yok).', ['Sure ve orta isik.', 'Moderator.'], ['Seyirci geri bildirimi.']),
    buildEvent('hackathon', 'Hackathon or Code Fest', 'Kod maratoni', 'Takim ve proje.', 'Internet ve elektrik yedek;', ['Konu ve jury kriterleri.', 'GitHub veya teslim formati.'], ['Uyku kosesi ve kahve.', 'IP ve sahiplik sozlesmesi ozet.']),
  ],
};
