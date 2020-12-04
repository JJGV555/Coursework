"use strict";
$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});

function dsearch() {
    console.log("invoked dsearch")
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

function formatDnameList(response){
    console.log("Invoked formatDnameList() ");
    let newJSONArray = [response];
    var dataHTML = "<tr><td>Driver Name</td><td>Nationality</td><td>First Year</td><td>Last Year</td><td>Race Starts</td><td>Points</td><td>Wins</td><td>Poles</td><td>Podiums</td><td>Best Qualifying Spot</td><td>Best Race Result</td><td>DNFs</td><td>DNQs</td><td>DSQs</td><td>Best Championship Position</td><td>Number of Championships</td>";
    for (let item of newJSONArray){
        dataHTML += "<tr><td>"
            + item.Name + "</td><td>"
            + item.Nationality + "</td><td>"
            + item.FirstYear + "</td><td>"
            + item.LastYear + "</td><td>"
            + item.RaceStarts + "</td><td>"
            + item.Points + "</td><td>"
            + item.Wins + "</td><td>"
            + item.Poles + "</td><td>"
            + item.Podiums + "</td><td>"
            + item.BestQuali + "</td><td>"
            + item.BestResult + "</td><td>"
            + item.DNFs + "</td><td>"
            + item.DNQs + "</td><td>"
            + item.DSQs + "</td><td>"
            + item.BestChampPos + "</td><td>"
            + item.ChampionshipNo + "</td> </tr>";
    }
    document.getElementById("stats").innerHTML += dataHTML
}