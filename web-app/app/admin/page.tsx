'use client';

import { useEffect, useState } from 'react';
import { AdminLegalPrintPack } from '@/app/components/admin/AdminLegalPrintPack';
import { AdminEventPlaybook } from '@/app/components/admin/AdminEventPlaybook';
import { AdminInternalOps } from '@/app/components/admin/AdminInternalOps';
import { AdminReviewQueue } from '@/app/components/admin/AdminReviewQueue';
import { formatReservationResource } from '@/lib/coworking';

type PendingUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string | null;
  notes: string | null;
  createdAt: string;
};

type PendingReservation = {
  id: string;
  resourceType: 'MEETING_ROOM' | 'SILENT_CABIN';
  meetingRoomId: number | null;
  cabinNumber: number | null;
  startAt: string;
  endAt: string;
  status: string;
  user: { id: string; name: string; email: string; phone: string; plan: string | null };
};

export default function AdminPage() {
  const [tab, setTab] = useState<'users' | 'reservations' | 'legal' | 'review' | 'playbook' | 'ops'>('users');
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [reservations, setReservations] = useState<PendingReservation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState<string | null>(null);

  async function loadUsers() {
    const res = await fetch('/api/admin/users');
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Kullanıcılar alınamadı.');
    setUsers(data?.users ?? []);
  }

  async function loadReservations() {
    const res = await fetch('/api/admin/reservations');
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Rezervasyonlar alınamadı.');
    setReservations(data?.reservations ?? []);
  }

  async function refreshAll() {
    setInfo(null);
    await Promise.all([loadUsers(), loadReservations()]);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await refreshAll();
      } catch (e: any) {
        setError(e?.message || 'Admin panel yükleme başarısız.');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function approveUser(id: string) {
    setInfo(null);
    const res = await fetch(`/api/admin/users/${id}/approve`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Onay başarısız.');
      return;
    }
    setInfo(`Kullanıcı WiFi şifresi oluşturuldu: ${data?.wifiPassword ?? ''}`);
    await refreshAll();
  }

  async function rejectUser(id: string) {
    const res = await fetch(`/api/admin/users/${id}/reject`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Reddetme başarısız.');
      return;
    }
    await refreshAll();
  }

  async function approveReservation(id: string) {
    setInfo(null);
    const res = await fetch(`/api/admin/reservations/${id}/approve`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Onay başarısız.');
      return;
    }
    setInfo(`Rezervasyon onaylandı. Giriş kodu: ${data?.checkInCode ?? ''}`);
    await refreshAll();
  }

  async function rejectReservation(id: string) {
    const res = await fetch(`/api/admin/reservations/${id}/reject`, { method: 'POST' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Reddetme başarısız.');
      return;
    }
    await refreshAll();
  }

  function fmt(d: string) {
    const dt = new Date(d);
    return dt.toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="container page-content">
      <h1 className="no-print" style={{ marginTop: 0 }}>Admin Paneli</h1>

      {error && (
        <section className="card no-print">
          <p style={{ margin: 0, color: '#ff6b6b' }}>{error}</p>
          <p style={{ marginBottom: 0 }}>
            Admin login: <a href="/admin/login">/admin/login</a>
          </p>
        </section>
      )}

      {loading ? (
        <section className="card">Yükleniyor...</section>
      ) : (
        <section className="card">
          <div className="no-print" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('users')}
              style={{ opacity: tab === 'users' ? 1 : 0.7 }}
            >
              Üyelik Onayı
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('reservations')}
              style={{ opacity: tab === 'reservations' ? 1 : 0.7 }}
            >
              Rezervasyon Onayı
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('legal')}
              style={{ opacity: tab === 'legal' ? 1 : 0.7 }}
            >
              Hukuk — kağıt özeti
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('review')}
              style={{ opacity: tab === 'review' ? 1 : 0.7 }}
            >
              İnceleme / event notları
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('playbook')}
              style={{ opacity: tab === 'playbook' ? 1 : 0.7 }}
            >
              Etkinlik playbook
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setTab('ops')}
              style={{ opacity: tab === 'ops' ? 1 : 0.7 }}
            >
              Operasyon özeti
            </button>
          </div>

          {info && (
            <p className="no-print" style={{ color: 'var(--accent)', marginTop: 0 }}>
              {info}
            </p>
          )}

          {tab === 'legal' && (
            <div className="no-print" style={{ marginBottom: '1rem' }}>
              <button className="btn" type="button" onClick={() => window.print()}>
                Bu özeti yazdır (PDF / kağıt)
              </button>
              <p style={{ margin: '0.65rem 0 0', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Yazdırmada üst menü ve altbilgi gizlenir. Üyeye imzalatacağınız asıl belgeler avukatınızın şablonlarıdır.
              </p>
            </div>
          )}

          {tab === 'legal' && <AdminLegalPrintPack />}

          {tab === 'review' && <AdminReviewQueue />}

          {tab === 'playbook' && (
            <div className="no-print" style={{ marginBottom: '1rem' }}>
              <button className="btn" type="button" onClick={() => window.print()}>
                Playbook yazdır
              </button>
              <p style={{ margin: '0.65rem 0 0', fontSize: '0.88rem', color: 'var(--muted)' }}>
                Kategorileri acip yazdirin; tarayici baskida ust/alt bilgi gizlenir.
              </p>
            </div>
          )}

          {tab === 'playbook' && <AdminEventPlaybook />}

          {tab === 'ops' && (
            <div className="no-print" style={{ marginBottom: '1rem' }}>
              <button className="btn" type="button" onClick={() => window.print()}>
                Operasyon özetini yazdır
              </button>
            </div>
          )}

          {tab === 'ops' && <AdminInternalOps />}

          {tab === 'users' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Kullanıcı</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Plan</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Not</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Tarih</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '0.75rem', color: 'var(--muted)' }}>
                        Bekleyen üyelik yok.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontWeight: 700 }}>{u.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{u.email}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{u.phone}</div>
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          {u.plan ?? '-'}
                        </td>
                        <td
                          style={{
                            padding: '0.75rem',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            maxWidth: 200,
                            fontSize: '0.88rem',
                            color: 'var(--muted)',
                          }}
                        >
                          {u.notes ? u.notes.slice(0, 120) + (u.notes.length > 120 ? '…' : '') : '—'}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          {fmt(u.createdAt)}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button className="btn" type="button" onClick={() => approveUser(u.id)} style={{ padding: '0.55rem 1rem' }}>
                              Onayla
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={() => rejectUser(u.id)} style={{ padding: '0.55rem 1rem' }}>
                              Reddet
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'reservations' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Kullanıcı</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Alan</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Saat</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: '0.75rem', color: 'var(--muted)' }}>
                        Bekleyen rezervasyon yok.
                      </td>
                    </tr>
                  ) : (
                    reservations.map((r) => (
                      <tr key={r.id}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ fontWeight: 700 }}>{r.user.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{r.user.email}</div>
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          {formatReservationResource(r.resourceType, r.cabinNumber, r.meetingRoomId)}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          {fmt(r.startAt)} - {fmt(r.endAt)}
                        </td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button className="btn" type="button" onClick={() => approveReservation(r.id)} style={{ padding: '0.55rem 1rem' }}>
                              Onayla
                            </button>
                            <button className="btn btn-secondary" type="button" onClick={() => rejectReservation(r.id)} style={{ padding: '0.55rem 1rem' }}>
                              Reddet
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

