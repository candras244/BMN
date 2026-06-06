/* ==========================
   LOAD AWAL
========================== */

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();
    loadGedung();
    loadRuang();

});

/* ==========================
   DASHBOARD
========================== */

async function loadDashboard(){

    try{

        const data =
        await getData("getDashboard");

        document.getElementById(
        "totalGedung"
        ).innerText =
        data.totalGedung || 0;

        document.getElementById(
        "totalRuang"
        ).innerText =
        data.totalRuang || 0;

        document.getElementById(
        "totalAset"
        ).innerText =
        data.totalAset || 0;

        document.getElementById(
        "nilaiAset"
        ).innerText =
        "Rp " +
        Number(
        data.nilaiTotal || 0
        ).toLocaleString("id-ID");

        document.getElementById(
        "baik"
        ).innerText =
        data.baik || 0;

        document.getElementById(
        "rusakRingan"
        ).innerText =
        data.rusakRingan || 0;

        document.getElementById(
        "rusakBerat"
        ).innerText =
        data.rusakBerat || 0;

    }catch(error){

        console.error(
        "Dashboard Error",
        error
        );

    }

}

/* ==========================
   GEDUNG
========================== */

async function loadGedung(){

    try{

        const gedung =
        await getData("getGedung");

        let html = "";

        gedung.forEach(item=>{

            html += `

            <div class="gedung-card">

                <img
                src="${item.fotoGedung}"
                alt="${item.namaGedung}">

                <h3>
                    ${item.namaGedung}
                </h3>

            </div>

            `;

        });

        document.getElementById(
        "listGedung"
        ).innerHTML =
        html;

    }catch(error){

        console.error(
        "Gedung Error",
        error
        );

    }

}

/* ==========================
   RUANG UNTUK DBR
========================== */

async function loadRuang(){

    try{

        const ruang =
        await getData("getRuang");

        let html = `
        <option value="">
        Pilih Ruangan
        </option>
        `;

        ruang.forEach(item=>{

            html += `

            <option
            value="${item.namaRuang}">

                ${item.namaRuang}

            </option>

            `;

        });

        document.getElementById(
        "filterRuang"
        ).innerHTML =
        html;

    }catch(error){

        console.error(
        "Ruang Error",
        error
        );

    }

}

/* ==========================
   DBR
========================== */

async function loadDBR(){

    const ruang =
    document.getElementById(
    "filterRuang"
    ).value;

    if(!ruang){

        alert(
        "Pilih ruangan terlebih dahulu"
        );

        return;

    }

    try{

        const response =
        await fetch(

        `${API_URL}?action=getDBR&ruang=${encodeURIComponent(ruang)}`

        );

        const data =
        await response.json();

        let html = "";

        let baik = 0;
        let rr = 0;
        let rb = 0;

        data.forEach(item=>{

            if(item.kondisi === "Baik")
            baik++;

            if(item.kondisi === "Rusak Ringan")
            rr++;

            if(item.kondisi === "Rusak Berat")
            rb++;

            html += `

            <tr>

                <td>${item.no}</td>

                <td>
                ${item.kodeBarang}
                </td>

                <td>
                ${item.nup}
                </td>

                <td>
                ${item.namaBarang}
                </td>

                <td>
                ${item.tahun}
                </td>

                <td>
                ${item.kondisi}
                </td>

                <td>
                ${item.status}
                </td>

            </tr>

            `;

        });

        document.getElementById(
        "tabelDBR"
        ).innerHTML =
        html;

        document.getElementById(
        "infoDBR"
        ).innerHTML = `

        <div class="card">

            <h3>${data.length}</h3>

            <p>Jumlah Barang</p>

        </div>

        <div class="card">

            <h3>${baik}</h3>

            <p>Baik</p>

        </div>

        <div class="card">

            <h3>${rr}</h3>

            <p>Rusak Ringan</p>

        </div>

        <div class="card">

            <h3>${rb}</h3>

            <p>Rusak Berat</p>

        </div>

        `;

    }catch(error){

        console.error(
        "DBR Error",
        error
        );

    }

}
