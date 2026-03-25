export type PlaybookCategory = {
  id: string;
  titleTr: string;
  titleEn: string;
  description: string;
  events: PlaybookEvent[];
};

export type PlaybookEvent = {
  id: string;
  titleTr: string;
  titleEn: string;
  /** Etkinliğin özü — ne işe yarar */
  amac: string;
  /** Molada mekân / ölçek / komşuluk */
  molada: string;
  /** Adım adım (numaralı liste olarak gösterilir) */
  adimlar: string[];
};
