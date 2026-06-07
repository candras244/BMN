function renderDBR(content){

    content.innerHTML = `

    <div class="card">
        <h2>Daftar Barang Ruangan (DBR)</h2>
        <p>Pilih gedung untuk melihat DBR setiap ruangan.</p>
    </div>

    <br>

    <div id="dbrContainer">

        <div class="card">
            Memuat data gedung...
        </div>

    </div>

    `;

    loadDBR();
}

async function loadDBR(){

    const result =
        await apiGet("getDBRGedung");

    const container =
        document.getElementById("dbrContainer");

    if(!result.success){

        container.innerHTML = `
        <div class="card">
            Data tidak ditemukan
        </div>
        `;

        return;
    }

    let html = "";

    result.data.forEach(gedung => {

        html += `

        <div class="card" style="margin-bottom:15px;">

            <div
            style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            cursor:pointer;
            "
            onclick="toggleGedung('${gedung.kodeGedung}')">

                <h3>${gedung.namaGedung}</h3>

                <span id="icon-${gedung.kodeGedung}">
                    +
                </span>

            </div>

            <div
            id="gedung-${gedung.kodeGedung}"
            style="display:none;margin-top:15px;">

            </div>

        </div>

        `;
    });

    container.innerHTML = html;
}

async function toggleGedung(kodeGedung){

    const panel =
        document.getElementById(
            `gedung-${kodeGedung}`
        );

    const icon =
        document.getElementById(
            `icon-${kodeGedung}`
        );

    if(panel.style.display === "block"){

        panel.style.display = "none";

        icon.textContent = "+";

        return;
    }

    panel.style.display = "block";

    icon.textContent = "-";

    panel.innerHTML = `
    <div class="card">
        Memuat ruangan...
    </div>
    `;

    const result =
        await apiGet(
            "getDBRRuangan",
            {
                kodeGedung:kodeGedung
            }
        );

    if(!result.success){

        panel.innerHTML = `
        <div class="card">
            Data ruangan tidak ditemukan
        </div>
        `;

        return;
    }

    let html = "";

    result.data.forEach(ruangan => {

        html += `

        <div
        class="card"
        style="margin-bottom:10px;">

            <div
            style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            cursor:pointer;
            "
            onclick="toggleRuangan('${ruangan.kodeRuangan}')">

                <h4>${ruangan.namaRuangan}</h4>

                <span
                id="icon-ruang-${ruangan.kodeRuangan}">
                +
                </span>

            </div>

            <div
            id="ruangan-${ruangan.kodeRuangan}"
            style="display:none;margin-top:15px;">

            </div>

        </div>

        `;
    });

    panel.innerHTML = html;
}

async function toggleRuangan(kodeRuangan){

    const panel =
        document.getElementById(
            `ruangan-${kodeRuangan}`
        );

    const icon =
        document.getElementById(
            `icon-ruang-${kodeRuangan}`
        );

    if(panel.style.display === "block"){

        panel.style.display = "none";

        icon.textContent = "+";

        return;
    }

    panel.style.display = "block";

    icon.textContent = "-";

    const result =
        await apiGet(
            "getDBRPdf",
            {
                kodeRuangan:kodeRuangan
            }
        );

    if(!result.success){

        panel.innerHTML = `
        <div class="card">
            PDF DBR belum tersedia
        </div>
        `;

        return;
    }

    panel.innerHTML = `

    <iframe
    src="${result.pdfUrl}"
    width="100%"
    height="700"
    style="
    border:none;
    border-radius:10px;
    ">
    </iframe>

    `;
}
