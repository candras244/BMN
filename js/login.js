const USERNAME = "admin";
const PASSWORD = "admin123";

document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById(
    "username"
    ).value;

    const password =
    document.getElementById(
    "password"
    ).value;

    if(
        username === USERNAME &&
        password === PASSWORD
    ){

        localStorage.setItem(
        "login",
        "true"
        );

        window.location.href =
        "admin.html";

    }else{

        document.getElementById(
        "message"
        ).innerText =
        "Username atau password salah";

    }

});
