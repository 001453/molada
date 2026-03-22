'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MEMBERSHIP_PLAN_OPTIONS } from '@/lib/coworking';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Üyelik başvuru (kullanıcılar için ayrı link yerine aynı sayfada kısa form)
  const [appName, setAppName] = useState('');
  const [appEmail, setAppEmail] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appPlan, setAppPlan] = useState<string>(MEMBERSHIP_PLAN_OPTIONS[0]);
  const [appPassword, setAppPassword] = useState('');
  const [appNotes, setAppNotes] = useState('');

  const [appError, setAppError] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(false);

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

  async function onApply(e: React.FormEvent) {
    e.preventDefault();
    setAppError(null);
    setAppStatus(null);
    setAppLoading(true);
    try {
      const res = await fetch('/api/memberships/apply', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: appName,
          email: appEmail,
          phone: appPhone,
          plan: appPlan,
          password: appPassword,
          notes: appNotes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAppError(data?.error || 'Başvuru alınamadı.');
      } else {
        setAppStatus('Başvurunuz alındı. Admin onayından sonra giriş yapabilirsiniz.');
      }
    } catch {
      setAppError('Başvuru sırasında hata oluştu.');
    } finally {
      setAppLoading(false);
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

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Üyelik Başvurusu</h2>
        <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          Herkes başvuru yapabilir. Admin onayından sonra giriş/rezervasyon açılır.
        </p>

        <form onSubmit={onApply}>
          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <label>
              <div>Ad Soyad</div>
              <input
                required
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>E-posta</div>
              <input
                required
                type="email"
                value={appEmail}
                onChange={(e) => setAppEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Telefon</div>
              <input
                required
                value={appPhone}
                onChange={(e) => setAppPhone(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Plan</div>
              <select
                value={appPlan}
                onChange={(e) => setAppPlan(e.target.value)}
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
              <div>Şifre (onaydan sonra giriş için)</div>
              <input
                required
                type="password"
                value={appPassword}
                onChange={(e) => setAppPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>
            <label>
              <div>Not (opsiyonel)</div>
              <textarea
                value={appNotes}
                onChange={(e) => setAppNotes(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>

            <button className="btn" disabled={appLoading} type="submit" style={{ opacity: appLoading ? 0.7 : 1 }}>
              {appLoading ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
            </button>
          </div>
        </form>

        {appStatus && <p style={{ marginTop: '1rem', color: 'var(--accent)' }}>{appStatus}</p>}
        {appError && <p style={{ marginTop: '1rem', color: '#ff6b6b' }}>{appError}</p>}
      </section>
    </div>
  );
}

