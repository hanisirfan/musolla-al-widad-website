# 🕌 Panduan Templat Laman Web Masjid & Musolla Moden
## Modern Mosque & Surau Landing Page Template Guide

Selamat datang ke panduan rasmi **Templat Laman Web Masjid & Musolla Moden**. Templat ini direka khusus dengan prinsip **Zero Dependencies**, kelajuan tinggi (Jamstack statik), mesra komuniti, serta sedia dihoskan secara percuma di **Cloudflare Pages**.

---

## 📑 Isi Kandungan

1. [Ciri-Ciri Utama Templat](#-ciri-ciri-utama-templat)
2. [Penyesuaian Maklumat Asas & Jenama Masjid](#-penyesuaian-maklumat-asas--jenama-masjid)
3. [Penyesuaian Tema Warna (Mod Cerah & Mod Gelap)](#-penyesuaian-tema-warna-mod-cerah--mod-gelap)
4. [Sistem Blog Markdown Tanpa Kompilasi Terminal](#-sistem-blog-markdown-tanpa-kompilasi-terminal)
5. [Strategi Pemeliharaan Fail & Konfigurasi (Persistence Architecture)](#-strategi-pemeliharaan-fail--konfigurasi-persistence-architecture)
6. [Utiliti Kemaskini Templat (`scripts/template-sync.js`)](#-utiliti-kemaskini-templat-scriptstemplate-syncjs)
7. [Panduan Deployment ke Cloudflare Pages](#-panduan-deployment-ke-cloudflare-pages)
8. [Lesen Sumber Terbuka & Komitmen Privasi](#-lesen-sumber-terbuka--komitmen-privasi)

---

## ✨ Ciri-Ciri Utama Templat

- **Tanpa Kompilasi Rumit (Zero Runtime Dependencies)**: Menggunakan JavaScript tulen yang pantas dan ringan.
- **Sistem Blog Markdown On-The-Fly**: Admin hanya meletakkan fail `.md` dan imej ke dalam folder tarikh, dan sistem memaparkan artikel blog serta-merta tanpa perlu kompilasi di terminal.
- **Format Tarikh Piawai Pada Halaman**: Matematik tarikh dipaparkan secara konsisten sebagai `<DD>/<MM>/<YYYY>` (contoh: `26/10/2026`).
- **Tema Mesra Komuniti & Mod Gelap Pejal**: Latar belakang krim lembut yang selesa di mata pada Mod Cerah, dan mod gelap pejal yang tenang tanpa sebarang corak bintik yang memenatkan.
- **Sistem Preset & Kod Hex Penuh**: Tukar palet warna mengikut warna rasmi masjid anda dengan satu baris tetapan.
- **Pemeliharaan Fail Kekal (Data Persistence)**: Struktur `content/` dan skrip penyegerakan pintar memastikan logo, laporan kewangan, perlembagaan, dan pos blog anda kekal selamat apabila menarik (*pull*) kemaskini terkini daripada templat induk.
- **Dwi-Bahasa (i18n)**: Sokongan Bahasa Melayu dan Bahasa Inggeris terbina dalam.

---

## 🏷️ Penyesuaian Maklumat Asas & Jenama Masjid

Segala maklumat asas dikawal sepenuhnya melalui fail [`site.config.json`](site.config.json) (atau `content/site.config.json`):

```json
{
  "siteName": "Masjid Jamek An-Nur",
  "shortName": "Masjid An-Nur",
  "tagline": "Pusat Ibadah, Tarbiah Ummah & Silaturahim Komuniti",
  "registrationNumber": "JAIS/PDK/03/044/2026",
  "logo": "assets/logo.png",
  "favicon": "assets/logo.png",
  "location": {
    "name": "Bandar Baru Bangi",
    "address": "Masjid Jamek An-Nur, Jalan 4/1, Seksyen 4, 43650 Bandar Baru Bangi, Selangor",
    "coordinates": "2.956700, 101.765400",
    "googleMapsUrl": "https://maps.google.com/?q=2.956700,101.765400"
  },
  "bankAccount": {
    "bankName": "Bank Islam Malaysia Berhad",
    "accountName": "Tabung Pengurusan Masjid Jamek An-Nur",
    "accountNumber": "12038010098765",
    "reference": "Infaq Jumaat",
    "qrImage": "assets/duitnow-qr.svg"
  }
}
```

### Menggantikan Logo & Kod QR
1. **Logo Rasmi**: Gantikan `assets/logo.png` (nisbah segi empat sama 1:1, saiz disyorkan 512x512 atau 1024x1024).
2. **Kod QR DuitNow**: Gantikan `assets/duitnow-qr.svg` atau letakkan fail SVG/PNG anda dan kemaskini laluan pada `bankAccount.qrImage`.

---

## 🎨 Penyesuaian Tema Warna (Mod Cerah & Mod Gelap)

Templat ini menyokong penukaran tema secara menyeluruh. Anda boleh memilih daripada 4 preset sedia ada atau memasukkan kod warna hex masjid anda sendiri.

### A. Memilih Preset Siap Pakai

Di dalam `site.config.json`, ubah nilai `"theme.preset"`:

| Nama Preset | Karakter Visual | Sesuai Untuk |
| :--- | :--- | :--- |
| `teal-amber` | *Deep Teal* (#116876) & *Warm Amber* (#eb7713) | Musolla moden, suasana tenang dan hangat |
| `emerald-gold` | *Emerald Green* (#047857) & *Crescent Gold* (#d97706) | Masjid tradisi beridentiti hijau kubah & emas |
| `royal-blue` | *Sapphire Blue* (#1d4ed8) & *Desert Sand* (#3b82f6) | Masjid bandar, rekaan futuristik & bersih |
| `maroon-gold` | *Heritage Maroon* (#881337) & *Golden Velvet* (#d97706) | Masjid warisan, rekaan mewah & klasik |

```json
"theme": {
  "preset": "emerald-gold"
}
```

### B. Warna Hex Tersuai Sepenuhnya (`custom`)

Sekiranya masjid anda mempunyai manual identiti korporat (CI) tersendiri, anda boleh menentukan warna bagi kedua-dua Mod Cerah (*Light Mode*) dan Mod Gelap (*Dark Mode*):

```json
"theme": {
  "preset": "custom",
  "light": {
    "primary": "#059669",
    "primaryForeground": "#ffffff",
    "secondary": "#ea580c",
    "secondaryForeground": "#ffffff",
    "accent": "#f59e0b",
    "background": "#f8fafc",
    "card": "#ffffff",
    "foreground": "#0f172a",
    "muted": "#f1f5f9",
    "border": "#e2e8f0"
  },
  "dark": {
    "primary": "#34d399",
    "primaryForeground": "#062015",
    "secondary": "#fb923c",
    "secondaryForeground": "#ffffff",
    "accent": "#fbbf24",
    "background": "#022c22",
    "card": "#064e3b",
    "foreground": "#f0fdf4",
    "muted": "#065f46",
    "border": "#047857"
  }
}
```
Enjin tema di [`js/theme.js`](js/theme.js) akan menukar kod Hex kepada nilai ruang HSL secara automatik bagi memastikan kompatibiliti penuh dengan sistem warna CSS variable.

---

## 📝 Sistem Blog Markdown Tanpa Kompilasi Terminal

### Struktur Direktori Pos

Setiap pos blog disimpan di bawah laluan hierarki tarikh:

```text
blog/
└── <year>/
    └── <month>/
        └── <day>/
            └── <post_folder>/
                ├── post.md          # Dokumen Markdown kandungan artikel
                ├── banner.jpg       # (Pilihan) Imej muka depan / poster
                └── gambar1.png      # (Pilihan) Imej sisipan artikel
```

**Contoh Sebenar:**
```text
blog/
└── 2026/
    └── 10/
        └── 26/
            └── pelancaran-portal-rasmi-masjid/
                ├── post.md
                └── banner.svg
```

### Format Tarikh Pada Paparan Halaman (`<DD>/<MM>/<YYYY>`)
Walaupun folder disusun mengikut struktur komputer `<year>/<month>/<day>` (`2026/10/26`), enjin [`js/blog.js`](js/blog.js) mengekstrak komponen tarikh tersebut dan memaparkannya pada halaman HTML sebagai:
```html
<time class="blog-badge-date">26/10/2026</time>
```
Format ini menjamin keselesaan membaca mengikut piawaian tarikh di Malaysia dan rantau ini.

### Contoh Format Kandungan `post.md`

Setiap fail `.md` boleh menyertakan metadata (*YAML Frontmatter*) di bahagian atas fail:

```markdown
---
title: "Majlis Kesyukuran & Solat Hajat Perdana"
author: "Biro Dakwah & Pengimarahan"
category: "Aktiviti"
summary: "Jemputan kepada seluruh kariah untuk bersama-sama mengimarahkan majlis doa selamat dan solat hajat bersempena peperiksaan anak-anak qariah."
cover: "banner.jpg"
tags: [solat-hajat, komuniti, doa-selamat]
---

# Majlis Kesyukuran & Solat Hajat Perdana

Segala puji bagi Allah SWT. Pihak jawatankuasa menjemput seluruh ahli kariah hadir bersama keluarga.

![Poster Solat Hajat](banner.jpg)

## Atur Cara Majlis

1. **6:45 Petang**: Ketibaan para jemaah dan solat Maghrib berjemaah.
2. **7:30 Malam**: Bacaan Surah Yasin dan Tahlil Ringkas.
3. **8:15 Malam**: Solat Isyak & Solat Hajat Berjemaah.
4. **8:45 Malam**: Jamuan makan malam kariah.

> "Doa itu adalah senjata orang mukmin, tiang agama, dan cahaya langit serta bumi." (HR. Al-Hakim)
```

### Ciri-Ciri Hebat Sistem Blog:
1. **Penyelesaian Imej Relatif Automatik**: Anda boleh meletakkan imej terus di dalam folder artikel yang sama. Rujukan `![Poster](banner.jpg)` atau `![Gambar](./foto.png)` akan dilaraskan secara automatik ke laluan penuh artikel tanpa perlu menulis URL panjang.
2. **Tanpa Kompilasi Terminal**:
   - Jika anda menguji secara tempatan dengan `node server.js`, pelayan akan mengimbas direktori `/blog/` secara masa nyata (*real-time*). Anda hanya simpan fail `.md`, dan muat semula pelayar web!
   - Apabila ditolak ke GitHub / Cloudflare Pages, skrip pembinaan `node scripts/build.js` akan menjana fail `blog/posts.json` secara automatik di awan (*cloud*) tanpa sebarang arahan manual di komputer anda.
3. **Navigasi Langsung**: Anda boleh terus berkongsi pautan artikel secara khusus, contohnya:
   `https://domain-anda.pages.dev/blog/?post=2026/10/26/pelancaran-portal-rasmi-masjid`

---

## 🛡️ Strategi Pemeliharaan Fail & Konfigurasi (Persistence Architecture)

Salah satu cabaran utama apabila menggunakan templat sumber terbuka yang dikemas kini oleh pembangun induk (*upstream template*) ialah risiko penulisan semula (*overwrite*) terhadap logo, laporan kewangan, penyata tahunan, fail PDF perlembagaan, dan konfigurasi unik masjid anda.

Templat ini menyokong **tiga lapisan perlindungan data**:

### Kaedah 1: Lapisan Hamparan Direktori `content/` (Disyorkan & Paling Bersih)

Anda boleh meletakkan semua fail khusus masjid anda di dalam folder `content/`:

```text
content/
├── site.config.json       # Konfigurasi masjid anda (menggantikan yang asal)
├── logo.png               # Logo rasmi masjid anda
├── duitnow-qr.svg         # Kod QR rasmi masjid anda
├── perlembagaan/          # Fail PDF Perlembagaan masjid anda
├── reports/               # Folder laporan kewangan tahunan masjid anda
│   ├── 2026/
│   └── 2025/
└── data/                  # Fail data khas masjid anda
    ├── activities.json
    ├── announcements.json
    └── organisasi.json
```

**Bagaimana ia berfungsi?**
- Di repositori templat induk (*upstream*), folder `content/` tidak disentuh.
- Semasa proses `node scripts/build.js` atau `node server.js` dijalankan, sistem akan menyemak folder `content/`.
- Sekiranya terdapat fail di dalam `content/`, fail tersebut akan dihampar (*overlay*) secara automatik mengatasi fail asal templat!
- Apabila anda menjalankan `git pull upstream main`, Git tidak akan mengalami konflik (*merge conflict*) kerana kod templat dan kandungan masjid anda diasingkan sepenuhnya.

---

## ⚙️ Utiliti Kemaskini Templat (`scripts/template-sync.js`)

Bagi memudahkan pentadbir masjid yang menyunting fail terus di folder asas (`site.config.json`, `assets/`, `data/`, `blog/`), templat ini menyediakan skrip penyegerakan automatik:

### 1. Mencipta Salinan Sandaran (Backup)
```bash
npm run template:backup
```
Menyimpan keseluruhan konfigurasi, data, laporan PDF, dan pos blog anda ke dalam arkib bertarikh di folder `.backup/backup-<timestamp>/`.

### 2. Mengemaskini Templat Induk & Penggabungan Konfigurasi Pintar
```bash
npm run template:update
```
Skrip ini akan:
1. Menghasilkan salinan keselamatan fail anda secara automatik.
2. Membaca fail `site.config.json` anda dan membandingkannya dengan `site.config.defaults.json` templat induk.
3. Menambah sebarang kunci konfigurasi baharu yang diperkenalkan oleh templat tanpa memadam sebarang tetapan atau teks masjid yang telah anda ubah suai.
4. Menjalankan ujian pembinaan `npm run build` untuk mengesahkan laman web sedia beroperasi.

### 3. Mengesahkan Integriti Templat
```bash
npm run template:verify
```
Menyemak kehadiran logo, akaun bank, pautan perlembagaan, dan format JSON bagi memastikan tiada sebarang ralat sebelum pelancaran.

---

## 🚀 Panduan Deployment ke Cloudflare Pages

Laman web ini dioptimumkan 100% untuk Cloudflare Pages (Tier Percuma mencukupi untuk trafik tanpa had dan kelajuan CDN global).

1. Tolak kod repositori anda ke akaun GitHub anda.
2. Buka [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Pilih repositori GitHub anda.
4. Tetapkan konfigurasi berikut:
   - **Framework preset**: `None`
   - **Build command**: `node scripts/build.js`
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**.
6. Cloudflare Pages akan membina laman web anda dalam masa ~20 saat dan memberikan URL percuma seperti `https://masjid-anda.pages.dev` lengkap dengan sijil keselamatan HTTPS/SSL automatik!

---

## 📜 Lesen Sumber Terbuka & Komitmen Privasi

- **Lesen Kod Sumber**: Laman web ini dilesenkan di bawah [Lesen MIT (MIT License)](LICENSE). Anda bebas mengguna, mengubah suai, mengedar, dan menyesuaikannya untuk mana-mana masjid, surau atau musolla tanpa sebarang bayaran royalti.
- **Kerahsiaan Data Kariah**: Walaupun templat ini adalah sumber terbuka, pihak pentadbir masjid dinasihatkan untuk tidak memuat naik sebarang data sensitif seperti nombor kad pengenalan ahli kariah ke dalam repositori awam.

---

*Templat ini dibangunkan dengan kasih dan ihsan untuk kemakmuran rumah-rumah Allah di seluruh dunia.*
