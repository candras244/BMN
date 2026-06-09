const API_URL = "https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

let selectedGedung = "";

document.addEventListener("DOMContentLoaded", () => {
    loadAdminPage("dashboard");
});

function loadAdminPage(page){

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

function setPageTitle(title){
    document.getElementById("pageTitle").innerText = title;
}

function setContent(html){
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   DASHBOARD
===================================================== */

function loadDashboard(){

    setPageTitle("Dashboard");

    setContent(`

        <div class="card">

            <h2>Dashboard SIM-DBR</h2>

            <p>
                Selamat datang di Sistem Informasi Daftar Barang Ruangan
            </p>

        </div>

    `);

}

/* =====================================================
   MASTER ASET
===================================================== */

async function loadMasterAset(){

    setPageTitle("Master Aset");

    const response =
        await fetch(`${API_URL}?action=getAset`);

    const result =
        await response.json();

    let html = `

    <div class="card">

        <h2>Master Aset</h2>

        <button
            class="btn-success"
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

    <div class="card">

        <table>

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

    if(result.success){

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

                    <button
                        class="btn-primary"
                        onclick="editAset('${item.ID_ASET}')">

                        Edit

                    </button>

                    <button
                        class="btn-danger"
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

    </div>

    `;

    setContent(html);

}

function showTambahAset(){

    setPageTitle("Tambah Aset");

    setContent(`

    <div class="card">

        <h2>Tambah Aset</h2>

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

        <textarea
            id="KETERANGAN"
            placeholder="Keterangan"></textarea>

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

    `);

}

async function simpanAset(){

    const data = {

        action : "addAset",

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

    const response = await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify(data)

    });

    const result = await response.json();

    alert(result.message);

    loadMasterAset();

}

/* =====================================================
   GEDUNG & RUANGAN
===================================================== */

async function loadGedungAdmin(){

    setPageTitle("Gedung");

    const response =
        await fetch(`${API_URL}?action=getGedung`);

    const result =
        await response.json();

    let html = `

    <div class="gedung-layout">

        <div class="gedung-kiri">

            <div class="card">

                <h2>Tambah Gedung</h2>

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

                <h2>Daftar Gedung</h2>

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

    if(result.success){

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

                    <button
                        class="btn-danger"
                        onclick="hapusGedung('${item.KODE_GEDUNG}')">

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

            </div>

        </div>

        <div class="gedung-kanan">

            <div class="card">

                <h2>Tambah Ruangan</h2>

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

                <h2>Daftar Ruangan</h2>

                <div id="ruanganArea">

                    Pilih gedung terlebih dahulu

                </div>

            </div>

        </div>

    </div>

    `;

    setContent(html);

}

async function simpanGedung(){

    const data = {

        action : "addGedung",

        KODE_GEDUNG :
        document.getElementById("KODE_GEDUNG").value,

        NAMA_GEDUNG :
        document.getElementById("NAMA_GEDUNG").value

    };

    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify(data)

    });

    alert("Gedung berhasil disimpan");

    loadGedungAdmin();

}

async function hapusGedung(kode){

    if(!confirm("Hapus gedung ini?")){
        return;
    }

    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"deleteGedung",
            kode:kode

        })

    });

    loadGedungAdmin();

}

