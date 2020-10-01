function postUserLogin() {
    console.log("Invoked postUserLogin() ");

    var url = "/user/login";
    var formData = new FormData(document.getElementById('loginForm'));

    fetch(url, {
        method: "POST",
        body: formData,
    }).then(response => {
        return response.json();
}).then(response => {
        if (response.hasOwnProperty("Error")) {
        alert(JSON.stringify(response));
    } else {
        Cookies.set("token", response.token);
        Cookies.set("username", response.username);
        window.open("stats.html", "_self");
    }
});
}

function postUserLogout(){
    console.log("Invoked postUserLogout");

    const url = "/user/logout";

    fetch(url, {
        method: "POST",
    }).then(response => {
        return response.json();
}).then(response => {
        if(response.hasOwnProperty("Error"))
    {
        alert(JSON.stringify(response));
    } else {
        Cookies.set("token", response.token);
        window.open("login.html", "_self");
    }
});
}
