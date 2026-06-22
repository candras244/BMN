/* =====================================================
   SIM-DBR 1.2
   BAGIAN 1
   KONFIGURASI + INISIALISASI + HELPER
===================================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

/* =====================================================
   STATE GLOBAL
===================================================== */

let currentGedung = null;

let asetPerRuanganData = [];

let currentAsetPage = 1;

const PAGE_SIZE = 10;

/* =====================================================
   INIT
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createModalContainer();

        loadHome();

    }
);

/* =====================================================
   HELPER CONTENT
===================================================== */

function setContent(html){

    const el =
        document.getElementById(
            "content"
        );

    if(!el) return;

    el.innerHTML = html;

}

/* =====================================================
   LOADING
===================================================== */

function showLoading(
    message = "Loading Data..."
){

    setContent(`

    <div class="card">

        <h3>${message}</h3>

    </div>

    `);

}

/* =====================================================
   ERROR
===================================================== */

function showError(
    error
){

    setContent(`

    <div class="card">

        <h3>
            Gagal Memuat Data
        </h3>

        <br>

        <pre>
${error}
        </pre>

    </div>

    `);

}

/* =====================================================
   FORMAT ANGKA
===================================================== */

function formatNumber(
    value
){

    const angka =
        Number(value || 0);

    return angka.toLocaleString(
        "id-ID"
    );

}

/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHtml(
    text
){

    return String(
        text || ""
    )
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");

}

/* =====================================================
   FETCH JSON
===================================================== */

async function getJSON(
    action,
    params = {}
){

    const query =
        new URLSearchParams(
            {
                action,
                ...params
            }
        );

    const response =
        await fetch(
            `${API_URL}?${query}`
        );

    if(
        !response.ok
    ){

        throw new Error(
            `HTTP ${response.status}`
        );

    }

    return await response.json();

}

/* =====================================================
   MODAL CONTAINER
===================================================== */

function createModalContainer(){

    if(
        document.getElementById(
            "modalContainer"
        )
    ){
        return;
    }

    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "modalContainer";

    modal.style.display =
        "none";

    modal.style.position =
        "fixed";

    modal.style.top =
        "0";

    modal.style.left =
        "0";

    modal.style.width =
        "100%";

    modal.style.height =
        "100%";

    modal.style.background =
        "rgba(0,0,0,.45)";

    modal.style.zIndex =
        "99999";

    modal.style.overflow =
        "auto";

    document.body.appendChild(
        modal
    );

}

/* =====================================================
   OPEN MODAL
===================================================== */

function openModal(
    html
){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.innerHTML = `

    <div
        style="
            max-width:1400px;
            margin:30px auto;
            background:#fff;
            padding:20px;
            border-radius:10px;
        "
    >

        ${html}

    </div>

    `;

    modal.style.display =
        "block";

}

/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal(){

    const modal =
        document.getElementById(
            "modalContainer"
        );

    modal.style.display =
        "none";

    modal.innerHTML = "";

}

/* =====================================================
   DBR GEDUNG
===================================================== */

function lihatDBRGedung(
    kodeGedung
){

    window.open(

        API_URL +
        "?action=previewDBRGedung" +
        "&kodeGedung=" +
        encodeURIComponent(
            kodeGedung
        ),

        "_blank"

    );

}

/* =====================================================
   DBR RUANGAN
===================================================== */

function lihatDBRRuangan(
    kodeRuangan
){

    window.open(

        API_URL +
        "?action=previewDBRRuangan" +
        "&kodeRuangan=" +
        encodeURIComponent(
            kodeRuangan
        ),

        "_blank"

    );

}

/* =====================================================
   BAGIAN 2
   HOMEPAGE DAFTAR GEDUNG
===================================================== */

