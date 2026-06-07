function renderStatistik(content){

    content.innerHTML = `

    <div class="grid">

        <div class="stat-card">
            <h3>Total Aset</h3>
            <h2 id="statTotalAset">0</h2>
        </div>

        <div class="stat-card">
            <h3>Nilai Aset</h3>
            <h2 id="statNilaiAset">Rp 0</h2>
        </div>

        <div class="stat-card">
            <h3>Total Gedung</h3>
            <h2 id="statTotalGedung">0</h2>
        </div>

        <div class="stat-card">
            <h3>Total Ruangan</h3>
            <h2 id="statTotalRuangan">0</h2>
        </div>

    </div>

    <br>

    <div class="card">

        <h3>Aset Berdasarkan Kondisi</h3>

        <br>

        <div id="kondisiAsetContainer">
            Memuat data...
        </div>

    </div>

    <br>

    <div class="card">

        <h3>Aset Berdasarkan Gedung</h3>

        <br>

        <div id="gedungStatistikContainer">
            Memuat data...
        </div>

    </div>

    <br>

    <div class="card">

        <h3>Aset Berdasarkan Ruangan</h3>

        <br>

        <div id="ruanganStatistikContainer">
            Memuat data...
        </div>

    </div>

    <br>

    <div class="card">

        <h3>Top Ruangan Berdasarkan Jumlah Aset</h3>

        <br>

        <div id="topRuanganContainer">
            Memuat data...
        </div>

    </div>

    <br>

    <div class="card">

        <h3>Aset Berdasarkan Tahun Perolehan</h3>

        <br>

        <div id="tahunStatistikContainer">
            Memuat data...
        </div>

    </div>

    `;

    loadStatistik();
}

async function loadStatistik(){

    const result =
        await apiGet("getStatistik");

    if(!result.success){

        showToast(
            "Data statistik tidak ditemukan"
        );

        return;
    }

    document.getElementById(
        "statTotalAset"
    ).textContent =
        result.totalAset || 0;

    document.getElementById(
        "statNilaiAset"
    ).textContent =
        formatRupiah(
            result.nilaiAset || 0
        );

    document.getElementById(
        "statTotalGedung"
    ).textContent =
        result.totalGedung || 0;

    document.getElementById(
        "statTotalRuangan"
    ).textContent =
        result.totalRuangan || 0;

    renderKondisiStatistik(
        result.kondisi || []
    );

    renderGedungStatistik(
        result.gedung || []
    );

    renderRuanganStatistik(
        result.ruangan || []
    );

    renderTopRuangan(
        result.topRuangan || []
    );

    renderTahunStatistik(
        result.tahun || []
    );
}

function renderKondisiStatistik(data){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Kondisi</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.kondisi}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "kondisiAsetContainer"
    ).innerHTML = html;
}

function renderGedungStatistik(data){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Gedung</th>
                <th>Jumlah Aset</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.namaGedung}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "gedungStatistikContainer"
    ).innerHTML = html;
}

function renderRuanganStatistik(data){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Ruangan</th>
                <th>Jumlah Aset</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.namaRuangan}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "ruanganStatistikContainer"
    ).innerHTML = html;
}

function renderTopRuangan(data){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Ruangan</th>
                <th>Jumlah Aset</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.namaRuangan}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "topRuanganContainer"
    ).innerHTML = html;
}

function renderTahunStatistik(data){

    let html = `
    <table>
        <thead>
            <tr>
                <th>Tahun</th>
                <th>Jumlah Aset</th>
            </tr>
        </thead>
        <tbody>
    `;

    data.forEach(item=>{

        html += `
        <tr>
            <td>${item.tahun}</td>
            <td>${item.jumlah}</td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    document.getElementById(
        "tahunStatistikContainer"
    ).innerHTML = html;
}
