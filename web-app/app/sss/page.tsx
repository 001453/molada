import type { Metadata } from 'next';
import Link from 'next/link';
import { MOLADA_FAQ } from '@/lib/faq';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: `Sık sorulan sorular — ${site.name}`,
  description: 'Üyelik, rezervasyon, etkinlik ve KVKK hakkında Molada için sık sorulan sorular.',
};

export default function SssPage() {
  return (
    <div className="container page-content">
      <h1 style={{ marginTop: 0 }}>Sık sorulan sorular</h1>
      <p>
        Aradığınızı bulamazsanız{' '}
        <Link href="/iletisim">iletişim</Link> veya{' '}
        <Link href="/iletisim#geri-donus">geri dönüş formu</Link> ile yazın.
      </p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {MOLADA_FAQ.map((item) => (
          <section key={item.q} className="card" style={{ marginBottom: 0 }}>
            <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>{item.q}</h2>
            <p style={{ marginBottom: 0 }}>{item.a}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
