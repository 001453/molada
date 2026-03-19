import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { safeJsonError, USER_COOKIE, verifyJwt } from '@/lib/auth';

function parseDateTime(dateStr: string, timeStr: string) {
  // dateStr: YYYY-MM-DD, timeStr: HH:mm
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

export async function POST(request: Request) {
  try {
    const jar = cookies();
    const token = jar.get(USER_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'user') return safeJsonError('Yetkisiz.', 403);

    const user = await prisma.user.findUnique({ where: { id: decoded.sub }, select: { id: true, status: true } });
    if (!user) return safeJsonError('Kullanıcı yok.', 404);
    if (user.status !== 'APPROVED') return safeJsonError('Üyeliğiniz onaylanmadı.', 403);

    const body = await request.json();
    const resourceType = String(body?.resourceType ?? '') as 'MEETING_ROOM' | 'SILENT_CABIN';
    const cabinNumber = body?.cabinNumber !== undefined && body?.cabinNumber !== null ? Number(body.cabinNumber) : null;
    const date = String(body?.date ?? '');
    const startTime = String(body?.startTime ?? '');
    const endTime = String(body?.endTime ?? '');

    if (!resourceType || !date || !startTime || !endTime) return safeJsonError('Tüm alanları doldurun.', 400);
    if (resourceType === 'SILENT_CABIN' && (!cabinNumber || cabinNumber < 1 || cabinNumber > 5)) {
      return safeJsonError('Sessiz kabin için 1-5 arası kabin numarası seçin.', 400);
    }

    const startAt = parseDateTime(date, startTime);
    const endAt = parseDateTime(date, endTime);
    if (!(startAt instanceof Date) || !(endAt instanceof Date) || isNaN(startAt.getTime()) || isNaN(endAt.getTime())) {
      return safeJsonError('Tarih/saat hatalı.', 400);
    }
    if (endAt <= startAt) return safeJsonError('Bitiş saati başlangıçtan sonra olmalı.', 400);

    // Overlap check for pending/approved
    const overlap = await prisma.reservation.findFirst({
      where: {
        resourceType,
        cabinNumber: resourceType === 'SILENT_CABIN' ? cabinNumber : null,
        status: { in: ['PENDING', 'APPROVED'] },
        startAt: { lt: endAt },
        endAt: { gt: startAt },
      },
    });

    if (overlap) return safeJsonError('Bu saat aralığı için çakışma var.', 409);

    await prisma.reservation.create({
      data: {
        userId: user.id,
        resourceType,
        cabinNumber: resourceType === 'SILENT_CABIN' ? cabinNumber : null,
        startAt,
        endAt,
        status: 'PENDING',
      },
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Rezervasyon talebi alınamadı.', 500);
  }
}

