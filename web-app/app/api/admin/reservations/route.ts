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

    const { data: reservations, error } = await supabase
      .from('Reservation')
      .select('*')
      .eq('status', 'PENDING')
      .order('startAt', { ascending: true });

    if (error) {
      console.error('admin reservations list:', error);
      return safeJsonError('Rezervasyon listesi alınamadı.', 500);
    }

    const list = reservations ?? [];
    const userIds = Array.from(new Set(list.map((r) => r.userId)));
    const userMap: Record<string, { id: string; name: string; email: string; phone: string; plan: string | null }> = {};

    if (userIds.length > 0) {
      const { data: users, error: uErr } = await supabase
        .from('User')
        .select('id, name, email, phone, plan')
        .in('id', userIds);

      if (!uErr && users) {
        for (const u of users) {
          userMap[u.id] = u;
        }
      }
    }

    const merged = list.map((r) => ({
      ...r,
      user: userMap[r.userId] ?? null,
    }));

    return new Response(JSON.stringify({ ok: true, reservations: merged }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Rezervasyon listesi alınamadı.', 500);
  }
}

