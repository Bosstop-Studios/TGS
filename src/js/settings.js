const fs = require('fs');

var backButton = document.getElementById("back-arrow")
backButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-game');
}); 

var sizeButton = document.getElementById("resize")
sizeButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-resize');
}); 

function graphicsLevel() {
    var list = document.getElementById("sel1").value;
}

function resetData() {
    const json = {
        user: {
            username: "",
            coins: 100,
            xp: 0
        },
        grass: {
            level: 1,
            health: 10,
        },
        game: {
            firstTouch: 0
        },
        settings: {
            graphics: 1
        }
    }
    let data = JSON.stringify(json, null, 2);
    fs.writeFile("./config.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was reset!") }); 
    ipcRenderer.send('open-start');
}