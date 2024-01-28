const { app, ipcMain, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let win;

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
        icon: path.join(__dirname, '../icon.png'),
        webPreferences: {
            webgl: true,
            nodeIntegration: true,
            devTools: true,
            contextIsolation: true,
            preload: path.join(__dirname, '/preload.js')
        }
    });
    
    win.setTitle('TGS');
    win.loadFile('src/html/index.html');
    //win.webContents.openDevTools();

    CreateStorage();
}

function CreateStorage() {
    if(!fs.existsSync(`storage.json`)) {
        const json = {
            user: {
                username: "",
                level: 1,
                sc: 0,
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
            },
            settings: {
                music: true,
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

app.whenReady().then(createWindow);
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) { createWindow(); } });