const find = require('find-process');

const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

var d1 = new Date();

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
                instance: false,
                startTimestamp: d1
            })
        }
    })
}

function discordinGame() {
    discordChecker().then((bool) => {
        if(bool) {
            rpc.setActivity({
                details: "Touching Grass",
                state: `Grass Level: ${db.grass.level}`,
                largeImageKey: "tgs",
                largeImageText: "TGS",
                instance: false,
                startTimestamp: d1
            })
        }
    })
}

function discordGrasslvlup() {
    discordChecker().then((bool) => {
        if(bool) {
            rpc.setActivity({
                details: "Touching Grass",
                state: `Grass Level: ${db.grass.level}`,
                largeImageKey: "tgs",
                largeImageText: "TGS",
                instance: false,
                startTimestamp: d1
            })
        }
    })
}

try {
    rpc.login({ clientId: "940829469730566154" }).then(() => { console.log('Signed in') }).catch((err) => { console.log(err) });
} catch (e) {
    if(e) {
        console.log(err); 
    }
}