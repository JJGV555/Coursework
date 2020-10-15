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

