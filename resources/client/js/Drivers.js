"use strict";
function searchdriver() {
    console.log("invoked searchdriver")
    var driver = document.getElementById('DriverSelect').value;
    if (driver == 'blank') {
        console.log("a driver must be selected to continue");
    } else {
        const dname = driver;
        const url = "/dinfo/list/";

        fetch(url + dname, {
            method: "GET",
        }).then(response => {
            return response.json();
        }).then(response => {
            if (response.hasOwnProperty("Error")) {
                alert(JSON.stringify(response));
            } else {
                formatDnameList(response);
            }
        })
    }
}