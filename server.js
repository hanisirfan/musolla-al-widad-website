/**
 * Local Static Development Server for Musolla Al-Widad Kita Sejati
 * Zero external dependencies. Uses Node.js built-in 'http', 'fs', and 'path' modules.
 * Run with: node server.js  or  agy-node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
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

const server = http.createServer((req, res) => {
  // Parse URL safely
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Normalize path & prevent directory traversal
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  let filePath = path.join(BASE_DIR, safePath);

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
  console.log(`🕌 Laman Web Musolla Al-Widad Kita Sejati Berjalan!`);
  console.log(`🌐 Buka di pelayar web: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
