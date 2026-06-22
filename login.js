const API_URL =
"https://script.google.com/macros/s/AKfycbxzBRWFCeSGayQi7SfBHbYHYudpwkMnPd_2DyDGJtEM5-nQoOQnW0884PSRiCburnPB/exec";

async function login(){

    try{

        const username =
            document.getElementById(
                "username"
            ).value
            .trim();

        const password =
            document.getElementById(
                "password"
            ).value
            .trim();

        if(
            !username ||
            !password
        ){

            alert(
                "Username dan Password wajib diisi"
            );

            return;

        }

        const response =
            await fetch(

                `${API_URL}?action=login&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`

            );

        const result =
            await response.json();

        if(
            !result.success
        ){

            alert(
                result.message ||
                "Login gagal"
            );

            return;

        }

        localStorage.setItem(
            "SIMDBR_LOGIN",
            "true"
        );

        localStorage.setItem(
            "SIMDBR_NAMA",
            result.nama || ""
        );

        localStorage.setItem(
            "SIMDBR_ROLE",
            result.role || ""
        );

        localStorage.setItem(
            "SIMDBR_KODE_GEDUNG",
            result.kodeGedung || ""
        );

        window.location.href =
            "admin.html";

    }catch(err){

        alert(
            "ERROR : " + err
        );

    }

}
