import { cookies } from 'next/headers';
import { getSupabaseAdmin, nowIso } from '@/lib/supabaseAdmin';
import { generateWifiPassword } from '@/lib/codes';
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

    const userId = context.params.id;
    const { data: user, error: fetchErr } = await supabase
      .from('User')
      .select('id, status')
      .eq('id', userId)
      .maybeSingle();

    if (fetchErr || !user) return safeJsonError('Kullanıcı bulunamadı.', 404);
    if (user.status !== 'PENDING') return safeJsonError('Bu kullanıcı onay sürecinde değil.', 409);

    const wifiSsid = process.env.WIFI_SSID || 'MoladaWiFi';
    const wifiPassword = generateWifiPassword();
    const now = nowIso();

    const { error: upErr } = await supabase
      .from('User')
      .update({
        status: 'APPROVED',
        approvedAt: now,
        rejectedAt: null,
        wifiSsid,
        wifiPassword,
        wifiStartAt: now,
        wifiEndAt: null,
        updatedAt: now,
      })
      .eq('id', userId);

    if (upErr) {
      console.error('admin approve user:', upErr);
      return safeJsonError('Onay başarısız.', 500);
    }

    return new Response(JSON.stringify({ ok: true, wifiPassword, wifiSsid }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Onay başarısız.', 500);
  }
}