async function pilihGedung(kode){

    selectedGedung = kode;

    const response =
        await fetch(`${API_URL}?action=getRuangan`);

    const result =
        await response.json();

    let html = `

    <table>

        <thead>

            <tr>

                <th>Kode</th>
                <th>Nama Ruangan</th>
                <th>Aksi</th>

            </tr>

        </thead>

        <tbody>

    `;

    if(result.success){

        const data =
            result.data.filter(
                x => x.KODE_GEDUNG === kode
            );

        data.forEach(item => {

            html += `

            <tr>

                <td>${item.KODE_RUANGAN}</td>

                <td>${item.NAMA_RUANGAN}</td>

                <td>

                    <button
                        class="btn-danger"
                        onclick="hapusRuangan('${item.KODE_RUANGAN}')">

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

    document.getElementById(
        "ruanganArea"
    ).innerHTML = html;

}

async function simpanRuangan(){

    if(selectedGedung === ""){

        alert("Pilih gedung terlebih dahulu");

        return;

    }

    const data = {

        action : "addRuangan",

        KODE_RUANGAN :
        document.getElementById("KODE_RUANGAN").value,

        KODE_GEDUNG :
        selectedGedung,

        NAMA_RUANGAN :
        document.getElementById("NAMA_RUANGAN").value,

        <select id="JENIS_RUANGAN">

            <option value="Kantor">Kantor</option>
            <option value="Kelas">Kelas</option>
            <option value="Laboratorium">Laboratorium</option>
            <option value="Perpustakaan">Perpustakaan</option>
            <option value="Gudang">Gudang</option>
            <option value="Aula">Aula</option>
            <option value="Ruang Rapat">Ruang Rapat</option>
            <option value="Mushola">Mushola</option>
            <option value="Toilet">Toilet</option>

</select>

    };

    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify(data)

    });

    alert("Ruangan berhasil disimpan");

    pilihGedung(selectedGedung);

}

async function hapusRuangan(kode){

    if(!confirm("Hapus ruangan ini?")){
        return;
    }

    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"deleteRuangan",
            kode:kode

        })

    });

    pilihGedung(selectedGedung);

}

/* =====================================================
   DBR
===================================================== */

async function loadDBRAdmin(){

    setPageTitle("DBR");

    const response =
        await fetch(`${API_URL}?action=getGedung`);

    const result =
        await response.json();

    let html = `

    <div class="card">

        <h2>Daftar Barang Ruangan (DBR)</h2>

        <p>
            Pilih gedung untuk melihat DBR per ruangan.
        </p>

    </div>

    `;

    if(result.success){

        result.data.forEach(g => {

            html += `

            <div class="card">

                <h3>${g.NAMA_GEDUNG}</h3>

                <button
                    class="btn-primary"
                    onclick="lihatDBRGedung('${g.KODE_GEDUNG}')">

                    Lihat DBR

                </button>

            </div>

            `;

        });

    }

    setContent(html);

}

async function lihatDBRGedung(kodeGedung){

    const responseRuang =
        await fetch(`${API_URL}?action=getRuangan`);

    const ruangResult =
        await responseRuang.json();

    let html = `

    <div class="card">

        <h2>DBR Gedung</h2>

    </div>

    `;

    if(ruangResult.success){

        const ruang =
            ruangResult.data.filter(
                x => x.KODE_GEDUNG === kodeGedung
            );

        ruang.forEach(r => {

            html += `

            <div class="card">

                <h3>${r.NAMA_RUANGAN}</h3>

                <button
                    class="btn-primary"
                    onclick="lihatDBRRuangan('${r.KODE_RUANGAN}')">

                    Lihat Aset

                </button>

            </div>

            `;

        });

    }

    setContent(html);

}

async function lihatDBRRuangan(kodeRuangan){

    const response =
        await fetch(`${API_URL}?action=getAset`);

    const result =
        await response.json();

    let html = `

    <div class="card">

        <h2>DBR Ruangan</h2>

    </div>

    <div class="card">

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Nama Barang</th>
                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

    `;

    if(result.success){

        const aset =
            result.data.filter(
                x => x.KODE_RUANGAN === kodeRuangan
            );

        aset.forEach(a => {

            html += `

            <tr>

                <td>${a.ID_ASET}</td>

                <td>${a.NAMA_BARANG}</td>

                <td>${a.KONDISI}</td>

            </tr>

            `;

        });

    }

    html += `

            </tbody>

        </table>

    </div>

    `;

    setContent(html);

}

/* =====================================================
   STATISTIK
===================================================== */

async function loadStatistikAdmin(){

    setPageTitle("Statistik");

    const response =
        await fetch(`${API_URL}?action=getAset`);

    const result =
        await response.json();

    let totalAset = 0;

    if(result.success){

        totalAset = result.data.length;

    }

    setContent(`

        <div class="stats-grid">

            <div class="stat-card">

                <h3>Total Aset</h3>

                <h2>${totalAset}</h2>

            </div>

        </div>

    `);

}

/* =====================================================
   PENGATURAN
===================================================== */

function loadPengaturan(){

    setPageTitle("Pengaturan");

    setContent(`

        <div class="card">

            <h2>Pengaturan SIM-DBR</h2>

            <ul>

                <li>Manajemen Aset</li>
                <li>Manajemen Admin</li>
                <li>Manajemen PIC</li>

            </ul>

        </div>

    `);

}
