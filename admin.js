/* =====================================
   SIM-DBR FINAL
   ADMIN CORE
===================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycby9GedHFRyKYSJoNL3AiES5LRQLxru879o6Mht1aZXo2bmiRBvHrJDErStfH2IH0U07/exec";

/* =====================================
   HELPER
===================================== */

function setPageTitle(title){

    document.getElementById(
        "pageTitle"
    ).textContent = title;

}

function setContent(html){

    document.getElementById(
        "contentArea"
    ).innerHTML = html;

}

async function getAPI(action){

    const response =
        await fetch(
            `${API_URL}?action=${action}`
        );

    return await response.json();

}

async function postAPI(data){

    const response =
        await fetch(
            API_URL,
            {
                method:"POST",
                mode:"no-cors",
                body:JSON.stringify(data)
            }
        );

    return {
        success:true
    };

}

function formatRupiah(nilai){

    return new Intl.NumberFormat(
        "id-ID",
        {
            style:"currency",
            currency:"IDR",
            maximumFractionDigits:0
        }
    ).format(
        Number(nilai || 0)
    );

}

/* =====================================
   LOADING
===================================== */

function showLoading(){

    setContent(`

        <div class="card">

            Memuat Data...

        </div>

    `);

}

/* =====================================
   DASHBOARD
===================================== */

nc function loadDashboard(){

    setPageTitle(
        "Dashboard"
    );

    showLoading();

    try{

        const data =
            await getAPI(
                "getDashboard"
            );

        setContent(`

        <div class="summary-grid">

            <div class="card">
                <div class="card-title">
                    Total Gedung
                </div>
                <div class="card-value">
                    ${data.totalGedung || 0}
                </div>
            </div>

            <div class="card">
                <div class="card-title">
                    Total Ruangan
                </div>
                <div class="card-value">
                    ${data.totalRuangan || 0}
                </div>
            </div>

            <div class="card">
                <div class="card-title">
                    Total Aset
                </div>
                <div class="card-value">
                    ${data.totalAset || 0}
                </div>
            </div>

            <div class="card">
                <div class="card-title">
                    Nilai Aset
                </div>
                <div class="card-value">
                    ${formatRupiah(
                        data.totalNilai || 0
                    )}
                </div>
            </div>

        </div>

        <br>

        <div class="card">

            <h3>
                Dashboard SIM-DBR
            </h3>

            <br>

            Backend API
            berhasil terhubung.

        </div>

        `);

    }catch(err){

        setContent(`

            <div class="card">

                ERROR :

                <br><br>

                ${err}

            </div>

        `);

    }

}

/* =====================================
   PLACEHOLDER MENU
===================================== */

nc function loadMasterAset(){

    setPageTitle(
        "Master Aset"
    );

    showLoading();

    try{

        const data =
            await getAPI(
                "getMasterAset"
            );

        let rows = "";

        data.forEach(
            (item,index)=>{
                rows += `

                <tr>

                    <td>
                        ${index+1}
                    </td>

                    <td>
                        ${item.ID_ASET || ""}
                    </td>

                    <td>
                        ${item.KODE_BARANG || ""}
                    </td>

                    <td>
                        ${item.NAMA_BARANG || ""}
                    </td>

                    <td>
                        ${item.NAMA_GEDUNG || ""}
                    </td>

                    <td>
                        ${item.NAMA_RUANGAN || ""}
                    </td>

                    <td>
                        ${item.KONDISI || ""}
                    </td>

                    <td>
                        ${item.STATUS_ASET || ""}
                    </td>

                    <td>

                        <button
                            class="btn btn-primary"
                              onclick="editAset('${item.ID_ASET}')">

                            Edit

                        </button>

                    </td>

                </tr>

                `;
            }
        );

        setContent(`

         <h1>VERSI EDIT BARU</h1>
         
         <div class="card">

        <div
            style="
            display:flex;
            justify-content:space-between;
            margin-bottom:20px;
            ">

            <h3>
                Data Master Aset
            </h3>

            <button
                class="btn btn-success"
                onclick="showFormTambahAset()">

                + Tambah Aset

            </button>

        </div>

        <div class="table-container">

            <table>

                <thead>

                    <tr>

                        <th>No</th>
                        <th>ID Aset</th>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Gedung</th>
                        <th>Ruangan</th>
                        <th>Kondisi</th>
                        <th>Status</th>
                        <th>Aksi</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>

        `);

    }catch(err){

        setContent(`

            <div class="card">

                ${err}

            </div>

        `);

    }

}

