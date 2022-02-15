const fs = require('fs');

let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

window.onload = function() {
    document.getElementById("info-playtime-min").innerHTML = db.game.playTime;
    document.getElementById("handSelector").value = db.settings.hand;
};

var backButton = document.getElementById("back-arrow")
backButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-game');
}); 

const sizes = {
    width: document.getElementById("resize-width").value,
    height: document.getElementById("resize-height").value
}

var sizeButton = document.getElementById("resize-btn")
sizeButton.addEventListener("click", function (e) {
    ipcRenderer.send('resize-window', sizes);
}); 

/*
var updateButton = document.getElementById("update")
updateButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-update');
});
*/

function handSelector() {
    var seletor = document.getElementById("handSelector").value;
    db.settings.hand = seletor;
    fs.writeFile("./storage.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
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
            service: 0,
        },
        game: {
            intro: false,
            playTime: 0,
            achievement: {
                firstTouch: 0,
                lvl10: 0,
                lvl20: 0,
                lvl30: 0,
                lvl40: 0,
            }
        },
        settings: {
            graphics: 1,
            hand: 1,
            shortcuts: {
                revivebtn: ['ctrl', 'r'],
            }
        }
    }

    let data = JSON.stringify(json, null, 2);
    fs.writeFile("./storage.json", data, function(err) { 
        if(err) { 
            return console.log(err) 
        } else {
            ipcRenderer.send('open-start');
            console.log("The file was reset!") 
        }
    }); 
}