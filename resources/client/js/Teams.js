"use strict";
$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
});

function tsearch() {
    console.log("invoked dsearch")
    var driver = document.getElementById('TeamSelect').value;
    if (driver == 'blank') {
        alert("a team must be selected to continue");
    } else {
        const tname = driver;
        const url = "/tinfo/list/";

        fetch(url + tname, {
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
    var dataHTML = "<tr><td>Team Name</td><td>Nationality</td><td>First Year</td><td>Last Year</td><td>Race Starts</td><td>Points</td><td>Wins</td><td>Poles</td><td>Podiums</td><td>Best Qualifying Spot</td><td>Best Race Result</td><td>DNFs</td><td>DNQs</td><td>DSQs</td><td>Best Championship Position</td><td>Number of Drivers' Championships</td><td>Number of Team's Championships</td>";
    for (let item of newJSONArray){
        dataHTML += "<tr><td>"
            + item.TeamName + "</td><td>"
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
            + item.DChampNo + "</td><td>"
            + item.CChampNo + "</td> </tr>";
    }
    document.getElementById("stats").innerHTML += dataHTML
}