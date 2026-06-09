const API_URL = "https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

document.addEventListener("DOMContentLoaded", () => {
    loadAdminPage("dashboard");
});

function loadAdminPage(page){

    document.getElementById("pageTitle").innerText = page;

    switch(page){

        case "dashboard":
            loadDashboard();
            break;

        case "masteraset":
            loadMasterAset();
            break;

        case "gedung":
            loadGedungAdmin();
            break;

        case "dbr":
            loadDBRAdmin();
            break;

        case "statistik":
            loadStatistikAdmin();
            break;

        case "pengaturan":
            loadPengaturan();
            break;

        default:
            loadDashboard();

    }

}

function loadDashboard(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Dashboard SIM-DBR</h2>
            <p>Selamat datang di Sistem Informasi Daftar Barang Ruangan</p>
        </div>
    `;

}

async function loadMasterAset(){

    document.getElementById("pageTitle").innerText = "Master Aset";

    const response = await fetch(
        `${API_URL}?action=getAset`
    );

    const result = await response.json();

    let html = `

    <div class="card">

        <h2>Master Aset</h2>

        <button
            class="btn-primary"
            onclick="showTambahAset()">
            Tambah Aset
        </button>

    </div>

    <div class="card">

        <input
            type="text"
            id="cariAset"
            placeholder="Cari Barang..."
            onkeyup="filterAset()">

    </div>

    <table class="admin-table">

        <thead>

            <tr>

                <th>ID ASET</th>
                <th>NAMA BARANG</th>
                <th>GEDUNG</th>
                <th>RUANGAN</th>
                <th>KONDISI</th>
                <th>STATUS</th>
                <th>AKSI</th>

            </tr>

        </thead>

        <tbody id="asetTable">

    `;

    if(result.success && result.data){

    result.data.forEach(item => {

        html += `
        <tr>
            <td>${item.ID_ASET || ""}</td>
            <td>${item.NAMA_BARANG || ""}</td>
            <td>${item.NAMA_GEDUNG || ""}</td>
            <td>${item.NAMA_RUANGAN || ""}</td>
            <td>${item.KONDISI || ""}</td>
            <td>${item.STATUS_ASET || ""}</td>
            <td>
                <button class="btn-success"
                    onclick="editAset('${item.ID_ASET}')">
                    Edit
                </button>

                <button class="btn-danger"
                    onclick="hapusAset('${item.ID_ASET}')">
                    Hapus
                </button>
            </td>
        </tr>
        `;

    });

}

html += `
        </tbody>
    </table>
`;

document.getElementById("contentArea").innerHTML = html;

} 
    
async function loadGedungAdmin(){

    document.getElementById("pageTitle").innerText = "Gedung";

    const response = await fetch(
        `${API_URL}?action=getGedung`
    );

    const result = await response.json();

    let html = `

    <div class="gedung-layout">

        <div class="gedung-kiri">

            <div class="card">

                <h3>Tambah Gedung</h3>

                <input
                    id="KODE_GEDUNG"
                    placeholder="Kode Gedung">

                <input
                    id="NAMA_GEDUNG"
                    placeholder="Nama Gedung">

                <button
                    class="btn-success"
                    onclick="simpanGedung()">

                    Simpan Gedung

                </button>

            </div>

            <div class="card">

                <h3>Daftar Gedung</h3>

                <table>

                    <thead>
                        <tr>
                            <th>Kode</th>
                            <th>Nama Gedung</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>

                    <tbody>

    `;

    if(result.success && result.data){

        result.data.forEach(item => {

            html += `

            <tr>

                <td>${item.KODE_GEDUNG}</td>

                <td>${item.NAMA_GEDUNG}</td>

                <td>

                    <button
                        class="btn-primary"
                        onclick="pilihGedung('${item.KODE_GEDUNG}')">

                        Pilih

                    </button>

                </td>

            </tr>

            `;

        });

    }

    html += `

                    </tbody>

                </table>

            </div>

        </div>

        <div class="gedung-kanan">

            <div class="card">

                <h3>Tambah Ruangan</h3>

                <input
                    id="KODE_RUANGAN"
                    placeholder="Kode Ruangan">

                <input
                    id="NAMA_RUANGAN"
                    placeholder="Nama Ruangan">

                <button
                    class="btn-success"
                    onclick="simpanRuangan()">

                    Simpan Ruangan

                </button>

            </div>

            <div class="card">

                <h3>Daftar Ruangan</h3>

                <div id="ruanganArea">

                    Pilih gedung terlebih dahulu

                </div>

            </div>

        </div>

    </div>

    `;

    document.getElementById("contentArea").innerHTML = html;

}

async function simpanGedung(){

    const data = {

        action : "addGedung",

        KODE_GEDUNG :
        document.getElementById("KODE_GEDUNG").value,

        NAMA_GEDUNG :
        document.getElementById("NAMA_GEDUNG").value

    };

    const response = await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify(data)

    });

    const result = await response.json();

    alert("Gedung berhasil disimpan");

    loadGedungAdmin();

}

function loadDBRAdmin(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>DBR</h2>
        </div>
    `;

}

