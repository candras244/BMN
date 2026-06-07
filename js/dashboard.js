function renderDashboard(content){

    content.innerHTML = `

    <div id="dashboardContainer">

        <div class="card">

            <h2>Dashboard SIM-DBR</h2>

            <p>
                Memuat data...
            </p>

        </div>

    </div>

    `;

    loadDashboard();

}

async function loadDashboard(){

    const result =
        await apiGet(
            "dashboard"
        );

    const container =
        document.getElementById(
            "dashboardContainer"
        );

    if(!result){

        container.innerHTML = `

        <div class="card">

            <h3>
                Data dashboard tidak tersedia
            </h3>

        </div>

        `;

        return;

    }

    container.innerHTML = `

    <div class="stats-grid">

        <div class="card stat-card">

            <h3>Total Gedung</h3>

            <h1>
                ${result.totalGedung || 0}
            </h1>

        </div>

        <div class="card stat-card">

            <h3>Total Ruangan</h3>

            <h1>
                ${result.totalRuangan || 0}
            </h1>

        </div>

        <div class="card stat-card">

            <h3>Total Aset</h3>

            <h1>
                ${result.totalAset || 0}
            </h1>

        </div>

        <div class="card stat-card">

            <h3>Nilai Aset</h3>

            <h1>
                Rp ${Number(
                    result.totalNilai || 0
                ).toLocaleString("id-ID")}
            </h1>

        </div>

    </div>

    <br>

    <div class="stats-grid">

        <div class="card">

            <h3>Kondisi Baik</h3>

            <h1>
                ${result.baik || 0}
            </h1>

        </div>

        <div class="card">

            <h3>Rusak Ringan</h3>

            <h1>
                ${result.rusakRingan || 0}
            </h1>

        </div>

        <div class="card">

            <h3>Rusak Berat</h3>

            <h1>
                ${result.rusakBerat || 0}
            </h1>

        </div>

    </div>

    `;

}
