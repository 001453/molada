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

    const reservationId = context.params.id;
    const reservation = await prisma.reservation.findUnique({ where: { id: reservationId } });
    if (!reservation) return safeJsonError('Rezervasyon bulunamadı.', 404);
    if (reservation.status !== 'PENDING') return safeJsonError('Bu rezervasyon onay için uygun değil.', 409);

    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: 'REJECTED',
        adminNote: 'Reddedildi',
        checkInCode: null,
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

