import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';
import { generateCheckInCode, generateWifiPassword } from '@/lib/codes';

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
    if (reservation.status !== 'PENDING') return safeJsonError('Rezervasyon durumu uygun değil.', 409);

    const now = new Date();
    const checkInCode = generateCheckInCode();
    const wifiSsid = process.env.WIFI_SSID || 'MoladaWiFi';
    const wifiPassword = generateWifiPassword();

    await prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: 'APPROVED',
        checkInCode,
        wifiSsid,
        wifiPassword,
        wifiStartAt: reservation.startAt,
        wifiEndAt: reservation.endAt,
        adminNote: reservation.adminNote ?? `Onay ${now.toISOString()}`,
      },
    });

    return new Response(JSON.stringify({ ok: true, checkInCode, wifiPassword }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Onay başarısız.', 500);
  }
}

