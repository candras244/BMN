function renderKondisiAset(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Kondisi Aset</h2>

            <button
            class="btn btn-primary"
            onclick="showFormKondisiAset()">
                Update Kondisi
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
                    <th>Kondisi Lama</th>
                    <th>Kondisi Baru</th>
                    <th>Keterangan</th>
                </tr>
            </thead>

            <tbody id="kondisiAsetTable">
                <tr>
                    <td colspan="7">
                        Memuat data...
                    </td>
                </tr>
            </tbody>

        </table>

    </div>

    `;

    loadKondisiAset();
}

async function loadKondisiAset(){

    const result =
        await apiGet("getKondisiAset");

    const tbody =
        document.getElementById("kondisiAsetTable");

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

            <td>${item.kondisiLama}</td>

            <td>${item.kondisiBaru}</td>

            <td>${item.keterangan}</td>

        </tr>

        `;
    });

    tbody.innerHTML = html;
}

async function showFormKondisiAset(){

    const modal =
        document.getElementById("modalContainer");

    modal.style.display = "flex";

    const asetResult =
        await apiGet("getMasterAset");

    let asetOptions = "";

    if(asetResult.success){

        asetResult.data.forEach(item=>{

            asetOptions += `
            <option value="${item.id}">
                ${item.kodeBarang} - ${item.namaBarang}
            </option>
            `;
        });
    }

    modal.innerHTML = `

    <div class="modal">

        <h2>Update Kondisi Aset</h2>

        <br>

        <div class="form-group">
            <label>Pilih Aset</label>

            <select
            id="asetKondisi"
            class="form-control">
                ${asetOptions}
            </select>
        </div>

        <div class="form-group">
            <label>Kondisi Baru</label>

            <select
            id="kondisiBaru"
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
            <label>Keterangan</label>

            <textarea
            id="keteranganKondisi"
            rows="4"
            class="form-control"></textarea>
        </div>

        <br>

        <button
        class="btn btn-success"
        onclick="simpanKondisiAset()">
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

async function simpanKondisiAset(){

    const data = {

        action:"saveKondisiAset",

        asetId:
        document.getElementById(
            "asetKondisi"
        ).value,

        kondisiBaru:
        document.getElementById(
            "kondisiBaru"
        ).value,

        keterangan:
        document.getElementById(
            "keteranganKondisi"
        ).value
    };

    const result =
        await apiPost(data);

    if(result.success){

        showToast(
            "Kondisi aset berhasil diperbarui"
        );

        tutupModal();

        loadKondisiAset();
    }
}
