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

function sendseasons(){
    console.log("invoked sendseasons");
    window.open("Drivers.html", "_self");
}