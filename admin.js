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

function fileToBase64(file){

    return new Promise(
        (resolve,reject)=>{

            const reader =
                new FileReader();

            reader.onload =
                () => resolve(
                    reader.result
                );

            reader.onerror =
                error => reject(error);

            reader.readAsDataURL(file);

        }
    );

}

async function uploadFoto(file){

    const base64 =
        await fileToBase64(file);

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"uploadFotoGedung",

                base64:
                    base64.split(",")[1],

                fileName:
                    file.name,

                mimeType:
                    file.type

            })

        });

    return await response.json();

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

                <textarea
                    id="DESKRIPSI_SINGKAT"
                    placeholder="Deskripsi Singkat">
                </textarea>

                <input
                    type="file"
                    id="FOTO_GEDUNG"
                    accept="image/*">

                <img
                    id="previewGedung"
                    style="
                        display:none;
                        max-width:200px;
                        margin-top:10px;
                        border-radius:8px;
                    ">

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
                            <th>Foto</th>
                            <th>Nama Gedung</th>
                            <th>Deskripsi</th>
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

<td>
    <img
        src="${item.FOTO_GEDUNG || ''}"
        style="
            width:60px;
            height:60px;
            object-fit:cover;
            border-radius:6px;
        ">
</td>

<td>${item.NAMA_GEDUNG || ''}</td>

<td>${item.DESKRIPSI_SINGKAT || ''}</td>

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

    const fotoInput =
    document.getElementById(
        "FOTO_GEDUNG"
    );

if(fotoInput){

    fotoInput.addEventListener(
        "change",
        function(e){

            const file =
                e.target.files[0];

            if(!file) return;

            const reader =
                new FileReader();

            reader.onload =
                function(){

                    const img =
                        document.getElementById(
                            "previewGedung"
                        );

                    img.src =
                        reader.result;

                    img.style.display =
                        "block";

                };

            reader.readAsDataURL(file);

        }
    );

}

}

async function simpanGedung(){

    const file =
        document.getElementById(
            "FOTO_GEDUNG"
        ).files[0];

    let fotoUrl = "";

    if(file){

        const upload =
            await uploadFoto(file);

        if(upload.success){

            fotoUrl =
                upload.fileUrl;

        }else{

            alert(
                "Upload foto gagal"
            );

            return;

        }

    }

    const data = {

        action:"addGedung",

        KODE_GEDUNG:
            document.getElementById(
                "KODE_GEDUNG"
            ).value,

        NAMA_GEDUNG:
            document.getElementById(
                "NAMA_GEDUNG"
            ).value,

        FOTO_GEDUNG:
            fotoUrl,

        DESKRIPSI_SINGKAT:
            document.getElementById(
                "DESKRIPSI_SINGKAT"
            ).value

    };

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

    const result =
        await response.json();

    if(result.success){

        alert(
            "Gedung berhasil disimpan"
        );

        loadGedungAdmin();

    }

}

async function hapusGedung(kode){

    if(!confirm("Hapus gedung ini?")) return;

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
                <th>Jenis</th>
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

                <td>${item.JENIS_RUANGAN || ""}</td>

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

        JENIS_RUANGAN :
        document.getElementById("JENIS_RUANGAN").value

    };

    await fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(data)
    });

    alert("Ruangan berhasil disimpan");

    pilihGedung(selectedGedung);

}

async function hapusRuangan(kode){

    if(!confirm("Hapus ruangan ini?")) return;

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
   STATISTIK
===================================================== */

async function loadStatistikAdmin(){

    setPageTitle("Statistik");

    const response =
        await fetch(
            `${API_URL}?action=getStatistik`
        );

    const result =
        await response.json();

    setContent(`

        <div class="stats-grid">

            <div class="stat-card">
                <h3>Total Gedung</h3>
                <h2>${result.totalGedung || 0}</h2>
            </div>

            <div class="stat-card">
                <h3>Total Ruangan</h3>
                <h2>${result.totalRuangan || 0}</h2>
            </div>

            <div class="stat-card">
                <h3>Total Aset</h3>
                <h2>${result.totalAset || 0}</h2>
            </div>

            <div class="stat-card">
                <h3>Nilai Aset</h3>
                <h2>
                    Rp ${Number(
                        result.totalNilai || 0
                    ).toLocaleString("id-ID")}
                </h2>
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
