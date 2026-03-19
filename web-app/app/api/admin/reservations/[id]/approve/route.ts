import { cookies } from 'next/headers';
import { getSupabaseAdmin, nowIso } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';
import { generateCheckInCode, generateWifiPassword } from '@/lib/codes';

export async function POST(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();
    const jar = cookies();
    const token = jar.get(ADMIN_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') return safeJsonError('Yetkisiz.', 403);

    const reservationId = context.params.id;
    const { data: reservation, error: fErr } = await supabase
      .from('Reservation')
      .select('*')
      .eq('id', reservationId)
      .maybeSingle();

    if (fErr || !reservation) return safeJsonError('Rezervasyon bulunamadı.', 404);
    if (reservation.status !== 'PENDING') return safeJsonError('Rezervasyon durumu uygun değil.', 409);

    const now = new Date();
    const checkInCode = generateCheckInCode();
    const wifiSsid = process.env.WIFI_SSID || 'MoladaWiFi';
    const wifiPassword = generateWifiPassword();
    const t = nowIso();
    const adminNote = reservation.adminNote ?? 'Onay ' + now.toISOString();

    const { error: uErr } = await supabase
      .from('Reservation')
      .update({
        status: 'APPROVED',
        checkInCode,
        wifiSsid,
        wifiPassword,
        wifiStartAt: reservation.startAt,
        wifiEndAt: reservation.endAt,
        adminNote,
        updatedAt: t,
      })
      .eq('id', reservationId);

    if (uErr) {
      console.error('admin approve reservation:', uErr);
      return safeJsonError('Onay başarısız.', 500);
    }

    return new Response(JSON.stringify({ ok: true, checkInCode, wifiPassword }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Onay başarısız.', 500);
  }
}

