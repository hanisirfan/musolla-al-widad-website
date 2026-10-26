/**
 * Template Sync & Persistence Utility for Mosque Landing Page Template
 *
 * Provides:
 * 1. Safe Backup of mosque-specific assets & configs (npm run template:backup)
 * 2. Smart Configuration Merge when pulling updates from upstream template (npm run template:update)
 * 3. Configuration & Asset Verification (npm run template:verify)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.join(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, '.backup');

// Critical custom files and folders that must persist across template updates
const PERSISTENT_ITEMS = [
  'site.config.json',
  'content',
  'blog',
  'assets/logo.png',
  'assets/duitnow-qr.svg',
  'assets/perlembagaan',
  'assets/reports',
  'assets/activities',
  'assets/avatars',
  'data/activities.json',
  'data/announcements.json',
  'data/organisasi.json',
  'data/reports.json'
];

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

/**
 * Perform timestamped backup
 */
function createBackup() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const targetDir = path.join(BACKUP_DIR, `backup-${timestamp}`);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let backedUpCount = 0;
  PERSISTENT_ITEMS.forEach(relPath => {
    const srcPath = path.join(ROOT_DIR, relPath);
    if (fs.existsSync(srcPath)) {
      const destPath = path.join(targetDir, relPath);
      copyRecursiveSync(srcPath, destPath);
      backedUpCount++;
    }
  });

  const manifest = {
    timestamp: now.toISOString(),
    itemsCount: backedUpCount,
    sourceVersion: '1.0.0'
  };
  fs.writeFileSync(path.join(targetDir, 'backup-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`\n📦 Salinan keselamatan (Backup) berjaya dicipta!`);
  console.log(`📁 Lokasi: ${path.relative(ROOT_DIR, targetDir)}`);
  console.log(`✓ ${backedUpCount} fail/folder data masjid telah dipelihara.\n`);
  return targetDir;
}

/**
 * Deep merge two JSON objects preserving user values and injecting new template keys
 */
function deepMergeDefaults(userConfig, defaultConfig) {
  const result = Object.assign({}, defaultConfig, userConfig);

  for (const key of Object.keys(defaultConfig)) {
    const defaultVal = defaultConfig[key];
    const userVal = userConfig[key];

    if (defaultVal && typeof defaultVal === 'object' && !Array.isArray(defaultVal)) {
      result[key] = deepMergeDefaults(userVal || {}, defaultVal);
    } else if (userVal !== undefined) {
      result[key] = userVal;
    } else {
      result[key] = defaultVal;
    }
  }
  return result;
}

/**
 * Smart merge configuration
 */
function smartMergeConfig() {
  const configPath = path.join(ROOT_DIR, 'site.config.json');
  const defaultsPath = path.join(ROOT_DIR, 'site.config.defaults.json');

  if (!fs.existsSync(configPath) || !fs.existsSync(defaultsPath)) {
    console.log('Tiada perbezaan konfigurasi dikesan.');
    return;
  }

  try {
    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const defaultConfig = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));

    const merged = deepMergeDefaults(userConfig, defaultConfig);
    fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), 'utf8');
    console.log('✓ Konfigurasi site.config.json berjaya digabungkan dengan kunci baharu templat.');
  } catch (err) {
    console.error('Ralat semasa menggabungkan konfigurasi:', err);
  }
}

/**
 * Verify configuration and assets
 */
function verifyTemplate() {
  console.log('\n🔍 Memeriksa integriti templat laman web masjid...\n');
  let issues = 0;

  // 1. Check site.config.json
  const configPath = path.join(ROOT_DIR, 'site.config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`✓ Nama Masjid: "${config.siteName || 'Belum Ditetapkan'}"`);
      console.log(`✓ Preset Tema: "${config.theme?.preset || 'lalai'}"`);
      console.log(`✓ Akaun Bank: ${config.bankAccount?.bankName} (${config.bankAccount?.accountNumber})`);
    } catch (e) {
      console.error('❌ Fail site.config.json tidak sah format JSON!');
      issues++;
    }
  } else {
    console.error('❌ Fail site.config.json tidak dijumpai!');
    issues++;
  }

  // 2. Check Logo
  const logoPath = path.join(ROOT_DIR, 'assets', 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('✓ Logo rasmi dijumpai: assets/logo.png');
  } else {
    console.warn('⚠️ Logo rasmi tiada di assets/logo.png');
    issues++;
  }

  // 3. Check Blog Posts
  const blogDir = path.join(ROOT_DIR, 'blog');
  if (fs.existsSync(blogDir)) {
    console.log('✓ Direktori blog sedia wujud: /blog/');
  } else {
    console.warn('⚠️ Direktori /blog/ tiada.');
  }

  // 4. Check Reports
  const reportsDir = path.join(ROOT_DIR, 'assets', 'reports');
  if (fs.existsSync(reportsDir)) {
    console.log('✓ Direktori penyata kewangan sedia wujud: assets/reports/');
  }

  if (issues === 0) {
    console.log('\n✨ Status: SEMUA LENGKAP & BERFUNGSI DENGAN BAIK!\n');
  } else {
    console.log(`\n⚠️ Status: Selesai dengan ${issues} peringatan.\n`);
  }
}

// CLI Command Router
const command = process.argv[2] || 'verify';

switch (command) {
  case 'backup':
    createBackup();
    break;

  case 'update':
    console.log('\n🚀 Memulakan proses kemaskini templat upstream...');
    createBackup();
    smartMergeConfig();
    try {
      console.log('Menjalankan pembinaan projek: npm run build ...');
      execSync('node scripts/build.js', { stdio: 'inherit', cwd: ROOT_DIR });
      console.log('\n🎉 Kemaskini templat berjaya diproses tanpa kehilangan sebarang fail masjid!');
    } catch (err) {
      console.error('Ralat semasa pembinaan selepas kemaskini:', err.message);
    }
    break;

  case 'verify':
  default:
    verifyTemplate();
    break;
}
