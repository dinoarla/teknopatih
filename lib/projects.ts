export interface Project {
  readonly id: string;
  readonly name: string;
  readonly originalName: string;
  readonly description: string;
  readonly category: ProjectCategory;
  readonly year: number;
  readonly tags: ReadonlyArray<string>;
  readonly icon: string;
  readonly accentColor: string;
}

export type ProjectCategory =
  | 'IoT & Industrial'
  | 'Web Development'
  | 'Data & AI'
  | 'E-Commerce'
  | 'Government & Public'
  | 'Education'
  | 'Finance & Accounting'
  | 'Mobile & App'
  | 'Internal Product';

export const PROJECT_CATEGORIES: ReadonlyArray<ProjectCategory> = [
  'IoT & Industrial','Data & AI','Government & Public','Web Development',
  'E-Commerce','Education','Finance & Accounting','Mobile & App','Internal Product',
] as const;

export const PROJECTS: ReadonlyArray<Project> = [
  // IoT & Industrial
  { id:'p001', name:'AQORTA', originalName:'AQORTA Air Quality Monitor',
    description:'Stasiun pemantauan kualitas udara real-time terjangkau untuk kawasan industri dan pemerintah daerah.',
    category:'IoT & Industrial', year:2021, tags:['IoT','Air Quality','Hardware'], icon:'🌬️', accentColor:'#0EA5A0' },
  { id:'p002', name:'SafeGuard K3', originalName:'Automatic Early Warning System K3 PLN',
    description:'Sistem peringatan dini otomatis berbasis IoT untuk keselamatan kerja di lingkungan pembangkit listrik.',
    category:'IoT & Industrial', year:2020, tags:['IoT','Safety','Industrial'], icon:'🛡️', accentColor:'#1E5AA8' },
  { id:'p003', name:'StockVault', originalName:'Inventory Gudang PLTD Siantan',
    description:'Sistem manajemen inventaris gudang berbasis web untuk operasional PLTD Siantan.',
    category:'IoT & Industrial', year:2019, tags:['Inventory','Dashboard','Industrial'], icon:'📦', accentColor:'#5B9AF5' },
  { id:'p004', name:'GridWatch', originalName:'PLTD Siantan Website Monitoring System',
    description:'Dashboard monitoring real-time untuk memantau performa dan status operasi pembangkit listrik diesel.',
    category:'IoT & Industrial', year:2020, tags:['Monitoring','Web','Energy'], icon:'⚡', accentColor:'#D4A843' },
  { id:'p005', name:'SIMBA', originalName:'Sistem Informasi Bahan Bakar',
    description:'Platform pengelolaan dan pelacakan konsumsi bahan bakar industri dengan analitik berbasis data.',
    category:'IoT & Industrial', year:2018, tags:['Fuel Monitor','IoT','Industrial'], icon:'⛽', accentColor:'#1E5AA8' },
  { id:'p006', name:'GarduNet', originalName:'Aplikasi Gardu Online',
    description:'Aplikasi monitoring gardu listrik secara online untuk mempermudah pengawasan jaringan distribusi.',
    category:'IoT & Industrial', year:2017, tags:['PLN','Monitoring','Mobile'], icon:'🔌', accentColor:'#0EA5A0' },
  { id:'p007', name:'Kinematics 4DX', originalName:'Kinematics 4DX',
    description:'Sistem kontrol dan analisis pergerakan industrial berbasis sensor dengan visualisasi 4 dimensi.',
    category:'IoT & Industrial', year:2022, tags:['Industrial','Motion','Hardware'], icon:'⚙️', accentColor:'#5B9AF5' },

  // Data & AI
  { id:'p008', name:'CoinSentiment', originalName:'CoinSentiment.id / Kripto Hybrid',
    description:'Platform analitik sentimen pasar kripto berbasis AI untuk membantu trader dan investor membuat keputusan berbasis data.',
    category:'Data & AI', year:2019, tags:['AI','Crypto','Sentiment'], icon:'📊', accentColor:'#0EA5A0' },
  { id:'p009', name:'DeciMatrix', originalName:'SPK Metode AHP',
    description:'Sistem pendukung keputusan menggunakan metode Analytical Hierarchy Process untuk pemilihan alternatif optimal.',
    category:'Data & AI', year:2016, tags:['Decision Support','AHP','Algorithm'], icon:'🧮', accentColor:'#1E5AA8' },
  { id:'p010', name:'RankFlow', originalName:'SPK Metode AHP Produk Terlaris',
    description:'Algoritma pemeringkatan produk terlaris berbasis AHP untuk mendukung strategi penjualan dan stok.',
    category:'Data & AI', year:2017, tags:['Decision Support','Analytics','AHP'], icon:'📈', accentColor:'#5B9AF5' },
  { id:'p011', name:'GeoLocate', originalName:'Penghitung Jarak GIS & Bubble Sort',
    description:'Aplikasi GIS untuk menghitung dan mengoptimalkan jarak lokasi usaha menggunakan algoritma Bubble Sort.',
    category:'Data & AI', year:2015, tags:['GIS','Algorithm','Location'], icon:'📍', accentColor:'#D4A843' },
  { id:'p012', name:'VisionID', originalName:'OCR E-KTP Pasang Baru PLN',
    description:'Sistem OCR berbasis computer vision untuk ekstraksi otomatis data KTP dalam proses pendaftaran pelanggan PLN.',
    category:'Data & AI', year:2020, tags:['OCR','AI','Computer Vision'], icon:'👁️', accentColor:'#0EA5A0' },
  { id:'p013', name:'ForestWatch', originalName:'SIPEMANTAUHUTAN.ID',
    description:'Platform monitoring hutan berbasis GIS untuk memantau deforestasi dan perubahan tutupan lahan secara real-time.',
    category:'Data & AI', year:2018, tags:['GIS','Environment','Monitoring'], icon:'🌳', accentColor:'#4ade80' },
  { id:'p014', name:'RescueMap', originalName:'GIS BASARNAS',
    description:'Sistem informasi geografis untuk mendukung operasi SAR BASARNAS dalam pemetaan wilayah dan koordinasi tim.',
    category:'Data & AI', year:2016, tags:['GIS','Mapping','Government'], icon:'🗺️', accentColor:'#1E5AA8' },
  { id:'p015', name:'EcoSense', originalName:'Monitoring Limbah TA',
    description:'Sistem pemantauan limbah berbasis IoT dengan dashboard analitik untuk compliance lingkungan hidup.',
    category:'Data & AI', year:2019, tags:['IoT','Environment','Monitoring'], icon:'♻️', accentColor:'#4ade80' },

  // Government & Public
  { id:'p016', name:'DekraCraft', originalName:'Web Dekranasda Bengkayang',
    description:'Portal web resmi Dekranasda Bengkayang untuk mempromosikan dan memasarkan produk kerajinan lokal.',
    category:'Government & Public', year:2019, tags:['Government','UMKM','Web'], icon:'🏛️', accentColor:'#1E5AA8' },
  { id:'p017', name:'SIMONKALA', originalName:'SIMONKALA',
    description:'Sistem informasi monitoring dan kalender anggaran daerah untuk meningkatkan transparansi pemerintahan.',
    category:'Government & Public', year:2017, tags:['Government','Information System'], icon:'🗂️', accentColor:'#5B9AF5' },
  { id:'p018', name:'SI-CSP', originalName:'SI-CSP',
    description:'Sistem informasi pelayanan publik terpadu untuk mempercepat dan mendokumentasikan layanan administratif.',
    category:'Government & Public', year:2018, tags:['Government','Public Service'], icon:'📋', accentColor:'#0EA5A0' },
  { id:'p019', name:'E-Kuitansi Siantan', originalName:'Siantan E-Kuitansi',
    description:'Sistem kuitansi digital untuk menggantikan kuitansi fisik dalam transaksi keuangan pemerintahan Siantan.',
    category:'Government & Public', year:2020, tags:['Government','Finance','Digital'], icon:'🧾', accentColor:'#D4A843' },
  { id:'p020', name:'SILOGIS', originalName:'SILOGIS',
    description:'Platform manajemen logistik dan distribusi untuk mendukung rantai pasok instansi pemerintah.',
    category:'Government & Public', year:2016, tags:['Logistics','Government','System'], icon:'🚚', accentColor:'#1E5AA8' },
  { id:'p021', name:'PLN Scholar', originalName:'PLN Scholar',
    description:'Portal beasiswa PLN untuk memudahkan pendaftaran, seleksi, dan pemantauan penerima beasiswa secara digital.',
    category:'Government & Public', year:2021, tags:['PLN','Scholarship','Portal'], icon:'🎓', accentColor:'#0EA5A0' },
  { id:'p022', name:'DocFlow APD', originalName:'Aplikasi Pengendalian Dokumen',
    description:'Sistem pengendalian dokumen digital untuk manajemen arsip, revisi, dan distribusi dokumen perusahaan.',
    category:'Government & Public', year:2015, tags:['Document Management','System'], icon:'📁', accentColor:'#5B9AF5' },
  { id:'p023', name:'MBCI Portal', originalName:'MBCI Pontianak',
    description:'Portal informasi dan manajemen kegiatan organisasi MBCI Pontianak berbasis web.',
    category:'Government & Public', year:2022, tags:['Organization','Web','Portal'], icon:'🏢', accentColor:'#1E5AA8' },
  { id:'p024', name:'Cakrawala', originalName:'Cakrawala',
    description:'Platform informasi dan komunikasi publik yang menjembatani warga dengan layanan dan berita terkini.',
    category:'Government & Public', year:2023, tags:['Web','Portal','Public'], icon:'🌐', accentColor:'#0EA5A0' },

  // Education
  { id:'p025', name:'AttendEase', originalName:'Aplikasi Absensi Guru dan Siswa',
    description:'Sistem absensi digital untuk guru dan siswa dengan rekap otomatis dan notifikasi ketidakhadiran.',
    category:'Education', year:2015, tags:['Attendance','School','Web'], icon:'✅', accentColor:'#5B9AF5' },
  { id:'p026', name:'DigiLab', originalName:'Ruang Kelas Lab Digital',
    description:'Sistem manajemen laboratorium digital dan komputasi untuk efisiensi penggunaan perangkat dan jadwal.',
    category:'Education', year:2018, tags:['Lab','Digital','Education'], icon:'🔬', accentColor:'#0EA5A0' },
  { id:'p027', name:'AkademiX', originalName:'STMIK 2019',
    description:'Sistem informasi akademik kampus untuk pengelolaan data mahasiswa, nilai, dan jadwal perkuliahan.',
    category:'Education', year:2019, tags:['Academic','System','Web'], icon:'📚', accentColor:'#1E5AA8' },
  { id:'p028', name:'FIKOM Portal', originalName:'FIKOM Universitas Pancasila',
    description:'Portal resmi Fakultas Ilmu Komunikasi Universitas Pancasila untuk informasi akademik dan kemahasiswaan.',
    category:'Education', year:2020, tags:['University','Faculty','Web'], icon:'🎓', accentColor:'#D4A843' },
  { id:'p029', name:'SchoolHub', originalName:'SMAN 8 Pontianak',
    description:'Website sekolah lengkap dengan profil, berita, pengumuman, dan portal informasi siswa SMAN 8 Pontianak.',
    category:'Education', year:2016, tags:['School','Web','Information'], icon:'🏫', accentColor:'#5B9AF5' },
  { id:'p030', name:'HealthServ', originalName:'Aplikasi Pelayanan Puskesmas',
    description:'Sistem antrian dan pelayanan digital puskesmas untuk meningkatkan efisiensi layanan kesehatan masyarakat.',
    category:'Education', year:2014, tags:['Healthcare','Public Service','Web'], icon:'🏥', accentColor:'#0EA5A0' },

  // Web Development
  { id:'p031', name:'DinoArla.com', originalName:'DinoArla.com',
    description:'Website personal branding CEO AIT Group sebagai portofolio profesional dan media thought leadership.',
    category:'Web Development', year:2018, tags:['Personal Brand','Portfolio'], icon:'🚀', accentColor:'#1E5AA8' },
  { id:'p032', name:'AlfathTeknik', originalName:'CV Alfath Teknik Lestari',
    description:'Website company profile CV Alfath Teknik Lestari menampilkan layanan, proyek, dan profil perusahaan.',
    category:'Web Development', year:2017, tags:['Company Profile','Engineering'], icon:'🔧', accentColor:'#5B9AF5' },
  { id:'p033', name:'Cetta Wellness', originalName:'Cetta Mom and Baby Spa',
    description:'Landing page elegan untuk layanan spa ibu dan bayi dengan sistem booking online terintegrasi.',
    category:'Web Development', year:2021, tags:['Beauty','Wellness','Landing Page'], icon:'🌸', accentColor:'#D4A843' },
  { id:'p034', name:'RasaRasa', originalName:'Restaurant Rasarasa Jakarta',
    description:'Website restaurant premium Jakarta dengan menu interaktif, reservasi online, dan cerita brand kuliner.',
    category:'Web Development', year:2022, tags:['F&B','Restaurant','Web'], icon:'🍽️', accentColor:'#D4A843' },
  { id:'p035', name:'Hi-Teq Studio', originalName:'Inovasi Hi-Teq',
    description:'Website company profile studio teknologi inovasi dengan portofolio dan showcase produk digital.',
    category:'Web Development', year:2020, tags:['Tech','Company Profile'], icon:'💡', accentColor:'#0EA5A0' },
  { id:'p036', name:'Monohara', originalName:'Monohara',
    description:'Website brand minimalis dengan identitas visual kuat, menggabungkan storytelling dan estetika modern.',
    category:'Web Development', year:2023, tags:['Brand','Web','Design'], icon:'⬛', accentColor:'#5B9AF5' },
  { id:'p037', name:'Popeye', originalName:'Popeye',
    description:'Landing page brand lokal dengan desain yang kuat dan alur konversi yang dioptimalkan.',
    category:'Web Development', year:2019, tags:['Brand','Web','Landing Page'], icon:'💪', accentColor:'#1E5AA8' },
  { id:'p038', name:'Mousa Studio', originalName:'Mousa',
    description:'Website studio kreatif dengan galeri karya interaktif dan form inquiry klien yang terintegrasi.',
    category:'Web Development', year:2021, tags:['Web','Design','Brand'], icon:'🎨', accentColor:'#D4A843' },
  { id:'p039', name:'Poniran', originalName:'Poniran',
    description:'Website bisnis lokal dengan informasi produk, lokasi, dan kontak untuk meningkatkan jangkauan digital.',
    category:'Web Development', year:2016, tags:['Web','Local Business'], icon:'🏠', accentColor:'#0EA5A0' },
  { id:'p040', name:'SixteenSport', originalName:'Sixteen Sport',
    description:'Platform olahraga online yang menggabungkan katalog produk dan konten komunitas sport.',
    category:'Web Development', year:2020, tags:['Sport','E-Commerce','Web'], icon:'⚽', accentColor:'#1E5AA8' },
  { id:'p041', name:'BuildCraft', originalName:'Web Konstruksi Landing Page dan CMS',
    description:'Landing page dan CMS untuk perusahaan konstruksi, memudahkan pengelolaan konten dan prospek klien.',
    category:'Web Development', year:2018, tags:['Construction','CMS','Landing Page'], icon:'🏗️', accentColor:'#5B9AF5' },
  { id:'p042', name:'DesaConnect', originalName:'Web Desa CRUD',
    description:'Sistem informasi desa berbasis web untuk pengelolaan data kependudukan dan layanan administratif warga.',
    category:'Web Development', year:2015, tags:['Village','Government','Web'], icon:'🌾', accentColor:'#4ade80' },
  { id:'p043', name:'SIMPEL', originalName:'Template Online SAP',
    description:'Template sistem informasi online yang disederhanakan untuk integrasi proses bisnis berbasis SAP.',
    category:'Web Development', year:2017, tags:['SAP','Template','Enterprise'], icon:'🔲', accentColor:'#1E5AA8' },

  // E-Commerce
  { id:'p044', name:'Loobee', originalName:'Loobee E-Commerce',
    description:'Platform marketplace multi-kategori dengan fitur manajemen toko, pembayaran digital, dan ulasan produk.',
    category:'E-Commerce', year:2020, tags:['E-Commerce','Marketplace'], icon:'🛒', accentColor:'#D4A843' },
  { id:'p045', name:'VintageVault', originalName:'Vintage Second Brand Shop',
    description:'Toko online fashion thrift dengan katalog produk second-hand berkualitas dan sistem kurasi brand.',
    category:'E-Commerce', year:2018, tags:['Thrift','Fashion','E-Commerce'], icon:'👗', accentColor:'#0EA5A0' },
  { id:'p046', name:'La Collection', originalName:'Butik La Collection Sintang',
    description:'Toko butik fashion online dengan koleksi premium, fitur lookbook, dan pemesanan WhatsApp terintegrasi.',
    category:'E-Commerce', year:2016, tags:['Fashion','Boutique','E-Commerce'], icon:'👘', accentColor:'#D4A843' },
  { id:'p047', name:'RentEase', originalName:'Aplikasi Penyewaan',
    description:'Platform penyewaan barang dengan sistem booking, kalender ketersediaan, dan manajemen transaksi.',
    category:'E-Commerce', year:2015, tags:['Rental','Marketplace','Web'], icon:'🔑', accentColor:'#5B9AF5' },
  { id:'p048', name:'KueCraft', originalName:'Web Penjualan Kue Kering',
    description:'Website penjualan kue kering homemade dengan katalog produk, paket hamper, dan sistem pre-order.',
    category:'E-Commerce', year:2014, tags:['F&B','Sales','Web'], icon:'🍪', accentColor:'#D4A843' },
  { id:'p049', name:'Zoule Store', originalName:'Zoule Store',
    description:'Toko retail online dengan manajemen stok real-time, checkout cepat, dan integrasi ekspedisi pengiriman.',
    category:'E-Commerce', year:2022, tags:['Store','E-Commerce','Retail'], icon:'🏪', accentColor:'#1E5AA8' },
  { id:'p050', name:'TX-Cent', originalName:'TX-Cent',
    description:'Platform transaksi digital dengan sistem point reward, riwayat pembelian, dan manajemen akun pengguna.',
    category:'E-Commerce', year:2021, tags:['Commerce','Platform','Digital'], icon:'💳', accentColor:'#0EA5A0' },

  // Finance & Accounting
  { id:'p051', name:'FinTrack CA', originalName:'Aplikasi Keuangan PT Citra Askara',
    description:'Sistem keuangan enterprise untuk pengelolaan arus kas, laporan keuangan, dan rekonsiliasi akun perusahaan.',
    category:'Finance & Accounting', year:2020, tags:['Finance','Accounting','Enterprise'], icon:'💰', accentColor:'#D4A843' },
  { id:'p052', name:'Alkali', originalName:'Alkali Finance',
    description:'Aplikasi pencatatan keuangan sederhana namun powerful untuk UMKM dengan laporan laba-rugi otomatis.',
    category:'Finance & Accounting', year:2018, tags:['Finance','System','Web'], icon:'⚗️', accentColor:'#5B9AF5' },
  { id:'p053', name:'ADAMP', originalName:'ADAMP',
    description:'Sistem administrasi dan manajemen pengeluaran perusahaan dengan approval workflow dan audit trail.',
    category:'Finance & Accounting', year:2013, tags:['Finance','Management','System'], icon:'📊', accentColor:'#1E5AA8' },
  { id:'p054', name:'PX-Cent', originalName:'PX-Cent',
    description:'Sistem pembayaran digital dengan manajemen tagihan, notifikasi otomatis, dan rekap transaksi harian.',
    category:'Finance & Accounting', year:2021, tags:['Payment','Finance','Digital'], icon:'💎', accentColor:'#0EA5A0' },

  // Mobile & App
  { id:'p055', name:'MedVault', originalName:'Aplikasi Rekam Medis DES',
    description:'Aplikasi rekam medis digital terenkripsi menggunakan algoritma DES untuk keamanan data pasien.',
    category:'Mobile & App', year:2015, tags:['Medical','Security','Algorithm'], icon:'🏥', accentColor:'#1E5AA8' },
  { id:'p056', name:'BeeTeach', originalName:'Base64 BeeTeach Valley',
    description:'Platform edukasi interaktif dengan sistem encoding Base64 untuk distribusi konten pembelajaran digital.',
    category:'Mobile & App', year:2017, tags:['Education','App','Encoding'], icon:'🐝', accentColor:'#D4A843' },
  { id:'p057', name:'MikroKit', originalName:'Bundling Tutorial Mikrotik',
    description:'Paket tutorial jaringan Mikrotik lengkap dengan modul interaktif dan halaman login yang dapat dikustomisasi.',
    category:'Mobile & App', year:2014, tags:['Network','Mikrotik','Tutorial'], icon:'📡', accentColor:'#5B9AF5' },
  { id:'p058', name:'NetGate Login', originalName:'Login Page Mikrotik',
    description:'Template halaman login Mikrotik yang modern dan responsif dengan branding kustom untuk hotspot.',
    category:'Mobile & App', year:2013, tags:['Network','Mikrotik','UI'], icon:'🔐', accentColor:'#0EA5A0' },

  // Internal Product
  { id:'p059', name:'AIT CMS Core', originalName:'CMS Internal AIT',
    description:'Content management system proprietary AIT Group untuk mengelola konten seluruh platform digital secara terpusat.',
    category:'Internal Product', year:2022, tags:['CMS','Internal','Platform'], icon:'⚡', accentColor:'#1E5AA8' },
  { id:'p060', name:'MumaBila', originalName:'MumaBila F&B Platform',
    description:'Brand kuliner lokal Pontianak dengan platform pemesanan digital dan sistem manajemen franchise berbasis data.',
    category:'Internal Product', year:2022, tags:['F&B','Brand','Platform'], icon:'🍜', accentColor:'#D4A843' },
] as const;

