/**
 * Paylaşımlı ofis operasyon ayarları — tek kaynak (Spacebring benzeri akış: üyelik, kaynak rezervasyonu).
 * Kapasite ve oda listesi değişince sadece burayı güncelleyin.
 */

export const MEETING_ROOMS = [
  { id: 1, capacity: 4, labelTr: 'Toplantı odası A — 4 kişilik' },
  { id: 2, capacity: 6, labelTr: 'Toplantı odası B — 6 kişilik' },
  { id: 3, capacity: 12, labelTr: 'Toplantı odası C — 12 kişilik' },
] as const;

export type MeetingRoomId = (typeof MEETING_ROOMS)[number]['id'];

/** Açık alan sıcak/sabit masa kapasitesi (bilgilendirme + ileride doluluk için) */
export const OPEN_WORKSPACE_CAPACITY = 45;

/** Sessiz kabin adedi (rezervasyon çakışması ile uyumlu) */
export const SILENT_CABIN_COUNT = 5;

export const reservationStatusTr: Record<string, string> = {
  PENDING: 'Onay bekliyor',
  APPROVED: 'Onaylandı',
  REJECTED: 'Reddedildi',
  CANCELED: 'İptal edildi',
};

export function meetingRoomById(id: number | null | undefined) {
  if (id == null) return undefined;
  return MEETING_ROOMS.find((r) => r.id === id);
}

/** Üye / admin listelerinde gösterim */
export function formatReservationResource(
  resourceType: string,
  cabinNumber: number | null | undefined,
  meetingRoomId: number | null | undefined
): string {
  if (resourceType === 'SILENT_CABIN' && cabinNumber != null) {
    return `Sessiz kabin #${cabinNumber}`;
  }
  if (resourceType === 'MEETING_ROOM') {
    const room = meetingRoomById(meetingRoomId ?? undefined);
    return room?.labelTr ?? 'Toplantı odası';
  }
  return 'Alan';
}

/** Üyelik planları (başvuru formu ile hizalı) */
export const MEMBERSHIP_PLAN_OPTIONS = [
  'Sıcak masa (günlük / esnek)',
  'Sabit masa (aylık)',
  'Sanal ofis',
] as const;
