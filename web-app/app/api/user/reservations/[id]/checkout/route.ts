import { cookies } from 'next/headers';
import { getSupabaseAdmin, nowIso } from '@/lib/supabaseAdmin';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const userId = decoded.sub;
    const reservationId = context.params.id;

    const body = await request.json();
    const code = String(body?.code ?? '');
    if (!code) return safeJsonError('Kod gerekli.', 400);

    const { data: reservation, error: rErr } = await supabase
      .from('Reservation')
      .select('*')
      .eq('id', reservationId)
      .maybeSingle();

    if (rErr || !reservation || reservation.userId !== userId) {
      return safeJsonError('Rezervasyon bulunamadı.', 404);
    }
    if (reservation.status !== 'APPROVED') return safeJsonError('Rezervasyon onaylı değil.', 403);
    if (!reservation.checkInCode || reservation.checkInCode !== code) {
      return safeJsonError('Kod hatalı.', 403);
    }

    const { data: checkIn, error: cErr } = await supabase
      .from('CheckIn')
      .select('*')
      .eq('reservationId', reservationId)
      .maybeSingle();

    if (cErr || !checkIn) return safeJsonError('Önce giriş yapın.', 409);
    if (checkIn.checkedOutAt) return safeJsonError('Zaten çıkış yapılmış.', 409);

    const { error: upErr } = await supabase
      .from('CheckIn')
      .update({ checkedOutAt: nowIso() })
      .eq('reservationId', reservation.id);

    if (upErr) {
      console.error('checkout update:', upErr);
      return safeJsonError('Çıkış yapılamadı.', 500);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Çıkış yapılamadı.', 500);
  }
}
