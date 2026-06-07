function renderHomepage(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Homepage Management</h2>

            <button class="btn btn-primary"
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
        await apiGet("getHomepage");

    const tbody =
        document.getElementById(
            "homepageTable"
        );

    if(!result.success){

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

    result.data.forEach((item,index)=>{

        html += `

        <tr>

            <td>${index + 1}</td>

            <td>${item.judul}</td>

            <td>${item.urutan}</td>

            <td>${item.status}</td>

            <td>

                <button
                class="btn btn-warning"
                onclick="editHomepage('${item.id}')">
                Edit
                </button>

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

    modal.style.display = "flex";

    modal.innerHTML = `

    <div class="modal">

        <h2>Tambah Konten Homepage</h2>

        <br>

        <div class="form-group">
            <label>Judul</label>
            <input
            type="text"
            id="homepageJudul"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Isi Konten</label>
            <textarea
            id="homepageIsi"
            rows="6"
            class="form-control"></textarea>
        </div>

        <div class="form-group">
            <label>URL Gambar</label>
            <input
            type="text"
            id="homepageGambar"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Urutan</label>
            <input
            type="number"
            id="homepageUrutan"
            value="1"
            class="form-control">
        </div>

        <div class="form-group">
            <label>Status</label>

            <select
            id="homepageStatus"
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

function tutupModal(){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.style.display = "none";

    modal.innerHTML = "";
}

async function simpanHomepage(){

    const data = {

        action:"saveHomepage",

        judul:
        document.getElementById(
            "homepageJudul"
        ).value,

        isi:
        document.getElementById(
            "homepageIsi"
        ).value,

        gambar:
        document.getElementById(
            "homepageGambar"
        ).value,

        urutan:
        document.getElementById(
            "homepageUrutan"
        ).value,

        status:
        document.getElementById(
            "homepageStatus"
        ).value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Data berhasil disimpan"
        );

        tutupModal();

        loadHomepage();
    }
}

function editHomepage(id){

    showToast(
        "Fitur edit akan aktif setelah API selesai dibuat"
    );
}

function hapusHomepage(id){

    showToast(
        "Fitur hapus akan aktif setelah API selesai dibuat"
    );
}
