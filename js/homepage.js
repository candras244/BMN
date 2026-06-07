function renderHomepage(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Homepage Management</h2>

            <button
            class="btn btn-primary"
            onclick="showFormHomepage()">

                Tambah Konten

            </button>

        </div>

    </div>

    <br>

    <div class="table-container">

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>Judul</th>
                    <th>Urutan</th>
                    <th>Status</th>
                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody id="homepageTable">

                <tr>

                    <td colspan="5">

                        Memuat data...

                    </td>

                </tr>

            </tbody>

        </table>

    </div>

    `;

    loadHomepage();

}

async function loadHomepage(){

    const result =
        await apiGet(
            "homepage"
        );

    const tbody =
        document.getElementById(
            "homepageTable"
        );

    if(!Array.isArray(result)){

        tbody.innerHTML = `

        <tr>

            <td colspan="5">

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

            <td>${item.judul}</td>

            <td>${item.urutan}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-danger"
                onclick="hapusHomepage('${item.id}')">

                    Hapus

                </button>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML = html;

}

function showFormHomepage(){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.style.display =
        "flex";

    modal.innerHTML = `

    <div class="modal">

        <h2>Tambah Konten Homepage</h2>

        <br>

        <div class="form-group">

            <label>ID</label>

            <input
            type="text"
            id="id"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Judul</label>

            <input
            type="text"
            id="judul"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Konten</label>

            <textarea
            id="konten"
            rows="5"
            class="form-control"></textarea>

        </div>

        <div class="form-group">

            <label>Gambar</label>

            <input
            type="text"
            id="gambar"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Urutan</label>

            <input
            type="number"
            id="urutan"
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
        onclick="simpanHomepage()">

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

async function simpanHomepage(){

    const result =
        await apiPost({

            action:"saveHomepage",

            payload:{

                id:
                document.getElementById(
                    "id"
                ).value,

                judul:
                document.getElementById(
                    "judul"
                ).value,

                konten:
                document.getElementById(
                    "konten"
                ).value,

                gambar:
                document.getElementById(
                    "gambar"
                ).value,

                urutan:
                document.getElementById(
                    "urutan"
                ).value,

                status:
                document.getElementById(
                    "status"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Konten berhasil disimpan"
        );

        tutupModal();

        loadHomepage();

    }else{

        showToast(
            result.message
        );

    }

}

async function hapusHomepage(id){

    if(
        !confirm(
            "Hapus konten homepage?"
        )
    ){
        return;
    }

    const result =
        await apiPost({

            action:"deleteHomepage",

            payload:{

                id:id

            }

        });

    if(result.success){

        showToast(
            "Data berhasil dihapus"
        );

        loadHomepage();

    }else{

        showToast(
            result.message
        );

    }

}
