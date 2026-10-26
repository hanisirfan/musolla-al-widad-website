/**
 * Build Script for Musolla Al-Widad Kita Sejati
 * Bundles static assets into dist/ directory for Cloudflare Pages production deployment.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else if (exists) {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

console.log('Building Musolla Al-Widad Website for Production...');

if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Items to copy to dist
const itemsToCopy = [
  'index.html',
  'site.config.json',
  'LICENSE',
  'css',
  'js',
  'lang',
  'data',
  'assets'
];

itemsToCopy.forEach(item => {
  const src = path.join(ROOT_DIR, item);
  const dest = path.join(DIST_DIR, item);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log(`Copied ${item} -> dist/${item}`);
  }
});

// Also create _headers and _routes for Cloudflare Pages caching & security
const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/lang/*
  Cache-Control: public, max-age=3600
`;

fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent);
console.log('Created dist/_headers for Cloudflare Pages optimization');

console.log('\nProduction build complete in dist/ directory!');
