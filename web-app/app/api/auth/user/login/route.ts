import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { safeJsonError, signUserJwt, USER_COOKIE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const password = String(body?.password ?? '');

    if (!email || !password) return safeJsonError('E-posta ve şifre gerekli.', 400);

    const { data: user, error } = await supabase
      .from('User')
      .select('id, passwordHash, status, name, plan')
      .eq('email', email)
      .maybeSingle();

    if (error || !user) return safeJsonError('Hatalı giriş.', 401);

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return safeJsonError('Hatalı giriş.', 401);

    if (user.status !== 'APPROVED') {
      return safeJsonError('Üyeliğiniz onaylanmadı. Onay beklemedesiniz.', 403);
    }

    const token = signUserJwt(user.id);
    const cookieJar = cookies();
    cookieJar.set(USER_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    });

    return new Response(JSON.stringify({ ok: true, user: { id: user.id, name: user.name, plan: user.plan } }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Giriş başarısız.', 500);
  }
}

