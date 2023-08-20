import fs from 'fs';

export enum ServiceType {
    None = 0,
    TrueGrass = 1,
    TacosGrassCare = 2
}

export enum HandColor {
    Normal = 0,
    Brown = 1,
    Black = 2,
    Dark = 3,
    Blue = 4,
    Orange = 5,
    Blob = 6,
}

export default class Storage {
    user: any;
    grass: any;
    game: any;
    settings: any;
    constructor() {
        if(!fs.existsSync("./storage.json")) this.create();
        else this.load();
    }

    getUsername() { return this.user.username; }
    setUsername(username: string) { this.user.username = username; }

    getCoins() { return this.user.coins; }
    addCoins(amount: number) { this.user.coins += amount; }
    removeCoins(amount: number) { this.user.coins -= amount; }
    setCoins(amount: number) { this.user.coins = amount; }

    getExp() { return this.user.exp; }
    addExp(amount: number) { this.user.exp += amount; }
    removeExp(amount: number) { this.user.exp -= amount; }
    setExp(amount: number) { this.user.exp = amount; }

    getLevel() { return this.grass.level; }
    addLevel(amount: number) { this.grass.level += amount; }
    removeLevel(amount: number) { this.grass.level -= amount; }
    setLevel(amount: number) { this.grass.level = amount; }

    getHealth() { return this.grass.health; }
    addHealth(amount: number) { this.grass.health += amount; }
    removeHealth(amount: number) { this.grass.health -= amount; }
    setHealth(amount: number) { this.grass.health = amount; }

    getService() { return this.grass.service; }
    setService(service: ServiceType) { this.grass.service = service; }

    getPlayTime() { return this.game.playTime; }
    addPlayTime(amount: number) { this.game.playTime += amount; }
    removePlayTime(amount: number) { this.game.playTime -= amount; }
    setPlayTime(amount: number) { this.game.playTime = amount; }

    getAchievements() { return this.game.achievements; }
    unlockAchievement(achievement: string) { this.game.achievements.push(achievement); }
    hasAchievement(achievement: string) { return this.game.achievements.includes(achievement); }
    setAchievements(achievements: string[]) { this.game.achievements = achievements; }

    setMusicState(state: boolean) { this.game.music = state; }
    getMusicState() { return this.game.music; }

    getCheckpoints() { return this.game.checkpoints; }
    setCheckpoints(checkpoints: any) { this.game.checkpoints = checkpoints; }
    setCheckpoint(checkpoint: string, value: boolean) { this.game.checkpoints[checkpoint] = value; }

    getHandColor() { return this.settings.hand; }
    setHandColor(color: HandColor) { this.settings.hand = color; }

    getVolume() { return this.settings.volume; }
    setVolume(volume: number) { this.settings.volume = volume; }

    save() {
        console.log(this);
        let data = JSON.stringify(this, null, 4);
        fs.writeFileSync("./storage.json", data);
    }

    load() {
        let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));
        this.user = db.user;
        this.grass = db.grass;
        this.game = db.game;
        this.settings = db.settings;
    }

    create() {

        this.user = {};
        this.grass = {};
        this.game = {};
        this.settings = {};

        this.setUsername("");
        this.setCoins(100);
        this.setExp(0);
        this.setLevel(1);
        this.setHealth(10);
        this.setService(ServiceType.None);
        this.setPlayTime(0);
        this.setAchievements([]);
        this.setHandColor(HandColor.Normal);
        this.setCheckpoints({ intro: false });

        let data = JSON.stringify(this, null, 4);
        fs.writeFileSync("./storage.json", data);
    }

    reset() {

        this.setUsername("");
        this.setCoins(100);
        this.setExp(0);
        this.setLevel(1);
        this.setHealth(10);
        this.setService(ServiceType.None);
        this.setPlayTime(0);
        this.setAchievements([]);
        this.setHandColor(HandColor.Normal);
        this.setCheckpoints({ intro: false });
        
        let data = JSON.stringify(this, null, 4);
        fs.writeFileSync("./storage.json", data);
    }
  
}