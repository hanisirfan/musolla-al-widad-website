const fs = require('fs');
const path = require('path');

function createSamplePdf(title, subtitle, bodyLines) {
  const content = [];
  content.push('%PDF-1.4');
  content.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj');
  content.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj');
  content.push('3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj');
  content.push('4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj');

  const streamLines = [
    'BT',
    '/F1 16 Tf',
    '50 780 Td',
    '(' + title + ') Tj',
    '/F1 11 Tf',
    '0 -26 Td',
    '(' + subtitle + ') Tj',
    '0 -18 Td',
    '(----------------------------------------------------------------------) Tj'
  ];

  bodyLines.forEach(l => {
    streamLines.push('0 -18 Td');
    streamLines.push('(' + l + ') Tj');
  });

  streamLines.push('ET');

  const streamText = streamLines.join('\n');
  const streamLen = Buffer.byteLength(streamText, 'utf8');

  content.push('5 0 obj << /Length ' + streamLen + ' >> stream');
  content.push(streamText);
  content.push('endstream\nendobj');

  let body = content.join('\n') + '\n';
  
  const offsets = [];
  const lines = body.split('\n');
  let currentOffset = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^(\d+)\s+0\s+obj/);
    if (m) {
      offsets[parseInt(m[1])] = currentOffset;
    }
    currentOffset += Buffer.byteLength(line, 'ascii') + 1;
  }

  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i++) {
    xref += String(offsets[i] || 0).padStart(10, '0') + ' 00000 n \n';
  }

  const trailer = 'trailer << /Size 6 /Root 1 0 R >>\nstartxref\n' + currentOffset + '\n%%EOF\n';
  return body + xref + trailer;
}

const ROOT_DIR = path.join(__dirname, '..');

// 1. Perlembagaan Musolla
const perlembagaanDir = path.join(ROOT_DIR, 'assets', 'perlembagaan');
if (!fs.existsSync(perlembagaanDir)) fs.mkdirSync(perlembagaanDir, { recursive: true });

fs.writeFileSync(
  path.join(perlembagaanDir, 'perlembagaan-musolla-al-widad.pdf'),
  createSamplePdf(
    'PERLEMBAGAAN MUSOLLA AL-WIDAD KITA SEJATI',
    'Pangsapuri Kita Sejati Cybersouth, 43800 Dengkil, Selangor',
    [
      'FASAL 1: NAMA DAN ALAMAT BERDAFTAR',
      'Nama rasmi ialah Musolla Al-Widad, Pangsapuri Kita Sejati Cybersouth.',
      'Alamat: Persiaran Cybersouth Perdana, Cybersouth, 43800 Dengkil, Selangor.',
      'FASAL 2: MATLAMAT PENUBUHAN',
      'Pusat ibadah solat berjemaah, majlis taklim, kebajikan dan perpaduan jemaah.',
      'FASAL 3: PENTADBIRAN & JAWATANKUASA',
      'Ditadbir oleh Jawatankuasa yang dilantik dalam Mesyuarat Agung Penduduk.',
      'FASAL 4: PENGURUSAN KEWANGAN & AUDIT',
      'Setiap infaq dan perbelanjaan diaudit secara telus dan dibentangkan berkala.'
    ]
  )
);
console.log('Generated Perlembagaan PDF');

// 2. Financial Reports for 2026
const dir2026 = path.join(ROOT_DIR, 'assets', 'reports', '2026');
if (!fs.existsSync(dir2026)) fs.mkdirSync(dir2026, { recursive: true });

const reports2026 = [
  { file: 'penyata-kewangan-2026-09.pdf', title: 'PENYATA KEWANGAN BULANAN - SEPTEMBER 2026', month: 'September 2026' },
  { file: 'penyata-kewangan-2026-08.pdf', title: 'PENYATA KEWANGAN BULANAN - OGOS 2026', month: 'Ogos 2026' },
  { file: 'penyata-kewangan-2026-07.pdf', title: 'PENYATA KEWANGAN BULANAN - JULAI 2026', month: 'Julai 2026' },
  { file: 'penyata-kewangan-2026-06.pdf', title: 'PENYATA KEWANGAN BULANAN - JUN 2026', month: 'Jun 2026' },
  { file: 'penyata-kewangan-2026-05.pdf', title: 'PENYATA KEWANGAN BULANAN - MEI 2026', month: 'Mei 2026' },
  { file: 'penyata-kewangan-2026-04.pdf', title: 'PENYATA KEWANGAN BULANAN - APRIL 2026', month: 'April 2026' },
  { file: 'penyata-kewangan-2026-03.pdf', title: 'PENYATA KEWANGAN BULANAN - MAC 2026', month: 'Mac 2026' }
];

reports2026.forEach(r => {
  fs.writeFileSync(
    path.join(dir2026, r.file),
    createSamplePdf(
      r.title,
      'Musolla Al-Widad, Pangsapuri Kita Sejati (' + r.month + ')',
      [
        'RINGKASAN PENYATA KEWANGAN BULANAN',
        'Status: Diaudit dan Disahkan oleh Pemeriksa Kira-Kira',
        'Bank Islam Malaysia Berhad: 12038010098765',
        'Disediakan oleh Bendahari Musolla Al-Widad'
      ]
    )
  );
});
console.log('Generated 2026 Reports');

// 3. Financial Reports for 2025
const dir2025 = path.join(ROOT_DIR, 'assets', 'reports', '2025');
if (!fs.existsSync(dir2025)) fs.mkdirSync(dir2025, { recursive: true });

const reports2025 = [
  { file: 'penyata-kewangan-tahunan-2025.pdf', title: 'LAPORAN KEWANGAN TAHUNAN - TAHUN 2025', month: 'Jan - Dis 2025' },
  { file: 'penyata-kewangan-2025-12.pdf', title: 'PENYATA KEWANGAN BULANAN - DISEMBER 2025', month: 'Disember 2025' },
  { file: 'penyata-kewangan-2025-11.pdf', title: 'PENYATA KEWANGAN BULANAN - NOVEMBER 2025', month: 'November 2025' }
];

reports2025.forEach(r => {
  fs.writeFileSync(
    path.join(dir2025, r.file),
    createSamplePdf(
      r.title,
      'Musolla Al-Widad, Pangsapuri Kita Sejati (' + r.month + ')',
      [
        'RINGKASAN LAPORAN KEWANGAN',
        'Status: Dibentangkan & Diluluskan dalam AGM Penduduk',
        'Bank Islam Malaysia Berhad: 12038010098765',
        'Disediakan oleh Bendahari Musolla Al-Widad'
      ]
    )
  );
});
console.log('Generated 2025 Reports');
