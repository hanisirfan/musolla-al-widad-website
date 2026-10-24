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
    '/F1 12 Tf',
    '0 -28 Td',
    '(' + subtitle + ') Tj',
    '0 -20 Td',
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

const reportsDir = path.join(__dirname, '..', 'assets', 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Reports
const reports = [
  { file: 'penyata-kewangan-2026-09.pdf', title: 'PENYATA KEWANGAN BULANAN - SEPTEMBER 2026', subtitle: 'Musolla Al-Widad Kita Sejati Cybersouth (September 2026)', lines: [
    'RINGKASAN PENYATA KEWANGAN BULANAN',
    'Baki Terdahulu: RM 30,320.00',
    'Jumlah Penerimaan Infaq / Tabung: RM 12,450.00',
    'Jumlah Perbelanjaan Utiliti & Penyelenggaraan: RM 4,120.00',
    'Baki Bersih Akhir Bulan di Bank Islam: RM 38,650.00',
    'Status: Telah Diaudit & Disahkan oleh Pemeriksa Kira-Kira Komuniti'
  ]},
  { file: 'penyata-kewangan-2026-08.pdf', title: 'PENYATA KEWANGAN BULANAN - OGOS 2026', subtitle: 'Musolla Al-Widad Kita Sejati Cybersouth (Ogos 2026)', lines: [
    'RINGKASAN PENYATA KEWANGAN BULANAN',
    'Baki Terdahulu: RM 23,410.00',
    'Jumlah Penerimaan Infaq / Tabung: RM 10,800.00',
    'Jumlah Perbelanjaan Utiliti & Penyelenggaraan: RM 3,890.00',
    'Baki Bersih Akhir Bulan di Bank Islam: RM 30,320.00',
    'Status: Telah Diaudit & Disahkan oleh Pemeriksa Kira-Kira Komuniti'
  ]},
  { file: 'penyata-kewangan-2026-07.pdf', title: 'PENYATA KEWANGAN BULANAN - JULAI 2026', subtitle: 'Musolla Al-Widad Kita Sejati Cybersouth (Julai 2026)', lines: [
    'RINGKASAN PENYATA KEWANGAN BULANAN',
    'Baki Terdahulu: RM 17,370.00',
    'Jumlah Penerimaan Infaq / Tabung: RM 9,450.00',
    'Jumlah Perbelanjaan Utiliti & Penyelenggaraan: RM 3,410.00',
    'Baki Bersih Akhir Bulan di Bank Islam: RM 23,410.00',
    'Status: Telah Diaudit & Disahkan oleh Pemeriksa Kira-Kira Komuniti'
  ]},
  { file: 'penyata-kewangan-tahunan-2025.pdf', title: 'LAPORAN KEWANGAN TAHUNAN - TAHUN 2025', subtitle: 'Musolla Al-Widad Kita Sejati Cybersouth (1 Jan - 31 Dis 2025)', lines: [
    'RINGKASAN LAPORAN KEWANGAN TAHUNAN BERAKHIR 31 DISEMBER 2025',
    'Jumlah Penerimaan Infaq Keseluruhan: RM 85,400.00',
    'Jumlah Perbelanjaan Tahunan (Operasi, Utiliti, Aktiviti): RM 42,100.00',
    'Baki Terkumpul Dibawa Ke Hadapan: RM 43,300.00',
    'Status: Dibentangkan dan Diluluskan Sebulat Suara dalam Mesyuarat Agung (AGM)'
  ]},
  { file: 'perlembagaan-musolla-al-widad.pdf', title: 'PERLEMBAGAAN MUSOLLA AL-WIDAD KITA SEJATI', subtitle: 'Dokumen Peraturan dan Tatacara Pentadbiran Musolla', lines: [
    'FASAL 1: NAMA DAN ALAMAT BERDAFTAR',
    'Nama organisasi ini ialah Musolla Al-Widad Kita Sejati Cybersouth.',
    'Alamat rasmi: Residensi Kita Sejati Cybersouth, 43800 Dengkil, Selangor.',
    'FASAL 2: TUJUAN DAN OBJEKTIF PENUBUHAN',
    'Menyediakan prasarana ibadah fardu lima waktu yang kondusif.',
    'Mengimarahkan majlis ilmu, pengajian Al-Quran dan pembangunan sahsiah jemaah.',
    'Mengeratkan ukhuwah kejiranan dan memelihara kebajikan umat Islam setempat.',
    'FASAL 3: PENTADBIRAN DAN JAWATANKUASA',
    'Ditadbir oleh Jawatankuasa yang dilantik terdiri daripada Pengerusi, Setiausaha,',
    'Bendahari, Ketua-Ketua Biro dan Pemeriksa Kira-Kira Bebas.'
  ]}
];

reports.forEach(r => {
  const p = path.join(reportsDir, r.file);
  fs.writeFileSync(p, createSamplePdf(r.title, r.subtitle, r.lines));
  console.log('Generated:', p);
});
