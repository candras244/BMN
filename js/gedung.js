const API = "https://script.google.com/macros/s/AKfycbxxkkCc8yKm8qE2_jMZnXcTomj08U__PPPYInhqKWJCVhayRCTspt-QLtbkrEkv5HKUXw/exec";

async function loadGedung() {

    const tbody = document.getElementById("dataGedung");

    tbody.innerHTML = `
        <tr>
            <td colspan="5">Memuat data...</td>
        </tr>
    `;

    try {

        const [gedungRes, ruanganRes, asetRes] = await Promise.all([
            fetch(API + "?action=gedung"),
            fetch(API + "?action=ruangan"),
            fetch(API + "?action=master")
        ]);

        const gedung = await gedungRes.json();
        const ruangan = await ruanganRes.json();
        const aset = await asetRes.json();

        let html = "";

        gedung.forEach(g => {

            const jumlahRuangan = ruangan.filter(r =>
                r["Gedung"] === g["ID Gedung"]
            ).length;

            const jumlahAset = aset.filter(a =>
                a["Gedung"] === g["ID Gedung"]
            ).length;

            html += `
            <tr>
                <td>${g["ID Gedung"]}</td>
                <td>${g["Nama Gedung"]}</td>
                <td>${jumlahRuangan}</td>
                <td>${jumlahAset}</td>
                <td>
                    <button onclick="lihatRuangan('${g["ID Gedung"]}')">
                        Detail
                    </button>
                </td>
            </tr>
            `;
        });

        if (html === "") {
            html = `
            <tr>
                <td colspan="5">
                    Tidak ada data gedung
                </td>
            </tr>
            `;
        }

        tbody.innerHTML = html;

    } catch (error) {

        console.error(error);

        tbody.innerHTML = `
        <tr>
            <td colspan="5">
                Gagal memuat data dari API
            </td>
        </tr>
        `;
    }
}

function lihatRuangan(idGedung) {
    window.location.href =
        "ruangan.html?gedung=" + encodeURIComponent(idGedung);
}

loadGedung();
