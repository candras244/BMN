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
                    <th>Kode Barang</th>
                    <th>NUP</th>
                    <th>Nama Barang</th>
                    <th>Gedung</th>
                    <th>Ruangan</th>
                    <th>Tahun</th>
                    <th>Kondisi</th>
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

    const result =
        await apiGet("getMasterAset");

    const tbody =
        document.getElementById("masterAsetTable");

    if(!result.success){

        tbody.innerHTML = `
        <tr>
            <td colspan="9">
                Data tidak ditemukan
            </td>
        </tr>
        `;

        return;
    }

    let html = "";

    result.data.forEach((item,index)=>{

        html += `

        <tr>

            <td>${index + 1}</td>

            <td>${item.kodeBarang}</td>

            <td>${item.nup}</td>

            <td>${item.namaBarang}</td>

            <td>${item.namaGedung}</td>

            <td>${item.namaRuangan}</td>

            <td>${item.tahunPerolehan}</td>

            <td>${item.kondisi}</td>

            <td>

                <button
                class="btn btn-warning"
                onclick="editAset('${item.id}')">
                Edit
                </button>

                <button
                class="btn btn-danger"
                onclick="hapusAset('${item.id}')">
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
        document.getElementById("modalContainer");

    modal.style.display = "flex";

    const gedungResult =
        await apiGet("getGedung");

    const ruanganResult =
        await apiGet("getRuangan");

    let gedungOptions = "";
    let ruanganOptions = "";

    if(gedungResult.success){

        gedungResult.data.forEach(item=>{

            gedungOptions += `
            <option value="${item.kodeGedung}">
                ${item.namaGedung}
            </option>
            `;
        });
    }

    if(ruanganResult.success){

        ruanganResult.data.forEach(item=>{

            ruanganOptions += `
            <option value="${item.kodeRuangan}">
                ${item.namaRuangan}
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
            <input type="text"
            id="kodeBarang"
            class="form-control">
        </div>

        <div class="form-group">
            <label>NUP</label>
            <input type="text"
            id="nup"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Nama Barang</label>
            <input type="text"
            id="namaBarang"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Merk</label>
            <input type="text"
            id="merkBarang"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Tahun Perolehan</label>
            <input type="number"
            id="tahunPerolehan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Nilai Perolehan</label>
            <input type="number"
            id="nilaiPerolehan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Gedung</label>
            <select
            id="gedungAset"
            class="form-control">
                ${gedungOptions}
            </select>
        </div>

        <div class="form-group">
            <label>Ruangan</label>
            <select
            id="ruanganAset"
            class="form-control">
                ${ruanganOptions}
            </select>
        </div>

        <div class="form-group">
            <label>Kondisi</label>
            <select
            id="kondisiAset"
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
            <label>Status</label>

            <select
            id="statusAset"
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

    const data = {

        action:"saveMasterAset",

        kodeBarang:
        document.getElementById("kodeBarang").value,

        nup:
        document.getElementById("nup").value,

        namaBarang:
        document.getElementById("namaBarang").value,

        merk:
        document.getElementById("merkBarang").value,

        tahunPerolehan:
        document.getElementById("tahunPerolehan").value,

        nilaiPerolehan:
        document.getElementById("nilaiPerolehan").value,

        gedung:
        document.getElementById("gedungAset").value,

        ruangan:
        document.getElementById("ruanganAset").value,

        kondisi:
        document.getElementById("kondisiAset").value,

        status:
        document.getElementById("statusAset").value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Aset berhasil disimpan"
        );

        tutupModal();

        loadMasterAset();
    }
}

function editAset(id){

    showToast(
        "Fitur edit akan aktif setelah API selesai dibuat"
    );
}

function hapusAset(id){

    showToast(
        "Fitur hapus akan aktif setelah API selesai dibuat"
    );
}
