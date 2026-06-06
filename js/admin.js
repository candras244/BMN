function logout() {
localStorage.removeItem("login");
window.location.href = "login.html";
}

async function loadPage(page) {

```
const content = document.getElementById("content");

switch(page) {

    case "dashboard":
        content.innerHTML = "<h2>Dashboard</h2><p>Dashboard berhasil dimuat.</p>";
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
```

}

loadPage("dashboard");
