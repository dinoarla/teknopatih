import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Syarat dan ketentuan penggunaan layanan AIT Group — Arla Industri Teknopatih.',
};

const LAST_UPDATED = '18 Maret 2026';

const sections = [
  {
    id: 'acceptance',
    title: '1. Penerimaan Syarat',
    content: [
      {
        subtitle: 'Persetujuan penggunaan',
        body: 'Dengan mengakses atau menggunakan layanan, produk, atau website AIT Group (Arla Industri Teknopatih), Anda menyatakan telah membaca, memahami, dan menyetujui syarat dan ketentuan ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.',
      },
      {
        subtitle: 'Pembaruan syarat',
        body: 'AIT Group berhak memperbarui syarat ini sewaktu-waktu. Perubahan material akan diberitahukan melalui email atau notifikasi di website kami. Penggunaan berkelanjutan setelah perubahan berarti Anda menerima syarat yang diperbarui.',
      },
    ],
  },
  {
    id: 'services',
    title: '2. Layanan AIT Group',
    content: [
      {
        subtitle: 'Cakupan layanan',
        body: 'AIT Group menyediakan solusi teknologi meliputi: Industrial IoT (SIMBA, AQORTA, Engine Monitoring), platform data intelligence (CoinSentiment.id), layanan kreatif (HUD Production), platform edukasi (KALIMI), serta layanan sosial dan spiritual. Detail teknis masing-masing produk diatur dalam perjanjian terpisah.',
      },
      {
        subtitle: 'Ketersediaan layanan',
        body: 'Kami berupaya menjaga ketersediaan layanan 24/7, namun tidak dapat menjamin uptime 100%. Pemeliharaan terjadwal akan diberitahukan sebelumnya. AIT Group tidak bertanggung jawab atas kerugian akibat gangguan layanan di luar kendali kami (force majeure).',
      },
      {
        subtitle: 'Modifikasi layanan',
        body: 'AIT Group berhak mengubah, memperbarui, atau menghentikan fitur tertentu dari layanan kami dengan pemberitahuan yang wajar kepada pengguna yang terdampak.',
      },
    ],
  },
  {
    id: 'user-obligations',
    title: '3. Kewajiban Pengguna',
    content: [
      {
        subtitle: 'Penggunaan yang diizinkan',
        body: 'Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah, sesuai dengan hukum yang berlaku di Indonesia dan internasional, serta tidak melanggar hak pihak ketiga manapun.',
      },
      {
        subtitle: 'Larangan penggunaan',
        body: 'Dilarang keras: menggunakan layanan untuk aktivitas ilegal, melakukan reverse engineering atau decompiling produk kami, menyebarkan malware atau konten berbahaya, melakukan scraping atau pengambilan data secara massal tanpa izin, serta menyamar sebagai entitas lain.',
      },
      {
        subtitle: 'Keamanan akun',
        body: 'Anda bertanggung jawab penuh atas keamanan kredensial akun Anda. Segera laporkan kepada kami jika terdapat akses tidak sah ke akun Anda. AIT Group tidak bertanggung jawab atas kerugian akibat kelalaian pengguna dalam menjaga keamanan akun.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '4. Kekayaan Intelektual',
    content: [
      {
        subtitle: 'Hak cipta AIT Group',
        body: 'Seluruh konten, kode, desain, logo, merek dagang, dan materi lain yang terdapat dalam layanan AIT Group adalah milik eksklusif AIT Group atau pemberi lisensinya, dilindungi oleh hukum kekayaan intelektual Indonesia dan internasional.',
      },
      {
        subtitle: 'Lisensi terbatas',
        body: 'AIT Group memberikan lisensi terbatas, non-eksklusif, tidak dapat dipindahtangankan untuk menggunakan layanan kami sesuai syarat ini. Lisensi ini tidak mencakup hak untuk menyalin, mendistribusikan, atau membuat karya turunan tanpa izin tertulis.',
      },
      {
        subtitle: 'Konten pengguna',
        body: 'Data dan konten yang Anda masukkan ke layanan kami tetap menjadi milik Anda. Anda memberikan AIT Group lisensi terbatas untuk memproses data tersebut semata-mata guna menyediakan layanan yang diminta.',
      },
    ],
  },
  {
    id: 'payment',
    title: '5. Pembayaran dan Langganan',
    content: [
      {
        subtitle: 'Harga dan pembayaran',
        body: 'Harga layanan tercantum dalam proposal atau perjanjian terpisah. Semua harga dalam Rupiah (IDR) kecuali disebutkan lain. Pembayaran jatuh tempo sesuai jadwal yang disepakati dalam kontrak.',
      },
      {
        subtitle: 'Kebijakan pengembalian',
        body: 'Kebijakan refund diatur berdasarkan jenis layanan dan tahap pengerjaan proyek. Untuk layanan berlangganan (SaaS), tidak ada refund untuk periode yang sudah berjalan. Detail kebijakan refund akan dicantumkan dalam perjanjian layanan.',
      },
    ],
  },
  {
    id: 'limitation',
    title: '6. Batasan Tanggung Jawab',
    content: [
      {
        subtitle: 'Batasan ganti rugi',
        body: 'Sejauh diizinkan hukum, total tanggung jawab AIT Group tidak akan melebihi jumlah yang Anda bayarkan kepada kami dalam 3 bulan terakhir sebelum klaim timbul.',
      },
      {
        subtitle: 'Pengecualian kerugian',
        body: 'AIT Group tidak bertanggung jawab atas: kerugian tidak langsung, insidental, atau konsekuensial; kehilangan keuntungan atau data bisnis; kerusakan reputasi; atau gangguan bisnis — meskipun kami telah diberitahu kemungkinan terjadinya kerugian tersebut.',
      },
    ],
  },
  {
    id: 'governing-law',
    title: '7. Hukum yang Berlaku',
    content: [
      {
        subtitle: 'Yurisdiksi',
        body: 'Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui musyawarah mufakat terlebih dahulu, dan jika tidak tercapai kesepakatan, akan diselesaikan melalui Pengadilan Negeri Pontianak.',
      },
      {
        subtitle: 'Ketentuan yang dapat dipisahkan',
        body: 'Jika suatu ketentuan dalam syarat ini dinyatakan tidak berlaku oleh pengadilan, ketentuan tersebut akan dihapus atau dibatasi seminimal mungkin, dan ketentuan lainnya tetap berlaku penuh.',
      },
    ],
  },
  {
    id: 'contact',
    title: '8. Kontak',
    content: [
      {
        subtitle: 'Pertanyaan tentang syarat layanan',
        body: 'Untuk pertanyaan terkait syarat dan ketentuan ini, silakan hubungi: hello@ait.co.id · Arla Industri Teknopatih · Pontianak, Kalimantan Barat, Indonesia. Tim legal kami akan merespons dalam 5 hari kerja.',
      },
    ],
  },
];

export default async function TermsPage() {
  const csrfToken = await getCsrfTokenAction();
  return (
    <>
      <Navbar />
      <main style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 50%,#020810 100%)' }}>
        {/* Hero */}
        <section className="pt-36 pb-12 px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="section-tag mb-5">Legal</div>
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 800 }}>
            Terms of Service
          </h1>
          <p className="text-white/40 text-sm font-mono">
            Terakhir diperbarui: {LAST_UPDATED}
          </p>
          <div className="mt-6 p-5 rounded-2xl border border-gold-patih/20"
            style={{ background: 'rgba(212,168,67,0.07)' }}>
            <p className="text-white/70 text-sm leading-relaxed">
              Syarat dan ketentuan ini merupakan perjanjian hukum antara Anda dan
              AIT Group (Arla Industri Teknopatih, berdomisili di Pontianak, Kalimantan Barat)
              terkait penggunaan seluruh layanan, produk, dan platform yang kami sediakan.
            </p>
          </div>
        </section>

        {/* Table of contents */}
        <section className="pb-8 px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.07] p-6"
            style={{ background: 'rgba(13,30,58,0.4)' }}>
            <p className="text-xs font-mono text-white/40 mb-4 tracking-widest uppercase">Daftar Isi</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`}
                  className="text-sm text-white/50 hover:text-teal-intelligence transition-colors py-1">
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-10">
            {sections.map(section => (
              <div key={section.id} id={section.id}
                className="rounded-2xl border border-white/[0.07] overflow-hidden"
                style={{ background: 'rgba(13,30,58,0.5)' }}>
                <div className="px-7 py-5 border-b border-white/[0.06]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h2 className="font-heading text-lg text-white" style={{ fontWeight: 700 }}>
                    {section.title}
                  </h2>
                </div>
                <div className="px-7 py-6 space-y-5">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-heading text-gold-patih mb-2" style={{ fontWeight: 600 }}>
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/privacy" className="text-teal-intelligence hover:text-white transition-colors">
              Baca juga: Privacy Policy →
            </Link>
            <Link href="/contact" className="text-white/40 hover:text-white transition-colors">
              Hubungi Kami
            </Link>
          </div>
        </section>
      </main>
      <Footer csrfToken={csrfToken} />
    </>
  );
}
