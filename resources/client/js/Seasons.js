"use strict";
function seasearch() {
    console.log("invoked seasearch")
    var season = document.getElementById('SeasonSelect').value;
    if (season == 'blank') {
        alert("a team must be selected to continue");
    } else {
        const seaname = 1;
        const url = "/seainfo/list/";

        fetch(url + seaname, {
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

function formatDnameList(response){
    console.log("Invoked formatseasoninfoList() ");
    let newJSONArray = [response];
    var dataHTML = "<tr><td>Driver Name</td><td>Team Name</td><td>Engine Manufacturer</td><td>Engine Configuration</td><td>Tyre Manufacturer</td>";
    for (let item of newJSONArray){
        dataHTML += "<tr><td>" + item.FullName + "</td><td>" + item.TeamName + "</td><td>" + item.EManufacturer + "</td><td>" + item.Configuration + "</td><td>" + item.TManufacturer + "</td> </tr>";
    }
    document.getElementById("stats").innerHTML += dataHTML
}