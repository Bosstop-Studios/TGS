
document.getElementById("click").addEventListener("click", function(){
    console.log("clicked")
    ipcRenderer.send('open-game');
});