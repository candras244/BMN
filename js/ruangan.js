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
                    <th>Kode Ruang</th>
                    <th>Nama Ruang</th>
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
        await apiGet("ruangan");

    const tbody =
        document.getElementById(
            "ruanganTable"
        );

    if(!Array.isArray(result)){

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

    result.forEach((item,index)=>{

        html += `

        <tr>

            <td>${index+1}</td>

            <td>${item.kodeRuang}</td>

            <td>${item.namaRuang}</td>

            <td>${item.namaGedung}</td>

            <td>${item.lantai}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-danger"
                onclick="hapusRuangan('${item.kodeRuang}')">

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
        document.getElementById(
            "modalContainer"
        );

    modal.style.display = "flex";

    const gedung =
        await apiGet("gedung");

    let optionGedung = "";

    if(Array.isArray(gedung)){

        gedung.forEach(item=>{

            optionGedung += `

            <option
            value="${item.kodeGedung}">

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

            <label>Kode Ruang</label>

            <input
            type="text"
            id="kodeRuang"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Nama Ruang</label>

            <input
            type="text"
            id="namaRuang"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Gedung</label>

            <select
            id="kodeGedung"
            class="form-control">

                ${optionGedung}

            </select>

        </div>

        <div class="form-group">

            <label>Jenis Ruang</label>

            <input
            type="text"
            id="jenisRuang"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Lantai</label>

            <input
            type="number"
            id="lantai"
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

    const result =
        await apiPost({

            action:"saveRuangan",

            payload:{

                kodeRuang:
                document.getElementById(
                    "kodeRuang"
                ).value,

                namaRuang:
                document.getElementById(
                    "namaRuang"
                ).value,

                kodeGedung:
                document.getElementById(
                    "kodeGedung"
                ).value,

                jenisRuang:
                document.getElementById(
                    "jenisRuang"
                ).value,

                lantai:
                document.getElementById(
                    "lantai"
                ).value,

                penanggungJawab:
                document.getElementById(
                    "penanggungJawab"
                ).value,

                status:
                document.getElementById(
                    "status"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Ruangan berhasil disimpan"
        );

        tutupModal();

        loadRuangan();

    }else{

        showToast(
            result.message
        );

    }

}

async function hapusRuangan(kodeRuang){

    if(
        !confirm(
            "Hapus data ruangan?"
        )
    ){
        return;
    }

    const result =
        await apiPost({

            action:"deleteRuangan",

            payload:{

                kodeRuang:
                kodeRuang

            }

        });

    if(result.success){

        showToast(
            "Data berhasil dihapus"
        );

        loadRuangan();

    }else{

        showToast(
            result.message
        );

    }

}
