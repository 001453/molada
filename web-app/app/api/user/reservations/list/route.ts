import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const userId = decoded.sub;

    const { data: user, error: uErr } = await supabase
      .from('User')
      .select('status, wifiSsid, wifiPassword, wifiStartAt, wifiEndAt')
      .eq('id', userId)
      .maybeSingle();

    if (uErr || !user) return safeJsonError('Kullanıcı bulunamadı.', 404);

    const { data: reservations, error: rErr } = await supabase
      .from('Reservation')
      .select('*')
      .eq('userId', userId)
      .order('startAt', { ascending: false });

    if (rErr) {
      console.error('user reservations list:', rErr);
      return safeJsonError('Rezervasyonlar alınamadı.', 500);
    }

    const resList = reservations ?? [];
    const resIds = resList.map((r) => r.id);
    let checkInByResId: Record<string, { checkedInAt: string; checkedOutAt: string | null }> = {};
    if (resIds.length > 0) {
      const { data: checkIns } = await supabase.from('CheckIn').select('*').in('reservationId', resIds);
      if (checkIns) {
        for (const c of checkIns) {
          checkInByResId[c.reservationId] = c;
        }
      }
    }

    const now = new Date();
    const ws = user.wifiStartAt ? new Date(user.wifiStartAt as string) : null;
    const we = user.wifiEndAt ? new Date(user.wifiEndAt as string) : null;
    const membershipWifiAllowed =
      user.status === 'APPROVED' &&
      !!user.wifiPassword &&
      (!ws || now >= ws) &&
      (!we || now <= we);

    const membershipWifi = membershipWifiAllowed
      ? { wifiSsid: user.wifiSsid, wifiPassword: user.wifiPassword }
      : { wifiSsid: null, wifiPassword: null };

    const mapped = resList.map((r) => {
      const checkIn = checkInByResId[r.id];
      const hasCheckedIn = !!checkIn;
      const wStart = r.wifiStartAt ? new Date(r.wifiStartAt as string) : null;
      const wEnd = r.wifiEndAt ? new Date(r.wifiEndAt as string) : null;
      const wifiAllowed =
        r.status === 'APPROVED' &&
        hasCheckedIn &&
        wStart &&
        wEnd &&
        !isNaN(wStart.getTime()) &&
        !isNaN(wEnd.getTime()) &&
        now >= wStart &&
        now <= wEnd;

      return {
        id: r.id,
        resourceType: r.resourceType,
        cabinNumber: r.cabinNumber,
        startAt: r.startAt,
        endAt: r.endAt,
        status: r.status,
        checkInCode: r.status === 'APPROVED' ? r.checkInCode : null,
        wifiSsid: wifiAllowed ? r.wifiSsid : null,
        wifiPassword: wifiAllowed ? r.wifiPassword : null,
        wifiWindow: wifiAllowed ? { startAt: r.wifiStartAt, endAt: r.wifiEndAt } : null,
        checkedInAt: checkIn?.checkedInAt ?? null,
        checkedOutAt: checkIn?.checkedOutAt ?? null,
      };
    });

    return new Response(JSON.stringify({ ok: true, membershipWifi, reservations: mapped }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Rezervasyonlar alınamadı.', 500);
  }
}