nc function editAset(idAset){

    const data =
        await getAPI(
            "getAsetById"
            +
            "&idAset="
            +
            idAset
        );

    setContent(`

    <div class="card">

        <h3>
            Edit Aset
        </h3>

        <br>

        <div class="form-group">
            <label>ID ASET</label>
            <input
                class="form-control"
                value="${data.ID_ASET}"
                readonly>
        </div>

        <div class="form-group">
            <label>Nama Barang</label>
            <input
                class="form-control"
                value="${data.NAMA_BARANG || ""}">
        </div>

         <br>

         <button
             class="btn-danger"
             onclick="hapusPermanenAset('${data.ID_ASET}')">
         
             Hapus Permanen
         
         </button>

        <button
            class="btn"
            onclick="loadMasterAset()">

            Kembali

        </button>

    </div>

    `);

}

async function hapusPermanenAset(idAset){

    const yakin =
        confirm(
            "Hapus permanen aset ini?"
        );

    if(!yakin){
        return;
    }

    try{

        const result =
            await getAPI(
                "deleteMasterAset&idAset="
                +
                encodeURIComponent(idAset)
            );

        console.log(result);

        if(result.success){

            alert(
                "Aset berhasil dihapus"
            );

            loadMasterAset();

        }else{

            alert(
                result.message ||
                "Gagal menghapus aset"
            );

        }

    }catch(err){

        console.error(err);

        alert(
            "Error : "
            + err.message
        );

    }

}

function loadMutasi(){

    setPageTitle(
        "Mutasi"
    );

    setContent(`

        <div class="card">

            Module Mutasi
            belum dibuat.

        </div>

    `);

}

function loadKondisi(){

    setPageTitle(
        "Perubahan Kondisi"
    );

    setContent(`

        <div class="card">

            Module Kondisi
            belum dibuat.

        </div>

    `);

}

function loadBAST(){

    setPageTitle(
        "BAST"
    );

    setContent(`

        <div class="card">

            Module BAST
            belum dibuat.

        </div>

    `);

}

function loadPerawatan(){

    setPageTitle(
        "Perawatan Gedung"
    );

    setContent(`

        <div class="card">

            Module Perawatan
            belum dibuat.

        </div>

    `);

}

function loadPenghapusan(){

    setPageTitle(
        "Penghapusan"
    );

    setContent(`

        <div class="card">

            Module Penghapusan
            belum dibuat.

        </div>

    `);

}

function loadStatistik(){

    setPageTitle(
        "Statistik"
    );

    setContent(`

        <div class="card">

            Module Statistik
            belum dibuat.

        </div>

    `);

}

function loadPengaturan(){

    setPageTitle(
        "Pengaturan"
    );

    setContent(`

        <div class="card">

            Module Pengaturan
            belum dibuat.

        </div>

    `);

}

/* =====================================
   ROUTER MENU
===================================== */

function loadPage(page){

    switch(page){

        case "dashboard":
            loadDashboard();
            break;

        case "master-aset":
            loadMasterAset();
            break;

        case "gedung":
            loadGedungAdmin();
            break;

        case "mutasi":
            loadMutasi();
            break;

        case "kondisi":
            loadKondisi();
            break;

        case "bast":
            loadBAST();
            break;

        case "perawatan":
            loadPerawatan();
            break;

        case "penghapusan":
            loadPenghapusan();
            break;

        case "statistik":
            loadStatistik();
            break;

        case "pengaturan":
            loadPengaturan();
            break;

    }

}

/* =====================================
   INIT
===================================== */

document
.querySelectorAll(
    ".menu-item"
)
.forEach(menu=>{

    menu.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            document
            .querySelectorAll(
                ".menu-item"
            )
            .forEach(m=>
                m.classList.remove(
                    "active"
                )
            );

            this.classList.add(
                "active"
            );

            const page =
                this.dataset.page;

            if(page){

                loadPage(page);

            }

        }
    );

});

loadDashboard();

