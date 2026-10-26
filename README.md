# 🕌 Templat Laman Web Rasmi Masjid & Musolla Moden
### Modern Mosque & Musolla Landing Page Template (Cloudflare Pages Ready)

Selamat datang ke repositori rasmi **Templat Laman Web Masjid & Musolla Moden** (pelaksanaan rujukan: **Musolla Al-Widad Kita Sejati**, Cybersouth, Dengkil, Selangor).

Templat ini direka khusus untuk mana-mana jawatankuasa masjid, musolla, surau atau pusat komuniti Islam yang menginginkan portal rasmi yang anggun, pantas, telus dan mudah diselenggara. Dibina dengan seni bina **Zero Runtime Dependencies** (HTML5, Tailwind CSS, Shadcn UI Design System, dan JavaScript tulen), laman web ini boleh dihoskan secara **percuma di Cloudflare Pages** tanpa memerlukan pangkalan data (*database-free*) mahupun pelayan berbayar.

---

## 📋 Isi Kandungan

1. [Ciri-Ciri Utama & Keistimewaan Templat](#-ciri-ciri-utama--keistimewaan-templat)
2. [Sistem Blog Markdown Tanpa Kompilasi Terminal](#-sistem-blog-markdown-tanpa-kompilasi-terminal)
3. [Penyesuaian Tema Warna (Mod Cerah & Mod Gelap)](#-penyesuaian-tema-warna-mod-cerah--mod-gelap)
4. [Strategi Pemeliharaan Fail & Konfigurasi (Persistence Architecture)](#-strategi-pemeliharaan-fail--konfigurasi-persistence-architecture)
5. [Struktur Direktori Projek](#-struktur-direktori-projek)
6. [Panduan Ujian Tempatan (Local Testing)](#-panduan-ujian-tempatan-local-testing)
7. [Panduan Menyunting & Menyelenggara Kandungan](#-panduan-menyunting--menyelenggara-kandungan)
8. [Utiliti Kemaskini Templat (`npm run template:*`)](#-utiliti-kemaskini-templat-npm-run-template)
9. [Panduan Deployment ke Cloudflare Pages](#-panduan-deployment-ke-cloudflare-pages)
10. [Lesen & Sumber Terbuka (MIT License)](#-lesen--sumber-terbuka-mit-license)

---

## ✨ Ciri-Ciri Utama & Keistimewaan Templat

- **Suasana Hangat Komuniti (*Homey & Welcoming*)**: Latar belakang krim lembut (*warm milky ivory* `#f6f4ef` & kad `#faf8f5`) yang tidak menyilaukan mata berbanding warna putih tulen (#ffffff).
- **Tema Boleh Ubah Suai Penuh (Mod Cerah & Mod Gelap)**:
  - Disokong dengan 4 preset warna masjid: `teal-amber` (Al-Widad), `emerald-gold` (Masjid Klasik), `royal-blue` (Moden Nilam), dan `maroon-gold` (Warisan Uthmaniyyah).
  - Pilihan kod Hex tersuai sepenuhnya bagi kedua-dua mod tanpa memerlukan kompilasi CSS luaran.
  - Mod Gelap Pejal (*solid dark mode*) yang tenang tanpa sebarang corak bintik (*dotted pattern*) yang memenatkan pandangan.
- **Sistem Blog Markdown On-The-Fly**:
  - Admin hanya meletakkan fail `.md` dan imej di dalam folder tarikh `/blog/<year>/<month>/<day>/<post_folder>/`.
  - Halaman blog dipaparkan secara langsung tanpa memerlukan kompilasi terminal.
  - Format tarikh pada paparan HTML diselaraskan mengikut piawaian: `<DD>/<MM>/<YYYY>` (contoh: `26/10/2026`).
- **Pengurusan Fail Kekal Semasa Kemaskini Templat (Persistence Overlay)**:
  - Menyokong folder hamparan `content/`. Fail konfigurasi, logo, PDF perlembagaan, dan penyata kewangan anda terasing daripada kod induk templat, mengelakkan sebarang konflik Git (*merge conflict*) apabila menarik kemaskini templat (*pull upstream*).
- **Penyata Kewangan Mengikut Tahun & Pagination**:
  - Penyata bulanan dan tahunan diasingkan mengikut folder tahunan (`assets/reports/2026/`) dengan kawalan halaman (5 penyata setiap halaman).
- **Infaq & Sumbangan Terperinci**:
  - Butang 1-klik salin no akaun bank dengan notifikasi toast.
  - Kod QR DuitNow kemas nisbah 1:1.
- **Sokongan Dwi-Bahasa (i18n)**: Bahasa Melayu (Lalai) dan Bahasa Inggeris.
- **Pengumuman Pintar Automatik (`data/announcements.json`)**: Seksyen disembunyikan secara automatik sekiranya tiada pengumuman aktif.
- **Navigasi Modal Sejarah Pelayar**: Modal PDF laporan dan kredit mesra kekunci ESC serta butang *Back* telefon pintar.

---

## 📝 Sistem Blog Markdown Tanpa Kompilasi Terminal

Templat ini menyertakan sistem blog ringan berkuasa tinggi. Admin boleh menulis artikel dalam format Markdown ringkas tanpa perlu mempelajari sebarang sintaks rumit.

### 1. Struktur Direktori Pos

Admin hanya perlu menambah fail mengikut struktur direktori tarikh:

```text
/blog/<year>/<month>/<day>/<post_folder>/<markdown_file_and_other_files>
```

**Contoh:**
```text
blog/
└── 2026/
    └── 10/
        └── 26/
            └── pelancaran-portal-rasmi-masjid/
                ├── post.md          # Kandungan artikel (Markdown)
                └── banner.svg       # Poster atau imej berkaitan
```

### 2. Format Tarikh Piawai Pada Halaman: `<DD>/<MM>/<YYYY>`
Matematik folder tarikh `<year>/<month>/<day>` (`2026/10/26`) ditukar secara automatik oleh enjin blog kepada format paparan:
```html
<time class="blog-badge-date">26/10/2026</time>
```

### 3. Contoh Kandungan `post.md`

```markdown
---
title: "Majlis Sambutan Maulidur Rasul & Tazkirah Khas"
author: "Biro Dakwah & Tarbiah"
category: "Kuliah"
summary: "Jemputan kepada seluruh jemaah kariah hadir mengimarahkan majlis sambutan Maulidur Rasul 1448H."
cover: "banner.svg"
tags: [kuliah, maulidur-rasul, dakwah]
---

# Majlis Sambutan Maulidur Rasul & Tazkirah Khas

Segala puji bagi Allah SWT. Selawat dan salam ke atas junjungan besar Nabi Muhammad SAW.

![Poster Majlis](banner.svg)

## Atur Cara Majlis

- **6:45 Petang**: Ketibaan kariah & solat Maghrib berjemaah.
- **7:30 Malam**: Tazkirah Khas Sirah Nabawiyyah.
- **8:15 Malam**: Solat Isyak & jamuan ukhuwah.
```

### 4. Paparan Langsung Tanpa Terminal
- **Ujian Tempatan (`node server.js`)**: Pelayan pembangunan secara automatik mengimbas direktori `/blog/` secara langsung (*on-the-fly*). Sebaik sahaja anda menyimpan fail `.md`, ia boleh terus diakses di pelayar web.
- **Cloudflare Pages**: Apabila anda menolak (*push*) ke GitHub, skrip pembinaan secara automatik membina indeks artikel di `blog/posts.json`.

---

## 🎨 Penyesuaian Tema Warna (Mod Cerah & Mod Gelap)

Buka fail [`site.config.json`](site.config.json) dan tetapkan tema pilihan anda:

### Pilihan Preset Siap Pakai:
1. `"preset": "teal-amber"`: Hijau laut menenangkan & jingga hangat (Lalai / Musolla Al-Widad).
2. `"preset": "emerald-gold"`: Hijau zamrud klasik & emas bulan sabit (Masjid Tradisi).
3. `"preset": "royal-blue"`: Biru nilam & warna pasir hangat (Masjid Moden).
4. `"preset": "maroon-gold"`: Merah hati baldu & emas (Masjid Warisan Uthmaniyyah).

### Tetapan Warna Hex Tersuai Penuh (`custom`):
```json
"theme": {
  "preset": "custom",
  "light": {
    "primary": "#047857",
    "secondary": "#d97706",
    "accent": "#f59e0b",
    "background": "#f5f7f5",
    "card": "#fafbfa",
    "foreground": "#142820",
    "border": "#d7e2d8"
  },
  "dark": {
    "primary": "#10b981",
    "secondary": "#f59e0b",
    "accent": "#fbbf24",
    "background": "#0a1912",
    "card": "#12261d",
    "foreground": "#edf7f1",
    "border": "#244838"
  }
}
```

---

## 🛡️ Strategi Pemeliharaan Fail & Konfigurasi (Persistence Architecture)

Untuk memastikan fail-fail kekal selamat apabila anda menarik kemaskini baharu daripada repositori templat induk (*upstream git*):

### Kaedah A: Hamparan Direktori `content/` (Disyorkan)
Letakkan fail-fail unik masjid anda di dalam folder `content/`:
- `content/site.config.json` -> Menggantikan konfigurasi lalai.
- `content/logo.png` -> Logo rasmi masjid anda.
- `content/duitnow-qr.svg` -> Kod QR DuitNow masjid anda.
- `content/perlembagaan/` -> PDF Perlembagaan masjid.
- `content/reports/` -> Laporan kewangan tahunan.
- `content/data/` -> Fail JSON aktiviti & AJK.

Semasa `node scripts/build.js` dijalankan di Cloudflare Pages, folder `content/` akan dihampar secara automatik mengatasi fail asal templat. Git *pull* tidak akan sesekali menyentuh folder `content/` anda!

### Kaedah B: Utiliti Sinkronisasi Automatik
Templat menyediakan perintah terbina dalam:
```bash
npm run template:backup   # Cipta salinan keselamatan bertarikh di .backup/
npm run template:update   # Gabungkan kemaskini templat dengan tetapan masjid anda
npm run template:verify   # Semak kesahihan konfigurasi & fail
```

---

## 📁 Struktur Direktori Projek

```text
mosque-landing-page-template/
├── assets/                       # Aset grafik, logo & ikon
│   ├── logo.png                  # Logo rasmi masjid (nisbah 1:1)
│   ├── duitnow-qr.svg            # Kod QR DuitNow (nisbah 1:1)
│   ├── perlembagaan/             # Fail PDF Perlembagaan masjid
│   └── reports/                  # Penyata kewangan mengikut tahun (2026/, 2025/)
├── blog/                         # Direktori Sistem Blog Markdown
│   ├── 2026/
│   │   └── 10/
│   │       ├── 26/pelancaran-portal-rasmi-masjid/post.md
│   │       ├── 20/program-kuliah-maghrib-dan-pengajian-kitab/post.md
│   │       └── 15/kempen-kebersihan-gotong-royong-perdana/post.md
│   ├── posts.json                # Indeks artikel blog auto-dijana
│   └── index.html                # Portal & Pembaca Blog On-The-Fly
├── content/                      # (Pilihan) Hamparan fail kekal masjid
├── css/
│   └── style.css                 # Sistem reka bentuk Shadcn UI & tipografi blog
├── data/
│   ├── announcements.json        # Pengumuman dwi-bahasa
│   ├── organisasi.json           # Carta organisasi AJK
│   ├── activities.json           # Takwim pengajian & aktiviti
│   └── reports.json              # Indeks fail penyata kewangan
├── js/
│   ├── theme.js                  # Enjin palet tema (Preset & Custom Hex)
│   ├── blog.js                   # Enjin pemproses Markdown & tarikh on-the-fly
│   ├── i18n.js                   # Enjin penterjemahan dwi-bahasa
│   └── app.js                    # Logik carousel, modal & penjenamaan dinamik
├── lang/
│   ├── ms.json                   # Terjemahan Bahasa Melayu (Lalai)
│   └── en.json                   # Terjemahan English
├── scripts/
│   ├── build.js                  # Skrip pembinaan untuk Cloudflare Pages
│   ├── template-sync.js          # Skrip keselamatan & kemaskini templat
│   └── test-server.js            # Ujian automatik pelayan tempatan
├── site.config.json              # Fail konfigurasi utama masjid
├── site.config.defaults.json     # Rujukan konfigurasi lalai templat
├── server.js                     # Pelayan pembangunan tempatan (Zero Dependencies)
├── index.html                    # Laman web utama
├── TEMPLATE_GUIDE.md             # Panduan terperinci templat
├── LICENSE                       # Lesen Sumber Terbuka MIT Standard
├── package.json                  # Konfigurasi skrip npm
└── README.md                     # Dokumentasi projek
```

---

## 💻 Panduan Ujian Tempatan (Local Testing)

Anda boleh menguji laman web secara terus di komputer anda:

1. Jalankan pelayan pembangunan tempatan:
   ```bash
   node server.js
   # atau jika menggunakan Antigravity:
   agy-node server.js
   ```
2. Buka pelayar web:
   - Laman Utama: `http://localhost:3000`
   - Portal Blog: `http://localhost:3000/blog/`
   - Artikel Ujian: `http://localhost:3000/blog/?post=2026/10/26/pelancaran-portal-rasmi-masjid`

---

## 🚀 Panduan Deployment ke Cloudflare Pages

1. Tolak kod ke repositori GitHub anda:
   ```bash
   git add .
   git commit -m "feat: inisialisasi templat laman web masjid"
   git push origin main
   ```
2. Di papan pemuka **Cloudflare Pages**:
   - Pilih **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Pilih repositori anda.
   - **Framework preset**: `None`
   - **Build command**: `node scripts/build.js`
   - **Build output directory**: `dist`
3. Klik **Save and Deploy**. Laman web anda akan beroperasi secara global dengan sijil SSL percuma!

---

## 📜 Lesen & Sumber Terbuka (MIT License)

Laman web ini adalah projek **sumber terbuka (Open Source)** yang dilesenkan di bawah [Lesen MIT (MIT License)](LICENSE).

```text
MIT License
Copyright (c) 2026 The Project Contributors
```

Anda bebas menggunakan, menyalin, mengubah suai, menggabungkan dan menyesuaikan templat ini untuk mana-mana masjid, surau, musolla atau badan kebajikan tanpa sebarang sekatan ataupun bayaran royalti.

---

*Untuk panduan lengkap langkah demi langkah, sila rujuk [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md).*
