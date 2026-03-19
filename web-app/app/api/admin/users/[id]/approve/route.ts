import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { generateWifiPassword } from '@/lib/codes';
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

    const wifiSsid = process.env.WIFI_SSID || 'MoladaWiFi';
    const wifiPassword = generateWifiPassword();
    const now = new Date();

    await prisma.user.update({
      where: { id: userId },
      data: {
        status: 'APPROVED',
        approvedAt: now,
        rejectedAt: null,
        wifiSsid,
        wifiPassword,
        wifiStartAt: now,
        wifiEndAt: null,
      },
    });

    return new Response(JSON.stringify({ ok: true, wifiPassword, wifiSsid }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Onay başarısız.', 500);
  }
}

