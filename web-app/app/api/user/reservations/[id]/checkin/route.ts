import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const userId = decoded.sub;
    const reservationId = context.params.id;
    const body = await request.json();
    const code = String(body?.code ?? '');

    if (!code) return safeJsonError('Giriş kodu gerekli.', 400);

    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
      include: { checkIn: true },
    });

    if (!reservation || reservation.userId !== userId) return safeJsonError('Rezervasyon bulunamadı.', 404);
    if (reservation.status !== 'APPROVED') return safeJsonError('Rezervasyon onaylı değil.', 403);
    if (!reservation.checkInCode || reservation.checkInCode !== code) return safeJsonError('Kod hatalı.', 403);
    if (reservation.checkIn) return safeJsonError('Zaten giriş yapılmış.', 409);

    await prisma.checkIn.create({
      data: {
        reservationId: reservation.id,
        codeValidatedAt: new Date(),
      },
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Giriş yapılamadı.', 500);
  }
}

