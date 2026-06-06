function logout(){

```
localStorage.removeItem("login");

window.location.href =
"login.html";
```

}

async function loadPage(page){

```
const content =
document.getElementById("content");

if(page === "dashboard"){

    content.innerHTML =
    "<h2>Dashboard</h2><p>Dashboard berhasil dimuat.</p>";

    return;

}

if(page === "gedung"){

    content.innerHTML =
    "<h2>Gedung</h2><p>Menu Gedung berhasil dimuat.</p>";

    return;

}

if(page === "ruang"){

    content.innerHTML =
    "<h2>Ruang</h2><p>Menu Ruang berhasil dimuat.</p>";

    return;

}

if(page === "aset"){

    content.innerHTML =
    "<h2>Master Aset</h2><p>Menu Master Aset berhasil dimuat.</p>";

    return;

}

if(page === "dbr"){

    content.innerHTML =
    "<h2>DBR</h2><p>Menu DBR berhasil dimuat.</p>";

    return;

}

if(page === "statistik"){

    content.innerHTML =
    "<h2>Statistik</h2><p>Menu Statistik berhasil dimuat.</p>";

    return;

}
```

}

loadPage("dashboard");
