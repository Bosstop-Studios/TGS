"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandColor = exports.ServiceType = void 0;
const fs_1 = __importDefault(require("fs"));
var ServiceType;
(function (ServiceType) {
    ServiceType[ServiceType["None"] = 0] = "None";
    ServiceType[ServiceType["TrueGrass"] = 1] = "TrueGrass";
    ServiceType[ServiceType["TacosGrassCare"] = 2] = "TacosGrassCare";
})(ServiceType = exports.ServiceType || (exports.ServiceType = {}));
var HandColor;
(function (HandColor) {
    HandColor[HandColor["Normal"] = 0] = "Normal";
    HandColor[HandColor["Brown"] = 1] = "Brown";
    HandColor[HandColor["Black"] = 2] = "Black";
    HandColor[HandColor["Dark"] = 3] = "Dark";
    HandColor[HandColor["Blue"] = 4] = "Blue";
    HandColor[HandColor["Orange"] = 5] = "Orange";
    HandColor[HandColor["Blob"] = 6] = "Blob";
})(HandColor = exports.HandColor || (exports.HandColor = {}));
class Storage {
    constructor() {
        if (!fs_1.default.existsSync("./storage.json"))
            this.create();
        else
            this.load();
    }
    getUsername() { return this.user.username; }
    setUsername(username) { this.user.username = username; }
    getCoins() { return this.user.coins; }
    addCoins(amount) { this.user.coins += amount; }
    removeCoins(amount) { this.user.coins -= amount; }
    setCoins(amount) { this.user.coins = amount; }
    getExp() { return this.user.exp; }
    addExp(amount) { this.user.exp += amount; }
    removeExp(amount) { this.user.exp -= amount; }
    setExp(amount) { this.user.exp = amount; }
    getLevel() { return this.grass.level; }
    addLevel(amount) { this.grass.level += amount; }
    removeLevel(amount) { this.grass.level -= amount; }
    setLevel(amount) { this.grass.level = amount; }
    getHealth() { return this.grass.health; }
    addHealth(amount) { this.grass.health += amount; }
    removeHealth(amount) { this.grass.health -= amount; }
    setHealth(amount) { this.grass.health = amount; }
    getService() { return this.grass.service; }
    setService(service) { this.grass.service = service; }
    getPlayTime() { return this.game.playTime; }
    addPlayTime(amount) { this.game.playTime += amount; }
    removePlayTime(amount) { this.game.playTime -= amount; }
    setPlayTime(amount) { this.game.playTime = amount; }
    getAchievements() { return this.game.achievements; }
    unlockAchievement(achievement) { this.game.achievements.push(achievement); }
    hasAchievement(achievement) { return this.game.achievements.includes(achievement); }
    setAchievements(achievements) { this.game.achievements = achievements; }
    setMusicState(state) { this.game.music = state; }
    getMusicState() { return this.game.music; }
    getCheckpoints() { return this.game.checkpoints; }
    setCheckpoints(checkpoints) { this.game.checkpoints = checkpoints; }
    setCheckpoint(checkpoint, value) { this.game.checkpoints[checkpoint] = value; }
    getHandColor() { return this.settings.hand; }
    setHandColor(color) { this.settings.hand = color; }
    getVolume() { return this.settings.volume; }
    setVolume(volume) { this.settings.volume = volume; }
    save() {
        console.log(this);
        let data = JSON.stringify(this, null, 4);
        fs_1.default.writeFileSync("./storage.json", data);
    }
    load() {
        let db = JSON.parse(fs_1.default.readFileSync("./storage.json", "utf8"));
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
        fs_1.default.writeFileSync("./storage.json", data);
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
        fs_1.default.writeFileSync("./storage.json", data);
    }
}
exports.default = Storage;
