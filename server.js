/**
 * Local Static Development Server for Mosque Landing Page Template
 * Zero external dependencies. Uses Node.js built-in 'http', 'fs', and 'path' modules.
 *
 * Features:
 * - Dynamic real-time discovery of Markdown blog posts in /blog/<year>/<month>/<day>/<post_folder>/
 * - Zero terminal compile required for blog updates
 * - Correct MIME types including Markdown (.md)
 * - Support for persistent 'content/' directory overlay
 * Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;
const BLOG_DIR = path.join(BASE_DIR, 'blog');
const CONTENT_DIR = path.join(BASE_DIR, 'content');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

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
 * Extract YAML frontmatter
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
 * Dynamically scan /blog directory on the fly
 */
function scanBlogPostsDynamic() {
  const posts = [];
  if (!fs.existsSync(BLOG_DIR)) return posts;

  try {
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
              dateFormatted: dateFormatted,
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

    posts.sort((a, b) => b.rawDate.localeCompare(a.rawDate));
  } catch (err) {
    console.error('Error scanning blog directory:', err);
  }

  return posts;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Dynamic on-the-fly blog manifest endpoint
  if (pathname === '/blog/posts.json' || pathname === '/api/blog/posts' || pathname === '/posts.json') {
    const dynamicPosts = scanBlogPostsDynamic();
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(JSON.stringify(dynamicPosts, null, 2));
    return;
  }

  // Normalize path & prevent directory traversal
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  // Handle direct blog URL requests like /blog/2026/10/26/slug/
  const blogMatch = safePath.match(/[\\\/]blog[\\\/](\d{4})[\\\/](\d{1,2})[\\\/](\d{1,2})[\\\/]([^\\\/]+)[\\\/]?$/i);
  if (blogMatch) {
    const slugPath = `${blogMatch[1]}/${String(blogMatch[2]).padStart(2, '0')}/${String(blogMatch[3]).padStart(2, '0')}/${blogMatch[4]}`;
    res.writeHead(302, { 'Location': `/blog/?post=${slugPath}` });
    res.end();
    return;
  }

  let filePath = path.join(BASE_DIR, safePath);

  // Check persistent 'content/' overlay first if exists
  if (fs.existsSync(CONTENT_DIR)) {
    const contentCheck = path.join(CONTENT_DIR, safePath.replace(/^\//, ''));
    if (fs.existsSync(contentCheck) && fs.statSync(contentCheck).isFile()) {
      filePath = contentCheck;
    }
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Try checking in public/ if not found in root
      const publicFilePath = path.join(BASE_DIR, 'public', safePath);
      fs.stat(publicFilePath, (pubErr, pubStats) => {
        if (!pubErr && pubStats.isFile()) {
          serveFile(publicFilePath, res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(`<h1>404 Tidak Dijumpai / Not Found</h1><p>Fail ${pathname} tidak wujud.</p>`);
        }
      });
      return;
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Ralat Dalaman Pelayan / 500 Internal Server Error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n======================================================`);
  console.log(`🕌 Pelayan Templat Laman Web Masjid Berjalan!`);
  console.log(`🌐 Buka di pelayar web: http://localhost:${PORT}`);
  console.log(`📝 Indeks Blog On-The-Fly: http://localhost:${PORT}/blog/`);
  console.log(`======================================================\n`);
});