async function loadHome(){

    try{

        showLoading(
            "Memuat Data Gedung..."
        );

        const gedungResult =
            await getJSON(
                "getGedung"
            );

        const ruanganResult =
            await getJSON(
                "getRuangan"
            );

        let perawatanResult =
            [];

        try{

            perawatanResult =
                await getJSON(
                    "getPerawatanGedung"
                );

        }catch(err){

            console.warn(
                "Perawatan belum tersedia"
            );

        }

        const gedung =
            gedungResult.data ||
            gedungResult ||
            [];

        const ruangan =
            ruanganResult.data ||
            ruanganResult ||
            [];

        const perawatan =
            perawatanResult.data ||
            perawatanResult ||
            [];

        let rows = "";

        gedung.forEach(g=>{

            const ruangGedung =
                ruangan.filter(
                    r =>
                    String(
                        r.KODE_GEDUNG
                    ) ===
                    String(
                        g.KODE_GEDUNG
                    )
                );

            const jumlahRuangan =
                ruangGedung.length;

            const jumlahKantor =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .trim()
                    .toUpperCase() ===
                    "KANTOR"
                ).length;

            const jumlahKelas =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .trim()
                    .toUpperCase() ===
                    "KELAS"
                ).length;

            const jumlahLab =
                ruangGedung.filter(
                    r =>
                    String(
                        r.JENIS_RUANGAN || ""
                    )
                    .trim()
                    .toUpperCase() ===
                    "LAB"
                ).length;

            const jumlahLainnya =
                jumlahRuangan -
                jumlahKantor -
                jumlahKelas -
                jumlahLab;

            rows += `

            <tr>

                <td>

                    ${escapeHtml(
                        g.NAMA_GEDUNG
                    )}

                </td>

                <td>

                    ${jumlahRuangan}

                </td>

                <td>

                    ${jumlahKantor}

                </td>

                <td>

                    ${jumlahKelas}

                </td>

                <td>

                    ${jumlahLab}

                </td>

                <td>

                    ${jumlahLainnya}

                </td>

                <td>

                    <div
                        style="
                            display:flex;
                            gap:6px;
                            align-items:center;
                            justify-content:center;
                        "
                    >

                        <button
                            class="btn-primary"
                            onclick="
                                bukaPerawatan(
                                    '${g.KODE_GEDUNG}',
                                    '${escapeHtml(
                                        g.NAMA_GEDUNG
                                    )}'
                                )
                            "
                        >

                            Lihat

                        </button>

                    </div>

                </td>

                <td>

                    <button
                        class="btn-primary"
                        onclick="
                            lihatDBRGedung(
                                '${g.KODE_GEDUNG}'
                            )
                        "
                    >

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
                        "
                    >

                        Detail

                    </button>

                </td>

            </tr>

            `;

        });

        setContent(`

        <div class="card">

            <h2>

                DAFTAR GEDUNG

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

        console.error(err);

        showError(err);

    }

}

/* =====================================================
   BAGIAN 3
   DETAIL GEDUNG + DAFTAR RUANGAN
===================================================== */

async function detailGedung(
    kodeGedung
){

    try{

        showLoading(
            "Memuat Detail Gedung..."
        );

        currentGedung =
            kodeGedung;

        const gedungResult =
            await getJSON(
                "getGedung"
            );

        const ruanganResult =
            await getJSON(
                "getRuanganByGedung",
                {
                    kodeGedung
                }
            );

        const gedungList =
            gedungResult.data ||
            gedungResult ||
            [];

        const gedung =
            gedungList.find(
                g =>
                String(
                    g.KODE_GEDUNG
                ) ===
                String(
                    kodeGedung
                )
            ) || {};

        const ruangan =
            ruanganResult.data ||
            ruanganResult ||
            [];

        let rows = "";

        ruangan.forEach(
            (
                r,
                index
            )=>{

                rows += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>

                    <td>

                        ${escapeHtml(
                            r.NAMA_RUANGAN || "-"
                        )}

                    </td>

                    <td>

                        ${escapeHtml(
                            r.JENIS_RUANGAN || "-"
                        )}

                    </td>

                    <td>

                        <button
                            class="btn-primary"
                            onclick="
                                lihatDBRRuangan(
                                    '${r.KODE_RUANGAN}'
                                )
                            "
                        >

                            DBR

                        </button>

                    </td>

                </tr>

                `;

            }
        );

        if(
            rows === ""
        ){

            rows = `

            <tr>

                <td
                    colspan="4"
                    style="
                        text-align:center;
                    "
                >

                    Belum Ada Ruangan

                </td>

            </tr>

            `;

        }

        setContent(`

        <div class="card">

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    flex-wrap:wrap;
                    gap:10px;
                "
            >

                <h2>

                    DETAIL GEDUNG

                </h2>

                <button
                    class="btn-primary"
                    onclick="loadHome()"
                >

                    Kembali

                </button>

            </div>

            <br>

            <table>

                <tbody>

                    <tr>

                        <td
                            style="
                                width:220px;
                                font-weight:bold;
                            "
                        >
                            Kode Gedung
                        </td>

                        <td>

                            ${escapeHtml(
                                gedung.KODE_GEDUNG || "-"
                            )}

                        </td>

                    </tr>

                    <tr>

                        <td
                            style="
                                font-weight:bold;
                            "
                        >
                            Nama Gedung
                        </td>

                        <td>

                            ${escapeHtml(
                                gedung.NAMA_GEDUNG || "-"
                            )}

                        </td>

                    </tr>

                    <tr>

                        <td
                            style="
                                font-weight:bold;
                            "
                        >
                            Jumlah Ruangan
                        </td>

                        <td>

                            ${ruangan.length}

                        </td>

                    </tr>

                </tbody>

            </table>

            <br>

            <div
                style="
                    display:flex;
                    gap:10px;
                    flex-wrap:wrap;
                "
            >

                <button
                    class="btn-primary"
                    onclick="
                        lihatDBRGedung(
                            '${kodeGedung}'
                        )
                    "
                >

                    DBR Gedung

                </button>

                <button
                    class="btn-primary"
                    onclick="
                        bukaPerawatan(
                            '${kodeGedung}',
                            '${escapeHtml(
                                gedung.NAMA_GEDUNG || ""
                            )}'
                        )
                    "
                >

                    Perawatan Gedung

                </button>

            </div>

            <br><br>

            <h3>

                Daftar Ruangan

            </h3>

            <br>

            <table>

                <thead>

                    <tr>

                        <th>No</th>

                        <th>Nama Ruangan</th>

                        <th>Jenis Ruangan</th>

                        <th>DBR</th>

                    </tr>

                </thead>

                <tbody>

                    ${rows}

                </tbody>

            </table>

        </div>

        `);

    }catch(err){

        console.error(
            err
        );

        showError(
            err
        );

    }

}

