
const fs = require('fs');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const delay = ms => new Promise(res => setTimeout(res, ms));

// GAME

function onLoad() {
    // LOAD BG
    let maxhealth = db.grass.level * 10;
    let healthleft = db.grass.health / maxhealth;
    if(healthleft < 0.1 || healthleft == 0.1) {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.svg')";
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.svg')";
    } else {
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass1.svg')";
    }
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
        gameAlert("<b>Alert:</b>&nbsp;Your Grass is in bad condition. Please grow more inorder to continue to touch it.");
    }
});

async function uiUpdate() {
    const data = await getData();
    document.getElementById("ui-coins").innerHTML = data.user.coins;
    document.getElementById("ui-xp").innerHTML = data.user.xp;

    document.getElementById("ui-grass-level").innerHTML = data.grass.level;
    document.getElementById("ui-grass-condition").innerHTML = `${data.grass.health} / ${data.grass.level * 10}`;
}

function gameAlert(text) {
    document.getElementById("alert-danger").style.display = "flex";
    document.getElementById("alert-danger").innerHTML = text.toString();
    setTimeout(function() {
        document.getElementById("alert-danger").style.display = "none";
    }, 5000)
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
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.svg')";
    } else if(healthleft < 0.5 || healthleft == 0.5) { 
        db.grass.health -= 1;
        document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.svg')";
    } else {
        db.grass.health -= 1;
    }

    fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
        if (x) console.error(x)
    });
}