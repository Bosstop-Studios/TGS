const { app, ipcMain, BrowserWindow } = require('electron');
const fs = require('fs');

let win;
let iconpath = __dirname + '/icon.png';
let appIcon = null;

async function createWindow() {
    win = new BrowserWindow({
        height: 728,
        width: 1200,
        minWidth: 1200,
        minHeight: 728,
        frame: false,
        maximizable: true,
        minimizable: true,
        resizable: true,
        title: 'TGS',
        icon: __dirname + '/icon.png',
        webPreferences: {
          webgl: true,
          nodeIntegration: true,
          contextIsolation: false,
          devTools: true
        }
    });
    
    win.setTitle('TGS');
    win.loadFile('src/html/warning.html');
    //win.webContents.openDevTools();

    CreateStorage();
}

function CreateStorage() {
    if(!fs.existsSync(`storage.json`)) {
        const json = {
            user: {
                username: "",
                level: 1,
                exp: 0,
                coins: 100,
            },
            grass: {
                level: 1,
                health: 10,
                service: 0
            },
            game: {
                playTime: 0,
                achievements: [],
                music: true,
                checkpoints: {
                    intro: false
                }
            },
            settings: {
                hand: "1",
                volume: 0.5,
            }
        }
        let data = JSON.stringify(json, null, 4);
        fs.writeFile("storage.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

// IPCMAIN Functions
ipcMain.on('maximize-window', () => { win.setFullScreen(!win.isFullScreen()) });
ipcMain.on('minimize-window', () => { win.minimize(); });
ipcMain.on('close-window', () => { win.close(); });
ipcMain.on('open-game', () => { win.loadFile('src/html/index.html'); });
ipcMain.on('open-lore', () => { win.loadFile('src/html/lore.html'); });
ipcMain.on('open-start', () => { win.loadFile('src/html/start.html'); });
ipcMain.on('open-settings', () => { win.loadFile('src/html/settings.html'); });

app.whenReady().then(createWindow);
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit(); }});
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow(); } });