/* =====================================================
   BAGIAN 4
   MODAL PERAWATAN GEDUNG
===================================================== */

async function bukaPerawatan(
    kodeGedung,
    namaGedung
){

    try{

        openModal(`

        <div>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                "
            >

                <div>

                    <h2>
                        PERAWATAN GEDUNG
                    </h2>

                    <h3>
                        ${escapeHtml(
                            namaGedung
                        )}
                    </h3>

                </div>

                <button
                    class="btn-primary"
                    onclick="
                        closeModal()
                    "
                >

                    Tutup

                </button>

            </div>

            <!-- ==========================
                 TABEL 1 MONEV
            =========================== -->

            <div class="card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    "
                >

                    <h3>
                        Monitoring dan Evaluasi Gedung
                    </h3>

                    <button
                        class="btn-primary"
                        onclick="
                            downloadExcelMonev()
                        "
                    >

                        Download Excel

                    </button>

                </div>

                <br>

                <table>

                    <thead>

                        <tr>

                            <th>No</th>
                            <th>Instrumen Monev</th>
                            <th>Kondisi</th>
                            <th>Keterangan</th>

                        </tr>

                    </thead>

                    <tbody
                        id="tblMonevGedung"
                    >

                        <tr>

                            <td
                                colspan="4"
                            >

                                Loading Data...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            <br>

            <!-- ==========================
                 TABEL 2 ASET
            =========================== -->

            <div class="card">

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    "
                >

                    <h3>
                        Daftar Barang Per Ruangan
                    </h3>

                    <button
                        class="btn-primary"
                        onclick="
                            downloadExcelAset()
                        "
                    >

                        Download Excel

                    </button>

                </div>

                <br>

                <table>

                    <thead>

                        <tr>

                            <th>No</th>
                            <th>Ruangan</th>
                            <th>Nama Aset</th>
                            <th>Jumlah</th>
                            <th>Kondisi</th>
                            <th>Keterangan</th>

                        </tr>

                    </thead>

                    <tbody
                        id="tblAsetPerRuangan"
                    >

                        <tr>

                            <td
                                colspan="6"
                            >

                                Loading Data...

                            </td>

                        </tr>

                    </tbody>

                </table>

                <br>

                <div
                    id="asetPagination"
                >
                </div>

            </div>

            <br>

            <!-- ==========================
                 TABEL 3 RIWAYAT
            =========================== -->

            <div class="card">

                <h3>
                    Riwayat Perawatan
                </h3>

                <br>

                <table>

                    <thead>

                        <tr>

                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Ruangan</th>
                            <th>Aset</th>
                            <th>Keterangan</th>

                        </tr>

                    </thead>

                    <tbody
                        id="tblRiwayatPerawatan"
                    >

                        <tr>

                            <td
                                colspan="5"
                            >

                                Loading Data...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

        `);

        await loadMonevGedung(
            kodeGedung
        );

        await loadTabelAsetPerRuangan(
            kodeGedung
        );

        await loadRiwayatPerawatan(
            kodeGedung
        );

    }catch(err){

        console.error(
            err
        );

        alert(
            "Gagal memuat data perawatan"
        );

    }

}