async function showFormTambahAset(){

    setPageTitle(
        "Tambah Aset"
    );

    const gedung =
        await getAPI(
            "getGedung"
        );

    let gedungOption =
        `<option value="">Pilih Gedung</option>`;

    gedung.forEach(g=>{

        gedungOption += `

        <option
            value="${g.KODE_GEDUNG}">

            ${g.NAMA_GEDUNG}

        </option>

        `;

    });

    setContent(`

    <div class="card">

        <h3>
            Tambah Aset
        </h3>

        <br>

        <div class="form-group">
            <label>Kode Barang</label>
            <input
                id="kodeBarang"
                class="form-control">
        </div>

        <div class="form-group">
            <label>NUP</label>
            <input
                id="nup"
                class="form-control">
        </div>

        <div class="form-group">
            <label>Nama Barang</label>
            <input
                id="namaBarang"
                class="form-control">
        </div>

         <div class="form-group">
             <label>Jenis Barang</label>
             <input
                 id="jenisBarang"
                 class="form-control">
         </div>

        <div class="form-group">
            <label>Merk / Tipe</label>
            <input
                id="merkTipe"
                class="form-control">
        </div>

        <div class="form-group">
            <label>Tahun Perolehan</label>
            <input
                id="tahunPerolehan"
                type="number"
                class="form-control">
        </div>

        <div class="form-group">
            <label>Nilai Perolehan</label>
            <input
                id="nilaiPerolehan"
                type="number"
                class="form-control">
        </div>

        <div class="form-group">
            <label>Gedung</label>

            <select
                id="kodeGedung"
                class="form-control"
                onchange="loadDropdownRuangan()">

                ${gedungOption}

            </select>

        </div>

        <div class="form-group">
            <label>Ruangan</label>

            <select
                id="kodeRuangan"
                class="form-control">

                <option value="">
                    Pilih Ruangan
                </option>

            </select>

        </div>

        <div class="form-group">
            <label>Kondisi</label>

            <select
                id="kondisi"
                class="form-control">

                <option>Baik</option>
                <option>Rusak Ringan</option>
                <option>Rusak Berat</option>

            </select>

        </div>

        <div class="form-group">
            <label>Status Aset</label>

            <select
                id="statusAset"
                class="form-control">

                <option>Draft</option>
                  <option selected>Terdaftar</option>
                  <option>Dihapus</option>

            </select>

        </div>

        <div class="form-group">
            <label>Keterangan</label>

            <textarea
                id="keterangan"
                class="form-control"></textarea>

        </div>

        <button
            class="btn btn-success"
            onclick="simpanAset()">

            Simpan

        </button>

        <button
            class="btn"
            onclick="loadMasterAset()">

            Batal

        </button>

    </div>

    `);

}

async function loadDropdownRuangan(){

    const kodeGedung =
        document.getElementById(
            "kodeGedung"
        ).value;

    const data =
        await getAPI(
            "getRuanganByGedung"
            +
            "&kodeGedung="
            +
            kodeGedung
        );

    const select =
        document.getElementById(
            "kodeRuangan"
        );

    let html =
        `<option value="">
            Pilih Ruangan
        </option>`;

    data.forEach(r=>{

        html += `

        <option
            value="${r.KODE_RUANGAN}">

            ${r.NAMA_RUANGAN}

        </option>

        `;

    });

    select.innerHTML =
        html;

}

async function simpanAset(){

    try{

        const kodeGedung =
            document.getElementById(
                "kodeGedung"
            );

        const kodeRuangan =
            document.getElementById(
                "kodeRuangan"
            );

        const namaGedung =
            kodeGedung.options[
                kodeGedung.selectedIndex
            ]?.text || "";

        const namaRuangan =
            kodeRuangan.options[
                kodeRuangan.selectedIndex
            ]?.text || "";

        const url =

        API_URL +

        "?action=addMasterAset" +

        "&KODE_BARANG=" +
        encodeURIComponent(
            document.getElementById(
                "kodeBarang"
            ).value
        ) +

        "&NUP=" +
        encodeURIComponent(
            document.getElementById(
                "nup"
            ).value
        ) +

        "&NAMA_BARANG=" +
        encodeURIComponent(
            document.getElementById(
                "namaBarang"
            ).value
        ) +

        "&MERK_TIPE=" +
        encodeURIComponent(
            document.getElementById(
                "merkTipe"
            ).value
        ) +

        "&TAHUN_PEROLEHAN=" +
        encodeURIComponent(
            document.getElementById(
                "tahunPerolehan"
            ).value
        ) +

        "&NILAI_PEROLEHAN=" +
        encodeURIComponent(
            document.getElementById(
                "nilaiPerolehan"
            ).value
        ) +

        "&KODE_GEDUNG=" +
        encodeURIComponent(
            kodeGedung.value
        ) +

        "&NAMA_GEDUNG=" +
        encodeURIComponent(
            namaGedung
        ) +

        "&KODE_RUANGAN=" +
        encodeURIComponent(
            kodeRuangan.value
        ) +

        "&NAMA_RUANGAN=" +
        encodeURIComponent(
            namaRuangan
        ) +

        "&KONDISI=" +
        encodeURIComponent(
            document.getElementById(
                "kondisi"
            ).value
        ) +

        "&STATUS_ASET=" +
        encodeURIComponent(
            document.getElementById(
                "statusAset"
            ).value
        ) +

        "&KETERANGAN=" +
        encodeURIComponent(
            document.getElementById(
                "keterangan"
            ).value
        );

        const response =
            await fetch(url);

        const result =
            await response.json();

        if(result.success){

            alert(
                "Aset berhasil disimpan"
            );

            loadMasterAset();

        }else{

            alert(
                result.message ||
                result.error
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function loadGedungAdmin(){

    setPageTitle(
        "Gedung"
    );

    setContent(`

    <div class="card">

        <h3>
            Modul Gedung
        </h3>

        <p>
            Sedang dalam pengembangan
        </p>

    </div>

    `);

}
