function logout() {
    localStorage.removeItem("login");
    window.location.href = "login.html";
}

async function loadPage(page) {

    const content = document.getElementById("content");

    switch(page) {

       case "dashboard":

    try{

        const data =
        await getData("getDashboard");

        content.innerHTML = `

        <h2>Dashboard SIM-DBR</h2>

        <br>

        <div class="ringkasan">

            <div class="card">
                <h3>${data.totalGedung || 0}</h3>
                <p>Total Gedung</p>
            </div>

            <div class="card">
                <h3>${data.totalRuang || 0}</h3>
                <p>Total Ruangan</p>
            </div>

            <div class="card">
                <h3>${data.totalAset || 0}</h3>
                <p>Total Aset</p>
            </div>

            <div class="card">
                <h3>${data.baik || 0}</h3>
                <p>Kondisi Baik</p>
            </div>

            <div class="card">
                <h3>${data.rusakRingan || 0}</h3>
                <p>Rusak Ringan</p>
            </div>

            <div class="card">
                <h3>${data.rusakBerat || 0}</h3>
                <p>Rusak Berat</p>
            </div>

        </div>

        `;

    }catch(error){

        content.innerHTML = `
        <h2>Dashboard</h2>
        <p>Gagal membaca API</p>
        `;

        console.error(error);

    }

    break;

        case "gedung":
            content.innerHTML = "<h2>Gedung</h2><p>Menu Gedung berhasil dimuat.</p>";
            break;

        case "ruang":
            content.innerHTML = "<h2>Ruang</h2><p>Menu Ruang berhasil dimuat.</p>";
            break;

        case "aset":
            content.innerHTML = "<h2>Master Aset</h2><p>Menu Master Aset berhasil dimuat.</p>";
            break;

        case "dbr":
            content.innerHTML = "<h2>DBR</h2><p>Menu DBR berhasil dimuat.</p>";
            break;

        case "statistik":
            content.innerHTML = "<h2>Statistik</h2><p>Menu Statistik berhasil dimuat.</p>";
            break;

        default:
            content.innerHTML = "<h2>SIM-DBR</h2>";
    }
}