/* =====================================================
   LOAD MONEV GEDUNG
===================================================== */

async function loadMonevGedung(
    kodeGedung
){

    const instrumen = [

        "Struktur Gedung",
        "Lantai",
        "Dinding",
        "Atap",
        "Pintu",
        "Jendela",
        "Tangga",

        "Listrik",
        "Air",
        "AC / Ventilasi",
        "Pemadam Kebakaran",

        "Keamanan",
        "Kebersihan",

        "Toilet",
        "Parkir",
        "Sarana Disabilitas",
        "Kotak P3K",
        "Internet"

    ];

    let rows = "";

    instrumen.forEach(
        (
            item,
            index
        )=>{

            rows += `

            <tr>

                <td>

                    ${index + 1}

                </td>

                <td>

                    ${item}

                </td>

                <td>

                    -

                </td>

                <td>

                    -

                </td>

            </tr>

            `;

        }
    );

    const el =
        document.getElementById(
            "tblMonevGedung"
        );

    if(el){

        el.innerHTML =
            rows;

    }

}

/* =====================================================
   BAGIAN 5
   TABEL ASET PER RUANGAN + PAGINATION
===================================================== */

async function loadTabelAsetPerRuangan(
    kodeGedung
){

    try{

        const result =
            await getJSON(
                "getMasterAset"
            );

        const semuaAset =
            result.data ||
            result ||
            [];

        asetPerRuanganData =
            semuaAset.filter(
                a =>
                String(
                    a.KODE_GEDUNG
                ) ===
                String(
                    kodeGedung
                )
            );

        currentAsetPage = 1;

        renderAsetPage();

    }catch(err){

        console.error(
            err
        );

        document.getElementById(
            "tblAsetPerRuangan"
        ).innerHTML = `

        <tr>

            <td colspan="6">

                Gagal Memuat Data

            </td>

        </tr>

        `;

    }

}

