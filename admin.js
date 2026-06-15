/* =====================================
   SIM-DBR FINAL
   ADMIN CORE
===================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

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
                body:JSON.stringify(data)
            }
        );

    return await response.json();

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

function formatRupiahInput(input){

    let angka =
        input.value.replace(
            /\D/g,
            ""
        );

    input.value =
        Number(
            angka || 0
        ).toLocaleString(
            "id-ID"
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
                "getStatistik"
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

       alert(JSON.stringify(data));

         let rows = "";

        console.log(data);
  
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

async function editAset(idAset){

    const data =
        await getAPI(
            "getAsetById"
            +
            "&idAset="
            +
            idAset
        );

    const gedung =
        await getAPI(
            "getGedung"
        );

    let gedungOption = "";

    gedung.forEach(g=>{

        gedungOption += `

        <option
            value="${g.KODE_GEDUNG}"
            ${
                g.KODE_GEDUNG === data.KODE_GEDUNG
                ? "selected"
                : ""
            }>

            ${g.NAMA_GEDUNG}

        </option>

        `;

    });

    setContent(`

    <div class="card">

        <h3>
            Edit Aset
        </h3>

        <br>

        <div class="form-group">
            <label>ID ASET</label>
            <input
                id="idAset"
                class="form-control"
                value="${data.ID_ASET}"
                readonly>
        </div>

        <div class="form-group">
            <label>Kode Barang</label>
            <input
                id="kodeBarang"
                class="form-control"
                value="${data.KODE_BARANG || ""}">
        </div>

        <div class="form-group">
            <label>NUP</label>
            <input
                id="nup"
                class="form-control"
                value="${data.NUP || ""}">
        </div>

        <div class="form-group">
            <label>Nama Barang</label>
            <input
                id="namaBarang"
                class="form-control"
                value="${data.NAMA_BARANG || ""}">
        </div>

        <div class="form-group">
            <label>Jenis Barang</label>

            <select
                id="jenisBarang"
                class="form-control">

                <option
                    value="ELEKTRONIK"
                    ${
                        data.JENIS_BARANG === "ELEKTRONIK"
                        ? "selected"
                        : ""
                    }>

                    ELEKTRONIK

                </option>

                <option
                    value="MEUBILAIR"
                    ${
                        data.JENIS_BARANG === "MEUBILAIR"
                        ? "selected"
                        : ""
                    }>

                    MEUBILAIR

                </option>

            </select>

        </div>

        <div class="form-group">
            <label>Merk / Tipe</label>
            <input
                id="merkTipe"
                class="form-control"
                value="${data.MERK_TIPE || ""}">
        </div>

        <div class="form-group">
            <label>Tahun Perolehan</label>
            <input
                id="tahunPerolehan"
                class="form-control"
                value="${data.TAHUN_PEROLEHAN || ""}">
        </div>

        <div class="form-group">
             <label>Nilai Perolehan</label>
             <input
                 id="nilaiPerolehan"
                 class="form-control"
                 oninput="formatRupiahInput(this)">
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

                <option
                    value="${data.KODE_RUANGAN || ""}">

                    ${data.NAMA_RUANGAN || "Pilih Ruangan"}

                </option>

            </select>

        </div>

        <div class="form-group">
            <label>Kondisi</label>

            <select
                id="kondisi"
                class="form-control">

                <option
                    ${data.KONDISI==="Baik"?"selected":""}>
                    Baik
                </option>

                <option
                    ${data.KONDISI==="Rusak Ringan"?"selected":""}>
                    Rusak Ringan
                </option>

                <option
                    ${data.KONDISI==="Rusak Berat"?"selected":""}>
                    Rusak Berat
                </option>

            </select>

        </div>

        <div class="form-group">
            <label>Status Aset</label>

            <select
                id="statusAset"
                class="form-control">

                <option
                    ${data.STATUS_ASET==="Draft"?"selected":""}>
                    Draft
                </option>

                <option
                    ${data.STATUS_ASET==="Terdaftar"?"selected":""}>
                    Terdaftar
                </option>

                <option
                    ${data.STATUS_ASET==="Dihapus"?"selected":""}>
                    Dihapus
                </option>

            </select>

        </div>

        <div class="form-group">
            <label>Keterangan</label>

            <textarea
                id="keterangan"
                class="form-control">${data.KETERANGAN || ""}</textarea>

        </div>

        <button
            class="btn btn-success"
            onclick="updateAsetForm()">

            Update

        </button>

        <button
            class="btn"
            onclick="loadMasterAset()">

            Batal

        </button>

    </div>

    `);

}

async function updateAsetForm(){

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

        const result =
            await postAPI({

                action:
                    "updateAset",

                ID_ASET:
                    document.getElementById(
                        "idAset"
                    ).value,

                KODE_BARANG:
                    document.getElementById(
                        "kodeBarang"
                    ).value,

                NUP:
                    document.getElementById(
                        "nup"
                    ).value,

                NAMA_BARANG:
                    document.getElementById(
                        "namaBarang"
                    ).value,

                JENIS_BARANG:
                    document.getElementById(
                        "jenisBarang"
                    ).value,

                MERK_TIPE:
                    document.getElementById(
                        "merkTipe"
                    ).value,

                TAHUN_PEROLEHAN:
                    document.getElementById(
                        "tahunPerolehan"
                    ).value,

                NILAI_PEROLEHAN:
                    document.getElementById(
                        "nilaiPerolehan"
                    ).value.replace(/\./g,""),

                KODE_GEDUNG:
                    kodeGedung.value,

                NAMA_GEDUNG:
                    namaGedung,

                KODE_RUANGAN:
                    kodeRuangan.value,

                NAMA_RUANGAN:
                    namaRuangan,

                KONDISI:
                    document.getElementById(
                        "kondisi"
                    ).value,

                STATUS_ASET:
                    document.getElementById(
                        "statusAset"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "Aset berhasil diperbarui"
            );

            loadMasterAset();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function loadMutasi(){

    setPageTitle(
        "Mutasi"
    );

    setContent(`

    <div class="card">

        <div
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:20px;
            ">

            <h3>
                Data Mutasi
            </h3>

            <button
                class="btn btn-success"
                onclick="formTambahMutasi()">

                + Tambah Mutasi

            </button>

        </div>

        <div id="listMutasi">

            Loading...

        </div>

    </div>

    `);

}

async function formTambahMutasi(){

    const gedung =
        await getAPI(
            "getGedung"
        );

    let gedungOption =
        `<option value="">
            Pilih Gedung
        </option>`;

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
            Tambah Mutasi
        </h3>

        <br>

        <div
            style="
                display:flex;
                gap:10px;
                margin-bottom:20px;
            ">

            <input
                id="filterKodeBarang"
                class="form-control"
                placeholder="Kode Barang">

            <input
                id="filterNamaBarang"
                class="form-control"
                placeholder="Nama Barang">

            <button
                class="btn btn-primary"
                onclick="cariAsetMutasi()">

                Cari

            </button>

        </div>

        <div id="hasilMutasi">

            Silakan cari aset.

        </div>

        <hr>

        <div class="form-group">

            <label>
                Gedung Tujuan
            </label>

            <select
                id="gedungTujuan"
                class="form-control"
                onchange="loadRuanganMutasi()">

                ${gedungOption}

            </select>

        </div>

        <div class="form-group">

            <label>
                Ruangan Tujuan
            </label>

            <select
                id="ruanganTujuan"
                class="form-control">

                <option value="">
                    Pilih Ruangan
                </option>

            </select>

        </div>

        <div class="form-group">

            <label>
                Dokumen
            </label>

            <input
                id="dokumen"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Keterangan
            </label>

            <textarea
                id="keterangan"
                class="form-control"></textarea>

        </div>

        <button
            class="btn btn-success"
            onclick="simpanMutasi()">

            Simpan Mutasi

        </button>

        <button
            class="btn"
            onclick="loadMutasi()">

            Batal

        </button>

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

             <select
                 id="jenisBarang"
                 class="form-control">

              <option value="">
                  Pilih Jenis Barang
              </option>

              <option value="ELEKTRONIK">
                  ELEKTRONIK
              </option>

               <option value="MEUBILAIR">
                  MEUBILAIR
              </option>

    </select>

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
                 class="form-control"
                 oninput="formatRupiahInput(this)">
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

        const result =
            await postAPI({

                action:
                    "tambahAset",

                KODE_BARANG:
                    document.getElementById(
                        "kodeBarang"
                    ).value,

                NUP:
                    document.getElementById(
                        "nup"
                    ).value,

                NAMA_BARANG:
                    document.getElementById(
                        "namaBarang"
                    ).value,
                MERK_TIPE:
                    document.getElementById(
                        "merkTipe"
                    ).value,
               
                MERK_TIPE:
                    document.getElementById(
                        "merkTipe"
                    ).value,

                TAHUN_PEROLEHAN:
                    document.getElementById(
                        "tahunPerolehan"
                    ).value,

                NILAI_PEROLEHAN:
                   document.getElementById(
                       "nilaiPerolehan"
                   ).value.replace(/\./g,""),
                   
                KODE_GEDUNG:
                    kodeGedung.value,

                NAMA_GEDUNG:
                    namaGedung,

                KODE_RUANGAN:
                    kodeRuangan.value,

                NAMA_RUANGAN:
                    namaRuangan,

                KONDISI:
                    document.getElementById(
                        "kondisi"
                    ).value,

                STATUS_ASET:
                    document.getElementById(
                        "statusAset"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "Aset berhasil disimpan"
            );

            loadMasterAset();

        }else{

            alert(
                result.message ||
                "Gagal menyimpan aset"
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function loadGedungAdmin(){

    setPageTitle("Gedung");

    showLoading();

    try{

        const gedung =
            await getAPI(
                "getGedung"
            );

        let gedungList = "";

        gedung.forEach(g=>{

            gedungList += `

            <div
                class="card"
                style="
                    margin-bottom:10px;
                    cursor:pointer;
                "
                onclick="loadRuanganPanel('${g.KODE_GEDUNG}')">

                <div
                   style="
                       display:flex;
                       justify-content:space-between;
                       align-items:center;
                   ">
               
                   <b>
                       ${g.NAMA_GEDUNG}
                   </b>
               
                   <div>
               
                       <button
                           class="btn btn-warning"
                           onclick="
                               event.stopPropagation();
                               editGedung('${g.KODE_GEDUNG}')
                           ">
               
                           Edit
               
                       </button>
               
                       <button
                           class="btn btn-danger"
                           onclick="
                               event.stopPropagation();
                               hapusGedung('${g.KODE_GEDUNG}')
                           ">
               
                           Hapus
               
                       </button>
               
                   </div>
               
               </div>
               
               <small>
                   ${g.KODE_GEDUNG}
               </small>
            </div>

            `;

        });

        setContent(`

        <div
            style="
                display:flex;
                gap:20px;
            ">

            <div
                style="
                    width:50%;
                ">

                <div class="card">

                    <div
                        style="
                            display:flex;
                            justify-content:space-between;
                            margin-bottom:15px;
                        ">

                        <h3>
                            Gedung
                        </h3>

                        <button
                            class="btn btn-success"
                            onclick="formTambahGedung()">

                            +

                        </button>

                    </div>

                    ${gedungList}

                </div>

            </div>

            <div
                style="
                    width:50%;
                ">

                <div
                    id="ruanganArea">

                    <div class="card">

                        Pilih Gedung
                        untuk melihat ruangan.

                    </div>

                </div>

            </div>

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

async function loadRuanganPanel(
    kodeGedung
){

    const data =
        await getAPI(
            "getRuanganByGedung"
            +
            "&kodeGedung="
            +
            kodeGedung
        );

    let rows = "";

    data.forEach((r,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${r.KODE_RUANGAN || ""}</td>

            <td>${r.NAMA_RUANGAN || ""}</td>

            <td>${r.JENIS_RUANGAN || ""}</td>

            <td>

                <button
                      class="btn btn-warning"
                      onclick="editRuangan('${r.KODE_RUANGAN}')">
                  
                      Edit
                  
                  </button>
                  
                  <button
                      class="btn btn-danger"
                      onclick="hapusRuangan('${r.KODE_RUANGAN}')">
                  
                      Hapus
                  
                  </button>

            </td>

        </tr>

        `;

    });

    document.getElementById(
        "ruanganArea"
    ).innerHTML = `

    <div class="card">

        <div
            style="
                display:flex;
                justify-content:space-between;
                margin-bottom:15px;
            ">

            <h3>
                Ruangan
            </h3>

            <button
                class="btn btn-success"
                onclick="formTambahRuangan('${kodeGedung}')">

                + Tambah Ruangan

            </button>

        </div>

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama Ruangan</th>
                    <th>Jenis</th>
                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `;

}

async function formTambahGedung(){

    setPageTitle(
        "Tambah Gedung"
    );

    setContent(`

    <div class="card">

        <h3>
            Tambah Gedung
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Gedung
            </label>

            <input
                id="kodeGedung"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Nama Gedung
            </label>

            <input
                id="namaGedung"
                class="form-control">

        </div>

         <div class="form-group">
            
               <label>
                   File ID Foto Gedung
               </label>
            
               <input
                  id="fotoGedung"
                  class="form-control"
                  placeholder="1PEuYTUMRLlYBpjT0TIsxIS-uQFrK6XXX">
            
         </div>

        <div class="form-group">

            <label>
                Deskripsi Singkat
            </label>

            <textarea
                id="deskripsiGedung"
                class="form-control"></textarea>

        </div>

        <button
            class="btn btn-success"
            onclick="simpanGedung()">

            Simpan

        </button>

        <button
            class="btn"
            onclick="loadGedungAdmin()">

            Batal

        </button>

    </div>

    `);

}

async function simpanGedung(){

    try{

        const result =
            await postAPI({

               action:
                  "tambahGedung",
                  
                  KODE_GEDUNG:
                      document.getElementById(
                          "kodeGedung"
                      ).value,
                  
                  NAMA_GEDUNG:
                      document.getElementById(
                          "namaGedung"
                      ).value,
                  
                  FOTO_GEDUNG:
                      document.getElementById(
                          "fotoGedung"
                      ).value,
                  
                  DESKRIPSI_SINGKAT:
                      document.getElementById(
                          "deskripsiGedung"
                      ).value

            });

        if(result.success){

            alert(
                "Gedung berhasil disimpan"
            );

            loadGedungAdmin();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function editGedung(
    kodeGedung
){

    const data =
        await getAPI(
            "getGedungByKode"
            +
            "&kodeGedung="
            +
            kodeGedung
        );

    setPageTitle(
        "Edit Gedung"
    );

    setContent(`

    <div class="card">

        <h3>
            Edit Gedung
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Gedung
            </label>

            <input
                id="kodeGedung"
                class="form-control"
                value="${data.KODE_GEDUNG || ""}"
                readonly>

        </div>

        <div class="form-group">

            <label>
                Nama Gedung
            </label>

            <input
                id="namaGedung"
                class="form-control"
                value="${data.NAMA_GEDUNG || ""}">

        </div>

        <div class="form-group">

            <label>
                File ID Foto Gedung
            </label>

            <input
                id="fotoGedung"
                class="form-control"
                value="${data.FOTO_GEDUNG || ""}">

        </div>

        <div class="form-group">

            <label>
                Deskripsi Singkat
            </label>

            <textarea
                id="deskripsiGedung"
                class="form-control">${data.DESKRIPSI_SINGKAT || ""}</textarea>

        </div>

        <button
            class="btn btn-success"
            onclick="updateGedungForm()">

            Update

        </button>

        <button
            class="btn"
            onclick="loadGedungAdmin()">

            Batal

        </button>

    </div>

    `);

}

async function updateGedungForm(){

    try{

        const result =
            await postAPI({

                action:
                    "updateGedung",

                KODE_GEDUNG:
                    document.getElementById(
                        "kodeGedung"
                    ).value,

                NAMA_GEDUNG:
                    document.getElementById(
                        "namaGedung"
                    ).value,

                FOTO_GEDUNG:
                    document.getElementById(
                        "fotoGedung"
                    ).value,

                DESKRIPSI_SINGKAT:
                    document.getElementById(
                        "deskripsiGedung"
                    ).value

            });

        if(result.success){

            alert(
                "Gedung berhasil diupdate"
            );

            loadGedungAdmin();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function hapusGedung(
    kodeGedung
){

    const konfirmasi =
        confirm(
            "Yakin hapus gedung ini?"
        );

    if(!konfirmasi){
        return;
    }

    try{

        const result =
            await postAPI({

                action:
                    "hapusGedung",

                KODE_GEDUNG:
                    kodeGedung

            });

        if(result.success){

            alert(
                "Gedung berhasil dihapus"
            );

            loadGedungAdmin();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function lihatRuangan(
    kodeGedung
){

    const data =
        await getAPI(
            "getRuanganByGedung"
            +
            "&kodeGedung="
            +
            kodeGedung
        );

    let rows = "";

    data.forEach((r,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${r.KODE_RUANGAN || ""}</td>

            <td>${r.NAMA_RUANGAN || ""}</td>

            <td>${r.JENIS_RUANGAN || ""}</td>
            <td>
            
                <button
                    class="btn btn-warning"
                    onclick="editRuangan('${r.KODE_RUANGAN}')">
            
                    Edit
            
                </button>
            
            </td>


        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <button
            class="btn"
            onclick="loadGedungAdmin()">

            Kembali

        </button>

        <br><br>

        <div style="
            display:flex;
            justify-content:space-between;
            margin-bottom:20px;
            ">
            
                <h3>
                    Daftar Ruangan
                </h3>
            
                <button
                    class="btn btn-success"
                    onclick="formTambahRuangan('${kodeGedung}')">
            
                    + Tambah Ruangan
            
                </button>
            
            </div>

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>Kode</th>
                    <th>Nama Ruangan</th>
                    <th>Jenis</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `);

}

async function editRuangan(
    kodeRuangan
){

    const data =
        await getAPI(
            "getRuanganByKode"
            +
            "&kodeRuangan="
            +
            kodeRuangan
        );

    setPageTitle(
        "Edit Ruangan"
    );

    setContent(`

    <div class="card">

        <h3>
            Edit Ruangan
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Ruangan
            </label>

            <input
                id="kodeRuangan"
                class="form-control"
                value="${data.KODE_RUANGAN}"
                readonly>

        </div>

        <div class="form-group">

            <label>
                Nama Ruangan
            </label>

            <input
                id="namaRuangan"
                class="form-control"
                value="${data.NAMA_RUANGAN || ""}">

        </div>

        <div class="form-group">

            <label>
                Jenis Ruangan
            </label>

            <input
                id="jenisRuangan"
                class="form-control"
                value="${data.JENIS_RUANGAN || ""}">

        </div>

        <button
            class="btn btn-success"
            onclick="updateRuanganForm()">

            Update

        </button>

        <button
            class="btn"
            onclick="loadGedungAdmin()">

            Batal

        </button>

    </div>

    `);

}

async function updateRuanganForm(){

    try{

        const result =
            await postAPI({

                action:
                    "updateRuangan",

                KODE_RUANGAN:
                    document.getElementById(
                        "kodeRuangan"
                    ).value,

                NAMA_RUANGAN:
                    document.getElementById(
                        "namaRuangan"
                    ).value,

                JENIS_RUANGAN:
                    document.getElementById(
                        "jenisRuangan"
                    ).value,

                STATUS_RUANGAN:
                    "Aktif"

            });

        if(result.success){

            alert(
                "Ruangan berhasil diperbarui"
            );

            loadGedungAdmin();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function hapusRuangan(
    kodeRuangan
){

    const konfirmasi =
        confirm(
            "Yakin hapus ruangan ini?"
        );

    if(!konfirmasi){
        return;
    }

    try{

        const result =
            await postAPI({

                action:
                    "hapusRuangan",

                KODE_RUANGAN:
                    kodeRuangan

            });

        if(result.success){

            alert(
                "Ruangan berhasil dihapus"
            );

            loadGedungAdmin();

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function formTambahRuangan(
    kodeGedung
){

    setPageTitle(
        "Tambah Ruangan"
    );

    setContent(`

    <div class="card">

        <h3>
            Tambah Ruangan
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Ruangan
            </label>

            <input
                id="kodeRuangan"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Nama Ruangan
            </label>

            <input
                id="namaRuangan"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Jenis Ruangan
            </label>

            <input
                id="jenisRuangan"
                class="form-control">

        </div>

        <button
            class="btn btn-success"
            onclick="simpanRuangan('${kodeGedung}')">

            Simpan

        </button>

    </div>

    `);

}

async function simpanRuangan(
    kodeGedung
){

    const result =
        await postAPI({

            action:
                "tambahRuangan",

            KODE_RUANGAN:
                document.getElementById(
                    "kodeRuangan"
                ).value,

            KODE_GEDUNG:
                kodeGedung,

            NAMA_RUANGAN:
                document.getElementById(
                    "namaRuangan"
                ).value,

            JENIS_RUANGAN:
                document.getElementById(
                    "jenisRuangan"
                ).value

        });

    if(result.success){

        alert(
            "Ruangan berhasil disimpan"
        );

        lihatRuangan(
            kodeGedung
        );

    }

}
