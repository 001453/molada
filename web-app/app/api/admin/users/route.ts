import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const jar = cookies();
    const token = jar.get(ADMIN_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') return safeJsonError('Yetkisiz.', 403);

    const { data: users, error } = await supabase
      .from('User')
      .select('id, name, email, phone, plan, notes, createdAt')
      .eq('status', 'PENDING')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('admin users list:', error);
      return safeJsonError('Admin listesi alınamadı.', 500);
    }

    return new Response(JSON.stringify({ ok: true, users: users ?? [] }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Admin listesi alınamadı.', 500);
  }
}

