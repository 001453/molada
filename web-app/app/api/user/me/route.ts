import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

export async function GET() {
  try {
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
      select: { id: true, name: true, email: true, phone: true, status: true, plan: true, approvedAt: true },
    });

    if (!user) return safeJsonError('Kullanıcı bulunamadı.', 404);

    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Yetkilendirme başarısız.', 401);
  }
}

