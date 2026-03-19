import { site } from '@/lib/site';

export const metadata = {
  title: `KVKK Aydınlatma — ${site.name}`,
  description: 'Kişisel verilerin korunması ve aydınlatma metni.',
};

export default function KvkkPage() {
  return (
    <div className="container page-content">
      <h1>KVKK Aydınlatma Metni</h1>
      <p style={{ marginBottom: '2rem' }}>
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme.
      </p>

      <section className="card">
        <h2>Veri Sorumlusu</h2>
        <p>
          Paylaşımlı ofis ve sanal ofis hizmetleri veri sorumlusu, hizmeti sunan şirkettir. 
          İletişim: {site.address} — {site.email} — {site.phone}
        </p>
      </section>

      <section className="card">
        <h2>Hangi veriler toplanıyor?</h2>
        <p>
          Üyelik başvurusu, sözleşme, hizmet sunumu, güvenlik ve yasal yükümlülükler kapsamında 
          kimlik ve iletişim bilgileri, sözleşme ve ödeme bilgileri, giriş-çıkış kayıtları, 
          güvenlik kamera kayıtları (ortak alanlar), rezervasyon verileri, posta/kargo ve 
          sekreterya kayıtları işlenebilmektedir.
        </p>
      </section>

      <section className="card">
        <h2>İşleme amacı ve hukuki sebep</h2>
        <p>
          Verileriniz sözleşmenin kurulması ve ifası, ödeme ve faturalama, yasal yükümlülükler, 
          güvenlik ve hizmet kalitesi amacıyla KVKK 5. maddesinde belirtilen hukuki sebeplere 
          dayanılarak işlenmektedir.
        </p>
      </section>

      <section className="card">
        <h2>Haklarınız</h2>
        <p>
          KVKK 11. madde kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, 
          işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve amacına uygun kullanılıp 
          kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri 
          bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini veya yok 
          edilmesini isteme, otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize 
          bir sonucun ortaya çıkmasına itiraz etme ve kanuna aykırı işlenmesi sebebiyle zarara 
          uğramanız hâlinde zararın giderilmesini talep etme haklarına sahipsiniz. Başvurularınızı 
          veri sorumlusuna yazılı veya elektronik ortamda iletebilirsiniz.
        </p>
      </section>

      <section className="card cta-strip">
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
          Detaylı aydınlatma metni ve açık rıza metinleri şirket tarafından hazırlanan 
          belgelerde yer almaktadır. Üyelik veya ziyaretçi kaydı sırasında bu metinler 
          sunulacaktır.
        </p>
        <p style={{ marginBottom: 0 }}>
          <a href="/iletisim" className="btn">İletişim</a>
        </p>
      </section>
    </div>
  );
}
