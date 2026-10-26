# 🕌 Mosque & Community Landing Page Template Guide
## Comprehensive Manual for Mosque Administrators & Developers

Welcome to the comprehensive guide for the **Modern Mosque Landing Page Template**.

This document outlines how to customize, operate, and maintain your institution's website—whether your organization is classified as a **Masjid (Cathedral Mosque)**, **Surau / Surau Jumaat (Community Mosque)**, or **Musolla (Prayer Hall)**.

---

## 📑 Table of Contents

1. [Architectural Overview](#1-architectural-overview)
2. [Institutional Identity & Branding](#2-institutional-identity--branding)
3. [Theme Customization (Presets & Custom Hex)](#3-theme-customization-presets--custom-hex)
4. [Modular Sections & Feature Toggles](#4-modular-sections--feature-toggles)
5. [Conditional Hero Buttons & Statistics](#5-conditional-hero-buttons--statistics)
6. [Curated Funeral Welfare Fund (Khairat Kematian)](#6-curated-funeral-welfare-fund-khairat-kematian)
7. [Flexible Contacts & Online Contact Form](#7-flexible-contacts--online-contact-form)
8. [On-The-Fly Markdown Blogging System](#8-on-the-fly-markdown-blogging-system)
   - [Directory Structure](#directory-structure)
   - [Date Formatting: `<DD>/<MM>/<YYYY>`](#date-formatting-ddmmyyyy)
   - [Frontmatter & Markdown Formatting](#frontmatter--markdown-formatting)
   - [Companion Media & Image Resolution](#companion-media--image-resolution)
9. [Data Persistence & Upstream Template Updates](#9-data-persistence--upstream-template-updates)
   - [Layer 1: The `content/` Directory Overlay](#layer-1-the-content-directory-overlay)
   - [Layer 2: Automated Sync & Backup Scripts](#layer-2-automated-sync--backup-scripts)
10. [Cloudflare Pages Deployment](#10-cloudflare-pages-deployment)
11. [License & Privacy Compliance](#11-license--privacy-compliance)

---

## 1. Architectural Overview

This template follows the **Jamstack** philosophy:
- **Zero Runtime Dependencies**: Operates with standard vanilla JavaScript, HTML5, and Tailwind CSS.
- **No Database Required**: All content is stored in version-controlled JSON files and Markdown documents.
- **Ultra-Fast Edge Delivery**: Pre-configured for deployment on Cloudflare Pages with automated global caching headers.
- **Bilingual Engine**: Fully localized in Bahasa Melayu (default) and English with instant language toggling.

---

## 2. Institutional Identity & Branding

Configure your institution in [`site.config.json`](site.config.json):

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

### Institutional Classification
In Selangor and Malaysia, Islamic places of worship generally fall into three categories:
- **Masjid**: Friday congregational mosques with full parish administration.
- **Surau / Surau Jumaat**: Residential or neighborhood mosques with daily prayers and optional Friday prayer authorization.
- **Musolla**: Community prayer halls serving apartment complexes, offices, or shopping centers.

This template uses neutral terms in the navigation (e.g. **Pengurusan / Management**, **Perlembagaan / Constitution**) and binds your institution's name dynamically.

---

## 3. Theme Customization (Presets & Custom Hex)

### Curated Presets
Set `"theme.preset"` to one of the following built-in palettes:

| Preset Name | Light Mode Primary | Dark Mode Primary | Aesthetic Impression |
| :--- | :--- | :--- | :--- |
| `teal-amber` | `#116876` (Deep Teal) | `#21b8cc` (Bright Teal) | Serene, warm, welcoming community feel |
| `emerald-gold` | `#047857` (Emerald Green) | `#10b981` (Vibrant Mint) | Classic Islamic dome & gold embroidery |
| `royal-blue` | `#1d4ed8` (Sapphire Blue) | `#60a5fa` (Sky Azure) | Modern urban architecture, clean minimalist |
| `maroon-gold` | `#881337` (Velvet Maroon) | `#fb7185` (Coral Rose) | Historic Ottoman heritage, dignified velvet |

```json
"theme": {
  "preset": "emerald-gold"
}
```

### Full Custom Hex Colors
To use your institution's exact brand guidelines, set `"preset": "custom"`:

```json
"theme": {
  "preset": "custom",
  "light": {
    "primary": "#047857",
    "primaryForeground": "#ffffff",
    "secondary": "#d97706",
    "accent": "#f59e0b",
    "background": "#f5f7f5",
    "card": "#fafbfa",
    "foreground": "#142820",
    "border": "#d7e2d8"
  },
  "dark": {
    "primary": "#10b981",
    "primaryForeground": "#062015",
    "secondary": "#f59e0b",
    "accent": "#fbbf24",
    "background": "#0a1912",
    "card": "#12261d",
    "foreground": "#edf7f1",
    "border": "#244838"
  }
}
```
The internal color engine ([`js/theme.js`](js/theme.js)) automatically converts Hex strings to space-separated HSL values, dynamically injecting them into CSS variables without any compilation step.

---

## 4. Modular Sections & Feature Toggles

Every section is enabled by default, but can be individually turned off in `site.config.json`:

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

When a section is disabled:
- The section element is hidden from the DOM.
- Corresponding links in the desktop navigation, mobile drawer, and footer are hidden automatically.
- If `visionMission` is disabled, the Management section automatically activates the Organization Chart tab.

---

## 5. Conditional Hero Buttons & Statistics

### Hero Buttons
- **Infaq / Donate Button**: Only shown if `sections.donation !== false` and `bankAccount` details exist.
- **Khairat Kematian Button**: Only shown if `sections.khairat !== false`.
- **Location Guide Button**: Only shown if both `location.address` and `location.googleMapsUrl` are defined.

### Hero Statistics
Define statistics under `"heroStats"`:
```json
"heroStats": {
  "households": "1,000+",
  "capacity": "~200",
  "programs": "20+"
}
```
- If `households` is empty or undefined, its card is hidden.
- If `capacity` is empty or undefined, its card is hidden.
- If both are omitted, the entire stats container is cleanly hidden.

---

## 6. Curated Funeral Welfare Fund (Khairat Kematian)

Islamic institutions handle funeral funds differently:
1. **Partnered Programs**: Smaller suraus or musollas often partner with an apex parish mosque (e.g. Masjid Al-Ilmi Dengkil).
2. **Independent In-House Funds**: Large mosques manage their own registration, fees, and burial teams.

Configure this in `site.config.json`:

```json
"khairat": {
  "enabled": true,
  "programType": "partnered",
  "partnerName": "Masjid Al-Ilmi Dengkil",
  "partnerPortalUrl": "https://www.e-khairat.com/al-ilmi",
  "registrationUrl": "https://www.e-khairat.com/al-ilmi",
  "contactNumber": "+6012-345 6789",
  "fee": "RM 50.00 / year",
  "benefits": [
    {
      "id": "pengurusan-jenazah",
      "icon": "shield-check",
      "nameMs": "Pengurusan Jenazah Lengkap",
      "nameEn": "Complete Funeral Arrangement",
      "descMs": "Khidmat pemandian, kain kafan, solat jenazah dan pengurusan kubur yang sempurna mengikut syariat.",
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
- **Custom Benefits**: Define any number of benefit cards. If `benefits` is empty `[]`, the benefits grid is hidden automatically.

---

## 7. Flexible Contacts & Online Contact Form

### Flexible Contacts Directory
Admins can define multiple contacts with varied communication channels:

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

### Online Contact Form
Admins can point `contactFormUrl` to a Google Form, Microsoft Form, or custom form. If omitted, the Contact Form card is hidden.

---

## 8. On-The-Fly Markdown Blogging System

### Directory Structure
Articles must be saved following the date hierarchy:
```text
/blog/<year>/<month>/<day>/<post_folder>/
```

**Example:**
```text
blog/
└── 2026/
    └── 10/
        └── 26/
            └── pelancaran-portal-rasmi-masjid/
                ├── post.md          # Article content (Markdown)
                └── banner.svg       # Companion image
```

### Date Formatting: `<DD>/<MM>/<YYYY>`
The date extracted from folder names (`2026/10/26`) is rendered on the HTML page as:
```html
<time class="blog-badge-date">26/10/2026</time>
```

### Frontmatter & Markdown Formatting
Create `post.md` with optional frontmatter metadata:

```markdown
---
title: "Weekly Dhuha & Maghrib Lecture Schedule"
author: "Islamic Education Bureau"
category: "Lectures"
summary: "Schedule of weekly classes on Fiqh, Hadith and Quranic Exegesis with accredited teachers."
cover: "banner.svg"
tags: [lectures, fiqh, classes]
---

# Weekly Dhuha & Maghrib Lecture Schedule

We invite all community members to participate in our regular classes.

![Class Schedule](banner.svg)

## Timetable

| Day | Topic | Text | Teacher |
| :--- | :--- | :--- | :--- |
| Monday | Fiqh of Worship | *Safinah an-Naja* | Ustaz Ahmad |
| Wednesday | Hadith Studies | *Riyadhus Solihin* | Ustaz Hafiz |
```

### Companion Media & Image Resolution
Images stored inside the post folder (e.g. `![Poster](banner.svg)`) are resolved relative to that post folder automatically.

---

## 9. Data Persistence & Upstream Template Updates

When you fork or clone this repository and later pull updates (`git pull upstream main`), you must safeguard your mosque's custom logos, reports, and configuration.

### Layer 1: The `content/` Directory Overlay
Place custom mosque files in the `content/` directory:
- `content/site.config.json` -> Replaces the root config.
- `content/logo.png` -> Your official logo.
- `content/duitnow-qr.svg` -> Your DuitNow QR code.
- `content/reports/` -> Your financial PDFs (e.g. `content/reports/2026/`).
- `content/perlembagaan/` -> Your constitution PDF.

During local testing and Cloudflare Pages builds, the build script merges files from `content/` over the template files. Upstream git updates never touch `content/`.

### Layer 2: Automated Sync & Backup Scripts
```bash
npm run template:backup   # Backs up all custom configs, data, and PDFs to .backup/
npm run template:update   # Pulls upstream template updates & performs a smart config merge
npm run template:verify   # Audits required files, logo existence, and JSON syntax
```

---

## 10. Cloudflare Pages Deployment

1. Push your repository to GitHub.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/):
   - Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
   - Select your repository.
   - Set:
     - **Build command**: `node scripts/build.js`
     - **Build output directory**: `dist`
3. Click **Save and Deploy**. Your site will be live with free automatic SSL and global CDN distribution.

---

## 11. License & Privacy Compliance

- **Source Code License**: Distributed under the standard [MIT License](LICENSE).
- **Parishioner Privacy**: Admins should ensure no sensitive personal identification documents (such as NRIC copies) are uploaded to public repositories.

---

*Built with care for Islamic communities worldwide.*
