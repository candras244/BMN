function renderMutasi(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Mutasi Aset</h2>

            <button
            class="btn btn-primary"
            onclick="showFormMutasi()">
                Tambah Mutasi
            </button>

        </div>

    </div>

    <br>

    <div class="table-container">

        <table>

            <thead>
                <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Dari</th>
                    <th>Ke</th>
                    <th>Keterangan</th>
                </tr>
            </thead>

            <tbody id="mutasiTable">
                <tr>
                    <td colspan="7">
                        Memuat data...
                    </td>
                </tr>
            </tbody>

        </table>

    </div>

    `;

    loadMutasi();
}

async function loadMutasi(){

    const result =
        await apiGet("getMutasi");

    const tbody =
        document.getElementById("mutasiTable");

    if(!result.success){

        tbody.innerHTML = `
        <tr>
            <td colspan="7">
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

            <td>${item.tanggal}</td>

            <td>${item.kodeBarang}</td>

            <td>${item.namaBarang}</td>

            <td>${item.dariRuangan}</td>

            <td>${item.keRuangan}</td>

            <td>${item.keterangan}</td>

        </tr>

        `;
    });

    tbody.innerHTML = html;
}

async function showFormMutasi(){

    const modal =
        document.getElementById("modalContainer");

    modal.style.display = "flex";

    const asetResult =
        await apiGet("getMasterAset");

    const ruanganResult =
        await apiGet("getRuangan");

    let asetOptions = "";
    let ruanganOptions = "";

    if(asetResult.success){

        asetResult.data.forEach(item=>{

            asetOptions += `
            <option value="${item.id}">
                ${item.kodeBarang} - ${item.namaBarang}
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

        <h2>Mutasi Aset</h2>

        <br>

        <div class="form-group">
            <label>Pilih Aset</label>

            <select
            id="asetMutasi"
            class="form-control">
                ${asetOptions}
            </select>
        </div>

        <div class="form-group">
            <label>Ruangan Tujuan</label>

            <select
            id="ruanganTujuan"
            class="form-control">
                ${ruanganOptions}
            </select>
        </div>

        <div class="form-group">
            <label>Keterangan</label>

            <textarea
            id="keteranganMutasi"
            rows="4"
            class="form-control"></textarea>
        </div>

        <br>

        <button
        class="btn btn-success"
        onclick="simpanMutasi()">
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

async function simpanMutasi(){

    const data = {

        action:"saveMutasi",

        asetId:
        document.getElementById(
            "asetMutasi"
        ).value,

        ruanganTujuan:
        document.getElementById(
            "ruanganTujuan"
        ).value,

        keterangan:
        document.getElementById(
            "keteranganMutasi"
        ).value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Mutasi berhasil disimpan"
        );

        tutupModal();

        loadMutasi();
    }
}
