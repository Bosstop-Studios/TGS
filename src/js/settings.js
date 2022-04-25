const fs = require('fs');
const moment = require('moment')
const download = require('download');

let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

window.onload = function() {
    document.getElementById("info-playtime-min").innerHTML = UpTime();
    document.getElementById("handSelector").value = db.settings.hand;
};

var backButton = document.getElementById("back-arrow")
backButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-game');
}); 

/*
var updateButton = document.getElementById("update")
updateButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-update');
});
*/

function UpTime() {  
    let totalSeconds = db.game.playTime;
    let hours = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    let minutes = Math.floor(totalSeconds / 1);
    return `${hours} Hours and ${minutes} Minutes`;
}

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
            booster: 0
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
            hand: "1",
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

// URL of the image
const url = 'https://sirblob.bosstop.ml/assets/update/latest.exe';

document.getElementById("update").addEventListener("click", () => {

    console.log("Updating . . . ")

    downloadd(url, __dirname + '../../../update/')

})

function log(content) {
    fs.writeFile('./log.txt', `[${moment().format('lll')}] ` + content + "\n", { flag: 'a+' }, err => {});
}

const delay = milli => new Promise(res => setTimeout(res, milli));

var exec = require('child_process').exec;

const downloadd = (url, path) => {

    download(url, path).then(async() => {
        log("Updating Game, Bye!")
        exec("start TGS1.0.0.exe", {
            cwd: path
        });
        await delay(1000); 
        ipcRenderer.send('close-window');
    })

};