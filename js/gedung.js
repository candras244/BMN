const API =
"https://script.google.com/macros/s/XXXXXXXXXXXX/exec";

async function loadGedung(){

    const gedungRes =
    await fetch(API + "?action=gedung");

    const gedung =
    await gedungRes.json();

    const ruangRes =
    await fetch(API + "?action=ruangan");

    const ruangan =
    await ruangRes.json();

    const asetRes =
    await fetch(API + "?action=master");

    const aset =
    await asetRes.json();

    let html = "";

    gedung.forEach(g => {

        const jumlahRuangan =
        ruangan.filter(r =>
            r.Gedung === g["ID Gedung"]
        ).length;

        const jumlahAset =
        aset.filter(a =>
            a.Gedung === g["ID Gedung"]
        ).length;

        html += `
        <tr>
            <td>${g["ID Gedung"]}</td>
            <td>${g["Nama Gedung"]}</td>
            <td>${jumlahRuangan}</td>
            <td>${jumlahAset}</td>
            <td>
              <a href="ruangan.html?gedung=${g["ID Gedung"]}">
                Detail
              </a>
            </td>
        </tr>
        `;
    });

    document
      .getElementById("dataGedung")
      .innerHTML = html;
}

loadGedung();
