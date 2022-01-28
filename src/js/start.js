

var startButton = document.getElementById("start-btn")
startButton.addEventListener("click", function (e) {
    ipcRenderer.send('open-game');
}); 