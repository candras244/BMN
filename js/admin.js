loadPage("dashboard");

function logout(){

```
localStorage.removeItem("login");

window.location.href = "login.html";
```

}

async function loadPage(page){

```
const content =
document.getElementById("content");

/* ==========================
   DASHBOARD
========================== */

if(page === "dashboard"){

    const data =
    await getData("getDashboard");

    content.innerHTML = `

    <h2>Dashboard</h2>

    <br>

    <div class="ringkasan">

        <div class="card">
            <h3>${data.totalGedung || 0}</h3>
            <p>Gedung</p>
        </div>

        <div class="card">
            <h3>${data.totalRuang || 0}</h3>
            <p>Ruang</p>
        </div>

        <div class="card">
            <h3>${data.totalAset || 0}</h3>
            <p>Aset</p>
        </div>

    </div>

    `;

    return;
}

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

    return;
}

/* ==========================
   RUANG
========================== */

if(page === "ruang"){

    const ruang =
    await getData("getRuang");

    let html = `

    <h2>Data Ruang</h2>

    <br>

    <table>

        <thead>

            <tr>

                <th>ID Ruang</th>
                <th>Nama Ruang</th>
                <th>Gedung</th>
                <th>Jenis</th>
                <th>Penanggung Jawab</th>

            </tr>

        </thead>

        <tbody>

    `;

    ruang.forEach(item=>{

        html += `

        <tr>

            <td>${item.idRuang}</td>
            <td>${item.namaRuang}</td>
            <td>${item.gedung}</td>
            <td>${item.jenisRuang}</td>
            <td>${item.penanggungJawab}</td>

        </tr>

        `;

    });

    html += `
        </tbody>
    </table>
    `;

    content.innerHTML = html;

    return;
}

/* ==========================
   MASTER ASET
========================== */

if(page === "aset"){

    const aset =
    await getData("getAset");

    let html = `

    <h2>Master Aset</h2>

    <br>

    <input
    type="text"
    id="searchAset"
    placeholder="Cari Barang..."
    onkeyup="filterAset()">

    <br><br>

    <div class="table-wrapper">

    <table id="tableAset">

        <thead>

            <tr>

                <th>Kode</th>
                <th>NUP</th>
                <th>Nama Barang</th>
                <th>Tahun</th>
                <th>Kondisi</th>
                <th>Status</th>
                <th>Gedung</th>
                <th>Ruang</th>

            </tr>

        </thead>

        <tbody>

    `;

    aset.forEach(item=>{

        html += `

        <tr>

            <td>${item.kodeBarang}</td>
            <td>${item.nup}</td>
            <td>${item.namaBarang}</td>
            <td>${item.tahunPerolehan}</td>
            <td>${item.kondisi}</td>
            <td>${item.status}</td>
            <td>${item.gedung}</td>
            <td>${item.ruang}</td>

        </tr>

        `;

    });

    html += `
        </tbody>
    </table>

    </div>
    `;

    content.innerHTML = html;

    return;
}
```

}
function filterAset(){

```
const input =
document.getElementById("searchAset");

if(!input) return;

const filter =
input.value.toUpperCase();

const table =
document.getElementById("tableAset");

const tr =
table.getElementsByTagName("tr");

for(let i=1;i<tr.length;i++){

    const td =
    tr[i].getElementsByTagName("td")[2];

    if(td){

        const txt =
        td.textContent ||
        td.innerText;

        tr[i].style.display =
        txt.toUpperCase().indexOf(filter) > -1
        ? ""
        : "none";

    }

}
```

}
