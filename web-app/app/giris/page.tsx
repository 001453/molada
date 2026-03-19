'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/user/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Giriş başarısız.');
      } else {
        router.push('/uye-paneli');
      }
    } catch {
      setError('Giriş sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container page-content">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Üye Girişi</h1>
        <p style={{ marginBottom: '1.25rem' }}>
          Üyelik onayı olmadan giriş edemezsiniz. Onay bekleyen üyeler sadece başvuru bilgilerini görüntüler.
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
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
              <div>Şifre</div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>

            <button className="btn" disabled={loading} type="submit" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Giriş yapılıyor...' : 'Giriş'}
            </button>
          </div>
        </form>

        {error && <p style={{ marginTop: '1rem', color: '#ff6b6b' }}>{error}</p>}
      </section>
    </div>
  );
}

