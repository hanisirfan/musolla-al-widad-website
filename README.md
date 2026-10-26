# 🕌 Modern Mosque & Musolla Landing Page Template
### Zero-Dependency, Cloudflare Pages Ready, On-The-Fly Markdown Blog

Welcome to the official repository for the **Modern Mosque & Musolla Landing Page Template**.

This project provides a clean, fast, and respectful digital landing page template designed for any Islamic institution—**Masjid (Cathedral Mosque)**, **Surau / Surau Jumaat (Community Mosque)**, or **Musolla (Prayer Hall)**.

Built with **Zero External Build Tooling or Runtime Dependencies** (pure semantic HTML5, modern Tailwind CSS, and vanilla JavaScript), it is optimized for free static hosting on **Cloudflare Pages** without requiring a database, servers, or ongoing hosting fees.

---

## 📋 Table of Contents

1. [Key Features](#-key-features)
2. [Quick Start & Local Testing](#-quick-start--local-testing)
3. [Site Customization (`site.config.json`)](#-site-customization-siteconfigjson)
   - [A. Mosque Branding & General Information](#a-mosque-branding--general-information)
   - [B. Theme & Color Palettes (Light & Dark Modes)](#b-theme--color-palettes-light--dark-modes)
   - [C. Optional Sections & Feature Toggles](#c-optional-sections--feature-toggles)
   - [D. Conditional Hero Buttons & Statistics](#d-conditional-hero-buttons--statistics)
   - [E. Khairat Kematian (Funeral Welfare Fund) Curation](#e-khairat-kematian-funeral-welfare-fund-curation)
   - [F. Flexible Contacts & Contact Form](#f-flexible-contacts--contact-form)
   - [G. Location & Google Maps](#g-location--google-maps)
4. [On-The-Fly Markdown Blogging System](#-on-the-fly-markdown-blogging-system)
   - [Folder Hierarchy: `/blog/<year>/<month>/<day>/<post_folder>/`](#folder-hierarchy-blogyearmonthdaypost_folder)
   - [Page Date Formatting: `<DD>/<MM>/<YYYY>`](#page-date-formatting-ddmmyyyy)
   - [Writing Markdown Posts with Frontmatter](#writing-markdown-posts-with-frontmatter)
   - [Relative Images & Companion Assets](#relative-images--companion-assets)
5. [Data Persistence & Upstream Template Updates](#-data-persistence--upstream-template-updates)
   - [The `content/` Overlay Pattern](#the-content-overlay-pattern)
   - [The Template Sync Utility (`npm run template:*`)](#the-template-sync-utility-npm-run-template)
6. [Cloudflare Pages Deployment Guide](#-cloudflare-pages-deployment-guide)
7. [Open Source License (MIT)](#-open-source-license-mit)

---

## ✨ Key Features

- **Inclusive Institutional Support**: Pre-configured for all tiers of Islamic prayer centers (Masjid, Surau, Musolla) with customizable institutional identity.
- **Warm & Welcoming Community Aesthetic**: A gentle milky tone (`#f6f4ef` background & `#faf8f5` cards) that avoids harsh pure whites, combined with a comfortable solid dark mode (`#101c23`).
- **Fully Customizable Themes**: 4 built-in curated presets (`teal-amber`, `emerald-gold`, `royal-blue`, `maroon-gold`) or custom hex codes for both Light and Dark modes.
- **On-The-Fly Markdown Blogging**: Drop Markdown (`.md`) files and companion images into date-based folders; the website renders them on the fly without any terminal compilation.
- **Strict `<DD>/<MM>/<YYYY>` Date Formatting**: Automatically maps `<year>/<month>/<day>` folders into formatted `<DD>/<MM>/<YYYY>` dates across the user interface.
- **All Sections Optional & Modular**: Every section (Announcements, Vision & Mission, Management Org Chart, Funeral Fund, Financial Reports, Constitution PDF, Donations, Blog & News, FAQ, Contact Cards, and Google Maps) can be toggled on/off in `site.config.json`.
- **Flexible Contact Directory**: Add any number of contacts (Phone, WhatsApp, Email, Custom) plus an optional online Contact Form (Google Forms or any external link).
- **Curated Funeral Fund (Khairat Kematian)**: Supports both independent in-house funds and partnered programs (e.g. under an apex district mosque) with admin-defined benefits.
- **Zero Git Merge Conflict Persistence**: Store custom logos, PDFs, reports, and configs in the `content/` directory so pulling updates from the upstream template will never overwrite your mosque's data.

---

## 💻 Quick Start & Local Testing

You can run and test the website locally with zero npm dependencies installed:

1. **Start the local server**:
   ```bash
   node server.js
   # Or using Google Antigravity / Node:
   agy-node server.js
   ```
2. **Open in browser**:
   - Main Landing Page: `http://localhost:3000`
   - Blog Catalog: `http://localhost:3000/blog/`
   - Test Article: `http://localhost:3000/blog/?post=2026/10/26/pelancaran-portal-rasmi-masjid`

---

## ⚙️ Site Customization (`site.config.json`)

All configuration is centralized in [`site.config.json`](site.config.json) (or in the persistent [`content/site.config.json`](content/site.config.json) overlay).

### A. Mosque Branding & General Information

```json
{
  "siteName": "Masjid Jamek An-Nur",
  "shortName": "Masjid An-Nur",
  "tagline": "Center of Worship, Knowledge & Community Solidarity",
  "registrationNumber": "JAIS/PDK/03/044/2026",
  "logo": "assets/logo.png",
  "favicon": "assets/logo.png"
}
```

### B. Theme & Color Palettes (Light & Dark Modes)

Choose from 4 pre-built presets or enter custom Hex codes:

| Preset Name | Visual Palette | Suggested For |
| :--- | :--- | :--- |
| `teal-amber` | Calming Deep Teal & Warm Amber | Modern musolla, serene coastal tones |
| `emerald-gold` | Classic Emerald Green & Crescent Gold | Traditional mosques, dome-inspired elegance |
| `royal-blue` | Sapphire Blue & Desert Sand | Urban mosques, clean minimalist vibe |
| `maroon-gold` | Heritage Ottoman Velvet & Amber Gold | Historic architecture, warm classic feel |

```json
"theme": {
  "preset": "emerald-gold"
}
```

To define custom hex colors for both modes, set `"preset": "custom"` and provide `light` and `dark` hex objects. The template's theme engine automatically computes space-separated HSL values for seamless CSS variable support.

### C. Optional Sections & Feature Toggles

Every section is enabled by default, but can be cleanly disabled by setting its key to `false`:

```json
"sections": {
  "announcements": true,
  "visionMission": true,
  "management": true,
  "khairat": true,
  "finance": true,
  "constitution": true,
  "donation": true,
  "blog": true,
  "faq": true,
  "contact": true,
  "map": true
}
```
When a section is set to `false`, the website automatically hides the section and removes its link from the desktop navbar, mobile drawer, and footer.

### D. Conditional Hero Buttons & Statistics

- **Hero Buttons**:
  - `Hulurkan Infaq / Donate`: Displayed only if `sections.donation !== false` and `bankAccount` is configured.
  - `Daftar Khairat / Funeral Fund`: Displayed only if `sections.khairat !== false`.
  - `Panduan Lokasi / Location Guide`: Displayed only if `location.address` and `location.googleMapsUrl` are both defined.
- **Hero Statistics**:
  Defined under `"heroStats"`:
  ```json
  "heroStats": {
    "households": "1,000+",
    "capacity": "~200",
    "programs": "20+"
  }
  ```
  If `households` is empty or omitted, its counter is hidden. If `capacity` is empty, its counter is hidden. If all stats are empty, the entire stats bar is gracefully hidden.

### E. Khairat Kematian (Funeral Welfare Fund) Curation

A mosque's funeral welfare program may be **independent** (in-house) or **partnered** with a neighboring apex mosque (e.g. under an e-Khairat portal).

```json
"khairat": {
  "enabled": true,
  "programType": "partnered",
  "partnerName": "Masjid Al-Ilmi Dengkil",
  "partnerPortalUrl": "https://www.e-khairat.com/al-ilmi",
  "registrationUrl": "https://www.e-khairat.com/al-ilmi",
  "contactNumber": "+6012-345 6789",
  "fee": "RM 50.00 / year",
  "coverageNoteMs": "Merangkumi ahli berdaftar, pasangan dan anak-anak tanggungan di bawah 21 tahun.",
  "coverageNoteEn": "Covers registered member, spouse and dependent children under 21 years old.",
  "benefits": [
    {
      "id": "pengurusan-jenazah",
      "icon": "shield-check",
      "nameMs": "Pengurusan Jenazah Lengkap",
      "nameEn": "Complete Funeral Arrangement",
      "descMs": "Khidmat pemandian, kafan, solat jenazah dan pengurusan kubur yang sempurna mengikut syariat.",
      "descEn": "Complete bathing, shrouding, funeral prayer and burial management according to Islamic rites."
    },
    {
      "id": "wang-ihsan",
      "icon": "heart-handshake",
      "nameMs": "Sumbangan Wang Ihsan Waris",
      "nameEn": "Bereavement Consolation Aid",
      "descMs": "Bantuan kewangan segera kepada waris terdekat bagi meringankan beban keluarga.",
      "descEn": "Immediate monetary assistance to immediate family to ease unexpected expenses."
    }
  ]
}
```
*Note: If `benefits` is empty `[]`, the benefits grid is hidden automatically while keeping the registration details card.*

### F. Flexible Contacts & Contact Form

Provide any number of contact cards with custom roles and channels (phone, WhatsApp, email):

```json
"contacts": {
  "contactFormUrl": "https://forms.gle/sampleFeedbackAlWidad",
  "items": [
    {
      "roleMs": "Pengerusi",
      "roleEn": "Chairman",
      "name": "Haji Mohd Salleh",
      "type": "phone",
      "value": "+6012-345 6789",
      "phone": "+6012-345 6789",
      "whatsapp": "60123456789"
    },
    {
      "roleMs": "Setiausaha",
      "roleEn": "Secretary",
      "name": "Ustaz Ahmad Farhan",
      "type": "whatsapp",
      "value": "+6013-456 7890",
      "phone": "+6013-456 7890",
      "whatsapp": "60134567890"
    },
    {
      "roleMs": "Emel Pentadbiran",
      "roleEn": "Official Email",
      "name": "pentadbiran@masjid.org",
      "type": "email",
      "value": "pentadbiran@masjid.org"
    }
  ]
}
```
- **Contact Form**: The `contactFormUrl` allows admins to connect a Google Form or custom contact form. If left empty, the Contact Form callout card is hidden.

### G. Location & Google Maps

```json
"location": {
  "name": "Cybersouth Community",
  "address": "Persiaran Cybersouth Perdana, Cybersouth, 43800 Dengkil, Selangor",
  "coordinates": "2.876102, 101.646251",
  "googleMapsUrl": "https://www.google.com/maps?q=2.876102,101.646251",
  "embedUrl": "https://maps.google.com/maps?q=2.876102,101.646251&t=&z=16&ie=UTF8&iwloc=&output=embed"
}
```
*If `address` or `googleMapsUrl` is empty, the Google Maps section and the Hero Location button are hidden automatically.*

---

## 📝 On-The-Fly Markdown Blogging System

Admins can post articles, lecture schedules, and activity reports simply by creating Markdown files in date-structured folders.

### Folder Hierarchy: `/blog/<year>/<month>/<day>/<post_folder>/`

```text
blog/
└── 2026/
    └── 10/
        └── 26/
            └── pelancaran-portal-rasmi-masjid/
                ├── post.md          # Markdown article content
                └── banner.svg       # Companion image
```

### Page Date Formatting: `<DD>/<MM>/<YYYY>`

While folders are organized by computer-friendly `<year>/<month>/<day>` (`2026/10/26`), the frontend blogging engine extracts the date and displays it on the HTML page formatted strictly as:
```html
<time class="blog-badge-date">26/10/2026</time>
```

### Writing Markdown Posts with Frontmatter

Create `post.md` (or `index.md`) with optional YAML frontmatter:

```markdown
---
title: "Maulidur Rasul Celebration & Special Tazkirah"
author: "Islamic Affairs Bureau"
category: "Lectures"
summary: "An invitation to all congregation members to attend our upcoming Maulidur Rasul talk and congregational prayer."
cover: "banner.svg"
tags: [lectures, maulidur-rasul, community]
---

# Maulidur Rasul Celebration & Special Tazkirah

All praise is due to Allah. We warmly welcome our neighborhood community to attend.

![Event Poster](banner.svg)

## Event Schedule

- **6:45 PM**: Arrival & Maghrib prayer.
- **7:30 PM**: Special Lecture on the Prophet's Biography.
- **8:15 PM**: Isyak prayer & community dinner.
```

### Relative Images & Companion Assets
Any image referenced in the post (e.g. `![Poster](banner.svg)`) is automatically resolved relative to that specific post's folder. No absolute URL gymnastics required!

---

## 🛡️ Data Persistence & Upstream Template Updates

When pulling new updates, bug fixes, or enhancements from the upstream template, you never want your mosque's custom logos, financial PDFs, or configuration to be overwritten.

### The `content/` Overlay Pattern

Place your custom mosque files in an optional `content/` directory at the project root:

```text
content/
├── site.config.json       # Your mosque's custom configuration
├── logo.png               # Your official logo (1:1 aspect ratio)
├── duitnow-qr.svg         # Your DuitNow QR Code
├── perlembagaan/          # Your constitution PDF
└── reports/               # Your financial PDFs by year (2026/, 2025/)
```
During local testing (`server.js`) and production builds (`scripts/build.js`), the build system automatically overlays files in `content/` on top of the base template. Because the upstream git repository only maintains default placeholders, `git pull upstream main` will **never conflict** with your `content/` directory!

### The Template Sync Utility (`npm run template:*`)

For admins who prefer editing root files directly:
```bash
npm run template:backup   # Creates a timestamped backup in .backup/
npm run template:update   # Performs a smart deep-merge of configs and pulls upstream updates safely
npm run template:verify   # Validates that all critical assets, JSON files, and paths exist
```

---

## 🚀 Cloudflare Pages Deployment Guide

Deploy your mosque's website globally with free SSL and unlimited bandwidth:

1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "feat: initialize mosque website"
   git push origin main
   ```
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/):
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your repository.
   - Configure build settings:
     - **Framework preset**: `None`
     - **Build command**: `node scripts/build.js`
     - **Build output directory**: `dist`
3. Click **Save and Deploy**. Your site will be live across Cloudflare's global edge network in ~20 seconds!

---

## 📜 Open Source License (MIT)

This project is licensed under the **[MIT License](LICENSE)**:

```text
MIT License
Copyright (c) 2026 The Project Contributors
```

You are free to use, modify, distribute, and customize this template for any mosque, surau, or community organization without royalty or restriction.

---

*For detailed instructions and advanced setups, refer to [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md).*
