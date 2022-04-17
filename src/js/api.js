
module.exports.Game = class game {
    constructor() {
        this.assets = {
            grass: {
                dirtImage: "url('../assets/grass/dirt.jpeg')",
                grassOne: "url('../assets/grass/grass1.jpeg')", 
                grassTwo: "url('../assets/grass/grass2.jpeg')", 
                grassThree: "url('../assets/grass/grass3.jpeg')",
                grassFour: "url('../assets/grass/grass4.jpeg')", 
                grassFive: "url('../assets/grass/grass5.jpeg')",
            }, 
            achievement: {
                game: {
                    FirstTouch: "../assets/achevs/hand-badge.png"
                },
                level: {
                    lvl10: "../assets/achevs/lvl10.jpg", 
                    lvl20: "../assets/achevs/lvl20.jpg", 
                    lvl30: "../assets/achevs/lvl30.jpg", 
                    lvl40: "../assets/achevs/lvl40.jpg",
                    lvl50: "../assets/achevs/lvl50.jpg",
                    lvl60: "../assets/achevs/lvl60.jpg",
                    lvl70: "../assets/achevs/lvl70.jpg",
                    lvl80: "../assets/achevs/lvl80.jpg",
                    lvl90: "../assets/achevs/lvl90.jpg",
                    lvl100: "../assets/achevs/lvl100.jpg"
                },
            }
        }
    }
    Alert(type, text) {
        const box = document.getElementById("alert-box");
        const modelbox = document.getElementById("model-alert-box");
        if(type == 1) box.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
        if(type == 2) box.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
        if(type == 3) modelbox.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
        if(type == 4) modelbox.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`, box.scrollTop = box.scrollHeight;
        return;
    }
    openMenu() {
        var modal = document.getElementById("myModal");
        var modalContent = document.getElementById("modal-content");
        
        modal.style.display = "flex";
        modalContent.style.display = "block"
        modalContent.style.backgroundColor = "transparent";
        modalContent.innerHTML = `
        <center style="margin-top:35%; font-size:45px;">
            <div style="margin-top:10px; margin-bottom:10px" class="row">
              <div class="col-sm-3">
              <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" id="shop-btn" class="btn btn-success">SHOP</button>
              </div>
              <div class="col-sm-3">
              <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="openLife()" class="btn btn-success" disabled>LIFE</button>
              </div>
              <div class="col-sm-3">
              <button style="margin-left:50px; width:100%; height:100%; font-size:25px;" id="menu-save-btn" type="button" onclick="" class="btn btn-success">SAVE GAME</button>
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

        document.getElementById("shop-btn").onclick = () => { shop.open(); }
      
        document.getElementById("menu-save-btn").onclick = () => { storage.SaveData(), modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " ", this.Alert(1, "<b>Alert:</b>&nbsp; Game Saved!"); }
        
        document.getElementById("model-background").onclick = (e) => { modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; }
      
    }
}

module.exports.Grass = class grass {
    Revive() {
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
                game.Alert(1, "<b>Alert:</b>&nbsp; Grass Revived!");
            } else {
                game.Alert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to revive your Grass!");
            }
        } else {
            game.Alert(2, "<b>Alert:</b>&nbsp;There is still grass to touch.");
        }
    }
    decreaseCondition() {
        let maxhealth = db.grass.level * 10;
        let healthleft = db.grass.health / maxhealth;
        if(healthleft == 0) return tgsEvent.emit('tgs-grassUpdate'), tgsEvent.emit('tgs-ui-update');
        if(healthleft < 0) return db.grass.health -= 1, tgsEvent.emit('tgs-grassUpdate'), tgsEvent.emit('tgs-ui-update');
        return db.grass.health -= 1, tgsEvent.emit('tgs-grassUpdate'), tgsEvent.emit('tgs-ui-update');
    }
}

module.exports.Economy = class economy {
    earnCoins() {
        db.user.coins += db.grass.level;
    }
    earnXP() {
        db.user.xp += 2;
    }
}

module.exports.Shop = class shop {
    open() {
        var modal = document.getElementById("myModal");
        var modalContent = document.getElementById("modal-content");
        
        modal.style.display = "flex";
        modalContent.style.display = "block"
        modalContent.style.backgroundColor = "rgb(16, 121, 241)";
        modalContent.innerHTML = `
        <div class="container">
            <h2 class="gui-title">Social Credit Market</h2>
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
          <br>
          <h2 style="text-align:center;">Boosters</h2>
          <!--<p style="text-align:center; font-size:18px; color:#00ff55;"><b>Services may have hidden benefits</b></p>-->
          <br>
          <div style="margin-top:10px; margin-bottom:10px" id="booster-fertilizer"></div>
        </div>
        `
      
        this.prices();
        service.check()
        booster.check()
    
        document.getElementById("model-background").onclick = (e) => {
            modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; 
        }
      
    }
    prices() {
        document.getElementById("grass-levelup").innerHTML = this.grasslvlupCost().toString() + " Coins";
    }
    buyCoins() {
        if(db.user.xp >= 100) {
          db.user.xp -= 100;
          db.user.coins += 100;
          game.Alert(3, "<b>Alert:</b>&nbsp;100 Coins added.");
          checkService()
          tgsEvent.emit('tgs-ui-update');
        } else {
          game.Alert(4, "<b>Alert:</b>&nbsp;You don't have enough Social Credit to buy this item.")
        }
    }
    grasslvlupCost() {
        let levelupCost;
        if(db.grass.level >= 100) levelupCost = db.grass.level * 3500
        if(db.grass.level >= 90) levelupCost = db.grass.level * 2750
        if(db.grass.level >= 80) levelupCost = db.grass.level * 2050
        if(db.grass.level >= 70) levelupCost = db.grass.level * 1750
        if(db.grass.level >= 60) levelupCost = db.grass.level * 1550
        if(db.grass.level >= 50) levelupCost = db.grass.level * 1250
        if(db.grass.level >= 40) levelupCost = db.grass.level * 1050
        if(db.grass.level >= 30) levelupCost = db.grass.level * 850
        if(db.grass.level >= 20) levelupCost = db.grass.level * 650
        if(db.grass.level >= 10) levelupCost = db.grass.level * 450
        if(db.grass.level < 10) levelupCost = db.grass.level * 150
        return levelupCost;
    }
}

