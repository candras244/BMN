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

    const gedungRes =
        await fetch(
            `${API_URL}?action=getGedung`
        );

    const gedung =
        await gedungRes.json();

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuangan`
        );

    const ruangan =
        await ruanganRes.json();

    let rows = "";

    (gedung.data || gedung)
    .forEach(g=>{

        const ruangGedung =
            (ruangan.data || ruangan)
            .filter(
                r =>
                    String(
                        r.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
            );

        let kelas = 0;
        let lab = 0;
        let kantor = 0;

        ruangGedung.forEach(r=>{

            const jenis =
                String(
                    r.JENIS_RUANGAN || ""
                )
                .toUpperCase();

            if(
                jenis.includes("KELAS")
            ){
                kelas++;
            }

            if(
                jenis.includes("LAB")
            ){
                lab++;
            }

            if(
                jenis.includes("KANTOR")
            ){
                kantor++;
            }

        });

        rows += `

        <tr>

            <td>

                ${g.NAMA_GEDUNG}

            </td>

            <td>

                ${ruangGedung.length}

            </td>

            <td>

                ${kelas}

            </td>

            <td>

                ${lab}

            </td>

            <td>

                ${kantor}

            </td>

            <td>

                <span
                    class="badge-proses">

                    Proses

                </span>

            </td>

            <td>

                <span
                    class="badge-proses">

                    Proses

                </span>

            </td>

            <td>

                <button
                    class="btn-primary"
                    onclick="
                        showGedungDetail(
                            '${g.KODE_GEDUNG}',
                            '${g.NAMA_GEDUNG}'
                        )
                    ">

                    Detail

                </button>

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <h2>
            Daftar Gedung
        </h2>

        <br>

        <table>

            <thead>

                <tr>

                    <th>
                        Gedung
                    </th>

                    <th>
                        Ruangan
                    </th>

                    <th>
                        Kelas
                    </th>

                    <th>
                        Lab
                    </th>

                    <th>
                        Kantor
                    </th>

                    <th>
                        Perawatan
                    </th>

                    <th>
                        DBR Gedung
                    </th>

                    <th>
                        Detail
                    </th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `);

}

/* =====================================
   GEDUNG
===================================== */

async function loadGedung(){

    const gedungRes =
        await fetch(
            `${API_URL}?action=getGedung`
        );

    const gedung =
        await gedungRes.json();

    const ruanganRes =
        await fetch(
            `${API_URL}?action=getRuangan`
        );

    const ruangan =
        await ruanganRes.json();

    let rows = "";

    (gedung.data || gedung)
    .forEach(g=>{

        const ruangGedung =
            (ruangan.data || ruangan)
            .filter(
                r =>
                    String(
                        r.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
            );

        let kelas = 0;
        let lab = 0;
        let kantor = 0;

        ruangGedung.forEach(r=>{

            const jenis =
                String(
                    r.JENIS_RUANGAN || ""
                ).toUpperCase();

            if(
                jenis.includes(
                    "KELAS"
                )
            ){
                kelas++;
            }

            if(
                jenis.includes(
                    "LAB"
                )
            ){
                lab++;
            }

            if(
                jenis.includes(
                    "KANTOR"
                )
            ){
                kantor++;
            }

        });

        rows += `

        <tr>

            <td>
                ${g.NAMA_GEDUNG}
            </td>

            <td>
                ${ruangGedung.length}
            </td>

            <td>
                ${kelas}
            </td>

            <td>
                ${lab}
            </td>

            <td>
                ${kantor}
            </td>

            <td>

                <span
                    class="badge-proses">

                    Proses

                </span>

            </td>

            <td>

                <span
                    class="badge-proses">

                    Proses

                </span>

            </td>

            <td>

                <button
                    class="btn-primary"
                    onclick="
                        showGedungDetail(
                            '${g.KODE_GEDUNG}',
                            '${g.NAMA_GEDUNG}'
                        )
                    ">

                    Detail

                </button>

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <h2>
            Daftar Gedung
        </h2>

        <br>

        <table>

            <thead>

                <tr>

                    <th>Gedung</th>

                    <th>Ruangan</th>

                    <th>Kelas</th>

                    <th>Lab</th>

                    <th>Kantor</th>

                    <th>Perawatan</th>

                    <th>DBR Gedung</th>

                    <th>Detail</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

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
