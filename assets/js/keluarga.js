// ===== F-1.01 Formulir Biodata Keluarga (3 halaman, Letter landscape 792x612 -> diskalakan K ke A4) =====
const AGAMA = ['ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDHA', 'KONGHUCU', 'KEPERCAYAAN TERHADAP TUHAN YME'];
const HUB = ['KEPALA KELUARGA', 'SUAMI', 'ISTRI', 'ANAK', 'MENANTU', 'CUCU', 'ORANGTUA', 'MERTUA', 'FAMILI LAIN', 'PEMBANTU', 'LAINNYA'];
const PEND = ['TIDAK/BELUM SEKOLAH', 'BELUM TAMAT SD/SEDERAJAT', 'TAMAT SD/SEDERAJAT', 'SLTP/SEDERAJAT', 'SLTA/SEDERAJAT', 'DIPLOMA I/II', 'AKADEMI/DIPLOMA III/S. MUDA', 'DIPLOMA IV/STRATA I', 'STRATA II', 'STRATA III'];
const maxM = () => 10 - babyCount(); // formulir hanya punya 10 baris: anggota KK + bayi
const M0 = (hub = '') => ({ t: {}, nama: '', jk: '', tl: '', tgl: '', agama: '', hub, pend: '', kerja: '', ibu: '', ayah: '' });
let members = [M0('KEPALA KELUARGA'), M0('ISTRI')], bayiAgama = '';
// [kunci, label, tipe, pilihan]
const FLD = [
  ['nama', 'Nama lengkap'], ['jk', 'Jenis kelamin', 's', ['1|Laki-laki', '2|Perempuan']], ['tl', 'Tempat lahir'], ['tgl', 'Tanggal lahir', 'date'],
  ['agama', 'Agama', 's', AGAMA], ['hub', 'Status hubungan dalam keluarga', 's', HUB], ['pend', 'Pendidikan terakhir (sesuai KK)', 's', PEND],
  ['kerja', 'Jenis pekerjaan (sesuai KK)'], ['ibu', 'Nama ibu (sesuai KK)'], ['ayah', 'Nama ayah (sesuai KK)'],
];
const optHtml = (list, val) => '<option value="">-- Pilih --</option>' + list.map((o) => {
  const [a, b] = o.includes('|') ? o.split('|') : [o, o];
  return `<option value="${esc(a)}"${a === val ? ' selected' : ''}>${esc(b)}</option>`;
}).join('');
// Anggota 1 (kepala keluarga) otomatis dari Data Ayah, anggota 2 (istri) dari Data Ibu, selama belum diubah manual
const AUTO = [{ nama: 'an', tl: 'at', tgl: 'ad', jk: '1' }, { nama: 'in', tl: 'it', tgl: 'id', jk: '2' }];
const gv = (i, k, v) => {
  const m = members[i], a = AUTO[i];
  if (m.t[k] || !a || !(k in a)) return m[k] || '';
  return (k === 'jk' ? a.jk : v[a[k]]) || '';
};

