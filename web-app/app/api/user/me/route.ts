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

    const { data: user, error } = await supabase
      .from('User')
      .select('id, name, email, phone, status, plan, approvedAt')
      .eq('id', decoded.sub)
      .maybeSingle();

    if (error || !user) return safeJsonError('Kullanıcı bulunamadı.', 404);

    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Yetkilendirme başarısız.', 401);
  }
}

