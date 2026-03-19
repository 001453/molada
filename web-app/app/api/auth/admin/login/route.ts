import { cookies } from 'next/headers';
import { safeJsonError, signAdminJwt, ADMIN_COOKIE } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body?.username ?? '').trim();
    const password = String(body?.password ?? '');

    const adminUser = process.env.ADMIN_USERNAME ?? '';
    const adminPass = process.env.ADMIN_PASSWORD ?? '';

    if (!adminUser || !adminPass) {
      return safeJsonError('Admin yetkisi ayarlanmadı.', 500);
    }

    if (username !== adminUser || password !== adminPass) {
      return safeJsonError('Admin giriş başarısız.', 401);
    }

    const token = signAdminJwt(username);
    const cookieJar = cookies();
    cookieJar.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 14,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Admin giriş başarısız.', 500);
  }
}

