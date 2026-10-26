/**
 * Production Build Script for Mosque Landing Page Template (Cloudflare Pages Ready)
 *
 * Capabilities:
 * 1. Bundles core template files into dist/
 * 2. Scans /blog/<year>/<month>/<day>/<post_folder>/*.md and generates blog/posts.json
 * 3. Enforces date formatting on page as <DD>/<MM>/<YYYY>
 * 4. Checks for persistent 'content/' overlay directory and merges custom mosque files
 * 5. Generates Cloudflare Pages _headers for security and caching
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const BLOG_DIR = path.join(ROOT_DIR, 'blog');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

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
 * Extract YAML frontmatter from markdown string
 */
function extractFrontmatter(rawText) {
  const trimmed = rawText.trimStart();
  if (!trimmed.startsWith('---')) {
    return { metadata: {}, body: rawText };
  }
  const endIdx = trimmed.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { metadata: {}, body: rawText };
  }
  const yamlBlock = trimmed.substring(3, endIdx).trim();
  const body = trimmed.substring(endIdx + 4).trimStart();
  const metadata = {};

  yamlBlock.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.substring(0, colonIdx).trim();
    let val = line.substring(colonIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1);
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.substring(1, val.length - 1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    }
    metadata[key] = val;
  });

  return { metadata, body };
}

/**
 * Format year, month, day into <DD>/<MM>/<YYYY>
 */
function formatDateDMY(year, month, day) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year);
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Scan /blog/<year>/<month>/<day>/<post_folder> for Markdown files
 */
function scanBlogPosts() {
  const posts = [];
  if (!fs.existsSync(BLOG_DIR)) return posts;

  const years = fs.readdirSync(BLOG_DIR).filter(item => /^\d{4}$/.test(item));

  years.forEach(year => {
    const yearDir = path.join(BLOG_DIR, year);
    if (!fs.statSync(yearDir).isDirectory()) return;

    const months = fs.readdirSync(yearDir).filter(item => /^\d{1,2}$/.test(item));
    months.forEach(month => {
      const monthDir = path.join(yearDir, month);
      if (!fs.statSync(monthDir).isDirectory()) return;

      const days = fs.readdirSync(monthDir).filter(item => /^\d{1,2}$/.test(item));
      days.forEach(day => {
        const dayDir = path.join(monthDir, day);
        if (!fs.statSync(dayDir).isDirectory()) return;

        const postFolders = fs.readdirSync(dayDir);
        postFolders.forEach(folder => {
          const postFolderDir = path.join(dayDir, folder);
          if (!fs.statSync(postFolderDir).isDirectory()) return;

          // Find markdown file in postFolder
          const files = fs.readdirSync(postFolderDir);
          const mdFile = files.find(f => f.endsWith('.md'));
          if (!mdFile) return;

          const mdContent = fs.readFileSync(path.join(postFolderDir, mdFile), 'utf8');
          const { metadata, body } = extractFrontmatter(mdContent);

          const mm = String(month).padStart(2, '0');
          const dd = String(day).padStart(2, '0');
          const dateFormatted = formatDateDMY(year, mm, dd);
          const rawDate = `${year}-${mm}-${dd}`;
          const slugPath = `${year}/${mm}/${dd}/${folder}`;

          let title = metadata.title;
          if (!title) {
            const h1Match = body.match(/^#\s+(.*)$/m);
            title = h1Match ? h1Match[1].trim() : folder.replace(/[-_]/g, ' ');
          }

          let summary = metadata.summary;
          if (!summary) {
            const firstP = body.split(/\n{2,}/).find(p => !p.startsWith('#') && !p.startsWith('!') && p.trim().length > 10);
            summary = firstP ? firstP.trim().replace(/\n/g, ' ').substring(0, 160) + '...' : '';
          }

          let cover = metadata.cover;
          if (cover && !cover.startsWith('http') && !cover.startsWith('/')) {
            cover = `blog/${slugPath}/${cover.replace(/^\.\//, '')}`;
          }

          const wordCount = body.trim().split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200));

          posts.push({
            slug: folder,
            slugPath: slugPath,
            year: year,
            month: mm,
            day: dd,
            dateFormatted: dateFormatted, // Strict <DD>/<MM>/<YYYY>
            rawDate: rawDate,
            title: title,
            author: metadata.author || 'Pentadbiran Musolla',
            category: metadata.category || 'Umum',
            summary: summary,
            cover: cover || '',
            tags: Array.isArray(metadata.tags) ? metadata.tags : (metadata.tags ? [metadata.tags] : []),
            readTime: readTime
          });
        });
      });
    });
  });

  // Sort latest first
  posts.sort((a, b) => b.rawDate.localeCompare(a.rawDate));
  return posts;
}

