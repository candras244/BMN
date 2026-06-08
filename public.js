const API_URL = "https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

document.addEventListener("DOMContentLoaded", () => {
    loadPage("home");
});

function loadPage(page){

    switch(page){

        case "home":
            loadHome();
            break;

        case "gedung":
            loadGedung();
            break;

        case "dbr":
            loadDBR();
            break;

        case "statistik":
            loadStatistik();
            break;

        default:
            loadHome();
    }

}

function setContent(html){
    document.getElementById("content").innerHTML = html;
}

/* ==========================
   HOME
========================== */

function loadHome(){

    setContent(`
        <div class="card">
            <h2>SIM-DBR</h2>
            <p>Sistem Informasi Daftar Barang Ruangan</p>
        </div>
    `);

}

/* ==========================
   GEDUNG
========================== */

async function loadGedung(){

    const res = await fetch(
        `${API_URL}?action=getGedung`
    );

    const result = await res.json();

    let html = `
        <div class="card">
            <h2>Data Gedung</h2>
        </div>

        <div class="gedung-grid">
    `;

    result.data.forEach(g=>{

        html += `
            <div class="gedung-card">

                <img
                src="https://placehold.co/600x300"
                class="gedung-img">

                <div class="gedung-body">

                    <h3>${g.NAMA_GEDUNG}</h3>

                    <p>
                        Kode :
                        ${g.KODE_GEDUNG}
                    </p>

                    <button
                    class="btn btn-primary"
                    onclick="showGedungDetail('${g.KODE_GEDUNG}')">

                    Lihat Detail

                    </button>

                </div>

            </div>
        `;

    });

    html += `</div>`;

    setContent(html);

}

/* ==========================
   DETAIL GEDUNG
========================== */

async function showGedungDetail(kodeGedung){

    const gedungRes =
    await fetch(`${API_URL}?action=getGedung`);

    const ruanganRes =
    await fetch(`${API_URL}?action=getRuangan`);

    const asetRes =
    await fetch(`${API_URL}?action=getAset`);

    const gedungData =
    await gedungRes.json();

    const ruanganData =
    await ruanganRes.json();

    const asetData =
    await asetRes.json();

    const gedung =
    gedungData.data.find(
        x=>x.KODE_GEDUNG===kodeGedung
    );

    const ruangan =
    ruanganData.data.filter(
        x=>x.KODE_GEDUNG===kodeGedung
    );

    const jumlahAset =
    asetData.data.filter(
        x=>x.KODE_GEDUNG===kodeGedung &&
        x.STATUS_ASET!=="Dihapus"
    ).length;

    let html = `

        <div class="card">

            <button
            class="btn"
            onclick="loadGedung()">
            Kembali
            </button>

            <h2>
                ${gedung.NAMA_GEDUNG}
            </h2>

            <p>
                Jumlah Ruangan :
                ${ruangan.length}
            </p>

            <p>
                Jumlah Aset :
                ${jumlahAset}
            </p>

        </div>

    `;

    ruangan.forEach(r=>{

        const asetRuangan =
        asetData.data.filter(
            a=>
            a.KODE_RUANGAN===r.KODE_RUANGAN &&
            a.STATUS_ASET!=="Dihapus"
        ).length;

        html += `

            <div class="card">

                <h3>
                    ${r.NAMA_RUANGAN}
                </h3>

                <p>
                    Kode :
                    ${r.KODE_RUANGAN}
                </p>

                <p>
                    Jumlah Aset :
                    ${asetRuangan}
                </p>

                <button
                class="btn btn-primary"
                onclick="showRuanganDetail('${r.KODE_RUANGAN}')">

                Lihat Aset

                </button>

            </div>

        `;

    });

    setContent(html);

}

/* ==========================
   DETAIL RUANGAN
========================== */

async function showRuanganDetail(kodeRuangan){

    const asetRes =
    await fetch(
        `${API_URL}?action=getAset`
    );

    const result =
    await asetRes.json();

    const aset =
    result.data.filter(
        x=>
        x.KODE_RUANGAN===kodeRuangan &&
        x.STATUS_ASET!=="Dihapus"
    );

    let html = `

        <div class="card">

            <button
            class="btn"
            onclick="loadGedung()">
            Kembali
            </button>

            <h2>
                Data Aset Ruangan
            </h2>

        </div>

        <div class="table-container">

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Barang</th>
                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

    `;

    aset.forEach(a=>{

        html += `
            <tr>

                <td>${a.ID_ASET}</td>
                <td>${a.NAMA_BARANG}</td>
                <td>${a.KONDISI}</td>

            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
        </div>
    `;

    setContent(html);

}

/* ==========================
   DBR
========================== */

async function loadDBR(){

    const res =
    await fetch(
        `${API_URL}?action=getAset`
    );

    const result =
    await res.json();

    let html = `

        <div class="card">

            <h2>
                Daftar Barang Ruangan
            </h2>

        </div>

        <div class="table-container">

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Barang</th>
                    <th>Gedung</th>
                    <th>Ruangan</th>
                    <th>Kondisi</th>

                </tr>

            </thead>

            <tbody>

    `;

    result.data.forEach(a=>{

        if(a.STATUS_ASET!=="Dihapus"){

            html += `
                <tr>

                    <td>${a.ID_ASET}</td>
                    <td>${a.NAMA_BARANG}</td>
                    <td>${a.NAMA_GEDUNG}</td>
                    <td>${a.NAMA_RUANGAN}</td>
                    <td>${a.KONDISI}</td>

                </tr>
            `;

        }

    });

    html += `
            </tbody>

        </table>

        </div>
    `;

    setContent(html);

}

/* ==========================
   STATISTIK
========================== */

async function loadStatistik(){

    const res =
    await fetch(
        `${API_URL}?action=getAset`
    );

    const result =
    await res.json();

    const aktif =
    result.data.filter(
        x=>x.STATUS_ASET!=="Dihapus"
    );

    const totalAset =
    aktif.length;

    let totalNilai = 0;

    aktif.forEach(a=>{

        totalNilai +=
        Number(a.NILAI_PEROLEHAN || 0);

    });

    const totalGedung =
    new Set(
        aktif.map(
            x=>x.KODE_GEDUNG
        )
    ).size;

    const totalRuangan =
    new Set(
        aktif.map(
            x=>x.KODE_RUANGAN
        )
    ).size;

    setContent(`

        <div class="stats">

            <div class="stat-box">
                <h3>Total Aset</h3>
                <h2>${totalAset}</h2>
            </div>

            <div class="stat-box">
                <h3>Total Gedung</h3>
                <h2>${totalGedung}</h2>
            </div>

            <div class="stat-box">
                <h3>Total Ruangan</h3>
                <h2>${totalRuangan}</h2>
            </div>

            <div class="stat-box">
                <h3>Nilai Aset</h3>
                <h2>
                    Rp ${totalNilai.toLocaleString("id-ID")}
                </h2>
            </div>

        </div>

    `);

}
