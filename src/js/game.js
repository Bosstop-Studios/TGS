// IMPORTS
const find = require('find-process');
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');

const EventEmitter = require('events')

const DiscordRPC = require('discord-rpc');

// CLASSES
const Classes = require('../js/api.js')

const game = new Classes.Game();
const grass = new Classes.Grass();
const economy = new Classes.Economy();
const shop = new Classes.Shop();
const service = new Classes.Service();
const booster = new Classes.Booster();
const life = new Classes.Life();
const storage = new Classes.Storage();
const discord = new Classes.Discord();

// CONSTANTS 
const randomeventData = require("../assets/events/randomevent.json");

const tgsEvent = new EventEmitter();

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const delay = milli => new Promise(res => setTimeout(res, milli));

// MODIFABLE
let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

// GAME
window.onload = function() {
    //LOAD Username
    document.getElementById("ui-username").innerHTML = db.user.username;
    // LOAD HAND
    document.getElementById("hand").src = `../assets/hands/hand${db.settings.hand}.jpeg`
    // LOAD BG
    tgsEvent.emit('tgs-grassUpdate');
    // LOAD UI
    tgsEvent.emit('tgs-ui-update');
    // EXTRAS 
    discord.Checker();
    // LOG 
    log(`Logged in ( ${db.user.username} ), Coins: ${db.user.coins}, XP: ${db.user.xp}`)
};

// Buttons

document.getElementById("hand").addEventListener("click", function() {
    tgsEvent.emit('tgs-achievement')
    tgsEvent.emit('tgs-clicked')
});

document.getElementById("menu-btn").addEventListener("click", function() {
    game.openMenu()
});

document.getElementById("revive-btn").addEventListener("click", function() {
    grass.Revive()
});

// GAME EVENTS 

tgsEvent.on('tgs-clicked', async() => {
    if(db.grass.health > 0 ) {
        hand.classList.add('handanimated');
        service.Listener()
        booster.Execute()
        grass.decreaseCondition()
        await delay(500); 
        hand.classList.remove('handanimated');
    } else {
        game.Alert(2, "<b>Alert:</b>&nbsp;Your Grass is in bad condition. Please grow more inorder to continue to touch it.");
    }
})

tgsEvent.on('tgs-ui-update', async() => {
    document.getElementById("ui-coins").innerHTML = db.user.coins;
    document.getElementById("ui-xp").innerHTML = db.user.xp;

    document.getElementById("ui-grass-level").innerHTML = db.grass.level;

    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft == 0) {
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Dead`;
    } else if(healthleft < 0.2 || healthleft == 0.2) {
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Bad`;
    } else if(healthleft < 0.6 || healthleft == 0.6) {
        document.getElementById("ui-grass-condition").style.color = "rgb(255, 187, 0)";
        document.getElementById("ui-grass-condition").innerHTML = `OK`;
    } else {
        document.getElementById("ui-grass-condition").style.color = "rgb(13, 226, 42)";
        document.getElementById("ui-grass-condition").innerHTML = `Good`;
    }
})

tgsEvent.on('tgs-grassUpdate', () => {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0 || healthleft == 0) {
        if(db.grass.service > 0) {
            boosterUnequip()
            serviceExe().then((bool) => {
                if(bool == false) {
                    document.getElementById("grass").style.backgroundImage = game.assets.grass.dirtImage;
                }
            })
        } else {
            document.getElementById("grass").style.backgroundImage = game.assets.grass.dirtImage;
        }
    } else if(healthleft < 0.2 || healthleft == 0.2) { 
        document.getElementById("grass").style.backgroundImage = game.assets.grass.grassFive;
    } else if(healthleft < 0.4 || healthleft == 0.4) { 
        document.getElementById("grass").style.backgroundImage = game.assets.grass.grassFour;
    } else if(healthleft < 0.6 || healthleft == 0.6) { 
        document.getElementById("grass").style.backgroundImage = game.assets.grass.grassThree;
    } else if(healthleft < 0.8 || healthleft == 0.8) { 
        document.getElementById("grass").style.backgroundImage = game.assets.grass.grassTwo;
    } else {
        document.getElementById("grass").style.backgroundImage = game.assets.grass.grassOne;
    }
})

