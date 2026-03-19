'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || 'Admin giriş başarısız.');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Admin giriş sırasında hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container page-content">
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Admin Girişi</h1>
        <p style={{ marginBottom: '1.25rem' }}>Admin paneli ayrı giriş ister.</p>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <label>
              <div>Kullanıcı adı</div>
              <input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

