import { cookies } from 'next/headers';
import { MEETING_ROOMS, SILENT_CABIN_COUNT } from '@/lib/coworking';
import { getSupabaseAdmin, newDbId, nowIso } from '@/lib/supabaseAdmin';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

function parseDateTime(dateStr: string, timeStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const { data: user, error: userErr } = await supabase
      .from('User')
      .select('id, status')
      .eq('id', decoded.sub)
      .maybeSingle();

    if (userErr || !user) return safeJsonError('Kullanıcı yok.', 404);
    if (user.status !== 'APPROVED') return safeJsonError('Üyeliğiniz onaylanmadı.', 403);

    const body = await request.json();
    const resourceType = String(body?.resourceType ?? '') as 'MEETING_ROOM' | 'SILENT_CABIN';
    const meetingRoomId =
      body?.meetingRoomId !== undefined && body?.meetingRoomId !== null ? Number(body.meetingRoomId) : null;
    const cabinNumber = body?.cabinNumber !== undefined && body?.cabinNumber !== null ? Number(body.cabinNumber) : null;
    const date = String(body?.date ?? '');
    const startTime = String(body?.startTime ?? '');
    const endTime = String(body?.endTime ?? '');

    if (!resourceType || !date || !startTime || !endTime) return safeJsonError('Tüm alanları doldurun.', 400);

    if (resourceType === 'MEETING_ROOM') {
      const validRoom = MEETING_ROOMS.some((r) => r.id === meetingRoomId);
      if (!meetingRoomId || !validRoom) {
        return safeJsonError('Geçerli bir toplantı odası seçin.', 400);
      }
    }

    if (resourceType === 'SILENT_CABIN' && (!cabinNumber || cabinNumber < 1 || cabinNumber > SILENT_CABIN_COUNT)) {
      return safeJsonError(`Sessiz kabin için 1-${SILENT_CABIN_COUNT} arası numara seçin.`, 400);
    }

    const startAt = parseDateTime(date, startTime);
    const endAt = parseDateTime(date, endTime);
    if (!(startAt instanceof Date) || !(endAt instanceof Date) || isNaN(startAt.getTime()) || isNaN(endAt.getTime())) {
      return safeJsonError('Tarih/saat hatalı.', 400);
    }
    if (endAt <= startAt) return safeJsonError('Bitiş saati başlangıçtan sonra olmalı.', 400);

    const startIso = startAt.toISOString();
    const endIso = endAt.toISOString();

    let overlapQuery = supabase
      .from('Reservation')
      .select('id')
      .in('status', ['PENDING', 'APPROVED'])
      .lt('startAt', endIso)
      .gt('endAt', startIso)
      .eq('resourceType', resourceType);

    if (resourceType === 'SILENT_CABIN') {
      overlapQuery = overlapQuery.eq('cabinNumber', cabinNumber as number).is('meetingRoomId', null);
    } else {
      overlapQuery = overlapQuery.eq('meetingRoomId', meetingRoomId as number).is('cabinNumber', null);
    }

    const { data: overlapRows, error: overlapErr } = await overlapQuery.limit(1);

    if (overlapErr) {
      console.error('reservations/apply overlap:', overlapErr);
      return safeJsonError('Rezervasyon talebi alınamadı.', 500);
    }
    if (overlapRows && overlapRows.length > 0) {
      return safeJsonError('Bu saat aralığı için çakışma var.', 409);
    }

    const t = nowIso();
    const { error: insErr } = await supabase.from('Reservation').insert({
      id: newDbId(),
      createdAt: t,
      updatedAt: t,
      userId: user.id,
      resourceType,
      meetingRoomId: resourceType === 'MEETING_ROOM' ? meetingRoomId : null,
      cabinNumber: resourceType === 'SILENT_CABIN' ? cabinNumber : null,
      startAt: startIso,
      endAt: endIso,
      status: 'PENDING',
    });

    if (insErr) {
      console.error('reservations/apply insert:', insErr);
      return safeJsonError('Rezervasyon talebi alınamadı.', 500);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Rezervasyon talebi alınamadı.', 500);
  }
}
