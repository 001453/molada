'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

/** JUSTWork tarzı “bizi arayın” — sunucu yok; mail istemcisinde açılır. */
export function LeadFormMailto() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') ?? '').trim();
    const phone = String(fd.get('phone') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const company = String(fd.get('company') ?? '').trim();
    const topic = String(fd.get('topic') ?? '').trim();
    const message = String(fd.get('message') ?? '').trim();

    const lines = [
      'Molada — geri dönüş talebi',
      '',
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      `E-posta: ${email}`,
      company ? `Firma: ${company}` : '',
      `Konu: ${topic}`,
      '',
      message ? `Mesaj:\n${message}` : '',
    ].filter(Boolean);

    const body = encodeURIComponent(lines.join('\n'));
    const subject = encodeURIComponent('Molada — bilgi / geri arama talebi');
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSentHint(true);
  }

  return (
    <form onSubmit={onSubmit} className="lead-form">
      <div className="lead-form-grid">
        <label>
          <span>Ad Soyad *</span>
          <input name="name" required placeholder="Adınız Soyadınız" autoComplete="name" />
        </label>
        <label>
          <span>Telefon *</span>
          <input name="phone" required type="tel" placeholder="05xx xxx xx xx" autoComplete="tel" />
        </label>
        <label>
          <span>E-posta *</span>
          <input name="email" required type="email" placeholder="ornek@firma.com" autoComplete="email" />
        </label>
        <label>
          <span>Firma (isteğe bağlı)</span>
          <input name="company" placeholder="Şirket / marka" autoComplete="organization" />
        </label>
        <label className="lead-form-full">
          <span>İlgilendiğiniz konu *</span>
          <select name="topic" required defaultValue="">
            <option value="" disabled>
              Seçin
            </option>
            <option value="Üyelik (sıcak / sabit masa)">Üyelik (sıcak / sabit masa)</option>
            <option value="Toplantı odası / kabin">Toplantı odası / sessiz kabin</option>
            <option value="Sanal ofis">Sanal ofis</option>
            <option value="Günlük / deneme kullanımı">Günlük / deneme kullanımı</option>
            <option value="Diğer">Diğer</option>
          </select>
        </label>
        <label className="lead-form-full">
          <span>Mesaj</span>
          <textarea name="message" rows={4} placeholder="Kısaca ihtiyacınızı yazın…" />
        </label>
      </div>
      <p className="lead-form-note">
        Gönder dediğinizde e-posta uygulamanız açılır; mesajı göndererek bize ulaşırsınız. Kişisel verileriniz{' '}
        <a href="/kvkk">KVKK</a> kapsamında işlenir.
      </p>
      <button type="submit" className="btn">
        E-postayı aç ve gönder
      </button>
      {sentHint && (
        <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
          E-posta penceresi açılmadıysa doğrudan <a href={`mailto:${site.email}`}>{site.email}</a> adresine yazın.
        </p>
      )}
    </form>
  );
}
