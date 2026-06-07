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
        await apiGet("gedung");

    const tbody =
        document.getElementById(
            "gedungTable"
        );

    if(!Array.isArray(result)){

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

    result.forEach((item,index)=>{

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${item.kodeGedung}</td>

            <td>${item.namaGedung}</td>

            <td>${item.alamat}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-danger"
                onclick="hapusGedung('${item.kodeGedung}')">

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
        document.getElementById(
            "modalContainer"
        );

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
            id="alamat"
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

            <label>URL Foto</label>

            <input
            type="text"
            id="foto"
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

    const result =
        await apiPost({

            action:"saveGedung",

            payload:{

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
                    "alamat"
                ).value,

                deskripsiSingkat:
                document.getElementById(
                    "deskripsiSingkat"
                ).value,

                deskripsiLengkap:
                document.getElementById(
                    "deskripsiLengkap"
                ).value,

                foto:
                document.getElementById(
                    "foto"
                ).value,

                status:
                document.getElementById(
                    "status"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Gedung berhasil disimpan"
        );

        tutupModal();

        loadGedung();

    }else{

        showToast(
            result.message
        );

    }

}

async function hapusGedung(kodeGedung){

    if(
        !confirm(
            "Hapus data gedung?"
        )
    ){
        return;
    }

    const result =
        await apiPost({

            action:"deleteGedung",

            payload:{

                kodeGedung:
                kodeGedung

            }

        });

    if(result.success){

        showToast(
            "Data berhasil dihapus"
        );

        loadGedung();

    }else{

        showToast(
            result.message
        );

    }

}
