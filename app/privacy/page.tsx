import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getCsrfTokenAction } from '@/app/actions';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Kebijakan privasi AIT Group — bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.',
};

const LAST_UPDATED = '18 Maret 2026';

const sections = [
  {
    id: 'data-collection',
    title: '1. Data yang Kami Kumpulkan',
    content: [
      {
        subtitle: 'Data yang Anda berikan',
        body: 'Saat Anda menghubungi kami melalui formulir kontak, mendaftar layanan, atau berinteraksi dengan produk kami, kami dapat mengumpulkan: nama lengkap, alamat email, nomor telepon, nama perusahaan, jabatan, dan pesan yang Anda kirimkan.',
      },
      {
        subtitle: 'Data teknis',
        body: 'Kami mengumpulkan data teknis secara otomatis saat Anda mengunjungi website kami, meliputi: alamat IP, jenis dan versi browser, sistem operasi, halaman yang dikunjungi, waktu kunjungan, dan sumber referral.',
      },
      {
        subtitle: 'Data produk',
        body: 'Pengguna produk AIT Group (SIMBA, AQORTA, CoinSentiment, dll.) dapat menghasilkan data operasional sesuai fungsi produk masing-masing, yang diatur lebih lanjut dalam perjanjian layanan terpisah.',
      },
    ],
  },
  {
    id: 'data-use',
    title: '2. Penggunaan Data',
    content: [
      {
        subtitle: 'Tujuan penggunaan',
        body: 'Data yang dikumpulkan digunakan untuk: merespons pertanyaan dan permintaan Anda, menyediakan dan meningkatkan layanan kami, mengirimkan informasi terkait produk yang relevan (dengan persetujuan Anda), memenuhi kewajiban hukum yang berlaku, serta menganalisis dan meningkatkan performa website dan produk.',
      },
      {
        subtitle: 'Dasar hukum pemrosesan',
        body: 'Pemrosesan data Anda didasarkan pada: persetujuan yang Anda berikan, pemenuhan kontrak layanan, kepentingan sah bisnis kami, dan kewajiban hukum yang berlaku di Indonesia.',
      },
    ],
  },
  {
    id: 'data-sharing',
    title: '3. Berbagi Data',
    content: [
      {
        subtitle: 'Kami tidak menjual data Anda',
        body: 'AIT Group tidak pernah dan tidak akan menjual data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran atau komersial apapun.',
      },
      {
        subtitle: 'Mitra layanan',
        body: 'Kami dapat berbagi data dengan mitra teknologi terpercaya yang membantu operasional kami (hosting, analytics, email service) — hanya sebatas yang diperlukan dan terikat perjanjian kerahasiaan yang ketat.',
      },
      {
        subtitle: 'Kewajiban hukum',
        body: 'Kami dapat mengungkapkan data jika diwajibkan oleh hukum yang berlaku di Indonesia, perintah pengadilan, atau otoritas regulasi yang berwenang.',
      },
    ],
  },
  {
    id: 'data-security',
    title: '4. Keamanan Data',
    content: [
      {
        subtitle: 'Langkah perlindungan',
        body: 'Kami menerapkan langkah keamanan teknis dan organisasional yang sesuai untuk melindungi data Anda dari akses tidak sah, pengungkapan, perubahan, atau penghapusan. Ini mencakup enkripsi HTTPS, akses terbatas berbasis peran, dan monitoring keamanan berkelanjutan.',
      },
      {
        subtitle: 'Retensi data',
        body: 'Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang ditetapkan atau sesuai kewajiban hukum. Data yang tidak lagi diperlukan akan dihapus atau dianonimisasi secara aman.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '5. Hak-Hak Anda',
    content: [
      {
        subtitle: 'Hak akses dan koreksi',
        body: 'Anda berhak mengakses data pribadi yang kami simpan tentang Anda dan meminta koreksi jika data tersebut tidak akurat atau tidak lengkap.',
      },
      {
        subtitle: 'Hak penghapusan',
        body: 'Anda dapat meminta penghapusan data pribadi Anda dalam kondisi tertentu, kecuali kami diwajibkan oleh hukum untuk menyimpannya.',
      },
      {
        subtitle: 'Hak keberatan',
        body: 'Anda berhak untuk tidak menerima komunikasi pemasaran dari kami kapanpun dengan menghubungi kami melalui email yang tercantum di bawah.',
      },
    ],
  },
  {
    id: 'cookies',
    title: '6. Cookies',
    content: [
      {
        subtitle: 'Penggunaan cookies',
        body: 'Website kami menggunakan cookies teknis yang diperlukan untuk fungsi dasar website, serta cookies analitik untuk memahami cara penggunaan website kami. Anda dapat mengatur preferensi cookies melalui pengaturan browser Anda.',
      },
    ],
  },
  {
    id: 'contact',
    title: '7. Hubungi Kami',
    content: [
      {
        subtitle: 'Pertanyaan tentang privasi',
        body: 'Untuk pertanyaan, permintaan, atau keluhan terkait kebijakan privasi ini, silakan hubungi kami di: hello@ait.co.id atau melalui halaman kontak kami. Kami akan merespons dalam 5 hari kerja.',
      },
    ],
  },
];

export default async function PrivacyPage() {
  const csrfToken = await getCsrfTokenAction();
  return (
    <>
      <Navbar />
      <main style={{ background: 'linear-gradient(160deg,#020b18 0%,#030e1f 50%,#020810 100%)' }}>
        {/* Hero */}
        <section className="pt-36 pb-12 px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="section-tag mb-5">Legal</div>
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-4" style={{ fontWeight: 800 }}>
            Privacy Policy
          </h1>
          <p className="text-white/40 text-sm font-mono">
            Terakhir diperbarui: {LAST_UPDATED}
          </p>
          <div className="mt-6 p-5 rounded-2xl border border-teal-intelligence/20"
            style={{ background: 'rgba(14,165,160,0.07)' }}>
            <p className="text-white/70 text-sm leading-relaxed">
              AIT Group (Arla Industri Teknopatih) berkomitmen untuk melindungi privasi Anda.
              Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
              informasi pribadi Anda saat berinteraksi dengan layanan kami.
            </p>
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
                      <h3 className="text-sm font-heading text-teal-intelligence mb-2" style={{ fontWeight: 600 }}>
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-12 flex flex-wrap items-center gap-4 text-sm">
            <Link href="/terms" className="text-teal-intelligence hover:text-white transition-colors">
              Baca juga: Terms of Service →
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
