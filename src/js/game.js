const find = require('find-process');
const fs = require('fs');

const EventEmitter = require('events')
const tgsEvent = new EventEmitter();

const DiscordRPC = require('discord-rpc');
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));

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
    discordinGame();
};

var hand = document.getElementById("hand")

hand.addEventListener("click", async function(){
    tgsEvent.emit('tgs-achievement')
    tgsEvent.emit('tgs-clicked')
});

// GAME EVENTS 

tgsEvent.on('tgs-clicked', async() => {
    if(db.grass.health > 0 ) {
        hand.classList.add('handanimated');
        serviceListener()
        decreaseCondition()
        await delay(500); 
        hand.classList.remove('handanimated');
    } else {
        gameAlert(2, "<b>Alert:</b>&nbsp;Your Grass is in bad condition. Please grow more inorder to continue to touch it.");
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
            serviceExe().then((bool) => {
                if(bool == false) {
                    document.getElementById("grass").style.backgroundImage = "url('../assets/grass/dirt.jpeg')";
                }
            })
        } else {
            document.getElementById("grass").style.backgroundImage = "url('../assets/grass/dirt.jpeg')";
        }
    } else if(healthleft < 0.2 || healthleft == 0.2) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass/grass5.jpeg')";
    } else if(healthleft < 0.4 || healthleft == 0.4) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass/grass4.jpeg')";
    } else if(healthleft < 0.6 || healthleft == 0.6) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass/grass3.jpeg')";
    } else if(healthleft < 0.8 || healthleft == 0.8) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass/grass2.jpeg')";
    } else {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass/grass1.jpeg')";
    }
})

tgsEvent.on('tgs-achievement', () => {
    if(db.game.achievement.firstTouch == 0) {
        achievement("Achievement Unlocked:<br> TOUCHED GRASS", "hand-badge.png")
        db.game.achievement.firstTouch = 1;
    }

    if(db.grass.level == 10) {
        if(db.game.achievement.lvl10 == 0) {
            achievement("Achievement Unlocked:<br> TOUCHING GRASS MASTER", "lvl10.jpg")
            db.game.achievement.lvl10 = 1;
        }
    }

    if(db.grass.level == 20) {
        if(db.game.achievement.lvl20 == 0) {
            achievement("Achievement Unlocked:<br> TOUCHING GRASS SENSAI", "lvl20.jpg")
            db.game.achievement.lvl20 = 1;
        }
    }
})

// GRASS FUNCTIONS

function grassRevive() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        const rate = db.grass.level * 10
        const cost = db.grass.level * 25
        const finalCost = cost - rate;
        if(db.user.coins > finalCost || db.user.coins == finalCost) {
            db.user.coins -= finalCost;
            db.grass.health = db.grass.level * 10;
            tgsEvent.emit('tgs-ui-update');
            tgsEvent.emit('tgs-grassUpdate')
            gameAlert(1, "<b>Alert:</b>&nbsp; Grass Revived!");
        } else {
            gameAlert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to revive your Grass!");
        }
    } else {
        gameAlert(2, "<b>Alert:</b>&nbsp;There is still grass to touch.");
    }
}


// GAME UTIL

// PlayTime
setInterval(addTime, 60 * 1000);

setInterval(SaveData, 120 * 1000);

