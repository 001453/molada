'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  MEETING_ROOMS,
  SILENT_CABIN_COUNT,
  formatReservationResource,
  reservationStatusTr,
} from '@/lib/coworking';

type ResourceType = 'MEETING_ROOM' | 'SILENT_CABIN';

type ReservationItem = {
  id: string;
  resourceType: ResourceType;
  meetingRoomId: number | null;
  cabinNumber: number | null;
  startAt: string;
  endAt: string;
  status: string;
  checkInCode: string | null;
  wifiSsid: string | null;
  wifiPassword: string | null;
  wifiWindow: { startAt: string; endAt: string } | null;
  checkedInAt: string | null;
  checkedOutAt: string | null;
};

export default function UyePaneliPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [membershipWifi, setMembershipWifi] = useState<{ wifiSsid: string | null; wifiPassword: string | null } | null>(null);
  const [reservations, setReservations] = useState<ReservationItem[]>([]);

  const [resourceType, setResourceType] = useState<ResourceType>('MEETING_ROOM');
  const [meetingRoomId, setMeetingRoomId] = useState<number>(MEETING_ROOMS[0].id);
  const [cabinNumber, setCabinNumber] = useState<number>(1);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [applyMsg, setApplyMsg] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);

  const canRequestReservation = useMemo(() => true, []);

  async function refresh() {
    const res = await fetch('/api/user/reservations/list');
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || 'Veri alınamadı.');
    setMembershipWifi(data?.membershipWifi ?? null);
    setReservations(data?.reservations ?? []);
  }

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await refresh();
      } catch (e: any) {
        setError(e?.message || 'Yükleme başarısız.');
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRequestReservation(e: React.FormEvent) {
    e.preventDefault();
    setApplyMsg(null);
    setApplyError(null);
    try {
      const payload = {
        resourceType,
        meetingRoomId: resourceType === 'MEETING_ROOM' ? meetingRoomId : null,
        cabinNumber: resourceType === 'SILENT_CABIN' ? cabinNumber : null,
        date,
        startTime,
        endTime,
      };
      const res = await fetch('/api/user/reservations/apply', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setApplyError(data?.error || 'Rezervasyon alınamadı.');
        return;
      }
      setApplyMsg('Rezervasyon talebiniz alındı. Admin onayından sonra giriş kodu paylaşılacaktır.');
      await refresh();
    } catch {
      setApplyError('Rezervasyon talebi sırasında hata oluştu.');
    }
  }

  async function checkIn(id: string, code: string) {
    const res = await fetch(`/api/user/reservations/${id}/checkin`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Giriş başarısız.');
      return;
    }
    await refresh();
  }

  async function checkOut(id: string, code: string) {
    const res = await fetch(`/api/user/reservations/${id}/checkout`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      alert(data?.error || 'Çıkış başarısız.');
      return;
    }
    await refresh();
  }

  function fmt(d: string) {
    const dt = new Date(d);
    return dt.toLocaleString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  if (loading) {
    return (
      <div className="container page-content">
        <section className="card">Yükleniyor...</section>
      </div>
    );
  }

  return (
    <div className="container page-content">
      <h1 style={{ marginTop: 0 }}>Üye Paneli</h1>

      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>WiFi Erişimi</h2>
        {membershipWifi?.wifiPassword ? (
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              SSID: <strong>{membershipWifi.wifiSsid}</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Şifre: <strong style={{ color: 'var(--foreground)' }}>{membershipWifi.wifiPassword}</strong>
            </p>
            <p style={{ fontSize: '0.92rem', margin: 0 }}>
              Bu şifre router’da kullanılmalıdır. (Admin onayı sonrası oluşturulur)
            </p>
          </div>
        ) : (
          <p style={{ margin: 0 }}>WiFi bilgisi henüz atanmamış.</p>
        )}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Rezervasyon Talebi</h2>
        <form onSubmit={onRequestReservation}>
          <div style={{ display: 'grid', gap: '0.85rem' }}>
            <label>
              <div>Alan</div>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as ResourceType)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
                disabled={!canRequestReservation}
              >
                <option value="MEETING_ROOM">Toplantı odası</option>
                <option value="SILENT_CABIN">Sessiz kabin (1 kişi)</option>
              </select>
            </label>

            {resourceType === 'MEETING_ROOM' && (
              <label>
                <div>Toplantı odası seçin</div>
                <select
                  value={meetingRoomId}
                  onChange={(e) => setMeetingRoomId(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
                >
                  {MEETING_ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.labelTr}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {resourceType === 'SILENT_CABIN' && (
              <label>
                <div>Sessiz kabin no (1–{SILENT_CABIN_COUNT})</div>
                <select
                  value={cabinNumber}
                  onChange={(e) => setCabinNumber(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
                >
                  {Array.from({ length: SILENT_CABIN_COUNT }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              <div>Tarih</div>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label>
                <div>Başlangıç</div>
                <input
                  required
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
                />
              </label>
              <label>
                <div>Bitiş</div>
                <input
                  required
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 10, border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.04)', color: 'var(--foreground)' }}
                />
              </label>
            </div>

            <button className="btn" type="submit" style={{ marginTop: '0.35rem' }}>
              Talep Oluştur
            </button>

            {applyMsg && <p style={{ margin: 0, color: 'var(--accent)' }}>{applyMsg}</p>}
            {applyError && <p style={{ margin: 0, color: '#ff6b6b' }}>{applyError}</p>}
          </div>
        </form>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Rezervasyonlar</h2>
        {reservations.length === 0 ? (
          <p style={{ marginBottom: 0 }}>Henüz rezervasyon yok.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Alan</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Saat</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Durum</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>WiFi</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '1px solid var(--card-border)' }}>Giriş/Çıkış</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => {
                  const isApproved = r.status === 'APPROVED';
                  const hasCheckedIn = !!r.checkedInAt;
                  const code = r.checkInCode ?? '';
                  return (
                    <tr key={r.id}>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {formatReservationResource(r.resourceType, r.cabinNumber, r.meetingRoomId)}
                      </td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {fmt(r.startAt)} - {fmt(r.endAt)}
                      </td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {reservationStatusTr[r.status] ?? r.status}
                      </td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {r.wifiPassword ? (
                          <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{r.wifiSsid}</div>
                            <div style={{ fontWeight: 700 }}>{r.wifiPassword}</div>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--muted)' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {isApproved ? (
                          <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {!hasCheckedIn ? (
                              <button
                                className="btn"
                                type="button"
                                onClick={() => checkIn(r.id, code)}
                                disabled={!r.checkInCode}
                                style={{ padding: '0.55rem 1rem' }}
                              >
                                Giriş Yap
                              </button>
                            ) : !r.checkedOutAt ? (
                              <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => checkOut(r.id, code)}
                                style={{ padding: '0.55rem 1rem' }}
                              >
                                Çıkış Yap
                              </button>
                            ) : (
                              <span style={{ color: 'var(--muted)' }}>Bitti</span>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--muted)' }}>Onay bekleniyor</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

