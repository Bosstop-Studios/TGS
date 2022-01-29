const { ipcRenderer, shell } = require('electron');

var closeButton = document.getElementById("close")
closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 

var miniButton = document.getElementById("mini")
miniButton.addEventListener("click", function (e) {
    ipcRenderer.send('minimize-window');
}); 

var maxiButton = document.getElementById("maxi")
maxiButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-resize');
}); 

var settingsButton = document.getElementById("settings")
if(settingsButton) {
    settingsButton.addEventListener("click", function (e) {
        ipcRenderer.send('open-settings');
    }); 
}