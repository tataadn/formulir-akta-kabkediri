// Koordinat dalam pt, diambil dari formulir F-2.01 A (A4 595.32 x 841.92)
const S = 12.21;
const OPT = {
  bj: ['Laki-laki', 'Perempuan'],
  bjn: ['Tunggal', 'Kembar 2', 'Kembar 3', 'Kembar 4', 'Lainnya'],
  bpn: ['Dokter', 'Bidan/Perawat'],
};
// [id, label, tipe, extra]  tipe: n=16 digit, d=tanggal, h=jam, k=angka, r=radio, x=otomatis
const FORM = [
  ['Wilayah', [['prov', 'Provinsi', 'x', 'Jawa Timur (otomatis)'], ['kab', 'Kabupaten/Kota', 'x', 'Kabupaten Kediri (otomatis)'], ['kec', 'Kecamatan', 's'], ['desa', 'Desa/Kelurahan', 'sd'], ['kw', 'Kode Wilayah']]],
  ['Data Pelapor', [['pn', 'Nama lengkap (tanpa singkatan)'], ['pk', 'NIK', 'n'], ['pkk', 'Nomor Kartu Keluarga', 'n'], ['pw', 'Kewarganegaraan', 't', 'WNI']]],
  ['Data Kepala Keluarga (F-1.01)', [['alamat', 'Alamat'], ['rt', 'RT', 'q'], ['rw', 'RW', 'q'], ['kp', 'Kode pos', 'p'], ['telp', 'Telepon / HP', 'm'], ['email', 'E-mail', 'e'], ['dusun', 'Nama dusun/dukuh/kampung', 'o'], ['akta', 'Nomor Akta Perkawinan (opsional)', 'o']]],
  ['Data Ayah', [['an', 'Nama Ayah'], ['ak', 'NIK Ayah', 'n'], ['at', 'Tempat Lahir Ayah'], ['ad', 'Tanggal Lahir Ayah', 'd'], ['aw', 'Kewarganegaraan', 't', 'WNI']]],
  ['Data Ibu', [['in', 'Nama Ibu'], ['ik', 'NIK Ibu', 'n'], ['it', 'Tempat Lahir Ibu'], ['id', 'Tanggal Lahir Ibu', 'd'], ['iw', 'Kewarganegaraan', 't', 'WNI']]],
  ['Data Saksi I', [['s1n', 'Nama Saksi I'], ['s1k', 'NIK Saksi I', 'n'], ['s1w', 'Kewarganegaraan', 't', 'WNI']]],
  ['Data Saksi II', [['s2n', 'Nama Saksi II'], ['s2k', 'NIK Saksi II', 'n'], ['s2w', 'Kewarganegaraan', 't', 'WNI']]],
  ['Data Kelahiran', [['bn', 'Nama bayi'], ['bj', 'Jenis Kelamin', 'r'], ['_a', 'Tempat dilahirkan', 'x', 'RS/RB (otomatis)'], ['_b', 'Tempat kelahiran', 'x', 'Kota Kediri (otomatis)'], ['bt', 'Tanggal lahir', 'd'], ['bp', 'Pukul', 'h'], ['bjn', 'Jenis Kelahiran', 'r'], ['bk', 'Kelahiran ke-', 'k', 1], ['bpn', 'Penolong Kelahiran', 'r'], ['bb', 'Berat bayi (Kg, mis. 3.2)', 'k', 0.1], ['bl', 'Panjang bayi (cm)', 'k', 1]]],
];
// [id, x, top, w, h]
const TEXT = [
  ['prov', 152.8, 22.1, 348.8, 8.3], ['kab', 152.8, 31.3, 348.8, 8.3], ['kec', 152.8, 40.4, 348.8, 8.3], ['desa', 152.8, 49.7, 348.8, 8.3], ['kw', 152.8, 58.9, 348.8, 8.3],
  ['pn', 170.2, 116.1, 404.8, 8.8], ['pw', 170.2, 153.1, 404.8, 8.3],
  ['an', 170.2, 229.1, 404.8, 8.3], ['at', 170.2, 247.4, 404.8, 8.8], ['aw', 170.2, 265.7, 404.8, 8.8],
  ['in', 170.2, 275.2, 404.8, 8.3], ['it', 170.2, 293.3, 404.8, 8.8], ['iw', 170.2, 311.8, 404.8, 8.8],
  ['s1n', 170.2, 331.4, 404.8, 8.8], ['s1w', 170.2, 359.2, 404.8, 8.3], ['s2n', 170.2, 376.4, 404.8, 8.8], ['s2w', 170.2, 404.1, 404.8, 8.6],
  ['bn', 169.8, 423.7, 404.9, 8.6], ['_b', 169.8, 451.0, 404.9, 8.2],
];
// [id, x, top, h, jumlah kotak, lebar kotak]
const NIK = (id, top) => [id, 170.2, top, 8.4, 16, S];
const CELLS = [
  NIK('pk', 125.5), NIK('pkk', 143.8), NIK('ak', 238.3), NIK('ik', 284.4), NIK('s1k', 340.8), NIK('s2k', 385.8),
  ['ad_d', 194.3, 256.8, 8.4, 2, 12.25], ['ad_m', 243.2, 256.8, 8.4, 2, 12.15], ['ad_y', 304.2, 256.8, 8.4, 4, 12.2],
  ['id_d', 194.3, 302.7, 8.4, 2, 12.25], ['id_m', 243.2, 302.7, 8.4, 2, 12.15], ['id_y', 304.2, 302.7, 8.4, 4, 12.2],
  ['hari', 206.2, 460.1, 8.4, 6, 12.2], ['bt_d', 303.9, 460.1, 8.4, 2, 12.2], ['bt_m', 352.6, 460.1, 8.4, 2, 12.25], ['bt_y', 413.7, 460.1, 8.4, 4, 12.23],
  ['jam', 169.8, 469.4, 8.3, 2, 12.2], ['mnt', 218.7, 469.4, 8.3, 2, 12.2],
  ['bb', 169.8, 506.1, 8.6, 3, 12.2], ['bl', 169.8, 515.5, 8.2, 3, 12.2],
];
// kotak centang: [id, nilai, x, top, w, h]
const BOX = [
  ['_rep', 1, 30.8, 92.5, 11.2, 8.3],
  ['bj', 1, 169.8, 433.0, 12.3, 8.3], ['bj', 2, 243.1, 433.0, 12.2, 8.3],
  ['_a', 1, 169.8, 441.7, 12.3, 8.4],
  ...[169.8, 243.1, 316.4, 389.6, 462.8].map((x, i) => ['bjn', i + 1, x, 478.6, 12.2, 8.4]),
  ['bk', 'x', 169.8, 487.6, 12.3, 8.6],
  ...[169.8, 230.8, 316.4, 389.6].map((x, i) => ['bpn', i + 1, x, 496.9, 12.2, 8.5]),
];
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const HARI = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
const singkat = (n) => /\.|(^|\s)\S(\s|$)/.test(n.trim());
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const f = document.getElementById('f');
const today = new Date();
let sigData = ''; // tanda tangan (PNG data URL), kosong jika belum diisi
const SIG = (x, y, w, h, k = 1) => (sigData ? `<img class="sig" src="${sigData}" alt="" style="left:${x * k}pt;top:${y * k}pt;width:${w * k}pt;height:${h * k}pt">` : '');

