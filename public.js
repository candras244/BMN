const API_URL = "https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPage("home");

    }
);

function loadPage(page){

    switch(page){

        case "home":
            loadHome();
            break;

        default:
            loadHome();

    }

}

function setContent(html){

    document.getElementById(
        "content"
    ).innerHTML = html;

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

        const jenisCount = {};
        
            ruangGedung.forEach(r=>{
            
                const jenis =
                    r.JENIS_RUANGAN || "Lainnya";
            
                jenisCount[jenis] =
                    (jenisCount[jenis] || 0) + 1;
            
            });

        const jenisText =
            Object.entries(jenisCount)
            .map(
                ([nama,jumlah]) =>
                `${nama}: ${jumlah}`
            )
            .join("<br>");
        
            rows += `
    
    <tr>
    
        <td>
            ${g.NAMA_GEDUNG}
        </td>
    
        <td>
            ${jenisText}
        </td>
    
        <td>
    
            <button
                class="btn-primary"
                disabled>
    
                DBR
    
            </button>
    
        </td>
    
        <td>
    
            <button
                class="btn-primary"
                onclick="
                    showRuanganByGedung(
                        '${g.KODE_GEDUNG}',
                        '${g.NAMA_GEDUNG}'
                    )
                ">
    
                Ruangan
    
            </button>
    
        </td>
    
    </tr>
    
    `;

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
                        Jenis Ruangan
                    </th>
    
                    <th>
                        DBR Gedung
                    </th>
    
                    <th>
                        Ruangan
                    </th>
    
                </tr>
    
            </thead>
    
            <tbody>
    
                ${rows}
    
            </tbody>
    
        </table>
    
    </div>
    
    `);