function loadStatistikAdmin(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Statistik</h2>
        </div>
    `;

}

function loadPengaturan(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Pengaturan</h2>
        </div>
    `;

}
function showTambahAset(){

    document.getElementById("contentArea").innerHTML = `

    <div class="admin-form">

        <h3>Tambah Aset</h3>

        <input id="ID_ASET" placeholder="ID ASET">

        <input id="KODE_BARANG" placeholder="Kode Barang">

        <input id="NUP" placeholder="NUP">

        <input id="NAMA_BARANG" placeholder="Nama Barang">

        <input id="MERK_TIPE" placeholder="Merk / Tipe">

        <input id="TAHUN_PEROLEHAN" placeholder="Tahun Perolehan">

        <input id="NILAI_PEROLEHAN" placeholder="Nilai Perolehan">

        <input id="KODE_GEDUNG" placeholder="Kode Gedung">

        <input id="NAMA_GEDUNG" placeholder="Nama Gedung">

        <input id="KODE_RUANGAN" placeholder="Kode Ruangan">

        <input id="NAMA_RUANGAN" placeholder="Nama Ruangan">

        <input id="KONDISI" placeholder="Kondisi">

        <input id="STATUS_ASET" placeholder="Status Aset">

        <textarea id="KETERANGAN" placeholder="Keterangan"></textarea>

        <button
            class="btn-success"
            onclick="simpanAset()">

            Simpan

        </button>

        <button
            class="btn-primary"
            onclick="loadMasterAset()">

            Kembali

        </button>

    </div>

    `;

}

async function simpanAset(){

    const data = {

        action : "addAset",

        ID_ASET : document.getElementById("ID_ASET").value,
        KODE_BARANG : document.getElementById("KODE_BARANG").value,
        NUP : document.getElementById("NUP").value,
        NAMA_BARANG : document.getElementById("NAMA_BARANG").value,
        MERK_TIPE : document.getElementById("MERK_TIPE").value,
        TAHUN_PEROLEHAN : document.getElementById("TAHUN_PEROLEHAN").value,
        NILAI_PEROLEHAN : document.getElementById("NILAI_PEROLEHAN").value,
        KODE_GEDUNG : document.getElementById("KODE_GEDUNG").value,
        NAMA_GEDUNG : document.getElementById("NAMA_GEDUNG").value,
        KODE_RUANGAN : document.getElementById("KODE_RUANGAN").value,
        NAMA_RUANGAN : document.getElementById("NAMA_RUANGAN").value,
        KONDISI : document.getElementById("KONDISI").value,
        STATUS_ASET : document.getElementById("STATUS_ASET").value,
        KETERANGAN : document.getElementById("KETERANGAN").value

    };

    const response = await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(data)
    });

    const result = await response.json();

    alert(result.message);

    loadMasterAset();

}

