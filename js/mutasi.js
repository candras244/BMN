function renderMutasi(content){

    content.innerHTML = `

    <div class="card">

        <div style="display:flex;justify-content:space-between;align-items:center;">

            <h2>Mutasi Aset</h2>

            <button
            class="btn btn-primary"
            onclick="showFormMutasi()">

                Mutasi Aset

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
                    <th>Dari Ruang</th>
                    <th>Ke Ruang</th>
                    <th>Keterangan</th>
                    <th>Petugas</th>

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
        await apiGet(
            "mutasi"
        );

    const tbody =
        document.getElementById(
            "mutasiTable"
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

            <td>${item.dariRuang}</td>

            <td>${item.keRuang}</td>

            <td>${item.keterangan}</td>

            <td>${item.petugas}</td>

        </tr>

        `;

    });

    tbody.innerHTML = html;

}

async function showFormMutasi(){

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

    const ruangan =
        await apiGet(
            "ruangan"
        );

    let optionAset = "";
    let optionRuang = "";

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

    if(
        Array.isArray(ruangan)
    ){

        ruangan.forEach(item=>{

            optionRuang += `

            <option
            value="${item.kodeRuang}">

                ${item.namaRuang}

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
            id="idAset"
            class="form-control">

                ${optionAset}

            </select>

        </div>

        <div class="form-group">

            <label>Ruangan Tujuan</label>

            <select
            id="keRuang"
            class="form-control">

                ${optionRuang}

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

    const result =
        await apiPost({

            action:"saveMutasi",

            payload:{

                idAset:
                document.getElementById(
                    "idAset"
                ).value,

                keRuang:
                document.getElementById(
                    "keRuang"
                ).value,

                keterangan:
                document.getElementById(
                    "keterangan"
                ).value

            }

        });

    if(result.success){

        showToast(
            "Mutasi berhasil disimpan"
        );

        tutupModal();

        loadMutasi();

        loadMasterAset();

    }else{

        showToast(
            result.message
        );

    }

}
