const API_URL = "https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

document.addEventListener("DOMContentLoaded", () => {
    loadAdminPage("dashboard");
});

function loadAdminPage(page){

    document.getElementById("pageTitle").innerText = page;

    switch(page){

        case "dashboard":
            loadDashboard();
            break;

        case "masteraset":
            loadMasterAset();
            break;

        case "gedung":
            loadGedungAdmin();
            break;

        case "dbr":
            loadDBRAdmin();
            break;

        case "statistik":
            loadStatistikAdmin();
            break;

        case "pengaturan":
            loadPengaturan();
            break;

        default:
            loadDashboard();

    }

}

function loadDashboard(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Dashboard SIM-DBR</h2>
            <p>Selamat datang di Sistem Informasi Daftar Barang Ruangan</p>
        </div>
    `;

}

function loadMasterAset(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Master Aset</h2>
        </div>
    `;

}

function loadGedungAdmin(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Gedung</h2>
        </div>
    `;

}

function loadDBRAdmin(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>DBR</h2>
        </div>
    `;

}

function loadStatistikAdmin(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Statistik</h2>
        </div>
    `;

}

function loadPengaturan(){

    document.getElementById("contentArea").innerHTML = `
        <div class="card">
            <h2>Pengaturan</h2>
        </div>
    `;

}