export interface TrustedClient {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly sector: string;
  readonly color: string;
}

export const TRUSTED_CLIENTS: ReadonlyArray<TrustedClient> = [
  { id:'c001', name:'PLN (Perusahaan Listrik Negara)', shortName:'PLN', sector:'Energy', color:'#1E5AA8' },
  { id:'c002', name:'BASARNAS', shortName:'BASARNAS', sector:'Government', color:'#0EA5A0' },
  { id:'c003', name:'Dekranasda Bengkayang', shortName:'Dekranasda', sector:'Government', color:'#D4A843' },
  { id:'c004', name:'Universitas Tanjungpura', shortName:'UNTAN', sector:'Education', color:'#1E5AA8' },
  { id:'c005', name:'STMIK Pontianak', shortName:'STMIK', sector:'Education', color:'#0EA5A0' },
  { id:'c006', name:'Universitas Pancasila', shortName:'Univ. Pancasila', sector:'Education', color:'#5B9AF5' },
  { id:'c007', name:'STT PLN', shortName:'STT PLN', sector:'Education', color:'#1E5AA8' },
  { id:'c008', name:'PT Citra Askara Estetika', shortName:'CA Estetika', sector:'Beauty', color:'#D4A843' },
  { id:'c009', name:'Restaurant Rasarasa Jakarta', shortName:'Rasarasa', sector:'F&B', color:'#0EA5A0' },
  { id:'c010', name:'SMAN 8 Pontianak', shortName:'SMAN 8', sector:'Education', color:'#5B9AF5' },
  { id:'c011', name:'Loobee E-Commerce', shortName:'Loobee', sector:'Commerce', color:'#D4A843' },
  { id:'c012', name:'Inovasi Hi-Teq', shortName:'Hi-Teq', sector:'Technology', color:'#0EA5A0' },
] as const;
