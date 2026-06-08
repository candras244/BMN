const API_URL = "https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

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

    }
}
async function loadMasterAset() {

    const response = await fetch(
        `${API_URL}?action=getAset`
    );

    const result = await response.json();

    let html = `

    <div class="card">

        <h2>Master Aset</h2>

        <button
            class="btn btn-success"
            onclick="showTambahAsetForm()">
            Tambah Aset
        </button>

    </div>

    <div class="card">

        <div class="filter-area">

            <input
                type="text"
                id="searchAset"
                placeholder="Cari Barang..."
                onkeyup="filterAset()">

            <select
                id="filterKondisi"
                onchange="filterAset()">

                <option value="">
                    Semua Kondisi
                </option>

                <option value="Baik">
                    Baik
                </option>

                <option value="Rusak Ringan">
                    Rusak Ringan
                </option>

                <option value="Rusak Berat">
                    Rusak Berat
                </option>

            </select>

            <select
                id="filterStatus"
                onchange="filterAset()">

                <option value="">
                    Semua Status
                </option>

                <option value="Draft">
                    Draft
                </option>

                <option value="Terdaftar">
                    Terdaftar
                </option>

                <option value="Dihapus">
                    Dihapus
                </option>

            </select>

        </div>

    </div>

    <div class="card">

        <div class="table-container">

            <table id="tableAset">

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

                <tbody>
    `;

    result.data.forEach(item => {

        html += `

            <tr>

                <td>${item.ID_ASET}</td>

                <td>${item.NAMA_BARANG}</td>

                <td>${item.NAMA_GEDUNG}</td>

                <td>${item.NAMA_RUANGAN}</td>

                <td>${item.KONDISI}</td>

                <td>${item.STATUS_ASET}</td>

                <td>

                    <button
                        class="btn btn-primary"
                        onclick="editAset('${item.ID_ASET}')">
                        Edit
                    </button>

                    <button
                        class="btn btn-danger"
                        onclick="deleteAset('${item.ID_ASET}')">
                        Hapus
                    </button>

                </td>

            </tr>
        `;
    });

    html += `

                </tbody>

            </table>

        </div>

    </div>

    <div id="formArea"></div>

    `;

    document.getElementById(
        "contentArea"
    ).innerHTML = html;
}
function filterAset() {

    const search =
        document
        .getElementById("searchAset")
        .value
        .toLowerCase();

    const kondisi =
        document
        .getElementById("filterKondisi")
        .value;

    const status =
        document
        .getElementById("filterStatus")
        .value;

    const rows =
        document.querySelectorAll(
            "#tableAset tbody tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        const kondisiRow =
            row.cells[4].innerText;

        const statusRow =
            row.cells[5].innerText;

        const cocokSearch =
            text.includes(search);

        const cocokKondisi =
            kondisi === "" ||
            kondisiRow === kondisi;

        const cocokStatus =
            status === "" ||
            statusRow === status;

        row.style.display =
            cocokSearch &&
            cocokKondisi &&
            cocokStatus
            ? ""
            : "none";
    });
}
function showTambahAsetForm() {

    document.getElementById(
        "formArea"
    ).innerHTML = `

    <div class="card">

        <h3>Tambah Aset</h3>

        <input id="ID_ASET" placeholder="ID ASET">

        <input id="KODE_BARANG" placeholder="Kode Barang">

        <input id="NUP" placeholder="NUP">

        <input id="NAMA_BARANG" placeholder="Nama Barang">

        <input id="MERK_TIPE" placeholder="Merk / Tipe">

        <input id="TAHUN_PEROLEHAN" placeholder="Tahun">

        <input id="NILAI_PEROLEHAN" placeholder="Nilai">

        <input id="KODE_GEDUNG" placeholder="Kode Gedung">

        <input id="NAMA_GEDUNG" placeholder="Nama Gedung">

        <input id="KODE_RUANGAN" placeholder="Kode Ruangan">

        <input id="NAMA_RUANGAN" placeholder="Nama Ruangan">

        <input id="KONDISI" placeholder="Kondisi">

        <input id="STATUS_ASET" placeholder="Status">

        <textarea
            id="KETERANGAN"
            placeholder="Keterangan">
        </textarea>

        <button
            class="btn btn-success"
            onclick="saveAset()">

            Simpan

        </button>

    </div>

    `;
}
async function saveAset() {

    const data = {

        action: "addAset",

        ID_ASET:
            document.getElementById("ID_ASET").value,

        KODE_BARANG:
            document.getElementById("KODE_BARANG").value,

        NUP:
            document.getElementById("NUP").value,

        NAMA_BARANG:
            document.getElementById("NAMA_BARANG").value,

        MERK_TIPE:
            document.getElementById("MERK_TIPE").value,

        TAHUN_PEROLEHAN:
            document.getElementById("TAHUN_PEROLEHAN").value,

        NILAI_PEROLEHAN:
            document.getElementById("NILAI_PEROLEHAN").value,

        KODE_GEDUNG:
            document.getElementById("KODE_GEDUNG").value,

        NAMA_GEDUNG:
            document.getElementById("NAMA_GEDUNG").value,

        KODE_RUANGAN:
            document.getElementById("KODE_RUANGAN").value,

        NAMA_RUANGAN:
            document.getElementById("NAMA_RUANGAN").value,

        KONDISI:
            document.getElementById("KONDISI").value,

        STATUS_ASET:
            document.getElementById("STATUS_ASET").value,

        KETERANGAN:
            document.getElementById("KETERANGAN").value

    };

    await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

    });

    alert("Aset berhasil disimpan");

    loadMasterAset();
}
async function editAset(id) {

    const response = await fetch(
        `${API_URL}?action=getAsetById&id=${id}`
    );

    const result = await response.json();

    const a = result.data;

    document.getElementById(
        "formArea"
    ).innerHTML = `

    <div class="card">

        <h3>Edit Aset</h3>

        <input id="ID_ASET" value="${a.ID_ASET}" readonly>

        <input id="KODE_BARANG" value="${a.KODE_BARANG}">

        <input id="NUP" value="${a.NUP}">

        <input id="NAMA_BARANG" value="${a.NAMA_BARANG}">

        <input id="MERK_TIPE" value="${a.MERK_TIPE}">

        <input id="TAHUN_PEROLEHAN" value="${a.TAHUN_PEROLEHAN}">

        <input id="NILAI_PEROLEHAN" value="${a.NILAI_PEROLEHAN}">

        <input id="KODE_GEDUNG" value="${a.KODE_GEDUNG}">

        <input id="NAMA_GEDUNG" value="${a.NAMA_GEDUNG}">

        <input id="KODE_RUANGAN" value="${a.KODE_RUANGAN}">

        <input id="NAMA_RUANGAN" value="${a.NAMA_RUANGAN}">

        <input id="KONDISI" value="${a.KONDISI}">

        <input id="STATUS_ASET" value="${a.STATUS_ASET}">

        <textarea id="KETERANGAN">${a.KETERANGAN || ""}</textarea>

        <button
            class="btn btn-primary"
            onclick="updateAset()">

            Update

        </button>

    </div>

    `;
}
async function updateAset() {

    const data = {

        action: "updateAset",

        ID_ASET:
            document.getElementById("ID_ASET").value,

        KODE_BARANG:
            document.getElementById("KODE_BARANG").value,

        NUP:
            document.getElementById("NUP").value,

        NAMA_BARANG:
            document.getElementById("NAMA_BARANG").value,

        MERK_TIPE:
            document.getElementById("MERK_TIPE").value,

        TAHUN_PEROLEHAN:
            document.getElementById("TAHUN_PEROLEHAN").value,

        NILAI_PEROLEHAN:
            document.getElementById("NILAI_PEROLEHAN").value,

        KODE_GEDUNG:
            document.getElementById("KODE_GEDUNG").value,

        NAMA_GEDUNG:
            document.getElementById("NAMA_GEDUNG").value,

        KODE_RUANGAN:
            document.getElementById("KODE_RUANGAN").value,

        NAMA_RUANGAN:
            document.getElementById("NAMA_RUANGAN").value,

        KONDISI:
            document.getElementById("KONDISI").value,

        STATUS_ASET:
            document.getElementById("STATUS_ASET").value,

        KETERANGAN:
            document.getElementById("KETERANGAN").value

    };

    await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

    });

    alert("Aset berhasil diupdate");

    loadMasterAset();
}
async function deleteAset(id) {

    const konfirmasi =
        confirm(
            "Hapus aset ini ?"
        );

    if (!konfirmasi) return;

    await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

            action: "deleteAset",

            id: id

        })

    });

    alert(
        "Aset berhasil dihapus"
    );

    loadMasterAset();
}
function formatRupiah(angka){

    return Number(
        angka || 0
    ).toLocaleString(
        "id-ID"
    );
}
let selectedGedung = "";
async function loadGedungAdmin() {

    const gedungRes = await fetch(
        `${API_URL}?action=getGedung`
    );

    const gedungJson = await gedungRes.json();

    let html = `

    <div class="gedung-layout">

        <div class="gedung-panel">

            <div class="card">

                <h2>Tambah Gedung</h2>

                <input
                    id="KODE_GEDUNG"
                    placeholder="Kode Gedung">

                <input
                    id="NAMA_GEDUNG"
                    placeholder="Nama Gedung">

                <button
                    class="btn btn-success"
                    onclick="saveGedung()">

                    Simpan

                </button>

            </div>

            <div class="card">

                <h2>Daftar Gedung</h2>

                <div id="gedungList">
    `;

    gedungJson.data.forEach(g => {

        html += `

            <div class="list-item">

                <strong>
                    ${g.NAMA_GEDUNG}
                </strong>

                <br>

                ${g.KODE_GEDUNG}

                <br><br>

                <button
                    class="btn btn-primary"
                    onclick="selectGedung('${g.KODE_GEDUNG}')">

                    Pilih

                </button>

                <button
                    class="btn btn-primary"
                    onclick="editGedung('${g.KODE_GEDUNG}')">

                    Edit

                </button>

                <button
                    class="btn btn-danger"
                    onclick="deleteGedung('${g.KODE_GEDUNG}')">

                    Hapus

                </button>

            </div>

        `;
    });

    html += `

                </div>

            </div>

        </div>

        <div class="ruangan-panel">

            <div class="card">

                <h2>Ruangan</h2>

                <p>
                    Pilih gedung terlebih dahulu
                </p>

            </div>

        </div>

    </div>

    `;

    document.getElementById(
        "contentArea"
    ).innerHTML = html;
}
async function saveGedung() {

    const data = {

        action: "addGedung",

        KODE_GEDUNG:
            document.getElementById(
                "KODE_GEDUNG"
            ).value,

        NAMA_GEDUNG:
            document.getElementById(
                "NAMA_GEDUNG"
            ).value

    };

    await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

    });

    alert("Gedung berhasil disimpan");

    loadGedungAdmin();
}
async function selectGedung(kodeGedung){

    selectedGedung = kodeGedung;

    const gedungRes = await fetch(
        `${API_URL}?action=getGedung`
    );

    const ruanganRes = await fetch(
        `${API_URL}?action=getRuangan`
    );

    const gedungJson =
        await gedungRes.json();

    const ruanganJson =
        await ruanganRes.json();

    const gedung =
        gedungJson.data.find(
            x =>
            x.KODE_GEDUNG === kodeGedung
        );

    const ruangan =
        ruanganJson.data.filter(
            x =>
            x.KODE_GEDUNG === kodeGedung
        );

    let html = `

        <div class="card">

            <h2>
                ${gedung.NAMA_GEDUNG}
            </h2>

            <input
                id="KODE_RUANGAN"
                placeholder="Kode Ruangan">

            <input
                id="NAMA_RUANGAN"
                placeholder="Nama Ruangan">

            <button
                class="btn btn-success"
                onclick="saveRuangan()">

                Simpan

            </button>

        </div>

        <div class="card">

            <h2>
                Daftar Ruangan
            </h2>

    `;

    ruangan.forEach(r => {

        html += `

            <div class="list-item">

                <strong>
                    ${r.NAMA_RUANGAN}
                </strong>

                <br>

                ${r.KODE_RUANGAN}

                <br><br>

                <button
                    class="btn btn-primary"
                    onclick="editRuangan('${r.KODE_RUANGAN}')">

                    Edit

                </button>

                <button
                    class="btn btn-danger"
                    onclick="deleteRuangan('${r.KODE_RUANGAN}')">

                    Hapus

                </button>

            </div>

        `;
    });

    html += `
        </div>
    `;

    document.querySelector(
        ".ruangan-panel"
    ).innerHTML = html;
}
async function saveRuangan(){

    const data = {

        action: "addRuangan",

        KODE_RUANGAN:
            document.getElementById(
                "KODE_RUANGAN"
            ).value,

        KODE_GEDUNG:
            selectedGedung,

        NAMA_RUANGAN:
            document.getElementById(
                "NAMA_RUANGAN"
            ).value

    };

    await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

    });

    alert(
        "Ruangan berhasil disimpan"
    );

    selectGedung(
        selectedGedung
    );
}
async function editGedung(kode){

    const namaBaru =
        prompt(
            "Nama Gedung Baru"
        );

    if(!namaBaru) return;

    await fetch(API_URL, {

        method:"POST",

        body:JSON.stringify({

            action:"updateGedung",

            KODE_GEDUNG:kode,

            NAMA_GEDUNG:namaBaru

        })

    });

    loadGedungAdmin();
}
async function deleteGedung(kode){

    if(
        !confirm(
            "Hapus gedung?"
        )
    ) return;

    await fetch(API_URL, {

        method:"POST",

        body:JSON.stringify({

            action:"deleteGedung",

            kode:kode

        })

    });

    loadGedungAdmin();
}
async function editRuangan(kode){

    const namaBaru =
        prompt(
            "Nama Ruangan Baru"
        );

    if(!namaBaru) return;

    await fetch(API_URL, {

        method:"POST",

        body:JSON.stringify({

            action:"updateRuangan",

            KODE_RUANGAN:kode,

            KODE_GEDUNG:selectedGedung,

            NAMA_RUANGAN:namaBaru

        })

    });

    selectGedung(
        selectedGedung
    );
}
async function deleteRuangan(kode){

    if(
        !confirm(
            "Hapus ruangan?"
        )
    ) return;

    await fetch(API_URL, {

        method:"POST",

        body:JSON.stringify({

            action:"deleteRuangan",

            kode:kode

        })

    });

    selectGedung(
        selectedGedung
    );
}
async function loadDashboard() {

    const asetRes = await fetch(
        `${API_URL}?action=getAset`
    );

    const gedungRes = await fetch(
        `${API_URL}?action=getGedung`
    );

    const ruanganRes = await fetch(
        `${API_URL}?action=getRuangan`
    );

    const asetData =
        await asetRes.json();

    const gedungData =
        await gedungRes.json();

    const ruanganData =
        await ruanganRes.json();

    const asetAktif =
        asetData.data.filter(
            x => x.STATUS_ASET !== "Dihapus"
        );

    const totalAset =
        asetAktif.length;

    const totalGedung =
        gedungData.data.length;

    const totalRuangan =
        ruanganData.data.length;

    let totalNilai = 0;

    let baik = 0;
    let rusakRingan = 0;
    let rusakBerat = 0;

    asetAktif.forEach(a => {

        totalNilai += Number(
            a.NILAI_PEROLEHAN || 0
        );

        if (
            a.KONDISI === "Baik"
        ) {
            baik++;
        }

        if (
            a.KONDISI === "Rusak Ringan"
        ) {
            rusakRingan++;
        }

        if (
            a.KONDISI === "Rusak Berat"
        ) {
            rusakBerat++;
        }

    });

    document.getElementById(
        "contentArea"
    ).innerHTML = `

    <div class="stats">

        <div class="stat-box">
            <h3>Total Aset</h3>
            <h2>${totalAset}</h2>
        </div>

        <div class="stat-box">
            <h3>Total Gedung</h3>
            <h2>${totalGedung}</h2>
        </div>

        <div class="stat-box">
            <h3>Total Ruangan</h3>
            <h2>${totalRuangan}</h2>
        </div>

        <div class="stat-box">
            <h3>Nilai Aset</h3>
            <h2>
                Rp ${totalNilai.toLocaleString("id-ID")}
            </h2>
        </div>

        <div class="stat-box">
            <h3>Baik</h3>
            <h2>${baik}</h2>
        </div>

        <div class="stat-box">
            <h3>Rusak Ringan</h3>
            <h2>${rusakRingan}</h2>
        </div>

        <div class="stat-box">
            <h3>Rusak Berat</h3>
            <h2>${rusakBerat}</h2>
        </div>

    </div>

    `;
}
async function loadDBRAdmin() {

    const gedungRes = await fetch(
        `${API_URL}?action=getGedung`
    );

    const gedungData =
        await gedungRes.json();

    let html = `

    <div class="card">

        <h2>
            Daftar Barang Ruangan
        </h2>

    </div>

    `;

    gedungData.data.forEach(g => {

        html += `

        <div class="card">

            <h3>
                ${g.NAMA_GEDUNG}
            </h3>

            <button
                class="btn btn-primary"
                onclick="
                loadDBRGedung(
                '${g.KODE_GEDUNG}'
                )">

                Lihat Ruangan

            </button>

        </div>

        `;
    });

    html += `

    <div id="dbrArea"></div>

    `;

    document.getElementById(
        "contentArea"
    ).innerHTML = html;
}
async function loadDBRGedung(kodeGedung){

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuangan`
        );

    const ruanganData =
        await ruanganRes.json();

    const ruangan =
        ruanganData.data.filter(
            x =>
            x.KODE_GEDUNG === kodeGedung
        );

    let html = "";

    ruangan.forEach(r => {

        html += `

        <div class="card">

            <h4>
                ${r.NAMA_RUANGAN}
            </h4>

            <button
                class="btn btn-primary"
                onclick="
                viewDBR(
                '${r.KODE_RUANGAN}'
                )">

                Lihat DBR

            </button>

        </div>

        `;
    });

    document.getElementById(
        "dbrArea"
    ).innerHTML = html;
}
async function viewDBR(kodeRuangan){

    const asetRes =
        await fetch(
            `${API_URL}?action=getAset`
        );

    const asetData =
        await asetRes.json();

    const aset =
        asetData.data.filter(
            x =>
            x.KODE_RUANGAN === kodeRuangan &&
            x.STATUS_ASET !== "Dihapus"
        );

    let html = `

    <div class="card">

        <h3>
            DBR Ruangan
        </h3>

        <table>

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Barang</th>

                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

    `;

    aset.forEach(a => {

        html += `

        <tr>

            <td>
                ${a.ID_ASET}
            </td>

            <td>
                ${a.NAMA_BARANG}
            </td>

            <td>
                ${a.KONDISI}
            </td>

        </tr>

        `;
    });

    html += `

            </tbody>

        </table>

    </div>

    `;

    document.getElementById(
        "dbrArea"
    ).innerHTML = html;
}
async function viewDBR(kodeRuangan){

    const asetRes =
        await fetch(
            `${API_URL}?action=getAset`
        );

    const asetData =
        await asetRes.json();

    const aset =
        asetData.data.filter(
            x =>
            x.KODE_RUANGAN === kodeRuangan &&
            x.STATUS_ASET !== "Dihapus"
        );

    let html = `

    <div class="card">

        <h3>
            DBR Ruangan
        </h3>

        <table>

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Barang</th>

                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

    `;

    aset.forEach(a => {

        html += `

        <tr>

            <td>
                ${a.ID_ASET}
            </td>

            <td>
                ${a.NAMA_BARANG}
            </td>

            <td>
                ${a.KONDISI}
            </td>

        </tr>

        `;
    });

    html += `

            </tbody>

        </table>

    </div>

    `;

    document.getElementById(
        "dbrArea"
    ).innerHTML = html;
}
async function loadStatistikAdmin() {

    const response = await fetch(
        `${API_URL}?action=getAset`
    );

    const result = await response.json();

    const aset =
        result.data.filter(
            x => x.STATUS_ASET !== "Dihapus"
        );

    let totalNilai = 0;

    let baik = 0;
    let rusakRingan = 0;
    let rusakBerat = 0;

    const gedungMap = {};
    const ruanganMap = {};
    const barangMap = {};
    const tahunMap = {};

    aset.forEach(a => {

        totalNilai += Number(
            a.NILAI_PEROLEHAN || 0
        );

        if (a.KONDISI === "Baik")
            baik++;

        if (a.KONDISI === "Rusak Ringan")
            rusakRingan++;

        if (a.KONDISI === "Rusak Berat")
            rusakBerat++;

        gedungMap[a.NAMA_GEDUNG] =
            (gedungMap[a.NAMA_GEDUNG] || 0) + 1;

        ruanganMap[a.NAMA_RUANGAN] =
            (ruanganMap[a.NAMA_RUANGAN] || 0) + 1;

        barangMap[a.NAMA_BARANG] =
            (barangMap[a.NAMA_BARANG] || 0) + 1;

        tahunMap[a.TAHUN_PEROLEHAN] =
            (tahunMap[a.TAHUN_PEROLEHAN] || 0) + 1;

    });

    let html = `

    <div class="stats">

        <div class="stat-box">
            <h3>Total Aset</h3>
            <h2>${aset.length}</h2>
        </div>

        <div class="stat-box">
            <h3>Total Nilai</h3>
            <h2>
                Rp ${totalNilai.toLocaleString("id-ID")}
            </h2>
        </div>

        <div class="stat-box">
            <h3>Baik</h3>
            <h2>${baik}</h2>
        </div>

        <div class="stat-box">
            <h3>Rusak Ringan</h3>
            <h2>${rusakRingan}</h2>
        </div>

        <div class="stat-box">
            <h3>Rusak Berat</h3>
            <h2>${rusakBerat}</h2>
        </div>

    </div>

    <div class="card">

        <h2>Statistik Gedung</h2>

        <table>

            <thead>
                <tr>
                    <th>Gedung</th>
                    <th>Jumlah</th>
                </tr>
            </thead>

            <tbody>
    `;

    Object.keys(gedungMap).forEach(key => {

        html += `
        <tr>
            <td>${key}</td>
            <td>${gedungMap[key]}</td>
        </tr>
        `;
    });

    html += `
            </tbody>
        </table>

    </div>

    <div class="card">

        <h2>Statistik Ruangan</h2>

        <table>

            <thead>
                <tr>
                    <th>Ruangan</th>
                    <th>Jumlah</th>
                </tr>
            </thead>

            <tbody>
    `;

    Object.keys(ruanganMap).forEach(key => {

        html += `
        <tr>
            <td>${key}</td>
            <td>${ruanganMap[key]}</td>
        </tr>
        `;
    });

    html += `
            </tbody>
        </table>

    </div>

    <div class="card">

        <h2>Statistik Barang</h2>

        <table>

            <thead>
                <tr>
                    <th>Barang</th>
                    <th>Jumlah</th>
                </tr>
            </thead>

            <tbody>
    `;

    Object.keys(barangMap).forEach(key => {

        html += `
        <tr>
            <td>${key}</td>
            <td>${barangMap[key]}</td>
        </tr>
        `;
    });

    html += `
            </tbody>
        </table>

    </div>

    <div class="card">

        <h2>Statistik Tahun</h2>

        <table>

            <thead>
                <tr>
                    <th>Tahun</th>
                    <th>Jumlah</th>
                </tr>
            </thead>

            <tbody>
    `;

    Object.keys(tahunMap).forEach(key => {

        html += `
        <tr>
            <td>${key}</td>
            <td>${tahunMap[key]}</td>
        </tr>
        `;
    });

    html += `
            </tbody>
        </table>

    </div>
    `;

    document.getElementById(
        "contentArea"
    ).innerHTML = html;
}
function loadPengaturan(){

    document.getElementById(
        "contentArea"
    ).innerHTML = `

    <div class="card">

        <h2>Pengaturan</h2>

        <div class="menu-setting">

            <button
                class="btn btn-primary"
                onclick="loadMutasiBarang()">

                Mutasi Barang

            </button>

            <button
                class="btn btn-primary"
                onclick="loadPerubahanKondisi()">

                Perubahan Kondisi

            </button>

            <button
                class="btn btn-primary"
                onclick="loadAdminManagement()">

                Manajemen Admin

            </button>

            <button
                class="btn btn-primary"
                onclick="loadPICManagement()">

                Manajemen PIC

            </button>

            <button
                class="btn btn-primary"
                onclick="loadLogoInstansi()">

                Logo Instansi

            </button>

            <button
                class="btn btn-primary"
                onclick="loadKopSurat()">

                Kop Surat DBR

            </button>

        </div>

        <div id="settingArea"></div>

    </div>

    `;
}
function loadMutasiBarang(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Mutasi Barang</h3>

        <p>
            Memindahkan aset
            antar ruangan
            atau gedung.
        </p>

    </div>

    `;
}
function loadPerubahanKondisi(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Perubahan Kondisi</h3>

        <p>
            Mengubah kondisi
            aset secara langsung.
        </p>

    </div>

    `;
}
function loadAdminManagement(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Manajemen Admin</h3>

        <p>
            Kelola akun admin.
        </p>

    </div>

    `;
}
function loadPICManagement(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Manajemen PIC</h3>

        <p>
            Kelola penanggung jawab.
        </p>

    </div>

    `;
}
function loadLogoInstansi(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Logo Instansi</h3>

        <input type="file">

    </div>

    `;
}
function loadKopSurat(){

    document.getElementById(
        "settingArea"
    ).innerHTML = `

    <div class="card">

        <h3>Kop Surat DBR</h3>

        <textarea
            rows="8"
            style="width:100%">
        </textarea>

    </div>

    `;
}