/* =====================================================
   RENDER PAGE
===================================================== */

function renderAsetPage(){

    const start =
        (
            currentAsetPage - 1
        ) * PAGE_SIZE;

    const end =
        start +
        PAGE_SIZE;

    const pageData =
        asetPerRuanganData.slice(
            start,
            end
        );

    let rows = "";

    pageData.forEach(
        (
            a,
            index
        )=>{

            rows += `

            <tr>

                <td>

                    ${start + index + 1}

                </td>

                <td>

                    ${escapeHtml(
                        a.NAMA_RUANGAN || "-"
                    )}

                </td>

                <td>

                    ${escapeHtml(
                        a.NAMA_BARANG || "-"
                    )}

                </td>

                <td>

                    1

                </td>

                <td>

                    ${escapeHtml(
                        a.KONDISI || "-"
                    )}

                </td>

                <td>

                    ${escapeHtml(
                        a.KETERANGAN || "-"
                    )}

                </td>

            </tr>

            `;

        }
    );

    if(
        rows === ""
    ){

        rows = `

        <tr>

            <td colspan="6">

                Belum Ada Data

            </td>

        </tr>

        `;

    }

    document.getElementById(
        "tblAsetPerRuangan"
    ).innerHTML = rows;

    renderPagination();

}

/* =====================================================
   PAGINATION
===================================================== */

function renderPagination(){

    const totalData =
        asetPerRuanganData.length;

    const totalPage =
        Math.ceil(
            totalData /
            PAGE_SIZE
        );

    const el =
        document.getElementById(
            "asetPagination"
        );

    if(!el) return;

    if(
        totalPage <= 1
    ){

        el.innerHTML = "";

        return;

    }

    el.innerHTML = `

    <div
        style="
            display:flex;
            gap:10px;
            justify-content:center;
            align-items:center;
        "
    >

        <button
            class="btn-primary"
            onclick="prevPageAset()"
        >

            Sebelumnya

        </button>

        <span>

            Halaman
            ${currentAsetPage}
            dari
            ${totalPage}

        </span>

        <button
            class="btn-primary"
            onclick="nextPageAset()"
        >

            Berikutnya

        </button>

    </div>

    `;

}

/* =====================================================
   NEXT PAGE
===================================================== */

function nextPageAset(){

    const totalPage =
        Math.ceil(
            asetPerRuanganData.length /
            PAGE_SIZE
        );

    if(
        currentAsetPage <
        totalPage
    ){

        currentAsetPage++;

        renderAsetPage();

    }

}

/* =====================================================
   PREV PAGE
===================================================== */

function prevPageAset(){

    if(
        currentAsetPage > 1
    ){

        currentAsetPage--;

        renderAsetPage();

    }

}

/* =====================================================
   BAGIAN 6
   RIWAYAT PERAWATAN GEDUNG
===================================================== */

async function loadRiwayatPerawatan(
    kodeGedung
){

    try{

        const result =
            await getJSON(
                "getPerawatanGedung"
            );

        const data =
            (
                result.data ||
                result ||
                []
            ).filter(
                p =>
                String(
                    p.KODE_GEDUNG
                ) ===
                String(
                    kodeGedung
                )
            );

        let rows = "";

        data.forEach(
            (
                p,
                index
            )=>{

                rows += `

                <tr>

                    <td>

                        ${index + 1}

                    </td>

                    <td>

                        ${escapeHtml(
                            p.TANGGAL || "-"
                        )}

                    </td>

                    <td>

                        ${escapeHtml(
                            p.NAMA_RUANGAN || "-"
                        )}

                    </td>

                    <td>

                        ${escapeHtml(
                            p.NAMA_ASET || "-"
                        )}

                    </td>

                    <td>

                        ${escapeHtml(
                            p.KETERANGAN || "-"
                        )}

                    </td>

                </tr>

                `;

            }
        );

        if(
            rows === ""
        ){

            rows = `

            <tr>

                <td colspan="5">

                    Belum Ada Data

                </td>

            </tr>

            `;

        }

        document.getElementById(
            "tblRiwayatPerawatan"
        ).innerHTML = rows;

    }catch(err){

        console.error(
            err
        );

        document.getElementById(
            "tblRiwayatPerawatan"
        ).innerHTML = `

        <tr>

            <td colspan="5">

                Gagal Memuat Data

            </td>

        </tr>

        `;

    }

}

