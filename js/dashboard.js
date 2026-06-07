function renderDashboard(content){

    content.innerHTML = `
    
    <div class="grid">

        <div class="stat-card">
            <h3>Total Gedung</h3>
            <h2 id="totalGedung">0</h2>
        </div>

        <div class="stat-card">
            <h3>Total Ruangan</h3>
            <h2 id="totalRuangan">0</h2>
        </div>

        <div class="stat-card">
            <h3>Total Aset</h3>
            <h2 id="totalAset">0</h2>
        </div>

        <div class="stat-card">
            <h3>Nilai Aset</h3>
            <h2 id="nilaiAset">Rp 0</h2>
        </div>

    </div>

    <br>

    <div class="card">

        <h2>Dashboard SIM-DBR</h2>

        <br>

        <p>
            Sistem Informasi Manajemen Daftar Barang Ruangan.
        </p>

        <br>

        <p>
            Dashboard menampilkan ringkasan data aset,
            gedung, ruangan, dan statistik inventaris.
        </p>

    </div>

    <br>

    <div class="card">

        <h3>Aktivitas Terakhir</h3>

        <br>

        <div id="aktivitasTerakhir">
            Belum ada aktivitas.
        </div>

    </div>

    `;

    loadDashboardData();
}

async function loadDashboardData(){

    try{

        const result =
            await apiGet("getDashboard");

        if(result.success){

            document.getElementById("totalGedung")
                .textContent =
                result.totalGedung || 0;

            document.getElementById("totalRuangan")
                .textContent =
                result.totalRuangan || 0;

            document.getElementById("totalAset")
                .textContent =
                result.totalAset || 0;

            document.getElementById("nilaiAset")
                .textContent =
                formatRupiah(
                    result.nilaiAset || 0
                );

            if(result.aktivitas){

                let html = "";

                result.aktivitas.forEach(item => {

                    html += `
                    <p>
                        ${item}
                    </p>
                    `;
                });

                document.getElementById(
                    "aktivitasTerakhir"
                ).innerHTML = html;
            }
        }

    }catch(error){

        console.error(error);

    }
}