// ---------- bentuk form (Bootstrap) ----------
const fl = (id, label, ctl) => `<div class="form-floating">${ctl}<label for="${id}">${label}</label></div>`;
f.innerHTML = FORM.map(([t, fs], n) => `
<div class="card mb-3"><div class="card-header"><span class="sec-no">${n + 1}</span><span class="fw-semibold">${t}</span></div><div class="card-body"><div class="row g-3">
${fs.map(([id, l, k, x]) => {
  if (k === 'r') return `<div class="col-12"><div class="small text-body-secondary mb-1">${l}</div><div class="d-flex flex-wrap gap-2">${OPT[id].map((o, i) =>
    `<input type="radio" class="btn-check" name="${id}" id="${id}${i}" value="${i + 1}" required autocomplete="off"><label class="btn btn-outline-brand btn-sm" for="${id}${i}">${o}</label>`).join('')}</div></div>`;
  if (k === 's' || k === 'sd') return `<div class="col-md-6">${fl(id, l, `<select class="form-select" id="${id}" name="${id}" required${k === 'sd' ? ' disabled' : ''}></select>`)}</div>`;
  if (k === 'x') return `<div class="col-md-6">${fl('fx' + id, l, `<input class="form-control" id="fx${id}" value="${x}" disabled placeholder=" ">`)}</div>`;
  const ty = { d: 'date', h: 'time', k: 'number', e: 'email' }[k] || 'text';
  const num = (p, m, t) => ` inputmode="numeric" pattern="${p}" maxlength="${m}" title="${t}"`;
  const ex = { n: num('[0-9]{16}', 16, 'Harus 16 digit angka'), p: num('[0-9]{5}', 5, 'Harus 5 digit angka'), q: num('[0-9]{1,2}', 2, 'Isi 1-2 digit angka'), m: num('[0-9+ ]{8,16}', 16, 'Nomor telepon/HP, angka saja'), k: ` min="0" step="${x}"` }[k] || '';
  return `<div class="col-md-6">${fl(id, l, `<input class="form-control" id="${id}" name="${id}" type="${ty}"${ex} value="${k === 't' ? x : ''}"${k === 'e' || k === 'o' ? '' : ' required'} placeholder=" ">`)}<div class="invalid-feedback"></div></div>`;
}).join('')}
</div></div></div>`).join('');