/* =====================================================
   BAGIAN 7
   EXPORT EXCEL
===================================================== */

function downloadExcelMonev(){

    try{

        const table =
            document.querySelector(
                "#tblMonevGedung"
            );

        if(!table){

            alert(
                "Data Monev belum tersedia"
            );

            return;

        }

        let csv =
            "No,Instrumen Monev,Kondisi,Keterangan\n";

        table.querySelectorAll(
            "tr"
        ).forEach(row=>{

            const cols =
                row.querySelectorAll(
                    "td"
                );

            if(
                cols.length
            ){

                let line = [];

                cols.forEach(col=>{

                    line.push(
                        '"' +
                        String(
                            col.innerText
                        )
                        .replace(/"/g,'""')
                        + '"'
                    );

                });

                csv +=
                    line.join(",")
                    + "\n";

            }

        });

        downloadCSV(
            csv,
            "Monev_Gedung.csv"
        );

    }catch(err){

        console.error(err);

        alert(
            "Gagal export Monev"
        );

    }

}

/* =====================================================
   EXPORT ASET
===================================================== */

function downloadExcelAset(){

    try{

        if(
            !asetPerRuanganData.length
        ){

            alert(
                "Data aset kosong"
            );

            return;

        }

        let csv =
            "No,Ruangan,Nama Aset,Jumlah,Kondisi,Keterangan\n";

        asetPerRuanganData.forEach(
            (
                a,
                index
            )=>{

                csv +=

                `"${index+1}",` +

                `"${String(
                    a.NAMA_RUANGAN || ""
                ).replace(/"/g,'""')}",` +

                `"${String(
                    a.NAMA_BARANG || ""
                ).replace(/"/g,'""')}",` +

                `"1",` +

                `"${String(
                    a.KONDISI || ""
                ).replace(/"/g,'""')}",` +

                `"${String(
                    a.KETERANGAN || ""
                ).replace(/"/g,'""')}"`

                + "\n";

            }
        );

        downloadCSV(
            csv,
            "Aset_Per_Ruangan.csv"
        );

    }catch(err){

        console.error(err);

        alert(
            "Gagal export aset"
        );

    }

}

/* =====================================================
   DOWNLOAD CSV
===================================================== */

function downloadCSV(
    csv,
    filename
){

    const blob =
        new Blob(
            [csv],
            {
                type:
                "text/csv;charset=utf-8;"
            }
        );

    const link =
        document.createElement(
            "a"
        );

    const url =
        URL.createObjectURL(
            blob
        );

    link.href =
        url;

    link.download =
        filename;

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

    URL.revokeObjectURL(
        url
    );

}

/* =====================================================
   UTIL FORMAT TANGGAL
===================================================== */

function formatTanggalIndonesia(
    tanggal
){

    if(
        !tanggal
    ){

        return "-";

    }

    try{

        return new Date(
            tanggal
        )
        .toLocaleDateString(
            "id-ID"
        );

    }catch(err){

        return tanggal;

    }

}

/* =====================================================
   UTIL NILAI KOSONG
===================================================== */

function safeValue(
    value
){

    if(
        value === null ||
        value === undefined ||
        value === ""
    ){

        return "-";

    }

    return value;

}

/* =====================================================
   AKHIR PUBLIC.JS
===================================================== */
