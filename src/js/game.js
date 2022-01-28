
const fs = require('fs');

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
    const data = await getData();
    if(data.grass.health > 0 ) {
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

var reviveBtn = document.getElementById("revive-btn")

reviveBtn.addEventListener("click", async function(){
    grassRevive();
});


// GRASS FUNCTIONS

function grassRevive() {
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        const cost = db.grass.level + 25
        if(db.user.coins > cost || db.user.coins == cost) {
            db.user.coins -= cost;
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
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.png')";
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.png')";
    } else {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass1.png')";
    }
}


// GAME UTIL

async function uiUpdate() {
    document.getElementById("ui-coins").innerHTML = db.user.coins;
    document.getElementById("ui-xp").innerHTML = db.user.xp;

    document.getElementById("ui-grass-level").innerHTML = db.grass.level;

    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.png')";
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Bad`;
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.png')";
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
    } else {
        return;
    }
}


// STORAGE

function getData() {
    return db;
}
function earnCoins() {
    db.user.coins += 1 + db.grass.level;

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

    if(healthleft < 0.1 || healthleft == 0.1) {
        db.grass.health -= 1;
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.png')";
        document.getElementById("ui-grass-condition").style.color = "red";
        document.getElementById("ui-grass-condition").innerHTML = `Bad`;
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        db.grass.health -= 1;
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.png')";
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