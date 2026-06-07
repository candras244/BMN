function renderGedung(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Data Gedung</h2>

            <button
            class="btn btn-primary"
            onclick="showFormGedung()">
                Tambah Gedung
            </button>

        </div>

    </div>

    <br>

    <div class="table-container">

        <table>

            <thead>
                <tr>
                    <th>No</th>
                    <th>Kode Gedung</th>
                    <th>Nama Gedung</th>
                    <th>Alamat</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody id="gedungTable">
                <tr>
                    <td colspan="6">
                        Memuat data...
                    </td>
                </tr>
            </tbody>

        </table>

    </div>

    `;

    loadGedung();
}

async function loadGedung(){

    const result =
        await apiGet("getGedung");

    const tbody =
        document.getElementById("gedungTable");

    if(!result.success){

        tbody.innerHTML = `
        <tr>
            <td colspan="6">
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

            <td>${item.kodeGedung}</td>

            <td>${item.namaGedung}</td>

            <td>${item.alamat}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-warning"
                onclick="editGedung('${item.id}')">
                Edit
                </button>

                <button
                class="btn btn-danger"
                onclick="hapusGedung('${item.id}')">
                Hapus
                </button>

            </td>

        </tr>

        `;
    });

    tbody.innerHTML = html;
}

function showFormGedung(){

    const modal =
        document.getElementById("modalContainer");

    modal.style.display = "flex";

    modal.innerHTML = `

    <div class="modal">

        <h2>Tambah Gedung</h2>

        <br>

        <div class="form-group">
            <label>Kode Gedung</label>
            <input
            type="text"
            id="kodeGedung"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Nama Gedung</label>
            <input
            type="text"
            id="namaGedung"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Alamat</label>
            <textarea
            id="alamatGedung"
            rows="3"
            class="form-control"></textarea>
        </div>

        <div class="form-group">
            <label>Deskripsi Singkat</label>
            <textarea
            id="deskripsiSingkat"
            rows="3"
            class="form-control"></textarea>
        </div>

        <div class="form-group">
            <label>Deskripsi Lengkap</label>
            <textarea
            id="deskripsiLengkap"
            rows="5"
            class="form-control"></textarea>
        </div>

        <div class="form-group">
            <label>URL Foto Gedung</label>
            <input
            type="text"
            id="fotoGedung"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Status</label>

            <select
            id="statusGedung"
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
        onclick="simpanGedung()">
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

async function simpanGedung(){

    const data = {

        action:"saveGedung",

        kodeGedung:
        document.getElementById(
            "kodeGedung"
        ).value,

        namaGedung:
        document.getElementById(
            "namaGedung"
        ).value,

        alamat:
        document.getElementById(
            "alamatGedung"
        ).value,

        deskripsiSingkat:
        document.getElementById(
            "deskripsiSingkat"
        ).value,

        deskripsiLengkap:
        document.getElementById(
            "deskripsiLengkap"
        ).value,

        fotoGedung:
        document.getElementById(
            "fotoGedung"
        ).value,

        status:
        document.getElementById(
            "statusGedung"
        ).value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Gedung berhasil disimpan"
        );

        tutupModal();

        loadGedung();
    }
}

function editGedung(id){

    showToast(
        "Fitur edit akan aktif setelah API selesai dibuat"
    );
}

function hapusGedung(id){

    showToast(
        "Fitur hapus akan aktif setelah API selesai dibuat"
    );
}
