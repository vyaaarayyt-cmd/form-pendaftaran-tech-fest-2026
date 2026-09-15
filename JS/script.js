const form = document.getElementById("FormPendaftaran");

const nama = document.getElementById("naama");
const email = document.getElementById("email");
const kelas = document.getElementById("kelas");
const jurusan = document.getElementById("jurusan");
const extrakurikuler = document.getElementById("extraeurikuler");
const syarat = document.getElementById("syarat");
const btnDaftar = document.getElementById("btnDaftar");
const hasil = document.getElementById("hasil");

// mengatur tombol daftar agar aktif
// jika syarat dan ketentuan dicentang
syarat.addEventListener("change",function () {
    btnDaftar.disabled = !syarat.checked;
});

// mencegah halaman melakukan reload 
// saat form disubmit
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    //mengambil nilai dari form
    const namaValue= nama.value.trim();
    const emailValue= email.value.trim();
    const kelasValue= kelas.value.trim();
    const jurusanValue= jurusan.value.trim();
    const extrakurikulerValue= extrakurikuler.value.trim();

    //validasi nama
    if (namaValue === "" || namaValue.length < 3) {
        hasil.innerHTML = `
        <div class="error">nama Lengkap harus diisi dan minimal 3 karakter. </div>
        `;
        nama.style.borderColor ="red";
        return;
    }

    //validasi email
    if (!emailValue.includes("@")) {
        hasil.innerHTML=`
        <div class="error"> Email harus mengandung karakter @.</div>
        `;
        email.style.borderColor ="red";
        return;
    }

    //validasi checkbox
    if (!syarat.checked) {
        hasil.innerHTML =`
        <div class="error"> SIlahkan setujui syarat & ketentuan terlebih dahulu. </div>
        `;
        return;
    }

    //jika semua valid
    hasil.innerHTML =`
    <div class="sukses">
    <h3>pendaftaran Berhasil!</h3>
    <p><strong>Nama:</strong> ${namaValue}</p>
    <p><strong>email:</strong> ${emailValue}</p>
    <p><strong>kelas:</strong> ${kelasValue}</p>
    <p><strong>jurusan:</strong> ${jurusanValue}</p>
    <p><strong>ExtraKurikuler:</strong> ${ExtraKurikulerValue}</p>
    </div>
    `;

    //mengosongkan isiannya / from
    form.reset();

    //tombol kembali disabled
    btnDaftar.disabled = true;

    //mengembalikan border input
    nama.style.borderColor = "";
    email.style.borderColor = "";

    });