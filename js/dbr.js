function renderDBR(content){

    content.innerHTML = `

    <div class="card">

        <h2>Daftar DBR Gedung</h2>

    </div>

    <br>

    <div id="dbrContainer">

        Memuat data...

    </div>

    `;

    loadDBRGedung();

}

async function loadDBRGedung(){

    const gedung =
        await apiGet(
            "gedung"
        );

    const container =
        document.getElementById(
            "dbrContainer"
        );

    if(
        !Array.isArray(
            gedung
        )
    ){

        container.innerHTML =
            "Data gedung tidak ditemukan";

        return;

    }

    let html = "";

    for(
        const item of gedung
    ){

        const dbr =
            await apiGet(
                "dbrGedung",
                {
                    kodeGedung:
                    item.kodeGedung
                }
            );

        let ruangHtml = "";

        if(
            Array.isArray(dbr)
        ){

            dbr.forEach(ruang=>{

                ruangHtml += `

                <details
                class="card"
                style="margin-top:10px;">

                    <summary>

                        ${ruang.namaRuang}

                    </summary>

                    <br>

                    ${
                        ruang.pdfUrl
                        ?

                        `<iframe
                        src="${ruang.pdfUrl}"
                        width="100%"
                        height="600"
                        style="border:none;">
                        </iframe>`

                        :

                        `<p>
                        DBR belum tersedia
                        </p>`
                    }

                </details>

                `;

            });

        }

        html += `

        <div class="card">

            <h3>

                ${item.namaGedung}

            </h3>

            ${ruangHtml}

        </div>

        <br>

        `;

    }

    container.innerHTML = html;

}
