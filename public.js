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

    setContent(`

    <div class="card">

        <h1>
            SIM-DBR
        </h1>

        <br>

        <p>

            Sistem Informasi
            Daftar Barang Ruangan

        </p>

        <br>

        <p>

            Selamat datang di
            Sistem Informasi
            Daftar Barang Ruangan.

        </p>

        <br>

        <table>

            <tr>

                <td>
                    DBR Gedung
                </td>

                <td>
                    :
                </td>

                <td>
                    Tersedia
                </td>

            </tr>

            <tr>

                <td>
                    DBR Ruangan
                </td>

                <td>
                    :
                </td>

                <td>
                    Tersedia
                </td>

            </tr>

            <tr>

                <td>
                    Perawatan Gedung
                </td>

                <td>
                    :
                </td>

                <td>
                    Proses
                </td>

            </tr>

            <tr>

                <td>
                    Monitoring Gedung
                </td>

                <td>
                    :
                </td>

                <td>
                    Proses
                </td>

            </tr>

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