function gameAlert(type, text) {
    const box = document.getElementById("alert-box");
    const modelbox = document.getElementById("model-alert-box");
    if(type == 1) {
        box.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`
        box.scrollTop = box.scrollHeight;
    } else if(type == 2) {
        box.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`
        box.scrollTop = box.scrollHeight;
    } else if(type == 3) {
        modelbox.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`
        modelbox.scrollTop = modelbox.scrollHeight;
    } else if(type == 4) {
        modelbox.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`
        modelbox.scrollTop = modelbox.scrollHeight;
    } else {
        return;
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
      <img style="height:250px;left:30%;position:absolute;" src="../assets/achevs/${iconPath}">
      `
    }
    
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modalAchievement.style.display = "none";
      modal.style.display = "none";
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


// GAME MENU

function openMenu() {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    
    modal.style.display = "flex";
    modalContent.style.display = "block"
    modalContent.style.backgroundColor = "transparent";
    modalContent.innerHTML = `
    <center style="margin-top:35%; font-size:45px;">
        <div style="margin-top:10px; margin-bottom:10px" class="row">
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="openShop()" class="btn btn-success">SHOP</button>
          </div>
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="openLife()" class="btn btn-success" disabled>LIFE</button>
          </div>
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" id="menu-save-btn" type="button" onclick="" class="btn btn-success">SAVE</button>
          </div>
        </div> 
        <!--
        <div style="margin-top:10px; margin-bottom:10px" class="row">
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="" class="btn btn-success" disabled>UNA</button>
          </div>
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="" class="btn btn-success" disabled>UNA</button>
          </div>
          <div class="col-sm-3">
          <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="" class="btn btn-success" disabled>UNA</button>
          </div>
        </div> 
        -->
    </center>
    `
  
    var Save = document.getElementById("menu-save-btn");
    Save.onclick = async function() { 
      SaveData()
      modal.style.display = "none";
      document.getElementById("model-alert-box").innerHTML = " ";
      await delay(500)
      gameAlert(1, "<b>Alert:</b>&nbsp; Game Saved!");
    }

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
      document.getElementById("model-alert-box").innerHTML = " ";
    }
  
}

// GAME SHOP

function openShop() {
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    
    modal.style.display = "flex";
    modalContent.style.display = "block"
    modalContent.style.backgroundColor = "rgb(16, 121, 241)";
    modalContent.innerHTML = `
      <h1 style="text-align:center;">Welcome to the Shop</h1>
      <br>
      <h2 style="text-align:center;">Social Credit Market</h2>
      <br>
      <div style="margin-top:10px; margin-bottom:10px" class="row">
          <div class="col-sm-4">
            <h4>Coins</h4>
          </div>
          <div class="col-sm-1"></div>
          <div class="col-sm-4">
            <p style="display:inline;">Cost: 100 Social Credit</p>
          </div>
          <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="buyCoins()" class="btn btn-success">Buy</button>
          </div>
      </div>  
      <br>
      <h2 style="text-align:center;">Coins Store</h2>
      <br>
      <div style="margin-top:10px; margin-bottom:10px" class="row">
          <div class="col-sm-4">
            <h4>Grass LevelUp</h4>
          </div>
          <div class="col-sm-1"></div>
          <div class="col-sm-4">
            <p style="display:inline;">Cost: <span id="grass-levelup"></span></p>
          </div>
          <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="grassLevelup()" class="btn btn-success">Buy</button>
          </div>
      </div>  
      <br>
      <h2 style="text-align:center;">Service Center</h2>
      <p style="text-align:center; font-size:18px; color:#00ff55;"><b>Services may have hidden benefits</b></p>
      <br>
      <div style="margin-top:10px; margin-bottom:10px" id="service-box-taco"></div>
      <div style="margin-top:10px; margin-bottom:10px" id="service-box-truGrass"></div>
    `
  
    prices();
    checkService()
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
      modalContent.style.backgroundColor = "none";
      document.getElementById("model-alert-box").innerHTML = " ";
    }
  
}

// SERVICES

function checkService() {        
    var tacobox = document.getElementById("service-box-taco")
    var truGrass = document.getElementById("service-box-truGrass")

    if(db.grass.service == 1) {
        let tacoCare = db.grass.level * 150;
        tacobox.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <p style="font-size:20px;">Tacos Grass Care</p>
            </div>
            <div class="col-sm-4">
                <p style="display:inline;">Cost: <span>${tacoCare} Coins</span></p>
            </div>
            <div class="col-sm-2">
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="serviceUnequip(1)" class="btn btn-success">Equiped</button>
            </div>
        </div>
        `
    } else {
        tacobox.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <p style="font-size:20px;">Tacos Grass Care</p>
            </div>
            <div class="col-sm-5">
                <p style="display:inline;">Cost: <span>150 per Level of Grass</span></p>
            </div>
            <div class="col-sm-1">
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="serviceBuy(1)" class="btn btn-success">Get</button>
            </div>
        </div>
        `
    }

    if(db.grass.service == 2) {
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
}

function serviceBuy(serviceID) {
    if(serviceID == 1) {
        db.grass.service = 1;
        gameAlert(3, "<b>Alert:</b>&nbsp;Tacos Grass Care Equiped");
    } else if(serviceID == 2) {
        db.grass.service = 2;
        gameAlert(3, "<b>Alert:</b>&nbsp;TruGrass Care Equiped");
    }
    checkService()
}

function serviceUnequip(serviceID) {
    if(serviceID == 1) {
        db.grass.service = 0;
        gameAlert(3, "<b>Alert:</b>&nbsp;Tacos Grass Care Unequiped");
    } else if(serviceID == 2) {
        db.grass.service = 0;
        gameAlert(3, "<b>Alert:</b>&nbsp;TruGrass Care Unequiped");
    }
    checkService()
}

async function serviceExe() {
    if(db.grass.service == 1) {
        const taco = db.grass.level * 150
        if(db.user.coins > taco || db.user.coins == taco) {
            db.user.coins -= taco;
            db.grass.health = db.grass.level * 15;
            tgsEvent.emit('tgs-ui-update');
            tgsEvent.emit('tgs-grassUpdate')
            return true;
        } else {
            gameAlert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to continue Tacos Grass Service!");
            db.grass.service = 0;
            return false;
        }
    } else if(db.grass.service == 2) {
        const tru = db.grass.level * 100
        if(db.user.coins > tru || db.user.coins == tru) {
            db.user.coins -= tru;
            db.grass.health = db.grass.level * 20;
            tgsEvent.emit('tgs-ui-update');
            tgsEvent.emit('tgs-grassUpdate')
            return true;
        } else {
            gameAlert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to continue TruGrass Service!");
            db.grass.service = 0;
            return false;
        }
    }
}

function serviceListener() {
    if(db.grass.service == 1) {
        db.user.coins += db.grass.level + 5;
        db.user.xp += 4;
    } else if(db.grass.service == 2) {
        earnCoins();
        earnXP();
    } else {
        earnCoins();
        earnXP();
    }
}

// SHOP FUNCTIONS 
  
function prices() {
    document.getElementById("grass-levelup").innerHTML = grasslvlupCost().toString() + " Coins";
}
  
// SOCIAL CREDIT SHOP
  
function buyCoins() {
    if(db.user.xp > 100 || db.user.xp == 100) {
      db.user.xp -= 100;
      db.user.coins += 100;
      gameAlert(3, "<b>Alert:</b>&nbsp;100 Coins added.");
      tgsEvent.emit('tgs-ui-update');
    } else {
      gameAlert(4, "<b>Alert:</b>&nbsp;You don't have enough Social Credit to buy this item.")
    }
}
  
// COINS SHOP 
  
function grasslvlupCost() {
    let levelupCost;
    if(db.grass.level > 100 || db.grass.level == 100) {
      levelupCost = db.grass.level * 3500
    }
    if(db.grass.level > 90 || db.grass.level == 90) {
      levelupCost = db.grass.level * 2750
    }
    if(db.grass.level > 80 || db.grass.level == 80) {
      levelupCost = db.grass.level * 2050
    }
    if(db.grass.level > 70 || db.grass.level == 70) {
      levelupCost = db.grass.level * 1750
    }
    if(db.grass.level > 60 || db.grass.level == 60) {
      levelupCost = db.grass.level * 1550
    }
    if(db.grass.level > 50 || db.grass.level == 50) {
      levelupCost = db.grass.level * 1250
    }
    if(db.grass.level > 40 || db.grass.level == 40) {
      levelupCost = db.grass.level * 1050
    }
    if(db.grass.level > 30 || db.grass.level == 30) {
      levelupCost = db.grass.level * 850
    }
    if(db.grass.level > 20 || db.grass.level == 20) {
      levelupCost = db.grass.level * 650
    }
    if(db.grass.level > 10 || db.grass.level == 10) {
      levelupCost = db.grass.level * 450
    }
    if(db.grass.level < 10) {
      levelupCost = db.grass.level * 150
    }
    return levelupCost;
}
  
function grassLevelup() {
    let levelupCost = grasslvlupCost();
    if(db.user.coins > levelupCost || db.user.coins == levelupCost) {
      db.user.coins -= levelupCost;
      db.grass.level += 1;
      db.grass.health = db.grass.level * 10;
      gameAlert(3, "<b>Alert:</b>&nbsp;Grass Leveled Up");
      prices();
      tgsEvent.emit('tgs-grassUpdate');
      tgsEvent.emit('tgs-ui-update');
      discordGrasslvlup();
    } else {
      gameAlert(4, "<b>Alert:</b>&nbsp;You don't have enough Coins to buy this item.")
    }
}

// GAME LIFE 

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
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
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

// ECONOMY 

function earnCoins() {
    db.user.coins += db.grass.level;
}

function earnXP() {
    db.user.xp += 2;
}

function addTime() {
    db.game.playTime += 1;
}

function decreaseCondition() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;

    if(healthleft == 0) {
        tgsEvent.emit('tgs-grassUpdate')
        tgsEvent.emit('tgs-ui-update');
    } else if(healthleft < 0.2 || healthleft == 0.2) {
        db.grass.health -= 1;
        tgsEvent.emit('tgs-grassUpdate')
        tgsEvent.emit('tgs-ui-update');
    } else if(healthleft < 0.4 || healthleft == 0.4) { 
        db.grass.health -= 1;
        tgsEvent.emit('tgs-grassUpdate')
        tgsEvent.emit('tgs-ui-update');
    } else if(healthleft < 0.6 || healthleft == 0.6) { 
        db.grass.health -= 1;
        tgsEvent.emit('tgs-grassUpdate')
        tgsEvent.emit('tgs-ui-update');
    } else if(healthleft < 0.8 || healthleft == 0.8) { 
        db.grass.health -= 1;
        tgsEvent.emit('tgs-grassUpdate')
        tgsEvent.emit('tgs-ui-update');
    } else {
        db.grass.health -= 1;
        tgsEvent.emit('tgs-ui-update');
    }
}

// STORAGE

function SaveData() {
    fs.writeFile("./storage.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
}


// GAME DISCORD UNTIL

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

function discordinGame() {
    discordChecker().then((bool) => {
        if(bool) {
            rpc.setActivity({
                details: "Touching Grass",
                state: `Grass Level: ${db.grass.level}`,
                largeImageKey: "tgs",
                largeImageText: "TGS",
                instance: false
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
                instance: false
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