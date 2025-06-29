const $ = s => document.querySelector(s);
const dataTransaksi = [
  {tanggal: '28/06/2025', jenis: 'Americano', jumlah: 2, harga: 'Rp 25.000'},
  {tanggal: '28/06/2025', jenis: 'Latte', jumlah: 1, harga: 'Rp 30.000'},
  {tanggal: '28/06/2025', jenis: 'Mochaccino', jumlah: 3, harga: 'Rp 35.000'}
];
function renderTransaksi() {
  const tbody = document.querySelector('.transaction-table tbody');
  tbody.innerHTML = '';
  dataTransaksi.forEach((trx, idx) => {
    // Hitung total harga (jumlah * harga satuan)
    let hargaNum = 0;
    if (typeof trx.harga === 'string') {
      hargaNum = parseInt(trx.harga.replace(/[^\d]/g, ''));
    } else {
      hargaNum = trx.harga;
    }
    const total = hargaNum * parseInt(trx.jumlah);
    const totalStr = 'Rp ' + total.toLocaleString('id-ID');
    const id = (idx + 1).toString();
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${id}</td><td>${trx.tanggal}</td><td>${trx.jenis}</td><td>${trx.jumlah}</td><td>${trx.harga}</td><td>${totalStr}</td><td><button class='btn-hapus' onclick='hapusBaris(this)'>Hapus</button></td>`;
    tbody.appendChild(tr);
  });
}
function updateHarga() {
  const jenis = $('#jenis');
  const harga = $('#harga');
  const nominal = jenis.options[jenis.selectedIndex].getAttribute('data-harga');
  harga.value = nominal ? 'Rp ' + Number(nominal).toLocaleString('id-ID') : '';
}
function tambahTransaksi(e) {
  e.preventDefault();
  const jenis = $('#jenis').value,
        harga = $('#harga').value,
        jumlah = $('#jumlah').value;
  if(!jenis || !harga || !jumlah) return;
  const today = new Date();
  // Format tanggal: dd/mm/yyyy
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const tanggal = `${day}/${month}/${year}`;
  dataTransaksi.push({tanggal, jenis, jumlah, harga});
  renderTransaksi();
  $('.transaction-form').reset();
  updateHarga();
}
function hapusBaris(btn) {
  const row = btn.closest('tr');
  const id = row.cells[0].textContent;
  const idx = dataTransaksi.findIndex(trx => trx.id === id);
  if(idx !== -1) dataTransaksi.splice(idx, 1);
  renderTransaksi();
}
function filterTable() {
  const filterJenis = $('#filterJenis').value.toLowerCase();
  const search = $('#searchTransaksi').value.toLowerCase();
  document.querySelectorAll('.transaction-table tbody tr').forEach(row => {
    const id = row.cells[0].textContent.toLowerCase();
    const jenis = row.cells[2].textContent.toLowerCase();
    const harga = row.cells[4].textContent.toLowerCase();
    let show = true;
    if (filterJenis && jenis !== filterJenis) show = false;
    if (search && !(id.includes(search) || jenis.includes(search) || harga.includes(search))) show = false;
    row.style.display = show ? '' : 'none';
  });
}
document.addEventListener('DOMContentLoaded', function() {
  renderTransaksi();
});
