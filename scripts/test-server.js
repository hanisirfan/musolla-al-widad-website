const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  let filePath = path.join(BASE_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Port 0 automatically selects an available port
server.listen(0, '127.0.0.1', async () => {
  const address = server.address();
  const PORT = address.port;
  console.log('Testing server running on ephemeral port', PORT);

  const testEndpoints = [
    '/',
    '/lang/ms.json',
    '/lang/en.json',
    '/site.config.json',
    '/data/announcements.json',
    '/data/organisasi.json',
    '/data/activities.json',
    '/data/reports.json',
    '/assets/logo.png',
    '/assets/duitnow-qr.svg',
    '/assets/perlembagaan/perlembagaan-musolla-al-widad.pdf',
    '/assets/reports/2026/penyata-kewangan-2026-09.pdf',
    '/assets/reports/2025/penyata-kewangan-tahunan-2025.pdf',
    '/LICENSE'
  ];

  function fetchUrl(url) {
    return new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${PORT}${url}`, (res) => {
        let size = 0;
        res.on('data', chunk => size += chunk.length);
        res.on('end', () => resolve({ url, status: res.statusCode, size, type: res.headers['content-type'] }));
      }).on('error', reject);
    });
  }

  try {
    for (const ep of testEndpoints) {
      const result = await fetchUrl(ep);
      console.log(`[PASS] ${result.status} ${result.url} (${result.size} bytes, ${result.type})`);
      if (result.status !== 200) throw new Error(`Status ${result.status} on ${result.url}`);
    }
    console.log('\nAll 14 endpoints verified successfully! 100% PASS.');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    server.close();
    process.exit(1);
  }
});
