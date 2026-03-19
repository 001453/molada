import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { safeJsonError } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const phone = String(body?.phone ?? '').trim();
    const password = String(body?.password ?? '');
    const plan = body?.plan ? String(body.plan) : null;
    const notes = body?.notes ? String(body.notes) : null;

    if (!name || !email || !phone || password.length < 6) {
      return safeJsonError('Eksik veya geçersiz bilgiler. Şifre en az 6 karakter olmalı.', 400);
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return safeJsonError('Bu e-posta ile daha önce başvuru yapılmış.', 409);

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
        status: 'PENDING',
        plan,
        notes,
      },
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    return safeJsonError('Başvuru alınamadı.', 500);
  }
}

