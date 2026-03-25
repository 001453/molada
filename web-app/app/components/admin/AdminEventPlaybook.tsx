'use client';

import { useMemo, useState } from 'react';
import { ADMIN_EVENT_PLAYBOOK, playbookEventCount } from '@/lib/adminEventPlaybook';

export function AdminEventPlaybook() {
  const [openCat, setOpenCat] = useState<string | null>(ADMIN_EVENT_PLAYBOOK[0]?.id ?? null);
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [q, setQ] = useState('');

  const total = playbookEventCount();

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return ADMIN_EVENT_PLAYBOOK;
    return ADMIN_EVENT_PLAYBOOK.map((c) => ({
      ...c,
      events: c.events.filter(
        (e) =>
          e.titleTr.toLowerCase().includes(qq) ||
          e.titleEn.toLowerCase().includes(qq) ||
          e.amac.toLowerCase().includes(qq),
      ),
    })).filter((c) => c.events.length > 0);
  }, [q]);

  return (
    <div className="admin-print-area">
      <div
        className="card no-print"
        style={{
          border: '2px dashed rgba(216, 255, 63, 0.35)',
          background: 'rgba(216, 255, 63, 0.06)',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.65 }}>
          <strong>İç operasyon rehberi:</strong> Aşağıdaki kalemler Spacebring tarzı coworking etkinlik fikirlerinden
          uyarlanmıştır; her biri için hazırlık + uygulama iskeleti vardır. Gerçek duyuru ve takvim{' '}
          <strong>Operasyon özeti</strong> ve üye kanallarınızla uyumlu planlanır. Bu liste herkese açık sitede yayınlanmaz.
        </p>
        <p style={{ margin: '0.65rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>
          Toplam <strong>{total}</strong> etkinlik sablonu, <strong>{ADMIN_EVENT_PLAYBOOK.length}</strong> kategori.
        </p>
      </div>

      <div className="no-print" style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '1 1 200px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Ara (baslik / amac)</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ornek: yoga, networking..."
            style={{
              padding: '0.55rem 0.65rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--card-border)',
              background: 'var(--background)',
              color: 'var(--foreground)',
            }}
          />
        </label>
        <button className="btn" type="button" onClick={() => window.print()}>
          Rehberi yazdir / PDF
        </button>
      </div>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {filtered.map((cat) => (
          <section key={cat.id} className="card" style={{ marginBottom: 0 }}>
            <button
              type="button"
              className="no-print"
              onClick={() => setOpenCat((x) => (x === cat.id ? null : cat.id))}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: '1.05rem',
                fontWeight: 700,
                padding: 0,
              }}
            >
              {openCat === cat.id ? '▼' : '▶'} {cat.titleTr}
              <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '0.88rem' }}> — {cat.titleEn}</span>
              <span style={{ color: 'var(--muted)', fontWeight: 400 }}> ({cat.events.length})</span>
            </button>

            {openCat === cat.id && (
              <>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{cat.description}</p>
                <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.5rem' }}>
                  {cat.events.map((ev) => {
                    const isOpen = openEvent === `${cat.id}:${ev.id}`;
                    return (
                      <div
                        key={ev.id}
                        style={{
                          border: '1px solid var(--card-border)',
                          borderRadius: 'var(--radius)',
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <button
                          type="button"
                          className="no-print"
                          onClick={() => setOpenEvent((k) => (k === `${cat.id}:${ev.id}` ? null : `${cat.id}:${ev.id}`))}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.65rem 0.85rem',
                            background: 'rgba(255,255,255,0.04)',
                            border: 'none',
                            color: 'var(--foreground)',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                          }}
                        >
                          {isOpen ? '▼' : '▶'} {ev.titleTr}{' '}
                          <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({ev.titleEn})</span>
                        </button>
                        <div style={{ padding: isOpen ? '0.85rem' : '0 0.85rem' }}>
                          {isOpen && (
                            <>
                              <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem' }}>
                                <strong>Amaç:</strong> {ev.amac}
                              </p>
                              <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: 'var(--muted)' }}>
                                <strong>Molada / mekân:</strong> {ev.molada}
                              </p>
                              <ol
                                style={{
                                  margin: 0,
                                  paddingLeft: '1.2rem',
                                  fontSize: '0.88rem',
                                  lineHeight: 1.55,
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {ev.adimlar.map((step, i) => (
                                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                                    {step}
                                  </li>
                                ))}
                              </ol>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="card" style={{ color: 'var(--muted)' }}>
          Eslesen etkinlik yok. Aramayi temizleyin.
        </p>
      )}
    </div>
  );
}
