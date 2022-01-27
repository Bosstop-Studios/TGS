const fs = require('fs');

let db = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const storage = class Storage {
    getData() {
        return db;
    }
    earnCoins() {
        db.user.coins += 1 + db.grass.level;

        fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
            if (x) console.error(x)
        });
    }
    earnXP() {
        db.user.xp += 2;
    
        fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
            if (x) console.error(x)
        });
    }
    decreaseCondition() {
        let maxhealth = db.grass.level * 10;
        let healthleft = db.grass.health / maxhealth;

        if(healthleft < 0.2) {
            db.grass.health -= 1 * db.grass.level;
            document.getElementById("grass").style.backgroundImage = "url('../assets/grass3.svg')";
        } else if(healthleft < 0.5) { 
            db.grass.health -= 1 * db.grass.level;
            document.getElementById("grass").style.backgroundImage = "url('../assets/grass2.svg')";
        } else {
            db.grass.health -= 1 * db.grass.level;
        }
    
        fs.writeFile("./config.json", JSON.stringify(db, null, 2), (x) => {
            if (x) console.error(x)
        });
    }
}