async function hapusAset(id){

    if(!confirm("Hapus aset ini ?")){
        return;
    }

    const response = await fetch(API_URL, {

        method : "POST",

        body : JSON.stringify({

            action : "deleteAset",
            id : id

        })

    });

    const result = await response.json();

    alert(result.message);

    loadMasterAset();

}

function filterAset(){

    const keyword =
        document
        .getElementById("cariAset")
        .value
        .toLowerCase();

    const rows =
        document
        .querySelectorAll("#asetTable tr");

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(keyword)
            ? ""
            : "none";

    });

}

async function editAset(id){

    const response = await fetch(
        `${API_URL}?action=getAsetById&id=${id}`
    );

    const result = await response.json();

    const a = result.data;

    document.getElementById("contentArea").innerHTML = `

    <div class="admin-form">

        <h3>Edit Aset</h3>

        <input id="ID_ASET" value="${a.ID_ASET}" readonly>

        <input id="KODE_BARANG" value="${a.KODE_BARANG || ''}">

        <input id="NUP" value="${a.NUP || ''}">

        <input id="NAMA_BARANG" value="${a.NAMA_BARANG || ''}">

        <input id="MERK_TIPE" value="${a.MERK_TIPE || ''}">

        <input id="TAHUN_PEROLEHAN" value="${a.TAHUN_PEROLEHAN || ''}">

        <input id="NILAI_PEROLEHAN" value="${a.NILAI_PEROLEHAN || ''}">

        <input id="KODE_GEDUNG" value="${a.KODE_GEDUNG || ''}">

        <input id="NAMA_GEDUNG" value="${a.NAMA_GEDUNG || ''}">

        <input id="KODE_RUANGAN" value="${a.KODE_RUANGAN || ''}">

        <input id="NAMA_RUANGAN" value="${a.NAMA_RUANGAN || ''}">

        <input id="KONDISI" value="${a.KONDISI || ''}">

        <input id="STATUS_ASET" value="${a.STATUS_ASET || ''}">

        <textarea id="KETERANGAN">${a.KETERANGAN || ''}</textarea>

        <button
            class="btn-success"
            onclick="updateAset()">

            Update

        </button>

        <button
            class="btn-primary"
            onclick="loadMasterAset()">

            Kembali

        </button>

    </div>

    `;

}
async function updateAset(){

    const data = {

        action : "updateAset",

        ID_ASET :
        document.getElementById("ID_ASET").value,

        KODE_BARANG :
        document.getElementById("KODE_BARANG").value,

        NUP :
        document.getElementById("NUP").value,

        NAMA_BARANG :
        document.getElementById("NAMA_BARANG").value,

        MERK_TIPE :
        document.getElementById("MERK_TIPE").value,

        TAHUN_PEROLEHAN :
        document.getElementById("TAHUN_PEROLEHAN").value,

        NILAI_PEROLEHAN :
        document.getElementById("NILAI_PEROLEHAN").value,

        KODE_GEDUNG :
        document.getElementById("KODE_GEDUNG").value,

        NAMA_GEDUNG :
        document.getElementById("NAMA_GEDUNG").value,

        KODE_RUANGAN :
        document.getElementById("KODE_RUANGAN").value,

        NAMA_RUANGAN :
        document.getElementById("NAMA_RUANGAN").value,

        KONDISI :
        document.getElementById("KONDISI").value,

        STATUS_ASET :
        document.getElementById("STATUS_ASET").value,

        KETERANGAN :
        document.getElementById("KETERANGAN").value

    };

    const response = await fetch(API_URL, {

        method : "POST",

        body : JSON.stringify(data)

    });

    const result = await response.json();

    alert(result.message);

    loadMasterAset();

}
