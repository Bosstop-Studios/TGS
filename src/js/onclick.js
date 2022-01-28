
document.getElementById("click").addEventListener("click", function(){
    ipcRenderer.send('open-start');
});