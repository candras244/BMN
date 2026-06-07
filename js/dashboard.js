function renderStatistik(content){

    content.innerHTML = `

    <div id="statistikContainer">

        <div class="card">

            <h2>Statistik Aset</h2>

            <p>Memuat data...</p>

        </div>

    </div>

    `;

    loadStatistik();

}

async function loadStatistik(){

    const result =
        await apiGet(
            "statistik"
        );

    const container =
        document.getElementById(
            "statistikContainer"
        );

    if(!result){

        container.innerHTML = `

        <div class="card">

            <h3>
                Data statistik tidak tersedia
            </h3>

        </div>

        `;

        return;

    }

    let kondisiHtml = "";
    let gedungHtml = "";
    let ruanganHtml = "";
    let merkHtml = "";
    let usiaHtml = "";
    let hapusHtml = "";

    (result.kondisi || []).forEach(item=>{

        kondisiHtml += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.jumlah}</td>

        </tr>

        `;

    });

    (result.gedung || []).forEach(item=>{

        gedungHtml += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.jumlah}</td>

        </tr>

        `;

    });

    (result.ruangan || []).forEach(item=>{

        ruanganHtml += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.jumlah}</td>

        </tr>

        `;

    });

    (result.merk || []).forEach(item=>{

        merkHtml += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.jumlah}</td>

        </tr>

        `;

    });

    (result.usia || []).forEach(item=>{

        usiaHtml += `

        <tr>

            <td>${item.nama}</td>

            <td>${item.jumlah}</td>

        </tr>

        `;

    });

    (result.penghapusan || []).forEach(item=>{

        hapusHtml += `

        <tr>

            <td>${item.idAset}</td>

            <td>${item.namaBarang}</td>

            <td>${item.kondisi}</td>

            <td>${item.tahun}</td>

        </tr>

        `;

    });

    container.innerHTML = `

    <div class="stats-grid">

        <div class="card">

            <h3>Total Gedung</h3>

            <h1>${result.totalGedung}</h1>

        </div>

        <div class="card">

            <h3>Total Ruangan</h3>

            <h1>${result.totalRuangan}</h1>

        </div>

        <div class="card">

            <h3>Total Aset</h3>

            <h1>${result.totalAset}</h1>

        </div>

        <div class="card">

            <h3>Nilai Aset</h3>

            <h1>

                Rp ${Number(
                    result.totalNilai || 0
                ).toLocaleString("id-ID")}

            </h1>

        </div>

    </div>

    <br>

    <div class="card">

        <h3>Statistik Kondisi</h3>

        <table>

            <tr>
                <th>Kondisi</th>
                <th>Jumlah</th>
            </tr>

            ${kondisiHtml}

        </table>

    </div>

    <br>

    <div class="card">

        <h3>Statistik Gedung</h3>

        <table>

            <tr>
                <th>Gedung</th>
                <th>Jumlah</th>
            </tr>

            ${gedungHtml}

        </table>

    </div>

    <br>

    <div class="card">

        <h3>Statistik Ruangan</h3>

        <table>

            <tr>
                <th>Ruangan</th>
                <th>Jumlah</th>
            </tr>

            ${ruanganHtml}

        </table>

    </div>

    <br>

    <div class="card">

        <h3>Top Merk</h3>

        <table>

            <tr>
                <th>Merk</th>
                <th>Jumlah</th>
            </tr>

            ${merkHtml}

        </table>

    </div>

    <br>

    <div class="card">

        <h3>Usia Aset</h3>

        <table>

            <tr>
                <th>Kategori</th>
                <th>Jumlah</th>
            </tr>

            ${usiaHtml}

        </table>

    </div>

    <br>

    <div class="card">

        <h3>Usulan Penghapusan</h3>

        <table>

            <tr>

                <th>ID Aset</th>
                <th>Nama Barang</th>
                <th>Kondisi</th>
                <th>Tahun</th>

            </tr>

            ${hapusHtml}

        </table>

    </div>

    `;

}
