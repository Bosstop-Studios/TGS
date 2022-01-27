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
        minimizable: true,
        resizable: false,
        title: 'TGS',
        icon: __dirname + '/icon.png',
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    })
    win.setTitle('TGS');
    win.loadFile('src/html/warning.html');

    win.on('close', function (event) { app.isQuiting = true, app.quit() })


    if(!fs.existsSync(`config.json`)) {
        const json = {
            user: {
                username: "Guest",
                coins: 100,
                xp: 0
            },
            grass: {
                level: 1,
                health: 10,
            },
            game: {
                level: 1,
                health: 10,
            },
            settings: {
                hand: 1,
                health: 10,
            }
        }
        let data = JSON.stringify(json, null, 2);
        fs.writeFile("config.json", data, function(err) { if(err) { return console.log(err) } console.log("The file was saved!") }); 
    }
}

// IPCMAIN Functions
ipcMain.on('minimize-window', () => { win.minimize() });
ipcMain.on('close-window', () => { win.close() });
ipcMain.on('open-game', () => { win.loadFile('src/html/game.html'); });
ipcMain.on('open-start', () => { win.loadFile('src/html/start.html'); });
ipcMain.on('open-settings', () => { win.setSize(1200,728) });

app.whenReady().then(createWindow);
app.on('before-quit', function() { Tray.destroy(); });
app.on('window-all-closed', function(){ if(process.platform !== 'darwin'){ app.quit() } });
app.on('activate', () => { if (Glasstron.BrowserWindow.getAllWindows().length === 0) { createWindow(); autoUpdater.checkForUpdatesAndNotify(); } });