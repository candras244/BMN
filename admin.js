/* =====================================
   SIM-DBR FINAL
   ADMIN CORE
===================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbyJDizwb_tZXo40NTv7g-TURs2op4cFvn1seOJPjeo65MUzIziwHsjU5KVdoQq3eLH3/exec";

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

async function loadDashboard(){

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

async function loadMasterAset(){

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
                            class="btn btn-primary">

                            Edit

                        </button>

                    </td>

                </tr>

                `;
            }
        );

        setContent(`

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

function loadGedungAdmin(){

    setPageTitle(
        "Gedung"
    );

    setContent(`

        <div class="card">

            Module Gedung
            belum dibuat.

        </div>

    `);

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

function showFormTambahAset(){

    setPageTitle(
        "Tambah Aset"
    );

    setContent(`

    <div class="card">

        <h3>Tambah Aset</h3>

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
            <label>Merk / Tipe</label>
            <input
                id="merkTipe"
                class="form-control">
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

async function simpanAset(){

    try{

        const kodeBarang =
            document.getElementById(
                "kodeBarang"
            ).value;

        const nup =
            document.getElementById(
                "nup"
            ).value;

        const namaBarang =
            document.getElementById(
                "namaBarang"
            ).value;

        const merkTipe =
            document.getElementById(
                "merkTipe"
            ).value;

        const url =

            API_URL +

            "?action=addMasterAset" +

            "&KODE_BARANG=" +
            encodeURIComponent(
                kodeBarang
            ) +

            "&NUP=" +
            encodeURIComponent(
                nup
            ) +

            "&NAMA_BARANG=" +
            encodeURIComponent(
                namaBarang
            ) +

            "&MERK_TIPE=" +
            encodeURIComponent(
                merkTipe
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
