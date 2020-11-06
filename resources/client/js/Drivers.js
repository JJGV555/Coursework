function searchdriver() {
    console.log("invoked searchdriver")
    var driver = document.getElementById('DriverSelect').value;
    if (driver == 'blank') {
        console.log("a driver must be selected to continue");
    }
}