tgsEvent.on('tgs-achievement', () => {

    // GAME 
    if(db.game.achievement.firstTouch == 0) achievement("Achievement Unlocked:<br> TOUCHED GRASS", this.assets.achievement.FirstTouch), db.game.achievement.game.firstTouch = 1;

    // LEVEL BASED
    if(db.grass.level == 10) if(db.game.achievement.lvl10 == 0) achievement("Achievement Unlocked:<br> TOUCHING GRASS MASTER", this.assets.achievement.level.lvl10), db.game.achievement.lvl10 = 1;
    if(db.grass.level == 20) if(db.game.achievement.lvl20 == 0) achievement("Achievement Unlocked:<br> TOUCHING GRASS SENSAI", this.assets.achievement.level.lvl20), db.game.achievement.lvl20 = 1;

})


// GAME UTIL

let Eventdate = new Date();
let Eventsec = Eventdate.getSeconds();

// PlayTime

setInterval(storage.addTime, 60 * 1000);

setTimeout(()=>{
    setInterval(()=>{
        storage.SaveData();
    }, ms("1m"));
}, (60 - Eventsec) * 1000);

setTimeout(()=>{
  setInterval(()=>{
    randomEvent(randomeventData[Math.floor(Math.random()*randomeventData.length)]);
  }, ms("5m"));
}, (60 - Eventsec) * 1000);

// GAME EVENTS 

function randomEvent(data) {
    if(document.getElementById("modal-achievement").style.display == "block") {
        log("Random Event Skipped")
        return console.log("Event Skipped");
    }
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    var modalAchievement = document.getElementById("modal-achievement");
      
    modal.style.display = "flex";
    modalContent.style.display = "none"      
    modalContent.innerHTML = " ";
    modalAchievement.style.display = "block";
    modalAchievement.innerHTML = `
    <h3 style="text-align:center;">${data.question}</h3>      
    <br>      
    <br>
    <div style="margin-top:10px; margin-bottom:10px" class="row">
        <div class="col-sm-3">
           <button style="margin-left:50px; width:100%; height:100%; font-size:18px;" id="randEV-btn1" type="button" class="btn btn-success">${data.btn1}</button>
        </div>
        <div class="col-sm-3">
            <button style="margin-left:50px; width:100%; height:100%; font-size:18px;"id="randEV-btn2" type="button" class="btn btn-success">${data.btn2}</button>
        </div>
        <div class="col-sm-3">
           <button style="margin-left:50px; width:100%; height:100%; font-size:18px;" id="randEV-btn3" type="button" class="btn btn-success">${data.btn3}</button>
        </div>
    </div> 
    `
    
    var btn1 = document.getElementById("randEV-btn1")
    btn1.onclick = function() { 
        modalAchievement.style.display = "none";
        modal.style.display = "none";
        if(data.Answer == 1) {
            db.user.xp += data.win;
            game.Alert(1, "<b>Alert:</b>&nbsp; You have Earned " + data.win);
        } else {
            db.user.xp -= data.lose;
            game.Alert(2, "<b>Alert:</b>&nbsp; You have Losed " + data.lose); 
        }
        tgsEvent.emit('tgs-ui-update');
    }

    var btn2 = document.getElementById("randEV-btn2")
    btn2.onclick = function() { 
        modalAchievement.style.display = "none";
        modal.style.display = "none";
        if(data.Answer == 2) {
            db.user.xp += data.win;
            game.Alert(1, "<b>Alert:</b>&nbsp; You have Earned " + data.win);
        } else {
            db.user.xp -= data.lose;
            game.Alert(2, "<b>Alert:</b>&nbsp; You have Losed " + data.lose); 
        }
        tgsEvent.emit('tgs-ui-update');
    }

    var btn3 = document.getElementById("randEV-btn3")
    btn3.onclick = function() { 
        modalAchievement.style.display = "none";
        modal.style.display = "none";
        if(data.Answer == 3) {
            db.user.xp += data.win;
            game.Alert(1, "<b>Alert:</b>&nbsp; You have Earned " + data.win);
        } else {
            db.user.xp -= data.lose;
            game.Alert(2, "<b>Alert:</b>&nbsp; You have Losed " + data.lose); 
        }
        tgsEvent.emit('tgs-ui-update');
    }
}

// GAME ACHIEVEMENTS