console.log('🕌 Building Mosque Landing Page Template for Production (Cloudflare Pages)...');

// Clean dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// 1. Scan blog directory and create blog/posts.json
const blogPosts = scanBlogPosts();
console.log(`Discovered ${blogPosts.length} blog post(s) in /blog/<year>/<month>/<day>/<post_folder>/`);
const postsJsonPath = path.join(BLOG_DIR, 'posts.json');
fs.writeFileSync(postsJsonPath, JSON.stringify(blogPosts, null, 2), 'utf8');
console.log(`Wrote blog manifest to ${path.relative(ROOT_DIR, postsJsonPath)}`);

// 2. Base items to copy to dist
const itemsToCopy = [
  'index.html',
  'site.config.json',
  'site.config.defaults.json',
  'LICENSE',
  'css',
  'js',
  'lang',
  'data',
  'assets',
  'blog'
];

itemsToCopy.forEach(item => {
  const src = path.join(ROOT_DIR, item);
  const dest = path.join(DIST_DIR, item);
  if (fs.existsSync(src)) {
    copyRecursiveSync(src, dest);
    console.log(`Copied ${item} -> dist/${item}`);
  }
});

// 3. Persistent Overlay Layer: Check for 'content/' directory
if (fs.existsSync(CONTENT_DIR)) {
  console.log(`\n📁 Applying persistent content overlay from 'content/'...`);
  const contentItems = fs.readdirSync(CONTENT_DIR);
  contentItems.forEach(item => {
    const src = path.join(CONTENT_DIR, item);
    // If it's site.config.json, merge or overwrite
    if (item === 'site.config.json') {
      const dest = path.join(DIST_DIR, 'site.config.json');
      fs.copyFileSync(src, dest);
      console.log(`  ✓ Overlayed custom site.config.json`);
    } else if (item === 'assets' || item === 'data' || item === 'blog') {
      const dest = path.join(DIST_DIR, item);
      copyRecursiveSync(src, dest);
      console.log(`  ✓ Overlayed custom ${item}/`);
    } else {
      // Individual custom file (e.g. content/logo.png -> dist/assets/logo.png)
      if (item.startsWith('logo.') || item.startsWith('duitnow-qr.')) {
        const dest = path.join(DIST_DIR, 'assets', item);
        fs.copyFileSync(src, dest);
        console.log(`  ✓ Overlayed custom branding asset ${item} -> dist/assets/${item}`);
      } else {
        const dest = path.join(DIST_DIR, item);
        copyRecursiveSync(src, dest);
        console.log(`  ✓ Overlayed custom ${item}`);
      }
    }
  });
}

// 4. Generate post redirect/fallback pages for direct URL hits
blogPosts.forEach(post => {
  const postHtmlDir = path.join(DIST_DIR, 'blog', post.year, post.month, post.day, post.slug);
  if (fs.existsSync(postHtmlDir)) {
    const fallbackHtml = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <title>${post.title}</title>
  <meta http-equiv="refresh" content="0; url=/blog/?post=${post.slugPath}">
  <script>window.location.replace('/blog/?post=${post.slugPath}');</script>
</head>
<body style="font-family: system-ui, sans-serif; padding: 2rem; text-align: center;">
  <h2>${post.title}</h2>
  <p>Memuatkan artikel... <a href="/blog/?post=${post.slugPath}">Klik di sini jika tidak beralih secara automatik</a>.</p>
</body>
</html>`;
    fs.writeFileSync(path.join(postHtmlDir, 'index.html'), fallbackHtml, 'utf8');
  }
});

// 5. Create Cloudflare Pages _headers for security and caching
const headersContent = `/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/blog/*/*.svg
  Cache-Control: public, max-age=604800

/blog/*/*.png
  Cache-Control: public, max-age=604800

/blog/*/*.jpg
  Cache-Control: public, max-age=604800

/blog/posts.json
  Cache-Control: public, max-age=300, must-revalidate

/lang/*
  Cache-Control: public, max-age=3600
`;

fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent);
console.log('Created dist/_headers for Cloudflare Pages optimization');

console.log('\n✅ Production build complete in dist/ directory!');
