# 🕌 Laman Web Rasmi Musolla Al-Widad Kita Sejati

Selamat datang ke repositori rasmi laman web **Musolla Al-Widad Kita Sejati** (**Pangsapuri Kita Sejati Cybersouth**, Dengkil, Selangor).

Laman web ini direka khusus dengan tema mesra komuniti (*homey and community vibe*) yang tenang, hangat dan menyatu, berteraskan identiti visual logo rasmi musolla (*Mosque Deep Teal*, *Warm Amber*, dan *Crescent Gold*). Laman ini berfungsi sebagai portal sehenti bagi pendaftaran Khairat Kematian bersama Masjid Al-Ilmi Dengkil, semakan penyata kewangan telus mengikut tahun, infaq operasi dan naik taraf fasiliti, takwim kuliah, serta saluran aduan & cadangan penduduk.

---

## 📋 Isi Kandungan

1. [Ciri-Ciri Utama & Identiti Komuniti](#-ciri-ciri-utama--identiti-komuniti)
2. [Maklumat Asas & Lokasi Pangsapuri](#-maklumat-asas--lokasi-pangsapuri)
3. [Struktur Direktori Projek](#-struktur-direktori-projek)
4. [Panduan Ujian Tempatan (Local Testing)](#-panduan-ujian-tempatan-local-testing)
5. [Panduan Menyunting & Menyelenggara Kandungan](#-panduan-menyunting--menyelenggara-kandungan)
   - [A. Mengemaskini & Menambah Akaun Media Sosial (`site.config.json`)](#a-mengemaskini--menambah-akaun-media-sosial-siteconfigjson)
   - [B. Mengemaskini Fail Perlembagaan Musolla PDF (`assets/perlembagaan/`)](#b-mengemaskini-fail-perlembagaan-musolla-pdf-assetsperlembagaan)
   - [C. Menambah Penyata Kewangan Mengikut Tahun & Pagination (`data/reports.json`)](#c-menambah-penyata-kewangan-mengikut-tahun--pagination-datareportsjson)
   - [D. Mengemaskini Takwim Aktiviti / Mengosongkan Senarai (`data/activities.json`)](#d-mengemaskini-takwim-aktiviti--mengosongkan-senarai-dataactivitiesjson)
   - [E. Menyunting Carta Organisasi (`data/organisasi.json`)](#e-menyunting-carta-organisasi-dataorganisasijson)
   - [F. Menukar Maklumat Hubungan & Pautan Luar (`site.config.json`)](#f-menukar-maklumat-hubungan--pautan-luar-siteconfigjson)
   - [G. Menukar Logo & Favicon (Nisbah 1:1)](#g-menukar-logo--favicon-nisbah-11)
   - [H. Mengemaskini Teks & Dwi-Bahasa i18n (`lang/`)](#h-mengemaskini-teks--dwi-bahasa-i18n-lang)
   - [I. Mengemaskini Pengumuman & Hebahan Semasa (`data/announcements.json`)](#i-mengemaskini-pengumuman--hebahan-semasa-dataannouncementsjson)
6. [Panduan Deployment ke Cloudflare Pages](#-panduan-deployment-ke-cloudflare-pages)
7. [Kredit, Hak Cipta & Sumber Terbuka](#-kredit-hak-cipta--sumber-terbuka)

---

## ✨ Ciri-Ciri Utama & Identiti Komuniti

- **Suasana Hangat Komuniti (*Homey & Welcoming*)**: Latar belakang krim lembut (*warm linen / milky tone* `#f6f4ef` & kad `#faf8f5`) yang tidak menyilaukan mata berbanding warna putih tulen (#ffffff).
- **Identiti Warna Berasaskan Logo**:
  - *Primary Teal* (`#116876` / `#21b8cc`): Melambangkan kedamaian rohani dan masjid.
  - *Secondary Amber* (`#eb7713` / `#f68928`): Melambangkan kemesraan ukhuwah dan kejiranan.
  - *Accent Gold* (`#f1a91e` / `#f5b72e`): Melambangkan keberkatan dan syiar Islam.
- **Nisbah Logo Tetap 1:1**: Dipelihara pada semua peranti (`logo-sq`).
- **Sokongan Dwi-Bahasa (i18n)**: Bahasa Melayu (Lalai) dan Bahasa Inggeris di dalam folder `lang/`.
- **Mod Cerah Lembut Lalai (Default) & Mod Gelap Pejal**:
  - Laman dimuatkan secara automatik dalam **Mod Cerah Lembut** (*milky ivory*).
  - Pilihan butang togol membolehkan jemaah beralih ke **Mod Gelap Pejal** (*solid comfortable dark mode* `#101c23`) yang tenang tanpa sebarang corak bintik (*dotted pattern*) yang memenatkan mata.
- **Hebahan & Pengumuman Dwi-Bahasa Pintar (`data/announcements.json`)**:
  - Konfigurasi khusus dwi-bahasa (BM & EN) dalam satu fail berpusat.
  - Sekiranya senarai pengumuman kosong atau semua pengumuman tidak aktif, keseluruhan seksyen pengumuman akan disembunyikan secara automatik tanpa mencacatkan susun atur.
- **Navigasi Modal Mesra Telefon & Papan Kekunci**:
  - Modal PDF dan Kredit boleh ditutup dengan menekan kekunci **ESC** di komputer.
  - Pada telefon pintar (Android / iOS), menekan butang **Back** atau *swipe gesture* akan menutup modal secara lancar tanpa keluar dari laman web.
- **Khairat Kematian Masjid Al-Ilmi**: Pautan terus ke portal rasmi: [https://www.e-khairat.com/al-ilmi](https://www.e-khairat.com/al-ilmi).
- **Pengurusan Penyata Kewangan Mengikut Tahun & Pagination**:
  - Fail PDF disusun di dalam folder tahunan (contoh: `assets/reports/2026/`, `assets/reports/2025/`).
  - Pemilihan tahun interaktif dan kawalan pagination (5 penyata setiap halaman).
- **Perlembagaan Musolla Tersendiri**: Fail PDF berasingan di `assets/perlembagaan/perlembagaan-musolla-al-widad.pdf` dengan pratonton terbina dalam dan butang muat turun.
- **Infaq & Sumbangan Terperinci**:
  - Butang 1-klik salin no akaun Bank Islam (`12038010098765`) berserta notifikasi toast.
  - Kod QR DuitNow kemas tanpa lencana nisbah teknikal.
  - Pecahan penyaluran dana merangkumi: *Utiliti & Bil (Jika Diperlukan)*, *Naik Taraf & Fasiliti Musolla*, *Program Dakwah*, *Aktiviti Komuniti*, dan *Pembersihan Persekitaran*.
- **Media Sosial Fleksibel**: Boleh menambah atau membuang platform media sosial baharu (Facebook, Instagram, TikTok, YouTube, Telegram, WhatsApp) hanya melalui `site.config.json`.
- **Aktiviti Responsif**: Sekiranya tiada aktiviti dijadualkan, seksyen memaparkan mesej komuniti yang mesra tanpa mencacatkan susun atur.
- **Pautan Kredit, Sumber Terbuka (MIT) & Notis PDPA**: Modal menyenaraikan pustaka sumber terbuka serta perlindungan data peribadi AJK di bawah Akta Perlindungan Data Peribadi 2010.

---

## 📍 Maklumat Asas & Lokasi Pangsapuri

- **Nama Organisasi**: Musolla Al-Widad, Pangsapuri Kita Sejati Cybersouth
- **Alamat Penuh**:
  ```text
  Musolla Al-Widad, Pangsapuri Kita Sejati Cybersouth,
  Persiaran Cybersouth Perdana, Cybersouth,
  43800 Dengkil, Selangor Darul Ehsan
  ```
- **Koordinat Peta Google**: `2.876102, 101.646251`
- **Pautan Navigasi**: [https://www.google.com/maps?q=2.876102,101.646251](https://www.google.com/maps?q=2.876102,101.646251)
- **Emel Rasmi**: `alwidad.kitasejati@gmail.com`

---

## 📁 Struktur Direktori Projek

```text
musolla-al-widad-website/
├── assets/
│   ├── logo.png                  # Logo rasmi Musolla Al-Widad (1024x1024, 1:1)
│   ├── duitnow-qr.svg            # Kod QR DuitNow (1:1)
│   ├── avatars/                  # Avatar jawatankuasa (1:1)
│   ├── activities/               # Poster kuliah & gotong-royong
│   ├── perlembagaan/             # Fail PDF Perlembagaan Musolla
│   │   └── perlembagaan-musolla-al-widad.pdf
│   └── reports/                  # Penyata kewangan mengikut tahun
│       ├── 2026/                 # Laporan tahun 2026
│       │   ├── penyata-kewangan-2026-09.pdf
│       │   └── ...
│       └── 2025/                 # Laporan tahun 2025
│           └── penyata-kewangan-tahunan-2025.pdf
├── css/
│   └── style.css                 # Tema hangat komuniti & token Shadcn UI (Solid Colors)
├── data/
│   ├── announcements.json        # Pengumuman dwi-bahasa (Auto-hide jika kosong)
│   ├── organisasi.json           # Senarai ahli jawatankuasa
│   ├── activities.json           # Takwim aktiviti & pengajian
│   └── reports.json              # Indeks fail penyata kewangan & tahun
├── lang/
│   ├── ms.json                   # Terjemahan Bahasa Melayu (Lalai)
│   └── en.json                   # Terjemahan English
├── js/
│   ├── theme.js                  # Mod tema (Mod Cerah Lembut Lalai -> Gelap Pejal)
│   ├── i18n.js                   # Enjin penterjemahan dwi-bahasa
│   └── app.js                    # Logik carousel, pagination, modal & sosial
├── scripts/
│   ├── build.js                  # Skrip pembinaan untuk Cloudflare Pages
│   ├── generate-sample-pdfs.js   # Skrip penjana PDF contoh
│   └── test-server.js            # Ujian automatik 14 laluan pelayan
├── site.config.json              # Konfigurasi media sosial, no telefon & pautan
├── server.js                     # Pelayan ujian tempatan (Zero Dependencies)
├── index.html                    # Laman web utama
├── LICENSE                       # Lesen MIT & Notis PDPA Malaysia
├── package.json                  # Konfigurasi npm
└── README.md                     # Dokumentasi projek
```

---

## 💻 Panduan Ujian Tempatan (Local Testing)

Anda boleh menguji laman web secara terus di komputer anda sebelum menolak kod ke GitHub.

1. Buka terminal di folder projek:
   ```bash
   node server.js
   ```
2. Terminal akan memaparkan:
   ```text
   ======================================================
   🕌 Laman Web Musolla Al-Widad Kita Sejati Berjalan!
   🌐 Buka di pelayar web: http://localhost:3000
   ======================================================
   ```
3. Buka pelayar web dan akses: `http://localhost:3000`

---

## 🛠️ Panduan Menyunting & Menyelenggara Kandungan

### A. Mengemaskini & Menambah Akaun Media Sosial (`site.config.json`)

Pihak musolla boleh menambah atau memadam sebarang akaun media sosial (Facebook, Instagram, TikTok, YouTube, Telegram, WhatsApp) dengan menyunting senarai `socialMedia` dalam [`site.config.json`](site.config.json):

```json
"socialMedia": [
  {
    "id": "facebook",
    "name": "Facebook",
    "url": "https://www.facebook.com/alwidad.kitasejati",
    "handle": "@alwidad.kitasejati",
    "descMs": "Siaran langsung kuliah, album foto aktiviti & hebahan harian.",
    "descEn": "Live streams, photo albums & daily community notices.",
    "icon": "facebook"
  },
  {
    "id": "tiktok",
    "name": "TikTok",
    "url": "https://www.tiktok.com/@alwidad.kitasejati",
    "handle": "@alwidad.kitasejati",
    "descMs": "Klip video pendek pengajian & tazkirah santai.",
    "descEn": "Short religious snippets & reminders.",
    "icon": "tiktok"
  },
  {
    "id": "youtube",
    "name": "YouTube",
    "url": "https://www.youtube.com/@alwidad.kitasejati",
    "handle": "Musolla Al-Widad",
    "descMs": "Arkib rakaman penuh kuliah maghrib dan tazkirah khas.",
    "descEn": "Full lecture recordings and archives.",
    "icon": "youtube"
  }
]
```
Ikon dan pautan pada **Footer** serta kad pautan pada bahagian **Aktiviti & Berita** akan dikemaskini secara automatik!

---

### B. Mengemaskini Fail Perlembagaan Musolla PDF (`assets/perlembagaan/`)

Perlembagaan musolla disimpan secara berasingan untuk memudahkan pengemaskinian:

1. Sediakan dokumen PDF perlembagaan baharu anda yang telah disahkan.
2. Namakan fail tersebut sebagai `perlembagaan-musolla-al-widad.pdf`.
3. Letakkan atau gantikan fail tersebut di dalam folder:
   ```text
   assets/perlembagaan/perlembagaan-musolla-al-widad.pdf
   ```
4. Salin juga ke folder `public/assets/perlembagaan/perlembagaan-musolla-al-widad.pdf` (jika menggunakan folder public).
5. Secara automatik, paparan iframe dan butang muat turun di tab *Perlembagaan Musolla* akan menggunakan dokumen baharu ini.
*(Sekiranya anda menukar nama fail, kemaskini laluan fail pada kunci `"perlembagaanPdf"` di dalam `site.config.json`).*

---

### C. Menambah Penyata Kewangan Mengikut Tahun & Pagination (`data/reports.json`)

Penyata kewangan kini diasingkan mengikut tahun dan dipaginasikan (5 laporan per halaman):

1. Masukkan fail PDF laporan kewangan di dalam folder tahun berkenaan, contohnya:
   ```text
   assets/reports/2026/penyata-kewangan-2026-10.pdf
   ```
   *(Bagi tahun baharu seperti 2027, cipta folder `assets/reports/2027/`).*
2. Buka fail [`data/reports.json`](data/reports.json) dan daftarkan laporan tersebut:
   ```json
   {
     "years": ["2026", "2025"],
     "reports": [
       {
         "id": "2026-10",
         "year": "2026",
         "period": "Oktober 2026",
         "title": "Penyata Kewangan Bulanan - Oktober 2026",
         "type": "Bulanan",
         "status": "Diaudit & Disahkan",
         "file": "assets/reports/2026/penyata-kewangan-2026-10.pdf"
       }
     ]
   }
   ```
Laman web akan menguruskan pemilihan tahun, penapisan laporan, dan pagination 5 fail per halaman secara automatik!

---

### D. Mengemaskini Takwim Aktiviti / Mengosongkan Senarai (`data/activities.json`)

- Buka [`data/activities.json`](data/activities.json) untuk menambah aktiviti baharu mengikut kategori (`lectures`, `community`, `youth`).
- **Sekiranya tiada aktiviti yang dijadualkan**: Kosongkan senarai menjadi `[]`. Laman web akan secara automatik menyembunyikan butang penapis dan memaparkan mesej mesra:
  *"Tiada aktiviti dijadualkan pada masa ini. Nantikan hebahan seterusnya daripada pihak jawatankuasa."*

---

### E. Menyunting Carta Organisasi (`data/organisasi.json`)

Buka [`data/organisasi.json`](data/organisasi.json) untuk mengemaskini nama, jawatan atau nombor WhatsApp ahli jawatankuasa. Anda boleh meletakkan foto sebenar ahli (nisbah 1:1) di `assets/avatars/`.

---

### F. Menukar Maklumat Hubungan & Pautan Luar (`site.config.json`)

- **Borang Google Form Aduan**: Sunting `urls.googleFormFeedback`.
- **Pautan Khairat**: `urls.khairatMasjidAlIlmi` (lalai: `https://www.e-khairat.com/al-ilmi`).
- **Nombor Telefon Pengerusi & Setiausaha**: Sunting di bahagian `contacts`.

---

### G. Menukar Logo & Favicon (Nisbah 1:1)

Gantikan fail `assets/logo.png` dengan logo baharu anda. Pastikan imej mempunyai nisbah segi empat sama tepat (1:1, contoh: 1024x1024 piksel).

---

### H. Mengemaskini Teks & Dwi-Bahasa i18n (`lang/`)

- [`lang/ms.json`](lang/ms.json) untuk teks Bahasa Melayu.
- [`lang/en.json`](lang/en.json) untuk teks Bahasa Inggeris.

---

### I. Mengemaskini Pengumuman & Hebahan Semasa (`data/announcements.json`)

Hebahan dan pengumuman dipusatkan di dalam fail [`data/announcements.json`](data/announcements.json). Setiap pengumuman menyokong teks Bahasa Melayu dan Bahasa Inggeris secara serentak:

```json
[
  {
    "id": 1,
    "active": true,
    "tagMs": "Khairat Kematian",
    "tagEn": "Funeral Welfare Fund",
    "dateMs": "Terkini",
    "dateEn": "Latest",
    "titleMs": "Pendaftaran Program Khairat Kematian Bersama Masjid Al-Ilmi Dengkil",
    "titleEn": "Funeral Fund Registration with Masjid Al-Ilmi Dengkil",
    "descMs": "Musolla Al-Widad kini bernaung secara rasmi di bawah program e-Khairat Masjid Al-Ilmi Dengkil...",
    "descEn": "Musolla Al-Widad is officially partnered under the e-Khairat program of Masjid Al-Ilmi Dengkil...",
    "link": "https://www.e-khairat.com/al-ilmi",
    "buttonMs": "Daftar di Portal e-Khairat",
    "buttonEn": "Register at e-Khairat Portal",
    "isExternal": true
  }
]
```

**Petua Penting:**
1. **Sembunyikan Pengumuman Tertentu**: Tukar `"active": false` untuk mematikan paparan pengumuman tersebut tanpa perlu memadam datanya.
2. **Sembunyikan Keseluruhan Seksyen**: Sekiranya tiada sebarang hebahan aktif atau senarai dikosongkan (`[]`), seksyen Pengumuman & Hebahan Semasa pada laman web akan **disembunyikan secara automatik** (*gracefully hidden*) tanpa merosakkan susun atur laman web!
3. **Pautan Luar vs Pautan Dalaman**:
   - Jika pautan menuju ke laman luar (seperti portal e-Khairat), tetapkan `"isExternal": true` (dibuka di tab baharu).
   - Jika pautan merujuk ke seksyen laman web (seperti `"#sumbangan"` atau `"#hubungi"`), tetapkan `"isExternal": false`.

---

## 🚀 Panduan Deployment ke Cloudflare Pages

### Kaedah A: Sambungan Automatik melalui GitHub (Disyorkan)

1. Tolak kod terkini ke GitHub:
   ```bash
   git add .
   git commit -m "feat: kemaskini tema komuniti, kapasiti dan perlembagaan"
   git push origin main
   ```
2. Di papan pemuka **Cloudflare Pages**:
   - Pilih **Create application** > **Pages** > **Connect to Git**.
   - Pilih repositori `musolla-al-widad-website`.
   - **Framework preset**: `None`
   - **Build command**: `node scripts/build.js`
   - **Build output directory**: `dist`
3. Klik **Save and Deploy**. Laman web akan beroperasi serta-merta dengan SSL percuma!

---

## 📜 Kredit, Hak Cipta & Sumber Terbuka

Laman web ini adalah projek **sumber terbuka (Open Source)** yang dilesenkan di bawah [Lesen MIT (MIT License)](LICENSE).

### Notis Akta Perlindungan Data Peribadi 2010 (PDPA)
Walaupun keseluruhan kod sumber web ini adalah sumber terbuka di bawah Lesen MIT, sebarang data dan maklumat peribadi barisan ahli jawatankuasa pentadbiran—termasuk nombor telefon bimbit, alamat emel dan foto—adalah dilindungi di bawah **Akta Perlindungan Data Peribadi 2010 (Akta 709 / PDPA Malaysia)**. Sebarang penggunaan untuk tujuan komersial, pemasaran tanpa kebenaran, spam atau pengiklanan adalah dilarang sama sekali.

### Komponen Sumber Terbuka
Laman web ini dibina menggunakan komponen berkualiti tinggi:
- **Tailwind CSS** (MIT License)
- **Shadcn UI Design System** (MIT License)
- **Plus Jakarta Sans** (SIL Open Font License 1.1) oleh Tokotype
- **Amiri Calligraphy Arabic Font** (SIL Open Font License 1.1) oleh Khaled Hosny
- **Lucide Icons** (ISC / MIT License)

**Penjanaan & Senibina Laman Web:**
Laman web ini dijana menggunakan **Google Gemini** dan **Google Antigravity** dengan arahan (*prompt*) daripada **Hanis Irfan**.

*Sebarang cadangan penambahbaikan, komen atau aduan berkaitan laman web ini amat dialu-alukan melalui borang maklum balas rasmi musolla.*
