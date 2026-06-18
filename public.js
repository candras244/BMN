const API_URL = "https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

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

/* =====================================
   HOME
===================================== */

async function loadHome(){

    const statistikRes =
        await fetch(
            `${API_URL}?action=getStatistik`
        );

    const statistik =
        await statistikRes.json();

    const pengaturanRes =
        await fetch(
            `${API_URL}?action=getPengaturan`
        );

    const pengaturan =
        await pengaturanRes.json();

    document.getElementById(
        "namaInstansi"
    ).innerText =
        pengaturan.NAMA_INSTANSI ||
        "SIM-DBR";

    if(
        pengaturan.LOGO_URL
    ){

        document.getElementById(
            "logoInstansi"
        ).src =
            pengaturan.LOGO_URL;

    }

    document.getElementById(
        "footerEmail"
    ).innerText =
        pengaturan.EMAIL || "-";

    document.getElementById(
        "footerTelepon"
    ).innerText =
        pengaturan.TELEPON || "-";

    setContent(`

    <section class="hero-banner">

        <div class="hero-overlay">

            <h1>
                ${pengaturan.NAMA_INSTANSI || "SIM-DBR"}
            </h1>

            <p>
                Sistem Informasi
                Manajemen Daftar
                Barang Ruangan
            </p>

        </div>

    </section>

    <div class="card">

        <h2>
            Profil Pengelolaan Sarana dan Prasarana
        </h2>

        <br>

        <p>

            Sistem Informasi Daftar Barang
            Ruangan (SIM-DBR) digunakan
            untuk pengelolaan aset,
            gedung, ruangan, mutasi,
            perubahan kondisi, BAST,
            perawatan gedung dan
            penghapusan aset secara
            terintegrasi.

        </p>

    </div>

    <div class="stat-grid">

        <div class="stat-box">

            <h2>
                ${statistik.totalGedung || 0}
            </h2>

            <p>
                Total Gedung
            </p>

        </div>

        <div class="stat-box">

            <h2>
                ${statistik.totalRuangan || 0}
            </h2>

            <p>
                Total Ruangan
            </p>

        </div>

        <div class="stat-box">

            <h2>
                ${statistik.totalAset || 0}
            </h2>

            <p>
                Total Aset
            </p>

        </div>

        <div class="stat-box">

            <h2>

                Rp
                ${(statistik.totalNilai || 0)
                .toLocaleString("id-ID")}

            </h2>

            <p>
                Nilai Aset
            </p>

        </div>

    </div>

        <div class="card">
    
            <h2>
                Ringkasan Infrastruktur
            </h2>
    
            <br>
    
            <div class="card">
    
        <h2>
            Infrastruktur Gedung
        </h2>
    
        <br>
    
        <table>
    
            <thead>
    
                <tr>
    
                    <th>Gedung</th>
                    <th>Kelas</th>
                    <th>Lab</th>
                    <th>Kantor</th>
                    <th>Rapat</th>
    
                </tr>
    
            </thead>
    
            <tbody>
    
                ${rowsInfrastruktur}
    
            </tbody>
    
        </table>
    
    </div>

    <div class="card">

        <h2>
            Kondisi Aset
        </h2>

        <br>

        <div class="dashboard-grid">

            <div class="mini-card">

                <h3>
                    Rusak Berat
                </h3>

                <h1>
                    ${statistik.asetRusakBerat || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Aset Hilang
                </h3>

                <h1>
                    ${statistik.asetHilang || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Usia > 5 Tahun
                </h3>

                <h1>
                    ${statistik.asetUsia5Tahun || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Siap Hapus
                </h3>

                <h1>
                    ${statistik.asetSiapHapus || 0}
                </h1>

            </div>

        </div>

    </div>

    `);

}

/* =====================================
   GEDUNG
===================================== */

