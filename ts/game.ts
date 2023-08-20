import { ipcRenderer } from 'electron';
import EventEmitter from 'events';

import Storage from './storage';
import Shop from './gui/shop';
import Music from './music';
import Profile from './gui/profile';

const delay = (milli: number | undefined) => new Promise(res => setTimeout(res, milli));

export default class Game extends EventEmitter {
    storage: Storage;
    music: Music;
    grass: HTMLElement;
    alertElement: {
        root: HTMLDivElement,
        content: HTMLElement,
    };
    panel: {
        username: HTMLElement,
        coins: HTMLElement,
        xp: HTMLElement,
        level: HTMLElement,
        healthBar: HTMLProgressElement,
    };
    hand: HTMLElement;
    reviveBtn: HTMLElement;
    menuBtn: HTMLElement;
    model: { root: HTMLDivElement; title: HTMLElement; content: HTMLElement; };
    menu: HTMLDivElement;
    constructor(props: any) {
        super();
        this.storage = new Storage();
        this.music = new Music(props.music as HTMLAudioElement, this.storage.getVolume());

        this.grass = props.grass as HTMLElement;

        this.alertElement = {
            root: props.alert.root as HTMLDivElement,
            content: props.alert.content as HTMLElement,
        };

        this.panel = {
            username: props.panel.username as HTMLElement,
            coins: props.panel.coins as HTMLElement,
            xp: props.panel.xp as HTMLElement,
            level: props.panel.level as HTMLElement,
            healthBar: props.panel.healthBar as HTMLProgressElement,
        };

        this.model = {
            root: props.model.root as HTMLDivElement,
            title: props.model.title as HTMLElement,
            content: props.model.content as HTMLElement,
        }

        this.menu = props.menu as HTMLDivElement;

        this.hand = props.hand as HTMLElement;

        this.reviveBtn = props.reviveBtn as HTMLElement;
        this.menuBtn = props.menuBtn as HTMLElement;

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

        if(this.storage.getMusicState()) this.music.play();

        console.log("Game started");
    }

    checkLores() {
        if(!this.storage.getCheckpoints().intro) return ipcRenderer.send("open-lore");
    }

    setHand() { this.hand.style.backgroundImage = `url('../assets/hands/hand${this.storage.getHandColor()}.jpeg')` };

    async handClick() {
        if(this.storage.getHealth() <= 0) return this.alert("Your grass is dead!");
        this.hand.classList.add('handanimated');
        this.storage.removeHealth(1);
        this.storage.addCoins(this.storage.getLevel());
        this.storage.addExp(2);
        this.updateUI();
        await delay(500);
        this.hand.classList.remove('handanimated');
    }

    reviveClick() {
        let maxhealth = this.storage.getLevel() * 10;
        let rate = this.storage.getLevel() * 10, cost = this.storage.getLevel() * 25;
        let finalCost = cost - rate;

        if(this.storage.getCoins() < finalCost) return this.alert("You don't have enough coins to revive your grass!");
        if(this.storage.getHealth() > 0) return this.alert("Your grass is already alive!");

        this.storage.removeCoins(finalCost);
        this.storage.setHealth(maxhealth);

        this.updateUI();
    }

    menuClick() {
        console.log("Menu clicked");
        if(this.menu.style.display == "block") return this.menu.style.display = "none";
        else this.menu.style.display = "block";

        let shopBtn = document.getElementById("shop-btn") as HTMLButtonElement;
        shopBtn.addEventListener("click", () => {
            this.model.content.innerHTML = "";
            this.model.root.style.display = "block";
            this.model.title.innerHTML = "Shop";
            new Shop(this, this.model.content);
        });

        let profileBtn = document.getElementById("profile-btn") as HTMLButtonElement;
        profileBtn.addEventListener("click", () => {
            this.model.content.innerHTML = "";
            this.model.root.style.display = "block";
            this.model.title.innerHTML = "Profile";
            new Profile(this, this.model.content);
        });

        let saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
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

        if(healthPrecent <= 25) return this.panel.healthBar.classList.add("progress-red");
        if(healthPrecent < 50) return this.panel.healthBar.classList.add("progress-orange");
        if(healthPrecent >= 50) return this.panel.healthBar.classList.add("progress-green");
    }

    updateGrass() {
        let maxhealth = this.storage.getLevel() * 10;
        let healthleft = this.storage.getHealth() / maxhealth;
        if(healthleft <= 0) {
            this.grass.style.backgroundImage  = "url('../assets/grass/dirt.jpeg')";
        } else if(healthleft <= 0.2) { 
            this.grass.style.backgroundImage  = "url('../assets/grass/grass5.jpeg')";
        } else if(healthleft <= 0.4) { 
            this.grass.style.backgroundImage  = "url('../assets/grass/grass4.jpeg')"
        } else if(healthleft <= 0.6) { 
            this.grass.style.backgroundImage  = "url('../assets/grass/grass3.jpeg')"
        } else if(healthleft <= 0.8) { 
            this.grass.style.backgroundImage  = "url('../assets/grass/grass2.jpeg')"
        } else {
            this.grass.style.backgroundImage  = "url('../assets/grass/grass1.jpeg')"
        }
    }

    alert(content: string, type:Number = 0) {
        this.alertElement.content.innerHTML = content;
        this.alertElement.root.style.display = "block";
        if(type == 1) this.alertElement.root.style.backgroundColor = "rgb(19, 163, 0)";
        else this.alertElement.root.style.backgroundColor = "rgb(252, 102, 102)";
        setTimeout(() => {
            this.alertElement.root.style.display = "none";
        }, 10000);
    }

    saveGame() {
        this.storage.save();
    }
}