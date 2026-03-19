import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { ADMIN_COOKIE, safeJsonError, verifyJwt } from '@/lib/auth';

export async function GET() {
  try {
    const jar = cookies();
    const token = jar.get(ADMIN_COOKIE)?.value;
    if (!token) return safeJsonError('Yetkisiz.', 401);

    const decoded = verifyJwt(token);
    if (decoded.role !== 'admin') return safeJsonError('Yetkisiz.', 403);

    const users = await prisma.user.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        plan: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify({ ok: true, users }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Admin listesi alınamadı.', 500);
  }
}

