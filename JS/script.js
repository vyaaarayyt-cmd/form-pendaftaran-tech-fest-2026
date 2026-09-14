const form = document.getElementById("formPendaftaran");
const syarat = document.getElementById("syarat");
const btnDaftar = document.getElementById("btnDaftar");

syarat.addEventListener("change",function () {
    btnDaftar.disabled = !syarat.checked;
});

form.addEventListener("submit", function(event) {
    event.preventDefault();
});