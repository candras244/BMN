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

        <div class="dashboard-grid">

            <div class="mini-card">

                <h3>
                    Ruang Kelas
                </h3>

                <h1>
                    ${statistik.jumlahKelas || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Laboratorium
                </h3>

                <h1>
                    ${statistik.jumlahLab || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Ruang Kantor
                </h3>

                <h1>
                    ${statistik.jumlahKantor || 0}
                </h1>

            </div>

            <div class="mini-card">

                <h3>
                    Ruang Rapat
                </h3>

                <h1>
                    ${statistik.jumlahRapat || 0}
                </h1>

            </div>

        </div>

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

    const response = await fetch(
        `${API_URL}?action=getGedung`
    );

    const result = await response.json();

    let html = `
        <div class="gedung-grid">
    `;

    result.data.forEach(g => {

        html += `

        <div class="gedung-card">

            <div class="gedung-image">

                <img
                    src="https://placehold.co/600x300"
                    alt="${g.NAMA_GEDUNG}">

            </div>

            <div class="gedung-body">

                <h3>
                    ${g.NAMA_GEDUNG}
                </h3>

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

    const response = await fetch(
        `${API_URL}?action=getRuanganByGedung&kodeGedung=${kodeGedung}`
    );

    const result = await response.json();

    let html = `

    <div class="card">

        <h2>${namaGedung}</h2>

        <p>
            Daftar Ruangan
        </p>

    </div>

    `;

    result.data.forEach(r => {

        html += `

        <div class="card">

            <h3>
                ${r.NAMA_RUANGAN}
            </h3>

            <button
                onclick="
                showRuanganDetail(
                '${r.KODE_RUANGAN}',
                '${r.NAMA_RUANGAN}'
                )">

                Lihat DBR

            </button>

        </div>

        `;

    });

    setContent(html);

}

async function showRuanganDetail(
    kodeRuangan,
    namaRuangan
){

    const response = await fetch(
        `${API_URL}?action=getAsetByRuangan&kodeRuangan=${kodeRuangan}`
    );

    const result = await response.json();

    let html = `

    <div class="card">

        <h2>
            ${namaRuangan}
        </h2>

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

    result.data.forEach(a => {

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
