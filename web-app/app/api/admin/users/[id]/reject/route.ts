import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';

export async function POST(
  _request: Request,
  context: { params: { id: string } }
) {
  try {
    const jar = cookies();
    const token = jar.get(ADMIN_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') return safeJsonError('Yetkisiz.', 403);

    const userId = context.params.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return safeJsonError('Kullanıcı bulunamadı.', 404);

    if (user.status !== 'PENDING') return safeJsonError('Bu kullanıcı onay sürecinde değil.', 409);

    await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        wifiPassword: null,
        wifiSsid: null,
        wifiStartAt: null,
        wifiEndAt: null,
      },
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Reddetme başarısız.', 500);
  }
}

