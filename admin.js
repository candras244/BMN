const API_URL = "...";

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
