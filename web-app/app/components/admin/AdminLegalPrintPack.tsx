/**
 * Sadece admin panelinde gösterilir — operatör kontrol özeti.
 * Üyeye verilecek kağıt sözleşme ve formlar avukat onaylı olmalıdır.
 */

export function AdminLegalPrintPack() {
  return (
    <div className="admin-print-area">
      <div
        className="card"
        style={{
          border: '2px dashed var(--card-border)',
          background: 'rgba(216, 255, 63, 0.06)',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>
          <strong>İç kullanım:</strong> Bu metin web’de yayınlanmaz. Üye veya adayla imzalanacak kağıt sözleşme, KVKK
          aydınlatması ve açık rıza formları şirketinizin avukatınca hazırlanmış nihai belgelerdir; burası yalnızca
          hatırlatma kontrol listesi ve yazdırılabilir özet içindir.
        </p>
      </div>

      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
        <strong>Hukuki danışmanlık değildir.</strong> Ruhsat, imar, sigorta ve sözleşme maddeleri için yerel avukat ve
        kurumlarla çalışınız.
      </p>

      <section className="card" style={{ marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>1. Üyelik sözleşmesi (çerçeve — kağıtta netleşecek maddeler)</h2>
        <p>
          Paylaşımlı ofiste <strong>üye sözleşmesi</strong> işletme ile üye arasında hizmet kapsamını tanımlar. Kağıt
          sözleşmede özellikle:
        </p>
        <ul className="feature-list">
          <li>
            <strong>Paket ve ücret:</strong> Sıcak/sabit masa; ortak hizmetler (internet, çay-kahve, yazıcı); saatlik
            toplantı/kabin faturalaması.
          </li>
          <li>
            <strong>Erişim:</strong> Çalışma saatleri; tatil/hafta sonu; giriş yöntemi; dijital rezervasyon ve onay
            akışının sözleşmede nasıl bağlandığı.
          </li>
          <li>
            <strong>İç düzen:</strong> Gürültü, mutfak, misafir, sigara, ortak alan sessiz saat — iç kurallar ekine
            referans.
          </li>
          <li>
            <strong>Fesih ve ihlal:</strong> Bildirim süreleri, depozito, borçlar, derhal fesih halleri.
          </li>
        </ul>
        <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: 0 }}>
          Standart internet şablonu kopyalamayın; Molada mekân ve paket modelinize göre avukat güncellemesi şart.
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>2. Gizlilik ve veri güvenliği (KVKK + sahada uygulama)</h2>
        <p>
          <strong>6698 sayılı KVKK</strong> kapsamında aydınlatma, hukuki sebep ve teknik/idari tedbirler. Üyeye sunulan
          kağıt/dijital KVKK metinleri avukat onaylı olmalıdır.
        </p>
        <ul className="feature-list">
          <li>
            <strong>Wi‑Fi:</strong> Üye veya seans bazlı erişim; karmaşık ağlarda segmentasyon ve güçlü kimlik
            doğrulama planı.
          </li>
          <li>
            <strong>Ortak yazıcı:</strong> Belgelerin unutulmaması; iç politika ve üyeye kısa hatırlatma (imza karşılığı
            bilgilendirme olabilir).
          </li>
          <li>
            <strong>Kamera:</strong> Varsa KVKK ve yerel mevzuata uygun aydınlatma; saklama süresi ve erişim.
          </li>
          <li>
            <strong>Dijital başvuru verisi:</strong> Hosting/veri tabanı erişimi, yedek, güncelleme — operasyon sorumlusu
            atayın.
          </li>
        </ul>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>3. İmar, ruhsat ve işyeri</h2>
        <p>
          Taşınmazın kullanım amacı, imar ve <strong>işyeri açma / çalışma ruhsatı</strong> süreçleri; yangın ve kapasite;
          kira sözleşmesinde üyelik/hizmet modeli ve alt kullanım izinleri — zemin ve belge incelemesi avukat + belediye.
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>4. Sorumluluk ve sigorta</h2>
        <p>
          Genel sorumluluk, mülk, iş durması, çalışanlar ve veri ihlali gibi başlıkları sigorta danışmanıyla değerlendirin.
          Üye sözleşmesinde sorumluluk sınırı ve üyenin eşya/veri özeni avukat diliyle yazılmalıdır.
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>5. Fikri mülkiyet ve ticari sır</h2>
        <p>Açık ofis riski: görünür ekranlar ve duyulan görüşmeler.</p>
        <ul className="feature-list">
          <li>Toplantı odaları: kayıt, kapı politikası, akustik önlemler.</li>
          <li>Sözleşmede makul gizlilik / komşuluk kuralları (genel çerçeve).</li>
          <li>Personel için gizlilik ve KVKK bilgilendirmesi; gerekirse NDA.</li>
        </ul>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Kaynak (bilgilendirme)</h2>
        <p style={{ marginBottom: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>
          Çerçeve ilhamı (İngilizce özet):{' '}
          <a href="https://www.spacebring.com/blog/tips/legal-aspects" target="_blank" rel="noopener noreferrer">
            Spacebring — Legal tips for coworking spaces
          </a>
          . Nihai belgeler Türkiye ve şirketiniz özelinde avukat tarafından üretilir.
        </p>
      </section>

      <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Yazdırma tarihi (el ile): _______________ · Operatör imza: _______________
      </p>
    </div>
  );
}
