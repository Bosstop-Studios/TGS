const fs = require('fs');

const delay = ms => new Promise(res => setTimeout(res, ms));

window.onload = async function() {

    try {
        let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

        if(document.getElementById("start-gui")) {
            if(db.user.username.length < 1) {
                document.getElementById("start-gui").innerHTML +=`
                <br><br>
                <p style="font-size:25px">Enter Your Username:</p>
                <br>
                <div class="form-group">
                    <input style="max-width:500px" type="text" class="form-control" id="usr" maxlength="10" required>
                </div>
                <br><br><br>
                <button type="button" class="btn btn-primary" style="text-align:center; font-size:30px;" id="start-btn">Start</button>
                `
            } else {
                document.getElementById("start-gui").innerHTML +=`
                <p style="font-size:25px">User: ${db.user.username}</p>
                <br><br><br>
                <button type="button" class="btn btn-primary" style="text-align:center; font-size:30px;" id="start-btn">Start</button>
                `
            }
            var startButton = document.getElementById("start-btn");
            startButton.addEventListener("click", function (e) {
                if(db.user.username.length < 1) {
                    if(document.getElementById("usr").value.length > 0) {
                        
                        db.user.username = document.getElementById("usr").value;
                        fs.writeFile("./storage.json", JSON.stringify(db, null, 2), (x) => {
                            if (x) console.error(x)
                        });

                        if(db.game.intro == false) {
                            ipcRenderer.send('open-intro');
                        } else {
                            ipcRenderer.send('open-game');
                        }
                    } else {
                        alert("Please enter a username!")
                    }
                } else {
                    ipcRenderer.send('open-game');
                }
            }); 
        }
    } catch (err) {
        console.log(err);
        
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
        fs.writeFile("./storage.json", data, function(err) { 
            if(err) { 
                return console.log(err) 
            }
        }); 

        await delay(1000)

        location.reload();
    }
}


// DISCORD_RPC

const find = require('find-process');

const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

async function discordChecker() {
    const checker = await find('name', 'Discord.exe', true)
    if(checker.length > 0) {
        return true;
    } else {
        return false;
    }
}

function discordGameStartMenu() {
    discordChecker().then((bool) => {
        if(bool) {
            rpc.setActivity({
                details: "Touching Grass",
                state: "Start Menu",
                largeImageKey: "tgs",
                largeImageText: "TGS",
                instance: false
            })
        }
    })
}

discordGameStartMenu();

try {
    rpc.login({ clientId: "940829469730566154" }).then(() => { console.log('Signed in') }).catch((err) => { console.log(err) });
} catch (e) {
    if(e) {
        console.log(err); 
    }
}