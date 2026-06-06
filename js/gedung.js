const API = "URL_API_ANDA";

async function loadGedung(){

    try{

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
                ruangan.filter(
                    r => r.Gedung === g["ID Gedung"]
                ).length;

            const jumlahAset =
                aset.filter(
                    a => a.Gedung === g["ID Gedung"]
                ).length;

            html += `
            <tr>
                <td>${g["ID Gedung"]}</td>
                <td>${g["Nama Gedung"]}</td>
                <td>${jumlahRuangan}</td>
                <td>${jumlahAset}</td>
                <td>
                    <button onclick="
                    location.href='ruangan.html?gedung=${g["ID Gedung"]}'
                    ">
                    Detail
                    </button>
                </td>
            </tr>
            `;
        });

        document.getElementById("dataGedung").innerHTML = html;

    }catch(err){

        document.getElementById("dataGedung").innerHTML =
        `
        <tr>
            <td colspan="5">
                Gagal memuat data
            </td>
        </tr>
        `;

        console.error(err);

    }

}

loadGedung();
