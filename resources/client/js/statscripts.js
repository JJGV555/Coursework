function Logout(){
    console.log("Invoked postUserLogout");
    Cookies.remove("token");
    window.open("login.html", "_self");
}

function senddrivers(){
    console.log("invoked senddrivers");
    window.open("Drivers.html", "_self");
}

function sendteams(){
    console.log("invoked sendteams");
    window.open("Teams.html", "_self");
}