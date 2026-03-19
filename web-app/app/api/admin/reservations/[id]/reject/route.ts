import { cookies } from 'next/headers';
import { getSupabaseAdmin, nowIso } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';

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
      .select('id, status')
      .eq('id', reservationId)
      .maybeSingle();

    if (fErr || !reservation) return safeJsonError('Rezervasyon bulunamadı.', 404);
    if (reservation.status !== 'PENDING') return safeJsonError('Bu rezervasyon onay için uygun değil.', 409);

    const t = nowIso();
    const { error: uErr } = await supabase
      .from('Reservation')
      .update({
        status: 'REJECTED',
        adminNote: 'Reddedildi',
        checkInCode: null,
        wifiPassword: null,
        wifiSsid: null,
        wifiStartAt: null,
        wifiEndAt: null,
        updatedAt: t,
      })
      .eq('id', reservationId);

    if (uErr) {
      console.error('admin reject reservation:', uErr);
      return safeJsonError('Reddetme başarısız.', 500);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Reddetme başarısız.', 500);
  }
}
