const API_URL =
"https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadHome();

    }
);

function setContent(html){

    document.getElementById(
        "content"
    ).innerHTML = html;

}

async function loadHome(){

    try{

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

        let perawatan = [];

        try{

            const perawatanRes =
                await fetch(
                    `${API_URL}?action=getPerawatanGedung`
                );

            perawatan =
                await perawatanRes.json();

        }catch(err){

            perawatan = [];

        }

        let rows = "";

        (gedung.data || gedung || [])
        .forEach(g=>{

            const ruangGedung =
                (ruangan.data || ruangan || [])
                .filter(
                    r =>
                    String(r.KODE_GEDUNG) ===
                    String(g.KODE_GEDUNG)
                );

            const jumlahRuangan =
                ruangGedung.length;

            const jumlahKantor =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase() === "KANTOR"
                ).length;

            const jumlahKelas =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase() === "KELAS"
                ).length;

            const jumlahLab =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .toUpperCase() === "LAB"
                ).length;

            const jumlahLainnya =
                jumlahRuangan -
                jumlahKantor -
                jumlahKelas -
                jumlahLab;

            const jumlahPerawatan =
                (perawatan.data || perawatan || [])
                .filter(
                    p =>
                    String(p.KODE_GEDUNG) ===
                    String(g.KODE_GEDUNG)
                ).length;

            rows += `

            <tr>

                <td>${g.NAMA_GEDUNG}</td>

                <td>${jumlahRuangan}</td>

                <td>${jumlahKantor}</td>

                <td>${jumlahKelas}</td>

                <td>${jumlahLab}</td>

                <td>${jumlahLainnya}</td>

                <td>${jumlahPerawatan}</td>

                <td>

                    <button
                        class="btn-primary"
                        onclick="
                            lihatDBRGedung(
                                '${g.KODE_GEDUNG}'
                            )
                        ">

                        DBR

                    </button>

                </td>

                <td>

                    <button
                        class="btn-primary"
                        onclick="
                            detailGedung(
                                '${g.KODE_GEDUNG}'
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

                        <th>Jumlah Ruangan</th>

                        <th>Kantor</th>

                        <th>Kelas</th>

                        <th>Lab</th>

                        <th>Lainnya</th>

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

    }catch(err){

        setContent(`

        <div class="card">

            <h3>
                Gagal Memuat Data
            </h3>

            <br>

            ${err}

        </div>

        `);

    }

}

function lihatDBRGedung(
    kodeGedung
){

    window.open(
        API_URL +
        "?action=previewDBRGedung" +
        "&kodeGedung=" +
        kodeGedung,
        "_blank"
    );

}

async function detailGedung(
    kodeGedung
){

    const res =
        await fetch(
            API_URL +
            "?action=getRuanganByGedung" +
            "&kodeGedung=" +
            kodeGedung
        );

    const data =
        await res.json();

    let rows = "";

    data.forEach((r,index)=>{

        rows += `

        <tr>

            <td>${index+1}</td>

            <td>${r.NAMA_RUANGAN || ""}</td>

            <td>${r.JENIS_RUANGAN || ""}</td>

            <td>

                <button
                    class="btn-primary"
                    onclick="
                        lihatDBRRuangan(
                            '${r.KODE_RUANGAN}'
                        )
                    ">

                    DBR

                </button>

            </td>

        </tr>

        `;

    });

    setContent(`

    <div class="card">

        <button
            class="btn-primary"
            onclick="loadHome()">

            Kembali

        </button>

        <br><br>

        <h2>
            Daftar Ruangan
        </h2>

        <br>

        <table>

            <thead>

                <tr>

                    <th>No</th>
                    <th>Ruangan</th>
                    <th>Jenis</th>
                    <th>DBR</th>

                </tr>

            </thead>

            <tbody>

                ${rows}

            </tbody>

        </table>

    </div>

    `);

}

function lihatDBRRuangan(
    kodeRuangan
){

    window.open(
        API_URL +
        "?action=previewDBRRuangan" +
        "&kodeRuangan=" +
        kodeRuangan,
        "_blank"
    );

}
