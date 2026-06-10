const API_URL =
"https://script.google.com/macros/s/AKfycbyltMhjE6gH7QKAfQfG4qvswthIZiOlgcEDIMznbpVA-zqD-iQnEbSX3hU492lp5vYbjg/exec";

let selectedGedung = "";

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadAdminPage(
            "dashboard"
        );

    }
);

function loadAdminPage(page){

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

/* ==========================================
   GEDUNG
========================================== */

async function loadGedungAdmin(){

    setPageTitle("Gedung");

    const response =
        await fetch(
            `${API_URL}?action=getGedung`
        );

    const result =
        await response.json();

    let html = `

    <div class="card">

        <h2>Tambah Gedung</h2>

        <input
            id="KODE_GEDUNG"
            placeholder="Kode Gedung">

        <input
            id="NAMA_GEDUNG"
            placeholder="Nama Gedung">

        <textarea
            id="DESKRIPSI_SINGKAT"
            placeholder="Deskripsi Singkat">
        </textarea>

        <input
            type="file"
            id="FOTO_GEDUNG"
            accept="image/*">

        <img
            id="previewGedung"
            style="
                display:none;
                width:120px;
                height:120px;
                object-fit:cover;
                border-radius:8px;
                margin-top:10px;
            ">

        <button
            class="btn-success"
            onclick="simpanGedung()">

            Simpan Gedung

        </button>

    </div>

    <div class="card">

        <h2>Daftar Gedung</h2>

        <table>

            <thead>

                <tr>

                    <th>Kode</th>
                    <th>Foto</th>
                    <th>Nama Gedung</th>
                    <th>Aksi</th>

                </tr>

            </thead>

            <tbody>

    `;

    if(result.success){

        result.data.forEach(item => {

            html += `

            <tr>

                <td>
                    ${item.KODE_GEDUNG}
                </td>

                <td>

                    <img
                        src="${item.FOTO_GEDUNG || ''}"
                        style="
                            width:60px;
                            height:60px;
                            object-fit:cover;
                            border-radius:6px;
                        ">

                </td>

                <td>
                    ${item.NAMA_GEDUNG}
                </td>

                <td>

                    <button
                        class="btn-danger"
                        onclick="
                        hapusGedung(
                        '${item.KODE_GEDUNG}'
                        )">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }

    html += `

            </tbody>

        </table>

    </div>

    `;

    setContent(html);

    const fotoInput =
        document.getElementById(
            "FOTO_GEDUNG"
        );

    if(fotoInput){

        fotoInput.addEventListener(
            "change",
            function(e){

                const file =
                    e.target.files[0];

                if(!file) return;

                const reader =
                    new FileReader();

                reader.onload =
                    function(){

                        const img =
                            document.getElementById(
                                "previewGedung"
                            );

                        img.src =
                            reader.result;

                        img.style.display =
                            "block";

                    };

                reader.readAsDataURL(
                    file
                );

            }
        );

    }

}

async function simpanGedung(){

    let fotoUrl = "";

    const file =
        document.getElementById(
            "FOTO_GEDUNG"
        ).files[0];

    if(file){

        const upload =
            await uploadFoto(file);

        if(upload.success){

            fotoUrl =
                upload.fileUrl;

        }else{

            alert(
                upload.message ||
                "Upload foto gagal"
            );

            return;

        }

    }

    const data = {

        action:"addGedung",

        KODE_GEDUNG:
            document.getElementById(
                "KODE_GEDUNG"
            ).value,

        NAMA_GEDUNG:
            document.getElementById(
                "NAMA_GEDUNG"
            ).value,

        FOTO_GEDUNG:
            fotoUrl,

        DESKRIPSI_SINGKAT:
            document.getElementById(
                "DESKRIPSI_SINGKAT"
            ).value

    };

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify(data)

        });

    const result =
        await response.json();

    if(result.success){

        alert(
            "Gedung berhasil disimpan"
        );

        loadGedungAdmin();

    }

}

async function hapusGedung(kode){

    if(
        !confirm(
            "Hapus gedung ini?"
        )
    ) return;

    await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action:"deleteGedung",

            kode:kode

        })

    });

    loadGedungAdmin();

}

function setPageTitle(title){

    document.getElementById(
        "pageTitle"
    ).innerText = title;

}

function setContent(html){

    document.getElementById(
        "contentArea"
    ).innerHTML = html;

}

function fileToBase64(file){

    return new Promise(
        (resolve,reject)=>{

            const reader =
                new FileReader();

            reader.onload =
                () => resolve(
                    reader.result
                );

            reader.onerror =
                error => reject(error);

            reader.readAsDataURL(
                file
            );

        }
    );

}

async function uploadFoto(file){

    const base64 =
        await fileToBase64(file);

    const response =
        await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:
                "uploadFotoGedung",

                base64:
                base64.split(",")[1],

                fileName:
                file.name,

                mimeType:
                file.type

            })

        });

    return await response.json();

}

function loadDashboard(){

    setPageTitle("Dashboard");

    setContent(`

        <div class="card">

            <h2>Dashboard</h2>

            <p>SIM-DBR Final</p>

        </div>

    `);

}

function loadMasterAset(){

    setPageTitle(
        "Master Aset"
    );

    setContent(`

        <div class="card">

            Master Aset
            (Belum dibuat)

        </div>

    `);

}

function loadStatistikAdmin(){

    setPageTitle(
        "Statistik"
    );

    setContent(`

        <div class="card">

            Statistik
            (Belum dibuat)

        </div>

    `);

}

function loadPengaturan(){

    setPageTitle(
        "Pengaturan"
    );

    setContent(`

        <div class="card">

            Pengaturan
            (Belum dibuat)

        </div>

    `);

}