module.exports.Service = class service {
    check() {        
        var tacobox = document.getElementById("service-box-taco")
        var truGrass = document.getElementById("service-box-truGrass")
    

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
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="service.Unequip(1)" class="btn btn-success">Equiped</button>
            </div>
        </div>
        `
    
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

    }
    Buy(serviceID) {
        if(serviceID == 1) {
            db.grass.service = 1;
            game.Alert(3, "<b>Alert:</b>&nbsp;Tacos Grass Care Equiped");
        } else if(serviceID == 2) {
            db.grass.service = 2;
            game.Alert(3, "<b>Alert:</b>&nbsp;TruGrass Care Equiped");
        }
        this.check()
    }
    Unequip(serviceID) {
        if(serviceID == 1) {
            db.grass.service = 0;
            game.Alert(3, "<b>Alert:</b>&nbsp;Tacos Grass Care Unequiped");
        } else if(serviceID == 2) {
            db.grass.service = 0;
            game.Alert(3, "<b>Alert:</b>&nbsp;TruGrass Care Unequiped");
        }
        this.check()
    }
    Execute() {
        if(db.grass.service == 1) {
            const taco = db.grass.level * 150
            if(db.user.coins >= taco) {
                db.user.coins -= taco;
                db.grass.health = db.grass.level * 15;
                tgsEvent.emit('tgs-ui-update');
                tgsEvent.emit('tgs-grassUpdate')
                return true;
            } else {
                game.Alert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to continue Tacos Grass Service!");
                db.grass.service = 0;
                return false;
            }
        } else if(db.grass.service == 2) {
            const tru = db.grass.level * 100
            if(db.user.coins >= tru) {
                db.user.coins -= tru;
                db.grass.health = db.grass.level * 20;
                tgsEvent.emit('tgs-ui-update');
                tgsEvent.emit('tgs-grassUpdate')
                return true;
            } else {
                game.Alert(2, "<b>Alert:</b>&nbsp;You don't have enough coins to continue TruGrass Service!");
                db.grass.service = 0;
                return false;
            }
        }
    }
    Listener() {
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
}

module.exports.Booster = class booster {
    check() {
        var fertilizerbox = document.getElementById("booster-fertilizer")
        // var truGrass = document.getElementById("service-box-truGrass")
    
        let fertilizerPrice = db.grass.level * 250;
        fertilizerbox.innerHTML = `
        <div class="row">
            <div class="col-sm-4">
                <p style="font-size:20px;">Fertilizer</p>
            </div>
            <div class="col-sm-4">
                <p style="display:inline;">Cost: <span>${fertilizerPrice} Coins</span></p>
            </div>
            <div class="col-sm-2">
                <button style="margin-left:50px; right:0px; display:inline;" type="button" onclick="bossterBuy(1)" class="btn btn-success">Get</button>
            </div>
        </div>
        `
    }
    Buy(boosterID) {
        let bossterPrice;
        if(boosterID == 1) {
            bossterPrice = db.grass.level * 250;
            if(db.user.coins >= bossterPrice) {
                db.user.coins -= db.grass.level * 150;
                db.grass.booster = 1;
                db.grass.health = db.grass.level * 20;
                game.Alert(3, "<b>Alert:</b>&nbsp;Bought Fertilizer");
                tgsEvent.emit('tgs-ui-update');
                tgsEvent.emit('tgs-grassUpdate')
            } else {
                game.Alert(4, "<b>Alert:</b>&nbsp;You Don't have enough coins");
            }
        }
    }
    Unequip() {
        if(db.grass.booster > 0){
            db.grass.booster = 0
        }
    } 
    Execute() {
        if(db.grass.booster == 1) {
            db.user.coins += db.grass.level * 5
        } else if(db.grass.booster == 2) {
            return;
        }
    }
}

module.exports.Life = class life {
    open() {
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
}

module.exports.Storage = class storage {
    addTime() {
        db.game.playTime += 1;
    }
    SaveData() {
        fs.writeFile("./storage.json", JSON.stringify(db, null, 2), (x) => {
            if(x) {
                console.log(x)
                log(`Error_FS:\n` + x)
            }
            log(`Game Saved!`)
        });
    }
}

module.exports.Discord = class discord {
    async Checker() {
        const checker = await find('name', 'Discord.exe', true)
        if(checker.length > 0) {
            return true;
        } else {
            return false;
        }
    }  
    GameStartMenu() {
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
    inGame() {
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
    Grasslvlup() {
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
}