function achievement(name, iconPath) {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    var modalAchievement = document.getElementById("modal-achievement");
      
    modal.style.display = "flex";
    modalContent.style.display = "none"
    modalAchievement.style.display = "block";
    modalAchievement.innerHTML = `
    <h1 style="text-align:center;">${name}</h1>
    `
  
    if(iconPath) {
      modalAchievement.innerHTML += `
      <br>
      <img style="height:250px;left:30%;position:absolute;" src="${iconPath}">
      `
    }
    
    document.getElementById("model-background").onclick = (e) => {
        modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; 
    }
}

// GAME SHORTCUTS 

const shortcuts = db.settings.shortcuts;

document.onkeydown = (keyDownEvent) => {
    // keyDownEvent.preventDefault();
};

shortcut.add(`${shortcuts.revivebtn[0]}+${shortcuts.revivebtn[1]}`, function() {
    grassRevive()
});


function checkBoosters() {        
    /*
    if(db.grass.booster == 2) {
        let truGrassCare = db.grass.level * 100;
        truGrass.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <p style="font-size:20px;">TruGrass</p>
            </div>
            <div class="col-sm-4">
                <p style="display:inline;">Cost: <span>${truGrassCare} Coins</span></p>
            </div>
            <div class="col-sm-2">
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="serviceUnequip(2)" class="btn btn-success">Equiped</button>
            </div>
        </div>
        `
    } else {
        truGrass.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <p style="font-size:20px;">TruGrass</p>
            </div>
            <div class="col-sm-5">
                <p style="display:inline;">Cost: <span>100 per Level of Grass</span></p>
            </div>
            <div class="col-sm-1">
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="serviceBuy(2)" class="btn btn-success">Get</button>
            </div>
        </div>
        `
    }
    */
}

function openLife() {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");

    modal.style.display = "flex";
    modalContent.style.display = "block"
    modalContent.style.backgroundColor = "rgb(23, 165, 153)";
    modalContent.innerHTML = `
    <h2 style="text-align:center;">Life</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" id="bff-box"></div>
    <div style="margin-top:10px; margin-bottom:10px" id="gf-box"></div>
    <div style="margin-top:10px; margin-bottom:10px" id="bf-box"></div>
    `

    checkBFF()
    checkGF()
    checkBF()
  
    document.getElementById("model-background").onclick = (e) => {
        modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; 
    }
  
}

function checkBFF() {
    var bffbox = document.getElementById("bff-box")

    bffbox.innerHTML = `
    <div class="row">
        <div class="col-sm-3">
            <h4>Find BFF</h4>
        </div>
        <div class="col-sm-5">
            <p style="display:inline;">Cost: 1000 Social Credit</p>
        </div>
        <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Start</button>
        </div>
    </div>
    `
}

function checkGF() {
    var gfbox = document.getElementById("gf-box")

    gfbox.innerHTML = `
    <div class="row">
        <div class="col-sm-3">
            <h4>Find GF</h4>
        </div>
        <div class="col-sm-5">
            <p style="display:inline;">Cost: 1500 Social Credit</p>
        </div>
        <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Start</button>
        </div>
    </div>
    `
}

function checkBF() {
    var gfbox = document.getElementById("bf-box")

    gfbox.innerHTML = `
    <div class="row">
        <div class="col-sm-3">
            <h4>Find BF</h4>
        </div>
        <div class="col-sm-5">
            <p style="display:inline;">Cost: 1500 Social Credit</p>
        </div>
        <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Start</button>
        </div>
    </div>
    `
}

function log(content) {
    if (!fs.existsSync("./logs")){
        fs.mkdirSync("./logs");
    } else {
        fs.writeFile(`./logs/log-[${moment().format("MMM Do YY")}].txt`, `[${moment().format('lll')}] ` + content + "\n", { flag: 'a+' }, err => {});
    }
}

try {
    rpc.login({ clientId: "940829469730566154" }).then(() => { console.log('Signed in') }).catch((err) => { console.log(err) });
} catch (e) {
    if(e) {
        console.log(err); 
        log(`Error_RPC:\n` + err)
    }
}

// API 

class API {
    constructor() {
        this.game = game;
        this.storage = storage;
        this.event = tgsEvent;
    }
}

// ADDON EXECUTER

const path = require('path')

var dir = './addon';

const addonFiles = fs.readdirSync(dir).filter(file => file.endsWith('.js') || file.endsWith('.ts'));
for(const file of addonFiles){
    let addon = require(path.join(`../../addon/${file}`));

    log(`Loaded: ${addon.name}, By: ${addon.author}, Version: ${addon.version}`);
    // addon.exe(new API);

}
