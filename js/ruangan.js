function renderRuangan(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Data Ruangan</h2>

            <button
            class="btn btn-primary"
            onclick="showFormRuangan()">
                Tambah Ruangan
            </button>

        </div>

    </div>

    <br>

    <div class="table-container">

        <table>

            <thead>
                <tr>
                    <th>No</th>
                    <th>Kode Ruangan</th>
                    <th>Nama Ruangan</th>
                    <th>Gedung</th>
                    <th>Lantai</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody id="ruanganTable">
                <tr>
                    <td colspan="7">
                        Memuat data...
                    </td>
                </tr>
            </tbody>

        </table>

    </div>

    `;

    loadRuangan();
}

async function loadRuangan(){

    const result =
        await apiGet("getRuangan");

    const tbody =
        document.getElementById("ruanganTable");

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

            <td>${item.kodeRuangan}</td>

            <td>${item.namaRuangan}</td>

            <td>${item.namaGedung}</td>

            <td>${item.lantai}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-warning"
                onclick="editRuangan('${item.id}')">
                Edit
                </button>

                <button
                class="btn btn-danger"
                onclick="hapusRuangan('${item.id}')">
                Hapus
                </button>

            </td>

        </tr>

        `;
    });

    tbody.innerHTML = html;
}

async function showFormRuangan(){

    const modal =
        document.getElementById("modalContainer");

    modal.style.display = "flex";

    const gedungResult =
        await apiGet("getGedung");

    let gedungOptions = "";

    if(
        gedungResult.success &&
        gedungResult.data
    ){

        gedungResult.data.forEach(item=>{

            gedungOptions += `
            <option value="${item.kodeGedung}">
                ${item.namaGedung}
            </option>
            `;
        });
    }

    modal.innerHTML = `

    <div class="modal">

        <h2>Tambah Ruangan</h2>

        <br>

        <div class="form-group">
            <label>Kode Ruangan</label>
            <input
            type="text"
            id="kodeRuangan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Nama Ruangan</label>
            <input
            type="text"
            id="namaRuangan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Gedung</label>

            <select
            id="kodeGedung"
            class="form-control">

                ${gedungOptions}

            </select>

        </div>

        <div class="form-group">
            <label>Jenis Ruangan</label>

            <input
            type="text"
            id="jenisRuangan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Lantai</label>

            <input
            type="number"
            id="lantaiRuangan"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Penanggung Jawab</label>

            <input
            type="text"
            id="penanggungJawab"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Status</label>

            <select
            id="statusRuangan"
            class="form-control">

                <option value="Aktif">
                    Aktif
                </option>

                <option value="Nonaktif">
                    Nonaktif
                </option>

            </select>

        </div>

        <br>

        <button
        class="btn btn-success"
        onclick="simpanRuangan()">
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

async function simpanRuangan(){

    const data = {

        action:"saveRuangan",

        kodeRuangan:
        document.getElementById(
            "kodeRuangan"
        ).value,

        namaRuangan:
        document.getElementById(
            "namaRuangan"
        ).value,

        kodeGedung:
        document.getElementById(
            "kodeGedung"
        ).value,

        jenisRuangan:
        document.getElementById(
            "jenisRuangan"
        ).value,

        lantai:
        document.getElementById(
            "lantaiRuangan"
        ).value,

        penanggungJawab:
        document.getElementById(
            "penanggungJawab"
        ).value,

        status:
        document.getElementById(
            "statusRuangan"
        ).value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Ruangan berhasil disimpan"
        );

        tutupModal();

        loadRuangan();
    }
}

function editRuangan(id){

    showToast(
        "Fitur edit akan aktif setelah API selesai dibuat"
    );
}

function hapusRuangan(id){

    showToast(
        "Fitur hapus akan aktif setelah API selesai dibuat"
    );
}
