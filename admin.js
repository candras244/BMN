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
