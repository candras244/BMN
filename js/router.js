const routes = {
    dashboard: renderDashboard,
    homepage: renderHomepage,
    gedung: renderGedung,
    ruangan: renderRuangan,
    masteraset: renderMasterAset,
    mutasi: renderMutasi,
    kondisiaset: renderKondisiAset,
    dbr: renderDBR,
    statistik: renderStatistik,
    login: renderLogin
};

function setActiveMenu(page){

    document
        .querySelectorAll(".menu a")
        .forEach(menu => {
            menu.classList.remove("active");
        });

    const activeMenu =
        document.querySelector(
            `.menu a[data-page="${page}"]`
        );

    if(activeMenu){
        activeMenu.classList.add("active");
    }
}

function setBreadcrumb(page){

    const breadcrumb =
        document.getElementById("breadcrumb");

    const labels = {
        dashboard: "Dashboard",
        homepage: "Homepage",
        gedung: "Gedung",
        ruangan: "Ruangan",
        masteraset: "Master Aset",
        mutasi: "Mutasi",
        kondisiaset: "Kondisi Aset",
        dbr: "DBR",
        statistik: "Statistik",
        login: "Login"
    };

    breadcrumb.textContent =
        labels[page] || "Dashboard";
}

function loadPage(page){

    const content =
        document.getElementById("content");

    if(!routes[page]){
        page = "dashboard";
    }

    setActiveMenu(page);

    setBreadcrumb(page);

    content.innerHTML = "";

    routes[page](content);
}

window.addEventListener("hashchange", () => {

    const page =
        location.hash.replace("#","")
        || "dashboard";

    loadPage(page);

});

window.addEventListener("DOMContentLoaded", () => {

    const page =
        location.hash.replace("#","")
        || "dashboard";

    loadPage(page);

});

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    localStorage.removeItem("simdbr_user");

    document.getElementById("userName")
        .textContent = "Guest";

    document.getElementById("userRole")
        .textContent = "Public User";

    showToast("Logout berhasil");

    location.hash = "#login";
});