// ---------- dropdown kecamatan -> desa/kelurahan ----------
const kec = f.elements.kec, desa = f.elements.desa;
const opts = (a, ph) => `<option value="">-- Pilih ${ph} --</option>` + a.map((x) => `<option>${esc(x)}</option>`).join('');
kec.innerHTML = opts(Object.keys(WILAYAH).sort(), 'Kecamatan');
function fillDesa() {
  const l = WILAYAH[kec.value] || [];
  desa.innerHTML = opts(l, 'Desa/Kelurahan');
  desa.disabled = !l.length;
}
fillDesa();
kec.addEventListener('input', fillDesa);
initMembers();

// ---------- kotak tanda tangan ----------
f.insertAdjacentHTML('beforeend', `<div class="card mb-3"><div class="card-header"><span class="sec-no">${FORM.length + 2}</span><span class="fw-semibold">Tanda Tangan Pelapor / Kepala Keluarga</span><button type="button" class="btn btn-sm btn-outline-brand ms-auto" id="sigClear">Hapus</button></div><div class="card-body"><div class="sig-wrap" id="sigWrap"><canvas id="sigPad"></canvas><div class="sig-hint">Tanda tangan di sini (pakai jari atau mouse)</div></div><div class="form-text mt-2">Tanda tangan otomatis masuk ke semua formulir, tepat di atas nama lengkap pelapor.</div></div></div>`);
(function sigPad() {
  const cv = document.getElementById('sigPad'), ctx = cv.getContext('2d'), wrap = document.getElementById('sigWrap');
  const dpr = Math.max(window.devicePixelRatio || 1, 2);
  cv.width = cv.clientWidth * dpr; cv.height = cv.clientHeight * dpr;
  ctx.lineWidth = 2.6 * dpr; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#111'; ctx.fillStyle = '#111';
  let drawing = false, last = null;
  const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height }; };
  cv.addEventListener('pointerdown', (e) => { drawing = true; last = pos(e); cv.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.arc(last.x, last.y, ctx.lineWidth / 2, 0, 7); ctx.fill(); });
  cv.addEventListener('pointermove', (e) => { if (!drawing) return; const q = pos(e); ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(q.x, q.y); ctx.stroke(); last = q; });
  const end = () => { if (drawing) { drawing = false; commit(); } };
  cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
  function commit() { // potong area kosong supaya pas di kolom tanda tangan
    const w = cv.width, h = cv.height, d = ctx.getImageData(0, 0, w, h).data;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (d[(y * w + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) sigData = '';
    else {
      const pd = 6, cw = x1 - x0 + 1 + pd * 2, ch = y1 - y0 + 1 + pd * 2, t = document.createElement('canvas');
      t.width = cw; t.height = ch; t.getContext('2d').drawImage(cv, x0 - pd, y0 - pd, cw, ch, 0, 0, cw, ch);
      sigData = t.toDataURL('image/png');
    }
    wrap.classList.toggle('has', !!sigData); render();
  }
  document.getElementById('sigClear').onclick = () => { ctx.clearRect(0, 0, cv.width, cv.height); commit(); };
})();

// ---------- olah nilai ----------
const dp = (s) => (s ? s.split('-') : ['', '', '']);
function derive(v) {
  const [by, bm, bd] = dp(v.bt), [ay, am, ad] = dp(v.ad), [iy, im, id] = dp(v.id);
  const [jam, mnt] = (v.bp || ':').split(':');
  const d = {};
  for (const k in v) d[k] = String(v[k] ?? '').toUpperCase();
  return Object.assign(d, {
    ad_d: ad, ad_m: am, ad_y: ay, id_d: id, id_m: im, id_y: iy, bt_d: bd, bt_m: bm, bt_y: by, jam, mnt,
    hari: v.bt ? HARI[new Date(+by, +bm - 1, +bd).getDay()] : '',
    bb: v.bb ? Number(v.bb).toFixed(1).replace('.', ',') : '',
    bl: v.bl ? String(Math.round(v.bl)) : '',
    _b: 'KOTA KEDIRI', prov: 'JAWA TIMUR', kab: 'KABUPATEN KEDIRI', _rep: '1', _a: '1',
  });
}
const P = (x, t, w, h) => `left:${x}pt;top:${t}pt;width:${w}pt;height:${h}pt;line-height:${h}pt`;

