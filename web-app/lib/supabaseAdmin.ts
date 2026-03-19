import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

/**
 * Sunucu tarafı (API routes) — HTTPS, TCP pooler gerekmez.
 * SUPABASE_SERVICE_ROLE_KEY sadece ortam değişkeninde; asla client bundle'a girmemeli.
 */
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      'Eksik ortam: NEXT_PUBLIC_SUPABASE_URL (veya SUPABASE_URL) ve SUPABASE_SERVICE_ROLE_KEY gerekli.'
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function newDbId(): string {
  return randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}
