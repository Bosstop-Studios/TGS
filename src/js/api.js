const EventEmitter = require('events')

const tsgEvent = new EventEmitter();

module.exports.Game = class game {
    constructor() {
        this.event = tsgEvent;
        this.randomevent = require("../assets/events/randomevent.json");
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
        if(type == 3) modelbox.innerHTML += `<div class="alert alert-success fadeanimation" role="alert">${text.toString()}</div>`, modelbox.scrollTop = modelbox.scrollHeight;
        if(type == 4) modelbox.innerHTML += `<div class="alert alert-danger fadeanimation" role="alert">${text.toString()}</div>`, modelbox.scrollTop = modelbox.scrollHeight;
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
              <button style="margin-left:50px; width:100%; height:100%; font-size:35px;" type="button" onclick="life.open()" class="btn btn-success">LIFE</button>
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
                game.event.emit('tgs-ui-update');
                game.event.emit('tgs-grassUpdate')
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
        if(healthleft == 0) return game.event.emit('tgs-grassUpdate'), game.event.emit('tgs-ui-update');
        if(healthleft < 0) return db.grass.health -= 1, game.event.emit('tgs-grassUpdate'), game.event.emit('tgs-ui-update');
        return db.grass.health -= 1, game.event.emit('tgs-grassUpdate'), game.event.emit('tgs-ui-update');
    }
    lvlUpCost() {
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
    lvlUp() {
        let levelupCost = this.lvlUpCost();
        if(db.user.coins >= levelupCost) {
          db.user.coins -= levelupCost;
          db.grass.level += 1;
          db.grass.health = db.grass.level * 10;
          game.Alert(3, "<b>Alert:</b>&nbsp;Grass Leveled Up");
          shop.prices();
          service.check()
          game.event.emit('tgs-grassUpdate');
          game.event.emit('tgs-ui-update');
          discord.Grasslvlup();
        } else {
          game.Alert(4, "<b>Alert:</b>&nbsp;You don't have enough Coins to buy this item.")
        }
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
        modalContent.innerHTML = `
        <div class="container">
        <div class="storeSection">
            <h2 class="gui-title">Social Credit Market</h2>
            <div style="margin-top:25px; margin-bottom:25px" class="row">
                <div class="card tgsitem">
                    <img class="card-img-top w-100 d-block" src="../../src/assets/scenes/tgs-start.jpeg" style="max-height: 200px;">
                    <div class="card-body" style="overflow: auto;background: #343a40;">
                        <h4 class="card-title">Coins</h4>
                        <p class="card-text">Cost: 100 Social Credit</p>
                        <br>
                        <button style="margin: auto;" type="button" onclick="shop.buyCoins()" class="btn btn-success">Buy</button>
                    </div>
                </div>
            </div>  
        </div>
        <div class="storeSection">
            <h2 class="gui-title">Coins Store</h2>
            <div style="margin-top:25px; margin-bottom:25px" class="row">
                <div class="card tgsitem">
                    <img class="card-img-top w-100 d-block" src="../../src/assets/scenes/tgs-start.jpeg" style="max-height: 200px;">
                    <div class="card-body" style="overflow: auto;background: #343a40;">
                        <h4 class="card-title">Level Up Grass</h4>
                        <p class="card-text" id="grass-levelup-cost"></p>
                        <br>
                        <button style="margin: auto;" type="button" onclick="grass.lvlUp()" class="btn btn-success">Buy</button>
                    </div>
                </div>
            </div>  
        </div>
        <div class="storeSection">
            <h2 class="gui-title">Service Center</h2>
            <p class="gui-description"><b>Services may have hidden benefits</b></p>
            <div style="margin-top:25px; margin-bottom:25px" class="row" id="service-box-taco"></div>
            <div style="margin-top:25px; margin-bottom:25px" class="row" id="service-box-truGrass"></div>
        </div>
        <div class="storeSection">
            <h2 class="gui-title">Boosters</h2>
            <div style="margin-top:25px; margin-bottom:25px" class="row" id="booster-fertilizer"></div>
        </div>
    </div>
        `
      
        this.prices();
        service.check()
        booster.check()
    
        document.getElementById("model-background").onclick = (e) => { modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; }
      
    }
    prices() {
        document.getElementById("grass-levelup-cost").innerHTML = grass.lvlUpCost().toString() + " Coins";
    }
    buyCoins() {
        if(db.user.xp >= 100) {
          db.user.xp -= 100;
          db.user.coins += 100;
          game.Alert(3, "<b>Alert:</b>&nbsp;100 Coins added.");
          service.check()
          game.event.emit('tgs-ui-update');
        } else {
          game.Alert(4, "<b>Alert:</b>&nbsp;You don't have enough Social Credit to buy this item.")
        }
    }
}

module.exports.Service = class service {
    check() {        
        var tacobox = document.getElementById("service-box-taco")
        var truGrass = document.getElementById("service-box-truGrass")

        let tacoCare = db.grass.level * 150;
        tacobox.innerHTML = `
        <div class="tgsbanner">
            <h4>Tacos Grass Care</h4>
            <p>Cost: ${tacoCare} Coins</p>
            <button type="button" id="service-tacos-btn" class="btn btn-success"></button>
        </div>
        `
    
        let truGrassCare = db.grass.level * 100;
        truGrass.innerHTML = `
        <div class="tgsbanner">
            <h4>TruGrass</h4>
            <p>Cost: ${truGrassCare} Coins</p>
            <button type="button" id="service-trugrass-btn" class="btn btn-success"></button>
        </div>
        `

        if(db.grass.service == 1) {
            document.getElementById("service-tacos-btn").innerHTML = "Equiped"
            document.getElementById("service-tacos-btn").onclick = () => { this.Unequip(1) }
        } else {
            document.getElementById("service-tacos-btn").innerHTML = "Get"
            document.getElementById("service-tacos-btn").onclick = () => { this.Buy(1) }
        }

        if(db.grass.service == 2) {
            document.getElementById("service-trugrass-btn").innerHTML = "Equiped"
            document.getElementById("service-trugrass-btn").onclick = () => { this.Unequip(2) }
        } else {
            document.getElementById("service-trugrass-btn").innerHTML = "Get"
            document.getElementById("service-trugrass-btn").onclick = () => { this.Buy(2) }
        }

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
    async Execute() {
        if(db.grass.service == 1) {
            const taco = db.grass.level * 150
            if(db.user.coins >= taco) {
                db.user.coins -= taco;
                db.grass.health = db.grass.level * 15;
                game.event.emit('tgs-ui-update');
                game.event.emit('tgs-grassUpdate')
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
                game.event.emit('tgs-ui-update');
                game.event.emit('tgs-grassUpdate')
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
            economy.earnCoins();
            economy.earnXP();
        } else {
            economy.earnCoins();
            economy.earnXP();
        }
    }
}

module.exports.Booster = class booster {
    check() {
        var fertilizerbox = document.getElementById("booster-fertilizer")
        // var truGrass = document.getElementById("service-box-truGrass")
    
        let fertilizerPrice = db.grass.level * 250;
        fertilizerbox.innerHTML = `
        <div class="tgsbanner">
            <h4>Fertilizer</h4>
            <p>Cost: ${fertilizerPrice} Coins</p>
            <button type="button" onclick="booster.Buy(1)" class="btn btn-success">Buy</button>
        </div>
        `
    }
    Buy(boosterID) {
        let bossterPrice;
        if(boosterID == 1) {
            if(db.grass.booster > 0) return game.Alert(4, "<b>Alert:</b>&nbsp;You can only use one Fertilizer at a time");
            bossterPrice = db.grass.level * 250;
            if(db.user.coins >= bossterPrice) {
                db.user.coins -= db.grass.level * 150;
                db.grass.booster = 1;
                db.grass.health = db.grass.level * 20;
                game.Alert(3, "<b>Alert:</b>&nbsp;Bought Fertilizer");
                game.event.emit('tgs-ui-update');
                game.event.emit('tgs-grassUpdate')
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
    
        this.checkBFF()
        this.checkGF()
        this.checkBF()
      
        document.getElementById("model-background").onclick = (e) => { modal.style.display = "none", document.getElementById("model-alert-box").innerHTML = " "; }
      
    }
    checkGF() {
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
    checkBF() {
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
    checkBFF() {
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
        this.Checker().then((bool) => {
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
        this.Checker().then((bool) => {
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
        this.Checker().then((bool) => {
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