// ---------- gambar formulir ----------
function render() {
  const v = Object.fromEntries(new FormData(f));
  const d = derive(v);
  const tgl = `${today.getDate()} ${BULAN[today.getMonth()]} ${today.getFullYear()}`;
  let h = '<img src="assets/svg/form-bg.svg" alt="">';
  for (const [id, x, t, w, hh] of TEXT) if (d[id]) h += `<div class="t" style="${P(x, t, w, hh)}">${esc(d[id])}</div>`;
  for (const [id, x, t, hh, n, st] of CELLS)
    [...(d[id] || '').slice(0, n)].forEach((ch, i) => { h += `<div class="c" style="${P(x + i * st, t, st, hh)}">${esc(ch)}</div>`; });
  for (const [id, val, x, t, w, hh] of BOX) {
    const on = val === 'x' ? !!v.bk : String(d[id]) === String(val);
    if (on) h += `<div class="b" style="${P(x, t, w, hh)}">${val === 'x' ? esc(v.bk) : 'X'}</div>`;
  }
  h += `<div class="cv" style="${P(413, 722.5, 124, 8.5)}">Kediri, ${tgl}</div>`;
  h += `<div class="cv" style="${P(425, 775.6, 100, 8.4)};font-weight:700">${d.pn ? '( ' + esc(d.pn) + ' )' : '(……………………………………………..)'}</div>`;
  h += SIG(430, 741, 90, 34);
  document.getElementById('paper').innerHTML = h;
  render2(d, tgl);
  render3(v);
}

// ---------- F-1.02 (asli ukuran Letter, diskalakan ke A4 supaya muat) ----------
const K = 595.32 / 612;
const P2 = (x, t, w, h, fs) => `left:${x * K}pt;top:${t * K}pt;width:${w * K}pt;height:${h * K}pt;line-height:${h * K}pt;font-size:${fs * K}pt`;
function render2(d, tgl) {
  let g = '<img src="assets/svg/form-bg-2.svg" alt="">';
  // I. Data pemohon = data pelapor (kepala keluarga / ayah bayi)
  [[d.pn, 94.5], [d.pk, 108.5], [d.pkk, 122.8]].forEach(([val, t]) => {
    if (val) g += `<div class="t" style="${P2(203.8, t, 361.2, 13, 9)}">${esc(val)}</div>`;
  });
  // II. Jenis permohonan: Kartu Keluarga > B. Perubahan Data > 2. Peristiwa penting (dilingkari)
  g += `<div style="position:absolute;border:1pt solid #000;border-radius:50%;left:${66.5 * K}pt;top:${338.5 * K}pt;width:${11.5 * K}pt;height:${11.5 * K}pt"></div>`;
  // III. KK Lama/KK Rusak, Buku nikah | IV. KK orangtua/wali, KTP-el orangtua/wali (disilang)
  [[74.0, 444.2], [74.0, 472.5], [74.0, 614.2], [74.0, 629.5]].forEach(([x, t]) => {
    g += `<div class="b" style="${P2(x, t, 9.8, 9.8, 9)}">X</div>`;
  });
  // Tempat, tanggal, dan nama pemohon
  g += `<div class="cv" style="${P2(416, 654.8, 134, 9.2, 8.2)}">Kediri, ${tgl}</div>`;
  g += `<div class="cv" style="${P2(421, 710.4, 124, 9.4, 8.2)};font-weight:700">${d.pn ? '( ' + esc(d.pn) + ' )' : '(……………………………………………..)'}</div>`;
  g += SIG(438, 673, 90, 36, K);
  document.getElementById('paper2').innerHTML = g;
}

// ---------- skala pratinjau ----------
function fit() {
  const W = document.getElementById('pv').clientWidth;
  [['wrap', 'stage', 793.76, 1122.56], ['wrap2', 'stage2', 793.76, 1027.2], ['wrap3', 'stage3', 1027.2, 793.8], ['wrap4', 'stage4', 1027.2, 793.8], ['wrap5', 'stage5', 1027.2, 793.8]].forEach(([w, st, pw, ph]) => {
    const sc = Math.min(1, W / pw);
    document.getElementById(w).style.transform = `scale(${sc})`;
    document.getElementById(st).style.height = ph * sc + 'px';
  });
}

