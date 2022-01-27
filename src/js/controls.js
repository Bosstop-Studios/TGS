const { ipcRenderer, shell } = require('electron');

var closeButton = document.getElementById("close")

closeButton.addEventListener("click", function (e) {
    ipcRenderer.send('close-window');
}); 
