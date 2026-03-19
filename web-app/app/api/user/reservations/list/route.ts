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

    const userId = decoded.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { status: true, wifiSsid: true, wifiPassword: true, wifiStartAt: true, wifiEndAt: true },
    });

    if (!user) return safeJsonError('Kullanıcı bulunamadı.', 404);

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      orderBy: { startAt: 'desc' },
      include: { checkIn: true },
    });

    const now = new Date();
    const membershipWifiAllowed =
      user.status === 'APPROVED' &&
      !!user.wifiPassword &&
      (!user.wifiStartAt || now >= user.wifiStartAt) &&
      (!user.wifiEndAt || now <= user.wifiEndAt);

    const membershipWifi = membershipWifiAllowed
      ? { wifiSsid: user.wifiSsid, wifiPassword: user.wifiPassword }
      : { wifiSsid: null, wifiPassword: null };

    const mapped = reservations.map((r) => {
      const hasCheckedIn = !!r.checkIn;
      const wifiAllowed =
        r.status === 'APPROVED' &&
        hasCheckedIn &&
        r.wifiStartAt &&
        r.wifiEndAt &&
        now >= r.wifiStartAt &&
        now <= r.wifiEndAt;

      return {
        id: r.id,
        resourceType: r.resourceType,
        cabinNumber: r.cabinNumber,
        startAt: r.startAt,
        endAt: r.endAt,
        status: r.status,
        checkInCode: r.status === 'APPROVED' ? r.checkInCode : null,
        wifiSsid: wifiAllowed ? r.wifiSsid : null,
        wifiPassword: wifiAllowed ? r.wifiPassword : null,
        wifiWindow: wifiAllowed ? { startAt: r.wifiStartAt, endAt: r.wifiEndAt } : null,
        checkedInAt: r.checkIn?.checkedInAt ?? null,
        checkedOutAt: r.checkIn?.checkedOutAt ?? null,
      };
    });

    return new Response(JSON.stringify({ ok: true, membershipWifi, reservations: mapped }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Rezervasyonlar alınamadı.', 500);
  }
}