// ---------- event ----------
f.addEventListener('input', () => {
  const pn = f.elements.pn;
  pn.setCustomValidity(singkat(pn.value) ? 'Nama tidak boleh disingkat, tulis lengkap.' : '');
  pn.classList.toggle('is-invalid', !!pn.validationMessage && pn.value !== '');
  pn.closest('.col-md-6').querySelector('.invalid-feedback').textContent = pn.validationMessage;
  render();
});
// Satu kali cetak hanya boleh satu orientasi, jadi: cetak portrait dulu, lalu otomatis landscape
const pg = document.head.appendChild(document.createElement('style'));
let antrian = [];
function cetakBerikut() {
  const m = antrian.shift();
  if (!m) { document.body.dataset.print = 'all'; return; }
  document.body.dataset.print = m;
  pg.textContent = `@page{size:A4 ${m === 'l' ? 'landscape' : 'portrait'};margin:0}`;
  window.print();
}
// ---------- unduh PDF (semua halaman, termasuk tanda tangan) ----------
async function unduhPDF() {
  if (!f.reportValidity()) return;
  if (!sigData) { alert('Tanda tangan belum diisi. Silakan tanda tangan dulu di kotak Tanda Tangan.'); document.getElementById('sigPad').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  const btn = document.getElementById('btnPdf'), label = btn.innerHTML;
  btn.disabled = true; btn.textContent = 'Membuat PDF...';
  try {
    const { jsPDF } = window.jspdf, kk = 595.28 / 595.32;
    const pages = [['paper', 'p'], ['paper2', 'p2'], ['paper3', 'l'], ['paper4', 'l'], ['paper5', 'l']];
    let doc;
    for (let i = 0; i < pages.length; i++) {
      const [id, kind] = pages[i];
      const c = await html2canvas(document.getElementById(id), {
        scale: 3, backgroundColor: '#ffffff', logging: false,
        onclone: (d) => { // lepaskan dari pratinjau (skala/tab) supaya ukuran asli
          const el = d.getElementById(id), host = d.createElement('div');
          host.style.cssText = 'position:absolute;left:0;top:0;margin:0'; d.body.appendChild(host); host.appendChild(el);
        },
      });
      if (i === 0) doc = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
      else doc.addPage('a4', kind === 'l' ? 'landscape' : 'portrait');
      if (kind === 'p') doc.addImage(c, 'PNG', 0, 0, 595.28, 841.89, undefined, 'FAST');
      else if (kind === 'p2') doc.addImage(c, 'PNG', 0, 0, 595.28, 770.4 * kk, undefined, 'FAST');
      else doc.addImage(c, 'PNG', 35.7, 0, 770.4, 595.28, undefined, 'FAST');
    }
    const nama = (f.elements.bn.value || 'bayi').trim().replace(/[^\w]+/g, '-');
    doc.save(`Formulir-Akta-Kelahiran-${nama}.pdf`);
  } catch (err) {
    console.error(err);
    alert('PDF gagal dibuat.\n\nJika halaman dibuka langsung dari file (alamat diawali file://), buka lewat server lokal, misalnya jalankan "php -S localhost:8000" di folder ini lalu buka http://localhost:8000.\nPastikan juga koneksi internet aktif untuk memuat pustaka PDF.');
  } finally { btn.disabled = false; btn.innerHTML = label; }
}
document.getElementById('btnPdf').onclick = unduhPDF;
document.getElementById('btnCetak').onclick = () => { if (f.reportValidity()) { antrian = ['p', 'l']; cetakBerikut(); } };
window.addEventListener('afterprint', () => { if (antrian.length) setTimeout(cetakBerikut, 300); else document.body.dataset.print = 'all'; });
document.getElementById('btnReset').onclick = () => { if (confirm('Kosongkan semua isian?')) { f.reset(); fillDesa(); resetMembers(); document.getElementById('sigClear').click(); } };
document.getElementById('pvTabs').addEventListener('click', (e) => {
  const b = e.target.closest('[data-pv]');
  if (!b) return;
  ['stage', 'stage2', 'stage3', 'stage4', 'stage5'].forEach((id, i) => document.getElementById(id).classList.toggle('off', i !== +b.dataset.pv));
  document.querySelectorAll('#pvTabs .nav-link').forEach((x) => x.classList.toggle('active', x === b));
});
window.addEventListener('resize', fit);
fit(); render();