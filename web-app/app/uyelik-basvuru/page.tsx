'use client';

import { useState } from 'react';
import { MEMBERSHIP_PLAN_OPTIONS } from '@/lib/coworking';

export default function UYelikBasvuruPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState<string>(MEMBERSHIP_PLAN_OPTIONS[0]);
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const res = await fetch('/api/memberships/apply', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, phone, plan, password, notes }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Başvuru alınamadı.');
      } else {
        setStatus('Başvurunuz alındı. Admin onayından sonra giriş yapabilirsiniz.');
      }
    } catch {
      setError('Başvuru sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container page-content">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Üyelik Başvurusu</h1>
        <p style={{ marginBottom: '1.25rem' }}>
          Herkes başvuru yapabilir. Admin onayından önce giriş/erişim verilmeyecektir.
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <label>
              <div>Ad Soyad</div>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>E-posta</div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Telefon</div>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Plan</div>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              >
                {MEMBERSHIP_PLAN_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <div>Şifre (admin onayından sonra giriş için)</div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Not (opsiyonel)</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>

            <button className="btn" disabled={loading} type="submit" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
            </button>
          </div>
        </form>

        {status && <p style={{ marginTop: '1rem', color: 'var(--accent)' }}>{status}</p>}
        {error && <p style={{ marginTop: '1rem', color: '#ff6b6b' }}>{error}</p>}
      </section>
    </div>
  );
}