async function loadGedung(){

    const response =
        await fetch(
            `${API_URL}?action=getGedung`
        );

    const gedung =
        await response.json();

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuangan`
        );

    const ruangan =
        await ruanganRes.json();

    let html = `

    <div class="page-title">

        <h2>
            Daftar Gedung
        </h2>

    </div>

    <div class="gedung-grid">

    `;

    gedung.forEach(g=>{

        const jumlahRuangan =
            ruangan.filter(
                r =>
                    String(
                        r.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
            ).length;

        html += `

        <div class="gedung-card">

            <div class="gedung-image">

                <img
                    src="${
                        g.FOTO_GEDUNG ||
                        'https://placehold.co/600x300'
                    }"
                    alt="${g.NAMA_GEDUNG}">

            </div>

            <div class="gedung-body">

                <h3>
                    ${g.NAMA_GEDUNG}
                </h3>

                <p>

                    ${
                        g.DESKRIPSI ||
                        "Belum ada deskripsi gedung"
                    }

                </p>

                <p>

                    <b>
                        ${jumlahRuangan}
                    </b>

                    Ruangan

                </p>

                <button
                    onclick="
                    showGedungDetail(
                        '${g.KODE_GEDUNG}',
                        '${g.NAMA_GEDUNG}'
                    )">

                    Lihat Detail

                </button>

            </div>

        </div>

        `;

    });

    html += `

    </div>

    `;

    setContent(html);

}

async function showGedungDetail(
    kodeGedung,
    namaGedung
){

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuanganByGedung&kodeGedung=${kodeGedung}`
        );

    const ruangan =
        await ruanganRes.json();

    const asetRes =
        await fetch(
            `${API_URL}?action=getMasterAset`
        );

    const aset =
        await asetRes.json();

    const asetGedung =
        aset.filter(
            a =>
                String(
                    a.KODE_GEDUNG
                ) ===
                String(
                    kodeGedung
                )
        );

    let totalNilai = 0;

    asetGedung.forEach(a=>{

        totalNilai +=
            Number(
                a.NILAI_PEROLEHAN || 0
            );

    });

    let rowsRuangan = "";

    ruangan.forEach(r=>{

        const jumlahAset =
            asetGedung.filter(
                a =>
                    String(
                        a.KODE_RUANGAN
                    ) ===
                    String(
                        r.KODE_RUANGAN
                    )
            ).length;

        rowsRuangan += `

        <tr>

            <td>
                ${r.NAMA_RUANGAN}
            </td>

            <td>
                ${r.JENIS_RUANGAN || "-"}
            </td>

            <td>
                ${jumlahAset}
            </td>

            <td>

                <button
                class="btn-primary"
                onclick="
                    window.open(
                        API_URL +
                        '?action=previewDBRRuangan&kodeRuangan=${r.KODE_RUANGAN}',
                        '_blank'
                    );
                ">
            
                Lihat DBR
            
            </butto

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <button
            class="btn-back"
            onclick="loadGedung()">

            ← Kembali

        </button>

        <h2>

            ${namaGedung}

        </h2>

        <br>

        <div class="dashboard-grid">

        <div class="mini-card">

            <h3>
                Total Ruangan
            </h3>

            <h1>
                ${ruangan.length}
            </h1>

        </div>

        <div class="mini-card">

            <h3>
                Total Aset
            </h3>

            <h1>
                ${asetGedung.length}
            </h1>

        </div>

     <div class="mini-card">

    <h3>
        Nilai Aset
    </h3>

    <h1>

        Rp
        ${totalNilai.toLocaleString("id-ID")}

    </h1>

</div>

        </div>

    </div>   

    <div class="card">

    <h3>
        DBR Gedung
    </h3>

    <br>

    <p>

        Rekapitulasi seluruh aset
        dalam Gedung
        ${namaGedung}

    </p>

    <br>

        <button
        class="btn-primary"
        style="
            width:100%;
            padding:15px;
            font-size:16px;
        "
        onclick="
            window.open(
                API_URL +
                '?action=previewDBRGedung&kodeGedung=${kodeGedung}',
                '_blank'
            );
        ">

        Lihat DBR Gedung

    </button>

</div>

<br>

    <div class="card">

        <h3>
            Daftar Ruangan
        </h3>

        <br>

        <table>

            <thead>

                <tr>

                    <th>
                        Nama Ruangan
                    </th>

                    <th>
                        Jenis
                    </th>

                    <th>
                        Aset
                    </th>

                    <th>
                        DBR
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rowsRuangan}

            </tbody>

        </table>

    </div>

    `);

}

/* =====================================
   DBR
===================================== */

async function loadDBR(){

    const response = await fetch(
        `${API_URL}?action=getGedung`
    );

    const result = await response.json();

    let html = `

    <div class="card">

        <h2>DBR</h2>

        <p>
            Pilih Gedung
        </p>

    </div>

    `;

    result.data.forEach(g => {

        html += `

        <div class="card">

            <h3>
                ${g.NAMA_GEDUNG}
            </h3>

            <button
                onclick="
                showGedungDetail(
                '${g.KODE_GEDUNG}',
                '${g.NAMA_GEDUNG}'
                )">

                Buka

            </button>

        </div>

        `;

    });

    setContent(html);

}

/* =====================================
   STATISTIK
===================================== */

async function loadStatistik(){

    const response = await fetch(
        `${API_URL}?action=getAset`
    );

    const result = await response.json();

    let total = 0;
    let baik = 0;
    let rusakRingan = 0;
    let rusakBerat = 0;

    result.data.forEach(a => {

        if(
            a.STATUS_ASET === "Dihapus"
        ){
            return;
        }

        total++;

        if(a.KONDISI === "Baik"){
            baik++;
        }

        if(a.KONDISI === "Rusak Ringan"){
            rusakRingan++;
        }

        if(a.KONDISI === "Rusak Berat"){
            rusakBerat++;
        }

    });

    setContent(`

        <div class="stats-grid">

            <div class="stat-card">

                <h3>Total Aset</h3>

                <h2>${total}</h2>

            </div>

            <div class="stat-card">

                <h3>Baik</h3>

                <h2>${baik}</h2>

            </div>

            <div class="stat-card">

                <h3>Rusak Ringan</h3>

                <h2>${rusakRingan}</h2>

            </div>

            <div class="stat-card">

                <h3>Rusak Berat</h3>

                <h2>${rusakBerat}</h2>

            </div>

        </div>

    `);

}