function renderMembers() {
  const v = Object.fromEntries(new FormData(f));
  document.getElementById('members').innerHTML =
    `<div class="card mb-3"><div class="card-header"><span class="sec-no">${FORM.length + 1}</span><span class="fw-semibold">Anggota Keluarga sesuai KK <span class="text-body-secondary fw-normal small">(untuk F-1.01 Biodata Keluarga)</span></span><button type="button" class="btn btn-sm btn-outline-brand ms-auto" id="mAdd"${members.length >= maxM() ? ' disabled' : ''}>+ Tambah anggota</button></div><div class="card-body">${members.length + babyCount(v) > 10 ? '<div class="alert alert-warning py-2 small">Formulir hanya punya 10 baris. Kurangi anggota keluarga supaya semua anggota dan bayi muat.</div>' : ''}` +
    members.map((m, i) => `<div class="member border rounded-3 p-3 mb-3"><div class="d-flex justify-content-between align-items-center mb-3"><strong>Anggota ${i + 1}${i === 0 ? ' (kepala keluarga)' : ''}</strong>${i > 1 ? `<button type="button" class="btn btn-sm btn-outline-danger" data-del="${i}">Hapus</button>` : ''}</div><div class="row g-3">` +
      FLD.map(([k, l, t, o]) => `<div class="col-md-6"><div class="form-floating">` + (t === 's'
        ? `<select class="form-select" data-i="${i}" data-k="${k}" required>${optHtml(o, gv(i, k, v))}</select>`
        : `<input class="form-control" placeholder=" " data-i="${i}" data-k="${k}"${t === 'date' ? ' type="date"' : ''} value="${esc(gv(i, k, v))}" required>`) + `<label>${l}</label></div></div>`).join('') +
      '</div></div>').join('') +
    `<div class="member border rounded-3 p-3 bg-light"><strong>Anggota ${members.length + 1}${babyCount() > 1 ? '-' + (members.length + babyCount()) : ''}: ${babyCount() > 1 ? 'Bayi kembar' : 'Bayi'} (otomatis)</strong><div class="small text-secondary mb-2">Nama, jenis kelamin, tanggal lahir, serta nama ayah dan ibu diambil dari data di atas. Tempat lahir Kota Kediri, kewarganegaraan WNI, hubungan ANAK, pendidikan TIDAK/BELUM SEKOLAH, pekerjaan BELUM/TIDAK BEKERJA.</div><div class="form-floating"><select class="form-select" id="bayiAgama" required>${optHtml(AGAMA, bayiAgama)}</select><label for="bayiAgama">Agama bayi</label></div></div></div></div>`;
}
function initMembers() {
  f.insertAdjacentHTML('beforeend', '<div id="members"></div>');
  renderMembers();
  const el = document.getElementById('members');
  el.addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'bayiAgama') { bayiAgama = t.value; return; }
    if (t.dataset.i === undefined) return;
    members[t.dataset.i][t.dataset.k] = t.value;
    members[t.dataset.i].t[t.dataset.k] = true;
  });
  el.addEventListener('click', (e) => {
    if (e.target.id === 'mAdd' && members.length < maxM()) { members.push(M0()); renderMembers(); render(); }
    if (e.target.dataset.del !== undefined) { members.splice(+e.target.dataset.del, 1); renderMembers(); render(); }
  });
}
function resetMembers() { members = [M0('KEPALA KELUARGA'), M0('ISTRI')]; bayiAgama = ''; renderMembers(); }

