const form = document.getElementById("formPendaftaran");
const syarat = document.getElementById("syarat");
const btnDaftar = document.getElementById("btnDaftar");

// mengatur tombol daftar agar aktif
// jika syarat dan ketentuan dicentang
syarat.addEventListener("change",function () {
    btnDaftar.disabled = !syarat.checked;
});

// mencegah halaman melakukan reload 
// saat form disubmit
form.addEventListener("submit", function(event) {
    event.preventDefault();
});