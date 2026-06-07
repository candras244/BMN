function renderLogin(content){

    const user =
        JSON.parse(
            localStorage.getItem(
                "simdbr_user"
            )
        );

    if(user){

        content.innerHTML = `

        <div class="card">

            <h2>Informasi Pengguna</h2>

            <br>

            <table>

                <tr>
                    <td width="200">
                        Nama
                    </td>
                    <td>
                        ${user.nama}
                    </td>
                </tr>

                <tr>
                    <td>
                        Username
                    </td>
                    <td>
                        ${user.username}
                    </td>
                </tr>

                <tr>
                    <td>
                        Role
                    </td>
                    <td>
                        ${user.role}
                    </td>
                </tr>

            </table>

        </div>

        `;

        return;
    }

    content.innerHTML = `

    <div class="card" style="max-width:500px;margin:auto;">

        <h2>Login SIM-DBR</h2>

        <br>

        <div class="form-group">

            <label>Username</label>

            <input
            type="text"
            id="loginUsername"
            class="form-control">

        </div>

        <div class="form-group">

            <label>Password</label>

            <input
            type="password"
            id="loginPassword"
            class="form-control">

        </div>

        <br>

        <button
        class="btn btn-primary"
        onclick="prosesLogin()">
            Login
        </button>

    </div>

    `;
}

async function prosesLogin(){

    const username =
        document.getElementById(
            "loginUsername"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    if(
        !username ||
        !password
    ){

        showToast(
            "Username dan password wajib diisi"
        );

        return;
    }

    const result =
        await apiPost({

            action:"login",

            payload: {
            
                username:username,

                password:password

            }
            
        });

    if(!result.success){

        showToast(
            result.message ||
            "Login gagal"
        );

        return;
    }

    localStorage.setItem(
        "simdbr_user",
        JSON.stringify({

            nama: result.nama,

            username: username,

            role: resukt.role
            
        })
    );

    document.getElementById(
        "userName"
    ).textContent =
        result.user.nama;

    document.getElementById(
        "userRole"
    ).textContent =
        result.user.role;

    showToast(
        "Login berhasil"
    );

    location.hash =
        "#dashboard";
}

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "simdbr_user"
                )
            );

        if(!user){
            return;
        }

        document.getElementById(
            "userName"
        ).textContent =
            user.nama;

        document.getElementById(
            "userRole"
        ).textContent =
            user.role;
    }
);
