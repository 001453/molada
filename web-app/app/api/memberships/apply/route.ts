import bcrypt from 'bcryptjs';
import { getSupabaseAdmin, newDbId, nowIso } from '@/lib/supabaseAdmin';
import { safeJsonError } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim().toLowerCase();
    const phone = String(body?.phone ?? '').trim();
    const password = String(body?.password ?? '');
    const plan = body?.plan ? String(body.plan).slice(0, 120) : null;
    const notes = body?.notes ? String(body.notes).slice(0, 2000) : null;

    if (name.length > 120 || email.length > 254 || phone.length > 40) {
      return safeJsonError('Girilen bilgiler çok uzun.', 400);
    }

    if (!name || !email || !phone || password.length < 6) {
      return safeJsonError('Eksik veya geçersiz bilgiler. Şifre en az 6 karakter olmalı.', 400);
    }

    const { data: existing } = await supabase.from('User').select('id').eq('email', email).maybeSingle();
    if (existing) return safeJsonError('Bu e-posta ile daha önce başvuru yapılmış.', 409);

    const passwordHash = await bcrypt.hash(password, 10);
    const t = nowIso();

    const { error } = await supabase.from('User').insert({
      id: newDbId(),
      createdAt: t,
      updatedAt: t,
      name,
      email,
      phone,
      passwordHash,
      status: 'PENDING',
      plan,
      notes,
    });

    if (error) {
      if (error.code === '23505') {
        return safeJsonError('Bu e-posta ile daha önce başvuru yapılmış.', 409);
      }
      console.error('memberships/apply supabase:', error);
      return safeJsonError('Başvuru alınamadı.', 500);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  } catch (e) {
    // Ayrıntı istemciye verilmez (bilgi sızıntısı / fingerprinting önlemi).
    console.error('memberships/apply error:', e);
    return safeJsonError('Başvuru alınamadı.', 500);
  }
}
