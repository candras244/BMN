function renderMasterAset(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Master Aset</h2>

            <button
            class="btn btn-primary"
            onclick="showFormMasterAset()">

                Tambah Aset

            </button>

        </div>

    </div>

    <br>

    <div class="table-container">

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>ID Aset</th>
                    <th>Nama Barang</th>
                    <th>Merk</th>
                    <th>Gedung</th>
                    <th>Ruangan</th>
                    <th>Kondisi</th>
                    <th>Status</th>
                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody id="masterAsetTable">

                <tr>

                    <td colspan="9">

                        Memuat data...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    `;

    loadMasterAset();

}

async function loadMasterAset(){

    const aset =
        await apiGet(
            "masterAset"
        );

    const ruangan =
        await apiGet(
            "ruangan"
        );

    const gedung =
        await apiGet(
            "gedung"
        );

    const tbody =
        document.getElementById(
            "masterAsetTable"
        );

    if(
        !Array.isArray(aset)
    ){

        tbody.innerHTML = `

        <tr>

            <td colspan="9">

                Data tidak ditemukan

            </td>

        </tr>

        `;

        return;

    }

    const mapRuang = {};

    if(
        Array.isArray(ruangan)
    ){

        ruangan.forEach(item=>{

            mapRuang[
                item.kodeRuang
            ] = item;

        });

    }

    const mapGedung = {};

    if(
        Array.isArray(gedung)
    ){

        gedung.forEach(item=>{

            mapGedung[
                item.kodeGedung
            ] = item.namaGedung;

        });

    }

    let html = "";

    aset.forEach((item,index)=>{

        const ruang =
            mapRuang[
                item.kodeRuang
            ];

        let namaGedung = "";

        if(
            ruang
        ){

            namaGedung =
                mapGedung[
                    ruang.kodeGedung
                ] || "";

        }

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${item.idAset}</td>

            <td>${item.namaBarang}</td>

            <td>${item.merk}</td>

            <td>${namaGedung}</td>

            <td>${item.namaRuang}</td>

            <td>${item.kondisi}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-danger"
                onclick="hapusAset('${item.idAset}')">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML = html;

}

async function showFormMasterAset(){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.style.display =
        "flex";

    const ruangan =
        await apiGet(
            "ruangan"
        );

    let optionRuang = "";

    if(
        Array.isArray(
            ruangan
        )
    ){

        ruangan.forEach(item=>{

            optionRuang += `

            <option
            value="${item.kodeRuang}">

                ${item.namaRuang}

            </option>

            `;

        });

    }

    modal.innerHTML = `

    <div class="modal">

        <h2>Tambah Aset</h2>

        <br>

        <div class="form-group">

            <label>Kode Barang</label>

            <input
            type="text"
            id="kodeBarang"
            class="form-control">

        </div>

        <div class="form-group">

            <label>NUP</label>

            <input
            type="number"
            id="nup"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Tahun</label>

            <input
            type="number"
            id="tahun"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Nama Barang</label>

            <input
            type="text"
            id="namaBarang"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Merk</label>

            <input
            type="text"
            id="merk"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Spesifikasi</label>

            <textarea
            id="spesifikasi"
            rows="3"
            class="form-control"></textarea>

        </div>

        <div class="form-group">

            <label>Ruangan</label>

            <select
            id="kodeRuang"
            class="form-control">

                ${optionRuang}

            </select>

        </div>

                <div class="form-group">

            <label>Kondisi</label>

            <select
            id="kondisi"
            class="form-control">

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

        </div>

        <div class="form-group">

            <label>Harga Perolehan</label>

            <input
            type="number"
            id="hargaPerolehan"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Status</label>

            <select
            id="status"
            class="form-control">

                <option value="Aktif">
                    Aktif
                </option>

                <option value="Tidak Aktif">
                    Tidak Aktif
                </option>

            </select>

        </div>

        <br>

        <button
        class="btn btn-success"
        onclick="simpanAset()">

            Simpan

        </button>

        <button
        class="btn btn-secondary"
        onclick="tutupModal()">

            Tutup

        </button>

    </div>

    `;

}

async function simpanAset(){

    const result =
        await apiPost({

            action:"saveAset",

            payload:{

                kodeBarang:
                document.getElementById(
                    "kodeBarang"
                ).value,

                nup:
                document.getElementById(
                    "nup"
                ).value,

                tahun:
                document.getElementById(
                    "tahun"
                ).value,

                namaBarang:
                document.getElementById(
                    "namaBarang"
                ).value,

                merk:
                document.getElementById(
                    "merk"
                ).value,

                spesifikasi:
                document.getElementById(
                    "spesifikasi"
                ).value,

                kodeRuang:
                document.getElementById(
                    "kodeRuang"
                ).value,

                kondisi:
                document.getElementById(
                    "kondisi"
                ).value,

                hargaPerolehan:
                document.getElementById(
                    "hargaPerolehan"
                ).value,

                status:
                document.getElementById(
                    "status"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Aset berhasil disimpan"
        );

        tutupModal();

        loadMasterAset();

    }else{

        showToast(
            result.message ||
            "Gagal menyimpan aset"
        );

    }

}

async function hapusAset(idAset){

    if(
        !confirm(
            "Hapus aset ini?"
        )
    ){
        return;
    }

    const result =
        await apiPost({

            action:"deleteAset",

            payload:{

                idAset:
                idAset

            }

        });

    if(result.success){

        showToast(
            "Aset berhasil dihapus"
        );

        loadMasterAset();

    }else{

        showToast(
            result.message
        );

    }

}
