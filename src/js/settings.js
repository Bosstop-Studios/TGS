
const fs = require("fs");
const package = require("../../package.json");

let db = JSON.parse(fs.readFileSync("./storage.json", "utf8"));

let versionElement = document.getElementById("info-version");
versionElement.innerHTML = package.version;

let playTimeElement = document.getElementById("info-playtime-min");

let playTime = db.game.playTime;

let playTimeHours = Math.floor(playTime / 60);
let playTimeMinutes = playTime % 60;

playTimeElement.innerHTML = `${playTimeHours}h ${playTimeMinutes}m`;

let volumeControl = document.getElementById("volume-control");
let currentVolumeLabel = document.getElementById("current-volume");
volumeControl.value = db.settings.volume*100;
currentVolumeLabel.innerHTML = volumeControl.value;

volumeControl.addEventListener("input", () => {
    currentVolumeLabel.innerHTML = volumeControl.value;
    db.settings.volume = (volumeControl.value / 100);
    fs.writeFileSync("./storage.json", JSON.stringify(db, null, 4));
});

let handSelect = document.getElementById("handSelector");
handSelect.value = db.settings.hand;
handSelect.addEventListener("change", () => {
    db.settings.hand = handSelect.value;
    fs.writeFileSync("./storage.json", JSON.stringify(db, null, 4));
});