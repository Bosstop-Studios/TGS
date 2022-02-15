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
          //devTools: false
        }
    })
    win.setTitle('TGS');
    win.loadFile('src/html/warning.html');
    //win.webContents.openDevTools();

    win.on('close', function (event) { app.isQuiting = true, app.quit() })

    CreateStorage()
}

function CreateStorage() {
    if(!fs.existsSync(`storage.json`)) {
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
                hand: "1",
                shortcuts: {
                    revivebtn: ['ctrl', 'r'],
                }
            }
        }
        let data = JSON.stringify(json, null, 2);
        fs.writeFile("storage.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

// IPCMAIN Functions
ipcMain.on('app-restart', () => { app.relaunch(); app.exit(); });
ipcMain.on('app-dev', () => { win.webContents.openDevTools(); });
ipcMain.on('maximize-window', () => { win.setFullScreen(!win.isFullScreen()) });
ipcMain.on('minimize-window', () => { win.minimize(); });
ipcMain.on('resize-window', () => { win.setSize(1200, 728); });
ipcMain.on('close-window', () => { win.close(); });
ipcMain.on('open-game', () => { win.loadFile('src/html/game.html'); });
ipcMain.on('open-intro', () => { win.loadFile('src/html/intro.html'); });
ipcMain.on('open-start', () => { win.loadFile('src/html/start.html'); });
ipcMain.on('open-settings', () => { win.loadFile('src/html/settings.html'); });
ipcMain.on('open-update', () => { win.loadFile('src/html/update.html'); });

app.whenReady().then(createWindow);
app.on('before-quit', function() { Tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit(); }});
app.on('activate', () => { if (Glasstron.BrowserWindow.getAllWindows().length === 0) { createWindow(); autoUpdater.checkForUpdatesAndNotify(); } });