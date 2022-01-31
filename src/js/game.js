const fs = require('fs');
// const ms = require('ms');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));

// GAME

function onLoad() {
    //LOAD Username
    document.getElementById("ui-username").innerHTML = db.user.username;
    // LOAD BG
    grassUpdate();
    // LOAD UI
    uiUpdate();
}

onLoad();

var hand = document.getElementById("hand")

hand.addEventListener("click", async function(){

    if(db.game.firstTouch == 0) {
        achievement("Achievement Unlocked: TOUCHED GRASS", "hand-badge.png")
        FirstTouch();
    }
    if(db.grass.health > 0 ) {
        hand.classList.add('handanimated');
        earnCoins();
        earnXP();
        decreaseCondition()
        await delay(500); 
        hand.classList.remove('handanimated');
        uiUpdate();
    } else {
        gameAlert(2, "<b>Alert:</b>&nbsp;Your Grass is in bad condition. Please grow more inorder to continue to touch it.");
    }
});

// GRASS FUNCTIONS

function grassRevive() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        const rate = db.grass.level * 5
        const cost = db.grass.level * 25 
        const finalCost = cost - rate;
        if(db.user.coins > finalCost || db.user.coins == finalCost) {
            db.user.coins -= finalCost;
            db.grass.health = db.grass.level * 10;
            uiUpdate();
            grassUpdate()
            gameAlert(1, "<b>Alert:</b>&nbsp; Grass Revived!");
            fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
                if (x) console.error(x)
            });
        } else {
            gameAlert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to revive your Grass!");
        }
    } else {
        gameAlert(1, "<b>Alert:</b>&nbsp;There is still grass to touch.");
    }
}

function grassUpdate() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.jpeg')";
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.jpeg')";
    } else {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass1.jpeg')";
    }
}


// GAME UTIL

async function uiUpdate() {
    document.getElementById("ui-coins").innerHTML = db.user.coins;
    document.getElementById("ui-xp").innerHTML = db.user.xp;

    document.getElementById("ui-grass-level").innerHTML = db.grass.level;

    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft == 0) {
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Dead`;
    } else if(healthleft < 0.1 || healthleft == 0.1) {
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Bad`;
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        document.getElementById("ui-grass-condition").style.color = "rgb(255, 187, 0)";
        document.getElementById("ui-grass-condition").innerHTML = `OK`;
    } else {
        document.getElementById("ui-grass-condition").style.color = "rgb(13, 226, 42)";
        document.getElementById("ui-grass-condition").innerHTML = `Good`;
    }
}

function gameAlert(type, text) {
    if(type == 1) {
        if(document.getElementById("alert-success").style.display = "none") {
            document.getElementById("alert-success").style.display = "flex";
            document.getElementById("alert-success").innerHTML = text.toString();
            setTimeout(function() {
                document.getElementById("alert-success").style.display = "none";
            }, 5000)
        } else {
            return;
        }
    } else if(type == 2) {
        if(document.getElementById("alert-danger").style.display = "none") {
            document.getElementById("alert-danger").style.display = "flex";
            document.getElementById("alert-danger").innerHTML = text.toString();
            setTimeout(function() {
                document.getElementById("alert-danger").style.display = "none";
            }, 5000)
        } else {
            return;
        }
    } else if(type == 3) {
        if(document.getElementById("model-alert-success").style.display = "none") {
            document.getElementById("model-alert-success").style.display = "flex";
            document.getElementById("model-alert-success").innerHTML = text.toString();
            setTimeout(function() {
                document.getElementById("model-alert-success").style.display = "none";
            }, 5000)
        } else {
            return;
        }
    } else if(type == 4) {
        if(document.getElementById("model-alert-danger").style.display = "none") {
            document.getElementById("model-alert-danger").style.display = "flex";
            document.getElementById("model-alert-danger").innerHTML = text.toString();
            setTimeout(function() {
                document.getElementById("model-alert-danger").style.display = "none";
            }, 5000)
        } else {
            return;
        }
    } else {
        return;
    }
}

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
      <img style="height:250px;left:30%;position:absolute;" src="../assets/${iconPath}">
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
    keyDownEvent.preventDefault();
};

shortcut.add(`${shortcuts.revivebtn[0]}+${shortcuts.revivebtn[1]}`, function() {
    grassRevive()
});

// GAME ACHIEVEMENT

function FirstTouch() {
    db.game.achievement.firstTouch = 1;
    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
      if (x) console.error(x)
    });
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
      <br>
      <div style="margin-top:10px; margin-bottom:10px" class="row">
          <div class="col-sm-4">
            <p style="font-size:20px;">Tacos Grass Care</p>
          </div>
          <div class="col-sm-5">
            <p style="display:inline;">Cost: <span>150 per Level of Grass</span></p>
          </div>
          <div class="col-sm-1">
            <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="" class="btn btn-success">Get</button>
          </div>
      </div> 
    `
  
    prices();
  
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() { 
      modal.style.display = "none";
    }
  
}
  
function closeShop() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
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
      gameAlert(3, "100 Coins added.");
      uiUpdate();
      fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
      });
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
      grassUpdate();
      uiUpdate();
      fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
      });
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
    <h2 style="text-align:center;">Journey</h2>
    <br>
    <div style="margin-top:10px; margin-bottom:10px" id="bff-box"></div>
    <div style="margin-top:10px; margin-bottom:10px" id="gf-box"></div>
    `

    checkBFF()
    checkGF()
  
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

// STORAGE
function earnCoins() {
    db.user.coins += db.grass.level;

    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
}

function earnXP() {
    db.user.xp += 2;

    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
}

function decreaseCondition() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;

    if(healthleft == 0) {
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Dead`;
    } else if(healthleft < 0.1 || healthleft == 0.1) {
        db.grass.health -= 1;
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.jpeg')";
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Bad`;
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        db.grass.health -= 1;
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.jpeg')";
        document.getElementById("ui-grass-condition").style.color = "rgb(255, 187, 0)";
        document.getElementById("ui-grass-condition").innerHTML = `OK`;
    } else {
        db.grass.health -= 1;
        document.getElementById("ui-grass-condition").style.color = "rgb(13, 226, 42)";
        document.getElementById("ui-grass-condition").innerHTML = `Good`;
    }

    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
}