// ---------- gambar ----------
const up = (s) => String(s || '').toUpperCase();
const tg = (s) => { if (!s) return ''; const [y, m, d] = s.split('-'); return `${+d} ${BULAN[m - 1]} ${y}`.toUpperCase(); };
const t3 = (x, y, w, h, s, fs = 9) => (s ? `<div class="t" style="${P2(x, y, w, h, fs)}">${esc(s)}</div>` : '');
const cs = (s, x, y, h, n, st) => [...String(s || '').slice(0, n)].map((ch, i) => `<div class="c" style="${P2(x + i * st, y, st, h, 9)}">${esc(ch)}</div>`).join('');
const pad2 = (s) => (s ? String(s).padStart(2, '0') : '');
function Cc(x, y, w, h, s, fs = 7) { // teks pas kolom: kecilkan, lalu 2 baris bila masih panjang
  if (!s) return '';
  let z = fs; const cw = 0.52;
  if (s.length * z * cw > w - 3) z = Math.max(4.4, (w - 3) / (s.length * cw));
  const wrap = s.length * z * cw > w - 3;
  return `<div class="kc${wrap ? ' w' : ''}" style="left:${x * K}pt;top:${y * K}pt;width:${w * K}pt;height:${h * K}pt;font-size:${z * K}pt">${esc(s)}</div>`;
}
function render3(v, b = 0) {
  [0, 1].forEach((i) => ['nama', 'tl', 'tgl', 'jk'].forEach((k) => { // jaga isian otomatis tetap sinkron
    const el = document.querySelector(`[data-i="${i}"][data-k="${k}"]`), val = gv(i, k, v);
    if (el && !members[i].t[k] && el.value !== val) el.value = val;
  }));
  const R = members.map((m, i) => Object.fromEntries(Object.keys(m).filter((k) => k !== 't').map((k) => [k, gv(i, k, v)])));
  allBabies.forEach((bb) => R.push({ nama: bb.bn, jk: bb.bj, tl: 'Kota Kediri', tgl: bb.bt, agama: bayiAgama, hub: 'ANAK', pend: 'TIDAK/BELUM SEKOLAH', kerja: 'BELUM/TIDAK BEKERJA', ibu: v.in, ayah: v.an }));
  const jkT = { 1: 'LAKI-LAKI', 2: 'PEREMPUAN' };
  // Hal 1
  paperEl(b, 3).innerHTML = '<img src="assets/svg/form-bg-3.svg" alt="">' +
    `<div class="b" style="${P2(32.5, 112.5, 15.8, 14.8, 11)}">X</div>` +
    t3(259.2, 176.8, 514.8, 14.8, up(v.pn)) + t3(259.2, 192.8, 514.8, 14.8, up(v.alamat)) +
    cs(v.kp, 259.2, 209, 14.8, 5, 15.12) + cs(pad2(v.rt), 395.2, 209, 14.8, 2, 15.15) + cs(pad2(v.rw), 486, 209, 14.8, 2, 15.1) + cs(pad2(R.length), 682.5, 209, 14.8, 2, 15.15) +
    t3(259.2, 225, 257.8, 14.8, v.telp) + t3(259.2, 241, 257.8, 14.8, v.email) +
    t3(304.5, 289.2, 469.5, 14.8, 'JAWA TIMUR') + t3(304.5, 305.5, 469.5, 14.8, 'KABUPATEN KEDIRI') +
    t3(304.5, 328.5, 469.5, 14.8, up(v.kec)) + t3(304.5, 344.5, 469.5, 14.8, up(v.desa)) + t3(304.5, 360.5, 469.5, 14.8, up(v.dusun));
  // Hal 2 & 3
  let p2 = '<img src="assets/svg/form-bg-4.svg" alt="">', p3 = '<img src="assets/svg/form-bg-5.svg" alt="">';
  R.forEach((r, i) => {
    const a = 96 + i * 12.12, b = 251.8 + i * 12.12, c = 404.2 + i * 12.1, d = 41.9 + i * 11.4, e = 185.1 + i * 11.4;
    p2 += Cc(40.2, a, 272, 12, up(r.nama), 8) + Cc(267, b, 60.5, 12, jkT[r.jk], 7) + Cc(327.5, b, 75.5, 12, up(r.tl)) +
      Cc(403, b, 136.2, 12, tg(r.tgl)) + Cc(539.2, b, 90.7, 12, 'WNI') + Cc(206.5, c, 60.5, 12, up(r.agama)) +
      (['KEPALA KELUARGA', 'SUAMI', 'ISTRI'].includes(r.hub) ? Cc(554.2, c, 121, 12, up(v.akta)) : '');
    p3 += Cc(255.4, d, 59.1, 11.2, up(r.hub), 6.5) + Cc(417.8, d, 59.1, 11.2, up(r.pend), 6.5) + Cc(476.9, d, 59, 11.2, up(r.kerja), 6.5) +
      Cc(447.2, e, 118.2, 11.2, up(r.ibu)) + Cc(653.9, e, 118.1, 11.2, up(r.ayah));
  });
  p3 += `<div class="c" style="${P2(570, 390.5, 167, 10, 8.5)};font-weight:700">${esc(up(v.pn))}</div>`;
  paperEl(b, 4).innerHTML = p2;
  paperEl(b, 5).innerHTML = p3;
}