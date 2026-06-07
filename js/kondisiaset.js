function renderKondisiAset(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Riwayat Kondisi Aset</h2>

            <button
            class="btn btn-primary"
            onclick="showFormKondisi()">

                Ubah Kondisi

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
                    <th>ID Aset</th>
                    <th>Kondisi Lama</th>
                    <th>Kondisi Baru</th>
                    <th>Keterangan</th>
                    <th>Petugas</th>

                </tr>

            </thead>

            <tbody id="kondisiTable">

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
        await apiGet(
            "kondisiAset"
        );

    const tbody =
        document.getElementById(
            "kondisiTable"
        );

    if(
        !Array.isArray(result)
    ){

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

            <td>${item.tanggal}</td>

            <td>${item.idAset}</td>

            <td>${item.kondisiLama}</td>

            <td>${item.kondisiBaru}</td>

            <td>${item.keterangan}</td>

            <td>${item.petugas}</td>

        </tr>

        `;

    });

    tbody.innerHTML = html;

}

async function showFormKondisi(){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.style.display =
        "flex";

    const aset =
        await apiGet(
            "masterAset"
        );

    let optionAset = "";

    if(
        Array.isArray(aset)
    ){

        aset.forEach(item=>{

            optionAset += `

            <option
            value="${item.idAset}">

                ${item.idAset}
                -
                ${item.namaBarang}

            </option>

            `;

        });

    }

    modal.innerHTML = `

    <div class="modal">

        <h2>Ubah Kondisi Aset</h2>

        <br>

        <div class="form-group">

            <label>Pilih Aset</label>

            <select
            id="idAset"
            class="form-control">

                ${optionAset}

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
            id="keterangan"
            rows="4"
            class="form-control"></textarea>

        </div>

        <br>

        <button
        class="btn btn-success"
        onclick="simpanKondisi()">

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

async function simpanKondisi(){

    const result =
        await apiPost({

            action:"saveKondisi",

            payload:{

                idAset:
                document.getElementById(
                    "idAset"
                ).value,

                kondisiBaru:
                document.getElementById(
                    "kondisiBaru"
                ).value,

                keterangan:
                document.getElementById(
                    "keterangan"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Kondisi aset berhasil diperbarui"
        );

        tutupModal();

        loadKondisiAset();

        loadMasterAset();

    }else{

        showToast(
            result.message
        );

    }

}
