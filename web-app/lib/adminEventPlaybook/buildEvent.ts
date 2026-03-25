import type { PlaybookEvent } from './types';

/**
 * Ortak operasyon iskeleti + etkinliğe özel hazırlık ve gün içi maddeler.
 * Kaynak başlıklar sektör rehberlerinden uyarlanmış iç hatırlatıcıdır; üye duyurusu = /topluluk ve iletişim kanalları.
 */
export function buildEvent(
  id: string,
  titleEn: string,
  titleTr: string,
  amac: string,
  molada: string,
  hazirlik: string[],
  gunIcinde: string[],
  kapanisEk?: string[],
): PlaybookEvent {
  return {
    id,
    titleEn,
    titleTr,
    amac,
    molada,
    adimlar: [
      'Sorumlu etkinlik lideri ve yedek atayın; kaba bütçe (ikram, malzeme, olası ücretli eğitmen) yazılsın.',
      'İç onay: tarih, saat bandı, ücretli/ücretsiz, maksimum kişi sayısı ve iptal politikası netleşsin.',
      ...hazirlik,
      'Duyuru: 7–14 gün önce üye e-postası, grup mesajı ve ortak alan afişi; gerekirse kayıt linki veya liste.',
      'Mekân provası: sandalye düzeni, priz/Internet hızı, projeksiyon veya ses seviyesi testi; komşu gürültü saatine dikkat.',
      ...gunIcinde,
      'Açılış: hoş geldiniz, kurallar (WC, sigara, foto/film), acil çıkış; alkol varsa yaş ve mevzuat hatırlatması.',
      'Kapanış: alan ve mutfak temliği, çöp ayrıştırma, kayıp-eşya kontrolü.',
      ...(kapanisEk ?? [
        '48 saat içinde kısa geri bildirim (anket/emoji); başarılı ise bir sonraki tarih için bekleme listesi.',
      ]),
    ],
  };
}
