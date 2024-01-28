const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

const find = require("find-process");
const DiscordRPC = require('discord-rpc');

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

let data = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));

let playTime = 0;

async function Checker() {
	const checker = await find('name', 'Discord.exe', true)
	if(checker.length > 0) return true;
	else return false;
}

contextBridge.exposeInMainWorld('electron', {
	close: () => {
		ipcRenderer.send('close-window');
	},
	minimize: () => {
		ipcRenderer.send('minimize-window');
	},
	maximize: () => {
		ipcRenderer.send('maximize-window');
	},
	rpcOpen: async(level) => {
		Checker().then((bool) => {
			if(bool) {
				rpc.setActivity({
					details: "Touching Grass",
					state: `Grass Level: ${level}`,
					largeImageKey: "tgs",
					largeImageText: "TGS",
					instance: false
				})
			}
		})
		rpc.login({ clientId: "940829469730566154" }).then(() => { console.log('Signed in') }).catch((err) => { console.log(err) });
	},
	rpcClose: () => {
		rpc.destroy();
	},
});

contextBridge.exposeInMainWorld('game', {
	getVersion: () => {
		return data.version;
	},
	addPlayTime: (time) => {
		playTime += time;
	},
	getPlayTime: () => {
		return playTime;
	},
	save: (user, grass, game, settings) => {
		let data = JSON.parse(fs.readFileSync("./storage.json", "utf8"));
		if(user) data.user = user;
		if(grass) data.grass = grass;
		if(game) data.game = game;
		if(settings) data.settings = settings;
		fs.writeFileSync("./storage.json", JSON.stringify(data, null, 4));
	},
	get: () => {
		return JSON.parse(fs.readFileSync("./storage.json", "utf8"));
	}
});