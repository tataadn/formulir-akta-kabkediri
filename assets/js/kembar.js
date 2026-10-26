// ===== Anak kembar: satu set 5 formulir untuk setiap anak =====
// Jumlah anak mengikuti pilihan "Jenis Kelahiran" (Kembar 2/3/4). Pilihan "Lainnya" meminta jumlah bayi.
let extras = [], bcount = '', showCount = false, allBabies = [];
// [kunci, label, tipe, pilihan/step]
const XF = [
  ['bn', 'Nama bayi'], ['bj', 'Jenis kelamin', 's', ['1|Laki-laki', '2|Perempuan']], ['bt', 'Tanggal lahir', 'date'], ['bp', 'Pukul', 'time'],
  ['bk', 'Kelahiran ke-', 'number', '1'], ['bb', 'Berat bayi (Kg, mis. 3.2)', 'number', '0.1'], ['bl', 'Panjang bayi (cm)', 'number', '1'],
];
function babyCount(v) {
  v = v || Object.fromEntries(new FormData(f));
  const j = +v.bjn;
  if (j >= 1 && j <= 4) return j;
  return j === 5 ? Math.min(6, Math.max(2, +bcount || 2)) : 1;
}
// Tanggal, pukul, dan "kelahiran ke-" anak berikutnya otomatis mengikuti anak pertama sampai diubah sendiri
const xv = (j, k, v) => {
  const x = extras[j] || { t: {} };
  if (x.t[k] || !['bt', 'bp', 'bk'].includes(k)) return x[k] || '';
  return k === 'bk' ? (v.bk ? String(+v.bk + j + 1) : '') : (v[k] || '');
};
function babyList(v) {
  const n = babyCount(v), out = [{ bn: v.bn, bj: v.bj, bt: v.bt, bp: v.bp, bk: v.bk, bb: v.bb, bl: v.bl }];
  for (let j = 0; j < n - 1; j++) out.push(Object.fromEntries(XF.map(([k]) => [k, xv(j, k, v)])));
  return out;
}
function renderBabies() {
  const v = Object.fromEntries(new FormData(f));
  showCount = +v.bjn === 5;
  document.getElementById('bcountBox').innerHTML = showCount
    ? `<div class="card mb-3"><div class="card-body"><div class="form-floating"><input class="form-control" id="bcount" type="number" min="2" max="6" step="1" placeholder=" " value="${esc(bcount)}" required><label for="bcount">Jumlah bayi (karena jenis kelahiran "Lainnya")</label></div></div></div>` : '';
  document.getElementById('babiesBox').innerHTML = extras.map((x, j) =>
    `<div class="card mb-3"><div class="card-header"><span class="sec-no">+</span><span class="fw-semibold">Data Kelahiran Anak ke-${j + 2}</span></div><div class="card-body"><div class="row g-3">` +
    XF.map(([k, l, t, o]) => `<div class="col-md-6"><div class="form-floating">` + (t === 's'
      ? `<select class="form-select" data-x="${j}" data-k="${k}" required>${optHtml(o, xv(j, k, v))}</select>`
      : `<input class="form-control" placeholder=" " data-x="${j}" data-k="${k}" type="${t || 'text'}"${t === 'number' ? ` min="0" step="${o}"` : ''} value="${esc(xv(j, k, v))}" required>`) +
      `<label>${l}</label></div></div>`).join('') + '</div></div></div>').join('');
}
function syncBabies(v) {
  const n = babyCount(v);
  let changed = showCount !== (+v.bjn === 5);
  while (extras.length < n - 1) { extras.push({ t: {} }); changed = true; }
  while (extras.length > n - 1) { extras.pop(); changed = true; }
  if (changed) { renderBabies(); if (typeof renderMembers === 'function') renderMembers(); }
  extras.forEach((x, j) => ['bt', 'bp', 'bk'].forEach((k) => {
    const el = document.querySelector(`[data-x="${j}"][data-k="${k}"]`), val = xv(j, k, v);
    if (el && !x.t[k] && el.value !== val) el.value = val;
  }));
}
function initBabies() {
  f.insertAdjacentHTML('beforeend', '<div id="babies"><div id="bcountBox"></div><div id="babiesBox"></div></div>');
  renderBabies();
  document.getElementById('babies').addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'bcount') { bcount = t.value; return; }
    if (t.dataset.x === undefined) return;
    extras[t.dataset.x][t.dataset.k] = t.value; extras[t.dataset.x].t[t.dataset.k] = true;
  });
}
function resetBabies() { extras = []; bcount = ''; renderBabies(); }
