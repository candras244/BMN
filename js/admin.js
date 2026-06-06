loadPage("dashboard");
/* ==========================
   GEDUNG
========================== */

if(page === "gedung"){

    const gedung =
    await getData("getGedung");

    let html = `

    <h2>Data Gedung</h2>

    <br>

    <div class="gedung-grid">

    `;

    gedung.forEach(item=>{

        html += `

        <div class="gedung-card">

            <img
            src="${item.fotoGedung}"
            alt="${item.namaGedung}">

            <div class="gedung-info">

                <h3>
                ${item.namaGedung}
                </h3>

            </div>

        </div>

        `;

    });

    html += `</div>`;

    content.innerHTML = html;

}
function logout(){

    localStorage.removeItem(
    "login"
    );

    window.location.href =
    "login.html";

}

async function loadPage(page){

    const content =
    document.getElementById(
    "content"
    );

    if(page === "dashboard"){

        const data =
        await getData(
        "getDashboard"
        );

        content.innerHTML = `

        <h2>Dashboard</h2>

        <br>

        <div class="ringkasan">

            <div class="card">

                <h3>
                ${data.totalGedung}
                </h3>

                <p>Gedung</p>

            </div>

            <div class="card">

                <h3>
                ${data.totalRuang}
                </h3>

                <p>Ruang</p>

            </div>

            <div class="card">

                <h3>
                ${data.totalAset}
                </h3>

                <p>Aset</p>

            </div>

        </div>

        `;

    }

}
