/* =====================================
   SIM-DBR FINAL
   ADMIN CORE
===================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

/* =====================================================
   LOGIN & ROLE
===================================================== */

const ROLE =
    localStorage.getItem(
        "SIMDBR_ROLE"
    ) || "";

const KODE_GEDUNG =
    localStorage.getItem(
        "SIMDBR_KODE_GEDUNG"
    ) || "";

const NAMA_ADMIN =
    localStorage.getItem(
        "SIMDBR_NAMA"
    ) || "";

/* =====================================================
   CEK LOGIN
===================================================== */

if(
    localStorage.getItem(
        "SIMDBR_LOGIN"
    ) !== "true"
){

    alert(
        "Silakan login terlebih dahulu"
    );

    window.location.href =
        "login.html";

}

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

    alert(
      "DASHBOARD BARU"
    );

    setPageTitle(
        "Dashboard"
    );

    showLoading();

    try{

        const data =
            await getAPI(
                "getStatistik"
            );

       console.log(
             "DETAIL RUSAK BERAT",
             data.detailRusakBerat
            );

          alert("DATA MASUK");

        console.log(data);

        console.log(
                data.infrastrukturGedung
         );

        console.log(
             data.aktivitasTahunan
         );

         let rowsInfrastruktur = "";
         
         (data.infrastrukturGedung || [])
         .forEach(g=>{
         
             rowsInfrastruktur += `
         
             <tr>
         
                 <td>${g.namaGedung}</td>
                 <td>${g.kelas}</td>
                 <td>${g.lab}</td>
                 <td>${g.kantor}</td>
                 <td>${g.rapat}</td>
                 <td>${g.total}</td>
         
             </tr>
         
             `;
         
         });

         let rowsAktivitas = "";

         (data.aktivitasTahunan || [])
         .forEach(a=>{
         
             rowsAktivitas += `
               <tr>
               
               <td>${a.tahun}</td>
               
               <td>${a.mutasi}</td>
               
               <td>${a.kondisi}</td>
               
               <td>${a.bast}</td>
               
               <td>${a.perawatan}</td>
               
               <td>
               
               <button
               class="btn btn-primary"
               onclick="lihatAktivitasTahunan('${a.tahun}')">
               
               Detail
               
               </button>
               
               </td>
               
               </tr>
               `;
         
         });

          let rowsRusakBerat = "";
   
            (data.detailRusakBerat || [])
            .forEach(a=>{
            
                rowsRusakBerat += `
            
                <tr>
            
                    <td>${a.KODE_BARANG}</td>
            
                    <td>${a.NAMA_BARANG}</td>
            
                    <td>${a.KONDISI}</td>
            
                </tr>
            
                `;
            
            });

         let rowsAktivitasTerakhir = "";
            
            (data.aktivitasTerakhir || [])
            .forEach(a=>{
            
                rowsAktivitasTerakhir += `
            
                <tr>
            
                    <td>${a.tanggal}</td>
            
                    <td>${a.jenis}</td>
            
                    <td>${a.keterangan}</td>
            
                </tr>
            
                `;
            
            });
       
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
                    TO DO LIST SARPRAS
                </h3>
            
                <br>
            
                <table>
            
                    <tr>
            
                        <td>
                            Lengkapi BAST
                        </td>
            
                        <td>
                            ${data.todoBAST || 0}
                        </td>
            
                    </tr>
            
                    <tr>
            
                        <td>
                            Periksa Aset Rusak Ringan
                        </td>
            
                        <td>
                            ${data.todoRusakRingan || 0}
                        </td>
            
                    </tr>
            
                    <tr>
            
                        <td>
                            Tindak Lanjuti Aset Rusak Berat
                        </td>
            
                        <td>
                            ${data.todoRusakBerat || 0}
                        </td>
            
                    </tr>
            
                </table>
            
            </div>

            <br>

            <div class="card">
            
                <h3>
                    PERENCANAAN TAHUN DEPAN
                </h3>
            
                <br>
            
                <table>
            
                    <tr>
            
                        <td>
                            Aset Perlu Penggantian
                        </td>
            
                        <td>
                            ${data.asetUsia5Tahun || 0}
                        </td>
            
                    </tr>
            
                    <tr>
            
                        <td>
                            Kandidat Penghapusan
                        </td>
            
                        <td>
                            ${data.asetRusakBerat || 0}
                        </td>
            
                    </tr>
            
                </table>
            
            </div>

        <br>

        <div class="card">

             <h3>
                 Infrastruktur
             </h3>
         
             <br>
         
             <table>
         
                 <tr>
                     <td>Ruang Kelas</td>
                     <td>${data.jumlahKelas || 0}</td>
                 </tr>
         
                 <tr>
                     <td>Laboratorium</td>
                     <td>${data.jumlahLab || 0}</td>
                 </tr>
         
                 <tr>
                     <td>Ruang Kantor</td>
                     <td>${data.jumlahKantor || 0}</td>
                 </tr>
         
                 <tr>
                     <td>Ruang Rapat</td>
                     <td>${data.jumlahRapat || 0}</td>
                 </tr>
         
                 <tr>
                     <td>Ruangan Tidak Aktif</td>
                     <td>${data.jumlahRuanganTidakAktif || 0}</td>
                 </tr>
         
             </table>

               <br>
               
               <h4>
                   Detail Per Gedung
               </h4>
               
               <table>
               
                   <thead>
               
                       <tr>
               
                           <th>Gedung</th>
                           <th>Kelas</th>
                           <th>Lab</th>
                           <th>Kantor</th>
                           <th>Rapat</th>
                           <th>Total</th>
               
                       </tr>
               
                   </thead>
               
                   <tbody>
               
                       ${rowsInfrastruktur}
               
                   </tbody>
               
               </table>
         
         </div>

               <br>
               
               <div class="card">
               
                   <h3>
                       Aktivitas Tahun
                   </h3>
               
                   <br>
               
                   <table>
               
                       <thead>
               
                           <tr>
               
                               <th>Tahun</th>
                               <th>Mutasi</th>
                               <th>Kondisi</th>
                               <th>BAST</th>
                               <th>Perawatan</th>
                               <th>Aksi</th>
               
                           </tr>
               
                       </thead>
               
                       <tbody>
               
                           ${rowsAktivitas}
               
                       </tbody>
               
                   </table>
               
               </div>

               <br>

            <div class="card">
            
                <h3>
                    Risiko & Peringatan
                </h3>
            
                <br>
            
                <table>
            
                    <tr>
                        <td>⚠ Aset Rusak Berat</td>
                        <td>${data.asetRusakBerat || 0}</td>
                    </tr>
            
                    <tr>
                        <td>⚠ Aset Hilang</td>
                        <td>${data.asetHilang || 0}</td>
                    </tr>
            
                    <tr>
                        <td>⚠ Aset Usia > 5 Tahun</td>
                        <td>${data.asetUsia5Tahun || 0}</td>
                    </tr>
            
                    <tr>
                        <td>⚠ Aset Siap Hapus</td>
                        <td>${data.asetSiapHapus || 0}</td>
                    </tr>
            
                    <tr>
                        <td>⚠ Ruangan Tidak Aktif</td>
                        <td>${data.jumlahRuanganTidakAktif || 0}</td>
                    </tr>
            
                </table>
            
            </div>

            <br>
            
            <div class="card">
            
                <h3>
                    Aktivitas Terakhir
                </h3>
            
                <br>
            
                <table>
            
                    <thead>
            
                        <tr>
            
                            <th>Tanggal</th>
            
                            <th>Jenis</th>
            
                            <th>Keterangan</th>
            
                        </tr>
            
                    </thead>
            
                    <tbody>
            
                        ${rowsAktivitasTerakhir}
            
                    </tbody>
            
                </table>
            
            </div>

            <br>

            <div class="card">
            
                <h3>
                    Detail Aset Rusak Berat
                </h3>
            
                <br>
            
                <table>
            
                    <thead>
            
                        <tr>
            
                            <th>Kode Barang</th>
            
                            <th>Nama Barang</th>
            
                            <th>Kondisi</th>
            
                        </tr>
            
                    </thead>
            
                    <tbody>
            
                        ${rowsRusakBerat}
            
                    </tbody>
            
                </table>
            
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

async function lihatAktivitasTahunan(
  tahun
){

  const data =
    await getAPI(
      "getAktivitasTahunanDetail&tahun="
      + tahun
    );

  let rowsMutasi = "";

  (data.mutasi || []).forEach(m=>{

    rowsMutasi += `
      <tr>
        <td>${m.TANGGAL_MUTASI || "-"}</td>
        <td>${m.ID_ASET || "-"}</td>
        <td>${m.KETERANGAN || "-"}</td>
      </tr>
    `;

  });

  let rowsKondisi = "";

  const kondisiList =
    Array.isArray(data.kondisi)
    ? data.kondisi
    : [];

      kondisiList.forEach(k=>{
      
          rowsKondisi += `
            <tr>
              <td>${k?.TANGGAL || "-"}</td>
              <td>${k?.ID_ASET || "-"}</td>
              <td>${k?.KONDISI_BARU || "-"}</td>
            </tr>
          `;
      
      });

  let rowsBAST = "";

  (data.bast || []).forEach(b=>{

    rowsBAST += `
      <tr>
        <td>${b.TANGGAL_BAST || "-"}</td>
        <td>${b.NOMOR_BAST || "-"}</td>
        <td>${b.JENIS_BAST || "-"}</td>
      </tr>
    `;

  });

  let rowsPerawatan = "";

  (data.perawatan || []).forEach(p=>{

    rowsPerawatan += `
      <tr>
        <td>${p.TANGGAL_PERAWATAN || "-"}</td>
        <td>${p.NAMA_GEDUNG || "-"}</td>
        <td>${p.JENIS_PERAWATAN || "-"}</td>
      </tr>
    `;

  });

  setPageTitle(
    "Aktivitas Tahun " + tahun
  );

  setContent(`

    <div class="card">

      <button
        class="btn"
        onclick="loadDashboard()">
        ← Kembali Dashboard
      </button>

    </div>

    <br>

    <div class="card">

      <h3>Mutasi</h3>

      <table>

        <tr>
          <th>Tanggal</th>
          <th>ID Aset</th>
          <th>Keterangan</th>
        </tr>

        ${rowsMutasi}

      </table>

    </div>

    <br>

    <div class="card">

      <h3>Perubahan Kondisi</h3>

      <table>

        <tr>
          <th>Tanggal</th>
          <th>ID Aset</th>
          <th>Kondisi Baru</th>
        </tr>

        ${rowsKondisi}

      </table>

    </div>

    <br>

    <div class="card">

      <h3>BAST</h3>

      <table>

        <tr>
          <th>Tanggal</th>
          <th>Nomor</th>
          <th>Jenis</th>
        </tr>

        ${rowsBAST}

      </table>

    </div>

    <br>

    <div class="card">

      <h3>Perawatan</h3>

      <table>

        <tr>
          <th>Tanggal</th>
          <th>Gedung</th>
          <th>Jenis</th>
        </tr>

        ${rowsPerawatan}

      </table>

    </div>

  `);

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

       let data =
            await getAPI(
                "getMasterAset"
            );
         
         if(
             ROLE ===
             "ADMIN_GEDUNG"
         ){
         
             data =
             data.filter(
                 item =>
                 String(
                     item.KODE_GEDUNG
                 ) ===
                 String(
                     KODE_GEDUNG
                 )
             );
         
         }
         
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

      await loadRiwayatMutasi();
   
}

async function loadRiwayatMutasi(){

    let data =
          await getAPI(
              "getMutasi"
          );
      
      if(
          ROLE ===
          "ADMIN_GEDUNG"
      ){
      
          data =
          data.filter(
              m =>
              String(
                  m.GEDUNG_TUJUAN || ""
              ) ===
              String(
                  KODE_GEDUNG
              )
              ||
              String(
                  m.GEDUNG_ASAL || ""
              ) ===
              String(
                  KODE_GEDUNG
              )
          );
      
      }
      
      let rows = "";
      
      data.reverse().forEach((m,index)=>{
         
        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${m.TANGGAL_MUTASI || ""}</td>

            <td>${m.ID_ASET || ""}</td>

            <td>${m.GEDUNG_ASAL || ""}</td>

            <td>${m.RUANGAN_ASAL || ""}</td>

            <td>${m.GEDUNG_TUJUAN || ""}</td>

            <td>${m.RUANGAN_TUJUAN || ""}</td>

            <td>${m.KETERANGAN || ""}</td>

        </tr>

        `;

    });

    document.getElementById(
        "listMutasi"
    ).innerHTML = `

    <table>

        <thead>

            <tr>

                <th>No</th>

                <th>Tanggal</th>

                <th>ID Aset</th>

                <th>Gedung Asal</th>

                <th>Ruangan Asal</th>

                <th>Gedung Tujuan</th>

                <th>Ruangan Tujuan</th>

                <th>Keterangan</th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    `;

}

async function formTambahMutasi(){

   alert("FORM MUTASI BARU");

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

         <div class="form-group">

             <label>
                 Kode Barang
             </label>
         
             <input
                 id="filterKodeBarang"
                 class="form-control">

         </div>
         
         <button
             class="btn btn-primary"
             onclick="cariAsetMutasi()">

             Cari
            
            <br><br>
            
            <div id="hasilMutasi">
            
                Silakan cari aset.
            
            </div>
         
         </button>
         
         <br><br>


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
                type="file"
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

async function cariAsetMutasi(){

    try{

        const kodeBarang =
            document.getElementById(
                "filterKodeBarang"
            ).value
            .toLowerCase();

        const aset =
            await getAPI(
                "getMasterAset"
            );
         console.log(aset[0]);
       
            const hasil =
                aset.filter(a=>{
            
                    const cocokKode =
            
                        !kodeBarang ||
            
                        String(
                            a.KODE_BARANG || ""
                        )
                        .toLowerCase()
                        .includes(
                            kodeBarang
                        );
            
                    return cocokKode;
            
                });

        let rows = "";

        hasil.forEach(a=>{

            rows += `

            <tr>

                <td>

                    <input
                        type="checkbox"
                        class="asetMutasi"
                        value="${a.ID_ASET}">

                </td>

                <td>${a.NUP || ""}</td>

                <td>${a.NAMA_BARANG || ""}</td>

                <td>${a.NAMA_GEDUNG || ""}</td>

                <td>${a.NAMA_RUANGAN || ""}</td>

            </tr>

            `;

        });

        document.getElementById(
            "hasilMutasi"
        ).innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>

                        <input
                            type="checkbox"
                            onclick="
                            document
                            .querySelectorAll(
                            '.asetMutasi'
                            )
                            .forEach(
                            c=>c.checked=
                            this.checked
                            )">

                    </th>

                    <th>NUP</th>

                    <th>Nama Barang</th>

                    <th>Gedung</th>

                    <th>Ruangan</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

        `;

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function loadRuanganMutasi(){

    const kodeGedung =
        document.getElementById(
            "gedungTujuan"
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
            "ruanganTujuan"
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

async function simpanMutasi(){

    try{

        const checked =
            document.querySelectorAll(
                ".asetMutasi:checked"
            );

        if(
            checked.length === 0
        ){

            alert(
                "Pilih minimal 1 aset"
            );

            return;

        }

        const gedung =
            document.getElementById(
                "gedungTujuan"
            );

        const ruangan =
            document.getElementById(
                "ruanganTujuan"
            );

        const asetIds = [];

        checked.forEach(c=>{

            asetIds.push(
                c.value
            );

        });

        const result =
            await postAPI({

                action:
                    "tambahMutasi",

                ASET_IDS:
                    asetIds,

                KODE_GEDUNG_BARU:
                    gedung.value,

                NAMA_GEDUNG_BARU:
                    gedung.options[
                        gedung.selectedIndex
                    ].text,

                KODE_RUANGAN_BARU:
                    ruangan.value,

                NAMA_RUANGAN_BARU:
                    ruangan.options[
                        ruangan.selectedIndex
                    ].text,

                DOKUMEN:
                    document.getElementById(
                        "dokumen"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "Mutasi berhasil disimpan"
            );

            loadMutasi();

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

async function loadKondisi(){

    setPageTitle(
        "Perubahan Kondisi"
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
                Riwayat Perubahan Kondisi
            </h3>

            <button
                class="btn btn-success"
                onclick="formTambahKondisi()">

                + Ubah Kondisi

            </button>

        </div>

        <div id="listKondisi">

            Loading...

        </div>

    </div>

    `);

    await loadRiwayatKondisi();

}

async function loadRiwayatKondisi(){

    let data =
          await getAPI(
              "getKondisiAset"
          );
      
      if(
          ROLE ===
          "ADMIN_GEDUNG"
      ){
      
          const masterAset =
              await getAPI(
                  "getMasterAset"
              );
      
          const asetGedung =
              masterAset
              .filter(
                  a =>
                  String(
                      a.KODE_GEDUNG
                  ) ===
                  String(
                      KODE_GEDUNG
                  )
              )
              .map(
                  a => a.ID_ASET
              );
      
          data =
              data.filter(
                  k =>
                  asetGedung.includes(
                      k.ID_ASET
                  )
              );
      
      }

    let rows = "";

    data.reverse().forEach((k,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${k.TANGGAL || ""}</td>

            <td>${k.ID_ASET || ""}</td>

            <td>${k.KONDISI_LAMA || ""}</td>

            <td>${k.KONDISI_BARU || ""}</td>

            <td>${k.KETERANGAN || ""}</td>

        </tr>

        `;

    });

    document.getElementById(
        "listKondisi"
    ).innerHTML = `

    <table>

        <thead>

            <tr>

                <th>No</th>

                <th>Tanggal</th>

                <th>ID Aset</th>

                <th>Kondisi Lama</th>

                <th>Kondisi Baru</th>

                <th>Keterangan</th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    `;

}

async function formTambahKondisi(){

    setContent(`

    <div class="card">

        <h3>
            Perubahan Kondisi Aset
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Barang
            </label>

            <input
                id="filterKodeBarang"
                class="form-control">

        </div>

        <button
            class="btn btn-primary"
            onclick="cariAsetKondisi()">

            Cari

        </button>

        <br><br>

        <div id="hasilKondisi">

            Silakan cari aset.

        </div>

        <hr>

        <div class="form-group">

            <label>
                Kondisi Baru
            </label>

            <select
                id="kondisiBaru"
                class="form-control">

                <option>Baik</option>
                <option>Rusak Ringan</option>
                <option>Rusak Berat</option>
                <option>Hilang</option>

            </select>

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
            onclick="simpanKondisi()">

            Simpan Perubahan

        </button>

        <button
            class="btn"
            onclick="loadKondisi()">

            Batal

        </button>

    </div>

    `);

}

async function cariAsetKondisi(){

    try{

        const kodeBarang =
            document.getElementById(
                "filterKodeBarang"
            ).value
            .toLowerCase();

        let aset =
             await getAPI(
                 "getMasterAset"
             );
         
         if(
             ROLE ===
             "ADMIN_GEDUNG"
         ){
         
             aset =
             aset.filter(
                 a =>
                 String(
                     a.KODE_GEDUNG
                 ) ===
                 String(
                     KODE_GEDUNG
                 )
             );
         
         }

        const hasil =
            aset.filter(a=>{

                const cocokKode =

                    !kodeBarang ||

                    String(
                        a.KODE_BARANG || ""
                    )
                    .toLowerCase()
                    .includes(
                        kodeBarang
                    );

                return cocokKode;

            });

        let rows = "";

        hasil.forEach(a=>{

            rows += `

            <tr>

                <td>

                    <input
                        type="checkbox"
                        class="asetKondisi"
                        value="${a.ID_ASET}">

                </td>

                <td>${a.NUP || ""}</td>

                <td>${a.NAMA_BARANG || ""}</td>

                <td>${a.NAMA_GEDUNG || ""}</td>

                <td>${a.NAMA_RUANGAN || ""}</td>

                <td>${a.KONDISI || ""}</td>

            </tr>

            `;

        });

        document.getElementById(
            "hasilKondisi"
        ).innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>

                        <input
                            type="checkbox"
                            onclick="
                            document
                            .querySelectorAll(
                            '.asetKondisi'
                            )
                            .forEach(
                            c=>c.checked=
                            this.checked
                            )">

                    </th>

                    <th>NUP</th>

                    <th>Nama Barang</th>

                    <th>Gedung</th>

                    <th>Ruangan</th>

                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

        `;

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function simpanKondisi(){

    try{

        const checked =
            document.querySelectorAll(
                ".asetKondisi:checked"
            );

        if(
            checked.length === 0
        ){

            alert(
                "Pilih minimal 1 aset"
            );

            return;

        }

        const asetIds = [];

        checked.forEach(c=>{

            asetIds.push(
                c.value
            );

        });

        const result =
            await postAPI({

                action:
                    "tambahKondisiAset",

                ASET_IDS:
                    asetIds,

                KONDISI_BARU:
                    document.getElementById(
                        "kondisiBaru"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "Perubahan kondisi berhasil disimpan"
            );

            loadKondisi();

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

async function loadBAST(){

    setPageTitle(
        "BAST"
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
                Riwayat BAST
            </h3>

            <button
                class="btn btn-success"
                onclick="formTambahBAST()">

                + Tambah BAST

            </button>

        </div>

        <div id="listBAST">

            Loading...

        </div>

    </div>

    `);

    await loadRiwayatBAST();

}

async function loadRiwayatBAST(){

    let data =
          await getAPI(
              "getBAST"
          );
      
      if(
          ROLE ===
          "ADMIN_GEDUNG"
      ){
      
          const masterAset =
              await getAPI(
                  "getMasterAset"
              );
      
          const asetGedung =
              masterAset
              .filter(
                  a =>
                  String(
                      a.KODE_GEDUNG
                  ) ===
                  String(
                      KODE_GEDUNG
                  )
              )
              .map(
                  a => a.ID_ASET
              );
      
          data =
              data.filter(
                  b =>
                  asetGedung.includes(
                      b.ID_ASET
                  )
              );
      
      }
      
      let rows = "";
      
      data.reverse().forEach((b,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${b.NOMOR_BAST || ""}</td>

            <td>${b.TANGGAL_BAST || ""}</td>

            <td>${b.JENIS_BAST || ""}</td>

            <td>${b.ID_ASET || ""}</td>

            <td>${b.KETERANGAN || ""}</td>

        </tr>

        `;

    });

    document.getElementById(
        "listBAST"
    ).innerHTML = `

    <table>

        <thead>

            <tr>

                <th>No</th>

                <th>Nomor BAST</th>

                <th>Tanggal</th>

                <th>Jenis</th>

                <th>ID Aset</th>

                <th>Keterangan</th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    `;

}

async function formTambahBAST(){

    setContent(`

    <div class="card">

        <h3>
            Tambah BAST
        </h3>

        <br>

        <div class="form-group">

            <label>
                Kode Barang
            </label>

            <input
                id="filterKodeBarang"
                class="form-control">

        </div>

        <button
            class="btn btn-primary"
            onclick="cariAsetBAST()">

            Cari

        </button>

        <br><br>

        <div id="hasilBAST">

            Silakan cari aset.

        </div>

        <hr>

        <div class="form-group">

            <label>
                Nomor BAST
            </label>

            <input
                id="nomorBAST"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Jenis BAST
            </label>

            <select
                id="jenisBAST"
                class="form-control">

                <option>
                    Serah Terima
                </option>

                <option>
                    Hibah
                </option>

                <option>
                    Penghapusan
                </option>

                <option>
                    Pemindahtanganan
                </option>

            </select>

        </div>

        <div class="form-group">

            <label>
                Dokumen BAST
            </label>

            <input
                type="file"
                id="dokumenBAST"
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
            onclick="simpanBAST()">

            Simpan BAST

        </button>

        <button
            class="btn"
            onclick="loadBAST()">

            Batal

        </button>

    </div>

    `);

}

async function cariAsetBAST(){

    try{

        const kodeBarang =
            document.getElementById(
                "filterKodeBarang"
            ).value
            .toLowerCase();

        const aset =
            await getAPI(
                "getMasterAset"
            );

        const hasil =
            aset.filter(a=>{

                const cocokKode =

                    !kodeBarang ||

                    String(
                        a.KODE_BARANG || ""
                    )
                    .toLowerCase()
                    .includes(
                        kodeBarang
                    );

                return cocokKode;

            });

        let rows = "";

        hasil.forEach(a=>{

            rows += `

            <tr>

                <td>

                    <input
                        type="checkbox"
                        class="asetBAST"
                        value="${a.ID_ASET}">

                </td>

                <td>${a.NUP || ""}</td>

                <td>${a.NAMA_BARANG || ""}</td>

                <td>${a.NAMA_GEDUNG || ""}</td>

                <td>${a.NAMA_RUANGAN || ""}</td>

            </tr>

            `;

        });

        document.getElementById(
            "hasilBAST"
        ).innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>

                        <input
                            type="checkbox"
                            onclick="
                            document
                            .querySelectorAll(
                            '.asetBAST'
                            )
                            .forEach(
                            c=>c.checked=
                            this.checked
                            )">

                    </th>

                    <th>NUP</th>

                    <th>Nama Barang</th>

                    <th>Gedung</th>

                    <th>Ruangan</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

        `;

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}

async function simpanBAST(){

    try{

        const checked =
            document.querySelectorAll(
                ".asetBAST:checked"
            );

        if(
            checked.length === 0
        ){

            alert(
                "Pilih minimal 1 aset"
            );

            return;

        }

        const asetIds = [];

        checked.forEach(c=>{

            asetIds.push(
                c.value
            );

        });

        const result =
            await postAPI({

                action:
                    "tambahBAST",

                ASET_IDS:
                    asetIds,

                NOMOR_BAST:
                    document.getElementById(
                        "nomorBAST"
                    ).value,

                JENIS_BAST:
                    document.getElementById(
                        "jenisBAST"
                    ).value,

                DOKUMEN_BAST:
                    document.getElementById(
                        "dokumenBAST"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "BAST berhasil disimpan"
            );

            loadBAST();

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

/* =====================================================
   MONITORING GEDUNG
===================================================== */

async function loadMonitoringGedungHome(){

    setPageTitle(
        "Perawatan Gedung"
    );

    let gedung =
        await getAPI(
            "getGedung"
        );

    if(
        ROLE ===
        "ADMIN_GEDUNG"
    ){

        gedung =
        gedung.filter(
            g =>
            String(
                g.KODE_GEDUNG
            ) ===
            String(
                KODE_GEDUNG
            )
        );

    }

    let rows = "";

    gedung.forEach(g=>{

        rows += `

        <tr>

            <td>

                ${g.NAMA_GEDUNG}

            </td>

            <td>

                <button
                    class="btn btn-primary"
                    onclick="
                    loadMonitoringGedung(
                    '${g.KODE_GEDUNG}',
                    '${g.NAMA_GEDUNG}'
                    )">

                    Monitoring

                </button>

            </td>

            <td>

                <button
                    class="btn btn-success"
                    onclick="
                    loadRiwayatPerawatanGedung(
                    '${g.KODE_GEDUNG}'
                    )">

                    Riwayat Perawatan

                </button>

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <h3>
            Daftar Gedung
        </h3>

        <br>

        <table>

            <thead>

                <tr>

                    <th>Gedung</th>

                    <th>Monitoring</th>

                    <th>Riwayat Perawatan</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `);

}

/* =====================================================
   PERAWATAN GEDUNG
===================================================== */

async function loadPerawatan(){

    setPageTitle(
        "Perawatan Gedung"
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
                Riwayat Perawatan
            </h3>

            <button
                class="btn btn-success"
                onclick="formTambahPerawatan()">

                + Tambah Perawatan

            </button>

        </div>

        <div id="listPerawatan">

            Loading...

        </div>

    </div>

    `);

    await loadRiwayatPerawatan();

}

async function formTambahPerawatan(){

    let gedung =
          await getAPI(
              "getGedung"
          );
      
      if(
          ROLE ===
          "ADMIN_GEDUNG"
      ){
      
          gedung =
          gedung.filter(
              g =>
              String(
                  g.KODE_GEDUNG
              ) ===
              String(
                  KODE_GEDUNG
              )
          );
      
      }

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
            Tambah Perawatan
        </h3>

        <br>

        <div class="form-group">

            <label>
                Gedung
            </label>

            <select
                id="kodeGedung"
                class="form-control">

                ${gedungOption}

            </select>

        </div>

        <div class="form-group">

            <label>
                Jenis Perawatan
            </label>

            <input
                id="jenisPerawatan"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Biaya
            </label>

            <input
                id="biaya"
                class="form-control">

        </div>

        <div class="form-group">

            <label>
                Dokumen
            </label>

            <input
                type="file"
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
            onclick="simpanPerawatan()">

            Simpan Perawatan

        </button>

        <button
            class="btn"
            onclick="loadPerawatan()">

            Batal

        </button>

    </div>

    `);

}

async function loadRiwayatPerawatan(){

    let data =
       await getAPI(
           "getPerawatanGedung"
       );
   
   if(
       ROLE ===
       "ADMIN_GEDUNG"
   ){
   
       data =
       data.filter(
           p =>
           String(
               p.KODE_GEDUNG
           ) ===
           String(
               KODE_GEDUNG
           )
       );
   
   }
   
   let rows = "";
   
   data.reverse().forEach((p,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${p.TANGGAL_PERAWATAN || ""}</td>

            <td>${p.KODE_GEDUNG || ""}</td>

            <td>${p.JENIS_PERAWATAN || ""}</td>

            <td>${p.BIAYA || ""}</td>

            <td>${p.KETERANGAN || ""}</td>

        </tr>

        `;

    });

    document.getElementById(
        "listPerawatan"
    ).innerHTML = `

    <table>

        <thead>

            <tr>

                <th>No</th>

                <th>Tanggal</th>

                <th>Gedung</th>

                <th>Jenis Perawatan</th>

                <th>Biaya</th>

                <th>Keterangan</th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    `;

}

async function simpanPerawatan(){

    try{

        const result =
            await postAPI({

                action:
                    "tambahPerawatanGedung",

                KODE_GEDUNG:

                   ROLE ===
                   "ADMIN_GEDUNG"
               
                   ? KODE_GEDUNG
               
                   : document.getElementById(
                       "kodeGedung"
                     ).value,

                JENIS_PERAWATAN:
                    document.getElementById(
                        "jenisPerawatan"
                    ).value,

                BIAYA:
                    document.getElementById(
                        "biaya"
                    ).value
                    .replace(/\./g,""),

                DOKUMEN:
                    document.getElementById(
                        "dokumen"
                    ).value,

                KETERANGAN:
                    document.getElementById(
                        "keterangan"
                    ).value

            });

        if(result.success){

            alert(
                "Perawatan berhasil disimpan"
            );

            loadPerawatan();

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

async function loadPengaturan(){

    if(
        ROLE ===
        "ADMIN_GEDUNG"
    ){

        setContent(`

        <div class="card">

            Anda tidak memiliki
            hak akses ke menu
            Pengaturan.

        </div>

        `);

        return;

    }

    setPageTitle(
        "Pengaturan"
    );

    const p =
        await getAPI(
            "getPengaturan"
        );

    setContent(`

    <div class="card">

        <div style="
            display:flex;
            gap:10px;
            margin-bottom:20px;
        ">

            <button class="btn"
                onclick="showPengaturanTab('instansi')">
                Instansi
            </button>

            <button class="btn"
                onclick="showPengaturanTab('ttd')">
                Penandatangan
            </button>

            <button class="btn"
                onclick="showPengaturanTab('publik')">
                Publik
            </button>

            <button class="btn"
                onclick="showPengaturanTab('sistem')">
                Sistem
            </button>

            <button class="btn"
                onclick="showPengaturanTab('admin')">
                Admin
            </button>

        </div>

       <div id="pengaturanContent"></div>

      <br>
      
      <button
          class="btn btn-primary"
          onclick="simpanPengaturan()">
          Simpan Pengaturan
      </button>

    </div>

    `);

    window.pengaturanData = p;

    showPengaturanTab(
        "instansi"
    );

}

function showPengaturanTab(tab){

    const p =
        window.pengaturanData || {};

    let html = "";

    if(tab=="instansi"){

        html = `

        <h3>Informasi Instansi</h3>

        <br>

        <input id="NAMA_INSTANSI"
            class="form-control"
            placeholder="Nama Instansi"
            value="${p.NAMA_INSTANSI || ""}">

        <br>

        <input id="ALAMAT"
            class="form-control"
            placeholder="Alamat"
            value="${p.ALAMAT || ""}">

        <br>

        <input id="TELEPON"
            class="form-control"
            placeholder="Telepon"
            value="${p.TELEPON || ""}">

        <br>

        <input id="EMAIL"
            class="form-control"
            placeholder="Email"
            value="${p.EMAIL || ""}">

        <br>

        <input id="WEBSITE"
            class="form-control"
            placeholder="Website"
            value="${p.WEBSITE || ""}">

        <br>

        <input id="LOGO_URL"
            class="form-control"
            placeholder="Logo URL"
            value="${p.LOGO_URL || ""}">

        `;

    }

    if(tab=="ttd"){

        html = `

        <h3>Penandatangan</h3>

        <br>

        <input id="KASUBAG_NAMA"
            class="form-control"
            placeholder="Nama Kasubag"
            value="${p.KASUBAG_NAMA || ""}">

        <br>

        <input id="KASUBAG_NIP"
            class="form-control"
            placeholder="NIP Kasubag"
            value="${p.KASUBAG_NIP || ""}">

        `;

    }

    if(tab=="publik"){

        html = `

        <h3>Tampilan Publik</h3>

        <br>

        <label>
            <input type="checkbox"
            id="SHOW_STATISTIK"
            ${p.SHOW_STATISTIK=="TRUE" ? "checked" : ""}>
            Statistik
        </label>

        <br><br>

        <label>
            <input type="checkbox"
            id="SHOW_INFO_GEDUNG"
            ${p.SHOW_INFO_GEDUNG=="TRUE" ? "checked" : ""}>
            Informasi Gedung
        </label>

        <br><br>

        <label>
            <input type="checkbox"
            id="SHOW_FOTO_GEDUNG"
            ${p.SHOW_FOTO_GEDUNG=="TRUE" ? "checked" : ""}>
            Foto Gedung
        </label>

        <br><br>

        <label>
            <input type="checkbox"
            id="SHOW_DBR_GEDUNG"
            ${p.SHOW_DBR_GEDUNG=="TRUE" ? "checked" : ""}>
            DBR Gedung
        </label>

        <br><br>

        <label>
            <input type="checkbox"
            id="SHOW_DBR_RUANGAN"
            ${p.SHOW_DBR_RUANGAN=="TRUE" ? "checked" : ""}>
            DBR Ruangan
        </label>

        <br><br>

        <label>
            <input type="checkbox"
            id="SHOW_GRAFIK"
            ${p.SHOW_GRAFIK=="TRUE" ? "checked" : ""}>
            Grafik
        </label>

        `;

    }

    if(tab=="sistem"){

        html = `

        <h3>Sistem</h3>

        <br>

        <input id="TAHUN_PERENCANAAN"
            class="form-control"
            placeholder="Tahun Perencanaan"
            value="${p.TAHUN_PERENCANAAN || ""}">

        <br>

        <input id="UMUR_PENGGANTIAN"
            class="form-control"
            placeholder="Umur Penggantian"
            value="${p.UMUR_PENGGANTIAN || ""}">

        <br>

        <input id="UMUR_PENGHAPUSAN"
            class="form-control"
            placeholder="Umur Penghapusan"
            value="${p.UMUR_PENGHAPUSAN || ""}">

        `;

    }

   if(tab=="admin"){
   
       html = `
   
       <h3>Manajemen Admin</h3>
   
       <br>
   
       <button
           class="btn btn-success"
           onclick="formTambahAdmin()">
   
           + Tambah Admin
   
       </button>
   
       <br><br>
   
       <div id="adminArea">
   
           Loading...
   
       </div>
   
       `;
   
       setTimeout(
           loadAdminList,
           100
       );
   
   }
   
    document.getElementById(
        "pengaturanContent"
    ).innerHTML = html;

}

function getValue(id){

    const el =
        document.getElementById(id);

    return el
        ? el.value
        : "";

}

function getChecked(id){

    const el =
        document.getElementById(id);

    return el
        ? (el.checked ? "TRUE" : "FALSE")
        : "";

}

async function simpanPengaturan(){

       const data = {
   
       action : "savePengaturan",
   
       NAMA_INSTANSI :
           getValue("NAMA_INSTANSI"),
   
       ALAMAT :
           getValue("ALAMAT"),
   
       TELEPON :
           getValue("TELEPON"),
   
       EMAIL :
           getValue("EMAIL"),
   
       WEBSITE :
           getValue("WEBSITE"),
   
       LOGO_URL :
           getValue("LOGO_URL"),
   
       KASUBAG_NAMA :
           getValue("KASUBAG_NAMA"),
   
       KASUBAG_NIP :
           getValue("KASUBAG_NIP"),
   
       SHOW_STATISTIK :
           getChecked("SHOW_STATISTIK"),
   
       SHOW_INFO_GEDUNG :
           getChecked("SHOW_INFO_GEDUNG"),
   
       SHOW_FOTO_GEDUNG :
           getChecked("SHOW_FOTO_GEDUNG"),
   
       SHOW_DBR_GEDUNG :
           getChecked("SHOW_DBR_GEDUNG"),
   
       SHOW_DBR_RUANGAN :
           getChecked("SHOW_DBR_RUANGAN"),
   
       SHOW_GRAFIK :
           getChecked("SHOW_GRAFIK"),
   
       TAHUN_PERENCANAAN :
           getValue("TAHUN_PERENCANAAN"),
   
       UMUR_PENGGANTIAN :
           getValue("UMUR_PENGGANTIAN"),
   
       UMUR_PENGHAPUSAN :
           getValue("UMUR_PENGHAPUSAN")
   
   };

    const result =
        await postAPI(
            data
        );

    alert(
        result.message ||
        "Pengaturan berhasil disimpan"
    );

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

        let gedung =
             await getAPI(
                 "getGedung"
             );
         
         if(
             ROLE ===
             "ADMIN_GEDUNG"
         ){
         
             gedung =
             gedung.filter(
                 g =>
                 String(
                     g.KODE_GEDUNG
                 ) ===
                 String(
                     KODE_GEDUNG
                 )
             );
         
         }

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

async function loadPenghapusan(){

    setPageTitle("Penghapusan");

    setContent(`
        <div class="card">
            Modul Penghapusan
        </div>
    `);

}

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        const adminName =
            document.getElementById(
                "adminName"
            );

        if(
            adminName
        ){

            adminName.textContent =
                localStorage.getItem(
                    "SIMDBR_NAMA"
                ) ||
                "Administrator";

        }

    }
);

function logout(){

    localStorage.removeItem(
        "SIMDBR_LOGIN"
    );

    localStorage.removeItem(
        "SIMDBR_NAMA"
    );

    localStorage.removeItem(
        "SIMDBR_ROLE"
    );

    localStorage.removeItem(
        "SIMDBR_KODE_GEDUNG"
    );

    window.location.href =
        "login.html";

}

async function loadAdminList(){

    try{

        const data =
            await getAPI(
                "getAdmin"
            );

        let rows = "";

        data.forEach((a,index)=>{

            rows += `

            <tr>

                <td>${index+1}</td>

                <td>${a.NAMA || ""}</td>

                <td>${a.USERNAME || ""}</td>

                <td>${a.ROLE || ""}</td>

                <td>${a.KODE_GEDUNG || "-"}</td>

                <td>

                   <button
                       class="btn btn-warning"
                       onclick="editAdmin('${a.ID_ADMIN}')">
               
                       Edit
               
                   </button>
               
                   <button
                       class="btn btn-primary"
                       onclick="resetPasswordAdmin('${a.ID_ADMIN}')">
               
                       Reset
               
                   </button>
               
                   <button
                       class="btn btn-danger"
                       onclick="hapusAdmin('${a.ID_ADMIN}')">
               
                       Hapus
               
                   </button>
               
               </td>

            </tr>

            `;

        });

        document.getElementById(
            "adminArea"
        ).innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>Nama</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Gedung</th>
                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

        `;

    }catch(err){

        document.getElementById(
            "adminArea"
        ).innerHTML = err;

    }

}

async function simpanAdmin(){

    try{

        const result =
            await postAPI({

                action:
                    "tambahAdmin",

                NAMA:
                    document.getElementById(
                        "namaAdmin"
                    ).value,

                USERNAME:
                    document.getElementById(
                        "username"
                    ).value,

                PASSWORD:
                    document.getElementById(
                        "password"
                    ).value,

                ROLE:
                    document.getElementById(
                        "role"
                    ).value,

                KODE_GEDUNG:
                    document.getElementById(
                        "kodeGedung"
                    ).value

            });

        if(result.success){

             alert(
                 "Admin berhasil disimpan"
             );
         
             await loadPengaturan();
         
             showPengaturanTab(
                 "admin"
             );

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            err
        );

    }

}

async function formTambahAdmin(){

    const gedung =
        await getAPI(
            "getGedung"
        );

    let opsiGedung =
        `<option value="">
            Semua Gedung
        </option>`;

    gedung.forEach(g=>{

        opsiGedung += `

        <option
            value="${g.KODE_GEDUNG}">

            ${g.NAMA_GEDUNG}

        </option>

        `;

    });

    setContent(`

    <div class="card">

        <h3>
            Tambah Admin
        </h3>

        <br>

        <input
            id="namaAdmin"
            class="form-control"
            placeholder="Nama">

        <br>

        <input
            id="username"
            class="form-control"
            placeholder="Username">

        <br>

        <input
            id="password"
            class="form-control"
            placeholder="Password">

        <br>

        <select
            id="role"
            class="form-control">

            <option value="SUPER_ADMIN">
                SUPER_ADMIN
            </option>

            <option value="ADMIN_GEDUNG">
                ADMIN_GEDUNG
            </option>

        </select>

        <br>

        <select
            id="kodeGedung"
            class="form-control">

            ${opsiGedung}

        </select>

        <br>

        <button
            class="btn btn-success"
            onclick="simpanAdmin()">

            Simpan

        </button>

        <button
            class="btn"
            onclick="loadPengaturan()">

            Batal

        </button>

    </div>

    `);

}

async function editAdmin(idAdmin){

    const admins =
        await getAPI(
            "getAdmin"
        );

    const admin =
        admins.find(
            a =>
            String(
                a.ID_ADMIN
            ) ===
            String(
                idAdmin
            )
        );

    if(!admin){

        alert(
            "Admin tidak ditemukan"
        );

        return;

    }

    const gedung =
        await getAPI(
            "getGedung"
        );

    let opsiGedung = "";

    gedung.forEach(g=>{

        opsiGedung += `

        <option
            value="${g.KODE_GEDUNG}"
            ${g.KODE_GEDUNG===admin.KODE_GEDUNG ? "selected" : ""}>

            ${g.NAMA_GEDUNG}

        </option>

        `;

    });

    setContent(`

    <div class="card">

        <h3>
            Edit Admin
        </h3>

        <br>

        <input
            type="hidden"
            id="idAdmin"
            value="${admin.ID_ADMIN}">

        <input
            id="namaAdmin"
            class="form-control"
            value="${admin.NAMA || ""}">

        <br>

        <input
            id="username"
            class="form-control"
            value="${admin.USERNAME || ""}">

        <br>

        <input
            id="password"
            class="form-control"
            value="${admin.PASSWORD || ""}">

        <br>

        <select
            id="role"
            class="form-control">

            <option
                value="SUPER_ADMIN"
                ${admin.ROLE==="SUPER_ADMIN" ? "selected" : ""}>

                SUPER_ADMIN

            </option>

            <option
                value="ADMIN_GEDUNG"
                ${admin.ROLE==="ADMIN_GEDUNG" ? "selected" : ""}>

                ADMIN_GEDUNG

            </option>

        </select>

        <br>

        <select
            id="kodeGedung"
            class="form-control">

            ${opsiGedung}

        </select>

        <br>

        <button
            class="btn btn-success"
            onclick="updateAdmin()">

            Update

        </button>

        <button
            class="btn"
            onclick="loadPengaturan()">

            Batal

        </button>

    </div>

    `);

}

async function updateAdmin(){

    try{

        const result =
            await postAPI({

                action:
                    "updateAdmin",

                ID_ADMIN:
                    document.getElementById(
                        "idAdmin"
                    ).value,

                NAMA:
                    document.getElementById(
                        "namaAdmin"
                    ).value,

                USERNAME:
                    document.getElementById(
                        "username"
                    ).value,

                PASSWORD:
                    document.getElementById(
                        "password"
                    ).value,

                ROLE:
                    document.getElementById(
                        "role"
                    ).value,

                KODE_GEDUNG:
                    document.getElementById(
                        "kodeGedung"
                    ).value

            });

        if(result.success){

            alert(
                "Admin berhasil diupdate"
            );

            await loadPengaturan();

            showPengaturanTab(
                "admin"
            );

        }else{

            alert(
                result.message
            );

        }

    }catch(err){

        alert(
            err
        );

    }

}

async function resetPasswordAdmin(idAdmin){

    if(
        !confirm(
            "Reset password menjadi 123456 ?"
        )
    ){
        return;
    }

    const result =
        await postAPI({

            action:
                "resetPasswordAdmin",

            ID_ADMIN:
                idAdmin

        });

    alert(
        result.message
    );

    showPengaturanTab(
        "admin"
    );

}

async function hapusAdmin(idAdmin){

    if(
        !confirm(
            "Hapus admin ini ?"
        )
    ){
        return;
    }

    const result =
        await postAPI({

            action:
                "hapusAdmin",

            ID_ADMIN:
                idAdmin

        });

    alert(
        result.message
    );

    showPengaturanTab(
        "admin"
    );

}
