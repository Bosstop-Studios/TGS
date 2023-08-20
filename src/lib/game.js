"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const events_1 = __importDefault(require("events"));
const storage_1 = __importDefault(require("./storage"));
const shop_1 = __importDefault(require("./gui/shop"));
const music_1 = __importDefault(require("./music"));
const profile_1 = __importDefault(require("./gui/profile"));
const delay = (milli) => new Promise(res => setTimeout(res, milli));
class Game extends events_1.default {
    constructor(props) {
        super();
        this.storage = new storage_1.default();
        this.music = new music_1.default(props.music, this.storage.getVolume());
        this.grass = props.grass;
        this.alertElement = {
            root: props.alert.root,
            content: props.alert.content,
        };
        this.panel = {
            username: props.panel.username,
            coins: props.panel.coins,
            xp: props.panel.xp,
            level: props.panel.level,
            healthBar: props.panel.healthBar,
        };
        this.model = {
            root: props.model.root,
            title: props.model.title,
            content: props.model.content,
        };
        this.menu = props.menu;
        this.hand = props.hand;
        this.reviveBtn = props.reviveBtn;
        this.menuBtn = props.menuBtn;
        this.hand.addEventListener("click", this.handClick.bind(this));
        this.reviveBtn.addEventListener("click", this.reviveClick.bind(this));
        this.menuBtn.addEventListener("click", this.menuClick.bind(this));
    }
    start() {
        this.checkLores();
        this.setHand();
        this.panel.username.innerHTML = this.storage.getUsername();
        this.panel.coins.innerHTML = this.storage.getCoins();
        this.panel.xp.innerHTML = this.storage.getExp();
        this.panel.level.innerHTML = this.storage.getLevel();
        this.updateHealthBar();
        if (this.storage.getMusicState())
            this.music.play();
        console.log("Game started");
    }
    checkLores() {
        if (!this.storage.getCheckpoints().intro)
            return electron_1.ipcRenderer.send("open-lore");
    }
    setHand() { this.hand.style.backgroundImage = `url('../assets/hands/hand${this.storage.getHandColor()}.jpeg')`; }
    ;
    handClick() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storage.getHealth() <= 0)
                return this.alert("Your grass is dead!");
            this.hand.classList.add('handanimated');
            this.storage.removeHealth(1);
            this.storage.addCoins(this.storage.getLevel());
            this.storage.addExp(2);
            this.updateUI();
            yield delay(500);
            this.hand.classList.remove('handanimated');
        });
    }
    reviveClick() {
        let maxhealth = this.storage.getLevel() * 10;
        let rate = this.storage.getLevel() * 10, cost = this.storage.getLevel() * 25;
        let finalCost = cost - rate;
        if (this.storage.getCoins() < finalCost)
            return this.alert("You don't have enough coins to revive your grass!");
        if (this.storage.getHealth() > 0)
            return this.alert("Your grass is still alive!");
        this.storage.removeCoins(finalCost);
        this.storage.setHealth(maxhealth);
        this.updateUI();
    }
    menuClick() {
        console.log("Menu clicked");
        if (this.menu.style.display == "block")
            return this.menu.style.display = "none";
        else
            this.menu.style.display = "block";
        let shopBtn = document.getElementById("shop-btn");
        shopBtn.addEventListener("click", () => {
            this.model.content.innerHTML = "";
            this.model.root.style.display = "block";
            this.model.title.innerHTML = "Shop";
            new shop_1.default(this, this.model.content);
        });
        let profileBtn = document.getElementById("profile-btn");
        profileBtn.addEventListener("click", () => {
            this.model.content.innerHTML = "";
            this.model.root.style.display = "block";
            this.model.title.innerHTML = "Profile";
            new profile_1.default(this, this.model.content);
        });
        let saveBtn = document.getElementById("save-btn");
        saveBtn.addEventListener("click", () => {
            this.saveGame();
            this.alert("Game saved!", 1);
        });
    }
    updateUI() {
        this.panel.coins.innerHTML = this.storage.getCoins();
        this.panel.xp.innerHTML = this.storage.getExp();
        this.panel.level.innerHTML = this.storage.getLevel();
        this.updateHealthBar();
    }
    updateHealthBar() {
        this.updateGrass();
        this.panel.healthBar.classList.remove("progress-red", "progress-orange", "progress-green");
        this.panel.healthBar.value = this.storage.getHealth();
        this.panel.healthBar.max = this.storage.getLevel() * 10;
        let healthPrecent = (this.storage.getHealth() / (this.storage.getLevel() * 10)) * 100;
        if (healthPrecent <= 25)
            return this.panel.healthBar.classList.add("progress-red");
        if (healthPrecent < 50)
            return this.panel.healthBar.classList.add("progress-orange");
        if (healthPrecent >= 50)
            return this.panel.healthBar.classList.add("progress-green");
    }
    updateGrass() {
        let maxhealth = this.storage.getLevel() * 10;
        let healthleft = this.storage.getHealth() / maxhealth;
        if (healthleft <= 0) {
            this.grass.style.backgroundImage = "url('../assets/grass/dirt.jpeg')";
        }
        else if (healthleft <= 0.2) {
            this.grass.style.backgroundImage = "url('../assets/grass/grass5.jpeg')";
        }
        else if (healthleft <= 0.4) {
            this.grass.style.backgroundImage = "url('../assets/grass/grass4.jpeg')";
        }
        else if (healthleft <= 0.6) {
            this.grass.style.backgroundImage = "url('../assets/grass/grass3.jpeg')";
        }
        else if (healthleft <= 0.8) {
            this.grass.style.backgroundImage = "url('../assets/grass/grass2.jpeg')";
        }
        else {
            this.grass.style.backgroundImage = "url('../assets/grass/grass1.jpeg')";
        }
    }
    alert(content, type = 0) {
        this.alertElement.content.innerHTML = content;
        this.alertElement.root.style.display = "block";
        if (type == 1)
            this.alertElement.root.style.backgroundColor = "rgb(19, 163, 0)";
        else
            this.alertElement.root.style.backgroundColor = "rgb(252, 102, 102)";
        setTimeout(() => {
            this.alertElement.root.style.display = "none";
        }, 10000);
    }
    saveGame() {
        this.storage.save();
    }
}
exports.default = Game;
