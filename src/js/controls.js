const { ipcRenderer, shell } = require('electron');

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var settingsButton = document.getElementById("settings")
settingsButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-settings');
}); 