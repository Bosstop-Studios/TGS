const { ipcRenderer } = require('electron'); 

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", async function (e) {
    if(window.location.pathname.includes("index.html")) game.saveGame();
    ipcRenderer.send('close-window');
}); 

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var maxiButton = document.getElementById("maxi")
maxiButton.addEventListener("click", function (e) {
    ipcRenderer.send('maximize-window');
}); 

var settingsButton = document.getElementById("settings");
settingsButton.addEventListener("click", async function (e) {
    if(window.location.pathname.includes("settings.html")) ipcRenderer.send('open-game');
    else game.saveGame(), ipcRenderer.send('open-settings');
}); 

function Version() {
    document.getElementById("version").innerText = require("../../package.json").version;  
}
Version();