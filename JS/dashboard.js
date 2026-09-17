let daftarpendaftar = JSON.parse(localStorage.getItem("daftarpendaftar")) || [];
const tabelpeserta = document.getElementById("tabelpeserta");
    
function tampilkanPeserta () {
    tabelpeserta.innerHTML = "";
    daftarpendaftar.forEach(function (peserta,index) { 
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${index + 1}</td>
        <td>${peserta.nama}</td>
        <td>${peserta.email}</td>
        <td>${peserta.kelas}</td>
        <td>${peserta.jurusan}</td>
        <td>${peserta.kegiatan}</td>
        <td>${peserta.status}</td>
            <td>
            <button onclick="editPeserta(${peserta.id})">Edit</button>
         
            <button onclick="hapusPeserta(${peserta.id})">Hapus</button>
            </td>`;

            tabelpeserta.appendChild(row);
    });
}

function editPeserta(id) {
    window.location.href = `../index.html?edit=${id}`;
}

function hapusPeserta(id) {
const yakin = confirm("yakin ingin mengahapus peserta ini?");

if (!yakin) {return;}

daftarpendaftar = daftarpendaftar.filter(function (peserta) {
    return peserta.id !== id;
});

localStorage.setItem(
    "daftarpendaftar",
    JSON.stringify(daftarpendaftar)
);

tampilkanPeserta();
}

tampilkanPeserta();


    