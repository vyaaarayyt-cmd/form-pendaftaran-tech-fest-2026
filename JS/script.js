const form = document.getElementById("formPendaftaran");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const kelas = document.getElementById("kelas");
const jurusan = document.getElementById("jurusan");
const kegiatan = document.getElementById("kegiatan");
const syarat = document.getElementById("syarat");
const tombol = document.getElementById("btndaftar");
const hasil = document.getElementById("hasil");
const status = document.getElementById("status");

let daftarpendaftar = JSON.parse(localStorage.getItem("daftarpendaftar")) || [];
let editId = null;

const params = new URLSearchParams(window.location.search);
const idEdit = params.get("edit");

status.addEventListener("change", function (){
    status.classList.add("selected");
});

// mengubah tampilan select kelas setelah user memilih kelas//
kelas.addEventListener("change", function (){
    kelas.classList.add("selected");
});

// mengubah tampilan select jurusan setelah user memilih jurusan//
jurusan.addEventListener("change", function (){
    jurusan.classList.add("selected");
});

// mangaktifkan/menonaktifkan tombol daftar berdasarkan checkbox//
syarat.addEventListener("change", function () {
    tombol.disabled = !syarat.checked;
});

function isiFormEdit(id) {
        const peserta = daftarpendaftar.find (function (data) {
            return data.id === id;
        });

         if (!peserta) {
        return;
    }

    nama.value = peserta.nama;
    email.value = peserta.email;
    kelas.value = peserta.kelas;
    jurusan.value = peserta.jurusan;
    kegiatan.value = peserta.kegiatan;
    status.value = peserta.status || "pending";

    kelas.classList.add("selected");
    jurusan.classList.add("selected");

    editId = id;

    status.disabled = false;
    syarat.checked = true;

    tombol.disabled = false;
    tombol.textContent = "perbarui data";

    hasil.innerHTML = "";
}

// menjalankan validasi ketika form dikirim//
form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("errornama").textContent = "";
    document.getElementById("erroremail").textContent = "";
    document.getElementById("errorkelas").textContent = "";
    document.getElementById("errorjurusan").textContent = "";
    document.getElementById("errorkegiatan").textContent = "";
    document.getElementById("errorstatus").textContent = "";
    
    nama.style.border = "";
    email.style.border = "";
    kelas.style.border = "";
    jurusan.style.border = "";
    kegiatan.style.border = "";
    status.style.border = "";

    hasil.innerHTML = "";

    let valid = true;

//validasi nama//
    if (nama.value.trim() === "") {
        console.log("validasi nama jalan")

        document.getElementById("errornama").textContent = "*Nama Minimal 3 Karakter.";
        nama.style.border = "2px solid red";
        valid = false;
    }
    else if (nama.value.trim().length < 3){
        document.getElementById("errornama"). textContent = "*Nama Minimal 3 Karakter.";
        nama.style.border = "2px solid red";
        valid = false; 
    }

// validasi rmail//
    if(email.value.trim() === "") {
        document.getElementById("erroremail").textContent = "*Email tidak boleh kosong.";
        email.style.border = "2px solid red";
        valid = false;
    }
    else if (!email.value.includes("@")) {
        document.getElementById("erroremail"). textContent = "*Email harus mengandung karakter @.";
        email.style.border = "2px solid red";
        valid = false; 
     }

//validasi kelas//
if(kelas.value.trim() === "") {
        document.getElementById("errorkelas").textContent = "*Silahkan pilih kelas.";
        kelas.style.border = "2px solid red";
        valid = false;
    }

//validasi jurusan//
if(jurusan.value === "") {
        document.getElementById("errorjurusan").textContent = "*Silahkan pilih jurusan.";
        jurusan.style.border = "2px solid red";
        valid = false;
}

//validasi kegiatan//
if(kegiatan.value.trim() === "") {
        document.getElementById("errorkegiatan").textContent = "*Kegiata tidak boleh kosong.";
        kegiatan.style.border = "2px solid red";
        valid = false;
    }

//validasi status//
if(status.value.trim() === "") {
        document.getElementById("errorstatus").textContent = "*Silahkan pilih status.";
        status.style.border = "2px solid red";
        valid = false;
    }
//validasi syarat dan ketentuan//
if (!syarat.checked) {
    hasil.innerHTML = "Anda harus menyetujui syarat & ketentuan.";
    hasil.style.color = "red";
    valid = false;
}

if (!valid) {return;
}

if(editId === null) {
    const peserta = {
        id: Date.now(),
        nama: nama.value.trim(),
        email: email.value.trim(),
        kelas: kelas.value,
        jurusan: jurusan.value,
        kegiatan: kegiatan.value.trim(),
        status: "pending",
          };

daftarpendaftar.push(peserta);

hasil.innerHTML = `<strong>Pendaftaran berhasil!</strong>
    <br></br>
    nama: ${nama.value}
    <br>
    email: ${email.value}
    <br>
    Kelas: ${kelas.value}
    <br>
    Jurusan: ${jurusan.value}
    <br>
    Kegiatan: ${kegiatan.value} `;

    hasil.style.color = "White";

    }else {
        const index = daftarpendaftar.findIndex(function(data) {
            return data.id === editId;
        });

    if (index !== -1) {

        daftarpendaftar[index].nama = nama.value;
        daftarpendaftar[index].email = email.value;
        daftarpendaftar[index].kelas = kelas.value;
        daftarpendaftar[index].jurusan = jurusan.value;
        daftarpendaftar[index].kegiatan = kegiatan.value;
        daftarpendaftar[index].status = status.value;

        hasil.innerHTML = "<strong>Data berhasil Diperbarui!</strong>";
        hasil.style.color = "White";
    }
}

localStorage.setItem(
        "daftarpendaftar",
        JSON.stringify(daftarpendaftar)
    );

    form.reset ();
    kelas.classList.remove ("selected");
    jurusan.classList.remove ("selected");
    status.disabled = true;
    tombol.disabled = true;
    tombol.textContent = "Daftar Sekarang";

    editId = null;

    if (idEdit) {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    }

    console.log(
        "Data_pendaftaran;", 
        daftarpendaftar
    );
});

    if (idEdit) {
        isiFormEdit(Number(idEdit));
    }
