/**
 * Automated Verification Script for Mosque Landing Page Template
 * Tests endpoints, static assets, dynamic blog manifest, and Markdown serving
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.md': 'text/markdown; charset=UTF-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Serve dynamic blog posts JSON
  if (pathname === '/blog/posts.json' || pathname === '/api/blog/posts') {
    const postsFile = path.join(BASE_DIR, 'blog', 'posts.json');
    if (fs.existsSync(postsFile)) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      fs.createReadStream(postsFile).pipe(res);
      return;
    }
  }

  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  if (safePath === '/blog' || safePath === '/blog/') safePath = '/blog/index.html';

  let filePath = path.join(BASE_DIR, safePath);

  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found: ' + pathname);
});

// Port 0 selects an available port dynamically
server.listen(0, '127.0.0.1', async () => {
  const address = server.address();
  const PORT = address.port;
  console.log('Testing server running on ephemeral port', PORT);

  const testEndpoints = [
    '/',
    '/index.html',
    '/lang/ms.json',
    '/lang/en.json',
    '/site.config.json',
    '/site.config.defaults.json',
    '/data/announcements.json',
    '/data/organisasi.json',
    '/data/activities.json',
    '/data/reports.json',
    '/data/faq.json',
    '/assets/logo.png',
    '/assets/duitnow-qr.svg',
    '/assets/perlembagaan/perlembagaan-musolla-al-widad.pdf',
    '/assets/reports/2026/penyata-kewangan-2026-09.pdf',
    '/assets/reports/2025/penyata-kewangan-tahunan-2025.pdf',
    '/LICENSE',
    '/blog/index.html',
    '/blog/posts.json',
    '/blog/2026/10/26/pelancaran-portal-rasmi-masjid/post.md',
    '/blog/2026/10/26/pelancaran-portal-rasmi-masjid/banner.svg',
    '/blog/2026/10/20/program-kuliah-maghrib-dan-pengajian-kitab/post.md',
    '/blog/2026/10/15/kempen-kebersihan-gotong-royong-perdana/post.md'
  ];

  function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${PORT}${url}`, (res) => {
        let size = 0;
        let data = '';
        res.on('data', chunk => {
          size += chunk.length;
          data += chunk.toString();
        });
        res.on('end', () => resolve({ url, status: res.statusCode, size, type: res.headers['content-type'], body: data }));
      }).on('error', reject);
    });
  }

  try {
    for (const ep of testEndpoints) {
      const result = await fetchUrl(ep);
      console.log(`[PASS] ${result.status} ${result.url} (${result.size} bytes, ${result.type})`);
      if (result.status !== 200) throw new Error(`Status ${result.status} on ${result.url}`);

      // Verify date formatting requirement on blog posts
      if (ep === '/blog/posts.json') {
        const posts = JSON.parse(result.body);
        for (const post of posts) {
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(post.dateFormatted)) {
            throw new Error(`Invalid date format for post "${post.title}": expected <DD>/<MM>/<YYYY>, got "${post.dateFormatted}"`);
          }
          console.log(`  ✓ Post "${post.title.substring(0, 30)}..." date verified: ${post.dateFormatted}`);
        }
      }

      // Verify License has NO PDPA notice
      if (ep === '/LICENSE') {
        if (result.body.includes('PDPA') || result.body.includes('Perlindungan Data Peribadi')) {
          throw new Error('LICENSE file still contains PDPA notice!');
        }
        console.log('  ✓ LICENSE verified: Clean MIT License without PDPA notice');
      }
    }

    console.log(`\n🎉 All ${testEndpoints.length} endpoints and requirements verified successfully! 100% PASS.`);
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    server.close();
    process.exit(1);
  }
});
